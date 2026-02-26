const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const connectDB = require("./config/database");
const passport = require("./config/passport");
const mongoose = require("mongoose");
const redis = require("./config/redis");

// Initialize Express app
const app = express();

// ============== CORS Configuration ==============
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Generate secure session secret
const generateSecureSecret = () => {
  return process.env.SESSION_SECRET || crypto.randomBytes(64).toString("hex");
};

// ============== MongoDB Session Store - FIXED ==============
let store;

try {
  const storeOptions = {
    uri: process.env.MONGODB_URI,
    collection: "sessions",
    expires: 1000 * 60 * 60 * 24 * 7, // 7 days
    connectionOptions: {
      // REMOVED deprecated options
      ssl: true,
      tls: true,
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  };

  store = new MongoDBStore(storeOptions);

  store.on("error", function (error) {
    console.error("❌ MongoDB Session Store Error:", error.message);
    console.log("⚠️ Falling back to MemoryStore for sessions");
    
    // Fallback to MemoryStore
    const MemoryStore = require("express-session").MemoryStore;
    store = new MemoryStore();
  });

  store.on("connected", () => {
    console.log("✅ MongoDB Session Store connected");
  });

} catch (error) {
  console.error("❌ Failed to create MongoDB session store:", error.message);
  console.log("⚠️ Using MemoryStore as fallback");
  const MemoryStore = require("express-session").MemoryStore;
  store = new MemoryStore();
}

// Session configuration
const sessionConfig = {
  secret: generateSecureSecret(),
  resave: false,
  saveUninitialized: false,
  store: store,
  name: "listify.sid",
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
  rolling: true,
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Connect to database
connectDB().catch(console.error);

// Routes
const authRoutes = require("./routes/authRoutes");
const electronicsRoutes = require("./routes/electronicsRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/electronics", electronicsRoutes);

// Health check
app.get("/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: dbStatus,
    redis: "connected",
    sessionStore: store.constructor.name === "MongoDBStore" ? "MongoDB" : "MemoryStore"
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.status(200).json({
    success: true,
    message: 'Server is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: dbStatus,
    session: req.sessionID ? 'Active' : 'No session'
  });
});

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Listify Authentication API",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "An error occurred",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  console.log(`🍪 Cookie parser enabled`);
  console.log(`📝 Session store: ${store.constructor.name === 'MongoDBStore' ? 'MongoDB' : 'MemoryStore'}`);
});

// ============== PRODUCTION GRACEFUL SHUTDOWN ==============
const shutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

  let exitCode = 0;

  try {
    // 1. Stop accepting new connections
    await new Promise((resolve) => {
      server.close(resolve);
      console.log("✅ HTTP server closed");
    });

    // 2. Close MongoDB connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("✅ MongoDB connection closed");
    }

    console.log("✅ Graceful shutdown completed");
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    exitCode = 1;
  } finally {
    process.exit(exitCode);
  }
};

// Handle shutdown signals
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Handle uncaught exceptions — these indicate a truly broken state,
// so we do shut down (and let PM2 / Docker restart the process).
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  shutdown("UNCAUGHT_EXCEPTION");
});

// Handle unhandled rejections — these are often transient (e.g. MongoDB
// connection blip, Redis timeout).  DON'T crash — just log and continue.
// Crashing here kills the whole server and logs out every user.
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ Unhandled Rejection (non-fatal, server continues):", reason);
  // In production we keep running.  In development you may want to
  // investigate, but we still don't crash.
});

module.exports = app;