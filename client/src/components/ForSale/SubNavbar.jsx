import React, { useState, useRef } from 'react';

const SubNavbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const scrollContainerRef = useRef(null);

  const categories = {
    'Electronics & Media': ['Computers', 'TVs', 'Cameras', 'Audio', 'Gaming', 'Phones', 'Tablets', 'Accessories'],
    'Home & Garden': ['Furniture', 'Appliances', 'Tools', 'Decor', 'Outdoor', 'Kitchen', 'Lighting'],
    'Clothing & Accessories': ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Jewelry', 'Bags', 'Watches'],
    'Baby & Kids': ['Baby Gear', 'Toys', 'Kids Clothing', 'Nursery', 'Strollers', 'Car Seats'],
    'Vehicles': ['Cars', 'Motorcycles', 'Trucks', 'Parts', 'Boats', 'RVs', 'ATVs'],
    'Toys & Games': ['Action Figures', 'Board Games', 'Collectibles', 'Crafts', 'Video Games', 'Puzzles'],
    'Sports & Outdoors': ['Exercise', 'Camping', 'Bikes', 'Sports Equipment', 'Hunting', 'Fishing'],
    'Collectibles & Art': ['Antiques', 'Art', 'Coins', 'Memorabilia', 'Vintage', 'Stamps'],
    'Pet supplies': ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Small Animals']
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="relative flex items-center max-w-full">
        {/* Left scroll button - Always visible on mobile/tablet */}
        <button
          onClick={() => scroll('left')}
          className="
            absolute left-0 z-20
            bg-white h-full px-2 md:px-3
            flex items-center justify-center
            text-gray-600 hover:text-teal-600
            border-r border-gray-200
            shadow-[4px_0_6px_-2px_rgba(0,0,0,0.05)]
            transition-all duration-200
            md:hidden
          "
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="
            overflow-x-auto scrollbar-hide
            px-10 md:px-6 lg:px-12
            flex items-center
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            scroll-smooth
            w-full
          "
          style={{
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="flex items-center space-x-1 md:space-x-2 py-3 min-w-max">
            {Object.keys(categories).map((category) => (
              <div
                key={category}
                className="relative flex-shrink-0"
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button className="
                  px-4 py-2 mx-0.5
                  text-sm font-medium
                  text-gray-700 hover:text-teal-600
                  whitespace-nowrap rounded-md
                  transition-all duration-200
                  hover:bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                ">
                  {category}
                </button>
                
                {/* Dropdown menu */}
                {hoveredCategory === category && (
                  <div className="
                    absolute top-full left-0 mt-1
                    w-56 bg-white rounded-lg shadow-lg
                    py-1.5 border border-gray-200
                    z-50
                    animate-in
                  ">
                    {categories[category].map((subcategory) => (
                      <a
                        key={subcategory}
                        href="#"
                        className="
                          block px-4 py-2 text-sm text-gray-700
                          hover:bg-gray-50 hover:text-teal-600
                          transition-colors duration-150
                        "
                      >
                        {subcategory}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <button className="
              px-4 py-2 mx-0.5
              text-sm font-medium
              text-teal-600 hover:text-teal-700
              whitespace-nowrap rounded-md
              transition-all duration-200
              hover:bg-gray-50
              flex items-center gap-1
              flex-shrink-0
            ">
              More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right scroll button - Always visible on mobile/tablet */}
        <button
          onClick={() => scroll('right')}
          className="
            absolute right-0 z-20
            bg-white h-full px-2 md:px-3
            flex items-center justify-center
            text-gray-600 hover:text-teal-600
            border-l border-gray-200
            shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]
            transition-all duration-200
            md:hidden
          "
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Desktop hover dropdowns remain the same */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slideIn 0.15s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default SubNavbar;