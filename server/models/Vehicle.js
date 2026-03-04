const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: ["Vehicles"],
        message: "Category must be Vehicles for this model",
      },
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
      trim: true,
      enum: {
        values: ["Cars", "Bikes", "Cycle", "Spare Parts"],
        message: "Subcategory must be one of: Cars, Bikes, Cycle, Spare Parts",
      },
    },
    condition: {
      type: String,
      enum: ["New", "Like New", "Good", "Fair", "Used"],
      default: "Good",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    phone: {
      type: String,
      trim: true,
    },
    // Vehicle-specific fields
    brand: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    variant: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    kmDriven: {
      type: String,
      trim: true,
    },
    fuelType: {
      type: String,
      trim: true,
    },
    transmission: {
      type: String,
      trim: true,
    },
    ownership: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    // Bike-specific
    engineCC: {
      type: String,
      trim: true,
    },
    // Cycle-specific
    cycleType: {
      type: String,
      trim: true,
    },
    gearCount: {
      type: String,
      trim: true,
    },
    frameSize: {
      type: String,
      trim: true,
    },
    // Spare Parts-specific
    compatibleVehicle: {
      type: String,
      trim: true,
    },
    partCategory: {
      type: String,
      trim: true,
    },
    // Seller information - linked to User model
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerRating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    sellerReviews: {
      type: Number,
      default: 0,
    },
    sellerJoined: {
      type: String,
      default: () => {
        const date = new Date();
        return `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
      },
    },
    // Status
    status: {
      type: String,
      enum: ["active", "sold", "expired", "removed"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Virtual for time since posting
vehicleSchema.virtual("postedTime").get(function () {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
});

// Indexes for efficient queries
vehicleSchema.index({ status: 1, createdAt: -1 });
vehicleSchema.index({ category: 1, status: 1 });
vehicleSchema.index({ seller: 1, status: 1 });
vehicleSchema.index({ price: 1 });
vehicleSchema.index({ savedBy: 1 });
vehicleSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Vehicle", vehicleSchema);
