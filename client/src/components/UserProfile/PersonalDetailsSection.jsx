import React, { useState } from "react";
import { Edit3, Camera, Shield, Mail, Phone, MapPin, CheckCircle, Award, User, Star, Globe, Briefcase } from "lucide-react";

const PersonalDetailsSection = ({
  user,
  isEditing,
  setIsEditing,
  editData,
  setEditData,
  profilePicPreview,
  handleProfilePicChange,
  handleSave,
  handleCancel,
}) => {
  // State for upload progress
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Modified handleProfilePicChange to include upload simulation
  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Start upload simulation
      setIsUploading(true);
      setUploadProgress(0);
      
      // Call the original handler
      if (handleProfilePicChange) {
        handleProfilePicChange(event);
      }
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 20; // Increment by 20% each interval
        });
      }, 200); // Update every 200ms
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Personal Details</h2>
          <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Manage your personal information and preferences</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-3 md:px-6 md:py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors font-semibold flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center"
          >
            <Edit3 className="w-5 h-5" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 md:gap-8">
            <div className="relative">
              {/* Profile Image with Circular Progress Border (Your Code) */}
              <div className="relative">
                {/* Profile Image with Circular Progress */}
                <div className={`relative ${isEditing ? "cursor-pointer" : ""}`}>
                  {/* Circular Progress Bar */}
                  {isUploading && (
                    <div className="absolute z-50">
                      <svg className="w-28 h-28 md:w-66 md:h-66  transform -rotate-90">
                        <circle
                          cx="211"
                          cy="54"
                          r="52"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-gray-300"
                        />
                        <circle
                          cx="211"
                          cy="54"
                          r="52"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray="327"
                          strokeDashoffset={327 - (327 * uploadProgress) / 100}
                          className="text-emerald-500 transition-all duration-300"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src={profilePicPreview}
                      alt="Profile"
                      className={`w-24 h-24 md:w-27 md:h-27 rounded-full object-cover border-4 shadow-lg transition-all duration-300 ${
                        isUploading 
                          ? "border-transparent opacity-90" 
                          : "border-white"
                      }`}
                    />
                    
                    {/* Upload Progress Text */}
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center">
   
                          <div className="text-lg font-bold">{uploadProgress}%</div>
                       
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Camera Button */}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 md:bottom-0 md:right-2 w-10 h-10 md:w-8 md:h-8 bg-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors border-3 border-white shadow-lg z-10">
                    <Camera className="w-5 h-5 md:w-4 md:h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                )}
                
                {/* Verified Badge */}
                {!isEditing && !isUploading && (
                  <div className="absolute -bottom-2 -right-2 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{editData.name}</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium w-fit">
                  <Star className="w-4 h-4" />
                  Premium Member
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{editData.email}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                  <div>
                    <div className="text-xs md:text-sm font-medium text-gray-900">Member since</div>
                    <div className="text-xs md:text-sm text-gray-600">{user.memberSince}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                  <div>
                    <div className="text-xs md:text-sm font-medium text-gray-900">Verification</div>
                    <div className="text-xs md:text-sm text-emerald-600 font-medium">Verified</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                  <div>
                    <div className="text-xs md:text-sm font-medium text-gray-900">Rating</div>
                    <div className="text-xs md:text-sm text-gray-600">{user.rating}/5</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                  <div>
                    <div className="text-xs md:text-sm font-medium text-gray-900">Properties</div>
                    <div className="text-xs md:text-sm text-gray-600">12 Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="p-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Basic Information</h4>
            <div className="h-px bg-gray-100"></div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Full Name */}
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-900">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-4 py-3 md:py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all text-gray-900"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="px-4 py-3 md:py-3.5 bg-gray-50 rounded-xl text-gray-900 font-medium border border-gray-200">
                    {editData.name}
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-900">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-4 py-3 md:py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all text-gray-900"
                    placeholder="Enter your email address"
                  />
                ) : (
                  <div className="px-4 py-3 md:py-3.5 bg-gray-50 rounded-xl text-gray-900 border border-gray-200">
                    {editData.email}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-900">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full px-4 py-3 md:py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all text-gray-900"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="px-4 py-3 md:py-3.5 bg-gray-50 rounded-xl text-gray-900 border border-gray-200">
                    {editData.phone}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-900">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    className="w-full px-4 py-3 md:py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all text-gray-900"
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="px-4 py-3 md:py-3.5 bg-gray-50 rounded-xl text-gray-900 border border-gray-200">
                    {editData.address}
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="lg:col-span-2 space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-900">
                  <Globe className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                  Bio/Description
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.bio || "Professional real estate agent with 8+ years experience"}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="w-full px-4 py-3 md:py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all text-gray-900 min-h-[120px] resize-none"
                    placeholder="Tell us about yourself"
                  />
                ) : (
                  <div className="px-4 py-3 md:py-3.5 bg-gray-50 rounded-xl text-gray-900 border border-gray-200 min-h-[120px]">
                    {editData.bio || "Professional real estate agent with 8+ years experience"}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-6 md:pt-8 border-t border-gray-100">
                <button
                  onClick={handleSave}
                  disabled={isUploading}
                  className="px-6 md:px-8 py-3 md:py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white rounded-xl transition-colors font-semibold shadow-sm w-full sm:w-auto disabled:cursor-not-allowed"
                >
                  {isUploading ? "Uploading..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isUploading}
                  className="px-6 md:px-8 py-3 md:py-3.5 border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl transition-colors font-semibold w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;