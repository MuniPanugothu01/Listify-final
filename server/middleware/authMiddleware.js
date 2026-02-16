const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { 
  revokeAllUserTokens, 
  revokeRefreshToken,
  clearRefreshTokenCookie,
  verifyRefreshToken,
  refreshTokens
} = require('../utils/tokenUtils');
const { logger } = require('../utils/logger');

// Protect routes - verify JWT access token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header (Bearer token)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.'
      });
    }

    try {
      // Verify access token
      const decoded = jwt.verify(
        token, 
        process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET
      );

      // Ensure it's an access token, not refresh token
      if (decoded.type && decoded.type !== 'access') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token type. Please use access token.'
        });
      }
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists'
        });
      }
      
      // Check if user is active
      if (req.user.status !== 'active') {
        return res.status(403).json({
          success: false,
          message: `Your account is ${req.user.status}. Please contact support.`
        });
      }
      
      next();
    } catch (error) {
      // Handle specific JWT errors
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Please login again.'
        });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expired. Please refresh token or login again.',
          code: 'TOKEN_EXPIRED'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh token endpoint handler
 * Expects refresh token in HttpOnly cookie
 */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided'
      });
    }

    const tokens = await refreshTokens(refreshToken);

    if (!tokens) {
      // Clear invalid cookie
      clearRefreshTokenCookie(res);

      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    // Set new refresh token cookie
    const { setRefreshTokenCookie } = require('../utils/tokenUtils');
    setRefreshTokenCookie(res, tokens.refreshToken);

    // Return new access token
    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      token: tokens.accessToken
    });
  } catch (error) {
    logger.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token refresh'
    });
  }
};

/**
 * Logout from current device
 */
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (refreshToken) {
      // Revoke from Redis
      await revokeRefreshToken(refreshToken);
      
      // Clear cookie
      clearRefreshTokenCookie(res);
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during logout'
    });
  }
};

/**
 * Logout from all devices
 */
exports.logoutAll = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Revoke all user tokens from Redis
    await revokeAllUserTokens(userId);
    
    // Clear cookie
    clearRefreshTokenCookie(res);

    res.status(200).json({
      success: true,
      message: 'Logged out from all devices successfully'
    });
  } catch (error) {
    logger.error('Logout all error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during logout'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    
    next();
  };
};

// Optional authentication (user can be logged in or not)
exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(
          token, 
          process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET
        );
        
        if (decoded.type && decoded.type !== 'access') {
          return next();
        }
        
        req.user = await User.findById(decoded.id).select('-password');
      } catch (error) {
        // Token is invalid, but that's okay for optional auth
        logger.debug('Optional auth - invalid token:', error.message);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};