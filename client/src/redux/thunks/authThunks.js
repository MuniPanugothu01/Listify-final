/**
 * Auth Thunks
 *
 * All async thunks for the auth domain, extracted from authSlice
 * for separation of concerns. Each thunk uses normalizeError for
 * consistent error payloads.
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api";
import { normalizeError } from "../utils/errorNormalizer";

// ── Google Auth ────────────────────────────────────────────────────

export const getGoogleClientId = createAsyncThunk(
  "auth/getGoogleClientId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getGoogleClientId();
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to load Google client ID"));
    }
  },
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (googleToken, { rejectWithValue }) => {
    try {
      const response = await authAPI.googleLogin(googleToken);

      if (response.data?.success && response.data?.user) {
        return response.data;
      }
      return rejectWithValue(
        normalizeError(response.data?.message || "Invalid server response"),
      );
    } catch (error) {
      if (error.response) {
        const msg =
          error.response.data?.message ||
          error.response.data?.error ||
          `Server error: ${error.response.status}`;
        return rejectWithValue(normalizeError(msg));
      }
      if (error.request) {
        return rejectWithValue(normalizeError("No response from server. Please try again."));
      }
      return rejectWithValue(normalizeError(error, "Google login failed"));
    }
  },
);

// ── Login / Register ───────────────────────────────────────────────

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);

      if (response.data?.success === false) {
        return rejectWithValue(normalizeError(response.data.message || "Login failed"));
      }
      if (response.data?.success === true) {
        return response.data;
      }
      return rejectWithValue(normalizeError("Invalid server response"));
    } catch (error) {
      if (error.response) {
        const msg =
          error.response.data?.message ||
          error.response.data?.error ||
          `Server error: ${error.response.status}`;
        return rejectWithValue(normalizeError(msg));
      }
      if (error.request) {
        return rejectWithValue(normalizeError("No response from server. Please try again."));
      }
      return rejectWithValue(normalizeError(error, "Login failed"));
    }
  },
);

export const initiateRegister = createAsyncThunk(
  "auth/initiateRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.initiateRegister(userData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(normalizeError(error.response.data, "Registration failed"));
      }
      return rejectWithValue(normalizeError(error, "Registration failed"));
    }
  },
);

// ── OTP Verification ──────────────────────────────────────────────

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyOTP({ email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "OTP verification failed"));
    }
  },
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.resendOTP(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to resend OTP"));
    }
  },
);

// ── Forgot / Reset Password ──────────────────────────────────────

export const initiateForgotPassword = createAsyncThunk(
  "auth/initiateForgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.initiateForgotPassword(email);
      return response.data;
    } catch (error) {
      // Pass full response data so hook can extract field-level errors
      if (error.response?.data) {
        return rejectWithValue(normalizeError(error.response.data, "Failed to send reset OTP"));
      }
      return rejectWithValue(normalizeError(error, "Failed to initiate forgot password"));
    }
  },
);

export const verifyForgotPasswordOTP = createAsyncThunk(
  "auth/verifyForgotPasswordOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyForgotPasswordOTP({ email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "OTP verification failed"));
    }
  },
);

export const resendForgotPasswordOTP = createAsyncThunk(
  "auth/resendForgotPasswordOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.resendForgotPasswordOTP(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to resend OTP"));
    }
  },
);

export const resetPasswordWithToken = createAsyncThunk(
  "auth/resetPasswordWithToken",
  async ({ resetToken, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await authAPI.resetPasswordWithToken(
        resetToken, email, password, confirmPassword,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to reset password"));
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.forgotPassword({ email });
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to send reset email"));
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ resetToken, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.resetPassword(resetToken, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to reset password"));
    }
  },
);

// ── Profile (auth-scoped) ─────────────────────────────────────────

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to load profile"));
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateProfile(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to update profile"));
    }
  },
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await authAPI.changePassword(passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to change password"));
    }
  },
);

// ── Session / Logout ──────────────────────────────────────────────

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.logout();
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Logout failed"));
    }
  },
);

export const logoutAll = createAsyncThunk(
  "auth/logoutAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.logoutAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Logout all failed"));
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.checkAuth();
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Auth check failed"));
    }
  },
);

export const getSessions = createAsyncThunk(
  "auth/getSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getSessions();
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to load sessions"));
    }
  },
);

export const revokeSession = createAsyncThunk(
  "auth/revokeSession",
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await authAPI.revokeSession(tokenId);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Failed to revoke session"));
    }
  },
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.refreshToken();
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error, "Token refresh failed"));
    }
  },
);
