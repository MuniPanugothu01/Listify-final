import React, { useState } from "react";
import { Link } from "react-router-dom"; // Added Link import
// react icons
import {
  Heart,
  Search,
  Grid,
  List,
  ChevronDown,
  MapPin,
  Gauge,
  Fuel,
  Settings,
  CheckCircle,
} from "lucide-react";
// react icons
import ReactCountryFlag from "react-country-flag";
import { IoImagesOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoChevronDown, IoClose, IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { AiTwotoneAppstore } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { GoArrowUpLeft } from "react-icons/go";

const CarListing = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([21000, 80000]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isConditionOpen, setIsConditionOpen] = useState(true);
  const [isEngineOpen, setIsEngineOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  const handleTypeSelect = (typeName) => {
    if (selectedTypes.includes(typeName)) {
      setSelectedTypes(selectedTypes.filter((name) => name !== typeName));
    } else {
      setSelectedTypes([...selectedTypes, typeName]);
    }
  };

  // Function to get country code based on location
  const getCountryCode = (location) => {
    const codeMap = {
      "New York": "US",
      Chicago: "US",
      "Los Angeles": "US",
      London: "GB",
      Liverpool: "GB",
      Mumbai: "IN",
      Delhi: "IN",
      Bangalore: "IN",
    };
    return codeMap[location] || "US";
  };

  // Function to get country name based on location
  const getCountryName = (location) => {
    const countryMap = {
      "New York": "USA",
      Chicago: "USA",
      "Los Angeles": "USA",
      London: "UK",
      Liverpool: "UK",
      Mumbai: "India",
      Delhi: "India",
      Bangalore: "India",
    };
    return countryMap[location] || location;
  };

  const cars = [
    {
      id: 1,
      name: "Mercedes-Benz C63 2017",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop",
      type: "Sedan",
      condition: "Used Car",
      category: "Rare Benz",
      price: 93000,
      mileage: "8,000 km",
      transmission: "Automatic",
      fuel: "6.6 km",
      location: "New York",
      rating: 4,
      reviews: 22,
      verified: true,
      action: "Rent Now",
    },
    {
      id: 2,
      name: "Mercedes-Benz CLA200 2017",
      image:
        "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=250&fit=crop",
      type: "Hatchback",
      condition: "New Benz",
      category: "Best Offer",
      price: 45500,
      mileage: "8,000 km",
      transmission: "Automatic",
      fuel: "8.2 km",
      location: "New York",
      rating: 5,
      reviews: 122,
      verified: true,
      action: "Rent Now",
    },
    {
      id: 3,
      name: "Mercedes-Benz E200 2017",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop",
      type: "Sedan",
      condition: "Used Car",
      category: "Auction",
      price: 35000,
      mileage: "15,000 km",
      transmission: "Automatic",
      fuel: "6.3 km",
      location: "Chicago",
      rating: 4,
      reviews: 373,
      verified: true,
      action: "Make Bid",
    },
    {
      id: 4,
      name: "Mercedes-Benz GLE450 AMG 2016",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
      type: "SUV",
      condition: "Used Car",
      category: "Hot Offer",
      price: 32000,
      mileage: "22,000 km",
      transmission: "Automatic",
      fuel: "9 km",
      location: "Chicago",
      rating: 4,
      reviews: 362,
      verified: true,
      action: "Make Bid",
    },
    {
      id: 5,
      name: "Mercedes-Benz GLA200 2016",
      image:
        "https://images.unsplash.com/photo-1622661117463-b176e1082ba6?w=400&h=250&fit=crop",
      type: "SUV",
      condition: "Used Car",
      category: "Hot Offer",
      price: 35000,
      mileage: "22,000 km",
      transmission: "Automatic",
      fuel: "8.2 km",
      location: "London",
      rating: 4,
      reviews: 165,
      verified: true,
      action: "Rent Now",
    },
    {
      id: 6,
      name: "Mercedes-Benz C200 2017",
      image:
        "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?w=400&h=250&fit=crop",
      type: "Sedan",
      condition: "New Benz",
      category: "Auction",
      price: 15500,
      mileage: "18,000 km",
      transmission: "Automatic",
      fuel: "9.8 km",
      location: "Liverpool",
      rating: 5,
      reviews: 284,
      verified: true,
      action: "Make Bid",
    },
    {
      id: 7,
      name: "Mercedes-Benz CLA250 2017",
      image:
        "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=250&fit=crop",
      type: "Sedan",
      condition: "Used Car",
      category: "Top Class",
      price: 32280,
      mileage: "8,000 km",
      transmission: "Automatic",
      fuel: "8.2 km",
      location: "Liverpool",
      rating: 4,
      reviews: 144,
      verified: true,
      action: "Make Bid",
    },
    {
      id: 8,
      name: "Mercedes-Benz GLC AMG63 2017",
      image:
        "https://images.unsplash.com/photo-1606016159991-f9fc8d0f5a31?w=400&h=250&fit=crop",
      type: "SUV",
      condition: "Used Car",
      category: "Best SUV",
      price: 58000,
      mileage: "22,000 km",
      transmission: "Automatic",
      fuel: "6.5 km",
      location: "Los Angeles",
      rating: 5,
      reviews: 363,
      verified: true,
      action: "Make Bid",
    },
  ];

  // Use your original carTypes data
  const carTypes = [
    { name: "Hatchback", count: 78, icon: "/cars/sedanlogo.png" },
    { name: "Sedan", count: 125, icon: "/cars/sedanlogo.png" },
    { name: "SUV", count: 89, icon: "/cars/sedanlogo.png" },
    { name: "Hybrid", count: 45, icon: "/cars/sedanlogo.png" },
    { name: "Coupe", count: 56, icon: "/cars/sedanlogo.png" },
    { name: "Crossover", count: 34, icon: "/cars/sedanlogo.png" },
  ];

  const colors = [
    { name: "Black", color: "bg-black" },
    { name: "Blue", color: "bg-blue-600" },
    { name: "Brown", color: "bg-amber-700" },
    { name: "Gray", color: "bg-gray-500" },
    { name: "Red", color: "bg-red-600" },
    { name: "Silver", color: "bg-gray-300" },
    { name: "White", color: "bg-white border border-gray-300" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Width Search Bar at Top */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* button back to cars page - Desktop Version */}
          <div className="hidden lg:block">
            <Link to="/cars">
              <button className="inline-flex items-center gap-2 text-[#27bb97] hover:text-[#1fa987] hover:underline capitalize cursor-pointer">
                <GoArrowUpLeft />
                back to home
              </button>
            </Link>
          </div>

          <div className="relative flex items-center bg-white border border-gray-100 rounded-md shadow-sm">
            <Search className="absolute left-5 text-gray-400 w-5 h-5" />

            {/* Filter Tags  */}
            <div className="flex items-center gap-2 pl-14 pr-4 py-3 flex-1 overflow-x-auto no-scrollbar">
              {/* Mercedes-Benz Tag */}
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-md px-4 py-1.5 flex-shrink-0">
                <span className="text-sm font-medium text-gray-700">
                  Mercedes-Benz
                </span>
                <button className="w-4 h-4 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center text-white">
                  <IoMdClose className="w-3 h-3" />
                </button>
              </div>

              {/* Year Tag */}
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-md px-4 py-1.5 flex-shrink-0">
                <span className="text-sm font-medium text-gray-700">
                  2016 - 2018
                </span>
                <button className="w-4 h-4 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center text-white">
                  <IoMdClose className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-3 pr-4">
              {/* Mobile Filters Button - Only shows on mobile */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium text-sm lg:hidden"
              >
                <MdFilterList className="w-5 h-5" />
                Filters
              </button>

              {/* Desktop Filters Button - Only shows on desktop */}
              <button className="hidden lg:flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium text-sm">
                <MdFilterList className="w-5 h-5" />
                Filters
              </button>

              {/* vertical line */}
              <div className="h-6 w-px bg-gray-300 mx-2 hidden lg:block"></div>

              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container with max-w-7xl - Responsive layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 py-4">
        {/* Mobile Overlay - Only shows when sidebar is open on mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}

        {/* Sidebar - Responsive with slide animation */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 w-72 bg-white p-6
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:translate-x-0 lg:w-72 lg:block lg:z-10
            border-r rounded-md shadow-sm overflow-hidden
          `}
          style={{ top: "0", height: "280vh" }}
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <HiOutlineXMark
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-800 hover:text-gray-600 cursor-pointer lg:hidden"
              />
            </div>
            <div className="border-t border-gray-400 mt-4"></div>
          </div>
          {/* Type of Car - ORIGINAL STYLE */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-700 text-sm">Type of Car</h4>
              {selectedTypes.length > 0 && (
                <button
                  onClick={() => setSelectedTypes([])}
                  className="text-xs text-blue-500 hover:text-blue-600 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {carTypes.map((type) => {
                const isSelected = selectedTypes.includes(type.name);
                return (
                  <button
                    key={type.name}
                    onClick={() => handleTypeSelect(type.name)}
                    className={`
                      rounded-lg p-1 text-center transition-all duration-200
                      flex flex-col items-center justify-center cursor-pointer relative
                      bg-[#f2f5f3]
                      ${
                        isSelected
                          ? "ring-2 hover:bg-blue-50 bg-blue-50 ring-blue-300 ring-opacity-50"
                          : "hover:bg-blue-50"
                      }
                    `}
                  >
                    {/* Checkmark indicator at top-right */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <IoCheckmarkCircleSharp className="w-5 h-5 text-blue-500 bg-white rounded-full" />
                      </div>
                    )}

                    {/* Image Icon - ORIGINAL STYLE */}
                    <div className="w-12 h-12 flex items-center justify-center mt-1">
                      {/* Try to load the image, fallback to icon if it fails */}
                      <div className="w-10 h-10 flex items-center justify-center">
                        <img
                          src={type.icon}
                          alt={type.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            // If image fails to load, show a fallback icon
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML = `
                              <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                            `;
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-500 mb-0.5 mt-1">
                      {type.name}
                    </div>
                    {/* <div className="text-xs text-gray-500">{type.count}</div> */}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Brand */}
          <div className="mb-6">
            <div className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white">
              <span className="text-gray-500 text-sm">Mercedes-Benz</span>

              <div className="flex items-center gap-2">
                {/* Vertical separator line */}
                <div className="border-l border-gray-300 h-5 ml-1"></div>

                {/* Arrow buttons container */}
                <div className="flex flex-col">
                  {/* Up arrow button */}
                  <button className="p-0.5 hover:bg-gray-100 rounded-sm">
                    <IoIosArrowUp className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                  </button>

                  {/* Down arrow button */}
                  <button className="p-0.5 hover:bg-gray-100 rounded-sm">
                    <IoChevronDown className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Location */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 text-sm ">USA</span>
                  <button className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition">
                    <IoClose className="w-3 h-3 text-white" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 text-sm">UK</span>
                  <button className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition">
                    <IoClose className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Vertical separator line */}
                <div className="border-l border-gray-300 h-5 ml-1"></div>

                {/* Arrow buttons container */}
                <div className="flex flex-col">
                  {/* Up arrow button */}
                  <button className="p-0.5 hover:bg-gray-100 rounded-sm">
                    <IoIosArrowUp className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                  </button>

                  {/* Down arrow button */}
                  <button className="p-0.5 hover:bg-gray-100 rounded-sm">
                    <IoChevronDown className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Year */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              {/* First Year Input */}
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white">
                <div className="border-r border-gray-300 pr-2">
                  <span className="text-gray-700 text-sm">2016</span>
                </div>
                <div>
                  <IoCalendarOutline className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Separator */}
              <span className="text-gray-400">−</span>

              {/* Second Year Input */}
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white">
                <div className="border-r border-gray-300 pr-2">
                  <span className="text-gray-700 text-sm">2018</span>
                </div>
                <div>
                  <IoCalendarOutline className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          {/* vertical line */}
          <div className="border-t border-gray-300 my-4"></div>
          {/* Price Range - Static Version */}
          <div className="mb-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-600 text-sm capitalize">
                Price range
              </h4>

              {/* Toggle Button */}
              <button className="py-2 flex items-center text-blue-500 hover:text-blue-600 cursor-pointer">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-4xl">−</span>
                </div>
              </button>
            </div>

            {/* Static Range Slider */}
            <div className="relative h-2 bg-gray-200 rounded-full mb-10 mx-1">
              {/* Active Range Track (Blue) */}
              <div
                className="absolute h-2 bg-blue-500 rounded-full"
                style={{
                  left: "20%",
                  right: "30%",
                }}
              ></div>

              {/* From Circle (Left) */}
              <div
                className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full -mt-1.5 -ml-2.5 shadow-sm"
                style={{ left: "20%" }}
              ></div>

              {/* To Circle (Right) */}
              <div
                className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full -mt-1.5 -ml-2.5 shadow-sm"
                style={{ left: "70%" }}
              ></div>
            </div>

            {/* Static Value Display Boxes with Borders */}
            <div className="flex items-center justify-between gap-3 -mt-3">
              {/* From Price Box */}
              <div className="flex-1">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                  <div className="w-full px-3 py-2 text-sm text-gray-900 font-semibold">
                    $ 21,000
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="text-gray-400">-</div>

              {/* To Price Box */}
              <div className="flex-1">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                  <div className="w-full px-3 py-2 text-sm text-gray-900 font-semibold">
                    $ 80,000
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* vertical line */}
          <div className="border-t border-gray-300 my-6"></div>
          {/* Condition */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-700 text-sm">Condition</h4>

              {/* Toggle Button */}
              <button
                onClick={() => setIsConditionOpen(!isConditionOpen)}
                className="flex items-center text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                <div className="border-l border-gray-300 h-5 mr-3"></div>
                <div className="w-6 h-6 flex items-center justify-center">
                  {isConditionOpen ? (
                    <span className="text-3xl">−</span>
                  ) : (
                    <span className="text-3xl">+</span>
                  )}
                </div>
              </button>
            </div>

            {isConditionOpen && (
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">All</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Excellent</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Good</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Fair</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-gray-700 text-sm">Broken</span>
                </label>
              </div>
            )}
          </div>
          {/* vertical line */}
          <div className="border-t border-gray-300 my-6"></div>
          {/* Kilometer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-700 text-sm">Kilometer</h4>

              {/* Static Minus Button */}
              <button className="flex items-center text-blue-500 hover:text-blue-600 cursor-pointer">
                <div className="border-l border-gray-300 h-5 mr-3"></div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-3xl">+</span>
                </div>
              </button>
            </div>
          </div>
          {/* vertical line */}
          <div className="border-t border-gray-300 my-6"></div>
          {/* Fuel Type */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-700 text-sm">Fuel Type</h4>

              {/* Static Minus Button */}
              <button className="flex items-center text-blue-500 hover:text-blue-600 cursor-pointer">
                <div className="border-l border-gray-300 h-5 mr-3"></div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-3xl">−</span>
                </div>
              </button>
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="fuel"
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">All</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="fuel"
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Excellent</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="fuel"
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Good</span>
              </label>
            </div>
          </div>
          {/* vertical line */}
          <div className="border-t border-gray-300 my-6"></div>
          {/* Color with scrollbar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-700 text-sm">Color</h4>

              {/* Static Minus Button */}
              <button className="flex items-center text-blue-500 hover:text-blue-600 cursor-pointer">
                <div className="border-l border-gray-300 h-5 mr-3"></div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-3xl">−</span>
                </div>
              </button>
            </div>

            {/* Color list with professional ultra-thin scrollbar */}
            <div className="max-h-48 overflow-y-auto pr-2 scrollbar-thin">
              <div className="space-y-2">
                {colors.map((color) => (
                  <label key={color.name} className="flex items-center py-1">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div
                      className={`ml-2 w-5 h-5 rounded ${color.color} border border-gray-200`}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">
                      {color.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* vertical line */}
          <div className="border-t border-gray-300 my-6"></div>
          {/* Engine - With Radio Buttons */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-700 text-sm">Engine</h4>

              {/* Toggle Button */}
              <button
                onClick={() => setIsEngineOpen(!isEngineOpen)}
                className="flex items-center text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                <div className="border-l border-gray-300 h-5 mr-3"></div>
                <div className="w-6 h-6 flex items-center justify-center">
                  {isEngineOpen ? (
                    <span className="text-3xl">−</span>
                  ) : (
                    <span className="text-3xl">+</span>
                  )}
                </div>
              </button>
            </div>

            {isEngineOpen && (
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="engine"
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    All Engines
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="engine"
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">V6</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="engine"
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">V8</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">V12</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Inline-4</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Electric</span>
                </label>
              </div>
            )}
          </div>
          {/* vertical line */}
          <div className="border-t border-gray-300 my-6"></div>
          {/* Other Options */}
          <div className="mb-6">
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Include unregistered vehicles
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Brands Other</span>
              </label>
            </div>
          </div>
          <button className="w-full bg-[#27bb97] text-white py-3 rounded-lg font-medium hover:bg-[#1fa987] transition cursor-pointer">
            Apply Filters
          </button>
        </div>

        {/* Main Content Container */}
        <div className={`flex-1 ${isSidebarOpen ? "lg:block" : "block"}`}>
          {/* White Background Container for Toolbar and Cards */}
          <div className="bg-white rounded-md shadow-sm">
            {/* Toolbar with bottom border */}
            <div className="p-4 border-b border-gray-300">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    Search Results
                  </span>{" "}
                  <span className="text-gray-400">(126)</span>
                </div>

                {/* View toggle (List | Grid) */}
                <div className="flex items-center rounded-md overflow-hidden border border-gray-300">
                  <div className="px-3 py-2 text-[#27bb97] cursor-pointer">
                    <FaList className="w-4 h-4" />
                  </div>

                  {/* Vertical divider */}
                  <div className="h-6 border-l border-gray-300"></div>

                  <div className="px-3 py-2 text-gray-600 hover:text-blue-500 cursor-pointer">
                    <AiTwotoneAppstore className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    {/* Select */}
                    <select className="px-4 py-2 text-sm focus:outline-none appearance-none bg-white w-full">
                      <option>10 Per Page</option>
                      <option>20 Per Page</option>
                      <option>50 Per Page</option>
                    </select>

                    {/* Vertical divider */}
                    <div className="h-6 border-l border-gray-300"></div>

                    {/* Arrows */}
                    <div className="px-2 flex flex-col items-center justify-center text-gray-500 leading-none">
                      <IoIosArrowUp className="w-3 h-3 -mb-0.5" />
                      <IoIosArrowDown className="w-3 h-3 -mt-0.5" />
                    </div>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    {/* Select */}
                    <select className="px-4 py-2 text-sm focus:outline-none appearance-none bg-white w-full">
                      <option className="capitalize">Date (Down)</option>
                      <option>Price (Low to High)</option>
                      <option>Price (High to Low)</option>
                    </select>

                    {/* Vertical divider */}
                    <div className="h-6 border-l border-gray-300"></div>

                    {/* Stacked arrows */}
                    <div className="px-2 flex flex-col items-center justify-center text-gray-400 leading-none pointer-events-none">
                      <IoIosArrowUp className="w-3 h-3 -mb-0.5" />
                      <IoIosArrowDown className="w-3 h-3 -mt-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Car List without scrollbar */}
            <div>
              {cars.map((car, index) => (
                <div key={car.id}>
                  {/* Make the entire card clickable */}
                  <Link to={`/car-details/`} className="block">
                    <div className="p-4 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex flex-col lg:flex-row overflow-hidden">
                        {/* Image - Responsive */}
                        <div className="relative w-full lg:w-72 h-48 lg:h-44 flex-shrink-0 lg:mt-3 mb-4 lg:mb-0">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-40 rounded-full flex items-center justify-center hover:bg-opacity-60 transition"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Handle favorite logic
                            }}
                          >
                            <Heart className="w-4 h-4 text-white" />
                          </button>
                          <div className="absolute bottom-3 left-3">
                            <button
                              className="px-2 py-1 bg-opacity-70 text-white text-xs rounded backdrop-blur-sm flex items-center gap-1 hover:bg-opacity-80 transition"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Handle image gallery logic
                              }}
                            >
                              <IoImagesOutline className="w-3.5 h-3.5" />
                              <span>5</span>
                            </button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-2 lg:p-4 flex flex-col">
                          {/* Title and Price Indicator */}
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-blue-500 mb-1 hover:underline">
                                {car.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 text-sm mb-2 lg:mb-0">
                                <span className="text-gray-600">
                                  {car.type}
                                </span>
                                <span className="text-gray-600">
                                  {car.condition}
                                </span>
                                <span className="text-gray-600">
                                  {car.action === "Rent Now"
                                    ? "Buy Now"
                                    : "Auction"}
                                </span>
                              </div>
                            </div>
                            <div className="lg:hidden text-lg font-bold text-blue-500 mb-2">
                              {car.price > 50000
                                ? "$$$"
                                : car.price > 30000
                                  ? "$$"
                                  : "$"}
                            </div>
                          </div>

                          {/* Specs Grid - Responsive */}
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 lg:gap-x-6 lg:gap-y-2 mt-2 lg:mt-3 text-sm">
                            <div>
                              <div className="text-gray-400 mb-0.5">
                                Kilometers:
                              </div>
                              <div className="text-gray-700 font-medium">
                                {car.mileage.replace(" km", ",000 km")}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-400 mb-0.5">
                                Engine:
                              </div>
                              <div className="text-gray-700 font-medium">
                                AMG 4.0L8
                              </div>
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                              <div className="text-gray-400 mb-0.5">
                                Horsepower:
                              </div>
                              <div className="text-gray-700 font-semibold">
                                486
                              </div>
                            </div>

                            {/* Location with REAL SVG FLAG */}
                            <div className="col-span-2 lg:col-span-1">
                              <div className="text-gray-400 mb-0.5">
                                Location:
                              </div>
                              <div className="text-gray-700 font-medium flex items-center gap-2">
                                <ReactCountryFlag
                                  countryCode={getCountryCode(car.location)}
                                  svg
                                  style={{
                                    width: "1.4em",
                                    height: "1em",
                                  }}
                                  title={getCountryName(car.location)}
                                />
                                <div>{car.location}</div>
                              </div>
                            </div>

                            <div>
                              <div className="text-gray-400 mb-0.5">
                                Acceleration:
                              </div>
                              <div className="text-gray-700 font-medium">
                                4.0 sec
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-400 mb-0.5">
                                Condition:
                              </div>
                              <div className="text-[#1fa987] font-medium">
                                Excellent
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Price & Action - Responsive */}
                        <div className="w-full lg:w-48 p-4 flex flex-col lg:flex-col justify-between items-center border-t lg:border-l lg:border-t-0 border-gray-300 mt-4 lg:mt-0 lg:ml-5">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Handle buy/bid action
                            }}
                            className={`w-full py-2.5 rounded-md font-semibold text-sm transition cursor-pointer mb-3 ${
                              car.action === "Rent Now"
                                ? "bg-[#27bb97] text-white hover:bg-[#1fa987]"
                                : "bg-white border border-[#1fa987] text-[#1fa987] hover:bg-green-100"
                            }`}
                          >
                            {car.action === "Rent Now" ? "Buy Now" : "Make Bid"}
                          </button>

                          {/* Conditional price display based on action type */}
                          {car.action === "Rent Now" ? (
                            // For "Buy Now" - Show price as a button with bg-[#f2f5f3]
                            <button
                              className="w-full py-2 rounded-lg font-bold text-xl mb-4 bg-[#f2f5f3] text-gray-600"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Handle price click
                              }}
                            >
                              ${car.price.toLocaleString()}
                            </button>
                          ) : (
                            // For "Make Bid" - Show -/+ buttons with price in between
                            <div className="flex items-center border border-gray-300 rounded-md mb-2 w-full">
                              <button
                                className="w-10 h-10 border-r border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-l-lg transition"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  // Handle decrement
                                }}
                              >
                                −
                              </button>
                              <div className="flex-1 h-10 flex items-center justify-center text-xl font-bold text-gray-900 bg-white">
                                ${car.price.toLocaleString()}
                              </div>
                              <button
                                className="w-10 h-10 border-l border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-r-lg transition"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  // Handle increment
                                }}
                              >
                                +
                              </button>
                            </div>
                          )}

                          <div className="flex items-center gap-1 mt-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-base ${
                                    i < car.rating
                                      ? "text-orange-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              ({car.reviews} Reviews)
                            </span>
                            {car.verified && (
                              <CheckCircle className="w-4 h-4 text-[#1fa987]" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Horizontal line after each card except the last one */}
                  {index < cars.length - 1 && (
                    <hr className="border-gray-200 border mx-4 lg:mx-6" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination (outside the white container) */}
          <div className="mt-6 flex justify-center gap-1">
            <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">
              ‹
            </button>
            <button className="w-10 h-10 bg-blue-500 text-white rounded-lg">
              1
            </button>
            <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">
              ...
            </button>
            <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">
              15
            </button>
            <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom "Back to Home" Button - Fixed at bottom center */}
      {/* This will show on mobile (lg:hidden) and hide on desktop */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <div className="flex justify-center">
          <Link to="/cars">
            <div
              className="
                flex 
                items-center 
                justify-center 
                gap-2 
                text-[#27bb97] 
                capitalize 
                bg-white 
                px-6 
                py-3 
                rounded-lg 
                shadow-lg 
                border 
                border-gray-300
                hover:bg-gray-50
                transition-all
                duration-200
                whitespace-nowrap
                text-base
                font-medium
                w-fit
                mx-auto
                hover:shadow-xl
                hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              <GoArrowUpLeft className="w-5 h-5" />
              <span>back to home</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
