import React, { useState, useRef, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const OTP_LENGTH = 6;
const MAX_ATTEMPTS = 3;
const LOCK_DURATION = 60;

export default function OtpVerification({ email, onVerify, onResend, onBack }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(0);
  const [showRedBorder, setShowRedBorder] = useState(false);

  const inputRefs = useRef([]);
  const autoClearTimerRef = useRef(null);

  // ==================== Inject OTP blink animation ====================
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes otpBlink {
        0%, 100% { border-color: transparent; }
        50% { border-color: #27bb97; }
      }
      .otp-blink {
        animation: otpBlink 1s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ==================== Focus first input on mount ====================
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // ==================== Auto-focus management ====================
  useEffect(() => {
    if (!isBlocked && focusedIndex >= 0 && focusedIndex < OTP_LENGTH) {
      const rafId = requestAnimationFrame(() => {
        const input = inputRefs.current[focusedIndex];
        if (input) {
          input.focus();
          input.select();
        }
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [focusedIndex, isBlocked]);

  // ==================== Resend countdown ====================
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // ==================== Lock countdown ====================
  useEffect(() => {
    if (!isBlocked) return;

    if (lockCountdown <= 0) {
      setIsBlocked(false);
      setShowRedBorder(false);
      setFailedAttempts(0);
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 50);
      return;
    }

    const timer = setTimeout(() => setLockCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [isBlocked, lockCountdown]);

  // ==================== Cleanup on unmount ====================
  useEffect(() => {
    return () => {
      if (autoClearTimerRef.current) clearTimeout(autoClearTimerRef.current);
    };
  }, []);

  // ==================== Clear all OTP inputs ====================
  const clearOtpInputs = useCallback(() => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setShowRedBorder(false);
    setFocusedIndex(0);

    if (autoClearTimerRef.current) {
      clearTimeout(autoClearTimerRef.current);
      autoClearTimerRef.current = null;
    }

    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 50);
  }, []);

  // ==================== Verify OTP ====================
  const handleVerify = async (otpValue) => {
    if (otpValue.length !== OTP_LENGTH) return;

    setIsVerifying(true);
    try {
      await onVerify(otpValue);
      setFailedAttempts(0);
    } catch (err) {
      console.error("OTP verification error:", err);

      const newFailed = failedAttempts + 1;
      setFailedAttempts(newFailed);

      toast.error("Invalid OTP. Please try again.");
      setShowRedBorder(true);

      if (newFailed >= MAX_ATTEMPTS) {
        setIsBlocked(true);
        setLockCountdown(LOCK_DURATION);
      }

      autoClearTimerRef.current = setTimeout(() => {
        clearOtpInputs();
        autoClearTimerRef.current = null;
      }, 2500);
    } finally {
      setIsVerifying(false);
    }
  };

  // ==================== Handle digit input ====================
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value) || isBlocked) return;

    setShowRedBorder(false);
    if (autoClearTimerRef.current) {
      clearTimeout(autoClearTimerRef.current);
      autoClearTimerRef.current = null;
    }

    const newOtp = [...otp];

    if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-advance to next input
      if (index < OTP_LENGTH - 1) {
        setFocusedIndex(index + 1);
      }
    } else if (value.length > 1) {
      // Handle multi-digit input (autofill, etc.)
      const digits = value
        .replace(/\D/g, "")
        .slice(0, OTP_LENGTH)
        .split("");
      digits.forEach((digit, i) => {
        if (index + i < OTP_LENGTH) newOtp[index + i] = digit;
      });
      setOtp(newOtp);

      const nextEmpty = newOtp.findIndex((d, i) => i >= index && d === "");
      setFocusedIndex(
        nextEmpty !== -1 ? nextEmpty : Math.min(index + digits.length, OTP_LENGTH - 1),
      );
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
    }

    // Auto-submit when all filled
    if (newOtp.every((d) => d !== "")) {
      setTimeout(() => handleVerify(newOtp.join("")), 100);
    }
  };

  // ==================== Keyboard navigation ====================
  const handleKeyDown = (index, e) => {
    if (isBlocked) return;

    if (e.key === "Enter") {
      e.preventDefault();
      if (otp.every((d) => d !== "")) handleVerify(otp.join(""));
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        // Clear current field
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move back and clear previous field
        newOtp[index - 1] = "";
        setOtp(newOtp);
        setFocusedIndex(index - 1);
      }
      return;
    }

    if (e.key === "Delete") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      setFocusedIndex(index - 1);
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      setFocusedIndex(index + 1);
    }

    if (e.key === "Tab") {
      if (!e.shiftKey && index < OTP_LENGTH - 1) {
        e.preventDefault();
        setFocusedIndex(index + 1);
      } else if (e.shiftKey && index > 0) {
        e.preventDefault();
        setFocusedIndex(index - 1);
      }
    }

    if (e.key === " ") {
      e.preventDefault();
    }

    // If user types a digit while current box already has a value, replace and advance
    if (/^\d$/.test(e.key) && otp[index]) {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = e.key;
      setOtp(newOtp);

      if (index < OTP_LENGTH - 1) {
        setFocusedIndex(index + 1);
      }

      if (newOtp.every((d) => d !== "")) {
        setTimeout(() => handleVerify(newOtp.join("")), 100);
      }
    }
  };

  // ==================== Paste handler ====================
  const handlePaste = (e) => {
    e.preventDefault();
    if (isBlocked) return;

    setShowRedBorder(false);
    if (autoClearTimerRef.current) {
      clearTimeout(autoClearTimerRef.current);
      autoClearTimerRef.current = null;
    }

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pastedData) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < OTP_LENGTH) newOtp[i] = char;
    });
    setOtp(newOtp);

    const nextEmpty = newOtp.findIndex((d) => d === "");
    setFocusedIndex(nextEmpty !== -1 ? nextEmpty : OTP_LENGTH - 1);

    if (newOtp.every((d) => d !== "")) {
      setTimeout(() => handleVerify(newOtp.join("")), 100);
    }
  };

  // ==================== Resend OTP ====================
  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResend();
      setCountdown(60);
      clearOtpInputs();
      setIsBlocked(false);
      setLockCountdown(0);
      setFailedAttempts(0);
      toast.success("New OTP sent to your email");
    } catch (err) {
      console.error("Resend OTP error:", err);
    } finally {
      setIsResending(false);
    }
  };

  // ==================== Back handler ====================
  const handleBack = () => {
    if (autoClearTimerRef.current) {
      clearTimeout(autoClearTimerRef.current);
      autoClearTimerRef.current = null;
    }
    onBack();
  };

  const remainingAttempts = Math.max(0, MAX_ATTEMPTS - failedAttempts);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleBack()}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h2>
          <p className="text-gray-600">
            Enter the 6-digit code sent to <br />
            <span className="font-semibold text-gray-800">{email}</span>
          </p>
        </div>

        {/* Blocked warning */}
        {isBlocked ? (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold text-red-800">
                  Account Temporarily Locked
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Too many invalid attempts. Please try again in{" "}
                  <span className="font-bold">{lockCountdown}</span> seconds.
                </p>
                <div className="mt-2 w-full bg-red-200 rounded-full h-1.5">
                  <div
                    className="bg-red-600 h-1.5 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(lockCountdown / LOCK_DURATION) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-4 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {failedAttempts > 0 ? (
                <span className="text-amber-600 font-medium">
                  {remainingAttempts}{" "}
                  {remainingAttempts === 1 ? "attempt" : "attempts"} remaining
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
            <div className="flex gap-1">
              {Array.from({ length: MAX_ATTEMPTS }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < failedAttempts ? "bg-red-400" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* OTP Input Fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isBlocked && otp.every((d) => d !== "")) {
              handleVerify(otp.join(""));
            }
          }}
          className="mb-8"
        >
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => {
              let borderColor = "border-gray-300";
              let focusRingColor =
                "focus:ring-[#27bb97] focus:border-[#27bb97]";
              let bgColor = "bg-gray-50";

              if (isBlocked) {
                borderColor = "border-gray-300";
                focusRingColor = "focus:ring-gray-400 focus:border-gray-400";
                bgColor = "bg-gray-100";
              } else if (showRedBorder && !digit) {
                borderColor = "border-red-300";
                focusRingColor = "focus:ring-red-500 focus:border-red-500";
                bgColor = "bg-red-50";
              } else if (digit) {
                borderColor = "border-[#27bb97]";
                bgColor = "bg-[#27bb97]/5";
                focusRingColor =
                  "focus:ring-[#27bb97] focus:border-[#27bb97]";
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
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  onFocus={() => !isBlocked && setFocusedIndex(index)}
                  className={`w-14 h-14 text-2xl text-center text-gray-900 font-bold ${bgColor} border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${borderColor} ${focusRingColor} ${
                    isBlocked ? "cursor-not-allowed opacity-60" : ""
                  } ${!isBlocked && !digit && focusedIndex === index ? "otp-blink" : ""}`}
                  autoComplete="one-time-code"
                  disabled={isVerifying || isBlocked}
                  style={{ caretColor: isBlocked ? "transparent" : "auto" }}
                />
              );
            })}
          </div>
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>

        {/* Helper text */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">
            Enter the 6-digit verification code
          </p>
          {!isBlocked && otp.some((d) => d !== "") && (
            <button
              onClick={clearOtpInputs}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline"
              disabled={isVerifying || isBlocked}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={() => {
            if (!isBlocked && otp.every((d) => d !== "")) {
              handleVerify(otp.join(""));
            }
          }}
          disabled={otp.some((d) => d === "") || isVerifying || isBlocked}
          className={`w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-6 shadow-md hover:shadow-lg ${
            isBlocked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#27bb97] hover:bg-[#1fa987] text-white"
          }`}
        >
          {isVerifying ? (
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
            "Verify & Create Account"
          )}
        </button>

        {/* Resend */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={isResending || countdown > 0 || isBlocked || isVerifying}
              className={`font-medium ${
                isBlocked
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#27bb97] hover:underline"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isResending
                ? "Sending..."
                : countdown > 0
                  ? `Resend in ${countdown}s`
                  : isBlocked
                    ? `Locked for ${lockCountdown}s`
                    : "Resend OTP"}
            </button>
          </p>
        </div>

        {/* Back button */}
        <button
          onClick={handleBack}
          className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center"
          disabled={isVerifying}
        >
          ← Back to registration
        </button>
      </div>
    </div>
  );
}
