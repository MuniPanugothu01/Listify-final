import React, { useState, useRef, useEffect } from "react";
// Import React Icons
import {
  FaCar,
  FaTools,
  FaBriefcase,
  FaTimes,
  FaArrowRight,
  FaShoppingCart
} from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";
import { GiCarWheel, GiHouseKeys, GiPartyPopper } from "react-icons/gi";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Carousel() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate function

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        closeCategories();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    if (!isSearchActive) {
      setIsSearchActive(true);
      setIsAnimating(true);
      setIsCategoriesOpen(true);
      // Focus on input after animation starts
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300);
    }
  };

  const handleCloseSearch = () => {
    if (isSearchActive) {
      setIsSearchActive(false);
      closeCategories();
    }
  };

  const closeCategories = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 300);
  };

  // Function to handle icon click and navigate to specific route
  const handleIconClick = (categoryName) => {
    // Convert category name to route path
    const routeMap = {
      "Cars": "/cars",
      "Rentals": "/rentals",
      "Home Care": "/home-care",
      "Services": "/services",
      "Automobiles": "/automobiles",
      "Events": "/events",
      "For Sale": "/for-sale",
      "Jobs": "/jobs"
    };

    const route = routeMap[categoryName] || `/${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(route);
  };

  const searchCategories = [
    { name: "Housing", image: "/house.png", color: "bg-purple-100" },
    { name: "Jobs", image: "/car1.png", color: "bg-blue-100" },
    { name: "Services", image: "/carservice.png", color: "bg-green-100" },
    { name: "TakeCare", image: "/categories/amazon.png", color: "bg-yellow-100" },
    { name: "Marketplace", image: "/Furniture.png", color: "bg-blue-50" },
    { name: "Freelancers", image: "/phiyano.png", color: "bg-orange-100" },
    { name: "Relocation Services", image: "/bag.png", color: "bg-red-100" },
    { name: "Local Events", image: "/bike.png", color: "bg-teal-100" },
  ];

  // Category data for the rotating icons with routes
  const categories = [
    {
      id: 1,
      name: "Cars",
      route: "/cars",
      position: "top",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      icon: <FaCar className="w-full h-full" />,
      labelPosition: "right",
    },
    {
      id: 2,
      name: "Rentals",
      route: "/rentals",
      position: "bottom",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      icon: <GiHouseKeys className="w-full h-full" />,
      labelPosition: "right",
    },
    {
      id: 3,
      name: "Take Care",
      route: "/takecare",
      position: "right",
      color: "text-green-500",
      bgColor: "bg-green-50",
      icon: <MdCleaningServices className="w-full h-full" />,
      labelPosition: "right",
    },
    {
      id: 4,
      name: "Services",
      route: "/services",
      position: "left",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      icon: <FaTools className="w-full h-full" />,
      labelPosition: "left",
    },
    {
      id: 5,
      name: "Electronics",
      route: "/electronics",
      position: "top-right",
      color: "text-red-500",
      bgColor: "bg-red-50",
      icon: <GiCarWheel className="w-full h-full" />,
      labelPosition: "right",
    },
    {
      id: 6,
      name: "Events",
      route: "/events",
      position: "top-left",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      icon: <GiPartyPopper className="w-full h-full" />,
      labelPosition: "left",
    },
    {
      id: 7,
      name: "For Sale",
      route: "/forsale",
      position: "bottom-right",
      color: "text-teal-500",
      bgColor: "bg-teal-50",
      icon: <FaShoppingCart className="w-full h-full" />,
      labelPosition: "right",
    },
    {
      id: 8,
      name: "Jobs",
      route: "/jobs",
      position: "bottom-left",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      icon: <FaBriefcase className="w-full h-full" />,
      labelPosition: "left",
    },
  ];

  // Get position classes for icons - Responsive version
  const getPositionClasses = (position) => {
    switch (position) {
      case "top":
        return "absolute -top-4 sm:-top-6 md:-top-8 left-1/2 -translate-x-1/2";
      case "bottom":
        return "absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2";
      case "right":
        return "absolute top-1/2 -right-4 sm:-right-6 md:-right-8 -translate-y-1/2";
      case "left":
        return "absolute top-1/2 -left-4 sm:-left-6 md:-left-8 -translate-y-1/2";
      case "top-right":
        return "absolute top-4 sm:top-6 md:top-8 right-8 sm:right-10 md:right-12 lg:right-16";
      case "top-left":
        return "absolute top-4 sm:top-6 md:top-8 left-8 sm:left-10 md:left-12 lg:left-16";
      case "bottom-right":
        return "absolute bottom-4 sm:bottom-6 md:bottom-8 right-8 sm:right-10 md:right-12 lg:right-16";
      case "bottom-left":
        return "absolute bottom-4 sm:bottom-6 md:bottom-8 left-8 sm:left-10 md:left-12 lg:left-16";
      default:
        return "";
    }
  };

  // Responsive size classes
  const getSizeClasses = (position) => {
    const isCorner = ["top-right", "top-left", "bottom-right", "bottom-left"].includes(position);
    
    if (isCorner) {
      return "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14";
    }
    
    return "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16";
  };

  // Responsive icon sizes
  const getIconSizeClasses = (position) => {
    const isCorner = ["top-right", "top-left", "bottom-right", "bottom-left"].includes(position);
    
    if (isCorner) {
      return "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6";
    }
    
    return "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8";
  };

  const CategoryIcon = ({ category }) => {
    const isActive = activeCategory === category.id;
    const isLabelLeft = category.labelPosition === "left";

    return (
      <div
        className={`${getPositionClasses(category.position)} group`}
        onMouseEnter={() => setActiveCategory(category.id)}
        onMouseLeave={() => setActiveCategory(null)}
        onClick={() => handleIconClick(category.name)} // Add onClick handler
      >
        <div className="relative flex items-center space-x-0 cursor-pointer"> {/* Add cursor-pointer */}
          {/* Label on LEFT side for Services, Events, Jobs */}
          {isLabelLeft && (
            <div
              className={`
              whitespace-nowrap z-40
              px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-medium 
              text-xs sm:text-sm md:text-base
              ${category.color} ${category.bgColor}
              border border-white shadow-lg
              transition-all duration-300 ease-out transform
              ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 sm:translate-x-3 md:translate-x-4 pointer-events-none"
              }
              absolute right-full mr-0
            `}
            >
              {category.name}
            </div>
          )}

          {/* Icon Container */}
          <div
            className={`
            ${getSizeClasses(category.position)} 
            bg-white rounded-full p-1 sm:p-1.5 md:p-2 shadow-lg
            transition-all duration-300 ease-out transform
            ${isActive ? "scale-110 shadow-xl" : "scale-100"}
            group-hover:scale-110 group-hover:shadow-xl
            hover:bg-gray-50 active:scale-105
            z-30
            ${isLabelLeft ? "order-2" : ""}
          `}
          >
            <div
              className={`w-full h-full flex items-center justify-center ${category.color}`}
            >
              <div className={getIconSizeClasses(category.position)}>
                <div
                  className={`transition-transform duration-300
                    ${isActive ? "rotate-6 " : ""}
                    group-hover:rotate-6
                  `}
                >
                  {category.icon}
                </div>
              </div>
            </div>
          </div>

          {/* Label on RIGHT side for all others */}
          {!isLabelLeft && (
            <div
              className={`
              whitespace-nowrap z-40
              px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-medium 
              text-xs sm:text-sm md:text-base
              ${category.color} ${category.bgColor}
              border border-white shadow-lg
              transition-all duration-300 ease-out transform
              ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 sm:-translate-x-3 md:-translate-x-4 pointer-events-none"
              }
              absolute left-full ml-0
            `}
            >
              {category.name}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="lg:min-h-[650px] overflow-x-hidden relative">
      {/* Dark Overlay when search is active */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-all duration-500 ease-in-out ${
          isSearchActive
            ? "opacity-90 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCloseSearch}
      />

      {/* Search Bar Modal - Positioned at Top */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isSearchActive
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="container max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              What are you looking for?
            </h2>
            <button
              onClick={handleCloseSearch}
              className="text-white transition-colors duration-300 z-50 p-1 sm:p-2 hover:text-red-500"
            >
              <FaTimes className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>
          </div>

          <div ref={searchContainerRef} className="relative">
            <button
              onClick={handleSearchClick}
              className="
                absolute right-2 sm:right-3 z-50 top-1/2 -translate-y-1/2 
                bg-[#27bb97] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 
                rounded-lg sm:rounded-xl text-sm sm:text-base font-medium
                cursor-pointer transition-all duration-300 
                hover:bg-[#1fa987] hover:shadow-lg  
              "
            >
              Search
            </button>

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for houses, services, jobs, events..."
              className="w-full pl-4 sm:pl-6 md:pl-8 pr-28 sm:pr-32 md:pr-40 py-3 sm:py-4 md:py-5 
                bg-white rounded-xl sm:rounded-2xl focus:outline-none 
                placeholder:text-gray-500 text-gray-800 text-sm sm:text-base md:text-lg 
                cursor-text transition-all duration-500 focus:border-[#27BB97] 
                focus:shadow-xl border-2 border-transparent"
              onClick={handleSearchClick}
            />
          </div>

          {/* Categories Dropdown */}
          {(isCategoriesOpen || isAnimating) && isSearchActive && (
            <div
              ref={dropdownRef}
              className={`mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl 
                border border-gray-200 overflow-hidden transform transition-all duration-500 ease-out ${
                isAnimating
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-4 opacity-0 scale-95"
              }`}
              style={{
                transformOrigin: "top center",
              }}
            >
              <div className="p-4 sm:p-6">
                {/* Header with Browse Categories and View All side by side */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                    Browse Categories
                  </h3>
                  <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                    rounded-lg hover:bg-[#27BB97] hover:text-white transition-all duration-300 
                    group text-gray-700 hover:shadow-md text-sm sm:text-base">
                    <span className="font-semibold">View all categories</span>
                    <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Image Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                  {searchCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex flex-col bg-gray-50 items-center p-2 sm:p-3 md:p-4 
                        rounded-lg sm:rounded-xl hover:shadow-lg cursor-pointer transition-all duration-300 
                        border border-gray-100 hover:border-[#27BB97] group"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isAnimating
                          ? `fadeInUp 0.5s ease-out ${index * 50}ms both`
                          : "none",
                      }}
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full ${category.color} 
                          flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 object-contain"
                          />
                        ) : (
                          <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 text-center 
                        group-hover:text-[#27BB97] break-words px-1">
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <section className="px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 max-w-7xl mx-auto mt-8 ">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold leading-snug sm:leading-tight md:mt-4 mt-8">
                ONE PLATFORM FOR ALL YOUR{" "}
                <span className="text-[#27BB97] relative inline-block">
                  LOCAL
                  <svg
                    className="absolute -bottom-1 md:-bottom-2 left-0 w-full"
                    height="6"
                    viewBox="0 0 200 6"
                  >
                    <path
                      d="M0,3 Q50,0 100,3 T200,3"
                      stroke="#27BB97"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="4,4"
                    />
                  </svg>
                </span>{" "}
                NEEDS
              </h1>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                Find houses for rent or sale, trusted nanny & home care, local
                services, vehicles, and travel options — all in one place.
              </p>
            </div>

            {/* Original Search Bar (hidden when search is active) */}
            {!isSearchActive && (
              <div className="relative mt-4 sm:mt-6 md:mt-8">
                <div
                  ref={searchContainerRef}
                  className="relative transition-all duration-500 ease-out w-full"
                >
                  <button
                    onClick={handleSearchClick}
                    className="
                      absolute right-0 z-10
                      bg-[#27bb97] text-white px-3  py-3.5 sm:px-4 md:px-5 sm:py-4 md:py-5 
                      rounded-lg sm:rounded-xl text-xs sm:text-sm 
                      cursor-pointer transition-all duration-300 
                      hover:bg-[#1fa987] hover:shadow-lg 
                    "
                  >
                    Search
                  </button>

                  <input
                    type="text"
                    placeholder="Search for a listing..."
                    className="w-full   md:pl-4  py-2.5 sm:py-3 md:py-4 
                      backdrop-blur-3xl bg-black/10 border-2 border-[#27BB97]/30 
                      rounded-lg sm:rounded-xl focus:outline-none placeholder:text-gray-600 
                      text-gray-800 cursor-text transition-all duration-500 
                      focus:border-[#27BB97] focus:shadow-lg text-sm sm:text-base"
                    onClick={handleSearchClick}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Carousel */}
          <div
            className={`relative flex justify-center items-center transition-all duration-300 
              order-1 lg:order-2 mb-4 sm:mb-6 md:mb-8 lg:mb-0   ${
              isSearchActive ? "opacity-30" : "opacity-100"
            }`}
          >
            {/* Orange image container */}
            <div className="relative z-10 bg-orange-400 rounded-full 
              w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] 
              lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] 
              overflow-hidden flex items-center justify-center mx-auto">
              <div className="bg-orange-300 rounded-full 
                w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] 
                lg:w-[280px] lg:h-[280px] xl:w-[320px] xl:h-[320px] 
                overflow-hidden">
                <img
                  src="/Services/HomeServices/hero-1.png"
                  alt="Hero-image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Rotating circle with icons */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] 
              lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 
              border border-green-200 rounded-full">
              
              {/* Render all category icons */}
              {categories.map((category) => (
                <CategoryIcon key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .break-words {
            word-break: break-word;
            hyphens: auto;
          }
        }
      `}</style>
    </div>
  );
}