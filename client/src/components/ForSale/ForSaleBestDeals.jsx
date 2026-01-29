import React, { useState } from 'react';
import { FaClock, FaEye, FaHeart } from 'react-icons/fa';

const ForSaleBestDeals = () => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

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
    button: "bg-[#27BB97] hover:bg-[#1fa582] text-white text-xs px-3 py-1.5 rounded transition",
    tagsContainer: "flex flex-wrap gap-1.5 mt-2",
    tag: "text-xs bg-[#27BB97]/10 text-[#27BB97] px-2 py-0.5 rounded-full"
  };

  return (
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
  );
};

export default ForSaleBestDeals;