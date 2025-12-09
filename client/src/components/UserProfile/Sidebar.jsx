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
  Activity,
  Menu,
  X,
  Bell,
  ChevronRight,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  ChartBar,
  CreditCard
} from "lucide-react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({
  activeSection,
  setActiveSection,
  counts,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, notification: counts.alerts > 0 ? counts.alerts : null },
    { id: "personal", label: "Profile", icon: User },
    { id: "posts", label: "My Listings", icon: FileText, count: counts.posts },
    { id: "saved", label: "Saved Items", icon: Heart, count: counts.saved },
    { id: "messages", label: "Messages", icon: MessageCircle, count: 3 },
    { id: "profile-overview", label: "Profile Overview", icon: Calendar }, // Changed from Calendar
    { id: "alerts", label: "Alerts", icon: Bell, count: counts.alerts },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully.");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
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
        fixed lg:static top-0 left-0 w-64 md:w-92 h-screen bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out z-50 lg:z-0 
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden p-6 border-b border-gray-200 flex items-center justify-between bg-white">
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
        <div className="p-6 border-b border-gray-300 overflow-y-hidden">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                JD
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">John Doe</h3>
              <p className="text-sm text-emerald-600 font-medium">Premium Agent</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">{counts.posts}</p>
              <p className="text-xs text-gray-500 mt-1">Listings</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">{counts.saved}</p>
              <p className="text-xs text-gray-500 mt-1">Saved</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">4.8</p>
              <p className="text-xs text-gray-500 mt-1">Rating</p>
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
                  {item.count !== undefined && (
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

          {/* Upgrade Banner */}
          <div className="mt-8 p-5 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Upgrade to Pro</p>
                <p className="text-xs text-gray-600">Advanced analytics & priority support</p>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm hover:shadow">
              Upgrade Now - $49/mo
            </button>
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