import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listingsAPI } from "../../services/api";

const initialState = {
  myPosts: [],
  savedHouses: [],
  myAlerts: [],
  loading: false,
  error: null,
  success: false,
};

// Async Thunks
export const fetchMyListings = createAsyncThunk(
  "listings/fetchMyListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.getMyListings();
      return response.data.listings;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchSavedItems = createAsyncThunk(
  "listings/fetchSavedItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.getSavedItems();
      return response.data.savedItems;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const toggleSaveItem = createAsyncThunk(
  "listings/toggleSaveItem",
  async (itemId, { rejectWithValue, getState }) => {
    try {
      const response = await listingsAPI.toggleSaveItem(itemId);
      return { itemId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchAlerts = createAsyncThunk(
  "listings/fetchAlerts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.getAlerts();
      return response.data.alerts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const createAlert = createAsyncThunk(
  "listings/createAlert",
  async (alertData, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.createAlert(alertData);
      return response.data.alert;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteAlert = createAsyncThunk(
  "listings/deleteAlert",
  async (alertId, { rejectWithValue }) => {
    try {
      await listingsAPI.deleteAlert(alertId);
      return alertId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const createListing = createAsyncThunk(
  "listings/createListing",
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.createListing(listingData);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateListing = createAsyncThunk(
  "listings/updateListing",
  async ({ listingId, listingData }, { rejectWithValue }) => {
    try {
      const response = await listingsAPI.updateListing(listingId, listingData);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async (listingId, { rejectWithValue }) => {
    try {
      await listingsAPI.deleteListing(listingId);
      return listingId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    clearListingsError: (state) => {
      state.error = null;
    },
    resetListingsSuccess: (state) => {
      state.success = false;
    },
    addSavedItem: (state, action) => {
      state.savedHouses.push(action.payload);
    },
    removeSavedItem: (state, action) => {
      state.savedHouses = state.savedHouses.filter(
        (item) => item.id !== action.payload,
      );
    },
    clearListingsData: (state) => {
      state.myPosts = [];
      state.savedHouses = [];
      state.myAlerts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch My Listings
      .addCase(fetchMyListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyListings.fulfilled, (state, action) => {
        state.loading = false;
        state.myPosts = action.payload || [];
      })
      .addCase(fetchMyListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Saved Items
      .addCase(fetchSavedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.savedHouses = action.payload || [];
      })
      .addCase(fetchSavedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle Save Item
      .addCase(toggleSaveItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSaveItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update will be handled by the fetch calls
      })
      .addCase(toggleSaveItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Alerts
      .addCase(fetchAlerts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.myAlerts = action.payload || [];
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Alert
      .addCase(createAlert.fulfilled, (state, action) => {
        state.myAlerts.unshift(action.payload);
        state.success = true;
      })

      // Delete Alert
      .addCase(deleteAlert.fulfilled, (state, action) => {
        state.myAlerts = state.myAlerts.filter(
          (alert) => alert.id !== action.payload,
        );
        state.success = true;
      })

      // Create Listing
      .addCase(createListing.fulfilled, (state, action) => {
        state.myPosts.unshift(action.payload);
        state.success = true;
      })

      // Update Listing
      .addCase(updateListing.fulfilled, (state, action) => {
        const index = state.myPosts.findIndex(
          (p) => p.id === action.payload.id,
        );
        if (index !== -1) {
          state.myPosts[index] = action.payload;
        }
        state.success = true;
      })

      // Delete Listing
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.myPosts = state.myPosts.filter((p) => p.id !== action.payload);
        state.success = true;
      });
  },
});

export const {
  clearListingsError,
  resetListingsSuccess,
  addSavedItem,
  removeSavedItem,
  clearListingsData,
} = listingsSlice.actions;

export default listingsSlice.reducer;
