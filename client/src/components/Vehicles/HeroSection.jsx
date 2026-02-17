import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const HeroSection = () => {
  const [carType, setCarType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="relative bg-[#eef0fc] h-[80vh] w-full">
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
            Find Your Dream Car
          </h1>
        </div>
  
        {/* two buttons */}

        <div className="flex justify-center gap-2">
          <button className="text-black border border-[#27bb97] bg-white/60 backdrop-blur-sm hover:bg-[#27bb97] hover:text-white px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 capitalize">
            for sale
          </button>
          <button className="text-black border border-[#27bb97] bg-white/60 backdrop-blur-sm hover:bg-[#27bb97] hover:text-white px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 capitalize">
            for rent
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl flex items-center gap-5 mx-auto bg-white rounded-full shadow-xl px-6 py-3">
          <div className="flex items-center gap-4 w-full">
            {/* Car Type - Input + Dropdown */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Car Type"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg focus:outline-none text-gray-700 pr-10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <FaChevronDown />
              </div>
            </div>

            {/* Make - Input + Dropdown */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-4 py-3 rounded-lg focus:outline-none text-gray-700 pr-10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <FaChevronDown />
              </div>
            </div>

            {/* Model - Input + Dropdown */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-3 rounded-lg focus:outline-none text-gray-700 pr-10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <FaChevronDown />
              </div>
            </div>

            {/* Price - Input + Dropdown */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-lg focus:outline-none text-gray-700 pr-10"
              />
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
