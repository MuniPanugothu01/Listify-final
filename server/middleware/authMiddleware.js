const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  revokeAllUserTokens,
  revokeRefreshToken,
  clearRefreshTokenCookie,
  refreshTokens,
} = require('../utils/tokenUtils');
const { logger } = require('../utils/logger');

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: extract access token from request
// Priority: HttpOnly cookie "accessToken"  →  Authorization: Bearer header
// ─────────────────────────────────────────────────────────────────────────────
const extractAccessToken = (req) => {
  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken;
  }
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// protect — verifies access token, attaches req.user
// ─────────────────────────────────────────────────────────────────────────────
exports.protect = async (req, res, next) => {
  try {
    const token = extractAccessToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.',
        code: 'NO_TOKEN',
      });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET
      );

      // Reject refresh tokens used as access tokens
      if (decoded.type && decoded.type !== 'access') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token type. Please use access token.',
          code: 'INVALID_TOKEN_TYPE',
        });
      }

      // Wrap the DB call in its own try/catch so that MongoDB
      // connection errors return 503 (transient) instead of 401.
      // This prevents the client from logging the user out when
      // MongoDB briefly disconnects and reconnects.
      let user;
      try {
        user = await User.findById(decoded.id).select('-password');
      } catch (dbError) {
        logger.warn('protect: MongoDB temporarily unavailable', {
          error: dbError.message,
          userId: decoded.id,
        });
        return res.status(503).json({
          success: false,
          message: 'Database temporarily unavailable. Please retry.',
          code: 'DB_UNAVAILABLE',
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists.',
          code: 'USER_NOT_FOUND',
        });
      }

      if (user.status !== 'active') {
        return res.status(403).json({
          success: false,
          message: `Your account is ${user.status}. Please contact support.`,
          code: 'ACCOUNT_INACTIVE',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Please login again.',
          code: 'INVALID_TOKEN',
        });
      }
      if (error.name === 'TokenExpiredError') {
        // Don't return error here - let the frontend handle refresh
        return res.status(401).json({
          success: false,
          message: 'Token expired. Please refresh token.',
          code: 'TOKEN_EXPIRED',
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route.',
        code: 'AUTH_FAILED',
      });
    }
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// refreshToken — issues new access + refresh token pair via cookie
// ─────────────────────────────────────────────────────────────────────────────
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided.',
        code: 'NO_REFRESH_TOKEN',
      });
    }

    const result = await refreshTokens(refreshToken);

    // refreshTokens returns { concurrentRefresh: true } when another
    // request already rotated this token.  The winner set cookies in
    // its response; tell this caller to simply retry.
    if (result && result.concurrentRefresh) {
      return res.status(200).json({
        success: true,
        message: 'Token refresh handled by concurrent request. Retry.',
        code: 'CONCURRENT_REFRESH',
      });
    }

    // Transient error (Redis timeout, network blip) — do NOT clear the
    // cookie.  The token may still be perfectly valid; the server just
    // couldn't verify it right now.  Return 503 so the client retries.
    if (result?.error === 'transient') {
      logger.warn('Refresh token: transient error — keeping cookie, returning 503');
      return res.status(503).json({
        success: false,
        message: 'Temporary server error. Please retry.',
        code: 'REFRESH_TRANSIENT_ERROR',
      });
    }

    // Genuinely invalid / expired / revoked token — clear the cookie.
    if (result?.error === 'invalid' || !result?.tokens) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token.',
        code: 'INVALID_REFRESH_TOKEN',
      });
    }

    const { setRefreshTokenCookie } = require('../utils/tokenUtils');

    // Set new refresh token cookie
    setRefreshTokenCookie(res, result.tokens.refreshToken);

    // Set new access token cookie
    res.cookie('accessToken', result.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });

    // Also set a non-httpOnly token for client-side checks (optional)
    res.cookie('tokenExists', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully.',
      token: result.tokens.accessToken,
    });
  } catch (error) {
    logger.error('Refresh token error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during token refresh.',
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// logout — revoke current session, clear both cookies
// ─────────────────────────────────────────────────────────────────────────────
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    // Clear refresh token cookie
    clearRefreshTokenCookie(res);

    // Clear access token cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
    });

    // Clear tokenExists cookie
    res.clearCookie('tokenExists', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    logger.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during logout.',
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// logoutAll — revoke all tokens for the user, clear both cookies
// ─────────────────────────────────────────────────────────────────────────────
exports.logoutAll = async (req, res) => {
  try {
    const userId = req.user.id;
    await revokeAllUserTokens(userId);

    clearRefreshTokenCookie(res);
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
    });
    
    res.clearCookie('tokenExists', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out from all devices successfully.',
    });
  } catch (error) {
    logger.error('Logout all error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during logout.',
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// authorize — role-based access control
// ─────────────────────────────────────────────────────────────────────────────
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.',
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route.`,
      });
    }
    next();
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// optionalAuth — attach user if token present, else continue without error
// ─────────────────────────────────────────────────────────────────────────────
exports.optionalAuth = async (req, res, next) => {
  try {
    const token = extractAccessToken(req);

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET
        );
        if (!decoded.type || decoded.type === 'access') {
          req.user = await User.findById(decoded.id).select('-password');
        }
      } catch (error) {
        logger.debug('Optional auth — invalid token:', error.message);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};