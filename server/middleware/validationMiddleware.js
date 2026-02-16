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