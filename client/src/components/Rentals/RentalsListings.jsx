import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Bath,
  Maximize2,
  MapPin,
  Search,
  Plus,
  Minus,
  ChevronDown,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  User,
  CheckCircle,
  Eye,
  Phone,
  MessageCircle,
  Images,
  Calendar,
  Building,
  Sofa,
  Microwave,
} from "lucide-react";
import {
  FaMapMarkerAlt,
  FaMap,
  FaWifi,
  FaTv,
  FaBolt,
  FaThermometerHalf,
  FaSnowflake,
  FaCar,
  FaUtensils,
  FaDumbbell,
} from "react-icons/fa";
import { GiGrass, GiWashingMachine } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { TbShirt } from "react-icons/tb";
import Footer from "../../pages/Home/Footer.jsx";

// Enhanced sample rental properties data with multiple photos
const allRentals = [
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    ],
    title: "Luxury 2-Bedroom Apartment in Downtown Toronto",
    description: "Entertainment District, Toronto, ON, Canada",
    neighborhood: "Downtown Toronto, Entertainment District",
    posted: "5 hrs ago",
    postedBy: "Toronto Luxury Living",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    availableFrom: "Dec 1, 2024",
    amenities: [
      "Wi-Fi",
      "AC",
      "Gym",
      "Pool",
      "Concierge",
      "Parking",
      "Laundry",
      "Security",
    ],
    details:
      "Beautiful luxury apartment with stunning city views. Features modern kitchen, hardwood floors, and floor-to-ceiling windows. Perfect for professionals.",
    price: 3500,
    sqft: 950,
    location: "Toronto, ON",
    verified: true,
    immediate: true,
    discount: "No Broker Fee",
    distance: "0.3 mi from Subway",
    busStopDistance: "0.1 mi from Bus Stop",
    contact: "+1 (416) 123-4567",
    views: 245,
    saves: 42,
    rating: 4.5,
    reviews: 36,
    photos: 12,
    responseRate: "98%",
    responseTime: "< 1h",
    availableForCall: true,
    leaseTerm: "12 months",
    petFriendly: true,
  },
  {
    id: 2,
    images: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    ],
    title: "Modern Studio Condo near York University",
    description: "North York, Toronto, ON, Canada",
    neighborhood: "North York, Near Campus",
    posted: "1 day ago",
    postedBy: "Student Housing Inc",
    propertyType: "Condo",
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: "Nov 15, 2024",
    amenities: [
      "Wi-Fi",
      "Utilities Included",
      "Furnished",
      "Gym",
      "Laundry",
      "Study Area",
      "Parking",
    ],
    details:
      "Fully furnished studio perfect for students. Includes all utilities and high-speed internet. Close to campus and public transit.",
    price: 1800,
    sqft: 550,
    location: "North York, Toronto",
    verified: true,
    immediate: false,
    discount: "Utilities Included",
    distance: "0.5 mi from Campus",
    busStopDistance: "0.2 mi from Bus Stop",
    contact: "+1 (416) 987-6543",
    views: 189,
    saves: 31,
    rating: 4.2,
    reviews: 24,
    photos: 8,
    responseRate: "92%",
    responseTime: "< 3h",
    availableForCall: true,
    leaseTerm: "8 months",
    petFriendly: false,
  },
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600&fit=crop",
    ],
    title: "Spacious 3-Bedroom House in Scarborough",
    description: "Scarborough, Toronto, ON, Canada",
    neighborhood: "Scarborough, Family Area",
    posted: "2 days ago",
    postedBy: "Family Homes Toronto",
    propertyType: "House",
    bedrooms: 3,
    bathrooms: 2,
    availableFrom: "Jan 1, 2025",
    amenities: [
      "Backyard",
      "Garage",
      "Garden",
      "Basement",
      "Laundry",
      "Parking",
      "Storage",
      "Pet Friendly",
    ],
    details:
      "Beautiful family home with large backyard and modern amenities. Perfect for families looking for space and comfort in a quiet neighborhood.",
    price: 3200,
    sqft: 1800,
    location: "Scarborough, Toronto",
    verified: false,
    immediate: true,
    discount: "First Month Discount",
    distance: "0.7 mi from GO Station",
    busStopDistance: "0.3 mi from Bus Stop",
    contact: "+1 (416) 456-7890",
    views: 312,
    saves: 58,
    rating: 4.6,
    reviews: 45,
    photos: 15,
    responseRate: "85%",
    responseTime: "< 4h",
    availableForCall: false,
    leaseTerm: "24 months",
    petFriendly: true,
  },
  {
    id: 4,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop",
    ],
    title: "Luxury Loft in Distillery District",
    description: "Distillery District, Toronto, ON, Canada",
    neighborhood: "Distillery District, Historic Area",
    posted: "3 hrs ago",
    postedBy: "Heritage Properties",
    propertyType: "Loft",
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: "Dec 10, 2024",
    amenities: [
      "Exposed Brick",
      "High Ceilings",
      "Modern Kitchen",
      "AC",
      "Laundry",
      "Security",
      "Rooftop",
      "Concierge",
    ],
    details:
      "Stunning loft conversion with original brick walls and industrial features. Located in the heart of the historic Distillery District.",
    price: 4200,
    sqft: 1200,
    location: "Distillery District, Toronto",
    verified: true,
    immediate: true,
    discount: "No Deposit",
    distance: "0.2 mi from Streetcar",
    busStopDistance: "0.1 mi from Bus Stop",
    contact: "+1 (416) 234-5678",
    views: 178,
    saves: 39,
    rating: 4.8,
    reviews: 29,
    photos: 10,
    responseRate: "96%",
    responseTime: "< 2h",
    availableForCall: true,
    leaseTerm: "12 months",
    petFriendly: true,
  },
  {
    id: 5,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
    ],
    title: "Waterfront Condo with Lake View",
    description: "Harbourfront, Toronto, ON, Canada",
    neighborhood: "Harbourfront, Waterfront",
    posted: "6 hrs ago",
    postedBy: "Waterfront Properties",
    propertyType: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    availableFrom: "Nov 20, 2024",
    amenities: [
      "Lake View",
      "Balcony",
      "Pool",
      "Spa",
      "Gym",
      "Concierge",
      "Underground Parking",
      "AC",
    ],
    details:
      "Spectacular waterfront condo with panoramic lake views. Features modern finishes, balcony, and access to premium building amenities.",
    price: 4800,
    sqft: 1100,
    location: "Harbourfront, Toronto",
    verified: true,
    immediate: false,
    discount: "Flexible Lease",
    distance: "0.4 mi from Ferry",
    busStopDistance: "0.2 mi from Streetcar",
    contact: "+1 (416) 345-6789",
    views: 421,
    saves: 87,
    rating: 4.7,
    reviews: 52,
    photos: 18,
    responseRate: "94%",
    responseTime: "< 2h",
    availableForCall: true,
    leaseTerm: "12 months",
    petFriendly: true,
  },
  {
    id: 6,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=800&h=600&fit=crop",
    ],
    title: "Cozy Basement Apartment in Etobicoke",
    description: "Etobicoke, Toronto, ON, Canada",
    neighborhood: "Etobicoke, Suburban",
    posted: "1 day ago",
    postedBy: "Local Landlord",
    propertyType: "Basement Apartment",
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: "Dec 5, 2024",
    amenities: [
      "Private Entrance",
      "Kitchenette",
      "Laundry",
      "Parking",
      "Storage",
      "Utilities Included",
      "Furnished",
    ],
    details:
      "Cozy and affordable basement apartment with private entrance. Perfect for students or young professionals on a budget.",
    price: 1300,
    sqft: 600,
    location: "Etobicoke, Toronto",
    verified: false,
    immediate: true,
    discount: "All Inclusive",
    distance: "0.8 mi from Subway",
    busStopDistance: "0.4 mi from Bus Stop",
    contact: "+1 (416) 567-8901",
    views: 156,
    saves: 23,
    rating: 4.0,
    reviews: 18,
    photos: 6,
    responseRate: "88%",
    responseTime: "< 6h",
    availableForCall: true,
    leaseTerm: "Month-to-Month",
    petFriendly: false,
  },
  {
    id: 7,
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
    ],
    title: "Modern Townhouse in Liberty Village",
    description: "Liberty Village, Toronto, ON, Canada",
    neighborhood: "Liberty Village, Trendy",
    posted: "4 hrs ago",
    postedBy: "Urban Living Group",
    propertyType: "Townhouse",
    bedrooms: 3,
    bathrooms: 2.5,
    availableFrom: "Jan 15, 2025",
    amenities: [
      "Patio",
      "Garage",
      "Modern Kitchen",
      "Laundry",
      "AC",
      "Storage",
      "Pet Friendly",
      "Garden",
    ],
    details:
      "Beautiful modern townhouse in trendy Liberty Village. Features open concept living, rooftop patio, and premium finishes throughout.",
    price: 3800,
    sqft: 1600,
    location: "Liberty Village, Toronto",
    verified: true,
    immediate: false,
    discount: "Negotiable",
    distance: "0.3 mi from Streetcar",
    busStopDistance: "0.2 mi from Bus Stop",
    contact: "+1 (416) 678-9012",
    views: 267,
    saves: 46,
    rating: 4.4,
    reviews: 33,
    photos: 14,
    responseRate: "91%",
    responseTime: "< 3h",
    availableForCall: true,
    leaseTerm: "18 months",
    petFriendly: true,
  },
  {
    id: 8,
    images: [
      "https://images.unsplash.com/photo-1527030280866-3c7d6e8c4a3b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=800&h=600&fit=crop",
    ],
    title: "Executive Penthouse in Financial District",
    description: "Financial District, Toronto, ON, Canada",
    neighborhood: "Financial District, Downtown Core",
    posted: "12 hrs ago",
    postedBy: "Executive Rentals",
    propertyType: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    availableFrom: "Feb 1, 2025",
    amenities: [
      "Panoramic Views",
      "Terrace",
      "Wine Cellar",
      "Smart Home",
      "Concierge",
      "Valet",
      "Pool",
      "Spa",
    ],
    details:
      "Luxurious penthouse with breathtaking city views. Features premium finishes, smart home technology, and exclusive building amenities.",
    price: 8500,
    sqft: 2200,
    location: "Financial District, Toronto",
    verified: true,
    immediate: true,
    discount: "Corporate Rate",
    distance: "0.1 mi from PATH",
    busStopDistance: "0.1 mi from Streetcar",
    contact: "+1 (416) 789-0123",
    views: 189,
    saves: 52,
    rating: 4.9,
    reviews: 27,
    photos: 20,
    responseRate: "99%",
    responseTime: "< 1h",
    availableForCall: true,
    leaseTerm: "24 months",
    petFriendly: true,
  },
];

// Options data for rentals
const searchTypes = [
  "Apartments for Rent",
  "Houses for Rent",
  "Condos for Rent",
  "Townhouses for Rent",
  "Basement Apartments",
  "Vacation Rentals",
  "Short Term Rentals",
];

const locationTypes = ["By City", "By Neighborhood", "By Zip Code", "By Metro"];

const radiusOptions = [
  "1 km",
  "5 km",
  "10 km",
  "15 km",
  "20 km",
  "25 km",
  "50 km",
];

const budgetOptions = [
  "Any Budget",
  "Under $1,000",
  "$1,000 - $1,500",
  "$1,500 - $2,000",
  "$2,000 - $2,500",
  "$2,500 - $3,000",
  "$3,000 - $3,500",
  "$3,500 - $4,000",
  "Over $4,000",
];

const propertyTypes = [
  "Apartment",
  "House",
  "Condo",
  "Townhouse",
  "Loft",
  "Basement Apartment",
  "Penthouse",
];

const itemsPerPageOptions = [4, 8, 12, 16];

const RentalsListings = () => {
  const navigate = useNavigate();

  // State for search filters
  const [searchType, setSearchType] = useState("Apartments for Rent");
  const [locationType, setLocationType] = useState("By City");
  const [location, setLocation] = useState("Toronto, ON");
  const [radius, setRadius] = useState("10 km");
  const [budget, setBudget] = useState("Any Budget");
  const [propertyType, setPropertyType] = useState("Apartments for Rent");
  const [mainTab, setMainTab] = useState("all");
  const [dropdownTab, setDropdownTab] = useState("rent");
  const [sortBy, setSortBy] = useState("featured");
  const [showMoreAmenities, setShowMoreAmenities] = useState({});
  const [likedProperties, setLikedProperties] = useState({});
  const [showContact, setShowContact] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showPlusDropdown, setShowPlusDropdown] = useState(false);

  const [subChecks, setSubChecks] = useState({
    property: {
      Apartment: true,
      House: false,
      Condo: false,
      Townhouse: false,
      Loft: false,
      "Basement Apartment": false,
    },
    lease: {
      "Short Term": false,
      "Long Term": true,
      "Month-to-Month": false,
    },
    amenities: {
      "Pet Friendly": false,
      Furnished: false,
      "Utilities Included": false,
    },
  });

  // Toggle sub checkboxes
  const handleSubToggle = (mainId, subLabel) => {
    setSubChecks((prev) => ({
      ...prev,
      [mainId]: {
        ...prev[mainId],
        [subLabel]: !prev[mainId][subLabel],
      },
    }));
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Toggle more amenities view
  const toggleAmenities = (propertyId) => {
    setShowMoreAmenities((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  // Toggle like property
  const toggleLike = (propertyId) => {
    setLikedProperties((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  // Toggle contact visibility
  const toggleContact = (propertyId) => {
    setShowContact((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  // Navigate images
  const nextImage = (propertyId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (propertyId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  // Search functions
  const handleSearch = () => {
    console.log("Searching with filters:", {
      searchType,
      locationType,
      location,
      radius,
      budget,
      propertyType,
    });
    setCurrentPage(1);
  };

  const handleSaveSearch = () => {
    console.log("Saving search criteria");
    alert("Search criteria saved!");
  };

  // Share property
  const handleShare = (property) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Handle call
  const handleCall = (property) => {
    if (property.availableForCall && property.contact) {
      window.location.href = `tel:${property.contact}`;
    }
  };

  // Handle message
  const handleMessage = (property) => {
    alert(
      `Opening chat with ${property.postedBy}. This would redirect to your messaging system.`
    );
  };

  // Pagination functions
  const totalPages = Math.ceil(allRentals.length / itemsPerPage);

  const getCurrentProperties = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allRentals.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const propertiesSection = document.querySelector(".properties-section");
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pageNumbers.push(1);

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Amenity icons mapping for rentals
  const amenityIcons = {
    "Wi-Fi": <FaWifi size={14} />,
    "TV/Cable": <FaTv size={14} />,
    Electricity: <FaBolt size={14} />,
    "Room Heater": <FaThermometerHalf size={14} />,
    Water: <IoIosWater size={14} />,
    Gym: <FaDumbbell size={14} />,
    Laundry: <TbShirt size={14} />,
    AC: <FaSnowflake size={14} />,
    Parking: <FaCar size={14} />,
    Refrigerator: <FaSnowflake size={14} />,
    Microwave: <Microwave size={14} />,
    Kitchen: <FaUtensils size={14} />,
    Backyard: <GiGrass size={14} />,
    "Utilities Included": <FaBolt size={14} />,
    Furnished: <Sofa size={14} />,
    Washer: <GiWashingMachine size={14} />,
    Dryer: <GiWashingMachine size={14} />,
    Pool: <FaBolt size={14} />,
    Security: <CheckCircle size={14} />,
    Concierge: <User size={14} />,
    Balcony: <GiGrass size={14} />,
    Garage: <FaCar size={14} />,
    "Pet Friendly": <FaBolt size={14} />,
    "Lake View": <FaBolt size={14} />,
  };

  // Badge Component
  const Badge = ({ children, type = "default" }) => {
    const styles = {
      verified: "bg-green-100 text-green-800 border-green-200",
      immediate: "bg-blue-100 text-blue-800 border-blue-200",
      discount: "bg-orange-100 text-orange-800 border-orange-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[type]}`}
      >
        {type === "verified" && <CheckCircle size={12} />}
        {type === "immediate" && <Clock size={12} />}
        {children}
      </span>
    );
  };

  // Rating Stars Component
  const RatingStars = ({ rating, reviews }) => (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">({reviews})</span>
    </div>
  );

  // Enhanced Property Card Component for Rentals
  const RentalCard = ({ property }) => {
    const currentIndex = currentImageIndex[property.id] || 0;
    const totalImages = property.images.length;

    const handleCardClick = () => {
      navigate("/rental-details", {
        state: {
          property,
          fromListings: true,
          searchParams: {
            searchType,
            locationType,
            location,
            radius,
            budget,
            propertyType,
          },
        },
      });
    };

    const handleTitleClick = (e) => {
      e.stopPropagation();
      navigate("/rental-details", {
        state: {
          property,
          fromListings: true,
          searchParams: {
            searchType,
            locationType,
            location,
            radius,
            budget,
            propertyType,
          },
        },
      });
    };

    return (
      <div
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Enhanced Image Gallery Section */}
          <div className="sm:w-2/5 h-48 sm:h-auto relative">
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={property.images[currentIndex]}
                alt={`${property.title} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Image Navigation Arrows */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(property.id, totalImages);
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-200"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(property.id, totalImages);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-200"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {totalImages > 1 && (
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {currentIndex + 1} / {totalImages}
                </div>
              )}

              {/* Image Thumbnails Preview */}
              {totalImages > 1 && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex gap-1 justify-center">
                    {property.images.slice(0, 4).map((img, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => ({
                            ...prev,
                            [property.id]: index,
                          }));
                        }}
                        className={`w-8 h-8 rounded border-2 ${
                          index === currentIndex
                            ? "border-white"
                            : "border-transparent"
                        } overflow-hidden`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    {totalImages > 4 && (
                      <div className="w-8 h-8 bg-black/70 text-white text-xs flex items-center justify-center rounded border-2 border-transparent">
                        +{totalImages - 4}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Top Left Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {property.verified && <Badge type="verified">Verified</Badge>}
              {property.immediate && <Badge type="immediate">Immediate</Badge>}
              {property.discount && (
                <Badge type="discount">{property.discount}</Badge>
              )}
              {property.petFriendly && (
                <Badge type="default">🐾 Pet Friendly</Badge>
              )}
            </div>

            {/* Like and Share Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(property.id);
                }}
                className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
                  likedProperties[property.id]
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart
                  size={18}
                  fill={likedProperties[property.id] ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(property);
                }}
                className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Enhanced Distance Information */}
            <div className="absolute bottom-12 left-3 right-3">
              <div className="flex flex-col gap-1">
                {/* Public Transport Distances */}
                <div className="flex flex-wrap gap-2">
                  {property.distance && (
                    <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                      🚇 {property.distance}
                    </div>
                  )}
                  {property.busStopDistance && (
                    <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                      🚌 {property.busStopDistance}
                    </div>
                  )}
                </div>

                {/* Views and Photos */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center -mb-12 gap-1 px-2 py-1 rounded text-xs text-white">
                    <Eye size={12} />
                    <span>{property.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="sm:w-3/5 p-5 flex flex-col justify-between">
            {/* Header with Price and Badges */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-4">
                  <h3
                    className="text-lg font-bold text-gray-800 mb-2 leading-tight hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={handleTitleClick}
                  >
                    {property.title.length > 60
                      ? `${property.title.slice(0, 60)}...`
                      : property.title}
                  </h3>

                  {/* Location and Quick Info */}
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building size={14} />
                      <span>{property.propertyType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{property.posted}</span>
                    </div>
                  </div>

                  {/* Rating and Response Info */}
                  <div className="flex items-center gap-4 mb-3">
                    <RatingStars
                      rating={property.rating}
                      reviews={property.reviews}
                    />
                    <div className="text-sm text-gray-600">
                      ⚡ {property.responseRate} response •{" "}
                      {property.responseTime}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Home size={16} />
                      <span>{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Bath size={16} />
                      <span>{property.bathrooms} bath</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Maximize2 size={16} />
                      <span>{property.sqft} sqft</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      📅 {property.leaseTerm}
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    ${property.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-600">
                      /month
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Available: {property.availableFrom}
                  </div>
                </div>
              </div>

              {/* Property Details in Compact Grid */}
              <div className="grid grid-cols-3 gap-2 text-xs mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Type</div>
                  <div className="text-gray-600">{property.propertyType}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Lease</div>
                  <div className="text-gray-600">{property.leaseTerm}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Saves</div>
                  <div className="text-gray-600">{property.saves}</div>
                </div>
              </div>

              {/* Premium Amenities with Icons */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Key Amenities
                </h4>
                <div className="flex flex-wrap gap-1">
                  {property.amenities.slice(0, 6).map((amenity, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 text-xs text-blue-700 px-3 py-2 rounded-lg border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      {amenityIcons[amenity] || <FaBolt size={14} />}
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 6 && (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAmenities(property.id);
                        }}
                        className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
                      >
                        +{property.amenities.length - 6} more
                      </button>

                      {showMoreAmenities[property.id] && (
                        <div className="absolute top-full left-0 mt-2 z-20 bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-[250px]">
                          <div className="text-sm font-semibold text-gray-900 mb-3">
                            All Amenities
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {property.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="flex items-center gap-1.5 text-xs bg-gray-50 text-gray-700 px-2 py-1.5 rounded border border-gray-200"
                              >
                                {amenityIcons[amenity] || <FaBolt size={12} />}
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description Line */}
              <div className="text-sm text-gray-600 mb-4 leading-relaxed">
                <p className="line-clamp-2">{property.details}</p>
              </div>
            </div>

            {/* Enhanced Action Section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              {/* Contact Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {showContact[property.id] ? (
                  <div className="flex items-center gap-1">
                    <Phone size={14} />
                    <span className="font-medium">{property.contact}</span>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleContact(property.id);
                    }}
                    className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Show Contact
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* Call Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(property);
                  }}
                  disabled={!property.availableForCall}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    property.availableForCall
                      ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:shadow-sm"
                      : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  }`}
                  title={
                    property.availableForCall
                      ? "Call now"
                      : "Client unavailable for calls"
                  }
                >
                  <Phone size={16} />
                  Call
                </button>

                {/* Message Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessage(property);
                  }}
                  className="flex items-center gap-2 bg-[#27bb97] hover:bg-[#1FA987] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <MessageCircle size={16} />
                  Message
                </button>

                {/* Save Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(property.id);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    likedProperties[property.id]
                      ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  } hover:shadow-sm`}
                >
                  <Heart
                    size={16}
                    fill={
                      likedProperties[property.id] ? "currentColor" : "none"
                    }
                  />
                  Save ({property.saves})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="pt-10 pb-6 px-4 sm:px-8 lg:px-20">
        <div className="">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <span className="font-semibold text-gray-900">Toronto Rentals</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-500">
              {searchType} in {location}
            </span>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="flex flex-col sm:flex-row items-center w-full lg:w-auto">
                {/* Property Type Dropdown */}
                {searchType === "Apartments for Rent" && (
                  <div className="w-full sm:w-auto">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowPropertyDropdown(!showPropertyDropdown)
                        }
                        className="w-full flex justify-between items-center pl-3 pr-10 py-3 text-base border lg:rounded-l-lg lg:rounded-r-none border-gray-200 rounded-lg lg:rounded-none text-gray-700 focus:outline-none bg-white"
                      >
                        <span>{propertyType}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            showPropertyDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showPropertyDropdown && (
                        <div className="absolute top-full left-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg w-[600px] p-4 max-h-96 overflow-y-auto">
                          {/* Rent / Buy Tabs */}
                          <div className="mb-4 flex border-b pb-2">
                            <button
                              onClick={() => setDropdownTab("rent")}
                              className={`flex-1 text-center py-2 font-medium transition-colors ${
                                dropdownTab === "rent"
                                  ? "text-blue-600 border-b-2 border-blue-600"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              Rent
                            </button>
                            <button
                              onClick={() => setDropdownTab("buy")}
                              className={`flex-1 text-center py-2 font-medium transition-colors ${
                                dropdownTab === "buy"
                                  ? "text-blue-600 border-b-2 border-blue-600"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              Buy
                            </button>
                          </div>

                          {/* Rent Content */}
                          {dropdownTab === "rent" && (
                            <>
                              {/* Two Column Layout */}
                              <div className="grid grid-cols-2 gap-8">
                                {/* Left Column - Residential Rentals */}
                                <div>
                                  <div className="mb-4">
                                    <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-3">
                                      <input
                                        type="radio"
                                        name="propertyType"
                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                      />
                                      <span className="ml-2">
                                        Residential Rentals
                                      </span>
                                    </label>
                                    <div className="grid grid-cols-1 gap-2 ml-6">
                                      {Object.keys(subChecks.property).map(
                                        (type) => (
                                          <label
                                            key={type}
                                            className="flex items-center cursor-pointer text-sm"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={subChecks.property[type]}
                                              onChange={() =>
                                                handleSubToggle(
                                                  "property",
                                                  type
                                                )
                                              }
                                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                            />
                                            <span className="ml-2 text-gray-600">
                                              {type}
                                            </span>
                                          </label>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column - Lease Types */}
                                <div>
                                  <div className="mb-4">
                                    <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-3">
                                      <input
                                        type="radio"
                                        name="leaseType"
                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                      />
                                      <span className="ml-2">Lease Types</span>
                                    </label>
                                    <div className="space-y-2 ml-6">
                                      {Object.keys(subChecks.lease).map(
                                        (type) => (
                                          <label
                                            key={type}
                                            className="flex items-center cursor-pointer text-sm"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={subChecks.lease[type]}
                                              onChange={() =>
                                                handleSubToggle("lease", type)
                                              }
                                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                            />
                                            <span className="ml-2 text-gray-600">
                                              {type}
                                            </span>
                                          </label>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <hr className="border-gray-200 my-4" />

                              {/* Amenities Section */}
                              <div className="mb-2">
                                <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-2">
                                  <input
                                    type="radio"
                                    name="amenities"
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                  />
                                  <span className="ml-2">
                                    Must-Have Features
                                  </span>
                                </label>
                                <div className="space-y-1 ml-6">
                                  {Object.keys(subChecks.amenities).map(
                                    (amenity) => (
                                      <label
                                        key={amenity}
                                        className="flex items-center cursor-pointer text-sm"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={subChecks.amenities[amenity]}
                                          onChange={() =>
                                            handleSubToggle(
                                              "amenities",
                                              amenity
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          {amenity}
                                        </span>
                                      </label>
                                    )
                                  )}
                                </div>
                              </div>
                            </>
                          )}

                          {/* Buy Content */}
                          {dropdownTab === "buy" && (
                            <div className="text-center py-8 text-gray-500">
                              <Building size={48} className="mx-auto mb-4" />
                              <p>Buy properties feature coming soon!</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Location Type */}
                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <select
                      className="w-full pl-3 pr-10 py-3 text-base border border-gray-200 rounded-lg lg:rounded-none text-gray-700 
                             focus:outline-none appearance-none bg-white"
                      value={locationType}
                      onChange={(e) => setLocationType(e.target.value)}
                    >
                      {locationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Location Input */}
                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Enter location..."
                      className="w-full pl-10 pr-3 py-3 text-base border border-gray-200 bg-white text-gray-800 
                             focus:outline-none rounded-lg lg:rounded-none"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Radius */}
                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <select
                      className="w-full pl-3 pr-10 py-3 text-base border border-gray-200 rounded-lg lg:rounded-none text-gray-700 
                             focus:outline-none appearance-none bg-white"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                    >
                      {radiusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Budget */}
                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <select
                      className="w-full pl-3 pr-10 py-3 text-base border border-gray-200 rounded-lg lg:rounded-r-lg lg:rounded-l-none text-gray-700 
                             focus:outline-none appearance-none bg-white"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      {budgetOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-start">
                <button
                  onClick={handleSearch}
                  className="w-full lg:w-fit px-6 flex items-center justify-center gap-2 bg-[#2563EB]
                           text-white font-semibold rounded-lg py-3 hover:bg-[#1E40AF] 
                           shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  View Results
                </button>

                {/* Plus/Minus Filter Button */}
                <div className="relative w-full lg:w-auto">
                  <button
                    onClick={() => setShowPlusDropdown(!showPlusDropdown)}
                    className="w-full lg:w-auto p-4 bg-white text-gray-700 border border-gray-300 
               rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm 
               transition-all duration-200 flex items-center justify-center 
               shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {showPlusDropdown ? (
                      <Minus className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600" />
                    )}
                    <span className="ml-2 text-sm font-medium hidden sm:inline">
                      {showPlusDropdown ? "" : ""}
                    </span>
                  </button>

                  {/* Enhanced Dropdown Content */}
                  {showPlusDropdown && (
                    <div
                      className="absolute left-0 right-0 lg:left-auto lg:right-0 w-full lg:w-[1000px] mt-2 z-50 
                    bg-white border border-gray-200 rounded-xl shadow-2xl max-h-[80vh] overflow-hidden"
                    >
                      {/* Enhanced Header */}
                      <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            Advanced Filters
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Refine your rental search with detailed preferences
                          </p>
                        </div>
                        <button
                          onClick={() => setShowPlusDropdown(false)}
                          className="p-2 hover:bg-white rounded-lg transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <svg
                            className="w-5 h-5 text-gray-500 hover:text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Main Content Container */}
                      <div className="flex flex-col lg:flex-row max-h-[60vh] overflow-hidden">
                        {/* Left Column - Input fields and filters */}
                        <div className="w-full lg:w-2/5 p-6 border-r border-gray-200 overflow-y-auto">
                          {/* Availability Section */}
                          <div className="mb-8">
                            <div className="flex items-center mb-4">
                              <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Availability & Lease
                              </h3>
                            </div>

                            {/* Date Picker */}
                            <div className="mb-5">
                              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                                Available From
                              </label>
                              <div className="relative">
                                <input
                                  type="date"
                                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             transition-all duration-200 bg-white"
                                />
                              </div>
                            </div>

                            {/* Lease Type */}
                            <div className="mb-5">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Lease Duration
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                bg-white transition-all duration-200"
                              >
                                <option value="">Any Duration</option>
                                <option value="short-term">
                                  Short Term (&lt;6 months)
                                </option>
                                <option value="6-12">6-12 months</option>
                                <option value="12+">12+ months</option>
                                <option value="month-to-month">
                                  Month to Month
                                </option>
                              </select>
                            </div>

                            {/* Pet Policy */}
                            <div className="mb-5">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Pet Policy
                              </label>
                              <div className="grid grid-cols-2 gap-3">
                                <label
                                  className="flex items-center p-3 border border-gray-200 rounded-lg 
                                 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors"
                                >
                                  <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="ml-3 text-sm text-gray-700 font-medium">
                                    Pet Friendly
                                  </span>
                                </label>
                                <label
                                  className="flex items-center p-3 border border-gray-200 rounded-lg 
                                 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors"
                                >
                                  <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="ml-3 text-sm text-gray-700 font-medium">
                                    No Pets
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Furnishing Section */}
                          <div className="mb-8">
                            <div className="flex items-center mb-4">
                              <div className="w-1.5 h-6 bg-green-600 rounded-full mr-3"></div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Furnishing & Utilities
                              </h3>
                            </div>

                            {/* Furnishing Type */}
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Furnishing
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Any</option>
                                <option value="furnished">
                                  Fully Furnished
                                </option>
                                <option value="semi">Semi-Furnished</option>
                                <option value="unfurnished">Unfurnished</option>
                              </select>
                            </div>

                            {/* Utilities Included */}
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Utilities Included
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Any</option>
                                <option value="all">All Utilities</option>
                                <option value="some">Some Utilities</option>
                                <option value="none">No Utilities</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Additional filters */}
                        <div className="w-full lg:w-3/5 p-6 bg-gray-50 overflow-y-auto">
                          {/* Square Footage Section */}
                          <div className="mb-8">
                            <div className="flex items-center mb-4">
                              <div className="w-1.5 h-6 bg-purple-600 rounded-full mr-3"></div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Size & Layout
                              </h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Square Footage */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  📏 Square Footage
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                  bg-white transition-all duration-200"
                                >
                                  <option value="">Any size</option>
                                  <option value="0-500">Up to 500 sqft</option>
                                  <option value="500-1000">
                                    500-1000 sqft
                                  </option>
                                  <option value="1000-1500">
                                    1000-1500 sqft
                                  </option>
                                  <option value="1500+">1500+ sqft</option>
                                </select>
                              </div>

                              {/* Bedrooms */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  🛏️ Bedrooms
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                  bg-white transition-all duration-200"
                                >
                                  <option value="">Any</option>
                                  <option value="studio">Studio</option>
                                  <option value="1">1 Bedroom</option>
                                  <option value="2">2 Bedrooms</option>
                                  <option value="3">3+ Bedrooms</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Building Age Section */}
                          <div className="mb-8">
                            <div className="flex items-center mb-4">
                              <div className="w-1.5 h-6 bg-orange-600 rounded-full mr-3"></div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Building Features
                              </h3>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                              {[
                                { label: "New Construction", value: "new" },
                                { label: "1-5 years", value: "1-5" },
                                { label: "5-10 years", value: "5-10" },
                                { label: "10-20 years", value: "10-20" },
                                { label: "20+ years", value: "20+" },
                                { label: "Any age", value: "" },
                              ].map((age) => (
                                <label
                                  key={age.value}
                                  className="flex items-center p-3 border-2 border-gray-200 
                                                 rounded-lg hover:border-blue-300 hover:bg-blue-50 
                                                 cursor-pointer transition-all duration-200"
                                >
                                  <input
                                    type="radio"
                                    name="building-age"
                                    value={age.value}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    defaultChecked={age.value === ""}
                                  />
                                  <span className="ml-3 text-sm text-gray-700 font-medium">
                                    {age.label}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Toronto Neighborhoods Section */}
                          <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className="w-1.5 h-6 bg-red-600 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  Toronto Neighborhoods
                                </h3>
                              </div>
                              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Select All
                              </button>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-3 bg-white rounded-lg border border-gray-200">
                              {[
                                "Downtown",
                                "Entertainment District",
                                "Financial District",
                                "Distillery District",
                                "Liberty Village",
                                "Yorkville",
                                "Annex",
                                "Kensington Market",
                                "Queen West",
                                "King West",
                                "St. Lawrence Market",
                                "Harbourfront",
                                "Waterfront",
                                "Rosedale",
                                "Forest Hill",
                                "Bridle Path",
                                "North York",
                                "Scarborough",
                                "Etobicoke",
                                "Mississauga",
                                "Vaughan",
                                "Markham",
                                "Richmond Hill",
                              ].map((neighborhood, index) => (
                                <label
                                  key={index}
                                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer 
                             transition-colors duration-150 group"
                                >
                                  <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 
                               transition-all duration-200"
                                  />
                                  <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                                    {neighborhood}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="space-y-4">
                            <button
                              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                              py-3.5 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 
                              transition-all duration-200 text-sm font-semibold 
                              flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                            >
                              <Search className="w-5 h-5" />
                              Search Rentals ({allRentals.length} matches)
                            </button>
                            <button
                              className="w-full bg-white text-gray-700 py-3 px-4 rounded-xl 
                              border border-gray-300 hover:bg-gray-50 hover:border-gray-400 
                              transition-all duration-200 text-sm font-medium 
                              flex items-center justify-center gap-2"
                              onClick={handleSaveSearch}
                            >
                              💾 Save Filter Preset
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Bar */}
                      <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200 bg-white">
                        <div className="flex-1 text-sm text-gray-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          8 filters active • {allRentals.length} rentals match
                          your criteria
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setShowPlusDropdown(false)}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 
                       transition-all duration-200 text-sm font-medium min-w-[100px]"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              setShowPlusDropdown(false);
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                       transition-all duration-200 text-sm font-semibold min-w-[120px]
                       shadow-md hover:shadow-lg"
                          >
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSaveSearch}
                  className="w-full lg:w-fit items-center px-6 py-3 justify-center bg-red-500 text-white 
                           rounded-lg hover:bg-red-600 transition-all duration-200 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Get Matched Section */}
          <div className="w-full h-auto lg:h-[45vh] mt-10 bg-white flex flex-col lg:flex-row items-center justify-between p-8 lg:px-16 rounded-2xl shadow-lg overflow-hidden">
            <div className="w-full lg:w-1/2 text-black space-y-4 mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold leading-snug -mt-10">
                Find Your Perfect Rental in Toronto
              </h2>
              <p className="text-lg opacity-90">
                Browse thousands of verified rentals with photos, virtual tours,
                and honest reviews.
              </p>
              <div className="">
                <button
                  className="mt-3 outline-none inline-flex items-center justify-between bg-[#27bb97] hover:bg-[#1FA987] 
                  min-w-[200px] border-0 rounded shadow-[0_4px_12px_rgba(0,0,0,0.1)] box-border 
                  px-5 py-4 text-white text-xs font-semibold tracking-[1.2px] uppercase 
                  overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                >
                  Browse All Rentals
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 h-64 lg:h-[85%] flex justify-center lg:justify-end">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
                alt="Toronto Rentals"
                className="w-full lg:w-[90%] h-[120%] object-cover rounded-xl -mt-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 mt-10">
        <div className="">
          {/* Tabs */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full lg:w-[80%] border-gray-200 gap-4">
            <div className="flex gap-4 lg:gap-8 ">
              <button
                onClick={() => setMainTab("all")}
                className={` pb-4 lg:pb-5 px-3 font-medium transition-colors ${
                  mainTab === "all"
                    ? "text-gray-900 border-t-4 border-red-500 rounded-t-lg bg-white -mb-0.5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                All Rentals
              </button>
              <button
                onClick={() => setMainTab("featured")}
                className={`pb-3 px-1 font-medium transition-colors ${
                  mainTab === "featured"
                    ? "text-gray-900 border-t-4 border-red-500 rounded-t-lg bg-white -mb-0.5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setMainTab("verified")}
                className={`pb-3 px-1 font-medium transition-colors ${
                  mainTab === "verified"
                    ? "text-gray-900 border-t-4 border-red-500 rounded-t-lg bg-white -mb-0.5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Verified Only
              </button>
            </div>
            <div className="lg:ml-108 lg:-mt-2">
              <button className="flex items-center gap-2 bg-[#27bb97] hover:bg-[#1FA987] text-white px-4 py-2 rounded text-sm font-medium transition-colors w-full lg:w-auto justify-center cursor-pointer">
                <FaMap />
                Switch to Map View
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            {/* Left side - 70% */}
            <div className="w-full lg:w-[70%]">
              {/* White background section for header and neighborhoods */}
              <div className="bg-white p-4 rounded-lg">
                {/* Header with Sort */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1">
                      Rentals in Toronto, ON
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {allRentals.length} properties available in Toronto
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Sort by</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none custom-select"
                      >
                        <option value="featured">Featured first</option>
                        <option value="newest">Latest first</option>
                        <option value="price-min-max">
                          Price: Low to High
                        </option>
                        <option value="price-max-min">
                          Price: High to Low
                        </option>
                        <option value="sqft">Square Footage</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] bg-gray-400 w-full my-4" />
                {/* Nearby Neighborhoods */}
                <div className="">
                  <h2 className="text-base font-semibold text-gray-900 mb-2">
                    Popular neighborhoods in Toronto
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Downtown",
                      "Yorkville",
                      "Liberty Village",
                      "Distillery District",
                      "Annex",
                      "Queen West",
                      "King West",
                      "Entertainment District",
                      "Harbourfront",
                      "North York",
                    ].map((neighborhood) => (
                      <button
                        key={neighborhood}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded-full transition-colors hover:bg-gray-200 text-sm"
                      >
                        <FaMapMarkerAlt className="text-gray-500 text-sm" />
                        <span className="text-gray-700 hover:text-blue-500 cursor-pointer">
                          {neighborhood}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Rental Cards Grid */}
              <div className="properties-section grid grid-cols-1 gap-6 cursor-pointer mt-6">
                {getCurrentProperties().map((property) => (
                  <RentalCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Items per page selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option} per page
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Page info */}
                  <div className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, allRentals.length)} of{" "}
                    {allRentals.length} properties
                  </div>

                  {/* Pagination controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                          {page === "..." ? (
                            <span className="px-3 py-2 text-gray-500">...</span>
                          ) : (
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                currentPage === page
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                              }`}
                            >
                              {page}
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - 30% */}
            <div className="w-full lg:w-[30%]">
              {/* Popular Areas in Toronto */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Popular Areas in Toronto
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Rentals in Downtown Toronto",
                    "Rentals in North York",
                    "Rentals in Scarborough",
                    "Rentals in Etobicoke",
                    "Rentals in Mississauga",
                  ].map((area) => (
                    <a
                      key={area}
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                    >
                      {area}
                    </a>
                  ))}
                </div>
              </div>

              {/* Property Types in Toronto */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Property Types in Toronto
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Apartments for Rent",
                    "Condos for Rent",
                    "Houses for Rent",
                    "Townhouses for Rent",
                    "Basement Apartments",
                  ].map((type) => (
                    <a
                      key={type}
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                    >
                      {type}
                    </a>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Price Ranges
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Under $1,500/month",
                    "$1,500 - $2,000/month",
                    "$2,000 - $2,500/month",
                    "$2,500 - $3,000/month",
                    "Over $3,000/month",
                  ].map((range) => (
                    <a
                      key={range}
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                    >
                      {range}
                    </a>
                  ))}
                </div>
              </div>

              {/* Student Housing near Universities */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Student Housing near Universities
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { name: "University of Toronto", count: 245 },
                    { name: "York University", count: 189 },
                    { name: "Ryerson University", count: 167 },
                    { name: "OCAD University", count: 98 },
                    { name: "George Brown College", count: 156 },
                  ].map((uni) => (
                    <a
                      key={uni.name}
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                    >
                      {uni.name}{" "}
                      <span className="text-gray-900">({uni.count})</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Nearby Cities */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Nearby Cities
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Rentals in Mississauga, ON",
                    "Rentals in Brampton, ON",
                    "Rentals in Vaughan, ON",
                    "Rentals in Markham, ON",
                    "Rentals in Richmond Hill, ON",
                  ].map((city) => (
                    <a
                      key={city}
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                    >
                      {city}
                    </a>
                  ))}
                </div>
              </div>

              {/* Property Managers in Toronto */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Property Managers in Toronto
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-4"></div>
                <div className="flex flex-col gap-6">
                  {[
                    {
                      name: "Toronto Luxury Living",
                      properties: "45 properties",
                      location: "Downtown Toronto",
                      phone: "416-123-4567",
                      initialBg: "bg-blue-300",
                      initial: "T",
                    },
                    {
                      name: "Urban Living Group",
                      properties: "32 properties",
                      location: "Liberty Village",
                      phone: "416-987-6543",
                      initialBg: "bg-green-300",
                      initial: "U",
                    },
                    {
                      name: "Family Homes Toronto",
                      properties: "28 properties",
                      location: "Scarborough",
                      phone: "416-456-7890",
                      initialBg: "bg-purple-300",
                      initial: "F",
                    },
                  ].map((manager, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                    >
                      {/* Row Top */}
                      <div className="flex items-start gap-4">
                        {/* Initial Box */}
                        <div
                          className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-semibold text-xl ${manager.initialBg}`}
                        >
                          {manager.initial}
                        </div>

                        {/* Manager Info */}
                        <div>
                          <a
                            href="#"
                            className="text-blue-600 font-semibold hover:underline"
                          >
                            {manager.name}
                          </a>
                          <p className="text-sm text-gray-700">
                            {manager.properties}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-col gap-1 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">📍</span>
                            {manager.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">📞</span>
                            {manager.phone}
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition">
                            View Listings
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Link */}
                <div className="text-center mt-4">
                  <a
                    href="#"
                    className="text-blue-600 text-sm hover:underline flex items-center justify-center gap-1"
                  >
                    View More Managers in Toronto →
                  </a>
                </div>
              </div>

              {/* Open Houses in Toronto */}
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 mt-10">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Open Houses in Toronto
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      title: "123 King Street West, Toronto, ON",
                      timeAgo: "3 hrs ago",
                      location: "Financial District",
                      agent: "Luxury Rentals Inc",
                      price: "3,800",
                      propertyType: "Condo",
                      bedrooms: "2",
                      houseTime: "Today, 2 PM - 6 PM",
                    },
                    {
                      title: "456 Queen Street East, Toronto, ON",
                      timeAgo: "1 day ago",
                      location: "Leslieville",
                      agent: "Urban Spaces",
                      price: "2,900",
                      propertyType: "House",
                      bedrooms: "3",
                      houseTime: "Tomorrow, 12 PM - 4 PM",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                    >
                      {/* Property Title */}
                      <a
                        href="#"
                        className="text-blue-700 font-medium hover:underline text-sm leading-5 block mb-1"
                      >
                        {item.title}
                      </a>

                      {/* Row with Time, Location, Agent */}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <span>🕒</span> {item.timeAgo}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📍</span> {item.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>👤</span> {item.agent}
                        </div>
                      </div>

                      {/* Price + Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded text-xs border border-green-200">
                          ${item.price}/month
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border">
                          {item.propertyType}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border">
                          {item.bedrooms} beds
                        </span>
                      </div>

                      {/* Open House Time */}
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Open house:</span>{" "}
                        {item.houseTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rental Tips */}
              <div className="bg-blue-50 rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  💡 Rental Tips
                </h2>
                <div className="h-[1px] bg-blue-200 w-full mb-4"></div>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Always verify the landlord/agent credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>
                      Read the lease agreement carefully before signing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Take photos during move-in inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Ask about utility costs and inclusions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Check building amenities and restrictions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RentalsListings;
