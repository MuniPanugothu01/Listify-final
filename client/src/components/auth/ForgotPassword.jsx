import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { 
    forgotPasswordRequest, 
    loading, 
    error, 
    success, 
    clearAuthError,
    resetAuthSuccess 
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle errors and success messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearAuthError();
    }
    
    if (success) {
      toast.success("OTP sent to your email!");
      resetAuthSuccess();
      // Navigate to ResetOtp page with email
      navigate("/reset-otp", {
        state: {
          email: formData.email,
        },
      });
    }
  }, [error, success, formData.email, navigate, clearAuthError, resetAuthSuccess]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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

    try {
      await forgotPasswordRequest(formData.email);
      // Navigation is handled in useEffect when success state changes
    } catch (error) {
      console.log("Forgot password error:", error);
      // Error is already handled in useEffect
    }
  };

  const handleBackToLogin = () => {
    navigate("/reset-otp");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

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
                Edit Smarter. Export Faster. <br />
                Create Anywhere.
              </p>
              <p className="text-slate-300 text-md mb-30">
                From quick social media clips to full-length videos, our
                powerful editor lets you work seamlessly across devices.
              </p>
              <div className="flex items-center gap-1 mt-12">
                <div className="w-6 h-1 bg-white rounded-full"></div>
                <HiDotsHorizontal className="text-white/50 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-8">
          <div className="w-[90vw] lg:w-[87vh] h-[85vh] lg:h-[89vh] rounded-md flex items-center justify-center bg-white/95 backdrop-blur-sm border border-white/20 p-8 shadow-2xl">
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
                  FORGOT PASSWORD
                </h1>
                <p className="text-gray-600 text-sm mb-6">
                  Enter your email to receive a reset OTP
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent bg-white/80 ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#27bb97]"
                    }`}
                    required
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 text-left">
                      {errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#27bb97]/80 backdrop-blur-md text-white font-semibold p-4 rounded-xl hover:bg-[#1fa987] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                    "SEND RESET OTP"
                  )}
                </button>
              </form>

              <div className="text-center mt-6">
                <button
                  onClick={handleBackToLogin}
                  className="text-[#27bb97] text-sm hover:underline"
                  disabled={loading}
                >
                  Back to Login
                </button>
              </div>

              <p className="text-xs mt-6 text-gray-600">
                Remember your password?{" "}
                <Link to="/login">
                  <span className="text-[#27bb97] underline cursor-pointer hover:text-[#1fa987] transition-colors duration-200">
                    Login
                  </span>
                </Link>
              </p>

              <p className="mt-8 text-xs text-center text-gray-500">
                By signing in, you agree to our{" "}
                <span className="text-[#27bb97] cursor-pointer hover:underline">
                  Terms of Use
                </span>{" "}
                and acknowledge our{" "}
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

export default ForgotPassword;