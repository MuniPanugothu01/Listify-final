const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const { getIO } = require("../config/socket");
const { createNotification } = require("./notificationController");
const { logger } = require("../utils/logger");
const { encrypt, decrypt, isEncryptionEnabled } = require("../services/encryptionService");

// Helper: set no-cache headers on sensitive responses
const setNoCacheHeaders = (res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
};

// Helper: format user for response
const formatUser = (u) => {
  if (!u) return null;
  return {
    id: u._id,
    name: u.name,
    profileImageUrl: u.profileImage || u.googleProfileImage || u.avatar || null,
    provider: u.provider,
  };
};

// ==================== GET OR CREATE CONVERSATION ====================
// POST /api/chat/conversations
// Body: { recipientId, listingId?, listingType?, listingTitle? }
exports.getOrCreateConversation = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientId, listingId, listingType, listingTitle } = req.body;

    if (!recipientId) {
      return res.status(400).json({ success: false, message: "recipientId is required" });
    }
    if (recipientId === senderId) {
      return res.status(400).json({ success: false, message: "Cannot message yourself" });
    }

    // Check recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ success: false, message: "Recipient not found" });
    }

    // Try to find existing conversation between these two users for this listing
    const query = {
      participants: { $all: [senderId, recipientId], $size: 2 },
    };
    if (listingId && listingType) {
      query["listing.listingId"] = listingId;
      query["listing.listingType"] = listingType;
    } else {
      // General conversation (no listing)
      query.$or = [
        { "listing.listingId": null },
        { "listing.listingId": { $exists: false } },
      ];
    }

    let conversation = await Conversation.findOne(query)
      .populate("participants", "name profileImage googleProfileImage avatar provider")
      .populate({
        path: "lastMessage",
        select: "content sender createdAt",
      });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recipientId],
        listing: listingId
          ? { listingId, listingType, listingTitle }
          : { listingId: null, listingType: null, listingTitle: null },
        unreadCounts: new Map([[recipientId, 0], [senderId, 0]]),
      });
      conversation = await Conversation.findById(conversation._id)
        .populate("participants", "name profileImage googleProfileImage avatar provider")
        .populate({
          path: "lastMessage",
          select: "content sender createdAt",
        });
    }

    // Format — decrypt lastMessage content if present
    const lastMsg = conversation.lastMessage;
    const formatted = {
      _id: conversation._id,
      participants: conversation.participants.map(formatUser),
      listing: conversation.listing,
      lastMessage: lastMsg
        ? { ...lastMsg.toObject ? lastMsg.toObject() : lastMsg, content: decrypt(lastMsg.content) }
        : null,
      unreadCount: conversation.unreadCounts?.get(senderId) || 0,
      updatedAt: conversation.updatedAt,
      createdAt: conversation.createdAt,
    };

    setNoCacheHeaders(res);
    res.status(200).json({ success: true, conversation: formatted, encrypted: isEncryptionEnabled() });
  } catch (error) {
    logger.error("Get/create conversation error:", error);
    res.status(500).json({ success: false, message: "Failed to get conversation" });
  }
};

// ==================== GET ALL CONVERSATIONS ====================
// GET /api/chat/conversations
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({ participants: userId })
      .sort({ updatedAt: -1 })
      .populate("participants", "name profileImage googleProfileImage avatar provider")
      .populate({
        path: "lastMessage",
        select: "content sender createdAt",
      })
      .lean();

    const formatted = conversations.map((c) => ({
      _id: c._id,
      participants: c.participants.map(formatUser),
      listing: c.listing,
      lastMessage: c.lastMessage
        ? { ...c.lastMessage, content: decrypt(c.lastMessage.content) }
        : null,
      unreadCount: c.unreadCounts?.[userId] || 0,
      updatedAt: c.updatedAt,
      createdAt: c.createdAt,
    }));

    setNoCacheHeaders(res);
    res.status(200).json({ success: true, conversations: formatted, encrypted: isEncryptionEnabled() });
  } catch (error) {
    logger.error("Get conversations error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch conversations" });
  }
};

// ==================== GET MESSAGES IN A CONVERSATION ====================
// GET /api/chat/conversations/:conversationId/messages?page=1&limit=50
exports.getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Verify user is a participant
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId,
    });
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }

    const [messages, total] = await Promise.all([
      Message.find({ conversation: conversationId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("sender", "name profileImage googleProfileImage avatar provider")
        .lean(),
      Message.countDocuments({ conversation: conversationId }),
    ]);

    const formatted = messages.map((m) => ({
      _id: m._id,
      sender: formatUser(m.sender),
      content: decrypt(m.content),
      readBy: m.readBy?.map((id) => id.toString()) || [],
      createdAt: m.createdAt,
    }));

    // Return in chronological order (oldest first)
    formatted.reverse();

    setNoCacheHeaders(res);
    res.status(200).json({
      success: true,
      messages: formatted,
      encrypted: isEncryptionEnabled(),
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    logger.error("Get messages error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch messages" });
  }
};

// ==================== SEND MESSAGE ====================
// POST /api/chat/conversations/:conversationId/messages
// Body: { content }
exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Message content is required" });
    }

    // Verify participation
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId,
    });
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }

    // Encrypt content before storing
    const plainContent = content.trim();
    const encryptedContent = encrypt(plainContent);

    // Create message — stored ENCRYPTED in MongoDB
    let message = await Message.create({
      conversation: conversationId,
      sender: userId,
      content: encryptedContent,
      readBy: [userId], // sender has read it
    });

    // Update conversation
    conversation.lastMessage = message._id;
    // Increment unread for all other participants
    for (const pid of conversation.participants) {
      const pidStr = pid.toString();
      if (pidStr !== userId) {
        const current = conversation.unreadCounts?.get(pidStr) || 0;
        conversation.unreadCounts.set(pidStr, current + 1);
      }
    }
    await conversation.save();

    // Populate sender
    message = await Message.findById(message._id)
      .populate("sender", "name profileImage googleProfileImage avatar provider")
      .lean();

    // Response sends DECRYPTED content to the authenticated sender
    const formatted = {
      _id: message._id,
      sender: formatUser(message.sender),
      content: plainContent,
      readBy: message.readBy?.map((id) => id.toString()) || [],
      createdAt: message.createdAt,
      conversationId,
    };

    // ── Emit via Socket.IO (decrypted — sent over WSS to authenticated sockets only) ──
    try {
      const io = getIO();
      // Send to conversation room
      io.to(`conversation:${conversationId}`).emit("message:new", formatted);

      // Also notify each OTHER participant's personal room
      // (so their conversation list updates even if they aren't in this convo room)
      for (const pid of conversation.participants) {
        const pidStr = pid.toString();
        if (pidStr !== userId) {
          io.to(`user:${pidStr}`).emit("conversation:updated", {
            conversationId,
            lastMessage: {
              content: plainContent,
              sender: userId,
              createdAt: message.createdAt,
            },
          });
        }
      }
    } catch (_) {
      // Socket.IO not critical — message is saved
    }

    // Create notification for recipient(s)
    for (const pid of conversation.participants) {
      const pidStr = pid.toString();
      if (pidStr !== userId) {
        try {
          const senderUser = await User.findById(userId).select("name");
          await createNotification({
            recipient: pidStr,
            sender: userId,
            type: "message",
            message: `${senderUser?.name || "Someone"} sent you a message`,
            metadata: { conversationId },
          });
        } catch (_) {}
      }
    }

    setNoCacheHeaders(res);
    res.status(201).json({ success: true, message: formatted, encrypted: isEncryptionEnabled() });
  } catch (error) {
    logger.error("Send message error:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

// ==================== MARK CONVERSATION AS READ ====================
// PUT /api/chat/conversations/:conversationId/read
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId,
    });
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }

    // Reset unread count
    conversation.unreadCounts.set(userId, 0);
    await conversation.save();

    // Mark all messages in this conversation as read by this user
    await Message.updateMany(
      {
        conversation: conversationId,
        readBy: { $ne: userId },
      },
      { $addToSet: { readBy: userId } }
    );

    // Notify other participants that messages were read
    try {
      const io = getIO();
      io.to(`conversation:${conversationId}`).emit("messages:read", {
        conversationId,
        userId,
      });
    } catch (_) {}

    setNoCacheHeaders(res);
    res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error) {
    logger.error("Mark as read error:", error);
    res.status(500).json({ success: false, message: "Failed to mark as read" });
  }
};

// ==================== GET TOTAL UNREAD COUNT ====================
// GET /api/chat/unread-count
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await Conversation.find({ participants: userId }).lean();
    
    let totalUnread = 0;
    for (const c of conversations) {
      totalUnread += c.unreadCounts?.[userId] || 0;
    }

    setNoCacheHeaders(res);
    res.status(200).json({ success: true, unreadCount: totalUnread });
  } catch (error) {
    logger.error("Get unread count error:", error);
    res.status(500).json({ success: false, message: "Failed to get unread count" });
  }
};
