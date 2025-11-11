import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(/hero.jpg)` }} // make sure hero.jpg is in /public folder
    >
      {/* Border Box (no bottom border) */}
      <div className="relative border-t-4 border-x-4 border-white rounded-t-xl px-170 py-70 text-center">
        {/* Title overlapping the top border */}
        <h1 className="absolute -top-6 left-1/2 -translate-x-1/2 text-black font-bold bg-white text-3xl px-7 py-2">
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
              className="w-full pl-28 pr-6 py-4 backdrop-blur-3xl border-2 border-white/50 rounded-xl focus:outline-none placeholder:text-gray-400 text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* 🖼️ Center & Overlapping Images */}
      <div className="absolute z-50 bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center">
        {/* Left rotated image overlapping center */}
        <img
          src="/herocat1.jpg"
          alt="Left"
          className="h-[300px]  w-[250px] object-cover border-4 border-white rounded-lg -rotate-25  z-50 opacity-90"
        />

        {/* Center image on top */}
        <img
          src="/herocat1.jpg"
          alt="Center"
          className="h-[420px] w-[300px] object-cover border-4 border-white rounded-lg -rotate-6 z-40"
        />

        {/* Right rotated image overlapping center */}
        <img
          src="/herocat1.jpg"
          alt="Right"
          className="h-[300px] w-[250px] object-cover border-4 border-white rounded-lg rotate-25   z-50 opacity-90"
        />
      </div>





      {/* Gradient overlay at bottom */}
      <div className="absolute bg-gradient-to-t from-white to-transparent w-full bottom-0 h-[50%]" />
    </section>
  );
};

export default HeroSection;
