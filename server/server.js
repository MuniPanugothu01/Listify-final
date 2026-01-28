require("dotenv").config();

const express = require("express");

const connectDB = require("./config/database");
const cors = require("cors");

// Create Express app
const app = express();
// cors middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Connect to database
connectDB();

// Route files
const authRoutes = require("./routes/authRoutes");

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routers
app.use("/api/auth", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Authentication API is running!",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      register: "/api/auth/register",
      login: "/api/auth/login",
      profile: "/api/auth/profile",
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
