import React from 'react';
import { ShoppingBag } from 'lucide-react';
import ForSaleRecommended from './ForSaleRecommend.jsx';
import ForSaleFaq from './ForSaleFaq.jsx';

export default function ForSale() {
  const collections = [
    {
      category: 'Best Sale',
      items: [
        { name: 'Annedale Wood Leg Sofa', price: '$180.00', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
        { name: 'Zuma Outdoor Upholstered', price: '$286.00', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop' },
        { name: 'Traveling Leather Curved Chair', price: '$108.00', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-yellow-600', 'bg-gray-800', 'bg-amber-700']
    },
    {
      category: 'Top Rated',
      items: [
        { name: 'Annedale Wood Leg Sofa', price: '$180.00', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
        { name: 'Zuma Outdoor Upholstered', price: '$286.00', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop' },
        { name: 'Traveling Leather Curved Chair', price: '$108.00', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-gray-700', 'bg-gray-500', 'bg-gray-300']
    },
    {
      category: 'Best Price',
      items: [
        { name: 'Annedale Wood Leg Sofa', price: '$180.00', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
        { name: 'Zuma Outdoor Upholstered', price: '$286.00', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop' },
        { name: 'Traveling Leather Curved Chair', price: '$108.00', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-yellow-600', 'bg-amber-800', 'bg-amber-900']
    },
    {
      category: 'Top Rated',
      items: [
        { name: 'Powell Lounge Chair', price: '$200.00', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
        { name: 'Infinite Swivel Chair', price: '$695.00', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop' },
        { name: 'Corus Grayson', price: '$220.00', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-yellow-600', 'bg-gray-800', 'bg-amber-700']
    },
    {
      category: 'Best Price',
      items: [
        { name: 'Powell Lounge Chair', price: '$200.00', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
        { name: 'Infinite Swivel Chair', price: '$695.00', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop' },
        { name: 'Corus Grayson', price: '$220.00', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-gray-700', 'bg-gray-500', 'bg-gray-900']
    },
    {
      category: 'Best Sale',
      items: [
        { name: 'Powell Lounge Chair', price: '$200.00', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
        { name: 'Infinite Swivel Chair', price: '$695.00', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop' },
        { name: 'Corus Grayson', price: '$220.00', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-yellow-600', 'bg-amber-800', 'bg-amber-900']
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[550px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <img
          src="/for-sale-2.jpg"
          alt="Modern living room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 bg-opacity-30" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">
            Find The Perfect Furniture To Complete Your Home
          </h1>
          <p className="text-white text-base md:text-lg mb-8 max-w-2xl">
            We focus on buying and selling high quality undamaged furniture to ensure that you are meeting the global reselling.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
          
          <div className="absolute bottom-8">
            <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Our New Collections Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our New Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest furniture pieces designed to bring style, comfort, and functionality to every room in your home.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collections.map((collection, idx) => (
            <div key={idx} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{collection.category}</h3>
                <div className="flex gap-1.5">
                  {collection.colors.map((color, colorIdx) => (
                    <div key={colorIdx} className={`w-4 h-4 rounded-full ${color}`} />
                  ))}
                </div>
              </div>

              {/* Product Card */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] bg-gray-100">
                  <img
                    src={collection.items[0].image}
                    alt={collection.items[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {collection.items[0].name}
                    </h4>
                    <p className="text-lg font-semibold text-gray-900">
                      {collection.items[0].price}
                    </p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <ShoppingBag className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors">
            See More Collection
          </button>
        </div>
      </div>


          <ForSaleRecommended/>


          <ForSaleFaq/>

    </div>
  );
}