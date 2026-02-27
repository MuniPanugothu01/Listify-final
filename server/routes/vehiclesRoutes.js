const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
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

// Public routes
router.get("/", getAllVehicles);

// Private routes (must be before /:id to avoid conflicts)
router.get("/my-listings", protect, getMyVehicles);
router.get("/saved", protect, getSavedVehicles);
router.post("/", protect, createVehicle);
router.post(
  "/upload-images",
  protect,
  upload.array("images", 6),
  uploadImages
);

// Routes with :id parameter
router.get("/:id", getVehicleById);
router.put("/:id", protect, updateVehicle);
router.delete("/:id", protect, deleteVehicle);
router.post("/:id/toggle-save", protect, toggleSave);

module.exports = router;
