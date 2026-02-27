const Vehicle = require("../models/Vehicle");
const { logger } = require("../utils/logger");

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
        .populate("seller", "firstName lastName email profileImage"),
      Vehicle.countDocuments(filter),
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
    const listing = await Vehicle.findById(req.params.id).populate(
      "seller",
      "firstName lastName email profileImage createdAt"
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Vehicle listing not found",
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
      .populate("seller", "firstName lastName email profileImage");

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
    const listings = await Vehicle.find({
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
    const listing = await Vehicle.findById(req.params.id);

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
