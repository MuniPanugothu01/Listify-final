import React from "react";
import StatsCard from "./StatsCard";
import RecentMessages from "./RecentMessages";
import {
  Heart,
  FileText,
  Bell,
  DollarSign,
  Plus,
  Search,
  Eye,
  ArrowUpRight,
  Sparkles,
  Activity,
  Clock,
  MessageCircle,
} from "lucide-react";

const HomeSection = ({ savedHouses, myPosts, myAlerts, messages, onViewAll, user }) => {
  const getFirstName = () => {
    if (!user?.name) return "User";
    return user.name.split(" ")[0];
  };

  // Get current greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Quick action items
  const quickActions = [
    { label: "Post New Ad", icon: Plus, color: "bg-emerald-500 hover:bg-emerald-600 text-white", onClick: () => onViewAll("posts") },
    { label: "Browse Listings", icon: Search, color: "bg-blue-500 hover:bg-blue-600 text-white", onClick: () => {} },
    { label: "View Saved", icon: Heart, color: "bg-pink-500 hover:bg-pink-600 text-white", onClick: () => onViewAll("saved") },
    { label: "Messages", icon: MessageCircle, color: "bg-amber-500 hover:bg-amber-600 text-white", onClick: () => onViewAll("messages") },
  ];

  // Recent activity items
  const recentActivity = [
    { action: "New listing view", detail: "Someone viewed your listing", time: "Just now", icon: Eye, color: "text-blue-600 bg-blue-50" },
    { action: "Property saved", detail: "You saved a new property", time: "2h ago", icon: Heart, color: "text-pink-600 bg-pink-50" },
    { action: "Price alert", detail: "A saved property dropped in price", time: "5h ago", icon: Bell, color: "text-amber-600 bg-amber-50" },
    { action: "New message", detail: "Alice sent you a message", time: "1d ago", icon: MessageCircle, color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-600 via-emerald-500 to-teal-500 p-6 md:p-8 text-white shadow-lg">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl"></div>
        <div className="absolute top-6 right-6 hidden md:block">
          <Sparkles className="w-8 h-8 text-white/20" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-emerald-100 text-sm md:text-base font-medium mb-1">
              {getGreeting()} 👋
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              Welcome back, <span className="text-yellow-200">{getFirstName()}</span>!
            </h1>
            <p className="text-emerald-100 mt-2 text-sm md:text-base max-w-lg">
              Here's an overview of your dashboard. You have{" "}
              <span className="font-semibold text-white">{messages?.filter(m => m.unread)?.length || 0} unread messages</span> and{" "}
              <span className="font-semibold text-white">{myPosts?.length || 0} active listings</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-xl text-sm">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              Online
            </div>
            <button
              onClick={() => onViewAll("posts")}
              className="flex items-center gap-2 bg-white text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Listing
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <StatsCard
          title="Saved Properties"
          value={savedHouses?.length || 0}
          icon={Heart}
          trend="+12%"
          color="emerald"
        />
        <StatsCard
          title="Active Listings"
          value={myPosts?.length || 0}
          icon={FileText}
          trend="+5%"
          color="blue"
        />
        <StatsCard
          title="Active Alerts"
          value={myAlerts?.length || 0}
          icon={Bell}
          trend="+3"
          color="amber"
        />
        <StatsCard
          title="Total Revenue"
          value="$42.5K"
          icon={DollarSign}
          trend="+18%"
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className={`${action.color} flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5`}
            >
              <action.icon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs md:text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Messages + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages — takes 2/3 */}
        <div className="lg:col-span-2">
          <RecentMessages messages={messages || []} />
        </div>

        {/* Recent Activity — takes 1/3 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
            </div>
            <button
              onClick={() => onViewAll("activity")}
              className="text-xs md:text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              View all
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentActivity.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                  <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.action}</p>
                  <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>

          {/* Activity summary */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">This week</span>
              <span className="font-semibold text-gray-900">12 activities</span>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
              <div className="bg-linear-to-r from-emerald-500 to-teal-400 h-2 rounded-full w-3/4 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;