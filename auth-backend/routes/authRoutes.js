const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { 
  validateRegister, 
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateProfileUpdate,
  validateChangePassword
} = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

// OTP-based Registration routes
router.post('/register/initiate', validateRegister, authController.initiateRegister);
router.post('/register/verify', authController.verifyOTPAndRegister);
router.post('/register/resend-otp', authController.resendOTP);
router.get('/register/status/:email', authController.checkRegistrationStatus);

// Existing routes
router.post('/login', validateLogin, authController.login);
router.post('/forgot-password', validateForgotPassword, authController.forgotPassword);
router.put('/reset-password/:resetToken', validateResetPassword, authController.resetPassword);

// Protected routes
router.get('/profile', protect, authController.getProfile);
router.put('/update-profile', protect, validateProfileUpdate, authController.updateProfile);
router.post('/change-password', protect, validateChangePassword, authController.changePassword);

module.exports = router;