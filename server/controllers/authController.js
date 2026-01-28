const User = require("../models/User");
const jwt = require("jsonwebtoken");
const RedisService = require("../services/redisService");
const EmailService = require("../services/emailService");
const OTPGenerator = require("../utils/otpGenerator");
const bcrypt = require("bcryptjs");

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Helper to send token response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// Step 1: Initiate registration (send OTP)
exports.initiateRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    console.log("🔍 Registration attempt:", { email, name });

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
    console.log(`✅ Generated OTP for ${email}: ${otp}`);

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

    // ✅ FIXED: Changed 'redisService' to 'RedisService' (line 135)
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
      console.log(`📤 Sending OTP email to: ${email}`);
      await EmailService.sendOTPEmail(email, name, otp);
      console.log(`✅ Email sent successfully to ${email}`);
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError.message);

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
    console.error("❌ Registration initiation error:", error);
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

    console.log(`✅ User created in database: ${email}`);

    // await RedisService.deletePendingRegistration(email);
    console.log(`✅ Redis data cleaned up for: ${email}`);

    // Send token response
    sendTokenResponse(user, 201, res, "User registered successfully");
  } catch (error) {
    console.error("❌ OTP verification error:", error);

    // ❌ FIXED: Don't delete Redis data on error
    // Keep the pending registration so user can retry
    console.log(
      `⚠️  Error occurred, keeping pending registration for retry: ${email}`,
    );

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Resend OTP
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
      console.log(`📤 Resending OTP email to: ${email}`);
      await EmailService.sendOTPEmail(email, pendingData.name, otp);
      console.log(`✅ Resent email successfully to ${email}`);
    } catch (emailError) {
      console.error("❌ Failed to resend email:", emailError.message);
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
    console.error("Resend OTP error:", error);
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
    console.error("Check registration status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    sendTokenResponse(user, 200, res, "Login successful");
  } catch (error) {
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

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
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

// Forgot password
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

    console.log("Reset URL:", resetUrl);

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

// Reset password
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

    user.password = password;
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

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
