import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaMapMarkerAlt,
  FaRegHeart,
  FaShareAlt,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

const RecentRentals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllProperties, setShowAllProperties] = useState(false);

  // ⭐ Replace this with your Rentals data
  const properties = [
    {
      id: 1,
      image: "/rental1.jpg",
      title: "2BHK Fully Furnished Apartment",
      price: "₹18,000 / month",
      originalPrice: "₹20,000",
      location: "Gachibowli, Hyderabad",
      distance: "Near DLF",
      rating: 4.7,
      reviews: 152,
      amenities: ["2 Bedrooms", "2 Bathrooms", "Furnished", "Parking"],
      verified: true,
      discount: "10% off",
      availableFrom: "Immediate",
    },
    {
      id: 2,
      image: "/rental2.jpg",
      title: "1BHK Apartment with Balcony",
      price: "₹12,500 / month",
      originalPrice: "₹14,000",
      location: "Madhapur, Hyderabad",
      distance: "Near Metro",
      rating: 4.4,
      reviews: 98,
      amenities: ["1 Bedroom", "Balcony", "Lift Access"],
      verified: true,
      discount: "11% off",
      availableFrom: "5 Jan",
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

    window.scrollTo({
      top: document.getElementById("recent-rentals").offsetTop - 100,
      behavior: "smooth",
    });
  };

  const visibleProperties = showAllProperties
    ? properties
    : properties.slice(currentIndex, currentIndex + 3);

  // ------------------------------------
  // PROPERTY CARD COMPONENT
  // ------------------------------------
  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            {property.discount}
          </span>
        </div>

        {/* Heart + Share Icons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
            <FaRegHeart className="text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
            <FaShareAlt className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price + Ratings */}
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">
              {property.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {property.originalPrice}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
            <FaStar className="text-yellow-400" />
            <span className="text-sm font-semibold text-gray-800">
              {property.rating}
            </span>
            <span className="text-xs text-gray-500">({property.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaMapMarkerAlt className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{property.distance}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities?.map((amenity, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t pt-3">
          <div className="flex items-center gap-2">
            {property.verified && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                Verified ✓
              </span>
            )}
            <span className="text-xs text-gray-500">
              {property.availableFrom}
            </span>
          </div>

          <button className="px-4 py-2 bg-[#25676D] text-white text-sm font-semibold rounded-lg hover:bg-[#1a4d52] transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  // ------------------------------------
  // MAIN RETURN
  // ------------------------------------
  return (
    <div className="mt-35" id="recent-rentals">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-extrabold text-4xl mb-4">Recent Rentals!</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#25676D] to-[#2D8690] mx-auto rounded-full"></div>
        <p className="text-gray-600 text-lg mt-4">
          Explore the latest apartments and houses available for rent.
        </p>
      </div>

      {/* View More */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex justify-end">
        {!showAllProperties && (
          <button
            onClick={handleViewMore}
            className="flex items-center gap-2 text-[#25676D] font-semibold hover:underline"
          >
            View More <FaArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        {/* Navigation */}
        {!showAllProperties && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 bg-white border rounded-full shadow-sm hover:shadow-md"
            >
              <FaChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="p-3 bg-white border rounded-full shadow-sm hover:shadow-md"
            >
              <FaChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* View Less */}
        {showAllProperties && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewLess}
              className="flex items-center gap-2 text-[#25676D] font-semibold hover:underline"
            >
              <FaArrowLeft className="w-4 h-4" /> View Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentRentals;
