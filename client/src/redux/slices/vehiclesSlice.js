import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { vehiclesAPI } from "../../services/api";

// ==================== Async Thunks ====================

export const fetchAllVehicles = createAsyncThunk(
  "vehicles/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await vehiclesAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch vehicles"
      );
    }
  }
);

export const fetchVehicleById = createAsyncThunk(
  "vehicles/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await vehiclesAPI.getById(id);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch listing"
      );
    }
  }
);

export const createVehicleListing = createAsyncThunk(
  "vehicles/create",
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await vehiclesAPI.create(listingData);
      return response.data.listing;
    } catch (error) {
      const data = error.response?.data;
      if (data?.errors && typeof data.errors === 'object') {
        const fieldErrors = Object.values(data.errors).join('. ');
        return rejectWithValue(fieldErrors);
      }
      return rejectWithValue(
        data?.message || error.message || "Failed to create listing"
      );
    }
  }
);

export const updateVehicleListing = createAsyncThunk(
  "vehicles/update",
  async ({ id, listingData }, { rejectWithValue }) => {
    try {
      const response = await vehiclesAPI.update(id, listingData);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update listing"
      );
    }
  }
);

export const deleteVehicleListing = createAsyncThunk(
  "vehicles/delete",
  async (id, { rejectWithValue }) => {
    try {
      await vehiclesAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete listing"
      );
    }
  }
);

export const uploadVehicleImages = createAsyncThunk(
  "vehicles/uploadImages",
  async ({ files, onProgress }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const response = await vehiclesAPI.uploadImages(formData, onProgress);
      return response.data.imageUrls;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to upload images"
      );
    }
  }
);

export const toggleSaveVehicle = createAsyncThunk(
  "vehicles/toggleSave",
  async (id, { rejectWithValue }) => {
    try {
      const response = await vehiclesAPI.toggleSave(id);
      return { id, saved: response.data.saved };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to save listing"
      );
    }
  }
);

export const fetchSavedVehicles = createAsyncThunk(
  "vehicles/fetchSaved",
  async (_, { rejectWithValue }) => {
    try {
      const response = await vehiclesAPI.getSaved();
      return response.data.listings || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch saved vehicles"
      );
    }
  }
);

export const fetchMyVehicles = createAsyncThunk(
  "vehicles/fetchMyListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await vehiclesAPI.getMyListings();
      return response.data.listings || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch my listings"
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

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    clearVehiclesError: (state) => {
      state.error = null;
    },
    resetVehicleCreateSuccess: (state) => {
      state.createSuccess = false;
    },
    clearCurrentVehicle: (state) => {
      state.currentListing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.listings || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By ID
      .addCase(fetchVehicleById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentListing = action.payload;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createVehicleListing.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createVehicleListing.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.listings.unshift(action.payload);
        // Also add to myListings so it shows up in Profile immediately
        state.myListings.unshift(action.payload);
      })
      .addCase(createVehicleListing.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateVehicleListing.fulfilled, (state, action) => {
        const index = state.listings.findIndex(
          (l) => l._id === action.payload._id
        );
        if (index !== -1) state.listings[index] = action.payload;
        // Also update in myListings
        const myIndex = state.myListings.findIndex(
          (l) => l._id === action.payload._id
        );
        if (myIndex !== -1) state.myListings[myIndex] = action.payload;
        if (state.currentListing?._id === action.payload._id) {
          state.currentListing = action.payload;
        }
      })

      // Delete
      .addCase(deleteVehicleListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter(
          (l) => l._id !== action.payload
        );
        state.myListings = state.myListings.filter(
          (l) => l._id !== action.payload
        );
      })

      // Upload Images
      .addCase(uploadVehicleImages.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadVehicleImages.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(uploadVehicleImages.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload;
      })

      // Toggle Save
      .addCase(toggleSaveVehicle.fulfilled, (state, action) => {
        const { id, saved } = action.payload;
        const listing = state.listings.find((l) => l._id === id);
        if (listing) {
          listing._saved = saved;
        }
        if (state.currentListing && state.currentListing._id === id) {
          state.currentListing._saved = saved;
        }
        if (saved) {
          const item = state.listings.find((l) => l._id === id) || state.currentListing;
          if (item && !state.savedItems.find((s) => s._id === id)) {
            state.savedItems.push(item);
          }
        } else {
          state.savedItems = state.savedItems.filter((s) => s._id !== id);
        }
      })

      // Fetch Saved Vehicles
      .addCase(fetchSavedVehicles.pending, (state) => {
        state.savedLoading = true;
      })
      .addCase(fetchSavedVehicles.fulfilled, (state, action) => {
        state.savedLoading = false;
        state.savedItems = action.payload;
      })
      .addCase(fetchSavedVehicles.rejected, (state, action) => {
        state.savedLoading = false;
        state.error = action.payload;
      })

      // Fetch My Listings
      .addCase(fetchMyVehicles.pending, (state) => {
        state.myListingsLoading = true;
      })
      .addCase(fetchMyVehicles.fulfilled, (state, action) => {
        state.myListingsLoading = false;
        state.myListings = action.payload;
      })
      .addCase(fetchMyVehicles.rejected, (state, action) => {
        state.myListingsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVehiclesError, resetVehicleCreateSuccess, clearCurrentVehicle } =
  vehiclesSlice.actions;

export default vehiclesSlice.reducer;
