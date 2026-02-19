import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ForSaleSubNavbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  
  const scrollContainerRef = useRef(null);
  const navRef = useRef(null);
  const categoryRefs = useRef({});
  const navigate = useNavigate();

  const categories = {
    'Electronics': {
      path: '/electronics',
      subcategories: ['Computers', 'TVs', 'Cameras', 'Audio', 'Gaming', 'Phones', 'Tablets', 'Accessories']
    },
     'Vehicles': {
      path: '/vehicles',
      subcategories: ['Cars', 'Motorcycles', 'Trucks', 'Parts', 'Boats', 'RVs', 'ATVs']
    },
    'Home & Garden': {
      path: '/home-garden',
      subcategories: ['Furniture', 'Appliances', 'Tools', 'Decor', 'Outdoor', 'Kitchen', 'Lighting']
    },
    'Clothing': {
      path: '/clothing',
      subcategories: ["Men's Clothing", "Women's Clothing", 'Shoes', 'Jewelry', 'Bags', 'Watches']
    },
    'Baby & Kids': {
      path: '/baby-kids',
      subcategories: ['Baby Gear', 'Toys', 'Kids Clothing', 'Nursery', 'Strollers', 'Car Seats']
    },
   
    'Toys & Games': {
      path: '/toys-games',
      subcategories: ['Action Figures', 'Board Games', 'Collectibles', 'Crafts', 'Video Games', 'Puzzles']
    },
    'Sports': {
      path: '/sports',
      subcategories: ['Exercise', 'Camping', 'Bikes', 'Sports Equipment', 'Hunting', 'Fishing']
    },
    'Collectibles': {
      path: '/collectibles',
      subcategories: ['Antiques', 'Art', 'Coins', 'Memorabilia', 'Vintage', 'Stamps']
    },
    'Pets': {
      path: '/pets',
      subcategories: ['Dog Supplies', 'Cat Supplies', 'Bird Supplies', 'Fish Supplies', 'Reptile Supplies']
    },
    'Books': {
      path: '/books',
      subcategories: ['Fiction', 'Non-Fiction', "Children's Books", 'Textbooks', 'Comics', 'Magazines']
    },
    'Beauty': {
      path: '/beauty',
      subcategories: ['Makeup', 'Skincare', 'Hair Care', 'Fragrance', 'Vitamins', 'Personal Care']
    }
  };

  // Check scroll position
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Handle navigation
  const handleNavigation = (category) => {
    setHoveredCategory(null);
    navigate(categories[category].path);
  };

  // Handle hover to position dropdown
  const handleMouseEnter = (category) => {
    const element = categoryRefs.current[category];
    if (element) {
      const rect = element.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setHoveredCategory(category);
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="bg-white shadow-sm border-b top-0 z-40"
      >
        <div className="relative px-8">
          {/* Left Scroll Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-gray-50 text-gray-600 hover:text-teal-600 rounded-full shadow-md p-1.5 transition-all duration-200 border border-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Scroll Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-gray-50 text-gray-600 hover:text-teal-600 rounded-full shadow-md p-1.5 transition-all duration-200 border border-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable Categories */}
          <div
            ref={scrollContainerRef}
            className="flex items-center overflow-x-auto scrollbar-hide scroll-smooth py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {Object.keys(categories).map((category) => (
              <div
                key={category}
                ref={(el) => (categoryRefs.current[category] = el)}
                className="flex-shrink-0"
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button
                  onClick={() => handleNavigation(category)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 whitespace-nowrap transition-colors duration-150"
                >
                  {category}
                </button>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Compact Dropdown */}
      {hoveredCategory && (
        <div 
          className="fixed bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 text-sm"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            minWidth: '180px',
            maxWidth: '250px'
          }}
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
        >  
          {/* Subcategories - Compact */}
          <div className="max-h-80 overflow-y-auto">
            {categories[hoveredCategory].subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => handleNavigation(hoveredCategory)}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-150"
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default ForSaleSubNavbar;