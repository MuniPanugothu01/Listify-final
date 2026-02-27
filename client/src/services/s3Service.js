// services/s3Service.js
// Handles profile image upload to AWS S3 via backend presigned URL

import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

class S3Service {
  /**
   * Upload profile image to S3 via backend presigned URL
   * Flow: Frontend → Backend (get presigned URL) → S3 (direct upload) → Backend (save URL)
   *
   * @param {File} file - The image file to upload
   * @param {Function} onProgress - Progress callback (0-100)
   * @returns {Promise<{imageUrl: string, fileKey: string}>}
   */
  async uploadProfileImage(file, onProgress) {
    // 1. Validate file
    this._validateFile(file);

    try {
      // 2. Get presigned URL from backend
      const { presignedUrl, fileKey, imageUrl } = await this._getPresignedUrl(
        file.type,
      );

      // 3. Upload directly to S3 using presigned URL
      await this._uploadToS3(presignedUrl, file, onProgress);

      return { imageUrl, fileKey };
    } catch (error) {
      console.error("S3 upload error:", error);
      throw new Error(error.message || "Failed to upload image");
    }
  }

  /**
   * Alternative: Upload via backend (backend handles S3)
   * Use this if you don't want to expose presigned URLs to frontend
   */
  async uploadProfileImageViaBackend(file, onProgress) {
    this._validateFile(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${API_URL}/auth/profile/upload-image`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              onProgress(percent);
            }
          },
        },
      );

      if (response.data.success) {
        return {
          imageUrl: response.data.imageUrl || response.data.profileImageUrl,
          fileKey: response.data.fileKey,
        };
      } else {
        throw new Error(response.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Backend upload error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload image",
      );
    }
  }

  /**
   * Get presigned URL from backend for direct S3 upload
   */
  async _getPresignedUrl(fileType) {
    try {
      const response = await axios.post(
        `${API_URL}/auth/profile/generate-upload-url`,
        { fileType },
        { withCredentials: true },
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to get upload URL");
      }

      return {
        presignedUrl: response.data.presignedUrl,
        fileKey: response.data.fileKey,
        imageUrl: response.data.imageUrl,
      };
    } catch (error) {
      console.error("Error getting presigned URL:", error);
      throw error;
    }
  }

  /**
   * Upload file directly to S3 using presigned URL
   */
  async _uploadToS3(presignedUrl, file, onProgress) {
    try {
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            onProgress(percent);
          }
        },
      });
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw error;
    }
  }

  /**
   * Validate file before upload
   */
  _validateFile(file) {
    const MAX_SIZE_MB = 50;
    const ALLOWED_TYPES = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!file) {
      throw new Error("No file provided");
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(
        "Invalid file type. Please upload JPEG, PNG, WebP, or GIF.",
      );
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      throw new Error(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
    }
  }
}

export default new S3Service();