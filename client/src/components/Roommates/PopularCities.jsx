import React from "react";
import { MapPin, Users, TrendingUp, ArrowRight, Star, Home } from "lucide-react";

const cities = [
  {
    name: "Hyderabad",
    image: "https://images.unsplash.com/photo-1590336425108-482c4c131f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    listings: "1,240+ Rooms",
    seekers: "2.1K people searching",
    growth: "+18% this month",
    rating: 4.8,
    reviews: 1240,
    popularAreas: ["HITEC City", "Gachibowli", "Banjara Hills"],
    type: "Tech Hub"
  },
  {
    name: "Bangalore",
    image: "https://images.unsplash.com/photo-1529254479751-fbacb4c3b098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    listings: "1,850+ Rooms",
    seekers: "3.4K people searching",
    growth: "+24% this month",
    rating: 4.9,
    reviews: 1850,
    popularAreas: ["Koramangala", "Indiranagar", "Whitefield"],
    type: "Startup Capital"
  },
  {
    name: "Chennai",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    listings: "920+ Rooms",
    seekers: "1.3K people searching",
    growth: "+12% this month",
    rating: 4.7,
    reviews: 920,
    popularAreas: ["Anna Nagar", "T. Nagar", "OMR"],
    type: "Cultural Hub"
  },
  {
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1567599668326-2a3e1d5b7aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    listings: "2,300+ Rooms",
    seekers: "4.1K people searching",
    growth: "+31% this month",
    rating: 4.8,
    reviews: 2300,
    popularAreas: ["Andheri", "Bandra", "Powai"],
    type: "Financial Capital"
  },
];

const PopularCities = () => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-16 bg-gradient-to-br from-gray-25 to-gray-50 max-w-8xl mx-auto">
      
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
           
            <div>
             
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                Popular Cities & Areas
              </h2>
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Discover the most sought-after locations with premium verified rooms and active roommate communities
          </p>
        </div>

          <button className="text-[#25676D] hover:text-[#14494D] hover:underline font-semibold text-sm cursor-pointer flex items-center gap-1 group">
          View All Citires 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Enhanced Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow border border-gray-100 
                       transition-all overflow-hidden"
          >
            
            {/* Main City Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80`;
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* City Type Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                <span className="text-xs font-semibold text-gray-700">{city.type}</span>
              </div>
              
              {/* Growth Badge */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <TrendingUp size={10} />
                {city.growth}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* City Name and Main Stats */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                  <p className="text-lg font-semibold text-[#25676D] mt-1">{city.listings}</p>
                </div>
                
                {/* Rating on Right Side */}
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 px-2 py-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900 text-sm">{city.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">{city.reviews.toLocaleString()} reviews</span>
                </div>
              </div>

              {/* People Searching */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <Users size={14} className="text-gray-400" />
                <span>{city.seekers}</span>
              </div>

              {/* Popular Areas */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 font-medium mb-2 flex items-center gap-1">
                  <Home size={12} />
                  POPULAR AREAS
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {city.popularAreas.map((area, areaIndex) => (
                    <span
                      key={areaIndex}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-[#25676D] to-[#14494D] text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg  flex items-center justify-center gap-2 ">
                Explore Rooms
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default PopularCities;