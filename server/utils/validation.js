const validateEmail=(email)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateName = (name) => {
  return name && name.trim().length > 0 && name.length <= 50;
};

// Register validation with confirm password
const validateRegisterInput = (data) => {
  const errors = {};
  
  // Name validation
  if (!validateName(data.name)) {
    errors.name = 'Name is required and should be 1-50 characters';
  }
  
  // Email validation
  if (!validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }
  
  // Password validation
  if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 6 characters long';
  }
  
  // Confirm password validation
  // if (!data.confirmPassword) {
  //   errors.confirmPassword = 'Please confirm your password';
  // } else if (data.password !== data.confirmPassword) {
  //   errors.confirmPassword = 'Passwords do not match';
  // }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Login validation
const validateLoginInput = (data) => {
  const errors = {};
  
  // Email validation
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }
  
  // Password validation
  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Profile update validation
const validateProfileUpdateInput = (data) => {
  const errors = {};
  
  if (data.name && !validateName(data.name)) {
    errors.name = 'Name should be 1-50 characters';
  }
  
  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Change password validation
const validateChangePasswordInput = (data) => {
  const errors = {};
  
  if (!data.currentPassword || data.currentPassword.trim() === '') {
    errors.currentPassword = 'Current password is required';
  }
  
  if (!data.newPassword || !validatePassword(data.newPassword)) {
    errors.newPassword = 'New password must be at least 6 characters';
  }
  
  if (data.newPassword === data.currentPassword) {
    errors.newPassword = 'New password must be different from current password';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Forgot password validation
const validateForgotPasswordInput = (data) => {
  const errors = {};
  
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Reset password validation
const validateResetPasswordInput = (data) => {
  const errors = {};
  
  if (!data.password || !validatePassword(data.password)) {
    errors.password = 'Password must be at least 6 characters long';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateProfileUpdateInput,
  validateChangePasswordInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
  validateEmail,
  validatePassword,
  validateName
};