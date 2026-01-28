import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TrendingCard from './TrendingCard';

const ForSaleTrending = ({ wishlist, toggleWishlist }) => {
  const trendingProducts = [
    { 
      id: 1,
      name: 'Professional Drone', 
      price: '$299', 
      originalPrice: '$399',
      rating: 4.7, 
      sold: '128 sold', 
      badge: 'HOT', 
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80',
      category: 'Toys',
      location: 'Electronics Store',
      date: '2024-12-01',
      time: '14:00',
      tag: 'Toys',
      views: '1.2k'
    },
    { 
      id: 2,
      name: 'Ergonomic Office Chair', 
      price: '$199', 
      originalPrice: '$249',
      rating: 4.5, 
      sold: '89 sold', 
      badge: null, 
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
      category: 'Furniture',
      location: 'Furniture Warehouse',
      date: '2024-11-30',
      time: '10:00',
      tag: 'Furniture',
      views: '890'
    },
    { 
      id: 3,
      name: 'Cooking Book Set', 
      price: '$35', 
      originalPrice: '$45',
      rating: 4.7, 
      sold: '56 sold', 
      badge: '25%', 
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
      category: 'Books',
      location: 'Book Store',
      date: '2024-12-02',
      time: '09:00',
      tag: 'Books',
      views: '560'
    },
    { 
      id: 4,
      name: 'Kitchen Knife Set', 
      price: '$79', 
      originalPrice: '$99',
      rating: 4.6, 
      sold: '203 sold', 
      badge: null, 
      image: 'https://images.unsplash.com/photo-1594736797933-d0d5f0e8230e?w=400&q=80',
      category: 'Kitchenware',
      location: 'Kitchen Supplies',
      date: '2024-11-29',
      time: '11:00',
      tag: 'Kitchen',
      views: '1.5k'
    },
    { 
      id: 5,
      name: 'Modern Wall Clock', 
      price: '$45', 
      originalPrice: '$59',
      rating: 4.4, 
      sold: '78 sold', 
      badge: 'NEW', 
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80',
      category: 'Home Decor',
      location: 'Home Decor Store',
      date: '2024-12-03',
      time: '15:00',
      tag: 'Decor',
      views: '780'
    },
    { 
      id: 6,
      name: 'Plant Pots Set', 
      price: '$32', 
      originalPrice: '$42',
      rating: 4.4, 
      sold: '78 sold', 
      badge: null, 
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&q=80',
      category: 'Gardening',
      location: 'Garden Center',
      date: '2024-11-28',
      time: '13:00',
      tag: 'Garden',
      views: '650'
    },
    { 
      id: 7,
      name: 'Yoga Mat Premium', 
      price: '$39', 
      originalPrice: '$49',
      rating: 4.6, 
      sold: '156 sold', 
      badge: '15%', 
      image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&q=80',
      category: 'Sports',
      location: 'Sports Store',
      date: '2024-12-01',
      time: '16:00',
      tag: 'Sports',
      views: '1.1k'
    },
    { 
      id: 8,
      name: 'Baby Stroller', 
      price: '$189', 
      originalPrice: '$229',
      rating: 4.8, 
      sold: '45 sold', 
      badge: null, 
      image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&q=80',
      category: 'Baby',
      location: 'Baby Store',
      date: '2024-11-27',
      time: '12:00',
      tag: 'Baby',
      views: '450'
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            <p className="text-gray-600">What everyone is buying right now</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              className="p-2 border rounded-md transition-colors"
              style={{ borderColor: '#27BB97', color: '#27BB97' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#27BB97';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#27BB97';
              }}
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button 
              className="p-2 border rounded-md transition-colors"
              style={{ borderColor: '#27BB97', color: '#27BB97' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#27BB97';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#27BB97';
              }}
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
            <TrendingCard 
              key={product.id} 
              product={product} 
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForSaleTrending;