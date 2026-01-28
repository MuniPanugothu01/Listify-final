import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API methods - Updated to match your backend routes
export const authAPI = {
  // OTP Registration - Initiate
  initiateRegister: (userData) => {
    return api.post('/register/initiate', userData);
  },

  // OTP Registration - Verify
  verifyOTP: (otpData) => {
    return api.post('/register/verify', otpData);
  },

  // OTP Registration - Resend OTP
  resendOTP: (email) => {
    return api.post('/register/resend-otp', { email });
  },

  // OTP Registration - Check status
  checkRegistrationStatus: (email) => {
    return api.get(`/register/status/${email}`);
  },

  // Legacy register (without OTP) - kept for compatibility
  register: (userData) => {
    return api.post('/register', userData);
  },

  // Login user
  login: (credentials) => {
    return api.post('/login', credentials);
  },

  // Get user profile
  getProfile: () => {
    return api.get('/profile');
  },

  // Update profile
  updateProfile: (userData) => {
    return api.put('/update-profile', userData);
  },

  // Change password
  changePassword: (passwordData) => {
    return api.post('/change-password', passwordData);
  },

  // Forgot password
  forgotPassword: (email) => {
    return api.post('/forgot-password', { email });
  },

  // Reset password
  resetPassword: (resetToken, password) => {
    return api.put(`/reset-password/${resetToken}`, { password });
  },
};

export default api;