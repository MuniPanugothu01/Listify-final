import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaFilter } from "react-icons/fa";

const subNavItems = [
  { name: "Single Room", icon: "🛏️" },
  { name: "Shared Room", icon: "👥" },
  { name: "Private Room", icon: "🔒" },
  { name: "PG / Co-living", icon: "🏢" },
  { name: "Apartments", icon: "🏠" },
  { name: "Condos", icon: "🏘️" },
  { name: "Townhouses", icon: "🏡" },
  { name: "Near Me", icon: "📍" },
];

const filterOptions = {
  price: [
    "Any Price",
    "$100-$500",
    "$500-$1000",
    "$1000-$1500",
    "$1500-$2000",
    "$2000+",
  ],
  gender: ["Any Gender", "Male", "Female", "Other"],
  availability: ["Any Date", "Immediate", "Within 7 days", "Within 30 days"],
  furnished: ["Any", "Furnished", "Semi-Furnished", "Unfurnished"],
};

export default function RoommateSubNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    price: "Any Price",
    gender: "Any Gender",
    availability: "Any Date",
    furnished: "Any",
  });
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior - Hide subnav when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when at top of page
      if (currentScrollY < 100) {
        setIsSubNavVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide when scrolling up, show when scrolling down
      if (currentScrollY < lastScrollY) {
        // Scrolling up - hide the subnav
        setIsSubNavVisible(false);
      } else {
        // Scrolling down - show the subnav
        setIsSubNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleCategoryClick = (category) => {
    navigate(`/roommates?type=${encodeURIComponent(category.name)}`);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value !== "Any" && !value.includes("Any")) {
        queryParams.set(key, value);
      }
    });
    navigate(`/roommates?${queryParams.toString()}`);
    setShowFilters(false);
  };

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilters && !event.target.closest(".filter-container")) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  return (
    <div
      className={`w-full bg-white shadow-sm border-b sticky top-16 z-30 transition-all duration-300 ${
        isSubNavVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar flex-1">
            {subNavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(item)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all whitespace-nowrap min-w-max flex-shrink-0"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Filter Button */}
          <div className="relative ml-4 filter-container">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-all flex-shrink-0"
            >
              <FaFilter className="w-4 h-4" />
              <span>Filters</span>
              <FaChevronDown
                className={`w-3 h-3 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4">
                <div className="space-y-4">
                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={selectedFilters.price}
                      onChange={(e) =>
                        handleFilterChange("price", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    >
                     
                    </select>
                  </div>

                  {/* Gender Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Gender
                    </label>
                    <select
                      value={selectedFilters.gender}
                      onChange={(e) =>
                        handleFilterChange("gender", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    >
                      {filterOptions.gender.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability
                    </label>
                    <select
                      value={selectedFilters.availability}
                      onChange={(e) =>
                        handleFilterChange("availability", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    >
                      {filterOptions.availability.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Furnished Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Furnishing
                    </label>
                    <select
                      value={selectedFilters.furnished}
                      onChange={(e) =>
                        handleFilterChange("furnished", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    >
                      {filterOptions.furnished.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={applyFilters}
                      className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium"
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {Object.values(selectedFilters).some(
          (filter) => filter !== "Any" && !filter.includes("Any")
        ) && (
          <div className="flex items-center gap-2 py-2 border-t border-gray-200">
            <span className="text-sm text-gray-600">Active filters:</span>
            {Object.entries(selectedFilters).map(([key, value]) => {
              if (value !== "Any" && !value.includes("Any")) {
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs"
                  >
                    {value}
                    <button
                      onClick={() =>
                        handleFilterChange(
                          key,
                          key === "price"
                            ? "Any Price"
                            : key === "gender"
                            ? "Any Gender"
                            : key === "availability"
                            ? "Any Date"
                            : "Any"
                        )
                      }
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
  );
}
