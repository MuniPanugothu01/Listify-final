import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, ArrowLeft, Send, Search, MoreVertical } from "lucide-react";

const MessagesSection = ({ messages }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sampleChatHistory = [
    { text: "Hey John, interested in the downtown apartment! It looks amazing.", sender: "other", time: "10:30 AM" },
    { text: "What up? When can we schedule a viewing?", sender: "other", time: "10:32 AM" },
    { text: "Sounds good! How about tomorrow at 2 PM?", sender: "me", time: "10:35 AM" },
    { text: "Perfect, I'll book it for you. Any specific questions?", sender: "me", time: "10:36 AM" },
    { text: "Just the parking situation. Is there street parking available?", sender: "other", time: "10:38 AM" },
  ];

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = messages.find((conv) => conv.name === selectedChat);

  const handleChatSelect = (chatName) => {
    setSelectedChat(chatName);
    if (isMobile) {
      setIsChatOpen(true);
    }
  };

  const handleBackToConversations = () => {
    setIsChatOpen(false);
    setSelectedChat(null);
  };

  // Mobile chat view
  if (isMobile && isChatOpen && selectedConversation) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl">
        {/* Mobile Chat Header */}
        <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToConversations}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <img
                  src={selectedConversation.avatar}
                  alt={selectedChat}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{selectedChat}</p>
                <p className="text-xs text-emerald-600 font-medium">Online now</p>
              </div>
            </div>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sampleChatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[85%]">
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    msg.sender === "me"
                      ? "bg-emerald-500 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className={`text-xs mt-2 ${msg.sender === "me" ? "text-emerald-100" : "text-gray-500"}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all text-gray-900"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Messages</h2>
            <p className="text-gray-600 text-sm mt-1">Stay connected with clients and partners</p>
          </div>
          <button className="w-full sm:w-auto px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            New Message
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Conversations Sidebar */}
        <div className={`w-full md:w-96 border-r border-gray-100 flex flex-col h-full ${isMobile && isChatOpen ? "hidden" : "flex"}`}>
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all text-gray-900"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((conv) => (
              <div
                key={conv.name}
                onClick={() => handleChatSelect(conv.name)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
                  conv.name === selectedChat ? "bg-emerald-50 border-l-4 border-l-emerald-500" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    {conv.unread && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900 truncate">{conv.name}</p>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.preview}</p>
                    {conv.unread && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-xs text-emerald-600 font-medium">New message</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Panel - Desktop */}
        <div className={`hidden md:flex flex-1 flex-col h-full ${selectedChat ? "flex" : "hidden md:flex"}`}>
          {selectedChat && selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-100 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedConversation.avatar}
                      alt={selectedChat}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{selectedChat}</p>
                      <p className="text-sm text-emerald-600 font-medium">Online now</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {sampleChatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-md">
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.sender === "me"
                            ? "bg-emerald-500 text-white rounded-br-md"
                            : "bg-gray-100 text-gray-900 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className={`text-xs mt-2 ${
                          msg.sender === "me" ? "text-emerald-100" : "text-gray-500"
                        }`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all text-gray-900"
                    />
                    <MessageCircle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  <button className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No conversation selected</h3>
              <p className="text-gray-600 text-center max-w-md mb-8">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesSection;