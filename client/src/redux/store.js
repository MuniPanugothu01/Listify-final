import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import listingsReducer from "./slices/listingsSlice";
import messagesReducer from "./slices/messagesSlice";
import electronicsReducer from "./slices/electronicsSlice";
import vehiclesReducer from "./slices/vehiclesSlice";
import forSaleItemsReducer from "./slices/forSaleItemsSlice";
import draftListingsReducer from "./slices/draftListingsSlice";
import forSaleReducer from "./slices/forSaleSlice";

// Middleware
import { errorMiddleware, actionLoggerMiddleware } from "./middleware";

// ── Root reducer ──────────────────────────────────────────────────
// Devices & activity data lives in profileSlice (single source of truth).
// devicesSlice and activitySlice were removed to eliminate duplication.
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  listings: listingsReducer,
  messages: messagesReducer,
  electronics: electronicsReducer,
  vehicles: vehiclesReducer,
  forSaleItems: forSaleItemsReducer,
  draftListings: draftListingsReducer,
  forSale: forSaleReducer,
});

// ── Persist transforms ────────────────────────────────────────────
// Strip sensitive/ephemeral fields from auth before writing to localStorage
const authSanitizeTransform = createTransform(
  // inbound: state going INTO storage
  (inboundState) => {
    const { resetToken: _RT, resetEmail: _RE, registrationEmail: _REM, token: _T, ...safe } = inboundState;
    return safe;
  },
  // outbound: state coming OUT of storage (rehydrate)
  (outboundState) => ({
    ...outboundState,
    resetToken: "",
    resetEmail: "",
    registrationEmail: "",
    token: null,
  }),
  { whitelist: ["auth"] },
);

// ── Persist config ─────────────────────────────────────────────────
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "profile", "draftListings"],
  transforms: [authSanitizeTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ── Store ──────────────────────────────────────────────────────────
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      errorMiddleware,
      // Only add action logger in development
      ...(import.meta.env.MODE !== "production" ? [actionLoggerMiddleware] : []),
    ),
  devTools: import.meta.env.MODE !== "production",
});

const persistor = persistStore(store);

export const resetPersistedState = () => {
  persistor.purge();
};

export const pausePersistence = () => {
  persistor.pause();
};

export const resumePersistence = () => {
  persistor.persist();
};

export { store, persistor };
export default store;