/**
 * Auth Slice
 *
 * State shape + synchronous reducers + extraReducers for all auth thunks.
 * Thunks are defined in ../thunks/authThunks.js and re-exported below
 * for backward compatibility with existing component imports.
 */
import { createSlice } from "@reduxjs/toolkit";
import {
  getGoogleClientId,
  googleLogin,
  loginUser,
  initiateRegister,
  verifyOTP,
  resendOTP,
  initiateForgotPassword,
  verifyForgotPasswordOTP,
  resendForgotPasswordOTP,
  resetPasswordWithToken,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateProfile,
  changePassword,
  logoutUser,
  logoutAll,
  checkAuth,
  getSessions,
  revokeSession,
  refreshToken,
} from "../thunks/authThunks";

// Re-export all thunks so existing imports from authSlice still work
export {
  getGoogleClientId,
  googleLogin,
  loginUser,
  initiateRegister,
  verifyOTP,
  resendOTP,
  initiateForgotPassword,
  verifyForgotPasswordOTP,
  resendForgotPasswordOTP,
  resetPasswordWithToken,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateProfile,
  changePassword,
  logoutUser,
  logoutAll,
  checkAuth,
  getSessions,
  revokeSession,
  refreshToken,
};

// ── Initial State ─────────────────────────────────────────────────
const initialState = {
  // ⚠️ NO TOKEN IN STATE — token lives in HTTP-only cookie
  token: null,
  user: null, // Rehydrated by redux-persist
  // Granular loading states — avoids UI flicker when concurrent ops run
  loading: false,
  loginLoading: false,
  registerLoading: false,
  googleLoading: false,
  profileLoading: false,
  passwordLoading: false,
  sessionLoading: false,
  error: null,
  success: false,
  otpSent: false,
  registrationEmail: "",
  resetToken: "",
  resetEmail: "",
  googleClientId: "",
  isGoogleLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Manual logout action (for when API call fails)
    manualLogout: (state) => {
      state.token = null;
      state.user = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    setOtpSent: (state, action) => {
      state.otpSent = action.payload;
    },
    clearOtpState: (state) => {
      state.otpSent = false;
      state.registrationEmail = "";
    },
    setRegistrationEmail: (state, action) => {
      state.registrationEmail = action.payload;
    },
    setResetToken: (state, action) => {
      state.resetToken = action.payload;
    },
    clearResetToken: (state) => {
      state.resetToken = "";
    },
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
    clearResetEmail: (state) => {
      state.resetEmail = "";
    },
    setGoogleClientId: (state, action) => {
      state.googleClientId = action.payload;
    },
    // Update user data in Redux state directly (e.g. after profile image change)
    updateUser: (state, action) => {
      if (state.user && action.payload) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Google Client ID ──────────────────────────────────────────
      .addCase(getGoogleClientId.pending, (state) => {
        state.isGoogleLoading = true;
        state.error = null;
      })
      .addCase(getGoogleClientId.fulfilled, (state, action) => {
        state.isGoogleLoading = false;
        state.googleClientId = action.payload.clientId;
      })
      .addCase(getGoogleClientId.rejected, (state, action) => {
        state.isGoogleLoading = false;
        state.error = action.payload;
      })

      // ── Google Login ──────────────────────────────────────────────
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.googleLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.googleLoading = false;
        state.success = true;
        state.error = null;
        state.token = null;
        state.user = action.payload.user;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.googleLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ── Login ─────────────────────────────────────────────────────
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginLoading = false;
        state.success = true;
        state.token = null;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ── Initiate Register ────────────────────────────────────────
      .addCase(initiateRegister.pending, (state) => {
        state.loading = true;
        state.registerLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(initiateRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.registerLoading = false;
        state.success = true;
        state.otpSent = true;
        state.registrationEmail = action.payload.email;
      })
      .addCase(initiateRegister.rejected, (state, action) => {
        state.loading = false;
        state.registerLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ── Verify OTP ───────────────────────────────────────────────
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.registerLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.registerLoading = false;
        state.success = true;
        state.token = null;
        state.user = action.payload.user;
        state.otpSent = false;
        state.registrationEmail = "";
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.registerLoading = false;
        state.error = action.payload || "OTP verification failed";
        state.success = false;
        // Keep otpSent true so OTP screen stays open
      })

      // ── Resend OTP ───────────────────────────────────────────────
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Initiate Forgot Password ────────────────────────────────
      .addCase(initiateForgotPassword.pending, (state) => {
        state.loading = true;
        state.passwordLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(initiateForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordLoading = false;
        state.success = true;
        state.resetEmail = action.payload.email;
      })
      .addCase(initiateForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.passwordLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ── Verify Forgot Password OTP ──────────────────────────────
      .addCase(verifyForgotPasswordOTP.pending, (state) => {
        state.loading = true;
        state.passwordLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyForgotPasswordOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordLoading = false;
        state.success = true;
        state.resetToken = action.payload.resetToken;
      })
      .addCase(verifyForgotPasswordOTP.rejected, (state, action) => {
        state.loading = false;
        state.passwordLoading = false;
        state.error = action.payload || "OTP verification failed";
        state.success = false;
      })

      // ── Resend Forgot Password OTP ──────────────────────────────
      .addCase(resendForgotPasswordOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendForgotPasswordOTP.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resendForgotPasswordOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Reset Password With Token ───────────────────────────────
      .addCase(resetPasswordWithToken.pending, (state) => {
        state.loading = true;
        state.passwordLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPasswordWithToken.fulfilled, (state) => {
        state.loading = false;
        state.passwordLoading = false;
        state.success = true;
        state.resetToken = "";
        state.resetEmail = "";
      })
      .addCase(resetPasswordWithToken.rejected, (state, action) => {
        state.loading = false;
        state.passwordLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ── Get User Profile ────────────────────────────────────────
      .addCase(getUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
      })

      // ── Update Profile ──────────────────────────────────────────
      .addCase(updateProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ── Change Password ─────────────────────────────────────────
      .addCase(changePassword.pending, (state) => {
        state.passwordLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.passwordLoading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ── Logout User ─────────────────────────────────────────────
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.success = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Still clear user data even if API fails
        state.token = null;
        state.user = null;
      })

      // ── Logout All ──────────────────────────────────────────────
      .addCase(logoutAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAll.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.success = false;
      })
      .addCase(logoutAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        state.user = null;
      })

      // ── Check Auth ──────────────────────────────────────────────
      .addCase(checkAuth.pending, (state) => {
        // Don't set loading=true — runs in background
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.isAuthenticated) {
          state.user = action.payload.user;
        }
        // ACCESS_TOKEN_EXPIRED: token needs refresh — keep user
        if (
          !action.payload.isAuthenticated &&
          action.payload.code !== "ACCESS_TOKEN_EXPIRED" &&
          !state.user
        ) {
          state.user = null;
        }
        state.token = null;
      })
      .addCase(checkAuth.rejected, () => {
        // DON'T clear user on network errors — keep current session
      })

      // ── Get Sessions ────────────────────────────────────────────
      .addCase(getSessions.pending, (state) => {
        state.sessionLoading = true;
        state.error = null;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.sessionLoading = false;
        state.sessions = action.payload.sessions;
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.sessionLoading = false;
        state.error = action.payload;
      })

      // ── Revoke Session ──────────────────────────────────────────
      .addCase(revokeSession.pending, (state) => {
        state.sessionLoading = true;
        state.error = null;
      })
      .addCase(revokeSession.fulfilled, (state) => {
        state.sessionLoading = false;
        state.success = true;
      })
      .addCase(revokeSession.rejected, (state, action) => {
        state.sessionLoading = false;
        state.error = action.payload;
      })

      // ── Refresh Token ───────────────────────────────────────────
      .addCase(refreshToken.pending, (state) => {
        // Don't set loading for background refresh
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, () => {
        // Token refreshed — new token is in HTTP-only cookie
      })
      .addCase(refreshToken.rejected, () => {
        // Don't clear user — may be transient network error
      });
  },
});

export const {
  manualLogout,
  clearError,
  resetSuccess,
  setOtpSent,
  clearOtpState,
  setRegistrationEmail,
  setResetToken,
  clearResetToken,
  setResetEmail,
  clearResetEmail,
  setGoogleClientId,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;