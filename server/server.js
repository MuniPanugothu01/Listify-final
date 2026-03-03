const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const compression = require("compression");
const connectDB = require("./config/database");
const mongoose = require("mongoose");
const redis = require("./config/redis");
const securityMiddleware = require("./middleware/security");

// Initialize Express app
const app = express();

// Trust first proxy (Vercel, Nginx, AWS ALB, etc.)
// Without this, req.ip is always the proxy IP and rate limiting
// applies globally instead of per-user. Also needed for secure cookies.
app.set('trust proxy', 1);

// ============== SECURITY MIDDLEWARE ==============

// Helmet — sets secure HTTP headers (HSTS, CSP, hide X-Powered-By, etc.)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // inline styles needed for some UI
      imgSrc: ["'self'", "data:", "blob:", "*.amazonaws.com", "*.googleusercontent.com"],
      connectSrc: ["'self'", process.env.CLIENT_URL || "http://localhost:5173"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow cross-origin images (S3, Google)
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
}));

// Custom security headers (X-Frame-Options, X-XSS-Protection, Referrer-Policy, etc.)
app.use(securityMiddleware);

// Compression — gzip responses for performance
app.use(compression());

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

// ============== REQUEST ID FOR TRACING ==============
app.use((req, res, next) => {
  const crypto = require('crypto');
  req.requestId = crypto.randomUUID();
  res.setHeader('X-Request-Id', req.requestId);
  next();
});

// Body parser — limit payload sizes to prevent DoS
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Cookie parser
app.use(cookieParser());

// Sanitize data — prevent NoSQL injection ($gt, $ne, etc.)
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`⚠️ Sanitized NoSQL injection attempt in ${key}`);
  },
}));

// Prevent HTTP Parameter Pollution
app.use(hpp());

// ============== RATE LIMITING ==============

// Global rate limiter — 200 requests per 15 min per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health',
});
app.use(globalLimiter);

// Strict auth rate limiter — 10 attempts per 15 min (login, register, forgot-password)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
    code: 'RATE_LIMITED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// OTP rate limiter — 5 attempts per 5 min
const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many OTP attempts. Please try again after 5 minutes.',
    code: 'RATE_LIMITED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Connect to database
connectDB().catch(console.error);

// Initialize Elasticsearch (optional — falls back to MongoDB $text search)
const { initElasticsearch } = require('./config/elasticsearch');
initElasticsearch().catch((err) => {
  console.log('ℹ️  Elasticsearch init skipped:', err.message);
});

// Routes
const authRoutes = require("./routes/authRoutes");
const electronicsRoutes = require("./routes/electronicsRoutes");
const vehiclesRoutes = require("./routes/vehiclesRoutes");
const searchRoutes = require("./routes/searchRoutes");
const cacheRoutes = require("./routes/cacheRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Apply strict rate limiter to auth routes
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);
app.use("/api/auth/register/verify", otpLimiter);
app.use("/api/auth/register/resend-otp", otpLimiter);
app.use("/api/auth/forgot-password/verify-otp", otpLimiter);
app.use("/api/auth/forgot-password/resend-otp", otpLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/electronics", electronicsRoutes);
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/cache", cacheRoutes);
app.use("/api/notifications", notificationRoutes);

// Health check
app.get("/health", async (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  const { getIsConnected } = require('./config/elasticsearch');
  const ListingCache = require('./services/listingCacheService');
  let cacheStats = {};
  try { cacheStats = await ListingCache.getStats(); } catch { /* ignore */ }

  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: dbStatus,
    redis: "connected",
    elasticsearch: getIsConnected() ? "connected" : "not configured (using MongoDB fallback)",
    cache: cacheStats,
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
  // Log internally but never expose internals to clients
  const { logger } = require('./utils/logger');
  logger.error('Unhandled error:', { message: err.message, stack: err.stack, path: req.originalUrl });

  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    success: false,
    // In production, use a generic message to avoid leaking internals
    message: isProduction && statusCode === 500
      ? 'An internal server error occurred'
      : (err.message || 'An error occurred'),
    ...(! isProduction && { stack: err.stack }),
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