import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialAuth from "./SocialAuth";
import EmailProgressPopup from "./EmailProgressPopup";
import OtpVerification from "./OtpVerification";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    registerInitiate,
    registerVerify,
    registerResendOTP,
    GoogleLogin,
    loading,
    error,
    success,
    otpSent,
    registrationEmail,
    clearAuthError,
    resetAuthSuccess,
    clearOtpAuthState,
  } = useAuth();

  // ==================== Navigation flag to prevent multiple navigations ====================
  const navigationPerformedRef = useRef(false);

  // ==================== Email in progress popup state ====================
  const [showEmailProgressPopup, setShowEmailProgressPopup] = useState(false);
  const [inProgressEmail, setInProgressEmail] = useState("");
  const [popupExpiryTime, setPopupExpiryTime] = useState(0);
  const [popupCountdown, setPopupCountdown] = useState(0);

  // Password security states
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    breached: false,
    checkingBreach: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    text: "",
    color: "bg-gray-200",
    width: "0%",
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // OTP State
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset navigation flag on unmount
  useEffect(() => {
    return () => {
      navigationPerformedRef.current = false;
    };
  }, []);

  // ==================== Add animation styles ====================
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translateY(20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
      .animate-slideUp {
        animation: slideUp 0.4s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // ==================== Countdown timer for popup ====================
  useEffect(() => {
    let timer;
    if (showEmailProgressPopup && popupCountdown > 0) {
      timer = setTimeout(() => {
        setPopupCountdown(popupCountdown - 1);
      }, 1000);
    } else if (popupCountdown === 0 && showEmailProgressPopup) {
      // Auto close when countdown reaches 0
      setShowEmailProgressPopup(false);
    }
    return () => clearTimeout(timer);
  }, [showEmailProgressPopup, popupCountdown]);

  // ==================== Check if email is in progress on email input blur ====================
  const checkEmailInProgress = async (email) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || ""}/api/auth/register/status/${encodeURIComponent(email)}`,
      );

      if (response.data.success && response.data.data) {
        // Email is in progress
        setInProgressEmail(email);
        setPopupExpiryTime(response.data.data.expiresIn);
        setPopupCountdown(response.data.data.expiresIn);
        setShowEmailProgressPopup(true);

        // Clear the email field
        setFormData((prev) => ({ ...prev, email: "" }));

        // Focus back on email field
        setTimeout(() => {
          const emailInput = document.querySelector('input[name="email"]');
          if (emailInput) emailInput.focus();
        }, 100);
      }
    } catch (error) {
      // 404 means no pending registration - that's fine
      if (error.response?.status !== 404) {
        console.error("Error checking email status:", error);
      }
    }
  };

  // Handle email blur
  const handleEmailBlur = (e) => {
    const email = e.target.value;
    checkEmailInProgress(email);
  };

  // ==================== Password security functions ====================
  useEffect(() => {
    const password = formData.password;

    if (!password) {
      setPasswordStrength({ text: "", color: "bg-gray-200", width: "0%" });
      setPasswordChecks((prev) => ({
        ...prev,
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      }));
      return;
    }

    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
    };

    setPasswordChecks((prev) => ({ ...prev, ...checks }));

    let strength = 0;
    if (checks.length) strength += 20;
    if (checks.uppercase) strength += 20;
    if (checks.lowercase) strength += 20;
    if (checks.number) strength += 20;
    if (checks.special) strength += 20;

    if (strength <= 20)
      setPasswordStrength({
        text: "Very Weak",
        color: "bg-red-500",
        width: "20%",
      });
    else if (strength <= 40)
      setPasswordStrength({
        text: "Weak",
        color: "bg-orange-500",
        width: "40%",
      });
    else if (strength <= 60)
      setPasswordStrength({
        text: "Fair",
        color: "bg-yellow-500",
        width: "60%",
      });
    else if (strength <= 80)
      setPasswordStrength({ text: "Good", color: "bg-blue-500", width: "80%" });
    else
      setPasswordStrength({
        text: "Strong",
        color: "bg-green-500",
        width: "100%",
      });
  }, [formData.password]);

  // Check password breach
  const checkPasswordBreach = async (password) => {
    if (!password || password.length < 8) return;

    setPasswordChecks((prev) => ({ ...prev, checkingBreach: true }));

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-1", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();

      const prefix = hashHex.substring(0, 5);
      const suffix = hashHex.substring(5);

      const response = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`,
      );
      const data_text = await response.text();
      const hashes = data_text.split("\n").map((line) => line.split(":")[0]);

      const isBreached = hashes.some((h) => h === suffix);

      setPasswordChecks((prev) => ({
        ...prev,
        breached: isBreached,
        checkingBreach: false,
      }));

      if (isBreached) {
        toast.error("This password has been exposed in a data breach", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Breach check failed:", error);
      setPasswordChecks((prev) => ({ ...prev, checkingBreach: false }));
    }
  };

  // Debounced breach check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        formData.password &&
        passwordChecks.length &&
        passwordChecks.uppercase &&
        passwordChecks.lowercase &&
        passwordChecks.number &&
        passwordChecks.special
      ) {
        checkPasswordBreach(formData.password);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    formData.password,
    passwordChecks.length,
    passwordChecks.uppercase,
    passwordChecks.lowercase,
    passwordChecks.number,
    passwordChecks.special,
  ]);

  // ==================== FIXED: Handle errors from Redux ====================
  useEffect(() => {
    if (error) {
      console.log("Error from Redux:", error);

      // Check if error is an object with message property
      if (typeof error === "object") {
        // Check if it's the "already in progress" error
        if (error.message?.includes("already in progress")) {
          const match = error.message.match(/expires in (\d+) seconds?/i);
          if (match && match[1]) {
            setInProgressEmail(formData.email);
            setPopupExpiryTime(parseInt(match[1]));
            setPopupCountdown(parseInt(match[1]));
            setShowEmailProgressPopup(true);
          } else {
            toast.error(error.message);
          }
        } else {
          toast.error(error.message || "An error occurred");
        }
      }
      // Check if error is a string
      else if (typeof error === "string") {
        if (error.includes("already in progress")) {
          const match = error.match(/expires in (\d+) seconds?/i);
          if (match && match[1]) {
            setInProgressEmail(formData.email);
            setPopupExpiryTime(parseInt(match[1]));
            setPopupCountdown(parseInt(match[1]));
            setShowEmailProgressPopup(true);
          } else {
            toast.error(error);
          }
        } else {
          toast.error(error);
        }
      }

      clearAuthError();
    }
  }, [error, clearAuthError, formData.email]);

  // Handle registration success - show OTP screen
  useEffect(() => {
    if (success && otpSent && registrationEmail) {
      toast.success("OTP sent to your email!");
      setShowOtpScreen(true);
      resetAuthSuccess();
    }
  }, [success, otpSent, registrationEmail, resetAuthSuccess]);

  // Handle OTP verification success
  useEffect(() => {
    if (success && !otpSent && !navigationPerformedRef.current) {
      navigationPerformedRef.current = true;
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/");
        // Reset navigation flag after navigation
        setTimeout(() => {
          navigationPerformedRef.current = false;
        }, 1000);
      }, 2000);
      resetAuthSuccess();
    }
  }, [success, otpSent, navigate, resetAuthSuccess]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Reset breach status when password changes
    if (name === "password") {
      setPasswordChecks((prev) => ({ ...prev, breached: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const allChecksPassed =
        passwordChecks.length &&
        passwordChecks.uppercase &&
        passwordChecks.lowercase &&
        passwordChecks.number &&
        passwordChecks.special;

      if (!allChecksPassed) {
        newErrors.password =
          "Password must contain: 8+ chars, uppercase, lowercase, number & special char";
      }

      if (passwordChecks.breached) {
        newErrors.password = "This password has been exposed in a data breach";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==================== FIXED: handleSubmit with proper error handling ====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (passwordChecks.breached) {
      toast.error(
        "This password has been exposed in a data breach. Please choose a different one.",
      );
      return;
    }

    try {
      await registerInitiate({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
    } catch (err) {
      // Handle the error directly here
      console.log("Registration error caught in component:", err);

      // Check if it's the "already in progress" error
      if (
        err?.message?.includes("already in progress") ||
        err?.data?.message?.includes("already in progress")
      ) {
        // Try to extract expiry time from error
        let expirySeconds = 60; // default
        const errorMessage = err?.message || err?.data?.message || "";
        const match = errorMessage.match(/expires in (\d+) seconds?/i);
        if (match && match[1]) {
          expirySeconds = parseInt(match[1]);
        }

        // Show the popup
        setInProgressEmail(formData.email);
        setPopupExpiryTime(expirySeconds);
        setPopupCountdown(expirySeconds);
        setShowEmailProgressPopup(true);
      } else {
        // For other errors, show toast
        toast.error(
          err?.message || err?.data?.message || "Registration failed",
        );
      }
    }
  };

  const handleGoogleSignUpSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      if (!idToken) {
        throw new Error("No ID token received from Google");
      }

      const result = await GoogleLogin(idToken);

      if (result.payload?.success) {
        toast.success("Google sign up successful!");
        navigate("/");
      } else {
        const errorMsg = result.payload?.error || "Google sign up failed";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Google Sign Up Error:", error);
      toast.error(error.message || "Google sign up failed. Please try again.");
    }
  };

  const getPasswordStrength = () => {
    return passwordStrength;
  };

  const passwordStrengthResult = getPasswordStrength();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Email In Progress Popup */}
      <EmailProgressPopup
        isOpen={showEmailProgressPopup}
        onClose={() => setShowEmailProgressPopup(false)}
        email={inProgressEmail}
        expiryTime={popupExpiryTime}
        countdown={popupCountdown}
      />

      {showOtpScreen && (
        <OtpVerification
          email={formData.email}
          onVerify={(otpValue) => registerVerify(formData.email, otpValue)}
          onResend={() => registerResendOTP(formData.email)}
          onBack={() => {
            setShowOtpScreen(false);
            clearOtpAuthState();
          }}
        />
      )}

      <div className="fixed inset-0 z-0">
        <img
          src="/signin.webp"
          alt="Geometric Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent lg:bg-gradient-to-r lg:from-slate-900/80 lg:via-slate-900/60 lg:to-transparent"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 min-h-screen relative">
          <div className="relative z-20 w-full p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Link to="/">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-slate-900 font-bold text-xl">L</span>
                  </div>
                  <span className="text-2xl font-bold capitalize">listify</span>
                </div>
              </Link>

              <Link to="/">
                <button className="flex items-center gap-1 ml-10 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                  <ArrowLeft size={20} />
                  <span className="font-medium">Back to Website</span>
                </button>
              </Link>
            </div>

            <div className="text-white max-w-xl">
              <p className="text-5xl font-bold leading-tight mb-3">
                Join Listify Today <br />
                Start Listing Instantly.
              </p>
              <p className="text-slate-300 text-md">
                Create your account to list products, offer services, and
                connect with buyers across categories like cars, electronics,
                and more.
              </p>
              <div className="flex items-center gap-1 mt-12">
                <div className="w-6 h-1 bg-white rounded-full"></div>
                <HiDotsHorizontal className="text-white/50 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-[90vw] lg:w-[80vh] mt-2 p-2 ml-20 rounded-md flex items-center justify-center bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl overflow-y-auto">
            <div className="w-full max-w-md">
              <div className="mb-4 px-6 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Join thousands of creators already using Listify.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                <SocialAuth
                  onSuccess={handleGoogleSignUpSuccess}
                  isSignUp={true}
                />

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative bg-white/95 px-4 rounded-lg">
                    <span className="text-sm text-gray-600">Or</span>
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:border-transparent bg-white/80 ${
                      errors.name
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#27bb97]"
                    }`}
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Input - with onBlur handler */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:border-transparent bg-white/80 ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#27bb97]"
                    }`}
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:border-transparent bg-white/80 pr-12 ${
                        errors.password
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#27bb97]"
                      }`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">
                          Password strength:
                        </span>
                        <span className="text-xs font-medium text-gray-700">
                          {passwordStrengthResult.text}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrengthResult.color} transition-all duration-300`}
                          style={{ width: passwordStrengthResult.width }}
                        ></div>
                      </div>

                      {/* Password requirements checklist */}
                      <div className="mt-2 grid grid-cols-2 gap-1">
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              passwordChecks.length
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">
                            8+ characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              passwordChecks.uppercase
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">
                            Uppercase
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              passwordChecks.lowercase
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">
                            Lowercase
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              passwordChecks.number
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">Number</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              passwordChecks.special
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">
                            Special character (!@#$%^&*)
                          </span>
                        </div>
                      </div>

                      {/* Breach warning */}
                      {passwordChecks.checkingBreach && (
                        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-500"></div>
                          Checking password security...
                        </div>
                      )}

                      {passwordChecks.breached && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                          ⚠️ This password has been exposed in a data breach
                        </div>
                      )}
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:border-transparent bg-white/80 pr-12 ${
                        errors.confirmPassword
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#27bb97]"
                      }`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (errors.agreeTerms) {
                          setErrors((prev) => ({ ...prev, agreeTerms: "" }));
                        }
                      }}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-sm text-red-600">{errors.agreeTerms}</p>
                  )}
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={loading || passwordChecks.checkingBreach}
                  className={`w-full ${
                    loading || passwordChecks.checkingBreach
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#27bb97] hover:bg-[#1fa987]"
                  } text-white py-3 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending OTP...
                    </>
                  ) : passwordChecks.checkingBreach ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Checking password...
                    </>
                  ) : (
                    "Continue with OTP"
                  )}
                </button>

                {/* Already have account */}
                <div className="text-center mt-6">
                  <span className="text-gray-600">
                    Already have an account?{" "}
                  </span>
                  <Link to="/signin">
                    <button className="text-gray-900 font-medium hover:underline cursor-pointer">
                      Log in here
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
