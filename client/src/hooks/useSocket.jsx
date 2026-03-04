import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { useAppSelector } from "../redux/hooks/useRedux";

const SocketContext = createContext(null);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Disconnect if user logs out
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setConnected(false);
        setOnlineUsers([]);
      }
      return;
    }

    // Connect with cookies (withCredentials)
    const socket = io(BACKEND_URL || window.location.origin, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket.id);
      setConnected(true);
      // Request current online users list
      socket.emit("users:online");
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
      setConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.warn("🔌 Socket connection error:", err.message);
    });

    // Online presence
    socket.on("users:online", (users) => {
      setOnlineUsers(users);
    });
    socket.on("user:online", ({ userId }) => {
      setOnlineUsers((prev) => (prev.includes(userId) ? prev : [...prev, userId]));
    });
    socket.on("user:offline", ({ userId }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, [isAuthenticated]);

  const joinConversation = useCallback((conversationId) => {
    socketRef.current?.emit("conversation:join", conversationId);
  }, []);

  const leaveConversation = useCallback((conversationId) => {
    socketRef.current?.emit("conversation:leave", conversationId);
  }, []);

  const emitTyping = useCallback((conversationId, isTyping) => {
    if (isTyping) {
      socketRef.current?.emit("typing:start", { conversationId });
    } else {
      socketRef.current?.emit("typing:stop", { conversationId });
    }
  }, []);

  const value = {
    socket: socketRef.current,
    connected,
    onlineUsers,
    joinConversation,
    leaveConversation,
    emitTyping,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
