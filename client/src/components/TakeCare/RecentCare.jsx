import React from "react";
import { MapPin, Clock, DollarSign } from "lucide-react";

const LatestMatches = () => {
  const listings = [
    {
      type: "Caregiver",
      title: "Savi offers Elder Care Provider / Nurse service",
      price: 15,
      location: "Katy, TX",
      role: "Elder Care Provider / Nurse",
      timeAgo: "37 mins ago",
      availableFrom: "Jan 01, 2026",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
    {
      type: "Careseeker",
      title: "Shivapriya needs a Nanny in San Jose",
      price: 15,
      location: "San Jose, CA",
      role: "Nanny",
      timeAgo: "50 mins ago",
      neededFrom: "Jan 01, 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      type: "Careseeker",
      title: "Falaq needs a Cook in Yonkers",
      price: 15,
      location: "Yonkers, NY",
      role: "Cook",
      timeAgo: "2 hrs ago",
      neededFrom: "Dec 2025",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      type: "Careseeker",
      title: "Hemal Shah needs a Nanny in Parcel Return Service, DC",
      price: 25,
      location: "Parcel Return Service, DC",
      role: "Nanny",
      timeAgo: "4 hrs ago",
      neededFrom: "Jan 05, 2026",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <section className=" max-w-7xl mx-auto mb-8 sm:mb-12 px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 rounded-xl sm:rounded-2xl">
      <div className="flex justify-between items-center mb-6 sm:mb-8 px-2 xs:px-0">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Latest Care takers & Seekers
        </h2>
        <button className="hidden md:flex items-center gap-2 text-[#27BB97] font-semibold hover:gap-3 transition-all text-sm sm:text-base">
          View All
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* Responsive grid with horizontal scroll on small screens */}
      <div className="overflow-x-auto pb-4 -mx-2 xs:-mx-3 sm:mx-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-w-max md:min-w-0 px-2 xs:px-3 sm:px-0">
          {listings.map((item, index) => (
            <div
              key={index}
              className="w-[280px] xs:w-[300px] sm:w-[320px] md:w-full bg-white rounded-xl sm:rounded-2xl border border-gray-200 hover:border-[#27BB97] hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group flex-shrink-0 md:flex-shrink"
            >
              {/* Header with avatar & type */}
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-[#27BB97]/5 to-[#1FA987]/5">
                <div className="relative">
                  <img
                    src={item.avatar}
                    alt={item.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 px-2 py-0.5 text-xs font-bold rounded-full text-white ${
                      item.type === "Caregiver" ? "bg-[#27BB97]" : "bg-[#1FA987]"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 sm:line-clamp-1 group-hover:text-[#27BB97] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                  {item.type === "Caregiver" ? "Available From: " : "Needed From: "}
                  <span className="font-medium text-gray-900">
                    {item.availableFrom || item.neededFrom}
                  </span>
                </p>

                {/* Meta info */}
                <div className="mb-4 sm:mb-5">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      {item.timeAgo}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="line-clamp-1">{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#27BB97]/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                      <span className="text-base sm:text-lg font-bold text-[#27BB97]">
                        ${item.price}
                      </span>
                      <span className="text-gray-600 text-xs sm:text-sm">/hr</span>
                    </div>
                  </div>

                  <button className="px-4 sm:px-6 py-2 sm:py-2.5 text-[#27BB97] font-semibold rounded-lg hover:bg-[#27BB97] hover:text-white border border-[#27BB97] transition-all shadow-sm hover:shadow-md text-xs sm:text-sm">
                    Respond
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet View All */}
      <div className="mt-4 sm:mt-6 text-center md:hidden">
        <button className="text-[#27BB97] font-semibold flex items-center gap-2 mx-auto hover:gap-3 transition-all text-sm sm:text-base">
          View All
          <span className="text-lg">→</span>
        </button>
      </div>
    </section>
  );
};

export default LatestMatches;