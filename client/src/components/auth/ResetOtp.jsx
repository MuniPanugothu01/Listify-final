import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ResetOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    verifyForgotPasswordOTPRequest,
    resendForgotPasswordOTPRequest,
    loading,
    error,
    success,
    clearAuthError,
    resetAuthSuccess,
    resetToken,
  } = useAuth();

  // Get email from location state
  const email = location.state?.email || "";
  
  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otpError, setOtpError] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const inputRefs = useRef([]);
  const verificationInProgress = useRef(false);
  const navigationInProgress = useRef(false);

  // Handle errors from Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearAuthError();
    }
  }, [error, clearAuthError]);

  // Handle success - only navigate when we have resetToken
  useEffect(() => {
    if (success && resetToken && !navigationInProgress.current) {
      console.log("Reset token received, navigating to reset-password:", resetToken);
      navigationInProgress.current = true;
      toast.success("OTP verified successfully!");
      resetAuthSuccess();
      
      navigate("/reset-password", {
        state: {
          email: email,
          resetToken: resetToken,
        },
        replace: true,
      });
    }
  }, [success, resetToken, email, navigate, resetAuthSuccess]);

  // Check if we have email
  useEffect(() => {
    if (!email) {
      toast.error("No email found. Please start the password reset process again.");
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

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
    setFocusedIndex(0);
    setIsBlocked(false);
    setLockCountdown(0);
    setAttempts(0);
    
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100);
    
    navigationInProgress.current = false;
    verificationInProgress.current = false;
  }, []);

  // Auto-focus effect
  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < 6 && !isBlocked) {
      setTimeout(() => {
        if (inputRefs.current[focusedIndex]) {
          inputRefs.current[focusedIndex].focus();
        }
      }, 10);
    }
  }, [focusedIndex, isBlocked]);

  // Lock countdown timer
  useEffect(() => {
    let timer;
    if (isBlocked && lockCountdown > 0) {
      timer = setTimeout(() => {
        setLockCountdown(lockCountdown - 1);
      }, 1000);
    } else if (lockCountdown === 0 && isBlocked) {
      setIsBlocked(false);
      setOtpError("");
      setAttempts(0);
    }
    return () => clearTimeout(timer);
  }, [isBlocked, lockCountdown]);

  // Check if OTP is blocked from error message
  useEffect(() => {
    if (otpError && otpError.includes("Too many failed attempts")) {
      setIsBlocked(true);
      const secondsMatch = otpError.match(/(\d+)\s*seconds?/);
      if (secondsMatch && secondsMatch[1]) {
        setLockCountdown(parseInt(secondsMatch[1]));
      } else {
        setLockCountdown(60);
      }
    }
  }, [otpError]);

  // Handle OTP Input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    
    if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError("");

      if (index < 5) {
        setFocusedIndex(index + 1);
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
      setFocusedIndex(targetIndex);
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
        setFocusedIndex(index);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        setFocusedIndex(index - 1);
      }
      return;
    }
    
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      setFocusedIndex(index - 1);
    }
    
    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      setFocusedIndex(index + 1);
    }

    if (e.key === "Tab") {
      if (!e.shiftKey && index < 5) {
        e.preventDefault();
        setFocusedIndex(index + 1);
      } else if (e.shiftKey && index > 0) {
        e.preventDefault();
        setFocusedIndex(index - 1);
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
      
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      const targetIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
      setFocusedIndex(targetIndex);
    }
  };

  const handleOtpFocus = (index, e) => {
    if (!isBlocked) {
      setFocusedIndex(index);
      e.target.select();
      
      setTimeout(() => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].focus();
        }
      }, 0);
    }
  };

  const handleOtpBlur = (e) => {
    e.preventDefault();
    if (!isBlocked) {
      setTimeout(() => {
        if (document.activeElement === document.body) {
          const firstEmptyIndex = otp.findIndex(digit => digit === "");
          const targetIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : 0;
          if (inputRefs.current[targetIndex]) {
            inputRefs.current[targetIndex].focus();
          }
        }
      }, 10);
    }
  };

  const clearOtpInputs = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setFocusedIndex(0);
  };

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
      setIsBlocked(false);
      setLockCountdown(0);
      setAttempts(0);
      toast.success("New OTP sent to your email");
    } catch (error) {
      console.error("Resend OTP error:", error);
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerifyOtp = async (otpValue = otp.join("")) => {
    if (!email) {
      toast.error("Email not found. Please go back and try again.");
      return;
    }

    if (otpValue.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    if (verificationInProgress.current) {
      console.log("Verification already in progress");
      return;
    }

    setOtpLoading(true);
    setOtpError("");
    verificationInProgress.current = true;

    try {
      console.log("Verifying OTP for email:", email);
      await verifyForgotPasswordOTPRequest(email, otpValue);
    } catch (err) {
      console.error("OTP verification error:", err);
      
      let errorMessage = "Invalid OTP. Please try again.";
      
      if (err && typeof err === 'object') {
        errorMessage = err.message || err.error || err.toString() || errorMessage;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setOtpError(errorMessage);
      toast.error(errorMessage);
      
      if (errorMessage.toLowerCase().includes("invalid") || 
          errorMessage.toLowerCase().includes("wrong")) {
        clearOtpInputs();
      }
      
      verificationInProgress.current = false;
    } finally {
      setOtpLoading(false);
    }
  };

  const handleBackToForgotPassword = () => {
    navigate("/forgot-password", { replace: true });
  };

  const handleBackToLogin = () => {
    navigate("/signin", { replace: true });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

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
          <div className="relative z-20 w-full p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-xl">L</span>
                </div>
                <span className="text-2xl font-bold capitalize">listify</span>
              </div>

              <Link to="/">
                <button className="flex items-center gap-1 ml-10 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                  <ArrowLeft size={20} />
                  <span className="font-medium">Back to Website</span>
                </button>
              </Link>
            </div>

            <div className="text-white max-w-xl mt-30">
              <p className="text-5xl font-bold leading-tight mb-3">
                Secure Your Account <br />
                Verify with OTP.
              </p>
              <p className="text-slate-300 text-md mb-30">
                We've sent a 6-digit verification code to your email to ensure
                the security of your account.
              </p>
              <div className="flex items-center gap-1 mt-12">
                <div className="w-6 h-1 bg-white rounded-full"></div>
                <HiDotsHorizontal className="text-white/50 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-8">
          <div className="w-[90vw] lg:w-[87vh] h-[85vh] lg:h-[120vh] rounded-md flex items-center justify-center bg-white/95 backdrop-blur-sm border border-white/20 p-8 shadow-2xl">
            <div className="w-full max-w-md text-center">
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

              {/* Error Message with Lock Info */}
              {otpError && (
                <div className={`mb-6 p-4 rounded-lg ${
                  isBlocked 
                    ? 'bg-orange-50 border border-orange-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm text-center ${
                    isBlocked ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {otpError}
                  </p>
                  {isBlocked && lockCountdown > 0 && (
                    <p className="text-sm text-center text-orange-600 mt-2 font-semibold">
                      ⏰ Try again in {lockCountdown} seconds
                    </p>
                  )}
                  {!isBlocked && otpError.toLowerCase().includes("invalid") && (
                    <button
                      onClick={clearOtpInputs}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                      disabled={otpLoading}
                    >
                      Clear & Try Again
                    </button>
                  )}
                </div>
              )}

              {/* OTP Input Boxes - FIXED with proper border colors */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isBlocked) {
                    if (otp.every(digit => digit !== "")) {
                      handleVerifyOtp(otp.join(""));
                    }
                  }
                }}
                className="mb-8"
              >
                <fieldset disabled={isBlocked || otpLoading || loading}>
                  <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, index) => {
                      // Determine border color based on state
                      let borderColor = 'border-gray-300';
                      let focusRingColor = 'focus:ring-[#27bb97] focus:border-[#27bb97]';
                      
                      if (isBlocked) {
                        borderColor = 'border-gray-300';
                        focusRingColor = 'focus:ring-gray-400 focus:border-gray-400';
                      } else if (otpError && !digit && !otpError.includes("Too many")) {
                        borderColor = 'border-red-300';
                        focusRingColor = 'focus:ring-red-500 focus:border-red-500';
                      } else if (digit) {
                        borderColor = 'border-[#27bb97] bg-[#27bb97]/5';
                        focusRingColor = 'focus:ring-[#27bb97] focus:border-[#27bb97]';
                      }
                      
                      return (
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
                          onChange={(e) => !isBlocked && handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => !isBlocked && handleKeyDown(index, e)}
                          onPaste={!isBlocked ? handlePaste : undefined}
                          onFocus={(e) => handleOtpFocus(index, e)}
                          onBlur={!isBlocked ? handleOtpBlur : undefined}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                          }}
                          className={`w-14 h-14 text-2xl text-center text-gray-900 font-bold bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${borderColor} ${focusRingColor} ${
                            isBlocked ? 'cursor-not-allowed opacity-60' : ''
                          }`}
                          autoComplete="one-time-code"
                          disabled={otpLoading || loading || isBlocked}
                        />
                      );
                    })}
                  </div>
                </fieldset>

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Enter the 6-digit verification code
                  </p>
                  {!isBlocked && otp.some(digit => digit !== "") && (
                    <button
                      type="button"
                      onClick={clearOtpInputs}
                      className="text-sm text-gray-500 hover:text-gray-700"
                      disabled={otpLoading || loading || isBlocked}
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={otp.some((digit) => digit === "") || otpLoading || loading || isBlocked}
                  className={`w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-6 shadow-md hover:shadow-lg ${
                    isBlocked 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#27bb97] hover:bg-[#1fa987] text-white'
                  }`}
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
                  ) : isBlocked ? (
                    `⏰ Locked for ${lockCountdown}s`
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
                  disabled={resendLoading || loading || countdown > 0 || isBlocked}
                  className={`font-medium ${
                    isBlocked
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#27bb97] hover:underline'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {resendLoading
                    ? "Sending..."
                    : countdown > 0
                      ? `Resend in ${countdown}s`
                      : isBlocked
                        ? `Locked for ${lockCountdown}s`
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