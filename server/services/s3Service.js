const { 
  PutObjectCommand, 
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client } = require('../config/aws');
const { v4: uuidv4 } = require('uuid');
const { logger } = require('../utils/logger');
const sharp = require('sharp'); // For image optimization (install: npm install sharp)

class S3Service {
  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    this.bucketUrl = process.env.AWS_S3_BUCKET_URL;
    this.cloudfrontUrl = process.env.AWS_CLOUDFRONT_URL;
  }

  /**
   * Upload profile image to S3 with optimization
   * @param {Buffer} fileBuffer - Image buffer
   * @param {string} userId - User ID
   * @param {string} mimeType - MIME type
   * @returns {Promise<Object>} Upload result
   */
  async uploadProfileImage(fileBuffer, userId, mimeType) {
    try {
      // Optimize image
      const optimizedImage = await this.optimizeImage(fileBuffer);
      
      // Generate unique filename
      const fileExtension = mimeType.split('/')[1];
      const fileName = `profiles/${userId}/${uuidv4()}.${fileExtension}`;
      
      // Upload to S3
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: optimizedImage,
        ContentType: mimeType,
        CacheControl: 'max-age=31536000', // 1 year cache
        Metadata: {
          userId: userId,
          uploadedAt: new Date().toISOString(),
        },
      });

      await s3Client.send(command);

      // Generate public URL
      const imageUrl = this.getImageUrl(fileName);

      logger.info('✅ Profile image uploaded to S3', {
        userId,
        fileName,
        size: optimizedImage.length,
      });

      return {
        success: true,
        imageUrl,
        fileName,
        key: fileName,
      };
    } catch (error) {
      logger.error('❌ Failed to upload image to S3:', error);
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  /**
   * Optimize image for storage
   * @param {Buffer} buffer - Image buffer
   * @returns {Promise<Buffer>} Optimized image buffer
   */
  async optimizeImage(buffer) {
    try {
      return await sharp(buffer)
        .resize(500, 500, { // Resize to 500x500 max
          fit: 'cover',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();
    } catch (error) {
      logger.warn('Image optimization failed, using original:', error);
      return buffer; // Return original if optimization fails
    }
  }

  /**
   * Delete image from S3
   * @param {string} key - S3 object key
   * @returns {Promise<boolean>} Success status
   */
  async deleteImage(key) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await s3Client.send(command);

      logger.info('✅ Image deleted from S3', { key });
      return true;
    } catch (error) {
      logger.error('❌ Failed to delete image from S3:', error);
      return false;
    }
  }

  /**
   * Get user's profile images
   * @param {string} userId - User ID
   * @returns {Promise<Array>} List of images
   */
  async getUserImages(userId) {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: `profiles/${userId}/`,
      });

      const response = await s3Client.send(command);
      
      return (response.Contents || []).map(item => ({
        key: item.Key,
        url: this.getImageUrl(item.Key),
        size: item.Size,
        lastModified: item.LastModified,
      }));
    } catch (error) {
      logger.error('❌ Failed to list user images:', error);
      return [];
    }
  }

  /**
   * Generate pre-signed URL for temporary access
   * @param {string} key - S3 object key
   * @param {number} expiresIn - Expiry time in seconds
   * @returns {Promise<string>} Pre-signed URL
   */
  async getSignedUrl(key, expiresIn = 3600) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url = await getSignedUrl(s3Client, command, { expiresIn });
      return url;
    } catch (error) {
      logger.error('❌ Failed to generate signed URL:', error);
      throw error;
    }
  }

  /**
   * Get public image URL
   * @param {string} key - S3 object key
   * @returns {string} Public URL
   */
  getImageUrl(key) {
    if (this.cloudfrontUrl) {
      return `${this.cloudfrontUrl}/${key}`;
    }
    return `${this.bucketUrl}/${key}`;
  }

  /**
   * Generate upload URL for client-side upload
   * @param {string} userId - User ID
   * @param {string} fileType - MIME type
   * @returns {Promise<Object>} Upload URL and fields
   */
  async generateUploadUrl(userId, fileType) {
    try {
      const fileName = `profiles/${userId}/${uuidv4()}.${fileType.split('/')[1]}`;
      
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        ContentType: fileType,
        CacheControl: 'max-age=31536000',
        Metadata: {
          userId: userId,
          uploadedAt: new Date().toISOString(),
        },
      });

      const uploadUrl = await getSignedUrl(s3Client, command, { 
        expiresIn: 300, // 5 minutes
      });

      return {
        uploadUrl,
        fileKey: fileName,
        imageUrl: this.getImageUrl(fileName),
      };
    } catch (error) {
      logger.error('❌ Failed to generate upload URL:', error);
      throw error;
    }
  }

  /**
   * Validate image file
   * @param {Object} file - File object
   * @returns {Object} Validation result
   */
  validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload JPEG, PNG, GIF, or WebP.',
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File too large. Maximum size is 5MB.',
      };
    }

    return { valid: true };
  }
}

module.exports = new S3Service();