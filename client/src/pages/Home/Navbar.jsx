import React, { useState, useEffect, useRef } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showTopCities, setShowTopCities] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const locationDropdownRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLocationClick = () => {
    setShowLocationDropdown(true);
    document.body.style.overflow = "hidden";
  };

  const handleMoreClick = (e) => {
    e.preventDefault();
    setShowMoreDropdown(!showMoreDropdown);
  };

  const closeLocationDropdown = () => {
    setShowLocationDropdown(false);
    setLocationSearch("");
    setShowTopCities(false);
    document.body.style.overflow = "unset";
  };

  // Enhanced locations data with categories
  const popularCities = [
    { name: "New York, NY", zip: "10001", country: "US" },
    { name: "Los Angeles, CA", zip: "90001", country: "US" },
    { name: "Chicago, IL", zip: "60601", country: "US" },
    { name: "Houston, TX", zip: "77001", country: "US" },
    { name: "Phoenix, AZ", zip: "85001", country: "US" },
    { name: "Philadelphia, PA", zip: "19101", country: "US" },
    { name: "San Antonio, TX", zip: "78201", country: "US" },
    { name: "San Diego, CA", zip: "92101", country: "US" },
  ];

  const suggestedLocations = [
    { name: "Miami, FL", zip: "33101", country: "US" },
    { name: "Seattle, WA", zip: "98101", country: "US" },
    { name: "Denver, CO", zip: "80201", country: "US" },
    { name: "Boston, MA", zip: "02101", country: "US" },
    { name: "Atlanta, GA", zip: "30301", country: "US" },
    { name: "Las Vegas, NV", zip: "89101", country: "US" },
    { name: "Portland, OR", zip: "97201", country: "US" },
    { name: "Detroit, MI", zip: "48201", country: "US" },
  ];

  const nearestZipCodes = [
    { name: "10002", area: "Lower East Side, NY", distance: "0.5 mi" },
    { name: "10003", area: "East Village, NY", distance: "1.2 mi" },
    { name: "10009", area: "Alphabet City, NY", distance: "1.5 mi" },
    { name: "10010", area: "Gramercy, NY", distance: "2.1 mi" },
    { name: "10011", area: "Chelsea, NY", distance: "2.8 mi" },
  ];

  const metroCities = [
    {
      name: "New York Metro",
      cities: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
    },
    {
      name: "Los Angeles Metro",
      cities: ["LA Downtown", "Hollywood", "Beverly Hills", "Santa Monica"],
    },
    {
      name: "Chicago Metro",
      cities: ["Chicago Downtown", "Evanston", "Oak Park", "Schaumburg"],
    },
    {
      name: "Bay Area Metro",
      cities: ["San Francisco", "San Jose", "Oakland", "Berkeley"],
    },
  ];

  const topCities = [
    { name: "New York, NY", country: "US" },
    { name: "Los Angeles, CA", country: "US" },
    { name: "Chicago, IL", country: "US" },
    { name: "Houston, TX", country: "US" },
    { name: "Phoenix, AZ", country: "US" },
    { name: "Philadelphia, PA", country: "US" },
    { name: "San Antonio, TX", country: "US" },
    { name: "San Diego, CA", country: "US" },
    { name: "Dallas, TX", country: "US" },
    { name: "San Jose, CA", country: "US" },
    { name: "Austin, TX", country: "US" },
    { name: "Jacksonville, FL", country: "US" },
  ];

  // Countries for the dropdown - 3 countries as requested
  const countries = [
    { name: "United States", flag: "🇺🇸", code: "US" },
    { name: "India", flag: "🇮🇳", code: "IN" },
    { name: "United Kingdom", flag: "🇬🇧", code: "UK" },
  ];

  // Footer countries for display at bottom with real flag images
  const footerCountries = [
    {
      name: "India",
      code: "IN",
      flagImage: "https://flagcdn.com/w40/in.png",
      flagImage2x: "https://flagcdn.com/w80/in.png",
    },
    {
      name: "Canada",
      code: "CA",
      flagImage: "https://flagcdn.com/w40/ca.png",
      flagImage2x: "https://flagcdn.com/w80/ca.png",
    },
    {
      name: "United Kingdom",
      code: "UK",
      flagImage: "https://flagcdn.com/w40/gb.png",
      flagImage2x: "https://flagcdn.com/w80/gb.png",
    },
    {
      name: "United States",
      code: "US",
      flagImage: "https://flagcdn.com/w40/us.png",
      flagImage2x: "https://flagcdn.com/w80/us.png",
    },
  ];

  const mainMenuItems = [
    "Houses",
    "Services",
    "Sales",
    "Gigs",
    "Events",
    "Roommates",
  ];

  const moreMenuItems = ["Jobs", "Cares", "Blogs", "Forums"];

  // Filter locations based on search input
  const filteredLocations = [
    ...popularCities,
    ...suggestedLocations,
    ...topCities,
  ].filter(
    (location) =>
      location.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
      location.zip?.includes(locationSearch)
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.name);
    closeLocationDropdown();
    console.log("Selected location:", location);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = "Current Location";
          setSelectedLocation(currentLocation);
          closeLocationDropdown();
          console.log("Using current location:", position);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your current location. Please search manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    // Here you would typically filter locations based on selected country
    console.log("Selected country:", countryName);
  };

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        closeLocationDropdown();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeLocationDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0.8;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .location-dropdown {
          animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .backdrop {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      
      <nav
        ref={navbarRef}
        className={`shadow-lg sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-sm" : "bg-white"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-3">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Listify
              </h1>
            </div>

            {/* Desktop Search Bars */}
            <div className="hidden sm:flex flex-1 justify-center max-w-md sm:max-w-lg md:max-w-2xl mx-2 sm:mx-4 md:mx-8">
              <div className="flex w-full space-x-1 sm:space-x-2">
                {/* General Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by service or category"
                    className="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Location Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Location"
                    value={selectedLocation}
                    className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
                    onFocus={handleLocationClick}
                    onClick={handleLocationClick}
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 lg:space-x-6">
                {mainMenuItems.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs md:text-sm lg:text-base text-gray-700 hover:text-gray-900 px-1 whitespace-nowrap"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                {/* More Dropdown */}
                <li className="relative">
                  <a
                    href="#"
                    onClick={handleMoreClick}
                    className="text-xs md:text-sm lg:text-base text-gray-700 hover:text-gray-900 px-1 whitespace-nowrap flex items-center"
                  >
                    More
                    <svg
                      className="h-4 w-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>
                  {showMoreDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg min-w-max z-10">
                      {moreMenuItems.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                          onClick={() => setShowMoreDropdown(false)}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              </ul>
              {/* Right side actions */}
              <div className="flex items-center space-x-2 md:space-x-4 ml-4">
                <button className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 text-xs md:text-sm lg:text-base whitespace-nowrap">
                  Post Now
                </button>
                <button className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 text-xs md:text-sm lg:text-base whitespace-nowrap">
                  SignIn
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex-shrink-0">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Remains the same */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200">
              {/* Mobile content remains the same */}
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Bottom Sliding Location Dropdown */}
      {showLocationDropdown && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm backdrop"
            onClick={closeLocationDropdown}
          />

          {/* Dropdown Content */}
          <div
            ref={locationDropdownRef}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] max-w-4xl mx-auto overflow-hidden location-dropdown"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Select Location
                </h3>
                <button
                  onClick={closeLocationDropdown}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Enhanced Search Input with Country Dropdown and Current Location Icon */}
              <div className="flex space-x-2">
                {/* Left Side Country Dropdown */}
                <div className="relative flex-shrink-0">
                  <select
                    value={selectedCountry}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="pl-3 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white appearance-none cursor-pointer w-48"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by city, state or zip code"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  {/* Current Location Icon - Light Red */}
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                    <button
                      onClick={handleUseCurrentLocation}
                      className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Use Current Location"
                    >
                      <svg
                        className="h-4 w-4 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>


            <div className="px-7 flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
               <IoLocationOutline />
                  <p>selected location:</p>
                </div>
                <p className="text-blue-400">India</p>
              </div>

               <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
              <CiLocationArrow1 />
                  <p>Suggested Location:</p>
                </div>
                <p className="text-blue-400">New York,NY</p>
              </div>
            </div>

            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 140px)" }}
            >
              {!locationSearch ? (
                <>
                  {/* Popular Cities */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Popular Cities
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {popularCities.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                        >
                          <div className="font-medium text-gray-800 text-sm">
                            {location.name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {location.zip}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suggested for You */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Suggested for You
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {suggestedLocations.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                        >
                          <div className="font-medium text-gray-800 text-sm">
                            {location.name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {location.zip}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nearest Zip Codes */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Nearest Zip Codes
                    </h4>
                    <div className="space-y-2 grid grid-cols-3 gap-4">
                      {nearestZipCodes.map((zip, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleLocationSelect({
                              name: `${zip.area} (${zip.name})`,
                              zip: zip.name,
                            })
                          }
                          className="w-full text-left p-3 border border-gray-300  hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium text-gray-800 text-sm">
                              {zip.name}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {zip.area}
                            </div>
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            {zip.distance}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Choose Your Location - Metro & Top Cities */}
                  <div className="p-4 border-b border-gray-100 pb-7">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Choose Your Location
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Metro Cities */}
                      <div className="bg-white p-5 rounded-lg">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2">
                          Metro
                        </h5>
                        <div className="space-y-1">
                          {metroCities.map((metro, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleLocationSelect({ name: metro.name })
                              }
                              className="w-full text-left p-2 hover:bg-gray-50 hover:text-red-500 rounded text-sm text-gray-700"
                            >
                              {metro.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Top Cities */}
                      <div className="bg-white p-5 rounded-lg">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2">
                          Top Cities
                        </h5>
                        <div className="space-y-1">
                          {topCities.slice(0, 5).map((city, index) => (
                            <button
                              key={index}
                              onClick={() => handleLocationSelect(city)}
                              className="w-full text-left p-2 hover:bg-gray-50 hover:text-red-500 rounded text-sm text-gray-700"
                            >
                              {city.name}
                            </button>
                          ))}
                          {!showTopCities && (
                            <button
                              onClick={() => setShowTopCities(true)}
                              className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm text-blue-600 font-medium"
                            >
                              View all top cities →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Top Cities Expanded */}
                  {showTopCities && (
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-semibold text-gray-700">
                          Top Cities
                        </h4>
                        <button
                          onClick={() => setShowTopCities(false)}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Show less
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {topCities.map((city, index) => (
                          <button
                            key={index}
                            onClick={() => handleLocationSelect(city)}
                            className="text-left p-2 hover:bg-gray-50 rounded text-sm text-gray-700"
                          >
                            {city.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer with Countries - Updated with Real Flag Images */}
                  <div className="p-4 absolute w-full bottom-0  bg-gray-50">
                    <div className="flex items-center  justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          Stay on Listify
                        </span>
                        <div className="flex space-x-2">
                          {footerCountries.map((country, index) => (
                            <button
                              key={index}
                              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs hover:bg-white transition-colors border border-gray-200 shadow-sm"
                              title={country.name}
                            >
                              <img
                                src={country.flagImage}
                                alt={`${country.name} flag`}
                                className="w-5 h-3.5 object-cover rounded-sm"
                                srcSet={`${country.flagImage} 1x, ${country.flagImage2x} 2x`}
                              />
                              <span className="text-gray-700 font-medium">
                                {country.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setShowTopCities(true)}
                        className="text-blue-600 hover:text-blue-700  text-sm font-medium cursor-pointer hover:underline"
                      >
                        View top cities
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Search Results */
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Search Results
                  </h4>
                  {filteredLocations.length > 0 ? (
                    <div className="space-y-1">
                      {filteredLocations.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium text-gray-800 text-sm">
                              {location.name}
                            </div>
                            {location.zip && (
                              <div className="text-gray-500 text-xs">
                                Zip: {location.zip}
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <svg
                        className="h-12 w-12 text-gray-300 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-gray-500 text-sm">
                        No locations found. Try a different search.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;