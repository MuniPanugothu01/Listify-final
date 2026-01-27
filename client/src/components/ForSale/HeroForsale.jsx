import React from 'react';

export default function HeroForSale() {
  return (
    <div className="relative h-[500px] sm:h-[550px] md:h-[450px] lg:h-[550px] overflow-hidden">
      <img
        src="/for-sale.jpg"
        alt="Modern shopping experience"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 max-w-4xl">
          Everything Your <span className="gradient-text">Community</span> Needs
        </h1>
        <p className="text-white text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl">
          From home essentials to the latest gadgets, discover premium products with unbeatable prices and guaranteed quality.
        </p>
        <button className="bg-white text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
          Start Shopping
        </button>
        
        <div className="absolute bottom-6 sm:bottom-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}