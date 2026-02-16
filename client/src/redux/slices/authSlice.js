import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api";

// Helper function to get initial user state from localStorage
// We ONLY store user data, NEVER tokens
const getInitialUserState = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      // Ensure user has profileImageUrl
      if (!user.profileImageUrl) {
        user.profileImageUrl =
          user.avatar ||
          user.profileImage ||
          user.googleProfileImage ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      }
      return user;
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }
  return null;
};

const initialState = {
  // ⚠️ NO TOKEN IN STATE - Token is in HTTP-only cookie
  token: null, // Always null - we don't store tokens anymore
  user: getInitialUserState(),
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
          // ⚠️ NO TOKEN STORAGE - Token is in HTTP-only cookie
          // Only store user data
          localStorage.setItem("user", JSON.stringify(response.data.user));

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
        if (response.data.user) {
          // ⚠️ NO TOKEN STORAGE - Token is in HTTP-only cookie
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
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

      if (response.data.success && response.data.user) {
        // ⚠️ NO TOKEN STORAGE - Token is in HTTP-only cookie
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

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

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.resendOTP({ email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const initiateForgotPassword = createAsyncThunk(
  "auth/initiateForgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.initiateForgotPassword({ email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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

export const resendForgotPasswordOTP = createAsyncThunk(
  "auth/resendForgotPasswordOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.resendForgotPasswordOTP({ email });
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

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

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

      if (response.data.success) {
        const currentUserStr = localStorage.getItem("user");
        if (currentUserStr) {
          const currentUser = JSON.parse(currentUserStr);
          const updatedUser = { ...currentUser, ...response.data.user };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }

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
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("user");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const logoutAll = createAsyncThunk(
  "auth/logoutAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.logoutAll();
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      console.error("Logout all error:", error);
      localStorage.removeItem("user");
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

      if (response.data.isAuthenticated && response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else if (!response.data.isAuthenticated) {
        localStorage.removeItem("user");
      }

      return response.data;
    } catch (error) {
      localStorage.removeItem("user");
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
      localStorage.removeItem("user");
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
    refreshUserData: (state) => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (!user.profileImageUrl) {
            user.profileImageUrl =
              user.avatar ||
              user.profileImage ||
              user.googleProfileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png";
          }
          state.user = user;
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          state.user = null;
        }
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
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.isAuthenticated) {
          state.user = action.payload.user;
        } else {
          state.user = null;
        }
        state.token = null; // Always null
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.loading = false;
        // Token refreshed successfully - no state change needed
        // New token is in HTTP-only cookie
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // If refresh fails, user might need to login again
        state.user = null;
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
  refreshUserData,
} = authSlice.actions;

export default authSlice.reducer;
