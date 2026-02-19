import {
  loginUser,
  logoutUser,
  logoutAll,
  getGoogleClientId,
  googleLogin,
  initiateRegister,
  verifyOTP,
  resendOTP,
  initiateForgotPassword,
  verifyForgotPasswordOTP,
  resendForgotPasswordOTP,
  resetPasswordWithToken,
  checkAuth,
  refreshToken,
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
} from '../slices/authSlice';

// ==================== AUTH ACTION CREATORS ====================

export const authActions = {
  // Login
  login: (credentials) => async (dispatch) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Google Auth
  getGoogleClientId: () => async (dispatch) => {
    try {
      const result = await dispatch(getGoogleClientId()).unwrap();
      return { success: true, clientId: result.clientId };
    } catch (error) {
      return { success: false, error };
    }
  },

  googleLogin: (token) => async (dispatch) => {
    try {
      const result = await dispatch(googleLogin(token)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Registration
  initiateRegister: (userData) => async (dispatch) => {
    try {
      const result = await dispatch(initiateRegister(userData)).unwrap();
      dispatch(setRegistrationEmail(userData.email));
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  verifyOTP: (email, otp) => async (dispatch) => {
    try {
      const result = await dispatch(verifyOTP({ email, otp })).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  resendOTP: (email) => async (dispatch) => {
    try {
      const result = await dispatch(resendOTP(email)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Forgot Password
  initiateForgotPassword: (email) => async (dispatch) => {
    try {
      const result = await dispatch(initiateForgotPassword(email)).unwrap();
      dispatch(setResetEmail(email));
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  verifyForgotPasswordOTP: (email, otp) => async (dispatch) => {
    try {
      const result = await dispatch(verifyForgotPasswordOTP({ email, otp })).unwrap();
      dispatch(setResetToken(result.resetToken));
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  resendForgotPasswordOTP: (email) => async (dispatch) => {
    try {
      const result = await dispatch(resendForgotPasswordOTP(email)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  resetPasswordWithToken: (resetToken, email, password, confirmPassword) => async (dispatch) => {
    try {
      const result = await dispatch(
        resetPasswordWithToken({ resetToken, email, password, confirmPassword })
      ).unwrap();
      dispatch(clearResetToken());
      dispatch(clearResetEmail());
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Logout
  logout: () => async (dispatch) => {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  logoutAll: () => async (dispatch) => {
    try {
      const result = await dispatch(logoutAll()).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Auth Check
  checkAuth: () => async (dispatch) => {
    try {
      const result = await dispatch(checkAuth()).unwrap();
      return { success: true, isAuthenticated: result.isAuthenticated, user: result.user };
    } catch (error) {
      return { success: false, isAuthenticated: false };
    }
  },

  refreshToken: () => async (dispatch) => {
    try {
      const result = await dispatch(refreshToken()).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Utility Actions
  clearError: () => (dispatch) => {
    dispatch(clearError());
  },

  resetSuccess: () => (dispatch) => {
    dispatch(resetSuccess());
  },

  setOtpSent: (value) => (dispatch) => {
    dispatch(setOtpSent(value));
  },

  clearOtpState: () => (dispatch) => {
    dispatch(clearOtpState());
  },

  setGoogleClientId: (clientId) => (dispatch) => {
    dispatch(setGoogleClientId(clientId));
  },

  clearResetToken: () => (dispatch) => {
    dispatch(clearResetToken());
  },

  clearResetEmail: () => (dispatch) => {
    dispatch(clearResetEmail());
  },
};

export default authActions;