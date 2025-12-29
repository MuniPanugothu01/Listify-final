import React, { useState } from "react";
import { Search, MapPin, Play, ChevronDown } from "lucide-react";

export default function HeroSection() {
  // State variables
  const [searchType, setSearchType] = useState("Rent");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [locationType, setLocationType] = useState("City");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("Any");
  const [priceRange, setPriceRange] = useState("Any");

  // Data arrays
  const searchTypes = ["Rent", "Buy", "PG/Hostel"];
  const propertyTypes = ["Apartment", "House", "Villa", "Studio", "PG/Hostel"];
  const locationTypes = ["City", "Locality", "Society", "Landmark"];
  const genders = ["Any", "Male Only", "Female Only"];
  const priceRanges = ["Any", "0-10k", "10k-20k", "20k-30k", "30k-50k", "50k+"];

  return (
    <div className="min-h-screen w-full h-[50vh] max-h-[600px] bg-[#ffffff] relative overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-6xl font-bold mb-6">
              Your Gateway to
              <br />
              <span className="text-black">Exceptional Living</span>
            </h1>

            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Explore a handpicked selection of beautiful homes, tailored to
              your style and delivered with effortless simplicity.
            </p>

            <div className="flex items-center gap-4">
              {/* Room for Rent Button */}
              <button className="flex items-center gap-3 bg-[#3C4155] text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition cursor-pointer">
                <div className="w-10 h-10 rounded-full  flex items-center justify-center overflow-hidden  ">
                  <img
                    src="/roomrent2.png"
                    alt="Logo"
                    className="w-8 h-8 object-contain text-white"
                  />
                </div>
                Room for Rent
              </button>

              {/* Property for Rent Button with Image Icon */}
              <button className="flex items-center gap-3 text-black font-medium hover:text-gray-700 transition cursor-pointer hover:underline">
                <div className="w-10 h-10 rounded-full  flex items-center justify-center overflow-hidden">
                  <img
                    src="/propertyIcon.png"
                    alt="Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                Property for Rent
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="">
            <div className=" z-0">
              <img
                src="/rentalImg4.1.png"
                alt="Dream Home"
                className=" absolute  -top-6   h-[80vh]"
              />
            </div>
          </div>
        </div>

        {/* COMPACT SINGLE ROW SEARCH BAR */}
        <div className="bg-white absolute top-120 right-30 rounded-3xl shadow-2xl p-6 border border-gray-200 w-full max-w-7xl mx-auto">
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
                    <option key={type} value={type}>
                      {type}
                    </option>
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
                    <option key={type} value={type}>
                      {type}
                    </option>
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
                    <option key={type} value={type}>
                      {type}
                    </option>
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
                  {genders.map((genderOption) => (
                    <option key={genderOption} value={genderOption}>
                      {genderOption}
                    </option>
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
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="w-fit">
              <button
                className="rounded-full p-4 text-white justify-center gap-2 bg-[#3C4155] 
                               shadow-lg hover:shadow-xl text-sm  hover:cyan-700 cursor-pointer"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
