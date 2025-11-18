import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaTicketAlt,
  FaClock,
  FaUsers,
  FaHeart,
  FaPlusCircle,
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaChevronDown,
} from "react-icons/fa";

const navItems = [
  { name: "", icon: <FaHome />, href: "/" },
  { name: "Upcoming", icon: <FaCalendarAlt />, href: "#upcoming" },
  { name: "This Weekend", icon: <FaCalendarAlt />, href: "#this-weekend" },
  { name: "Free Events", icon: <FaTicketAlt />, href: "#free" },
  { name: "Past Events", icon: <FaClock />, href: "#past" },
  { name: "My Events", icon: <FaUsers />, href: "#my-events" },
  { name: "Favorites", icon: <FaHeart />, href: "#favorites", color: "text-red-500" },
];

export default function EventsSubNav() {
  const [showFilters, setShowFilters] = useState(false);
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll up, show on scroll down (exact behavior from your example)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsSubNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsSubNavVisible(false); // scrolling down → hide
      } else {
        setIsSubNavVisible(true);  // scrolling up → show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showFilters && !e.target.closest(".filter-container")) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  return (
    <div
      className={`w-full bg-white shadow-sm border-b sticky top-16 z-40 transition-all duration-300 ${
        isSubNavVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className=" px-4 sm:px-6 lg:px-8">
        {/* Main Bar */}
        <div className="flex items-center justify-between py-3">

          {/* Left: Pill Navigation */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium transition-all whitespace-nowrap flex-shrink-0
                  ${
                    item.active
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-md"
                      : "text-gray-700 hover:bg-purple-500 hover:text-white hover:border-purple-500"
                  } ${item.color || ""}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden sm:inline">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Right Side: Search + Filter + Create Event */}
          <div className="flex items-center gap-3">

         

            {/* Filter Dropdown */}
            <div className="relative filter-container">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <FaFilter className="w-4 h-4" />
                <span>Filters</span>
                <FaChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>

              {/* Filters Panel */}
              {showFilters && (
                <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-6">
                  <h3 className="text-lg font-semibold mb-5 text-gray-800">Filter Events</h3>

                  <div className="space-y-5">
                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaMapMarkerAlt className="inline mr-2" /> City
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500">
                        <option>All Cities</option>
                        <option>San Francisco Bay Area</option>
                        <option>New York / NJ</option>
                        <option>Chicago</option>
                        <option>Toronto</option>
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        When
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500">
                        <option>All Dates</option>
                        <option>Today</option>
                        <option>Tomorrow</option>
                        <option>This Weekend</option>
                        <option>Next Week</option>
                      </select>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500">
                        <option>All Categories</option>
                        <option>Music & Concerts</option>
                        <option>Comedy Shows</option>
                        <option>Dance & Garba</option>
                        <option>Bollywood</option>
                        <option>Spiritual</option>
                      </select>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500">
                        <option>Any Language</option>
                        <option>Hindi</option>
                        <option>Tamil</option>
                        <option>Gujarati</option>
                        <option>Punjabi</option>
                        <option>English</option>
                      </select>
                    </div>

                    {/* Checkboxes */}
                    <div className="grid grid-cols-2 gap-4 pt-3">
                      {["Free Entry", "Kid Friendly", "Outdoor", "Virtual/Online", "Featured", "Last Minute"].map((label) => (
                        <label key={label} className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500" />
                          <span className="text-sm text-gray-700">{label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
                        Apply Filters
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Create Event Button */}
            <a
              href="#create"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ml-3 whitespace-nowrap"
            >
              <FaPlusCircle className="w-6 h-6" />
              <span className="hidden sm:inline text-lg">Create Event</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}