const Vehicle = require("../models/Vehicle");
const { logger } = require("../utils/logger");
const redis = require("../config/redis");
const ListingCache = require("../services/listingCacheService");
const SearchService = require("../services/searchService");

// @desc    Create a new vehicle listing
// @route   POST /api/vehicles
// @access  Private
exports.createVehicle = async (req, res) => {
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
      brand,
      model,
      variant,
      year,
      kmDriven,
      fuelType,
      transmission,
      ownership,
      color,
    } = req.body;

    const listing = await Vehicle.create({
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
      brand,
      model,
      variant,
      year,
      kmDriven,
      fuelType,
      transmission,
      ownership,
      color,
      seller: req.user._id,
      sellerName: req.user.firstName
        ? `${req.user.firstName} ${req.user.lastName || ""}`.trim()
        : req.user.email.split("@")[0],
    });

    const populated = await Vehicle.findById(listing._id).populate(
      "seller",
      "firstName lastName email profileImage"
    );

    // Cache the new listing in Redis (visible in Upstash dashboard)
    await ListingCache.cacheListing('vehicles', populated.toObject ? populated.toObject() : populated);
    await ListingCache.invalidateListingCache('vehicles');
    // Index in Elasticsearch
    await SearchService.indexListing('vehicles', populated.toObject ? populated.toObject() : populated);

    res.status(201).json({
      success: true,
      message: "Vehicle listing created successfully",
      listing: populated,
    });
  } catch (error) {
    logger.error("Create vehicle error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create vehicle listing",
    });
  }
};

// @desc    Get all vehicle listings (public)
// @route   GET /api/vehicles
// @access  Public
exports.getAllVehicles = async (req, res) => {
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

    // Build cache key from query params
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
    const cached = await ListingCache.getCachedListingList('vehicles', queryKey);
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
    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    else if (sort === "price_desc") sortOption = { price: -1 };
    else if (sort === "oldest") sortOption = { createdAt: 1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [listings, total] = await Promise.all([
      Vehicle.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .populate("seller", "firstName lastName email profileImage")
        .lean(),
      Vehicle.countDocuments(filter),
    ]);

    const pagination = {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    };

    // Store in listing cache (visible in Upstash Redis dashboard)
    await ListingCache.cacheListingList('vehicles', queryKey, listings, pagination);

    // Prefetch every listing + its images into individual cache keys
    // so clicking any listing afterwards is instant from cache
    await ListingCache.prefetchCategoryListings('vehicles', listings);

    if (search) {
      await ListingCache.cacheSearchResults('vehicles', search, listings, pagination);
    }

    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({
      success: true,
      listings,
      pagination,
    });
  } catch (error) {
    logger.error("Get all vehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicle listings",
    });
  }
};

// @desc    Get single vehicle listing by ID
// @route   GET /api/vehicles/:id
// @access  Public
exports.getVehicleById = async (req, res) => {
  try {
    const listingId = req.params.id;

    // Check listing cache first
    const cached = await ListingCache.getCachedListing('vehicles', listingId);
    if (cached) {
      try {
        const viewKey = `views:vehicles:${listingId}`;
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

    const listing = await Vehicle.findById(listingId).populate(
      "seller",
      "firstName lastName email profileImage createdAt"
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Vehicle listing not found",
      });
    }

    // Increment views via Redis (batched to DB every 50 views)
    try {
      const viewKey = `views:vehicles:${listingId}`;
      const views = await redis.incr(viewKey);
      if (views === 1) await redis.expire(viewKey, 86400);
      listing._doc.views = (listing.views || 0) + views;
      if (views % 50 === 0) {
        await Vehicle.updateOne(
          { _id: listingId },
          { $inc: { views: views } }
        );
        await redis.set(viewKey, 0);
      }
    } catch (viewErr) {
      logger.debug('View count Redis error:', viewErr.message);
    }

    // Cache this listing in Redis (visible in Upstash dashboard)
    const listingObj = listing.toObject ? listing.toObject() : listing;
    await ListingCache.cacheListing('vehicles', listingObj);

    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    logger.error("Get vehicle by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicle listing",
    });
  }
};

// @desc    Update vehicle listing
// @route   PUT /api/vehicles/:id
// @access  Private (owner only)
exports.updateVehicle = async (req, res) => {
  try {
    const listing = await Vehicle.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Vehicle listing not found",
      });
    }

    // Check ownership
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this listing",
      });
    }

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
      "brand",
      "model",
      "variant",
      "year",
      "kmDriven",
      "fuelType",
      "transmission",
      "ownership",
      "color",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        listing[field] = req.body[field];
      }
    });

    await listing.save();

    const updated = await Vehicle.findById(listing._id).populate(
      "seller",
      "firstName lastName email profileImage"
    );

    // Update cache with new data
    const updatedObj = updated.toObject ? updated.toObject() : updated;
    await ListingCache.cacheListing('vehicles', updatedObj);
    await ListingCache.invalidateListingCache('vehicles');
    // Re-index in Elasticsearch
    await SearchService.indexListing('vehicles', updatedObj);

    res.status(200).json({
      success: true,
      message: "Vehicle listing updated successfully",
      listing: updated,
    });
  } catch (error) {
    logger.error("Update vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update vehicle listing",
    });
  }
};

// @desc    Delete vehicle listing
// @route   DELETE /api/vehicles/:id
// @access  Private (owner only)
exports.deleteVehicle = async (req, res) => {
  try {
    const listing = await Vehicle.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Vehicle listing not found",
      });
    }

    // Check ownership
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this listing",
      });
    }

    await Vehicle.findByIdAndDelete(req.params.id);

    // Invalidate cache for this listing and all lists
    await ListingCache.invalidateListingCache('vehicles', req.params.id);
    // Remove from Elasticsearch index
    await SearchService.removeListing('vehicles', req.params.id);

    res.status(200).json({
      success: true,
      message: "Vehicle listing deleted successfully",
    });
  } catch (error) {
    logger.error("Delete vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete vehicle listing",
    });
  }
};

// @desc    Get my vehicle listings
// @route   GET /api/vehicles/my-listings
// @access  Private
exports.getMyVehicles = async (req, res) => {
  try {
    const listings = await Vehicle.find({ seller: req.user._id })
      .sort({ createdAt: -1 })
      .populate("seller", "firstName lastName email profileImage")
      .lean();

    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    logger.error("Get my vehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your vehicle listings",
    });
  }
};

// @desc    Upload images for vehicle listing
// @route   POST /api/vehicles/upload-images
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

    // Upload images to S3 under the 'vehicles' folder
    for (const file of req.files) {
      const result = await S3Service.uploadListingImage(
        file.buffer,
        req.user._id.toString(),
        file.mimetype,
        'vehicles'  // → S3 key: vehicles/{userId}/{uuid}.webp
      );
      imageUrls.push(result.imageUrl);
    }

    // Cache the uploaded image URLs in Redis (visible in Upstash dashboard)
    await ListingCache.cacheUploadedImages('vehicles', req.user._id.toString(), imageUrls);

    res.status(200).json({
      success: true,
      imageUrls,
    });
  } catch (error) {
    logger.error("Upload vehicle images error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload images",
    });
  }
};

// @desc    Get saved vehicles for current user
// @route   GET /api/vehicles/saved
// @access  Private
exports.getSavedVehicles = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check Redis cache first (visible in Upstash dashboard)
    try {
      const savedKey = `user:${userId}:saved:vehicles`;
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
      logger.debug('Saved vehicles cache miss:', cacheErr.message);
    }

    const listings = await Vehicle.find({
      savedBy: userId,
      status: "active",
    })
      .sort({ createdAt: -1 })
      .populate("seller", "firstName lastName email profileImage")
      .lean();

    // Store in Redis cache for next time
    try {
      const savedKey = `user:${userId}:saved:vehicles`;
      await redis.setex(savedKey, 600, JSON.stringify({
        userId: userId.toString(),
        entity: 'vehicles',
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
          brand: l.brand,
          model: l.model,
          year: l.year,
        })),
        updatedAt: new Date().toISOString(),
      }));
    } catch (cacheErr) {
      logger.error('[Cache] Error caching saved vehicles:', cacheErr.message);
    }

    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    logger.error("Get saved vehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch saved vehicles",
    });
  }
};

// @desc    Toggle save/unsave a vehicle listing
// @route   POST /api/vehicles/:id/toggle-save
// @access  Private
exports.toggleSave = async (req, res) => {
  try {
    const listing = await Vehicle.findById(req.params.id)
      .populate("seller", "firstName lastName email profileImage");

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Vehicle listing not found",
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
      const savedKey = `user:${userId}:saved:vehicles`;
      const savedListings = await Vehicle.find({
        savedBy: userId,
        status: 'active',
      }).sort({ createdAt: -1 }).populate('seller', 'firstName lastName email profileImage').lean();

      await redis.setex(savedKey, 600, JSON.stringify({
        userId: userId.toString(),
        entity: 'vehicles',
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
          brand: l.brand,
          model: l.model,
          year: l.year,
        })),
        updatedAt: new Date().toISOString(),
      }));

      // Also update the listing cache with the new savedBy array
      const listingObj = listing.toObject ? listing.toObject() : listing;
      await ListingCache.cacheListing('vehicles', listingObj);

      logger.info(`[Cache] Updated saved vehicles for user ${userId} (${savedListings.length} items)`);
    } catch (cacheErr) {
      logger.error('[Cache] Error caching saved vehicles:', cacheErr.message);
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
