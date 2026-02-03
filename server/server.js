require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require("cors");
const crypto = require("crypto");
const connectDB = require("./config/database");
const passport = require("./config/passport");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();

// Simple CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your React app URL
  credentials: true, // Allow cookies/sessions
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Generate secure session secret
const generateSecureSecret = () => {
  return process.env.SESSION_SECRET || crypto.randomBytes(64).toString('hex');
};

// MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 7, // 7 days
});

// Session store error handling
store.on('error', function(error) {
  console.error('MongoDB Session Store Error:', error);
});

// Session configuration
const sessionConfig = {
  secret: generateSecureSecret(),
  resave: false,
  saveUninitialized: false,
  store: store,
  name: 'listify.sid',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
};

// Apply session middleware
app.use(session(sessionConfig));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to database
connectDB();

// Route files
const authRoutes = require("./routes/authRoutes");

// Mount routers
app.use("/api/auth", authRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    session: req.sessionID ? 'Active' : 'No session'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
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
    path: req.originalUrl,
    method: req.method,
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'An error occurred',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack 
    }),
  });
});

// Start server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 CORS enabled for: http://localhost:5173`);
  console.log(`📝 Session storage: MongoDB`);
});

// Handle graceful shutdown
const shutdown = () => {
  console.log('Shutting down gracefully...');
  
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

module.exports = app;