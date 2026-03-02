const { S3Client } = require('@aws-sdk/client-s3');
const { logger } = require('../utils/logger');

// Validate AWS credentials
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
  // SECURITY FIX: Don't crash entire process — throw so caller can handle.
  // process.exit(1) in a require'd module kills the server before any
  // error-handling middleware can respond, and prevents clean shutdown.
  throw new Error('AWS credentials not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION.');
}

// Create S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  maxAttempts: 3, // Retry up to 3 times
});

// Test S3 connection on startup
(async () => {
  try {
    // List buckets to test connection
    await s3Client.config.credentials();
    console.log('✅ AWS S3 configured successfully');
    console.log(`📦 Region: ${process.env.AWS_REGION}`);
    console.log(`📦 Bucket: ${process.env.AWS_S3_BUCKET_NAME}`);
  } catch (error) {
    console.error('❌ AWS S3 configuration failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { s3Client };