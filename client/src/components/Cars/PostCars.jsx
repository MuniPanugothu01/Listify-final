import React from "react";
// react icons
import { GoArrowUpRight } from "react-icons/go";
import { TbCarGarage } from "react-icons/tb";

const PostCars = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div
        className="
          flex
          flex-col
          lg:flex-row
          gap-6
          lg:gap-10
          justify-center
          mt-10
          sm:mt-14
          lg:mt-20
        "
      >
        {/* first looking for a car */}
        <div
          className="
            w-full
            lg:w-[560px]
            p-6
            sm:p-8
            lg:p-10
            bg-[#e9f3ff]
            border border-[#e9f3ff]
            rounded-lg
          "
        >
          <h2 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 capitalize">
            are you looking <br /> for a car ?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Asperiores, obcaecati!
          </p>

          <div className="flex items-center justify-between w-full mt-6">
            <button
              className="
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2.5
                sm:py-3
                px-4
                sm:px-5
                rounded
                capitalize
                cursor-pointer
                flex
                items-center
                gap-2
              "
            >
              get started <GoArrowUpRight />
            </button>

            <TbCarGarage
              size={56}
              className="text-blue-400 hidden sm:block"
            />
          </div>
        </div>

        {/* second sell your car */}
        <div
          className="
            w-full
            lg:w-[560px]
            p-6
            sm:p-8
            lg:p-10
            bg-green-50
            border border-[#e9f3ff]
            rounded-lg
          "
        >
          <h2 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 capitalize">
            do you want to <br /> sell your car ?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Asperiores, obcaecati!
          </p>

          <div className="flex items-center justify-between w-full mt-6">
            <button
              className="
                bg-[#27bb97]
                hover:bg-[#1fa987]
                text-white
                font-bold
                py-2.5
                sm:py-3
                px-4
                sm:px-5
                rounded
                capitalize
                cursor-pointer
                flex
                items-center
                gap-2
              "
            >
              get started <GoArrowUpRight />
            </button>

            <img
              src="/cars/sellcar.png"
              alt="sell car"
              className="h-14 sm:h-16 hidden sm:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCars;
