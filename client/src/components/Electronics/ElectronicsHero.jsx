import React from 'react';

export default function ElectronicsHero() {
  return (
    <div className="relative h-[300px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden mt-16 md:mt-16 lg:mt-18 ">
      <img
        src="/for-sale.jpg"
        alt="Modern electronics marketplace"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 max-w-6xl">
          Your Local <span className="gradient-text">Electronics</span> Marketplace
        </h1>
        <p className="text-white text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl">
          Buy and sell smartphones, laptops, gaming consoles, and more. Get amazing deals on premium tech in your community.
        </p>     
      </div>
    </div>
  );
}