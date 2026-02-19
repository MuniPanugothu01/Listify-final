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
// Tokens are automatically sent via cookies
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

// Response interceptor - Handle token refresh automatically
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        // This calls the refresh endpoint which sets new cookies
        await axios.post(
          `${API_URL}/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        console.error("Token refresh failed:", refreshError);

        // Clear any stored user data
        localStorage.removeItem("user");
        localStorage.removeItem("persist:root");

        // Redirect to login page
        if (!window.location.pathname.includes("/signin") && 
            !window.location.pathname.includes("/login") &&
            !window.location.pathname.includes("/signup")) {
          window.location.href = "/signin";
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return Promise.reject(error);
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
  // FIX: receives email string directly, wraps into { email } here
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
  // Get user profile
  getProfile: () => {
    return api.get("/profile", { withCredentials: true });
  },

  // Update profile
  updateProfile: (userData) => {
    return api.put("/update-profile", userData, { withCredentials: true });
  },

  // Upload profile image (multipart/form-data) with progress tracking
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

  // Generate upload URL for direct S3 upload
  generateUploadUrl: (fileType) => {
    return api.post("/profile/generate-upload-url", { fileType }, { withCredentials: true });
  },

  // ==================== DEVICE & SESSION APIS ====================
  // Get user devices
  getDevices: () => {
    return api.get("/devices", { withCredentials: true });
  },

  // Revoke device
  revokeDevice: (deviceId) => {
    return api.delete(`/devices/${deviceId}`, { withCredentials: true });
  },

  // Get login history
  getLoginHistory: () => {
    return api.get("/login-history", { withCredentials: true });
  },

  // Get active sessions
  getSessions: () => {
    return api.get("/sessions", { withCredentials: true });
  },

  // Revoke specific session
  revokeSession: (tokenId) => {
    return api.delete(`/sessions/${tokenId}`, { withCredentials: true });
  },

  // ==================== PASSWORD MANAGEMENT APIS ====================
  // Change password
  changePassword: (passwordData) => {
    return api.post("/change-password", passwordData, {
      withCredentials: true,
    });
  },

  // Get password requirements
  getPasswordRequirements: () => {
    return api.get("/password-requirements", { withCredentials: true });
  },

  // Check password expiration
  checkPasswordExpiration: () => {
    return api.get("/password-expiration", { withCredentials: true });
  },

  // ==================== FORGOT PASSWORD APIS ====================
  // FIX: receives email string directly, wraps into { email } here
  initiateForgotPassword: (email) => {
    return api.post(
      "/forgot-password/initiate",
      { email },
      { withCredentials: true },
    );
  },

  // Verify forgot password OTP
  verifyForgotPasswordOTP: (otpData) => {
    return api.post("/forgot-password/verify-otp", otpData, {
      withCredentials: true,
    });
  },

  // FIX: receives email string directly, wraps into { email } here
  resendForgotPasswordOTP: (email) => {
    return api.post(
      "/forgot-password/resend-otp",
      { email },
      { withCredentials: true },
    );
  },

  // FIX: increased timeout to 60s — bcrypt hashing + Redis + MongoDB calls can be slow
  resetPasswordWithToken: (resetToken, email, password, confirmPassword) => {
    return api.put(
      `/reset-password/${resetToken}`,
      { email, password, confirmPassword },
      {
        withCredentials: true,
        timeout: 60000, // 60 seconds for this call
      },
    );
  },

  // Legacy forgot password
  legacyForgotPassword: (email) => {
    return api.post("/forgot-password", { email }, { withCredentials: true });
  },

  // Legacy reset password
  legacyResetPassword: (resetToken, password) => {
    return api.put(`/reset-password-legacy/${resetToken}`, { password }, { withCredentials: true });
  },

  // Legacy register
  legacyRegister: (userData) => {
    return api.post("/register-legacy", userData, { withCredentials: true });
  },

  // Setup password (for users without password)
  setupPassword: (passwordData) => {
    return api.post("/setup-password", passwordData, { withCredentials: true });
  },

  // ==================== SESSION MANAGEMENT APIS ====================
  // Logout from current device
  logout: () => {
    return api.post("/logout", {}, { withCredentials: true });
  },

  // Logout from all devices
  logoutAll: () => {
    return api.post("/logout-all", {}, { withCredentials: true });
  },

  // Refresh token manually (usually handled automatically)
  refreshToken: () => {
    return api.post("/refresh", {}, { withCredentials: true });
  },

  // Check authentication status
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

listingsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        await axios.post(`${API_URL}/refresh`, {}, { withCredentials: true });
        return listingsApi(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const listingsAPI = {
  // Get my listings
  getMyListings: () => {
    return listingsApi.get("/my-posts", { withCredentials: true });
  },

  // Get saved items
  getSavedItems: () => {
    return listingsApi.get("/saved", { withCredentials: true });
  },

  // Toggle save item
  toggleSaveItem: (itemId) => {
    return listingsApi.post(`/${itemId}/toggle-save`, {}, { withCredentials: true });
  },

  // Get alerts
  getAlerts: () => {
    return listingsApi.get("/alerts", { withCredentials: true });
  },

  // Create alert
  createAlert: (alertData) => {
    return listingsApi.post("/alerts", alertData, { withCredentials: true });
  },

  // Delete alert
  deleteAlert: (alertId) => {
    return listingsApi.delete(`/alerts/${alertId}`, { withCredentials: true });
  },

  // Create new listing
  createListing: (listingData) => {
    return listingsApi.post("/", listingData, { withCredentials: true });
  },

  // Update listing
  updateListing: (listingId, listingData) => {
    return listingsApi.put(`/${listingId}`, listingData, { withCredentials: true });
  },

  // Delete listing
  deleteListing: (listingId) => {
    return listingsApi.delete(`/${listingId}`, { withCredentials: true });
  },

  // Get listing by ID
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

messagesApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        await axios.post(`${API_URL}/refresh`, {}, { withCredentials: true });
        return messagesApi(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const messagesAPI = {
  // Get conversations
  getConversations: () => {
    return messagesApi.get("/conversations", { withCredentials: true });
  },

  // Get messages for a conversation
  getMessages: (conversationId) => {
    return messagesApi.get(`/${conversationId}`, { withCredentials: true });
  },

  // Send message
  sendMessage: (conversationId, content) => {
    return messagesApi.post(`/${conversationId}`, { content }, { withCredentials: true });
  },

  // Mark conversation as read
  markAsRead: (conversationId) => {
    return messagesApi.put(`/${conversationId}/read`, {}, { withCredentials: true });
  },

  // Create new conversation
  createConversation: (recipientId, initialMessage) => {
    return messagesApi.post("/conversations", { recipientId, message: initialMessage }, { withCredentials: true });
  },

  // Delete conversation
  deleteConversation: (conversationId) => {
    return messagesApi.delete(`/${conversationId}`, { withCredentials: true });
  },

  // Get conversation by ID
  getConversationById: (conversationId) => {
    return messagesApi.get(`/conversations/${conversationId}`, { withCredentials: true });
  },
};

// ==================== ADMIN APIS ====================
export const adminAPI = {
  // Get user sessions (admin)
  getUserSessions: (userId) => {
    return api.get(`/admin/sessions/${userId}`, { withCredentials: true });
  },

  // Cleanup expired tokens (admin)
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