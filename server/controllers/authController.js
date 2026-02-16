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
 * @param {Object} res - Express response object
 * @param {string} accessToken - JWT access token
 * @param {string} refreshToken - JWT refresh token
 */
const setTokenCookies = (res, accessToken, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";

  // ============== ACCESS TOKEN COOKIE ==============
  // Short-lived, accessible by all API routes
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // CRITICAL: Cannot be accessed by JavaScript
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: "/", // Available to all routes
    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
  });

  // ============== REFRESH TOKEN COOKIE ==============
  // Long-lived, only sent to refresh endpoint
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // CRITICAL: Cannot be accessed by JavaScript
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/api/auth/refresh", // ONLY sent to refresh endpoint
    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
  });

  logger.debug("🍪 Token cookies set", {
    accessToken: "set",
    refreshToken: "set",
    secure: isProduction,
  });
};

/**
 * Clear both token cookies
 * @param {Object} res - Express response object
 */
const clearTokenCookies = (res) => {
  // Clear access token cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  });

  // Clear refresh token cookie
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
      // Clean up expired token
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

    // Generate new tokens
    const newAccessToken = generateAccessToken(session.userId);
    const newRefreshToken = generateRefreshToken(session.userId);

    // Revoke old refresh token
    await revokeRefreshToken(refreshToken);

    // Store new refresh token
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
 * THIS IS THE MAIN RESPONSE FUNCTION - NO TOKENS IN JSON BODY
 */
const sendTokenResponse = async (user, statusCode, res, message) => {
  try {
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store refresh token in Redis
    await storeRefreshToken(user._id.toString(), refreshToken, res.req);

    // Set HTTP-only cookies for BOTH tokens
    setTokenCookies(res, accessToken, refreshToken);

    // Prepare user response (NO TOKEN IN BODY)
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
    };

    logger.info("✅ Token response sent with HTTP-only cookies", {
      userId: user._id,
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    });

    // IMPORTANT: NO TOKEN PROPERTY IN JSON RESPONSE
    // Token is only in HTTP-only cookie
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

// ==================== LEGACY FUNCTIONS (KEEP FOR COMPATIBILITY) ====================

// Legacy generateToken - DO NOT USE FOR NEW CODE
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Legacy sendTokenResponse - KEPT FOR BACKWARD COMPATIBILITY
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
    token, // Token in JSON (legacy)
    user: userResponse,
  });
};

// ==================== GOOGLE AUTH ====================

exports.getGoogleClientId = (req, res) => {
  try {
    console.log("🔍 Google Client ID endpoint called");
    console.log("📋 Headers:", req.headers);
    console.log("🌐 Origin:", req.headers.origin);
    console.log("🔐 GOOGLE_CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);

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

    if (!clientId.includes(".apps.googleusercontent.com")) {
      console.log("⚠️ WARNING: GOOGLE_CLIENT_ID may be in wrong format");
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

// ==================== UPDATED: Google Token Auth with HTTP-only Cookies ====================
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

    // ============== USE NEW TOKEN RESPONSE WITH HTTP-ONLY COOKIES ==============
    return await sendTokenResponse(user, statusCode, res, message);
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

// ==================== UPDATED: Login with HTTP-only Cookies ====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login data received:", {
      email,
      password: password ? "***MASKED***" : "missing",
    });
    logger.info("🔍 Login attempt for:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log(`❌ User not found in database for email: ${email}`);
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
      console.log("❌ User exists but has no password:", {
        email: user.email,
        id: user._id,
        provider: user.provider,
      });

      return res.status(400).json({
        success: false,
        message:
          "Account exists but no password set. Please use 'Setup Password' or reset your password.",
        needsPasswordSetup: true,
        email: user.email,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isPasswordMatch);

    if (!isPasswordMatch) {
      if (user.incrementLoginAttempts) {
        await user.incrementLoginAttempts();
      }
      console.log(`❌ Password mismatch for ${email}`);
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

    console.log(`✅ Login successful for: ${email}`);

    // ============== USE NEW TOKEN RESPONSE WITH HTTP-ONLY COOKIES ==============
    return await sendTokenResponse(user, 200, res, "Login successful");
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== UPDATED: Register with HTTP-only Cookies ====================
exports.verifyOTPAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Check if OTP is blocked
    const otpBlocked = await RedisService.checkOTPBlocked(email);
    if (otpBlocked.blocked) {
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Please try again in ${otpBlocked.remainingSeconds} seconds.`,
        blocked: true,
        remainingSeconds: otpBlocked.remainingSeconds,
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

    // Verify OTP
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

    // Clear OTP attempts on successful verification
    await RedisService.clearOTPAttempts(email);
    await RedisService.clearOTPBlock(email);

    // Double-check if user still doesn't exist in database
    const userExists = await User.findOne({ email });
    if (userExists) {
      await RedisService.deletePendingRegistration(email);
      return res.status(400).json({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // Create user
    console.log("🔍 Creating user with stored hash");
    const user = await User.create({
      name: pendingData.name,
      email: pendingData.email,
      password: pendingData.password,
      provider: "local",
      isVerified: true,
      lastPasswordChange: new Date(),
    });

    console.log(`✅ User created in database: ${email}`);
    console.log(`User ID: ${user._id}`);

    // Delete Redis data after successful registration
    await RedisService.deletePendingRegistration(email);
    console.log(`✅ Redis data cleaned up for: ${email}`);

    // ============== USE NEW TOKEN RESPONSE WITH HTTP-ONLY COOKIES ==============
    return await sendTokenResponse(
      user,
      201,
      res,
      "User registered successfully",
    );
  } catch (error) {
    console.error("❌ OTP verification error:", error);
    console.error("Error stack:", error.stack);

    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// ==================== NEW: Refresh Token Endpoint ====================
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
      // Clear invalid cookies
      clearTokenCookies(res);

      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    // Set new cookies with rotated tokens
    setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      // NO TOKEN IN BODY - Only in cookie
    });
  } catch (error) {
    logger.error("Refresh token error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during token refresh",
    });
  }
};

// ==================== NEW: Logout Endpoint ====================
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    // Clear both token cookies
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

// ==================== NEW: Logout All Devices ====================
exports.logoutAll = async (req, res) => {
  try {
    // Get user ID from access token cookie
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
      // Token might be expired - try to get userId from refresh token
      const { refreshToken } = req.cookies;
      if (refreshToken) {
        const decoded = jwt.decode(refreshToken);
        if (decoded?.id) {
          await revokeAllUserTokens(decoded.id);
        }
      }
    }

    // Clear both token cookies
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

// ==================== NEW: Get Active Sessions ====================
exports.getSessions = async (req, res) => {
  try {
    const redis = require("../config/redis");

    // Get user ID from access token cookie
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

    // Get all session token IDs for user
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

    // Sort by lastActivity (newest first)
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

// ==================== NEW: Revoke Specific Session ====================
exports.revokeSession = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const redis = require("../config/redis");

    // Get user ID from access token
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

    // Get token data
    const tokenData = await redis.get(`refresh_token:${tokenId}`);
    if (!tokenData) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const session = JSON.parse(tokenData);

    // Verify this session belongs to the user
    if (session.userId !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to revoke this session",
      });
    }

    // Don't allow revoking current session
    if (session.refreshToken === req.cookies.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Cannot revoke current session. Use logout instead.",
      });
    }

    // Revoke the token
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

// ==================== NEW: Check Auth Status (Uses Cookie) ====================
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
        },
      });
    } catch (error) {
      // Token expired - try to refresh automatically
      if (error.name === "TokenExpiredError") {
        const { refreshToken } = req.cookies;
        if (refreshToken) {
          const tokens = await refreshTokens(refreshToken);
          if (tokens) {
            // Set new cookies
            setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

            // Verify new access token
            const decoded = jwt.verify(
              tokens.accessToken,
              process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
            );

            const user = await User.findById(decoded.id);

            if (user) {
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
      error: error.message,
    });
  }
};

// ==================== REST OF YOUR EXISTING FUNCTIONS (UNCHANGED) ====================

// Setup password for users without password
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

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findOne({ email });

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

    console.log("🔍 Setting up password for user:", email);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.provider = "local";
    user.lastPasswordChange = new Date();

    await user.save();

    console.log(`✅ Password setup successful for: ${email}`);

    res.status(200).json({
      success: true,
      message: "Password set successfully. You can now login.",
    });
  } catch (error) {
    logger.error("Setup password error:", error);
    console.error("Setup password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Step 1: Initiate registration (send OTP)
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

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login instead.",
      });
    }

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

    console.log("🔍 Hashing password for registration...");
    const salt = await bcrypt.genSalt(10);
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
      salt: salt,
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
        error: emailError.message,
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
    console.error("Error stack:", error.stack);
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

    // Check if OTP is blocked
    const otpBlocked = await RedisService.checkOTPBlocked(email);
    if (otpBlocked.blocked) {
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Please try again in ${otpBlocked.remainingSeconds} seconds.`,
        blocked: true,
        remainingSeconds: otpBlocked.remainingSeconds,
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

    // Update pending data with new resend time
    pendingData.lastResendTime = now.toISOString();
    pendingData.resendCount = (pendingData.resendCount || 0) + 1;

    // Store updated data and new OTP
    await RedisService.storePendingRegistration(email, pendingData);
    await RedisService.storeOTP(email, otp);

    // Clear OTP attempts when resending
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
      error: error.message,
    });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    // User is already attached by auth middleware
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
    };

    res.status(200).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update profile with profile image support
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
      error: error.message,
    });
  }
};

// Upload profile image
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

// ==================== FORGOT PASSWORD FLOW (UNCHANGED) ====================

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
        error: emailError.message,
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

    // Check if OTP is blocked
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

    // Clear OTP attempts on successful verification
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

      if (decoded.type !== "password_reset") {
        return res.status(400).json({
          success: false,
          message: "Invalid reset token",
        });
      }

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

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Revoke all existing sessions after password reset
    await revokeAllUserTokens(user._id.toString());

    await RedisService.deletePendingPasswordReset(email);
    await RedisService.deletePasswordResetToken(email);
    await RedisService.deleteOTP(email);

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

// ==================== LEGACY COMPATIBILITY ENDPOINTS ====================

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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Use legacy token response for backward compatibility
    legacySendTokenResponse(user, 200, res, "Password reset successful");
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

    const user = await User.create({
      name,
      email,
      password,
      provider: "local",
    });

    // Use legacy token response for backward compatibility
    legacySendTokenResponse(user, 201, res, "User registered successfully");
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
exports.sendTokenResponse = legacySendTokenResponse; // Keep legacy for compatibility
