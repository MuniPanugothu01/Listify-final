const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { optimiseImages } = require("../middleware/uploadMiddleware");
const { postingLimiter, uploadLimiter, saveLimiter, searchLimiter } = require("../middleware/rateLimiter");
const { cacheResponseTracked, invalidateAfter } = require("../middleware/cacheMiddleware");
const { validateListingInput } = require("../middleware/validationMiddleware");
const {
  createElectronics,
  getAllElectronics,
  getElectronicsById,
  updateElectronics,
  deleteElectronics,
  getMyElectronics,
  getSavedElectronics,
  uploadImages,
  toggleSave,
} = require("../controllers/electronicsController");

// ── Public routes (cached + search-rate-limited) ──
router.get("/", searchLimiter, cacheResponseTracked("electronics", 120, "list"), getAllElectronics);

// ── Private routes (must be before /:id to avoid conflicts) ──
router.get("/my-listings", protect, getMyElectronics);
router.get("/saved", protect, getSavedElectronics);

// Create — rate limited (10 posts/min) + validated + cache invalidated
router.post("/", protect, postingLimiter, validateListingInput, invalidateAfter("electronics"), createElectronics);

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
router.get("/:id", searchLimiter, cacheResponseTracked("electronics", 300, "detail"), getElectronicsById);
router.put("/:id", protect, postingLimiter, validateListingInput, invalidateAfter("electronics"), updateElectronics);
router.delete("/:id", protect, invalidateAfter("electronics"), deleteElectronics);
router.post("/:id/toggle-save", protect, saveLimiter, toggleSave);

module.exports = router;
