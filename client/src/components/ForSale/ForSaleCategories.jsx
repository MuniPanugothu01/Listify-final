import React from 'react';
import { FaGamepad, FaChair, FaBook, FaUtensils, FaHome, FaSeedling, FaChild, FaWrench } from 'react-icons/fa';

const ForSaleCategories = () => {
  const categories = [
    { name: 'Toys & Games', items: '89 items', icon: <FaGamepad className="text-4xl" />, color: 'bg-blue-50 hover:bg-blue-100' },
    { name: 'Furniture', items: '45 items', icon: <FaChair className="text-4xl" />, color: 'bg-amber-50 hover:bg-amber-100' },
    { name: 'Books', items: '120 items', icon: <FaBook className="text-4xl" />, color: 'bg-green-50 hover:bg-green-100' },
    { name: 'Kitchenware', items: '67 items', icon: <FaUtensils className="text-4xl" />, color: 'bg-red-50 hover:bg-red-100' },
    { name: 'Home Decor', items: '78 items', icon: <FaHome className="text-4xl" />, color: 'bg-purple-50 hover:bg-purple-100' },
    { name: 'Gardening', items: '34 items', icon: <FaSeedling className="text-4xl" />, color: 'bg-emerald-50 hover:bg-emerald-100' },
    { name: 'Sports Gear', items: '41 items', icon: <FaSeedling className="text-4xl" />, color: 'bg-orange-50 hover:bg-orange-100' },
    { name: 'Baby Items', items: '29 items', icon: <FaChild className="text-4xl" />, color: 'bg-pink-50 hover:bg-pink-100' },
    { name: 'Tools', items: '38 items', icon: <FaWrench className="text-4xl" />, color: 'bg-gray-50 hover:bg-gray-100' },
  ];

  return (
    <section className="py-12 px-4  bg-white">
      <div className="px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop By Category</h2>
          <p className="text-gray-600">Browse our wide range of household categories</p>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-200 p-4 text-center"
            >
              <div className="flex justify-center mb-3">
                {React.cloneElement(category.icon, { 
                  className: category.icon.props.className + " group-hover:scale-110 transition-transform duration-300",
                  style: { color: '#27BB97' }
                })}
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">{category.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{category.items}</p>
              <button 
                className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: '#27BB97' }}
                onMouseEnter={(e) => e.target.style.color = '#1E9E7E'}
                onMouseLeave={(e) => e.target.style.color = '#27BB97'}
              >
                Shop Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForSaleCategories;