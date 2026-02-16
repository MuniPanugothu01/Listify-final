require("dotenv").config();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const RedisService = require("../services/redisService");
const EmailService = require("../services/emailService");
const OTPGenerator = require("../utils/otpGenerator");
const bcrypt = require("bcryptjs");
const { logger } = require("../utils/logger");
const { handleGoogleAuth } = require("../services/googleAuth.OAuth");
const tokenController = require("./tokenController");
const passwordSecurity = require("../utils/passwordSecurity");

// ==================== HELPER FUNCTIONS ====================

/**
 * Generate access token (short-lived)
 * @param {string} userId - User ID
 * @returns {string} JWT access token
 */
const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
      type: "access",
      jti: require("crypto").randomBytes(16).toString("hex"),
    },
    process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE || "15m",
    },
  );
};

/**
 * Generate refresh token (long-lived)
 * @param {string} userId - User ID
 * @returns {string} JWT refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
      type: "refresh",
      jti: require("crypto").randomBytes(16).toString("hex"),
    },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + "refresh",
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
    },
  );
};

/**
 * Store refresh token in Upstash Redis
 */
const storeRefreshToken = async (userId, refreshToken, req = null) => {
  try {
    const redis = require("../config/redis");
    const decoded = jwt.decode(refreshToken);
    const tokenId = decoded.jti;
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    const sessionData = {
      userId: userId.toString(),
      tokenId,
      refreshToken,
      createdAt: new Date().toISOString(),
      ip: req?.ip || req?.connection?.remoteAddress || "unknown",
      userAgent: req?.get("user-agent") || "unknown",
      lastActivity: new Date().toISOString(),
    };

    // Store in Redis with auto-expiry
    await redis.setex(
      `refresh_token:${tokenId}`,
      expiresIn,
      JSON.stringify(sessionData),
    );

    // Add to user's session set
    await redis.sadd(`user_sessions:${userId}`, tokenId);
    await redis.expire(`user_sessions:${userId}`, expiresIn);

    logger.info("✅ Refresh token stored in Redis", { userId, tokenId });
    return true;
  } catch (error) {
    logger.error("❌ Error storing refresh token:", error);
    return false;
  }
};

/**
 * Set HTTP-only cookies for BOTH tokens
 */
const setTokenCookies = (res, accessToken, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";

  // Access Token Cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: "/",
    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
  });

  // Refresh Token Cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/api/auth/refresh",
    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
  });

  logger.debug("🍪 Token cookies set");
};

/**
 * Clear both token cookies
 */
const clearTokenCookies = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/api/auth/refresh",
  });

  logger.debug("🍪 Token cookies cleared");
};

/**
 * Verify refresh token and get session
 */
const verifyRefreshToken = async (refreshToken) => {
  try {
    const redis = require("../config/redis");

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + "refresh",
    );

    if (decoded.type !== "refresh") {
      return null;
    }

    const tokenData = await redis.get(`refresh_token:${decoded.jti}`);
    if (!tokenData) {
      return null;
    }

    const session = JSON.parse(tokenData);

    if (session.refreshToken !== refreshToken) {
      return null;
    }

    return session;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const decoded = jwt.decode(refreshToken);
      if (decoded?.jti) {
        const redis = require("../config/redis");
        await redis.del(`refresh_token:${decoded.jti}`);
      }
    }
    return null;
  }
};

/**
 * Revoke refresh token
 */
const revokeRefreshToken = async (refreshToken) => {
  try {
    const redis = require("../config/redis");
    const decoded = jwt.decode(refreshToken);
    if (!decoded?.jti) return false;

    const tokenData = await redis.get(`refresh_token:${decoded.jti}`);
    if (tokenData) {
      const session = JSON.parse(tokenData);
      await redis.srem(`user_sessions:${session.userId}`, decoded.jti);
    }

    await redis.del(`refresh_token:${decoded.jti}`);
    logger.info("✅ Refresh token revoked", { jti: decoded.jti });
    return true;
  } catch (error) {
    logger.error("❌ Error revoking refresh token:", error);
    return false;
  }
};

/**
 * Revoke all user tokens
 */
const revokeAllUserTokens = async (userId) => {
  try {
    const redis = require("../config/redis");
    const tokenIds = await redis.smembers(`user_sessions:${userId}`);

    if (tokenIds.length > 0) {
      const deletePromises = tokenIds.map((tokenId) =>
        redis.del(`refresh_token:${tokenId}`),
      );
      await Promise.all(deletePromises);
    }

    await redis.del(`user_sessions:${userId}`);
    logger.info("✅ All user tokens revoked", {
      userId,
      count: tokenIds.length,
    });
    return true;
  } catch (error) {
    logger.error("❌ Error revoking all user tokens:", error);
    return false;
  }
};

/**
 * Refresh tokens - token rotation
 */
const refreshTokens = async (refreshToken) => {
  try {
    const session = await verifyRefreshToken(refreshToken);
    if (!session) {
      return null;
    }

    const newAccessToken = generateAccessToken(session.userId);
    const newRefreshToken = generateRefreshToken(session.userId);

    await revokeRefreshToken(refreshToken);
    await storeRefreshToken(session.userId, newRefreshToken);

    logger.info("🔄 Token rotation complete", {
      userId: session.userId,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    logger.error("❌ Error refreshing tokens:", error);
    return null;
  }
};

/**
 * Send token response with HTTP-only cookies
 */
const sendTokenResponse = async (user, statusCode, res, message) => {
  try {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await storeRefreshToken(user._id.toString(), refreshToken, res.req);
    setTokenCookies(res, accessToken, refreshToken);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      profileImage: user.profileImage || null,
      googleProfileImage: user.googleProfileImage || null,
      isVerified: user.isVerified,
      profileImageUrl: user.getProfileImage
        ? user.getProfileImage()
        : user.avatar ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      // ==================== NEW: Password expiration info ====================
      passwordExpiration: user.passwordNeedsChange
        ? user.passwordNeedsChange()
        : null,
    };

    logger.info("✅ Token response sent with HTTP-only cookies", {
      userId: user._id,
    });

    res.status(statusCode).json({
      success: true,
      message,
      user: userResponse,
    });
  } catch (error) {
    logger.error("❌ Error sending token response:", error);
    res.status(500).json({
      success: false,
      message: "Error generating authentication tokens",
    });
  }
};

// Legacy generateToken
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Legacy sendTokenResponse
const legacySendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    provider: user.provider,
    avatar: user.avatar,
    profileImage: user.profileImage || null,
    googleProfileImage: user.googleProfileImage || null,
    isVerified: user.isVerified,
    profileImageUrl: user.getProfileImage
      ? user.getProfileImage()
      : user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  };

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: userResponse,
  });
};

// ==================== GOOGLE AUTH ====================

exports.getGoogleClientId = (req, res) => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) {
      return res.status(500).json({
        success: false,
        message: "Google authentication is not configured on the server",
      });
    }

    res.status(200).json({
      success: true,
      clientId: clientId,
    });
  } catch (error) {
    logger.error("Get Google client ID error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.googleTokenAuth = async (req, res) => {
  try {
    const { token: googleToken } = req.body;

    if (!googleToken) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    const { user, isNew } = await handleGoogleAuth(googleToken, req);
    const message = isNew
      ? "Account created with Google"
      : "Google login successful";
    const statusCode = isNew ? 201 : 200;

    return await sendTokenResponse(user, statusCode, res, message);
  } catch (error) {
    logger.error("Google Token Auth Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid Google token",
    });
  }
};

// ==================== UPDATED: Login with password expiration check ====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info("🔍 Login attempt for:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select(
      "+password +passwordHistory",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.provider === "google") {
      return res.status(400).json({
        success: false,
        message: "This account uses Google login. Please sign in with Google.",
        provider: "google",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "Account exists but no password set. Please reset your password.",
        needsPasswordSetup: true,
        email: user.email,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      if (user.incrementLoginAttempts) {
        await user.incrementLoginAttempts();
      }
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.isLocked && user.isLocked()) {
      return res.status(423).json({
        success: false,
        message:
          "Account is temporarily locked. Please try again later or reset your password.",
        locked: true,
      });
    }

    if (user.resetLoginAttempts) {
      await user.resetLoginAttempts();
    }

    if (user.updateLastLogin) {
      await user.updateLastLogin(req.ip, req.get("user-agent"));
    }

    // ==================== NEW: Check password expiration ====================
    const passwordExpiration = user.passwordNeedsChange
      ? user.passwordNeedsChange()
      : null;

    // Add warning if password is about to expire
    if (passwordExpiration && passwordExpiration.shouldWarn) {
      logger.info(
        `⚠️ Password for ${email} will expire in ${passwordExpiration.daysRemaining} days`,
      );
    }

    return await sendTokenResponse(user, 200, res, "Login successful");
  } catch (error) {
    logger.error("❌ Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== UPDATED: Register with password security ====================
exports.initiateRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    logger.info("🔍 Registration attempt:", { email, name });

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: name, email, password, confirmPassword",
      });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // ==================== NEW: Comprehensive password validation ====================
    const passwordValidation = await passwordSecurity.validatePassword(
      password,
      null,
      true,
    );

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        errors: passwordValidation.errors,
        strength: passwordValidation.strength,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login instead.",
      });
    }

    // Check if registration already in progress
    const pendingRegistration =
      await RedisService.getPendingRegistration(email);
    if (pendingRegistration) {
      const now = new Date();
      const createdAt = new Date(pendingRegistration.createdAt);
      const expiresAt = new Date(createdAt.getTime() + 10 * 60 * 1000);

      if (now < expiresAt) {
        return res.status(400).json({
          success: false,
          message:
            "Registration already in progress. Please check your email for OTP.",
          expiresIn: Math.ceil((expiresAt - now) / 1000),
        });
      } else {
        await RedisService.deletePendingRegistration(email);
      }
    }

    const emailBlocked = await RedisService.checkEmailBlocked(email);
    if (emailBlocked) {
      return res.status(429).json({
        success: false,
        message: "Too many registration attempts. Please try again in 1 hour.",
      });
    }

    const otp = OTPGenerator.generateOTP();
    logger.info(`✅ Generated OTP for ${email}: ${otp}`);

    // Hash password with increased salt rounds (12)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      provider: "local",
      otpAttempts: 0,
      resendCount: 0,
      createdAt: new Date().toISOString(),
      lastResendTime: null,
      passwordStrength: passwordValidation.strength,
      breachChecked: passwordValidation.breach,
    };

    const storeResult = await RedisService.storePendingRegistration(
      email,
      userData,
    );
    if (!storeResult) {
      throw new Error("Failed to store registration data");
    }

    const otpStoreResult = await RedisService.storeOTP(email, otp);
    if (!otpStoreResult) {
      throw new Error("Failed to store OTP");
    }

    await RedisService.incrementRegistrationAttempts(email);

    try {
      logger.info(`📤 Sending OTP email to: ${email}`);
      await EmailService.sendOTPEmail(email, name, otp);
      logger.info(`✅ Email sent successfully to ${email}`);
    } catch (emailError) {
      logger.error("❌ Failed to send email:", emailError.message);

      await RedisService.deletePendingRegistration(email);
      await RedisService.deleteOTP(email);

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. " + emailError.message,
      });
    }

    res.status(200).json({
      success: true,
      message:
        "OTP sent to your email. Please verify to complete registration.",
      email: email,
      expiresIn: 600,
    });
  } catch (error) {
    logger.error("❌ Registration initiation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== UPDATED: Verify OTP and complete registration ====================
exports.verifyOTPAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpBlocked = await RedisService.checkOTPBlocked(email);
    if (otpBlocked.blocked) {
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Please try again in ${otpBlocked.remainingSeconds} seconds.`,
        blocked: true,
        remainingSeconds: otpBlocked.remainingSeconds,
      });
    }

    const pendingData = await RedisService.getPendingRegistration(email);
    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message:
          "Registration session expired or not found. Please start over.",
      });
    }

    const otpVerification = await RedisService.verifyOTP(email, otp);
    if (!otpVerification.valid) {
      const attemptResult = await RedisService.incrementOTPAttempts(email);

      let errorMessage =
        otpVerification.reason || "Invalid OTP. Please try again.";

      if (attemptResult.blocked) {
        errorMessage = `Too many failed attempts. Please try again in 60 seconds.`;
        return res.status(429).json({
          success: false,
          message: errorMessage,
          blocked: true,
          remainingSeconds: 60,
          attempts: attemptResult.attempts,
        });
      }

      const attemptsRemaining = 3 - attemptResult.attempts;
      return res.status(400).json({
        success: false,
        message: errorMessage,
        attemptsRemaining: attemptsRemaining,
        attempts: attemptResult.attempts,
      });
    }

    await RedisService.clearOTPAttempts(email);
    await RedisService.clearOTPBlock(email);

    const userExists = await User.findOne({ email });
    if (userExists) {
      await RedisService.deletePendingRegistration(email);
      return res.status(400).json({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // ==================== NEW: Create user with password history ====================
    console.log("🔍 Creating user with stored hash");
    const user = new User({
      name: pendingData.name,
      email: pendingData.email,
      password: pendingData.password,
      provider: "local",
      isVerified: true,
      lastPasswordChange: new Date(),
    });

    // Add initial password to history
    user.passwordHistory = [
      {
        password: pendingData.password,
        changedAt: new Date(),
        changedBy: "user",
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      },
    ];

    await user.save();

    console.log(`✅ User created in database: ${email}`);

    await RedisService.deletePendingRegistration(email);
    console.log(`✅ Redis data cleaned up for: ${email}`);

    return await sendTokenResponse(
      user,
      201,
      res,
      "User registered successfully",
    );
  } catch (error) {
    logger.error("❌ OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// ==================== UPDATED: Change Password with history check ====================
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide current password, new password, and confirm password",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

    const user = await User.findById(req.user.id).select(
      "+password +passwordHistory",
    );

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // ==================== NEW: Comprehensive password validation ====================
    const passwordValidation = await passwordSecurity.validatePassword(
      newPassword,
      user._id.toString(),
      true,
    );

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        errors: passwordValidation.errors,
        strength: passwordValidation.strength,
      });
    }

    // ==================== NEW: Check if password is in history ====================
    const historyCheck = await user.isPasswordInHistory(newPassword);
    if (historyCheck.inHistory) {
      return res.status(400).json({
        success: false,
        message:
          historyCheck.message ||
          "You have used this password recently. Please choose a different password.",
      });
    }

    // Hash new password with increased salt rounds
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // ==================== NEW: Add old password to history before changing ====================
    await user.addToPasswordHistory(currentPassword, {
      changedBy: "user",
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    // Update password
    user.password = hashedPassword;
    user.lastPasswordChange = new Date();
    await user.save();

    // ==================== NEW: Log security event ====================
    if (user.addSecurityLog) {
      await user.addSecurityLog(
        "password_changed",
        req.ip,
        req.get("user-agent"),
        { method: "user_change" },
      );
    }

    // Revoke all sessions except current one
    await revokeAllUserTokens(user._id.toString());

    logger.info(`✅ Password changed successfully for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully. Please login again with your new password.",
    });
  } catch (error) {
    logger.error("❌ Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== UPDATED: Reset password with token ====================
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

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

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

    let decoded;
    try {
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

      if (decoded.type !== "password_reset" || decoded.email !== email) {
        return res.status(400).json({
          success: false,
          message: "Invalid reset token",
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const user = await User.findById(decoded.id).select(
      "+password +passwordHistory",
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // ==================== NEW: Comprehensive password validation ====================
    const passwordValidation = await passwordSecurity.validatePassword(
      password,
      user._id.toString(),
      true,
    );

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        errors: passwordValidation.errors,
        strength: passwordValidation.strength,
      });
    }

    // ==================== NEW: Check if password is in history ====================
    const historyCheck = await user.isPasswordInHistory(password);
    if (historyCheck.inHistory) {
      return res.status(400).json({
        success: false,
        message:
          historyCheck.message ||
          "You have used this password recently. Please choose a different password.",
      });
    }

    // Hash new password with increased salt rounds
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ==================== NEW: Add old password to history if exists ====================
    if (user.password) {
      await user.addToPasswordHistory(password, {
        changedBy: "reset",
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });
    } else {
      // First time password setup - add to history
      user.passwordHistory = [
        {
          password: hashedPassword,
          changedAt: new Date(),
          changedBy: "reset",
          ipAddress: req.ip,
          userAgent: req.get("user-agent"),
        },
      ];
    }

    user.password = hashedPassword;
    user.lastPasswordChange = new Date();
    await user.save();

    // Revoke all existing sessions after password reset
    await revokeAllUserTokens(user._id.toString());

    // Clean up Redis data
    await RedisService.deletePendingPasswordReset(email);
    await RedisService.deletePasswordResetToken(email);
    await RedisService.deleteOTP(email);

    // Send success email
    try {
      await EmailService.sendPasswordResetSuccessEmail(email, user.name);
    } catch (emailError) {
      logger.error("Failed to send success email:", emailError.message);
    }

    res.status(200).json({
      success: true,
      message:
        "Password reset successful. You can now login with your new password.",
    });
  } catch (error) {
    logger.error("❌ Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== NEW: Setup password with security checks ====================
exports.setupPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, password and confirm password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ email }).select(
      "+password +passwordHistory",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userWithPassword = await User.findOne({ email }).select("+password");
    if (userWithPassword && userWithPassword.password) {
      return res.status(400).json({
        success: false,
        message:
          "Password already set for this account. Please use login instead.",
      });
    }

    // ==================== NEW: Comprehensive password validation ====================
    const passwordValidation = await passwordSecurity.validatePassword(
      password,
      user._id.toString(),
      true,
    );

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        errors: passwordValidation.errors,
        strength: passwordValidation.strength,
      });
    }

    console.log("🔍 Setting up password for user:", email);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.provider = "local";
    user.lastPasswordChange = new Date();

    // ==================== NEW: Add to password history ====================
    user.passwordHistory = [
      {
        password: hashedPassword,
        changedAt: new Date(),
        changedBy: "user",
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      },
    ];

    await user.save();

    console.log(`✅ Password setup successful for: ${email}`);

    res.status(200).json({
      success: true,
      message: "Password set successfully. You can now login.",
    });
  } catch (error) {
    logger.error("❌ Setup password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== NEW: Check password expiration status ====================
exports.checkPasswordExpiration = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const expirationStatus = user.passwordNeedsChange
      ? user.passwordNeedsChange()
      : {
          needsChange: false,
          daysRemaining: null,
        };

    res.status(200).json({
      success: true,
      expiration: expirationStatus,
    });
  } catch (error) {
    logger.error("❌ Check password expiration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== NEW: Get password requirements for frontend ====================
exports.getPasswordRequirements = (req, res) => {
  const requirements = passwordSecurity.getPasswordRequirements();
  res.status(200).json({
    success: true,
    requirements,
  });
};

// ==================== EXISTING FUNCTIONS (unchanged) ====================

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    const tokens = await refreshTokens(refreshToken);

    if (!tokens) {
      clearTokenCookies(res);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    logger.error("Refresh token error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during token refresh",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    clearTokenCookies(res);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    logger.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error during logout",
    });
  }
};

exports.logoutAll = async (req, res) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
      );

      if (decoded.type === "access") {
        await revokeAllUserTokens(decoded.id);
      }
    } catch (error) {
      const { refreshToken } = req.cookies;
      if (refreshToken) {
        const decoded = jwt.decode(refreshToken);
        if (decoded?.id) {
          await revokeAllUserTokens(decoded.id);
        }
      }
    }

    clearTokenCookies(res);

    res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    logger.error("Logout all error:", error);
    res.status(500).json({
      success: false,
      message: "Error during logout",
    });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const redis = require("../config/redis");
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    let userId;
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
      );
      userId = decoded.id;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const tokenIds = await redis.smembers(`user_sessions:${userId}`);
    const sessions = [];

    for (const tokenId of tokenIds) {
      const tokenData = await redis.get(`refresh_token:${tokenId}`);
      if (tokenData) {
        const session = JSON.parse(tokenData);
        sessions.push({
          tokenId: session.tokenId,
          createdAt: session.createdAt,
          lastActivity: session.lastActivity,
          ip: session.ip,
          userAgent: session.userAgent,
          isCurrentSession: session.refreshToken === req.cookies.refreshToken,
        });
      }
    }

    sessions.sort(
      (a, b) => new Date(b.lastActivity) - new Date(a.lastActivity),
    );

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    logger.error("Get sessions error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving sessions",
    });
  }
};

exports.revokeSession = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const redis = require("../config/redis");
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    let userId;
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
      );
      userId = decoded.id;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const tokenData = await redis.get(`refresh_token:${tokenId}`);
    if (!tokenData) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const session = JSON.parse(tokenData);

    if (session.userId !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to revoke this session",
      });
    }

    if (session.refreshToken === req.cookies.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Cannot revoke current session. Use logout instead.",
      });
    }

    await revokeRefreshToken(session.refreshToken);

    res.status(200).json({
      success: true,
      message: "Session revoked successfully",
    });
  } catch (error) {
    logger.error("Revoke session error:", error);
    res.status(500).json({
      success: false,
      message: "Error revoking session",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(200).json({
        success: true,
        isAuthenticated: false,
      });
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
      );

      if (decoded.type !== "access") {
        return res.status(200).json({
          success: true,
          isAuthenticated: false,
        });
      }

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(200).json({
          success: true,
          isAuthenticated: false,
        });
      }

      // ==================== NEW: Add password expiration info ====================
      const passwordExpiration = user.passwordNeedsChange
        ? user.passwordNeedsChange()
        : null;

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
          profileImage: user.profileImage,
          googleProfileImage: user.googleProfileImage,
          isVerified: user.isVerified,
          profileImageUrl: user.getProfileImage
            ? user.getProfileImage()
            : user.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          passwordExpiration,
        },
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        const { refreshToken } = req.cookies;
        if (refreshToken) {
          const tokens = await refreshTokens(refreshToken);
          if (tokens) {
            setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

            const decoded = jwt.verify(
              tokens.accessToken,
              process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
            );

            const user = await User.findById(decoded.id);

            if (user) {
              const passwordExpiration = user.passwordNeedsChange
                ? user.passwordNeedsChange()
                : null;

              return res.status(200).json({
                success: true,
                isAuthenticated: true,
                tokenRefreshed: true,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  provider: user.provider,
                  avatar: user.avatar,
                  profileImage: user.profileImage,
                  googleProfileImage: user.googleProfileImage,
                  isVerified: user.isVerified,
                  profileImageUrl: user.getProfileImage
                    ? user.getProfileImage()
                    : user.avatar ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                  passwordExpiration,
                },
              });
            }
          }
        }
      }

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
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = req.user;

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      profileImage: user.profileImage,
      googleProfileImage: user.googleProfileImage,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      profileImageUrl: user.getProfileImage
        ? user.getProfileImage()
        : user.avatar ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      // ==================== NEW: Password expiration info ====================
      passwordExpiration: user.passwordNeedsChange
        ? user.passwordNeedsChange()
        : null,
    };

    res.status(200).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (profileImage) updateData.profileImage = profileImage;

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

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      profileImage: user.profileImage,
      googleProfileImage: user.googleProfileImage,
      isVerified: user.isVerified,
      profileImageUrl: user.getProfileImage
        ? user.getProfileImage()
        : user.avatar ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    };

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const { profileImage } = req.body;

    if (!profileImage) {
      return res.status(400).json({
        success: false,
        message: "Profile image URL is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage },
      { new: true },
    );

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      profileImage: user.profileImage,
      googleProfileImage: user.googleProfileImage,
      isVerified: user.isVerified,
      profileImageUrl: user.getProfileImage
        ? user.getProfileImage()
        : user.avatar ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    };

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== FORGOT PASSWORD FLOW ====================

exports.initiateForgotPassword = async (req, res) => {
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
          "If an account exists with this email, a reset OTP will be sent",
      });
    }

    const pendingReset = await RedisService.getPendingPasswordReset(email);
    if (pendingReset) {
      const now = new Date();
      const createdAt = new Date(pendingReset.createdAt);
      const expiresAt = new Date(createdAt.getTime() + 10 * 60 * 1000);

      if (now < expiresAt) {
        return res.status(400).json({
          success: false,
          message:
            "Password reset already in progress. Please check your email for OTP.",
          expiresIn: Math.ceil((expiresAt - now) / 1000),
        });
      } else {
        await RedisService.deletePendingPasswordReset(email);
      }
    }

    const emailBlocked = await RedisService.checkEmailBlocked(email);
    if (emailBlocked) {
      return res.status(429).json({
        success: false,
        message:
          "Too many password reset attempts. Please try again in 1 hour.",
      });
    }

    const otp = OTPGenerator.generateOTP();
    logger.info(`✅ Generated password reset OTP for ${email}: ${otp}`);

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

    await RedisService.incrementRegistrationAttempts(email);

    try {
      logger.info(`📤 Sending password reset OTP email to: ${email}`);
      await EmailService.sendForgotPasswordOTPEmail(email, user.name, otp);
      logger.info(`✅ Password reset OTP email sent successfully to ${email}`);
    } catch (emailError) {
      logger.error(
        "❌ Failed to send password reset email:",
        emailError.message,
      );

      await RedisService.deletePendingPasswordReset(email);
      await RedisService.deleteOTP(email);

      return res.status(500).json({
        success: false,
        message: "Failed to send password reset OTP. " + emailError.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your email",
      email: email,
      expiresIn: 600,
    });
  } catch (error) {
    logger.error("❌ Forgot password initiation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpBlocked = await RedisService.checkOTPBlocked(email);
    if (otpBlocked.blocked) {
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Please try again in ${otpBlocked.remainingSeconds} seconds.`,
        blocked: true,
        remainingSeconds: otpBlocked.remainingSeconds,
      });
    }

    const pendingData = await RedisService.getPendingPasswordReset(email);
    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found. Please request a new one.",
      });
    }

    if (pendingData.otpAttempts >= 3) {
      await RedisService.deletePendingPasswordReset(email);
      return res.status(400).json({
        success: false,
        message: "Too many failed attempts. Please request a new OTP.",
      });
    }

    const otpVerification = await RedisService.verifyOTP(email, otp);
    if (!otpVerification.valid) {
      pendingData.otpAttempts = (pendingData.otpAttempts || 0) + 1;
      await RedisService.storePendingPasswordReset(email, pendingData);

      const attemptResult = await RedisService.incrementOTPAttempts(email);

      let errorMessage =
        otpVerification.reason || "Invalid OTP. Please try again.";

      if (attemptResult.blocked) {
        errorMessage = `Too many failed attempts. Please try again in 60 seconds.`;
        return res.status(429).json({
          success: false,
          message: errorMessage,
          blocked: true,
          remainingSeconds: 60,
        });
      }

      return res.status(400).json({
        success: false,
        message: errorMessage,
        attemptsRemaining: 3 - pendingData.otpAttempts,
      });
    }

    await RedisService.clearOTPAttempts(email);
    await RedisService.clearOTPBlock(email);

    const resetToken = jwt.sign(
      {
        id: pendingData.userId,
        email: pendingData.email,
        type: "password_reset",
      },
      process.env.JWT_SECRET + pendingData.userId,
      { expiresIn: "10m" },
    );

    await RedisService.storePasswordResetToken(email, resetToken);
    await RedisService.deleteOTP(email);

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
    });
  }
};

exports.resendForgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const otpBlocked = await RedisService.checkOTPBlocked(email);
    if (otpBlocked.blocked) {
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Please try again in ${otpBlocked.remainingSeconds} seconds.`,
        blocked: true,
        remainingSeconds: otpBlocked.remainingSeconds,
      });
    }

    const pendingData = await RedisService.getPendingPasswordReset(email);
    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message:
          "No session for this email. Please start the forgot password process again.",
      });
    }

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

    const otp = OTPGenerator.generateOTP();

    pendingData.lastResendTime = now.toISOString();
    pendingData.resendCount = (pendingData.resendCount || 0) + 1;

    await RedisService.storePendingPasswordReset(email, pendingData);
    await RedisService.storeOTP(email, otp);

    await RedisService.clearOTPAttempts(email);
    await RedisService.clearOTPBlock(email);

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
    });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const otpBlocked = await RedisService.checkOTPBlocked(email);
    if (otpBlocked.blocked) {
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Please try again in ${otpBlocked.remainingSeconds} seconds.`,
        blocked: true,
        remainingSeconds: otpBlocked.remainingSeconds,
      });
    }

    const pendingData = await RedisService.getPendingRegistration(email);
    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message: "No pending registration found for this email.",
      });
    }

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

    const otp = OTPGenerator.generateOTP();

    pendingData.lastResendTime = now.toISOString();
    pendingData.resendCount = (pendingData.resendCount || 0) + 1;

    await RedisService.storePendingRegistration(email, pendingData);
    await RedisService.storeOTP(email, otp);

    await RedisService.clearOTPAttempts(email);
    await RedisService.clearOTPBlock(email);

    try {
      logger.info(`📤 Resending OTP email to: ${email}`);
      await EmailService.sendOTPEmail(email, pendingData.name, otp);
      logger.info(`✅ Resent email successfully to ${email}`);
    } catch (emailError) {
      logger.error("❌ Failed to resend email:", emailError.message);
      return res.status(500).json({
        success: false,
        message: "Failed to resend OTP. " + emailError.message,
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
    });
  }
};

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

    const createdAt = new Date(pendingData.createdAt);
    const expiresAt = new Date(createdAt.getTime() + 10 * 60 * 1000);
    const now = new Date();
    const expiresIn = Math.max(0, Math.floor((expiresAt - now) / 1000));

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
    });
  }
};

// ==================== LEGACY COMPATIBILITY ENDPOINTS ====================

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

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET + user.password,
      { expiresIn: "10m" },
    );

    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

    logger.info("Reset URL:", resetUrl);

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
      resetUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

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

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    legacySendTokenResponse(user, 200, res, "Password reset successful");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

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

    // ==================== NEW: Password validation ====================
    const passwordValidation = await passwordSecurity.validatePassword(
      password,
      null,
      true,
    );

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        errors: passwordValidation.errors,
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      provider: "local",
    });

    legacySendTokenResponse(user, 201, res, "User registered successfully");
  } catch (error) {
    logger.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== EXPORT HELPER FUNCTIONS ====================

exports.generateToken = generateToken;
exports.sendTokenResponse = legacySendTokenResponse;
