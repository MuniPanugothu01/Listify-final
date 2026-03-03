const {
  validateRegisterInput,
  validateLoginInput,
  validateProfileUpdateInput,
  validateChangePasswordInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
} = require("../utils/validation");

// Register validation middleware
exports.validateRegister = (req, res, next) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

// Login validation middleware
exports.validateLogin = (req, res, next) => {
  const { isValid, errors } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

// Profile update validation middleware
exports.validateProfileUpdate = (req, res, next) => {
  const { isValid, errors } = validateProfileUpdateInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

// Change password validation middleware
exports.validateChangePassword = (req, res, next) => {
  const { isValid, errors } = validateChangePasswordInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

// Forgot password validation middleware
exports.validateForgotPassword = (req, res, next) => {
  const { isValid, errors } = validateForgotPasswordInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

// Reset password validation middleware
exports.validateResetPassword = (req, res, next) => {
  const { isValid, errors } = validateResetPasswordInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

// Add this validation for OTP verification
exports.validateOTPVerification = (req, res, next) => {
  const { email, otp } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "OTP is required",
    });
  }

  if (!/^\d{6}$/.test(otp)) {
    return res.status(400).json({
      success: false,
      message: "OTP must be 6 digits",
    });
  }

  next();
};

// ==================== Listing Input Validation ====================

/**
 * Sanitise and validate common listing fields shared by Electronics + Vehicles.
 * Strips HTML tags, limits string lengths, validates types.
 */
exports.validateListingInput = (req, res, next) => {
  const errors = {};
  const body = req.body;

  // Utility: strip HTML tags
  const stripTags = (str) =>
    typeof str === 'string' ? str.replace(/<[^>]*>/g, '').trim() : str;

  // Sanitise string fields
  ['title', 'description', 'location', 'phone', 'category', 'subcategory', 'condition'].forEach((f) => {
    if (body[f] !== undefined) body[f] = stripTags(body[f]);
  });

  // Vehicle-specific string fields
  ['brand', 'model', 'variant', 'year', 'kmDriven', 'fuelType', 'transmission', 'ownership', 'color'].forEach((f) => {
    if (body[f] !== undefined) body[f] = stripTags(body[f]);
  });

  // Required fields
  if (!body.title || body.title.length < 3) errors.title = 'Title must be at least 3 characters';
  if (body.title && body.title.length > 200) errors.title = 'Title cannot exceed 200 characters';
  if (!body.description || body.description.length < 20) errors.description = 'Description must be at least 20 characters';
  if (body.description && body.description.length > 5000) errors.description = 'Description cannot exceed 5000 characters';
  if (body.price === undefined || body.price === null || body.price === '') errors.price = 'Price is required';
  if (body.price !== undefined && (isNaN(Number(body.price)) || Number(body.price) < 0)) errors.price = 'Price must be a non-negative number';
  if (body.price !== undefined && Number(body.price) > 999999999) errors.price = 'Price exceeds maximum allowed value';
  if (!body.category) errors.category = 'Category is required';
  if (!body.subcategory) errors.subcategory = 'Subcategory is required';
  if (!body.location || body.location.length < 2) errors.location = 'Location is required';

  // Validate condition enum
  const validConditions = ['New', 'Like New', 'Good', 'Fair', 'Used'];
  if (body.condition && !validConditions.includes(body.condition)) {
    errors.condition = `Condition must be one of: ${validConditions.join(', ')}`;
  }

  // Validate images array
  if (body.images) {
    if (!Array.isArray(body.images)) errors.images = 'Images must be an array';
    else if (body.images.length > 10) errors.images = 'Maximum 10 images allowed';
    else {
      // Validate each image URL
      for (const url of body.images) {
        if (typeof url !== 'string' || url.length > 2048) {
          errors.images = 'Invalid image URL detected';
          break;
        }
      }
    }
  }

  // Validate features array
  if (body.features) {
    if (!Array.isArray(body.features)) errors.features = 'Features must be an array';
    else if (body.features.length > 20) errors.features = 'Maximum 20 features allowed';
  }

  // Validate phone (basic)
  if (body.phone && !/^[\d\s\-\+\(\)]{7,20}$/.test(body.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Coerce price to number
  body.price = Number(body.price);

  next();
};

// ==================== NEW: Password validation middleware ====================
exports.validatePasswordSecurity = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const passwordToCheck = newPassword || password;
    
    if (!passwordToCheck) {
      return next();
    }
    
    const { validatePassword } = require('../utils/passwordSecurity');
    const userId = req.user ? req.user.id : null;
    
    // Only check breach for new registrations or password changes
    const checkBreach = true;
    
    const validation = await validatePassword(passwordToCheck, userId, checkBreach);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet security requirements',
        errors: validation.errors,
        strength: validation.strength
      });
    }
    
    // Attach validation result to request
    req.passwordValidation = validation;
    next();
  } catch (error) {
    console.error('Password validation middleware error:', error);
    next();
  }
};

// ==================== NEW: Get password requirements ====================
exports.getPasswordRequirements = (req, res) => {
  const { getPasswordRequirements } = require('../utils/passwordSecurity');
  res.status(200).json({
    success: true,
    requirements: getPasswordRequirements()
  });
};