const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
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

// Public routes
router.get("/", getAllElectronics);

// Private routes (must be before /:id to avoid conflicts)
router.get("/my-listings", protect, getMyElectronics);
router.get("/saved", protect, getSavedElectronics);
router.post("/", protect, createElectronics);
router.post(
  "/upload-images",
  protect,
  upload.array("images", 6),
  uploadImages
);

// Routes with :id parameter
router.get("/:id", getElectronicsById);
router.put("/:id", protect, updateElectronics);
router.delete("/:id", protect, deleteElectronics);
router.post("/:id/toggle-save", protect, toggleSave);

module.exports = router;
