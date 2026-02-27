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

// Import reducers
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import listingsReducer from "./slices/listingsSlice";
import messagesReducer from "./slices/messagesSlice";
import devicesReducer from "./slices/devicesSlice";
import activityReducer from "./slices/activitySlice";
import electronicsReducer from "./slices/electronicsSlice";
import vehiclesReducer from "./slices/vehiclesSlice";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  listings: listingsReducer,
  messages: messagesReducer,
  devices: devicesReducer,
  activity: activityReducer,
  electronics: electronicsReducer,
  vehicles: vehiclesReducer,
});

// Persist config — cache auth + profile for production-level image persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "profile"], // Persist both for image caching across reloads
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE !== "production",
});

// Create persistor
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