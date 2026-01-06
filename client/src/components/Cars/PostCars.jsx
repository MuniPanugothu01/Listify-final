import React from "react";
// react icons
import { GoArrowUpRight } from "react-icons/go";
import { TbCarGarage } from "react-icons/tb";
const PostCars = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-10 justify-center mt-20">
        {/* first looking for a car */}
        <div className="h-85 w-140 p-10 bg-[#e9f3ff] border border-[#e9f3ff] rounded-lg">
          <h2 className="text-2xl font-bold mt-10 right-10 capitalize">
            are you looking <br /> for a car ?
          </h2>
          <p className="mt-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Asperiores, obcaecati!
          </p>

          <div className="flex items-center justify-between w-full ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded capitalize cursor-pointer mt-5 mb-10 flex items-center gap-2">
              get started <GoArrowUpRight className="" />
            </button>

            <TbCarGarage size={68} className="text-blue-400 mb-5" />
          </div>
        </div>

        {/* second sell your car */}

        <div className="h-85 w-140 p-10 bg-green-50 border border-[#e9f3ff] rounded-lg">
          <h2 className="text-2xl font-bold mt-10 right-10 capitalize">
            do you want to <br /> sell your car ?
          </h2>
          <p className="mt-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Asperiores, obcaecati!
          </p>

          <div className="flex items-center justify-between w-full ">
            <button className="bg-[#27bb97] hover:bg-[#1fa987] text-white font-bold py-3 px-5 rounded capitalize cursor-pointer mt-5 mb-10 flex items-center gap-2">
              get started <GoArrowUpRight className="" />
            </button>

            <img src="/cars/sellcar.png" alt="" className="h-16 w-18 mb-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCars;
