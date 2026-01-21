import React, { useState } from "react";
import {
  Home,
  Bath,
  Maximize2,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedRentals = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const handleExploreRentals = () => {
    navigate("/rentals-listings");
  };

  const handleViewDetails = (property) => {
    // Format the property data to match what RentalDetailsPage expects
    const formattedProperty = {
      id: property.id,
      title: property.title,
      price: property.price,
      location: property.location,
      rating: property.rating,
      reviews: property.reviews,
      amenities: property.amenities,
      availableFrom: property.available,
      images: [
        property.image,
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      ],
      immediate: property.available.toLowerCase().includes("immediately"),
      petFriendly: property.amenities.some(amenity => 
        amenity.toLowerCase().includes("pet") || amenity.toLowerCase().includes("pets")
      ),
      propertyType: property.type,
      bedrooms: property.beds,
      bathrooms: property.baths,
      sqft: property.sqft,
      leaseTerm: "12 months",
      details: `Beautiful ${property.title} located in ${property.location}. Features ${property.amenities.slice(0, 3).join(", ")}. ${property.available === "Immediately" ? "Available for immediate move-in." : `Available from ${property.available}.`}`,
      postedBy: "Premium Properties Inc.",
      responseRate: "95%",
      views: Math.floor(Math.random() * 500) + 100,
      saves: Math.floor(Math.random() * 50) + 10,
      contact: "+1-555-123-4567",
      availableForCall: true,
      neighborhood: property.location.split(",")[0],
      busStopDistance: "Bus stop: 0.3 miles",
      posted: "3 days ago",
      distance: "Near public transport",
      verified: property.featured,
      discount: property.featured ? "Featured Listing" : null,
      details: `${property.title} is a beautiful ${property.type.toLowerCase()} located in the heart of ${property.location}. This property offers ${property.beds} bedrooms and ${property.baths} bathrooms with ${property.sqft.toLocaleString()} square feet of living space. Features include ${property.amenities.slice(0, 3).join(", ")} and more. Perfect for ${property.beds > 2 ? "families" : "professionals"} looking for comfortable living in a prime location.`,
      originalPrice: `$${property.price + 200}/month`,
      discount: property.featured ? "5% off" : null
    };

    // Navigate to rental-details page with property data
    navigate("/rental-details", {
      state: {
        property: formattedProperty,
        searchParams: {
          location: property.location,
          price: property.price
        }
      }
    });
  };

  // ✅ Rental property data stored locally (fixes undefined.filter)
  const rentalProperties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      title: "Luxury Downtown Condo",
      rating: 4.8,
      reviews: 124,
      price: 3200,
      period: "month",
      type: "Apartment",
      beds: 2,
      baths: 2,
      sqft: 1200,
      location: "Downtown Toronto",
      label: "For Rent",
      amenities: ["Pool", "Gym", "Concierge", "Parking", "Wi-Fi", "AC", "Security", "Balcony"],
      available: "Immediately",
      featured: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
      title: "Modern Family Home",
      rating: 4.6,
      reviews: 89,
      price: 4500,
      period: "month",
      type: "House",
      beds: 4,
      baths: 3,
      sqft: 2400,
      location: "North York",
      label: "For Rent",
      amenities: ["Garage", "Garden", "Finished Basement", "Hardwood Floors", "Fireplace", "Updated Kitchen", "Central AC", "Security System"],
      available: "Dec 1, 2024",
      featured: true,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
      title: "Waterfront Townhouse",
      rating: 4.9,
      reviews: 67,
      price: 5800,
      period: "month",
      type: "Townhouse",
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      location: "Harbourfront",
      label: "For Rent",
      amenities: ["Water View", "Patio", "Modern Kitchen", "In-suite Laundry", "Parking", "Security", "Pet Friendly", "Balcony"],
      available: "Immediately",
      featured: true,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      title: "Executive Penthouse",
      rating: 4.7,
      reviews: 56,
      price: 8500,
      period: "month",
      type: "Condominium",
      beds: 3,
      baths: 3,
      sqft: 2200,
      location: "Yorkville",
      label: "For Rent",
      amenities: ["Rooftop Terrace", "Wine Cellar", "Smart Home", "Valet", "Pool", "Gym", "Concierge", "Parking"],
      available: "Jan 15, 2025",
      featured: true,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      title: "Charming Character Home",
      rating: 4.5,
      reviews: 42,
      price: 3800,
      period: "month",
      type: "House",
      beds: 3,
      baths: 2,
      sqft: 1600,
      location: "The Annex",
      label: "For Rent",
      amenities: [
        "Fireplace",
        "Original Hardwood",
        "Private Yard",
        "Updated Kitchen",
        "Central Heating",
        "Storage",
        "Pet Friendly",
        "Garden"
      ],
      available: "Immediately",
      featured: false,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
      title: "Urban Loft Style",
      rating: 4.4,
      reviews: 78,
      price: 2900,
      period: "month",
      type: "Loft",
      beds: 1,
      baths: 1,
      sqft: 950,
      location: "Entertainment District",
      label: "For Rent",
      amenities: [
        "Exposed Brick",
        "High Ceilings",
        "Industrial Design",
        "Pet Friendly",
        "In-suite Laundry",
        "Modern Kitchen",
        "Security",
        "Wi-Fi"
      ],
      available: "Immediately",
      featured: false,
    },
  ];

  const propertyTypes = [
    { id: "all", label: "All Properties" },
    { id: "apartment", label: "Apartments" },
    { id: "house", label: "Houses" },
    { id: "townhouse", label: "Townhouses" },
    { id: "condominium", label: "Condos" },
    { id: "loft", label: "Lofts" },
  ];

  // Filtering logic - always show only 6 properties
  const filtered = rentalProperties.filter((p) =>
    filter === "all" ? true : p.type.toLowerCase() === filter
  );

  // Always show only first 6 properties
  const visibleItems = filtered.slice(0, 6);

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Premium Rental Properties in New York City
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-1">
            Explore high-quality rental homes that offer comfort, convenience,
            and modern living.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-5">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                filter === type.id
                  ? "bg-[#27bb97] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Properties Grid - Always 6 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visibleItems.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-2/5 relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-64 md:h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-110 hover:scale-110"
                  />

                  <span className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-medium rounded-full shadow">
                    {p.label}
                  </span>
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">
                      {p.title}
                    </h3>

                    <div className="flex items-center text-gray-400 text-[12px]">
                      <MapPin className="w-3 h-3 text-blue-400 mr-1" />
                      {p.location}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline mt-2">
                      <span className="text-2xl font-bold text-[#27bb97]">
                        ${p.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-5 text-gray-400 mt-3 text-[12px]">
                      <div className="flex items-center gap-1">
                        <Home className="w-4 h-4 text-blue-400" />
                        <span>{p.beds} Beds</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4 text-blue-400" />
                        <span>{p.baths} Baths</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-blue-400" />
                        <span>{p.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.amenities.slice(0, 3).map((a, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md"
                        >
                          {a}
                        </span>
                      ))}

                      {p.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                          +{p.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between mt-6 border-t pt-2">
                    <button
                      onClick={() => handleViewDetails(p)}
                      className="flex items-center gap-2 bg-[#27bb97] text-white px-4 py-2 rounded-lg hover:bg-[#1fa987] transition cursor-pointer"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Button - Always displayed */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleExploreRentals}
            className="px-8 py-3 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] transition-colors cursor-pointer font-medium"
          >
            Explore All Toronto Rentals →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRentals;