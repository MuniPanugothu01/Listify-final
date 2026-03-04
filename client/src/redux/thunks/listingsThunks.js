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
 *         ┌─────────────┬───────┼───────────┐
 *         ▼             ▼       ▼           ▼
 *    Electronics    Vehicles  ForSale     Draft
 *    (S3 + API)   (S3 + API) (S3 + API) (Redux)
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { electronicsAPI, vehiclesAPI, forSaleAPI } from "../../services/api";
import { createElectronicsListing } from "../slices/electronicsSlice";
import { createVehicleListing } from "../slices/vehiclesSlice";
import { createForSaleListing } from "../slices/forSaleItemsSlice";
import { addDraftListing } from "../slices/draftListingsSlice";
import { compressImagesToDataUrls } from "../../utils/imageUtils";

// ── Helpers ────────────────────────────────────────────────────────

/**
 * Upload image files via a category-specific API and return the URL array.
 * Throws on failure so the caller can inform the user instead of silently
 * replacing their images with a generic placeholder.
 */
const uploadImages = async (files, api) => {
  if (!files || files.length === 0) return [];
  const fd = new FormData();
  files.forEach((img) => fd.append("images", img));
  const res = await api.uploadImages(fd);
  const urls = res.data?.imageUrls;
  if (!urls || urls.length === 0) {
    throw new Error("Server returned no image URLs. Please try uploading again.");
  }
  return urls;
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
      // ─── Electronics ─────────────────────────────────────────
      if (category === "Electronics") {
        let imageUrls = [];
        try {
          imageUrls = await uploadImages(form.images, electronicsAPI);
        } catch (uploadErr) {
          console.error("Electronics image upload failed:", uploadErr);
          return rejectWithValue(
            "Image upload failed: " +
              (uploadErr.response?.data?.message || uploadErr.message ||
                "Could not upload images. Please check your connection and try again."),
          );
        }
        const listingData = buildBaseListingData(form, category, subcategory, imageUrls);
        // Dispatch through the electronics slice thunk so Redux state
        // (listings + myListings) is updated immediately
        const listing = await dispatch(createElectronicsListing(listingData)).unwrap();
        return {
          type: "api",
          entity: "electronics",
          listing,
          message: "Electronics listing posted successfully!",
        };
      }

      // ─── Vehicles ────────────────────────────────────────────
      if (category === "Vehicles") {
        let imageUrls = [];
        try {
          imageUrls = await uploadImages(form.images, vehiclesAPI);
        } catch (uploadErr) {
          console.error("Vehicle image upload failed:", uploadErr);
          return rejectWithValue(
            "Image upload failed: " +
              (uploadErr.response?.data?.message || uploadErr.message ||
                "Could not upload images. Please check your connection and try again."),
          );
        }
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
          engineCC: form.engineCC,
          cycleType: form.cycleType,
          gearCount: form.gearCount,
          frameSize: form.frameSize,
          compatibleVehicle: form.compatibleVehicle,
          partCategory: form.partCategory,
        };
        // Dispatch through the vehicles slice thunk so Redux state
        // (listings + myListings) is updated immediately
        const listing = await dispatch(createVehicleListing(listingData)).unwrap();
        return {
          type: "api",
          entity: "vehicles",
          listing,
          message: "Vehicle listing posted successfully!",
        };
      }

      // ─── ForSale categories (Mobiles, Furniture, Fashion, Books/Sports) ──
      const FORSALE_CATEGORIES = ["Mobiles", "Furniture", "Fashion", "Books, Sports"];
      if (FORSALE_CATEGORIES.includes(category)) {
        let imageUrls = [];
        try {
          imageUrls = await uploadImages(form.images, forSaleAPI);
        } catch (uploadErr) {
          console.error("ForSale image upload failed:", uploadErr);
          return rejectWithValue(
            "Image upload failed: " +
              (uploadErr.response?.data?.message || uploadErr.message ||
                "Could not upload images. Please check your connection and try again."),
          );
        }
        const listingData = {
          ...buildBaseListingData(form, category, subcategory, imageUrls),
          // Mobiles
          brand: form.brand,
          model: form.model,
          storage: form.storage,
          ram: form.ram,
          screenSize: form.screenSize,
          batteryHealth: form.batteryHealth,
          warranty: form.warranty,
          color: form.color,
          // Furniture
          material: form.material,
          dimensions: form.dimensions,
          weight: form.weight,
          assemblyRequired: form.assemblyRequired,
          numberOfPieces: form.numberOfPieces,
          // Fashion
          size: form.size,
          gender: form.gender,
          fabricType: form.fabricType,
          // Books, Sports
          author: form.author,
          isbn: form.isbn,
          publisher: form.publisher,
          edition: form.edition,
          sportType: form.sportType,
        };
        const listing = await dispatch(createForSaleListing(listingData)).unwrap();
        return {
          type: "api",
          entity: "forsale",
          listing,
          message: `${category} listing posted successfully!`,
        };
      }

      // ─── Draft listing (fallback for future categories) ──────
      let imageDataUrls = [];
      if (form.images?.length > 0) {
        try {
          imageDataUrls = await compressImagesToDataUrls(form.images);
        } catch {
          imageDataUrls = [];
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
        images: imageDataUrls.length > 0 ? imageDataUrls : [],
        featured: false,
      };

      dispatch(addDraftListing(draftPayload));
      return { type: "draft", message: "Listing posted successfully!" };

    } catch (error) {
      // If error is a string (from an inner thunk's rejectWithValue via .unwrap()),
      // forward it directly instead of trying to access .response/.message on it.
      if (typeof error === 'string') {
        return rejectWithValue(error);
      }
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to post listing. Please try again.",
      );
    }
  },
);
