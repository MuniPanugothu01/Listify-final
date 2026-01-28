import React, { useState } from 'react';
import { 
  FaShoppingCart, FaSearch, FaChevronLeft, FaChevronRight, 
  FaStar, FaTruck, FaShieldAlt, FaSyncAlt, FaHeart,
  FaChair, FaBook, FaUtensils, FaHome, FaSeedling,
  FaFutbol, FaBaby, FaTools, FaGamepad, FaShoppingBag,
  FaCouch, FaFutbol as FaSports, FaChild, FaWrench,
  FaTag, FaClock, FaEye
} from 'react-icons/fa';

export default function ForSaleMarketplace() {
  const [wishlist, setWishlist] = useState([]);

  // Common card styles for trending now design
  const trendingCardStyles = {
    card: "bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group w-full border border-gray-200",
    imageContainer: "relative overflow-hidden h-40",
    image: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
    badge: "absolute top-2 left-2 bg-[#27BB97] text-white text-xs font-bold px-2 py-1 rounded-full",
    wishlistButton: "absolute top-2 right-2 bg-white p-1.5 rounded-full hover:bg-gray-100 transition",
    categoryBadge: "absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded",
    contentContainer: "p-3",
    dateTime: "flex items-center gap-1.5 text-xs text-gray-600 mb-2",
    title: "text-sm font-bold text-gray-900 group-hover:text-[#27BB97] transition line-clamp-2 mb-1",
    location: "text-xs text-gray-600 line-clamp-1 mb-2",
    priceContainer: "flex items-center justify-between",
    price: "text-base font-bold text-[#27BB97]",
    ratingContainer: "flex items-center gap-1 text-xs text-gray-600",
    button: "bg-[#27BB97] hover:bg-[#1fa582] text-white text-xs px-3 py-1.5 rounded transition",
    tagsContainer: "flex flex-wrap gap-1.5 mt-2",
    tag: "text-xs bg-[#27BB97]/10 text-[#27BB97] px-2 py-0.5 rounded-full"
  };

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

  const categories = [
    { name: 'Toys & Games', items: '89 items', icon: <FaGamepad className="text-4xl" />, color: 'bg-blue-50 hover:bg-blue-100' },
    { name: 'Furniture', items: '45 items', icon: <FaChair className="text-4xl" />, color: 'bg-amber-50 hover:bg-amber-100' },
    { name: 'Books', items: '120 items', icon: <FaBook className="text-4xl" />, color: 'bg-green-50 hover:bg-green-100' },
    { name: 'Kitchenware', items: '67 items', icon: <FaUtensils className="text-4xl" />, color: 'bg-red-50 hover:bg-red-100' },
    { name: 'Home Decor', items: '78 items', icon: <FaHome className="text-4xl" />, color: 'bg-purple-50 hover:bg-purple-100' },
    { name: 'Gardening', items: '34 items', icon: <FaSeedling className="text-4xl" />, color: 'bg-emerald-50 hover:bg-emerald-100' },
    { name: 'Sports Gear', items: '41 items', icon: <FaSports className="text-4xl" />, color: 'bg-orange-50 hover:bg-orange-100' },
    { name: 'Baby Items', items: '29 items', icon: <FaChild className="text-4xl" />, color: 'bg-pink-50 hover:bg-pink-100' },
    { name: 'Tools', items: '38 items', icon: <FaWrench className="text-4xl" />, color: 'bg-gray-50 hover:bg-gray-100' },
  ];

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

  const bestDeals = [
    { 
      id: 9,
      name: 'Complete Tool Kit', 
      original: '$129', 
      discounted: '$89', 
      discount: '31%', 
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80',
      category: 'Tools',
      location: 'Hardware Store',
      date: '2024-11-26',
      time: '08:00',
      tag: 'Tools',
      views: '920'
    },
    { 
      id: 10,
      name: 'Board Games Collection', 
      original: '$89', 
      discounted: '$59', 
      discount: '34%', 
      image: 'https://images.unsplash.com/photo-1585647347483-22b6a3c3ba30?w=400&q=80',
      category: 'Toys',
      location: 'Game Store',
      date: '2024-12-04',
      time: '10:00',
      tag: 'Games',
      views: '1.3k'
    },
    { 
      id: 11,
      name: 'Designer Bookshelf', 
      original: '$299', 
      discounted: '$199', 
      discount: '33%', 
      image: 'https://images.unsplash.com/photo-1555041469-30b6dbaee6d5?w=400&q=80',
      category: 'Furniture',
      location: 'Furniture Outlet',
      date: '2024-11-25',
      time: '14:00',
      tag: 'Furniture',
      views: '1.8k'
    },
    { 
      id: 12,
      name: 'Coffee Maker', 
      original: '$159', 
      discounted: '$109', 
      discount: '31%', 
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
      category: 'Kitchenware',
      location: 'Appliance Store',
      date: '2024-12-05',
      time: '09:00',
      tag: 'Kitchen',
      views: '2.1k'
    },
  ];

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Trending Card Component
  const TrendingCard = ({ product }) => (
    <div className={trendingCardStyles.card}>
      <div className={trendingCardStyles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name}
          className={trendingCardStyles.image}
        />
        {product.badge && (
          <span className={trendingCardStyles.badge}>
            {product.badge}
          </span>
        )}
        <button 
          onClick={() => toggleWishlist(product.id)}
          className={trendingCardStyles.wishlistButton}
        >
          <FaHeart className={`w-3.5 h-3.5 ${wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
        </button>
        <span className={trendingCardStyles.categoryBadge}>
          {product.category}
        </span>
      </div>

      <div className={trendingCardStyles.contentContainer}>
        <div className={trendingCardStyles.dateTime}>
          <FaClock className="w-3 h-3" />
          <span>{product.date}</span>
          <span>•</span>
          <span>{product.time}</span>
        </div>

        <h3 className={trendingCardStyles.title}>
          {product.name}
        </h3>
        <p className={trendingCardStyles.location}>
          {product.location}
        </p>

        <div className={trendingCardStyles.priceContainer}>
          <div>
            <p className={trendingCardStyles.price}>
              {product.discounted || product.price}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                {product.originalPrice}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <div className={trendingCardStyles.ratingContainer}>
                <FaStar className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-gray-400">•</span>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <FaEye className="w-3 h-3" />
                <span>{product.views}</span>
              </div>
            </div>
          </div>
          <button className={trendingCardStyles.button}>
            Details
          </button>
        </div>

        <div className={trendingCardStyles.tagsContainer}>
          <span className={trendingCardStyles.tag}>
            #{product.tag}
          </span>
          <span className={trendingCardStyles.tag}>
            #{product.category}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Improved Readability */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with stronger overlay */}
        <div className="absolute inset-0">
          <img
            src="for-sale.jpg"
            alt="Household Items Marketplace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              {/* Promo Badge with better contrast */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 shadow-lg"
                style={{ 
                  backgroundColor: '#27BB97', 
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <FaShoppingBag className="w-4 h-4" />
                <span className="text-sm font-medium">New Collection Just Dropped!</span>
              </div>
              
              {/* Main Heading with better contrast */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Discover Amazing <br />
                <span className="text-[#27BB97]">Household Items</span> <br />
                At Great Prices
              </h1>
              
           
              
              {/* Search Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search for toys, furniture, books, kitchenware..."
                    className="w-full pl-4 pr-4 py-4 rounded-lg text-gray-900 border border-gray-300 focus:border-[#27BB97] focus:outline-none bg-white/95 backdrop-blur-sm shadow-lg"
                  />
                </div>
                <button 
                  className="px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform duration-300"
                  style={{ backgroundColor: '#27BB97', color: 'white' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1E9E7E'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#27BB97'}
                >
                  <FaSearch />
                  Search Now
                </button>
              </div>
            </div>
            
           
          </div>
        </div>
      </section>

     

      {/* Categories Section - Using Trending Card Design */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop By Category</h2>
            <p className="text-gray-600">Browse our wide range of household categories</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

      {/* Shop Collections - Using Trending Card Design */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop Collections</h2>
            <p className="text-gray-600">Browse curated collections of household items</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Trending Products Section */}
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
              <TrendingCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals - Using Trending Card Design */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Today's Best Deals</h2>
            <p className="text-gray-600">Don't miss out on these amazing discounts!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestDeals.map((product) => (
              <div key={product.id} className={trendingCardStyles.card}>
                <div className={trendingCardStyles.imageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={trendingCardStyles.image}
                  />
                  <span className={trendingCardStyles.badge}>
                    -{product.discount}
                  </span>
                  <span className={trendingCardStyles.categoryBadge}>
                    {product.category}
                  </span>
                </div>

                <div className={trendingCardStyles.contentContainer}>
                  <div className={trendingCardStyles.dateTime}>
                    <FaClock className="w-3 h-3" />
                    <span>{product.date}</span>
                    <span>•</span>
                    <span>{product.time}</span>
                  </div>

                  <h3 className={trendingCardStyles.title}>
                    {product.name}
                  </h3>
                  <p className={trendingCardStyles.location}>
                    {product.location}
                  </p>

                  <div className={trendingCardStyles.priceContainer}>
                    <div>
                      <p className={trendingCardStyles.price}>
                        {product.discounted}
                      </p>
                      <p className="text-xs text-gray-400 line-through">
                        {product.original}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaEye className="w-3 h-3" />
                          <span>{product.views}</span>
                        </div>
                      </div>
                    </div>
                    <button className={trendingCardStyles.button}>
                      Buy Now
                    </button>
                  </div>

                  <div className={trendingCardStyles.tagsContainer}>
                    <span className={trendingCardStyles.tag}>
                      #{product.tag}
                    </span>
                    <span className={trendingCardStyles.tag}>
                      Deal
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}