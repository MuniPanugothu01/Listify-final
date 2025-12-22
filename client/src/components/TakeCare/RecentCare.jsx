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
    <section className="mb-12 px-4 sm:px-6 lg:px-10 py-8 bg-gray-50 rounded-2xl">
      <div className="flex justify-between items-center mb-8 px-4 sm:px-0">
        <h2 className="text-3xl md:text-2xl font-bold text-gray-900">
          Latest Care takers & Seekers
        </h2>
        <button className="hidden md:flex items-center gap-2 text-[#27BB97] font-semibold hover:gap-3 transition-all">
          View All
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0 px-4 md:px-0">
          {listings.map((item, index) => (
            <div
              key={index}
              className="w-80 md:w-full bg-white rounded-2xl border border-gray-200 hover:border-[#27BB97] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Header with avatar & type */}
              <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-[#27BB97]/5 to-[#1FA987]/5">
                <div className="relative">
                  <img
                    src={item.avatar}
                    alt={item.title}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 px-2 py-0.5 text-xs font-bold rounded-full text-white ${
                      item.type === "Caregiver" ? "bg-[#27BB97]" : "bg-[#1FA987]"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[#27BB97] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-sm text-gray-700 mb-4">
                  {item.type === "Caregiver" ? "Available From: " : "Needed From: "}
                  <span className="font-medium text-gray-900">
                    {item.availableFrom || item.neededFrom}
                  </span>
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-500" />
                      {item.timeAgo}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {item.location}
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#27BB97]/10 px-3 py-1.5 rounded-lg">
                      <span className="text-lg font-bold text-[#27BB97]">
                        ${item.price}
                      </span>
                      <span className="text-gray-600 text-sm">/hr</span>
                    </div>
                  </div>

                  <button className="px-6 py-2.5  text-[#27BB97] font-semibold rounded-lg hover:[#27BB97] border border-[#27BB97] transition-all shadow-md">
                    Respond
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-only View All */}
      <div className="mt-6 text-center md:hidden">
        <button className="text-[#27BB97] font-semibold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
          View All
          <span className="text-lg">→</span>
        </button>
      </div>
    </section>
  );
};

export default LatestMatches;