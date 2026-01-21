import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaMapMarkerAlt,
  FaRegHeart,
  FaShareAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const RecentRentals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // 15 Properties Data with HD images
  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "2BHK Fully Furnished Apartment",
      price: "₹18,000 / month",
      originalPrice: "₹20,000",
      location: "Gachibowli, Hyderabad",
      distance: "Near DLF",
      rating: 4.7,
      reviews: 152,
      amenities: ["2 Bedrooms", "2 Bathrooms", "Furnished", "Parking", "Gym"],
      verified: true,
      discount: "10% off",
      availableFrom: "Immediate",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "1BHK Apartment with Balcony",
      price: "₹12,500 / month",
      originalPrice: "₹14,000",
      location: "Madhapur, Hyderabad",
      distance: "Near Metro",
      rating: 4.4,
      reviews: 98,
      amenities: ["1 Bedroom", "Balcony", "Lift Access", "Security"],
      verified: true,
      discount: "11% off",
      availableFrom: "5 Jan",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "3BHK Luxury Villa",
      price: "₹45,000 / month",
      originalPrice: "₹50,000",
      location: "Jubilee Hills, Hyderabad",
      distance: "Near Temple",
      rating: 4.9,
      reviews: 210,
      amenities: ["3 Bedrooms", "3 Bathrooms", "Garden", "Swimming Pool"],
      verified: true,
      discount: "10% off",
      availableFrom: "10 Jan",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Studio Apartment for Students",
      price: "₹9,000 / month",
      originalPrice: "₹10,500",
      location: "Kondapur, Hyderabad",
      distance: "Near University",
      rating: 4.2,
      reviews: 76,
      amenities: ["Fully Furnished", "WiFi", "Laundry", "Study Desk"],
      verified: false,
      discount: "14% off",
      availableFrom: "Immediate",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Penthouse with City View",
      price: "₹75,000 / month",
      originalPrice: "₹85,000",
      location: "Banjara Hills, Hyderabad",
      distance: "City Center",
      rating: 4.8,
      reviews: 189,
      amenities: ["4 Bedrooms", "Terrace", "Home Theater", "Jacuzzi"],
      verified: true,
      discount: "12% off",
      availableFrom: "15 Jan",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Executive PG for Professionals",
      price: "₹15,000 / month",
      originalPrice: "₹17,000",
      location: "Hitech City, Hyderabad",
      distance: "IT Park",
      rating: 4.5,
      reviews: 124,
      amenities: ["Meals Included", "Housekeeping", "Gym", "WiFi"],
      verified: true,
      discount: "12% off",
      availableFrom: "Immediate",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Duplex House with Garden",
      price: "₹55,000 / month",
      originalPrice: "₹60,000",
      location: "Manikonda, Hyderabad",
      distance: "Main Road",
      rating: 4.6,
      reviews: 167,
      amenities: ["2 Floors", "Garden", "Car Parking", "Modular Kitchen"],
      verified: true,
      discount: "8% off",
      availableFrom: "20 Jan",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Shared Apartment - Master Bedroom",
      price: "₹11,000 / month",
      originalPrice: "₹13,000",
      location: "Kukatpally, Hyderabad",
      distance: "Near Mall",
      rating: 4.3,
      reviews: 89,
      amenities: ["Shared", "Utilities Included", "Furnished", "Security"],
      verified: false,
      discount: "15% off",
      availableFrom: "Immediate",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Luxury Condo with Pool Access",
      price: "₹65,000 / month",
      originalPrice: "₹70,000",
      location: "Financial District, Hyderabad",
      distance: "Near Corporate Offices",
      rating: 4.8,
      reviews: 234,
      amenities: ["3 Bedrooms", "Pool Access", "Concierge", "Gym", "Spa"],
      verified: true,
      discount: "7% off",
      availableFrom: "1 Feb",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1567496898669-ee935f003f30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Modern 1BHK with Smart Home",
      price: "₹16,500 / month",
      originalPrice: "₹18,000",
      location: "Nanakramguda, Hyderabad",
      distance: "Near Tech Parks",
      rating: 4.6,
      reviews: 143,
      amenities: ["Smart Home", "AC", "Modular Kitchen", "Parking"],
      verified: true,
      discount: "8% off",
      availableFrom: "Immediate",
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Spacious 4BHK Independent House",
      price: "₹85,000 / month",
      originalPrice: "₹95,000",
      location: "Boduppal, Hyderabad",
      distance: "Quiet Residential Area",
      rating: 4.7,
      reviews: 198,
      amenities: ["4 Bedrooms", "Private Garden", "Servant Room", "Parking"],
      verified: true,
      discount: "11% off",
      availableFrom: "25 Jan",
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Budget Studio for Working Professionals",
      price: "₹8,500 / month",
      originalPrice: "₹10,000",
      location: "Miyapur, Hyderabad",
      distance: "Near Metro Station",
      rating: 4.1,
      reviews: 67,
      amenities: ["Compact", "WiFi", "Housekeeping", "Security"],
      verified: false,
      discount: "15% off",
      availableFrom: "Immediate",
    },
    {
      id: 13,
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Premium 2BHK with Clubhouse",
      price: "₹32,000 / month",
      originalPrice: "₹35,000",
      location: "Kokapet, Hyderabad",
      distance: "Gated Community",
      rating: 4.9,
      reviews: 256,
      amenities: ["Clubhouse", "Pool", "Gym", "Tennis Court", "Parking"],
      verified: true,
      discount: "9% off",
      availableFrom: "5 Feb",
    },
    {
      id: 14,
      image:
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Furnished 3BHK with Study",
      price: "₹38,000 / month",
      originalPrice: "₹42,000",
      location: "Nallagandla, Hyderabad",
      distance: "Near Schools",
      rating: 4.4,
      reviews: 112,
      amenities: ["Study Room", "Furnished", "Children's Park", "Power Backup"],
      verified: true,
      discount: "10% off",
      availableFrom: "Immediate",
    },
    {
      id: 15,
      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Luxury Serviced Apartment",
      price: "₹42,000 / month",
      originalPrice: "₹45,000",
      location: "Hitech City, Hyderabad",
      distance: "Walk to Office",
      rating: 4.8,
      reviews: 187,
      amenities: ["Daily Cleaning", "Laundry", "Breakfast", "Gym", "WiFi"],
      verified: true,
      discount: "7% off",
      availableFrom: "Immediate",
    },
  ];

  const nextSlide = () => {
    const maxIndex = properties.length - 3;
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 3);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 3);
    } else {
      setCurrentIndex(Math.max(0, properties.length - 3));
    }
  };

  const handleQuickView = (property) => {
    // Format property data to match RentalDetailsPage structure
    const formattedProperty = {
      id: property.id,
      title: property.title,
      price: parseInt(property.price.replace(/[^0-9]/g, "")) || 0,
      location: property.location,
      distance: property.distance,
      rating: property.rating,
      reviews: property.reviews,
      amenities: property.amenities,
      verified: property.verified,
      discount: property.discount,
      availableFrom: property.availableFrom,
      images: [
        property.image,
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      ],
      immediate: property.availableFrom.toLowerCase().includes("immediate"),
      petFriendly: property.amenities.some((amenity) =>
        amenity.toLowerCase().includes("pet"),
      ),
      propertyType: "Apartment",
      bedrooms: parseInt(
        property.title.match(/(\d+)BHK/)?.[1] ||
          property.title.match(/(\d+)\s*Bed/)?.[1] ||
          "2",
      ),
      bathrooms: parseInt(property.title.match(/(\d+)\s*Bath/)?.[1] || "1"),
      sqft: 1200,
      leaseTerm: "12 months",
      details: `Beautiful ${property.title} in ${property.location}. ${property.distance}. Features ${property.amenities.slice(0, 3).join(", ")} and more.`,
      postedBy: "Property Owner",
      responseRate: "95%",
      views: Math.floor(Math.random() * 1000) + 500,
      saves: Math.floor(Math.random() * 100) + 20,
      contact: "+1-234-567-8900",
      availableForCall: true,
      neighborhood: property.location.split(",")[0],
      busStopDistance: "Bus stop: 0.2 miles",
      posted: "2 days ago",
    };

    // Navigate to rental-details page with property data
    navigate("/rental-details", {
      state: {
        property: formattedProperty,
        searchParams: {
          location: property.location,
          price: property.price,
        },
      },
    });
  };

  const visibleProperties = properties.slice(currentIndex, currentIndex + 3);

  // Property Card Component
  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
            {property.discount}
          </span>
        </div>

        {/* Heart + Share Icons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition hover:scale-110">
            <FaRegHeart className="text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition hover:scale-110">
            <FaShareAlt className="text-gray-600" />
          </button>
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleQuickView(property);
            }}
            className="px-4 py-2 bg-white text-gray-800 text-sm font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition cursor-pointer"
          >
            Quick View
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

          <div className="flex items-center gap-1 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1 rounded-full">
            <FaStar className="text-yellow-400" />
            <span className="text-sm font-semibold text-gray-800">
              {property.rating}
            </span>
            <span className="text-xs text-gray-500">({property.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 hover:text-[#25676D] transition-colors cursor-pointer">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
          <span className="text-sm">{property.location}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{property.distance}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-2">
          {property.amenities?.map((amenity, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t pt-2">
          <div className="flex items-center gap-2">
            {property.verified ? (
              <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs rounded-full font-semibold flex items-center gap-1">
                ✓ Verified
              </span>
            ) : (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                Unverified
              </span>
            )}
            <span className="text-xs text-gray-500">
              From: {property.availableFrom}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleQuickView(property);
            }}
            className="px-4 py-2 bg-gradient-to-r bg-[#27bb97] text-white text-sm font-semibold rounded-lg hover:bg-[#1FA987] transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-16 -mt-14" id="recent-rentals">
      {/* Decorative Background */}
      <div className="absolute left-0 right-0 h-64 bg-gradient-to-b from-blue-50/20 to-transparent -z-10"></div>

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-4 relative">
        <h1 className="font-extrabold text-4xl mb-3 text-gray-900">
          Recent <span className="text-[#25676D]">Rentals in new York</span>
        </h1>
        <div className="h-2 w-32 bg-gradient-to-r from-[#25676D] via-[#2D8690] to-[#25676D] mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our handpicked selection of premium properties with verified
          details and exclusive discounts.
        </p>
      </div>

      {/* View More Button - Just a Link to rentals-listings page */}
      <div className="max-w-7xl mx-auto px-6 mb-1 flex justify-end">
        <Link to="/rentals-listings">
          <button className="flex items-center gap-2 px-6 py-3 text-[#25676D] font-semibold hover:underline cursor-pointer transition">
            View All Properties <FaArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* Cards Grid - Always 3 cards */}
      <div className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        {/* Carousel Navigation Buttons - Centered below cards */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            onClick={prevSlide}
            className="p-4 bg-white border-2 border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:border-[#25676D] transition-all group"
          >
            <FaChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-[#25676D]" />
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.ceil(properties.length / 3) }).map(
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i * 3)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === i * 3
                      ? "bg-[#25676D] w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ),
            )}
          </div>

          <button
            onClick={nextSlide}
            className="p-4 bg-white border-2 border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:border-[#25676D] transition-all group"
          >
            <FaChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[#25676D] cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentRentals;
