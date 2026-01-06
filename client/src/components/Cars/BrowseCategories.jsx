import React from "react";

// react icons
import { CiCirclePlus } from "react-icons/ci";
const BrowseCategories = () => {
  return (
    <div className="mt-25 max-w-9xl mx-auto  px-4 py-16">
      {/* Enhanced Header with Gradient */}
      <div className="text-center mb-10 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-[#27bb97]/10 to-[#1fa987]/10 rounded-full blur-2xl"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight relative z-10">
          Browse{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27bb97] to-[#1fa987]">
            Car Brands
          </span>
        </h1>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto font-light">
          Discover premium vehicles from world's leading automotive
          manufacturers
        </p>

        {/* Decorative line */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-[#27bb97] to-[#1fa987] rounded-full"></div>
        </div>
      </div>

      {/* cards  */}

      <div className="relative flex  mt-10 cursor-pointer">
        <div className=" border-2 border-dashed rounded-xl w-35 h-35 m-4">
          {/* icon */}

          <div className=" justify-center flex mb-2 mt-2">
            <img src="/cars/bmw.png" alt="" className="h-20 w-20 rounded-2xl" />
          </div>
          {/* text */}

          <div>
            <h2 className="text-gray-600 text-center uppercase font-semibold">
              BMW
            </h2>
          </div>
        </div>
        <div className=" border-2 border-dashed rounded-xl w-35 h-35 m-4">
          {/* icon */}

          <div className=" justify-center flex mb-2 mt-2">
            <img
              src="/cars/audi.png"
              alt=""
              className="h-20 w-20 rounded-2xl"
            />
          </div>
          {/* text */}

          <div>
            <h2 className="text-gray-600 text-center uppercase font-semibold">
              audi
            </h2>
          </div>
        </div>
        <div className=" border-2 border-dashed rounded-xl w-35 h-35 m-4">
          {/* icon */}

          <div className=" justify-center flex mb-2 mt-2">
            <img
              src="/cars/toyota.png"
              alt=""
              className="h-20 w-20 rounded-2xl"
            />
          </div>
          {/* text */}

          <div>
            <h2 className="text-gray-600 text-center uppercase font-semibold">
              toyota
            </h2>
          </div>
        </div>
        <div className=" border-2 border-dashed rounded-xl w-35 h-35 m-4">
          {/* icon */}

          <div className=" justify-center flex mb-2 mt-2">
            <img
              src="/cars/ferrari2.png"
              alt=""
              className="h-20 w-20 rounded-2xl"
            />
          </div>
          {/* text */}

          <div>
            <h2 className="text-gray-600 text-center uppercase font-semibold">
              ferrari
            </h2>
          </div>
        </div>
        <div className=" border-2 border-dashed rounded-xl w-35 h-35 m-4">
          {/* icon */}

          <div className=" justify-center flex mb-2 mt-2">
            <img
              src="/cars/lamborghini.png"
              alt=""
              className="h-20 w-20 rounded-2xl"
            />
          </div>
          {/* text */}

          <div>
            <h2 className="text-gray-600 text-center uppercase font-semibold">
              lamborghini
            </h2>
          </div>
        </div>
        <div className=" border-2 border-dashed rounded-xl w-35 h-35 m-4">
          {/* icon */}

          <div className=" justify-center flex mb-2 mt-2">
            <img
              src="/cars/suzuki.png"
              alt=""
              className="h-20 w-20 rounded-2xl"
            />
          </div>
          {/* text */}

          <div>
            <h2 className="text-gray-600 text-center uppercase font-semibold">
              suzuki
            </h2>
          </div>
        </div>
        <div className=" border-2 border-dashed rounded-xl w-35 h-35 m-4">
          {/* icon */}

          <div className=" justify-center flex mb-2 mt-2">
            <img
              src="/cars/honda.png"
              alt="honda car"
              className="h-20 w-20 rounded-2xl"
            />
          </div>
          {/* text */}

          <div>
            <h2 className="text-gray-600 text-center uppercase font-semibold">
              honda
            </h2>
          </div>
        </div>
        <div className=" border-2 border-dashed rounded-xl w-35 h-35 m-4">
          {/* icon */}

          <div className=" justify-center flex mb-2 mt-2">
            <img
              src="/cars/ford.png"
              alt=""
              className="h-20 w-20 rounded-2xl"
            />
          </div>
          {/* text */}

          <div>
            <h2 className="text-gray-600 text-center uppercase font-semibold">
              ford
            </h2>
          </div>
        </div>
        {/* more brands */}
        <div
          className="
    group
    border-2 border-dashed border-gray-300
    hover:border-[#1fa987]
    bg-gray-200
    rounded-xl
    w-35 h-35
    m-4
    cursor-pointer
    flex items-center justify-center
    transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-lg
    active:translate-y-0 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-[#27bb97]/50
  "
        >
          <div className="flex flex-col items-center">
            <CiCirclePlus
              size={34}
              className="
        text-[#27bb97]
        transition-all duration-300 ease-out
        group-hover:rotate-90 group-hover:scale-110
        group-hover:animate-pulse
      "
            />
            <h2
              className="
        mt-1
        text-[#27bb97]
        text-center
        uppercase
        font-semibold
        tracking-wide
        transition-opacity duration-300
        group-hover:opacity-90
      "
            >
              more
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCategories;
