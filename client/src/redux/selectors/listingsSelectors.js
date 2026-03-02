/**
 * Listings Selectors
 *
 * Memoized selectors for the listings slice.
 */
import { createSelector } from "@reduxjs/toolkit";

// ── Base selector ──────────────────────────────────────────────────
const selectListingsSlice = (state) => state.listings;

// ── Atomic selectors ───────────────────────────────────────────────
export const selectMyPosts = (state) => state.listings.myPosts;
export const selectSavedHouses = (state) => state.listings.savedHouses;
export const selectMyAlerts = (state) => state.listings.myAlerts;
export const selectListingsLoading = (state) => state.listings.loading;
export const selectListingsError = (state) => state.listings.error;
export const selectListingsSuccess = (state) => state.listings.success;

// ── Derived selectors ──────────────────────────────────────────────
export const selectListingsStatus = createSelector(
  selectListingsSlice,
  ({ loading, error, success }) => ({ loading, error, success }),
);

export const selectMyPostsCount = createSelector(
  selectMyPosts,
  (posts) => posts.length,
);

export const selectSavedHousesCount = createSelector(
  selectSavedHouses,
  (items) => items.length,
);

export const selectAlertsCount = createSelector(
  selectMyAlerts,
  (alerts) => alerts.length,
);
