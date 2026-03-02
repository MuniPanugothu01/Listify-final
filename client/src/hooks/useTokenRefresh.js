import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/selectors/authSelectors";
import { doRefresh } from "../services/api";

// Refresh the access token every 12 minutes (access token expires in 15 min)
const REFRESH_INTERVAL = 12 * 60 * 1000;

// Delay the first refresh so the server has time to boot after a restart.
const INITIAL_DELAY = 3000;
const MAX_STARTUP_RETRIES = 4;

/**
 * Hook that proactively refreshes the access token in the background
 * before it expires. This prevents the user from being logged out
 * when the access token expires — they stay logged in as long as
 * the refresh token (7 days) is valid.
 */
export const useTokenRefresh = () => {
  const user = useSelector(selectCurrentUser);
  const intervalRef = useRef(null);

  useEffect(() => {
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
      } catch {
        // Don't log out on transient errors — the interceptor handles
        // actual session expiration on the next real API call.
      }
    };

    const startupRefresh = async () => {
      await new Promise((r) => setTimeout(r, INITIAL_DELAY));

      for (let attempt = 0; attempt <= MAX_STARTUP_RETRIES; attempt++) {
        if (cancelled) return;
        try {
          await doRefresh();
          return; // done
        } catch (error) {
          const isNetworkOrServer =
            !error.response || (error.response?.status ?? error.status) >= 500;

          if (isNetworkOrServer && attempt < MAX_STARTUP_RETRIES) {
            const delay = Math.min(2000 * 2 ** attempt, 15000);
            await new Promise((r) => setTimeout(r, delay));
          } else {
            return;
          }
        }
      }
    };

    startupRefresh();

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
