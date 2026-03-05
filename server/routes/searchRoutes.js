/**
 * Search Routes — Elasticsearch-powered full-text search
 *
 * Falls back to MongoDB $text search when Elasticsearch is unavailable.
 *
 * GET /api/search?q=iphone&entity=electronics&minPrice=100&maxPrice=1000
 * GET /api/search/suggest?q=iph&entity=electronics
 * POST /api/search/reindex   (admin — sync MongoDB → Elasticsearch)
 */

const express = require('express');
const router = express.Router();
const SearchService = require('../services/searchService');
const ListingCache = require('../services/listingCacheService');
const { searchLimiter } = require('../middleware/rateLimiter');
const { logger } = require('../utils/logger');

// Models for fallback
const Electronics = require('../models/Electronics');
const Vehicle = require('../models/Vehicle');

const MODEL_MAP = {
  electronics: Electronics,
  vehicles: Vehicle,
};

// ── Full-text search ──────────────────────────────────────
router.get('/', searchLimiter, async (req, res) => {
  try {
    const {
      q,
      entity = 'electronics',
      category,
      condition,
      minPrice,
      maxPrice,
      location,
      brand,
      fuelType,
      transmission,
      sort,
      page = 1,
      limit = 50,
    } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Search query (q) is required',
      });
    }

    if (!MODEL_MAP[entity]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid entity. Use "electronics" or "vehicles"',
      });
    }

    // 1. Try Redis cache first
    const cachedResults = await ListingCache.getCachedSearchResults(entity, q);
    if (cachedResults) {
      return res.status(200).json({
        success: true,
        ...cachedResults,
        source: 'cache',
      });
    }

    // 2. Try Elasticsearch
    const esResults = await SearchService.search(entity, {
      query: q,
      category,
      condition,
      minPrice,
      maxPrice,
      location,
      brand,
      fuelType,
      transmission,
      sort,
      page,
      limit,
    });

    if (esResults) {
      // Cache the results
      await ListingCache.cacheSearchResults(entity, q, esResults.listings, esResults.pagination);

      return res.status(200).json({
        success: true,
        query: q,
        entity,
        ...esResults,
      });
    }

    // 3. Fallback to MongoDB $text search
    const Model = MODEL_MAP[entity];
    const filter = { status: 'active', $text: { $search: q } };

    if (category) {
      filter.subcategory = { $in: category.split(',').map((c) => c.trim()) };
    }
    if (condition) {
      filter.condition = { $in: condition.split(',').map((c) => c.trim()) };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOption = { score: { $meta: 'textScore' }, createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'oldest') sortOption = { createdAt: 1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [listings, total] = await Promise.all([
      Model.find(filter, { score: { $meta: 'textScore' } })
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .populate('seller', 'firstName lastName profileImage')
        .lean(),
      Model.countDocuments(filter),
    ]);

    const pagination = {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    };

    // Cache the fallback results too
    await ListingCache.cacheSearchResults(entity, q, listings, pagination);

    res.status(200).json({
      success: true,
      query: q,
      entity,
      listings,
      pagination,
      source: 'mongodb',
    });
  } catch (error) {
    logger.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
    });
  }
});

// ── Autocomplete / suggestions ────────────────────────────
router.get('/suggest', searchLimiter, async (req, res) => {
  try {
    const { q, entity = 'electronics', limit = 5 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json({ success: true, suggestions: [] });
    }

    // Try Elasticsearch suggestions first
    const suggestions = await SearchService.suggest(entity, q, Number(limit));

    if (suggestions && suggestions.length > 0) {
      return res.status(200).json({
        success: true,
        suggestions,
        source: 'elasticsearch',
      });
    }

    // Fallback: MongoDB regex-based suggestions
    const Model = MODEL_MAP[entity];
    if (!Model) {
      return res.status(200).json({ success: true, suggestions: [] });
    }

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const results = await Model.find(
      { status: 'active', title: regex },
      { title: 1, price: 1, location: 1, images: 1, brand: 1, model: 1 }
    )
      .limit(Number(limit))
      .lean();

    const mongoSuggestions = results.map((r) => ({
      _id: r._id,
      title: r.title,
      price: r.price,
      location: r.location,
      thumbnail: r.images?.[0] || null,
      brand: r.brand,
      model: r.model,
    }));

    res.status(200).json({
      success: true,
      suggestions: mongoSuggestions,
      source: 'mongodb',
    });
  } catch (error) {
    logger.error('Suggest error:', error);
    res.status(200).json({ success: true, suggestions: [] });
  }
});

// ── Reindex: sync MongoDB → Elasticsearch ─────────────────
router.post('/reindex', async (req, res) => {
  try {
    if (!SearchService.isAvailable()) {
      return res.status(503).json({
        success: false,
        message: 'Elasticsearch is not connected. Set ELASTICSEARCH_URL env var.',
      });
    }

    const { entity } = req.body;
    const entities = entity ? [entity] : ['electronics', 'vehicles'];
    const results = {};

    for (const ent of entities) {
      const Model = MODEL_MAP[ent];
      if (!Model) continue;

      const listings = await Model.find({ status: 'active' }).lean();
      const result = await SearchService.bulkIndex(ent, listings);
      results[ent] = { total: listings.length, ...result };
    }

    res.status(200).json({
      success: true,
      message: 'Reindex complete',
      results,
    });
  } catch (error) {
    logger.error('Reindex error:', error);
    res.status(500).json({
      success: false,
      message: 'Reindex failed',
    });
  }
});

// ── Elasticsearch status ──────────────────────────────────
router.get('/status', async (req, res) => {
  res.status(200).json({
    success: true,
    elasticsearch: {
      connected: SearchService.isAvailable(),
      fallback: 'MongoDB $text search',
    },
  });
});

module.exports = router;
