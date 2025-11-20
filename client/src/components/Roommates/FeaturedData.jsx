import React, { useState } from "react";
import { Home, Bath, Maximize2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedData = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      title: "Cozy Single Room",
      rating: 4.3,
      reviews: 28,
      price: 4500,
      type: "Single Room",
      beds: 1,
      baths: 1,
      sqft: 220,
      location: "Downtown Toronto",
      amenities: ["WiFi", "Laundry", "Kitchen Access"],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      title: "Shared Bedroom Space",
      rating: 4.1,
      reviews: 15,
      price: 3200,
      type: "Shared Bed",
      beds: 1,
      baths: 2,
      sqft: 180,
      location: "North York",
      amenities: ["WiFi", "Utilities Included", "Furnished"],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      title: "Private Room Suite",
      rating: 4.7,
      reviews: 42,
      price: 5800,
      type: "Private Room",
      beds: 1,
      baths: 1,
      sqft: 280,
      location: "Mississauga",
      amenities: ["Private Bath", "WiFi", "Parking", "Balcony"],
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop",
      title: "Modern Townhouse",
      rating: 4.6,
      reviews: 36,
      price: 12000,
      type: "Townhouse",
      beds: 3,
      baths: 2,
      sqft: 1450,
      location: "Oakville",
      amenities: ["Garage", "Backyard", "Modern Kitchen", "Laundry"],
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      title: "Urban Co-living Space",
      rating: 4.4,
      reviews: 51,
      price: 3800,
      type: "PG/Co-living",
      beds: 1,
      baths: 2,
      sqft: 200,
      location: "Downtown Vancouver",
      amenities: ["All Meals", "WiFi", "Cleaning", "Community Events"],
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1540518614846-7eded102d7bf?w=400&h=300&fit=crop",
      title: "Spacious Apartment",
      rating: 4.8,
      reviews: 67,
      price: 9500,
      type: "Apartments",
      beds: 2,
      baths: 2,
      sqft: 1100,
      location: "Burnaby",
      amenities: ["Gym", "Pool", "Concierge", "Parking"],
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
      title: "Luxury Villa",
      rating: 4.9,
      reviews: 23,
      price: 25000,
      type: "Villas",
      beds: 4,
      baths: 3,
      sqft: 2800,
      location: "West Vancouver",
      amenities: ["Pool", "Garden", "Maid Service", "Garage"],
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      title: "Comfort Guest House",
      rating: 4.2,
      reviews: 38,
      price: 5200,
      type: "Guest Houses",
      beds: 1,
      baths: 1,
      sqft: 350,
      location: "Richmond",
      amenities: ["Daily Cleaning", "Breakfast", "WiFi", "Private Entrance"],
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      title: "Fully Serviced Residence",
      rating: 4.5,
      reviews: 44,
      price: 7800,
      type: "Serviced Housing",
      beds: 1,
      baths: 1,
      sqft: 480,
      location: "Downtown Calgary",
      amenities: ["Housekeeping", "Utilities", "Furnished", "Security"],
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop",
      title: "Senior Living Community",
      rating: 4.7,
      reviews: 29,
      price: 6500,
      type: "Senior Living",
      beds: 1,
      baths: 1,
      sqft: 320,
      location: "Kelowna",
      amenities: ["Medical Care", "Activities", "Meals", "Transportation"],
    },
  ];

  const filteredProperties = properties.filter((prop) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "rent") return prop.label === "For Rent";
    if (activeFilter === "sale") return prop.label === "For Sale";
    return true;
  });

  // Show only first 6 properties initially, then all when "View More" is clicked
  const displayedProperties = showAll ? filteredProperties : filteredProperties.slice(0, 6);

  const handleBrowseMore = () => {
    navigate("/properties");
  };

  return (
    <div className="mt-20 px-4 md:px-8 lg:px-16">
      <div>
        <h1 className="text-black font-extrabold text-center text-3xl md:text-4xl">
          Featured Property For Sale and Rent!
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#25676D] to-[#2D8690] mt-3 rounded-full mx-auto"></div>
        <p className="text-center text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto">
          Explore premium, handpicked properties designed for comfort, luxury,
          and smart investment.
        </p>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto cursor-pointer mt-10">
          {displayedProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="sm:w-2/5 h-48 sm:h-auto relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="sm:w-3/5 p-5 flex flex-col justify-between">
                  {/* Title and Rating */}
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {property.title}
                      </h3>
                      <div className="text-blue-600 px-3 py-1 font-bold text-[20px]">
                        ${property.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({property.reviews} Reviews)
                      </span>
                    </div>

                    {/* Price and Label */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                          {property.type}
                        </span>
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Home size={16} />
                        <span>{property.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        <span>{property.baths} Bath</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize2 size={16} />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>

                    {/* Horizontal Line */}
                    <div className="border-t border-gray-200 mb-4"></div>

                    {/* Location and Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin size={14} />
                        <span>{property.location}</span>
                      </div>
                      <button className="bg-[#2D8690] hover:bg-[#25676D] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More / Browse More Button */}
        <div className="flex justify-center mt-12">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer"
            >
              View More
            </button>
          ) : (
            <button 
              onClick={handleBrowseMore}
              className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Browse More Properties in London
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedData;