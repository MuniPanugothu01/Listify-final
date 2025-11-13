import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLocationClick = () => {
    setShowLocationDropdown(!showLocationDropdown);
  };
  const handleMoreClick = (e) => {
    e.preventDefault();
    setShowMoreDropdown(!showMoreDropdown);
  };

  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA"
  ];

  const mainMenuItems = [
    "Houses",
    "Services",
    "Sales",
    "Gigs",
    "Events",
    "Roommates"
  ];

  const moreMenuItems = [
    "Jobs",
    "Cares",
    "Blogs",
    "Forums"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`shadow-lg sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/90 backdrop-blur-sm" : "bg-white"
    }`}>
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-3">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Listify</h1>
          </div>
          {/* Desktop Search Bars - Divided into General and Location */}
          <div className="hidden sm:flex flex-1 justify-center max-w-md sm:max-w-lg md:max-w-2xl mx-2 sm:mx-4 md:mx-8">
            <div className="flex w-full space-x-1 sm:space-x-2">
              {/* General Search */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by service or category"
                  className="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              {/* Location Search */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onFocus={handleLocationClick}
                  onClick={handleLocationClick}
                  onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                />
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {/* Location Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {locations.map((location, index) => (
                      <div
                        key={index}
                        className="px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          // Handle location selection
                          console.log("Selected location:", location);
                          setShowLocationDropdown(false);
                        }}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 lg:space-x-6">
              {mainMenuItems.map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs md:text-sm lg:text-base text-gray-700 hover:text-gray-900 px-1 whitespace-nowrap">
                    {item}
                  </a>
                </li>
              ))}
              {/* More Dropdown */}
              <li className="relative">
                <a
                  href="#"
                  onClick={handleMoreClick}
                  className="text-xs md:text-sm lg:text-base text-gray-700 hover:text-gray-900 px-1 whitespace-nowrap flex items-center"
                >
                  More
                  <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                {showMoreDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg min-w-max z-10">
                    {moreMenuItems.map((item, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                        onClick={() => setShowMoreDropdown(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            </ul>
            {/* Right side actions */}
            <div className="flex items-center space-x-2 md:space-x-4 ml-4">
              <button className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 text-xs md:text-sm lg:text-base whitespace-nowrap">
                Post Now
              </button>
              <button className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 text-xs md:text-sm lg:text-base whitespace-nowrap">
                SignIn
              </button>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex-shrink-0">
            <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <ul className="space-y-2 px-3 pt-2">
              {mainMenuItems.map((item) => (
                <li key={item}>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 text-sm">
                    {item}
                  </a>
                </li>
              ))}
              {/* Mobile More Dropdown */}
              <li className="relative">
                <a
                  href="#"
                  onClick={handleMoreClick}
                  className="block px-3 py-2 text-gray-700 hover:text-gray-900 text-sm flex items-center justify-between"
                >
                  More
                  <svg className={`h-4 w-4 transition-transform ${showMoreDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                {showMoreDropdown && (
                  <ul className="pl-4 space-y-1 mt-1 border-l border-gray-300">
                    {moreMenuItems.map((item, index) => (
                      <li key={index}>
                        <a href="#" className="block px-3 py-1 text-gray-700 hover:text-gray-900 text-sm" onClick={() => setShowMoreDropdown(false)}>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
            {/* Mobile Search Bars - Divided into General and Location */}
            <div className="px-3 mt-4 space-y-3">
              {/* Mobile General Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by service or category"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              {/* Mobile Location Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onFocus={handleLocationClick}
                  onClick={handleLocationClick}
                  onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {/* Mobile Location Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {locations.map((location, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          // Handle location selection
                          console.log("Selected location:", location);
                          setShowLocationDropdown(false);
                        }}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Actions */}
            <div className="px-3 mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm">
                Post Now
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm">
                SignIn
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;