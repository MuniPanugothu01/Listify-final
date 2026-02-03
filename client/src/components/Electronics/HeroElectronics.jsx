import React from 'react';

export default function HeroElectronics() {
  return (
    <div className="relative h-[400px] sm:h-[400px] md:h-[400px] lg:h-[380px] overflow-hidden">
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
        <button 
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
          style={{ 
            backgroundColor: '#27BB97',
            color: 'white'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#1E9E7E';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#27BB97';
          }}
        >
          Browse Electronics
        </button>
        
      </div>
    </div>
  );
}