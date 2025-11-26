import React, { useState } from "react";
import {
  CheckCircle,
  MapPin,
  Calendar,
  DollarSign,
  Heart,
  MessageSquare,
  Phone,
  Star,
  Clock,
  Zap,
  Info
} from "lucide-react";

const roommateProfiles = [
  {
    id: 1,
    name: "Aditi Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    budget: "$900 - $1,200",
    location: "Williamsburg, Brooklyn",
    moveIn: "March 10, 2025",
    tags: ["Vegetarian", "Non-Smoker", "Early Riser", "Professional"],
    verified: true,
    match: 92,
    phone: "+1 347-555-1234",
    responseTime: "Within 1 hour",
    lastActive: "2 min ago",
    bio: "Software engineer who loves cooking and yoga. Looking for a clean, peaceful space.",
    occupation: "Software Engineer",
    reviews: {
      count: 12,
      rating: 4.8
    },
    active: true,
    compatibility: {
      lifestyle: 95,
      schedule: 88,
      interests: 90,
      habits: 92
    }
  },
  {
    id: 2,
    name: "Jason Miller",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    budget: "$1,200 - $1,500",
    location: "Upper East Side, Manhattan",
    moveIn: "April 1, 2025",
    tags: ["Pet Friendly", "WFH", "Clean", "Foodie"],
    verified: true,
    match: 88,
    phone: "+1 212-555-8899",
    responseTime: "Within 30 min",
    lastActive: "15 min ago",
    bio: "Marketing manager who loves hosting dinner parties and weekend adventures.",
    occupation: "Marketing Manager",
    reviews: {
      count: 8,
      rating: 4.6
    },
    active: true,
    compatibility: {
      lifestyle: 82,
      schedule: 85,
      interests: 87,
      habits: 90
    }
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    budget: "$800 - $1,000",
    location: "Astoria, Queens",
    moveIn: "Feb 20, 2025",
    tags: ["Quiet", "No Pets", "Student", "Reader"],
    verified: false,
    match: 84,
    phone: null,
    responseTime: "Within 4 hours",
    lastActive: "1 hour ago",
    bio: "Grad student studying architecture. Need a quiet space for studying.",
    occupation: "Student",
    reviews: {
      count: 5,
      rating: 4.9
    },
    active: false,
    compatibility: {
      lifestyle: 78,
      schedule: 92,
      interests: 82,
      habits: 80
    }
  },
];

const RoommateProfiles = () => {
  const [savedProfiles, setSavedProfiles] = useState(new Set());

  const toggleSaveProfile = (profileId) => {
    setSavedProfiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(profileId)) {
        newSet.delete(profileId);
      } else {
        newSet.add(profileId);
      }
      return newSet;
    });
  };

  const handleChatRedirect = (profile) => {
    if (!profile.verified) {
      alert("Please verify your account to start chatting");
      return;
    }
    window.location.href = `/dashboard/messages?user=${profile.id}`;
  };

  const handleContactView = (profile) => {
    if (!profile.phone) {
      alert("Phone number available only for verified profiles. Please use the chat feature.");
      return;
    }
    
    const confirmContact = window.confirm(
      `Contact ${profile.name} at ${profile.phone}?`
    );
    
    if (confirmContact) {
      alert(`Calling ${profile.name}: ${profile.phone}`);
    }
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    return "text-orange-600 bg-orange-50 border-orange-200";
  };

  return (
    <div className="w-full px-6 sm:px-8 lg:px-16 py-12 bg-white max-w-8xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            People Looking for Roommates
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Find fully verified people actively looking for a room or roommate. 
            <span className="text-[#25676D] font-medium"> Match scores help you find perfect compatibility!</span>
          </p>
        </div>

        <button className="text-[#25676D] hover:text-[#14494D] hover:underline font-semibold text-sm cursor-pointer flex items-center gap-1 group">
          View All Profiles
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roommateProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200 
                       transition-all duration-300 hover:-translate-y-1"
          >
            
            {/* Profile Header */}
            <div className="p-5 pb-4 border-b border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=25676D&color=fff&size=100`;
                      }}
                    />
                    {/* Online Status */}
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      profile.active ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-1.5">
                      {profile.name}
                      {profile.verified && (
                        <CheckCircle size={16} className="text-green-500" fill="#ecfdf5" />
                      )}
                    </h3>
                    <p className="text-gray-500 text-sm">{profile.occupation}</p>
                  </div>
                </div>

                {/* Match Score - HOVER ONLY ON PERCENTAGE */}
                <div className="flex flex-col items-end gap-1">
                  <div className="relative group">
                    {/* Percentage Tag */}
                    <div 
                      className={`flex items-center gap-1 px-2 py-1 rounded-full border cursor-help ${getCompatibilityColor(profile.match)}`}
                    >
                      <Zap size={12} className={profile.match >= 90 ? "fill-current" : ""} />
                      <span className="font-bold text-sm">{profile.match}%</span>
                    </div>
                    
                    {/* Compatibility Tooltip */}
                    <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full right-0 mt-2 w-64 bg-white p-4 rounded-xl shadow-xl border z-10 transition-all duration-200">
                      <div className="text-center mb-3">
                        <p className="font-bold text-gray-900 text-sm">Compatibility Score: {profile.match}%</p>
                        <p className="text-xs text-gray-500 mt-1">How well you match with {profile.name}</p>
                      </div>
                      
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Lifestyle Match</span>
                          <span className="font-semibold text-green-600">{profile.compatibility.lifestyle}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Schedule Sync</span>
                          <span className="font-semibold text-blue-600">{profile.compatibility.schedule}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Shared Interests</span>
                          <span className="font-semibold text-purple-600">{profile.compatibility.interests}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Habit Compatibility</span>
                          <span className="font-semibold text-orange-600">{profile.compatibility.habits}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Last Active Time */}
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock size={10} />
                    {profile.lastActive}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Key Info */}
            <div className="p-5 space-y-3">
              {/* Budget & Location */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign size={16} className="text-gray-500" />
                  <span className="font-semibold">{profile.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              </div>

              {/* Move-in Date */}
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <Calendar size={16} className="text-gray-500" />
                <span>Move-in: <span className="font-medium">{profile.moveIn}</span></span>
              </div>

              {/* Reviews & Response Time */}
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-medium text-gray-700">{profile.reviews.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{profile.reviews.count} reviews</span>
                <span className="text-gray-400">•</span>
                
                {/* Response Time with Tooltip */}
                <div className="relative group">
                  <span className="text-green-600 text-xs font-medium cursor-help">
                    {profile.responseTime}
                  </span>
                  
                  {/* Response Time Tooltip */}
                  <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible bottom-full left-0 mb-2 w-48 bg-gray-800 text-white p-2 rounded text-xs z-10 transition-all duration-200">
                    <div className="font-medium">Response Time</div>
                    <div className="text-gray-300 mt-1">
                      {profile.responseTime === "Within 30 min" && "Very quick responder - usually replies within 30 minutes"}
                      {profile.responseTime === "Within 1 hour" && "Good responder - typically replies within 1 hour"}
                      {profile.responseTime === "Within 4 hours" && "Regular responder - checks messages every few hours"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                {/* Contact Button - Primary */}
                <button
                  onClick={() => handleContactView(profile)}
                  className="flex-1 flex items-center justify-center gap-2 
                             bg-[#25676D] text-white py-2.5 rounded-lg 
                             font-semibold text-sm hover:bg-[#1a4d52] transition-colors
                             disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!profile.phone}
                >
                  <Phone size={16} /> 
                  {profile.phone ? "Call Now" : "No Phone"}
                </button>

                {/* Save Button */}
                <button
                  onClick={() => toggleSaveProfile(profile.id)}
                  className={`flex items-center justify-center w-12 rounded-lg border transition-colors ${
                    savedProfiles.has(profile.id)
                      ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart 
                    size={18} 
                    className={savedProfiles.has(profile.id) ? 'fill-red-500' : ''} 
                  />
                </button>

                {/* Chat Button - Secondary */}
                <button
                  onClick={() => handleChatRedirect(profile)}
                  className={`flex items-center justify-center w-12 rounded-lg border transition-colors ${
                    profile.verified
                      ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
                      : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!profile.verified}
                  title={profile.verified ? "Start chatting" : "Verify to chat"}
                >
                  <MessageSquare size={18} />
                </button>
              </div>

              {/* Quick Action Hint */}
              <p className="text-xs text-gray-500 text-center mt-2">
                {profile.verified ? "Call or chat instantly" : "Verify profile to unlock chat"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Want better matches? Take our compatibility quiz!
        </p>
        <button className="bg-[#25676D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a4d52] transition-colors flex items-center gap-2 mx-auto">
          <Info size={16} />
          Take Compatibility Quiz
        </button>
      </div>
    </div>
  );
};

export default RoommateProfiles;