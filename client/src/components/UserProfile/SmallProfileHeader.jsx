import React from "react";
import { ChevronDown } from "lucide-react";

const SmallProfileHeader = ({ profilePic }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      <span className="text-sm text-emerald-600 font-medium hidden sm:block">Available</span>
    </div>
    <div className="relative">
      <img 
        src={profilePic} 
        alt="Profile" 
        className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-xs" 
      />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
    </div>
    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
  </div>
);

export default SmallProfileHeader;