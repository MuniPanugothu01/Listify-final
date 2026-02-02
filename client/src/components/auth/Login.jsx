import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  clearError,
  resetSuccess,
} from "../../redux/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";
import SocialAuth from "./SocialAuth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const auth = useSelector((state) => state.auth);
  const { loading, error, success, token, user } = auth;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loginAttempted, setLoginAttempted] = useState(false);

  // Check if user is already logged in on component mount
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("authToken");
  //   const storedUser = localStorage.getItem("user");
    
  //   if (storedToken && storedUser) {
  //     console.log("User already logged in, redirecting...");
  //     navigate("/");
  //   }
  // }, [navigate]);

  // Handle errors from Redux
  useEffect(() => {
    if (error) {
      console.log("Redux error:", error);
      toast.error(typeof error === 'string' ? error : error.message || "Login failed");
      dispatch(clearError());
    }
  }, [error, dispatch]);

// In Login.js, update the success useEffect:
useEffect(() => {
  console.log("Auth state changed:", { success, token, user, error });
  
  // Only navigate if ALL conditions are met:
  // 1. success is true (from Redux)
  // 2. token exists
  // 3. user exists
  // 4. no error
  if (success === true && token && user && !error) {
    console.log("Conditions met for navigation");
    toast.success("Login successful!");
    // dispatch(resetSuccess());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  } else if (error) {
    console.log("Error detected, NOT navigating");
    // Error is already handled in the other useEffect
  }
}, [success, token, user, error, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
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
    e.preventDefault(); // CRITICAL: Prevent default form submission
    e.stopPropagation(); // Also stop event bubbling
    
    console.log("Form submitted with:", formData);
    setLoginAttempted(true);

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      setLoginAttempted(false);
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
      
      // Check if login was successful
      if (loginUser.fulfilled.match(result)) {
        console.log("Login successful - Redux fulfilled:", result.payload);
        // Don't navigate here - let the useEffect handle it based on token/user
      } else if (loginUser.rejected.match(result)) {
        console.log("Login failed - Redux rejected:", result.payload || result.error);
        setLoginAttempted(false);
        // Show error toast
  
      
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      setLoginAttempted(false);
      toast.error("An unexpected error occurred during login");
    }
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
                <p className="text-gray-600">
                  Log in to start creating stunning videos with ease.
                </p>
              </div>

              {/* FORM - Make sure it has onSubmit handler */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Google Sign In */}
                <SocialAuth />

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
                    disabled={loading || loginAttempted}
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
                      disabled={loading || loginAttempted}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading || loginAttempted}
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
                      disabled={loading || loginAttempted}
                    />
                    <span className="text-sm text-gray-600">Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-gray-600 hover:text-gray-900"
                    disabled={loading || loginAttempted}
                  >
                    Forgot Password?
                  </button>
                </div>
                
                {/* SUBMIT BUTTON - Remove onClick handler, keep only type="submit" */}
                <button
                  type="submit"
                  disabled={loading || loginAttempted}
                  className={`w-full z-50 ${
                    loading || loginAttempted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#27bb97] hover:bg-[#1fa987]"
                  } text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center`}
                >
                  {(loading || loginAttempted) ? (
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
                      disabled={loading || loginAttempted}
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