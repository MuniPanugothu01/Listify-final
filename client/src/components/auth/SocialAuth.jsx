import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const SocialAuth = ({ onSuccess, isSignUp = false, onLoginStart }) => {
  const navigate = useNavigate();
  const {
    GoogleLogin: googleLoginAction,
    getGoogleClientIdAction,
    googleClientId,
    isGoogleLoading,
  } = useAuth();

  const [error, setError] = useState("");
  const [googleButtonReady, setGoogleButtonReady] = useState(false);
  const loginInProgress = useRef(false);
  const toastShown = useRef(false);

  // ============== ADD ANIMATION STYLES ==============
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

  // Get Google Client ID when component mounts
  useEffect(() => {
    const fetchClientId = async () => {
      try {
        await getGoogleClientIdAction();
      } catch (err) {
        setError("Failed to load Google sign-in");
        console.error("Failed to get Google client ID:", err);
      }
    };

    if (!googleClientId) {
      fetchClientId();
    }
  }, [googleClientId, getGoogleClientIdAction]);

  // Wait for Google button to initialize
  useEffect(() => {
    const timer = setTimeout(() => {
      setGoogleButtonReady(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Notify parent that Google login started
      if (onLoginStart) {
        onLoginStart();
      }

      toastShown.current = false;

      if (onSuccess) {
        // Use custom success handler if provided (for SignUp)
        return onSuccess(credentialResponse);
      }

      if (loginInProgress.current) {
        console.log("Login already in progress, skipping");
        return;
      }

      loginInProgress.current = true;
      setError("");

      const idToken = credentialResponse.credential;

      if (!idToken) {
        throw new Error("No ID token received from Google");
      }

      console.log("🔑 Google ID Token received for login");

      const result = await googleLoginAction(idToken);

      console.log("Google login result:", result);

      // FIXED: Check for successful login correctly
      // Backend now returns success: true and user object (no token in body)
      if (result?.payload?.success === true && result?.payload?.user) {
        console.log("✅ Google login successful!");

        // ============== ONLY ADD duration AND animation CLASS ==============
        if (!toastShown.current) {
          toast.success("Google login successful!", {
            duration: 4000,
            className: "toast-animation",
          });
          toastShown.current = true;
        }

        // Short delay before navigation
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // Try to get error message from various places
        const errorMsg =
          result?.payload?.message ||
          result?.payload?.error ||
          result?.error?.message ||
          "Google login failed. Please try again.";

        console.error("❌ Google login failed:", errorMsg);
        setError(errorMsg);

        if (!toastShown.current) {
          // ============== ONLY ADD duration AND animation CLASS ==============
          toast.error(errorMsg, {
            duration: 5000,
            className: "toast-animation",
          });
          toastShown.current = true;
        }
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setError(error.message || "Google login failed");

      if (!toastShown.current) {
        // ============== ONLY ADD duration AND animation CLASS ==============
        toast.error("Google login failed. Please try again.", {
          duration: 5000,
          className: "toast-animation",
        });
        toastShown.current = true;
      }
    } finally {
      loginInProgress.current = false;
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed - Error from Google SDK");
    setError("Google authentication failed");

    if (!toastShown.current) {
      // ============== ONLY ADD duration AND animation CLASS ==============
      toast.error(
        "Google authentication failed. Please check your Google Client ID configuration.",
        {
          duration: 6000,
          className: "toast-animation",
        },
      );
      toastShown.current = true;
    }
  };

  // Custom Google button component (fallback)
  const CustomGoogleButton = () => (
    <button
      onClick={() => {
        if (!googleButtonReady) {
          getGoogleClientIdAction();
        }
        if (onLoginStart) {
          onLoginStart();
        }
      }}
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
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
      <span className="text-sm text-gray-700">
        {isSignUp ? "Sign up with Google" : "Continue with Google"}
      </span>
    </button>
  );

  return (
    <div className="w-full">
      {error && (
        <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
          {error}
        </div>
      )}

      {isGoogleLoading ? (
        <div className="flex items-center justify-center gap-3 bg-white border border-gray-300 py-2.5 rounded-lg shadow-sm">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
          <span className="text-sm text-gray-700">
            Loading Google sign-in...
          </span>
        </div>
      ) : googleClientId && googleButtonReady ? (
        // Google Login component with proper styling
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            size="large"
            text={isSignUp ? "signup_with" : "continue_with"}
            shape="rectangular"
            theme="outline"
            width="100%"
            useOneTap={false}
            ux_mode="popup"
            context={isSignUp ? "signup" : "signin"}
          />
        </div>
      ) : (
        // Custom fallback button
        <CustomGoogleButton />
      )}
    </div>
  );
};

export default SocialAuth;