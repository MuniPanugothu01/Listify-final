import { useSelector, useDispatch } from "react-redux";
import {
  initiateRegister,
  verifyOTP,
  resendOTP,
  loginUser,
  logoutUser,
  getUserProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  clearError,
  resetSuccess,
  setOtpSent,
  clearOtpState,
  // OTP-based Forgot Password actions
  initiateForgotPassword,
  verifyForgotPasswordOTP,
  resendForgotPasswordOTP,
  resetPasswordWithToken,
  setResetToken,
  clearResetToken,
  setRegistrationEmail,
  setResetEmail,
  clearResetEmail,
  // Google Auth actions - MAKE SURE THESE ARE EXPORTED
  getGoogleClientId,
  googleLogin,
  setGoogleClientId,
} from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    token,
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

  // Registration functions
  const registerInitiate = (userData) => {
    return dispatch(initiateRegister(userData));
  };

  const registerVerify = (email, otp) => {
    return dispatch(verifyOTP({ email, otp }));
  };

  const registerResendOTP = (email) => {
    return dispatch(resendOTP(email));
  };

  // Login/Profile functions
  const login = (credentials) => {
    return dispatch(loginUser(credentials));
  };

  const logout = () => {
    return dispatch(logoutUser());
  };

  const getProfile = () => {
    return dispatch(getUserProfile());
  };

  const updateUserProfile = (userData) => {
    return dispatch(updateProfile(userData));
  };

  const updatePassword = (passwordData) => {
    return dispatch(changePassword(passwordData));
  };

  // OTP-based Forgot Password functions
  const forgotPasswordRequest = (email) => {
    return dispatch(initiateForgotPassword(email));
  };

  const verifyForgotPasswordOTPRequest = (email, otp) => {
    return dispatch(verifyForgotPasswordOTP({ email, otp }));
  };

  const resendForgotPasswordOTPRequest = (email) => {
    return dispatch(resendForgotPasswordOTP(email));
  };

  const resetPasswordRequest = (
    resetToken,
    email,
    password,
    confirmPassword,
  ) => {
    return dispatch(
      resetPasswordWithToken({ resetToken, email, password, confirmPassword }),
    );
  };

  // Legacy functions (keep for compatibility)
  const legacyForgotPassword = (email) => {
    return dispatch(forgotPassword(email));
  };

  const legacyResetPassword = (resetToken, password) => {
    return dispatch(resetPassword({ resetToken, password }));
  };

  // Google Auth functions - MAKE SURE THESE ARE CALLED CORRECTLY
  const GoogleLogin = (googleToken) => {
    return dispatch(googleLogin(googleToken));
  };

  const getGoogleClientIdAction = () => {
    return dispatch(getGoogleClientId());
  };

  const setGoogleClientIdAction = (clientId) => {
    dispatch(setGoogleClientId(clientId));
  };

  // Utility functions
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

  const isAuthenticated = !!token;

  return {
    // State
    token,
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

    // Registration
    registerInitiate,
    registerVerify,
    registerResendOTP,

    // Login/Profile
    login,
    logout,
    getProfile,
    updateUserProfile,
    updatePassword,

    // OTP-based Forgot Password
    forgotPasswordRequest,
    verifyForgotPasswordOTPRequest,
    resendForgotPasswordOTPRequest,
    resetPasswordRequest,

    // Legacy Forgot Password
    legacyForgotPassword,
    legacyResetPassword,

    // Google Auth - MAKE SURE THESE ARE EXPORTED
    GoogleLogin,
    getGoogleClientIdAction,
    setGoogleClientIdAction,

    // Utility functions
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
