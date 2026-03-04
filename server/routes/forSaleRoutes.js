const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { optimiseImages } = require("../middleware/uploadMiddleware");
const {
  postingLimiter,
  uploadLimiter,
  saveLimiter,
  searchLimiter,
} = require("../middleware/rateLimiter");
const {
  cacheResponseTracked,
  invalidateAfter,
} = require("../middleware/cacheMiddleware");
const { validateListingInput } = require("../middleware/validationMiddleware");
const {
  createForSale,
  getAllForSale,
  getForSaleById,
  updateForSale,
  deleteForSale,
  getMyForSale,
  getSavedForSale,
  uploadImages,
  toggleSave,
} = require("../controllers/forSaleController");

// ── Public routes (cached + search-rate-limited) ──
router.get(
  "/",
  searchLimiter,
  cacheResponseTracked("forsale", 120, "list"),
  getAllForSale
);

// ── Private routes (must be before /:id to avoid conflicts) ──
router.get("/my-listings", protect, getMyForSale);
router.get("/saved", protect, getSavedForSale);

// Create — rate limited (10 posts/min) + validated + cache invalidated
router.post(
  "/",
  protect,
  postingLimiter,
  validateListingInput,
  invalidateAfter("forsale"),
  createForSale
);

// Upload — rate limited (20 uploads/5 min) + auto-optimised images
router.post(
  "/upload-images",
  protect,
  uploadLimiter,
  upload.array("images", 6),
  optimiseImages,
  uploadImages
);

// ── Routes with :id parameter ──
router.get(
  "/:id",
  searchLimiter,
  cacheResponseTracked("forsale", 300, "detail"),
  getForSaleById
);
router.put(
  "/:id",
  protect,
  postingLimiter,
  validateListingInput,
  invalidateAfter("forsale"),
  updateForSale
);
router.delete("/:id", protect, invalidateAfter("forsale"), deleteForSale);
router.post("/:id/toggle-save", protect, saveLimiter, toggleSave);

module.exports = router;
