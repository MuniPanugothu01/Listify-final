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
  FaRegBell,
  FaUserCircle,
  FaChevronRight,
  FaTools,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";

import NavSearchBar from "../../pages/Home/NavSearchBar.jsx";
import { CgProfile } from "react-icons/cg";
import { ScrollProgress } from "../../components/ui/scroll-progress";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/useRedux";
import { updateUser, checkAuth, logoutUser } from "../../redux/slices/authSlice";
import { fetchProfile } from "../../redux/slices/profileSlice";
import { notificationsAPI, chatAPI } from "../../services/api";
import toast from "react-hot-toast";

const STATIC_PROFILE_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

// Popular cities for location suggestions
const POPULAR_CITIES = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
  "Boston",
  "El Paso",
  "Nashville",
  "Detroit",
  "Portland",
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [imageError, setImageError] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  const [chatUnreadCount, setChatUnreadCount] = useState(0);

  const notificationDropdownRef = useRef(null);
  const locationInputRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.auth);
  const profileState = useAppSelector((state) => state.profile);

  const { user } = authState;
  const { profile, loading: profileLoading, serverCachedImage } = profileState;

  // ✅ Compute isAuthenticated from user object
  const isAuthenticated = !!user;

  // Fetch profile data if not available
  useEffect(() => {
    if (isAuthenticated && !profile && !profileLoading) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, profile, profileLoading, dispatch]);

  // Sync profile data into auth user state when profile changes
  useEffect(() => {
    if (profile) {
      // Reset image error when profile updates (new image may have been uploaded)
      setImageError(false);
      dispatch(updateUser({
        name: profile.name,
        email: profile.email,
        profileImage: profile.profileImage,
        profileImageUrl: profile.profileImage || profile.profileImageUrl,
        avatar: profile.avatar,
        googleProfileImage: profile.googleProfileImage,
        provider: profile.provider,
        isGoogle: profile.isGoogle,
      }));
    }
  }, [profile, dispatch]);

  // Fetch notifications from real API
  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setNotificationsLoading(true);
      const res = await notificationsAPI.getAll(1, 10);
      setNotifications(res.data?.notifications || []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setNotificationsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Poll unread count every 60s
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(async () => {
      try {
        const res = await notificationsAPI.getUnreadCount();
        const count = res.data?.unreadCount || 0;
        // If count changed, refresh the full list
        if (count !== unreadCountRef.current) {
          unreadCountRef.current = count;
          fetchNotifications();
        }
      } catch (_) {}
    }, 60000);
    return () => clearInterval(interval);
  }, [isAuthenticated, fetchNotifications]);

  const unreadCountRef = useRef(0);
  const unreadCount = notifications.filter((n) => !n.read).length;
  useEffect(() => { unreadCountRef.current = unreadCount; }, [unreadCount]);

  // Poll chat unread count
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchChatUnread = async () => {
      try {
        const res = await chatAPI.getUnreadCount();
        setChatUnreadCount(res.data?.unreadCount || 0);
      } catch (_) {}
    };
    fetchChatUnread();
    const interval = setInterval(fetchChatUnread, 60000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const formatNotifTime = (dateStr) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString();
  };

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (showMobileSearch) setShowMobileSearch(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
      scrollToTop();
    } else {
      navigate("/signin");
    }
  };

  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const closeNotificationDropdown = () => {
    setShowNotificationDropdown(false);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectedLocation(value);
    
    // Filter location suggestions
    if (value.trim()) {
      const filtered = POPULAR_CITIES.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  };

  const handleLocationSelect = (city) => {
    setSelectedLocation(city);
    setShowLocationSuggestions(false);
    setLocationSuggestions([]);
  };

  const handleProfileMenuItemClick = async (path) => {
    if (path === "/logout") {
      try {
        await dispatch(logoutUser()).unwrap();
        toast.success("Logged out successfully");
        navigate("/");
      } catch {
        toast.error("Logout failed. Please try again.");
      }
    } else {
      navigate(path);
    }
    scrollToTop();
  };

  const markNotificationAsRead = async (id) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications(
        notifications.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif,
        ),
      );
    } catch (_) {}
  };

  const markAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
    } catch (_) {}
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

    // 1. Custom uploaded image has highest priority (profileImage is the S3 URL)
    const customUploaded =
      profile?.profileImage ||
      user?.profileImage;

    if (customUploaded && customUploaded !== STATIC_PROFILE_IMAGE) {
      return customUploaded;
    }

    // 2. profileImageUrl (computed field — could be custom or google)
    const computedUrl =
      profile?.profileImageUrl ||
      user?.profileImageUrl;

    if (computedUrl && computedUrl !== STATIC_PROFILE_IMAGE) {
      return computedUrl;
    }

    // 3. For Google users, try Google's photo
    if (googleUser) {
      const googlePhoto =
        profile?.googleProfileImage ||
        user?.googleProfileImage ||
        user?.picture;

      if (googlePhoto && googlePhoto !== STATIC_PROFILE_IMAGE) {
        return googlePhoto;
      }
    }

    // 4. Avatar fallback
    const avatar = profile?.avatar || user?.avatar;
    if (avatar && avatar !== STATIC_PROFILE_IMAGE) {
      return avatar;
    }

    // 5. Server-side Redis cache fallback (survives logout — instant on re-login)
    if (serverCachedImage?.url) {
      return serverCachedImage.url;
    }

    // No image found
    return null;
  }, [profile, user, imageError, isGoogleUser, serverCachedImage]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.append("q", searchQuery.trim());
    }
    if (selectedLocation.trim()) {
      params.append("location", selectedLocation.trim());
    }
    navigate(`/search?${params.toString()}`);
    setSearchQuery("");
    setShowMobileSearch(false);
    setShowLocationSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleSellClick = async (e) => {
    e.preventDefault();

    // Quick client-side check first
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    // Verify session against server (Upstash Redis + MongoDB) via Redux thunk
    setSellLoading(true);
    try {
      const result = await dispatch(checkAuth()).unwrap();

      if (result.success && result.isAuthenticated) {
        navigate('/post-add');
      } else {
        // Session invalid on server (expired in Redis/MongoDB)
        setShowLoginPrompt(true);
      }
    } catch (error) {
      // checkAuth thunk rejects on network/server errors (503, timeout, etc.)
      // Since client-side auth already passed, allow through on transient errors
      console.warn('checkAuth failed, allowing through:', error);
      navigate('/post-add');
    } finally {
      setSellLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginPrompt(false);
    navigate('/signin', { state: { from: '/post-add' } });
  };

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        !event.target.closest(".notification-button")
      ) {
        closeNotificationDropdown();
      }
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target)
      ) {
        setShowLocationSuggestions(false);
      }
    };
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeNotificationDropdown();
        setShowMobileSearch(false);
        setShowLocationSuggestions(false);
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

  const profileImage = getProfileImage();
  const userFirstName = getUserFirstName();
  const userFullName = getUserFullName();
  const userEmail = getUserEmail();
  const googleUser = isGoogleUser();

  return (
    <>
      <ScrollProgress />

      {/* Login Required Modal */}
      {showLoginPrompt && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeLoginPrompt}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md mx-4 overflow-hidden animate-[slideDown_0.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1FA987] to-[#27bb97] px-6 py-5 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUserCircle size={36} />
              </div>
              <h3 className="text-xl font-bold">Login Required</h3>
              <p className="text-sm text-white/80 mt-1">Please sign in to post your listing</p>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                You need to be logged in to create a listing. Sign in to your account or create a new one to get started.
              </p>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={closeLoginPrompt}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLoginRedirect}
                className="flex-1 px-4 py-2.5 bg-[#1FA987] text-white rounded-xl font-semibold text-sm hover:bg-[#1a9277] transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isScrolled 
            ? "bg-black/95 backdrop-blur-[20px] shadow-lg" 
            : "bg-white shadow-sm"
        }`}
      >
        <div className="">
          <div className="px-4 sm:px-4 lg:px-6">
            <div className="flex items-center justify-between h-16 sm:h-16 lg:h-18">
              {/* Logo */}
              <Link
                to="/"
                onClick={scrollToTop}
                className="flex items-center gap-2 flex-shrink-0"
              >
                <span
                  className={`text-2xl lg:text-[26px] font-bold ${
                    isScrolled ? "text-white" : "text-gray-900"
                  }`}
                >
                  Listify
                </span>
              </Link>

              {/* Desktop Search Bar with Separate Location - Only visible on lg screens and above */}
              <div className="hidden lg:flex flex-1 max-w-[700px] mx-5 items-center gap-2">
                {/* Location Input - Separate Div */}
                <div className="flex-[0_0_140px] xl:flex-[0_0_140px] lg:flex-[0_0_120px] relative" ref={locationInputRef}>
                  <div className="flex items-center bg-white border-[1.5px] border-gray-200 rounded-full px-3 py-2 transition-all duration-300 focus-within:border-[#1FA987] focus-within:shadow-[0_0_0_3px_rgba(31,169,135,0.15)]">
                    <FaMapMarkerAlt className="text-gray-500 mr-2 text-sm flex-shrink-0" size={14} />
                    <input
                      type="text"
                      placeholder="Location"
                      value={selectedLocation}
                      onChange={handleLocationChange}
                      onFocus={() => {
                        if (selectedLocation) {
                          handleLocationChange({ target: { value: selectedLocation } });
                        } else {
                          setLocationSuggestions(POPULAR_CITIES.slice(0, 5));
                          setShowLocationSuggestions(true);
                        }
                      }}
                      onKeyPress={handleKeyPress}
                      className="border-none outline-none text-sm font-medium text-gray-800 w-full bg-transparent placeholder:text-gray-500 placeholder:font-normal"
                    />
                  </div>
                  
                  {/* Location Suggestions Dropdown */}
                  {showLocationSuggestions && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-lg z-[60] max-h-[300px] overflow-y-auto animate-[slideDown_0.2s_ease]">
                      {locationSuggestions.length > 0 ? (
                        locationSuggestions.map((city, index) => (
                          <div
                            key={index}
                            onClick={() => handleLocationSelect(city)}
                            className="px-4 py-3 cursor-pointer flex items-center gap-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-all duration-200"
                          >
                            <FaMapMarkerAlt className="text-gray-500 text-xs" size={12} />
                            <span>{city}</span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 flex items-center gap-2.5 text-sm text-gray-800">
                          <FaMapMarkerAlt className="text-gray-500 text-xs" size={12} />
                          <span>No locations found</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Search Input - Separate Div with Icon Inside */}
                <div className="flex-1 relative">
                  <div className="flex items-center bg-white border-[1.5px] border-gray-200 rounded-full px-3 py-2 transition-all duration-300 cursor-pointer focus-within:border-[#1FA987] focus-within:shadow-[0_0_0_3px_rgba(31,169,135,0.15)]">
                    <FaSearch className="text-gray-500 mr-2 text-sm flex-shrink-0" size={14} />
                    <input
                      type="text"
                      placeholder="Search for products, brands and more..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="border-none outline-none text-sm font-medium text-gray-800 w-full bg-transparent placeholder:text-gray-500 placeholder:font-normal"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Menu - Now visible on md screens and above */}
              <div className="hidden md:flex items-center gap-1">
                {mainMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={scrollToTop}
                    className={`relative font-semibold transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full ${
                      isScrolled ? "text-white" : "text-gray-700"
                    } text-base lg:text-[15px] xl:text-base px-2 lg:px-3 py-2`}
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
                    className={`relative font-semibold transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1 ${
                      isScrolled ? "text-white" : "text-gray-700"
                    } text-base lg:text-[15px] xl:text-base px-2 lg:px-3 py-2`}
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

              {/* Right side actions - Visible on md and above */}
              <div className="hidden md:flex items-center gap-1 lg:gap-2">
                {/* Location Icon Button - visible on md, hidden on lg+ (where inline search shows) */}
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-[rgba(31,169,135,0.1)] ${
                    isScrolled ? "text-white" : "text-gray-600"
                  }`}
                >
                  <FaMapMarkerAlt size={16} />
                </button>

                {/* Search Icon Button - visible on md, hidden on lg+ (where inline search shows) */}
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-[rgba(31,169,135,0.1)] ${
                    isScrolled ? "text-white" : "text-gray-600"
                  }`}
                >
                  <FaSearch size={18} />
                </button>

                {/* Heart Icon (Saved Items) */}
                {isAuthenticated && (
                <Link to="/dashboard/saved" onClick={scrollToTop}>
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
                )}

                {/* Messages Icon */}
                {isAuthenticated && (
                  <Link to="/dashboard/messages">
                    <button
                      className={`relative p-2 rounded-full transition-colors ${
                        isScrolled
                          ? "text-white hover:bg-white/10"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {chatUnreadCount > 0 && (
                        <span className="absolute -top-[5px] -right-[5px] bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
                          {chatUnreadCount > 9 ? "9+" : chatUnreadCount}
                        </span>
                      )}
                    </button>
                  </Link>
                )}

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
                      <FaRegBell size={18} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-[5px] -right-[5px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotificationDropdown && (
                      <div
                        ref={notificationDropdownRef}
                        className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-[slideDown_0.3s_cubic-bezier(0.25,0.46,0.45,0.94)]"
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
                                key={notification._id}
                                onClick={() =>
                                  !notification.read && markNotificationAsRead(notification._id)
                                }
                                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                                  !notification.read
                                    ? "bg-blue-50 border-l-3 border-blue-500"
                                    : ""
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  {notification.sender?.profileImageUrl ? (
                                    <img
                                      src={notification.sender.profileImageUrl}
                                      alt=""
                                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
                                      onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                      {notification.sender?.name?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-800 font-medium">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      {formatNotifTime(notification.createdAt)}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></span>
                                  )}
                                </div>
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
                            to="/dashboard/alerts"
                            onClick={() => {
                              setShowNotificationDropdown(false);
                              scrollToTop();
                            }}
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
                <button
                  onClick={handleSellClick}
                  disabled={sellLoading}
                  className={`flex items-center gap-1 lg:gap-2 px-2.5 lg:px-4 py-2 bg-[#1FA987] text-white rounded-lg text-sm font-semibold hover:bg-[#1a9277] transition-colors ${
                    sellLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {sellLoading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <FaPlus size={12} />
                  )}
                  <span className="hidden lg:inline">Sell</span>
                </button>

                {/* Profile/Login Button */}
                <div className="relative">
                  <button
                    onClick={handleProfileClick}
                    className={`profile-button flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 rounded-lg border transition-colors ${
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
                            className="rounded-full object-cover border-2 border-white shadow-sm"
                            style={{ width: 30, height: 30 }}
                          />
                        ) : /* Static image for email users, gradient icon for Google users with broken photo */
                        !googleUser ? (
                          <img
                            src={STATIC_PROFILE_IMAGE}
                            alt={userFirstName}
                            width={30}
                            height={30}
                            className="rounded-full object-cover border-2 border-white shadow-sm"
                            style={{ width: 30, height: 30 }}
                          />
                        ) : (
                          <div
                            className="bg-gradient-to-br from-[#27bb97] to-[#1fa987] text-white rounded-full flex items-center justify-center"
                            style={{ width: 30, height: 30 }}
                          >
                            <FaUserCircle size={18} />
                          </div>
                        )}
                        {/* First name SECOND */}
                        <span className="hidden lg:inline max-w-[100px] truncate text-sm font-semibold">
                          {userFirstName}
                        </span>
                      </>
                    ) : (
                      <>
                        <FaUserCircle size={18} />
                        <span className="hidden lg:inline text-sm font-semibold">
                          Sign In
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile/Tablet menu button and icons - Visible below md screens */}
              <div className="flex md:hidden items-center gap-2">
                {/* Mobile Location Button */}
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    isScrolled ? "text-white" : "text-gray-600"
                  }`}
                >
                  <FaMapMarkerAlt size={16} />
                </button>

                {/* Mobile Search Button */}
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    isScrolled ? "text-white" : "text-gray-600"
                  }`}
                >
                  <FaSearch size={18} />
                </button>

                {/* Mobile Heart Icon */}
                {isAuthenticated && (
                <Link to="/dashboard/saved" onClick={scrollToTop}>
                  <button
                    className={`p-2 rounded-full ${
                      isScrolled ? "text-white" : "text-gray-600"
                    }`}
                  >
                    <FaRegHeart size={18} />
                  </button>
                </Link>
                )}

                {/* Mobile Messages Icon */}
                {isAuthenticated && (
                  <Link to="/dashboard/messages">
                    <button
                      className={`relative p-2 rounded-full ${
                        isScrolled ? "text-white" : "text-gray-600"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {chatUnreadCount > 0 && (
                        <span className="absolute -top-[5px] -right-[5px] bg-emerald-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                          {chatUnreadCount > 9 ? "9+" : chatUnreadCount}
                        </span>
                      )}
                    </button>
                  </Link>
                )}

                {/* Mobile Notification Icon */}
                {isAuthenticated && (
                  <div className="relative">
                    <button
                      onClick={handleNotificationClick}
                      className={`notification-button relative p-2 ${
                        isScrolled ? "text-white" : "text-gray-600"
                      }`}
                    >
                      <FaRegBell size={18} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-[5px] -right-[5px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  </div>
                )}

                {/* Mobile Create Listing Button */}
                <button
                  onClick={handleSellClick}
                  disabled={sellLoading}
                  className={`flex items-center gap-1 px-3 py-1.5 bg-[#1FA987] text-white rounded-lg text-sm font-semibold ${
                    sellLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {sellLoading ? (
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <FaPlus size={10} />
                  )}
                  Post
                </button>

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

            {/* Mobile Search Overlay with Separate Location - Only visible below lg screens */}
            {showMobileSearch && (
              <div className="absolute top-full left-0 right-0 bg-white p-4 shadow-lg z-40 animate-[slideDown_0.3s_ease]">
                <form onSubmit={handleSearch} className="flex flex-col gap-3">
                  {/* Location Field - Separate */}
                  <div className="flex items-center bg-white border-[1.5px] border-gray-200 rounded-full px-4">
                    <FaMapMarkerAlt className="text-gray-500 mr-2" size={14} />
                    <input
                      type="text"
                      placeholder="Location"
                      value={selectedLocation}
                      onChange={handleLocationChange}
                      onFocus={() => {
                        if (selectedLocation) {
                          handleLocationChange({ target: { value: selectedLocation } });
                        } else {
                          setLocationSuggestions(POPULAR_CITIES.slice(0, 5));
                          setShowLocationSuggestions(true);
                        }
                      }}
                      className="w-full py-3 border-none outline-none text-[15px] bg-transparent text-gray-800"
                    />
                  </div>
                  
                  {/* Mobile Location Suggestions */}
                  {showLocationSuggestions && (
                    <div className="mt-2 bg-white rounded-xl border border-gray-200 max-h-[200px] overflow-y-auto">
                      {locationSuggestions.length > 0 ? (
                        locationSuggestions.map((city, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              handleLocationSelect(city);
                              setShowLocationSuggestions(false);
                            }}
                            className="px-4 py-3 cursor-pointer flex items-center gap-2.5 text-sm text-gray-800 hover:bg-gray-100"
                          >
                            <FaMapMarkerAlt className="text-gray-500 text-xs" size={12} />
                            <span>{city}</span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 flex items-center gap-2.5 text-sm text-gray-800">
                          <FaMapMarkerAlt className="text-gray-500 text-xs" size={12} />
                          <span>No locations found</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Search Field - Separate with Icon Inside */}
                  <div className="flex items-center bg-white border-[1.5px] border-gray-200 rounded-full px-4">
                    <FaSearch className="text-gray-500 mr-2" size={14} />
                    <input
                      type="text"
                      placeholder="Search for products, brands and more..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-3 border-none outline-none text-[15px] bg-transparent text-gray-800"
                      autoFocus
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button type="submit" className="flex-1 py-3 bg-[#1FA987] text-white rounded-full font-semibold transition-colors hover:bg-[#1a9277]">
                      Search
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMobileSearch(false)}
                      className="p-3 bg-none border-none cursor-pointer text-gray-500 flex items-center justify-center"
                    >
                      <FaTimes size={18} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
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
                        className="rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                        style={{ width: 48, height: 48 }}
                      />
                    ) : !googleUser ? (
                      <img
                        src={STATIC_PROFILE_IMAGE}
                        alt={userFullName}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                        style={{ width: 48, height: 48 }}
                      />
                    ) : (
                      <div
                        className="bg-gradient-to-br from-[#27bb97] to-[#1fa987] text-white rounded-full flex items-center justify-center flex-shrink-0"
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
                    className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full block px-3 py-3 text-base hover:bg-gray-100 rounded"
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
                      className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full block px-3 py-3 text-base hover:bg-gray-100 rounded"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Saved Items Link */}
                {isAuthenticated && (
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <Link
                    to="/dashboard/saved"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full px-3 py-3 text-base hover:bg-gray-100 rounded flex items-center gap-3"
                  >
                    <FaRegHeart size={16} />
                    Saved Items
                  </Link>
                </div>
                )}

                {/* Mobile Notifications Link */}
                {isAuthenticated && (
                  <Link
                    to="/dashboard/messages"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full px-3 py-3 text-base hover:bg-gray-100 rounded flex items-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Messages {chatUnreadCount > 0 && `(${chatUnreadCount})`}
                  </Link>
                )}

                {isAuthenticated && (
                  <Link
                    to="/notifications"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full px-3 py-3 text-base hover:bg-gray-100 rounded flex items-center gap-3"
                  >
                    <FaRegBell size={16} />
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
                        className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full px-3 py-3 text-base hover:bg-gray-100 rounded flex items-center gap-3"
                      >
                        <CgProfile size={16} />
                        Dashboard
                      </Link>

                      <Link
                        to="/dashboard/profile"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          scrollToTop();
                        }}
                        className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full px-3 py-3 text-base hover:bg-gray-100 rounded flex items-center gap-3"
                      >
                        <FaUserFriends size={16} />
                        My Profile
                      </Link>

                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleProfileMenuItemClick("/logout");
                        }}
                        className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full px-3 py-3 text-base hover:bg-gray-100 rounded flex items-center gap-3 w-full text-left"
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
                      className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-[#1FA987] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1FA987] after:transition-all after:duration-300 hover:after:w-full px-3 py-3 text-base hover:bg-gray-100 rounded flex items-center gap-3"
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

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .navbar-scrolled .location-input-wrapper,
        .navbar-scrolled .search-input-wrapper {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .navbar-scrolled .location-icon,
        .navbar-scrolled .search-icon {
          color: rgba(255, 255, 255, 0.7);
        }
        .navbar-scrolled .location-input,
        .navbar-scrolled .search-input {
          color: white;
        }
        .navbar-scrolled .location-input::placeholder,
        .navbar-scrolled .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        .navbar-scrolled .location-suggestions {
          background: #1f2937;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .navbar-scrolled .location-suggestion-item {
          color: white;
        }
        .navbar-scrolled .location-suggestion-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .navbar-scrolled .location-suggestion-item .suggestion-icon {
          color: rgba(255, 255, 255, 0.5);
        }
        .navbar-scrolled .mobile-search-overlay {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
        }
        .navbar-scrolled .mobile-location-field,
        .navbar-scrolled .mobile-search-field {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .navbar-scrolled .mobile-location-field .location-icon,
        .navbar-scrolled .mobile-search-field .search-icon {
          color: rgba(255, 255, 255, 0.7);
        }
        .navbar-scrolled .mobile-location-input,
        .navbar-scrolled .mobile-search-input {
          color: white;
        }
        .navbar-scrolled .mobile-location-input::placeholder,
        .navbar-scrolled .mobile-search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        .navbar-scrolled .mobile-search-close {
          color: white;
        }
        .navbar-scrolled .mobile-location-suggestions {
          background: #1f2937;
          border-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
};

export default Navbar;