const ForSale = require("../models/ForSale");
const mongoose = require("mongoose");
const { logger } = require("../utils/logger");
const redis = require("../config/redis");
const ListingCache = require("../services/listingCacheService");
const SearchService = require("../services/searchService");

// ── Valid categories & subcategories (server-side enforcement) ────
const VALID_CATEGORIES = {
  Mobiles: ["Mobile Phones", "Accessories", "Tablets"],
  Furniture: [
    "Sofas & Dining",
    "Beds & Wardrobes",
    "Tables & Chairs",
    "Home Decor",
    "Office Furniture",
  ],
  Fashion: [
    "Men's Clothing",
    "Women's Clothing",
    "Kids Clothing",
    "Footwear",
    "Watches",
    "Accessories",
  ],
  "Books, Sports": [
    "Books",
    "Gym & Fitness",
    "Sports Equipment",
    "Musical Instruments",
    "Hobbies",
    "Cycling",
  ],
};

/**
 * Validate category + subcategory combination server-side.
 */
const validateCategorySubcategory = (category, subcategory) => {
  const validSubs = VALID_CATEGORIES[category];
  if (!validSubs) {
    return `Invalid category: ${category}. Must be one of: ${Object.keys(VALID_CATEGORIES).join(", ")}`;
  }
  if (!validSubs.includes(subcategory)) {
    return `Invalid subcategory "${subcategory}" for category "${category}". Must be one of: ${validSubs.join(", ")}`;
  }
  return null;
};

// @desc    Create a new for-sale listing
// @route   POST /api/forsale
// @access  Private
exports.createForSale = async (req, res) => {
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
      // Mobiles
      brand,
      model,
      storage,
      ram,
      screenSize,
      batteryHealth,
      warranty,
      color,
      // Furniture
      material,
      dimensions,
      weight,
      assemblyRequired,
      numberOfPieces,
      // Fashion
      size,
      gender,
      fabricType,
      // Books, Sports
      author,
      isbn,
      publisher,
      edition,
      sportType,
    } = req.body;

    // Server-side category validation
    const catError = validateCategorySubcategory(category, subcategory);
    if (catError) {
      return res.status(400).json({ success: false, message: catError });
    }

    const listing = await ForSale.create({
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
      // Mobiles
      brand,
      model,
      storage,
      ram,
      screenSize,
      batteryHealth,
      warranty,
      color,
      // Furniture
      material,
      dimensions,
      weight,
      assemblyRequired,
      numberOfPieces,
      // Fashion
      size,
      gender,
      fabricType,
      // Books, Sports
      author,
      isbn,
      publisher,
      edition,
      sportType,
      // Seller
      seller: req.user._id,
      sellerName: req.user.firstName
        ? `${req.user.firstName} ${req.user.lastName || ""}`.trim()
        : req.user.email.split("@")[0],
    });

    const populated = await ForSale.findById(listing._id).populate(
      "seller",
      "firstName lastName email profileImage"
    );

    const listingObj = populated.toObject ? populated.toObject() : populated;

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing: populated,
    });

    // Background: cache + log + invalidate + index (non-blocking)
    Promise.all([
      ListingCache.cacheListing("forsale", listingObj),
      ListingCache.logProductPosted("forsale", listingObj),
      ListingCache.invalidateListCaches("forsale"),
      SearchService.indexListing("forsale", listingObj),
    ]).catch((err) =>
      logger.error("[Background] Post-create forsale error:", err.message)
    );
  } catch (error) {
    logger.error("Create forsale error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create listing",
    });
  }
};

// @desc    Get all for-sale listings (public)
// @route   GET /api/forsale
// @access  Public
exports.getAllForSale = async (req, res) => {
  try {
    const {
      search,
      category,
      subcategory,
      condition,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 50,
    } = req.query;

    // Build cache key
    const queryKey = [
      search || "",
      category || "",
      subcategory || "",
      condition || "",
      minPrice || "",
      maxPrice || "",
      sort || "newest",
      page,
      limit,
    ].join("|");

    // Check listing cache first
    const cached = await ListingCache.getCachedListingList("forsale", queryKey);
    if (cached) {
      res.setHeader("X-Cache", "HIT");
      res.setHeader("X-Cache-Source", "listing-cache");
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
      filter.category = { $in: cats };
    }

    if (subcategory) {
      const subs = subcategory.split(",").map((s) => s.trim());
      filter.subcategory = { $in: subs };
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
      ForSale.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .populate("seller", "firstName lastName email profileImage")
        .lean(),
      ForSale.countDocuments(filter),
    ]);

    const pagination = {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    };

    // Send response FIRST, then cache in background
    res.setHeader("X-Cache", "MISS");
    res.status(200).json({
      success: true,
      listings,
      pagination,
    });

    // Background cache writes (non-blocking)
    Promise.all([
      ListingCache.cacheListingList("forsale", queryKey, listings, pagination),
      ListingCache.prefetchCategoryListings("forsale", listings),
      search
        ? ListingCache.cacheSearchResults("forsale", search, listings, pagination)
        : null,
    ]).catch((err) =>
      logger.error("[Cache] Background forsale cache error:", err.message)
    );
  } catch (error) {
    logger.error("Get all forsale error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch listings",
    });
  }
};

// @desc    Get single for-sale listing by ID
// @route   GET /api/forsale/:id
// @access  Public
exports.getForSaleById = async (req, res) => {
  try {
    const listingId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }

    // Check listing cache
    const cached = await ListingCache.getCachedListing("forsale", listingId);
    if (cached) {
      try {
        const viewKey = `views:forsale:${listingId}`;
        const views = await redis.incr(viewKey);
        if (views === 1) await redis.expire(viewKey, 86400);
        cached.views = (cached.views || 0) + views;
      } catch (viewErr) {
        logger.debug("View count Redis error:", viewErr.message);
      }

      res.setHeader("X-Cache", "HIT");
      res.setHeader("X-Cache-Source", "listing-cache");
      return res.status(200).json({ success: true, listing: cached });
    }

    const listing = await ForSale.findById(listingId).populate(
      "seller",
      "firstName lastName email profileImage createdAt"
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Increment views via Redis
    try {
      const viewKey = `views:forsale:${listingId}`;
      const views = await redis.incr(viewKey);
      if (views === 1) await redis.expire(viewKey, 86400);
      listing._doc.views = (listing.views || 0) + views;
      if (views % 50 === 0) {
        await ForSale.updateOne(
          { _id: listingId },
          { $inc: { views: views } }
        );
        await redis.set(viewKey, 0);
      }
    } catch (viewErr) {
      logger.debug("View count Redis error:", viewErr.message);
    }

    // Send response FIRST, cache in background
    res.setHeader("X-Cache", "MISS");
    res.status(200).json({
      success: true,
      listing,
    });

    const listingObj = listing.toObject ? listing.toObject() : listing;
    ListingCache.cacheListing("forsale", listingObj).catch((err) =>
      logger.error("[Cache] Background forsale cache error:", err.message)
    );
  } catch (error) {
    logger.error("Get forsale by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch listing",
    });
  }
};

// @desc    Update for-sale listing
// @route   PUT /api/forsale/:id
// @access  Private (owner only)
exports.updateForSale = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }

    const listing = await ForSale.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Check ownership
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this listing",
      });
    }

    const oldListingObj = listing.toObject ? listing.toObject() : { ...listing._doc };

    // Server-side category validation if category/subcategory is being updated
    if (req.body.category || req.body.subcategory) {
      const cat = req.body.category || listing.category;
      const sub = req.body.subcategory || listing.subcategory;
      const catError = validateCategorySubcategory(cat, sub);
      if (catError) {
        return res.status(400).json({ success: false, message: catError });
      }
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
      // Mobiles
      "brand",
      "model",
      "storage",
      "ram",
      "screenSize",
      "batteryHealth",
      "warranty",
      "color",
      // Furniture
      "material",
      "dimensions",
      "weight",
      "assemblyRequired",
      "numberOfPieces",
      // Fashion
      "size",
      "gender",
      "fabricType",
      // Books, Sports
      "author",
      "isbn",
      "publisher",
      "edition",
      "sportType",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        listing[field] = req.body[field];
      }
    });

    await listing.save();

    const updated = await ForSale.findById(listing._id).populate(
      "seller",
      "firstName lastName email profileImage"
    );

    const updatedObj = updated.toObject ? updated.toObject() : updated;

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing: updated,
    });

    // Background: cache + log + invalidate + re-index (non-blocking)
    Promise.all([
      ListingCache.cacheListing("forsale", updatedObj),
      ListingCache.logProductEdited("forsale", oldListingObj, updatedObj),
      ListingCache.invalidateListCaches("forsale"),
      SearchService.indexListing("forsale", updatedObj),
    ]).catch((err) =>
      logger.error("[Background] Post-update forsale error:", err.message)
    );
  } catch (error) {
    logger.error("Update forsale error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update listing",
    });
  }
};

// @desc    Delete for-sale listing
// @route   DELETE /api/forsale/:id
// @access  Private (owner only)
exports.deleteForSale = async (req, res) => {
  try {
    const listing = await ForSale.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Check ownership
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this listing",
      });
    }

    await ForSale.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });

    // Background: log + invalidate + remove from search (non-blocking)
    Promise.all([
      ListingCache.logProductDeleted("forsale", listing),
      ListingCache.invalidateListingCache("forsale", req.params.id),
      SearchService.removeListing("forsale", req.params.id),
    ]).catch((err) =>
      logger.error("[Background] Post-delete forsale error:", err.message)
    );
  } catch (error) {
    logger.error("Delete forsale error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete listing",
    });
  }
};

// @desc    Get my for-sale listings
// @route   GET /api/forsale/my-listings
// @access  Private
exports.getMyForSale = async (req, res) => {
  try {
    const listings = await ForSale.find({ seller: req.user._id })
      .sort({ createdAt: -1 })
      .populate("seller", "firstName lastName email profileImage")
      .lean();

    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    logger.error("Get my forsale error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your listings",
    });
  }
};

// @desc    Upload images for for-sale listing
// @route   POST /api/forsale/upload-images
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

    for (const file of req.files) {
      const result = await S3Service.uploadListingImage(
        file.buffer,
        req.user._id.toString(),
        file.mimetype,
        "forsale" // → S3 key: forsale/{userId}/{uuid}.webp
      );
      imageUrls.push(result.imageUrl);
    }

    // Cache uploaded image URLs in Redis
    await ListingCache.cacheUploadedImages(
      "forsale",
      req.user._id.toString(),
      imageUrls
    );

    res.status(200).json({
      success: true,
      imageUrls,
    });
  } catch (error) {
    logger.error("Upload forsale images error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload images",
    });
  }
};

// @desc    Get saved for-sale listings for current user
// @route   GET /api/forsale/saved
// @access  Private
exports.getSavedForSale = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check Redis cache first
    try {
      const savedKey = `user:${userId}:saved:forsale`;
      const cached = await redis.get(savedKey);
      if (cached) {
        const parsed = typeof cached === "string" ? JSON.parse(cached) : cached;
        res.setHeader("X-Cache", "HIT");
        return res.status(200).json({
          success: true,
          listings: parsed.listings || [],
        });
      }
    } catch (cacheErr) {
      logger.debug("Saved forsale cache miss:", cacheErr.message);
    }

    const listings = await ForSale.find({
      savedBy: userId,
      status: "active",
    })
      .sort({ createdAt: -1 })
      .populate("seller", "firstName lastName email profileImage")
      .lean();

    // Store in Redis cache
    try {
      const savedKey = `user:${userId}:saved:forsale`;
      await redis.setex(
        savedKey,
        600,
        JSON.stringify({
          userId: userId.toString(),
          entity: "forsale",
          count: listings.length,
          listings: listings.map((l) => ({
            _id: l._id,
            title: l.title,
            price: l.price,
            location: l.location,
            condition: l.condition,
            category: l.category,
            subcategory: l.subcategory,
            thumbnail: l.images?.[0] || null,
            images: l.images || [],
            sellerName: l.sellerName,
          })),
          updatedAt: new Date().toISOString(),
        })
      );
    } catch (cacheErr) {
      logger.error("[Cache] Error caching saved forsale:", cacheErr.message);
    }

    res.setHeader("X-Cache", "MISS");
    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    logger.error("Get saved forsale error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch saved listings",
    });
  }
};

// @desc    Toggle save/unsave a for-sale listing
// @route   POST /api/forsale/:id/toggle-save
// @access  Private
exports.toggleSave = async (req, res) => {
  try {
    const listing = await ForSale.findById(req.params.id).populate(
      "seller",
      "firstName lastName email profileImage"
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
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

    // Cache saved status in Redis
    try {
      const savedKey = `user:${userId}:saved:forsale`;
      const savedListings = await ForSale.find({
        savedBy: userId,
        status: "active",
      })
        .sort({ createdAt: -1 })
        .populate("seller", "firstName lastName email profileImage")
        .lean();

      await redis.setex(
        savedKey,
        600,
        JSON.stringify({
          userId: userId.toString(),
          entity: "forsale",
          count: savedListings.length,
          listings: savedListings.map((l) => ({
            _id: l._id,
            title: l.title,
            price: l.price,
            location: l.location,
            condition: l.condition,
            category: l.category,
            subcategory: l.subcategory,
            thumbnail: l.images?.[0] || null,
            images: l.images || [],
            sellerName: l.sellerName,
          })),
          updatedAt: new Date().toISOString(),
        })
      );

      const listingObj = listing.toObject ? listing.toObject() : listing;
      await ListingCache.cacheListing("forsale", listingObj);
      await ListingCache.logProductSaved(
        "forsale",
        listingObj,
        userId,
        !isSaved
      );

      logger.info(
        `[Cache] Updated saved forsale for user ${userId} (${savedListings.length} items)`
      );
    } catch (cacheErr) {
      logger.error("[Cache] Error caching saved forsale:", cacheErr.message);
    }

    res.status(200).json({
      success: true,
      saved: !isSaved,
      message: isSaved ? "Listing unsaved" : "Listing saved",
    });
  } catch (error) {
    logger.error("Toggle save forsale error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle save",
    });
  }
};
