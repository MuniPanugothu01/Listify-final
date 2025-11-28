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
import RoommateSubNav from "../../components/Roommates/RoommateSubNav.jsx";
import Footer from "../../pages/Home/Footer.jsx";

// Enhanced sample properties data with multiple photos
const allProperties = [
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      "https://images.unsplash.com-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    ],
    title:
      "Housemates/Roommates Wanted For Luxury Home, 1 Minute Walk From/To Journal Square PATH",
    description:
      "Journal Square PATH Entrance(Magnolia Landing), Magnolia Avenue, Jersey City, NJ, USA, 07306",
    neighborhood: "Downtown Brooklyn, Journal Square",
    posted: "10 hrs ago",
    postedBy: "Reddy Apartments",
    adType: "Room Offered",
    roomType: "Single Room",
    gender: "Male/Female",
    availableFrom: "22 Nov 2025",
    bathroom: "Shared Bath",
    amenities: [
      "Wi-Fi",
      "AC",
      "Laundry",
      "Kitchen",
      "Parking",
      "Gym",
      "Pool",
      "Security",
    ],
    details:
      "NO FEE MONTH-TO-MONTH LEASE/RENT: Housemates/Roommates wanted immediately for a newly fully renovated, fully furnished Luxury Quadruplex Home with 4 floors, 7 large bedrooms, 4.5 bathrooms...",
    price: 3200,
    beds: 1,
    baths: 1,
    sqft: 220,
    location: "Jersey City, NJ",
    verified: true,
    immediate: true,
    discount: "No Brokerage",
    distance: "0.2 mi from PATH",
    busStopDistance: "0.4 mi from Bus Stop",
    contact: "+1 (555) 123-4567",
    views: 128,
    saves: 15,
    rating: 4.3,
    reviews: 28,
    photos: 8,
    responseRate: "95%",
    responseTime: "< 2h",
    availableForCall: true,
  },
  {
    id: 2,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=300&fit=crop",
    ],
    title: "Cozy Single Room in Manhattan High-Rise",
    description: "Upper East Side, Manhattan, NY, USA",
    neighborhood: "Upper East Side, Midtown Manhattan",
    posted: "5 hrs ago",
    postedBy: "Manhattan Living",
    adType: "Room Offered",
    roomType: "Single Room",
    gender: "Male/Female",
    availableFrom: "15 Dec 2025",
    bathroom: "Private Bath",
    amenities: [
      "Wi-Fi",
      "Gym",
      "Laundry",
      "Doorman",
      "AC",
      "Pool",
      "Concierge",
      "Parking",
    ],
    details:
      "Beautiful single room available in luxury high-rise building with amazing city views. Fully furnished with modern amenities and 24/7 security.",
    price: 4500,
    beds: 1,
    baths: 1,
    sqft: 180,
    location: "Manhattan, New York",
    verified: true,
    immediate: false,
    discount: "No Fee",
    distance: "0.5 mi from Subway",
    busStopDistance: "0.1 mi from Bus Stop",
    contact: "+1 (555) 987-6543",
    views: 89,
    saves: 22,
    rating: 4.1,
    reviews: 15,
    photos: 12,
    responseRate: "98%",
    responseTime: "< 1h",
    availableForCall: true,
  },
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop",
    ],
    title: "Modern Studio Near Brooklyn Bridge",
    description: "DUMBO, Brooklyn, NY, USA",
    neighborhood: "DUMBO, Downtown Brooklyn",
    posted: "2 days ago",
    postedBy: "Brooklyn Heights Realty",
    adType: "Room Offered",
    roomType: "Studio",
    gender: "Any",
    availableFrom: "01 Jan 2026",
    bathroom: "Private Bath",
    amenities: [
      "Wi-Fi",
      "Utilities Included",
      "Furnished",
      "Parking",
      "AC",
      "Kitchen",
      "Laundry",
      "Gym",
    ],
    details:
      "Spacious studio apartment with exposed brick walls and hardwood floors. Perfect for students or young professionals. Close to public transportation and amenities.",
    price: 3800,
    beds: 1,
    baths: 1,
    sqft: 350,
    location: "Brooklyn, New York",
    verified: false,
    immediate: true,
    discount: "First Month Free",
    distance: "0.3 mi from Station",
    busStopDistance: "0.2 mi from Bus Stop",
    contact: "+1 (555) 456-7890",
    views: 156,
    saves: 18,
    rating: 4.5,
    reviews: 42,
    photos: 6,
    responseRate: "85%",
    responseTime: "< 4h",
    availableForCall: false,
  },
  {
    id: 4,
    images: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop",
    ],
    title: "Spacious Shared Room in Queens",
    description: "Astoria, Queens, NY, USA",
    neighborhood: "Astoria, Long Island City",
    posted: "1 day ago",
    postedBy: "Queens Housing",
    adType: "Room Offered",
    roomType: "Shared Room",
    gender: "Female Only",
    availableFrom: "10 Dec 2025",
    bathroom: "Shared Bath",
    amenities: [
      "Wi-Fi",
      "Kitchen Access",
      "Laundry",
      "Backyard",
      "AC",
      "Utilities Included",
      "Parking",
    ],
    details:
      "Large shared room in friendly household. Perfect for students or interns looking for affordable housing in Queens. Quiet neighborhood with great community.",
    price: 1800,
    beds: 1,
    baths: 2,
    sqft: 850,
    location: "Queens, New York",
    verified: true,
    immediate: false,
    discount: "Utilities Included",
    distance: "0.4 mi from Subway",
    busStopDistance: "0.4 mi from Bus Stop",
    contact: "+1 (555) 234-5678",
    views: 203,
    saves: 31,
    rating: 4.2,
    reviews: 35,
    photos: 10,
    responseRate: "92%",
    responseTime: "< 3h",
    availableForCall: true,
  },
];

// Options data
const searchTypes = [
  "Rooms for Rent",
  "Apartments for Rent",
  "Roommates Wanted",
  "Sublets",
  "Vacation Rentals",
];

const locationTypes = ["By Metro", "By City", "By Zip Code", "By Neighborhood"];

const radiusOptions = [
  "1 mile",
  "5 miles",
  "10 miles",
  "15 miles",
  "20 miles",
  "25 miles",
  "50 miles",
];

const budgetOptions = [
  "Any Budget",
  "Under $500",
  "$500 - $750",
  "$750 - $1,000",
  "$1,000 - $1,500",
  "$1,500 - $2,000",
  "$2,000 - $2,500",
  "$2,500 - $3,000",
  "Over $3,000",
];

const propertyTypes = [
  "Single Room",
  "Shared Room",
  "Studio",
  "Apartment",
  "House",
];

const openHouses = [
  {
    title: "6370 Austin Street, Rego Park, NY, USA11374",
    timeAgo: "21 mins ago",
    location: "Rego Park, NY",
    agent: "shamoli kapoor",
    price: "1,500",
    roomType: "Shared Room",
    gender: "Female",
    bath: "Attached Bath",
    houseTime: "10 AM - 05 PM",
  },
  {
    title: "Journal Square PATH Entrance (Magnolia Landing), Manhattan",
    timeAgo: "14 hrs ago",
    location: "Brooklyn, NY",
    agent: "Reddy Apartments",
    price: "995",
    roomType: "Single Room",
    gender: "Male/Female",
    bath: "Attached Bath",
    houseTime: "Nov 22, 2025, 8 AM - 10 PM",
  },
  // Add more...
];

const itemsPerPageOptions = [4, 8, 12, 16];

const RoomMateDetails = () => {
  const navigate = useNavigate(); // Add this hook

  // State for search filters
  const [searchType, setSearchType] = useState("Rooms for Rent");
  const [locationType, setLocationType] = useState("By Metro");
  const [location, setLocation] = useState("New York Metro Area");
  const [radius, setRadius] = useState("10 miles");
  const [budget, setBudget] = useState("Any Budget");
  const [propertyType, setPropertyType] = useState("Rooms for Rent");
  const [mainTab, setMainTab] = useState("offered");
  const [dropdownTab, setDropdownTab] = useState("need");
  const [sortBy, setSortBy] = useState("featured");
  const [showMoreAmenities, setShowMoreAmenities] = useState({});
  const [likedProperties, setLikedProperties] = useState({});
  const [showContact, setShowContact] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showPlusDropdown, setShowPlusDropdown] = useState(false);

  const [subChecks, setSubChecks] = useState({
    property: {
      "Single Family Home": false,
      Apartment: false,
      Condo: false,
      "Town House": false,
      Homes: false,
      Houses: false,
      Hostels: false,
      Hotels: false,
      "Basement Apartment": false,
    },
    room: {
      "Single Room": true,
      "Shared Room": true,
      "Paying Guest": true,
    },
    parking: {
      "Parking garage for rent": false,
    },
    commercial: {
      "Office Space": false,
      "Retail Outlet": false,
      Others: false,
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
    // Reset to first page when searching
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
  const totalPages = Math.ceil(allProperties.length / itemsPerPage);

  const getCurrentProperties = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allProperties.slice(startIndex, endIndex);
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

  // Amenity icons mapping
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
    Microwave: <FaBolt size={14} />,
    Kitchen: <FaUtensils size={14} />,
    Backyard: <GiGrass size={14} />,
    "Utilities Included": <FaBolt size={14} />,
    Furnished: <Home size={14} />,
    Washer: <GiWashingMachine size={14} />,
    Dryer: <GiWashingMachine size={14} />,
    Pool: <FaBolt size={14} />,
    Security: <CheckCircle size={14} />,
    Doorman: <User size={14} />,
    Concierge: <User size={14} />,
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

  // Enhanced Property Card Component with Improved Image Gallery
  const PropertyCard = ({ property }) => {
    const currentIndex = currentImageIndex[property.id] || 0;
    const totalImages = property.images.length;

    // Handle card click to navigate to DetailsPage
    const handleCardClick = () => {
      navigate("/details", { state: { property } });
    };

    // Handle title click (stop propagation to prevent double navigation)
    const handleTitleClick = (e) => {
      e.stopPropagation();
      navigate("/details", { state: { property } });
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

            {/* Enhanced Distance Information - Separated and Clear */}
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
                  <div className="flex items-center -mb-12 gap-1  px-2 py-1 rounded text-xs text-white">
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
                      <User size={14} />
                      <span>{property.postedBy}</span>
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
                      <span>{property.beds} bed</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Bath size={16} />
                      <span>{property.baths} bath</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Maximize2 size={16} />
                      <span>{property.sqft} sqft</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      🚽 {property.bathroom}
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

              {/* Room Details in Compact Grid */}
              <div className="grid grid-cols-3 gap-2 text-xs mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Type</div>
                  <div className="text-gray-600">{property.roomType}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Gender</div>
                  <div className="text-gray-600">{property.gender}</div>
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

            {/* Enhanced Action Section with Smart Buttons */}
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

              {/* Action Buttons - Call, Message, Save */}
              <div className="flex gap-2">
                {/* Call Button - Conditionally Disabled */}
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

                {/* Message Button - Always Active */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessage(property);
                  }}
                  className="flex items-center gap-2 bg-[#2D8690] hover:bg-[#25676D] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <MessageCircle size={16} />
                  Message
                </button>

                {/* Save Button with Count */}
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
      <RoommateSubNav />

      {/* Header Section */}
      <div className="pt-10 pb-6 px-4 sm:px-8 lg:px-20">
        <div className="">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <span className="font-semibold text-gray-900">
              Indian Roommates
            </span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-500">
              {searchType} in {location}
            </span>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="flex flex-col sm:flex-row items-center w-full lg:w-auto">
                {/* Property Type Dropdown - Only show when Rooms for Rent is selected */}
                {searchType === "Rooms for Rent" && (
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
                          {/* I Need / I Offer Tabs */}
                          <div className="mb-4 flex border-b pb-2">
                            <button
                              onClick={() => setDropdownTab("need")}
                              className={`flex-1 text-center py-2 font-medium transition-colors ${
                                dropdownTab === "need"
                                  ? "text-blue-600 border-b-2 border-blue-600"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              I Need
                            </button>
                            <button
                              onClick={() => setDropdownTab("offer")}
                              className={`flex-1 text-center py-2 font-medium transition-colors ${
                                dropdownTab === "offer"
                                  ? "text-blue-600 border-b-2 border-blue-600"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              I Offer
                            </button>
                          </div>

                          {/* I Need Content */}
                          {dropdownTab === "need" && (
                            <>
                              {/* Two Column Layout */}
                              <div className="grid grid-cols-2 gap-8">
                                {/* Left Column - I need a property for rent */}
                                <div>
                                  <div className="mb-4">
                                    <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-3">
                                      <input
                                        type="radio"
                                        name="propertyType"
                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                      />
                                      <span className="ml-2">
                                        I need a property for rent
                                      </span>
                                    </label>
                                    <div className="grid grid-cols-1 gap-2 ml-6">
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property[
                                              "Single Family Home"
                                            ]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Single Family Home"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Single Family Home
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property["Apartment"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Apartment"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Apartment
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={subChecks.property["Condo"]}
                                          onChange={() =>
                                            handleSubToggle("property", "Condo")
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Condo
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property["Town House"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Town House"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Town House
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={subChecks.property["Homes"]}
                                          onChange={() =>
                                            handleSubToggle("property", "Homes")
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Homes
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={subChecks.property["Houses"]}
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Houses"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Houses
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property["Hostels"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Hostels"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Hostels
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property[
                                              "Basement Apartment"
                                            ]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Basement Apartment"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Basement Apartment
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column - I need a room for rent */}
                                <div>
                                  <div className="mb-4">
                                    <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-3">
                                      <input
                                        type="radio"
                                        name="propertyType"
                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                      />
                                      <span className="ml-2">
                                        I need a room for rent
                                      </span>
                                    </label>
                                    <div className="space-y-2 ml-6">
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.room["Single Room"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "room",
                                              "Single Room"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Rooms for Rent
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.room["Shared Room"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "room",
                                              "Shared Room"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Shared Room
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.room["Paying Guest"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "room",
                                              "Paying Guest"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Paying Guest
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <hr className="border-gray-200 my-4" />

                              {/* Parking Garage Section - Radio Button */}
                              <div className="mb-4">
                                <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-2">
                                  <input
                                    type="radio"
                                    name="propertyType"
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                  />
                                  <span className="ml-2">
                                    I need a parking garage for rent
                                  </span>
                                </label>
                                <div className="space-y-1 ml-6">
                                  <label className="flex items-center cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={
                                        subChecks.parking[
                                          "Parking garage for rent"
                                        ]
                                      }
                                      onChange={() =>
                                        handleSubToggle(
                                          "parking",
                                          "Parking garage for rent"
                                        )
                                      }
                                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-gray-600">
                                      Parking garage for rent
                                    </span>
                                  </label>
                                </div>
                              </div>

                              <hr className="border-gray-200 my-4" />

                              {/* Commercial Space Section - Radio Button */}
                              <div className="mb-2">
                                <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-2">
                                  <input
                                    type="radio"
                                    name="propertyType"
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                  />
                                  <span className="ml-2">
                                    I need a commercial space
                                  </span>
                                </label>
                                <div className="space-y-1 ml-6">
                                  <label className="flex items-center cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={
                                        subChecks.commercial["Office Space"]
                                      }
                                      onChange={() =>
                                        handleSubToggle(
                                          "commercial",
                                          "Office Space"
                                        )
                                      }
                                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-gray-600">
                                      Office Space
                                    </span>
                                  </label>
                                  <label className="flex items-center cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={
                                        subChecks.commercial["Retail Outlet"]
                                      }
                                      onChange={() =>
                                        handleSubToggle(
                                          "commercial",
                                          "Retail Outlet"
                                        )
                                      }
                                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-gray-600">
                                      Retail Outlet
                                    </span>
                                  </label>
                                  <label className="flex items-center cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={subChecks.commercial["Others"]}
                                      onChange={() =>
                                        handleSubToggle("commercial", "Others")
                                      }
                                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-gray-600">
                                      Others
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </>
                          )}

                          {/* I Offer Content */}
                          {dropdownTab === "offer" && (
                            <>
                              {/* Two Column Layout */}
                              <div className="grid grid-cols-2 gap-6">
                                {/* Left Column - I offer a property for rent */}
                                <div>
                                  <div className="mb-4">
                                    <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-3">
                                      <input
                                        type="radio"
                                        name="propertyType"
                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                      />
                                      <span className="ml-2">
                                        I offer a property for rent
                                      </span>
                                    </label>
                                    <div className="grid grid-cols-1 gap-2 ml-6">
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property[
                                              "Single Family Home"
                                            ]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Single Family Home"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Single Family Home
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property["Apartment"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Apartment"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Apartment
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={subChecks.property["Condo"]}
                                          onChange={() =>
                                            handleSubToggle("property", "Condo")
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Condo
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property["Town House"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Town House"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Town House
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={subChecks.property["Homes"]}
                                          onChange={() =>
                                            handleSubToggle("property", "Homes")
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Homes
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={subChecks.property["Houses"]}
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Houses"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Houses
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property["Hostels"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Hostels"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Hostels
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.property[
                                              "Basement Apartment"
                                            ]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "property",
                                              "Basement Apartment"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Basement Apartment
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column - I offer a room for rent */}
                                <div>
                                  <div className="mb-4">
                                    <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-3">
                                      <input
                                        type="radio"
                                        name="propertyType"
                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                      />
                                      <span className="ml-2">
                                        I offer a room for rent
                                      </span>
                                    </label>
                                    <div className="space-y-2 ml-6">
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.room["Single Room"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "room",
                                              "Single Room"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Single Room
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.room["Shared Room"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "room",
                                              "Shared Room"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Shared Room
                                        </span>
                                      </label>
                                      <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subChecks.room["Paying Guest"]
                                          }
                                          onChange={() =>
                                            handleSubToggle(
                                              "room",
                                              "Paying Guest"
                                            )
                                          }
                                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-gray-600">
                                          Paying Guest
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <hr className="border-gray-200 my-4" />

                              {/* Parking Garage Section - Radio Button */}
                              <div className="mb-4">
                                <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-2">
                                  <input
                                    type="radio"
                                    name="propertyType"
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                  />
                                  <span className="ml-2">
                                    I offer a parking garage for rent
                                  </span>
                                </label>
                                <div className="space-y-1 ml-6">
                                  <label className="flex items-center cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={
                                        subChecks.parking[
                                          "Parking garage for rent"
                                        ]
                                      }
                                      onChange={() =>
                                        handleSubToggle(
                                          "parking",
                                          "Parking garage for rent"
                                        )
                                      }
                                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-gray-600">
                                      Parking garage for rent
                                    </span>
                                  </label>
                                </div>
                              </div>

                              <hr className="border-gray-200 my-4" />

                              {/* Commercial Space Section - Radio Button */}
                              <div className="mb-2">
                                <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700 mb-2">
                                  <input
                                    type="radio"
                                    name="propertyType"
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                                  />
                                  <span className="ml-2">
                                    I offer a commercial space
                                  </span>
                                </label>
                                <div className="space-y-1 ml-6">
                                  <label className="flex items-center cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={
                                        subChecks.commercial["Office Space"]
                                      }
                                      onChange={() =>
                                        handleSubToggle(
                                          "commercial",
                                          "Office Space"
                                        )
                                      }
                                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-gray-600">
                                      Office Space
                                    </span>
                                  </label>
                                  <label className="flex items-center cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={
                                        subChecks.commercial["Retail Outlet"]
                                      }
                                      onChange={() =>
                                        handleSubToggle(
                                          "commercial",
                                          "Retail Outlet"
                                        )
                                      }
                                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-gray-600">
                                      Retail Outlet
                                    </span>
                                  </label>
                                  <label className="flex items-center cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={subChecks.commercial["Others"]}
                                      onChange={() =>
                                        handleSubToggle("commercial", "Others")
                                      }
                                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-gray-600">
                                      Others
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </>
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
                  ViewResults
                </button>

                {/* Enhanced Plus/Minus Filter Button with Professional Dropdown */}
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
                            Refine your property search with detailed
                            preferences
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
                                Lease Type
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                bg-white transition-all duration-200"
                              >
                                <option value="">Any Lease Type</option>
                                <option value="short-term">
                                  Short Term (&lt;6 months)
                                </option>
                                <option value="long-term">Long Term</option>
                                <option value="month-to-month">
                                  Month to Month
                                </option>
                              </select>
                            </div>

                            {/* Bath Type */}
                            <div className="mb-5">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Bath Type
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
                                    Attached Bath
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
                                    Shared Bath
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Languages Known Section */}
                          <div className="mb-8">
                            <div className="flex items-center mb-4">
                              <div className="w-1.5 h-6 bg-green-600 rounded-full mr-3"></div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Languages & Preferences
                              </h3>
                            </div>

                            {/* Languages Input */}
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Languages Spoken
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Search languages..."
                                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             pr-10 transition-all duration-200"
                                />
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              </div>
                              {/* Selected Languages */}
                              <div className="mt-3 flex flex-wrap gap-2">
                                <span
                                  className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 
                                px-3 py-1.5 rounded-full text-xs font-medium"
                                >
                                  English
                                  <button
                                    type="button"
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    ×
                                  </button>
                                </span>
                                <span
                                  className="inline-flex items-center gap-2 bg-green-100 text-green-800 
                                px-3 py-1.5 rounded-full text-xs font-medium"
                                >
                                  Spanish
                                  <button
                                    type="button"
                                    className="text-green-600 hover:text-green-800 transition-colors"
                                  >
                                    ×
                                  </button>
                                </span>
                              </div>
                            </div>

                            {/* Seller Type */}
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Seller Type
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Any Seller Type</option>
                                <option value="owner">Property Owner</option>
                                <option value="tenant">Existing Tenant</option>
                                <option value="agent">Agent</option>
                                <option value="builder">Builder</option>
                              </select>
                            </div>

                            {/* Preferred Gender */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Preferred Gender
                              </label>
                              <div className="grid grid-cols-3 gap-3">
                                {[
                                  { value: "any", label: "Any", color: "gray" },
                                  {
                                    value: "male",
                                    label: "Male",
                                    color: "blue",
                                  },
                                  {
                                    value: "female",
                                    label: "Female",
                                    color: "pink",
                                  },
                                ].map((option) => (
                                  <label
                                    key={option.value}
                                    className={`flex items-center justify-center p-3 border-2 
                    ${
                      option.value === "any"
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-200"
                    } 
                    rounded-lg cursor-pointer transition-all duration-200 hover:scale-105`}
                                  >
                                    <input
                                      type="radio"
                                      name="gender"
                                      value={option.value}
                                      className="sr-only"
                                      defaultChecked={option.value === "any"}
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                      {option.label}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Additional filters and actions */}
                        <div className="w-full lg:w-3/5 p-6 bg-gray-50 overflow-y-auto">
                          {/* Pets & Occupation Section */}
                          <div className="mb-8">
                            <div className="flex items-center mb-4">
                              <div className="w-1.5 h-6 bg-purple-600 rounded-full mr-3"></div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Lifestyle Preferences
                              </h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Pets */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  🐾 Pets Policy
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                  bg-white transition-all duration-200"
                                >
                                  <option value="">Any pets allowed</option>
                                  <option value="dogs-allowed">
                                    Dogs allowed
                                  </option>
                                  <option value="cats-allowed">
                                    Cats allowed
                                  </option>
                                  <option value="no-pets">No pets</option>
                                  <option value="small-pets">
                                    Small pets only
                                  </option>
                                </select>
                              </div>

                              {/* Occupation */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  💼 Occupation
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                  bg-white transition-all duration-200"
                                >
                                  <option value="">Any occupation</option>
                                  <option value="student">Student</option>
                                  <option value="working-professional">
                                    Working Professional
                                  </option>
                                  <option value="self-employed">
                                    Self Employed
                                  </option>
                                  <option value="remote-worker">
                                    Remote Worker
                                  </option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Age Section */}
                          <div className="mb-8">
                            <div className="flex items-center mb-4">
                              <div className="w-1.5 h-6 bg-orange-600 rounded-full mr-3"></div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Age Preference
                              </h3>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                              {[
                                { range: "18-25", label: "18-25 years" },
                                { range: "26-35", label: "26-35 years" },
                                { range: "36-45", label: "36-45 years" },
                                { range: "46-55", label: "46-55 years" },
                                { range: "55+", label: "55+ years" },
                                { range: "", label: "Any age" },
                              ].map((age) => (
                                <label
                                  key={age.range}
                                  className="flex items-center p-3 border-2 border-gray-200 
                                                 rounded-lg hover:border-blue-300 hover:bg-blue-50 
                                                 cursor-pointer transition-all duration-200"
                                >
                                  <input
                                    type="radio"
                                    name="age-range"
                                    value={age.range}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    defaultChecked={age.range === ""}
                                  />
                                  <span className="ml-3 text-sm text-gray-700 font-medium">
                                    {age.label}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Netofly Cities Section */}
                          <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className="w-1.5 h-6 bg-red-600 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  Netofly Cities
                                </h3>
                              </div>
                              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Select All
                              </button>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-3 bg-white rounded-lg border border-gray-200">
                              {[
                                "Year",
                                "Worldside",
                                "New York",
                                "Brooklyn",
                                "Rego Park",
                                "Forest Hills",
                                "Flushing",
                                "Bronx",
                                "Kew Gardens",
                                "Fresh Meadows",
                                "Ozone Park",
                                "Bayside",
                                "Jamaica",
                                "South Ozone Park",
                                "Queens Village",
                                "Glen Oaks",
                                "New Hyde Park",
                                "Elmont",
                                "Mineola",
                                "Valhalla",
                                "White Plains",
                                "Elmsford",
                                "Jericho",
                                "Hicksville",
                                "Bethpage",
                                "Plainview",
                                "Pleasantville",
                                "Osalning",
                                "Huntington",
                                "Huntington Station",
                              ].map((city, index) => (
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
                                    {city}
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
                              Search Properties (24 matches)
                            </button>
                            <button
                              className="w-full bg-white text-gray-700 py-3 px-4 rounded-xl 
                              border border-gray-300 hover:bg-gray-50 hover:border-gray-400 
                              transition-all duration-200 text-sm font-medium 
                              flex items-center justify-center gap-2"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                              Save Filter Preset
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Bottom Action Bar */}
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
                          12 filters active • 24 properties match your criteria
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
                              // Handle filter application
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
                  SaveChanges
                </button>
              </div>
            </div>
          </div>

          {/* Get Matched Section */}
          <div className="w-full h-auto lg:h-[45vh] mt-10 bg-white flex flex-col lg:flex-row items-center justify-between p-8 lg:px-16 rounded-2xl shadow-lg overflow-hidden">
            <div className="w-full lg:w-1/2 text-black space-y-4 mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold leading-snug -mt-10">
                Looking for the right room or the right roommate?
              </h2>
              <p className="text-lg opacity-90">
                Let us match you instantly — no stress.
              </p>
              <div className="">
                <button
                  className="mt-3 outline-none inline-flex items-center justify-between bg-[#40B3A2] 
                  min-w-[200px] border-0 rounded shadow-[0_4px_12px_rgba(0,0,0,0.1)] box-border 
                  px-5 py-4 text-white text-xs font-semibold tracking-[1.2px] uppercase 
                  overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                >
                  Get Matched Instantly
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 h-64 lg:h-[85%] flex justify-center lg:justify-end">
              <img
                src="/getmatchedimg.jpg"
                alt="Get Matched"
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
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full lg:w-[65%] border-gray-200 gap-4">
            <div className="flex gap-4 lg:gap-8 ">
              <button
                onClick={() => setMainTab("offered")}
                className={` pb-4 lg:pb-5 px-3 font-medium transition-colors ${
                  mainTab === "offered"
                    ? "text-gray-900 border-t-4 border-red-500 rounded-t-lg bg-white -mb-0.5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Rooms offered
              </button>
              <button
                onClick={() => setMainTab("wanted")}
                className={`pb-3 px-1 font-medium transition-colors ${
                  mainTab === "wanted"
                    ? "text-gray-900 border-t-4 border-red-500 rounded-t-lg bg-white -mb-0.5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Roommates wanted
              </button>
            </div>
            <div className="lg:ml-108 lg:-mt-2">
              <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors w-full lg:w-auto justify-center">
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
                      Indian Roommates in New York
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {allProperties.length} Rooms available in your city
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
                        <option value="distance">Distance</option>
                        <option value="price-min-max">Price: Min to Max</option>
                        <option value="price-max-min">Price: Max to Min</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] bg-gray-400 w-full my-4" />
                {/* Nearby Neighborhoods */}
                <div className="">
                  <h2 className="text-base font-semibold text-gray-900 mb-2">
                    Nearby neighborhoods in New York Metro Area
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Gowanus",
                      "Pelham Parkway",
                      "Civic Center",
                      "Bowne Park",
                      "Riverdale",
                      "Bay Ridge",
                    ].map((neighborhood) => (
                      <button
                        key={neighborhood}
                        className="flex items-center gap-1 px-2 bg-gray-100 border border-gray-200 rounded-full transition-colors hover:bg-gray-200"
                      >
                        <FaMapMarkerAlt className="text-gray-500 text-sm" />
                        <span className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer">
                          {neighborhood}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Property Cards Grid */}
              <div className="properties-section grid grid-cols-1 gap-6 cursor-pointer mt-6">
                {getCurrentProperties().map((property) => (
                  <PropertyCard key={property.id} property={property} />
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
                    {Math.min(currentPage * itemsPerPage, allProperties.length)}{" "}
                    of {allProperties.length} properties
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
              {/* Your existing right side content remains the same */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Counties near New York
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Rooms in Collin County",
                    "Rooms in Guilford County",
                    "Rooms in Somerset County",
                    "Rooms in Bristol County",
                    "Rooms in Norfolk County",
                  ].map((county) => (
                    <a
                      key={county}
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                    >
                      {county}
                    </a>
                  ))}
                </div>
              </div>

              {/*  Room Types in New York */}

              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Room Types in New York
                </h2>

                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>

                <div className="flex flex-col gap-2.5">
                  {[
                    "Single Rooms for Rent",
                    "Shared Rooms for Rent",
                    "Paying Guest for Rent",
                  ].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* Popular Roommates Cities in New York */}

              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Popular Roommates Cities in New York
                </h2>

                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>

                <div className="flex flex-col gap-2.5">
                  {[
                    "Rooms in New York, NY",
                    "Rooms in Hicksville, NY",
                    "Rooms in Brooklyn, NY",
                    "Rooms in Flushing, NY",
                    "Rooms in White Plains, NY",
                  ].map((city, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                    >
                      {city}
                    </a>
                  ))}
                </div>
              </div>

              {/* Student Housing near popular Universities */}

              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Student Housing near popular Universities
                </h2>

                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>

                <div className="flex flex-col gap-2.5">
                  {[
                    { name: "New York University", count: 133 },
                    {
                      name: "Vaughn College of Aeronautics and Technology",
                      count: 126,
                    },
                    {
                      name: "Columbia University in the City of New York",
                      count: 124,
                    },
                    { name: "Adelphi University", count: 29 },
                    { name: "Hofstra University", count: 23 },
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

              {/*  Nearby Neighborhoods in New York */}

              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Nearby Neighborhoods in New York
                </h2>

                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>

                <div className="flex flex-col gap-2.5">
                  {[
                    "Rooms for Rent in 14621, Rochester, NY",
                    "Rooms for Rent in 19th Ward, Rochester, NY",
                    "Rooms for Rent in ABC Streets, Rochester, NY",
                    "Rooms for Rent in Allerton, New York, NY",
                    "Rooms for Rent in Alley Pond Park, New York, NY",
                  ].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/*     Agents in New York */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Agents in New York
                </h2>

                <div className="h-[1px] bg-gray-300 w-full mb-4"></div>

                <div className="flex flex-col gap-6">
                  {[
                    {
                      name: "Er",
                      agency: "Agent with None",
                      location: "New York, NY",
                      phone: "917-887-0747",
                      initialBg: "bg-red-300",
                      initial: "E",
                    },
                    {
                      name: "Guruaccounting",
                      agency: "Agent with GURU REAL ESTATE SERVICES LLC",
                      location: "Richmond Hill, NY",
                      phone: "917-805-0070",
                      initialBg: "bg-purple-300",
                      initial: "G",
                    },
                    {
                      name: "Alan",
                      agency: "Agent with American Luxury Homes",
                      location: "East Meadow, NY",
                      phone: "203-665-8431",
                      initialBg: "bg-yellow-300",
                      initial: "A",
                    },
                  ].map((agent, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                    >
                      {/* Row Top */}
                      <div className="flex items-start gap-4">
                        {/* Initial Box */}
                        <div
                          className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-semibold text-xl ${agent.initialBg}`}
                        >
                          {agent.initial}
                        </div>

                        {/* Agent Info */}
                        <div>
                          <a
                            href="#"
                            className="text-blue-600 font-semibold hover:underline"
                          >
                            {agent.name}
                          </a>
                          <p className="text-sm text-gray-700">
                            {agent.agency}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-col gap-1 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">📍</span>
                            {agent.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">📞</span>
                            {agent.phone}
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition">
                            View More
                          </button>
                          <button className="px-3 py-1.5 border border-red-400 text-red-500 rounded-md text-sm hover:bg-red-50 transition">
                            Respond
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
                    View More Agents in New York →
                  </a>
                </div>
              </div>

              {/* open houses in new york cities */}

              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 mt-10">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Open Houses in New York
                </h2>

                <div className="space-y-5">
                  {openHouses.map((item, index) => (
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
                          ${item.price}
                        </span>

                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border">
                          {item.roomType}
                        </span>

                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border">
                          {item.gender}
                        </span>

                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border">
                          {item.bath}
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

              {/* Rest of your right side components... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomMateDetails;
