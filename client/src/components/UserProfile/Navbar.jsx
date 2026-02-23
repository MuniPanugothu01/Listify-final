import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUserFriends,
  FaHome,
  FaBriefcase,
  FaBuilding,
  FaPlus,
  FaRegHeart,
  FaBell,
  FaUserCircle,
  FaChevronRight,
  FaTools,
  FaSearch,
} from "react-icons/fa";
import NavSearchBar from "../../pages/Home/NavSearchBar.jsx";
import { CgProfile } from "react-icons/cg";
import { ScrollProgress } from "../../components/ui/scroll-progress";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/useRedux";
import { refreshUserData } from "../../redux/slices/authSlice";
import { fetchProfile } from "../../redux/slices/profileSlice";
import toast from "react-hot-toast";

const STATIC_PROFILE_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [imageError, setImageError] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.auth);
  const profileState = useAppSelector((state) => state.profile);

  const { user } = authState;
  const { profile, loading: profileLoading } = profileState;

  // ✅ Compute isAuthenticated from user object
  const isAuthenticated = !!user;

  const { unreadCount: messagesUnread } = useAppSelector(
    (state) => state.messages || { unreadCount: 0 },
  );

  // Refresh user data on mount and when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(refreshUserData());
    }
  }, [isAuthenticated, dispatch]);

  // Fetch profile data if not available
  useEffect(() => {
    if (isAuthenticated && !profile && !profileLoading) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, profile, profileLoading, dispatch]);

  // Sync profile data when it changes
  useEffect(() => {
    if (profile && user) {
      // Update localStorage with combined data
      const combinedUser = {
        ...user,
        ...profile,
        profileImage: profile.profileImage || user?.profileImage,
        profileImageUrl: profile.profileImageUrl || user?.profileImageUrl,
        avatar: profile.avatar || user?.avatar,
        googleProfileImage:
          profile.googleProfileImage || user?.googleProfileImage,
        provider: profile.provider || user?.provider,
        isGoogle: profile.isGoogle || user?.isGoogle,
      };
      localStorage.setItem("user", JSON.stringify(combinedUser));
    }
  }, [profile, user]);

  // Fetch notifications
  useEffect(() => {
    if (isAuthenticated) {
      setNotificationsLoading(true);
      setTimeout(() => {
        setNotifications([
          {
            id: 1,
            text: "Someone viewed your iPhone listing",
            time: "2 mins ago",
            read: false,
            type: "view",
          },
          {
            id: 2,
            text: "Your MacBook Pro has 3 new offers",
            time: "1 hour ago",
            read: false,
            type: "offer",
          },
          {
            id: 3,
            text: "New message from buyer",
            time: "3 hours ago",
            read: true,
            type: "message",
          },
          {
            id: 4,
            text: "Your listing was featured",
            time: "1 day ago",
            read: true,
            type: "featured",
          },
        ]);
        setNotificationsLoading(false);
      }, 1000);
    }
  }, [isAuthenticated]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Reset image error when user/profile changes
  useEffect(() => {
    setImageError(false);
  }, [user?.id, profile?.id]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const mainMenuItems = [
    { name: "For Sale", path: "/forsale" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Electronics", path: "/electronics" },
    { name: "Events", path: "/events" },
    { name: "Take Care", path: "/takecare" },
  ];

  const moreMenuItems = [
    { name: "Rentals", path: "/rentals" },
    { name: "Roommates", path: "/roommates" },
    { name: "Services", path: "/services" },
    { name: "Jobs", path: "/jobs" },
  ];

  const profileMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: CgProfile, count: null },
    { name: "My Profile", path: "/profile", icon: FaUserFriends, count: null },
    { name: "Saved Items", path: "/saved", icon: FaRegHeart, count: null },
    {
      name: "My Listings",
      path: "/my-listings",
      icon: FaBuilding,
      count: null,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: FaBriefcase,
      count: messagesUnread,
    },
    { name: "Settings", path: "/settings", icon: FaTools, count: null },
    { name: "Sign Out", path: "/logout", icon: FaChevronRight, count: null },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (showMobileSearch) setShowMobileSearch(false);
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

  const handleProfileMenuItemClick = async (path) => {
    if (path === "/logout") {
      try {
        closeProfileDropdown();
        const { logout } = await import("../../redux/actions/authActions");
        await dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Logout failed. Please try again.");
      }
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

  const getUserFirstName = useCallback(() => {
    // First try profile (most up-to-date)
    if (profile?.name) {
      return profile.name.split(" ")[0];
    }
    // Then try auth user
    const name = user?.name || user?.displayName;
    if (name) return name.split(" ")[0];
    return "User";
  }, [profile?.name, user?.name, user?.displayName]);

  const getUserFullName = useCallback(() => {
    return profile?.name || user?.name || user?.displayName || "User";
  }, [profile?.name, user?.name, user?.displayName]);

  const getUserEmail = useCallback(() => {
    return profile?.email || user?.email || "user@example.com";
  }, [profile?.email, user?.email]);

  // ✅ Detect Google user properly
  const isGoogleUser = useCallback(() => {
    return (
      profile?.provider === "google" ||
      user?.provider === "google" ||
      profile?.loginMethod === "google" ||
      user?.loginMethod === "google" ||
      profile?.isGoogle === true ||
      user?.isGoogle === true ||
      !!user?.googleId ||
      !!profile?.googleId
    );
  }, [profile, user]);

  // ✅ Get profile image with correct logic
  const getProfileImage = useCallback(() => {
    if (imageError) return null;

    const googleUser = isGoogleUser();

    // Check for custom uploaded image first (applies to both Google and email users)
    const customUploaded =
      profile?.profileImageUrl ||
      profile?.profileImage ||
      profile?.avatar ||
      user?.profileImageUrl ||
      user?.profileImage ||
      user?.avatar;

    if (customUploaded && customUploaded !== STATIC_PROFILE_IMAGE) {
      return customUploaded;
    }

    // For Google users, try Google's photo
    if (googleUser) {
      const googlePhoto =
        profile?.googleProfileImage ||
        user?.googleProfileImage ||
        user?.picture;

      if (googlePhoto && googlePhoto !== STATIC_PROFILE_IMAGE) {
        return googlePhoto;
      }
    }

    // No image found
    return null;
  }, [profile, user, imageError, isGoogleUser]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowMobileSearch(false);
    }
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
        setShowMobileSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Scroll handler with throttle
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

  // Updated CSS with search bar text color change on scroll
  const navbarStyles = `
    @keyframes slideDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .profile-dropdown { animation: slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .nav-link { position: relative; transition: color 0.3s ease; font-weight: 600; }
    .nav-link:hover { color: #1FA987; }
    .nav-link::after { content: ""; position: absolute; width: 0; height: 2px; bottom: -4px; left: 0; background-color: #1FA987; transition: width 0.3s ease; }
    .nav-link:hover::after { width: 100%; }
    .profile-dropdown-link { transition: all 0.2s ease; }
    .profile-dropdown-link:hover { background-color: #f8f9fa; transform: translateX(4px); }
    .navbar-transition { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    .navbar-scrolled { background-color: rgba(0, 0, 0, 0.95) !important; backdrop-filter: blur(20px) !important; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); }
    .navbar-scrolled .nav-link { color: #ffffff; }
    .navbar-scrolled .nav-link:hover { color: #2d7a82; }
    .navbar-scrolled .logo-text { color: #ffffff; }
    
    /* Search bar styles - normal state */
    .search-input {
      width: 100%;
      padding: 10px 20px;
      padding-right: 45px;
      border: 1.5px solid #e5e7eb;
      border-radius: 9999px;
      font-size: 15px;
      outline: none;
      transition: all 0.3s ease;
      background-color: white;
      font-weight: 500;
      color: #1f2937;
    }
    
    .search-input::placeholder {
      color: #6b7280;
      transition: color 0.3s ease;
    }
    
    .search-input:focus {
      border-color: #1FA987;
      box-shadow: 0 0 0 3px rgba(31, 169, 135, 0.15);
    }
    
    .search-button {
      position: absolute;
      right: 4px;
      background: none;
      border: none;
      padding: 8px 16px;
      color: #6b7280;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    
    .search-button:hover {
      color: #1FA987;
    }
    
    /* Search bar styles - scrolled state */
    .navbar-scrolled .search-input {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .navbar-scrolled .search-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .navbar-scrolled .search-button {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .navbar-scrolled .search-button:hover {
      color: white;
    }
    
    .navbar-scrolled .profile-button { border-color: rgba(255, 255, 255, 0.3); color: #ffffff; }
    .navbar-scrolled .profile-button:hover { background-color: rgba(255, 255, 255, 0.1); }
    .notification-badge { position: absolute; top: -5px; right: -5px; background-color: #EF4444; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; }
    .notification-item-unread { background-color: #F0F9FF; border-left: 3px solid #3B82F6; }
    .user-profile-image { border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
    .user-icon-container { background: linear-gradient(135deg, #27bb97, #1fa987); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .message-count-badge { background-color: #EF4444; color: white; border-radius: 9999px; padding: 3px 8px; font-size: 11px; margin-left: 6px; font-weight: 600; }
    
    /* Improved search bar styles */
    .search-container {
      flex: 1;
      max-width: 500px;
      margin: 0 20px;
    }
    
    .search-form {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
    }
    
    /* Mobile search styles */
    .mobile-search-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .mobile-search-button:hover {
      background-color: rgba(31, 169, 135, 0.1);
    }
    
    .navbar-scrolled .mobile-search-button {
      color: white;
    }
    
    .mobile-search-overlay {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      padding: 16px 20px;
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15);
      z-index: 40;
      animation: slideDown 0.3s ease;
    }
    
    .navbar-scrolled .mobile-search-overlay {
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(20px);
    }
    
    .mobile-search-form {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .mobile-search-input {
      flex: 1;
      padding: 12px 20px;
      border: 1.5px solid #e5e7eb;
      border-radius: 9999px;
      font-size: 15px;
      outline: none;
      font-weight: 500;
      color: #1f2937;
    }
    
    .mobile-search-input::placeholder {
      color: #6b7280;
    }
    
    .navbar-scrolled .mobile-search-input {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .navbar-scrolled .mobile-search-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .mobile-search-close {
      padding: 10px;
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .navbar-scrolled .mobile-search-close {
      color: white;
    }
    
    /* Desktop menu items - increased font size */
    .desktop-menu-item {
      font-size: 15px !important;
      padding: 8px 16px !important;
    }
    
    /* Profile button text */
    .profile-button-text {
      font-size: 14px;
      font-weight: 600;
    }
    
    /* Logo size */
    .logo-text {
      font-size: 24px !important;
      font-weight: 700;
    }
    
    @media (min-width: 1024px) {
      .logo-text {
        font-size: 26px !important;
      }
    }
  `;

  const profileImage = getProfileImage();
  const userFirstName = getUserFirstName();
  const userFullName = getUserFullName();
  const userEmail = getUserEmail();
  const googleUser = isGoogleUser();

  return (
    <>
      <style>{navbarStyles}</style>
      <ScrollProgress />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 navbar-transition ${
          isScrolled ? "navbar-scrolled" : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="px-3 sm:px-5 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-16 lg:h-18">
              {/* Logo */}
              <Link
                to="/"
                onClick={scrollToTop}
                className="flex items-center gap-2 flex-shrink-0"
              >
                <span
                  className={`logo-text ${
                    isScrolled ? "text-white" : "text-gray-900"
                  }`}
                >
                  Listify
                </span>
              </Link>

              {/* Desktop Search Bar - Hidden on tablets and below */}
              <div className="hidden lg:block search-container relative">
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <FaSearch size={18} />
                  </button>
                </form>
              </div>

              {/* Desktop Menu - Now visible on lg screens and above */}
              <div className="hidden lg:flex items-center gap-1">
                {mainMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={scrollToTop}
                    className={`nav-link desktop-menu-item ${
                      isScrolled ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <div
                  className="relative"
                  onMouseEnter={() => setShowMoreDropdown(true)}
                  onMouseLeave={() => setShowMoreDropdown(false)}
                >
                  <button
                    className={`nav-link desktop-menu-item flex items-center gap-1 ${
                      isScrolled ? "text-white" : "text-gray-700"
                    }`}
                  >
                    More <FaChevronDown className="text-xs ml-1" />
                  </button>

                  {/* More Dropdown */}
                  {showMoreDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                      {moreMenuItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={() => {
                            setShowMoreDropdown(false);
                            scrollToTop();
                          }}
                          className="block font-semibold px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right side actions - Visible on lg and above (changed from md to lg) */}
              <div className="hidden lg:flex items-center gap-2">
                {/* Heart Icon (Saved Items) */}
                <Link to="/saved" onClick={scrollToTop}>
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      isScrolled
                        ? "text-white hover:bg-white/10"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <FaRegHeart size={18} />
                  </button>
                </Link>

                {/* Notification Icon */}
                {isAuthenticated && (
                  <div className="relative">
                    <button
                      onClick={handleNotificationClick}
                      className={`notification-button relative p-2 rounded-full transition-colors ${
                        isScrolled
                          ? "text-white hover:bg-white/10"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <FaBell size={18} />
                      {unreadCount > 0 && (
                        <span className="notification-badge">{unreadCount}</span>
                      )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotificationDropdown && (
                      <div
                        ref={notificationDropdownRef}
                        className="profile-dropdown absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                      >
                        {/* Notification Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                          <h3 className="font-semibold text-base text-gray-900">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Mark all as read
                            </button>
                          )}
                        </div>

                        {/* Notification List */}
                        <div className="max-h-80 overflow-y-auto">
                          {notificationsLoading ? (
                            <div className="p-4 text-center text-gray-500 text-sm">
                              Loading...
                            </div>
                          ) : notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                onClick={() =>
                                  markNotificationAsRead(notification.id)
                                }
                                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                                  !notification.read
                                    ? "notification-item-unread"
                                    : ""
                                }`}
                              >
                                <p className="text-sm text-gray-800 font-medium">
                                  {notification.text}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                              No notifications
                            </div>
                          )}
                        </div>

                        {/* View All Link */}
                        <div className="border-t border-gray-100 px-4 py-2">
                          <Link
                            to="/notifications"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View all notifications
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Create Listing Button */}
                <Link to="/post-add">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#1FA987] text-white rounded-lg text-sm font-semibold hover:bg-[#1a9277] transition-colors">
                    <FaPlus size={12} />
                    Sell
                  </button>
                </Link>

                {/* Profile/Login Button */}
                <div className="relative">
                  <button
                    onClick={handleProfileClick}
                    className={`profile-button flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                      isScrolled
                        ? "border-white/30 text-white hover:bg-white/10"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {isAuthenticated ? (
                      <>
                        {/* Profile image FIRST */}
                        {profileImage && !imageError ? (
                          <img
                            src={profileImage}
                            alt={userFirstName}
                            width={30}
                            height={30}
                            onError={handleImageError}
                            className="user-profile-image"
                            style={{ width: 30, height: 30 }}
                          />
                        ) : /* Static image for email users, gradient icon for Google users with broken photo */
                        !googleUser ? (
                          <img
                            src={STATIC_PROFILE_IMAGE}
                            alt={userFirstName}
                            width={30}
                            height={30}
                            className="user-profile-image"
                            style={{ width: 30, height: 30 }}
                          />
                        ) : (
                          <div
                            className="user-icon-container"
                            style={{ width: 30, height: 30 }}
                          >
                            <FaUserCircle size={18} />
                          </div>
                        )}
                        {/* First name SECOND */}
                        <span className="hidden sm:inline max-w-[100px] truncate profile-button-text">
                          {userFirstName}
                        </span>
                      </>
                    ) : (
                      <>
                        <FaUserCircle size={18} />
                        <span className="hidden sm:inline profile-button-text">
                          Sign In
                        </span>
                      </>
                    )}
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileDropdown && isAuthenticated && (
                    <div
                      ref={profileDropdownRef}
                      className="profile-dropdown absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100">
                        {/* Profile image FIRST */}
                        {profileImage && !imageError ? (
                          <img
                            src={profileImage}
                            alt={userFullName}
                            width={48}
                            height={48}
                            onError={handleImageError}
                            className="user-profile-image flex-shrink-0"
                            style={{ width: 48, height: 48 }}
                          />
                        ) : !googleUser ? (
                          <img
                            src={STATIC_PROFILE_IMAGE}
                            alt={userFullName}
                            width={48}
                            height={48}
                            className="user-profile-image flex-shrink-0"
                            style={{ width: 48, height: 48 }}
                          />
                        ) : (
                          <div
                            className="user-icon-container flex-shrink-0"
                            style={{ width: 48, height: 48 }}
                          >
                            <FaUserCircle size={30} />
                          </div>
                        )}

                        {/* User details SECOND */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-base truncate">
                            {userFullName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {userEmail}
                          </p>
                          {googleUser && (
                            <span className="text-xs text-blue-500 font-medium">
                              (Google)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {profileMenuItems.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleProfileMenuItemClick(item.path)}
                            className="profile-dropdown-link w-full flex items-center justify-between gap-3 px-4 py-3 text-sm text-gray-700 hover:text-blue-600 font-medium"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon size={16} />
                              <span>{item.name}</span>
                            </div>
                            {item.count > 0 && (
                              <span className="message-count-badge">
                                {item.count}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile/Tablet menu button and icons - Visible on lg and below */}
              <div className="flex lg:hidden items-center gap-2">
                {/* Mobile Search Button */}
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className={`mobile-search-button ${
                    isScrolled ? "text-white" : "text-gray-600"
                  }`}
                >
                  <FaSearch size={18} />
                </button>

                {/* Mobile Heart Icon */}
                <Link to="/saved" onClick={scrollToTop}>
                  <button
                    className={`p-2 rounded-full ${
                      isScrolled ? "text-white" : "text-gray-600"
                    }`}
                  >
                    <FaRegHeart size={18} />
                  </button>
                </Link>

                {/* Mobile Notification Icon */}
                {isAuthenticated && (
                  <div className="relative">
                    <button
                      onClick={handleNotificationClick}
                      className={`notification-button relative p-2 ${
                        isScrolled ? "text-white" : "text-gray-600"
                      }`}
                    >
                      <FaBell size={18} />
                      {unreadCount > 0 && (
                        <span className="notification-badge">{unreadCount}</span>
                      )}
                    </button>
                  </div>
                )}

                {/* Mobile Create Listing Button */}
                <Link to="/post-add">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-[#1FA987] text-white rounded-lg text-sm font-semibold">
                    <FaPlus size={10} /> Post
                  </button>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={toggleMobileMenu}
                  className={`p-2 rounded-lg ${
                    isScrolled ? "text-white" : "text-gray-700"
                  }`}
                >
                  {isMobileMenuOpen ? (
                    <FaTimes size={20} />
                  ) : (
                    <FaBars size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search Overlay */}
            {showMobileSearch && (
              <div className="mobile-search-overlay lg:hidden">
                <form onSubmit={handleSearch} className="mobile-search-form">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mobile-search-input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowMobileSearch(false)}
                    className="mobile-search-close"
                  >
                    <FaTimes size={18} />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="px-4 py-4 space-y-1">
                {/* User Info in Mobile Menu */}
                {isAuthenticated && (user || profile) && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
                    {/* Profile image FIRST */}
                    {profileImage && !imageError ? (
                      <img
                        src={profileImage}
                        alt={userFullName}
                        width={48}
                        height={48}
                        onError={handleImageError}
                        className="user-profile-image flex-shrink-0"
                        style={{ width: 48, height: 48 }}
                      />
                    ) : !googleUser ? (
                      <img
                        src={STATIC_PROFILE_IMAGE}
                        alt={userFullName}
                        width={48}
                        height={48}
                        className="user-profile-image flex-shrink-0"
                        style={{ width: 48, height: 48 }}
                      />
                    ) : (
                      <div
                        className="user-icon-container flex-shrink-0"
                        style={{ width: 48, height: 48 }}
                      >
                        <FaUserCircle size={30} />
                      </div>
                    )}

                    {/* User details SECOND */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-base truncate">
                        {userFullName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {userEmail}
                      </p>
                      {googleUser && (
                        <span className="text-xs text-blue-500 font-medium">
                          (Google)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Main Menu Items */}
                {mainMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className="nav-link block px-3 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* More Menu Items */}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <p className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    More Categories
                  </p>
                  {moreMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToTop();
                      }}
                      className="nav-link block px-3 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Saved Items Link */}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <Link
                    to="/saved"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className="nav-link px-3 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded flex items-center gap-3"
                  >
                    <FaRegHeart size={16} />
                    Saved Items
                  </Link>
                </div>

                {/* Mobile Notifications Link */}
                {isAuthenticated && (
                  <Link
                    to="/notifications"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className="nav-link px-3 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded flex items-center gap-3"
                  >
                    <FaBell size={16} />
                    Notifications {unreadCount > 0 && `(${unreadCount})`}
                  </Link>
                )}

                {/* Mobile Profile/Sign In Links */}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          scrollToTop();
                        }}
                        className="nav-link px-3 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded flex items-center gap-3"
                      >
                        <CgProfile size={16} />
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          scrollToTop();
                        }}
                        className="nav-link px-3 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded flex items-center gap-3"
                      >
                        <FaUserFriends size={16} />
                        My Profile
                      </Link>

                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleProfileMenuItemClick("/logout");
                        }}
                        className="nav-link px-3 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded flex items-center gap-3 w-full text-left"
                      >
                        <FaChevronRight size={16} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/signin"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToTop();
                      }}
                      className="nav-link px-3 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded flex items-center gap-3"
                    >
                      <FaUserCircle size={16} />
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;