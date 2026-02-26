import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { electronicsAPI } from "../../services/api";

// ==================== Async Thunks ====================

export const fetchAllElectronics = createAsyncThunk(
  "electronics/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await electronicsAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch electronics"
      );
    }
  }
);

export const fetchElectronicsById = createAsyncThunk(
  "electronics/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await electronicsAPI.getById(id);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch listing"
      );
    }
  }
);

export const createElectronicsListing = createAsyncThunk(
  "electronics/create",
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await electronicsAPI.create(listingData);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to create listing"
      );
    }
  }
);

export const updateElectronicsListing = createAsyncThunk(
  "electronics/update",
  async ({ id, listingData }, { rejectWithValue }) => {
    try {
      const response = await electronicsAPI.update(id, listingData);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update listing"
      );
    }
  }
);

export const deleteElectronicsListing = createAsyncThunk(
  "electronics/delete",
  async (id, { rejectWithValue }) => {
    try {
      await electronicsAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete listing"
      );
    }
  }
);

export const uploadElectronicsImages = createAsyncThunk(
  "electronics/uploadImages",
  async ({ files, onProgress }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const response = await electronicsAPI.uploadImages(formData, onProgress);
      return response.data.imageUrls;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to upload images"
      );
    }
  }
);

export const toggleSaveElectronics = createAsyncThunk(
  "electronics/toggleSave",
  async (id, { rejectWithValue }) => {
    try {
      const response = await electronicsAPI.toggleSave(id);
      return { id, saved: response.data.saved };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to save listing"
      );
    }
  }
);

export const fetchSavedElectronics = createAsyncThunk(
  "electronics/fetchSaved",
  async (_, { rejectWithValue }) => {
    try {
      const response = await electronicsAPI.getSaved();
      return response.data.listings || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch saved electronics"
      );
    }
  }
);

export const fetchMyElectronics = createAsyncThunk(
  "electronics/fetchMyListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await electronicsAPI.getMyListings();
      return response.data.listings || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch my listings"
      );
    }
  }
);

// ==================== Slice ==

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

const electronicsSlice = createSlice({
  name: "electronics",
  initialState,
  reducers: {
    clearElectronicsError: (state) => {
      state.error = null;
    },
    resetCreateSuccess: (state) => {
      state.createSuccess = false;
    },
    clearCurrentListing: (state) => {
      state.currentListing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllElectronics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllElectronics.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.listings || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchAllElectronics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By ID
      .addCase(fetchElectronicsById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchElectronicsById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentListing = action.payload;
      })
      .addCase(fetchElectronicsById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createElectronicsListing.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createElectronicsListing.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.listings.unshift(action.payload);
      })
      .addCase(createElectronicsListing.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateElectronicsListing.fulfilled, (state, action) => {
        const index = state.listings.findIndex(
          (l) => l._id === action.payload._id
        );
        if (index !== -1) state.listings[index] = action.payload;
        if (state.currentListing?._id === action.payload._id) {
          state.currentListing = action.payload;
        }
      })

      // Delete
      .addCase(deleteElectronicsListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter(
          (l) => l._id !== action.payload
        );
        state.myListings = state.myListings.filter(
          (l) => l._id !== action.payload
        );
      })

      // Upload Images
      .addCase(uploadElectronicsImages.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadElectronicsImages.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(uploadElectronicsImages.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload;
      })

      // Toggle Save
      .addCase(toggleSaveElectronics.fulfilled, (state, action) => {
        const { id, saved } = action.payload;
        // Update in listings array
        const listing = state.listings.find((l) => l._id === id);
        if (listing) {
          listing._saved = saved;
        }
        // Update current listing if viewing it
        if (state.currentListing && state.currentListing._id === id) {
          state.currentListing._saved = saved;
        }
        // Update savedItems: add or remove
        if (saved) {
          const item = state.listings.find((l) => l._id === id) || state.currentListing;
          if (item && !state.savedItems.find((s) => s._id === id)) {
            state.savedItems.push(item);
          }
        } else {
          state.savedItems = state.savedItems.filter((s) => s._id !== id);
        }
      })

      // Fetch Saved Electronics
      .addCase(fetchSavedElectronics.pending, (state) => {
        state.savedLoading = true;
      })
      .addCase(fetchSavedElectronics.fulfilled, (state, action) => {
        state.savedLoading = false;
        state.savedItems = action.payload;
      })
      .addCase(fetchSavedElectronics.rejected, (state, action) => {
        state.savedLoading = false;
        state.error = action.payload;
      })

      // Fetch My Listings
      .addCase(fetchMyElectronics.pending, (state) => {
        state.myListingsLoading = true;
      })
      .addCase(fetchMyElectronics.fulfilled, (state, action) => {
        state.myListingsLoading = false;
        state.myListings = action.payload;
      })
      .addCase(fetchMyElectronics.rejected, (state, action) => {
        state.myListingsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearElectronicsError, resetCreateSuccess, clearCurrentListing } =
  electronicsSlice.actions;

export default electronicsSlice.reducer;
