import api from "./api";

export const messagesAPI = {
  // Get conversations
  getConversations: () => {
    return api.get("/messages/conversations");
  },

  // Get messages for a conversation
  getMessages: (conversationId) => {
    return api.get(`/messages/${conversationId}`);
  },

  // Send message
  sendMessage: (conversationId, content) => {
    return api.post(`/messages/${conversationId}`, { content });
  },

  // Mark conversation as read
  markAsRead: (conversationId) => {
    return api.put(`/messages/${conversationId}/read`);
  },
};
