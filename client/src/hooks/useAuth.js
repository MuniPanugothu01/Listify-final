import { useSelector, useDispatch } from 'react-redux';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  clearError,
  resetSuccess,
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    token,
    user,
    loading,
    error,
    success,
  } = useSelector((state) => state.auth);

  const register = (userData) => {
    return dispatch(registerUser(userData));
  };

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

  const forgotPasswordRequest = (email) => {
    return dispatch(forgotPassword(email));
  };

  const resetPasswordRequest = (resetToken, password) => {
    return dispatch(resetPassword({ resetToken, password }));
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const resetAuthSuccess = () => {
    dispatch(resetSuccess());
  };

  const isAuthenticated = !!token;

  return {
    token,
    user,
    loading,
    error,
    success,
    isAuthenticated,
    register,
    login,
    logout,
    getProfile,
    updateUserProfile,
    updatePassword,
    forgotPasswordRequest,
    resetPasswordRequest,
    clearAuthError,
    resetAuthSuccess,
  };
};