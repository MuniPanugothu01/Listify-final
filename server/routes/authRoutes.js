const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const tokenController = require("../controllers/tokenController");
const upload = require("../middleware/uploadMiddleware");
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
const {
  protect,
  refreshToken,
  logout,
  logoutAll,
} = require("../middleware/authMiddleware");

// ==================== PASSWORD SECURITY ENDPOINTS ====================
router.get("/password-requirements", getPasswordRequirements);
router.get(
  "/password-expiration",
  protect,
  authController.checkPasswordExpiration,
);

// ==================== PROFILE IMAGE UPLOAD ROUTES ====================
router.post(
  "/profile/upload-image",
  protect,
  upload.single("image"),
  authController.uploadProfileImage,
);

router.post(
  "/profile/generate-upload-url",
  protect,
  authController.generateUploadUrl,
);

// ==================== DEVICE & SESSION ROUTES ====================
router.get("/devices", protect, authController.getUserDevices);
router.get("/login-history", protect, authController.getLoginHistory);
router.delete("/devices/:deviceId", protect, authController.revokeDevice);

// ==================== OTP-based Registration routes ====================
router.post(
  "/register/initiate",
  validateRegister,
  validatePasswordSecurity,
  authController.initiateRegister,
);
router.post(
  "/register/verify",
  validateOTPVerification,
  authController.verifyOTPAndRegister,
);
router.post("/register/resend-otp", authController.resendOTP);
router.get("/register/status/:email", authController.checkRegistrationStatus);

// ==================== OTP-based Forgot Password routes ====================
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
  validatePasswordSecurity,
  authController.resetPasswordWithToken,
);

// ==================== Password setup for users without passwords ====================
router.post(
  "/setup-password",
  validatePasswordSecurity,
  authController.setupPassword,
);

// ==================== Legacy routes (keep for compatibility) ====================
router.post(
  "/forgot-password",
  validateForgotPassword,
  authController.forgotPassword,
);
router.put(
  "/reset-password-legacy/:resetToken",
  validateResetPassword,
  validatePasswordSecurity,
  authController.resetPassword,
);

// ==================== Google OAuth routes ====================
router.get("/google/client-id", authController.getGoogleClientId);
router.post("/google/token", authController.googleTokenAuth);

// ==================== Existing routes ====================
router.post("/login", validateLogin, authController.login);
router.post(
  "/register-legacy",
  validateRegister,
  validatePasswordSecurity,
  authController.register,
);

// ==================== Refresh token & logout routes ====================
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.post("/logout-all", protect, logoutAll);
router.get("/sessions", protect, tokenController.getUserSessions);
router.delete("/sessions/:tokenId", protect, tokenController.revokeSession);

// ==================== Admin routes ====================
router.get(
  "/admin/sessions/:userId",
  protect,
  tokenController.adminGetUserSessions,
);
router.post(
  "/admin/cleanup-tokens",
  protect,
  tokenController.adminCleanupTokens,
);

// ==================== Check authentication status ====================
router.get("/check", authController.checkAuth);

// ==================== Protected routes ====================
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
  validatePasswordSecurity,
  authController.changePassword,
);

// DEBUG: Check what's stored in Redis for a token
router.get("/debug/check-token/:token", async (req, res) => {
  try {
    const redis = require("../config/redis");
    const { token } = req.params;

    console.log("🔍 Debug: Checking token:", token);

    // Check all possible keys
    const resetKey = `reset:${token}`;
    const resetEmailKey = `reset_email:${token}`;

    const resetData = await redis.get(resetKey);
    const resetEmail = await redis.get(resetEmailKey);

    console.log("📦 Reset key:", resetKey);
    console.log("📦 Reset data type:", typeof resetData);
    console.log("📦 Reset data:", resetData);
    console.log("📦 Reset email:", resetEmail);

    let parsedData = null;
    let parseError = null;

    if (resetData) {
      try {
        if (typeof resetData === "string") {
          parsedData = JSON.parse(resetData);
        } else {
          parsedData = resetData;
        }
      } catch (e) {
        parseError = e.message;
        console.log("❌ Failed to parse resetData:", e.message);
      }
    }

    res.json({
      success: true,
      token,
      resetKey,
      resetEmailKey,
      resetDataType: typeof resetData,
      resetData,
      resetEmail,
      parsedData,
      parseError,
    });
  } catch (error) {
    console.error("Debug error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
