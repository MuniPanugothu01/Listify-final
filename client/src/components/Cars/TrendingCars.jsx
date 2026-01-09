import React from "react";

// react icons
import { GoArrowRight } from "react-icons/go";

const TrendingCars = () => {
  return (
    <div className=" my-20  min-h-screen bg-[#f3f3f3] p-5 w-full">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-black capitalize font-bold text-5xl">
          Trending vehicles
        </h1>

        <button className="flex items-center gap-2 px-4 h-10  bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-full cursor-pointer">
          <span>View All</span>
          <GoArrowRight size={18} />
        </button>
      </div>
      {/* cards */}

      <div className="flex flex-wrap mt-10 gap-2 justify-center">
        <div className="relative w-66 h-70 bg-green-100 rounded-lg">
          <h1 className="absolute p-4 uppercase font-bold">bmw i4</h1>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <p className="text-black capitalize">$150/day</p>

            <button className="px-4 h-10 border bg-[#ffffff]  text-black rounded-full cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
        <div className="relative w-66 h-70 bg-[#ffffff]  rounded-lg">
          <h1 className="p-4 uppercase font-bold">audi a7</h1>
         <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <p className="text-black capitalize">$150/day</p>

            <button className="px-4 h-10 border bg-[#ffffff]  text-black rounded-full cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
        <div className="relative w-66 h-70 bg-[#ffffff] rounded-lg">
          <h1 className="p-4 uppercase font-bold">mercedes e-class</h1>
               <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <p className="text-black capitalize">$150/day</p>

            <button className="px-4 h-10 border bg-[#ffffff] border-black/10  text-black rounded-full cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
        <div className="relative w-66 h-70 bg-[#ffffff] rounded-lg">
          <h1 className="p-4 uppercase font-bold">porsche 911</h1>
       <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <p className="text-black capitalize">$150/day</p>

            <button className="px-4 h-10 border bg-[#ffffff] border-black/10  text-black rounded-full cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCars;
