/**
 * Profile Selectors
 *
 * Memoized selectors for the profile slice.
 */
import { createSelector } from "@reduxjs/toolkit";

// ── Base selector ─────────────────────────────────────────────────
const selectProfileSlice = (state) => state.profile;

// ── Atomic selectors ──────────────────────────────────────────────
export const selectProfile = (state) => state.profile.profile;
export const selectProfileDevices = (state) => state.profile.devices;
export const selectLoginHistory = (state) => state.profile.loginHistory;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;
export const selectProfileSuccess = (state) => state.profile.success;
export const selectImageUploadProgress = (state) => state.profile.imageUploadProgress;
export const selectImageUploading = (state) => state.profile.imageUploading;
export const selectProfilePicPreview = (state) => state.profile.profilePicPreview;
export const selectPasswordRequirements = (state) => state.profile.passwordRequirements;
export const selectPasswordExpiration = (state) => state.profile.passwordExpiration;
export const selectSyncToAuth = (state) => state.profile.syncToAuth;

// ── Derived selectors ─────────────────────────────────────────────

/** Best available profile image URL. */
export const selectProfileImageUrl = createSelector(
  selectProfileSlice,
  ({ profilePicPreview, profile, serverCachedImage }) =>
    profilePicPreview ||
    profile?.profileImage ||
    profile?.profileImageUrl ||
    profile?.googleProfileImage ||
    profile?.avatar ||
    serverCachedImage?.url ||
    null,
);

/** Upload status bundle for image upload UI. */
export const selectImageUploadStatus = createSelector(
  selectProfileSlice,
  ({ imageUploading, imageUploadProgress }) => ({
    uploading: imageUploading,
    progress: imageUploadProgress,
  }),
);

/** Profile status flags for UI feedback. */
export const selectProfileStatus = createSelector(
  selectProfileSlice,
  ({ loading, error, success }) => ({ loading, error, success }),
);

/** Number of active devices. */
export const selectDeviceCount = createSelector(
  selectProfileDevices,
  (devices) => devices.length,
);
