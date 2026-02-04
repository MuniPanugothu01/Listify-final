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
import authReducer from "./slices/authSlice";
// Import other reducers as needed:

// import userReducer from "./slices/userSlice";
// import taskReducer from "./slices/taskSlice";
// import notificationReducer from "./slices/notificationSlice";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  // task: taskReducer,
  // notification: notificationReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth, other states can be temporary
  // Or use blacklist to exclude specific states
  // blacklist: ["notification"], // Don't persist notifications
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
  // Optional: Enable dev tools only in development
  devTools: import.meta.env.MODE !== "production",
});

// Create persistor
const persistor = persistStore(store);

// Export functions to manage persistence
export const resetPersistedState = () => {
  persistor.purge(); // Clear all persisted data
};

export const pausePersistence = () => {
  persistor.pause(); // Pause persistence
};

export const resumePersistence = () => {
  persistor.persist(); // Resume persistence
};

// Export store and persistor
export default store;
export { persistor };
