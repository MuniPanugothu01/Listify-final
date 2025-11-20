import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RainbowButton } from "../../components/ui/rainbow-button";
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
  FaEllipsisH
} from "react-icons/fa";

const navItems = [
  { name: "Home", icon: FaHome, path: "/", iconOnly: true },
  { name: "Upcoming", icon: FaCalendarAlt },
  { name: "Popular", icon: FaTicketAlt },
  { name: "Group Events", icon: FaUsers },
  { name: "Nearby", icon: FaMapMarkerAlt },
  { name: "This Weekend", icon: FaCalendarAlt },
];

const moreItems = [
  { name: "Free Events", icon: FaTicketAlt },
  { name: "Past Events", icon: FaClock },
  { name: "My Events", icon: FaUsers },
  { name: "Favorites", icon: FaHeart },
  { name: "Workshops", icon: FaCalendarAlt },
  { name: "Concerts", icon: FaTicketAlt },
  { name: "Conferences", icon: FaUsers },
  { name: "Sports Events", icon: FaMapMarkerAlt },
];

export default function EventsSubNav() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    city: "All Cities",
    date: "All Dates",
    category: "All Categories",
    language: "Any Language",
  });
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const moreButtonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Enhanced scroll behavior - Hide when scrolling down, show when scrolling up or at top
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always show when at top of page (less than 50px scrolled)
          if (currentScrollY < 50) {
            setIsSubNavVisible(true);
            setLastScrollY(currentScrollY);
            ticking = false;
            return;
          }

          // Determine scroll direction
          const scrollingDown = currentScrollY > lastScrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);

          // Only trigger hide/show if scroll difference is significant enough
          if (scrollDifference > 10) {
            if (scrollingDown) {
              // Scrolling down - hide the subnav
              setIsSubNavVisible(false);
            } else {
              // Scrolling up - show the subnav
              setIsSubNavVisible(true);
            }
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleCategoryClick = (category) => {
    if (category.path) {
      // If category has a specific path (like Home), navigate to that path
      navigate(category.path);
    } else {
      // For other categories, use the events query parameter
      navigate(`/events?type=${encodeURIComponent(category.name)}`);
    }
    setShowMoreDropdown(false);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const resetFilter = (filterType) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: 
        filterType === "city" ? "All Cities" :
        filterType === "date" ? "All Dates" :
        filterType === "category" ? "All Categories" :
        "Any Language"
    }));
  };

  // Calculate dropdown position when button is clicked
  const updateDropdownPosition = () => {
    if (moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update dropdown position when opened
  useEffect(() => {
    if (showMoreDropdown) {
      updateDropdownPosition();
    }
  }, [showMoreDropdown]);

  const handleMoreClick = () => {
    updateDropdownPosition();
    setShowMoreDropdown(!showMoreDropdown);
  };

  return (
    <>
      {/* Very light backdrop - only when dropdown is open */}
      {showMoreDropdown && (
        <div 
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setShowMoreDropdown(false)}
        />
      )}

      <div
        className={`w-full bg-white shadow-sm border-b border-gray-300 z-30 transition-all duration-300 ease-in-out ${
          isSubNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Main Navigation */}
          <div className="flex items-center justify-between py-3">
            {/* Scrollable navigation items */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(item)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap min-w-max cursor-pointer ${
                      item.name === "Home" 
                        ? "bg-teal-500 text-white hover:bg-teal-600" 
                        : "text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                    } ${item.iconOnly ? "px-3" : "px-4"}`}
                    title={item.name}
                  >
                    <IconComponent className={`${item.iconOnly ? "w-5 h-5" : "w-4 h-4"}`} />
                    {!item.iconOnly && <span>{item.name}</span>}
                  </button>
                );
              })}

              {/* More Dropdown */}
              <div ref={dropdownRef} className="relative flex-shrink-0">
                <button
                  ref={moreButtonRef}
                  onClick={handleMoreClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500 transition-all whitespace-nowrap min-w-max cursor-pointer border border-gray-200"
                >
                  <FaEllipsisH className="w-4 h-4" />
                  <span>More</span>
                  <FaChevronDown className={`w-3 h-3 transition-transform ${showMoreDropdown ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {/* Rainbow Button */}
            <div className="flex-shrink-0 ml-4">
              <RainbowButton>Create Event</RainbowButton>
            </div>
          </div>

          {/* Active Filters Display */}
          {Object.values(selectedFilters).some(
            (filter) => !filter.includes("All") && !filter.includes("Any")
          ) && (
            <div className="flex items-center gap-2 py-2 border-t border-gray-200">
              <span className="text-sm text-gray-600">Active filters:</span>
              {Object.entries(selectedFilters).map(([key, value]) => {
                if (!value.includes("All") && !value.includes("Any")) {
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs"
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
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Position Dropdown */}
      {showMoreDropdown && (
        <div 
          ref={dropdownRef}
          className="fixed w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`
          }}
        >
          {moreItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleCategoryClick(item)}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500 transition-all cursor-pointer"
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}