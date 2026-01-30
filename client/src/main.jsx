import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/common/Loader";

// Get Google Client ID from environment
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Check if Google Client ID is available
console.log("🔐 Google Client ID available:", !!googleClientId);
if (googleClientId) {
  console.log(
    "📋 Google Client ID (first 20 chars):",
    googleClientId.substring(0, 20) + "...",
  );
}

// CHANGED: Removed GoogleOAuthProvider wrapper from here
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
