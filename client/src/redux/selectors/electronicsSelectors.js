/**
 * Electronics Selectors
 *
 * Memoized selectors for the electronics slice.
 */
import { createSelector } from "@reduxjs/toolkit";

// ── Base selector ──────────────────────────────────────────────────
const selectElectronicsSlice = (state) => state.electronics;

// ── Atomic selectors ───────────────────────────────────────────────
export const selectElectronicsListings = (state) => state.electronics.listings;
export const selectCurrentElectronicsListing = (state) => state.electronics.currentListing;
export const selectElectronicsPagination = (state) => state.electronics.pagination;
export const selectElectronicsLoading = (state) => state.electronics.loading;
export const selectElectronicsDetailLoading = (state) => state.electronics.detailLoading;
export const selectElectronicsCreateLoading = (state) => state.electronics.createLoading;
export const selectElectronicsUploadLoading = (state) => state.electronics.uploadLoading;
export const selectElectronicsError = (state) => state.electronics.error;
export const selectElectronicsCreateSuccess = (state) => state.electronics.createSuccess;
export const selectSavedElectronics = (state) => state.electronics.savedItems;
export const selectSavedElectronicsLoading = (state) => state.electronics.savedLoading;
export const selectMyElectronics = (state) => state.electronics.myListings;
export const selectMyElectronicsLoading = (state) => state.electronics.myListingsLoading;

// ── Derived selectors ──────────────────────────────────────────────
export const selectElectronicsStatus = createSelector(
  selectElectronicsSlice,
  ({ loading, error, createSuccess, createLoading }) => ({
    loading,
    error,
    createSuccess,
    createLoading,
  }),
);

export const selectElectronicsCount = createSelector(
  selectElectronicsListings,
  (listings) => listings.length,
);

export const selectSavedElectronicsCount = createSelector(
  selectSavedElectronics,
  (items) => items.length,
);

/** Check if a specific listing is saved. */
export const makeSelectIsElectronicsSaved = (id) =>
  createSelector(
    selectElectronicsSlice,
    ({ listings, currentListing, savedItems }) => {
      const listing = listings.find((l) => l._id === id) || (currentListing?._id === id ? currentListing : null);
      if (listing) return !!listing._saved;
      return savedItems.some((s) => s._id === id);
    },
  );
