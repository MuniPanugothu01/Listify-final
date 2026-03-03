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
const deviceService = require("../services/deviceService");
const s3Service = require("../services/s3Service");
const crypto = require("crypto");

// ==================== HELPER FUNCTIONS ====================

/**
 * Generate access token (short-lived)
 */
const generateAccessToken = (userId, req = null) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('JWT_ACCESS_SECRET is required');
  }
  const payload = {
    id: userId,
    type: "access",
    jti: crypto.randomBytes(16).toString("hex"),
  };
  // Token fingerprint: bind to browser family + platform (stable across version updates)
  if (req) {
    const ua = req.get('user-agent') || '';
    let browser = 'unknown';
    if (/Edg\//i.test(ua))          browser = 'Edge';
    else if (/OPR\//i.test(ua))     browser = 'Opera';
    else if (/Chrome\//i.test(ua))  browser = 'Chrome';
    else if (/Firefox\//i.test(ua)) browser = 'Firefox';
    else if (/Safari\//i.test(ua))  browser = 'Safari';
    let platform = 'unknown';
    if (/Windows/i.test(ua))        platform = 'Windows';
    else if (/Macintosh/i.test(ua)) platform = 'Mac';
    else if (/Linux/i.test(ua))     platform = 'Linux';
    else if (/Android/i.test(ua))   platform = 'Android';
    else if (/iPhone|iPad/i.test(ua)) platform = 'iOS';
    payload.fgp = crypto.createHash('sha256').update(`${browser}|${platform}`).digest('hex').substring(0, 16);
  }
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRE || "15m" }
  );
};

/**
 * Generate refresh token (long-lived)
 */
const generateRefreshToken = (userId) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is required');
  }
  return jwt.sign(
    {
      id: userId,
      type: "refresh",
      jti: crypto.randomBytes(16).toString("hex"),
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d" }
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

    await redis.setex(
      `refresh_token:${tokenId}`,
      expiresIn,
      JSON.stringify(sessionData),
    );

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

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
    path: "/",
    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth",
    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
  });

  // Also set a non-httpOnly token for client-side checks
  res.cookie("tokenExists", "true", {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
    path: "/",
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
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/auth",
  });

  res.clearCookie("tokenExists", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
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
      process.env.JWT_REFRESH_SECRET,
    );

    if (decoded.type !== "refresh") {
      return null;
    }

    const tokenData = await redis.get(`refresh_token:${decoded.jti}`);
    if (!tokenData) {
      return null;
    }

    const session = typeof tokenData === 'string' ? JSON.parse(tokenData) : tokenData;

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
      const session = typeof tokenData === 'string' ? JSON.parse(tokenData) : tokenData;
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
 * Revoke refresh token by JTI
 */
const revokeRefreshTokenByJti = async (jti) => {
  try {
    const redis = require("../config/redis");
    await redis.del(`refresh_token:${jti}`);
    logger.info("✅ Refresh token revoked by JTI", { jti });
    return true;
  } catch (error) {
    logger.error("❌ Error revoking refresh token by JTI:", error);
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
 * Returns { tokens } on success, { error: 'invalid' } for bad tokens,
 * or { error: 'transient' } for temporary failures (Redis/network).
 */
const refreshTokens = async (refreshToken) => {
  try {
    const session = await verifyRefreshToken(refreshToken);
    if (!session) {
      // Token is genuinely invalid / expired / revoked
      return { error: 'invalid' };
    }

    // Note: refreshTokens has no access to the original request, so
    // the fingerprint won't be embedded during silent rotation.
    // The authMiddleware.refreshToken handler passes req indirectly.
    const newAccessToken = generateAccessToken(session.userId);
    const newRefreshToken = generateRefreshToken(session.userId);

    await revokeRefreshToken(refreshToken);
    await storeRefreshToken(session.userId, newRefreshToken);

    logger.info("🔄 Token rotation complete", {
      userId: session.userId,
    });

    return {
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  } catch (error) {
    logger.error("❌ Error refreshing tokens (transient):", error);
    // Transient error (Redis timeout, network blip) — don't treat as invalid
    return { error: 'transient' };
  }
};

/**
 * Send token response with HTTP-only cookies
 */
const sendTokenResponse = async (user, statusCode, res, message) => {
  try {
    const accessToken = generateAccessToken(user._id, res.req);
    const refreshToken = generateRefreshToken(user._id);

    await storeRefreshToken(user._id.toString(), refreshToken, res.req);
    setTokenCookies(res, accessToken, refreshToken);

    const profileImageUrl = user.getProfileImage ? user.getProfileImage() : 
                           (user.profileImage || user.googleProfileImage || user.avatar || null);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      profileImage: user.profileImage || null,
      profileImageKey: user.profileImageKey || null,
      googleProfileImage: user.googleProfileImage || null,
      isVerified: user.isVerified,
      profileImageUrl: profileImageUrl,
      passwordExpiration: user.passwordNeedsChange
        ? user.passwordNeedsChange()
        : null,
      devices: user.devices
        ? user.devices.map((d) => deviceService.formatDeviceForDisplay(d))
        : [],
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

// ==================== FIXED: LOGIN WITH PROPER TOKEN STORAGE ====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info("🔍 Login attempt for:", { email });

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select(
      "+password +passwordHistory +devices +loginHistory",
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

    // Check account lockout BEFORE processing result
    if (user.isLocked && user.isLocked()) {
      // Log failed attempt even for locked accounts
      if (user.addLoginHistory) {
        await user.addLoginHistory({
          ipAddress: req.ip,
          userAgent: req.get("user-agent"),
          loginType: "email",
          success: false,
          failureReason: "account_locked",
        });
      }
      return res.status(423).json({
        success: false,
        message:
          "Account is temporarily locked due to too many failed attempts. Please try again after 1 hour or reset your password.",
        locked: true,
        code: 'ACCOUNT_LOCKED',
      });
    }

    if (!isPasswordMatch) {
      // Increment failed login attempts (locks after 5 failures)
      if (user.incrementLoginAttempts) {
        await user.incrementLoginAttempts();
      }

      // Log failed login attempt
      if (user.addLoginHistory) {
        await user.addLoginHistory({
          ipAddress: req.ip,
          userAgent: req.get("user-agent"),
          loginType: "email",
          success: false,
          failureReason: "invalid_password",
        });
      }

      // Log security event
      if (user.addSecurityLog) {
        await user.addSecurityLog(
          "failed_login",
          req.ip,
          req.get("user-agent"),
          { reason: "invalid_password", attempt: (user.loginAttempts || 0) + 1 }
        );
      }

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate tokens (pass req for fingerprint binding)
    const accessToken = generateAccessToken(user._id, req);
    const refreshToken = generateRefreshToken(user._id);
    const decoded = jwt.decode(refreshToken);

    // Create device session
    const deviceSession = deviceService.createDeviceSession(req, decoded.jti);

    // Update user devices
    await user.updateDeviceSession(deviceSession, decoded.jti);

    // Add to login history
    await user.addLoginHistory({
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
      deviceId: deviceSession.deviceId,
      deviceName: deviceSession.deviceName,
      location: deviceSession.location,
      loginType: "email",
      success: true,
    });

    if (user.resetLoginAttempts) {
      await user.resetLoginAttempts();
    }

    // Store tokens in Redis
    await storeRefreshToken(user._id.toString(), refreshToken, req);
    
    // Set cookies
    setTokenCookies(res, accessToken, refreshToken);

    // Prepare user response with profile image URL
    const profileImageUrl = user.getProfileImage ? user.getProfileImage() : 
                           (user.profileImage || user.googleProfileImage || user.avatar || null);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      profileImage: user.profileImage || null,
      profileImageKey: user.profileImageKey || null,
      googleProfileImage: user.googleProfileImage || null,
      isVerified: user.isVerified,
      profileImageUrl: profileImageUrl,
      devices: user.devices.map((d) => deviceService.formatDeviceForDisplay(d)),
      currentDevice: deviceService.formatDeviceForDisplay(deviceSession),
      passwordExpiration: user.passwordNeedsChange
        ? user.passwordNeedsChange()
        : null,
    };

    // Check Redis image cache — if user logged out earlier, their image is here
    let cachedImage = null;
    try {
      const cached = await RedisService.getCachedProfileImage(email);
      if (cached?.url) {
        cachedImage = cached;
      }
    } catch (_) { /* non-critical */ }

    logger.info(`✅ Login successful for: ${email}`, {
      device: deviceSession.deviceName,
      location: deviceSession.location,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      cachedImage, // { url, name, cachedAt } or null
    });
  } catch (error) {
    logger.error("❌ Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== UPDATED: GOOGLE LOGIN WITH DEVICE TRACKING ====================
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

    // Generate tokens (pass req for fingerprint binding)
    const accessToken = generateAccessToken(user._id, req);
    const refreshToken = generateRefreshToken(user._id);
    const decoded = jwt.decode(refreshToken);

    // Create device session
    const deviceSession = deviceService.createDeviceSession(req, decoded.jti);

    // Update user devices
    await user.updateDeviceSession(deviceSession, decoded.jti);

    // Add to login history
    await user.addLoginHistory({
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
      deviceId: deviceSession.deviceId,
      deviceName: deviceSession.deviceName,
      location: deviceSession.location,
      loginType: "google",
      success: true,
    });

    // Store tokens in Redis
    await storeRefreshToken(user._id.toString(), refreshToken, req);
    setTokenCookies(res, accessToken, refreshToken);

    const message = isNew
      ? "Account created with Google"
      : "Google login successful";
    const statusCode = isNew ? 201 : 200;

    const profileImageUrl = user.getProfileImage ? user.getProfileImage() : 
                           (user.profileImage || user.googleProfileImage || user.avatar || null);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      profileImage: user.profileImage || null,
      profileImageKey: user.profileImageKey || null,
      googleProfileImage: user.googleProfileImage || null,
      isVerified: user.isVerified,
      profileImageUrl: profileImageUrl,
      devices: user.devices.map((d) => deviceService.formatDeviceForDisplay(d)),
      currentDevice: deviceService.formatDeviceForDisplay(deviceSession),
    };

    // Check Redis image cache — if user logged out earlier, their image is here
    let cachedImage = null;
    try {
      const cached = await RedisService.getCachedProfileImage(user.email);
      if (cached?.url) {
        cachedImage = cached;
      }
    } catch (_) { /* non-critical */ }

    logger.info(`✅ Google login successful for: ${user.email}`, {
      device: deviceSession.deviceName,
      location: deviceSession.location,
      isNew,
    });

    res.status(statusCode).json({
      success: true,
      message,
      user: userResponse,
      cachedImage, // { url, name, cachedAt } or null
    });
  } catch (error) {
    logger.error("❌ Google Token Auth Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid Google token",
    });
  }
};

// ==================== UPDATED: LOGOUT WITH DEVICE CLEANUP + IMAGE CACHING ====================
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      const decoded = jwt.decode(refreshToken);

      // Deactivate session & cache profile image before clearing
      if (decoded?.id) {
        const user = await User.findById(decoded.id);
        if (user) {
          await user.deactivateSession(decoded.jti);

          // Cache the user's current profile image in Redis (survives logout)
          const imageUrl = user.getProfileImage
            ? user.getProfileImage()
            : user.profileImage || user.googleProfileImage || user.avatar || null;
          if (imageUrl && user.email) {
            await RedisService.cacheProfileImage(user.email, {
              url: imageUrl,
              name: user.name,
            });
          }
        }
      }

      // Revoke from Redis
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

// ==================== UPDATED: LOGOUT ALL DEVICES ====================
exports.logoutAll = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all session token IDs for user
    const redis = require("../config/redis");
    const tokenIds = await redis.smembers(`user_sessions:${userId}`);

    // Deactivate all sessions in user document
    const user = await User.findById(userId);
    if (user) {
      user.devices.forEach((device) => {
        device.sessions.forEach((session) => {
          session.isActive = false;
          session.logoutTime = new Date();
        });
      });
      await user.save();
    }

    // Revoke all tokens from Redis
    await revokeAllUserTokens(userId);

    // Clear cookie
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

// ==================== UPLOAD PROFILE IMAGE TO S3 ====================
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Validate image
    const validation = s3Service.validateImage(req.file);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    const userId = req.user.id;

    // Upload to S3
    const uploadResult = await s3Service.uploadProfileImage(
      req.file.buffer,
      userId,
      req.file.mimetype,
    );

    // Update user record
    const user = await User.findById(userId);

    // Delete old image if exists
    if (user.profileImageKey) {
      await s3Service.deleteImage(user.profileImageKey);
    }

    user.profileImage = uploadResult.imageUrl;
    user.profileImageKey = uploadResult.key;
    user.profileImageThumbnail = uploadResult.imageUrl;
    await user.save();

    // Log activity
    await user.addSecurityLog(
      "profile_image_updated",
      req.ip,
      req.get("user-agent"),
      { imageKey: uploadResult.key },
    );

    const profileImageUrl = user.getProfileImage ? user.getProfileImage() : 
                           (user.profileImage || user.googleProfileImage || user.avatar || null);

    // Update Redis image cache with the new S3 URL
    try {
      await RedisService.cacheProfileImage(user.email, {
        url: uploadResult.imageUrl,
        name: user.name,
      });
    } catch (_) { /* non-critical */ }

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      imageUrl: uploadResult.imageUrl,
      imageKey: uploadResult.key,
      user: {
        ...user.toJSON(),
        profileImage: uploadResult.imageUrl,
        profileImageUrl: profileImageUrl,
      }
    });
  } catch (error) {
    logger.error("❌ Profile image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload profile image",
    });
  }
};

// ==================== GENERATE UPLOAD URL FOR CLIENT-SIDE UPLOAD ====================
exports.generateUploadUrl = async (req, res) => {
  try {
    const { fileType } = req.body;
    const userId = req.user.id;

    if (!fileType || !fileType.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Valid image file type is required",
      });
    }

    const uploadData = await s3Service.generateUploadUrl(userId, fileType);

    res.status(200).json({
      success: true,
      ...uploadData,
    });
  } catch (error) {
    logger.error("❌ Generate upload URL error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate upload URL",
    });
  }
};

// ==================== GET USER DEVICES ====================
exports.getUserDevices = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const formattedDevices = user.devices.map((device) =>
      deviceService.formatDeviceForDisplay(device),
    );

    // Get current device from refresh token
    const { refreshToken } = req.cookies;
    let currentDeviceId = null;

    if (refreshToken) {
      const decoded = jwt.decode(refreshToken);
      if (decoded?.jti) {
        const currentSession = user.devices.find((d) =>
          d.sessions.some((s) => s.tokenId === decoded.jti),
        );
        currentDeviceId = currentSession?.deviceId;
      }
    }

    res.status(200).json({
      success: true,
      devices: formattedDevices,
      currentDeviceId,
    });
  } catch (error) {
    logger.error("❌ Get user devices error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get devices",
    });
  }
};

// ==================== GET LOGIN HISTORY ====================
exports.getLoginHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("loginHistory");

    const history = user.loginHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((log) => ({
        timestamp: log.timestamp,
        ipAddress: log.ipAddress,
        location: log.location
          ? `${log.location.city || ""}, ${log.location.country || ""}`.replace(
              /^, |, $/g,
              "",
            ) || "Unknown"
          : "Unknown",
        deviceName: log.deviceName || "Unknown Device",
        loginType: log.loginType,
        success: log.success,
        failureReason: log.failureReason,
      }));

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    logger.error("❌ Get login history error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get login history",
    });
  }
};

// ==================== REVOKE DEVICE ====================
exports.revokeDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);

    const device = user.devices.find((d) => d.deviceId === deviceId);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    // Check if trying to revoke current device
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      const decoded = jwt.decode(refreshToken);
      if (decoded?.jti) {
        const isCurrent = device.sessions.some(
          (s) => s.tokenId === decoded.jti,
        );
        if (isCurrent) {
          return res.status(400).json({
            success: false,
            message: "Cannot revoke current device. Use logout instead.",
          });
        }
      }
    }

    // Revoke all sessions for this device
    for (const session of device.sessions) {
      if (session.tokenId) {
        await revokeRefreshTokenByJti(session.tokenId);
      }
    }

    // Remove device
    user.devices = user.devices.filter((d) => d.deviceId !== deviceId);
    await user.save();

    logger.info("✅ Device revoked", { userId, deviceId });

    res.status(200).json({
      success: true,
      message: "Device revoked successfully",
    });
  } catch (error) {
    logger.error("❌ Revoke device error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to revoke device",
    });
  }
};

// ==================== GET GOOGLE CLIENT ID ====================
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

// ==================== REGISTRATION METHODS ====================
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

    const user = new User({
      name: pendingData.name,
      email: pendingData.email,
      password: pendingData.password,
      provider: "local",
      isVerified: true,
      lastPasswordChange: new Date(),
    });

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

    logger.info(`✅ User created in database: ${email}`);

    await RedisService.deletePendingRegistration(email);

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

// ==================== REFRESH TOKEN ====================
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided",
        code: "NO_REFRESH_TOKEN",
      });
    }

    const result = await refreshTokens(refreshToken);

    // Token is genuinely invalid / expired → clear cookies
    if (result.error === 'invalid') {
      clearTokenCookies(res);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
        code: "INVALID_REFRESH_TOKEN",
      });
    }

    // Transient failure (Redis/network blip) → DON'T clear cookies!
    // The token is probably still valid. Let the client retry.
    if (result.error === 'transient') {
      return res.status(503).json({
        success: false,
        message: "Token service temporarily unavailable. Please retry.",
        code: "SERVICE_UNAVAILABLE",
      });
    }

    setTokenCookies(res, result.tokens.accessToken, result.tokens.refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    logger.error("Refresh token error:", error);
    // DON'T clear cookies on server errors — the session may still be valid
    res.status(500).json({
      success: false,
      message: "Server error during token refresh",
      code: "SERVER_ERROR",
    });
  }
};

// ==================== CHECK AUTH ====================
exports.checkAuth = async (req, res) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      // The access token cookie may have expired (15 min maxAge) while
      // the refresh token (7 days, path=/api/auth) is still valid.
      // Return ACCESS_TOKEN_EXPIRED so the client keeps the persisted
      // user state and triggers a refresh instead of logging out.
      return res.status(200).json({
        success: true,
        isAuthenticated: false,
        code: 'ACCESS_TOKEN_EXPIRED',
      });
    }

    // --- Step 1: verify the JWT (pure crypto, no DB) ---
    let decoded;
    try {
      decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET,
      );
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        // Access token expired — DON'T try to refresh here.
        // Let the client-side interceptor call /api/auth/refresh
        // (which uses the SETNX-locked tokenUtils.refreshTokens).
        // Returning isAuthenticated:false with code so the client
        // knows it can retry after refreshing.
        return res.status(200).json({
          success: true,
          isAuthenticated: false,
          code: "ACCESS_TOKEN_EXPIRED",
        });
      }
      // Invalid / malformed token
      return res.status(200).json({
        success: true,
        isAuthenticated: false,
      });
    }

    if (decoded.type !== "access") {
      return res.status(200).json({
        success: true,
        isAuthenticated: false,
      });
    }

    // --- Step 2: fetch user from DB ---
    let user;
    try {
      user = await User.findById(decoded.id);
    } catch (dbError) {
      // MongoDB is temporarily down — return 503 so the client
      // does NOT clear the session.  The user stays logged in
      // and simply retries on the next check.
      logger.warn("checkAuth: MongoDB unreachable, keeping session", {
        error: dbError.message,
      });
      return res.status(503).json({
        success: false,
        message: "Database temporarily unavailable",
        code: "DB_UNAVAILABLE",
      });
    }

    if (!user) {
      return res.status(200).json({
        success: true,
        isAuthenticated: false,
      });
    }

    // --- Step 3: verify active session exists in Upstash Redis ---
    // NOTE: This is a soft check — JWT + MongoDB already verified the user.
    // If Redis session data is stale or missing (e.g. after MongoDB reconnect,
    // token rotation edge case), we still trust the valid access token.
    // The session info is added to the response for client-side awareness.
    let redisSessionValid = true;
    try {
      const redis = require("../config/redis");
      const sessionTokenIds = await redis.smembers(`user_sessions:${decoded.id}`);

      if (!sessionTokenIds || sessionTokenIds.length === 0) {
        logger.info("checkAuth: No active sessions in Redis for user (soft check)", { userId: decoded.id });
        redisSessionValid = false;
      } else {
        // Verify at least one session still has a valid refresh token in Redis
        let hasValidSession = false;
        for (const tokenId of sessionTokenIds) {
          const tokenData = await redis.get(`refresh_token:${tokenId}`);
          if (tokenData) {
            hasValidSession = true;
            break;
          }
        }

        if (!hasValidSession) {
          // Clean up stale session set entries (don't delete the whole set)
          logger.info("checkAuth: All Redis sessions expired for user (soft check)", { userId: decoded.id });
          redisSessionValid = false;
        }
      }
    } catch (redisError) {
      // Redis temporarily down — don't block authentication.
      logger.warn("checkAuth: Redis check failed, proceeding with JWT+DB only", {
        error: redisError.message,
        userId: decoded.id,
      });
    }

    const passwordExpiration = user.passwordNeedsChange
      ? user.passwordNeedsChange()
      : null;

    const profileImageUrl = user.getProfileImage
      ? user.getProfileImage()
      : user.profileImage || user.googleProfileImage || user.avatar || null;

    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      redisSessionValid,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
        avatar: user.avatar,
        profileImage: user.profileImage,
        profileImageKey: user.profileImageKey,
        googleProfileImage: user.googleProfileImage,
        isVerified: user.isVerified,
        profileImageUrl: profileImageUrl,
        passwordExpiration,
      },
    });
  } catch (error) {
    logger.error("Check auth error:", error);
    // Return 503 (not 500) so the client keeps the session alive
    res.status(503).json({
      success: false,
      message: "Server error",
      code: "SERVER_ERROR",
    });
  }
};

// ==================== GET PROFILE ====================
exports.getProfile = async (req, res) => {
  try {
    const user = req.user;

    const profileImageUrl = user.getProfileImage ? user.getProfileImage() : 
                           (user.profileImage || user.googleProfileImage || user.avatar || null);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      profileImage: user.profileImage,
      profileImageKey: user.profileImageKey,
      googleProfileImage: user.googleProfileImage,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      phone: user.phone || null,
      address: user.address || null,
      bio: user.bio || null,
      dateOfBirth: user.dateOfBirth || null,
      gender: user.gender || null,
      profileImageUrl: profileImageUrl,
      followersCount: user.followers?.length || 0,
      followingCount: user.following?.length || 0,
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

// ==================== UPDATE PROFILE ====================
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address, bio, dateOfBirth, gender } = req.body;
    const updateData = {};

    if (name !== undefined && name !== "") updateData.name = name;
    if (address !== undefined && address !== "") updateData.address = address;
    if (bio !== undefined && bio !== "") updateData.bio = bio;

    // Gender normalisation
    if (gender !== undefined && gender !== "") {
      const genderMap = {
        male: "male",
        female: "female",
        other: "other",
        "non-binary": "other",
        nonbinary: "other",
        "prefer not to say": "prefer-not-to-say",
        "prefer-not-to-say": "prefer-not-to-say",
        prefernottosay: "prefer-not-to-say",
      };
      const normalised = genderMap[gender.toLowerCase().trim()];
      if (normalised) {
        updateData.gender = normalised;
      }
    }

    // Phone sanitisation
    if (phone !== undefined && phone !== "") {
      const digits = String(phone).replace(/\D/g, "");
      const cleaned = digits.slice(-10);
      if (cleaned.length !== 10) {
        return res.status(400).json({
          success: false,
          message: "Phone number must be exactly 10 digits",
        });
      }
      updateData.phone = cleaned;
    }

    // Date of birth
    if (dateOfBirth !== undefined && dateOfBirth !== "") {
      const dob = new Date(dateOfBirth);
      if (isNaN(dob.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date of birth",
        });
      }
      if (dob > new Date()) {
        return res.status(400).json({
          success: false,
          message: "Date of birth cannot be in the future",
        });
      }
      updateData.dateOfBirth = dob;
    }

    // Email change (check uniqueness)
    if (email !== undefined && email !== "") {
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
      updateData.lastEmailChange = new Date();
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Log activity (non-fatal)
    try {
      await user.addSecurityLog(
        "profile_updated",
        req.ip,
        req.get("user-agent"),
        { updatedFields: Object.keys(updateData) },
      );
    } catch (logErr) {
      logger.warn("Could not log profile update activity:", logErr.message);
    }

    const profileImageUrl = user.getProfileImage ? user.getProfileImage() : 
                           (user.profileImage || user.googleProfileImage || user.avatar || null);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      address: user.address || null,
      bio: user.bio || null,
      dateOfBirth: user.dateOfBirth || null,
      gender: user.gender || null,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      profileImage: user.profileImage || null,
      profileImageKey: user.profileImageKey || null,
      googleProfileImage: user.googleProfileImage || null,
      isVerified: user.isVerified,
      profileImageUrl: profileImageUrl,
    };

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse,
    });
  } catch (error) {
    logger.error("❌ Update profile error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==================== FIXED: CHANGE PASSWORD with backward compatibility ====================
exports.changePassword = async (req, res) => {
  try {
    // FIX: Accept both confirmNewPassword and confirmPassword for backward compatibility
    const { currentPassword, newPassword, confirmNewPassword, confirmPassword } = req.body;
    
    // Use whichever confirm field is provided
    const finalConfirmPassword = confirmNewPassword || confirmPassword;

    logger.debug("Change password request received", { userId: req.user.id });

    if (!currentPassword || !newPassword || !finalConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current password, new password, and confirm password",
      });
    }

    if (newPassword !== finalConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

    // Get user with password field
    const user = await User.findById(req.user.id).select(
      "+password +passwordHistory",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Validate password strength
    const passwordValidation = await passwordSecurity.validatePassword(
      newPassword,
      user._id.toString(),
      true, // Check breach
    );

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        errors: passwordValidation.errors,
        strength: passwordValidation.strength,
      });
    }

    // Check password history
    const historyCheck = await user.isPasswordInHistory(newPassword);
    if (historyCheck.inHistory) {
      return res.status(400).json({
        success: false,
        message: historyCheck.message || "You have used this password recently. Please choose a different password.",
      });
    }

    // Add current password to history BEFORE changing it
    await user.addToPasswordHistory(currentPassword, {
      changedBy: "user",
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    user.lastPasswordChange = new Date();
    await user.save();

    // Log the activity
    try {
      await user.addSecurityLog(
        "password_changed",
        req.ip,
        req.get("user-agent"),
        { method: "user_change" },
      );
    } catch (logErr) {
      logger.warn("Could not log password change activity:", logErr.message);
    }

    // Revoke all sessions except current one
    await revokeAllUserTokens(user._id.toString());

    logger.info("Password changed successfully", { userId: user._id });

    res.status(200).json({
      success: true,
      message: "Password changed successfully. Please login again with your new password.",
    });
  } catch (error) {
    logger.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during password change",
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

// ==================== FIXED: verifyForgotPasswordOTP with proper data storage ====================
exports.verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // SECURITY: never log OTP values
    logger.debug("verifyForgotPasswordOTP called", { email });

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

    // Get pending password reset data
    const pendingData = await RedisService.getPendingPasswordReset(email);
    
    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message: "Password reset session expired or not found. Please start over.",
      });
    }

    // Verify OTP
    const otpVerification = await RedisService.verifyOTP(email, otp);
    
    if (!otpVerification.valid) {
      const attemptResult = await RedisService.incrementOTPAttempts(email);

      let errorMessage = otpVerification.reason || "Invalid OTP. Please try again.";

      if (attemptResult.blocked) {
        return res.status(429).json({
          success: false,
          message: "Too many failed attempts. Please try again in 60 seconds.",
          blocked: true,
          remainingSeconds: 60,
          attempts: attemptResult.attempts,
        });
      }

      const attemptsRemaining = 3 - attemptResult.attempts;
      return res.status(400).json({
        success: false,
        message: errorMessage,
        attemptsRemaining,
        attempts: attemptResult.attempts,
      });
    }

    // Clear OTP attempts and block
    await RedisService.clearOTPAttempts(email);
    await RedisService.clearOTPBlock(email);

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const redis = require("../config/redis");
    
    // Create a clean data object with all required fields
    const resetData = {
      userId: pendingData.userId,
      email: pendingData.email || email,
      createdAt: new Date().toISOString()
    };

    // Store in Redis with 10 minute expiry
    const stringifiedData = JSON.stringify(resetData);
    
    await redis.setex(
      `reset:${resetToken}`,
      600, // 10 minutes
      stringifiedData
    );

    // Store email separately for verification
    await redis.setex(
      `reset_email:${resetToken}`,
      600,
      email
    );

    // Clean up OTP data
    await RedisService.deleteOTP(email);
    await RedisService.deletePendingPasswordReset(email);

    logger.info("OTP verified for password reset", { email });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    logger.error("Verify forgot password OTP error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error during OTP verification" 
    });
  }
};

exports.resendForgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
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
      return res.status(200).json({
        success: true,
        message: "If that email has a pending reset, a new OTP has been sent.",
      });
    }

    const lastResendTime = pendingData.lastResendTime;
    if (lastResendTime) {
      const timeDiff = (Date.now() - new Date(lastResendTime).getTime()) / 1000;
      if (timeDiff < 60) {
        return res.status(429).json({
          success: false,
          message: "Please wait before requesting another OTP.",
          waitTime: Math.ceil(60 - timeDiff),
        });
      }
    }

    const otp = OTPGenerator.generateOTP();

    pendingData.lastResendTime = new Date().toISOString();
    pendingData.resendCount = (pendingData.resendCount || 0) + 1;

    await RedisService.storePendingPasswordReset(email, pendingData);
    await RedisService.storeOTP(email, otp);
    await RedisService.clearOTPAttempts(email);
    await RedisService.clearOTPBlock(email);

    try {
      logger.info(`📤 Resending password reset OTP email to: ${email}`);
      await EmailService.sendForgotPasswordOTPEmail(
        email,
        pendingData.username || email,
        otp,
      );
      logger.info(`✅ Resent password reset OTP to ${email}`);
    } catch (emailError) {
      logger.error(
        "❌ Failed to resend password reset email:",
        emailError.message,
      );
      return res.status(500).json({
        success: false,
        message: "Failed to resend OTP. " + emailError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "New OTP sent to your email.",
      email,
    });
  } catch (error) {
    logger.error("❌ Resend forgot password OTP error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// ==================== FIXED: resetPasswordWithToken with proper data handling ====================
exports.resetPasswordWithToken = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { email, password, confirmPassword } = req.body;

    logger.debug("Reset password request received", { email });

    // Basic validation
    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: "Reset token is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Get Redis instance
    const redis = require("../config/redis");
    
    // Check Redis connection
    try {
      await redis.ping();
    } catch (redisError) {
      logger.error("Redis connection failed during password reset:", redisError);
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Get data from Redis
    const resetKey = `reset:${resetToken}`;
    const resetEmailKey = `reset_email:${resetToken}`;
    
    const stored = await redis.get(resetKey);
    const storedEmail = await redis.get(resetEmailKey);

    // Parse stored reset data
    let data;
    
    if (!stored) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or has expired.",
      });
    }

    if (typeof stored === 'object' && stored !== null) {
      data = stored;
    } else if (typeof stored === 'string') {
      try {
        if (stored.trim().startsWith('{') || stored.trim().startsWith('[')) {
          data = JSON.parse(stored);
        } else {
          data = { userId: stored };
        }
      } catch (parseError) {
        logger.error("Failed to parse reset data:", parseError.message);
        if (stored.match(/^[0-9a-fA-F]{24}$/)) {
          data = { userId: stored };
        } else {
          return res.status(500).json({
            success: false,
            message: "Invalid stored data format",
          });
        }
      }
    } else {
      logger.error("Unexpected stored data type:", typeof stored);
      return res.status(500).json({
        success: false,
        message: "Invalid stored data format",
      });
    }

    // Validate parsed data
    if (!data || typeof data !== 'object') {
      return res.status(500).json({
        success: false,
        message: "Invalid reset data structure",
      });
    }

    // Extract userId with fallbacks
    const userId = data.userId || data.id || data._id;
    if (!userId) {
      logger.error("Missing userId in reset data");
      return res.status(500).json({
        success: false,
        message: "Invalid reset data - missing user ID",
      });
    }

    // Determine the email to validate against
    const emailToValidate = data.email || storedEmail;
    if (!emailToValidate) {
      return res.status(500).json({
        success: false,
        message: "Invalid reset data - email not found",
      });
    }

    // Validate email
    if (emailToValidate.toLowerCase() !== email.toLowerCase()) {
      logger.warn("Email mismatch during password reset", { userId });
      return res.status(400).json({
        success: false,
        message: "Email does not match the reset token.",
      });
    }

    // Find the user
    const user = await User.findById(userId).select(
      "+password +passwordHistory"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Validate password strength
    const passwordValidation = await passwordSecurity.validatePassword(
      password,
      user._id.toString(),
      true
    );

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.errors[0] || "Password does not meet security requirements",
        errors: passwordValidation.errors,
        strength: passwordValidation.strength,
      });
    }

    // Check password history
    const historyCheck = await user.isPasswordInHistory(password);
    if (historyCheck.inHistory) {
      return res.status(400).json({
        success: false,
        message: historyCheck.message,
      });
    }

    // Add current password to history
    await user.addToPasswordHistory(user.password, {
      changedBy: "reset",
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    user.lastPasswordChange = new Date();
    await user.save();

    // Delete the reset token and email mapping from Redis
    await Promise.all([
      redis.del(resetKey),
      redis.del(resetEmailKey)
    ]);

    // Revoke all existing sessions
    await revokeAllUserTokens(user._id.toString());

    // Log the activity
    try {
      await user.addSecurityLog(
        "password_reset",
        req.ip,
        req.get("user-agent"),
        { method: "otp_reset" }
      );
    } catch (logErr) {
      logger.warn("Could not log password reset activity:", logErr.message);
    }

    // Send success email
    try {
      await EmailService.sendPasswordResetSuccessEmail(user.email, user.name);
    } catch (emailErr) {
      logger.warn("Could not send reset success email:", emailErr.message);
    }

    logger.info("Password reset successfully", { userId: user._id });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    logger.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during password reset",
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

exports.getPasswordRequirements = (req, res) => {
  const requirements = passwordSecurity.getPasswordRequirements();
  res.status(200).json({
    success: true,
    requirements,
  });
};

exports.setupPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.password) {
      return res.status(400).json({
        success: false,
        message: "Password already set. Use change password instead.",
      });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    user.provider = "local";
    user.lastPasswordChange = new Date();
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password set up successfully." });
  } catch (error) {
    logger.error("Setup password error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If that email exists, a reset link has been sent.",
      });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    // SECURITY: never log the full reset URL — it contains the secret token
    logger.info('Password reset initiated (legacy)', { userId: user._id });

    return res.status(200).json({
      success: true,
      message: "Reset link sent to your email.",
    });
  } catch (error) {
    logger.error("Legacy forgot password error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select("+password +passwordHistory");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or has expired.",
      });
    }

    // SECURITY: validate password strength even on legacy route
    const passwordValidation = await passwordSecurity.validatePassword(
      req.body.password,
      user._id.toString(),
      true,
    );
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        errors: passwordValidation.errors,
      });
    }

    // SECURITY: check password history
    const historyCheck = await user.isPasswordInHistory(req.body.password);
    if (historyCheck && historyCheck.inHistory) {
      return res.status(400).json({
        success: false,
        message: historyCheck.message || "You have used this password recently.",
      });
    }

    // Add current password to history
    if (user.password && user.addToPasswordHistory) {
      await user.addToPasswordHistory(user.password, {
        changedBy: "legacy_reset",
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.lastPasswordChange = new Date();
    await user.save();

    // Revoke all sessions on password reset
    await revokeAllUserTokens(user._id.toString());

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    logger.error("Legacy reset password error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
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

// ==================== LEGACY HELPERS ====================
// DEPRECATED: Legacy token generation uses a single shared secret.
// New code should use generateAccessToken/generateRefreshToken with
// dedicated JWT_ACCESS_SECRET / JWT_REFRESH_SECRET.
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required for legacy token generation');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const legacySendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  const profileImageUrl = user.getProfileImage ? user.getProfileImage() : 
                         (user.profileImage || user.googleProfileImage || user.avatar || null);

  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    provider: user.provider,
    avatar: user.avatar,
    profileImage: user.profileImage || null,
    profileImageKey: user.profileImageKey || null,
    googleProfileImage: user.googleProfileImage || null,
    isVerified: user.isVerified,
    profileImageUrl: profileImageUrl,
  };

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: userResponse,
  });
};

exports.generateToken = generateToken;
exports.sendTokenResponse = legacySendTokenResponse;

// ==================== FOLLOW / UNFOLLOW ====================
exports.toggleFollow = async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({ success: false, message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isFollowing = targetUser.followers.some(
      (id) => id.toString() === currentUserId.toString()
    );

    if (isFollowing) {
      // Unfollow
      await User.findByIdAndUpdate(targetUserId, { $pull: { followers: currentUserId } });
      await User.findByIdAndUpdate(currentUserId, { $pull: { following: targetUserId } });
    } else {
      // Follow
      await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: currentUserId } });
      await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: targetUserId } });
    }

    const updatedTarget = await User.findById(targetUserId).select("followers");

    res.status(200).json({
      success: true,
      isFollowing: !isFollowing,
      followersCount: updatedTarget.followers.length,
    });
  } catch (error) {
    logger.error("Toggle follow error:", error);
    res.status(500).json({ success: false, message: "Failed to toggle follow" });
  }
};

// ==================== PUBLIC SELLER PROFILE ====================
exports.getSellerProfile = async (req, res) => {
  try {
    const sellerId = req.params.userId;
    const mongoose = require("mongoose");

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const seller = await User.findById(sellerId).select(
      "name email profileImage googleProfileImage avatar provider createdAt followers following"
    );

    if (!seller) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Count seller's listings across all categories
    const Electronics = require("../models/Electronics");
    const Vehicle = require("../models/Vehicle");
    const [electronicsCount, vehiclesCount] = await Promise.all([
      Electronics.countDocuments({ seller: sellerId, status: "active" }),
      Vehicle.countDocuments({ seller: sellerId, status: "active" }),
    ]);

    const profileImageUrl = seller.getProfileImage ? seller.getProfileImage() : 
      (seller.profileImage || seller.googleProfileImage || seller.avatar || null);

    res.status(200).json({
      success: true,
      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        provider: seller.provider,
        profileImageUrl,
        createdAt: seller.createdAt,
        followersCount: seller.followers?.length || 0,
        followingCount: seller.following?.length || 0,
        followers: seller.followers || [],
        listingsCount: electronicsCount + vehiclesCount,
      },
    });
  } catch (error) {
    logger.error("Get seller profile error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch seller profile" });
  }
};