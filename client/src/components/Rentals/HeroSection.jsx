import React from 'react';
import { Search, MapPin, Home, DollarSign, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-6xl font-bold mb-6">
              Gateway to<br />
              <span className="text-black">Dream Homes</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Discover a curated collection of dream homes at your fingertips, simplified and personalized.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition">
                Discover Now
              </button>
              <button className="flex items-center gap-2 text-black font-medium hover:text-gray-700 transition">
                <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                  <Play className="w-5 h-5 fill-black" />
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="">
            <div className=" z-10">
              <img 
                src="/rentalImg2.png" 
                alt="Dream Home"
                className=" absolute w-full -top-6   h-[600px]"
              />
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Location */}
            <div className="relative">
              <label className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <select className="w-full text-black font-semibold text-lg border-none outline-none bg-transparent cursor-pointer appearance-none pr-8">
                <option>Los Angeles, California</option>
                <option>New York, New York</option>
                <option>Miami, Florida</option>
                <option>Austin, Texas</option>
              </select>
              <div className="absolute right-0 top-9 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Property Type */}
            <div className="relative">
              <label className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Home className="w-4 h-4" />
                Property Type
              </label>
              <select className="w-full text-black font-semibold text-lg border-none outline-none bg-transparent cursor-pointer appearance-none pr-8">
                <option>Classic Apartment</option>
                <option>Modern Villa</option>
                <option>Luxury Condo</option>
                <option>Family House</option>
              </select>
              <div className="absolute right-0 top-9 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Price Range */}
            <div className="relative flex items-end gap-4">
              <div className="flex-1">
                <label className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <DollarSign className="w-4 h-4" />
                  Price Range
                </label>
                <select className="w-full text-black font-semibold text-lg border-none outline-none bg-transparent cursor-pointer appearance-none pr-8">
                  <option>$6,000 - $12,000 / month</option>
                  <option>$12,000 - $20,000 / month</option>
                  <option>$20,000 - $30,000 / month</option>
                  <option>$30,000+ / month</option>
                </select>
                <div className="absolute right-20 top-9 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Search Button */}
              <button className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}