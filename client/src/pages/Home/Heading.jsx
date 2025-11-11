import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Heading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mt-20 leading-[70px]">
        <h1 className="text-[#c89a5e] text-[40px] font-['Dancing_Script'] ">
          Time To Explore
        </h1>
        <h1 className="font-extrabold text-[90px]">OUR CATEGORIES</h1>
        <p className="font-semibold max-w-3xl mx-auto leading-[30px] mt-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          quae totam porro maxime dolorem delectus consequatur vero odio
          incidunt ut.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-8">
        <div className="bg-[#c89a5e] p-2 rounded-full w-fit">
          <FaInstagram size={24} className="text-white" />
        </div>
        <div className="bg-[#c89a5e] p-2 rounded-full w-fit">
          <FaFacebookF size={24} className="text-white" />
        </div>
        <div className="bg-[#c89a5e] p-2 rounded-full w-fit">
          <FaXTwitter size={24} className="text-white" />
        </div>
      </div>
      <div className="">
        <button className="bg-[#c89a5e] px-7 py-3 rounded-full mt-5 text-white font-semibold text-[23px] cursor-pointer">Explore Now</button>
      </div>
    </div>
  );
};

export default Heading;
