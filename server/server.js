const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const mongoose = require("mongoose");
const redis = require("./config/redis");

// Initialize Express app
const app = express();

// ============== CORS Configuration ==============
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

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