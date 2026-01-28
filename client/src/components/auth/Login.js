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

export default function VidProLogin() {
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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Login successful!");
      dispatch(resetSuccess());
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, [success, navigate, dispatch]);

  useEffect(() => {
    if (token && user) {
      navigate("/dashboard");
    }
  }, [token, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Dispatch the login action
    dispatch(loginUser(formData));
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

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#27bb97] focus:border-transparent bg-white/80"
                    required
                  />
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#27bb97] focus:border-transparent pr-12 bg-white/80"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${
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

                <div className="relative flex items-center justify-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative bg-white/95 px-4 rounded-lg">
                    <span className="text-sm text-gray-600">
                      Or continue with:
                    </span>
                  </div>
                </div>

                {/* Google Sign In */}
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
                      d="M10.2002 19.6727C12.7584 19.6727 14.9056 18.8509 16.8692 17.3564L13.6565 14.9672C12.7856 15.5527 11.6438 15.8982 10.2002 15.8982C7.73287 15.8982 5.6438 14.1582 4.87106 11.8437H1.5647V14.3073C3.51925 18.1909 6.60925 19.6727 10.2002 19.6727Z"
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

                <div className="text-center mt-6">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link to="/signup">
                    <button className="text-gray-900 font-medium hover:underline cursor-pointer">
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
}
