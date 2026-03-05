/**
 * Advanced Rate Limiting Middleware
 * 
 * - Per-user posting limit: 10 posts per minute
 * - Per-user upload limit: 20 uploads per 5 minutes
 * - Per-IP abuse protection
 * - Redis-backed for distributed deployments
 */
const redis = require('../config/redis');
const { logger } = require('../utils/logger');

/**
 * Generic Redis-backed rate limiter factory.
 * @param {Object} opts
 * @param {string} opts.keyPrefix  – Redis key prefix
 * @param {number} opts.windowSec  – Sliding window in seconds
 * @param {number} opts.maxHits    – Max allowed hits in the window
 * @param {string} opts.message    – Error message when limit exceeded
 * @param {Function} [opts.keyFn]  – (req) => unique key suffix; defaults to user ID or IP
 */
const createRateLimiter = ({ keyPrefix, windowSec, maxHits, message, keyFn }) => {
  return async (req, res, next) => {
    try {
      const identifier = keyFn
        ? keyFn(req)
        : (req.user?._id?.toString() || req.ip);

      const key = `${keyPrefix}:${identifier}`;
      const current = await redis.incr(key);

      if (current === 1) {
        // First request in window — set expiry
        await redis.expire(key, windowSec);
      }

      // Attach rate-limit headers for client awareness
      const ttl = await redis.ttl(key);
      res.setHeader('X-RateLimit-Limit', maxHits);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxHits - current));
      res.setHeader('X-RateLimit-Reset', Math.ceil(Date.now() / 1000) + (ttl > 0 ? ttl : windowSec));

      if (current > maxHits) {
        logger.securityLog('rate_limit_exceeded', {
          ip: req.ip,
          path: req.path,
          method: req.method,
          reason: `${keyPrefix} — ${current}/${maxHits} hits`,
        });

        return res.status(429).json({
          success: false,
          message,
          retryAfter: ttl > 0 ? ttl : windowSec,
          code: 'RATE_LIMITED',
        });
      }

      next();
    } catch (error) {
      // If Redis is down, fail open (allow request) but log
      logger.error('Rate limiter Redis error — failing open:', error.message);
      next();
    }
  };
};

// ══════════════════════════════════════════════════════════
//  Pre-built limiters
// ══════════════════════════════════════════════════════════

/**
 * Posting limiter: 10 posts per 1 minute per user
 */
const postingLimiter = createRateLimiter({
  keyPrefix: 'rl:post',
  windowSec: 60,
  maxHits: 10,
  message: 'You can only create 10 posts per minute. Please slow down.',
});

/**
 * Image upload limiter: 20 uploads per 5 minutes per user
 */
const uploadLimiter = createRateLimiter({
  keyPrefix: 'rl:upload',
  windowSec: 300,
  maxHits: 20,
  message: 'Too many image uploads. Please wait a few minutes before uploading again.',
});

/**
 * Save/unsave limiter: 30 toggles per minute per user
 */
const saveLimiter = createRateLimiter({
  keyPrefix: 'rl:save',
  windowSec: 60,
  maxHits: 30,
  message: 'Too many save/unsave actions. Please slow down.',
});

/**
 * Search/read limiter: 60 requests per minute per IP (public endpoints)
 */
const searchLimiter = createRateLimiter({
  keyPrefix: 'rl:search',
  windowSec: 60,
  maxHits: 60,
  message: 'Too many search requests. Please wait before trying again.',
  keyFn: (req) => req.ip,
});

/**
 * Per-IP mutation limiter — prevents unauthenticated flooding
 * 100 mutations per 10 minutes per IP
 */
const ipMutationLimiter = createRateLimiter({
  keyPrefix: 'rl:ip_mutate',
  windowSec: 600,
  maxHits: 100,
  message: 'Too many requests from your IP. Please try again later.',
  keyFn: (req) => req.ip,
});

module.exports = {
  createRateLimiter,
  postingLimiter,
  uploadLimiter,
  saveLimiter,
  searchLimiter,
  ipMutationLimiter,
};
