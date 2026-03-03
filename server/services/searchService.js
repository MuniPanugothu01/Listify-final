/**
 * Elasticsearch Search Service
 *
 * Provides:
 *   - Indexing listings into Elasticsearch
 *   - Full-text search with fuzzy matching, boosting, filters
 *   - Autocomplete / suggest
 *   - Graceful fallback to MongoDB $text search
 *
 * All operations are no-ops when Elasticsearch is not connected.
 */

const { getClient, getIsConnected } = require('../config/elasticsearch');
const { logger } = require('../utils/logger');

// Map entity names to Elasticsearch index names
const INDEX_MAP = {
  electronics: 'listify_electronics',
  vehicles: 'listify_vehicles',
};

class SearchService {

  // ══════════════════════════════════════════════════════════
  //  Index a single listing (call on create / update)
  // ══════════════════════════════════════════════════════════
  static async indexListing(entity, listing) {
    if (!getIsConnected()) return;

    const client = getClient();
    const index = INDEX_MAP[entity];
    if (!index || !listing) return;

    try {
      const id = listing._id?.toString() || listing.id;
      const doc = {
        title: listing.title,
        description: listing.description,
        price: listing.price,
        category: listing.category,
        subcategory: listing.subcategory,
        condition: listing.condition,
        location: listing.location,
        sellerName: listing.sellerName,
        sellerId: listing.seller?.toString?.() || listing.seller?._id?.toString?.() || '',
        status: listing.status || 'active',
        features: listing.features || [],
        images: listing.images || [],
        phone: listing.phone,
        views: listing.views || 0,
        createdAt: listing.createdAt,
        updatedAt: listing.updatedAt,
      };

      // Add vehicle-specific fields
      if (entity === 'vehicles') {
        doc.brand = listing.brand;
        doc.model = listing.model;
        doc.variant = listing.variant;
        doc.year = listing.year;
        doc.kmDriven = listing.kmDriven;
        doc.fuelType = listing.fuelType;
        doc.transmission = listing.transmission;
        doc.ownership = listing.ownership;
        doc.color = listing.color;
      }

      await client.index({
        index,
        id,
        document: doc,
        refresh: 'wait_for', // make searchable immediately
      });

      logger.info(`[ES] Indexed ${entity} listing: ${id}`);
    } catch (err) {
      logger.error(`[ES] Index error for ${entity}:`, err.message);
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Remove a listing from the index (call on delete)
  // ══════════════════════════════════════════════════════════
  static async removeListing(entity, id) {
    if (!getIsConnected()) return;

    const client = getClient();
    const index = INDEX_MAP[entity];
    if (!index) return;

    try {
      await client.delete({ index, id: id.toString(), refresh: 'wait_for' });
      logger.info(`[ES] Removed ${entity} listing: ${id}`);
    } catch (err) {
      if (err.meta?.statusCode !== 404) {
        logger.error(`[ES] Remove error for ${entity}:`, err.message);
      }
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Full-text search with filters
  // ══════════════════════════════════════════════════════════
  static async search(entity, {
    query = '',
    category,
    condition,
    minPrice,
    maxPrice,
    location,
    brand,
    fuelType,
    transmission,
    sort = 'relevance',
    page = 1,
    limit = 50,
  } = {}) {
    if (!getIsConnected()) return null; // fallback to MongoDB

    const client = getClient();
    const index = INDEX_MAP[entity];
    if (!index) return null;

    try {
      const must = [];
      const filter = [];

      // Full-text query with fuzzy matching
      if (query && query.trim()) {
        must.push({
          multi_match: {
            query: query.trim(),
            fields: [
              'title^3',          // title has highest weight
              'description^1.5',
              'brand^2',
              'model^2',
              'features',
              'location',
              'sellerName',
            ],
            type: 'best_fields',
            fuzziness: 'AUTO',    // handles typos
            prefix_length: 1,
            operator: 'or',
            minimum_should_match: '60%',
          },
        });
      }

      // Only active listings
      filter.push({ term: { status: 'active' } });

      // Category filter
      if (category) {
        const cats = category.split(',').map((c) => c.trim());
        filter.push({ terms: { subcategory: cats } });
      }

      // Condition filter
      if (condition) {
        const conds = condition.split(',').map((c) => c.trim());
        filter.push({ terms: { condition: conds } });
      }

      // Price range
      if (minPrice || maxPrice) {
        const range = {};
        if (minPrice) range.gte = Number(minPrice);
        if (maxPrice) range.lte = Number(maxPrice);
        filter.push({ range: { price: range } });
      }

      // Location filter (text match)
      if (location) {
        must.push({ match: { location: { query: location, fuzziness: 'AUTO' } } });
      }

      // Vehicle-specific filters
      if (brand) filter.push({ match: { 'brand.keyword': brand } });
      if (fuelType) filter.push({ term: { fuelType } });
      if (transmission) filter.push({ term: { transmission } });

      // Build sort
      let sortOption;
      switch (sort) {
        case 'price_asc':
          sortOption = [{ price: 'asc' }];
          break;
        case 'price_desc':
          sortOption = [{ price: 'desc' }];
          break;
        case 'oldest':
          sortOption = [{ createdAt: 'asc' }];
          break;
        case 'views':
          sortOption = [{ views: 'desc' }];
          break;
        case 'relevance':
        default:
          sortOption = query ? [{ _score: 'desc' }, { createdAt: 'desc' }] : [{ createdAt: 'desc' }];
      }

      const from = (Number(page) - 1) * Number(limit);

      const body = {
        query: {
          bool: {
            must: must.length > 0 ? must : [{ match_all: {} }],
            filter,
          },
        },
        sort: sortOption,
        from,
        size: Number(limit),
        highlight: {
          fields: {
            title: { pre_tags: ['<mark>'], post_tags: ['</mark>'] },
            description: { pre_tags: ['<mark>'], post_tags: ['</mark>'], fragment_size: 150 },
          },
        },
      };

      const result = await client.search({ index, body });

      const hits = result.hits.hits.map((hit) => ({
        _id: hit._id,
        ...hit._source,
        _score: hit._score,
        _highlights: hit.highlight || {},
      }));

      const total = typeof result.hits.total === 'object'
        ? result.hits.total.value
        : result.hits.total;

      return {
        listings: hits,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
          limit: Number(limit),
        },
        source: 'elasticsearch',
      };
    } catch (err) {
      logger.error(`[ES] Search error for ${entity}:`, err.message);
      return null; // fallback to MongoDB
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Autocomplete / search suggestions
  // ══════════════════════════════════════════════════════════
  static async suggest(entity, query, limit = 5) {
    if (!getIsConnected() || !query) return [];

    const client = getClient();
    const index = INDEX_MAP[entity];
    if (!index) return [];

    try {
      const result = await client.search({
        index,
        body: {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query,
                    fields: ['title^3', 'brand^2', 'model^2', 'description'],
                    type: 'phrase_prefix',
                  },
                },
              ],
              filter: [{ term: { status: 'active' } }],
            },
          },
          _source: ['title', 'price', 'location', 'images', 'brand', 'model'],
          size: limit,
        },
      });

      return result.hits.hits.map((hit) => ({
        _id: hit._id,
        title: hit._source.title,
        price: hit._source.price,
        location: hit._source.location,
        thumbnail: hit._source.images?.[0] || null,
        brand: hit._source.brand,
        model: hit._source.model,
      }));
    } catch (err) {
      logger.error('[ES] Suggest error:', err.message);
      return [];
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Bulk index (for initial data sync from MongoDB)
  // ══════════════════════════════════════════════════════════
  static async bulkIndex(entity, listings) {
    if (!getIsConnected()) return { indexed: 0 };

    const client = getClient();
    const index = INDEX_MAP[entity];
    if (!index) return { indexed: 0 };

    try {
      const operations = listings.flatMap((listing) => {
        const id = listing._id?.toString() || listing.id;
        const doc = {
          title: listing.title,
          description: listing.description,
          price: listing.price,
          category: listing.category,
          subcategory: listing.subcategory,
          condition: listing.condition,
          location: listing.location,
          sellerName: listing.sellerName,
          sellerId: listing.seller?.toString?.() || '',
          status: listing.status || 'active',
          features: listing.features || [],
          images: listing.images || [],
          phone: listing.phone,
          views: listing.views || 0,
          createdAt: listing.createdAt,
          updatedAt: listing.updatedAt,
        };

        if (entity === 'vehicles') {
          doc.brand = listing.brand;
          doc.model = listing.model;
          doc.variant = listing.variant;
          doc.year = listing.year;
          doc.kmDriven = listing.kmDriven;
          doc.fuelType = listing.fuelType;
          doc.transmission = listing.transmission;
          doc.ownership = listing.ownership;
          doc.color = listing.color;
        }

        return [
          { index: { _index: index, _id: id } },
          doc,
        ];
      });

      if (operations.length === 0) return { indexed: 0 };

      const result = await client.bulk({ operations, refresh: true });

      const indexed = result.items?.filter((i) => i.index?.status < 300).length || 0;
      const errors = result.items?.filter((i) => i.index?.status >= 300).length || 0;

      logger.info(`[ES] Bulk indexed ${indexed} ${entity} listings (${errors} errors)`);
      return { indexed, errors };
    } catch (err) {
      logger.error(`[ES] Bulk index error for ${entity}:`, err.message);
      return { indexed: 0, error: err.message };
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Check if Elasticsearch is available
  // ══════════════════════════════════════════════════════════
  static isAvailable() {
    return getIsConnected();
  }
}

module.exports = SearchService;
