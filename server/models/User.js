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
    index: true,
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

  // ==================== PROFILE IMAGE FIELDS ====================
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
  // ==================== END PROFILE IMAGE FIELDS ====================

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

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ status: 1 });
userSchema.index({ createdAt: -1 });

// ==================== NEW METHODS FOR PROFILE IMAGES ====================
// Method to get best available profile image
userSchema.methods.getProfileImage = function () {
  if (this.profileImage) return this.profileImage;
  if (this.googleProfileImage) return this.googleProfileImage;
  if (
    this.avatar &&
    this.avatar !== "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  ) {
    return this.avatar;
  }
  return "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Default avatar
};

// Method to update profile image
userSchema.methods.updateProfileImage = async function (imageUrl) {
  this.profileImage = imageUrl;
  return this.save();
};
// ==================== END NEW METHODS ====================

// Middleware to handle password hashing - SIMPLIFIED
userSchema.pre("save", async function (next) {
  // Only hash the password if it's modified and is a plain text password
  if (this.isModified("password") && this.password) {
    // Check if the password is already hashed (bcrypt hashes start with $2)
    if (!this.password.startsWith("$2")) {
      try {
        console.log("🔄 Hashing plain text password in pre-save middleware");
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.lastPasswordChange = new Date();
      } catch (error) {
        return next(error);
      }
    } else {
      console.log("✅ Password already hashed, skipping re-hash");
    }
  }

  // Ensure provider is set correctly
  if (this.googleId && !this.provider) {
    this.provider = "google";
  }

  // Update updatedAt timestamp
  this.updatedAt = Date.now();
  next();
});

// Method to compare password - SIMPLIFIED
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Password comparison error:", error);
    throw error;
  }
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

    // Add profileImageUrl virtual
    ret.profileImageUrl = doc.getProfileImage
      ? doc.getProfileImage()
      : ret.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
