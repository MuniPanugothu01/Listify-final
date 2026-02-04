const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateProfileUpdate,
  validateChangePassword,
  validateOTPVerification,
} = require("../middleware/validationMiddleware");
const { protect } = require("../middleware/authMiddleware");

// OTP-based Registration routes
router.post(
  "/register/initiate",
  validateRegister,
  authController.initiateRegister,
);
router.post(
  "/register/verify",
  validateOTPVerification,
  authController.verifyOTPAndRegister,
);
router.post("/register/resend-otp", authController.resendOTP);
router.get("/register/status/:email", authController.checkRegistrationStatus);

// OTP-based Forgot Password routes
router.post(
  "/forgot-password/initiate",
  validateForgotPassword,
  authController.initiateForgotPassword,
);
router.post(
  "/forgot-password/verify-otp",
  validateOTPVerification,
  authController.verifyForgotPasswordOTP,
);
router.post(
  "/forgot-password/resend-otp",
  authController.resendForgotPasswordOTP,
);
router.put(
  "/reset-password/:resetToken",
  validateResetPassword,
  authController.resetPasswordWithToken,
);

// Password setup for users without passwords
router.post("/setup-password", authController.setupPassword);

// Legacy routes (keep for compatibility)
router.post(
  "/forgot-password",
  validateForgotPassword,
  authController.forgotPassword,
);
router.put(
  "/reset-password-legacy/:resetToken",
  validateResetPassword,
  authController.resetPassword,
);

// Google OAuth routes
router.get("/google/client-id", authController.getGoogleClientId);
router.post("/google/token", authController.googleTokenAuth);

// Existing routes
router.post("/login", validateLogin, authController.login);
router.post("/register-legacy", validateRegister, authController.register);

// Check authentication status
router.get("/check", authController.checkAuth);

// ==================== UPDATED PROTECTED ROUTES ====================
router.get("/profile", protect, authController.getProfile);
router.put(
  "/update-profile",
  protect,
  validateProfileUpdate,
  authController.updateProfile,
);
router.put("/upload-profile-image", protect, authController.uploadProfileImage); // NEW ROUTE
router.post(
  "/change-password",
  protect,
  validateChangePassword,
  authController.changePassword,
);

module.exports = router;
