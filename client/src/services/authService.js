import api from './api';

class AuthService {
  constructor() {
    this.baseURL = '/auth';
  }

  // ==================== LOGIN ====================
  async login(credentials) {
    try {
      const response = await api.post(`${this.baseURL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== GOOGLE AUTH ====================
  async getGoogleClientId() {
    try {
      const response = await api.get(`${this.baseURL}/google/client-id`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async googleLogin(googleToken) {
    try {
      const response = await api.post(`${this.baseURL}/google/token`, { token: googleToken });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== REGISTRATION ====================
  async initiateRegister(userData) {
    try {
      const response = await api.post(`${this.baseURL}/register/initiate`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyOTP(email, otp) {
    try {
      const response = await api.post(`${this.baseURL}/register/verify`, { email, otp });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resendOTP(email) {
    try {
      const response = await api.post(`${this.baseURL}/register/resend-otp`, { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async checkRegistrationStatus(email) {
    try {
      const response = await api.get(`${this.baseURL}/register/status/${email}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== FORGOT PASSWORD ====================
  async initiateForgotPassword(email) {
    try {
      const response = await api.post(`${this.baseURL}/forgot-password/initiate`, { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyForgotPasswordOTP(email, otp) {
    try {
      const response = await api.post(`${this.baseURL}/forgot-password/verify-otp`, { email, otp });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resendForgotPasswordOTP(email) {
    try {
      const response = await api.post(`${this.baseURL}/forgot-password/resend-otp`, { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPasswordWithToken(resetToken, email, password, confirmPassword) {
    try {
      const response = await api.put(`${this.baseURL}/reset-password/${resetToken}`, {
        email,
        password,
        confirmPassword
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== LEGACY AUTH ====================
  async legacyForgotPassword(email) {
    try {
      const response = await api.post(`${this.baseURL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async legacyResetPassword(resetToken, password) {
    try {
      const response = await api.put(`${this.baseURL}/reset-password-legacy/${resetToken}`, { password });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async legacyRegister(userData) {
    try {
      const response = await api.post(`${this.baseURL}/register-legacy`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== SESSION MANAGEMENT ====================
  async logout() {
    try {
      const response = await api.post(`${this.baseURL}/logout`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logoutAll() {
    try {
      const response = await api.post(`${this.baseURL}/logout-all`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refreshToken() {
    try {
      const response = await api.post(`${this.baseURL}/refresh`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async checkAuth() {
    try {
      const response = await api.get(`${this.baseURL}/check`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== PASSWORD SECURITY ====================
  async getPasswordRequirements() {
    try {
      const response = await api.get(`${this.baseURL}/password-requirements`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async checkPasswordExpiration() {
    try {
      const response = await api.get(`${this.baseURL}/password-expiration`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== ERROR HANDLER ====================
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 
                     error.response.data?.error || 
                     `Error: ${error.response.status}`;
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new AuthService();