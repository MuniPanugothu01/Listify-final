import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const SubNavbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  const scrollContainerRef = useRef(null);
  const navRef = useRef(null);
  const buttonRefs = useRef({});

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

  const handleMouseEnter = (category) => {
    const button = buttonRefs.current[category];
    if (button) {
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        left: rect.left,
        top: rect.bottom + window.scrollY
      });
    }
    setHoveredCategory(category);
  };

  // Update position on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (hoveredCategory) {
        const button = buttonRefs.current[hoveredCategory];
        if (button) {
          const rect = button.getBoundingClientRect();
          setDropdownPosition({
            left: rect.left,
            top: rect.bottom + window.scrollY
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [hoveredCategory]);

  return (
    <>
      {/* Dropdown rendered at body level */}
      {hoveredCategory && ReactDOM.createPortal(
        <div 
          style={{
            position: 'absolute',
            left: dropdownPosition.left,
            top: dropdownPosition.top,
            width: '224px',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            border: '1px solid #e5e7eb',
            padding: '0.375rem 0',
            zIndex: 999999,
          }}
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {categories[hoveredCategory].map((subcategory) => (
            <a
              key={subcategory}
              href="#"
              style={{
                display: 'block',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                color: '#374151',
                textDecoration: 'none',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.color = '#0d9488';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#374151';
              }}
              onClick={(e) => {
                e.preventDefault();
                setHoveredCategory(null);
              }}
            >
              {subcategory}
            </a>
          ))}
        </div>,
        document.body
      )}

      <nav 
        ref={navRef}
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 99999,
        }}
      >
        <div style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          maxWidth: '100%' 
        }}>
          {/* Scrollable container - no buttons */}
          <div
            ref={scrollContainerRef}
            style={{
              overflowX: 'auto',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              display: 'flex',
              alignItems: 'center',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
              width: '100%',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style>
              {`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem', 
              padding: '0.75rem 0', 
              minWidth: 'max-content',
              margin: '0 auto' // Center the content
            }}>
              {Object.keys(categories).map((category) => (
                <div
                  key={category}
                  style={{ position: 'relative', flexShrink: 0 }}
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button 
                    ref={el => buttonRefs.current[category] = el}
                    style={{
                      padding: '0.5rem 1rem',
                      margin: '0 0.125rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: hoveredCategory === category ? '#0d9488' : '#374151',
                      whiteSpace: 'nowrap',
                      borderRadius: '0.375rem',
                      transition: 'all 0.2s',
                      backgroundColor: hoveredCategory === category ? '#f9fafb' : 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.color = '#0d9488';
                    }}
                    onMouseLeave={(e) => {
                      if (hoveredCategory !== category) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }
                    }}
                  >
                    {category}
                  </button>
                </div>
              ))}
              
              <button style={{
                padding: '0.5rem 1rem',
                margin: '0 0.125rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#0d9488',
                whiteSpace: 'nowrap',
                borderRadius: '0.375rem',
                transition: 'all 0.2s',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.color = '#0f766e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#0d9488';
              }}
              >
                More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SubNavbar;