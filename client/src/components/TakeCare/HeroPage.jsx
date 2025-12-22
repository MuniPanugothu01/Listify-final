import React, { useState } from "react";
import { Search, MapPin, Heart, Filter, ChevronDown } from "lucide-react";

const HeroPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('babycare-7.jpg')`,
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Joy for Every
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300">
                Little One
              </span>
            </h1>

            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-14 mt-6">
              Find certified caregivers and daycare centers that provide safe
            </p>

            <div className="flex justify-center my-8">
              <Heart className="w-20 h-20 md:w-24 md:h-24 text-pink-300 fill-pink-300 animate-float" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </section>

      {/* Search Bar Overlay */}
      <div className="relative -mt-10 mb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search daycares, nannies, babysitters..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter city, state, or zip code"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 transition-all"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <Filter className="w-5 h-5" />
                Filters
              </button>

              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white rounded-xl font-semibold hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:shadow-lg hover:shadow-[#27BB97]/30">
                <Search className="w-5 h-5" />
                Search Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPage;