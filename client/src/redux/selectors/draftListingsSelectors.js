/**
 * Draft Listings Selectors
 *
 * Memoized selectors for the draftListings slice.
 * Built on top of RTK's createEntityAdapter selectors.
 */
import { createSelector } from "@reduxjs/toolkit";
import { draftAdapterSelectors } from "../slices/draftListingsSlice";

// ── Adapter selectors (bound to `state.draftListings`) ─────────────
const adapterSelectors = draftAdapterSelectors((state) => state.draftListings);

/** All draft listings (sorted newest-first by the adapter). */
export const selectAllDraftListings = adapterSelectors.selectAll;

/** Single draft listing by ID. */
export const selectDraftListingById = adapterSelectors.selectById;

/** Total count of draft listings. */
export const selectDraftListingsCount = adapterSelectors.selectTotal;

/** Ordered array of draft listing IDs. */
export const selectDraftListingIds = adapterSelectors.selectIds;

/** Entities map { [id]: listing }. */
export const selectDraftEntitiesMap = adapterSelectors.selectEntities;

// ── Derived / memoized selectors ───────────────────────────────────

/** Filter draft listings by category name. */
export const selectDraftListingsByCategory = createSelector(
  [selectAllDraftListings, (_state, category) => category],
  (listings, category) =>
    listings.filter((l) => l.category === category),
);

/** Count of draft listings for a given category. */
export const selectDraftCountByCategory = createSelector(
  selectDraftListingsByCategory,
  (listings) => listings.length,
);

/** Most recent 10 draft listings (for dashboard widgets, etc.). */
export const selectRecentDraftListings = createSelector(
  selectAllDraftListings,
  (listings) => listings.slice(0, 10),
);

/** Timestamp of last modification to the drafts store. */
export const selectDraftLastUpdated = (state) =>
  state.draftListings?.lastUpdated ?? null;
