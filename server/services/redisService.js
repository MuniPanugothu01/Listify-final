const redis = require("../config/redis");

class RedisService {
  // Store pending registration data
  static async storePendingRegistration(email, userData) {
    try {
      const key = `pending_registration:${email}`;
      const dataString = JSON.stringify(userData);
      console.log(`[Redis] Storing pending registration for ${email}`);

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
      const otpString = String(otp);
      console.log(`[Redis] Storing OTP for ${email}: ${otpString} (as string)`);

      await redis.setex(key, 300, otpString);
      return true;
    } catch (error) {
      console.error("Error storing OTP:", error);
      return false;
    }
  }

  // ============== FIXED: Increment OTP attempts and check lock (BLOCK AFTER 3 ATTEMPTS) ==============
  static async incrementOTPAttempts(email) {
    try {
      const key = `otp_attempts:${email}`;
      const attempts = await redis.incr(key);

      // Set expiry if this is the first attempt
      if (attempts === 1) {
        await redis.expire(key, 300); // Reset after 5 minutes
      }

      console.log(`[Redis] OTP attempts for ${email}: ${attempts}`);

      // Block email if too many attempts (3+ attempts)
      if (attempts >= 3) {
        await this.blockOTPEmail(email, 60); // Block for 1 minute
        return { attempts, blocked: true, blockDuration: 60 };
      }

      return { attempts, blocked: false };
    } catch (error) {
      console.error("Error incrementing OTP attempts:", error);
      return { attempts: 1, blocked: false };
    }
  }

  // ============== FIXED: Block email for OTP attempts ==============
  static async blockOTPEmail(email, seconds) {
    try {
      const key = `blocked_otp:${email}`;
      await redis.setex(key, seconds, "true");
      console.log(
        `[Redis] Blocked OTP for email ${email} for ${seconds} seconds`,
      );

      const blockInfoKey = `otp_block_info:${email}`;
      const blockInfo = {
        blockedAt: new Date().toISOString(),
        duration: seconds,
        expiresIn: seconds,
      };
      await redis.setex(blockInfoKey, seconds, JSON.stringify(blockInfo));

      return true;
    } catch (error) {
      console.error("Error blocking OTP email:", error);
      return false;
    }
  }

  // ============== FIXED: Check if OTP is blocked ==============
  static async checkOTPBlocked(email) {
    try {
      const key = `blocked_otp:${email}`;
      const exists = await redis.exists(key);

      if (exists === 1) {
        const ttl = await redis.ttl(key);
        console.log(`[Redis] OTP blocked for ${email}, TTL: ${ttl}s`);
        return { blocked: true, remainingSeconds: ttl };
      }

      console.log(`[Redis] OTP not blocked for ${email}`);
      return { blocked: false, remainingSeconds: 0 };
    } catch (error) {
      console.error("Error checking OTP blocked:", error);
      return { blocked: false, remainingSeconds: 0 };
    }
  }

  // ============== FIXED: Get OTP block info ==============
  static async getOTPBlockInfo(email) {
    try {
      const key = `otp_block_info:${email}`;
      const data = await redis.get(key);

      if (!data) {
        return null;
      }

      let parsedData;
      try {
        if (typeof data === "string") {
          parsedData = JSON.parse(data);
        } else if (typeof data === "object") {
          parsedData = data;
        }

        const ttl = await redis.ttl(`blocked_otp:${email}`);
        parsedData.expiresIn = ttl;

        return parsedData;
      } catch (parseError) {
        console.error(`[Redis] JSON parse error:`, parseError);
        return null;
      }
    } catch (error) {
      console.error("Error getting OTP block info:", error);
      return null;
    }
  }

  // ============== FIXED: Clear OTP attempts ==============
  static async clearOTPAttempts(email) {
    try {
      const key = `otp_attempts:${email}`;
      await redis.del(key);
      console.log(`[Redis] Cleared OTP attempts for ${email}`);
      return true;
    } catch (error) {
      console.error("Error clearing OTP attempts:", error);
      return false;
    }
  }

  // ============== FIXED: Clear OTP block ==============
  static async clearOTPBlock(email) {
    try {
      const blockKey = `blocked_otp:${email}`;
      const blockInfoKey = `otp_block_info:${email}`;
      await redis.del(blockKey);
      await redis.del(blockInfoKey);
      console.log(`[Redis] Cleared OTP block for ${email}`);
      return true;
    } catch (error) {
      console.error("Error clearing OTP block:", error);
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

      const receivedOTP = String(otp).trim();
      const storedOTPStr = String(storedOTP).trim();

      console.log(`[Redis] Comparing: "${receivedOTP}" === "${storedOTPStr}"`);

      if (receivedOTP !== storedOTPStr) {
        return { valid: false, reason: "Invalid OTP" };
      }

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

      if (attempts === 1) {
        await redis.expire(key, 3600);
      }

      console.log(`[Redis] Registration attempts for ${email}: ${attempts}`);

      if (attempts >= 5) {
        await this.blockEmail(email, 3600);
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

  // Store pending password reset
  static async storePendingPasswordReset(email, resetData) {
    try {
      const key = `pending_password_reset:${email}`;
      const dataString = JSON.stringify(resetData);
      console.log(`[Redis] Storing pending password reset for ${email}`);

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
