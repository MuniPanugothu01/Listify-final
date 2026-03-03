/**
 * Draft Listings Slice
 *
 * Production-grade local listing management using RTK's createEntityAdapter.
 * Handles categories that don't yet have backend API endpoints
 * (Mobiles, Furniture, Fashion, Books/Sports, etc.).
 *
 * Persisted via redux-persist so data survives page refreshes.
 * Entity adapter provides normalized state with O(1) lookups by ID.
 */
import { createSlice, createEntityAdapter, nanoid } from "@reduxjs/toolkit";

// ── Entity Adapter ─────────────────────────────────────────────────
// Sorts newest-first by default. Normalized shape: { ids: [], entities: {} }
const draftAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

// ── Initial State ──────────────────────────────────────────────────
const initialState = draftAdapter.getInitialState({
  lastUpdated: null,
});

// ── Slice ──────────────────────────────────────────────────────────
const draftListingsSlice = createSlice({
  name: "draftListings",
  initialState,
  reducers: {
    /**
     * Add a new draft listing.
     * `prepare` callback normalizes the payload before it hits the reducer —
     * generates a unique ID, timestamps, and sets initial status.
     */
    addDraftListing: {
      reducer: (state, action) => {
        draftAdapter.addOne(state, action.payload);
        state.lastUpdated = action.payload.createdAt;
      },
      prepare: (listing) => ({
        payload: {
          ...listing,
          id: nanoid(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: "active",
        },
      }),
    },

    /** Partial update — pass { id, changes: { ... } }. */
    updateDraftListing: (state, action) => {
      const { id, changes } = action.payload;
      draftAdapter.updateOne(state, {
        id,
        changes: { ...changes, updatedAt: new Date().toISOString() },
      });
      state.lastUpdated = new Date().toISOString();
    },

    /** Remove a single draft listing by ID. */
    removeDraftListing: (state, action) => {
      draftAdapter.removeOne(state, action.payload);
      state.lastUpdated = new Date().toISOString();
    },

    /** Remove multiple draft listings by IDs array. */
    removeMultipleDraftListings: (state, action) => {
      draftAdapter.removeMany(state, action.payload);
      state.lastUpdated = new Date().toISOString();
    },

    /** Nuke everything — useful on logout or data reset. */
    clearAllDraftListings: (state) => {
      draftAdapter.removeAll(state);
      state.lastUpdated = new Date().toISOString();
    },
  },
});

// ── Actions ────────────────────────────────────────────────────────
export const {
  addDraftListing,
  updateDraftListing,
  removeDraftListing,
  removeMultipleDraftListings,
  clearAllDraftListings,
} = draftListingsSlice.actions;

// ── Adapter selectors factory ──────────────────────────────────────
// Exported for use in the selectors file (bound to the correct state slice).
export const draftAdapterSelectors = draftAdapter.getSelectors;

export default draftListingsSlice.reducer;
