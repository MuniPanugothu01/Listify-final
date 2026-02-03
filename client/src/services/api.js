import axios from "axios";

// Use absolute URL to avoid issues
const API_URL = "http://localhost:5000/api/auth";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // Increased timeout to 30 seconds
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      code: error.code,
    });

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - server might be down or slow");
      return Promise.reject(new Error("Request timeout. Please try again."));
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

// Auth API methods
export const authAPI = {
  // Google Auth APIs
  getGoogleClientId: () => {
    return api.get("/google/client-id", { timeout: 10000 });
  },

  googleLogin: (googleToken) => {
    return api.post(
      "/google/token",
      { token: googleToken },
      { timeout: 15000 },
    );
  },

 // Login user - IMPROVED
  login: (credentials) => {
    return api.post("/login", credentials, { 
      timeout: 15000,
      validateStatus: function (status) {
        // Accept all status codes to handle errors properly
        return status >= 200 && status < 600;
      }
    });
  },

  // OTP Registration - Initiate
  initiateRegister: (userData) => {
    return api.post("/register/initiate", userData, { timeout: 15000 });
  },

  // OTP Registration - Verify
  verifyOTP: (otpData) => {
    return api.post("/register/verify", otpData, { timeout: 15000 });
  },

  // OTP Registration - Resend OTP
  resendOTP: (email) => {
    return api.post("/register/resend-otp", { email }, { timeout: 15000 });
  },

  // OTP Registration - Check status
  checkRegistrationStatus: (email) => {
    return api.get(`/register/status/${email}`, { timeout: 10000 });
  },

  // Get user profile
  getProfile: () => {
    return api.get("/profile", { timeout: 10000 });
  },

  // Update profile
  updateProfile: (userData) => {
    return api.put("/update-profile", userData, { timeout: 15000 });
  },

  // Change password
  changePassword: (passwordData) => {
    return api.post("/change-password", passwordData, { timeout: 15000 });
  },

  // Initiate forgot password (send OTP)
  initiateForgotPassword: (email) => {
    return api.post("/forgot-password/initiate",  email , { timeout: 15000 });
  },

  // Verify forgot password OTP
  verifyForgotPasswordOTP: (otpData) => {
    return api.post("/forgot-password/verify-otp", otpData, { timeout: 15000 });
  },

  // Resend forgot password OTP
  resendForgotPasswordOTP: (email) => {
    return api.post(
      "/forgot-password/resend-otp",
      { email },
      { timeout: 15000 },
    );
  },

  // Reset password with token
  resetPasswordWithToken: (resetToken, email, password, confirmPassword) => {
    return api.put(
      `/reset-password/${resetToken}`,
      {
        email,
        password,
        confirmPassword,
      },
      { timeout: 15000 },
    );
  },

  // Legacy forgot password (keep for compatibility)
  forgotPassword: (email) => {
    return api.post("/forgot-password", { email }, { timeout: 15000 });
  },

  // Legacy reset password (keep for compatibility)
  resetPassword: (resetToken, password) => {
    return api.put(
      `/reset-password-legacy/${resetToken}`,
      { password },
      { timeout: 15000 },
    );
  },

  // Check authentication status
  checkAuth: () => {
    return api.get("/check", { timeout: 10000 });
  },
};

export default api;
