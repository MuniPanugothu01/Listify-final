import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../redux/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";
import SocialAuth from "./SocialAuth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const auth = useSelector((state) => state.auth);
  const { loading, error, success, user } = auth;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Add ref to track if toast has been shown
  const toastShownRef = useRef(false);
  // Track login method to show correct toast
  const loginMethodRef = useRef(null);
  // Track if navigation has been performed
  const navigationPerformedRef = useRef(false);

  // ============== ADD GLOBAL CSS ANIMATIONS ==============
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeInScale {
        0% { opacity: 0; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes fadeOutScale {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.9); }
      }
      .toast-animation {
        animation: fadeInScale 0.5s ease-in-out, fadeOutScale 0.5s ease-in-out 3.5s forwards !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle errors from Redux
  useEffect(() => {
    console.log("Current auth state:", { loading, error, success, user: !!user });

    if (error && !toastShownRef.current) {
      console.log("Redux error detected:", error);
      toastShownRef.current = true;

      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Login failed. Please check your credentials.",
        {
          duration: 5000,
          className: "toast-animation",
        },
      );

      setTimeout(() => {
        dispatch(clearError());
        toastShownRef.current = false;
      }, 100);
    }
  }, [error, dispatch]);

  // Handle successful login
  useEffect(() => {
    console.log("Checking for successful login...", {
      success,
      user: !!user,
      loginMethod: loginMethodRef.current,
      navigationPerformed: navigationPerformedRef.current,
    });

    // FIX: Prevent multiple navigations
    if (success && user && !navigationPerformedRef.current) {
      console.log("Login successful, preparing navigation");
      
      if (loginMethodRef.current === "email" && !toastShownRef.current) {
        console.log("Email login successful, showing toast");
        toastShownRef.current = true;

        toast.success("Login successful!", {
          duration: 2000,
          className: "toast-animation",
        });

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        // Set navigation flag
        navigationPerformedRef.current = true;

        const timer = setTimeout(() => {
          console.log("Navigating to home page");
          navigate("/");
          loginMethodRef.current = null;
          toastShownRef.current = false;
          // Reset navigation flag after navigation
          setTimeout(() => {
            navigationPerformedRef.current = false;
          }, 1000);
        }, 1500);

        return () => clearTimeout(timer);
      }

      if (loginMethodRef.current === "google" && !navigationPerformedRef.current) {
        console.log("Google login successful - navigating");
        
        // Set navigation flag
        navigationPerformedRef.current = true;
        
        const timer = setTimeout(() => {
          console.log("Navigating to home page (Google)");
          navigate("/");
          loginMethodRef.current = null;
          // Reset navigation flag after navigation
          setTimeout(() => {
            navigationPerformedRef.current = false;
          }, 1000);
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [success, user, navigate, rememberMe]);

  // Reset navigation flag when component unmounts
  useEffect(() => {
    return () => {
      navigationPerformedRef.current = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Form submitted with:", formData);

    // Reset flags
    toastShownRef.current = false;
    loginMethodRef.current = "email";
    navigationPerformedRef.current = false;

    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        duration: 4000,
        className: "toast-animation",
      });
      loginMethodRef.current = null;
      return;
    }

    try {
      console.log("Dispatching loginUser...");
      const result = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        }),
      );

      console.log("Dispatch result:", result);

      if (loginUser.fulfilled.match(result)) {
        console.log("Login successful - Redux fulfilled");
        // useEffect handles navigation and toast
      } else if (loginUser.rejected.match(result)) {
        console.log(
          "Login failed - Redux rejected:",
          result.error || result.payload,
        );
        loginMethodRef.current = null;
        navigationPerformedRef.current = false;
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      toast.error("An unexpected error occurred. Please try again.", {
        duration: 5000,
        className: "toast-animation",
      });
      loginMethodRef.current = null;
      navigationPerformedRef.current = false;
    }
  };

  const handleGoogleLoginStart = () => {
    loginMethodRef.current = "google";
    navigationPerformedRef.current = false;
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

      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img
          src="/signin.webp"
          alt="Geometric Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent lg:bg-gradient-to-r lg:from-slate-900/80 lg:via-slate-900/60 lg:to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 min-h-screen relative">
          <div className="relative z-20 w-full p-12 flex flex-col justify-between">
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
            <div className="text-white max-w-xl mt-30">
              <p className="text-5xl font-bold leading-tight mb-3">
                List Smarter. Sell Faster. <br />
                Grow Anywhere.
              </p>
              <p className="text-slate-300 text-md mb-30">
                From cars and electronics to services and properties, Listify
                helps you showcase, discover, and sell everything in one
                powerful platform.
              </p>
              <div className="flex items-center gap-1 -mt-22">
                <div className="w-6 h-1 bg-white rounded-full"></div>
                <HiDotsHorizontal className="text-white/50 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-8">
          <div className="w-[90vw] lg:w-[87vh] h-[85vh] lg:h-[89vh] rounded-md flex items-center justify-center bg-white/95 backdrop-blur-sm border border-white/20 p-8 shadow-2xl">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Welcome Back!
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <SocialAuth onLoginStart={handleGoogleLoginStart} />

                {/* Divider */}
                <div className="relative flex items-center justify-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative bg-white/95 px-4 rounded-lg">
                    <span className="text-sm text-gray-600">Or</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Input your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:border-transparent bg-white/80 ${
                      formErrors.email
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#27bb97]"
                    }`}
                    required
                    disabled={loading}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Input your password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:border-transparent bg-white/80 pr-12 ${
                        formErrors.password
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#27bb97]"
                      }`}
                      required
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
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-600">Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-gray-600 hover:text-gray-900"
                    disabled={loading}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full z-50 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#27bb97] hover:bg-[#1fa987]"
                  } text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center`}
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
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="text-center mt-6">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link to="/signup">
                    <button
                      className="text-gray-900 font-medium hover:underline cursor-pointer"
                      disabled={loading}
                    >
                      Sign up here
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
};

export default Login;