import React from "react";
import { 
  TrendingUp,
  Award,
  BadgeCheck,
  Users,
  Eye,
  MessageSquare,
  Star
} from "lucide-react";

const ProfileOverview = ({ user, profilePic, myPosts }) => {
  return (
    <div className="space-y-6  w-6xl  p-5">
      {/* Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="relative">
            <img 
              src={profilePic} 
              alt="Profile" 
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                PRO
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-gray-900">4.8</span>
              <span className="text-xs text-gray-500">(124 reviews)</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 py-6">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-gray-900">{myPosts.length}</p>
            <p className="text-xs text-gray-500 mt-1">Active Listings</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-gray-900">1.2K</p>
            <p className="text-xs text-gray-500 mt-1">Total Views</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-gray-900">89%</p>
            <p className="text-xs text-gray-500 mt-1">Response Rate</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-gray-900">42</p>
            <p className="text-xs text-gray-500 mt-1">Inquiries</p>
          </div>
        </div>

        {/* Badges */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-900">Achievements</h4>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold">
              Top Seller
            </span>
            <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold">
              Quick Responder
            </span>
            <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg text-xs font-semibold">
              Verified Agent
            </span>
            <span className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold">
              5-Star Rated
            </span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-emerald-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg">Performance</h3>
            <p className="text-emerald-100 text-sm mt-1">Last 30 days</p>
          </div>
          <TrendingUp className="w-6 h-6" />
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Listing Views</span>
              <span className="font-bold">+24%</span>
            </div>
            <div className="w-full bg-emerald-400/30 rounded-full h-2">
              <div className="bg-white w-3/4 h-2 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Inquiries</span>
              <span className="font-bold">+18%</span>
            </div>
            <div className="w-full bg-emerald-400/30 rounded-full h-2">
              <div className="bg-white w-2/3 h-2 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Closing Rate</span>
              <span className="font-bold">95%</span>
            </div>
            <div className="w-full bg-emerald-400/30 rounded-full h-2">
              <div className="bg-white w-19/20 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
            View all
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Your listing got 45 views</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">New inquiry received</p>
              <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Scheduled viewing confirmed</p>
              <p className="text-xs text-gray-500 mt-1">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;