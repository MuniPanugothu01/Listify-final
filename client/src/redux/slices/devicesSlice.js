import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api";

const initialState = {
  devices: [],
  currentDeviceId: null,
  loading: false,
  error: null,
  success: false,
};

// Async Thunks
export const fetchDevices = createAsyncThunk(
  "devices/fetchDevices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getDevices();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const revokeDevice = createAsyncThunk(
  "devices/revokeDevice",
  async (deviceId, { rejectWithValue }) => {
    try {
      const response = await authAPI.revokeDevice(deviceId);
      return { deviceId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchLoginHistory = createAsyncThunk(
  "devices/fetchLoginHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getLoginHistory();
      return response.data.history;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const getSessions = createAsyncThunk(
  "devices/getSessions",
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
  "devices/revokeSession",
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await authAPI.revokeSession(tokenId);
      return { tokenId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    clearDevicesError: (state) => {
      state.error = null;
    },
    resetDevicesSuccess: (state) => {
      state.success = false;
    },
    clearDevicesData: (state) => {
      state.devices = [];
      state.currentDeviceId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Devices
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload.devices || [];
        state.currentDeviceId = action.payload.currentDeviceId;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Revoke Device
      .addCase(revokeDevice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(revokeDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.devices = state.devices.filter(
          (d) => d.deviceId !== action.payload.deviceId,
        );
      })
      .addCase(revokeDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Login History
      .addCase(fetchLoginHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoginHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.loginHistory = action.payload;
      })
      .addCase(fetchLoginHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Sessions
      .addCase(getSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Revoke Session
      .addCase(revokeSession.fulfilled, (state, action) => {
        state.success = true;
        if (state.sessions) {
          state.sessions = state.sessions.filter(
            (s) => s.tokenId !== action.payload.tokenId,
          );
        }
      });
  },
});

export const { clearDevicesError, resetDevicesSuccess, clearDevicesData } =
  devicesSlice.actions;

export default devicesSlice.reducer;
