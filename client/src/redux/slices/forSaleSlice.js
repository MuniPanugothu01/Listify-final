/**
 * ForSale Slice
 *
 * Manages the ForSale page state that was previously stored in localStorage:
 *   - allProducts   → full product catalog for the ForSale listing page
 *   - selectedProduct → the product being viewed on the detail page
 *   - userOffers     → offers made by the user on products
 *   - savedItems     → products the user has saved/favourited
 *
 * Eliminates ALL localStorage usage from ForSaleListing, ForSaleDetail,
 * and Profile saved-items flow.
 */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// ── Entity adapter for saved items (O(1) add/remove) ──────────────
const savedAdapter = createEntityAdapter();

const initialState = {
  /** The current product being viewed on the detail page. */
  selectedProduct: null,

  /** Complete product catalog from ForSaleListing (static seed data). */
  allProducts: [],

  /** User offers submitted through the Make Offer modal. */
  offers: [],

  /** Normalized saved items via createEntityAdapter. */
  saved: savedAdapter.getInitialState(),
};

const forSaleSlice = createSlice({
  name: "forSale",
  initialState,
  reducers: {
    // ── Selected product ─────────────────────────────────────
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    // ── All products catalog ─────────────────────────────────
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },

    // ── Saved items ──────────────────────────────────────────
    saveItem: (state, action) => {
      savedAdapter.upsertOne(state.saved, action.payload);
    },
    unsaveItem: (state, action) => {
      savedAdapter.removeOne(state.saved, action.payload); // payload = id
    },
    setSavedItems: (state, action) => {
      savedAdapter.setAll(state.saved, action.payload);
    },
    clearSavedItems: (state) => {
      savedAdapter.removeAll(state.saved);
    },

    // ── Offers ───────────────────────────────────────────────
    addOffer: {
      reducer: (state, action) => {
        state.offers.push(action.payload);
      },
      prepare: (offer) => ({
        payload: {
          ...offer,
          id: `offer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          createdAt: new Date().toISOString(),
        },
      }),
    },
    clearOffers: (state) => {
      state.offers = [];
    },
  },
});

// ── Actions ────────────────────────────────────────────────────────
export const {
  setSelectedProduct,
  clearSelectedProduct,
  setAllProducts,
  saveItem,
  unsaveItem,
  setSavedItems,
  clearSavedItems,
  addOffer,
  clearOffers,
} = forSaleSlice.actions;

// ── Adapter selectors factory (bound in selector file) ─────────────
export const savedAdapterSelectors = savedAdapter.getSelectors;

export default forSaleSlice.reducer;
