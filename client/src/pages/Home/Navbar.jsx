import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { ScrollProgress } from "../../components/ui/scroll-progress";

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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const locationDropdownRef = useRef(null);
  const navbarRef = useRef(null);
  const searchModalRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

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
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Our Services", path: "/our-services" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const moreMenuItems = [
    { name: "Roommates", path: "/roommates" },
    { name: "Rentals", path: "/rentals" },
    { name: "Jobs", path: "/jobs" },
    { name: "Events", path: "/events" },
    { name: "Services", path: "/services" },
    { name: "TakeCare", path: "/takecare" },
    { name: "Cars", path: "/cars" },
    { name: "For sale", path: "/forsale" },
  ];

  const profileMenuItems = [
    { name: "Dashboard", path: "/profile", icon: CgProfile },
    { name: "Settings", path: "/settings", icon: FaTools },
    { name: "My Listings", path: "/my-listings", icon: FaList },
    { name: "Messages", path: "/messages", icon: FaCalendar },
    { name: "Notifications", path: "/notifications", icon: FaBuilding },
    { name: "Logout", path: "/logout", icon: FaChevronRight },
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

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const closeLocationDropdown = () => {
    setShowLocationDropdown(false);
    setLocationSearch("");
    setShowTopCities(false);
    document.body.style.overflow = "unset";
  };

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
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

  // Countries for the dropdown
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

  const handleProfileMenuItemClick = (path) => {
    if (path === "/profile") {
      navigate("/profile");
    } else if (path === "/logout") {
      console.log("Logging out...");
      navigate("/");
    } else {
      navigate(path);
    }
    scrollToTop(); // Scroll to top when clicking profile menu items
    closeProfileDropdown();
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
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !event.target.closest('.profile-button')
      ) {
        closeProfileDropdown();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeLocationDropdown();
        closeSearchModal();
        closeProfileDropdown();
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

  // Enhanced scroll handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* CSS Styles as a style tag */}
      <style>
        {`
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

          @keyframes slideDown {
            from {
              transform: translateY(-10px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .location-dropdown {
            animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .search-modal-enter {
            animation: slideInFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }

          .profile-dropdown {
            animation: slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

          .nav-link {
            position: relative;
            transition: color 0.3s ease;
          }

          .nav-link:hover {
            color: #1FA987;
          }

          .nav-link::after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: #1FA987;
            transition: width 0.3s ease;
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .more-dropdown-link {
            transition: all 0.3s ease;
          }

          .more-dropdown-link:hover {
            color: #2d7a82;
            background-color: #f0f9fa;
          }

          .profile-dropdown-link {
            transition: all 0.2s ease;
          }

          .profile-dropdown-link:hover {
            background-color: #f8f9fa;
            transform: translateX(4px);
          }

          .navbar-transition {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

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

          @media (max-width: 768px) {
            .mobile-grid-cols-1 {
              grid-template-columns: 1fr !important;
            }
            
            .mobile-grid-cols-2 {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .mobile-grid-cols-3 {
              grid-template-columns: repeat(3, 1fr) !important;
            }
            
            .mobile-stack {
              flex-direction: column !important;
            }
            
            .mobile-text-center {
              text-align: center !important;
            }
            
            .mobile-w-full {
              width: 100% !important;
            }
            
            .mobile-space-y-2 > * + * {
              margin-top: 0.5rem !important;
            }
            
            .mobile-space-y-3 > * + * {
              margin-top: 0.75rem !important;
            }
            
            .mobile-space-y-4 > * + * {
              margin-top: 1rem !important;
            }
          }
        `}
      </style>

      <nav
        ref={navbarRef}
        className={`border-b border-gray-300 sticky top-0 z-40 navbar-transition ${
          isScrolled 
            ? "navbar-scrolled border-gray-700" 
            : "bg-white border-gray-300"
        }`}
      >
        <div className="px-3 sm:px-4 md:px-6 lg:px-7">
          <div className="flex justify-between items-center py-3 sm:py-4 md:py-3">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link
                to="/"
                onClick={scrollToTop}
                className={`text-lg sm:text-xl md:text-2xl font-bold hover:text-gray-900 transition-colors logo-text ${
                  isScrolled ? "text-white" : "text-gray-800"
                }`}
              >
                Listify
              </Link>
            </div>

            {/* Desktop Search Bars */}
            <div className="hidden sm:flex flex-0 justify-center max-w-md sm:max-w-lg md:max-w-2xl mx-2 sm:mx-4 md:mx-8">
              <div className="flex space-x-1 sm:space-x-2 w-full">
                {/* General Search */}
                <div className="relative flex-1 min-w-0">
                  <input
                    type="text"
                    placeholder="Search by service or category"
                    className={`w-full pl-7 sm:pl-8 md:pl-10 pr-2 sm:pr-3 md:pr-4 py-2 sm:py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c89a5e] text-xs sm:text-sm cursor-pointer search-input ${
                      isScrolled 
                        ? "bg-white/10 border-white/20 text-white placeholder-white/70" 
                        : "border-gray-300 text-gray-900"
                    }`}
                    onFocus={handleSearchClick}
                    onClick={handleSearchClick}
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-2.5 md:pl-3 flex items-center pointer-events-none">
                    <FaSearch className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 search-icon ${
                      isScrolled ? "text-white/70" : "text-gray-400"
                    }`} />
                  </div>
                </div>

                {/* Location Search */}
                <div className="relative flex-1 min-w-0">
                  <input
                    type="text"
                    placeholder="Location"
                    value={selectedLocation}
                    className={`w-full pl-7 sm:pl-8 md:pl-10 pr-7 sm:pr-8 md:pr-10 py-2 sm:py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm cursor-pointer search-input ${
                      isScrolled 
                        ? "bg-white/10 border-white/20 text-white placeholder-white/70" 
                        : "border-gray-300 text-gray-900"
                    }`}
                    onFocus={handleLocationClick}
                    onClick={handleLocationClick}
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-2.5 md:pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 search-icon ${
                      isScrolled ? "text-white/70" : "text-gray-400"
                    }`} />
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <FaChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 search-icon ${
                      isScrolled ? "text-white/70" : "text-gray-400"
                    }`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-between flex-1">
              <ul className="flex flex-wrap justify-center space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-6">
                {mainMenuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={scrollToTop}
                      className={`nav-link text-xs md:text-sm lg:text-base hover:text-gray-900 px-1 whitespace-nowrap ${
                        isScrolled ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li
                  className="relative"
                  onMouseEnter={() => setShowMoreDropdown(true)}
                  onMouseLeave={() => setShowMoreDropdown(false)}
                >
                  <a
                    href="#"
                    className={`nav-link text-xs md:text-sm lg:text-base px-1 whitespace-nowrap flex items-center hover:text-gray-900 ${
                      isScrolled ? "text-white" : "text-gray-700"
                    }`}
                  >
                    All Categories
                    <FaChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform duration-300" />
                  </a>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-20 transition-all duration-300 ease-out ${
                      showMoreDropdown
                        ? "opacity-100 translate-y-0 scale-100 visible"
                        : "opacity-0 -translate-y-2 scale-95 invisible"
                    } min-w-[200px] sm:min-w-[240px] md:min-w-[280px]`}
                  >
                    {moreMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => {
                          setShowMoreDropdown(false);
                          scrollToTop();
                        }}
                        className="block px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </li>
              </ul>
              
              {/* Right side actions */}
              <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 ml-10 lg:ml-20">
                {/* Create Listing Button */}
                <Link to="/post-add" className="hidden lg:block">
                  <button 
                    onClick={scrollToTop}
                    className="flex items-center gap-1 sm:gap-2 bg-[#27bb97] text-white px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg text-xs md:text-sm lg:text-base whitespace-nowrap hover:bg-[#1fa987] transition cursor-pointer"
                  >
                    <LuPencilLine className="text-white text-sm sm:text-base md:text-lg" />
                    <span className="hidden sm:inline">Create a Listing</span>
                    <span className="sm:hidden">Post</span>
                  </button>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={handleProfileClick}
                    className={`border rounded-lg px-2 sm:px-3 py-1.5 md:px-4 md:py-3 hover:shadow-md cursor-pointer flex items-center gap-1 sm:gap-2 profile-button ${
                      isScrolled 
                        ? "border-white/30 text-white hover:bg-white/10" 
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <HiOutlineBars3BottomRight className="text-base sm:text-lg md:text-[20px] lg:text-[22px]" />
                    <CgProfile className="text-base sm:text-lg md:text-[20px] lg:text-[22px]" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileDropdown && (
                    <div
                      ref={profileDropdownRef}
                      className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 profile-dropdown overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <CgProfile className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">John Doe</h3>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">john.doe@example.com</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1 sm:py-2">
                        {profileMenuItems.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleProfileMenuItemClick(item.path)}
                            className="profile-dropdown-link w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600"
                          >
                            <item.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{item.name}</span>
                            {item.path === "/logout" && (
                              <span className="ml-auto text-xs text-gray-400 hidden sm:inline">⌘Q</span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="p-2 sm:p-3 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Version 1.0.0</span>
                          <span>© 2024 Listify</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu button and search icon */}
            <div className="md:hidden flex items-center space-x-2 sm:space-x-3">
              {/* Mobile Search Icon */}
              <button
                onClick={handleSearchClick}
                className={`p-1.5 sm:p-2 rounded-lg ${
                  isScrolled ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaSearch className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              
              {/* Mobile Create Listing Button */}
              <Link to="/post-add">
                <button 
                  onClick={scrollToTop}
                  className="flex items-center gap-1 bg-[#27bb97] text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap hover:bg-[#1fa987] transition cursor-pointer"
                >
                  <LuPencilLine className="text-white text-sm sm:text-base" />
                  <span className="hidden sm:inline">Post Ad</span>
                </button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className={`p-1.5 sm:p-2 rounded-lg ${
                  isScrolled ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <FaBars className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden pb-3 sm:pb-4 border-t mobile-space-y-4 ${
              isScrolled ? "border-gray-600" : "border-gray-200"
            }`}>
              <div className="flex flex-col space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search services"
                    className={`flex-1 px-3 py-2 text-xs sm:text-sm border rounded-lg ${
                      isScrolled 
                        ? "bg-white/10 border-white/20 text-white placeholder-white/70" 
                        : "border-gray-300"
                    }`}
                    onFocus={handleSearchClick}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className={`flex-1 px-3 py-2 text-xs sm:text-sm border rounded-lg ${
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
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToTop();
                      }}
                      className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded ${
                        isScrolled 
                          ? "text-white hover:bg-white/10" 
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {moreMenuItems.slice(0, 6).map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToTop();
                      }}
                      className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded ${
                        isScrolled 
                          ? "text-white hover:bg-white/10" 
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                {/* Mobile Profile Link */}
                <Link
                  to="/profile"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToTop();
                  }}
                  className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded ${
                    isScrolled 
                      ? "text-white hover:bg-white/10" 
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CgProfile className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Dashboard</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

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
            <div className="p-3 sm:p-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Select Location
                </h3>
                <button
                  onClick={closeLocationDropdown}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
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
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                {/* Left Side Country Dropdown */}
                <div className="relative w-full sm:w-auto sm:flex-shrink-0">
                  <select
                    value={selectedCountry}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-white appearance-none cursor-pointer"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FaChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by city, state or zip code"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>

                  {/* Current Location Icon */}
                  <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center">
                    <button
                      onClick={handleUseCurrentLocation}
                      className="p-1.5 sm:p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Use Current Location"
                    >
                      <FaMapMarkerAlt className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-7 flex flex-col sm:flex-row items-center justify-between py-3 sm:py-4 mobile-space-y-2 sm:space-y-0">
              <div className="flex items-center gap-2">
                <IoLocationOutline className="h-4 w-4 sm:h-5 sm:w-5" />
                <p className="text-xs sm:text-sm">selected location:</p>
                <p className="text-blue-400 text-xs sm:text-sm">India</p>
              </div>

              <div className="flex items-center gap-2">
                <CiLocationArrow1 className="h-4 w-4 sm:h-5 sm:w-5" />
                <p className="text-xs sm:text-sm">Suggested Location:</p>
                <p className="text-blue-400 text-xs sm:text-sm">New York,NY</p>
              </div>
            </div>

            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 140px)" }}
            >
              {!locationSearch ? (
                <>
                  {/* Popular Cities */}
                  <div className="p-3 sm:p-4 border-b border-gray-100">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Popular Cities
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2">
                      {popularCities.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="text-left p-2 sm:p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                        >
                          <div className="font-medium text-gray-800 text-xs sm:text-sm truncate">
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
                  <div className="p-3 sm:p-4 border-b border-gray-100">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Suggested for You
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2">
                      {suggestedLocations.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="text-left p-2 sm:p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                        >
                          <div className="font-medium text-gray-800 text-xs sm:text-sm truncate">
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
                  <div className="p-3 sm:p-4 border-b border-gray-100">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Nearest Zip Codes
                    </h4>
                    <div className="space-y-1.5 sm:space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                      {nearestZipCodes.map((zip, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleLocationSelect({
                              name: `${zip.area} (${zip.name})`,
                              zip: zip.name,
                            })
                          }
                          className="w-full text-left p-2.5 sm:p-3 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-800 text-xs sm:text-sm truncate">
                              {zip.name}
                            </div>
                            <div className="text-gray-500 text-xs truncate">
                              {zip.area}
                            </div>
                          </div>
                          <div className="text-xs text-green-600 font-medium ml-2">
                            {zip.distance}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Choose Your Location - Metro & Top Cities */}
                  <div className="p-3 sm:p-4 border-b border-gray-100 pb-5 sm:pb-7">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Choose Your Location
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Metro Cities */}
                      <div className="bg-white p-3 sm:p-5 rounded-lg">
                        <h5 className="text-xs font-semibold text-gray-600 mb-1.5 sm:mb-2">
                          Metro
                        </h5>
                        <div className="space-y-1">
                          {metroCities.map((metro, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleLocationSelect({ name: metro.name })
                              }
                              className="w-full text-left p-1.5 sm:p-2 hover:bg-gray-50 hover:text-red-500 rounded text-xs sm:text-sm text-gray-700 truncate"
                            >
                              {metro.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Top Cities */}
                      <div className="bg-white p-3 sm:p-5 rounded-lg">
                        <h5 className="text-xs font-semibold text-gray-600 mb-1.5 sm:mb-2">
                          Top Cities
                        </h5>
                        <div className="space-y-1">
                          {topCities.slice(0, 5).map((city, index) => (
                            <button
                              key={index}
                              onClick={() => handleLocationSelect(city)}
                              className="w-full text-left p-1.5 sm:p-2 hover:bg-gray-50 hover:text-red-500 rounded text-xs sm:text-sm text-gray-700 truncate"
                            >
                              {city.name}
                            </button>
                          ))}
                          {!showTopCities && (
                            <button
                              onClick={() => setShowTopCities(true)}
                              className="w-full text-left p-1.5 sm:p-2 hover:bg-gray-50 rounded text-xs sm:text-sm text-blue-600 font-medium"
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
                    <div className="p-3 sm:p-4 border-b border-gray-100">
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-700">
                          Top Cities
                        </h4>
                        <button
                          onClick={() => setShowTopCities(false)}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Show less
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        {topCities.map((city, index) => (
                          <button
                            key={index}
                            onClick={() => handleLocationSelect(city)}
                            className="text-left p-1.5 sm:p-2 hover:bg-gray-50 rounded text-xs sm:text-sm text-gray-700 truncate"
                          >
                            {city.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer with Countries */}
                  <div className="p-3 sm:p-4 bg-gray-50">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Stay on Listify
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {footerCountries.map((country, index) => (
                            <button
                              key={index}
                              className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs hover:bg-white transition-colors border border-gray-200 shadow-sm"
                              title={country.name}
                            >
                              <img
                                src={country.flagImage}
                                alt={`${country.name} flag`}
                                className="w-4 h-3 sm:w-5 sm:h-3.5 object-cover rounded-sm"
                                srcSet={`${country.flagImage} 1x, ${country.flagImage2x} 2x`}
                              />
                              <span className="text-gray-700 font-medium text-xs sm:text-sm">
                                {country.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setShowTopCities(true)}
                        className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium cursor-pointer hover:underline"
                      >
                        View top cities
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Search Results */
                <div className="p-3 sm:p-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Search Results
                  </h4>
                  {filteredLocations.length > 0 ? (
                    <div className="space-y-1">
                      {filteredLocations.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full text-left p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-800 text-xs sm:text-sm truncate">
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
                    <div className="py-6 sm:py-8 text-center">
                      <svg
                        className="h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-2 sm:mb-3"
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
                      <p className="text-gray-500 text-xs sm:text-sm">
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

      {/* Search Modal */}
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
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-[#F3F3F3] border-b border-gray-200">
                <button
                  onClick={closeSearchModal}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <FaChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                </button>

                <div className="flex items-center justify-center flex-1 mx-2 sm:mx-4">
                  {/* Main container with background and radius */}
                  <div className="flex flex-col h-auto sm:h-[85px] sm:flex-row items-stretch sm:items-center w-full bg-white rounded-lg sm:rounded-full border border-gray-200 shadow-sm overflow-hidden">
                    {/* Location Filter */}
                    <div className="w-full sm:w-[200px] md:w-[300px] border-b sm:border-b-0 sm:border-r border-gray-200">
                      <button className="flex items-center w-full justify-between px-3 sm:px-4 py-2 sm:py-3 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <FaMapMarkerAlt className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400" />
                          <span className="text-gray-600 font-medium text-xs sm:text-sm md:text-base truncate">
                            New York, NY
                          </span>
                        </div>
                        <FaChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      </button>
                    </div>

                    {/* Category Filter */}
                    <div className="flex border-b sm:border-b-0 sm:border-r border-gray-200">
                      <button className="flex items-center px-3 sm:px-4 py-2 sm:py-3 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <TbCategory className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <span className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">ALL</span>
                        </div>
                        <FaChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      </button>
                    </div>

                    {/* Search Input and Button Container */}
                    <div className="flex-1 flex items-center pr-2 sm:pr-7">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Enter the Keywords to Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-0 focus:outline-none focus:ring-0 text-xs sm:text-sm md:text-base text-gray-700 placeholder-gray-500"
                          autoFocus
                        />
                      </div>

                      {/* Search Button */}
                      <button className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-[#3F929A] hover:bg-[#2f9ea8] text-white rounded-lg sm:rounded-2xl font-medium transition-colors cursor-pointer h-full flex items-center space-x-1 sm:space-x-2">
                        <FaSearch className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm md:text-base">Search</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeSearchModal}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-700"
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
              <div className="px-2 sm:px-4 py-3 sm:py-4 overflow-x-auto scrollbar-hide flex flex-col items-center justify-center">
                <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 min-w-max">
                  <button className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                    <FaChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-600" />
                  </button>

                  {categoryItems.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          handleSearchSelect(category.name);
                          closeSearchModal();
                          scrollToTop();
                        }}
                        className={`flex flex-col items-center space-y-1 flex-shrink-0 group relative ${
                          index === 0 ? "text-red-600" : "text-gray-600"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer ${
                            index === 0
                              ? "bg-red-50"
                              : "group-hover:bg-red-50"
                          } transition-colors`}
                        >
                          <IconComponent
                            className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${
                              index === 0
                                ? "text-red-600"
                                : "text-gray-600 group-hover:text-red-500"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium truncate max-w-[60px] sm:max-w-none ${
                            index === 0
                              ? "text-red-600"
                              : "text-gray-700 group-hover:text-[#E7000B]"
                          }`}
                        >
                          {category.name}
                        </span>

                        {/* Active indicator line (for first item) */}
                        {index === 0 && (
                          <div className="w-full h-0.5 bg-red-600 rounded-full absolute -bottom-1 sm:-bottom-2"></div>
                        )}

                        {/* Hover indicator line (for other items) */}
                        {index !== 0 && (
                          <div className="w-0 h-0.5 bg-[#E7000B] rounded-full absolute -bottom-1 sm:-bottom-2 group-hover:w-full transition-all duration-200"></div>
                        )}
                      </button>
                    );
                  })}

                  <button className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                    <FaChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="h-[calc(100vh-180px)] overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Trending Event Searches
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {trendingEventSearches.map((event, index) => (
                        <div key={index}>
                          <button
                            onClick={() => {
                              handleSearchSelect(event);
                              closeSearchModal();
                              scrollToTop();
                            }}
                            className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-200 hover:shadow-sm transition-all duration-300 ease-in-out cursor-pointer"
                          >
                            <span className="text-gray-800 text-sm sm:text-base truncate block">{event}</span>
                          </button>
                          <p className="text-gray-300 w-full text-xs sm:text-base">
                            -----------------------------------------------------------------------------------------------
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 sm:mt-8">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Search Suggestions
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {Object.entries(searchSuggestions).map(
                          ([category, items], index) => (
                            <div key={index}>
                              {category === "ROOMMATES" ? (
                                <>
                                  <div className="flex items-center mb-2">
                                    <h4 className="font-bold text-red-600 text-xs sm:text-sm uppercase tracking-wide truncate">
                                      TAKECARE
                                    </h4>
                                    <span className="text-gray-300 ml-2 hidden sm:inline">
                                      |------------------------
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center mb-2">
                                  <h4 className="font-bold text-red-600 text-xs sm:text-sm uppercase tracking-wide truncate">
                                    {category}
                                  </h4>
                                  <span className="text-gray-300 ml-2 hidden sm:inline">
                                    |------------------------------------------------------------------------------
                                  </span>
                                </div>
                              )}
                              <div className="flex flex-col sm:flex-wrap gap-1 sm:gap-2">
                                {items.map((item, itemIndex) => (
                                  <div key={itemIndex}>
                                    <button
                                      onClick={() => {
                                        handleSearchSelect(item);
                                        closeSearchModal();
                                        scrollToTop();
                                      }}
                                      className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-200 hover:shadow-sm transition-all duration-300 ease-in-out cursor-pointer"
                                    >
                                      <span className="text-gray-800 text-sm sm:text-base truncate block">
                                        {item}
                                      </span>
                                    </button>
                                    <p className="text-gray-300 w-full text-xs sm:text-base">
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

                  <div className="mt-6 lg:mt-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 sticky -top-2 py-2 z-10 bg-gray-50">
                      Services
                    </h3>
                    <div className="rounded-lg border border-gray-600 p-4 sm:p-6 sticky top-9">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4 cursor-pointer">
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
                            onClick={() => {
                              handleSearchSelect(service.name);
                              closeSearchModal();
                              scrollToTop();
                            }}
                            className="flex items-center space-x-2 py-1.5 sm:py-2 hover:text-red-600 transition-colors group cursor-pointer"
                          >
                            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                              <img
                                src={service.icon}
                                alt={service.name}
                                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-cover"
                              />
                            </div>
                            <span className="text-gray-800 group-hover:text-red-600 font-medium text-xs sm:text-sm truncate">
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

      <ScrollProgress />
    </>
  );
};

export default Navbar;