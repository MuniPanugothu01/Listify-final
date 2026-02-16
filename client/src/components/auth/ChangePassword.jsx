import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const ChangePassword = ({ onSuccess }) => {
  const { changePassword, loading, error, clearAuthError } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [breachChecking, setBreachChecking] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    breachChecked: false,
    isBreached: false
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  });

  // Fetch password requirements
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/password-requirements`);
        if (response.data.success) {
          setPasswordRequirements(response.data.requirements);
        }
      } catch (error) {
        console.error("Failed to fetch password requirements:", error);
      }
    };
    fetchRequirements();
  }, []);

  // Check password strength
  useEffect(() => {
    const password = formData.newPassword;
    
    if (!password) {
      setPasswordChecks(prev => ({
        ...prev,
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        breachChecked: false,
        isBreached: false
      }));
      return;
    }

    setPasswordChecks(prev => ({
      ...prev,
      length: password.length >= passwordRequirements.minLength,
      uppercase: passwordRequirements.requireUppercase ? /[A-Z]/.test(password) : true,
      lowercase: passwordRequirements.requireLowercase ? /[a-z]/.test(password) : true,
      number: passwordRequirements.requireNumbers ? /[0-9]/.test(password) : true,
      special: passwordRequirements.requireSpecialChars ? 
        new RegExp(`[${passwordRequirements.specialChars.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}]`).test(password) : true
    }));
  }, [formData.newPassword, passwordRequirements]);

  // Check password breach
  const checkPasswordBreach = async (password) => {
    if (!password || password.length < 8) return;
    
    setBreachChecking(true);
    try {
      const sha1 = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(password))
        .then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase());
      
      const prefix = sha1.substring(0, 5);
      const suffix = sha1.substring(5);
      
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const data = await response.text();
      const hashes = data.split('\n').map(line => line.split(':')[0]);
      
      const isBreached = hashes.some(h => h === suffix);
      
      setPasswordChecks(prev => ({
        ...prev,
        breachChecked: true,
        isBreached
      }));
      
      if (isBreached) {
        toast.error("This password has been exposed in a data breach. Please choose a different one.");
      }
    } catch (error) {
      console.error("Breach check failed:", error);
    } finally {
      setBreachChecking(false);
    }
  };

  // Debounced breach check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.newPassword && 
          passwordChecks.length && 
          passwordChecks.uppercase && 
          passwordChecks.lowercase && 
          passwordChecks.number && 
          passwordChecks.special) {
        checkPasswordBreach(formData.newPassword);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [formData.newPassword, passwordChecks]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearAuthError();
    }
  }, [error, clearAuthError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const allChecksPassed = 
        passwordChecks.length && 
        passwordChecks.uppercase && 
        passwordChecks.lowercase && 
        passwordChecks.number && 
        passwordChecks.special;
      
      if (!allChecksPassed) {
        newErrors.newPassword = "Password does not meet all requirements";
      }
      
      if (passwordChecks.isBreached) {
        newErrors.newPassword = "This password has been exposed in a data breach";
      }
    }

    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    if (formData.newPassword && formData.currentPassword && formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (passwordChecks.isBreached) {
      toast.error("This password has been exposed in a data breach. Please choose a different one.");
      return;
    }

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword
      });
      
      toast.success("Password changed successfully! Please login again.");
      
      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Change password error:", error);
    }
  };

  const getPasswordStrength = () => {
    if (!formData.newPassword) return { text: "", color: "gray", width: "0%" };

    let strength = 0;
    if (passwordChecks.length) strength += 20;
    if (passwordChecks.uppercase) strength += 20;
    if (passwordChecks.lowercase) strength += 20;
    if (passwordChecks.number) strength += 20;
    if (passwordChecks.special) strength += 20;

    if (strength <= 20) return { text: "Very Weak", color: "bg-red-500", width: "20%" };
    if (strength <= 40) return { text: "Weak", color: "bg-orange-500", width: "40%" };
    if (strength <= 60) return { text: "Fair", color: "bg-yellow-500", width: "60%" };
    if (strength <= 80) return { text: "Good", color: "bg-blue-500", width: "80%" };
    return { text: "Strong", color: "bg-green-500", width: "100%" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.currentPassword
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-[#27bb97]"
            }`}
            placeholder="Enter current password"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.newPassword
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-[#27bb97]"
            }`}
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {formData.newPassword && (
          <div className="mt-3 space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">Password Strength:</span>
              <span className="text-xs font-semibold" style={{ color: passwordStrength.color === 'bg-green-500' ? '#10b981' : passwordStrength.color === 'bg-red-500' ? '#ef4444' : '#f59e0b' }}>
                {passwordStrength.text}
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                style={{ width: passwordStrength.width }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-1">
                {passwordChecks.length ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>
                )}
                <span className="text-xs text-gray-600">
                  {passwordRequirements.minLength}+ characters
                </span>
              </div>
              
              {passwordRequirements.requireUppercase && (
                <div className="flex items-center gap-1">
                  {passwordChecks.uppercase ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>
                  )}
                  <span className="text-xs text-gray-600">Uppercase</span>
                </div>
              )}
              
              {passwordRequirements.requireLowercase && (
                <div className="flex items-center gap-1">
                  {passwordChecks.lowercase ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>
                  )}
                  <span className="text-xs text-gray-600">Lowercase</span>
                </div>
              )}
              
              {passwordRequirements.requireNumbers && (
                <div className="flex items-center gap-1">
                  {passwordChecks.number ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>
                  )}
                  <span className="text-xs text-gray-600">Number</span>
                </div>
              )}
              
              {passwordRequirements.requireSpecialChars && (
                <div className="flex items-center gap-1 col-span-2">
                  {passwordChecks.special ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>
                  )}
                  <span className="text-xs text-gray-600">
                    Special character ({passwordRequirements.specialChars})
                  </span>
                </div>
              )}
            </div>
            
            {passwordChecks.breachChecked && passwordChecks.isBreached && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">
                  This password has been exposed in a data breach. Please choose a different password.
                </p>
              </div>
            )}
            
            {breachChecking && (
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-500"></div>
                Checking if password has been compromised...
              </div>
            )}
          </div>
        )}

        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.confirmNewPassword
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-[#27bb97]"
            }`}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmNewPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmNewPassword}</p>
        )}
      </div>

      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 flex items-start gap-2">
        <Shield size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700">
          Your new password will be checked against known data breaches and added to your password history. 
          You cannot reuse any of your last 5 passwords.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || breachChecking}
        className="w-full bg-[#27bb97] hover:bg-[#1fa987] text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Changing Password..." : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePassword;