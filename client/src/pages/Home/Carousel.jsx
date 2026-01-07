import React, { useState, useRef, useEffect } from "react";

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
    { name: "TakeCare", image: "/categories/amazon.png", color: "bg-yellow-100" },
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
      icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
      labelPosition: "right"
    },
    { 
      id: 2, 
      name: "Rentals", 
      position: "bottom", 
      color: "text-blue-500", 
      bgColor: "bg-blue-50",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      labelPosition: "right"
    },
    { 
      id: 3, 
      name: "Home Care", 
      position: "right", 
      color: "text-green-500", 
      bgColor: "bg-green-50",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      labelPosition: "right"
    },
    { 
      id: 4, 
      name: "Services", 
      position: "left", 
      color: "text-purple-500", 
      bgColor: "bg-purple-50",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      labelPosition: "left"
    },
    { 
      id: 5, 
      name: "Automobiles", 
      position: "top-right", 
      color: "text-red-500", 
      bgColor: "bg-red-50",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      labelPosition: "right"
    },
    { 
      id: 6, 
      name: "Events", 
      position: "top-left", 
      color: "text-yellow-500", 
      bgColor: "bg-yellow-50",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      labelPosition: "left"
    },
    { 
      id: 7, 
      name: "Travel", 
      position: "bottom-right", 
      color: "text-teal-500", 
      bgColor: "bg-teal-50",
      icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
      labelPosition: "right"
    },
    { 
      id: 8, 
      name: "Jobs", 
      position: "bottom-left", 
      color: "text-indigo-500", 
      bgColor: "bg-indigo-50",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      labelPosition: "left"
    },
  ];

  // Get position classes for icons
  const getPositionClasses = (position) => {
    switch(position) {
      case 'top':
        return 'absolute -top-8 left-1/2 -translate-x-1/2';
      case 'bottom':
        return 'absolute -bottom-8 left-1/2 -translate-x-1/2';
      case 'right':
        return 'absolute top-1/2 -right-8 -translate-y-1/2';
      case 'left':
        return 'absolute top-1/2 -left-8 -translate-y-1/2';
      case 'top-right':
        return 'absolute top-8 right-12 md:right-16';
      case 'top-left':
        return 'absolute top-8 left-12 md:left-16';
      case 'bottom-right':
        return 'absolute bottom-8 right-12 md:right-16';
      case 'bottom-left':
        return 'absolute bottom-8 left-12 md:left-16';
      default:
        return '';
    }
  };

  const getSizeClasses = (position) => {
    return ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(position)
      ? 'w-10 md:w-14 h-10 md:h-14'
      : 'w-12 md:w-16 h-12 md:h-16';
  };

  const getIconSize = (position) => {
    return ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(position)
      ? 'w-6 h-6 md:w-7 md:h-7'
      : 'w-8 h-8';
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
            <div className={`
              whitespace-nowrap z-40
              px-4 py-2 rounded-full font-medium text-sm md:text-base
              ${category.color} ${category.bgColor}
              border border-white shadow-lg
              transition-all duration-300 ease-out transform
              ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
              absolute right-full mr-0
            `}>
              {category.name}
            </div>
          )}

          {/* Icon Container */}
          <div className={`
            ${getSizeClasses(category.position)} 
            bg-white rounded-full p-2 shadow-lg
            transition-all duration-300 ease-out transform
            ${isActive ? 'scale-110 shadow-xl' : 'scale-100'}
            group-hover:scale-110 group-hover:shadow-xl
            z-30
            ${isLabelLeft ? 'order-2' : ''}
          `}>
            <div className={`w-full h-full flex items-center justify-center ${category.color}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${getIconSize(category.position)} transition-transform duration-300
                  ${isActive ? 'rotate-6' : ''}
                  group-hover:rotate-6
                `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={category.icon}
                />
              </svg>
            </div>
          </div>

          {/* Label on RIGHT side for all others */}
          {!isLabelLeft && (
            <div className={`
              whitespace-nowrap z-40
              px-4 py-2 rounded-full font-medium text-sm md:text-base
              ${category.color} ${category.bgColor}
              border border-white shadow-lg
              transition-all duration-300 ease-out transform
              ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
              absolute left-full ml-0
            `}>
              {category.name}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Dark Overlay when search is active */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-all duration-500 ease-in-out ${
          isSearchActive 
            ? 'opacity-90 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleCloseSearch}
      />

      {/* Search Bar Modal - Positioned at Top */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out  ${
          isSearchActive 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="container  max-w-4xl mx-auto px-4 py-8 ">
          <div className="flex items-center justify-between mb-4 ">
            <h2 className="text-2xl font-bold text-white">What are you looking for?</h2>
            <button
              onClick={handleCloseSearch}
              className="text-white transition-colors duration-300 z-50 p-2 hover:text-red-500 "
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div 
            ref={searchContainerRef}
            className="relative"
          >
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
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
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
              <div className="relative mt-8">
                <div
                  ref={searchContainerRef}
                  className="relative transition-all duration-500 ease-out w-full"
                >
                  <button
                    onClick={handleSearchClick}
                    className="
                      absolute right-3 z-50 top-1/2 -translate-y-1/2 
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

            {/* Buttons moved below search bar */}
            {/* <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 transition-all duration-300 ${isSearchActive ? 'opacity-30' : 'opacity-100'}`}>
              <button className="px-6 md:px-8 py-3 bg-[#27BB97] text-white rounded-full hover:shadow-lg transition transform hover:scale-105">
                Get Started
              </button>
              <button className="px-6 md:px-8 py-3 border-2 border-[#27BB97] text-[#27BB97] rounded-full hover:bg-[#27BB97] hover:text-white transition">
                How It Works
              </button>
            </div> */}
          </div>

          {/* Right Section - Carousel */}
          <div className={`relative flex justify-center items-center transition-all duration-300 ${isSearchActive ? 'opacity-30' : 'opacity-100'}`}>
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