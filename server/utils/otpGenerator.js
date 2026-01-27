const crypto = require('crypto');

class OTPGenerator {
  // Generate 6-digit OTP
  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate alphanumeric OTP
  static generateAlphanumericOTP(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, chars.length);
      otp += chars[randomIndex];
    }
    
    return otp;
  }

  // Generate secure token for email verification
  static generateSecureToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Hash OTP for storage (if needed)
  static hashOTP(otp) {
    return crypto.createHash('sha256').update(otp).digest('hex');
  }
}

module.exports = OTPGenerator;