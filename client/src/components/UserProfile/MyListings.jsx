import React from "react";
import { ChevronRight, TrendingUp, DollarSign } from "lucide-react";

const MyListings = ({ count, onViewAll }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
    <div className="flex items-start justify-between mb-4 md:mb-6">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">My Listings</h3>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Active property listings</p>
      </div>
      <button 
        onClick={onViewAll} 
        className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
      >
        View all
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    
    <div className="mb-4 md:mb-6">
      <div className="flex items-end gap-2">
        <p className="text-3xl md:text-4xl font-bold text-gray-900">{count}</p>
        <div className="flex items-center gap-1 mb-1">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-600">+12%</span>
        </div>
      </div>
      <p className="text-gray-500 text-xs md:text-sm">active listings</p>
    </div>

    <div className="space-y-2 md:space-y-3 mb-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-600 text-sm">For Rent</span>
        <span className="font-semibold text-gray-900">3</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600 text-sm">For Sale</span>
        <span className="font-semibold text-gray-900">5</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600 text-sm">Vacation</span>
        <span className="font-semibold text-gray-900">2</span>
      </div>
    </div>

    <div className="pt-4 md:pt-6 border-t border-gray-100 mt-4">
      <button className="w-full py-3 px-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
        <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
        Post New Listing
      </button>
    </div>
  </div>
);

export default MyListings;