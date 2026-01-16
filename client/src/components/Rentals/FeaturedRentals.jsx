import React, { useState } from "react";
import {
  Home,
  Bath,
  Maximize2,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedRentals = () => {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  // Inside your component function:
  const navigate = useNavigate();

  const handleExploreRentals = () => {
    navigate("/rentals-listings"); // This will navigate to the RentalsListings page
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
      amenities: ["Pool", "Gym", "Concierge", "Parking"],
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
      amenities: ["Garage", "Garden", "Finished Basement", "Hardwood Floors"],
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
      amenities: ["Water View", "Patio", "Modern Kitchen", "In-suite Laundry"],
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
      amenities: ["Rooftop Terrace", "Wine Cellar", "Smart Home", "Valet"],
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
      ],
      available: "Immediately",
      featured: false,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=400&fit=crop",
      title: "Suburban Family Residence",
      rating: 4.6,
      reviews: 34,
      price: 5200,
      period: "month",
      type: "House",
      beds: 5,
      baths: 4,
      sqft: 3200,
      location: "Markham",
      label: "For Rent",
      amenities: [
        "Double Garage",
        "Finished Basement",
        "Large Backyard",
        "Quiet Street",
      ],
      available: "Nov 15, 2024",
      featured: false,
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      title: "Lakeside Retreat",
      rating: 4.9,
      reviews: 23,
      price: 6800,
      period: "month",
      type: "House",
      beds: 4,
      baths: 3,
      sqft: 2800,
      location: "Oakville",
      label: "For Rent",
      amenities: ["Lake Access", "Dock", "Hot Tub", "Gourmet Kitchen"],
      available: "Spring 2025",
      featured: false,
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
      title: "Modern Studio Apartment",
      rating: 4.3,
      reviews: 112,
      price: 2200,
      period: "month",
      type: "Studio",
      beds: 1,
      baths: 1,
      sqft: 650,
      location: "Liberty Village",
      label: "For Rent",
      amenities: [
        "All Utilities",
        "Furnished Option",
        "Gym Access",
        "Co-working Space",
      ],
      available: "Immediately",
      featured: false,
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&h=400&fit=crop",
      title: "Heritage Duplex",
      rating: 4.7,
      reviews: 45,
      price: 4200,
      period: "month",
      type: "Duplex",
      beds: 3,
      baths: 2,
      sqft: 1900,
      location: "Cabbagetown",
      label: "For Rent",
      amenities: ["Character Details", "Private Entrance", "Garden", "Updated"],
      available: "Dec 1, 2024",
      featured: false,
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1527030280866-2cbcb42bcb71?w=600&h=400&fit=crop",
      title: "Contemporary City View Apartment",
      rating: 4.6,
      reviews: 91,
      price: 3600,
      period: "month",
      type: "Apartment",
      beds: 2,
      baths: 2,
      sqft: 1100,
      location: "Financial District",
      label: "For Rent",
      amenities: [
        "City View",
        "Balcony",
        "Floor-to-Ceiling Windows",
        "Pet Spa",
      ],
      available: "Immediately",
      featured: true,
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop",
      title: "Renovated Victorian Home",
      rating: 4.8,
      reviews: 38,
      price: 5500,
      period: "month",
      type: "House",
      beds: 4,
      baths: 3.5,
      sqft: 2600,
      location: "Roncesvalles",
      label: "For Rent",
      amenities: [
        "Historic Charm",
        "Chef's Kitchen",
        "Solar Panels",
        "Wine Room",
      ],
      available: "Feb 1, 2025",
      featured: true,
    },
    {
      id: 13,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
      title: "Minimalist Designer Condo",
      rating: 4.7,
      reviews: 67,
      price: 3100,
      period: "month",
      type: "Condominium",
      beds: 1,
      baths: 1,
      sqft: 850,
      location: "King West",
      label: "For Rent",
      amenities: [
        "Designer Finishes",
        "Smart Lighting",
        "Sound System",
        "Walk-in Closet",
      ],
      available: "Immediately",
      featured: false,
    },
    {
      id: 14,
      image:
        "https://images.unsplash.com/photo-1540448051910-09cfadd5df61?w=600&h=400&fit=crop",
      title: "Ski Chalet Style Home",
      rating: 4.9,
      reviews: 19,
      price: 7200,
      period: "month",
      type: "House",
      beds: 5,
      baths: 4,
      sqft: 3400,
      location: "Collingwood",
      label: "For Rent",
      amenities: [
        "Mountain View",
        "Hot Tub",
        "Fireplace",
        "Ski Storage",
        "Sauna",
      ],
      available: "Winter 2025",
      featured: true,
    },
    {
      id: 15,
      image:
        "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600&h=400&fit=crop",
      title: "Architectural Masterpiece",
      rating: 5.0,
      reviews: 28,
      price: 12500,
      period: "month",
      type: "House",
      beds: 6,
      baths: 5,
      sqft: 4800,
      location: "Bridle Path",
      label: "For Rent",
      amenities: [
        "Home Theater",
        "Wine Cellar",
        "Indoor Pool",
        "Smart Home",
        "Guest House",
      ],
      available: "Negotiable",
      featured: true,
    },
    {
      id: 16,
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop",
      title: "Modern Industrial Warehouse Loft",
      rating: 4.5,
      reviews: 56,
      price: 4900,
      period: "month",
      type: "Loft",
      beds: 2,
      baths: 2,
      sqft: 2100,
      location: "Distillery District",
      label: "For Rent",
      amenities: [
        "Exposed Ductwork",
        "Concrete Floors",
        "Mezzanine",
        "Artist Studio",
      ],
      available: "Immediately",
      featured: false,
    },
    {
      id: 17,
      image:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=400&fit=crop",
      title: "Cozy Cottage by the Lake",
      rating: 4.4,
      reviews: 42,
      price: 3800,
      period: "month",
      type: "Cottage",
      beds: 3,
      baths: 2,
      sqft: 1400,
      location: "Muskoka",
      label: "For Rent",
      amenities: [
        "Lakefront",
        "Fire Pit",
        "Canoe",
        "Wood Stove",
        "Outdoor Shower",
      ],
      available: "Seasonal",
      featured: false,
    },
    {
      id: 18,
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      title: "Eco-Friendly Green Home",
      rating: 4.8,
      reviews: 31,
      price: 4700,
      period: "month",
      type: "House",
      beds: 3,
      baths: 2,
      sqft: 2000,
      location: "Leslieville",
      label: "For Rent",
      amenities: [
        "Solar Power",
        "Green Roof",
        "Rainwater Collection",
        "Electric Car Charger",
      ],
      available: "Immediately",
      featured: true,
    },
    {
      id: 19,
      image:
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop",
      title: "High-Rise Luxury Suite",
      rating: 4.7,
      reviews: 83,
      price: 4100,
      period: "month",
      type: "Apartment",
      beds: 2,
      baths: 2,
      sqft: 1300,
      location: "Yonge & Bloor",
      label: "For Rent",
      amenities: [
        "24/7 Security",
        "Infinity Pool",
        "Sky Lounge",
        "Private Theater",
      ],
      available: "Immediately",
      featured: false,
    },
    {
      id: 20,
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
      title: "Art Deco Heritage Condo",
      rating: 4.6,
      reviews: 47,
      price: 3400,
      period: "month",
      type: "Condominium",
      beds: 1,
      baths: 1,
      sqft: 900,
      location: "Queens Quay",
      label: "For Rent",
      amenities: [
        "Original Features",
        "Marble Bathroom",
        "Parquet Floors",
        "Concierge",
      ],
      available: "Jan 1, 2025",
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

  // Filtering logic
  const filtered = rentalProperties.filter((p) =>
    filter === "all" ? true : p.type.toLowerCase() === filter
  );

  const visibleItems = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 -mt-48">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Premium Rental Properties in New York City
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Explore high-quality rental homes that offer comfort, convenience,
            and modern living.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 cursor-pointer">
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

                  {p.featured && (
                    <span className="absolute top-4 left-4 bg-[#27bb97] text-white px-3 py-1 text-xs rounded-full">
                      FEATURED
                    </span>
                  )}

                  <span className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-medium rounded-full shadow">
                    {p.label}
                  </span>
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                      {p.type}
                    </span>

                    <h3 className="text-xl font-bold text-gray-800 mt-3">
                      {p.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline mt-2">
                      <span className="text-2xl font-bold text-[#27bb97]">
                        ${p.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-5 text-gray-600 mt-4">
                      <div className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-blue-500" />
                        <span>{p.beds} Beds</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Bath className="w-5 h-5 text-blue-500" />
                        <span>{p.baths} Baths</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-5 h-5 text-blue-500" />
                        <span>{p.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.amenities.slice(0, 3).map((a, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                        >
                          {a}
                        </span>
                      ))}

                      {p.amenities.length > 3 && (
                        <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-lg">
                          +{p.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between mt-6 border-t pt-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                      {p.location}
                    </div>

                    <button
                      onClick={() => navigate(`/rental-properties/${p.id}`)}
                      className="flex items-center gap-2 bg-[#27bb97] text-white px-5 py-2 rounded-full hover:bg-[#27bb88] transition"
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

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition font-medium"
            >
              View All Properties
            </button>
          ) : (
            // In your JSX where you have the button:
            <button
              onClick={handleExploreRentals}
              className="px-6 py-2 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] transition-colors cursor-pointer font-medium"
            >
              Explore All Toronto Rentals →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRentals;
