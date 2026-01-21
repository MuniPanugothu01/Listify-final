import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const BrowseCategories2 = () => {
  return (
    <div className="max-w-7xl mx-auto my-40 px-4 mt-18">
      {/* text */}
      <div className="font-bold text-3xl sm:text-4xl md:text-5xl capitalize mt-5">
        car categories
      </div>

      <Link to="/car-listings">
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
          {/* card 1 */}
          <div className="relative group overflow-hidden rounded-lg cursor-pointer">
            {/* title */}
            <div className="absolute top-2 left-2 z-20">
              <h3 className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-sans bg-black/80 px-4 py-2 rounded-lg capitalize">
                mercedes
              </h3>
            </div>

            {/* arrow */}
            <div
              className="absolute bottom-2 right-2 z-20 bg-[#27bb97] p-3 rounded-full
                          transform transition-all duration-500
                          group-hover:scale-110 group-hover:rotate-12"
            >
              <GoArrowUpRight size={20} className="text-white" />
            </div>

            {/* overlay */}
            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                          transition-all duration-500 z-10"
            />

            {/* image */}
            <img
              src="/cars/image1.webp"
              alt="mercedes"
              className="h-[260px] w-[260px] sm:h-[300px] sm:w-[220px] md:h-[340px] md:w-[280px]
                       object-cover rounded-lg
                       transform scale-100 group-hover:scale-110
                       transition-transform duration-700 ease-out"
            />
          </div>

          {/* card 2 */}
          <div className="relative group overflow-hidden rounded-lg cursor-pointer">
            <div className="absolute top-2 left-2 z-20">
              <h3 className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-sans bg-black/80 px-4 py-2 rounded-lg capitalize">
                dodge challenger
              </h3>
            </div>

            <div
              className="absolute bottom-2 right-2 z-20 bg-white p-3 rounded-full
                          transform transition-all duration-500
                          group-hover:scale-110 group-hover:rotate-12"
            >
              <GoArrowUpRight size={20} className="text-black" />
            </div>

            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                          transition-all duration-500 z-10"
            />

            <img
              src="/cars/oldcar.webp"
              alt="dodge challenger"
              className="h-[260px] w-[260px] sm:h-[300px] sm:w-[220px] md:h-[340px] md:w-[280px]
                       object-cover rounded-lg
                       transform scale-100 group-hover:scale-110
                       transition-transform duration-700 ease-out"
            />
          </div>

          {/* card 3 */}
          <div className="relative group overflow-hidden rounded-lg cursor-pointer">
            <div className="absolute top-2 left-2 z-20">
              <h3 className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-sans bg-black/80 px-4 py-2 rounded-lg capitalize">
                bmw
              </h3>
            </div>

            <div
              className="absolute bottom-2 right-2 z-20 bg-white p-3 rounded-full
                          transform transition-all duration-500
                          group-hover:scale-110 group-hover:rotate-12"
            >
              <GoArrowUpRight size={20} className="text-black" />
            </div>

            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                          transition-all duration-500 z-10"
            />

            <img
              src="/cars/bmwfront.webp"
              alt="bmw"
              className="h-[260px] w-[260px] sm:h-[300px] sm:w-[220px] md:h-[340px] md:w-[280px]
                       object-cover rounded-lg
                       transform scale-100 group-hover:scale-110
                       transition-transform duration-700 ease-out"
            />
          </div>

          {/* card 4 */}
          <div className="relative group overflow-hidden rounded-lg cursor-pointer">
            <div className="absolute top-2 left-2 z-20">
              <h3 className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-sans bg-black/80 px-4 py-2 rounded-lg capitalize">
                mercedes
              </h3>
            </div>

            <div
              className="absolute bottom-2 right-2 z-20 bg-white p-3 rounded-full
                          transform transition-all duration-500
                          group-hover:scale-110 group-hover:rotate-12"
            >
              <GoArrowUpRight size={20} className="text-black" />
            </div>

            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                          transition-all duration-500 z-10"
            />

            <img
              src="/cars/image4.webp"
              alt="mercedes"
              className="h-[260px] w-[260px] sm:h-[300px] sm:w-[220px] md:h-[340px] md:w-[280px]
                       object-cover rounded-lg
                       transform scale-100 group-hover:scale-110
                       transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </Link>

      {/* View More Button */}
      <div className="text-center mt-16">
        <Link to="/car-listings">
          <button
            className="px-8 py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg
                     hover:bg-[#27bb97] hover:text-white transition-all duration-300
                     hover:shadow-lg capitalize cursor-pointer"
          >
            View All cars →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BrowseCategories2;
