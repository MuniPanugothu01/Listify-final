/**
 * ForSale Selectors
 *
 * Memoized selectors for the forSale slice.
 */
import { createSelector } from "@reduxjs/toolkit";
import { savedAdapterSelectors } from "../slices/forSaleSlice";

// ── Base ───────────────────────────────────────────────────────────
const selectForSaleSlice = (state) => state.forSale;

// ── Atomic selectors ───────────────────────────────────────────────
export const selectSelectedProduct = (state) => state.forSale.selectedProduct;
export const selectAllForSaleProducts = (state) => state.forSale.allProducts;
export const selectForSaleOffers = (state) => state.forSale.offers;

// ── Saved items (entity adapter) ───────────────────────────────────
const savedSelectors = savedAdapterSelectors((state) => state.forSale.saved);

export const selectAllSavedItems = savedSelectors.selectAll;
export const selectSavedItemById = savedSelectors.selectById;
export const selectSavedItemsCount = savedSelectors.selectTotal;
export const selectSavedItemIds = savedSelectors.selectIds;

// ── Derived / memoized ─────────────────────────────────────────────
export const selectSimilarProducts = createSelector(
  [selectAllForSaleProducts, selectSelectedProduct],
  (all, selected) => {
    if (!selected) return [];
    return all.filter((p) => p.id !== selected.id).slice(0, 4);
  },
);

export const selectIsItemSaved = createSelector(
  [selectSavedItemIds, (_state, itemId) => itemId],
  (ids, itemId) => ids.includes(itemId),
);

export const selectForSaleStatus = createSelector(
  selectForSaleSlice,
  ({ selectedProduct, allProducts, offers }) => ({
    hasSelectedProduct: !!selectedProduct,
    productCount: allProducts.length,
    offerCount: offers.length,
  }),
);
