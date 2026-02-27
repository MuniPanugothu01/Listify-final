const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const redis = require('../config/redis');
const { logger } = require('./logger');

/**
 * Generate access token (short-lived)
 * @param {string} userId - User ID
 * @returns {string} JWT access token
 */
const generateAccessToken = (userId) => {
  return jwt.sign(
    { 
      id: userId,
      type: 'access',
      jti: crypto.randomBytes(16).toString('hex') // Unique token ID
    },
    process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m' // 15 minutes
    }
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
      type: 'refresh',
      jti: crypto.randomBytes(16).toString('hex')
    },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + 'refresh',
    { 
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' // 7 days
    }
  );
};

/**
 * Store refresh token in Upstash Redis with user session
 * @param {string} userId - User ID
 * @param {string} refreshToken - JWT refresh token
 * @param {Object} req - Express request object (for IP, userAgent)
 * @returns {Promise<boolean>} Success status
 */
const storeRefreshToken = async (userId, refreshToken, req = null) => {
  try {
    const decoded = jwt.decode(refreshToken);
    const tokenId = decoded.jti;
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    
    // Create session data
    const sessionData = {
      userId,
      tokenId,
      refreshToken,
      createdAt: new Date().toISOString(),
      ip: req?.ip || req?.connection?.remoteAddress || 'unknown',
      userAgent: req?.get('user-agent') || 'unknown',
      lastActivity: new Date().toISOString(),
      deviceInfo: req?.headers?.['x-device-info'] || null
    };

    // STORE IN UPSTASH REDIS - Auto-expire when token expires
    await redis.setex(
      `refresh_token:${tokenId}`,
      expiresIn,
      JSON.stringify(sessionData)
    );

    // Store user's active sessions set (for management/revocation)
    await redis.sadd(`user_sessions:${userId}`, tokenId);
    await redis.expire(`user_sessions:${userId}`, expiresIn);

    logger.info('✅ Refresh token stored in Upstash Redis', { 
      userId, 
      tokenId,
      expiresIn: `${expiresIn}s`
    });
    
    return true;
  } catch (error) {
    logger.error('❌ Error storing refresh token in Redis:', error);
    return false;
  }
};

/**
 * Verify refresh token and get user session from Redis
 * @param {string} refreshToken - JWT refresh token
 * @returns {Promise<Object|null>} Session data or null if invalid
 */
const verifyRefreshToken = async (refreshToken) => {
  try {
    // Verify JWT signature first
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + 'refresh'
    );

    if (decoded.type !== 'refresh') {
      logger.warn('❌ Invalid token type for refresh');
      return null;
    }

    // CHECK UPSTASH REDIS - if token exists and not revoked
    const tokenData = await redis.get(`refresh_token:${decoded.jti}`);
    
    if (!tokenData) {
      logger.warn('❌ Refresh token not found in Redis (revoked or expired)', { 
        jti: decoded.jti 
      });
      return null;
    }

    const session = typeof tokenData === 'string' ? JSON.parse(tokenData) : tokenData;
    
    // Verify token matches stored token
    if (session.refreshToken !== refreshToken) {
      logger.warn('❌ Refresh token mismatch', { jti: decoded.jti });
      return null;
    }

    // Update last activity
    session.lastActivity = new Date().toISOString();
    await redis.setex(
      `refresh_token:${decoded.jti}`,
      decoded.exp - Math.floor(Date.now() / 1000),
      JSON.stringify(session)
    );

    logger.info('✅ Refresh token verified from Redis', { 
      userId: session.userId, 
      jti: decoded.jti 
    });
    
    return session;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      logger.info('⏰ Refresh token expired');
      
      // Clean up expired token from Redis
      const decoded = jwt.decode(refreshToken);
      if (decoded?.jti) {
        await redis.del(`refresh_token:${decoded.jti}`);
        logger.info('🧹 Cleaned up expired token from Redis', { jti: decoded.jti });
      }
    } else {
      logger.error('❌ Error verifying refresh token:', error);
    }
    return null;
  }
};

/**
 * Revoke refresh token (logout single device)
 * @param {string} refreshToken - JWT refresh token
 * @returns {Promise<boolean>} Success status
 */
const revokeRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.decode(refreshToken);
    if (!decoded?.jti) return false;

    // Get session data to find userId
    const tokenData = await redis.get(`refresh_token:${decoded.jti}`);
    
    if (tokenData) {
      const session = typeof tokenData === 'string' ? JSON.parse(tokenData) : tokenData;
      
      // Remove from user sessions set in Redis
      await redis.srem(`user_sessions:${session.userId}`, decoded.jti);
      
      logger.info('👤 Removed token from user sessions', { 
        userId: session.userId, 
        jti: decoded.jti 
      });
    }

    // DELETE FROM UPSTASH REDIS
    await redis.del(`refresh_token:${decoded.jti}`);
    
    logger.info('✅ Refresh token revoked from Redis', { jti: decoded.jti });
    return true;
  } catch (error) {
    logger.error('❌ Error revoking refresh token:', error);
    return false;
  }
};

/**
 * Revoke all refresh tokens for a user (logout all devices)
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} Success status
 */
const revokeAllUserTokens = async (userId) => {
  try {
    // Get all session token IDs for user from Redis
    const tokenIds = await redis.smembers(`user_sessions:${userId}`);
    
    logger.info('🔍 Found user sessions to revoke', { 
      userId, 
      sessionCount: tokenIds.length 
    });
    
    // Delete each token from Redis
    if (tokenIds.length > 0) {
      const deletePromises = tokenIds.map(tokenId => 
        redis.del(`refresh_token:${tokenId}`)
      );
      await Promise.all(deletePromises);
    }
    
    // Delete user sessions set from Redis
    await redis.del(`user_sessions:${userId}`);
    
    logger.info('✅ All user tokens revoked from Redis', { 
      userId, 
      revokedCount: tokenIds.length 
    });
    
    return true;
  } catch (error) {
    logger.error('❌ Error revoking all user tokens:', error);
    return false;
  }
};

/**
 * Clean up expired refresh tokens (maintenance)
 * @returns {Promise<number>} Number of cleaned tokens
 */
const cleanupExpiredTokens = async () => {
  try {
    // Upstash Redis automatically expires keys with TTL
    // This function scans for any leftover or manually clean
    let cursor = '0';
    let cleanedCount = 0;
    
    do {
      // Upstash Redis supports SCAN command
      const [nextCursor, keys] = await redis.scan(cursor, {
        match: 'refresh_token:*',
        count: 100
      });
      
      cursor = nextCursor;
      
      for (const key of keys) {
        const ttl = await redis.ttl(key);
        if (ttl <= 0) {
          await redis.del(key);
          cleanedCount++;
        }
      }
    } while (cursor !== '0');
    
    logger.info('🧹 Cleaned expired tokens', { cleanedCount });
    return cleanedCount;
  } catch (error) {
    logger.error('❌ Error cleaning expired tokens:', error);
    return 0;
  }
};

/**
 * Get active sessions for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of active sessions
 */
const getUserSessions = async (userId) => {
  try {
    const tokenIds = await redis.smembers(`user_sessions:${userId}`);
    const sessions = [];
    
    for (const tokenId of tokenIds) {
      const tokenData = await redis.get(`refresh_token:${tokenId}`);
      if (tokenData) {
        const session = typeof tokenData === 'string' ? JSON.parse(tokenData) : tokenData;
        sessions.push({
          tokenId: session.tokenId,
          createdAt: session.createdAt,
          lastActivity: session.lastActivity,
          ip: session.ip,
          userAgent: session.userAgent,
          deviceInfo: session.deviceInfo
        });
      }
    }
    
    return sessions;
  } catch (error) {
    logger.error('❌ Error getting user sessions:', error);
    return [];
  }
};

/**
 * Set HTTP-only cookie with refresh token
 * @param {Object} res - Express response object
 * @param {string} refreshToken - JWT refresh token
 */
const setRefreshTokenCookie = (res, refreshToken) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,        // Prevents XSS attacks
    secure: isProduction,  // HTTPS only in production
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth', // Sent to all auth endpoints (refresh, check, logout)
    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined
  });

  logger.debug('🍪 Refresh token cookie set', {
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/api/auth'
  });
};

/**
 * Clear refresh token cookie
 * @param {Object} res - Express response object
 */
const clearRefreshTokenCookie = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/api/auth'
  });

  logger.debug('🍪 Refresh token cookie cleared');
};

/**
 * Refresh access token using refresh token (Token Rotation)
 * Uses a Redis lock (SETNX) to prevent concurrent refreshes
 * from racing and creating orphaned tokens.
 * @param {string} refreshToken - JWT refresh token
 * @returns {Promise<Object|null>} New tokens or null if failed
 */
const refreshTokens = async (refreshToken) => {
  let lockKey = null;
  try {
    // Decode to get jti for the lock key
    const decodedJwt = jwt.decode(refreshToken);
    if (!decodedJwt?.jti) return { error: 'invalid' };

    lockKey = `refresh_lock:${decodedJwt.jti}`;

    // Acquire a short-lived lock so only the first request proceeds.
    // SETNX returns 1 if the key was set (lock acquired), 0 if it already existed.
    const lockAcquired = await redis.set(lockKey, '1', { ex: 10, nx: true });

    if (!lockAcquired) {
      // Another request is already refreshing this exact token.
      // Wait briefly for the winner to finish.
      logger.info('🔒 Refresh lock exists — waiting for first request to finish', {
        jti: decodedJwt.jti,
      });

      // Wait up to 5 seconds for the first request to complete
      for (let i = 0; i < 10; i++) {
        await new Promise((r) => setTimeout(r, 500));
        const lockStillExists = await redis.get(lockKey);
        if (!lockStillExists) break;
      }

      // Return a special marker so the caller can distinguish
      // "concurrent refresh (not an error)" from "truly invalid token".
      // This prevents the middleware from sending INVALID_REFRESH_TOKEN
      // which would force-logout the user.
      return { concurrentRefresh: true };
    }

    // --- Lock acquired: proceed with rotation ---

    // Verify refresh token in Redis
    const session = await verifyRefreshToken(refreshToken);
    if (!session) {
      // Token is genuinely invalid / expired / revoked in Redis
      return { error: 'invalid' };
    }

    // Generate new tokens (ROTATION)
    const newAccessToken = generateAccessToken(session.userId);
    const newRefreshToken = generateRefreshToken(session.userId);

    // Revoke old refresh token from Redis
    await revokeRefreshToken(refreshToken);
    
    // Store new refresh token in Redis
    await storeRefreshToken(session.userId, newRefreshToken);

    logger.info('🔄 Token rotation complete', { 
      userId: session.userId,
      oldToken: decodedJwt.jti,
      newToken: jwt.decode(newRefreshToken).jti
    });

    return {
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    };
  } catch (error) {
    logger.error('❌ Error refreshing tokens (transient):', error);
    // Transient error (Redis timeout, network blip) — don't treat as invalid.
    // The caller must NOT clear the cookie for transient failures.
    return { error: 'transient' };
  } finally {
    // Release the lock
    if (lockKey) {
      await redis.del(lockKey).catch(() => {});
    }
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  cleanupExpiredTokens,
  getUserSessions,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  refreshTokens
};