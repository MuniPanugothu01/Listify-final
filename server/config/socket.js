const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { logger } = require("../utils/logger");

// Map userId → Set of socketIds (supports multiple tabs/devices)
const onlineUsers = new Map();

let io = null;

/**
 * Initialize Socket.IO on the existing HTTP server.
 * Call this once from server.js after app.listen().
 */
function initSocket(httpServer, corsOptions) {
  io = new Server(httpServer, {
    cors: {
      origin: corsOptions.origin,
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // ── Auth middleware — verify JWT from handshake ──
  io.use(async (socket, next) => {
    try {
      // Try cookie first, then auth header
      const cookieHeader = socket.handshake.headers.cookie || "";
      let token = null;

      // Parse accessToken from cookies
      const cookies = Object.fromEntries(
        cookieHeader.split(";").map((c) => {
          const [k, ...v] = c.trim().split("=");
          return [k, v.join("=")];
        })
      );
      token = cookies.accessToken;

      // Fallback: auth query/header
      if (!token) {
        token =
          socket.handshake.auth?.token ||
          socket.handshake.headers?.authorization?.split(" ")[1];
      }

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await User.findById(decoded.id).select("name profileImage googleProfileImage avatar provider");
      if (!user) return next(new Error("User not found"));

      socket.userId = user._id.toString();
      socket.userName = user.name;
      next();
    } catch (err) {
      logger.warn("Socket auth failed:", err.message);
      next(new Error("Authentication failed"));
    }
  });

  // ── Connection handler ──
  io.on("connection", (socket) => {
    const userId = socket.userId;
    logger.info(`🔌 Socket connected: ${socket.userName} (${userId})`);

    // Track online status
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    // Broadcast online status
    io.emit("user:online", { userId });

    // ── Join personal room for targeted messages ──
    socket.join(`user:${userId}`);

    // ── Join a conversation room ──
    socket.on("conversation:join", (conversationId) => {
      socket.join(`conversation:${conversationId}`);
    });

    socket.on("conversation:leave", (conversationId) => {
      socket.leave(`conversation:${conversationId}`);
    });

    // ── Typing indicators ──
    socket.on("typing:start", ({ conversationId }) => {
      socket.to(`conversation:${conversationId}`).emit("typing:start", {
        conversationId,
        userId,
        userName: socket.userName,
      });
    });

    socket.on("typing:stop", ({ conversationId }) => {
      socket.to(`conversation:${conversationId}`).emit("typing:stop", {
        conversationId,
        userId,
      });
    });

    // ── Request online users list ──
    socket.on("users:online", () => {
      socket.emit("users:online", Array.from(onlineUsers.keys()));
    });

    // ── Disconnect ──
    socket.on("disconnect", () => {
      logger.info(`🔌 Socket disconnected: ${socket.userName} (${userId})`);

      const sockets = onlineUsers.get(userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          onlineUsers.delete(userId);
          io.emit("user:offline", { userId });
        }
      }
    });
  });

  return io;
}

/** Get the io instance (for emitting from controllers) */
function getIO() {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
}

/** Check if a user is online */
function isUserOnline(userId) {
  return onlineUsers.has(userId.toString());
}

module.exports = { initSocket, getIO, isUserOnline };
