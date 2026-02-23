import axios from "axios";

// Use absolute URL to avoid issues
const API_URL = "http://localhost:5000/api/auth";
const BASE_API_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  withCredentials: true, // ⚠️ CRITICAL: This sends cookies with every request
});

// Request interceptor - NO MANUAL TOKEN ADDITION
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

// ==================== FIXED: Response interceptor with better error handling ====================
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log the full error for debugging
    console.error("API Error Details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: originalRequest?.url,
      method: originalRequest?.method
    });

    // If error is 401 (Unauthorized) and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Don't refresh on login or register endpoints
      if (originalRequest.url.includes('/login') || 
          originalRequest.url.includes('/register') ||
          originalRequest.url.includes('/google') ||
          originalRequest.url.includes('/refresh')) {
        return Promise.reject(error);
      }

      try {
        console.log("Attempting to refresh token...");
        
        // Try to refresh the token
        const refreshResponse = await axios.post(
          `${API_URL}/refresh`,
          {},
          {
            withCredentials: true,
            timeout: 10000,
          }
        );

        if (refreshResponse.status === 200) {
          console.log("Token refreshed successfully, retrying original request");
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.message);
        
        // Only redirect if we're not on an auth page and not in the middle of login
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/signin') && 
            !currentPath.includes('/login') && 
            !currentPath.includes('/signup') &&
            !currentPath.includes('/forgot-password') &&
            !originalRequest.url.includes('/login')) {
          
          // Clear user data
          localStorage.removeItem("user");
          localStorage.removeItem("persist:root");
          
          // Redirect to login
          window.location.href = "/signin";
        }
        
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors - FIXED: Better error object formatting
    let errorResponse = {
      success: false,
      message: "An error occurred",
      status: error.response?.status || 500
    };

    if (error.response?.data) {
      const errorData = error.response.data;
      
      // Extract message from various possible formats
      if (typeof errorData === 'string') {
        errorResponse.message = errorData;
      } else if (errorData.message) {
        errorResponse.message = errorData.message;
      } else if (errorData.error) {
        errorResponse.message = errorData.error;
      } else if (errorData.errors) {
        // Handle validation errors
        errorResponse.errors = errorData.errors;
        if (typeof errorData.errors === 'object') {
          const firstError = Object.values(errorData.errors)[0];
          if (firstError) {
            errorResponse.message = firstError;
          }
        }
      }
      
      // Preserve additional data
      if (errorData.errors) errorResponse.errors = errorData.errors;
      if (errorData.strength) errorResponse.strength = errorData.strength;
      if (errorData.token) errorResponse.token = errorData.token;
    }

    return Promise.reject(errorResponse);
  },
);

// Auth API methods - NO TOKEN HANDLING, just make requests
export const authAPI = {
  // Google Auth APIs
  getGoogleClientId: () => {
    return api.get("/google/client-id", { withCredentials: true });
  },

  googleLogin: (googleToken) => {
    return api.post(
      "/google/token",
      { token: googleToken },
      {
        withCredentials: true,
      },
    );
  },

  // Login user
  login: (credentials) => {
    return api.post("/login", credentials, {
      withCredentials: true,
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      },
    });
  },

  // OTP Registration - Initiate
  initiateRegister: (userData) => {
    return api.post("/register/initiate", userData, { withCredentials: true });
  },

  // OTP Registration - Verify
  verifyOTP: (otpData) => {
    return api.post("/register/verify", otpData, { withCredentials: true });
  },

  // OTP Registration - Resend OTP
  resendOTP: (email) => {
    return api.post(
      "/register/resend-otp",
      { email },
      { withCredentials: true },
    );
  },

  // Check registration status
  checkRegistrationStatus: (email) => {
    return api.get(`/register/status/${email}`, { withCredentials: true });
  },

  // ==================== PROFILE APIS ====================
  getProfile: () => {
    return api.get("/profile", { withCredentials: true });
  },

  updateProfile: (userData) => {
    return api.put("/update-profile", userData, { withCredentials: true });
  },

  uploadProfileImage: (formData, onProgress) => {
    return api.post("/profile/upload-image", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },

  generateUploadUrl: (fileType) => {
    return api.post("/profile/generate-upload-url", { fileType }, { withCredentials: true });
  },

  // ==================== DEVICE & SESSION APIS ====================
  getDevices: () => {
    return api.get("/devices", { withCredentials: true });
  },

  revokeDevice: (deviceId) => {
    return api.delete(`/devices/${deviceId}`, { withCredentials: true });
  },

  getLoginHistory: () => {
    return api.get("/login-history", { withCredentials: true });
  },

  getSessions: () => {
    return api.get("/sessions", { withCredentials: true });
  },

  revokeSession: (tokenId) => {
    return api.delete(`/sessions/${tokenId}`, { withCredentials: true });
  },

  // ==================== PASSWORD MANAGEMENT APIS ====================
  changePassword: (passwordData) => {
    return api.post("/change-password", passwordData, {
      withCredentials: true,
    });
  },

  getPasswordRequirements: () => {
    return api.get("/password-requirements", { withCredentials: true });
  },

  checkPasswordExpiration: () => {
    return api.get("/password-expiration", { withCredentials: true });
  },

  // ==================== FORGOT PASSWORD APIS ====================
  initiateForgotPassword: (email) => {
    return api.post(
      "/forgot-password/initiate",
      { email },
      { withCredentials: true },
    );
  },

  verifyForgotPasswordOTP: (otpData) => {
    return api.post("/forgot-password/verify-otp", otpData, {
      withCredentials: true,
    });
  },

  resendForgotPasswordOTP: (email) => {
    return api.post(
      "/forgot-password/resend-otp",
      { email },
      { withCredentials: true },
    );
  },

  resetPasswordWithToken: (resetToken, email, password, confirmPassword) => {
    return api.put(
      `/reset-password/${resetToken}`,
      { email, password, confirmPassword },
      {
        withCredentials: true,
        timeout: 60000,
      },
    );
  },

  legacyForgotPassword: (email) => {
    return api.post("/forgot-password", { email }, { withCredentials: true });
  },

  legacyResetPassword: (resetToken, password) => {
    return api.put(`/reset-password-legacy/${resetToken}`, { password }, { withCredentials: true });
  },

  legacyRegister: (userData) => {
    return api.post("/register-legacy", userData, { withCredentials: true });
  },

  setupPassword: (passwordData) => {
    return api.post("/setup-password", passwordData, { withCredentials: true });
  },

  // ==================== SESSION MANAGEMENT APIS ====================
  logout: () => {
    return api.post("/logout", {}, { withCredentials: true });
  },

  logoutAll: () => {
    return api.post("/logout-all", {}, { withCredentials: true });
  },

  refreshToken: () => {
    return api.post("/refresh", {}, { withCredentials: true });
  },

  checkAuth: () => {
    return api.get("/check", { withCredentials: true });
  },
};

// ==================== LISTINGS API (separate base URL) ====================
const listingsApi = axios.create({
  baseURL: `${BASE_API_URL}/listings`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  withCredentials: true,
});

// Apply same interceptors
listingsApi.interceptors.request.use(
  (config) => {
    console.log(`🚀 Listings Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== FIXED: Listings API response interceptor ====================
listingsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${API_URL}/refresh`, {}, { withCredentials: true });
        return listingsApi(originalRequest);
      } catch (refreshError) {
        console.error("Listings API token refresh failed:", refreshError.message);
        return Promise.reject(refreshError);
      }
    }
    
    // Transform error response
    let errorResponse = {
      success: false,
      message: "An error occurred",
      status: error.response?.status || 500
    };

    if (error.response?.data) {
      const errorData = error.response.data;
      if (typeof errorData === 'string') {
        errorResponse.message = errorData;
      } else if (errorData.message) {
        errorResponse.message = errorData.message;
      } else if (errorData.error) {
        errorResponse.message = errorData.error;
      }
      if (errorData.errors) errorResponse.errors = errorData.errors;
    }
    
    return Promise.reject(errorResponse);
  }
);

export const listingsAPI = {
  getMyListings: () => {
    return listingsApi.get("/my-posts", { withCredentials: true });
  },

  getSavedItems: () => {
    return listingsApi.get("/saved", { withCredentials: true });
  },

  toggleSaveItem: (itemId) => {
    return listingsApi.post(`/${itemId}/toggle-save`, {}, { withCredentials: true });
  },

  getAlerts: () => {
    return listingsApi.get("/alerts", { withCredentials: true });
  },

  createAlert: (alertData) => {
    return listingsApi.post("/alerts", alertData, { withCredentials: true });
  },

  deleteAlert: (alertId) => {
    return listingsApi.delete(`/alerts/${alertId}`, { withCredentials: true });
  },

  createListing: (listingData) => {
    return listingsApi.post("/", listingData, { withCredentials: true });
  },

  updateListing: (listingId, listingData) => {
    return listingsApi.put(`/${listingId}`, listingData, { withCredentials: true });
  },

  deleteListing: (listingId) => {
    return listingsApi.delete(`/${listingId}`, { withCredentials: true });
  },

  getListingById: (listingId) => {
    return listingsApi.get(`/${listingId}`, { withCredentials: true });
  },
};

// ==================== MESSAGES API ====================
const messagesApi = axios.create({
  baseURL: `${BASE_API_URL}/messages`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  withCredentials: true,
});

// Apply same interceptors
messagesApi.interceptors.request.use(
  (config) => {
    console.log(`🚀 Messages Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== FIXED: Messages API response interceptor ====================
messagesApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${API_URL}/refresh`, {}, { withCredentials: true });
        return messagesApi(originalRequest);
      } catch (refreshError) {
        console.error("Messages API token refresh failed:", refreshError.message);
        return Promise.reject(refreshError);
      }
    }
    
    // Transform error response
    let errorResponse = {
      success: false,
      message: "An error occurred",
      status: error.response?.status || 500
    };

    if (error.response?.data) {
      const errorData = error.response.data;
      if (typeof errorData === 'string') {
        errorResponse.message = errorData;
      } else if (errorData.message) {
        errorResponse.message = errorData.message;
      } else if (errorData.error) {
        errorResponse.message = errorData.error;
      }
      if (errorData.errors) errorResponse.errors = errorData.errors;
    }
    
    return Promise.reject(errorResponse);
  }
);

export const messagesAPI = {
  getConversations: () => {
    return messagesApi.get("/conversations", { withCredentials: true });
  },

  getMessages: (conversationId) => {
    return messagesApi.get(`/${conversationId}`, { withCredentials: true });
  },

  sendMessage: (conversationId, content) => {
    return messagesApi.post(`/${conversationId}`, { content }, { withCredentials: true });
  },

  markAsRead: (conversationId) => {
    return messagesApi.put(`/${conversationId}/read`, {}, { withCredentials: true });
  },

  createConversation: (recipientId, initialMessage) => {
    return messagesApi.post("/conversations", { recipientId, message: initialMessage }, { withCredentials: true });
  },

  deleteConversation: (conversationId) => {
    return messagesApi.delete(`/${conversationId}`, { withCredentials: true });
  },

  getConversationById: (conversationId) => {
    return messagesApi.get(`/conversations/${conversationId}`, { withCredentials: true });
  },
};

// ==================== ADMIN APIS ====================
export const adminAPI = {
  getUserSessions: (userId) => {
    return api.get(`/admin/sessions/${userId}`, { withCredentials: true });
  },

  cleanupTokens: () => {
    return api.post("/admin/cleanup-tokens", {}, { withCredentials: true });
  },
};

// Export all APIs
export default {
  auth: authAPI,
  listings: listingsAPI,
  messages: messagesAPI,
  admin: adminAPI,
};