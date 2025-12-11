import React from "react";
import { MdArrowOutward } from "react-icons/md";

const FeaturedRecruiters = () => {
  const recruiters = [
    {
      name: "Google",
      industry: "IT Services",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Amazon",
      industry: "E-Commerce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Microsoft",
      industry: "Software & Cloud",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Meta",
      industry: "Social Media",
      logo: "/JobsImg/Meta.png",
    },
    {
      name: "Tesla",
      industry: "Automotive / AI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
    {
      name: "IBM",
      industry: "Enterprise Tech",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
  ];

  return (
    <div className="px-6 md:px-16 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Recruiters
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leading companies actively hiring through our platform
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 px-2
            [&::-webkit-scrollbar]:h-1.5
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
            {recruiters.map((rec, i) => (
              <div
                key={i}
                className="min-w-[280px] bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#27bb97]/20 hover:-translate-y-1"
              >
                {/* Logo Container */}
                <div className="flex justify-center mb-6 p-4">
                  <img
                    src={rec.logo}
                    alt={rec.name}
                    className="w-24 h-24 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/96?text=Logo";
                    }}
                  />
                </div>

                {/* Recruiter Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {rec.name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
                    <span className="text-sm text-gray-600">Industry:</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {rec.industry}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full py-3 bg-gradient-to-r from-[#27bb97] to-[#1fa987] hover:from-[#1fa987] hover:to-[#198d71] text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer group hover:shadow-lg">
                  <span>View Jobs</span>
                  <MdArrowOutward className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecruiters;