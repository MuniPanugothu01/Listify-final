import axios from "axios";

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
// On 401: attempt ONE silent token refresh, then retry the original request.
// Only redirect to /signin if the refresh itself also fails.
profileApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // POST /refresh sets new accessToken + refreshToken cookies server-side.
        // Because withCredentials:true, the browser sends + receives cookies
        // automatically — no manual header injection needed.
        await axios.post(`${API_URL}/refresh`, {}, { withCredentials: true });

        // Retry original request — new cookie is now attached automatically
        return profileApi(originalRequest);
      } catch (refreshError) {
        // Refresh also failed → user must log in again
        console.error("Profile API: token refresh failed");
        localStorage.removeItem("user");
        localStorage.removeItem("persist:root");

        const { pathname } = window.location;
        const onAuthPage =
          pathname.includes("/signin") ||
          pathname.includes("/login") ||
          pathname.includes("/signup");

        if (!onAuthPage) {
          window.location.href = "/signin";
        }

        return Promise.reject(refreshError);
      }
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
  changePassword: (passwordData) =>
    profileApi.post("/change-password", passwordData),

  /** GET /api/auth/password-requirements → { success, requirements } */
  getPasswordRequirements: () => profileApi.get("/password-requirements"),

  /** GET /api/auth/password-expiration → { success, expiration } */
  checkPasswordExpiration: () => profileApi.get("/password-expiration"),
};