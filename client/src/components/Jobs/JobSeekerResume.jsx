import React from "react";
import { Heart, MapPin, Briefcase, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JobSeekerResume() {
  const navigate = useNavigate();
  
  const jobSeekers = [
    {
      id: 1,
      title: "Cyber Security Specialist",
      category: "Computer / Internet",
      location: "New York, NY",
      experience: "19 years experience",
      profileImage: "/JobsImg/jobseeker1.jpg", // Example profile image URL
      verified: true,
    },
    {
      id: 2,
      title: "Gas Station Cashier",
      category: "Trade - Retail / Wholesale",
      location: "Scranton, PA",
      experience: "Entry level",
      profileImage: "/JobsImg/jobseeker2.jpg", // Example profile image URL
      verified: false,
    },
    {
      id: 3,
      title: "Nanny",
      category: "Healthcare / Pharma / Bio-tech",
      location: "Newark, NJ",
      experience: "7 years experience",
      profileImage: "/JobsImg/jobseeker3.jpg", // Example profile image URL
      verified: true,
    },
  ];

  const handleViewAllPositions = () => {
    navigate("/job-seeker-resumes");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Job Seeker Resumes in The <span className="text-[#27bb97] ">USA</span> and <span className="text-[#27bb97] ">Canada</span>
          </h1>
          <p className="text-gray-600 text-lg mb-4 max-w-2xl mx-auto">
            Discover talented professionals actively seeking new opportunities
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {jobSeekers.map((seeker) => (
            <div
              key={seeker.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              {/* Profile Header */}
              <div className="flex items-start gap-4 mb-6">
                {/* Profile Avatar with Conditional Badge */}
                <div className="relative">
                  {seeker.profileImage ? (
                    // Display actual profile image
                    <img
                      src={seeker.profileImage}
                      alt={`${seeker.title} profile`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      onError={(e) => {
                        // Fallback to default avatar if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback Avatar (shown if no image or image fails to load) */}
                  <div 
                    className={`w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md ${
                      seeker.profileImage ? 'hidden' : 'flex'
                    }`}
                  >
                    <User className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Verified Badge (only shown if verified is true) */}
                  {seeker.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white font-bold">✓</span>
                    </div>
                  )}
                </div>

                {/* Title and Category */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {seeker.title}
                  </h3>
                  <div className="inline-block bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                      {seeker.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-6"></div>

              {/* Profile Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{seeker.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{seeker.experience}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {/* Save/Bookmark Button */}
                <button
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                  aria-label="Save profile"
                  title="Save to favorites"
                >
                  <div className="p-1.5 rounded-full group-hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:fill-red-100 transition-all" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-red-600">
                    Save
                  </span>
                </button>

                {/* View Profile Button */}
                <button
                  className="group flex items-center gap-2 px-5 py-2.5 bg-[#27bb97]  text-white rounded-lg hover:bg-[#1fa987] transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                  aria-label="View full profile"
                >
                  <span>View Profile</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button 
            onClick={handleViewAllPositions}
            className="px-8 py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg hover:bg-[#27bb97] hover:text-white transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            View All Positions →
          </button>
        </div>
      </div>
    </div>
  );
}