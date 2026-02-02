require("dotenv").config();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const RedisService = require("../services/redisService");
const EmailService = require("../services/emailService");
const OTPGenerator = require("../utils/otpGenerator");
const bcrypt = require("bcryptjs");
const { logger } = require("../utils/logger");
const { handleGoogleAuth } = require("../services/googleAuth.OAuth");

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Helper to send token response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  });
};

// ==================== GOOGLE AUTH ====================

// Simple Google client ID endpoint for frontend
exports.getGoogleClientId = (req, res) => {
  try {
    console.log("🔍 Google Client ID endpoint called");
    console.log("📋 Headers:", req.headers);
    console.log("🌐 Origin:", req.headers.origin);
    console.log("🔐 GOOGLE_CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);

    // If client ID exists, show first few chars (for security, don't log full ID)
    if (process.env.GOOGLE_CLIENT_ID) {
      console.log(
        "✅ GOOGLE_CLIENT_ID (first 10 chars):",
        process.env.GOOGLE_CLIENT_ID.substring(0, 10) + "...",
      );
      console.log(
        "✅ GOOGLE_CLIENT_ID full format check:",
        process.env.GOOGLE_CLIENT_ID.includes(".apps.googleusercontent.com"),
      );
    } else {
      console.log("❌ GOOGLE_CLIENT_ID is NOT SET in environment variables");
      console.log(
        "📝 Available environment variables:",
        Object.keys(process.env).filter((key) => key.includes("GOOGLE")),
      );
    }

    // Check for CORS headers
    console.log("🔄 Checking CORS headers...");
    console.log(
      "  Access-Control-Allow-Origin header:",
      res.get("Access-Control-Allow-Origin"),
    );

    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.log("❌ ERROR: GOOGLE_CLIENT_ID is not configured");
      return res.status(500).json({
        success: false,
        message: "Google authentication is not configured on the server",
        debug:
          process.env.NODE_ENV === "development"
            ? "GOOGLE_CLIENT_ID environment variable is missing"
            : undefined,
      });
    }

    // ADDED: Validation for Google Client ID format
    if (!clientId.includes(".apps.googleusercontent.com")) {
      console.log("⚠️ WARNING: GOOGLE_CLIENT_ID may be in wrong format");
      console.log("Expected format: xxx-xxx.apps.googleusercontent.com");
    }

    console.log("✅ Sending Google Client ID response");

    res.status(200).json({
      success: true,
      clientId: clientId,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      formatValid: clientId.includes(".apps.googleusercontent.com"),
    });
  } catch (error) {
    console.error("🔥 Error in getGoogleClientId:", error);
    logger.error("Get Google client ID error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Google OAuth - Verify ID token from frontend
exports.googleTokenAuth = async (req, res) => {
  try {
    const { token: googleToken } = req.body;

    if (!googleToken) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    console.log("🔍 Processing Google token...");

    // Use the Google auth service
    const { user, isNew } = await handleGoogleAuth(googleToken, req);

    const message = isNew
      ? "Account created with Google"
      : "Google login successful";

    const statusCode = isNew ? 201 : 200;

    console.log("✅ Google token auth successful:", {
      email: user.email,
      isNew,
    });

    logger.info("Google token auth successful:", {
      email: user.email,
      isNew,
    });

    return sendTokenResponse(user, statusCode, res, message);
  } catch (error) {
    console.error("❌ Google Token Auth Error:", error.message);
    logger.error("Google Token Auth Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid Google token",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== LOGIN/REGISTRATION ====================

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login data received:", { email, password });
    logger.info("🔍 Login attempt for:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({email});
    console.log("User found:", user);
    // logger.info("👤 User found:", user ? user.email : "No user");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is a Google user
    if (user.provider === "google") {
      return res.status(400).json({
        success: false,
        message: "This account uses Google login. Please sign in with Google.",
        provider: "google",
      });
    }

    // Check if password exists (for users who might have null password)
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "Please reset your password or use Google login",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last login if method exists
    if (user.updateLastLogin && typeof user.updateLastLogin === "function") {
      await user.updateLastLogin(req.ip, req.get("user-agent"));
    }

    sendTokenResponse(user, 200, res, "Login successful");
  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Step 1: Initiate registration (send OTP)
exports.initiateRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    logger.info("🔍 Registration attempt:", { email, name });

    // Check if all required fields are provided
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: name, email, password, confirmPassword",
      });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Check password minimum length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if user already exists in database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login instead.",
      });
    }

    // Check if email already has pending registration
    const pendingRegistration =
      await RedisService.getPendingRegistration(email);
    if (pendingRegistration) {
      const now = new Date();
      const createdAt = new Date(pendingRegistration.createdAt);
      const expiresAt = new Date(createdAt.getTime() + 10 * 60 * 1000); // 10 minutes

      if (now < expiresAt) {
        return res.status(400).json({
          success: false,
          message:
            "Registration already in progress. Please check your email for OTP.",
          expiresIn: Math.ceil((expiresAt - now) / 1000),
        });
      } else {
        // Delete expired registration
        await RedisService.deletePendingRegistration(email);
      }
    }

    // Check rate limiting for email
    const emailBlocked = await RedisService.checkEmailBlocked(email);
    if (emailBlocked) {
      return res.status(429).json({
        success: false,
        message: "Too many registration attempts. Please try again in 1 hour.",
      });
    }

    // Generate OTP
    const otp = OTPGenerator.generateOTP();
    logger.info(`✅ Generated OTP for ${email}: ${otp}`);

    // Hash password before storing in Redis
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store user data in Redis temporarily
    const userData = {
      name,
      email,
      password: hashedPassword,
      otpAttempts: 0,
      resendCount: 0,
      createdAt: new Date().toISOString(),
      lastResendTime: null,
    };

    const storeResult = await RedisService.storePendingRegistration(
      email,
      userData,
    );
    if (!storeResult) {
      throw new Error("Failed to store registration data");
    }

    // Store OTP separately for verification
    const otpStoreResult = await RedisService.storeOTP(email, otp);
    if (!otpStoreResult) {
      throw new Error("Failed to store OTP");
    }

    // Set rate limiting attempts
    await RedisService.incrementRegistrationAttempts(email);

    // ✅ SEND REAL EMAIL
    try {
      logger.info(`📤 Sending OTP email to: ${email}`);
      await EmailService.sendOTPEmail(email, name, otp);
      logger.info(`✅ Email sent successfully to ${email}`);
    } catch (emailError) {
      logger.error("❌ Failed to send email:", emailError.message);

      // Clean up if email fails
      await RedisService.deletePendingRegistration(email);
      await RedisService.deleteOTP(email);

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. " + emailError.message,
        error: emailError.message,
      });
    }

    res.status(200).json({
      success: true,
      message:
        "OTP sent to your email. Please verify to complete registration.",
      email: email,
      expiresIn: 600, // 10 minutes in seconds
    });
  } catch (error) {
    logger.error("❌ Registration initiation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Step 2: Verify OTP and complete registration
exports.verifyOTPAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Get pending registration data
    const pendingData = await RedisService.getPendingRegistration(email);
    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message:
          "Registration session expired or not found. Please start over.",
      });
    }

    // Check OTP attempts
    if (pendingData.otpAttempts >= 3) {
      // Too many attempts, delete pending registration
      await RedisService.deletePendingRegistration(email);
      return res.status(400).json({
        success: false,
        message: "Too many OTP attempts. Please start registration again.",
      });
    }

    // Verify OTP
    const otpVerification = await RedisService.verifyOTP(email, otp);
    if (!otpVerification.valid) {
      // Increment OTP attempts
      pendingData.otpAttempts += 1;
      await RedisService.storePendingRegistration(email, pendingData);

      return res.status(400).json({
        success: false,
        message: otpVerification.reason,
        attemptsRemaining: 3 - pendingData.otpAttempts,
      });
    }

    // Double-check if user still doesn't exist in database
    const userExists = await User.findOne({ email });
    if (userExists) {
      await RedisService.deletePendingRegistration(email);
      return res.status(400).json({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // Create user in database FIRST
    const user = await User.create({
      name: pendingData.name,
      email: pendingData.email,
      password: pendingData.password,
    });

    logger.info(`✅ User created in database: ${email}`);

    // Delete Redis data after successful registration
    await RedisService.deletePendingRegistration(email);
    logger.info(`✅ Redis data cleaned up for: ${email}`);

    // Send token response
    sendTokenResponse(user, 201, res, "User registered successfully");
  } catch (error) {
    logger.error("❌ OTP verification error:", error);

    logger.info(
      `⚠️  Error occurred, keeping pending registration for retry: ${email}`,
    );

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Resend OTP for registration
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Get pending registration data
    const pendingData = await RedisService.getPendingRegistration(email);
    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message: "No pending registration found for this email.",
      });
    }

    // Check if we can resend OTP (prevent abuse)
    const lastResendTime = pendingData.lastResendTime;
    const now = new Date();

    if (lastResendTime) {
      const timeDiff = (now - new Date(lastResendTime)) / 1000; // in seconds
      if (timeDiff < 60) {
        // Wait at least 60 seconds between resends
        return res.status(429).json({
          success: false,
          message: "Please wait before requesting another OTP.",
          waitTime: Math.ceil(60 - timeDiff),
        });
      }
    }

    // Generate new OTP
    const otp = OTPGenerator.generateOTP();

    // Update pending data with new resend time
    pendingData.lastResendTime = now.toISOString();
    pendingData.resendCount = (pendingData.resendCount || 0) + 1;

    // Store updated data and new OTP
    await RedisService.storePendingRegistration(email, pendingData);
    await RedisService.storeOTP(email, otp);

    // ✅ SEND REAL EMAIL
    try {
      logger.info(`📤 Resending OTP email to: ${email}`);
      await EmailService.sendOTPEmail(email, pendingData.name, otp);
      logger.info(`✅ Resent email successfully to ${email}`);
    } catch (emailError) {
      logger.error("❌ Failed to resend email:", emailError.message);
      return res.status(500).json({
        success: false,
        message: "Failed to resend OTP. " + emailError.message,
        error: emailError.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "New OTP sent to your email.",
      email: email,
    });
  } catch (error) {
    logger.error("Resend OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==================== AUTH STATUS & PROFILE ====================

// Check auth status
exports.checkAuth = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(200).json({
        success: true,
        isAuthenticated: false,
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(200).json({
          success: true,
          isAuthenticated: false,
        });
      }

      return res.status(200).json({
        success: true,
        isAuthenticated: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          provider: user.provider,
          avatar: user.avatar,
          isVerified: user.isVerified,
        },
      });
    } catch (error) {
      return res.status(200).json({
        success: true,
        isAuthenticated: false,
      });
    }
  } catch (error) {
    logger.error("Check auth error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Check registration status
exports.checkRegistrationStatus = async (req, res) => {
  try {
    const { email } = req.params;

    const pendingData = await RedisService.getPendingRegistration(email);
    if (!pendingData) {
      return res.status(404).json({
        success: false,
        message: "No pending registration found",
      });
    }

    // Calculate expiry time (10 minutes from creation)
    const createdAt = new Date(pendingData.createdAt);
    const expiresAt = new Date(createdAt.getTime() + 10 * 60 * 1000);
    const now = new Date();
    const expiresIn = Math.max(0, Math.floor((expiresAt - now) / 1000)); // seconds

    res.status(200).json({
      success: true,
      data: {
        email: pendingData.email,
        name: pendingData.name,
        attempts: pendingData.otpAttempts || 0,
        expiresIn,
        createdAt: pendingData.createdAt,
      },
    });
  } catch (error) {
    logger.error("Check registration status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
        avatar: user.avatar,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updateData = {};

    if (name) updateData.name = name;

    if (email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: req.user.id },
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      updateData.email = email;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==================== PASSWORD RESET ====================

// FORGOT PASSWORD WITH OTP - Step 1: Initiate forgot password
exports.initiateForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    // For security, don't reveal if user exists or not
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a reset OTP will be sent",
      });
    }

    // Check if there's already a pending password reset
    const pendingReset = await RedisService.getPendingPasswordReset(email);
    if (pendingReset) {
      const now = new Date();
      const createdAt = new Date(pendingReset.createdAt);
      const expiresAt = new Date(createdAt.getTime() + 10 * 60 * 1000); // 10 minutes

      if (now < expiresAt) {
        return res.status(400).json({
          success: false,
          message:
            "Password reset already in progress. Please check your email for OTP.",
          expiresIn: Math.ceil((expiresAt - now) / 1000),
        });
      } else {
        // Delete expired reset
        await RedisService.deletePendingPasswordReset(email);
      }
    }

    // Check rate limiting
    const emailBlocked = await RedisService.checkEmailBlocked(email);
    if (emailBlocked) {
      return res.status(429).json({
        success: false,
        message:
          "Too many password reset attempts. Please try again in 1 hour.",
      });
    }

    // Generate OTP
    const otp = OTPGenerator.generateOTP();
    logger.info(`✅ Generated password reset OTP for ${email}: ${otp}`);

    // Store password reset data in Redis
    const resetData = {
      userId: user._id.toString(),
      email: user.email,
      username: user.name,
      otpAttempts: 0,
      resendCount: 0,
      createdAt: new Date().toISOString(),
      lastResendTime: null,
      type: "password_reset",
    };

    // Store reset data and OTP
    const storeResult = await RedisService.storePendingPasswordReset(
      email,
      resetData,
    );
    if (!storeResult) {
      throw new Error("Failed to store password reset data");
    }

    const otpStoreResult = await RedisService.storeOTP(email, otp);
    if (!otpStoreResult) {
      throw new Error("Failed to store OTP");
    }

    // Set rate limiting attempts
    await RedisService.incrementRegistrationAttempts(email);

    // Send OTP email
    try {
      logger.info(`📤 Sending password reset OTP email to: ${email}`);
      await EmailService.sendForgotPasswordOTPEmail(email, user.name, otp);
      logger.info(`✅ Password reset OTP email sent successfully to ${email}`);
    } catch (emailError) {
      logger.error(
        "❌ Failed to send password reset email:",
        emailError.message,
      );

      // Clean up if email fails
      await RedisService.deletePendingPasswordReset(email);
      await RedisService.deleteOTP(email);

      return res.status(500).json({
        success: false,
        message: "Failed to send password reset OTP. " + emailError.message,
        error: emailError.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your email",
      email: email,
      expiresIn: 600, // 10 minutes in seconds
    });
  } catch (error) {
    logger.error("❌ Forgot password initiation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// FORGOT PASSWORD WITH OTP - Step 2: Verify OTP
exports.verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Get pending password reset data
    const pendingData = await RedisService.getPendingPasswordReset(email);
    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message: "No session for this email. Please enter your email again.",
      });
    }

    // Check OTP attempts
    if (pendingData.otpAttempts >= 3) {
      // Too many attempts, delete pending reset
      await RedisService.deletePendingPasswordReset(email);
      return res.status(400).json({
        success: false,
        message: "Too many OTP attempts. Please request a new password reset.",
      });
    }

    // Verify OTP
    const otpVerification = await RedisService.verifyOTP(email, otp);
    if (!otpVerification.valid) {
      // Increment OTP attempts
      pendingData.otpAttempts += 1;
      await RedisService.storePendingPasswordReset(email, pendingData);

      return res.status(400).json({
        success: false,
        message: otpVerification.reason,
        attemptsRemaining: 3 - pendingData.otpAttempts,
      });
    }

    // Create reset token (valid for 10 minutes)
    const resetToken = jwt.sign(
      {
        id: pendingData.userId,
        email: pendingData.email,
        type: "password_reset",
      },
      process.env.JWT_SECRET + pendingData.userId, // Add user ID to secret for uniqueness
      { expiresIn: "10m" },
    );

    // Store reset token in Redis for verification
    await RedisService.storePasswordResetToken(email, resetToken);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetToken: resetToken,
      email: email,
    });
  } catch (error) {
    logger.error("❌ Forgot password OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// FORGOT PASSWORD WITH OTP - Step 3: Reset password with token
exports.resetPasswordWithToken = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password, confirmPassword, email } = req.body;

    if (!password || !confirmPassword || !email) {
      return res.status(400).json({
        success: false,
        message: "Email, password and confirm password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Verify reset token with Redis first
    const isValidToken = await RedisService.verifyPasswordResetToken(
      email,
      resetToken,
    );
    if (!isValidToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Verify JWT token
    let decoded;
    try {
      // Get user to get their ID for secret verification
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      decoded = jwt.verify(
        resetToken,
        process.env.JWT_SECRET + user._id.toString(),
      );

      // Check if it's a password reset token
      if (decoded.type !== "password_reset") {
        return res.status(400).json({
          success: false,
          message: "Invalid reset token",
        });
      }

      // Check if token email matches request email
      if (decoded.email !== email) {
        return res.status(400).json({
          success: false,
          message: "Invalid reset token",
        });
      }
    } catch (error) {
      logger.error("Token verification error:", error);
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Get user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Clean up Redis data
    await RedisService.deletePendingPasswordReset(email);
    await RedisService.deletePasswordResetToken(email);
    await RedisService.deleteOTP(email);

    // Send success email (optional)
    try {
      await EmailService.sendPasswordResetSuccessEmail(email, user.name);
    } catch (emailError) {
      logger.error("Failed to send success email:", emailError.message);
      // Continue even if email fails
    }

    res.status(200).json({
      success: true,
      message:
        "Password reset successful. You can now login with your new password.",
    });
  } catch (error) {
    logger.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Resend forgot password OTP
exports.resendForgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Get pending password reset data
    const pendingData = await RedisService.getPendingPasswordReset(email);
    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message:
          "No session for this email. Please start the forgot password process again.",
      });
    }

    // Check resend cooldown
    const lastResendTime = pendingData.lastResendTime;
    const now = new Date();

    if (lastResendTime) {
      const timeDiff = (now - new Date(lastResendTime)) / 1000;
      if (timeDiff < 60) {
        return res.status(429).json({
          success: false,
          message: "Please wait before requesting another OTP.",
          waitTime: Math.ceil(60 - timeDiff),
        });
      }
    }

    // Generate new OTP
    const otp = OTPGenerator.generateOTP();

    // Update pending data
    pendingData.lastResendTime = now.toISOString();
    pendingData.resendCount = (pendingData.resendCount || 0) + 1;

    // Store updated data and new OTP
    await RedisService.storePendingPasswordReset(email, pendingData);
    await RedisService.storeOTP(email, otp);

    // Send new OTP email
    try {
      logger.info(`📤 Resending password reset OTP to: ${email}`);
      await EmailService.sendForgotPasswordOTPEmail(
        email,
        pendingData.username,
        otp,
      );
      logger.info(`✅ Resent password reset OTP successfully to ${email}`);
    } catch (emailError) {
      logger.error(
        "❌ Failed to resend password reset OTP:",
        emailError.message,
      );
      return res.status(500).json({
        success: false,
        message: "Failed to resend OTP. " + emailError.message,
        error: emailError.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "New password reset OTP sent to your email.",
      email: email,
    });
  } catch (error) {
    logger.error("Resend forgot password OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==================== COMPATIBILITY ENDPOINTS ====================

// Legacy forgot password (keep for compatibility)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists, password reset instructions will be sent",
      });
    }

    // Create reset token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET + user.password,
      { expiresIn: "10m" },
    );

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

    logger.info("Reset URL:", resetUrl);

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
      resetUrl, // Remove in production
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Legacy reset password (keep for compatibility)
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    let decoded;
    try {
      // Note: This will fail because we need the user's password to verify
      // For now, we'll use a simplified approach
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    sendTokenResponse(user, 200, res, "Password reset successful");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Legacy register without OTP (keep for compatibility)
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({ name, email, password });

    sendTokenResponse(user, 201, res, "User registered successfully");
  } catch (error) {
    logger.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==================== EXPORT HELPER FUNCTIONS ====================

exports.generateToken = generateToken;
exports.sendTokenResponse = sendTokenResponse;
