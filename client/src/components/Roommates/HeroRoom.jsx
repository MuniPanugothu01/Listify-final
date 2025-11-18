import React, { useState } from "react";
import { Search, DoorOpen, Building2, MapPin } from "lucide-react";

export default function HeroRoom() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Single Room");
  const [priceRange, setPriceRange] = useState("$100-$500");

  return (
    <div className="relative bg-white">
      {/* FULL WIDTH IMAGE WITH 50% HEIGHT */}
      <div className="relative w-full h-[50vh] min-h-[500px] max-h-[600px]">
        <img
          src="/roommates3.jpg"
          alt="Roommates"
          className="w-full h-full object-cover object-center"
        />

    

        {/* CONTENT OVERLAY */}
        <div className="absolute inset-0">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 w-full">
              {/* LEFT SIDE - Text & Buttons */}
              <div className="space-y-8 text-white">
                {/* Room for Rent & Property for Rent Buttons */}
                <div className="flex absolute bottom-2 right-2 flex-col sm:flex-row gap-4">
                  <div className="cursor-pointer group">
                    <div className="bg-white/10 backdrop-blur-sm group-hover:bg-white/20 border border-white/30 rounded-2xl p-6 w-full sm:w-48 flex flex-col items-center transition duration-300 shadow-lg hover:shadow-xl">
                      <DoorOpen className="w-12 h-12 mb-3 text-white drop-shadow" />
                      <p className="font-medium text-white text-lg">
                        Room for Rent
                      </p>
                    </div>
                  </div>

                  <div className="cursor-pointer group">
                    <div className="bg-white/10 backdrop-blur-sm group-hover:bg-white/20 border border-white/30 rounded-2xl p-6 w-full sm:w-48 flex flex-col items-center transition duration-300 shadow-lg hover:shadow-xl">
                      <Building2 className="w-12 h-12 mb-3 text-white drop-shadow" />
                      <p className="font-medium text-white text-lg">
                        Property for Rent
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white absolute -bottom-12     rounded-3xl shadow-2xl p-4 border border-gray-200">
                <div className="space-y-6">
                  {/* Property Type & Price Range */}
                  <div className="flex gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search location..."
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg text-gray-700 shadow-sm 
                      focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option>Single Room</option>
                      <option>Shared Room</option>
                      <option>Entire Apartment</option>
                      <option>Studio</option>
                    </select>

                    <select
                      className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                    >
                      <option>$100 - $500</option>
                      <option>$500 - $1000</option>
                      <option>$1000 - $1500</option>
                      <option>$1500 - $2000</option>
                      <option>$2000+</option>
                    </select>

                    {/* Search Button */}
                    <button
                      className=" flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 
                    text-white font-semibold rounded-lg px-6 py-4 transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl text-lg"
                    >
                      <Search className="w-5 h-5" />
                      Search Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
