/**
 * Redux Middleware
 *
 * Production-grade middleware for error tracking and action logging.
 * Catches rejected thunks globally so components don't need individual
 * error-boundary logic for every dispatch.
 */

/**
 * Error-tracking middleware.
 *
 * - Intercepts every rejected async thunk and logs it in a structured way.
 * - In production, this is where you'd send to Sentry / Datadog / etc.
 * - Prevents noisy console.error from individual thunks.
 */
export const errorMiddleware = () => (next) => (action) => {
  // Only intercept rejected async thunks (type ends with "/rejected")
  if (action?.type?.endsWith("/rejected")) {
    const { type, payload, error } = action;

    // Structured error log — easy to filter in prod monitoring
    if (import.meta.env.MODE !== "production") {
      console.warn(`[Redux] ${type}`, {
        payload,
        error: error?.message,
      });
    }

    // 🔌 Production hook — plug in your error reporting service here:
    // errorReportingService.captureException(new Error(type), { extra: { payload } });
  }

  return next(action);
};

/**
 * Action logger middleware (development only).
 *
 * Slim alternative to redux-logger — only logs action type + payload size
 * to avoid flooding the console with full state dumps.
 */
export const actionLoggerMiddleware = () => (next) => (action) => {
  if (import.meta.env.MODE !== "production") {
    const payloadSize = action?.payload
      ? JSON.stringify(action.payload).length
      : 0;

    // Collapse noisy actions (persist, rehydrate)
    const isNoise =
      action?.type?.startsWith("persist/") ||
      action?.type === "@@INIT";

    if (!isNoise) {
      console.groupCollapsed(
        `%c[Action] ${action?.type}`,
        "color: #8B8B8B; font-weight: normal;",
      );
      if (payloadSize > 0 && payloadSize < 2000) {
        console.log("payload:", action.payload);
      } else if (payloadSize >= 2000) {
        console.log(`payload: [${payloadSize} bytes]`);
      }
      console.groupEnd();
    }
  }

  return next(action);
};
