import React, { useState } from "react";
import { Search, MapPin, Heart, Filter, ChevronDown } from "lucide-react";

const TakeCareHero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[300px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden mt-16 md:mt-16 lg:mt-18 ">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-black/30 bg-blend-darken"
          style={{
            backgroundImage: `url('babycare-7.jpg')`,
            loading: "lazy",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="text-center">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              Joy for Every Little One
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mt-4 sm:mt-6 mb-8 sm:mb-14 px-2">
              Find certified caregivers and daycare centers that provide safe
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TakeCareHero;
