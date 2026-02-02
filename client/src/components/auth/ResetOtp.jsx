import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const ResetOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    verifyForgotPasswordOTPRequest,
    resendForgotPasswordOTPRequest,
    setResetTokenAction,
    loading,
    error,
    success,
    clearAuthError,
    resetAuthSuccess,
    resetToken, // Get resetToken from Redux state
  } = useAuth();

  // Get email from location state
  const email = location.state?.email || "";
  
  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef([]);

  // Handle errors and success messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearAuthError();
    }
    
    if (success) {
      toast.success("OTP verified successfully!");
      resetAuthSuccess();
      // Don't navigate here, navigation will happen after API response
    }
  }, [error, success, clearAuthError, resetAuthSuccess]);

  // Check if we have resetToken in Redux and navigate to reset password
  useEffect(() => {
    if (resetToken && success) {
      console.log("Reset token found, navigating to reset-password:", resetToken);
      navigate("/reset-password", {
        state: {
          email: email,
          resetToken: resetToken,
        },
      });
    }
  }, [resetToken, success, navigate, email]);

  // Initialize countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Reset OTP when component mounts
  useEffect(() => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100);
  }, []);

  // Handle OTP Input
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

      const nextEmptyIndex = newOtp.findIndex((digit, i) => i >= index && digit === "");
      const targetIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(index + value.length, 5);
      
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
      if (otp.every(digit => digit !== "")) {
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
    e.preventDefault();
    setTimeout(() => {
      if (document.activeElement === document.body) {
        const firstEmptyIndex = otp.findIndex(digit => digit === "");
        const targetIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : 0;
        if (inputRefs.current[targetIndex]) {
          inputRefs.current[targetIndex].focus();
        }
      }
    }, 10);
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
    if (!email) {
      toast.error("Email not found. Please go back and try again.");
      return;
    }

    setResendLoading(true);
    try {
      await resendForgotPasswordOTPRequest(email);
      setCountdown(60);
      clearOtpInputs();
      toast.success("New OTP sent to your email");
    } catch (error) {
      console.log("Resend OTP error:", error);
      // Error is already handled in useEffect
    } finally {
      setResendLoading(false);
    }
  };

  // Verify OTP Handler
  const handleVerifyOtp = async (otpValue = otp.join("")) => {
    if (!email) {
      toast.error("Email not found. Please go back and try again.");
      return;
    }

    if (otpValue.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      console.log("Verifying OTP for email:", email);
      const result = await verifyForgotPasswordOTPRequest(email, otpValue);
      console.log("OTP verification result:", result);
      
      // The navigation will happen in the useEffect when resetToken is set
    } catch (err) {
      const errorMessage = err || "Invalid OTP. Please try again.";
      setOtpError(errorMessage);
      toast.error(errorMessage);
      
      if (errorMessage.includes("Invalid OTP") || errorMessage.includes("invalid") || errorMessage.includes("wrong")) {
        clearOtpInputs();
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleBackToForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleBackToLogin = () => {
    navigate("/signin");
  };

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
                Secure Your Account <br />
                Verify with OTP.
              </p>
              <p className="text-slate-300 text-md mb-30">
                We've sent a 6-digit verification code to your email to ensure
                the security of your account.
              </p>
              {/* Carousel Dots */}
              <div className="flex items-center gap-1 mt-12">
                <div className="w-6 h-1 bg-white rounded-full"></div>
                <HiDotsHorizontal className="text-white/50 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - OTP Form Container */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-8">
          {/* OTP Form Card */}
          <div className="w-[90vw] lg:w-[87vh] h-[85vh] lg:h-[120vh] rounded-md flex items-center justify-center bg-white/95 backdrop-blur-sm border border-white/20 p-8 shadow-2xl">
            <div className="w-full max-w-md text-center">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#27bb97] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">L</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 capitalize">
                    listify
                  </span>
                </div>
              </div>

              {/* Title and Description */}
              <div className="mb-8">
                <h1 className="text-gray-900 text-3xl my-4 font-semibold tracking-wide">
                  VERIFY OTP
                </h1>
                <p className="text-gray-600 text-sm mb-2">
                  Enter the 6-digit code sent to
                </p>
                <p className="text-gray-900 font-medium mb-6">
                  {email || "your email"}
                </p>
              </div>

              {/* Error Message */}
              {otpError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{otpError}</p>
                  {otpError.includes("Invalid") || otpError.includes("invalid") || otpError.includes("wrong") ? (
                    <button
                      onClick={clearOtpInputs}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                      disabled={otpLoading}
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
                <div className="flex justify-center gap-3 mb-6">
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
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }}
                      className="w-14 h-14 text-2xl text-center text-gray-900 font-bold bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27bb97] focus:border-[#27bb97] transition-all duration-200"
                      autoComplete="one-time-code"
                      disabled={otpLoading || loading}
                    />
                  ))}
                </div>

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Enter the 6-digit verification code
                  </p>
                  {otp.some(digit => digit !== "") && (
                    <button
                      type="button"
                      onClick={clearOtpInputs}
                      className="text-sm text-gray-500 hover:text-gray-700"
                      disabled={otpLoading || loading}
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={otp.some((digit) => digit === "") || otpLoading || loading}
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
                    "Verify OTP"
                  )}
                </button>
              </form>

              {/* Resend OTP Section */}
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm mb-2">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendLoading || loading || countdown > 0}
                  className="text-[#27bb97] hover:underline disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {resendLoading
                    ? "Sending..."
                    : countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend OTP"}
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleBackToForgotPassword}
                  className="flex-1 bg-gray-100/80 backdrop-blur-md text-gray-800 font-semibold p-3 rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-300"
                  disabled={otpLoading || loading || resendLoading}
                >
                  Back
                </button>
                <button
                  onClick={handleBackToLogin}
                  className="flex-1 bg-[#27bb97]/80 backdrop-blur-md text-white font-semibold p-3 rounded-xl hover:bg-[#1fa987] transition-all duration-300"
                  disabled={otpLoading || loading || resendLoading}
                >
                  Back to Login
                </button>
              </div>

              {/* Terms */}
              <p className="mt-8 text-xs text-center text-gray-500">
                By continuing, you agree to our{" "}
                <span className="text-[#27bb97] cursor-pointer hover:underline">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-[#27bb97] cursor-pointer hover:underline">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetOtp;