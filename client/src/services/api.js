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

// Auth API methods
export const authAPI = {
  // Register user
  register: (userData) => {
    return api.post('/register', userData);
  },

  // Login user
  login: (credentials) => {
    return api.post('/login', credentials);
  },

  // Get user profile
  getProfile: (token) => {
    return api.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Update profile
  updateProfile: (userData, token) => {
    return api.put('/update-profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Change password
  changePassword: (passwordData, token) => {
    return api.post('/change-password', passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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