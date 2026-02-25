import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api";

// redux-persist (configured in store.js) handles rehydrating auth state
// across page reloads — no manual localStorage needed.

const initialState = {
  // ⚠️ NO TOKEN IN STATE - Token is in HTTP-only cookie
  token: null, // Always null - we don't store tokens anymore
  user: null, // Rehydrated by redux-persist
  loading: false,
  error: null,
  success: false,
  otpSent: false,
  registrationEmail: "",
  resetToken: "",
  resetEmail: "",
  googleClientId: "",
  isGoogleLoading: false,
};

// Async Thunks
export const getGoogleClientId = createAsyncThunk(
  "auth/getGoogleClientId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getGoogleClientId();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==================== FIXED: Google Login Thunk ====================
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (googleToken, { rejectWithValue }) => {
    try {
      const response = await authAPI.googleLogin(googleToken);

      console.log("Google login response:", {
        status: response.status,
        hasData: !!response.data,
        success: response.data?.success,
        hasUser: !!response.data?.user,
      });

      // Check if we got a successful response with user data
      if (response.data) {
        if (response.data.success && response.data.user) {
          return response.data;
        } else {
          return rejectWithValue(
            response.data.message || "Invalid server response",
          );
        }
      } else {
        return rejectWithValue("No response data received");
      }
    } catch (error) {
      console.error("Google login API error:", error);

      if (error.response) {
        const errorData = error.response.data;
        const errorMessage =
          errorData?.message ||
          errorData?.error ||
          `Server error: ${error.response.status}`;
        return rejectWithValue(errorMessage);
      } else if (error.request) {
        return rejectWithValue("No response from server. Please try again.");
      } else {
        return rejectWithValue(error.message || "Google login failed");
      }
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);

      console.log("Login response:", {
        status: response.status,
        data: response.data,
        success: response.data?.success,
      });

      if (response.data && response.data.success === false) {
        return rejectWithValue(response.data.message || "Login failed");
      }

      if (response.data && response.data.success === true) {
        return response.data;
      } else {
        return rejectWithValue("Invalid server response");
      }
    } catch (error) {
      console.error("Login API error:", error);

      if (error.response) {
        const errorData = error.response.data;
        const errorMessage =
          errorData?.message ||
          errorData?.error ||
          `Server error: ${error.response.status}`;
        return rejectWithValue(errorMessage);
      } else if (error.request) {
        return rejectWithValue("No response from server. Please try again.");
      } else {
        return rejectWithValue(error.message || "Login failed");
      }
    }
  },
);

// ==================== FIXED: initiateRegister with proper error handling ====================
export const initiateRegister = createAsyncThunk(
  "auth/initiateRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.initiateRegister(userData);
      return response.data;
    } catch (error) {
      console.error("Initiate register error:", error);

      // Extract error message properly
      if (error.response?.data) {
        // If the error response has data, return it
        return rejectWithValue(error.response.data);
      } else if (error.message) {
        return rejectWithValue({ message: error.message });
      } else {
        return rejectWithValue({ message: "Registration failed" });
      }
    }
  },
);

// ==================== FIXED: verifyOTP ====================
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyOTP({ email, otp });

      return response.data;
    } catch (error) {
      console.error("OTP verification error:", error);

      // Extract the error message properly
      let errorMessage = "OTP verification failed";

      if (error.response?.data) {
        errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  },
);

// ==================== FIX: resendOTP ====================
export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.resendOTP(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==================== FIX: initiateForgotPassword ====================
export const initiateForgotPassword = createAsyncThunk(
  "auth/initiateForgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.initiateForgotPassword(email);
      return response.data;
    } catch (error) {
      // Pass the full response data object so useAuth can extract the right message
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: error.message || "Failed to initiate forgot password",
      });
    }
  },
);

// ==================== FIXED: verifyForgotPasswordOTP ====================
export const verifyForgotPasswordOTP = createAsyncThunk(
  "auth/verifyForgotPasswordOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyForgotPasswordOTP({ email, otp });
      return response.data;
    } catch (error) {
      console.error("Forgot password OTP verification error:", error);

      let errorMessage = "OTP verification failed";

      if (error.response?.data) {
        errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  },
);

// ==================== FIX: resendForgotPasswordOTP ====================
export const resendForgotPasswordOTP = createAsyncThunk(
  "auth/resendForgotPasswordOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.resendForgotPasswordOTP(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const resetPasswordWithToken = createAsyncThunk(
  "auth/resetPasswordWithToken",
  async (
    { resetToken, email, password, confirmPassword },
    { rejectWithValue },
  ) => {
    try {
      const response = await authAPI.resetPasswordWithToken(
        resetToken,
        email,
        password,
        confirmPassword,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
      return rejectWithValue(error.response?.data || error.message);
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
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getProfile();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
      return rejectWithValue(error.response?.data || error.message);
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
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==================== NEW: Logout Thunks ====================
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.logout();
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      return rejectWithValue(error.response?.data || error.message);
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
      console.error("Logout all error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==================== NEW: Check Auth Status ====================
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.checkAuth();
      return response.data;
    } catch (error) {
      // DON'T clear 5re on network/server errors (503, timeout,
      // MongoDB down, etc.). The session may still be perfectly valid —
      // the server just couldn't verify it right now.
      console.warn("checkAuth network/server error — keeping session", error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==================== NEW: Get Active Sessions ====================
export const getSessions = createAsyncThunk(
  "auth/getSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getSessions();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==================== NEW: Revoke Session ====================
export const revokeSession = createAsyncThunk(
  "auth/revokeSession",
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await authAPI.revokeSession(tokenId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==================== NEW: Refresh Token ====================
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.refreshToken();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

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
      // ==================== Get Google Client ID ====================
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

      // ==================== Google Login ====================
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.token = null; // Always null - token is in cookie
        state.user = action.payload.user;

        console.log("✅ Google login fulfilled in slice:", {
          user: !!state.user,
          success: state.success,
        });
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        console.error("❌ Google login rejected in slice:", action.payload);
      })

      // ==================== Login User ====================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = null; // Always null - token is in cookie
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ==================== Initiate Register ====================
      .addCase(initiateRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(initiateRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.otpSent = true;
        state.registrationEmail = action.payload.email;
      })
      .addCase(initiateRegister.rejected, (state, action) => {
        state.loading = false;
        // Store the error object - could be string or object
        state.error = action.payload;
        state.success = false;
      })

      // ==================== Verify OTP ====================
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = null; // Always null - token is in cookie
        state.user = action.payload.user;
        // Clear OTP state ONLY on successful verification
        state.otpSent = false;
        state.registrationEmail = "";
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
        state.success = false;
        // IMPORTANT: Keep otpSent true so OTP screen stays open
      })

      // ==================== Resend OTP ====================
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

      // ==================== Initiate Forgot Password ====================
      .addCase(initiateForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(initiateForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.resetEmail = action.payload.email;
      })
      .addCase(initiateForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ==================== Verify Forgot Password OTP ====================
      .addCase(verifyForgotPasswordOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyForgotPasswordOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.resetToken = action.payload.resetToken;
      })
      .addCase(verifyForgotPasswordOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
        state.success = false;
        // Keep resetEmail so user can try again
      })

      // ==================== Resend Forgot Password OTP ====================
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

      // ==================== Reset Password With Token ====================
      .addCase(resetPasswordWithToken.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPasswordWithToken.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.resetToken = "";
        state.resetEmail = "";
      })
      .addCase(resetPasswordWithToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ==================== Get User Profile ====================
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==================== Update Profile ====================
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ==================== Change Password ====================
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ==================== NEW: Logout User ====================
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

      // ==================== NEW: Logout All ====================
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
        // Still clear user data even if API fails
        state.token = null;
        state.user = null;
      })

      // ==================== NEW: Check Auth ====================
      .addCase(checkAuth.pending, (state) => {
        // Don't set loading=true — this runs in background
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.isAuthenticated) {
          state.user = action.payload.user;
        }
        // ACCESS_TOKEN_EXPIRED: the token just needs a refresh — keep user.
        // The interceptor / useTokenRefresh will refresh it.
        if (
          !action.payload.isAuthenticated &&
          action.payload.code !== "ACCESS_TOKEN_EXPIRED" &&
          !state.user
        ) {
          state.user = null;
        }
        state.token = null; // Always null
      })
      .addCase(checkAuth.rejected, (state) => {
        // DON'T clear user on network errors — only clear if we're sure
        // the session is truly invalid. Network hiccups shouldn't log out.
        console.warn("checkAuth failed — keeping current user state");
      })

      // ==================== NEW: Get Sessions ====================
      .addCase(getSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.loading = false;
        // Store sessions in state if needed
        state.sessions = action.payload.sessions;
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==================== NEW: Revoke Session ====================
      .addCase(revokeSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(revokeSession.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(revokeSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==================== NEW: Refresh Token ====================
      .addCase(refreshToken.pending, (state) => {
        // Don't set loading=true for background refresh — it causes UI flicker
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        // Token refreshed successfully - no state change needed
        // New token is in HTTP-only cookie
      })
      .addCase(refreshToken.rejected, (state, action) => {
        // DON'T clear user here — the refresh might have failed due to a
        // transient network error. Only clear user if we know for sure the
        // refresh token is invalid (the API interceptor handles redirect).
        console.warn("Token refresh rejected:", action.payload);
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