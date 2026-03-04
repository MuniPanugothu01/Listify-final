const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getOrCreateConversation,
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
  getUnreadCount,
} = require("../controllers/chatController");

// All routes are protected
router.use(protect);

// Conversations
router.post("/conversations", getOrCreateConversation);
router.get("/conversations", getConversations);

// Messages within a conversation
router.get("/conversations/:conversationId/messages", getMessages);
router.post("/conversations/:conversationId/messages", sendMessage);
router.put("/conversations/:conversationId/read", markAsRead);

// Unread count across all conversations
router.get("/unread-count", getUnreadCount);

module.exports = router;
