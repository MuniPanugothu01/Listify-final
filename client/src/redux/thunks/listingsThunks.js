/**
 * Listings Thunks
 *
 * Centralised async actions for posting ads across ALL categories.
 * One dispatch from the component; the thunk routes internally:
 *
 *   ┌─────────────┐      ┌──────────────────────┐
 *   │  Component   │─────▶│  submitPostAd thunk  │
 *   └─────────────┘      └──────┬───────────────┘
 *                               │
 *              ┌────────────────┼────────────────┐
 *              ▼                ▼                ▼
 *        Electronics        Vehicles          Draft
 *        (S3 + API)        (S3 + API)     (Redux only)
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { electronicsAPI, vehiclesAPI } from "../../services/api";
import { addDraftListing } from "../slices/draftListingsSlice";
import { compressImagesToDataUrls } from "../../utils/imageUtils";

// ── Fallback placeholder images per category ───────────────────────
const FALLBACK_IMAGE = {
  Electronics:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  Vehicles:
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
  default:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
};

// ── Helpers ────────────────────────────────────────────────────────

/**
 * Upload image files via a category-specific API and return the URL array.
 * Returns the fallback image on failure so the listing can still be created.
 */
const uploadImages = async (files, api, fallback) => {
  if (!files || files.length === 0) return [fallback];
  try {
    const fd = new FormData();
    files.forEach((img) => fd.append("images", img));
    const res = await api.uploadImages(fd);
    const urls = res.data.imageUrls;
    return urls?.length ? urls : [fallback];
  } catch {
    return [fallback];
  }
};

/**
 * Build a base listing-data object shared across all categories.
 */
const buildBaseListingData = (form, category, subcategory, imageUrls) => ({
  title: form.title,
  price: Number(form.price),
  description: form.description,
  category,
  subcategory,
  condition: form.condition || "Good",
  location: form.location,
  phone: form.phone,
  images: imageUrls,
});

// ── Main Thunk ─────────────────────────────────────────────────────

/**
 * submitPostAd
 *
 * Single entry-point for posting any ad from the PostAd page.
 * Routes to the correct API (or Redux-only draft) based on category.
 *
 * @param {Object} payload
 * @param {Object} payload.form              – Form state.
 * @param {string} payload.category          – Selected category name.
 * @param {string} payload.subcategory       – Selected subcategory name.
 * @param {Object} payload.user              – Current auth user object.
 * @returns {{ type: "api"|"draft", message: string }}
 */
export const submitPostAd = createAsyncThunk(
  "listings/submitPostAd",
  async ({ form, category, subcategory, user }, { dispatch, rejectWithValue }) => {
    try {
      const fallback = FALLBACK_IMAGE[category] || FALLBACK_IMAGE.default;

      // ─── Electronics ─────────────────────────────────────────
      if (category === "Electronics") {
        const imageUrls = await uploadImages(form.images, electronicsAPI, fallback);
        const listingData = buildBaseListingData(form, category, subcategory, imageUrls);
        const response = await electronicsAPI.create(listingData);
        return {
          type: "api",
          entity: "electronics",
          listing: response.data.listing,
          message: "Electronics listing posted successfully!",
        };
      }

      // ─── Vehicles ────────────────────────────────────────────
      if (category === "Vehicles") {
        const imageUrls = await uploadImages(form.images, vehiclesAPI, fallback);
        const listingData = {
          ...buildBaseListingData(form, category, subcategory, imageUrls),
          brand: form.brand,
          model: form.model,
          variant: form.variant,
          year: form.year,
          kmDriven: form.kmDriven,
          fuelType: form.fuelType,
          transmission: form.transmission,
          ownership: form.ownership,
        };
        const response = await vehiclesAPI.create(listingData);
        return {
          type: "api",
          entity: "vehicles",
          listing: response.data.listing,
          message: "Vehicle listing posted successfully!",
        };
      }

      // ─── Draft listing (no backend API yet) ──────────────────
      // Compress images to data-URLs so they survive redux-persist.
      let imageDataUrls = [];
      if (form.images?.length > 0) {
        try {
          imageDataUrls = await compressImagesToDataUrls(form.images);
        } catch {
          imageDataUrls = [fallback];
        }
      }

      const draftPayload = {
        title: form.title,
        price: Number(form.price),
        category,
        subcategory,
        description: form.description,
        condition: form.condition || "Good",
        location: form.location,
        phone: form.phone,
        seller: {
          name: user?.firstName || "User",
          rating: 5.0,
          since: new Date().getFullYear().toString(),
        },
        images: imageDataUrls.length > 0 ? imageDataUrls : [fallback],
        featured: false,
      };

      dispatch(addDraftListing(draftPayload));
      return { type: "draft", message: "Listing posted successfully!" };

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to post listing. Please try again.",
      );
    }
  },
);
