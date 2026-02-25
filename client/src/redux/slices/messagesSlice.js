import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { messagesAPI } from "../../services/api";

const initialState = {
  conversations: [],
  currentChat: null,
  messages: [],
  loading: false,
  error: null,
  success: false,
  unreadCount: 0,
};

// Async Thunks
export const fetchConversations = createAsyncThunk(
  "messages/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await messagesAPI.getConversations();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await messagesAPI.getMessages(conversationId);
      return { conversationId, messages: response.data.messages };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ conversationId, content }, { rejectWithValue }) => {
    try {
      const response = await messagesAPI.sendMessage(conversationId, content);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const markAsRead = createAsyncThunk(
  "messages/markAsRead",
  async (conversationId, { rejectWithValue }) => {
    try {
      await messagesAPI.markAsRead(conversationId);
      return conversationId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const createConversation = createAsyncThunk(
  "messages/createConversation",
  async ({ recipientId, initialMessage }, { rejectWithValue }) => {
    try {
      const response = await messagesAPI.createConversation(
        recipientId,
        initialMessage,
      );
      return response.data.conversation;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteConversation = createAsyncThunk(
  "messages/deleteConversation",
  async (conversationId, { rejectWithValue }) => {
    try {
      await messagesAPI.deleteConversation(conversationId);
      return conversationId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    clearMessagesError: (state) => {
      state.error = null;
    },
    resetMessagesSuccess: (state) => {
      state.success = false;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    clearMessagesData: (state) => {
      state.conversations = [];
      state.currentChat = null;
      state.messages = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload.conversations || [];
        state.unreadCount = action.payload.unreadCount || 0;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages || [];
        // Update conversation last message
        const conversation = state.conversations.find(
          (c) => c.id === action.payload.conversationId,
        );
        if (conversation) {
          conversation.unread = false;
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
        // Update conversation last message
        const conversation = state.conversations.find(
          (c) => c.id === action.payload.conversationId,
        );
        if (conversation) {
          conversation.lastMessage = action.payload;
          conversation.lastMessageTime = action.payload.timestamp;
        }
        state.success = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark as Read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const conversation = state.conversations.find(
          (c) => c.id === action.payload,
        );
        if (conversation) {
          conversation.unread = false;
        }
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      })

      // Create Conversation
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload);
        state.success = true;
      })

      // Delete Conversation
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.conversations = state.conversations.filter(
          (c) => c.id !== action.payload,
        );
        if (state.currentChat?.id === action.payload) {
          state.currentChat = null;
          state.messages = [];
        }
        state.success = true;
      });
  },
});

export const {
  clearMessagesError,
  resetMessagesSuccess,
  setCurrentChat,
  addMessage,
  updateUnreadCount,
  clearMessagesData,
} = messagesSlice.actions;

export default messagesSlice.reducer;
