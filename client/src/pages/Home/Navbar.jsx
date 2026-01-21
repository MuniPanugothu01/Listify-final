import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
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
  FaMapMarkerAlt,
  FaSearch,
  FaHeart, // Added heart icon
  FaRegHeart, // Added outlined heart icon for alternative
} from "react-icons/fa";

import NavSearchBar from "./NavSearchBar";

import {
  MdOutlineEventAvailable,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { LuPencilLine } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import { ScrollProgress } from "../../components/ui/scroll-progress";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isHeartFilled, setIsHeartFilled] = useState(false); // State for heart toggle
  
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

  const mainMenuItems = [
    { name: "Roommates", path: "/roommates" },
    { name: "Rentals", path: "/rentals" },
    { name: "Events", path: "/events" },
    { name: "Services", path: "/services" },
  ];
  
  const moreMenuItems = [
    { name: "TakeCare", path: "/takecare" },
    { name: "Jobs", path: "/jobs" },
    { name: "Cars", path: "/cars" },
    { name: "For sale", path: "/forsale" },
  ];

  const profileMenuItems = [
    { name: "Dashboard", path: "/profile", icon: CgProfile },
    { name: "Saved Items", path: "/saved", icon: FaHeart }, // Updated to include heart icon
    { name: "Settings", path: "/settings", icon: FaTools },
    { name: "My Listings", path: "/my-listings", icon: FaBuilding },
    { name: "Messages", path: "/messages", icon: FaUserFriends },
    { name: "Notifications", path: "/notifications", icon: FaBriefcase },
    { name: "Logout", path: "/logout", icon: FaChevronRight },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  const handleMoreClick = (e) => {
    e.preventDefault();
    setShowMoreDropdown(!showMoreDropdown);
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
    scrollToTop();
    closeProfileDropdown();
  };

  // Handle heart icon click for saved items
  const handleHeartClick = (e) => {
    e.preventDefault();
    setIsHeartFilled(!isHeartFilled);
    navigate("/profile");
    scrollToTop();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
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
        closeProfileDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Scroll handler
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

  // CSS Styles
  const navbarStyles = `
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

    @keyframes heartBeat {
      0% {
        transform: scale(1);
      }
      25% {
        transform: scale(1.2);
      }
      50% {
        transform: scale(1);
      }
      75% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }

    .profile-dropdown {
      animation: slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

    .heart-icon {
      transition: all 0.3s ease;
    }

    .heart-icon:hover {
      animation: heartBeat 0.5s ease;
      color: #ff4757;
    }

    .heart-filled {
      color: #ff4757;
      filter: drop-shadow(0 0 8px rgba(255, 71, 87, 0.4));
    }
  `;

  return (
    <>
      <style>{navbarStyles}</style>

      <nav
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

            {/* Search Bar Component */}
            <NavSearchBar 
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              isScrolled={isScrolled}
            />

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
                    More
                    <FaChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform duration-300" />
                  </a>

                  {/* More Dropdown */}
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
                {/* Saved Items (Heart Icon) */}
                <Link 
                  to="/profile" 
                  onClick={(e) => {
                    handleHeartClick(e);
                    scrollToTop();
                  }}
                  className="hidden lg:flex items-center gap-1 sm:gap-2 relative"
                >
                  <div className={`heart-icon ${isHeartFilled ? 'heart-filled' : ''}`}>
                    {isHeartFilled ? (
                      <FaHeart className="text-lg sm:text-xl md:text-2xl " />
                    ) : (
                      <FaRegHeart className={`text-lg sm:text-xl md:text-2xl transition-colors ${
                        isScrolled ? 'text-white/80 ' : 'text-gray-600'
                      }`} />
                    )}
                  </div>
                  <span className={`text-xs md:text-sm lg:text-base whitespace-nowrap font-medium ${
                    isScrolled ? 'text-white' : 'text-gray-700'
                  }`}>
                  </span>
                  
                  {/* Notification badge (optional) */}
                  {false && ( // Change to true if you want to show badge
                    <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  )}
                </Link>

                {/* Create Listing Button */}
                <Link to="/post-add" className="hidden lg:block">
                  <button 
                    onClick={scrollToTop}
                    className="flex items-center gap-1 sm:gap-2 bg-[#27bb97] text-white px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg text-xs md:text-sm lg:text-base whitespace-nowrap hover:bg-[#1fa987] transition cursor-pointer font-semibold"
                  >
                    <LuPencilLine className="text-white text-sm sm:text-base md:text-lg" />
                    <span className="hidden sm:inline">Post add</span>
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
                            {item.path === "/profile" && isHeartFilled && (
                              <FaHeart className="h-3 w-3 text-red-500 ml-auto" />
                            )}
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
              {/* Mobile Saved Items (Heart Icon) */}
              <Link 
                to="/profile" 
                onClick={(e) => {
                  handleHeartClick(e);
                  scrollToTop();
                }}
                className="flex items-center relative"
              >
                <div className={`heart-icon ${isHeartFilled ? 'heart-filled' : ''}`}>
                  {isHeartFilled ? (
                    <FaHeart className="text-lg sm:text-xl " />
                  ) : (
                    <FaRegHeart className={`text-lg sm:text-xl ${
                      isScrolled ? 'text-white/80' : 'text-gray-600'
                    }`} />
                  )}
                </div>
                
                {/* Notification badge for mobile (optional) */}
                {false && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center">
                    3
                  </span>
                )}
              </Link>

              {/* Mobile Create Listing Button */}
              <Link to="/post-add">
                <button 
                  onClick={scrollToTop}
                  className="flex items-center gap-1 bg-[#27bb97] text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap hover:bg-[#1fa987] transition cursor-pointer font-semibold"
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
            <div className={`md:hidden pb-3 sm:pb-4 border-t space-y-4 ${
              isScrolled ? "border-gray-600" : "border-gray-200"
            }`}>
              <div className="flex flex-col space-y-3 sm:space-y-4 mt-3 sm:mt-4">
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
                
                {/* Mobile Saved Items Link */}
                <Link
                  to="/saved"
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
                    <FaHeart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    <span>Saved Items</span>
                  </div>
                </Link>
                
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
      <ScrollProgress />
    </>
  );
};

export default Navbar;