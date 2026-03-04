import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forSaleAPI } from "../../services/api";

// ==================== Async Thunks ====================

export const fetchAllForSaleItems = createAsyncThunk(
  "forSaleItems/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await forSaleAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch listings"
      );
    }
  }
);

export const fetchForSaleItemById = createAsyncThunk(
  "forSaleItems/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await forSaleAPI.getById(id);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch listing"
      );
    }
  }
);

export const createForSaleListing = createAsyncThunk(
  "forSaleItems/create",
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await forSaleAPI.create(listingData);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create listing"
      );
    }
  }
);

export const updateForSaleListing = createAsyncThunk(
  "forSaleItems/update",
  async ({ id, listingData }, { rejectWithValue }) => {
    try {
      const response = await forSaleAPI.update(id, listingData);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update listing"
      );
    }
  }
);

export const deleteForSaleListing = createAsyncThunk(
  "forSaleItems/delete",
  async (id, { rejectWithValue }) => {
    try {
      await forSaleAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete listing"
      );
    }
  }
);

export const uploadForSaleImages = createAsyncThunk(
  "forSaleItems/uploadImages",
  async ({ files, onProgress }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const response = await forSaleAPI.uploadImages(formData, onProgress);
      return response.data.imageUrls;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload images"
      );
    }
  }
);

export const toggleSaveForSaleItem = createAsyncThunk(
  "forSaleItems/toggleSave",
  async (id, { rejectWithValue }) => {
    try {
      const response = await forSaleAPI.toggleSave(id);
      return { id, saved: response.data.saved };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to save listing"
      );
    }
  }
);

export const fetchSavedForSaleItems = createAsyncThunk(
  "forSaleItems/fetchSaved",
  async (_, { rejectWithValue }) => {
    try {
      const response = await forSaleAPI.getSaved();
      return response.data.listings || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch saved listings"
      );
    }
  }
);

export const fetchMyForSaleItems = createAsyncThunk(
  "forSaleItems/fetchMyListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await forSaleAPI.getMyListings();
      return response.data.listings || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch my listings"
      );
    }
  }
);

// ==================== Slice ====================

const initialState = {
  listings: [],
  currentListing: null,
  pagination: null,
  loading: false,
  detailLoading: false,
  createLoading: false,
  uploadLoading: false,
  error: null,
  createSuccess: false,
  savedItems: [],
  savedLoading: false,
  myListings: [],
  myListingsLoading: false,
};

const forSaleItemsSlice = createSlice({
  name: "forSaleItems",
  initialState,
  reducers: {
    clearForSaleError: (state) => {
      state.error = null;
    },
    resetForSaleCreateSuccess: (state) => {
      state.createSuccess = false;
    },
    clearCurrentForSaleListing: (state) => {
      state.currentListing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllForSaleItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllForSaleItems.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.listings || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchAllForSaleItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By ID
      .addCase(fetchForSaleItemById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchForSaleItemById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentListing = action.payload;
      })
      .addCase(fetchForSaleItemById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createForSaleListing.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createForSaleListing.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.listings.unshift(action.payload);
        state.myListings.unshift(action.payload);
      })
      .addCase(createForSaleListing.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateForSaleListing.fulfilled, (state, action) => {
        const index = state.listings.findIndex(
          (l) => l._id === action.payload._id
        );
        if (index !== -1) state.listings[index] = action.payload;
        const myIndex = state.myListings.findIndex(
          (l) => l._id === action.payload._id
        );
        if (myIndex !== -1) state.myListings[myIndex] = action.payload;
        if (state.currentListing?._id === action.payload._id) {
          state.currentListing = action.payload;
        }
      })

      // Delete
      .addCase(deleteForSaleListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter(
          (l) => l._id !== action.payload
        );
        state.myListings = state.myListings.filter(
          (l) => l._id !== action.payload
        );
      })

      // Upload Images
      .addCase(uploadForSaleImages.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadForSaleImages.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(uploadForSaleImages.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload;
      })

      // Toggle Save
      .addCase(toggleSaveForSaleItem.fulfilled, (state, action) => {
        const { id, saved } = action.payload;
        const listing = state.listings.find((l) => l._id === id);
        if (listing) listing._saved = saved;
        if (state.currentListing && state.currentListing._id === id) {
          state.currentListing._saved = saved;
        }
        if (saved) {
          const item =
            state.listings.find((l) => l._id === id) || state.currentListing;
          if (item && !state.savedItems.find((s) => s._id === id)) {
            state.savedItems.push(item);
          }
        } else {
          state.savedItems = state.savedItems.filter((s) => s._id !== id);
        }
      })

      // Fetch Saved
      .addCase(fetchSavedForSaleItems.pending, (state) => {
        state.savedLoading = true;
      })
      .addCase(fetchSavedForSaleItems.fulfilled, (state, action) => {
        state.savedLoading = false;
        state.savedItems = action.payload;
      })
      .addCase(fetchSavedForSaleItems.rejected, (state, action) => {
        state.savedLoading = false;
        state.error = action.payload;
      })

      // Fetch My Listings
      .addCase(fetchMyForSaleItems.pending, (state) => {
        state.myListingsLoading = true;
      })
      .addCase(fetchMyForSaleItems.fulfilled, (state, action) => {
        state.myListingsLoading = false;
        state.myListings = action.payload;
      })
      .addCase(fetchMyForSaleItems.rejected, (state, action) => {
        state.myListingsLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearForSaleError,
  resetForSaleCreateSuccess,
  clearCurrentForSaleListing,
} = forSaleItemsSlice.actions;

export default forSaleItemsSlice.reducer;
