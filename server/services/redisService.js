const redis = require("../config/redis");

class RedisService {
  // Store pending registration data
  static async storePendingRegistration(email, userData) {
    try {
      const key = `pending_registration:${email}`;

      // FIX: Always stringify the data before storing
      const dataString = JSON.stringify(userData);
      console.log(`[Redis] Storing pending registration for ${email}`);

      // Store for 10 minutes (600 seconds)
      await redis.setex(key, 600, dataString);
      return true;
    } catch (error) {
      console.error("Error storing pending registration:", error);
      return false;
    }
  }

  // Get pending registration data
  static async getPendingRegistration(email) {
    try {
      const key = `pending_registration:${email}`;
      const data = await redis.get(key);

      if (!data) {
        console.log(`[Redis] No pending registration found for ${email}`);
        return null;
      }

      console.log(`[Redis] Found pending registration for ${email}`);

      // FIX: Check if data is already an object or needs parsing
      let parsedData;
      try {
        if (typeof data === "string") {
          // If it's a string, parse it as JSON
          parsedData = JSON.parse(data);
        } else if (typeof data === "object") {
          // If it's already an object, use it directly
          parsedData = data;
        } else {
          console.log(`[Redis] Unexpected data type: ${typeof data}`);
          return null;
        }
      } catch (parseError) {
        console.error(`[Redis] JSON parse error:`, parseError);
        console.log(`[Redis] Raw data:`, data);
        return null;
      }

      return parsedData;
    } catch (error) {
      console.error("Error getting pending registration:", error);
      return null;
    }
  }

  // Delete pending registration data
  static async deletePendingRegistration(email) {
    try {
      const key = `pending_registration:${email}`;
      await redis.del(key);
      console.log(`[Redis] Deleted pending registration for ${email}`);
      return true;
    } catch (error) {
      console.error("Error deleting pending registration:", error);
      return false;
    }
  }

  // Store OTP with email
  static async storeOTP(email, otp) {
    try {
      const key = `otp:${email}`;
      // FIX: Always store as string
      const otpString = String(otp);
      console.log(`[Redis] Storing OTP for ${email}: ${otpString} (as string)`);

      // OTP valid for 5 minutes (300 seconds)
      await redis.setex(key, 300, otpString);
      return true;
    } catch (error) {
      console.error("Error storing OTP:", error);
      return false;
    }
  }

  // Verify OTP
  static async verifyOTP(email, otp) {
    try {
      const key = `otp:${email}`;
      const storedOTP = await redis.get(key);

      console.log(
        `[Redis] Verifying OTP for ${email}: received=${otp} (type: ${typeof otp}), stored=${storedOTP} (type: ${typeof storedOTP})`,
      );

      if (!storedOTP) {
        return { valid: false, reason: "OTP expired or not found" };
      }

      // FIX: Compare as strings to avoid type mismatch
      const receivedOTP = String(otp).trim();
      const storedOTPStr = String(storedOTP).trim();

      console.log(`[Redis] Comparing: "${receivedOTP}" === "${storedOTPStr}"`);

      if (receivedOTP !== storedOTPStr) {
        return { valid: false, reason: "Invalid OTP" };
      }

      // Delete OTP after successful verification
      await redis.del(key);
      console.log(`[Redis] OTP verified successfully for ${email}`);
      return { valid: true };
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return { valid: false, reason: "Server error during OTP verification" };
    }
  }

  // Check if email exists in database (for rate limiting)
  static async checkEmailBlocked(email) {
    try {
      const key = `blocked_email:${email}`;
      const exists = await redis.exists(key);
      console.log(
        `[Redis] Check email blocked ${email}: ${exists ? "Yes" : "No"}`,
      );
      return exists === 1;
    } catch (error) {
      console.error("Error checking blocked email:", error);
      return false;
    }
  }

  // Set email exists flag (for rate limiting)
  static async setEmailExists(email) {
    try {
      const key = `email_exists:${email}`;
      // Set for 1 hour to prevent spam
      await redis.setex(key, 3600, "true");
      console.log(`[Redis] Set email exists flag for ${email} (1 hour)`);
      return true;
    } catch (error) {
      console.error("Error setting email exists flag:", error);
      return false;
    }
  }

  // Rate limiting methods
  static async incrementRegistrationAttempts(email) {
    try {
      const key = `reg_attempts:${email}`;
      const attempts = await redis.incr(key);

      // Set expiry if this is the first attempt
      if (attempts === 1) {
        await redis.expire(key, 3600); // 1 hour
      }

      console.log(`[Redis] Registration attempts for ${email}: ${attempts}`);

      // Block email if too many attempts (5+)
      if (attempts >= 5) {
        await this.blockEmail(email, 3600); // Block for 1 hour
      }

      return attempts;
    } catch (error) {
      console.error("Error incrementing registration attempts:", error);
      return 1;
    }
  }

  // Block email
  static async blockEmail(email, seconds) {
    try {
      const key = `blocked_email:${email}`;
      await redis.setex(key, seconds, "true");
      console.log(`[Redis] Blocked email ${email} for ${seconds} seconds`);
      return true;
    } catch (error) {
      console.error("Error blocking email:", error);
      return false;
    }
  }

  static async clearRegistrationAttempts(email) {
    try {
      const key = `reg_attempts:${email}`;
      await redis.del(key);
      console.log(`[Redis] Cleared registration attempts for ${email}`);
      return true;
    } catch (error) {
      console.error("Error clearing registration attempts:", error);
      return false;
    }
  }

  // Check if OTP exists
  static async checkOTPExists(email) {
    try {
      const key = `otp:${email}`;
      const exists = await redis.exists(key);
      console.log(`[Redis] OTP exists for ${email}: ${exists ? "Yes" : "No"}`);
      return exists === 1;
    } catch (error) {
      console.error("Error checking OTP exists:", error);
      return false;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const result = await redis.ping();
      console.log("[Redis] Health check:", result);
      return "connected";
    } catch (error) {
      console.error("Redis health check failed:", error.message);
      return "disconnected";
    }
  }

  // Add these methods to your RedisService class

  // Store pending password reset
  static async storePendingPasswordReset(email, resetData) {
    try {
      const key = `pending_password_reset:${email}`;
      const dataString = JSON.stringify(resetData);
      console.log(`[Redis] Storing pending password reset for ${email}`);

      // Store for 10 minutes (600 seconds)
      await redis.setex(key, 600, dataString);
      return true;
    } catch (error) {
      console.error("Error storing pending password reset:", error);
      return false;
    }
  }

  // Get pending password reset data
  static async getPendingPasswordReset(email) {
    try {
      const key = `pending_password_reset:${email}`;
      const data = await redis.get(key);

      if (!data) {
        console.log(`[Redis] No pending password reset found for ${email}`);
        return null;
      }

      console.log(`[Redis] Found pending password reset for ${email}`);

      let parsedData;
      try {
        if (typeof data === "string") {
          parsedData = JSON.parse(data);
        } else if (typeof data === "object") {
          parsedData = data;
        } else {
          console.log(`[Redis] Unexpected data type: ${typeof data}`);
          return null;
        }
      } catch (parseError) {
        console.error(`[Redis] JSON parse error:`, parseError);
        console.log(`[Redis] Raw data:`, data);
        return null;
      }

      return parsedData;
    } catch (error) {
      console.error("Error getting pending password reset:", error);
      return null;
    }
  }

  // Delete pending password reset
  static async deletePendingPasswordReset(email) {
    try {
      const key = `pending_password_reset:${email}`;
      await redis.del(key);
      console.log(`[Redis] Deleted pending password reset for ${email}`);
      return true;
    } catch (error) {
      console.error("Error deleting pending password reset:", error);
      return false;
    }
  }

  // Store password reset token
  static async storePasswordResetToken(email, token) {
    try {
      const key = `password_reset_token:${email}`;
      console.log(`[Redis] Storing password reset token for ${email}`);

      // Store for 10 minutes (600 seconds)
      await redis.setex(key, 600, token);
      return true;
    } catch (error) {
      console.error("Error storing password reset token:", error);
      return false;
    }
  }

  // Verify password reset token
  static async verifyPasswordResetToken(email, token) {
    try {
      const key = `password_reset_token:${email}`;
      const storedToken = await redis.get(key);

      if (!storedToken) {
        return false;
      }

      return storedToken === token;
    } catch (error) {
      console.error("Error verifying password reset token:", error);
      return false;
    }
  }

  // Delete password reset token
  static async deletePasswordResetToken(email) {
    try {
      const key = `password_reset_token:${email}`;
      await redis.del(key);
      console.log(`[Redis] Deleted password reset token for ${email}`);
      return true;
    } catch (error) {
      console.error("Error deleting password reset token:", error);
      return false;
    }
  }

  // Delete OTP
  static async deleteOTP(email) {
    try {
      const key = `otp:${email}`;
      await redis.del(key);
      console.log(`[Redis] Deleted OTP for ${email}`);
      return true;
    } catch (error) {
      console.error("Error deleting OTP:", error);
      return false;
    }
  }
}

module.exports = RedisService;
