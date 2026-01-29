import axios from "axios";

// Use absolute URL to avoid issues
const API_URL = "http://localhost:5000/api/auth";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      `API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`,
    );
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
    console.log(`API Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response?.status === 401) {
      console.log("Unauthorized, clearing auth data");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  },
);

// Auth API methods
export const authAPI = {
  // Login user
  login: (credentials) => {
    console.log("Login API called with:", credentials);
    return api.post("/login", credentials);
  },

  // OTP Registration - Initiate
  initiateRegister: (userData) => {
    return api.post("/register/initiate", userData);
  },

  // OTP Registration - Verify
  verifyOTP: (otpData) => {
    return api.post("/register/verify", otpData);
  },

  // OTP Registration - Resend OTP
  resendOTP: (email) => {
    return api.post("/register/resend-otp", { email });
  },

  // OTP Registration - Check status
  checkRegistrationStatus: (email) => {
    return api.get(`/register/status/${email}`);
  },

  // Get user profile
  getProfile: () => {
    return api.get("/profile");
  },

  // Update profile
  updateProfile: (userData) => {
    return api.put("/update-profile", userData);
  },

  // Change password
  changePassword: (passwordData) => {
    return api.post("/change-password", passwordData);
  },

  // NEW: OTP-based Forgot Password APIs
  
  // Initiate forgot password (send OTP)
  initiateForgotPassword: (email) => {
    return api.post("/forgot-password/initiate", { email });
  },

  // Verify forgot password OTP
  verifyForgotPasswordOTP: (otpData) => {
    return api.post("/forgot-password/verify-otp", otpData);
  },

  // Resend forgot password OTP
  resendForgotPasswordOTP: (email) => {
    return api.post("/forgot-password/resend-otp", { email });
  },

  // Reset password with token
  resetPasswordWithToken: (resetToken, email, password, confirmPassword) => {
    return api.put(`/reset-password/${resetToken}`, { 
      email, 
      password, 
      confirmPassword 
    });
  },

  // Legacy forgot password (keep for compatibility)
  forgotPassword: (email) => {
    return api.post("/forgot-password", { email });
  },

  // Legacy reset password (keep for compatibility)
  resetPassword: (resetToken, password) => {
    return api.put(`/reset-password-legacy/${resetToken}`, { password });
  },
};

export default api;