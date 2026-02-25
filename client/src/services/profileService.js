import axios from "axios";
import { handle401 } from "./api";

// ─────────────────────────────────────────────────────────────────────────────
// FIX: Do NOT import from "./api" — its default export is:
//   { auth, listings, messages, admin }   ← plain object, NO .get() / .put()
//
// We create a dedicated axios instance here instead, identical config to the
// other instances in api.js (listingsApi, messagesApi, etc.)
// ─────────────────────────────────────────────────────────────────────────────
const API_URL = "http://localhost:5000/api/auth";

const profileApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
  withCredentials: true, // sends HttpOnly cookies automatically
});

// ── Request interceptor ───────────────────────────────────────────────────────
profileApi.interceptors.request.use(
  (config) => {
    console.log(`🚀 Profile Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ──────────────────────────────────────────────────────
// Uses the SHARED refresh queue from api.js so that concurrent 401s across
// different axios instances don't each try to rotate the refresh token.
profileApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      return handle401(error, profileApi);
    }

    console.error("Profile API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return Promise.reject(error);
  }
);

// ── API methods ───────────────────────────────────────────────────────────────
export const profileAPI = {
  /** GET /api/auth/profile → { success, user } */
  getProfile: () => profileApi.get("/profile"),

  /**
   * PUT /api/auth/update-profile → { success, user }
   * Allowed fields: name, phone, address, bio, dateOfBirth, gender, preferences
   * Gender value must be one of: "male" | "female" | "other" | "prefer-not-to-say"
   */
  updateProfile: (userData) => profileApi.put("/update-profile", userData),

  /**
   * POST /api/auth/profile/upload-image (multipart/form-data)
   * → { success, imageUrl, imageKey, user }
   */
  uploadProfileImage: (file, onProgress) => {
    const formData = new FormData();
    formData.append("image", file);

    return profileApi.post("/profile/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const pct = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(pct);
        }
      },
    });
  },

  /** POST /api/auth/profile/generate-upload-url → { uploadURL, imageUrl, fileKey } */
  generateUploadUrl: (fileType) =>
    profileApi.post("/profile/generate-upload-url", { fileType }),

  /** GET /api/auth/devices → { success, devices } */
  getDevices: () => profileApi.get("/devices"),

  /** DELETE /api/auth/devices/:deviceId → { success, message } */
  revokeDevice: (deviceId) => profileApi.delete(`/devices/${deviceId}`),

  /** GET /api/auth/login-history → { success, history } */
  getLoginHistory: () => profileApi.get("/login-history"),

  /** POST /api/auth/change-password → { success, message } */
  changePassword: (passwordData) => {
    console.log("🔑 Sending change password request with data:", {
      currentPassword: passwordData.currentPassword ? "****" : "missing",
      newPassword: passwordData.newPassword ? "****" : "missing",
      confirmNewPassword: passwordData.confirmPassword || passwordData.confirmNewPassword ? "****" : "missing"
    });
    
    // FIX: Transform the data to match backend expectations
    // Backend expects: currentPassword, newPassword, confirmNewPassword
    // Frontend sends: currentPassword, newPassword, confirmPassword
    const transformedData = {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmNewPassword: passwordData.confirmPassword || passwordData.confirmNewPassword
    };
    
    return profileApi.post("/change-password", transformedData);
  },

  /** GET /api/auth/password-requirements → { success, requirements } */
  getPasswordRequirements: () => profileApi.get("/password-requirements"),

  /** GET /api/auth/password-expiration → { success, expiration } */
  checkPasswordExpiration: () => profileApi.get("/password-expiration"),
};