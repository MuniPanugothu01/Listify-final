import React from "react";
import { Search, ShieldCheck, Home } from "lucide-react";

const WorkingSteps = () => {
  const steps = [
    {
      title: "Browse Verified Rooms",
      icon: <Search size={32} />,
      desc: "Explore thousands of verified listings filtered by budget, location & preferences.",
    },
    {
      title: "Connect Safely",
      icon: <ShieldCheck size={32} />,
      desc: "Chat securely, view profiles, and verify users before sharing your details.",
    },
    {
      title: "Move In Easily",
      icon: <Home size={32} />,
      desc: "Schedule visits, finalize your match, and move into your perfect home hassle-free.",
    },
  ];

  return (
    <div>
      <div className="w-full px-6 sm:px-10 lg:px-20 py-20 bg-white max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            How Listify Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A simple, safe & smarter way to find rooms, roommates, and shared
            homes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-[#F7F8F9] rounded-2xl p-8 shadow-sm
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                       border border-gray-100 cursor-default flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div
                className="w-16 h-16 rounded-2xl bg-[#25676D]/10 text-[#25676D]
                            flex items-center justify-center mb-6
                            group-hover:scale-110 transition-transform duration-300"
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkingSteps;
