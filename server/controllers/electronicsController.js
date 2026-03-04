const Electronics = require("../models/Electronics");
const mongoose = require("mongoose");
const { logger } = require("../utils/logger");
const redis = require("../config/redis");
const ListingCache = require("../services/listingCacheService");
const SearchService = require("../services/searchService");

// @desc    Create a new electronics listing
// @route   POST /api/electronics
// @access  Private
exports.createElectronics = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      subcategory,
      condition,
      location,
      phone,
      features,
      images,
    } = req.body;

    const listing = await Electronics.create({
      title,
      description,
      price,
      category,
      subcategory,
      condition: condition || "Good",
      location,
      phone,
      features: features || [],
      images: images || [],
      seller: req.user._id,
      sellerName: req.user.firstName
        ? `${req.user.firstName} ${req.user.lastName || ""}`.trim()
        : req.user.email.split("@")[0],
    });

    const populated = await Electronics.findById(listing._id).populate(
      "seller",
      "firstName lastName email profileImage"
    );

    // Cache the new listing in Redis (visible in Upstash dashboard)
    const listingObj = populated.toObject ? populated.toObject() : populated;

    res.status(201).json({
      success: true,
      message: "Electronics listing created successfully",
      listing: populated,
    });

    // Background: cache + log + invalidate + index (non-blocking)
    Promise.all([
      ListingCache.cacheListing('electronics', listingObj),
      ListingCache.logProductPosted('electronics', listingObj),
      ListingCache.invalidateListCaches('electronics'),
      SearchService.indexListing('electronics', listingObj),
    ]).catch((err) => logger.error('[Background] Post-create error:', err.message));
  } catch (error) {
    logger.error("Create electronics error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create electronics listing",
    });
  }
};

// @desc    Get all electronics listings (public)
// @route   GET /api/electronics
// @access  Public
exports.getAllElectronics = async (req, res) => {
  try {
    const {
      search,
      category,
      condition,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 50,
    } = req.query;

    // Build a cache key from the query params
    const queryKey = [
      search || '',
      category || '',
      condition || '',
      minPrice || '',
      maxPrice || '',
      sort || 'newest',
      page,
      limit,
    ].join('|');

    // Check listing cache first
    const cached = await ListingCache.getCachedListingList('electronics', queryKey);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Cache-Source', 'listing-cache');
      return res.status(200).json({
        success: true,
        listings: cached.listings,
        pagination: cached.pagination,
      });
    }

    // Build filter
    const filter = { status: "active" };

    if (search) {
      filter.$text = { $search: search };
    }

    if (category) {
      // Support comma-separated categories
      const cats = category.split(",").map((c) => c.trim());
      filter.subcategory = { $in: cats };
    }

    if (condition) {
      const conds = condition.split(",").map((c) => c.trim());
      filter.condition = { $in: conds };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Build sort
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === "price_asc") sortOption = { price: 1 };
    else if (sort === "price_desc") sortOption = { price: -1 };
    else if (sort === "oldest") sortOption = { createdAt: 1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [listings, total] = await Promise.all([
      Electronics.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .populate("seller", "firstName lastName email profileImage")
        .lean(),
      Electronics.countDocuments(filter),
    ]);

    const pagination = {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    };

    // Send response FIRST, then cache in background (non-blocking)
    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({
      success: true,
      listings,
      pagination,
    });

    // ── Background cache writes (don't block response) ──────────
    Promise.all([
      ListingCache.cacheListingList('electronics', queryKey, listings, pagination),
      ListingCache.prefetchCategoryListings('electronics', listings),
      search ? ListingCache.cacheSearchResults('electronics', search, listings, pagination) : null,
    ]).catch((err) => logger.error('[Cache] Background cache write error:', err.message));
  } catch (error) {
    logger.error("Get all electronics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch electronics listings",
    });
  }
};

// @desc    Get single electronics listing by ID
// @route   GET /api/electronics/:id
// @access  Public
exports.getElectronicsById = async (req, res) => {
  try {
    const listingId = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }

    // Check listing cache first
    const cached = await ListingCache.getCachedListing('electronics', listingId);
    if (cached) {
      // Still increment views via Redis
      try {
        const viewKey = `views:electronics:${listingId}`;
        const views = await redis.incr(viewKey);
        if (views === 1) await redis.expire(viewKey, 86400);
        cached.views = (cached.views || 0) + views;
      } catch (viewErr) {
        logger.debug('View count Redis error:', viewErr.message);
      }

      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Cache-Source', 'listing-cache');
      return res.status(200).json({ success: true, listing: cached });
    }

    const listing = await Electronics.findById(listingId).populate(
      "seller",
      "firstName lastName email profileImage createdAt"
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Electronics listing not found",
      });
    }

    // Increment views via Redis (batched to DB every 50 views)
    try {
      const viewKey = `views:electronics:${listingId}`;
      const views = await redis.incr(viewKey);
      if (views === 1) await redis.expire(viewKey, 86400);
      listing._doc.views = (listing.views || 0) + views;
      if (views % 50 === 0) {
        await Electronics.updateOne(
          { _id: listingId },
          { $inc: { views: views } }
        );
        await redis.set(viewKey, 0);
      }
    } catch (viewErr) {
      logger.debug('View count Redis error:', viewErr.message);
    }

    // Send response FIRST, cache in background
    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({
      success: true,
      listing,
    });

    // Cache in background (non-blocking)
    const listingObj = listing.toObject ? listing.toObject() : listing;
    ListingCache.cacheListing('electronics', listingObj)
      .catch((err) => logger.error('[Cache] Background cache error:', err.message));
  } catch (error) {
    logger.error("Get electronics by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch electronics listing",
    });
  }
};

// @desc    Update electronics listing
// @route   PUT /api/electronics/:id
// @access  Private (owner only)
exports.updateElectronics = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }

    const listing = await Electronics.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Electronics listing not found",
      });
    }

    // Check ownership
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this listing",
      });
    }

    // Update cache with new data
    const oldListingObj = listing.toObject ? listing.toObject() : { ...listing._doc };

    const allowedUpdates = [
      "title",
      "description",
      "price",
      "category",
      "subcategory",
      "condition",
      "location",
      "phone",
      "features",
      "images",
      "status",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        listing[field] = req.body[field];
      }
    });

    await listing.save();

    const updated = await Electronics.findById(listing._id).populate(
      "seller",
      "firstName lastName email profileImage"
    );

    // Update cache with new data
    const updatedObj = updated.toObject ? updated.toObject() : updated;

    res.status(200).json({
      success: true,
      message: "Electronics listing updated successfully",
      listing: updated,
    });

    // Background: cache + log + invalidate + re-index (non-blocking)
    Promise.all([
      ListingCache.cacheListing('electronics', updatedObj),
      ListingCache.logProductEdited('electronics', oldListingObj, updatedObj),
      ListingCache.invalidateListCaches('electronics'),
      SearchService.indexListing('electronics', updatedObj),
    ]).catch((err) => logger.error('[Background] Post-update error:', err.message));
  } catch (error) {
    logger.error("Update electronics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update electronics listing",
    });
  }
};

// @desc    Delete electronics listing
// @route   DELETE /api/electronics/:id
// @access  Private (owner only)
exports.deleteElectronics = async (req, res) => {
  try {
    const listing = await Electronics.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Electronics listing not found",
      });
    }

    // Check ownership
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this listing",
      });
    }

    await Electronics.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Electronics listing deleted successfully",
    });

    // Background: log + invalidate + remove from search (non-blocking)
    Promise.all([
      ListingCache.logProductDeleted('electronics', listing),
      ListingCache.invalidateListingCache('electronics', req.params.id),
      SearchService.removeListing('electronics', req.params.id),
    ]).catch((err) => logger.error('[Background] Post-delete error:', err.message));
  } catch (error) {
    logger.error("Delete electronics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete electronics listing",
    });
  }
};

// @desc    Get my electronics listings
// @route   GET /api/electronics/my-listings
// @access  Private
exports.getMyElectronics = async (req, res) => {
  try {
    const listings = await Electronics.find({ seller: req.user._id })
      .sort({ createdAt: -1 })
      .populate("seller", "firstName lastName email profileImage")
      .lean();

    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    logger.error("Get my electronics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your electronics listings",
    });
  }
};

// @desc    Upload images for electronics listing
// @route   POST /api/electronics/upload-images
// @access  Private
exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }

    const S3Service = require("../services/s3Service");
    const imageUrls = [];

    // Upload images to S3 under the 'electronics' folder
    for (const file of req.files) {
      const result = await S3Service.uploadListingImage(
        file.buffer,
        req.user._id.toString(),
        file.mimetype,
        'electronics'  // → S3 key: electronics/{userId}/{uuid}.webp
      );
      imageUrls.push(result.imageUrl);
    }

    // Cache the uploaded image URLs in Redis (visible in Upstash dashboard)
    await ListingCache.cacheUploadedImages('electronics', req.user._id.toString(), imageUrls);

    res.status(200).json({
      success: true,
      imageUrls,
    });
  } catch (error) {
    logger.error("Upload electronics images error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload images",
    });
  }
};

// @desc    Toggle save/unsave an electronics listing
// @route   POST /api/electronics/:id/toggle-save
// @access  Private
// @desc    Get saved electronics for current user
// @route   GET /api/electronics/saved
// @access  Private
exports.getSavedElectronics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check Redis cache first (visible in Upstash dashboard)
    try {
      const savedKey = `user:${userId}:saved:electronics`;
      const cached = await redis.get(savedKey);
      if (cached) {
        const parsed = typeof cached === 'string' ? JSON.parse(cached) : cached;
        res.setHeader('X-Cache', 'HIT');
        return res.status(200).json({
          success: true,
          listings: parsed.listings || [],
        });
      }
    } catch (cacheErr) {
      logger.debug('Saved electronics cache miss:', cacheErr.message);
    }

    const listings = await Electronics.find({
      savedBy: userId,
      status: "active",
    })
      .sort({ createdAt: -1 })
      .populate("seller", "firstName lastName email profileImage")
      .lean();

    // Store in Redis cache for next time
    try {
      const savedKey = `user:${userId}:saved:electronics`;
      await redis.setex(savedKey, 600, JSON.stringify({
        userId: userId.toString(),
        entity: 'electronics',
        count: listings.length,
        listings: listings.map(l => ({
          _id: l._id,
          title: l.title,
          price: l.price,
          location: l.location,
          condition: l.condition,
          thumbnail: l.images?.[0] || null,
          images: l.images || [],
          sellerName: l.sellerName,
        })),
        updatedAt: new Date().toISOString(),
      }));
    } catch (cacheErr) {
      logger.error('[Cache] Error caching saved electronics:', cacheErr.message);
    }

    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    logger.error("Get saved electronics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch saved electronics",
    });
  }
};

// @desc    Toggle save/unsave an electronics listing
// @route   POST /api/electronics/:id/toggle-save
// @access  Private
exports.toggleSave = async (req, res) => {
  try {
    const listing = await Electronics.findById(req.params.id)
      .populate("seller", "firstName lastName email profileImage");

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Electronics listing not found",
      });
    }

    const userId = req.user._id;
    const isSaved = listing.savedBy.includes(userId);

    if (isSaved) {
      listing.savedBy = listing.savedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      listing.savedBy.push(userId);
    }

    await listing.save();

    // ── Cache saved status in Redis (visible in Upstash dashboard) ──
    try {
      const savedKey = `user:${userId}:saved:electronics`;
      const savedListings = await Electronics.find({
        savedBy: userId,
        status: 'active',
      }).sort({ createdAt: -1 }).populate('seller', 'firstName lastName email profileImage').lean();

      await redis.setex(savedKey, 600, JSON.stringify({
        userId: userId.toString(),
        entity: 'electronics',
        count: savedListings.length,
        listings: savedListings.map(l => ({
          _id: l._id,
          title: l.title,
          price: l.price,
          location: l.location,
          condition: l.condition,
          thumbnail: l.images?.[0] || null,
          images: l.images || [],
          sellerName: l.sellerName,
        })),
        updatedAt: new Date().toISOString(),
      }));

      // Also update the listing cache with the new savedBy array
      const listingObj = listing.toObject ? listing.toObject() : listing;
      await ListingCache.cacheListing('electronics', listingObj);
      // Log save/unsave activity — visible in Upstash as: saved/unsaved:electronics:{title}
      await ListingCache.logProductSaved('electronics', listingObj, userId, !isSaved);

      logger.info(`[Cache] Updated saved electronics for user ${userId} (${savedListings.length} items)`);
    } catch (cacheErr) {
      logger.error('[Cache] Error caching saved electronics:', cacheErr.message);
    }

    res.status(200).json({
      success: true,
      saved: !isSaved,
      message: isSaved ? "Listing unsaved" : "Listing saved",
    });
  } catch (error) {
    logger.error("Toggle save error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle save",
    });
  }
};