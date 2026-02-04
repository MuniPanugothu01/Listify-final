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
  FaPlus,
  FaRegHeart,
  FaBell,
  FaUserCircle,
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
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);

  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Use the auth hook to get user data
  const { user, isAuthenticated, logout } = useAuth();

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Someone viewed your iPhone listing",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      text: "Your MacBook Pro has 3 new offers",
      time: "1 hour ago",
      read: false,
    },
    { id: 3, text: "New message from buyer", time: "3 hours ago", read: true },
    { id: 4, text: "Your listing was featured", time: "1 day ago", read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const mainMenuItems = [
    { name: "Electronics", path: "/electronics" },
    { name: "ForSale", path: "/forsale" },
    { name: "Roommates", path: "/roommates" },
    { name: "Rentals", path: "/rentals" },
    { name: "Events", path: "/events" },
    { name: "Services", path: "/services" },
  ];

  const moreMenuItems = [
    { name: "TakeCare", path: "/takecare" },
    { name: "Jobs", path: "/jobs" },
    { name: "Cars", path: "/cars" },
  ];

  const profileMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: CgProfile },
    { name: "My Profile", path: "/profile", icon: FaUserFriends },
    { name: "Saved Items", path: "/saved", icon: FaRegHeart },
    { name: "My Listings", path: "/my-listings", icon: FaBuilding },
    { name: "Messages", path: "/messages", icon: FaBriefcase },
    { name: "Settings", path: "/settings", icon: FaTools },
    { name: "Sign Out", path: "/logout", icon: FaChevronRight },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setShowProfileDropdown(!showProfileDropdown);
    } else {
      navigate("/signin");
    }
  };

  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  const closeNotificationDropdown = () => {
    setShowNotificationDropdown(false);
  };

  const handleMoreClick = (e) => {
    e.preventDefault();
    setShowMoreDropdown(!showMoreDropdown);
  };

  const handleProfileMenuItemClick = (path) => {
    if (path === "/logout") {
      logout();
      closeProfileDropdown();
      navigate("/");
    } else {
      navigate(path);
    }
    scrollToTop();
    closeProfileDropdown();
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  // Get user's first name
  const getUserFirstName = () => {
    if (!user || !user.name) return "User";
    return user.name.split(" ")[0];
  };

  const getUserFullName = () => {
    if (!user || !user.name) return "User";
    return user.name;
  };

  const getUserEmail = () => {
    if (!user || !user.email) return "user@example.com";
    return user.email;
  };

  // Check if user logged in with Google
  const isGoogleUser = () => {
    return user && user.provider === "google";
  };

  // Get user profile image - only show Google image for Google users
  const getUserProfileImage = () => {
    if (!user) return null;

    // Only show Google profile image for Google users
    if (isGoogleUser() && user.googleProfileImage) {
      return user.googleProfileImage;
    }

    // For email users or Google users without image, return null to show icon
    return null;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !event.target.closest(".profile-button")
      ) {
        closeProfileDropdown();
      }

      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        !event.target.closest(".notification-button")
      ) {
        closeNotificationDropdown();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeProfileDropdown();
        closeNotificationDropdown();
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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
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

    .notification-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #EF4444;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
    }

    .notification-item-unread {
      background-color: #F0F9FF;
      border-left: 3px solid #3B82F6;
    }

    .user-profile-image {
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .user-icon-container {
      background: linear-gradient(135deg, #27bb97, #1fa987);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
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
            {/* Logo - WITHOUT the "Hi, First Name" on left side */}
            <div className="flex items-center flex-shrink-0">
              <Link
                to="/"
                onClick={scrollToTop}
                className={`text-lg sm:text-xl md:text-2xl font-semibold hover:text-gray-900 transition-colors logo-text ${
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
                      className={`nav-link text-xs font-semibold md:text-sm lg:text-base hover:text-gray-900 px-1 whitespace-nowrap ${
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
                    className={`nav-link text-xs font-semibold md:text-sm lg:text-base md:mt-1 lg:mt-0 whitespace-nowrap flex items-center hover:text-gray-900 ${
                      isScrolled ? "text-white" : "text-gray-700"
                    }`}
                  >
                    More
                    <FaChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform duration-300" />
                  </a>

                  {/* More Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-2 md:mt-10 bg-white border border-gray-300 rounded-lg shadow-lg z-20 transition-all duration-300 ease-out ${
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
                        className="block font-semibold px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </li>
              </ul>

              {/* Right side actions */}
              <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 ml-10 lg:ml-20">
                {/* Heart Icon (Saved Items) */}
                <Link
                  to="/saved"
                  onClick={scrollToTop}
                  className="hidden lg:flex items-center gap-1 sm:gap-2"
                >
                  <FaRegHeart
                    className={`text-lg sm:text-xl md:text-2xl ${
                      isScrolled ? "text-white" : "text-gray-700"
                    }`}
                  />
                </Link>

                {/* Notification Icon */}
                {isAuthenticated && (
                  <div className="relative">
                    <button
                      onClick={handleNotificationClick}
                      className={`notification-button relative p-1.5 rounded-lg hover:bg-gray-100 ${
                        isScrolled
                          ? "text-white hover:bg-white/10"
                          : "text-gray-700"
                      }`}
                    >
                      <FaBell className="text-lg sm:text-xl md:text-2xl" />
                      {unreadCount > 0 && (
                        <span className="notification-badge">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotificationDropdown && (
                      <div
                        ref={notificationDropdownRef}
                        className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        {/* Notification Header */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">
                              Notifications
                            </h3>
                            {unreadCount > 0 && (
                              <button
                                onClick={markAllAsRead}
                                className="text-sm text-blue-600 hover:text-blue-800"
                              >
                                Mark all as read
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Notification List */}
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                                  !notification.read
                                    ? "notification-item-unread"
                                    : ""
                                }`}
                                onClick={() =>
                                  markNotificationAsRead(notification.id)
                                }
                              >
                                <p className="text-sm text-gray-800">
                                  {notification.text}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="p-8 text-center">
                              <p className="text-gray-500">No notifications</p>
                            </div>
                          )}
                        </div>

                        {/* View All Link */}
                        <div className="p-3 border-t border-gray-200">
                          <Link
                            to="/notifications"
                            onClick={closeNotificationDropdown}
                            className="block text-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            View all notifications
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Create Listing Button */}
                <Link to="/post-add" className="hidden lg:block">
                  <button
                    onClick={scrollToTop}
                    className="flex items-center gap-1 sm:gap-2 bg-[#27bb97] text-white px-3 sm:px-3 py-2 sm:py-2.5 md:py-3 lg:py-3 rounded-lg text-xs md:text-sm lg:text-base whitespace-nowrap hover:bg-[#1fa987] transition cursor-pointer font-semibold"
                  >
                    <FaPlus className="text-white text-sm sm:text-base md:text-lg" />
                    <span className="hidden sm:inline">Sell</span>
                  </button>
                </Link>

                {/* Profile/Login Button */}
                <div className="relative">
                  <button
                    onClick={handleProfileClick}
                    className={`border rounded-lg px-2 sm:px-3 py-1.5 md:px-4 md:py-3 hover:shadow-md cursor-pointer flex items-center gap-1 sm:gap-2 profile-button ${
                      isScrolled
                        ? "border-white/30 text-white hover:bg-white/10"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center gap-2">
                          {/* Show Google profile image ONLY for Google users */}
                          {isGoogleUser() && getUserProfileImage() ? (
                            <img
                              src={getUserProfileImage()}
                              alt={getUserFullName()}
                              className="user-profile-image w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
                              onError={(e) => {
                                // If Google image fails to load, show user icon
                                e.target.style.display = "none";
                                const nextSibling = e.target.nextElementSibling;
                                if (nextSibling) {
                                  nextSibling.style.display = "flex";
                                }
                              }}
                            />
                          ) : (
                            /* Show static user icon for email users or Google users without image */
                            <div className="user-icon-container w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9">
                              <FaUserCircle className="text-white text-sm sm:text-base md:text-lg" />
                            </div>
                          )}

                          {/* Display user name next to profile image */}
                          <span className="hidden lg:inline text-sm font-medium">
                            {getUserFirstName()}
                          </span>
                        </div>
                        <FaChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      </>
                    ) : (
                      <>
                        <CgProfile className="text-base sm:text-lg md:text-[20px] lg:text-[22px]" />
                        <span className="hidden sm:inline text-sm">
                          Sign In
                        </span>
                      </>
                    )}
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileDropdown && isAuthenticated && (
                    <div
                      ref={profileDropdownRef}
                      className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 profile-dropdown overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {/* Show Google profile image ONLY for Google users in dropdown */}
                          {isGoogleUser() && getUserProfileImage() ? (
                            <img
                              src={getUserProfileImage()}
                              alt={getUserFullName()}
                              className="user-profile-image w-8 h-8 sm:w-10 sm:h-10"
                              onError={(e) => {
                                // If Google image fails to load, show user icon
                                e.target.style.display = "none";
                                const nextSibling = e.target.nextElementSibling;
                                if (nextSibling) {
                                  nextSibling.style.display = "flex";
                                }
                              }}
                            />
                          ) : (
                            /* Show static user icon for email users or Google users without image */
                            <div className="user-icon-container w-8 h-8 sm:w-10 sm:h-10">
                              <FaUserCircle className="text-white text-base sm:text-lg" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                              {getUserFullName()}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                              {getUserEmail()}
                              {isGoogleUser() && (
                                <span className="ml-2 text-xs text-blue-600">
                                  (Google)
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1 sm:py-2">
                        {profileMenuItems.map((item, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleProfileMenuItemClick(item.path)
                            }
                            className="profile-dropdown-link w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600"
                          >
                            <item.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{item.name}</span>
                            {item.path === "/logout" && (
                              <span className="ml-auto text-xs text-gray-400 hidden sm:inline"></span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu button and search icon */}
            <div className="md:hidden flex items-center space-x-2 sm:space-x-3">
              {/* Mobile Heart Icon */}
              <Link
                to="/saved"
                onClick={scrollToTop}
                className="flex items-center"
              >
                <FaRegHeart
                  className={`text-lg sm:text-xl ${
                    isScrolled ? "text-white" : "text-gray-700"
                  }`}
                />
              </Link>

              {/* Mobile Notification Icon */}
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={handleNotificationClick}
                    className="relative p-1"
                  >
                    <FaBell
                      className={`text-lg sm:text-xl ${
                        isScrolled ? "text-white" : "text-gray-700"
                      }`}
                    />
                    {unreadCount > 0 && (
                      <span className="notification-badge">{unreadCount}</span>
                    )}
                  </button>
                </div>
              )}

              {/* Mobile Create Listing Button */}
              <Link to="/post-add">
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-1 bg-[#27bb97] text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap hover:bg-[#1fa987] transition cursor-pointer font-semibold"
                >
                  <FaPlus className="text-white text-sm sm:text-base" />
                  <span className="hidden sm:inline">Post add</span>
                </button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className={`p-1.5 sm:p-2 rounded-lg ${
                  isScrolled
                    ? "text-white hover:bg-white/10"
                    : "text-gray-700 hover:bg-gray-100"
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
            <div
              className={`md:hidden pb-3 sm:pb-4 border-t space-y-4 ${
                isScrolled ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                {/* User Info in Mobile Menu */}
                {isAuthenticated && user && (
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {/* Show Google profile image ONLY for Google users in mobile menu */}
                      {isGoogleUser() && getUserProfileImage() ? (
                        <img
                          src={getUserProfileImage()}
                          alt={getUserFullName()}
                          className="user-profile-image w-10 h-10"
                          onError={(e) => {
                            // If Google image fails to load, show user icon
                            e.target.style.display = "none";
                            const nextSibling = e.target.nextElementSibling;
                            if (nextSibling) {
                              nextSibling.style.display = "flex";
                            }
                          }}
                        />
                      ) : (
                        /* Show static user icon for email users or Google users without image */
                        <div className="user-icon-container w-10 h-10">
                          <FaUserCircle className="text-white text-base" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {getUserFullName()}
                        </h3>
                        <p className="text-xs text-gray-600 truncate">
                          {getUserEmail()}
                          {isGoogleUser() && (
                            <span className="ml-2 text-xs text-blue-600">
                              (Google)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {mainMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToTop();
                      }}
                      className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded font-semibold ${
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
                      className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded font-semibold ${
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
                  className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded font-semibold ${
                    isScrolled
                      ? "text-white hover:bg-white/10"
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FaRegHeart className="h-4 w-4 sm:h-5 sm:w-5 text-white-700" />
                    <span>Saved Items</span>
                  </div>
                </Link>

                {/* Mobile Notifications Link */}
                {isAuthenticated && (
                  <Link
                    to="/notifications"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded font-semibold ${
                      isScrolled
                        ? "text-white hover:bg-white/10"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaBell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                      <span>
                        Notifications {unreadCount > 0 && `(${unreadCount})`}
                      </span>
                    </div>
                  </Link>
                )}

                {/* Mobile Profile/Sign In Link */}
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToTop();
                      }}
                      className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded font-semibold ${
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
                    <Link
                      to="/profile"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToTop();
                      }}
                      className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded font-semibold ${
                        isScrolled
                          ? "text-white hover:bg-white/10"
                          : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FaUserFriends className="h-4 w-4 sm:h-5 sm:h-5" />
                        <span>My Profile</span>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                        navigate("/");
                      }}
                      className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded font-semibold text-left ${
                        isScrolled
                          ? "text-white hover:bg-white/10"
                          : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FaChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Sign Out</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signin"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className={`nav-link px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded font-semibold ${
                      isScrolled
                        ? "text-white hover:bg-white/10"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CgProfile className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Sign In</span>
                    </div>
                  </Link>
                )}
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
