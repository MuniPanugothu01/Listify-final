import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api";

const initialState = {
  token: localStorage.getItem("authToken"),
  user: null,
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

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (googleToken, { rejectWithValue }) => {
    try {
      const response = await authAPI.googleLogin(googleToken);
      
      // Check if the backend response indicates SUCCESS
      if (response.data && response.data.success === true) {
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "Google login failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      
      console.log("Backend response status:", response.status);
      console.log("Backend response data:", response.data);
      
      // Check HTTP status code first
      if (response.status >= 200 && response.status < 300) {
        // Check if the backend response indicates SUCCESS
        if (response.data && response.data.success === true) {
          // Store token only if success is true
          if (response.data.token) {
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
          return response.data;
        } else {
          // If backend returns success: false, treat it as an error
          console.log("Backend returned success: false");
          return rejectWithValue(response.data.message || "Login failed");
        }
      } else {
        // If HTTP status is not 2xx, treat as error
        console.log("HTTP error status:", response.status);
        return rejectWithValue(response.data.message || `HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("Login API error:", error);
      
      // Handle axios errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        
        return rejectWithValue(
          error.response.data?.message || 
          error.response.data?.error || 
          `Server error: ${error.response.status}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        return rejectWithValue("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", error.message);
        return rejectWithValue(error.message || "Login failed");
      }
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
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyOTP({ email, otp });

      if (response.data.success && response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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

export const verifyForgotPasswordOTP = createAsyncThunk(
  "auth/verifyForgotPasswordOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyForgotPasswordOTP({ email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("authToken");
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
  },
  extraReducers: (builder) => {
    builder
      // Get Google Client ID
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

      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Initiate Register
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
        state.error = action.payload;
        state.success = false;
      })

      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.otpSent = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Resend OTP
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

      // Initiate Forgot Password
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

      // Verify Forgot Password OTP
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
        state.error = action.payload;
        state.success = false;
      })

      // Resend Forgot Password OTP
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

      // Reset Password With Token
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

      // Get User Profile
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

      // Update Profile
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

      // Change Password
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
      });
  },
});

export const {
  logoutUser,
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
} = authSlice.actions;

export default authSlice.reducer;
