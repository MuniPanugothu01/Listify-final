import React from "react";
import StatsCard from "./StatsCard";
import RecentMessages from "./RecentMessages";
import MyListings from "./MyListings";
import MyAgenda from "./MyAgenda";
import { Heart, FileText, Bell, TrendingUp, Eye, DollarSign, Users, Calendar } from "lucide-react";

const HomeSection = ({ savedHouses, myPosts, myAlerts, messages, agendaEvents, onViewAll }) => (
  <>
    {/* Welcome Section */}
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, <span className="text-emerald-600">John</span>!</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">Here's what's happening with your properties today</p>
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
        value={savedHouses.length} 
        icon={Heart}
        trend="+12%"
        color="emerald"
      />
      <StatsCard 
        title="Active Listings" 
        value={myPosts.length} 
        icon={FileText}
        trend="+5%"
        color="blue"
      />
      <StatsCard 
        title="Active Alerts" 
        value={myAlerts.length} 
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
        <RecentMessages messages={messages} />
        
        {/* Performance Overview */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">Performance Overview</h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Last 30 days performance metrics</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: "Response Rate", value: "95%", change: "+2.3%" },
              { label: "Avg. Response", value: "1.2h", change: "-15min" },
              { label: "Inquiries", value: "42", change: "+8%" },
              { label: "Scheduled Viewings", value: "18", change: "+3" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
                <div className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</div>
                <div className={`text-xs font-medium mt-2 ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Column - Hidden on mobile, shown on large screens */}
      <div className="hidden lg:block space-y-6">
        <MyListings count={myPosts.length} onViewAll={() => onViewAll('posts')} />
        <MyAgenda events={agendaEvents} />
      </div>
    </div>

    {/* Mobile Bottom Row */}
    <div className="lg:hidden space-y-6 mt-6">
      <MyListings count={myPosts.length} onViewAll={() => onViewAll('posts')} />
      <MyAgenda events={agendaEvents} />
    </div>
  </>
);

export default HomeSection;