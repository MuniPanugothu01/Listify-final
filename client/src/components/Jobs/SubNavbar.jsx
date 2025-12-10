import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RainbowButton } from "../../components/ui/rainbow-button";
import { FaHome, FaChevronDown } from "react-icons/fa";

const subNavItems = [
  { name: "", path: "/" },
  { name: "IT Jobs" },
  { name: "Non IT Jobs" },
  { name: "Latest Jobdeeker" },
  { name: "Latest Jobs" },
  { name: "Part Time" },
  { name: "Jobs Near Me" },
  { name: "Hire" },
  { name: "Browse Jobs" },
  { name: "Employees" },
  { name: "Jobseekers" },
  { name: "Create Profile" },
];

const browseJobsItems = [
  "Role",
  "Jobs Fair",
  "Find Recruiters",
  "Functions",
  "Skills",
  "Job Description",
  "Salaries",
  "Companies",
];

const employeesItems = [
  "Post Your Job",
  "Search Candidate",
  "Aggregator",
  "Our Pricing",
  "Resume Database Access",
  "Recruiter Hub",
  "Post Your Job",
];

const jobseekersItems = [
  "Post Your Job Need",
  "Job Seeker Hub",
  "Featured Job Profile",
  "Upload Resume",
  "Recruiter Connects",
  "Create Profile",
  "Resume Writings",
  "LinkedIn Profile Service",
  "Cover Letter Service",
  "Your Dashboard",
  "IT Training and Placement",
  "Outplacement Service",
  "Reverse Recruiter Service",
  "Make It Better",
];

export default function RoommateSubNav() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    price: "Any Price",
    gender: "Any Gender",
    availability: "Any Date",
    furnished: "Any",
  });
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState(null);

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
            // Also close dropdowns when hiding nav
            setActiveDropdown(null);
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
      navigate(category.path);
    } else {
      navigate(`/roommates?type=${encodeURIComponent(category.name)}`);
    }
    setActiveDropdown(null);
  };

  const handleDropdownItemClick = (dropdownName, item) => {
    console.log(`Clicked ${dropdownName} item:`, item);
    // You can add navigation logic here
    setActiveDropdown(null);
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
      if (!event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get dropdown items based on active dropdown
  const getDropdownItems = () => {
    switch (activeDropdown) {
      case "Browse Jobs":
        return browseJobsItems;
      case "Employees":
        return employeesItems;
      case "Jobseekers":
        return jobseekersItems;
      default:
        return [];
    }
  };

  // Get dropdown height based on number of items
  const getDropdownHeight = () => {
    const items = getDropdownItems();
    const baseHeight = 48; // Height for header
    const itemHeight = 44; // Height per item

    if (items.length <= 8) {
      return "auto";
    }

    // Max height for 8 items + header
    const maxHeight = baseHeight + 8 * itemHeight;
    return `${maxHeight}px`;
  };

  // Check if item has dropdown
  const hasDropdown = (itemName) => {
    return ["Browse Jobs", "Employees", "Jobseekers"].includes(itemName);
  };

  return (
    <div
      className={`w-full z-50 bg-white border-b border-gray-300 transition-all duration-300 ease-in-out ${
        isSubNavVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1">
            {subNavItems.map((item, index) => (
              <div key={index} className="dropdown-container relative">
                <button
                  onClick={() => {
                    if (hasDropdown(item.name)) {
                      setActiveDropdown(
                        activeDropdown === item.name ? null : item.name
                      );
                    } else {
                      handleCategoryClick(item);
                    }
                  }}
                  className={`flex items-center justify-center px-3 py-2 rounded-full text-sm transition-all whitespace-nowrap min-w-max cursor-pointer ${
                    item.name === ""
                      ? "text-[#27bb97] hover:text-[#1FA987] px-3"
                      : "text-gray-700 hover:text-[#27bb97]"
                  } ${
                    activeDropdown === item.name
                      ? "text-[#27bb97] font-semibold"
                      : ""
                  }`}
                  title={item.name || "Home"}
                >
                  {item.name === "" ? (
                    <FaHome className="w-5 h-5" />
                  ) : (
                    <>
                      <span>{item.name}</span>
                      {hasDropdown(item.name) && (
                        <FaChevronDown
                          className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </>
                  )}
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === item.name && hasDropdown(item.name) && (
                  <div className="absolute top-full left-0 z-50 mt-1 min-w-[220px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                    {/* Dropdown Header */}
                    <div className="px-4 py-3 bg-teal-50 border-b border-teal-100">
                      <h3 className="text-sm font-semibold text-teal-700">
                        {item.name}
                      </h3>
                    </div>

                    {/* Scrollable Items Container */}
                    <div
                      className="overflow-y-auto"
                      style={{ maxHeight: getDropdownHeight() }}
                    >
                      {getDropdownItems().map((dropdownItem, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            handleDropdownItemClick(item.name, dropdownItem)
                          }
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500 transition-all cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <span className="truncate">{dropdownItem}</span>
                        </button>
                      ))}
                    </div>

                    {/* Scroll indicator for long lists */}
                    {getDropdownItems().length > 8 && (
                      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Scroll for more options</span>
                          <span className="text-teal-600 font-medium">
                            {getDropdownItems().length} items
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <RainbowButton className="bg-red">Need a Job</RainbowButton>
            <RainbowButton>Post Job ad</RainbowButton>
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
