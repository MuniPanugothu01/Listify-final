import React from "react";
import {
  Heart,
  Star,
  MapPin,
  CheckCircle,
  Users,
  Bath,
  Square,
  Calendar,
} from "lucide-react";

const trendingData = [
  {
    id: 1,
    title: "Luxury Downtown Apartment • Manhattan",
    price: "$3,850 / mo",
    rating: 4.8,
    reviews: 42,
    saves: "124 saved",
    area: "Upper East Side",
    distance: "0.8 miles away",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    verified: true,
    available: "Aug 15, 2024",
    amenities: ["Furnished", "Pool", "Gym", "Concierge"],
    featured: true,
    type: "Apartment",
    label: "For Rent",
  },
  {
    id: 2,
    title: "Modern Family House • Brooklyn",
    price: "$4,950 / mo",
    rating: 4.4,
    reviews: 28,
    saves: "98 saved",
    area: "Williamsburg",
    distance: "1.5 miles away",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
    bedrooms: 4,
    bathrooms: 3,
    size: 2400,
    verified: true,
    available: "Immediate",
    amenities: ["Garage", "Garden", "Hardwood Floors"],
    featured: false,
    type: "House",
    label: "For Rent",
  },
  {
    id: 3,
    title: "Waterfront Townhouse • Queens",
    price: "$5,250 / mo",
    rating: 4.6,
    reviews: 35,
    saves: "73 saved",
    area: "Astoria",
    distance: "2.1 miles away",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
    bedrooms: 3,
    bathrooms: 2.5,
    size: 1800,
    verified: false,
    available: "Sep 1, 2024",
    amenities: ["Water View", "Patio", "Modern Kitchen"],
    featured: false,
    type: "Townhouse",
    label: "For Rent",
  },
  {
    id: 4,
    title: "Executive Penthouse • Jersey City",
    price: "$8,350 / mo",
    rating: 4.9,
    reviews: 67,
    saves: "141 saved",
    area: "Newport",
    distance: "0.4 miles away",
    img: "https://images.unsplash.com/photo-1540518614846-7eded102d7bf?w=600&h=400&fit=crop",
    bedrooms: 3,
    bathrooms: 3,
    size: 2200,
    verified: true,
    available: "Aug 20, 2024",
    amenities: ["Rooftop Terrace", "Wine Cellar", "Smart Home", "Valet"],
    featured: true,
    type: "Condominium",
    label: "For Rent",
  },
  {
    id: 5,
    title: "Urban Loft Style • Soho",
    price: "$2,950 / mo",
    rating: 4.3,
    reviews: 45,
    saves: "89 saved",
    area: "Soho",
    distance: "0.3 miles away",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    size: 950,
    verified: true,
    available: "Immediate",
    amenities: ["Exposed Brick", "High Ceilings", "Industrial Design"],
    featured: false,
    type: "Loft",
    label: "For Rent",
  },
  {
    id: 6,
    title: "Suburban Family Home • Staten Island",
    price: "$5,200 / mo",
    rating: 4.5,
    reviews: 34,
    saves: "76 saved",
    area: "Todt Hill",
    distance: "3.2 miles away",
    img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=400&fit=crop",
    bedrooms: 5,
    bathrooms: 4,
    size: 3200,
    verified: true,
    available: "Nov 15, 2024",
    amenities: ["Double Garage", "Finished Basement", "Large Backyard"],
    featured: false,
    type: "House",
    label: "For Rent",
  },
  {
    id: 7,
    title: "Lakeside Retreat • Upstate",
    price: "$6,800 / mo",
    rating: 4.9,
    reviews: 23,
    saves: "112 saved",
    area: "Lake George",
    distance: "150 miles away",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    bedrooms: 4,
    bathrooms: 3,
    size: 2800,
    verified: true,
    available: "Seasonal",
    amenities: ["Lake Access", "Dock", "Hot Tub", "Gourmet Kitchen"],
    featured: true,
    type: "House",
    label: "For Rent",
  },
  {
    id: 8,
    title: "Modern Studio • Manhattan",
    price: "$2,200 / mo",
    rating: 4.2,
    reviews: 112,
    saves: "156 saved",
    area: "Upper West Side",
    distance: "0.7 miles away",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    size: 650,
    verified: true,
    available: "Immediate",
    amenities: ["All Utilities", "Furnished Option", "Gym Access"],
    featured: false,
    type: "Studio",
    label: "For Rent",
  },
];

const TrendingWeek = () => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-12 bg-white max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
            Trending Rental Homes This Week
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Discover the most viewed, saved, and contacted rental properties in
            NYC this week
          </p>
        </div>

        <button className="text-[#27bb97] hover:text-[#1fa987] font-semibold text-sm cursor-pointer whitespace-nowrap flex items-center gap-1 transition-colors duration-200">
          View All Trending
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingData.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg 
                       transition-all duration-300 hover:-translate-y-1 
                       border border-gray-100 overflow-hidden group"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={property.img}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />

              {/* Label Badge */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow text-xs font-semibold text-gray-700">
                {property.label}
              </div>

              {/* Save Button */}
              <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition-all duration-200 hover:scale-110 group/save">
                <Heart
                  size={18}
                  className="text-gray-600 group-hover/save:text-red-500"
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
              {/* Title and Price */}
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-gray-900 text-base leading-tight flex-1">
                  {property.title}
                </h3>
                <p className="text-[#27bb97] font-bold text-lg whitespace-nowrap">
                  {property.price}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={15} fill="currentColor" stroke="currentColor" />
                  <span className="text-gray-800 font-semibold text-sm">
                    {property.rating}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  ({property.reviews} reviews)
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-500 text-sm">{property.saves}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={15} className="text-gray-400" />
                <span>
                  {property.area} • {property.distance}
                </span>
              </div>

              {/* Availability Date - Moved to card body */}
              <div className="flex items-center justify-between ">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    property.available === "Immediate" ||
                    property.available === "Seasonal"
                      ? " text-green-700 border border-green-100"
                      : " text-blue-700 border border-blue-100  "
                  }`}
                >
                  <Calendar size={12} />
                  <span>
                    {property.available === "Immediate"
                      ? "Available Now"
                      : property.available === "Seasonal"
                        ? "Seasonal Rental"
                        : `Available ${property.available}`}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-gray-400" />
                  <span>
                    {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={14} className="text-gray-400" />
                  <span>
                    {property.bathrooms} bath
                    {property.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Square size={14} className="text-gray-400" />
                  <span>{property.size.toLocaleString()} sq ft</span>
                </div>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button className="w-full bg-[#27bb97] hover:bg-[#1fa987] text-white py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 mt-3 cursor-pointer">
                Schedule Viewing
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingWeek;
