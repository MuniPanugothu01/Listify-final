import React, { useState, useRef, useEffect } from "react";
// Import React Icons
import {
  FaCar,
  FaHome,
  FaTools,
  FaBriefcase,
  FaCalendarAlt,
  FaPlane,
  FaShoppingCart,
  FaHandsHelping,
  FaSearch,
  FaTimes,
  FaArrowRight,
  FaCarAlt,
  FaCalendarCheck,
  FaHandshake,
  FaBuilding,
  FaUsers
} from "react-icons/fa";
import {
  MdApartment,
  MdLocalOffer,
  MdEventAvailable,
  MdCleaningServices
} from "react-icons/md";
import {
  GiCarWheel,
  GiHouseKeys,
  GiToolbox,
  GiPartyPopper
} from "react-icons/gi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

export default function Carousel() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

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
      setIsExpanded(true);
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
      setIsExpanded(false);
    }, 300);
  };

  const searchCategories = [
    { name: "Housing", image: "/house.png", color: "bg-purple-100" },
    { name: "Jobs", image: "/car1.png", color: "bg-blue-100" },
    { name: "Services", image: "/carservice.png", color: "bg-green-100" },
    {
      name: "TakeCare",
      image: "/categories/amazon.png",
      color: "bg-yellow-100",
    },
    { name: "Marketplace", image: "/Furniture.png", color: "bg-blue-50" },
    { name: "Freelancers", image: "/phiyano.png", color: "bg-orange-100" },
    { name: "Relocation Services", image: "/bag.png", color: "bg-red-100" },
    { name: "Local Events", image: "/bike.png", color: "bg-teal-100" },
  ];

  // Category data for the rotating icons
  const categories = [
    {
      id: 1,
      name: "Cars",
      position: "top",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      icon: <FaCar className="w-8 h-8" />,
      labelPosition: "right",
    },
    {
      id: 2,
      name: "Rentals",
      position: "bottom",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      icon: <GiHouseKeys className="w-8 h-8" />,
      labelPosition: "right",
    },
    {
      id: 3,
      name: "Home Care",
      position: "right",
      color: "text-green-500",
      bgColor: "bg-green-50",
      icon: <MdCleaningServices className="w-8 h-8" />,
      labelPosition: "right",
    },
    {
      id: 4,
      name: "Services",
      position: "left",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      icon: <FaTools className="w-8 h-8" />,
      labelPosition: "left",
    },
    {
      id: 5,
      name: "Automobiles",
      position: "top-right",
      color: "text-red-500",
      bgColor: "bg-red-50",
      icon: <GiCarWheel className="w-8 h-8" />,
      labelPosition: "right",
    },
    {
      id: 6,
      name: "Events",
      position: "top-left",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      icon: <GiPartyPopper className="w-8 h-8" />,
      labelPosition: "left",
    },
    {
      id: 7,
      name: "Travel",
      position: "bottom-right",
      color: "text-teal-500",
      bgColor: "bg-teal-50",
      icon: <FaPlane className="w-8 h-8" />,
      labelPosition: "right",
    },
    {
      id: 8,
      name: "Jobs",
      position: "bottom-left",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      icon: <FaBriefcase className="w-8 h-8" />,
      labelPosition: "left",
    },
  ];

  // Get position classes for icons
  const getPositionClasses = (position) => {
    switch (position) {
      case "top":
        return "absolute -top-8 left-1/2 -translate-x-1/2";
      case "bottom":
        return "absolute -bottom-8 left-1/2 -translate-x-1/2";
      case "right":
        return "absolute top-1/2 -right-8 -translate-y-1/2";
      case "left":
        return "absolute top-1/2 -left-8 -translate-y-1/2";
      case "top-right":
        return "absolute top-8 right-12 md:right-16";
      case "top-left":
        return "absolute top-8 left-12 md:left-16";
      case "bottom-right":
        return "absolute bottom-8 right-12 md:right-16";
      case "bottom-left":
        return "absolute bottom-8 left-12 md:left-16";
      default:
        return "";
    }
  };

  const getSizeClasses = (position) => {
    return ["top-right", "top-left", "bottom-right", "bottom-left"].includes(
      position
    )
      ? "w-10 md:w-14 h-10 md:h-14"
      : "w-12 md:w-16 h-12 md:h-16";
  };

  const CategoryIcon = ({ category }) => {
    const isActive = activeCategory === category.id;
    const isLabelLeft = category.labelPosition === "left";

    return (
      <div
        className={`${getPositionClasses(category.position)} group`}
        onMouseEnter={() => setActiveCategory(category.id)}
        onMouseLeave={() => setActiveCategory(null)}
      >
        <div className="relative flex items-center space-x-0">
          {/* Label on LEFT side for Services, Events, Jobs */}
          {isLabelLeft && (
            <div
              className={`
              whitespace-nowrap z-40
              px-4 py-2 rounded-full font-medium text-sm md:text-base
              ${category.color} ${category.bgColor}
              border border-white shadow-lg
              transition-all duration-300 ease-out transform
              ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 pointer-events-none"
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
            bg-white rounded-full p-2 shadow-lg
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

          {/* Label on RIGHT side for all others */}
          {!isLabelLeft && (
            <div
              className={`
              whitespace-nowrap z-40
              px-4 py-2 rounded-full font-medium text-sm md:text-base
              ${category.color} ${category.bgColor}
              border border-white shadow-lg
              transition-all duration-300 ease-out transform
              ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 pointer-events-none"
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
    <div className="min-h-screen overflow-x-hidden relative">
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out  ${
          isSearchActive
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="container  max-w-4xl mx-auto px-4 py-8 ">
          <div className="flex items-center justify-between mb-4 ">
            <h2 className="text-2xl font-bold text-white">
              What are you looking for?
            </h2>
            <button
              onClick={handleCloseSearch}
              className="text-white transition-colors duration-300 z-50 p-2 hover:text-red-500 "
            >
              <FaTimes className="w-8 h-8" />
            </button>
          </div>

          <div ref={searchContainerRef} className="relative">
            <button
              onClick={handleSearchClick}
              className="
                absolute right-3 z-50 top-1/2 -translate-y-1/2 
                bg-[#27bb97] text-white px-8 py-4 rounded-xl text-base font-medium
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
              className="w-full pl-8 pr-40 py-5 bg-white rounded-2xl focus:outline-none placeholder:text-gray-500 text-gray-800 text-lg cursor-text transition-all duration-500 focus:border-[#27BB97] focus:shadow-xl border-2 border-transparent"
              onClick={handleSearchClick}
            />
          </div>

          {/* Categories Dropdown */}
          {(isCategoriesOpen || isAnimating) && isSearchActive && (
            <div
              ref={dropdownRef}
              className={`mt-6 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-500 ease-out ${
                isAnimating
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-4 opacity-0 scale-95"
              }`}
              style={{
                transformOrigin: "top center",
              }}
            >
              <div className="p-6">
                {/* Header with Browse Categories and View All side by side */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Browse Categories
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#27BB97] hover:text-white transition-all duration-300 group text-gray-700 hover:shadow-md">
                    <span className="font-semibold">View all categories</span>
                    <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Image Categories Grid */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                  {searchCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex flex-col bg-gray-50 items-center p-4 rounded-xl hover:shadow-lg cursor-pointer transition-all duration-300 border border-gray-100 hover:border-[#27BB97] group"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isAnimating
                          ? `fadeInUp 0.5s ease-out ${index * 50}ms both`
                          : "none",
                      }}
                    >
                      <div
                        className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center group-hover:text-[#27BB97]">
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
      <section className="px-4 md:px-8 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                ONE PLATFORM FOR ALL YOUR{" "}
                <span className="text-[#27BB97] relative">
                  LOCAL
                  <svg
                    className="absolute -bottom-1 md:-bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                  >
                    <path
                      d="M0,4 Q50,0 100,4 T200,4"
                      stroke="#27BB97"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </svg>
                </span>{" "}
                NEEDS
              </h1>

              <p className="text-gray-600 text-base md:text-lg">
                Find houses for rent or sale, trusted nanny & home care, local
                services, vehicles, and travel options — all in one place.
              </p>
            </div>

            {/* Original Search Bar (hidden when search is active) */}
            {!isSearchActive && (
              <div className="relative mt-8 ">
                <div
                  ref={searchContainerRef}
                  className="relative transition-all duration-500 ease-out w-full"
                >
                  <button
                    onClick={handleSearchClick}
                    className="
                      absolute right-3 z-10 top-1/2 -translate-y-1/2 
                      bg-[#27bb97] text-white px-6 py-4 rounded-xl text-sm 
                      cursor-pointer transition-all duration-300 
                      hover:bg-[#1fa987] hover:shadow-lg 
                    "
                  >
                    Search
                  </button>

                  <input
                    type="text"
                    placeholder="Search for a listing..."
                    className="w-full pl-28 pr-32 py-4 backdrop-blur-3xl bg-black/10 border-2 border-[#27BB97]/30 rounded-xl focus:outline-none placeholder:text-gray-600 text-gray-800 cursor-text transition-all duration-500 focus:border-[#27BB97] focus:shadow-lg"
                    onClick={handleSearchClick}
                  />
                </div>
              </div>
            )}

            <div className="absolute bottom-32">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="4.015 53.195 774.841 72.3952"
                width="904.841px"
                height="130.3952px"
              >
                <path
                  style={{ fill: "none", stroke: "rgba(156, 246, 52, 1)",
                    strokeWidth: "3px"
                   }}
                  d="M 4.015 114.085 C 7.75 111.284 12.271 109.175 14.721 106.725 C 15.581 105.865 22.83 106.805 23.419 107.394 C 28.245 112.22 43.314 116.598 52.86 113.416 C 66.308 108.933 84.561 95.475 100.368 103.379 C 111.95 109.17 131.552 122.18 147.876 118.1 C 161.29 114.746 174.303 112.246 185.346 106.725 C 187.511 105.642 198.046 104.711 200.736 106.056 C 214.249 112.812 227.783 120.823 243.56 123.453 C 246.921 124.013 257.968 125.951 261.626 124.122 C 267.093 121.388 279.725 114.085 285.714 114.085 C 287.1 114.085 293.531 113.203 294.413 114.085 C 297.944 117.616 316.89 122.57 322.516 121.445 C 336.132 118.722 351.625 111.24 363.332 105.386 C 366.216 103.945 373.624 105.514 376.046 106.725 C 387.313 112.359 396.999 118.17 408.832 122.114 C 425.988 127.833 433.611 104.055 453.663 110.739 C 463.104 113.886 472.469 129.228 485.781 124.791 C 495.342 121.604 502.919 114.214 512.546 109.401 C 513.596 108.876 520.803 107.622 521.914 108.732 C 537.514 124.333 564.276 124.122 590.833 124.122 C 605.134 124.122 621.936 125.129 634.995 120.776 C 648.377 116.315 658.732 105.727 671.797 101.372 C 683.862 97.349 701.283 94.636 709.936 85.982 C 729.728 66.191 749.483 53.195 778.856 53.195"
                  id="object-0"
                  transform="matrix(1, 0, 0, 1, 0, -1.4210854715202004e-14)"
                />
              </svg>
            </div>
          </div>

          {/* Right Section - Carousel */}
          <div
            className={`relative flex justify-center items-center transition-all duration-300 ${
              isSearchActive ? "opacity-30" : "opacity-100"
            }`}
          >
            {/* Orange image container */}
            <div className="relative z-10 bg-orange-400 rounded-full w-[300px] md:w-[400px] h-[300px] md:h-[400px] overflow-hidden flex items-center justify-center mx-auto">
              <div className="bg-orange-300 rounded-full w-[240px] md:w-[320px] h-[240px] md:h-[320px] overflow-hidden">
                <img
                  src="/Services/HomeServices/hero-1.png"
                  alt="Hero-image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Rotating circle with icons */}
            <div className="absolute top-50 left-72 -translate-x-1/2 -translate-y-1/2 w-[450px] md:w-[500px] h-[400px] md:h-[500px] border border-green-200 rounded-full">
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
      `}</style>
    </div>
  );
}