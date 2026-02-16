const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const tokenController = require("../controllers/tokenController");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateProfileUpdate,
  validateChangePassword,
  validateOTPVerification,
  validatePasswordSecurity,
  getPasswordRequirements,
} = require("../middleware/validationMiddleware");
const { protect, refreshToken, logout, logoutAll } = require("../middleware/authMiddleware");

// ==================== PASSWORD SECURITY ENDPOINTS ====================
router.get("/password-requirements", getPasswordRequirements);
router.get("/password-expiration", protect, authController.checkPasswordExpiration);

// OTP-based Registration routes
router.post(
  "/register/initiate",
  validateRegister,
  validatePasswordSecurity, // Add password security check
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
  validatePasswordSecurity, // Add password security check
  authController.resetPasswordWithToken,
);

// Password setup for users without passwords
router.post(
  "/setup-password",
  validatePasswordSecurity, // Add password security check
  authController.setupPassword
);

// Legacy routes (keep for compatibility)
router.post(
  "/forgot-password",
  validateForgotPassword,
  authController.forgotPassword,
);
router.put(
  "/reset-password-legacy/:resetToken",
  validateResetPassword,
  validatePasswordSecurity, // Add password security check
  authController.resetPassword,
);

// Google OAuth routes
router.get("/google/client-id", authController.getGoogleClientId);
router.post("/google/token", authController.googleTokenAuth);

// Existing routes
router.post("/login", validateLogin, authController.login);
router.post("/register-legacy", validateRegister, validatePasswordSecurity, authController.register);

// Refresh token & logout routes
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.post("/logout-all", protect, logoutAll);
router.get("/sessions", protect, tokenController.getUserSessions);
router.delete("/sessions/:tokenId", protect, tokenController.revokeSession);

// Admin routes
router.get("/admin/sessions/:userId", protect, tokenController.adminGetUserSessions);
router.post("/admin/cleanup-tokens", protect, tokenController.adminCleanupTokens);

// Check authentication status
router.get("/check", authController.checkAuth);

// Protected routes
router.get("/profile", protect, authController.getProfile);
router.put(
  "/update-profile",
  protect,
  validateProfileUpdate,
  authController.updateProfile,
);
router.put("/upload-profile-image", protect, authController.uploadProfileImage);
router.post(
  "/change-password",
  protect,
  validateChangePassword,
  validatePasswordSecurity, // Add password security check
  authController.changePassword,
);

module.exports = router;