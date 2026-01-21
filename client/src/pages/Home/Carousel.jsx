import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import React Icons
import {
  FaCar,
  FaTools,
  FaBriefcase,
  FaShoppingCart
} from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";
import { GiCarWheel, GiHouseKeys, GiPartyPopper } from "react-icons/gi";

export default function Carousel() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

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

  // Handle icon click - navigate to respective page
  const handleIconClick = (categoryName) => {
    const routeMap = {
      "Cars": "/cars",
      "Rentals": "/rentals",
      "Home Care": "/takecare",
      "Services": "/services",
      "Automobiles": "/cars",
      "Events": "/events",
      "For Sale": "/forsale",
      "Jobs": "/jobs"
    };

    const route = routeMap[categoryName];
    if (route) {
      navigate(route);
    }
  };

  // Category data for the rotating icons
  const categories = [
    {
      id: 1,
      name: "Cars",
      position: "top",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      icon: <FaCar className="w-full h-full" />,
      labelPosition: "right",
      route: "/cars"
    },
    {
      id: 2,
      name: "Rentals",
      position: "bottom",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      icon: <GiHouseKeys className="w-full h-full" />,
      labelPosition: "right",
      route: "/rentals"
    },
    {
      id: 3,
      name: "Home Care",
      position: "right",
      color: "text-green-500",
      bgColor: "bg-green-50",
      icon: <MdCleaningServices className="w-full h-full" />,
      labelPosition: "right",
      route: "/takecare"
    },
    {
      id: 4,
      name: "Services",
      position: "left",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      icon: <FaTools className="w-full h-full" />,
      labelPosition: "left",
      route: "/services"
    },
    {
      id: 5,
      name: "Automobiles",
      position: "top-right",
      color: "text-red-500",
      bgColor: "bg-red-50",
      icon: <GiCarWheel className="w-full h-full" />,
      labelPosition: "right",
      route: "/cars"
    },
    {
      id: 6,
      name: "Events",
      position: "top-left",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      icon: <GiPartyPopper className="w-full h-full" />,
      labelPosition: "left",
      route: "/events"
    },
    {
      id: 7,
      name: "For Sale",
      position: "bottom-right",
      color: "text-teal-500",
      bgColor: "bg-teal-50",
      icon: <FaShoppingCart className="w-full h-full" />,
      labelPosition: "right",
      route: "/forsale"
    },
    {
      id: 8,
      name: "Jobs",
      position: "bottom-left",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      icon: <FaBriefcase className="w-full h-full" />,
      labelPosition: "left",
      route: "/jobs"
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
        className={`${getPositionClasses(category.position)} group cursor-pointer`}
        onMouseEnter={() => setActiveCategory(category.id)}
        onMouseLeave={() => setActiveCategory(null)}
        onClick={() => handleIconClick(category.name)}
      >
        <div className="relative flex items-center space-x-0">
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

      {/* Main Content */}
      <section className="px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 max-w-7xl mx-auto mt-8">
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
                      absolute right-2 sm:right-3 z-10 top-1/2 -translate-y-1/2 
                      bg-[#27bb97] text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 
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
                    className="w-full pl-20 sm:pl-24 md:pl-28 pr-24 sm:pr-28 md:pr-32 py-2.5 sm:py-3 md:py-4 
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
              order-1 lg:order-2 mb-4 sm:mb-6 md:mb-8 lg:mb-0 ${
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