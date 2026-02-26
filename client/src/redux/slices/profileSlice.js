import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileAPI } from "../../services/profileService";
import { googleLogin, loginUser, checkAuth, logoutUser, logoutAll } from "./authSlice";

// Helper: pick the best image URL from a user object
const pickBestImage = (user) =>
  user?.profileImage ||
  user?.profileImageUrl ||
  user?.googleProfileImage ||
  user?.avatar ||
  null;

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
  // Server-cached image from Redis (set on login if available)
  serverCachedImage: null, // { url, name, cachedAt } | null
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
        // S3 uploaded image takes priority over everything
        state.profilePicPreview = 
          state.profile.profileImage || 
          state.profile.profileImageUrl || 
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
        // Cache the best available image — S3 upload > Google > avatar
        const bestImage = pickBestImage(action.payload);
        if (bestImage) {
          state.profilePicPreview = bestImage;
        }
        // Clear server cache flag once real profile is loaded
        state.serverCachedImage = null;
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
        // S3 uploaded image (profileImage) takes priority over computed URL
        const bestImage = pickBestImage(action.payload);
        if (bestImage) {
          state.profilePicPreview = bestImage;
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
        const newUrl = action.payload.imageUrl;
        const newKey = action.payload.imageKey;
        if (state.profile && newUrl) {
          // Update all image fields to the new S3 URL
          state.profile.profileImage = newUrl;
          state.profile.profileImageUrl = newUrl;
          state.profile.profileImageKey = newKey;
          state.profilePicPreview = newUrl;
        } else if (newUrl) {
          // Profile not yet loaded — still cache the preview
          state.profilePicPreview = newUrl;
        }
        // Server-side Redis cache is updated by the upload API automatically
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
      })

      // ==================== CROSS-SLICE: Seed profile cache from auth ====================
      // Google login — cache image immediately so it persists via redux-persist
      .addCase(googleLogin.fulfilled, (state, action) => {
        const user = action.payload?.user;
        const cachedImage = action.payload?.cachedImage; // from Redis
        if (user) {
          // Seed profile fields from auth response (fetchProfile will overwrite with full data)
          if (!state.profile) {
            state.profile = user;
          } else {
            // Merge new image fields into existing profile
            state.profile.googleProfileImage = user.googleProfileImage || state.profile.googleProfileImage;
            state.profile.avatar = user.avatar || state.profile.avatar;
            if (!state.profile.profileImage) {
              state.profile.profileImage = user.profileImage;
            }
          }
          const best = pickBestImage(user);
          // Use server image first; fall back to Redis cached image for instant display
          state.profilePicPreview = best || cachedImage?.url || null;
          if (cachedImage) state.serverCachedImage = cachedImage;
        }
      })
      // Regular login — use Redis cached image from server for instant display
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload?.user;
        const cachedImage = action.payload?.cachedImage; // from Redis
        if (user) {
          if (!state.profile) {
            state.profile = user;
          }
          const best = pickBestImage(user);
          // If the server response has a good image, use it
          // Otherwise fall back to Redis cached image (from previous session)
          state.profilePicPreview = best || cachedImage?.url || null;
          if (cachedImage) state.serverCachedImage = cachedImage;
        }
      })
      // checkAuth — refresh cached image from latest DB state
      .addCase(checkAuth.fulfilled, (state, action) => {
        const user = action.payload?.user;
        if (user && action.payload?.isAuthenticated) {
          const best = pickBestImage(user);
          if (best) {
            state.profilePicPreview = best;
          }
          // Keep profile fields up-to-date
          if (state.profile) {
            state.profile.profileImage = user.profileImage ?? state.profile.profileImage;
            state.profile.profileImageUrl = user.profileImageUrl ?? state.profile.profileImageUrl;
            state.profile.googleProfileImage = user.googleProfileImage ?? state.profile.googleProfileImage;
            state.profile.avatar = user.avatar ?? state.profile.avatar;
          }
        }
      })

      // ==================== CROSS-SLICE: Clear session on logout (Redis keeps image) ====================
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(logoutUser.rejected, () => initialState)
      .addCase(logoutAll.fulfilled, () => initialState)
      .addCase(logoutAll.rejected, () => initialState);
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