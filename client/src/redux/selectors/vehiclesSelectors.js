/**
 * Vehicles Selectors
 *
 * Memoized selectors for the vehicles slice.
 */
import { createSelector } from "@reduxjs/toolkit";

// ── Base selector ──────────────────────────────────────────────────
const selectVehiclesSlice = (state) => state.vehicles;

// ── Atomic selectors ───────────────────────────────────────────────
export const selectVehiclesListings = (state) => state.vehicles.listings;
export const selectCurrentVehicleListing = (state) => state.vehicles.currentListing;
export const selectVehiclesPagination = (state) => state.vehicles.pagination;
export const selectVehiclesLoading = (state) => state.vehicles.loading;
export const selectVehiclesDetailLoading = (state) => state.vehicles.detailLoading;
export const selectVehiclesCreateLoading = (state) => state.vehicles.createLoading;
export const selectVehiclesUploadLoading = (state) => state.vehicles.uploadLoading;
export const selectVehiclesError = (state) => state.vehicles.error;
export const selectVehiclesCreateSuccess = (state) => state.vehicles.createSuccess;
export const selectSavedVehicles = (state) => state.vehicles.savedItems;
export const selectSavedVehiclesLoading = (state) => state.vehicles.savedLoading;
export const selectMyVehicles = (state) => state.vehicles.myListings;
export const selectMyVehiclesLoading = (state) => state.vehicles.myListingsLoading;

// ── Derived selectors ──────────────────────────────────────────────
export const selectVehiclesStatus = createSelector(
  selectVehiclesSlice,
  ({ loading, error, createSuccess, createLoading }) => ({
    loading,
    error,
    createSuccess,
    createLoading,
  }),
);

export const selectVehiclesCount = createSelector(
  selectVehiclesListings,
  (listings) => listings.length,
);

export const selectSavedVehiclesCount = createSelector(
  selectSavedVehicles,
  (items) => items.length,
);

/** Check if a specific listing is saved. */
export const makeSelectIsVehicleSaved = (id) =>
  createSelector(
    selectVehiclesSlice,
    ({ listings, currentListing, savedItems }) => {
      const listing = listings.find((l) => l._id === id) || (currentListing?._id === id ? currentListing : null);
      if (listing) return !!listing._saved;
      return savedItems.some((s) => s._id === id);
    },
  );
