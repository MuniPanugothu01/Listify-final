import React from 'react';

const ForSaleCollections = () => {
  const collections = [
    {
      category: 'Toys & Games',
      items: [
        { name: 'LEGO Classic Brick Box', price: '$39.99', image: 'https://images.unsplash.com/photo-1587654780298-8c6d6b2c8b2a?w=400&h=300&fit=crop' },
        { name: 'Professional Drone', price: '$299', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop' },
        { name: 'Board Games Set', price: '$45', image: 'https://images.unsplash.com/photo-1585647347483-22b6a3c3ba30?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-blue-500', 'bg-red-500', 'bg-green-500']
    },
    {
      category: 'Furniture',
      items: [
        { name: 'Premium Study Table', price: '$149', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
        { name: 'Ergonomic Office Chair', price: '$199', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
        { name: 'Designer Bookshelf', price: '$199', image: 'https://images.unsplash.com/photo-1555041469-30b6dbaee6d5?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-amber-600', 'bg-gray-600', 'bg-brown-600']
    },
    {
      category: 'Books',
      items: [
        { name: 'Harry Potter Collection', price: '$79', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop' },
        { name: 'Cooking Book Set', price: '$35', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop' },
        { name: 'Classic Novels', price: '$49', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-green-600', 'bg-brown-800', 'bg-blue-700']
    },
    {
      category: 'Kitchenware',
      items: [
        { name: 'Complete Cookware Set', price: '$129', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
        { name: 'Kitchen Knife Set', price: '$79', image: 'https://images.unsplash.com/photo-1594736797933-d0d5f0e8230e?w=400&h=300&fit=crop' },
        { name: 'Coffee Maker', price: '$109', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-red-500', 'bg-gray-800', 'bg-blue-800']
    },
    {
      category: 'Home Decor',
      items: [
        { name: 'Modern Wall Art Set', price: '$89', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop' },
        { name: 'Modern Wall Clock', price: '$45', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop' },
        { name: 'Throw Pillows Set', price: '$58', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-purple-600', 'bg-gray-800', 'bg-pink-500']
    },
    {
      category: 'Gardening',
      items: [
        { name: 'Gardening Tool Kit', price: '$59', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=300&fit=crop' },
        { name: 'Plant Pots Set', price: '$32', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=300&fit=crop' },
        { name: 'Outdoor Set', price: '$199', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-emerald-600', 'bg-green-700', 'bg-brown-700']
    },
  ];

  const trendingCardStyles = {
    card: "bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group w-full border border-gray-200",
    imageContainer: "relative overflow-hidden h-40",
    image: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
    badge: "absolute top-2 left-2 bg-[#27BB97] text-white text-xs font-bold px-2 py-1 rounded-full",
  };

  return (
    <section className="py-12 px-8 bg-white">
      <div className="">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop Collections</h2>
          <p className="text-gray-600">Browse curated collections of household items</p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {collections.map((collection, i) => (
            <div key={i} className={trendingCardStyles.card}>
              <div className={trendingCardStyles.imageContainer}>
                <img
                  src={collection.items[0].image}
                  alt={collection.items[0].name}
                  className={trendingCardStyles.image}
                />
                <span className={trendingCardStyles.badge}>
                  Used
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-gray-900">{collection.category}</h3>
                  <div className="flex gap-1.5">
                    {collection.colors.map((color, colorIdx) => (
                      <div key={colorIdx} className={`w-3 h-3 rounded-full ${color}`} />
                    ))}
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm">{collection.items[0].name}</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold text-gray-900">{collection.items[0].price}</p>
                    <p className="text-xs text-gray-500 mt-1">Good condition • 2 days ago</p>
                  </div>
                  <button 
                    className="text-xs font-medium transition-colors"
                    style={{ color: '#27BB97' }}
                    onMouseEnter={(e) => e.target.style.color = '#1E9E7E'}
                    onMouseLeave={(e) => e.target.style.color = '#27BB97'}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            className="px-6 py-2.5 rounded-md font-medium transition-colors text-sm border"
            style={{ 
              borderColor: '#27BB97',
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
            View All Collections
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForSaleCollections;