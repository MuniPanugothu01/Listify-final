import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import { LuPencilLine } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { TbCategory } from "react-icons/tb";
import {
  MdOutlineEventAvailable,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaChevronDown,
  FaSearch,
  FaList,
  FaCalendar,
  FaUserFriends,
  FaHome,
  FaBriefcase,
  FaHandHoldingHeart,
  FaLaptopCode,
  FaTools,
  FaBuilding,
  FaMoneyBillWave,
  FaBalanceScale,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showTopCities, setShowTopCities] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const locationDropdownRef = useRef(null);
  const navbarRef = useRef(null);
  const searchModalRef = useRef(null);

  // Category items with React Icons
  const categoryItems = [
    { name: "ALL", count: "88", icon: TbCategory },
    { name: "Events", count: "12", icon: MdOutlineEventAvailable },
    { name: "Roommates", count: "15", icon: FaUserFriends },
    { name: "Rentals", count: "23", icon: FaHome },
    { name: "Jobs", count: "34", icon: FaBriefcase },
    { name: "Care Services", count: "8", icon: FaHandHoldingHeart },
    { name: "IT Training", count: "5", icon: FaLaptopCode },
    { name: "Services", count: "45", icon: FaTools },
    { name: "Real Estate", count: "29", icon: MdOutlineRealEstateAgent },
    { name: "Financial & Taxation", count: "7", icon: FaMoneyBillWave },
    { name: "Lawyers", count: "11", icon: FaBalanceScale },
  ];

const mainMenuItems = [
  { name: "Roommates", path: "/roommates" },
  { name: "Rentals", path: "/rentals" },
  { name: "Jobs", path: "/jobs" },
  { name: "Events", path: "/events" },
  { name: "Services", path: "/services" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "TakeCare", path: "/takecare" },
];

  const moreMenuItems = [
    { name: "Jobs", path: "/jobs" },
    { name: "Cares", path: "/cares" },
    { name: "Blogs", path: "/blogs" },
    { name: "Forums", path: "/forums" },
      { name: "Community", path: "/community" },
      
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLocationClick = () => {
    setShowLocationDropdown(true);
    document.body.style.overflow = "hidden";
  };

  const handleMoreClick = (e) => {
    e.preventDefault();
    setShowMoreDropdown(!showMoreDropdown);
  };

  const closeLocationDropdown = () => {
    setShowLocationDropdown(false);
    setLocationSearch("");
    setShowTopCities(false);
    document.body.style.overflow = "unset";
  };

  const handleSearchClick = () => {
    setShowSearchModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
    setSearchQuery("");
    document.body.style.overflow = "unset";
  };

  // Enhanced locations data with categories
  const popularCities = [
    { name: "New York, NY", zip: "10001", country: "US" },
    { name: "Los Angeles, CA", zip: "90001", country: "US" },
    { name: "Chicago, IL", zip: "60601", country: "US" },
    { name: "Houston, TX", zip: "77001", country: "US" },
    { name: "Phoenix, AZ", zip: "85001", country: "US" },
    { name: "Philadelphia, PA", zip: "19101", country: "US" },
    { name: "San Antonio, TX", zip: "78201", country: "US" },
    { name: "San Diego, CA", zip: "92101", country: "US" },
  ];

  const suggestedLocations = [
    { name: "Miami, FL", zip: "33101", country: "US" },
    { name: "Seattle, WA", zip: "98101", country: "US" },
    { name: "Denver, CO", zip: "80201", country: "US" },
    { name: "Boston, MA", zip: "02101", country: "US" },
    { name: "Atlanta, GA", zip: "30301", country: "US" },
    { name: "Las Vegas, NV", zip: "89101", country: "US" },
    { name: "Portland, OR", zip: "97201", country: "US" },
    { name: "Detroit, MI", zip: "48201", country: "US" },
  ];

  const nearestZipCodes = [
    { name: "10002", area: "Lower East Side, NY", distance: "0.5 mi" },
    { name: "10003", area: "East Village, NY", distance: "1.2 mi" },
    { name: "10009", area: "Alphabet City, NY", distance: "1.5 mi" },
    { name: "10010", area: "Gramercy, NY", distance: "2.1 mi" },
    { name: "10011", area: "Chelsea, NY", distance: "2.8 mi" },
  ];

  const metroCities = [
    {
      name: "New York Metro",
      cities: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
    },
    {
      name: "Los Angeles Metro",
      cities: ["LA Downtown", "Hollywood", "Beverly Hills", "Santa Monica"],
    },
    {
      name: "Chicago Metro",
      cities: ["Chicago Downtown", "Evanston", "Oak Park", "Schaumburg"],
    },
    {
      name: "Bay Area Metro",
      cities: ["San Francisco", "San Jose", "Oakland", "Berkeley"],
    },
  ];

  const topCities = [
    { name: "New York, NY", country: "US" },
    { name: "Los Angeles, CA", country: "US" },
    { name: "Chicago, IL", country: "US" },
    { name: "Houston, TX", country: "US" },
    { name: "Phoenix, AZ", country: "US" },
    { name: "Philadelphia, PA", country: "US" },
    { name: "San Antonio, TX", country: "US" },
    { name: "San Diego, CA", country: "US" },
    { name: "Dallas, TX", country: "US" },
    { name: "San Jose, CA", country: "US" },
    { name: "Austin, TX", country: "US" },
    { name: "Jacksonville, FL", country: "US" },
  ];

  // Sulekha-style search data
  const trendingEventSearches = [
    "Inder Sahani Comedy Show Tickets",
    "Sonu Nigam Concert Tickets",
    "Artist Concert Tour Dates 2025",
    "Hariharan Live Concert Tickets",
    "Ghatan Karthick",
  ];

  const searchSuggestions = {
    ROOMMATES: ["Roommates", "Service"],
    Events: [
      "Events",
      "Rentals",
      "Jobs",
      "Local Services",
      "Lawyers",
      "Wedding Services",
    ],
    Roommates: [
      "Roommates",
      "IT Training",
      "Care Services",
      "Astrologers",
      "Immigration",
      "Cars",
    ],
  };

  // Countries for the dropdown - 3 countries as requested
  const countries = [
    { name: "United States", flag: "🇺🇸", code: "US" },
    { name: "India", flag: "🇮🇳", code: "IN" },
    { name: "United Kingdom", flag: "🇬🇧", code: "UK" },
  ];

  // Footer countries for display at bottom with real flag images
  const footerCountries = [
    {
      name: "India",
      code: "IN",
      flagImage: "https://flagcdn.com/w40/in.png",
      flagImage2x: "https://flagcdn.com/w80/in.png",
    },
    {
      name: "Canada",
      code: "CA",
      flagImage: "https://flagcdn.com/w40/ca.png",
      flagImage2x: "https://flagcdn.com/w80/ca.png",
    },
    {
      name: "United Kingdom",
      code: "UK",
      flagImage: "https://flagcdn.com/w40/gb.png",
      flagImage2x: "https://flagcdn.com/w80/gb.png",
    },
    {
      name: "United States",
      code: "US",
      flagImage: "https://flagcdn.com/w40/us.png",
      flagImage2x: "https://flagcdn.com/w80/us.png",
    },
  ];

  // Filter locations based on search input
  const filteredLocations = [
    ...popularCities,
    ...suggestedLocations,
    ...topCities,
  ].filter(
    (location) =>
      location.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
      (location.zip && location.zip.includes(locationSearch))
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.name);
    closeLocationDropdown();
    console.log("Selected location:", location);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = "Current Location";
          setSelectedLocation(currentLocation);
          closeLocationDropdown();
          console.log("Using current location:", position);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your current location. Please search manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    console.log("Selected country:", countryName);
  };

  const handleSearchSelect = (searchTerm) => {
    setSearchQuery(searchTerm);
    console.log("Searching for:", searchTerm);
  };

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        closeLocationDropdown();
      }
      if (
        searchModalRef.current &&
        !searchModalRef.current.contains(event.target)
      ) {
        closeSearchModal();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeLocationDropdown();
        closeSearchModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, []);

  // Enhanced scroll handler with smooth animation
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Change background when scrolled more than 50px
          setIsScrolled(scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0.8;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .location-dropdown {
          animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .search-modal-enter {
          animation: slideInFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .search-modal-exit {
          animation: slideOutToRight 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
            forwards;
        }

        .backdrop {
          animation: fadeIn 0.4s ease-out;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Navbar link hover effects */
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #2d7a82;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #2d7a82;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* More dropdown link styles */
        .more-dropdown-link {
          transition: all 0.3s ease;
        }

        .more-dropdown-link:hover {
          color: #2d7a82;
          background-color: #f0f9fa;
        }

        /* Smooth navbar transition */
        .navbar-transition {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Scrolled state styles */
        .navbar-scrolled {
          background-color: rgba(0, 0, 0, 0.95) !important;
          backdrop-filter: blur(20px) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .navbar-scrolled .nav-link {
          color: #ffffff;
        }

        .navbar-scrolled .nav-link:hover {
          color: #2d7a82;
        }

        .navbar-scrolled .logo-text {
          color: #ffffff;
        }

        .navbar-scrolled .search-input {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .navbar-scrolled .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .navbar-scrolled .search-icon {
          color: rgba(255, 255, 255, 0.7);
        }

        .navbar-scrolled .profile-button {
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }

        .navbar-scrolled .profile-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <nav
        ref={navbarRef}
        className={`border-b border-gray-300 sticky top-0 z-40 navbar-transition ${
          isScrolled 
            ? "navbar-scrolled border-gray-700" 
            : "bg-white border-gray-300"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-7">
          <div className="flex justify-between items-center py-4 md:py-3">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link
                to="/"
                className={`text-xl sm:text-2xl font-bold hover:text-gray-900 transition-colors logo-text ${
                  isScrolled ? "text-white" : "text-gray-800"
                }`}
              >
                Listify
              </Link>
            </div>

            {/* Desktop Search Bars */}
            <div className="hidden sm:flex flex-0 justify-center max-w-md sm:max-w-lg md:max-w-2xl mx-2 sm:mx-4 md:mx-8 ">
              <div className="flex space-x-1 sm:space-x-2">
                {/* General Search */}
                <div className="relative flex-1 ">
                  <input
                    type="text"
                    placeholder="Search by service or category"
                    className={`w-[10px] pl-8 sm:pl-10 pr-2 sm:pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c89a5e] text-sm cursor-pointer search-input ${
                      isScrolled 
                        ? "bg-white/10 border-white/20 text-white placeholder-white/70" 
                        : "border-gray-300 text-gray-900"
                    }`}
                    onFocus={handleSearchClick}
                    onClick={handleSearchClick}
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <FaSearch className={`h-4 w-4 sm:h-5 sm:w-5 search-icon ${
                      isScrolled ? "text-white/70" : "text-gray-400"
                    }`} />
                  </div>
                </div>

                {/* Location Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Location"
                    value={selectedLocation}
                    className={`w-[140px] pl-8 sm:pl-10 pr-8 sm:pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer search-input ${
                      isScrolled 
                        ? "bg-white/10 border-white/20 text-white placeholder-white/70" 
                        : "border-gray-300 text-gray-900"
                    }`}
                    onFocus={handleLocationClick}
                    onClick={handleLocationClick}
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className={`h-3 w-3 sm:h-5 sm:w-5 search-icon ${
                      isScrolled ? "text-white/70" : "text-gray-400"
                    }`} />
                  </div>
                  <div className="absolute inset-y-0 right-2 pr-2 sm:pr-3 flex items-center pointer-events-none">
                    <FaChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 search-icon ${
                      isScrolled ? "text-white/70" : "text-gray-400"
                    }`} />
                  </div>
                </div>


                
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-between flex-1">
              <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 lg:space-x-6">
                {mainMenuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`nav-link text-xs md:text-sm lg:text-base hover:text-gray-900 px-1 whitespace-nowrap ${
                        isScrolled ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {/* More Dropdown */}
                <li className="relative">
                  <a
                    href="#"
                    onClick={handleMoreClick}
                    className={`nav-link text-xs md:text-sm lg:text-base hover:text-gray-900 px-1 whitespace-nowrap flex items-center ${
                      isScrolled ? "text-white" : "text-gray-700"
                    }`}
                  >
                    More
                    <FaChevronDown className="h-4 w-4 ml-1" />
                  </a>
                  {showMoreDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg min-w-max z-10">
                      {moreMenuItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="more-dropdown-link block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                          onClick={() => setShowMoreDropdown(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              </ul>
              {/* Right side actions */}
              <div className="flex items-center space-x-3 md:space-x-4 ml-20">
                {/* Create Listing Button */}
                <button className="flex items-center gap-2 bg-[#27bb97] text-white px-4 py-3.5 md:px-4 md:py-3.5 rounded-lg text-xs md:text-sm lg:text-base whitespace-nowrap hover:bg-[#25676D] transition cursor-pointer">
                  <LuPencilLine className="text-white text-base md:text-lg" />
                  Create a Listing
                </button>

                <div className={`border rounded-lg px-3 py-1.5 md:px-4 md:py-3 hover:shadow-md cursor-pointer flex items-center gap-2 profile-button ${
                  isScrolled 
                    ? "border-white/30 text-white hover:bg-white/10" 
                    : "border-gray-300 text-gray-700"
                }`}>
                  <HiOutlineBars3BottomRight className="text-[20px] md:text-[22px]" />
                  <CgProfile className="text-[20px] md:text-[22px]" />
                </div>
              </div>

              
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex-shrink-0">
              <button
                onClick={toggleMobileMenu}
                className={isScrolled ? "text-white" : "text-gray-700"}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden pb-4 border-t ${
              isScrolled ? "border-gray-600" : "border-gray-200"
            }`}>
              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search by service or category"
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                      isScrolled 
                        ? "bg-white/10 border-white/20 text-white placeholder-white/70" 
                        : "border-gray-300"
                    }`}
                    onFocus={handleSearchClick}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                      isScrolled 
                        ? "bg-white/10 border-white/20 text-white placeholder-white/70" 
                        : "border-gray-300"
                    }`}
                    onFocus={handleLocationClick}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {mainMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`nav-link px-3 py-2 text-sm hover:bg-gray-100 rounded ${
                        isScrolled 
                          ? "text-white hover:bg-white/10" 
                          : "text-gray-700"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#2D7A82] text-white px-4 py-2 rounded-lg text-sm">
                  <LuPencilLine className="text-white" />
                  Create a Listing
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Rest of your existing code for Location Dropdown and Search Modal remains the same */}
      {/* Location Dropdown */}
      {showLocationDropdown && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm backdrop"
            onClick={closeLocationDropdown}
          />

          {/* Dropdown Content */}
          <div
            ref={locationDropdownRef}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] max-w-4xl mx-auto overflow-hidden location-dropdown"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Select Location
                </h3>
                <button
                  onClick={closeLocationDropdown}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="h-5 w-5 text-gray-500"
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

              {/* Enhanced Search Input with Country Dropdown and Current Location Icon */}
              <div className="flex space-x-2">
                {/* Left Side Country Dropdown */}
                <div className="relative flex-shrink-0">
                  <select
                    value={selectedCountry}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="pl-3 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white appearance-none cursor-pointer w-48"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FaChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by city, state or zip code"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Current Location Icon - Light Red */}
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      onClick={handleUseCurrentLocation}
                      className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Use Current Location"
                    >
                      <FaMapMarkerAlt className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-7 flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <IoLocationOutline />
                  <p>selected location:</p>
                </div>
                <p className="text-blue-400">India</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <CiLocationArrow1 />
                  <p>Suggested Location:</p>
                </div>
                <p className="text-blue-400">New York,NY</p>
              </div>
            </div>

            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 140px)" }}
            >
              {!locationSearch ? (
                <>
                  {/* Popular Cities */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Popular Cities
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {popularCities.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                        >
                          <div className="font-medium text-gray-800 text-sm">
                            {location.name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {location.zip}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suggested for You */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Suggested for You
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {suggestedLocations.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                        >
                          <div className="font-medium text-gray-800 text-sm">
                            {location.name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {location.zip}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nearest Zip Codes */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Nearest Zip Codes
                    </h4>
                    <div className="space-y-2 grid grid-cols-3 gap-4">
                      {nearestZipCodes.map((zip, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleLocationSelect({
                              name: `${zip.area} (${zip.name})`,
                              zip: zip.name,
                            })
                          }
                          className="w-full text-left p-3 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium text-gray-800 text-sm">
                              {zip.name}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {zip.area}
                            </div>
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            {zip.distance}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Choose Your Location - Metro & Top Cities */}
                  <div className="p-4 border-b border-gray-100 pb-7">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Choose Your Location
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Metro Cities */}
                      <div className="bg-white p-5 rounded-lg">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2">
                          Metro
                        </h5>
                        <div className="space-y-1">
                          {metroCities.map((metro, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleLocationSelect({ name: metro.name })
                              }
                              className="w-full text-left p-2 hover:bg-gray-50 hover:text-red-500 rounded text-sm text-gray-700"
                            >
                              {metro.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Top Cities */}
                      <div className="bg-white p-5 rounded-lg">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2">
                          Top Cities
                        </h5>
                        <div className="space-y-1">
                          {topCities.slice(0, 5).map((city, index) => (
                            <button
                              key={index}
                              onClick={() => handleLocationSelect(city)}
                              className="w-full text-left p-2 hover:bg-gray-50 hover:text-red-500 rounded text-sm text-gray-700"
                            >
                              {city.name}
                            </button>
                          ))}
                          {!showTopCities && (
                            <button
                              onClick={() => setShowTopCities(true)}
                              className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm text-blue-600 font-medium"
                            >
                              View all top cities →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Top Cities Expanded */}
                  {showTopCities && (
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-semibold text-gray-700">
                          Top Cities
                        </h4>
                        <button
                          onClick={() => setShowTopCities(false)}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Show less
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {topCities.map((city, index) => (
                          <button
                            key={index}
                            onClick={() => handleLocationSelect(city)}
                            className="text-left p-2 hover:bg-gray-50 rounded text-sm text-gray-700"
                          >
                            {city.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer with Countries - Updated with Real Flag Images */}
                  <div className="p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          Stay on Listify
                        </span>
                        <div className="flex space-x-2">
                          {footerCountries.map((country, index) => (
                            <button
                              key={index}
                              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs hover:bg-white transition-colors border border-gray-200 shadow-sm"
                              title={country.name}
                            >
                              <img
                                src={country.flagImage}
                                alt={`${country.name} flag`}
                                className="w-5 h-3.5 object-cover rounded-sm"
                                srcSet={`${country.flagImage} 1x, ${country.flagImage2x} 2x`}
                              />
                              <span className="text-gray-700 font-medium">
                                {country.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setShowTopCities(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline"
                      >
                        View top cities
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Search Results */
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Search Results
                  </h4>
                  {filteredLocations.length > 0 ? (
                    <div className="space-y-1">
                      {filteredLocations.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium text-gray-800 text-sm">
                              {location.name}
                            </div>
                            {location.zip && (
                              <div className="text-gray-500 text-xs">
                                Zip: {location.zip}
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <svg
                        className="h-12 w-12 text-gray-300 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-gray-500 text-sm">
                        No locations found. Try a different search.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal with Right Slide Animation */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm backdrop"
            onClick={closeSearchModal}
          />
          <div
            ref={searchModalRef}
            className="absolute inset-0 bg-gray-50 overflow-hidden search-modal-enter"
          >
            <div className="bg-white shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 bg-[#F3F3F3] border-b border-gray-200">
                <button
                  onClick={closeSearchModal}
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <FaChevronLeft className="h-5 w-5 text-gray-700" />
                </button>

                <div className="flex-1 flex items-center justify-center max-w-4xl mx-4">
                  {/* Main container with background and radius */}
                  <div className="flex flex-col h-[85px] sm:flex-row items-stretch sm:items-center w-full bg-white rounded-full border border-gray-200 shadow-sm overflow-hidden">
                    {/* Location Filter */}
                    <div className="w-[300px] border-b sm:border-b-0 sm:border-r border-gray-200">
                      <button className="flex items-center w-full justify-between px-4 py-3 transition-colors">
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="h-6 w-6 text-gray-400" />
                          <span className="text-gray-600 font-medium">
                            New York, NY
                          </span>
                        </div>
                        <FaChevronDown className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>

                    {/* Category Filter */}
                    <div className="flex border-b sm:border-b-0 sm:border-r border-gray-200">
                      <button className="flex items-center px-4 py-3 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <TbCategory className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-600 font-medium">ALL</span>
                        </div>
                        <FaChevronDown className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>

                    {/* Search Input and Button Container */}
                    <div className="flex-1 flex items-center pr-7">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Enter the Keywords to Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-3 border-0 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
                          autoFocus
                        />
                      </div>

                      {/* Search Button */}
                      <button className="px-6 py-4 bg-[#3F929A] hover:bg-[#2f9ea8] text-white rounded-2xl font-medium transition-colors cursor-pointer h-full flex items-center space-x-2">
                        <FaSearch className="h-4 w-4" />
                        <span>Search</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeSearchModal}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="h-6 w-6 text-gray-700"
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

              {/* Category Items with React Icons and Hover Effects */}
              <div className="px-4 py-4 overflow-x-auto scrollbar-hide flex flex-col  items-center justify-center">
                <div className="flex items-center space-x-6 min-w-max">
                  <button className="flex-shrink-0 w-10 h-10 bg-gray-300 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                    <FaChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>

                  {categoryItems.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSearchSelect(category.name)}
                        className={`flex flex-col items-center space-y-1 flex-shrink-0 group relative ${
                          index === 0 ? "text-red-600" : "text-gray-600"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${
                            index === 0
                              ? "bg-red-50"
                              : " group-hover:bg-[#c89a5e]"
                          } transition-colors`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${
                              index === 0
                                ? "text-red-600"
                                : "text-gray-600 group-hover:text-white"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            index === 0
                              ? "text-red-600"
                              : "text-gray-700 group-hover:text-[#c89a5e]"
                          }`}
                        >
                          {category.name}
                        </span>
                        {/* <span
                          className={`text-xs ${
                            index === 0 ? "text-red-500" : "text-gray-500"
                          }`}
                        >
                          {category.count}
                        </span> */}

                        {/* Active indicator line (for first item) */}
                        {index === 0 && (
                          <div className="w-full h-0.5 bg-red-600 rounded-full absolute -bottom-2"></div>
                        )}

                        {/* Hover indicator line (for other items) */}
                        {index !== 0 && (
                          <div className="w-0 h-0.5 bg-[#c89a5e] rounded-full absolute -bottom-2 group-hover:w-full transition-all duration-200"></div>
                        )}
                      </button>
                    );
                  })}

                  <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                    <FaChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="h-[calc(100vh-180px)] overflow-y-auto px-4 py-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Trending Event Searches
                    </h3>
                    <div className="space-y-3">
                      {trendingEventSearches.map((event, index) => (
                        <div key={index}>
                          <button
                            onClick={() => handleSearchSelect(event)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-200 hover:shadow-sm transition-all duration-300 ease-in-out cursor-pointer"
                          >
                            <span className="text-gray-800">{event}</span>
                          </button>
                          <p className="text-gray-300 w-full">
                            -----------------------------------------------------------------------------------------------
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Search Suggestions
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(searchSuggestions).map(
                          ([category, items], index) => (
                            <div key={index}>
                              {category === "ROOMMATES" ? (
                                <>
                                  <div className="flex items-center mb-2">
                                    <h4 className="font-bold text-red-600 text-sm uppercase tracking-wide">
                                      TAKECARE
                                    </h4>
                                    <span className="text-gray-300 ml-2">
                                      |------------------------
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center mb-2">
                                  <h4 className="font-bold text-red-600 text-sm uppercase tracking-wide">
                                    {category}
                                  </h4>
                                  <span className="text-gray-300 ml-2">
                                    |------------------------------------------------------------------------------
                                  </span>
                                </div>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {items.map((item, itemIndex) => (
                                  <div key={itemIndex}>
                                    <button
                                      onClick={() => handleSearchSelect(item)}
                                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-200 hover:shadow-sm transition-all duration-300 ease-in-out cursor-pointer"
                                    >
                                      <span className="text-gray-800">
                                        {item}
                                      </span>
                                    </button>
                                    <p className="text-gray-300 w-full">
                                      -----------------------------------------------------------------------------------------------
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 sticky -top-2 py-2 z-10">
                      Services
                    </h3>
                    <div className="rounded-lg border border-gray-600 p-6 sticky top-9">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4 cursor-pointer">
                        {[
                          { name: "Events", icon: "/bag.png" },
                          { name: "Roommates", icon: "/house.png" },
                          { name: "Rentals", icon: "/house.png" },
                          { name: "IT Training", icon: "/ittraining.jpg" },
                          { name: "Jobs", icon: "/moble.png" },
                          { name: "Care Services", icon: "/carservice.png" },
                          { name: "Local Services", icon: "/carservice.png" },
                          { name: "Travels", icon: "/moble.png" },
                          { name: "TakeCares", icon: "/Babiessitter.jpg" },
                          {
                            name: "Immigration",
                            icon: "/immigration-icon.png",
                          },
                          {
                            name: "Wedding Services",
                            icon: "/wedding-services-icon.png",
                          },
                          { name: "Cars", icon: "/car1.png" },
                        ].map((service, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearchSelect(service.name)}
                            className="flex items-center space-x-3 py-2 hover:text-red-600 transition-colors group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                              <img
                                src={service.icon}
                                alt={service.name}
                                className="w-6 h-6 object-cover"
                              />
                            </div>
                            <span className="text-gray-800 group-hover:text-red-600 font-medium">
                              {service.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;