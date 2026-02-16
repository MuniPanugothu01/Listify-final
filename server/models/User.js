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

  // Profile Image Fields
  profileImage: {
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
  const salt = await bcrypt.genSalt(12); // Increased from 10 to 12 for better security
  this.password = await bcrypt.hash(this.password, salt);
  this.lastPasswordChange = new Date();
  
  console.log("✅ Password hashed successfully");
});

// ==================== NEW: Method to add password to history ====================
userSchema.methods.addToPasswordHistory = async function(password, context = {}) {
  try {
    // Hash the password before storing in history
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Add to password history
    this.passwordHistory.push({
      password: hashedPassword,
      changedAt: new Date(),
      changedBy: context.changedBy || 'user',
      ipAddress: context.ipAddress,
      userAgent: context.userAgent
    });
    
    // Keep only last 5 passwords (or configured limit)
    const historyLimit = 5; // Configurable
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

// ==================== UPDATED: comparePassword with better logging ====================
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Password comparison error:", error);
    throw error;
  }
};

// ==================== NEW: Check if password is in history ====================
userSchema.methods.isPasswordInHistory = async function(candidatePassword) {
  try {
    // Check current password first
    const isCurrentMatch = await this.comparePassword(candidatePassword);
    if (isCurrentMatch) {
      return { inHistory: true, message: "Cannot use current password" };
    }
    
    // Check history
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

// ==================== NEW: Check if password needs to be changed ====================
userSchema.methods.passwordNeedsChange = function() {
  if (!this.lastPasswordChange) {
    return { needsChange: false, reason: 'No password set' };
  }
  
  const now = new Date();
  const lastChange = new Date(this.lastPasswordChange);
  const daysSinceChange = Math.floor((now - lastChange) / (1000 * 60 * 60 * 24));
  
  // 90 days expiration policy
  const expirationDays = 90;
  const needsChange = daysSinceChange >= expirationDays;
  const daysRemaining = Math.max(0, expirationDays - daysSinceChange);
  
  return {
    needsChange,
    daysSinceChange,
    daysRemaining,
    expirationDays,
    warningThreshold: 7, // Warn 7 days before expiration
    shouldWarn: daysRemaining <= 7 && daysRemaining > 0
  };
};

// Method to check if account is locked
userSchema.methods.isLocked = function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Method to increment login attempts
userSchema.methods.incrementLoginAttempts = function () {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }

  // Otherwise increment
  const updates = { $inc: { loginAttempts: 1 } };

  // Lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
    updates.$set = { lockUntil: Date.now() + 60 * 60 * 1000 }; // 1 hour lock
  }

  return this.updateOne(updates);
};

// Method to reset login attempts after successful login
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 },
  });
};

// Method to generate password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Method to generate email verification token
userSchema.methods.createEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

// Method to update last login
userSchema.methods.updateLastLogin = function (ip, userAgent) {
  this.lastLogin = Date.now();
  if (ip) this.ipAddress = ip;
  if (userAgent) this.userAgent = userAgent;
  return this.save();
};

// Method to add security log
userSchema.methods.addSecurityLog = function (action, ip, userAgent, details) {
  this.securityLogs.push({
    action,
    ip,
    userAgent,
    details,
    timestamp: new Date()
  });

  // Keep only last 100 logs
  if (this.securityLogs.length > 100) {
    this.securityLogs = this.securityLogs.slice(-100);
  }

  return this.save();
};

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return this.name;
});

// Virtual for isSocialLogin
userSchema.virtual("isSocialLogin").get(function () {
  return this.provider !== "local";
});

// ==================== UPDATED toJSON TRANSFORM ====================
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
    delete ret.passwordHistory; // Don't expose password history

    // Calculate profileImageUrl using the method
    ret.profileImageUrl = doc.getProfileImage ? doc.getProfileImage() : 
                         (ret.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png");
    
    // Ensure we always have a valid profileImageUrl
    if (!ret.profileImageUrl) {
      ret.profileImageUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }
    
    // Add profileImage and googleProfileImage fields for frontend
    ret.profileImage = doc.profileImage || null;
    ret.googleProfileImage = doc.googleProfileImage || null;
    ret.avatar = doc.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);