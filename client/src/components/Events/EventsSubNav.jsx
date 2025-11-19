import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaTicketAlt,
  FaClock,
  FaUsers,
  FaHeart,
  FaMapMarkerAlt,
  FaFilter,
  FaChevronDown,

} from "react-icons/fa";

const navItems = [
  { name: "Home", icon: FaHome, path: "/", iconOnly: true },
  { name: "Upcoming", icon: FaCalendarAlt },
  { name: "Popular", icon: FaTicketAlt },
  {name: "Group Events", icon: FaUsers },
  { name: "Nearby", icon: FaMapMarkerAlt },
  { name: "This Weekend", icon: FaCalendarAlt },
  { name: "Free Events", icon: FaTicketAlt },
  { name: "Past Events", icon: FaClock },
  { name: "My Events", icon: FaUsers },
  { name: "Favorites", icon: FaHeart },
  
];

export default function EventsSubNav() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    city: "All Cities",
    date: "All Dates",
    category: "All Categories",
    language: "Any Language",
  });
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll hide/show (exact same behavior as roommate version)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsSubNavVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY < lastScrollY) {
        setIsSubNavVisible(false); // scrolling up → hide
      } else {
        setIsSubNavVisible(true);  // scrolling down → show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

 

  return (
    <div
      className={`w-full bg-white shadow-sm border-b border-gray-300 sticky top-16 z-30 transition-all duration-300 ${
        isSubNavVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between py-3 ">
          {/* Pill Buttons - exact same style as roommate nav */}
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar flex-1 ">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleCategoryClick(item)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap min-w-max cursor-pointer ${
                    item.name === "Home"
                      ? "bg-teal-500 text-white hover:bg-teal-600"
                      : "text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                  } ${item.iconOnly ? "px-3" : "px-4"}`}
                  title={item.name}
                >
                  <Icon className={`${item.iconOnly ? "w-5 h-5" : "w-4 h-4"}`} />
                  {!item.iconOnly && <span>{item.name}</span>}
                </button>
              );
            })}
          </div>         
        </div>

        {/* Active Filter Chips */}
        {Object.values(selectedFilters).some(
          (v) => !v.includes("All") && !v.includes("Any")
        ) && (
          <div className="flex items-center gap-2 py-2 border-t border-gray-200 flex-wrap  ">
            <span className="text-sm text-gray-600">Active filters:</span>
            {Object.entries(selectedFilters).map(([key, value]) => {
              if (value.includes("All") || value.includes("Any")) return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs "
                >
                  {value}
                  <button
                    onClick={() => resetFilter(key)}
                    className="hover:text-teal-900 ml-1"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}