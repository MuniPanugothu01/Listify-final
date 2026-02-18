import api from './api';

export const profileAPI = {
  // Get user profile
  getProfile: () => {
    return api.get('/profile');
  },

  // Update user profile
  updateProfile: (userData) => {
    return api.put('/update-profile', userData);
  },

  // Upload profile image with progress tracking
  uploadProfileImage: (file, onProgress) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return api.post('/profile/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },

  // Generate upload URL for client-side upload
  generateUploadUrl: (fileType) => {
    return api.post('/profile/generate-upload-url', { fileType });
  },

  // Get user devices
  getDevices: () => {
    return api.get('/devices');
  },

  // Revoke device
  revokeDevice: (deviceId) => {
    return api.delete(`/devices/${deviceId}`);
  },

  // Get login history
  getLoginHistory: () => {
    return api.get('/login-history');
  },

  // Change password
  changePassword: (passwordData) => {
    return api.post('/change-password', passwordData);
  },

  // Get password requirements
  getPasswordRequirements: () => {
    return api.get('/password-requirements');
  },

  // Check password expiration
  checkPasswordExpiration: () => {
    return api.get('/password-expiration');
  },
};