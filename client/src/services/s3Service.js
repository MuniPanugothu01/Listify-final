import axios from 'axios';

class S3Service {
  constructor() {
    this.baseURL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  }

  /**
   * Generate presigned URL for direct upload to S3
   * @param {string} fileType - MIME type of the file
   * @returns {Promise<Object>} Upload URL and file key
   */
  async generateUploadUrl(fileType) {
    try {
      const response = await axios.post(
        `${this.baseURL}/auth/profile/generate-upload-url`,
        { fileType },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error generating upload URL:', error);
      throw error;
    }
  }

  /**
   * Upload file directly to S3 using presigned URL
   * @param {File} file - File to upload
   * @param {string} uploadUrl - Presigned URL
   * @param {Function} onProgress - Progress callback
   * @returns {Promise<Object>} Upload result
   */
  async uploadToS3(file, uploadUrl, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded * 100) / event.total);
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ success: true });
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed - network error'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload aborted'));
      });

      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    });
  }

  /**
   * Upload profile image with progress tracking
   * @param {File} file - Image file
   * @param {Function} onProgress - Progress callback
   * @returns {Promise<Object>} Uploaded image info
   */
  async uploadProfileImage(file, onProgress) {
    try {
      // Validate file
      this.validateImage(file);

      // Generate presigned URL
      const { uploadUrl, fileKey, imageUrl } = await this.generateUploadUrl(file.type);

      // Upload to S3
      await this.uploadToS3(file, uploadUrl, onProgress);

      return {
        success: true,
        fileKey,
        imageUrl,
      };
    } catch (error) {
      console.error('Profile image upload failed:', error);
      throw error;
    }
  }

  /**
   * Validate image file
   * @param {File} file - File to validate
   * @throws {Error} If validation fails
   */
  validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      throw new Error('No file provided');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload JPEG, PNG, GIF, or WebP.');
    }

    if (file.size > maxSize) {
      throw new Error('File too large. Maximum size is 5MB.');
    }

    return true;
  }

  /**
   * Get optimized image URL with dimensions
   * @param {string} imageUrl - Original image URL
   * @param {number} width - Desired width
   * @param {number} height - Desired height
   * @returns {string} Optimized image URL
   */
  getOptimizedImageUrl(imageUrl, width = 100, height = 100) {
    if (!imageUrl) return null;
    
    // If using CloudFront, you can add image optimization parameters
    if (imageUrl.includes('cloudfront.net')) {
      return `${imageUrl}?w=${width}&h=${height}&fit=crop`;
    }
    
    return imageUrl;
  }

  /**
   * Extract file key from S3 URL
   * @param {string} url - S3 URL
   * @returns {string|null} File key
   */
  extractFileKey(url) {
    if (!url) return null;
    
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      return pathParts.slice(1).join('/'); // Remove leading slash
    } catch (error) {
      console.error('Error extracting file key:', error);
      return null;
    }
  }
}

export default new S3Service();