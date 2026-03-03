const { Redis } = require('@upstash/redis');

// Validate environment variables
if (!process.env.UPSTASH_REDIS_REST_URL) {
  throw new Error('UPSTASH_REDIS_REST_URL is not defined in environment variables');
}

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('UPSTASH_REDIS_REST_TOKEN is not defined in environment variables');
}

// Create Redis client with production settings
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  // Automatic retries for production
  automaticRetry: true,
  // Cache settings
  enableAutoPipelining: true,
  // Timeout settings
  socket: {
    reconnectStrategy: (retries) => {
      // Exponential backoff: wait 2^retries * 100ms
      const delay = Math.min(2 ** retries * 100, 30000);
      console.log(`🔄 Redis reconnecting in ${delay}ms... (attempt ${retries})`);
      return delay;
    },
    connectTimeout: 10000, // 10 seconds
  },
});

// Test connection on startup
(async () => {
  try {
    await redis.ping();
    console.log('✅ Upstash Redis connected successfully');
    
    // Test write access
    await redis.set('connection:test', 'ok', { ex: 10 });
    console.log('✅ Redis write access confirmed');
  } catch (error) {
    console.error('❌ Upstash Redis connection failed:', error.message);
    console.error('Please check:');
    console.error('1. Your UPSTASH_REDIS_REST_URL is correct');
    console.error('2. Your UPSTASH_REDIS_REST_TOKEN is correct');
    console.error('3. Your Upstash Redis instance is active');
    
    // Don't exit in production, but log error
    console.warn('⚠️ Redis connection failed — continuing without Redis. Token management will be limited.');
  }
})();

// Graceful shutdown handler
process.on('SIGTERM', async () => {
  console.log('🛑 Closing Redis connection...');
  // Upstash Redis REST API doesn't need explicit closing
  // but we'll log it
  console.log('✅ Redis connection closed');
});

process.on('SIGINT', async () => {
  console.log('🛑 Closing Redis connection...');
  console.log('✅ Redis connection closed');
});

module.exports = redis;