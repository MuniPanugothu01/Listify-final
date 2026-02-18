const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function () {
      return this.provider === "local";
    },
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },

  // ==================== PASSWORD HISTORY FIELD ====================
  passwordHistory: [
    {
      password: {
        type: String,
        required: true,
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
      changedBy: {
        type: String,
        enum: ["user", "admin", "system", "reset"],
        default: "user",
      },
      ipAddress: String,
      userAgent: String,
    },
  ],

  // ==================== AWS PROFILE IMAGE FIELDS ====================
  profileImage: {
    type: String,
    default: null,
  },
  profileImageKey: {
    type: String, // S3 object key
    default: null,
  },
  profileImageThumbnail: {
    type: String,
    default: null,
  },
  googleProfileImage: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },

  // Social Login Fields
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  // ==================== DEVICE & SESSION TRACKING ====================
  devices: [{
    deviceId: {
      type: String,
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
    },
    deviceType: {
      type: String,
      enum: ['mobile', 'tablet', 'desktop', 'bot', 'unknown'],
      default: 'unknown',
    },
    browser: String,
    browserVersion: String,
    os: String,
    osVersion: String,
    ipAddress: String,
    location: {
      country: String,
      city: String,
      region: String,
      latitude: Number,
      longitude: Number,
      timezone: String,
    },
    firstSeen: {
      type: Date,
      default: Date.now,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    isCurrentDevice: {
      type: Boolean,
      default: false,
    },
    userAgent: String,
    sessions: [{
      sessionId: {
        type: String,
        required: true,
      },
      tokenId: String,
      loginTime: {
        type: Date,
        default: Date.now,
      },
      lastActivity: {
        type: Date,
        default: Date.now,
      },
      logoutTime: Date,
      isActive: {
        type: Boolean,
        default: true,
      },
    }],
  }],

  // ==================== LOGIN HISTORY ====================
  loginHistory: [{
    timestamp: {
      type: Date,
      default: Date.now,
    },
    ipAddress: String,
    userAgent: String,
    deviceId: String,
    deviceName: String,
    location: {
      country: String,
      city: String,
      region: String,
    },
    loginType: {
      type: String,
      enum: ['email', 'google', 'facebook'],
    },
    success: {
      type: Boolean,
      default: true,
    },
    failureReason: String,
  }],

  // Security Fields
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: Date,
  lastLogin: Date,
  ipAddress: String,
  userAgent: String,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  // Profile Fields
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, "Please add a valid phone number"],
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["male", "female", "other", "prefer-not-to-say"],
  },

  // Preferences
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      enum: ["light", "dark", "auto"],
      default: "auto",
    },
    passwordExpiryNotification: {
      type: Boolean,
      default: true,
    },
  },

  // Status
  status: {
    type: String,
    enum: ["active", "inactive", "suspended", "banned"],
    default: "active",
  },

  // Security Audit Trail
  lastPasswordChange: Date,
  lastEmailChange: Date,
  securityLogs: [
    {
      action: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      ip: String,
      userAgent: String,
      details: mongoose.Schema.Types.Mixed,
    },
  ],
});

// Create indexes
userSchema.index({ status: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ "devices.deviceId": 1 });
userSchema.index({ "loginHistory.timestamp": -1 });

// ==================== FIXED: Middleware to handle password hashing ====================
userSchema.pre("save", async function() {
  // Update updatedAt timestamp
  this.updatedAt = Date.now();
  
  // Only hash the password if it's modified and is a plain text password
  if (!this.isModified("password") || !this.password) {
    return;
  }

  // Check if the password is already hashed (bcrypt hashes start with $2)
  if (this.password.startsWith("$2")) {
    console.log("✅ Password already hashed, skipping re-hash");
    return;
  }

  console.log("🔄 Hashing plain text password in pre-save middleware");
  
  // Hash the password
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.lastPasswordChange = new Date();
  
  console.log("✅ Password hashed successfully");
});

// ==================== METHOD: Add to password history ====================
userSchema.methods.addToPasswordHistory = async function(password, context = {}) {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    this.passwordHistory.push({
      password: hashedPassword,
      changedAt: new Date(),
      changedBy: context.changedBy || 'user',
      ipAddress: context.ipAddress,
      userAgent: context.userAgent
    });
    
    // Keep only last 5 passwords
    const historyLimit = 5;
    if (this.passwordHistory.length > historyLimit) {
      this.passwordHistory = this.passwordHistory.slice(-historyLimit);
    }
    
    await this.save();
    return true;
  } catch (error) {
    console.error("Error adding to password history:", error);
    return false;
  }
};

// ==================== METHOD: Compare password ====================
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Password comparison error:", error);
    throw error;
  }
};

// ==================== METHOD: Check if password is in history ====================
userSchema.methods.isPasswordInHistory = async function(candidatePassword) {
  try {
    const isCurrentMatch = await this.comparePassword(candidatePassword);
    if (isCurrentMatch) {
      return { inHistory: true, message: "Cannot use current password" };
    }
    
    for (let i = 0; i < this.passwordHistory.length; i++) {
      const historyItem = this.passwordHistory[i];
      const isMatch = await bcrypt.compare(candidatePassword, historyItem.password);
      if (isMatch) {
        return { 
          inHistory: true, 
          message: `You used this password on ${new Date(historyItem.changedAt).toLocaleDateString()}`,
          historyItem 
        };
      }
    }
    
    return { inHistory: false };
  } catch (error) {
    console.error("Password history check error:", error);
    return { inHistory: false, error: error.message };
  }
};

// ==================== METHOD: Check password expiration ====================
userSchema.methods.passwordNeedsChange = function() {
  if (!this.lastPasswordChange) {
    return { needsChange: false, reason: 'No password set' };
  }
  
  const now = new Date();
  const lastChange = new Date(this.lastPasswordChange);
  const daysSinceChange = Math.floor((now - lastChange) / (1000 * 60 * 60 * 24));
  
  const expirationDays = 90;
  const needsChange = daysSinceChange >= expirationDays;
  const daysRemaining = Math.max(0, expirationDays - daysSinceChange);
  
  return {
    needsChange,
    daysSinceChange,
    daysRemaining,
    expirationDays,
    warningThreshold: 7,
    shouldWarn: daysRemaining <= 7 && daysRemaining > 0
  };
};

// ==================== METHOD: Check if account is locked ====================
userSchema.methods.isLocked = function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// ==================== METHOD: Increment login attempts ====================
userSchema.methods.incrementLoginAttempts = function () {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
    updates.$set = { lockUntil: Date.now() + 60 * 60 * 1000 };
  }

  return this.updateOne(updates);
};

// ==================== METHOD: Reset login attempts ====================
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 },
  });
};

// ==================== METHOD: Create password reset token ====================
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// ==================== METHOD: Create email verification token ====================
userSchema.methods.createEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;

  return verificationToken;
};

// ==================== METHOD: Update last login ====================
userSchema.methods.updateLastLogin = function (ip, userAgent) {
  this.lastLogin = Date.now();
  if (ip) this.ipAddress = ip;
  if (userAgent) this.userAgent = userAgent;
  return this.save();
};

// ==================== METHOD: Add security log ====================
userSchema.methods.addSecurityLog = function (action, ip, userAgent, details) {
  this.securityLogs.push({
    action,
    ip,
    userAgent,
    details,
    timestamp: new Date()
  });

  if (this.securityLogs.length > 100) {
    this.securityLogs = this.securityLogs.slice(-100);
  }

  return this.save();
};

// ==================== METHOD: Get profile image ====================
userSchema.methods.getProfileImage = function () {
  if (this.profileImage) return this.profileImage;
  if (this.googleProfileImage) return this.googleProfileImage;
  if (this.avatar && this.avatar !== "https://cdn-icons-png.flaticon.com/512/149/149071.png") {
    return this.avatar;
  }
  return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
};

// ==================== METHOD: Update profile image ====================
userSchema.methods.updateProfileImage = async function (imageUrl, imageKey) {
  this.profileImage = imageUrl;
  this.profileImageKey = imageKey;
  return this.save();
};

// ==================== METHOD: Add login to history ====================
userSchema.methods.addLoginHistory = function(loginData) {
  this.loginHistory.push({
    timestamp: new Date(),
    ipAddress: loginData.ipAddress,
    userAgent: loginData.userAgent,
    deviceId: loginData.deviceId,
    deviceName: loginData.deviceName,
    location: loginData.location,
    loginType: loginData.loginType,
    success: loginData.success,
    failureReason: loginData.failureReason,
  });

  // Keep only last 50 login records
  if (this.loginHistory.length > 50) {
    this.loginHistory = this.loginHistory.slice(-50);
  }

  return this.save();
};

// ==================== METHOD: Update device session ====================
userSchema.methods.updateDeviceSession = function(deviceData, tokenId) {
  const existingDeviceIndex = this.devices.findIndex(
    d => d.deviceId === deviceData.deviceId
  );

  if (existingDeviceIndex >= 0) {
    // Update existing device
    this.devices[existingDeviceIndex].lastSeen = new Date();
    this.devices[existingDeviceIndex].sessions.push({
      sessionId: crypto.randomBytes(16).toString('hex'),
      tokenId,
      loginTime: new Date(),
      lastActivity: new Date(),
      isActive: true,
    });
    
    // Keep only last 10 sessions
    if (this.devices[existingDeviceIndex].sessions.length > 10) {
      this.devices[existingDeviceIndex].sessions = 
        this.devices[existingDeviceIndex].sessions.slice(-10);
    }
  } else {
    // Add new device
    this.devices.push(deviceData);
  }

  return this.save();
};

// ==================== METHOD: Deactivate session ====================
userSchema.methods.deactivateSession = function(tokenId) {
  for (let i = 0; i < this.devices.length; i++) {
    const device = this.devices[i];
    const sessionIndex = device.sessions.findIndex(s => s.tokenId === tokenId);
    
    if (sessionIndex >= 0) {
      device.sessions[sessionIndex].isActive = false;
      device.sessions[sessionIndex].logoutTime = new Date();
      break;
    }
  }
  
  return this.save();
};

// ==================== VIRTUAL: Full name ====================
userSchema.virtual("fullName").get(function () {
  return this.name;
});

// ==================== VIRTUAL: Is social login ====================
userSchema.virtual("isSocialLogin").get(function () {
  return this.provider !== "local";
});

// ==================== toJSON TRANSFORM ====================
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    delete ret.emailVerificationToken;
    delete ret.emailVerificationExpires;
    delete ret.securityLogs;
    delete ret.loginAttempts;
    delete ret.lockUntil;
    delete ret.__v;
    delete ret.passwordHistory;

    ret.profileImageUrl = doc.getProfileImage ? doc.getProfileImage() : 
                         (ret.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png");
    
    if (!ret.profileImageUrl) {
      ret.profileImageUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }
    
    ret.profileImage = doc.profileImage || null;
    ret.profileImageKey = doc.profileImageKey || null;
    ret.googleProfileImage = doc.googleProfileImage || null;
    ret.avatar = doc.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);