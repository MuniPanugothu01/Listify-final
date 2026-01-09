import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const BrowseCategories2 = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      {/* text */}
      <div className="font-bold text-3xl sm:text-4xl md:text-5xl capitalize mt-28">
        car categories
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mt-8 cursor-pointer">
        
        {/* card1 */}
        <div className="relative">
          <div className="absolute rounded-lg z-10">
            <h3 className="text-white rounded-lg text-[16px] sm:text-[18px] md:text-[20px] font-sans bg-black/80 p-3 capitalize">
              mercedes
            </h3>
          </div>

          <div className="absolute bottom-2 right-2 bg-[#27bb97] hover:bg-[#1fa987] p-3 rounded-full z-10">
            <GoArrowUpRight size={20} className="text-white" />
          </div>

          <img
            src="/cars/image1.webp"
            alt=""
            className="h-[260px] w-[260px] sm:h-[300px] sm:w-[220px] md:h-[340px] md:w-[280px] object-cover rounded-lg"

          />
        </div>

        {/* card2 */}
        <div className="relative">
          <div className="absolute rounded-lg z-10">
            <h3 className="text-white rounded-lg text-[16px] sm:text-[18px] md:text-[20px] font-sans bg-black/80 p-3 capitalize">
              dodge challenger
            </h3>
          </div>

          <div className="absolute bottom-2 right-2 bg-white p-3 rounded-full z-10">
            <GoArrowUpRight size={20} className="text-black" />
          </div>

          <img
            src="/cars/oldcar.webp"
            alt=""
            className="h-[260px] w-[260px] sm:h-[300px] sm:w-[220px] md:h-[340px] md:w-[280px] object-cover rounded-lg"

          />
        </div>

        {/* card3 */}
        <div className="relative">
          <div className="absolute rounded-lg z-10">
            <h3 className="text-white rounded-lg text-[16px] sm:text-[18px] md:text-[20px] font-sans bg-black/80 p-3 capitalize">
              mercedes
            </h3>
          </div>

          <div className="absolute bottom-2 right-2 bg-white p-3 rounded-full z-10">
            <GoArrowUpRight size={20} className="text-black" />
          </div>

          <img
            src="/cars/bmwfront.webp"
            alt=""
            className="h-[260px] w-[260px] sm:h-[300px] sm:w-[220px] md:h-[340px] md:w-[280px] object-cover rounded-lg"

          />
        </div>

        {/* card4 */}
        <div className="relative">
          <div className="absolute rounded-lg z-10">
            <h3 className="text-white rounded-lg text-[16px] sm:text-[18px] md:text-[20px] font-sans bg-black/80 p-3 capitalize">
              mercedes
            </h3>
          </div>

          <div className="absolute bottom-2 right-2 bg-white p-3 rounded-full z-10">
            <GoArrowUpRight size={20} className="text-black" />
          </div>

          <img
            src="/cars/image4.webp"
            alt=""
            className="h-[260px] w-[260px] sm:h-[300px] sm:w-[220px] md:h-[340px] md:w-[280px] object-cover rounded-lg"

          />
        </div>
      </div>

      {/* View More Button */}
      <div className="text-center mt-16">
        <button
          className="px-8 py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg hover:bg-[#27bb97] hover:text-white transition-all duration-300 hover:shadow-lg cursor-pointer capitalize"
        >
          View All cars →
        </button>
      </div>
    </div>
  );
};

export default BrowseCategories2;
