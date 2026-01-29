import React from 'react';
import { FaSearch, FaShoppingBag } from 'react-icons/fa';

const ForSaleHero = () => {
  return (
    <section className="relative py-20 overflow-hidden h-[550px] lg:h-[600px] min-h-[550px]">
      <div className="absolute inset-0">
        <img
          src="for-sale.jpg"
          alt="Household Items Marketplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 shadow-lg"
              style={{ 
                backgroundColor: '#27BB97', 
                color: 'white',
                backdropFilter: 'blur(10px)'
              }}
            >
              <FaShoppingBag className="w-4 h-4" />
              <span className="text-sm font-medium">New Collection Just Dropped!</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Discover Amazing <br />
              <span className="text-[#27BB97]">Household Items</span> <br />
              At Great Prices
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for toys, furniture, books, kitchenware..."
                  className="w-full pl-4 pr-4 py-4 rounded-lg text-gray-900 border border-gray-300 focus:border-[#27BB97] focus:outline-none bg-white/95 backdrop-blur-sm shadow-lg"
                />
              </div>
              <button 
                className="px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform duration-300"
                style={{ backgroundColor: '#27BB97', color: 'white' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1E9E7E'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#27BB97'}
              >
                <FaSearch />
                Search Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForSaleHero;