import React from "react";
import {
  Home,
  User,
  Settings,
  Heart,
  Shield,
  LogOut,
  FileText,
  MessageCircle,
  Menu,
  X,
  Bell,
  ChevronRight,
  Star,
  Smartphone,
  History,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const Sidebar = ({
  activeSection,
  setActiveSection,
  counts,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { devices, profile } = useSelector((state) => state.profile);

  // Use the profile name (most up-to-date after edits) with auth user as fallback
  const displayName = profile?.name || user?.name || "User";

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, notification: counts.alerts > 0 ? counts.alerts : null },
    { id: "personal", label: "Profile", icon: User },
    { id: "posts", label: "My Listings", icon: FileText, count: counts.posts },
    { id: "saved", label: "Saved Items", icon: Heart, count: counts.saved },
    { id: "messages", label: "Messages", icon: MessageCircle, count: counts.messages },
    { id: "devices", label: "Devices", icon: Smartphone, count: devices?.length },
    { id: "activity", label: "Activity", icon: History },
    { id: "alerts", label: "Alerts", icon: Bell, count: counts.alerts },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully.");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!displayName || displayName === "User") return "U";
    return displayName
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get profile image URL — prefer profile state (most recent after edits)
  const getProfileImage = () => {
    return profile?.profileImage || profile?.profileImageUrl || user?.profileImageUrl || user?.avatar || null;
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
        fixed lg:static top-0 left-0 w-64 md:w-72 h-screen bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out z-50 lg:z-0 overflow-y-auto
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden p-6 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Dashboard</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 hover:bg-gray-100 rounded-xl flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Profile Summary */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              {getProfileImage() ? (
                <img
                  src={getProfileImage()}
                  alt={displayName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg"
                />
              ) : (
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {getUserInitials()}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate">{displayName}</h3>
              <p className="text-sm text-emerald-600 font-medium">
                {user?.provider === "google" ? "Google Account" : "Member"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">{counts.posts}</p>
              <p className="text-xs text-gray-500 mt-1">Listings</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">{counts.saved}</p>
              <p className="text-xs text-gray-500 mt-1">Saved</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">{profile?.followersCount || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Followers</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">{profile?.followingCount || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Following</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all
                  ${activeSection === item.id
                    ? "bg-emerald-50 text-emerald-700 border-l-4 border-l-emerald-500"
                    : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${activeSection === item.id ? "text-emerald-500" : "text-gray-500"}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      activeSection === item.id
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {item.count}
                    </span>
                  )}
                  {item.notification && (
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                  {activeSection === item.id && (
                    <ChevronRight className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors border border-red-100"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;