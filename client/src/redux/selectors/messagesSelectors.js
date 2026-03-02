/**
 * Messages Selectors
 *
 * Memoized selectors for the messages slice.
 */
import { createSelector } from "@reduxjs/toolkit";

// ── Base selector ──────────────────────────────────────────────────
const selectMessagesSlice = (state) => state.messages;

// ── Atomic selectors ───────────────────────────────────────────────
export const selectConversations = (state) => state.messages.conversations;
export const selectCurrentChat = (state) => state.messages.currentChat;
export const selectMessages = (state) => state.messages.messages;
export const selectMessagesLoading = (state) => state.messages.loading;
export const selectMessagesError = (state) => state.messages.error;
export const selectMessagesSuccess = (state) => state.messages.success;
export const selectUnreadCount = (state) => state.messages.unreadCount;

// ── Derived selectors ──────────────────────────────────────────────
export const selectMessagesStatus = createSelector(
  selectMessagesSlice,
  ({ loading, error, success }) => ({ loading, error, success }),
);

export const selectHasUnread = createSelector(
  selectUnreadCount,
  (count) => count > 0,
);

export const selectConversationCount = createSelector(
  selectConversations,
  (convos) => convos.length,
);
