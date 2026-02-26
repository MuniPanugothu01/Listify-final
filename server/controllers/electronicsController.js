const Electronics = require("../models/Electronics");
const { logger } = require("../utils/logger");

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

    res.status(201).json({
      success: true,
      message: "Electronics listing created successfully",
      listing: populated,
    });
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
        .populate("seller", "firstName lastName email profileImage"),
      Electronics.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      listings,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit),
      },
    });
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
    const listing = await Electronics.findById(req.params.id).populate(
      "seller",
      "firstName lastName email profileImage createdAt"
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Electronics listing not found",
      });
    }

    // Increment views
    listing.views += 1;
    await listing.save();

    res.status(200).json({
      success: true,
      listing,
    });
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

    res.status(200).json({
      success: true,
      message: "Electronics listing updated successfully",
      listing: updated,
    });
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
      .populate("seller", "firstName lastName email profileImage");

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

    for (const file of req.files) {
      const result = await S3Service.uploadListingImage(
        file.buffer,
        req.user._id.toString(),
        file.mimetype
      );
      imageUrls.push(result.imageUrl);
    }

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
    const listings = await Electronics.find({
      savedBy: req.user._id,
      status: "active",
    })
      .sort({ createdAt: -1 })
      .populate("seller", "firstName lastName email profileImage");

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
    const listing = await Electronics.findById(req.params.id);

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