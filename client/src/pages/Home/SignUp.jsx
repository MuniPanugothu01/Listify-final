import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset OTP when OTP screen opens/closes
  useEffect(() => {
    if (showOtpScreen) {
      // Reset OTP to empty when OTP screen opens
      setOtp(["", "", "", "", "", ""]);
      setOtpError("");
      // Focus first input after a small delay
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

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // FIXED: Improved OTP Handlers with better focus management
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    
    // Handle single digit input
    if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError("");

      // Auto-focus next input if value is entered and not the last box
      if (index < 5) {
        setTimeout(() => {
          if (inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
          }
        }, 10);
      }
    } 
    // Handle multiple digits (pasting or fast typing)
    else if (value.length > 1) {
      const digits = value.slice(0, 6).split("");
      digits.forEach((digit, digitIndex) => {
        const pos = index + digitIndex;
        if (pos < 6) {
          newOtp[pos] = digit;
        }
      });
      setOtp(newOtp);
      setOtpError("");

      // Focus the next empty box or the last filled box
      const nextEmptyIndex = newOtp.findIndex((digit, i) => i >= index && digit === "");
      const targetIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(index + value.length, 5);
      
      setTimeout(() => {
        if (inputRefs.current[targetIndex]) {
          inputRefs.current[targetIndex].focus();
        }
      }, 10);
    }
    
    // Handle deletion (empty value)
    else if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      // Don't auto-focus previous box on deletion, let user decide
    }

    // Auto-submit when all digits are entered
    if (newOtp.every((digit) => digit !== "")) {
      setTimeout(() => {
        handleVerifyOtp(newOtp.join(""));
      }, 100);
    }
  };

  const handleKeyDown = (index, e) => {
    // Prevent form submission on Enter key
    if (e.key === "Enter") {
      e.preventDefault();
      // If all digits are filled, verify OTP
      if (otp.every(digit => digit !== "")) {
        handleVerifyOtp(otp.join(""));
      }
      return;
    }

    // Handle backspace - IMPROVED VERSION
    if (e.key === "Backspace") {
      e.preventDefault();
      
      const newOtp = [...otp];
      
      if (newOtp[index]) {
        // If current box has value, clear it and stay in same box
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If current box is empty, move to previous box and clear it
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
    
    // Handle arrow keys
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

    // Handle Tab key
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
      
      // Focus the last filled box
      const nextIndex = Math.min(pastedData.length, 5);
      setTimeout(() => {
        if (inputRefs.current[nextIndex]) {
          inputRefs.current[nextIndex].focus();
        }
      }, 10);
    }
  };

  // FIXED: Focus management for OTP inputs
  const handleOtpFocus = (index, e) => {
    // Select all text when focusing
    e.target.select();
    
    // Ensure proper focus state
    setTimeout(() => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].focus();
      }
    }, 0);
  };

  // FIXED: Prevent focus loss issues
  const handleOtpBlur = (e) => {
    // Only prevent blur if we're in OTP screen
    if (showOtpScreen) {
      e.preventDefault();
      // Small delay to ensure focus isn't lost during navigation
      setTimeout(() => {
        if (document.activeElement === document.body) {
          // If focus went to body, try to focus the first OTP input
          const firstEmptyIndex = otp.findIndex(digit => digit === "");
          const targetIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : 0;
          if (inputRefs.current[targetIndex]) {
            inputRefs.current[targetIndex].focus();
          }
        }
      }, 10);
    }
  };

  // NEW FUNCTION: Clear all OTP inputs
  const clearOtpInputs = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    // Focus first input after clearing
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
      // API call to resend OTP
      await axios.post("http://localhost:5000/api/auth/register/resend-otp", {
        email: formData.email,
      });

      setCountdown(60);
      // Clear OTP inputs when resending
      clearOtpInputs();
      
      toast.success("New OTP sent to your email");
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  // Verify OTP Handler - UPDATED to clear on error
  const handleVerifyOtp = async (otpValue = otp.join("")) => {
    if (otpValue.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      // API call to verify OTP and complete registration
      const response = await axios.post(
        "http://localhost:5000/api/auth/register/verify",
        {
          email: formData.email,
          otp: otpValue,
        },
      );

      if (response.data.success) {
        toast.success("Account created successfully!");

        // Store token in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
      setOtpError(errorMessage);
      toast.error(errorMessage);
      
      // NEW: Clear OTP inputs when wrong OTP is entered
      if (errorMessage.includes("Invalid OTP") || errorMessage.includes("invalid") || errorMessage.includes("wrong")) {
        // Clear OTP inputs
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

    setLoading(true);

    try {
      // API call to initiate registration (send OTP)
      const response = await axios.post(
        "http://localhost:5000/api/auth/register/initiate",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
      );

      if (response.data.success) {
        toast.success("OTP sent to your email!");
        
        // Reset OTP state for new registration
        setOtp(["", "", "", "", "", ""]);
        setOtpError("");
        setCountdown(60);
        
        // Show OTP screen after a short delay
        setTimeout(() => {
          setShowOtpScreen(true);
        }, 300);
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.data?.message === "User already exists") {
        toast.error("An account with this email already exists");
        setErrors((prev) => ({ ...prev, email: "Email already registered" }));
      } else {
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
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

  // Close OTP screen and reset form - UPDATED to clear OTP
  const handleBackToRegistration = () => {
    // Clear OTP inputs before closing
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setShowOtpScreen(false);
  };

  // OTP Screen Component - UPDATED with clear functionality
  const OtpScreen = () => (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        // Close modal if clicking on backdrop
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
            {/* Show clear button when there's an error */}
            {otpError.includes("Invalid") || otpError.includes("invalid") || otpError.includes("wrong") ? (
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
            if (otp.every(digit => digit !== "")) {
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
                maxLength={6} // Allow pasting multiple digits
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={(e) => handleOtpFocus(index, e)}
                onBlur={handleOtpBlur}
                onInput={(e) => {
                  // Prevent non-numeric input
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
                className="w-14 h-14 text-2xl text-center text-gray-900 font-bold bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27bb97] focus:border-[#27bb97] transition-all duration-200"
                autoComplete="one-time-code"
              />
            ))}
          </div>
          <button type="submit" className="hidden">Submit</button>
        </form>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">
            Enter the 6-digit verification code
          </p>
          {/* Quick Clear Button */}
          {otp.some(digit => digit !== "") && (
            <button
              onClick={clearOtpInputs}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          )}
        </div>

        <button
          onClick={() => {
            if (otp.every(digit => digit !== "")) {
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
          <div className="relative z-20 w-full p-12 flex flex-col justify-between">
            {/* Top Bar - Logo and Back Button */}
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-xl">L</span>
                </div>
                <span className="text-2xl font-bold capitalize">listify</span>
              </div>

              {/* Back to Website */}
              <Link to="/">
                <button className="flex items-center gap-1 ml-10 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                  <ArrowLeft size={20} />
                  <span className="font-medium">Back to Website</span>
                </button>
              </Link>
            </div>

            {/* Main Text Content - Centered */}
            <div className="text-white max-w-xl mt-30">
              <p className="text-5xl font-bold leading-tight mb-3">
                Join the Creative Revolution <br />
                Start Creating Today.
              </p>
              <p className="text-slate-300 text-md mb-30">
                Unlock powerful video editing tools and collaborate with
                creators worldwide. Your journey to amazing content starts here.
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
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen">
          {/* Register Form Card */}
          <div className="w-[90vw] lg:w-[87vh] h-[85vh] lg:h-[120vh] mt-2 ml-20 rounded-md flex items-center justify-center bg-white/95 backdrop-blur-sm border border-white/20 p-8 shadow-2xl overflow-y-auto">
            <div className="w-full max-w-md">
              {/* Welcome Text */}
              <div className="mb-4">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Join thousands of creators already using Listify.
                </p>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                {/* Google Sign Up */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.8055 10.2292C19.8055 9.54935 19.7491 8.89587 19.6436 8.26898H10.2002V12.0145H15.6019C15.3728 13.2291 14.6856 14.2655 13.6565 14.9672V17.3564H16.8692C18.7437 15.6328 19.8055 13.1582 19.8055 10.2292Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M10.2002 19.6727C12.7584 19.6727 14.9056 18.8509 16.8692 17.3564/L13.6565 14.9672C12.7856 15.5527 11.6438 15.8982 10.2002 15.8982C7.73287 15.8982 5.6438 14.1582 4.87106 11.8437H1.5647V14.3073C3.51925 18.1909 6.60925 19.6727 10.2002 19.6727Z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.87106 11.8437C4.67106 11.2582 4.5647 10.6364 4.5647 10.0001C4.5647 9.36375 4.67106 8.74193 4.87106 8.15648V5.69284H1.5647C0.91925 6.98011 0.563721 8.44375 0.563721 10.0001C0.563721 11.5564 0.91925 13.0201 1.5647 14.3073L4.87106 11.8437Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10.2002 4.10182C11.7783 4.10182 13.1801 4.64546 14.2856 5.69091L17.1474 2.82909C14.9056 0.727271 12.7584 -0.327271 10.2002 -0.327271C6.60925 -0.327271 3.51925 1.15455 1.5647 5.03818L4.87106 7.50182C5.6438 5.18727 7.73287 4.10182 10.2002 4.10182Z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-6">
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
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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