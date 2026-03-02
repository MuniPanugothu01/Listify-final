/**
 * Error Normalizer
 *
 * Standardizes error shapes across all Redux thunks so components
 * always receive a predictable { message, code?, errors? } object.
 *
 * Usage inside createAsyncThunk:
 *   catch (error) {
 *     return rejectWithValue(normalizeError(error));
 *   }
 */

/**
 * @typedef {Object} NormalizedError
 * @property {string}  message  - Human-readable error message
 * @property {number}  [status] - HTTP status code (if available)
 * @property {string}  [code]   - Machine-readable error code (e.g. "VALIDATION_ERROR")
 * @property {Object}  [errors] - Field-level validation errors { field: message }
 */

/**
 * Normalize any error shape into a consistent { message, status?, code?, errors? } object.
 *
 * Handles:
 *  - Axios error responses (error.response.data)
 *  - Plain strings
 *  - Error instances
 *  - Server response objects { message, errors, code }
 *  - Unknown shapes (fallback message)
 *
 * @param {unknown} error - The raw error from a catch block
 * @param {string}  [fallbackMessage="Something went wrong"] - Default message if extraction fails
 * @returns {NormalizedError}
 */
export const normalizeError = (error, fallbackMessage = "Something went wrong") => {
  // Already a normalized error (idempotent)
  if (error && typeof error === "object" && error.__normalized) {
    return error;
  }

  // Plain string
  if (typeof error === "string") {
    return { message: error, __normalized: true };
  }

  // Axios error with response
  if (error?.response?.data) {
    const data = error.response.data;
    return {
      message: data.message || data.error || fallbackMessage,
      status: error.response.status,
      code: data.code,
      errors: data.errors,
      __normalized: true,
    };
  }

  // Server response object (already extracted data)
  if (error && typeof error === "object") {
    // Object with message property
    if (error.message) {
      return {
        message: error.message,
        status: error.status,
        code: error.code,
        errors: error.errors,
        __normalized: true,
      };
    }

    // Object with errors property only (validation)
    if (error.errors) {
      const firstError = typeof error.errors === "object"
        ? Object.values(error.errors)[0]
        : String(error.errors);
      return {
        message: firstError || fallbackMessage,
        errors: error.errors,
        code: "VALIDATION_ERROR",
        __normalized: true,
      };
    }

    // Error instance
    if (error instanceof Error) {
      return { message: error.message, __normalized: true };
    }
  }

  // Fallback
  return { message: fallbackMessage, __normalized: true };
};

/**
 * Extract a display-friendly message string from any error payload.
 * Useful in components: const msg = getErrorMessage(error);
 *
 * @param {unknown} error
 * @param {string}  [fallback="Something went wrong"]
 * @returns {string}
 */
export const getErrorMessage = (error, fallback = "Something went wrong") => {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  if (error.errors) {
    const values = Object.values(error.errors);
    return values.length > 0 ? values[0] : fallback;
  }
  return fallback;
};
