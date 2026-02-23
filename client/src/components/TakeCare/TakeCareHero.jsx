import React, { useState } from "react";
import { Search, MapPin, Heart, Filter, ChevronDown } from "lucide-react";

const TakeCareHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Nanny");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  // Search categories
  const categories = [
    "Nanny",
    "Babysitter",
    "Tutor",
    "Daycare center",
    "Family child care center",
    "Cook",
    "Housekeeper",
    "Elder Care Provider / Nurse",
    "Elder Care Center",
    "Pet Care Provider",
    "Pet Care Center",
  ];

  // US Cities
  const usCities = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA",
    "Austin, TX",
    "Jacksonville, FL",
    "Fort Worth, TX",
    "Columbus, OH",
    "Charlotte, NC",
    "San Francisco, CA",
    "Indianapolis, IN",
    "Seattle, WA",
    "Denver, CO",
    "Washington, DC",
    "Boston, MA",
    "El Paso, TX",
    "Nashville, TN",
    "Detroit, MI",
    "Oklahoma City, OK",
  ];

  // Price options
  const priceOptions = [
    { label: "$15 - $20/hr", value: "15-20" },
    { label: "$20 - $30/hr", value: "20-30" },
    { label: "$30+/hr", value: "30-plus" },
  ];

  // Work type options
  const workTypeOptions = [
    { label: "Live In", value: "live-in" },
    { label: "Live Out", value: "live-out" },
  ];

  // Job type options
  const jobTypeOptions = [
    { label: "Full Time", value: "full-time" },
    { label: "Part Time", value: "part-time" },
    { label: "Hourly Basis", value: "hourly" },
  ];

  const handleSearch = () => {
    console.log({
      category: selectedCategory,
      location: location,
      price: selectedPrice,
      workType: selectedWorkType,
      jobType: selectedJobType,
      query: searchQuery,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[300px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden mt-16 md:mt-16 lg:mt-18 ">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-black/30 bg-blend-darken"
          style={{
            backgroundImage: `url('babycare-7.jpg')`,
            loading: "lazy",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="text-center">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              Joy for Every Little One
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mt-4 sm:mt-6 mb-8 sm:mb-14 px-2">
              Find certified caregivers and daycare centers that provide safe
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar Overlay */}
      {/* <div className="relative -mt-8 sm:-mt-10 md:-mt-12 mb-12 sm:mb-16 md:mb-20">
        <div className="px-3 sm:px-4 md:px-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl p-4 sm:p-5 md:p-6 border border-gray-200 mx-2 sm:mx-0">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-800 focus:outline-none focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 appearance-none text-sm sm:text-base"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <select
                    className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-800 focus:outline-none focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 appearance-none text-sm sm:text-base"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Select a city</option>
                    {usCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-800 focus:outline-none focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 appearance-none text-sm sm:text-base"
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  >
                    <option value="">Select price range</option>
                    {priceOptions.map((price) => (
                      <option key={price.value} value={price.value}>
                        {price.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Work Type
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-800 focus:outline-none focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 appearance-none text-sm sm:text-base"
                    value={selectedWorkType}
                    onChange={(e) => setSelectedWorkType(e.target.value)}
                  >
                    <option value="">Select work type</option>
                    {workTypeOptions.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-800 focus:outline-none focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 appearance-none text-sm sm:text-base"
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value)}
                  >
                    <option value="">Select job type</option>
                    {jobTypeOptions.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="relative flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white rounded-lg sm:rounded-xl font-medium hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:shadow-lg hover:shadow-[#27BB97]/30 text-sm sm:text-base"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="whitespace-nowrap">Search Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default TakeCareHero;