import React, { useState } from "react";
import { Search, DoorOpen, Building2, MapPin, ChevronDown } from "lucide-react";

export default function HeroRoom() {
  const [searchType, setSearchType] = useState("Need a Room for Share");
  const [propertyType, setPropertyType] = useState("Single Room");
  const [locationType, setLocationType] = useState("By Metros");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("Any");
  const [priceRange, setPriceRange] = useState("$100-$500");

  const searchTypes = [
    "Need a Room for Share",
    "Need a Property for Rent", 
    "Have a Room to Share",
    "Have a Property for Rent",
    "Have a Commercial space to Rent"
  ];

  const propertyTypes = [
    "Single Room",
    "Shared Room", 
    "Paying Guest",
    "Entire Apartment",
    "Studio",
    "House",
    "Condominium"
  ];

  const locationTypes = [
    "By Metros",
    "By City",
    "By Neighbourhood", 
    "By County",
    "By Apartment",
    "By States",
    "By University",
    "By Landmark"
  ];

  const genders = [
    "Any",
    "Male Only",
    "Female Only",
    "Couples Only",
    "Family Only"
  ];

  const priceRanges = [
    "$100-$500",
    "$500-$1000", 
    "$1000-$1500",
    "$1500-$2000",
    "$2000-$2500",
    "$2500+"
  ];

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
                <div className=" bottom-2 flex-col items-center flex justify-center sm:flex-row gap-4">
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

              {/* COMPACT SINGLE ROW SEARCH BAR */}
              <div className="bg-white absolute -bottom-12 right-30 rounded-3xl shadow-2xl p-6 border border-gray-200 w-full max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-end gap-3">
                  {/* Search Type */}
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      I'm Looking For
                    </label>
                    <div className="relative">
                      <select
                        className="w-full pl-2 pr-8 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                      >
                        {searchTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Property Type
                    </label>
                    <div className="relative">
                      <select
                        className="w-full pl-2 pr-8 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                      >
                        {propertyTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Location Type */}
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Search By
                    </label>
                    <div className="relative">
                      <select
                        className="w-full pl-2 pr-8 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                        value={locationType}
                        onChange={(e) => setLocationType(e.target.value)}
                      >
                        {locationTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Location Input */}
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder={`Enter ${locationType.toLowerCase()}...`}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Gender */}
                  <div className="flex-1 min-w-[110px]">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        className="w-full pl-2 pr-8 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        {genders.map((gender) => (
                          <option key={gender} value={gender}>{gender}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Price Range
                    </label>
                    <div className="relative">
                      <select
                        className="w-full pl-2 pr-8 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                      >
                        {priceRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="flex-1 min-w-[100px]">
                    <button
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 
                               text-white font-semibold rounded-lg px-4 py-2.5 transition-all hover:scale-[1.02] 
                               shadow-lg hover:shadow-xl text-sm  hover:cyan-700 cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      Search
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