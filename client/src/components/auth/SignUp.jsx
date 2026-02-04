import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import SocialAuth from "./SocialAuth";

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
    setOtpSentState,
    clearOtpAuthState,
  } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle errors from Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearAuthError();
    }
  }, [error, clearAuthError]);

  // Handle registration success - show OTP screen
  useEffect(() => {
    if (success && otpSent && registrationEmail) {
      toast.success("OTP sent to your email!");
      setShowOtpScreen(true);
      setCountdown(60);
      resetAuthSuccess();
    }
  }, [success, otpSent, registrationEmail, resetAuthSuccess]);

  // Handle OTP verification success
  useEffect(() => {
    if (success && !otpSent) {
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      resetAuthSuccess();
    }
  }, [success, otpSent, navigate, resetAuthSuccess]);

  // Reset OTP when OTP screen opens/closes
  useEffect(() => {
    if (showOtpScreen) {
      setOtp(["", "", "", "", "", ""]);
      setOtpError("");
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    }
  }, [showOtpScreen]);

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
  };

  // OTP Handlers
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError("");

      if (index < 5) {
        setTimeout(() => {
          if (inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
          }
        }, 10);
      }
    } else if (value.length > 1) {
      const digits = value.slice(0, 6).split("");
      digits.forEach((digit, digitIndex) => {
        const pos = index + digitIndex;
        if (pos < 6) {
          newOtp[pos] = digit;
        }
      });
      setOtp(newOtp);
      setOtpError("");

      const nextEmptyIndex = newOtp.findIndex(
        (digit, i) => i >= index && digit === "",
      );
      const targetIndex =
        nextEmptyIndex !== -1
          ? nextEmptyIndex
          : Math.min(index + value.length, 5);

      setTimeout(() => {
        if (inputRefs.current[targetIndex]) {
          inputRefs.current[targetIndex].focus();
        }
      }, 10);
    } else if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
    }

    if (newOtp.every((digit) => digit !== "")) {
      setTimeout(() => {
        handleVerifyOtp(newOtp.join(""));
      }, 100);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (otp.every((digit) => digit !== "")) {
        handleVerifyOtp(otp.join(""));
      }
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();

      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);

        setTimeout(() => {
          if (inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
          }
        }, 10);
      }
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      setTimeout(() => {
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      }, 10);
    }

    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      setTimeout(() => {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        }
      }, 10);
    }

    if (e.key === "Tab") {
      if (!e.shiftKey && index < 5) {
        e.preventDefault();
        setTimeout(() => {
          if (inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
          }
        }, 10);
      } else if (e.shiftKey && index > 0) {
        e.preventDefault();
        setTimeout(() => {
          if (inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
          }
        }, 10);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((char, index) => {
        if (index < 6) {
          newOtp[index] = char;
        }
      });

      setOtp(newOtp);

      const nextIndex = Math.min(pastedData.length, 5);
      setTimeout(() => {
        if (inputRefs.current[nextIndex]) {
          inputRefs.current[nextIndex].focus();
        }
      }, 10);
    }
  };

  const handleOtpFocus = (index, e) => {
    e.target.select();

    setTimeout(() => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].focus();
      }
    }, 0);
  };

  const handleOtpBlur = (e) => {
    if (showOtpScreen) {
      e.preventDefault();
      setTimeout(() => {
        if (document.activeElement === document.body) {
          const firstEmptyIndex = otp.findIndex((digit) => digit === "");
          const targetIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : 0;
          if (inputRefs.current[targetIndex]) {
            inputRefs.current[targetIndex].focus();
          }
        }
      }, 10);
    }
  };

  // Clear all OTP inputs
  const clearOtpInputs = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 10);
  };

  // Resend OTP Handler
  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      await registerResendOTP(formData.email);
      setCountdown(60);
      clearOtpInputs();
      toast.success("New OTP sent to your email");
    } catch (error) {
      toast.error(error || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  // Verify OTP Handler
  const handleVerifyOtp = async (otpValue = otp.join("")) => {
    if (otpValue.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      await registerVerify(formData.email, otpValue);
    } catch (err) {
      const errorMessage = err || "Invalid OTP. Please try again.";
      setOtpError(errorMessage);
      toast.error(errorMessage);

      if (
        errorMessage.includes("Invalid OTP") ||
        errorMessage.includes("invalid") ||
        errorMessage.includes("wrong")
      ) {
        clearOtpInputs();
      }
    } finally {
      setOtpLoading(false);
    }
  };

  // Validate form
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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

  // Handle form submission (initiate registration)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
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
      // Error is handled in useEffect
    }
  };

  // Handle Google Sign Up Success
  const handleGoogleSignUpSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      if (!idToken) {
        throw new Error("No ID token received from Google");
      }

      console.log("🔑 Google ID Token received for sign up");

      // Call Google Login API - the backend should handle registration if user doesn't exist
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

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { text: "", color: "gray", width: "0%" };

    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const strengths = [
      { text: "Very Weak", color: "bg-red-500", width: "25%" },
      { text: "Weak", color: "bg-orange-500", width: "50%" },
      { text: "Fair", color: "bg-yellow-500", width: "75%" },
      { text: "Strong", color: "bg-green-500", width: "100%" },
    ];

    return (
      strengths[strength] || { text: "", color: "bg-gray-300", width: "0%" }
    );
  };

  const passwordStrength = getPasswordStrength();

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Close OTP screen and reset form
  const handleBackToRegistration = () => {
    clearOtpInputs();
    setOtpError("");
    setShowOtpScreen(false);
    clearOtpAuthState();
  };

  // OTP Screen Component
  const OtpScreen = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleBackToRegistration();
        }
      }}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h2>
          <p className="text-gray-600">
            Enter the 6-digit code sent to <br />
            <span className="font-semibold text-gray-800">
              {formData.email}
            </span>
          </p>
        </div>

        {otpError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{otpError}</p>
            {otpError.includes("Invalid") ||
            otpError.includes("invalid") ||
            otpError.includes("wrong") ? (
              <button
                onClick={clearOtpInputs}
                className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Clear & Try Again
              </button>
            ) : null}
          </div>
        )}

        {/* OTP Input Boxes */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (otp.every((digit) => digit !== "")) {
              handleVerifyOtp(otp.join(""));
            }
          }}
          className="mb-8"
        >
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={(e) => handleOtpFocus(index, e)}
                onBlur={handleOtpBlur}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                className="w-14 h-14 text-2xl text-center text-gray-900 font-bold bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27bb97] focus:border-[#27bb97] transition-all duration-200"
                autoComplete="one-time-code"
                disabled={otpLoading}
              />
            ))}
          </div>
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">
            Enter the 6-digit verification code
          </p>
          {otp.some((digit) => digit !== "") && (
            <button
              onClick={clearOtpInputs}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
              disabled={otpLoading}
            >
              Clear all
            </button>
          )}
        </div>

        <button
          onClick={() => {
            if (otp.every((digit) => digit !== "")) {
              handleVerifyOtp(otp.join(""));
            } else {
              setOtpError("Please enter all 6 digits");
            }
          }}
          disabled={otp.some((digit) => digit === "") || otpLoading}
          className="w-full bg-[#27bb97] hover:bg-[#1fa987] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-6 shadow-md hover:shadow-lg"
        >
          {otpLoading ? (
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
              Verifying...
            </>
          ) : (
            "Verify & Create Account"
          )}
        </button>

        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{" "}
            <button
              onClick={handleResendOtp}
              disabled={resendLoading || countdown > 0}
              className="text-[#27bb97] hover:underline disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {resendLoading
                ? "Sending..."
                : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend OTP"}
            </button>
          </p>
        </div>

        <button
          onClick={handleBackToRegistration}
          className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center"
        >
          ← Back to registration
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* OTP Screen */}
      {showOtpScreen && <OtpScreen />}

      {/* Full Screen Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img
          src="/signin.webp"
          alt="Geometric Background"
          className="w-full h-full object-cover"
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent lg:bg-gradient-to-r lg:from-slate-900/80 lg:via-slate-900/60 lg:to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Text Content Over Background */}
        <div className="hidden lg:flex lg:w-1/2 min-h-screen relative">
          {/* Content Container */}
          <div className="relative z-20 w-full p-10 flex flex-col justify-between">
            {/* Top Bar - Logo and Back Button */}
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-slate-900 font-bold text-xl">L</span>
                  </div>
                  <span className="text-2xl font-bold capitalize">listify</span>
                </div>
              </Link>

              {/* Back to Website */}
              <Link to="/">
                <button className="flex items-center gap-1 ml-10 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                  <ArrowLeft size={20} />
                  <span className="font-medium">Back to Website</span>
                </button>
              </Link>
            </div>

            {/* Main Text Content - Centered */}
            <div className="text-white max-w-xl ">
              <p className="text-5xl font-bold leading-tight mb-3">
                Join Listify Today <br />
                Start Listing Instantly.
              </p>
              <p className="text-slate-300 text-md ">
                Create your account to list products, offer services, and
                connect with buyers across categories like cars, electronics,
                and more.
              </p>
              {/* Carousel Dots */}
              <div className="flex items-center gap-1 mt-12">
                <div className="w-6 h-1 bg-white rounded-full"></div>
                <HiDotsHorizontal className="text-white/50 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form Container */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          {/* Register Form Card */}
          <div className="w-[90vw] lg:w-[80vh] mt-2 p-2 ml-20 rounded-md flex items-center justify-center bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl overflow-y-auto">
            <div className="w-full max-w-md">
              {/* Welcome Text */}
              <div className="mb-4 px-6  text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Join thousands of creators already using Listify.
                </p>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                {/* Google Sign Up - Pass custom success handler */}
                <SocialAuth
                  onSuccess={handleGoogleSignUpSuccess}
                  isSignUp={true}
                />

                {/* Divider */}
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

                {/* Email Input */}
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

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">
                          Password strength:
                        </span>
                        <span className="text-xs font-medium text-gray-700">
                          {passwordStrength.text}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: passwordStrength.width }}
                        ></div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-1">
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              formData.password.length >= 6
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">
                            6+ characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              /[A-Z]/.test(formData.password)
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">
                            Uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              /[0-9]/.test(formData.password)
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">Number</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              /[^A-Za-z0-9]/.test(formData.password)
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">
                            Special character
                          </span>
                        </div>
                      </div>
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
                  disabled={loading}
                  className={`w-full ${
                    loading
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
