import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  selectAuthLoading,
  selectAuthError,
  selectAuthSuccess,
  selectOtpSent,
  selectRegistrationEmail,
  selectResetToken,
  selectResetEmail,
  selectGoogleClientId,
  selectIsGoogleLoading,
  selectIsAuthenticated,
} from "../redux/selectors/authSelectors";
import { getErrorMessage } from "../redux/utils/errorNormalizer";
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
  checkAuth,
  initiateForgotPassword,
  verifyForgotPasswordOTP,
  resendForgotPasswordOTP,
  resetPasswordWithToken,
  getGoogleClientId,
  googleLogin,
} from "../redux/slices/authSlice";
import {
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
} from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  // Use memoized selectors — prevents unnecessary re-renders
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const success = useSelector(selectAuthSuccess);
  const otpSent = useSelector(selectOtpSent);
  const registrationEmail = useSelector(selectRegistrationEmail);
  const resetToken = useSelector(selectResetToken);
  const resetEmail = useSelector(selectResetEmail);
  const googleClientId = useSelector(selectGoogleClientId);
  const isGoogleLoading = useSelector(selectIsGoogleLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // ==================== Auth Status Check ====================
  const checkAuthStatus = async () => {
    return dispatch(checkAuth()).unwrap();
  };

  // ==================== Google Login ====================
  const GoogleLogin = async (googleToken) => {
    try {
      const result = await dispatch(googleLogin(googleToken)).unwrap();
      return { payload: result, success: true };
    } catch (error) {
      throw new Error(getErrorMessage(error, "Google login failed"));
    }
  };

  // ==================== Registration ====================
  const registerInitiate = async (userData) => {
    return dispatch(initiateRegister(userData)).unwrap();
  };

  const registerVerify = async (email, otp) => {
    try {
      return await dispatch(verifyOTP({ email, otp })).unwrap();
    } catch (error) {
      if (typeof error === "string") throw new Error(error);
      if (error?.errors) {
        throw new Error(Object.values(error.errors).join(", "));
      }
      throw new Error(getErrorMessage(error, "Invalid OTP. Please try again."));
    }
  };

  const registerResendOTP = async (email) => {
    return dispatch(resendOTP(email)).unwrap();
  };

  // ==================== Login ====================
  const login = async (credentials) => {
    return dispatch(loginUser(credentials)).unwrap();
  };

  // ==================== Logout ====================
  const logout = async () => {
    return dispatch(logoutUser()).unwrap();
  };

  const logoutAllDevices = async () => {
    return dispatch(logoutAll()).unwrap();
  };

  // ==================== Profile ====================
  const getProfile = async () => {
    return dispatch(getUserProfile()).unwrap();
  };

  const updateUserProfile = async (userData) => {
    return dispatch(updateProfile(userData)).unwrap();
  };

  const updatePassword = async (passwordData) => {
    return dispatch(changePassword(passwordData)).unwrap();
  };

  // ==================== Forgot Password ====================
  const forgotPasswordRequest = async (email) => {
    try {
      return await dispatch(initiateForgotPassword(email)).unwrap();
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to send reset OTP"));
    }
  };

  const verifyForgotPasswordOTPRequest = async (email, otp) => {
    try {
      return await dispatch(verifyForgotPasswordOTP({ email, otp })).unwrap();
    } catch (error) {
      throw new Error(getErrorMessage(error, "Invalid OTP. Please try again."));
    }
  };

  const resendForgotPasswordOTPRequest = async (email) => {
    try {
      return await dispatch(resendForgotPasswordOTP(email)).unwrap();
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to resend OTP"));
    }
  };

<<<<<<< HEAD
  // ==================== FIXED: Reset Password Request with better validation ====================
  const resetPasswordRequest = async (
    resetToken,
    email,
    password,
    confirmPassword,
  ) => {
    try {
      // Client-side validation - match backend requirements
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      if (password.length > 128) {
        throw new Error("Password cannot exceed 128 characters");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Password strength validation (must match backend)
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);

      const errors = [];
      if (!hasUpperCase) errors.push("uppercase letter");
      if (!hasLowerCase) errors.push("lowercase letter");
      if (!hasNumbers) errors.push("number");
      if (!hasSpecialChar) errors.push("special character");

      if (errors.length > 0) {
        throw new Error(
          `Password must contain at least one ${errors.join(", ")}`,
        );
      }

      console.log(
        `🔧 Calling resetPasswordWithToken with token: ${resetToken.substring(0, 8)}...`,
      );

      const result = await dispatch(
        resetPasswordWithToken({
          resetToken,
          email,
          password,
          confirmPassword,
        }),
      ).unwrap();

      return result;
    } catch (error) {
      console.error("Reset password error in hook:", error);

      // Handle different error types
      let errorMessage = "Failed to reset password";

      if (error && typeof error === "object") {
        // Handle the error object from our API interceptor
        if (error.message) {
          errorMessage = error.message;
        }
        // Handle error with data property
        else if (error.data?.message) {
          errorMessage = error.data.message;
        }
        // Handle error with response property
        else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        // Handle error with errors object
        else if (error.errors) {
          if (typeof error.errors === "object") {
            const firstError = Object.values(error.errors)[0];
            errorMessage = firstError || "Validation failed";
          } else {
            errorMessage = error.errors;
          }
        }
        // Handle error with strength property (password requirements)
        else if (error.strength) {
          errorMessage = "Password does not meet security requirements";
        }
        // Handle Error object
        else if (error instanceof Error) {
          errorMessage = error.message;
        }
        // Handle string error
        else if (typeof error === "string") {
          errorMessage = error;
        }
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      throw new Error(errorMessage);
    }
  };
=======
// ==================== Reset Password Request ====================
const resetPasswordRequest = async (
  resetToken,
  email,
  password,
  confirmPassword,
) => {
  // Client-side validation — match backend requirements
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  if (password.length > 128) {
    throw new Error("Password cannot exceed 128 characters");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);

  const missing = [];
  if (!hasUpperCase) missing.push("uppercase letter");
  if (!hasLowerCase) missing.push("lowercase letter");
  if (!hasNumbers) missing.push("number");
  if (!hasSpecialChar) missing.push("special character");

  if (missing.length > 0) {
    throw new Error(`Password must contain at least one ${missing.join(", ")}`);
  }

  try {
    return await dispatch(
      resetPasswordWithToken({ resetToken, email, password, confirmPassword }),
    ).unwrap();
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to reset password"));
  }
};
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19

  // ==================== Google Auth ====================
  const getGoogleClientIdAction = async () => {
    return dispatch(getGoogleClientId()).unwrap();
  };

  const setGoogleClientIdAction = (clientId) => {
    dispatch(setGoogleClientId(clientId));
  };

  // ==================== Utility ====================
  const clearAuthError = () => dispatch(clearError());
  const resetAuthSuccess = () => dispatch(resetSuccess());
  const setOtpSentState = (value) => dispatch(setOtpSent(value));
  const setRegistrationEmailAction = (email) => dispatch(setRegistrationEmail(email));
  const clearOtpAuthState = () => dispatch(clearOtpState());
  const setResetTokenAction = (token) => dispatch(setResetToken(token));
  const clearResetTokenAction = () => dispatch(clearResetToken());
  const setResetEmailAction = (email) => dispatch(setResetEmail(email));
  const clearResetEmailAction = () => dispatch(clearResetEmail());

  return {
    // State (via memoized selectors)
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
