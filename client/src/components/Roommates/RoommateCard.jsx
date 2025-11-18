import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function HeroRoom() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Single room');
  const [priceRange, setPriceRange] = useState('$100-$500');

  const handleSearch = () => {
    console.log('Searching...', { location, propertyType, priceRange });
  };

  return (
    <div className="relative min-h-screen  overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64  rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96  rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header Text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Find your next perfect roommates
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700">
            from your community
          </p>
          
          {/* App Store Badges */}
          <div className="flex justify-center gap-4 mt-8">
           
           
          </div>
        </div>

        {/* Hero Image with People */}
        <div className="relative mb-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
            

            {/* Search Form */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-11/12 max-w-5xl">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Location */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Looking in
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Property Type
                    </label>
                    <div className="relative">
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                      >
                        <option>Single room</option>
                        <option>Shared room</option>
                        <option>Entire apartment</option>
                        <option>Studio</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Price Range
                    </label>
                    <div className="relative">
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                      >
                        <option>$100-$500</option>
                        <option>$500-$1000</option>
                        <option>$1000-$1500</option>
                        <option>$1500-$2000</option>
                        <option>$2000+</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="flex items-end">
                    <button
                      onClick={handleSearch}
                      className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <Search className="w-5 h-5" />
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extra spacing for the floating search form */}
        <div className="h-24"></div>
      </div>
    </div>
  );
}