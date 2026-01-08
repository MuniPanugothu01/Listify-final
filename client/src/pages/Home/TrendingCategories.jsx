import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const TrendingCategories = () => {
  return (
    <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-15 flex flex-col text-center min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[70px] 
          max-w-3xl mx-auto uppercase text-black leading-tight sm:leading-snug md:leading-relaxed lg:leading-[70px] px-2">
          Trending Categories of 2025
        </h1>
      </div>

      {/* First Row - Housing (70%) and Furniture (30%) */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 w-full ">
        {/* Housing Card */}
        <div className="w-full lg:w-[70%] bg-[#c89a5e]/30 flex flex-col lg:flex-row justify-between p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-[#c89a5e]">
          {/* Content Section */}
          <div className="flex flex-col justify-between w-full lg:w-1/2 mb-4 lg:mb-0 lg:pr-4">
            <div>
              <h2 className="font-semibold text-lg sm:text-xl md:text-[20px] mb-2 sm:mb-3 md:mb-4 text-left">
                Housing
              </h2>
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-[30px] text-left leading-tight sm:leading-snug mb-2 sm:mb-3">
                EXPLORE OUR HOUSING CATEGORIES
              </h1>
              <p className="text-gray-700 text-sm sm:text-base md:text-[24px] text-left ">
                We have different types of house listings around the world lo
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
              <p className="font-semibold hover:underline text-sm sm:text-base">
                Explore more
              </p>
              <FaArrowRightLong className="mt-0.5 sm:mt-1" />
            </div>
          </div>
          
          {/* Image Section - No absolute positioning */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center ">
            <img 
              src="/trendinghouse.png" 
              alt="Housing" 
              className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-[300px] w-auto max-w-full object-contain" 
            />
          </div>
        </div>

        {/* Furniture Card */}
        <div className="w-full lg:w-[30%] flex flex-col bg-[#c89a5e]/30 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-[#c89a5e]">
          <h2 className="font-semibold text-lg sm:text-xl md:text-[20px] mb-2 sm:mb-3 text-left">
            Furniture
          </h2>
          
          {/* Image Section */}
          <div className="mb-3 sm:mb-4 flex justify-center">
            <img
              src="/trendingfur1.png"
              alt="Furniture"
              className="h-64 w-full object-contain rounded"
            />
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col flex-grow">
            <h1 className="font-bold text-lg sm:text-xl md:text-[20px] text-left uppercase leading-tight mb-2 sm:mb-3">
              Find Your Perfect Furniture
            </h1>
            <p className="text-gray-700 text-sm sm:text-base md:text-[15px] text-left mb-3 sm:mb-4">
              From cozy sofas to elegant tables — explore designs that make your
              home feel complete.
            </p>
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer mt-auto">
              <p className="font-semibold hover:underline text-sm sm:text-base">
                Explore more
              </p>
              <FaArrowRightLong className="mt-0.5 sm:mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Services (30%) and Jobs (70%) */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 w-full mt-3 sm:mt-4 md:mt-5">
        {/* Services Card */}
        <div className="w-full lg:w-[30%] flex flex-col bg-[#c89a5e]/30 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-[#c89a5e]">
          <h2 className="font-semibold text-lg sm:text-xl md:text-[20px] mb-2 sm:mb-3 text-left">
            Services
          </h2>
          
          {/* Image Section */}
          <div className="mb-3 sm:mb-4 flex justify-center">
            <img
              src="/trendingcar4.png"
              alt="Services"
              className="h-36 sm:h-40 md:h-40 lg:h-44 xl:h-48 w-full max-w-xs object-contain object-top rounded"
            />
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col flex-grow">
            <h1 className="font-bold text-lg sm:text-xl md:text-[20px] text-left uppercase leading-tight mb-2 sm:mb-3">
              Experience Our Signature Services
            </h1>
            <p className="text-gray-700 text-sm sm:text-base md:text-[15px] text-left mb-3 sm:mb-4">
              Exceptional quality, personal attention, and world-class standards
              in everything we do.
            </p>
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer mt-auto">
              <p className="font-semibold hover:underline text-sm sm:text-base">
                Explore more
              </p>
              <FaArrowRightLong className="mt-0.5 sm:mt-1" />
            </div>
          </div>
        </div>

        {/* Jobs Card */}
        <div className="w-full lg:w-[70%] bg-[#c89a5e]/30 flex flex-col lg:flex-row justify-between p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-[#c89a5e]">
          {/* Content Section */}
          <div className="flex flex-col justify-between w-full lg:w-1/2 mb-4 lg:mb-0 lg:pr-4">
            <div>
              <h2 className="font-semibold text-lg sm:text-xl md:text-[20px] mb-2 sm:mb-3 md:mb-4 text-left">
                Jobs
              </h2>
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-[30px] text-left leading-tight sm:leading-snug mb-2 sm:mb-3">
                DISCOVER YOUR NEXT CAREER MOVE
              </h1>
              <p className="text-gray-700 text-sm sm:text-base md:text-[17px] text-left mb-3 sm:mb-4">
                Join innovative teams shaping the future — your next opportunity
                starts here.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
              <p className="font-semibold hover:underline text-sm sm:text-base">
                Explore more
              </p>
              <FaArrowRightLong className="mt-0.5 sm:mt-1" />
            </div>
          </div>
          
          {/* Image Section - No absolute positioning */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
            <img
              src="/trendingjobs.png"
              alt="Jobs"
              className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-[300px] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCategories;