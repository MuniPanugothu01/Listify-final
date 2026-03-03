import React from "react";
import StatsCard from "./StatsCard";
import RecentMessages from "./RecentMessages";
import {
  Heart,
  FileText,
  Bell,
  Plus,
  Search,
  Sparkles,
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
    { label: "View Listings", icon: Plus, color: "bg-emerald-500 hover:bg-emerald-600 text-white", onClick: () => onViewAll("posts") },
    { label: "View Saved", icon: Heart, color: "bg-pink-500 hover:bg-pink-600 text-white", onClick: () => onViewAll("saved") },
    { label: "Messages", icon: MessageCircle, color: "bg-amber-500 hover:bg-amber-600 text-white", onClick: () => onViewAll("messages") },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        <StatsCard
          title="Saved Properties"
          value={savedHouses?.length || 0}
          icon={Heart}
          color="emerald"
        />
        <StatsCard
          title="Active Listings"
          value={myPosts?.length || 0}
          icon={FileText}
          color="blue"
        />
        <StatsCard
          title="Active Alerts"
          value={myAlerts?.length || 0}
          icon={Bell}
          color="amber"
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

      <RecentMessages messages={messages || []} />
    </div>
  );
};

export default HomeSection;