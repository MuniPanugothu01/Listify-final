import axios from "axios";
import { resetPersistedState } from "../redux/store";

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

// ==================== SHARED TOKEN REFRESH LOGIC ====================
// Single refresh queue shared across ALL axios instances to prevent
// concurrent refresh calls that would invalidate each other via token rotation.
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Shared 401 handler — call this from ANY axios instance's response interceptor.
 * It ensures only ONE refresh request happens at a time; all other 401 callers
 * wait in a queue and retry once the single refresh completes.
 *
 * @param {AxiosError}    error           – the 401 error
 * @param {AxiosInstance} axiosInstance    – the instance to retry with
 * @returns {Promise}     retried response or rejection
 */
export const handle401 = async (error, axiosInstance) => {
  const originalRequest = error.config;

  // Don't refresh on auth endpoints themselves
  if (
    originalRequest.url.includes("/login") ||
    originalRequest.url.includes("/register") ||
    originalRequest.url.includes("/google") ||
    originalRequest.url.includes("/refresh")
  ) {
    return Promise.reject(error);
  }

  // If already refreshing, queue this request
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    })
      .then(() => axiosInstance(originalRequest))
      .catch((err) => Promise.reject(err));
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    await _doRefreshRequest();
    console.log("✅ Token refreshed successfully, retrying queued requests");
    processQueue(null);
    return axiosInstance(originalRequest);
  } catch (refreshError) {
    console.error("❌ Token refresh failed:", refreshError.message);
    processQueue(refreshError);

    // Only force-logout when the server explicitly says the refresh token
    // is gone (expired / revoked).  Network blips should NOT log the user out.
    const refreshStatus = refreshError.response?.status;
    const refreshCode = refreshError.response?.data?.code;

    if (
      refreshStatus === 401 &&
      (refreshCode === "INVALID_REFRESH_TOKEN" ||
        refreshCode === "NO_REFRESH_TOKEN")
    ) {
      const currentPath = window.location.pathname;
      if (
        !currentPath.includes("/signin") &&
        !currentPath.includes("/login") &&
        !currentPath.includes("/signup") &&
        !currentPath.includes("/forgot-password")
      ) {
        resetPersistedState();
        window.location.href = "/signin";
      }
    }

    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};

/**
 * Internal helper — makes the actual refresh POST request.
 * Shared between handle401 and doRefresh so there's only one code-path.
 */
const _doRefreshRequest = () =>
  axios.post(
    `${API_URL}/refresh`,
    {},
    { withCredentials: true, timeout: 10000 },
  );

/**
 * Proactive refresh — call from useTokenRefresh or anywhere else.
 * Uses the same isRefreshing / failedQueue as handle401 so that
 * a background refresh never races with a 401-triggered refresh.
 */
export const doRefresh = () => {
  if (isRefreshing) {
    // A refresh is already in flight — just wait for it
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  return _doRefreshRequest()
    .then((res) => {
      processQueue(null);
      return res;
    })
    .catch((err) => {
      processQueue(err);
      throw err;
    })
    .finally(() => {
      isRefreshing = false;
    });
};

/**
 * Helper: build a standard error-transform interceptor for any axios instance.
 */
const createResponseInterceptor = (axiosInstance, label = "API") => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      console.error(`${label} Error:`, {
        status: error.response?.status,
        data: error.response?.data,
        url: originalRequest?.url,
      });

      // 401 → delegate to the shared refresh handler
      if (error.response?.status === 401 && !originalRequest._retry) {
        return handle401(error, axiosInstance);
      }

      // Transform non-401 errors into a consistent shape
      let errorResponse = {
        success: false,
        message: "An error occurred",
        status: error.response?.status || 500,
      };

      if (error.response?.data) {
        const d = error.response.data;
        if (typeof d === "string") errorResponse.message = d;
        else if (d.message) errorResponse.message = d.message;
        else if (d.error) errorResponse.message = d.error;
        if (d.errors) errorResponse.errors = d.errors;
        if (d.strength) errorResponse.strength = d.strength;
        if (d.token) errorResponse.token = d.token;
      }

      return Promise.reject(errorResponse);
    },
  );
};

// Apply the shared interceptor to the main api instance
createResponseInterceptor(api, "Auth API");

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
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(percentCompleted);
        }
      },
    });
  },

  generateUploadUrl: (fileType) => {
    return api.post(
      "/profile/generate-upload-url",
      { fileType },
      { withCredentials: true },
    );
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
    return api.put(
      `/reset-password-legacy/${resetToken}`,
      { password },
      { withCredentials: true },
    );
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

// Apply shared interceptors
listingsApi.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 Listings Request: ${config.method.toUpperCase()} ${config.url}`,
    );
    return config;
  },
  (error) => Promise.reject(error),
);
createResponseInterceptor(listingsApi, "Listings API");

export const listingsAPI = {
  getMyListings: () => {
    return listingsApi.get("/my-posts", { withCredentials: true });
  },

  getSavedItems: () => {
    return listingsApi.get("/saved", { withCredentials: true });
  },

  toggleSaveItem: (itemId) => {
    return listingsApi.post(
      `/${itemId}/toggle-save`,
      {},
      { withCredentials: true },
    );
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
    return listingsApi.put(`/${listingId}`, listingData, {
      withCredentials: true,
    });
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

// Apply shared interceptors
messagesApi.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 Messages Request: ${config.method.toUpperCase()} ${config.url}`,
    );
    return config;
  },
  (error) => Promise.reject(error),
);
createResponseInterceptor(messagesApi, "Messages API");

export const messagesAPI = {
  getConversations: () => {
    return messagesApi.get("/conversations", { withCredentials: true });
  },

  getMessages: (conversationId) => {
    return messagesApi.get(`/${conversationId}`, { withCredentials: true });
  },

  sendMessage: (conversationId, content) => {
    return messagesApi.post(
      `/${conversationId}`,
      { content },
      { withCredentials: true },
    );
  },

  markAsRead: (conversationId) => {
    return messagesApi.put(
      `/${conversationId}/read`,
      {},
      { withCredentials: true },
    );
  },

  createConversation: (recipientId, initialMessage) => {
    return messagesApi.post(
      "/conversations",
      { recipientId, message: initialMessage },
      { withCredentials: true },
    );
  },

  deleteConversation: (conversationId) => {
    return messagesApi.delete(`/${conversationId}`, { withCredentials: true });
  },

  getConversationById: (conversationId) => {
    return messagesApi.get(`/conversations/${conversationId}`, {
      withCredentials: true,
    });
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
