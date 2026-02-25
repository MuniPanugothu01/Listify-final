import {
  fetchConversations,
  fetchMessages,
  sendMessage,
  markAsRead,
  clearMessagesError,
  resetMessagesSuccess,
  setCurrentChat,
  addMessage,
  updateUnreadCount,
} from "../slices/messagesSlice";

export const messageActions = {
  // Fetch conversations
  getConversations: () => async (dispatch) => {
    try {
      const result = await dispatch(fetchConversations()).unwrap();
      return {
        success: true,
        conversations: result.conversations,
        unreadCount: result.unreadCount,
      };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Fetch messages for a conversation
  getMessages: (conversationId) => async (dispatch) => {
    try {
      const result = await dispatch(fetchMessages(conversationId)).unwrap();
      return { success: true, messages: result.messages };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Send message
  sendMessage: (conversationId, content) => async (dispatch) => {
    try {
      // Optimistic update
      const tempMessage = {
        id: `temp-${Date.now()}`,
        content,
        sender: "me",
        timestamp: new Date().toISOString(),
        status: "sending",
      };
      dispatch(addMessage(tempMessage));

      const result = await dispatch(
        sendMessage({ conversationId, content }),
      ).unwrap();

      return { success: true, message: result.message };
    } catch (error) {
      // Remove optimistic message on error
      return { success: false, error };
    }
  },

  // Mark conversation as read
  markAsRead: (conversationId) => async (dispatch) => {
    try {
      const result = await dispatch(markAsRead(conversationId)).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Set current chat
  setCurrentChat: (conversation) => (dispatch) => {
    dispatch(setCurrentChat(conversation));
  },

  // Add message (for real-time updates)
  addMessage: (message) => (dispatch) => {
    dispatch(addMessage(message));
  },

  // Update unread count
  updateUnreadCount: (count) => (dispatch) => {
    dispatch(updateUnreadCount(count));
  },

  // Clear error
  clearError: () => (dispatch) => {
    dispatch(clearMessagesError());
  },

  // Reset success
  resetSuccess: () => (dispatch) => {
    dispatch(resetMessagesSuccess());
  },

  // Create new conversation
  createConversation: (userId) => async (dispatch) => {
    try {
      // This would need an API endpoint
      // const result = await messagesAPI.createConversation(userId);
      // dispatch(addConversation(result.conversation));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Delete conversation
  deleteConversation: (conversationId) => async (dispatch) => {
    try {
      // This would need an API endpoint
      // await messagesAPI.deleteConversation(conversationId);
      // dispatch(removeConversation(conversationId));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },
};

export default messageActions;
