/**
 * Auth Selectors
 *
 * Memoized selectors for the auth slice. Components should use these
 * instead of reaching into state.auth directly — this decouples
 * components from the state shape and prevents unnecessary re-renders.
 */
import { createSelector } from "@reduxjs/toolkit";

// ── Base selector (never use in components directly) ──────────────
const selectAuthSlice = (state) => state.auth;

// ── Atomic selectors  ─────────────────────────────────────────────
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthSuccess = (state) => state.auth.success;
export const selectOtpSent = (state) => state.auth.otpSent;
export const selectRegistrationEmail = (state) => state.auth.registrationEmail;
export const selectResetToken = (state) => state.auth.resetToken;
export const selectResetEmail = (state) => state.auth.resetEmail;
export const selectGoogleClientId = (state) => state.auth.googleClientId;
export const selectIsGoogleLoading = (state) => state.auth.isGoogleLoading;
export const selectSessions = (state) => state.auth.sessions;

// ── Derived / memoized selectors ──────────────────────────────────
export const selectIsAuthenticated = createSelector(
  selectCurrentUser,
  (user) => !!user,
);

export const selectUserDisplayName = createSelector(
  selectCurrentUser,
  (user) => {
    if (!user) return "";
    return user.name || user.displayName || user.email?.split("@")[0] || "";
  },
);

export const selectUserEmail = createSelector(
  selectCurrentUser,
  (user) => user?.email ?? "",
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user?.role ?? "user",
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === "admin",
);

/** Bundle commonly-needed auth status flags (avoids multiple useSelector calls). */
export const selectAuthStatus = createSelector(
  selectAuthSlice,
  ({ loading, error, success }) => ({ loading, error, success }),
);

/** OTP-related state for registration / forgot-password flows. */
export const selectOtpState = createSelector(
  selectAuthSlice,
  ({ otpSent, registrationEmail, resetEmail, resetToken }) => ({
    otpSent,
    registrationEmail,
    resetEmail,
    resetToken,
  }),
);
