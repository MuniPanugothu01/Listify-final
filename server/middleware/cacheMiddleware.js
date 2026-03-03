/**
 * Redis Cache Middleware & Utilities
 *
 * - Automatic response caching for GET endpoints
 * - Cache invalidation on write operations
 * - Stale-while-revalidate support
 * - Per-entity & per-list cache keys
 */
const redis = require('../config/redis');
const { logger } = require('../utils/logger');

// ══════════════════════════════════════════════════════════
//  Cache key builders
// ══════════════════════════════════════════════════════════

const buildListKey = (entity, query = {}) => {
  const sorted = Object.keys(query)
    .sort()
    .filter((k) => query[k] !== undefined && query[k] !== '')
    .map((k) => `${k}=${query[k]}`)
    .join('&');
  return `cache:${entity}:list:${sorted || 'all'}`;
};

const buildDetailKey = (entity, id) => `cache:${entity}:detail:${id}`;

const buildPatternKey = (entity) => `cache:${entity}:*`;

// ══════════════════════════════════════════════════════════
//  Cache middleware factory
// ══════════════════════════════════════════════════════════

/**
 * Caches GET responses in Redis.
 *
 * @param {string} entity       – e.g. "electronics", "vehicles"
 * @param {number} ttlSeconds   – cache TTL (default 120s = 2 min)
 * @param {string} type         – "list" | "detail"
 */
const cacheResponse = (entity, ttlSeconds = 120, type = 'list') => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') return next();

    try {
      const cacheKey =
        type === 'detail'
          ? buildDetailKey(entity, req.params.id)
          : buildListKey(entity, req.query);

      const cached = await redis.get(cacheKey);

      if (cached) {
        const data = typeof cached === 'string' ? JSON.parse(cached) : cached;
        // Set cache-hit header
        res.setHeader('X-Cache', 'HIT');
        res.setHeader('X-Cache-Key', cacheKey);
        return res.status(200).json(data);
      }

      // Cache MISS — intercept res.json to store the response
      res.setHeader('X-Cache', 'MISS');
      const originalJson = res.json.bind(res);

      res.json = (body) => {
        // Only cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300 && body?.success) {
          redis
            .setex(cacheKey, ttlSeconds, JSON.stringify(body))
            .catch((err) => logger.error('Cache write error:', err.message));
        }
        return originalJson(body);
      };

      next();
    } catch (error) {
      logger.error('Cache middleware error — bypassing:', error.message);
      next();
    }
  };
};

// ══════════════════════════════════════════════════════════
//  Cache invalidation helpers
// ══════════════════════════════════════════════════════════

/**
 * Invalidates all list caches for an entity.
 * Called after create / update / delete.
 */
const invalidateEntityCache = async (entity, id = null) => {
  try {
    // Delete the specific detail cache if id provided
    if (id) {
      await redis.del(buildDetailKey(entity, id));
    }

    // Scan and delete all list caches for this entity
    // Using Upstash REST pattern: we track cache keys in a set
    const indexKey = `cache:${entity}:index`;
    const keys = await redis.smembers(indexKey);

    if (keys && keys.length > 0) {
      // Delete each cached key
      for (const key of keys) {
        await redis.del(key);
      }
      // Clear the index
      await redis.del(indexKey);
    }

    // Also delete the common "all" key
    await redis.del(`cache:${entity}:list:all`);

    logger.info(`Cache invalidated for entity: ${entity}${id ? `, id: ${id}` : ''}`);
  } catch (error) {
    logger.error('Cache invalidation error:', error.message);
  }
};

/**
 * Enhanced cacheResponse that also tracks keys in a set for bulk invalidation.
 */
const cacheResponseTracked = (entity, ttlSeconds = 120, type = 'list') => {
  return async (req, res, next) => {
    if (req.method !== 'GET') return next();

    try {
      const cacheKey =
        type === 'detail'
          ? buildDetailKey(entity, req.params.id)
          : buildListKey(entity, req.query);

      const cached = await redis.get(cacheKey);

      if (cached) {
        const data = typeof cached === 'string' ? JSON.parse(cached) : cached;
        res.setHeader('X-Cache', 'HIT');
        return res.status(200).json(data);
      }

      res.setHeader('X-Cache', 'MISS');
      const originalJson = res.json.bind(res);

      res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300 && body?.success) {
          const indexKey = `cache:${entity}:index`;
          Promise.all([
            redis.setex(cacheKey, ttlSeconds, JSON.stringify(body)),
            redis.sadd(indexKey, cacheKey),
            redis.expire(indexKey, ttlSeconds + 60), // index lives slightly longer
          ]).catch((err) => logger.error('Cache write error:', err.message));
        }
        return originalJson(body);
      };

      next();
    } catch (error) {
      logger.error('Cache middleware error — bypassing:', error.message);
      next();
    }
  };
};

/**
 * Middleware that invalidates cache after a write operation succeeds.
 * Use as: router.post("/", protect, invalidateAfter("electronics"), createElectronics)
 */
const invalidateAfter = (entity) => {
  return (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = (body) => {
      if (res.statusCode >= 200 && res.statusCode < 300 && body?.success) {
        // Invalidate asynchronously — don't block response
        const id = req.params?.id || body?.listing?._id;
        invalidateEntityCache(entity, id).catch(() => {});
      }
      return originalJson(body);
    };

    next();
  };
};

module.exports = {
  buildListKey,
  buildDetailKey,
  cacheResponse,
  cacheResponseTracked,
  invalidateEntityCache,
  invalidateAfter,
};
