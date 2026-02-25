import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api";

const initialState = {
  loginHistory: [],
  sessions: [],
  loading: false,
  error: null,
  success: false,
};

// Async Thunks
export const fetchLoginHistory = createAsyncThunk(
  "activity/fetchLoginHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getLoginHistory();
      return response.data.history;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchSessions = createAsyncThunk(
  "activity/fetchSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getSessions();
      return response.data.sessions;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const revokeSession = createAsyncThunk(
  "activity/revokeSession",
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await authAPI.revokeSession(tokenId);
      return { tokenId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    clearActivityError: (state) => {
      state.error = null;
    },
    resetActivitySuccess: (state) => {
      state.success = false;
    },
    clearActivityData: (state) => {
      state.loginHistory = [];
      state.sessions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Login History
      .addCase(fetchLoginHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoginHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.loginHistory = action.payload || [];
      })
      .addCase(fetchLoginHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Sessions
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload || [];
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Revoke Session
      .addCase(revokeSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter(
          (s) => s.tokenId !== action.payload.tokenId,
        );
        state.success = true;
      });
  },
});

export const { clearActivityError, resetActivitySuccess, clearActivityData } =
  activitySlice.actions;

export default activitySlice.reducer;
