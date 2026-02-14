import React, { useState } from 'react';

const SubNavbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = {
    'Electronics & Media': ['Computers', 'TVs', 'Cameras', 'Audio', 'Gaming', 'Phones', 'Tablets', 'Accessories'],
    'Home & Garden': ['Furniture', 'Appliances', 'Tools', 'Decor', 'Outdoor', 'Kitchen', 'Lighting'],
    'Clothing, Shoes, & Accessories': ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Jewelry', 'Bags', 'Watches'],
    'Baby & Kids': ['Baby Gear', 'Toys', 'Kids Clothing', 'Nursery', 'Strollers', 'Car Seats'],
    'Vehicles': ['Cars', 'Motorcycles', 'Trucks', 'Parts', 'Boats', 'RVs', 'ATVs'],
    'Toys, Games, & Hobbies': ['Action Figures', 'Board Games', 'Collectibles', 'Crafts', 'Video Games', 'Puzzles'],
    'Sports & Outdoors': ['Exercise', 'Camping', 'Bikes', 'Sports Equipment', 'Hunting', 'Fishing'],
    'Collectibles & Art': ['Antiques', 'Art', 'Coins', 'Memorabilia', 'Vintage', 'Stamps'],
    'Pet supplies': ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Small Animals']
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="px-4">
        <div className="flex items-center justify-between h-14">
          {Object.keys(categories).map((category) => (
            <div
              key={category}
              className="relative"
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-teal-600 whitespace-nowrap transition-colors">
                {category}
              </button>
              
              {hoveredCategory === category && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-200">
                  {categories[category].map((subcategory) => (
                    <a
                      key={subcategory}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                    >
                      {subcategory}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
            More
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SubNavbar;