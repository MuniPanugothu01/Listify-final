import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const HeroSection = () => {
  const [carType, setCarType] = useState("Used Cars");
  const [make, setMake] = useState("Any Makes");
  const [model, setModel] = useState("Any Models");
  const [price, setPrice] = useState("All Prices");

  return (
    <div className="relative bg-blue-100 h-[80vh] w-full">
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
            Find Your Dream Car
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl flex items-center gap-5 mx-auto bg-white rounded-full shadow-xl px-6 py-3">
          <div className="flex items-center gap-4 w-full">
            {/* Car Type Dropdown */}
            <div className="relative w-full">
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none text-gray-700"
              >
                <option>Used Cars</option>
                <option>New Cars</option>
                <option>Certified Cars</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <FaChevronDown />
              </div>
            </div>

            {/* Make Dropdown */}
            <div className="relative w-full">
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none text-gray-700"
              >
                <option>Any Makes</option>
                <option>Tesla</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Audi</option>
                <option>Toyota</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <FaChevronDown />
              </div>
            </div>

            {/* Model Dropdown */}
            <div className="relative w-full">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none text-gray-700"
              >
                <option>Any Models</option>
                <option>Model S</option>
                <option>Model 3</option>
                <option>Model X</option>
                <option>Model Y</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <FaChevronDown />
              </div>
            </div>

            {/* Price Dropdown */}
            <div className="relative w-full">
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none text-gray-700"
              >
                <option>All Prices</option>
                <option>Under $20k</option>
                <option>$20k - $40k</option>
                <option>$40k - $60k</option>
                <option>$60k+</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <FaChevronDown />
              </div>
            </div>

            {/* Search Button */}
          </div>
          <button className="bg-[#27bb97] hover:bg-[#1fa987] text-white px-3 py-3 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg cursor-pointer">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* Car Image */}
      </div>
      <div className="max-w-5xl mx-auto mt-10">
        <img src="/cars/cars.png" alt="car" className="h-auto w-full" />
      </div>
    </div>
  );
};

export default HeroSection;