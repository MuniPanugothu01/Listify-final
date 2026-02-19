import {
  fetchProfile,
  updateProfile,
  uploadProfileImage,
  fetchDevices,
  revokeDevice,
  fetchLoginHistory,
  clearProfileError,
  resetProfileSuccess,
  setImageUploadProgress,
  setImageUploading,
  clearProfileData,
  setProfilePicPreview,
} from '../slices/profileSlice';
import s3Service from '../../services/s3Service';

export const profileActions = {
  // Fetch profile
  getProfile: () => async (dispatch) => {
    try {
      const result = await dispatch(fetchProfile()).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Update profile
  updateProfile: (profileData) => async (dispatch) => {
    try {
      const result = await dispatch(updateProfile(profileData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Upload profile image with progress
  uploadProfileImage: (file) => async (dispatch) => {
    try {
      dispatch(setImageUploading(true));
      dispatch(setImageUploadProgress(0));

      // Create local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setProfilePicPreview(reader.result));
      };
      reader.readAsDataURL(file);

      // Upload via S3
      const onProgress = (progress) => {
        dispatch(setImageUploadProgress(progress));
      };

      const uploadResult = await s3Service.uploadProfileImage(file, onProgress);

      // Update profile with new image URL
      const result = await dispatch(
        updateProfile({
          profileImage: uploadResult.imageUrl,
          profileImageKey: uploadResult.fileKey,
        })
      ).unwrap();

      dispatch(setImageUploading(false));
      dispatch(setImageUploadProgress(100));

      return { success: true, data: result, imageUrl: uploadResult.imageUrl };
    } catch (error) {
      dispatch(setImageUploading(false));
      dispatch(setImageUploadProgress(0));
      return { success: false, error: error.message };
    }
  },

  // Fetch devices
  getDevices: () => async (dispatch) => {
    try {
      const result = await dispatch(fetchDevices()).unwrap();
      return { success: true, devices: result.devices };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Revoke device
  revokeDevice: (deviceId) => async (dispatch) => {
    try {
      const result = await dispatch(revokeDevice(deviceId)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Fetch login history
  getLoginHistory: () => async (dispatch) => {
    try {
      const result = await dispatch(fetchLoginHistory()).unwrap();
      return { success: true, history: result.history };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Clear profile error
  clearError: () => (dispatch) => {
    dispatch(clearProfileError());
  },

  // Reset profile success
  resetSuccess: () => (dispatch) => {
    dispatch(resetProfileSuccess());
  },

  // Clear profile data (on logout)
  clearProfileData: () => (dispatch) => {
    dispatch(clearProfileData());
  },

  // Set profile pic preview
  setProfilePicPreview: (preview) => (dispatch) => {
    dispatch(setProfilePicPreview(preview));
  },

  // Set image upload progress
  setImageUploadProgress: (progress) => (dispatch) => {
    dispatch(setImageUploadProgress(progress));
  },

  // Set image uploading state
  setImageUploading: (isUploading) => (dispatch) => {
    dispatch(setImageUploading(isUploading));
  },
};

export default profileActions;