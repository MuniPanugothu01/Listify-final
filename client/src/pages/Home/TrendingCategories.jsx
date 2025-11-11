import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
const TrendingCategories = () => {
  return (
    <div className="mt-15 flex  flex-col text-center min-h-screen px-10">
      <div className="">
        <h1 className="font-extrabold text-[70px] max-w-3xl mx-auto uppercase text-gray-700 leading-[70px]">
          Trending Categories of 2025
        </h1>
      </div>
      <div className="flex gap-4 w-full mt-10">
        <div className="w-[70%] relative bg-[#c89a5e]/30 flex justify-between  p-4 rounded-lg border border-[#c89a5e]">
          <div className="flex flex-col items-start">
            <h2 className="font-semibold text-[20px] mb-4">Housing</h2>
            <div className="flex flex-col items-start absolute bottom-5 left-5">
              <h1 className="font-bold text-[30px] w-[500px] text-start">
                EXPLORE OUR HOUSING CATEGORIES
              </h1>
              <p className="text-gray-700 text-[17px]">
                We have diffrent types of house listings around the world
              </p>
              <div className="flex items-center gap-3 cursor-pointer mt-4">
                <p className="font-semibold hover:underline">Explore more</p>
                <FaArrowRightLong className="mt-1" />
              </div>
            </div>
          </div>
          <img src="/trendinghouse.png" alt="" className="h-[300px] " />
        </div>

        <div className="w-[30%]   flex flex-col  bg-[#c89a5e]/30 p-4 rounded-lg border border-[#c89a5e] ">
          <h2 className="font-semibold text-[20px] mb- text-left">Furniture</h2>
          <img
            src="/trendingfur1.png"
            alt=""
            className="h-40  flex items-center object-cover"
          />
          <div className="flex flex-col items-start">
            <h1 className="font-bold text-[20px]  text-start uppercase">
              Find Your Perfect Furniture
            </h1>
            <p className="text-gray-700 text-[15px] w-[300px] text-start">
              From cozy sofas to elegant tables — explore designs that make your
              home feel complete.
            </p>
            <div className="flex items-center gap-3 cursor-pointer mt-4">
              <p className="font-semibold hover:underline">Explore more</p>
              <FaArrowRightLong className="mt-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full mt-5">
        <div className="w-[30%]   flex flex-col  bg-[#c89a5e]/30 p-4 rounded-lg border border-[#c89a5e] ">
          <h2 className="font-semibold text-[20px] mb- text-left">Services</h2>
          <img
            src="/trendingcar4.png"
            alt=""
            className="h-40  flex items-center object-contain object-top"
          />
          <div className="flex flex-col items-start">
            <h1 className="font-bold text-[20px] w-[300px] text-start uppercase">
              Experience Our Signature Services
            </h1>
            <p className="text-gray-700 text-[15px]  text-start">
              Exceptional quality, personal attention, and world-class standards
              in everything we do.
            </p>
            <div className="flex items-center gap-3 cursor-pointer mt-4">
              <p className="font-semibold hover:underline">Explore more</p>
              <FaArrowRightLong className="mt-1" />
            </div>
          </div>
        </div>

        <div className="w-[70%] relative bg-[#c89a5e]/30 flex justify-between   p-4 rounded-lg border border-[#c89a5e]">
          <div className="flex flex-col items-start">
            <h2 className="font-semibold text-[20px] mb-4">Jobs</h2>
            <div className="flex flex-col items-start absolute bottom-5 left-5">
              <h1 className="font-bold text-[30px] w-[500px] text-start uppercase">
                Discover Your Next Career Move
              </h1>
              <p className="text-gray-700 text-[17px] w-[400px] text-start">
                Join innovative teams shaping the future — your next opportunity
                starts here.
              </p>
              <div className="flex items-center gap-3 cursor-pointer mt-4">
                <p className="font-semibold hover:underline">Explore more</p>
                <FaArrowRightLong className="mt-1" />
              </div>
            </div>
          </div>
          <img
            src="/trendingjobs.png"
            alt=""
            className="h-[300px]  absolute bottom-5 right-5"
          />
        </div>
      </div>
    </div>
  );
};

export default TrendingCategories;
