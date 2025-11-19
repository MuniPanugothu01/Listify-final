// components/ChatBot.jsx
import React, { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import {
  X,
  Send,
  Minimize2,
  MessageCircle,
  Bot,
  User,
  Clock,
} from "lucide-react";
import chatIconAnimation from "../components/lottie/Chatbot.json";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your friendly assistant. I can help you with questions about our platform, guide you through features, or connect you with human support. What can I help you with today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const lottieRef = useRef();
  const chatContainerRef = useRef(null);

  // Enhanced responses with contextual awareness
  const botResponses = {
    general: [
      "I'd be happy to help with that! Our platform is designed to make buying and selling seamless and secure.",
      "That's a great question! Let me provide you with the most accurate information.",
      "I understand what you're looking for. Many users find this feature particularly helpful.",
    ],
    technical: [
      "For technical issues, I recommend checking our help center first. Would you like me to guide you through troubleshooting?",
      "I can help with basic technical questions. For complex issues, our support team is available 24/7.",
    ],
    account: [
      "Account-related questions are common. Let me help you manage your account settings effectively.",
      "I can assist with account management. Your security and privacy are our top priorities.",
    ],
    safety: [
      "Safety is our top concern. We have multiple verification systems in place to protect all users.",
      "I'm glad you asked about safety. We use advanced encryption and verification processes.",
    ],
  };

  // Smart quick replies based on context
  const quickReplies = [
    "How do I post an ad?",
    "Is it safe to transact here?",
    "What are the fees?",
    "How to verify my account?",
    "Contact human support",
  ];

  // Auto-responses based on keywords
  const keywordResponses = {
    "post ad": "posting",
    "create listing": "posting",
    "sell item": "posting",
    safety: "safety",
    secure: "safety",
    verify: "account",
    account: "account",
    login: "account",
    technical: "technical",
    error: "technical",
    bug: "technical",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, isMinimized]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target) &&
        isOpen &&
        !isMinimized
      ) {
        handleMinimize();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMinimized]);

  const getResponseByContext = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for keywords
    for (const [keyword, category] of Object.entries(keywordResponses)) {
      if (lowerMessage.includes(keyword)) {
        const responses = botResponses[category];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Default response
    const generalResponses = botResponses.general;
    return generalResponses[
      Math.floor(Math.random() * generalResponses.length)
    ];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setHasInteracted(true);

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response after delay
    const responseDelay = 1000 + Math.random() * 1500;

    setTimeout(() => {
      const botResponse = getResponseByContext(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (isMinimized) {
        setUnreadCount((prev) => prev + 1);
      }
    }, responseDelay);
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    setHasInteracted(true);

    setTimeout(() => {
      handleSendMessage({ preventDefault: () => {} });
    }, 150);
  };

  const handleToggleChat = () => {
    if (isOpen && !isMinimized) {
      setIsMinimized(true);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
      setUnreadCount(0);
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  return (
    <div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
      ref={chatContainerRef}
    >
      {/* Chat Window - Responsive positioning and sizing */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 ${
            isMinimized
              ? "w-72 md:w-80 h-14 md:h-16 opacity-95"
              : "w-[95vw] max-w-sm md:max-w-md lg:w-96 h-[85vh] max-h-[32rem] md:h-[32rem] opacity-100"
          }`}
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            position: "absolute",
            bottom: "100%",
            right: "0",
            marginBottom: "0.75rem",
            // Responsive positioning for medium screens
            ...(window.innerWidth >= 768 &&
              window.innerWidth < 1024 && {
                right: "0.5rem",
                bottom: "100%",
              }),
          }}
        >
          {/* Header with Brand Colors */}
          <div className="bg-[#2F3A63] rounded-t-2xl p-3 md:p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full border-2 border-[#2F3A63]"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm truncate">
                    Support Assistant
                  </h3>
                  <p className="text-xs text-gray-300 flex items-center truncate">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full mr-1 md:mr-2 animate-pulse flex-shrink-0"></span>
                    Online • {getWelcomeMessage()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={handleMinimize}
                  className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={14} className="md:w-4 md:h-4" />
                </button>
                <button
                  onClick={handleCloseChat}
                  className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                  aria-label="Close chat"
                >
                  <X size={14} className="md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div className="h-[calc(100%-8rem)] md:h-72 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50/50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="flex items-end space-x-1 md:space-x-2 max-w-[90%] md:max-w-[85%]">
                      {message.sender === "bot" && (
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-[#2F3A63] rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                          <Bot className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-3 py-2 md:px-4 md:py-3 transition-all duration-200 ${
                          message.sender === "user"
                            ? "bg-[#2F3A63] text-white rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none border border-gray-200"
                        }`}
                      >
                        <p className="text-xs md:text-sm leading-relaxed break-words">
                          {message.text}
                        </p>
                        <div
                          className={`flex items-center mt-1 md:mt-2 text-xs ${
                            message.sender === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          <Clock size={10} className="mr-1 flex-shrink-0" />
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                          <User className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end space-x-1 md:space-x-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-[#2F3A63] rounded-full flex items-center justify-center">
                        <Bot className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 text-gray-900 rounded-2xl rounded-bl-none px-3 py-2 md:px-4 md:py-3">
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <div className="flex space-x-0.5 md:space-x-1">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600 whitespace-nowrap">
                            Typing...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Replies - Show only on first interaction */}
                {messages.length === 1 && !isTyping && !hasInteracted && (
                  <div className="space-y-2 md:space-y-3">
                    <p className="text-xs text-gray-600 text-center font-medium">
                      QUICK QUESTIONS
                    </p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs bg-white border border-gray-300 text-gray-700 px-2 py-1.5 md:px-3 md:py-2 rounded-full hover:bg-[#2F3A63] hover:text-white hover:border-[#2F3A63] transition-all duration-200 shadow-sm hover:shadow-md break-words text-center"
                          style={{ fontSize: "0.7rem", lineHeight: "1.2" }}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 md:p-4 border-t border-gray-200 bg-white rounded-b-2xl"
              >
                <div className="flex space-x-2 md:space-x-3">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3A63] focus:border-transparent bg-white transition-all duration-200 placeholder-gray-500"
                      disabled={isTyping}
                      maxLength={500}
                    />
                    {inputMessage.length > 0 && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs text-gray-400">
                          {inputMessage.length}/500
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-[#2F3A63] text-white rounded-xl p-2 md:p-3 hover:bg-[#1e2a4a] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center flex-shrink-0"
                  >
                    <Send size={16} className="md:w-4 md:h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2 md:mt-3 flex items-center justify-center">
                  <Clock size={10} className="mr-1 flex-shrink-0" />
                  Typically replies in seconds
                </p>
              </form>
            </>
          )}

          {/* Minimized State */}
          {isMinimized && (
            <div
              className="flex items-center justify-between p-3 md:p-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200 rounded-b-2xl border-t border-gray-200"
              onClick={() => {
                setIsMinimized(false);
                setUnreadCount(0);
              }}
            >
              <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#2F3A63] rounded-full flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold animate-pulse border-2 border-white">
                      {unreadCount}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    Live Support
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {unreadCount > 0
                      ? `${unreadCount} new message${
                          unreadCount > 1 ? "s" : ""
                        }`
                      : "Click to continue chatting"}
                  </p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Floating Icon */}
      <div
        className="cursor-pointer transform hover:scale-105 transition-all duration-300 relative group"
        onClick={handleToggleChat}
      >
        <div className="relative">
          {/* Main Lottie Animation */}
          <div className="relative bg-white rounded-full shadow-2xl border border-gray-200 p-1.5 md:p-2">
            <Lottie
              lottieRef={lottieRef}
              animationData={chatIconAnimation}
              loop={true}
              autoplay={true}
              style={{
                width: 48,
                height: 48,
                ...(window.innerWidth >= 768 && {
                  width: 56,
                  height: 56,
                }),
              }}
            />
          </div>

          {/* Notification Badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold animate-bounce border-2 border-white shadow-lg">
              {unreadCount}
            </div>
          )}

          {/* Enhanced Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 md:mb-3 hidden group-hover:block">
            <div className="bg-[#2F3A63] text-white text-xs md:text-sm rounded-lg py-1.5 px-2 md:py-2 md:px-3 whitespace-nowrap shadow-xl">
              <div className="flex items-center space-x-1 md:space-x-2">
                <MessageCircle size={12} className="md:w-3 md:h-3" />
                <span>
                  {isOpen ? "Minimize chat" : "Need help? Chat with us!"}
                </span>
              </div>
              <div className="absolute top-full right-3 md:right-4 w-2 h-2 md:w-3 md:h-3 bg-[#2F3A63] transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
