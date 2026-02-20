import { useSelector, useDispatch } from "react-redux";
import {
  initiateRegister,
  verifyOTP,
  resendOTP,
  loginUser,
  logoutUser,
  logoutAll,
  getUserProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  checkAuth,
  clearError,
  resetSuccess,
  setOtpSent,
  clearOtpState,
  initiateForgotPassword,
  verifyForgotPasswordOTP,
  resendForgotPasswordOTP,
  resetPasswordWithToken,
  setResetToken,
  clearResetToken,
  setRegistrationEmail,
  setResetEmail,
  clearResetEmail,
  getGoogleClientId,
  googleLogin,
  setGoogleClientId,
} from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    token, // Always null - don't use this
    user,
    loading,
    error,
    success,
    otpSent,
    registrationEmail,
    resetToken,
    resetEmail,
    googleClientId,
    isGoogleLoading,
  } = useSelector((state) => state.auth);

  // ==================== Auth Status Check ====================
  const checkAuthStatus = async () => {
    try {
      return await dispatch(checkAuth()).unwrap();
    } catch (error) {
      console.error("Check auth error:", error);
      throw error;
    }
  };

  // ==================== Google Login ====================
  const GoogleLogin = async (googleToken) => {
    try {
      console.log("🚀 GoogleLogin hook called");
      const result = await dispatch(googleLogin(googleToken)).unwrap();
      console.log("✅ Google login successful in hook:", result);
      return { payload: result, success: true };
    } catch (error) {
      console.error("❌ Google login error in hook:", error);

      let errorMessage = "Google login failed";

      if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.payload) {
        errorMessage =
          error.payload?.message || error.payload || "Google login failed";
      }

      throw new Error(errorMessage);
    }
  };

  // ==================== Registration ====================
  const registerInitiate = async (userData) => {
    try {
      return await dispatch(initiateRegister(userData)).unwrap();
    } catch (error) {
      console.error("Registration initiation error in hook:", error);
      // Throw the error as is - don't modify
      throw error;
    }
  };

  const registerVerify = async (email, otp) => {
    try {
      return await dispatch(verifyOTP({ email, otp })).unwrap();
    } catch (error) {
      console.error("OTP verification error in hook:", error);

      if (typeof error === "string") {
        throw new Error(error);
      } else if (error?.message) {
        throw new Error(error.message);
      } else if (error?.errors) {
        // Handle validation errors object
        const errorMessages = Object.values(error.errors).join(", ");
        throw new Error(errorMessages);
      } else {
        throw new Error("Invalid OTP. Please try again.");
      }
    }
  };

  const registerResendOTP = async (email) => {
    try {
      return await dispatch(resendOTP(email)).unwrap();
    } catch (error) {
      console.error("Resend OTP error in hook:", error);
      throw error;
    }
  };

  // ==================== Login ====================
  const login = async (credentials) => {
    try {
      return await dispatch(loginUser(credentials)).unwrap();
    } catch (error) {
      console.error("Login error in hook:", error);
      throw error;
    }
  };

  // ==================== Logout ====================
  const logout = async () => {
    try {
      return await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout error in hook:", error);
      throw error;
    }
  };

  const logoutAllDevices = async () => {
    try {
      return await dispatch(logoutAll()).unwrap();
    } catch (error) {
      console.error("Logout all error in hook:", error);
      throw error;
    }
  };

  // ==================== Profile ====================
  const getProfile = async () => {
    try {
      return await dispatch(getUserProfile()).unwrap();
    } catch (error) {
      console.error("Get profile error in hook:", error);
      throw error;
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      return await dispatch(updateProfile(userData)).unwrap();
    } catch (error) {
      console.error("Update profile error in hook:", error);
      throw error;
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      return await dispatch(changePassword(passwordData)).unwrap();
    } catch (error) {
      console.error("Change password error in hook:", error);
      throw error;
    }
  };

  // ==================== Forgot Password ====================
  const forgotPasswordRequest = async (email) => {
    try {
      return await dispatch(initiateForgotPassword(email)).unwrap();
    } catch (error) {
      console.error("Forgot password initiation error in hook:", error);

      // Extract error message properly from the API response format
      let errorMessage = "Failed to send reset OTP";

      // Handle the specific error format: {success: false, errors: {email: "message"}}
      if (error && typeof error === "object") {
        // Check if it has the errors object with email property
        if (error.errors && error.errors.email) {
          errorMessage = error.errors.email;
        }
        // Check if it has a message property
        else if (error.message) {
          errorMessage = error.message;
        }
        // Check if it has data with message
        else if (error.data?.message) {
          errorMessage = error.data.message;
        }
        // If it's a string error
        else if (typeof error === "string") {
          errorMessage = error;
        }
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      throw new Error(errorMessage);
    }
  };

  const verifyForgotPasswordOTPRequest = async (email, otp) => {
    try {
      return await dispatch(verifyForgotPasswordOTP({ email, otp })).unwrap();
    } catch (error) {
      console.error("Forgot password OTP verification error in hook:", error);

      let errorMessage = "Invalid OTP. Please try again.";

      if (error && typeof error === "object") {
        if (error.errors && error.errors.otp) {
          errorMessage = error.errors.otp;
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.errors) {
          errorMessage = Object.values(error.errors).join(", ");
        }
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      throw new Error(errorMessage);
    }
  };

  const resendForgotPasswordOTPRequest = async (email) => {
    try {
      return await dispatch(resendForgotPasswordOTP(email)).unwrap();
    } catch (error) {
      console.error("Resend forgot password OTP error in hook:", error);

      let errorMessage = "Failed to resend OTP";

      if (error && typeof error === "object") {
        if (error.errors && error.errors.email) {
          errorMessage = error.errors.email;
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.errors) {
          errorMessage = Object.values(error.errors).join(", ");
        }
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      throw new Error(errorMessage);
    }
  };

  const resetPasswordRequest = async (
    resetToken,
    email,
    password,
    confirmPassword,
  ) => {
    try {
      return await dispatch(
        resetPasswordWithToken({
          resetToken,
          email,
          password,
          confirmPassword,
        }),
      ).unwrap();
    } catch (error) {
      console.error("Reset password error in hook:", error);

      let errorMessage = "Failed to reset password";

      if (error && typeof error === "object") {
        if (error.message) {
          errorMessage = error.message;
        } else if (error.errors) {
          errorMessage = Object.values(error.errors).join(", ");
        }
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      throw new Error(errorMessage);
    }
  };

  // ==================== Google Auth ====================
  const getGoogleClientIdAction = async () => {
    try {
      return await dispatch(getGoogleClientId()).unwrap();
    } catch (error) {
      console.error("Get Google client ID error in hook:", error);
      throw error;
    }
  };

  const setGoogleClientIdAction = (clientId) => {
    dispatch(setGoogleClientId(clientId));
  };

  // ==================== Utility ====================
  const clearAuthError = () => {
    dispatch(clearError());
  };

  const resetAuthSuccess = () => {
    dispatch(resetSuccess());
  };

  const setOtpSentState = (value) => {
    dispatch(setOtpSent(value));
  };

  const setRegistrationEmailAction = (email) => {
    dispatch(setRegistrationEmail(email));
  };

  const clearOtpAuthState = () => {
    dispatch(clearOtpState());
  };

  const setResetTokenAction = (token) => {
    dispatch(setResetToken(token));
  };

  const clearResetTokenAction = () => {
    dispatch(clearResetToken());
  };

  const setResetEmailAction = (email) => {
    dispatch(setResetEmail(email));
  };

  const clearResetEmailAction = () => {
    dispatch(clearResetEmail());
  };

  // ==================== Authentication Status ====================
  // We can't rely on token state anymore, so we check user object
  const isAuthenticated = !!user;

  return {
    // State
    token: null, // Always null - don't use this
    user,
    loading,
    error,
    success,
    otpSent,
    registrationEmail,
    resetToken,
    resetEmail,
    googleClientId,
    isGoogleLoading,
    isAuthenticated,

    // Auth Status
    checkAuthStatus,

    // Registration
    registerInitiate,
    registerVerify,
    registerResendOTP,

    // Login/Profile
    login,
    logout,
    logoutAllDevices,
    getProfile,
    updateUserProfile,
    updatePassword,

    // Forgot Password
    forgotPasswordRequest,
    verifyForgotPasswordOTPRequest,
    resendForgotPasswordOTPRequest,
    resetPasswordRequest,

    // Legacy
    legacyForgotPassword: forgotPasswordRequest,
    legacyResetPassword: resetPasswordRequest,

    // Google Auth
    GoogleLogin,
    getGoogleClientIdAction,
    setGoogleClientIdAction,

    // Utility
    clearAuthError,
    resetAuthSuccess,
    setOtpSentState,
    setRegistrationEmailAction,
    clearOtpAuthState,
    setResetTokenAction,
    clearResetTokenAction,
    setResetEmailAction,
    clearResetEmailAction,
  };
};
