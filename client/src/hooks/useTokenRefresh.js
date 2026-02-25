import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { doRefresh } from "../services/api";

// Refresh the access token every 12 minutes (access token expires in 15 min)
const REFRESH_INTERVAL = 12 * 60 * 1000; // 12 minutes

/**
 * Hook that proactively refreshes the access token in the background
 * before it expires. This prevents the user from being logged out
 * when the access token expires — they stay logged in as long as
 * the refresh token (7 days) is valid.
 */
export const useTokenRefresh = () => {
  const user = useSelector((state) => state.auth.user);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Only run if user is logged in
    if (!user) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const refreshAccessToken = async () => {
      try {
        await doRefresh();
        console.log("🔄 Background token refresh successful");
      } catch (error) {
        // Don't log out on transient errors — the interceptor handles
        // actual session expiration on the next real API call.
        console.warn("🔄 Background token refresh failed:", error.message);
      }
    };

    // Refresh immediately on mount (in case the token is about to expire)
    refreshAccessToken();

    // Then refresh every 12 minutes
    intervalRef.current = setInterval(refreshAccessToken, REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [user]);
};

export default useTokenRefresh;
