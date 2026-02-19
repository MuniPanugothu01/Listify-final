import React from "react";
import StatsCard from "./StatsCard";
import RecentMessages from "./RecentMessages";
import MyListings from "./MyListings";
import MyAgenda from "./MyAgenda";
import { Heart, FileText, Bell, TrendingUp, DollarSign } from "lucide-react";

const HomeSection = ({ savedHouses, myPosts, myAlerts, messages, agendaEvents, onViewAll, user }) => {
  // Get user's first name from the user object
  const getFirstName = () => {
    if (!user?.name) return "User";
    // Split the full name and get the first part
    return user.name.split(' ')[0];
  };

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back, <span className="text-emerald-600">{getFirstName()}</span>!
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Here's what's happening with your properties today
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Online
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentMessages messages={messages || []} />
        </div>
        
        {/* Right Column */}
        <div className="hidden lg:block space-y-6">
          <MyListings count={myPosts?.length || 0} onViewAll={() => onViewAll('posts')} />
          <MyAgenda events={agendaEvents || {}} />
        </div>
      </div>

      {/* Mobile Bottom Row */}
      <div className="lg:hidden space-y-6 mt-6">
        <MyListings count={myPosts?.length || 0} onViewAll={() => onViewAll('posts')} />
        <MyAgenda events={agendaEvents || {}} />
      </div>
    </>
  );
};

export default HomeSection;