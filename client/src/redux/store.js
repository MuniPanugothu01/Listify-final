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
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import listingsReducer from "./slices/listingsSlice";
import messagesReducer from "./slices/messagesSlice";
import electronicsReducer from "./slices/electronicsSlice";
import vehiclesReducer from "./slices/vehiclesSlice";

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
});

// ── Persist config ─────────────────────────────────────────────────
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "profile"],
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