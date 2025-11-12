import React from "react";
import CircularGallery from "./CircularGallery";
import Gallery from "./Gallery";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(/herobg.jpg)` }} // make sure hero.jpg is in /public folder
    >
      <div className="relative border-t-4 border-x-4 border-black/40 rounded-t-xl px-170 py-70 text-center">
        {/* Title overlapping the top border */}
        <h1 className="absolute -top-6 left-1/2 -translate-x-1/2 text-black font-bold bg-white text-3xl px-7 py-2 broder-5 rounded-md">
          Listify
        </h1>

        {/* 🧩 Content inside border */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col gap-4">
          <div className="relative w-150">
            <button className="absolute right-3 z-50 top-1/2 -translate-y-1/2 bg-[#3F929A] text-white px-6 py-4 rounded-xl text-sm cursor-pointer transition">
              Search
            </button>
            <input
              type="text"
              placeholder="Search for a listing..."
              className="w-full pl-28 pr-6 py-4 backdrop-blur-3xl bg-black/20 border-2 border-white/50 rounded-xl focus:outline-none placeholder:text-gray-100 text-gray-100"
            />
          </div>
        </div>
      </div>

 

      {/* Gradient overlay at bottom */}
      <div className="absolute bg-gradient-to-t from-white to-transparent w-full bottom-0 h-[50%]" />
    </section>
  );
};

export default HeroSection;
