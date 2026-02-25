import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileAPI } from "../../services/profileService";

const initialState = {
  profile: null,
  devices: [],
  loginHistory: [],
  loading: false,
  error: null,
  success: false,
  imageUploadProgress: 0,
  imageUploading: false,
  passwordRequirements: null,
  passwordExpiration: null,
  profilePicPreview: null,
  syncToAuth: false,
};

// ==================== PROFILE THUNKS ====================
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile();
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateProfile(profileData);
      return response.data.user;
    } catch (error) {
      console.error("Update profile error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async (file, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setImageUploading(true));
      dispatch(setImageUploadProgress(0));

      const onProgress = (progress) => {
        dispatch(setImageUploadProgress(progress));
      };

      const response = await profileAPI.uploadProfileImage(file, onProgress);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    } finally {
      dispatch(setImageUploading(false));
      dispatch(setImageUploadProgress(0));
    }
  },
);

// ==================== DEVICE THUNKS ====================
export const fetchDevices = createAsyncThunk(
  "profile/fetchDevices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getDevices();
      return response.data.devices;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const revokeDevice = createAsyncThunk(
  "profile/revokeDevice",
  async (deviceId, { rejectWithValue }) => {
    try {
      await profileAPI.revokeDevice(deviceId);
      return deviceId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchLoginHistory = createAsyncThunk(
  "profile/fetchLoginHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getLoginHistory();
      return response.data.history;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// ==================== PASSWORD THUNKS ====================
export const fetchPasswordRequirements = createAsyncThunk(
  "profile/fetchPasswordRequirements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getPasswordRequirements();
      return response.data.requirements;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchPasswordExpiration = createAsyncThunk(
  "profile/fetchPasswordExpiration",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.checkPasswordExpiration();
      return response.data.expiration;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const changeUserPassword = createAsyncThunk(
  "profile/changeUserPassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await profileAPI.changePassword(passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    resetProfileSuccess: (state) => {
      state.success = false;
    },
    setImageUploadProgress: (state, action) => {
      state.imageUploadProgress = action.payload;
    },
    setImageUploading: (state, action) => {
      state.imageUploading = action.payload;
    },
    setProfilePicPreview: (state, action) => {
      state.profilePicPreview = action.payload;
    },
    clearProfileData: (state) => {
      state.profile = null;
      state.devices = [];
      state.loginHistory = [];
      state.profilePicPreview = null;
    },
    refreshProfileImage: (state) => {
      if (state.profile) {
        state.profilePicPreview = 
          state.profile.profileImageUrl || 
          state.profile.profileImage || 
          state.profile.googleProfileImage || 
          state.profile.avatar || 
          null;
      }
    },
    setSyncToAuth: (state, action) => {
      state.syncToAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ==================== FETCH PROFILE ====================
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        if (action.payload?.profileImageUrl || action.payload?.profileImage || action.payload?.googleProfileImage || action.payload?.avatar) {
          state.profilePicPreview = 
            action.payload.profileImageUrl || 
            action.payload.profileImage || 
            action.payload.googleProfileImage || 
            action.payload.avatar;
        }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==================== UPDATE PROFILE ====================
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload;
        if (action.payload?.profileImageUrl || action.payload?.profileImage) {
          state.profilePicPreview = 
            action.payload.profileImageUrl || 
            action.payload.profileImage;
        }
        state.syncToAuth = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ==================== UPLOAD PROFILE IMAGE ====================
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.profileImage = action.payload.imageUrl;
          state.profile.profileImageUrl = action.payload.imageUrl;
          state.profile.profileImageKey = action.payload.imageKey;
          state.profilePicPreview = action.payload.imageUrl;
        }
        state.syncToAuth = true;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==================== FETCH DEVICES ====================
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==================== REVOKE DEVICE ====================
      .addCase(revokeDevice.fulfilled, (state, action) => {
        state.devices = state.devices.filter(
          (device) => device.deviceId !== action.payload,
        );
        state.success = true;
      })

      // ==================== FETCH LOGIN HISTORY ====================
      .addCase(fetchLoginHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoginHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.loginHistory = action.payload;
      })
      .addCase(fetchLoginHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==================== FETCH PASSWORD REQUIREMENTS ====================
      .addCase(fetchPasswordRequirements.fulfilled, (state, action) => {
        state.passwordRequirements = action.payload;
      })

      // ==================== FETCH PASSWORD EXPIRATION ====================
      .addCase(fetchPasswordExpiration.fulfilled, (state, action) => {
        state.passwordExpiration = action.payload;
      })

      // ==================== CHANGE PASSWORD ====================
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const {
  clearProfileError,
  resetProfileSuccess,
  setImageUploadProgress,
  setImageUploading,
  setProfilePicPreview,
  clearProfileData,
  refreshProfileImage,
  setSyncToAuth,
} = profileSlice.actions;

export default profileSlice.reducer;