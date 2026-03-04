const Notification = require("../models/Notification");
const { logger } = require("../utils/logger");
const { encrypt, decrypt, isEncryptionEnabled } = require("../services/encryptionService");

// Helper: set no-cache headers on sensitive responses
const setNoCacheHeaders = (res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
};

// ==================== GET NOTIFICATIONS ====================
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("sender", "name profileImage googleProfileImage avatar provider")
        .lean(),
      Notification.countDocuments({ recipient: userId }),
      Notification.countDocuments({ recipient: userId, read: false }),
    ]);

    // Attach sender profile image URL and decrypt message
    const formatted = notifications.map((n) => {
      const s = n.sender;
      const profileImageUrl = s
        ? s.profileImage || s.googleProfileImage || s.avatar || null
        : null;
      return {
        ...n,
        message: decrypt(n.message),
        sender: s
          ? {
              id: s._id,
              name: s.name,
              profileImageUrl,
              provider: s.provider,
            }
          : null,
      };
    });

    setNoCacheHeaders(res);
    res.status(200).json({
      success: true,
      notifications: formatted,
      encrypted: isEncryptionEnabled(),
      unreadCount,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    logger.error("Get notifications error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch notifications" });
  }
};

// ==================== GET UNREAD COUNT ====================
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      read: false,
    });
    setNoCacheHeaders(res);
    res.status(200).json({ success: true, unreadCount: count });
  } catch (error) {
    logger.error("Get unread count error:", error);
    res.status(500).json({ success: false, message: "Failed to get unread count" });
  }
};

// ==================== MARK AS READ ====================
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndUpdate(
      { _id: id, recipient: req.user.id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    logger.error("Mark notification read error:", error);
    res.status(500).json({ success: false, message: "Failed to mark notification as read" });
  }
};

// ==================== MARK ALL AS READ ====================
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { read: true }
    );
    res.status(200).json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    logger.error("Mark all notifications read error:", error);
    res.status(500).json({ success: false, message: "Failed to mark all as read" });
  }
};

// ==================== DELETE NOTIFICATION ====================
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    logger.error("Delete notification error:", error);
    res.status(500).json({ success: false, message: "Failed to delete notification" });
  }
};

// ==================== CREATE NOTIFICATION (internal helper) ====================
exports.createNotification = async ({ recipient, sender, type, message, metadata = {} }) => {
  try {
    // Guard against missing recipient/sender
    if (!recipient || !sender) return null;

    // Don't notify yourself
    if (recipient.toString() === sender.toString()) return null;

    // Encrypt notification message before storing
    const encryptedMessage = encrypt(message);

    const notification = await Notification.create({
      recipient,
      sender,
      type,
      message: encryptedMessage,
      metadata,
    });

    logger.info("🔔 Notification created", { type, recipient, sender });
    return notification;
  } catch (error) {
    logger.error("Create notification error:", error);
    return null;
  }
};
