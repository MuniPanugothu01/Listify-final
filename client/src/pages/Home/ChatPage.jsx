import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useRedux";
import { chatAPI } from "../../services/api";
import { useSocket } from "../../hooks/useSocket";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaSearch,
  FaCircle,
  FaEllipsisV,
  FaComments,
} from "react-icons/fa";
import toast from "react-hot-toast";

const STATIC_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

// ────────────────────────────────────────────────────────────
// TIME HELPER
// ────────────────────────────────────────────────────────────
const formatTime = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now - d;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString();
};

const formatMessageTime = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// ────────────────────────────────────────────────────────────
// CHAT PAGE
// ────────────────────────────────────────────────────────────
const ChatPage = ({ embedded = false }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAppSelector((state) => state.auth);
  const { socket, onlineUsers, joinConversation, leaveConversation, emitTyping } = useSocket();

  // State
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingConvos, setLoadingConvos] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typingUsers, setTypingUsers] = useState({});
  const [showMobileChat, setShowMobileChat] = useState(false);

  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const currentUserId = user?.id || user?._id;

  // ── Fetch conversations ──
  const fetchConversations = useCallback(async () => {
    try {
      setLoadingConvos(true);
      const res = await chatAPI.getConversations();
      setConversations(res.data?.conversations || []);
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
    } finally {
      setLoadingConvos(false);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // ── Handle deep-link: ?recipientId=xxx&listingId=yyy&listingType=zzz&listingTitle=...
  useEffect(() => {
    const recipientId = searchParams.get("recipientId");
    if (recipientId && currentUserId) {
      const listing = {};
      if (searchParams.get("listingId")) listing.listingId = searchParams.get("listingId");
      if (searchParams.get("listingType")) listing.listingType = searchParams.get("listingType");
      if (searchParams.get("listingTitle")) listing.listingTitle = searchParams.get("listingTitle");

      (async () => {
        try {
          const res = await chatAPI.getOrCreateConversation(recipientId, listing);
          const convo = res.data?.conversation;
          if (convo) {
            // Add to list if not already there
            setConversations((prev) => {
              const exists = prev.find((c) => c._id === convo._id);
              return exists ? prev : [convo, ...prev];
            });
            setActiveConversation(convo);
            setShowMobileChat(true);
          }
        } catch (err) {
          console.error("Failed to open conversation:", err);
          toast.error("Could not open conversation");
        }
      })();
    }
  }, [searchParams, currentUserId]);

  // ── Fetch messages when active conversation changes ──
  useEffect(() => {
    if (!activeConversation) return;

    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const res = await chatAPI.getMessages(activeConversation._id);
        setMessages(res.data?.messages || []);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
    chatAPI.markAsRead(activeConversation._id).catch(() => {});

    // Update local unread to 0
    setConversations((prev) =>
      prev.map((c) => (c._id === activeConversation._id ? { ...c, unreadCount: 0 } : c))
    );
  }, [activeConversation?._id]);

  // ── Socket.IO event handlers ──
  useEffect(() => {
    if (!socket || !activeConversation) return;

    joinConversation(activeConversation._id);

    const handleNewMessage = (msg) => {
      if (msg.conversationId === activeConversation._id) {
        setMessages((prev) => [...prev, msg]);
        // Mark as read since user is viewing this conversation
        chatAPI.markAsRead(activeConversation._id).catch(() => {});
      }
    };

    const handleConversationUpdated = ({ conversationId, lastMessage }) => {
      setConversations((prev) =>
        prev.map((c) =>
          c._id === conversationId
            ? {
                ...c,
                lastMessage,
                unreadCount:
                  conversationId === activeConversation?._id
                    ? 0
                    : (c.unreadCount || 0) + 1,
              }
            : c
        )
      );
    };

    const handleTypingStart = ({ conversationId, userId, userName }) => {
      if (conversationId === activeConversation._id && userId !== currentUserId) {
        setTypingUsers((prev) => ({ ...prev, [userId]: userName }));
      }
    };

    const handleTypingStop = ({ conversationId, userId }) => {
      if (conversationId === activeConversation._id) {
        setTypingUsers((prev) => {
          const next = { ...prev };
          delete next[userId];
          return next;
        });
      }
    };

    const handleMessagesRead = ({ conversationId, userId }) => {
      if (conversationId === activeConversation._id && userId !== currentUserId) {
        setMessages((prev) =>
          prev.map((m) =>
            m.readBy && !m.readBy.includes(userId)
              ? { ...m, readBy: [...m.readBy, userId] }
              : m
          )
        );
      }
    };

    socket.on("message:new", handleNewMessage);
    socket.on("conversation:updated", handleConversationUpdated);
    socket.on("typing:start", handleTypingStart);
    socket.on("typing:stop", handleTypingStop);
    socket.on("messages:read", handleMessagesRead);

    return () => {
      leaveConversation(activeConversation._id);
      socket.off("message:new", handleNewMessage);
      socket.off("conversation:updated", handleConversationUpdated);
      socket.off("typing:start", handleTypingStart);
      socket.off("typing:stop", handleTypingStop);
      socket.off("messages:read", handleMessagesRead);
    };
  }, [socket, activeConversation?._id, currentUserId, joinConversation, leaveConversation]);

  // Also listen for conversation:updated globally (when not viewing that convo)
  useEffect(() => {
    if (!socket) return;

    const handleGlobalConvoUpdate = ({ conversationId, lastMessage }) => {
      setConversations((prev) => {
        const updated = prev.map((c) =>
          c._id === conversationId
            ? {
                ...c,
                lastMessage,
                unreadCount:
                  conversationId === activeConversation?._id
                    ? 0
                    : (c.unreadCount || 0) + 1,
              }
            : c
        );
        // Move updated convo to top
        const idx = updated.findIndex((c) => c._id === conversationId);
        if (idx > 0) {
          const [item] = updated.splice(idx, 1);
          updated.unshift(item);
        }
        return updated;
      });
    };

    socket.on("conversation:updated", handleGlobalConvoUpdate);
    return () => socket.off("conversation:updated", handleGlobalConvoUpdate);
  }, [socket, activeConversation?._id]);

  // ── Auto-scroll to bottom ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Send message ──
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation || sendingMessage) return;

    const content = newMessage.trim();
    setNewMessage("");
    setSendingMessage(true);

    // Optimistic update
    const optimisticMsg = {
      _id: `temp-${Date.now()}`,
      sender: { id: currentUserId, name: user?.name },
      content,
      createdAt: new Date().toISOString(),
      readBy: [currentUserId],
      pending: true,
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const res = await chatAPI.sendMessage(activeConversation._id, content);
      const savedMsg = res.data?.message;

      // Replace optimistic message with server response
      setMessages((prev) =>
        prev.map((m) => (m._id === optimisticMsg._id ? { ...savedMsg, pending: false } : m))
      );

      // Update conversation list
      setConversations((prev) =>
        prev.map((c) =>
          c._id === activeConversation._id
            ? { ...c, lastMessage: { content, sender: currentUserId, createdAt: savedMsg.createdAt } }
            : c
        )
      );

      // Stop typing indicator
      emitTyping(activeConversation._id, false);
    } catch (err) {
      console.error("Failed to send message:", err);
      toast.error("Failed to send message");
      // Remove optimistic message
      setMessages((prev) => prev.filter((m) => m._id !== optimisticMsg._id));
      setNewMessage(content);
    } finally {
      setSendingMessage(false);
      messageInputRef.current?.focus();
    }
  };

  // ── Typing indicator ──
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (activeConversation) {
      emitTyping(activeConversation._id, true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        emitTyping(activeConversation._id, false);
      }, 2000);
    }
  };

  // ── Get other participant ──
  const getOtherUser = (convo) => {
    if (!convo?.participants) return null;
    return convo.participants.find((p) => p.id?.toString() !== currentUserId && p._id?.toString() !== currentUserId) || convo.participants[0];
  };

  // ── Filtered conversations ──
  const filteredConversations = conversations.filter((c) => {
    if (!searchQuery) return true;
    const other = getOtherUser(c);
    return other?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const typingNames = Object.values(typingUsers);

  // ────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────
  return (
    <div className={`flex bg-gray-50 ${embedded ? 'h-[calc(100vh-10rem)] rounded-2xl overflow-hidden border border-gray-200' : 'h-screen'}`}>
      {/* ── SIDEBAR: Conversation List ── */}
      <div
        className={`${
          showMobileChat ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-[380px] lg:w-[420px] bg-white border-r border-gray-200`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {!embedded && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowLeft className="text-gray-600 text-sm" />
                </button>
              )}
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white border border-transparent focus:border-emerald-300 transition"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {loadingConvos ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <FaComments className="text-5xl text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No conversations yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Start a conversation from any listing page
              </p>
            </div>
          ) : (
            filteredConversations.map((convo) => {
              const other = getOtherUser(convo);
              const isActive = activeConversation?._id === convo._id;
              const isOnline = onlineUsers.includes(
                other?.id?.toString() || other?._id?.toString()
              );
              const lastMsg = convo.lastMessage;

              return (
                <div
                  key={convo._id}
                  onClick={() => {
                    setActiveConversation(convo);
                    setShowMobileChat(true);
                  }}
                  className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors border-b border-gray-50 ${
                    isActive ? "bg-emerald-50" : "hover:bg-gray-50"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={other?.profileImageUrl || STATIC_AVATAR}
                      alt={other?.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = STATIC_AVATAR;
                      }}
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {other?.name || "Unknown"}
                      </h3>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                        {formatTime(lastMsg?.createdAt || convo.updatedAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-sm text-gray-500 truncate">
                        {convo.listing?.listingTitle && (
                          <span className="text-emerald-600 font-medium">
                            {convo.listing.listingTitle} ·{" "}
                          </span>
                        )}
                        {lastMsg?.content || "No messages yet"}
                      </p>
                      {convo.unreadCount > 0 && (
                        <span className="ml-2 flex-shrink-0 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {convo.unreadCount > 9 ? "9+" : convo.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── MAIN: Chat Area ── */}
      <div
        className={`${
          showMobileChat ? "flex" : "hidden md:flex"
        } flex-col flex-1 bg-white`}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            {(() => {
              const other = getOtherUser(activeConversation);
              const isOnline = onlineUsers.includes(
                other?.id?.toString() || other?._id?.toString()
              );
              return (
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-200 bg-white">
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FaArrowLeft className="text-gray-600 text-sm" />
                  </button>
                  <div className="relative">
                    <img
                      src={other?.profileImageUrl || STATIC_AVATAR}
                      alt={other?.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = STATIC_AVATAR;
                      }}
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900 text-sm">
                      {other?.name || "Unknown"}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {isOnline ? (
                        <span className="text-green-500">Online</span>
                      ) : (
                        "Offline"
                      )}
                      {activeConversation.listing?.listingTitle && (
                        <span className="ml-2 text-gray-400">
                          · {activeConversation.listing.listingTitle}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FaComments className="text-4xl text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No messages yet</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Send the first message to start the conversation
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg, index) => {
                    const isMe =
                      msg.sender?.id?.toString() === currentUserId ||
                      msg.sender?._id?.toString() === currentUserId;
                    const showAvatar =
                      !isMe &&
                      (index === 0 ||
                        messages[index - 1]?.sender?.id?.toString() !==
                          msg.sender?.id?.toString());
                    const isLastInGroup =
                      index === messages.length - 1 ||
                      messages[index + 1]?.sender?.id?.toString() !==
                        msg.sender?.id?.toString();

                    return (
                      <div
                        key={msg._id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"} ${
                          isLastInGroup ? "mb-3" : "mb-0.5"
                        }`}
                      >
                        {!isMe && showAvatar && (
                          <img
                            src={msg.sender?.profileImageUrl || STATIC_AVATAR}
                            alt=""
                            className="w-7 h-7 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                            onError={(e) => {
                              e.target.src = STATIC_AVATAR;
                            }}
                          />
                        )}
                        {!isMe && !showAvatar && <div className="w-7 mr-2 flex-shrink-0" />}
                        <div
                          className={`max-w-[70%] px-3.5 py-2 rounded-2xl ${
                            isMe
                              ? "bg-emerald-500 text-white rounded-br-md"
                              : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                          } ${msg.pending ? "opacity-60" : ""}`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                          <p
                            className={`text-[10px] mt-1 ${
                              isMe ? "text-emerald-100" : "text-gray-400"
                            }`}
                          >
                            {formatMessageTime(msg.createdAt)}
                            {isMe && msg.readBy && msg.readBy.length > 1 && (
                              <span className="ml-1">✓✓</span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing indicator */}
                  {typingNames.length > 0 && (
                    <div className="flex items-center gap-2 px-2 py-1">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-xs text-gray-400">
                        {typingNames.join(", ")} {typingNames.length === 1 ? "is" : "are"} typing...
                      </span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-3 px-5 py-3 border-t border-gray-200 bg-white"
            >
              <input
                ref={messageInputRef}
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white border border-transparent focus:border-emerald-300 transition"
                disabled={sendingMessage}
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || sendingMessage}
                className="p-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </>
        ) : (
          /* Empty state — no conversation selected */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
              <FaComments className="text-3xl text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your Messages
            </h2>
            <p className="text-gray-500 text-sm max-w-sm">
              Select a conversation from the sidebar or start a new one from any
              listing page by clicking "Message Seller"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
