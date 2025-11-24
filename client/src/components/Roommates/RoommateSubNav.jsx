import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RainbowButton } from "../../components/ui/rainbow-button"
import { 
  FaChevronDown, 
  FaFilter, 
  FaBed, 
  FaUsers, 
  FaUserLock, 
  FaBuilding, 
  FaHome, 
  FaCity, 
  FaHouseUser, 
  FaMapMarkerAlt,
  FaEllipsisH
} from "react-icons/fa";

const subNavItems = [
  { name: "Home", icon: FaHome, path: "/", iconOnly: true },
  { name: "Single Room", icon: FaBed },
  { name: "Shared Room", icon: FaUsers },
  { name: "Private Room", icon: FaUserLock },
  { name: "Condos", icon: FaCity },
  { name: "Townhouses", icon: FaHouseUser },
  { name: "Near Me", icon: FaMapMarkerAlt },
];

const moreItems = [
  { name: "PG / Co-living", icon: FaBuilding },
  { name: "Apartments", icon: FaHome },
  { name: "Studio", icon: FaBed },
  { name: "Villas", icon: FaHouseUser },
  { name: "Guest Houses", icon: FaBuilding },
  { name: "Serviced Apartments", icon: FaCity },
  { name: "Student Housing", icon: FaUsers },
  { name: "Senior Living", icon: FaUserLock },
];

export default function RoommateSubNav() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    price: "Any Price",
    gender: "Any Gender",
    availability: "Any Date",
    furnished: "Any",
  });
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Show navbar only when at top of page
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Only show when at top of page (less than 100px scrolled)
          if (currentScrollY < 100) {
            setIsSubNavVisible(true);
          } else {
            // Hide when not at top
            setIsSubNavVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleCategoryClick = (category) => {
    if (category.path) {
      // If category has a specific path (like Home), navigate to that path
      navigate(category.path);
    } else {
      // For other categories, use the roommates query parameter
      navigate(`/roommates?type=${encodeURIComponent(category.name)}`);
    }
    setShowMoreDropdown(false);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilters && !event.target.closest(".filter-container")) {
        setShowFilters(false);
      }
      if (showMoreDropdown && !event.target.closest(".more-dropdown-container")) {
        setShowMoreDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters, showMoreDropdown]);

  return (
    <div
      className={`w-full z-50 bg-white border-b border-gray-300   transition-all duration-300 ease-in-out ${
        isSubNavVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-1">
            {subNavItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(item)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap min-w-max cursor-pointer ${
                    item.name === "Home" 
                      ? "bg-[#25676D] text-white hover:bg-teal-600" 
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
            <div className="">
              <button
                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500 transition-all whitespace-nowrap min-w-max cursor-pointer"
              >
                <FaEllipsisH className="w-4 h-4" />
                <span>More</span>
                <FaChevronDown className={`w-3 h-3 transition-transform ${showMoreDropdown ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {showMoreDropdown && (
                <div className="absolute top-full z-50 -mt-3 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
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
            </div>
            
            <RainbowButton className="bg-red">I'm Searching</RainbowButton>
            <RainbowButton>Invite Someone in</RainbowButton>
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