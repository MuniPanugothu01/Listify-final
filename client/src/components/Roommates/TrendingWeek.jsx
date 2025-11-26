import React from "react";
import { Heart, Star, MapPin, CheckCircle, Users, Bath, Square, Zap } from "lucide-react";

const trendingData = [
  {
    id: 1,
    title: "Premium Master Bedroom • Manhattan",
    price: "$1,850 / mo",
    rating: 4.8,
    reviews: 42,
    saves: "124 saved",
    area: "Upper East Side",
    distance: "0.8 miles away",
    img: "/trendingimg.jpg",
    roommates: 2,
    bathrooms: 1,
    size: 450,
    verified: true,
    available: "Aug 15, 2024",
    amenities: ["Furnished", "Utilities Included", "Laundry"],
    featured: true,
  },
  {
    id: 2,
    title: "Spacious Shared Room • Brooklyn",
    price: "$950 / mo",
    rating: 4.4,
    reviews: 28,
    saves: "98 saved",
    area: "Williamsburg",
    distance: "1.5 miles away",
    img: "/trendingimg.jpg",
    roommates: 1,
    bathrooms: 1,
    size: 320,
    verified: true,
    available: "Immediate",
    amenities: ["Furnished", "Balcony"],
    featured: false,
  },
  {
    id: 3,
    title: "Cozy Private Room • Queens",
    price: "$1,250 / mo",
    rating: 4.6,
    reviews: 35,
    saves: "73 saved",
    area: "Astoria",
    distance: "2.1 miles away",
    img: "/trendingimg.jpg",
    roommates: 3,
    bathrooms: 2,
    size: 380,
    verified: false,
    available: "Sep 1, 2024",
    amenities: ["Utilities Included", "Parking"],
    featured: false,
  },
  {
    id: 4,
    title: "Modern Private Studio • Jersey City",
    price: "$2,350 / mo",
    rating: 4.9,
    reviews: 67,
    saves: "141 saved",
    area: "Newport",
    distance: "0.4 miles away",
    img: "/trendingimg.jpg",
    roommates: 0,
    bathrooms: 1,
    size: 520,
    verified: true,
    available: "Aug 20, 2024",
    amenities: ["Furnished", "Gym", "Pool", "Utilities Included"],
    featured: true,
  },
];

const TrendingWeek = () => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-12 bg-white max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div className="flex-1">
    
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
            Trending This Week in New York
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Discover the most viewed, saved, and contacted rooms in the city this week
          </p>
        </div>

        <button className="text-[#25676D] hover:text-[#14494D] font-semibold text-sm cursor-pointer whitespace-nowrap flex items-center gap-1 transition-colors duration-200">
          View All Trending
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingData.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg 
                       transition-all duration-300 hover:-translate-y-2 
                       border border-gray-100 overflow-hidden group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={room.img}
                alt={room.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />

              {/* Featured Badge */}
              {room.featured && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  FEATURED
                </div>
              )}

              {/* Verified Badge */}
              {room.verified && (
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow text-xs font-semibold text-green-600 flex items-center gap-1.5">
                  <CheckCircle size={14} className="fill-green-100" />
                  Verified
                </div>
              )}

              {/* Availability Badge */}
              <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-md text-xs font-medium ${
                room.available === "Immediate" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-blue-100 text-blue-700"
              }`}>
                {room.available}
              </div>

              {/* Save Button */}
              <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition-all duration-200 hover:scale-110 group/save">
                <Heart size={18} className="text-gray-600 group-hover/save:text-red-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Title and Price */}
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-gray-900 text-base leading-tight flex-1">
                  {room.title}
                </h3>
                <p className="text-[#25676D] font-bold text-lg whitespace-nowrap">
                  {room.price}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={15} fill="currentColor" stroke="currentColor" />
                  <span className="text-gray-800 font-semibold text-sm">{room.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">({room.reviews} reviews)</span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-500 text-sm">{room.saves}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={15} className="text-gray-400" />
                <span>{room.area} • {room.distance}</span>
              </div>

              {/* Property Details */}
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-gray-400" />
                  <span>{room.roommates === 0 ? "Studio" : `${room.roommates} roommates`}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={14} className="text-gray-400" />
                  <span>{room.bathrooms} bath{room.bathrooms !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square size={14} className="text-gray-400" />
                  <span>{room.size} sq ft</span>
                </div>
              </div>

              {/* Amenities */}
              {room.amenities && room.amenities.length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button className="w-full bg-[#27bb97] hover:bg-[#27bb80] text-white py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 mt-2">
                Contact Owner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingWeek;