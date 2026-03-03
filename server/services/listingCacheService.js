/**
 * Listing Cache Service — Upstash Redis
 *
 * Stores individual listing data, image URLs, and search results
 * in Redis with organised, human-readable keys so they are
 * clearly visible in the Upstash Redis dashboard.
 *
 * Key namespaces:
 *   listing:{entity}:{id}         → full listing JSON
 *   listing:{entity}:{id}:images  → JSON array of image URLs
 *   listing:{entity}:{id}:meta    → lightweight metadata (title, price, location, thumb)
 *   listing:{entity}:recent       → JSON array of the latest 20 listing summaries
 *   listing:{entity}:count        → total active listing count
 *   listing:{entity}:popular      → most-viewed listings
 *   cache:stats                   → cache hit/miss counters
 */

const redis = require('../config/redis');
const { logger } = require('../utils/logger');

// TTL constants (seconds)
const TTL = {
  LISTING_DETAIL: 600,    // 10 min — individual listing
  LISTING_IMAGES: 1800,   // 30 min — image URLs change less often
  LISTING_META: 900,      // 15 min — lightweight metadata
  RECENT_LIST: 120,       // 2 min  — recent listings list
  POPULAR_LIST: 300,      // 5 min  — popular listings
  COUNT: 180,             // 3 min  — total count
  SEARCH_RESULTS: 120,    // 2 min  — search result sets
  CATEGORY_PAGE: 180,     // 3 min  — full category page (default / first load)
};

class ListingCacheService {

  // ══════════════════════════════════════════════════════════
  //  Store a full listing in cache
  // ══════════════════════════════════════════════════════════
  static async cacheListing(entity, listing) {
    if (!listing || !listing._id) return;

    const id = listing._id.toString();
    const key = `listing:${entity}:${id}`;

    try {
      // 1. Store the full listing
      await redis.setex(key, TTL.LISTING_DETAIL, JSON.stringify(listing));

      // 2. Store images separately (easy to find in Upstash dashboard)
      if (listing.images && listing.images.length > 0) {
        const imgKey = `listing:${entity}:${id}:images`;
        await redis.setex(imgKey, TTL.LISTING_IMAGES, JSON.stringify({
          listingId: id,
          title: listing.title,
          imageCount: listing.images.length,
          imageUrls: listing.images,
          cachedAt: new Date().toISOString(),
        }));
      }

      // 3. Store lightweight meta (for quick list views)
      const metaKey = `listing:${entity}:${id}:meta`;
      const meta = {
        _id: id,
        title: listing.title,
        price: listing.price,
        location: listing.location,
        condition: listing.condition,
        category: listing.category || listing.subcategory,
        thumbnail: listing.images?.[0] || null,
        sellerName: listing.sellerName,
        views: listing.views || 0,
        createdAt: listing.createdAt,
        cachedAt: new Date().toISOString(),
      };
      await redis.setex(metaKey, TTL.LISTING_META, JSON.stringify(meta));

      // Track this key in the entity index for bulk invalidation
      await redis.sadd(`listing:${entity}:index`, key, `${key}:images`, metaKey);

      logger.info(`[Cache] Stored listing ${entity}:${id} (+ images + meta)`);
      await this._incrementStat('cache:writes');
    } catch (err) {
      logger.error(`[Cache] Error caching listing ${entity}:${id}:`, err.message);
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Retrieve a cached listing
  // ══════════════════════════════════════════════════════════
  static async getCachedListing(entity, id) {
    const key = `listing:${entity}:${id}`;
    try {
      const data = await redis.get(key);
      if (data) {
        await this._incrementStat('cache:hits');
        return typeof data === 'string' ? JSON.parse(data) : data;
      }
      await this._incrementStat('cache:misses');
      return null;
    } catch (err) {
      logger.error(`[Cache] Error reading listing ${entity}:${id}:`, err.message);
      return null;
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Retrieve cached images for a listing
  // ══════════════════════════════════════════════════════════
  static async getCachedImages(entity, id) {
    const key = `listing:${entity}:${id}:images`;
    try {
      const data = await redis.get(key);
      if (data) {
        await this._incrementStat('cache:hits');
        return typeof data === 'string' ? JSON.parse(data) : data;
      }
      await this._incrementStat('cache:misses');
      return null;
    } catch (err) {
      logger.error(`[Cache] Error reading images ${entity}:${id}:`, err.message);
      return null;
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Cache a list of listings (recent / search results)
  // ══════════════════════════════════════════════════════════
  static async cacheListingList(entity, queryKey, listings, pagination, ttl = TTL.RECENT_LIST) {
    const key = `listing:${entity}:list:${queryKey}`;
    try {
      const payload = {
        entity,
        query: queryKey,
        listingCount: listings.length,
        pagination,
        // Store summaries (not full docs) to save Redis memory
        listings: listings.map((l) => ({
          _id: l._id,
          title: l.title,
          price: l.price,
          location: l.location,
          condition: l.condition,
          category: l.category || l.subcategory,
          thumbnail: l.images?.[0] || null,
          images: l.images || [],
          sellerName: l.sellerName,
          seller: l.seller,
          views: l.views || 0,
          features: l.features,
          phone: l.phone,
          status: l.status,
          savedBy: l.savedBy,
          createdAt: l.createdAt,
          // Vehicle-specific
          brand: l.brand,
          model: l.model,
          year: l.year,
          fuelType: l.fuelType,
          transmission: l.transmission,
          kmDriven: l.kmDriven,
        })),
        cachedAt: new Date().toISOString(),
      };

      await redis.setex(key, ttl, JSON.stringify(payload));
      await redis.sadd(`listing:${entity}:index`, key);

      logger.info(`[Cache] Stored listing list ${entity}:${queryKey} (${listings.length} items)`);
      await this._incrementStat('cache:writes');
    } catch (err) {
      logger.error(`[Cache] Error caching list ${entity}:${queryKey}:`, err.message);
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Retrieve a cached listing list
  // ══════════════════════════════════════════════════════════
  static async getCachedListingList(entity, queryKey) {
    const key = `listing:${entity}:list:${queryKey}`;
    try {
      const data = await redis.get(key);
      if (data) {
        await this._incrementStat('cache:hits');
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        return parsed;
      }
      await this._incrementStat('cache:misses');
      return null;
    } catch (err) {
      logger.error(`[Cache] Error reading list ${entity}:${queryKey}:`, err.message);
      return null;
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Cache uploaded image URLs after S3 upload
  // ══════════════════════════════════════════════════════════
  static async cacheUploadedImages(entity, userId, imageUrls) {
    const key = `images:uploaded:${entity}:${userId}:${Date.now()}`;
    try {
      await redis.setex(key, TTL.LISTING_IMAGES, JSON.stringify({
        userId,
        entity,
        imageUrls,
        uploadedAt: new Date().toISOString(),
      }));
      logger.info(`[Cache] Cached ${imageUrls.length} uploaded images for user ${userId}`);
    } catch (err) {
      logger.error(`[Cache] Error caching uploaded images:`, err.message);
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Cache search results
  // ══════════════════════════════════════════════════════════
  static async cacheSearchResults(entity, searchQuery, results, pagination) {
    const sanitized = searchQuery.toLowerCase().trim().replace(/\s+/g, '_');
    const key = `search:${entity}:${sanitized}`;
    try {
      await redis.setex(key, TTL.SEARCH_RESULTS, JSON.stringify({
        entity,
        query: searchQuery,
        resultCount: results.length,
        pagination,
        results: results.map((r) => ({
          _id: r._id,
          title: r.title,
          price: r.price,
          location: r.location,
          thumbnail: r.images?.[0] || null,
          images: r.images || [],
          condition: r.condition,
          sellerName: r.sellerName,
          seller: r.seller,
          views: r.views,
          features: r.features,
          phone: r.phone,
          savedBy: r.savedBy,
          brand: r.brand,
          model: r.model,
          year: r.year,
          fuelType: r.fuelType,
          transmission: r.transmission,
          kmDriven: r.kmDriven,
          createdAt: r.createdAt,
        })),
        cachedAt: new Date().toISOString(),
      }));
      await redis.sadd(`listing:${entity}:index`, key);
      logger.info(`[Cache] Cached search "${searchQuery}" for ${entity} (${results.length} results)`);
    } catch (err) {
      logger.error(`[Cache] Error caching search results:`, err.message);
    }
  }

  static async getCachedSearchResults(entity, searchQuery) {
    const sanitized = searchQuery.toLowerCase().trim().replace(/\s+/g, '_');
    const key = `search:${entity}:${sanitized}`;
    try {
      const data = await redis.get(key);
      if (data) {
        await this._incrementStat('cache:hits');
        return typeof data === 'string' ? JSON.parse(data) : data;
      }
      await this._incrementStat('cache:misses');
      return null;
    } catch (err) {
      logger.error(`[Cache] Error reading search cache:`, err.message);
      return null;
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Prefetch & cache all listings + images for a category page
  //  Called on the FIRST request to a category — subsequent
  //  requests hit cache instantly.
  // ══════════════════════════════════════════════════════════
  static async prefetchCategoryListings(entity, listings) {
    if (!listings || listings.length === 0) return;

    try {
      // Cache each individual listing + its images in parallel
      const cacheOps = listings.map(async (listing) => {
        const id = (listing._id || listing.id)?.toString();
        if (!id) return;

        // Full listing
        const key = `listing:${entity}:${id}`;
        await redis.setex(key, TTL.LISTING_DETAIL, JSON.stringify(listing));

        // Images separately (for fast image-only lookups)
        if (listing.images && listing.images.length > 0) {
          const imgKey = `listing:${entity}:${id}:images`;
          await redis.setex(imgKey, TTL.LISTING_IMAGES, JSON.stringify({
            listingId: id,
            title: listing.title,
            imageCount: listing.images.length,
            imageUrls: listing.images,
            s3Folder: entity,
            cachedAt: new Date().toISOString(),
          }));
        }

        // Lightweight meta
        const metaKey = `listing:${entity}:${id}:meta`;
        await redis.setex(metaKey, TTL.LISTING_META, JSON.stringify({
          _id: id,
          title: listing.title,
          price: listing.price,
          location: listing.location,
          condition: listing.condition,
          category: listing.category || listing.subcategory,
          thumbnail: listing.images?.[0] || null,
          sellerName: listing.sellerName,
          views: listing.views || 0,
          createdAt: listing.createdAt,
          cachedAt: new Date().toISOString(),
        }));

        // Track all keys in the entity index
        await redis.sadd(`listing:${entity}:index`, key, `${key}:images`, metaKey);
      });

      await Promise.all(cacheOps);

      // Also store an image gallery key — all images across the category in one place
      const galleryKey = `listing:${entity}:gallery`;
      const gallery = listings
        .filter((l) => l.images && l.images.length > 0)
        .map((l) => ({
          listingId: (l._id || l.id)?.toString(),
          title: l.title,
          images: l.images,
        }));
      await redis.setex(galleryKey, TTL.CATEGORY_PAGE, JSON.stringify({
        entity,
        totalListings: listings.length,
        totalImages: gallery.reduce((sum, g) => sum + g.images.length, 0),
        gallery,
        cachedAt: new Date().toISOString(),
      }));
      await redis.sadd(`listing:${entity}:index`, galleryKey);

      logger.info(`[Cache] Prefetched ${listings.length} ${entity} listings (+ images + meta + gallery)`);
      await this._incrementStat('cache:writes');
    } catch (err) {
      logger.error(`[Cache] Prefetch error for ${entity}:`, err.message);
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Get the cached image gallery for a category
  // ══════════════════════════════════════════════════════════
  static async getCategoryGallery(entity) {
    const key = `listing:${entity}:gallery`;
    try {
      const data = await redis.get(key);
      if (data) {
        await this._incrementStat('cache:hits');
        return typeof data === 'string' ? JSON.parse(data) : data;
      }
      await this._incrementStat('cache:misses');
      return null;
    } catch (err) {
      logger.error(`[Cache] Error reading gallery for ${entity}:`, err.message);
      return null;
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Invalidate all caches for an entity (or a specific listing)
  // ══════════════════════════════════════════════════════════
  static async invalidateListingCache(entity, id = null) {
    try {
      if (id) {
        // Delete specific listing caches
        await Promise.all([
          redis.del(`listing:${entity}:${id}`),
          redis.del(`listing:${entity}:${id}:images`),
          redis.del(`listing:${entity}:${id}:meta`),
        ]);
        logger.info(`[Cache] Invalidated listing ${entity}:${id}`);
      }

      // Delete all tracked keys for this entity
      const indexKey = `listing:${entity}:index`;
      const keys = await redis.smembers(indexKey);
      if (keys && keys.length > 0) {
        for (const key of keys) {
          await redis.del(key);
        }
        await redis.del(indexKey);
      }

      // Clear common keys
      await Promise.all([
        redis.del(`listing:${entity}:count`),
        redis.del(`listing:${entity}:recent`),
        redis.del(`listing:${entity}:popular`),
        redis.del(`listing:${entity}:gallery`),
      ]);

      logger.info(`[Cache] Full cache invalidation for entity: ${entity}`);
    } catch (err) {
      logger.error(`[Cache] Invalidation error for ${entity}:`, err.message);
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Cache stats (visible in Upstash dashboard under cache:stats)
  // ══════════════════════════════════════════════════════════
  static async getStats() {
    try {
      const [hits, misses, writes] = await Promise.all([
        redis.get('cache:hits'),
        redis.get('cache:misses'),
        redis.get('cache:writes'),
      ]);

      const totalHits = parseInt(hits) || 0;
      const totalMisses = parseInt(misses) || 0;
      const totalWrites = parseInt(writes) || 0;
      const total = totalHits + totalMisses;
      const hitRate = total > 0 ? ((totalHits / total) * 100).toFixed(1) : '0.0';

      return {
        hits: totalHits,
        misses: totalMisses,
        writes: totalWrites,
        total,
        hitRate: `${hitRate}%`,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      logger.error('[Cache] Error reading stats:', err.message);
      return { hits: 0, misses: 0, writes: 0, total: 0, hitRate: '0%' };
    }
  }

  // ══════════════════════════════════════════════════════════
  //  Internal: increment a stat counter
  // ══════════════════════════════════════════════════════════
  static async _incrementStat(key) {
    try {
      const val = await redis.incr(key);
      // Set a 24h TTL on first write so stats auto-reset daily
      if (val === 1) await redis.expire(key, 86400);
    } catch {
      // non-critical
    }
  }
}

module.exports = ListingCacheService;
