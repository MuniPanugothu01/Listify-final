import React, { useState } from "react";
import StatsCard from "./StatsCard";
import RecentMessages from "./RecentMessages";
import { authAPI } from "../../services/api";
import {
  Heart,
  FileText,
  Bell,
  Plus,
  Search,
  Sparkles,
  MessageCircle,
  Users,
  X,
  Loader2,
} from "lucide-react";

const HomeSection = ({ savedHouses, myPosts, myAlerts, messages, onViewAll, user }) => {
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followModalType, setFollowModalType] = useState("followers");
  const [followList, setFollowList] = useState([]);
  const [followListLoading, setFollowListLoading] = useState(false);

  const openFollowModal = async (type) => {
    setFollowModalType(type);
    setShowFollowModal(true);
    setFollowListLoading(true);
    try {
      const res = await authAPI.getMyFollowers(type);
      setFollowList(res.data?.users || []);
    } catch (err) {
      console.error("Failed to fetch follow list:", err);
      setFollowList([]);
    } finally {
      setFollowListLoading(false);
    }
  };

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
          color="emerald"
          onClick={() => onViewAll("saved")}
        />
        <StatsCard
          title="Active Listings"
          value={myPosts?.length || 0}
          icon={FileText}
          color="blue"
          onClick={() => onViewAll("posts")}
        />
        <StatsCard
          title="Followers"
          value={user?.followersCount || 0}
          icon={Users}
          color="purple"
          onClick={() => openFollowModal("followers")}
        />
        <StatsCard
          title="Notifications"
          value={myAlerts?.length || 0}
          icon={Bell}
          color="amber"
          onClick={() => onViewAll("alerts")}
        />
      </div>

      <RecentMessages messages={messages || []} />

      {/* Followers / Following Modal */}
      {showFollowModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFollowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900 capitalize">{followModalType}</h3>
              </div>
              <button
                onClick={() => setShowFollowModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {["followers", "following"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => openFollowModal(tab)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors capitalize ${
                    followModalType === tab
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4">
              {followListLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-7 h-7 text-purple-500 animate-spin" />
                </div>
              ) : followList.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    {followModalType === "followers"
                      ? "No one is following you yet"
                      : "You're not following anyone yet"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {followList.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      {person.profileImageUrl ? (
                        <img
                          src={person.profileImageUrl}
                          alt={person.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                        />
                      ) : null}
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 items-center justify-center text-white font-bold text-sm ${person.profileImageUrl ? 'hidden' : 'flex'}`}
                      >
                        {person.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{person.name}</p>
                        <p className="text-xs text-gray-500">
                          {person.provider === "google" ? "Google Account" : "Member"}{" "}
                          · Joined {new Date(person.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSection;