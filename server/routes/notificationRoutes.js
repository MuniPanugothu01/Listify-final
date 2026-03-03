const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const notificationController = require("../controllers/notificationController");

// All notification routes require authentication
router.use(protect);

// GET /api/notifications — list notifications (paginated)
router.get("/", notificationController.getNotifications);

// GET /api/notifications/unread-count — quick unread badge count
router.get("/unread-count", notificationController.getUnreadCount);

// PUT /api/notifications/read-all — mark all as read
router.put("/read-all", notificationController.markAllAsRead);

// PUT /api/notifications/:id/read — mark single as read
router.put("/:id/read", notificationController.markAsRead);

// DELETE /api/notifications/:id — delete single notification
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
