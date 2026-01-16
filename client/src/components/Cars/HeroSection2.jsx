import React, { useState } from "react";
// react icons
import { Search, ChevronDown, Plus } from "lucide-react";
import { IoSearch } from "react-icons/io5";

export default function HeroSection2() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="w-full relative mt-0 z-0">
      {/* Hero Section with Background */}
      <div
        className="relative w-full h-[50vh] min-h-[500px] max-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/cars/herocarimg.webp')`,
        }}
      >
        {/* Content Overlay */}
        <div className="lg:container mx-auto lg:px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 w-full">
            {/* Text Content */}
            <div className="space-y-8 text-white text-center">
              <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl  font-bold text-white mb-4">
                22,000+ Cars for Sale & Rent from Local Sellers
              </h1>
              <p className="text-white/90 text-lg md:text-xl text-center">
                Buy & Sell New, Used and Certified Cars from Trusted Sellers
              </p>

              {/* Tabs - Positioned similarly to the Room/Property buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <button className="px-6 py-3  rounded-lg font-semibold transition bg-white text-gray-900 capitalize hover:bg-gray-100 cursor-pointer">
                  for sale
                </button>
                <button className="px-6 py-3  rounded-lg font-semibold transition bg-white/20 text-white hover:bg-white/30 capitalize border border-white/30 cursor-pointer">
                  to rent
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements (optional, similar to HeroRoom) */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* SEARCH BAR POSITIONED HALF ON IMAGE, HALF BELOW */}
      <div className="relative -mt-14 z-10">
        <div className="lg:container mx-auto lg:px-6">
          <div className="bg-white rounded-3xl shadow-2xl lg:p-5 p-4 border border-gray-200 w-full lg:max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-end gap-4">
              {/* Car Type Dropdown */}
              <div className="flex-1 lg:flex-none lg:w-[280px] w-full">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Car Type
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-8 py-3 text-sm border border-gray-300 rounded-lg text-gray-700 
                       focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option>Select Car Type</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Truck</option>
                    <option>Coupe</option>
                    <option>Convertible</option>
                    <option>Hatchback</option>
                    <option>Minivan</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Car Model Dropdown */}
              <div className="flex-1 lg:flex-none lg:w-[280px] w-full">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Car Model
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-8 py-3 text-sm border border-gray-300 rounded-lg text-gray-700 
                       focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option>Select Model</option>
                    <option>Toyota Camry</option>
                    <option>Honda Civic</option>
                    <option>Ford F-150</option>
                    <option>BMW 3 Series</option>
                    <option>Tesla Model 3</option>
                    <option>Mercedes C-Class</option>
                    <option>Audi A4</option>
                    <option>Chevrolet Silverado</option>
                    <option>Jeep Wrangler</option>
                    <option>Subaru Outback</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Location Input (Widest) */}
              <div className="flex-1 lg:flex-grow lg:min-w-[320px] w-full">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter city, state, or ZIP code"
                    className="w-full pl-3 pr-3 py-3 text-sm border border-gray-300 rounded-lg text-gray-700 
                       focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex-1 lg:flex-none lg:w-[140px] w-full">
                <button
                  className="w-full flex items-center justify-center gap-2 bg-[#27bb97] hover:bg-[#1FA987] transition-colors
                     text-white font-semibold rounded-lg px-4 py-3 
                     shadow-lg hover:shadow-xl text-sm hover:cyan-700 cursor-pointer"
                >
                  <IoSearch className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
