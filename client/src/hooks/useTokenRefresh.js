import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { doRefresh } from "../services/api";

// Refresh the access token every 12 minutes (access token expires in 15 min)
const REFRESH_INTERVAL = 12 * 60 * 1000; // 12 minutes

// Delay the first refresh so the server has time to boot after a restart.
const INITIAL_DELAY = 3000; // 3 seconds
const MAX_STARTUP_RETRIES = 4;

/**
 * Hook that proactively refreshes the access token in the background
 * before it expires. This prevents the user from being logged out
 * when the access token expires — they stay logged in as long as
 * the refresh token (7 days) is valid.
 *
 * On mount it waits a few seconds, then retries with exponential
 * back-off if the server isn't ready yet (covers VS Code restart,
 * MongoDB reconnect, etc.).
 */
export const useTokenRefresh = () => {
  const user = useSelector((state) => state.auth.user);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Only run if user is logged in (persisted by redux-persist)
    if (!user) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    let cancelled = false;

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

    // On first mount, wait a moment then attempt refresh with retries.
    const startupRefresh = async () => {
      await new Promise((r) => setTimeout(r, INITIAL_DELAY));

      for (let attempt = 0; attempt <= MAX_STARTUP_RETRIES; attempt++) {
        if (cancelled) return;
        try {
          await doRefresh();
          console.log("🔄 Startup token refresh successful");
          return; // done
        } catch (error) {
          const isNetworkOrServer =
            !error.response || (error.response?.status ?? error.status) >= 500;

          if (isNetworkOrServer && attempt < MAX_STARTUP_RETRIES) {
            const delay = Math.min(2000 * 2 ** attempt, 15000);
            console.warn(
              `🔄 Startup refresh attempt ${attempt + 1} failed, retrying in ${delay / 1000}s...`
            );
            await new Promise((r) => setTimeout(r, delay));
          } else {
            console.warn("🔄 Startup refresh gave up:", error.message);
            return;
          }
        }
      }
    };

    startupRefresh();

    // Then keep refreshing every 12 minutes
    intervalRef.current = setInterval(refreshAccessToken, REFRESH_INTERVAL);

    return () => {
      cancelled = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [user]);
};

export default useTokenRefresh;
