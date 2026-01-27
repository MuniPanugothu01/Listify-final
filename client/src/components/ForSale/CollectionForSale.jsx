import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function CollectionForSale() {
  const collections = [
    {
      category: 'Home & Living',
      items: [
        { name: 'Modern Sofa Set', price: '$299', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
        { name: 'Smart Coffee Table', price: '$129', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
        { name: 'Leather Recliner', price: '$199', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-yellow-600', 'bg-gray-800', 'bg-brown-700']
    },
    {
      category: 'Kitchen Essentials',
      items: [
        { name: 'Cookware Set', price: '$89', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
        { name: 'Coffee Maker', price: '$45', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' },
        { name: 'Blender Set', price: '$65', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-silver-400', 'bg-red-500', 'bg-gray-300']
    },
    {
      category: 'Fashion & Apparel',
      items: [
        { name: 'Denim Jacket', price: '$45', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop' },
        { name: 'Designer Sneakers', price: '$85', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' },
        { name: 'Leather Handbag', price: '$95', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-blue-600', 'bg-black', 'bg-brown-900']
    },
    {
      category: 'Electronics',
      items: [
        { name: 'Smartphone', price: '$250', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop' },
        { name: 'Laptop', price: '$450', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
        { name: 'Headphones', price: '$75', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-gray-800', 'bg-slate-700', 'bg-blue-900']
    },
    {
      category: 'Outdoor & Garden',
      items: [
        { name: 'Patio Set', price: '$180', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
        { name: 'Garden Tools', price: '$55', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop' },
        { name: 'Outdoor Grill', price: '$120', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-green-800', 'bg-gray-600', 'bg-red-700']
    },
    {
      category: 'Sports & Fitness',
      items: [
        { name: 'Yoga Mat', price: '$25', image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop' },
        { name: 'Dumbbells', price: '$45', image: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=400&h=300&fit=crop' },
        { name: 'Fitness Watch', price: '$85', image: 'https://images.unsplash.com/photo-1579586337278-3f576cfc5113?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-green-600', 'bg-black', 'bg-blue-700']
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Shop By <span className="gradient-text">Category</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Explore diverse collections across all categories, from home essentials to personal care
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
                  {/* Used tag with custom green */}
                  <div className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded" style={{ backgroundColor: '#27BB97' }}>
                    Used
                  </div>
                  {/* Shopping bag icon with custom green */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                    <ShoppingBag style={{ color: '#27BB97' }} className="w-5 h-5 sm:w-6 sm:h-6" />
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
                    {/* View Details button with custom green */}
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

        {/* View All Categories button with custom green */}
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
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
} 