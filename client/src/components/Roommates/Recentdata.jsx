import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Heart,
  Share2,
} from "lucide-react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const Recentdata = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllProperties, setShowAllProperties] = useState(false);

  const properties = [
    {
      id: 1,
      image: "/roomcard1.jpg",
      title: "Premium Single Room with Attached Bath",
      price: "₹6,500",
      originalPrice: "₹7,500",
      location: "Kukatpally, Hyderabad",
      distance: "2 km from Metro",
      rating: 4.5,
      reviews: 128,
      amenities: ["Single Bed", "Attached Bath", "WiFi", "AC"],
      verified: true,
      discount: "13% off",
      availableFrom: "Immediate",
    },
    {
      id: 2,
      image: "/roomcard2.1.jpg",
      title: "2 Sharing Room with Study Desk",
      price: "₹4,000",
      originalPrice: "₹4,800",
      location: "Madhapur, Hyderabad",
      distance: "500m from HITEC City",
      rating: 4.2,
      reviews: 89,
      amenities: ["Single Bed", "Study Table", "WiFi", "Common Bath"],
      verified: true,
      discount: "17% off",
      availableFrom: "15 Dec",
    },
    {
      id: 3,
      image: "/roomcard3.jpg",
      title: "Luxury Fully Furnished AC Room",
      price: "₹8,000",
      originalPrice: "₹9,500",
      location: "Ameerpet, Hyderabad",
      distance: "1 km from Metro",
      rating: 4.8,
      reviews: 203,
      amenities: ["Single Bed", "Attached Bath", "WiFi", "AC", "TV"],
      verified: true,
      discount: "16% off",
      availableFrom: "Immediate",
    },
    {
      id: 4,
      image: "/roomcard4.jpg",
      title: "Private Studio Apartment",
      price: "₹12,000",
      originalPrice: "₹14,000",
      location: "Gachibowli, Hyderabad",
      distance: "Near Tech Parks",
      rating: 4.7,
      reviews: 156,
      amenities: ["Double Bed", "Private Bath", "Kitchen", "WiFi", "AC"],
      verified: true,
      discount: "14% off",
      availableFrom: "1 Jan",
    },
    {
      id: 5,
      image: "/roomcard5.jpg",
      title: "Spacious 3 Sharing Room",
      price: "₹3,500",
      originalPrice: "₹4,200",
      location: "SR Nagar, Hyderabad",
      distance: "1.2 km from Metro",
      rating: 4.0,
      reviews: 67,
      amenities: ["Single Bed", "Common Bath", "WiFi", "Kitchen"],
      verified: true,
      discount: "17% off",
      availableFrom: "Immediate",
    },
    {
      id: 6,
      image: "/roomcard6.jpg",
      title: "Independent Room with Balcony",
      price: "₹7,500",
      originalPrice: "₹8,500",
      location: "Begumpet, Hyderabad",
      distance: "800m from Metro",
      rating: 4.3,
      reviews: 94,
      amenities: ["Single Bed", "Attached Bath", "WiFi", "Balcony"],
      verified: true,
      discount: "12% off",
      availableFrom: "20 Dec",
    },
    {
      id: 7,
      image: "/roomcard7.jpg",
      title: "Deluxe AC Room with Kitchenette",
      price: "₹9,000",
      originalPrice: "₹10,500",
      location: "Hitech City, Hyderabad",
      distance: "300m from Tech Park",
      rating: 4.6,
      reviews: 178,
      amenities: ["Single Bed", "Attached Bath", "WiFi", "AC", "Kitchenette"],
      verified: true,
      discount: "14% off",
      availableFrom: "Immediate",
    },
    {
      id: 8,
      image: "/roomcard8.jpg",
      title: "Budget Friendly Shared Room",
      price: "₹2,800",
      originalPrice: "₹3,500",
      location: "KPHB, Hyderabad",
      distance: "1.5 km from Metro",
      rating: 3.9,
      reviews: 45,
      amenities: ["Single Bed", "Common Bath", "WiFi", "Common Kitchen"],
      verified: true,
      discount: "20% off",
      availableFrom: "Immediate",
    },
    {
      id: 9,
      image: "/roomcard9.jpg",
      title: "Executive Studio with Balcony",
      price: "₹15,000",
      originalPrice: "₹17,000",
      location: "Jubilee Hills, Hyderabad",
      distance: "Near Film Nagar",
      rating: 4.9,
      reviews: 234,
      amenities: ["Double Bed", "Attached Bath", "WiFi", "AC", "Balcony", "TV"],
      verified: true,
      discount: "12% off",
      availableFrom: "25 Dec",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3) % properties.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 3 + properties.length) % properties.length
    );
  };

  const handleViewMore = (e) => {
    e.preventDefault();
    setShowAllProperties(true);
  };

  const handleViewLess = (e) => {
    e.preventDefault();
    setShowAllProperties(false);
    // Scroll to top of the section for better UX
    window.scrollTo({
      top: document.getElementById('recent-properties').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const visibleProperties = showAllProperties 
    ? properties 
    : properties.slice(currentIndex, currentIndex + 3);

  const PropertyCard = ({ property }) => (
    <div
      key={property.id}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            {property.discount}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Price and Rating */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-800">
                {property.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {property.originalPrice}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-800">
              {property.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({property.reviews})
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">
            {property.distance}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {property.verified && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                Verified ✓
              </span>
            )}
            <span className="text-xs text-gray-500">
              {property.availableFrom}
            </span>
          </div>
          <button className="px-4 py-2 bg-[#25676D] text-white text-sm font-semibold rounded-lg hover:bg-[#1a4d52] transition-colors cursor-pointer">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-35" id="recent-properties">
      {/* Heading Section */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 max-w-3xl mx-auto">
          <h1 className="font-extrabold text-4xl mb-4">
            Recent Property For Rent!
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#25676D] to-[#2D8690] mt-3 rounded-full mx-auto"></div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          New listings added every day. Explore rooms, shared spaces, and
          budget-friendly rentals.
        </p>
      </div>

      {/* Navigation Header with View More */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex justify-end items-end mb-4">
          {/* View More Link */}
          {!showAllProperties && (
            <button
              onClick={handleViewMore}
              className="flex items-center gap-2 text-[#25676D] font-semibold hover:text-[#1a4d52] hover:underline transition-colors"
            >
              View More
              <FaArrowRightLong className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Cards Grid */}
        <div className="relative">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${showAllProperties ? 'mb-8' : ''}`}>
            {visibleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Only show when not viewing all properties */}
        {!showAllProperties && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
          </div>
        )}

        {/* View Less Link - Show when viewing all properties */}
        {showAllProperties && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewLess}
              className="flex items-center gap-2 text-[#25676D] font-semibold hover:text-[#1a4d52] hover:underline transition-colors"
            >
              <FaArrowLeftLong className="w-4 h-4" />
              View Less
            </button>
          </div>
        )}

      
      </div>
    </div>
  );
};

export default Recentdata;