/**
 * Redux Hooks
 *
 * Production-grade hooks that use memoized selectors to prevent
 * unnecessary re-renders. Components should use these instead of
 * raw useSelector / useDispatch.
 *
 * ⚠️ IMPORTANT: Each hook returns a stable reference. Don't spread
 * the entire slice state into a new object — that breaks React.memo.
 */
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthSuccess,
  selectAuthStatus,
  selectOtpState,
  selectGoogleClientId,
  selectIsGoogleLoading,
} from "../selectors/authSelectors";
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
  selectProfileImageUrl,
  selectImageUploadStatus,
  selectProfileDevices,
  selectLoginHistory,
} from "../selectors/profileSelectors";

// ── Typed hooks ───────────────────────────────────────────────────
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// ── Auth hooks (stable references) ───────────────────────────────
export const useAuthUser = () => useSelector(selectCurrentUser);
export const useIsAuthenticated = () => useSelector(selectIsAuthenticated);
export const useAuthLoading = () => useSelector(selectAuthLoading);
export const useAuthError = () => useSelector(selectAuthError);
export const useAuthSuccess = () => useSelector(selectAuthSuccess);
export const useAuthStatus = () => useSelector(selectAuthStatus);
export const useOtpState = () => useSelector(selectOtpState);
export const useGoogleClientId = () => useSelector(selectGoogleClientId);
export const useIsGoogleLoading = () => useSelector(selectIsGoogleLoading);

// ── Profile hooks (stable references) ────────────────────────────
export const useProfileData = () => useSelector(selectProfile);
export const useProfileLoading = () => useSelector(selectProfileLoading);
export const useProfileError = () => useSelector(selectProfileError);
export const useProfileImage = () => useSelector(selectProfileImageUrl);
export const useImageUploadStatus = () => useSelector(selectImageUploadStatus);
export const useProfileDevices = () => useSelector(selectProfileDevices);
export const useLoginHistory = () => useSelector(selectLoginHistory);