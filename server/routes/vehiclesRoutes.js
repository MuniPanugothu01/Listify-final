const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { optimiseImages } = require("../middleware/uploadMiddleware");
const { postingLimiter, uploadLimiter, saveLimiter, searchLimiter } = require("../middleware/rateLimiter");
const { cacheResponseTracked, invalidateAfter } = require("../middleware/cacheMiddleware");
const { validateListingInput } = require("../middleware/validationMiddleware");
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getMyVehicles,
  getSavedVehicles,
  uploadImages,
  toggleSave,
} = require("../controllers/vehiclesController");

// ── Public routes (cached + search-rate-limited) ──
router.get("/", searchLimiter, cacheResponseTracked("vehicles", 120, "list"), getAllVehicles);

// ── Private routes (must be before /:id) ──
router.get("/my-listings", protect, getMyVehicles);
router.get("/saved", protect, getSavedVehicles);

// Create — rate limited (10 posts/min) + validated + cache invalidated
router.post("/", protect, postingLimiter, validateListingInput, invalidateAfter("vehicles"), createVehicle);

// Upload — rate limited (20 uploads/5 min) + auto-optimised images
router.post("/upload-images", protect, uploadLimiter, upload.array("images", 6), optimiseImages, uploadImages);

// ── Routes with :id parameter ──
router.get("/:id", searchLimiter, cacheResponseTracked("vehicles", 300, "detail"), getVehicleById);
router.put("/:id", protect, postingLimiter, validateListingInput, invalidateAfter("vehicles"), updateVehicle);
router.delete("/:id", protect, invalidateAfter("vehicles"), deleteVehicle);
router.post("/:id/toggle-save", protect, saveLimiter, toggleSave);

module.exports = router;
