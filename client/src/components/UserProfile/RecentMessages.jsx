import React from "react";
import { MessageCircle, Clock } from "lucide-react";

const RecentMessages = ({ messages }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
    <div className="flex items-center justify-between mb-4 md:mb-6">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">Recent Messages</h3>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Latest conversations with clients</p>
      </div>
      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>Updated just now</span>
      </div>
    </div>
    
    <div className="space-y-3">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className="flex items-center gap-4 p-3 md:p-4 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-200"
        >
          <div className="relative">
            <img 
              src={msg.avatar} 
              alt={msg.name} 
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl object-cover border-2 border-white shadow-xs" 
            />
            {msg.unread && (
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium md:font-semibold text-gray-900 truncate">{msg.name}</p>
              <span className={`text-xs font-medium ${msg.unread ? 'text-emerald-600' : 'text-gray-500'}`}>
                {msg.time}
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-600 truncate">{msg.preview}</p>
            {msg.unread && (
              <div className="flex items-center gap-1 mt-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full"></span>
                <span className="text-xs text-emerald-600 font-medium">New message</span>
              </div>
            )}
          </div>
          
          <button className="opacity-0 group-hover:opacity-100 w-8 h-8 md:w-10 md:h-10 bg-emerald-500 text-white rounded-lg md:rounded-xl flex items-center justify-center transition-all hover:bg-emerald-600">
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      ))}
    </div>
    
    <div className="pt-4 md:pt-6 border-t border-gray-100 mt-4">
      <button className="w-full py-3 px-4 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors font-semibold text-sm">
        View All Messages
      </button>
    </div>
  </div>
);

export default RecentMessages;