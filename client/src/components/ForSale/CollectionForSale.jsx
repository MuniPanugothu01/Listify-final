import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function CollectionForSale() {
  const collections = [
    {
      category: 'Smartphones',
      items: [
        { name: 'iPhone 15 Pro Max', price: '$899', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop' },
        { name: 'Samsung Galaxy S24', price: '$799', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop' },
        { name: 'Google Pixel 8 Pro', price: '$699', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-gray-800', 'bg-blue-900', 'bg-green-700']
    },
    {
      category: 'Laptops & Computers',
      items: [
        { name: 'MacBook Pro M3', price: '$1,299', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
        { name: 'Dell XPS 15', price: '$1,199', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop' },
        { name: 'HP Spectre x360', price: '$999', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-silver-400', 'bg-gray-600', 'bg-blue-800']
    },
    {
      category: 'Audio & Headphones',
      items: [
        { name: 'Sony WH-1000XM5', price: '$349', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
        { name: 'AirPods Pro 2', price: '$249', image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop' },
        { name: 'Bose QuietComfort', price: '$329', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-black', 'bg-white border', 'bg-slate-700']
    },
    {
      category: 'Gaming Consoles',
      items: [
        { name: 'PlayStation 5', price: '$499', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop' },
        { name: 'Xbox Series X', price: '$499', image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop' },
        { name: 'Nintendo Switch OLED', price: '$349', image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-blue-800', 'bg-green-700', 'bg-red-600']
    },
    {
      category: 'Smart Watches',
      items: [
        { name: 'Apple Watch Series 9', price: '$399', image: 'https://images.unsplash.com/photo-1579586337278-3f576cfc5113?w=400&h=300&fit=crop' },
        { name: 'Samsung Galaxy Watch 6', price: '$299', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
        { name: 'Fitbit Sense 2', price: '$299', image: 'https://images.unsplash.com/photo-1523475496153-2d1d5d8f5cf4?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-gray-800', 'bg-black', 'bg-blue-600']
    },
    {
      category: 'Cameras & Photography',
      items: [
        { name: 'Sony A7 IV', price: '$2,499', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop' },
        { name: 'Canon EOS R5', price: '$3,899', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop' },
        { name: 'GoPro Hero 12', price: '$399', image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-black', 'bg-red-600', 'bg-blue-800']
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Shop Electronics <span className="gradient-text">By Category</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Discover premium electronics across all categories, from smartphones to gaming consoles
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {collections.map((collection, i) => (
            <div key={i} className="hover-lift">
              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-full">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={collection.items[0].image}
                    alt={collection.items[0].name}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded" style={{ backgroundColor: '#27BB97' }}>
                    Used
                  </div>
                 
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{collection.category}</h3>
                    <div className="flex gap-1.5">
                      {collection.colors.map((color, colorIdx) => (
                        <div key={colorIdx} className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${color}`} />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{collection.items[0].name}</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{collection.items[0].price}</p>
                      <p className="text-xs text-gray-500 mt-1">Good condition • 2 days ago</p>
                    </div>
                    <button 
                      className="text-sm font-medium hover:underline transition-colors"
                      style={{ color: '#27BB97' }}
                      onMouseEnter={(e) => e.target.style.color = '#1E9E7E'}
                      onMouseLeave={(e) => e.target.style.color = '#27BB97'}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button 
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
            style={{ 
              border: '2px solid #27BB97',
              color: '#27BB97',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#27BB97';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#27BB97';
            }}
          >
            View All Electronics
          </button>
        </div>
      </div>
    </section>
  );
}