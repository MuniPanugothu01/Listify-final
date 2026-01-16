import React, { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";

export default function HeroSection() {
  // State variables
  const [searchType, setSearchType] = useState("Rent");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [locationType, setLocationType] = useState("City");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("Any");
  const [priceRange, setPriceRange] = useState("Any");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Data arrays
  const searchTypes = ["Rent", "Buy", "PG/Hostel"];
  const propertyTypes = ["Apartment", "House", "Villa", "Studio", "PG/Hostel"];
  const locationTypes = ["City", "Locality", "Society", "Landmark"];
  const genders = ["Any", "Male Only", "Female Only"];
  const priceRanges = ["Any", "0-10k", "10k-20k", "20k-30k", "30k-50k", "50k+"];

  return (
    <div className="min-h-screen w-full h-auto lg:h-[50vh] lg:max-h-[600px] bg-[#ffffff] relative overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 mt-8 lg:mt-0">
            <h1 className="text-3xl lg:text-6xl font-bold mb-4 lg:mb-6">
              Your Gateway to
              <br />
              <span className="text-black">Exceptional Living</span>
            </h1>

            <p className="text-gray-600 text-sm lg:text-lg mb-6 lg:mb-8 max-w-md">
              Explore a handpicked selection of beautiful homes, tailored to
              your style and delivered with effortless simplicity.
            </p>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4">
              {/* Room for Rent Button */}
              <button className="flex items-center gap-2 lg:gap-3 bg-[#3C4155] text-white px-4 lg:px-6 py-3 lg:py-4 rounded-full font-medium hover:bg-gray-800 transition cursor-pointer w-full lg:w-auto justify-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/roomrent2.png"
                    alt="Logo"
                    className="w-6 h-6 lg:w-8 lg:h-8 object-contain text-white"
                  />
                </div>
                <span className="text-sm lg:text-base">Room for Rent</span>
              </button>

              {/* Property for Rent Button with Image Icon */}
              <button className="flex items-center gap-2 lg:gap-3 text-black font-medium hover:text-gray-700 transition cursor-pointer hover:underline w-full lg:w-auto justify-center mt-2 lg:mt-0">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/propertyIcon.png"
                    alt="Logo"
                    className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
                  />
                </div>
                <span className="text-sm lg:text-base">Property for Rent</span>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-0">
              <img
                src="/rentalImg4.1.png"
                alt="Dream Home"
                className="relative lg:absolute w-full lg:w-auto max-w-full lg:max-w-none lg:-top-6 lg:h-[80vh]  lg:-mt-52 object-contain lg:object-cover"
              />
            </div>
          </div>
        </div>

        {/* COMPACT SINGLE ROW SEARCH BAR */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 lg:p-6 border border-gray-200 w-full max-w-7xl mx-auto mt-8 lg:mt-0 lg:absolute lg:top-120 lg:right-30">
          {/* Mobile/Tablet Search Toggle - Hidden on lg+ */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Search size={20} className="text-gray-600" />
                  <span className="font-medium">Search Properties</span>
                </div>
              </div>
              <ChevronDown
                className={`transform transition-transform ${
                  isSearchExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Search Form */}
          <div
            className={`${
              isSearchExpanded ? "block" : "hidden"
            } lg:block transition-all duration-300`}
          >
            {/* Mobile/Tablet Layout - Stacked (hidden on lg+) */}
            <div className="lg:hidden space-y-4">
              {/* Search Type */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  I'm Looking For
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-8 py-3 text-sm border border-gray-300 rounded-lg text-gray-700 
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
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Property Type
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-8 py-3 text-sm border border-gray-300 rounded-lg text-gray-700 
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
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Location Type */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Search By
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-8 py-3 text-sm border border-gray-300 rounded-lg text-gray-700 
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
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={`Enter ${locationType.toLowerCase()}...`}
                    className="w-full pl-10 pr-3 py-3 text-sm border border-gray-300 rounded-lg text-gray-700 
                               focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Gender
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-8 py-3 text-sm border border-gray-300 rounded-lg text-gray-700 
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
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Price Range
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-8 py-3 text-sm border border-gray-300 rounded-lg text-gray-700 
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
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Search Button - Mobile/Tablet */}
              <div className="pt-2">
                <button
                  className="w-full rounded-full p-4 text-white justify-center gap-2 bg-[#3C4155] 
                           shadow-lg hover:shadow-xl text-sm hover:cyan-700 cursor-pointer flex items-center justify-center"
                >
                  <Search size={20} />
                  <span className="ml-2">Search Properties</span>
                </button>
              </div>
            </div>

            {/* Desktop Layout - Single Row (hidden on mobile/tablet) */}
            <div className="hidden lg:flex flex-col lg:flex-row items-end gap-3">
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
                               shadow-lg hover:shadow-xl text-sm hover:cyan-700 cursor-pointer"
                >
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
