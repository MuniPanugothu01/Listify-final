import React from 'react';
import { FaSearch } from 'react-icons/fa';

const ForSaleHero = () => {
  return (
    <section className="relative h-[400px] sm:h-[400px] md:h-[400px] lg:h-[380px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/for-sale-6.jpg"
          alt="Household Items Marketplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content - Centered */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-5xl">   
          {/* Main Heading */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Everything For Your <span className="text-[#27BB97]">Home</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-4xl mx-auto">
            Buy & sell furniture, toys, household items, tools, games, and more in your local community
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
          Browse ForSale
        </button>
    
          
        </div>
      </div>
    </section>
  );
};

export default ForSaleHero;