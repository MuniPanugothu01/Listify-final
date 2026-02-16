import axios from "axios";

// Use absolute URL to avoid issues
const API_URL = "http://localhost:5000/api/auth";

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

        // Redirect to login page
        if (!window.location.pathname.includes("/signin")) {
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

  // Get user profile
  getProfile: () => {
    return api.get("/profile", { withCredentials: true });
  },

  // Update profile
  updateProfile: (userData) => {
    return api.put("/update-profile", userData, { withCredentials: true });
  },

  // Change password
  changePassword: (passwordData) => {
    return api.post("/change-password", passwordData, {
      withCredentials: true,
    });
  },

  // Initiate forgot password (send OTP)
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

  // Resend forgot password OTP
  resendForgotPasswordOTP: (email) => {
    return api.post(
      "/forgot-password/resend-otp",
      { email },
      { withCredentials: true },
    );
  },

  // Reset password with token
  resetPasswordWithToken: (resetToken, email, password, confirmPassword) => {
    return api.put(
      `/reset-password/${resetToken}`,
      { email, password, confirmPassword },
      { withCredentials: true },
    );
  },

  // ============== NEW: Session Management APIs ==============
  // Logout from current device
  logout: () => {
    return api.post("/logout", {}, { withCredentials: true });
  },

  // Logout from all devices
  logoutAll: () => {
    return api.post("/logout-all", {}, { withCredentials: true });
  },

  // Get active sessions
  getSessions: () => {
    return api.get("/sessions", { withCredentials: true });
  },

  // Revoke specific session
  revokeSession: (tokenId) => {
    return api.delete(`/sessions/${tokenId}`, { withCredentials: true });
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

export default api;
