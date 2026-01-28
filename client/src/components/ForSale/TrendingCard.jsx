import React from 'react';
import { FaClock, FaStar, FaEye, FaHeart } from 'react-icons/fa';

const TrendingCard = ({ product, wishlist, toggleWishlist }) => {
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

  return (
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
};

export default TrendingCard;