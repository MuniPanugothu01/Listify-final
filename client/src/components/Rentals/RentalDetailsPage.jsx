import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Home,
  Bath,
  Maximize2,
  Calendar,
  Building,
  Star,
  Clock,
  User,
  CheckCircle,
  Phone,
  MessageCircle,
  Wifi,
  Tv,
  Snowflake,
  Utensils,
  Dumbbell,
  Droplets,
  Thermometer,
  Shirt,
  Check,
  X,
  Dog,
  Music,
  Wine,
  ChefHat,
  Car,
  Shield,
  Trees,
  Cloud,
  Wind,
  Battery,
  Zap,
  Sofa,
  Coffee,
  Eye,
} from "lucide-react";
import {
  FaMapMarkerAlt,
  FaCar,
  FaWifi,
  FaTv,
  FaBolt,
  FaThermometerHalf,
  FaSnowflake,
  FaUtensils,
  FaDumbbell,
  FaSwimmingPool,
  FaShieldAlt,
  FaParking,
} from "react-icons/fa";
import { GiWashingMachine, GiGrass, GiGate } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { GoArrowUpLeft } from "react-icons/go";

const RentalDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, searchParams } = location.state || {};

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Overview");
  const [liked, setLiked] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // If no property data, redirect back to listings
  useEffect(() => {
    if (!property) {
      navigate("/rentals");
    }
  }, [property, navigate]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            Property Not Found
          </h2>
          <button
            onClick={() => navigate("/rentals")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const tabs = ["Overview", "Amenities", "Neighborhood", "Transportation"];

  const amenityIcons = {
    "Wi-Fi": <FaWifi className="w-5 h-5 text-blue-500" />,
    AC: <FaSnowflake className="w-5 h-5 text-blue-400" />,
    Gym: <FaDumbbell className="w-5 h-5 text-orange-500" />,
    Pool: <FaSwimmingPool className="w-5 h-5 text-cyan-500" />,
    Concierge: <User className="w-5 h-5 text-purple-500" />,
    Parking: <FaCar className="w-5 h-5 text-gray-600" />,
    Laundry: <GiWashingMachine className="w-5 h-5 text-indigo-500" />,
    Security: <FaShieldAlt className="w-5 h-5 text-green-500" />,
    "Utilities Included": <FaBolt className="w-5 h-5 text-yellow-500" />,
    Furnished: <Sofa className="w-5 h-5 text-brown-500" />,
    "Pet Friendly": <Dog className="w-5 h-5 text-pink-500" />,
    Balcony: <GiGrass className="w-5 h-5 text-green-600" />,
    Garage: <GiGate className="w-5 h-5 text-gray-700" />,
    Backyard: <GiGrass className="w-5 h-5 text-green-600" />,
    "TV/Cable": <FaTv className="w-5 h-5 text-purple-600" />,
    Water: <IoIosWater className="w-5 h-5 text-blue-300" />,
    Kitchen: <FaUtensils className="w-5 h-5 text-red-500" />,
    Washer: <GiWashingMachine className="w-5 h-5 text-indigo-500" />,
    Dryer: <GiWashingMachine className="w-5 h-5 text-indigo-600" />,
    "Exposed Brick": <Cloud className="w-5 h-5 text-gray-500" />,
    "High Ceilings": <Wind className="w-5 h-5 text-blue-300" />,
    "Modern Kitchen": <ChefHat className="w-5 h-5 text-orange-500" />,
    Rooftop: <Cloud className="w-5 h-5 text-blue-400" />,
    "Study Area": <Coffee className="w-5 h-5 text-brown-600" />,
    Storage: <Battery className="w-5 h-5 text-gray-600" />,
    Basement: <Cloud className="w-5 h-5 text-gray-700" />,
    Garden: <Trees className="w-5 h-5 text-green-500" />,
    "Lake View": <Droplets className="w-5 h-5 text-blue-400" />,
    Spa: <Droplets className="w-5 h-5 text-teal-500" />,
    Valet: <Car className="w-5 h-5 text-blue-600" />,
    "Smart Home": <Zap className="w-5 h-5 text-yellow-500" />,
    "Wine Cellar": <Wine className="w-5 h-5 text-purple-600" />,
    Terrace: <GiGrass className="w-5 h-5 text-green-500" />,
    "Panoramic Views": <Eye className="w-5 h-5 text-blue-500" />,
  };

  const houseRules = [
    {
      rule: "No Smoking",
      allowed: false,
      icon: <X className="w-5 h-5 text-red-500" />,
    },
    {
      rule: "Pets Allowed",
      allowed: property.petFriendly,
      icon: property.petFriendly ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      ),
    },
    {
      rule: "Guests Allowed",
      allowed: true,
      icon: <Check className="w-5 h-5 text-green-500" />,
    },
    {
      rule: "Parties Allowed",
      allowed: false,
      icon: <X className="w-5 h-5 text-red-500" />,
    },
    {
      rule: "Cooking Allowed",
      allowed: true,
      icon: <ChefHat className="w-5 h-5 text-orange-500" />,
    },
    {
      rule: "Alcohol Allowed",
      allowed: true,
      icon: <Wine className="w-5 h-5 text-purple-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop "Back to Home" link */}
      <div className="hidden lg:block ml-10 mt-2">
        <Link to="/rentals-listings">
          <p className="flex items-center gap-2 text-[#27bb97] capitalize hover:underline">
            <GoArrowUpLeft />
            back to home
          </p>
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-20 py-4 flex items-center justify-between">
          {/* Breadcrumb Navigation - Mobile/Tablet responsive changes */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={() => navigate("/rentals", { state: { searchParams } })}
              className="hover:text-blue-600 font-medium"
            >
              {/* Mobile: Show shortened text */}
              <span className="lg:hidden">Rentals</span>
              {/* Tablet & Desktop: Show full text */}
              <span className="hidden lg:inline">Toronto Rentals</span>
            </button>
            <ChevronRight className="w-4 h-4" />
            <button
              onClick={() => navigate("/rentals", { state: { searchParams } })}
              className="hover:text-blue-600 font-medium"
            >
              {/* Mobile: Show just city name */}
              <span className="sm:hidden">
                {searchParams?.location?.split(",")[0] || "Toronto"}
              </span>
              {/* Tablet & Desktop: Show full location */}
              <span className="hidden sm:inline">
                {searchParams?.location || "Toronto, ON"}
              </span>
            </button>
            <ChevronRight className="w-4 h-4" />
            {/* Property title with responsive truncation */}
            <span className="text-gray-500">
              {/* Mobile: Very short truncation */}
              <span className="sm:hidden truncate max-w-[60px]">
                {property.title.length > 8
                  ? `${property.title.substring(0, 8)}...`
                  : property.title}
              </span>
              {/* Tablet: Medium truncation */}
              <span className="hidden sm:block lg:hidden truncate max-w-[100px]">
                {property.title.length > 15
                  ? `${property.title.substring(0, 15)}...`
                  : property.title}
              </span>
              {/* Desktop: Original styling */}
              <span className="hidden lg:inline truncate max-w-md">
                {property.title}
              </span>
            </span>
          </div>

          {/* Action Buttons - Only spacing adjustments for mobile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
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
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${
                liked ? "text-red-500" : "text-gray-700"
              }`}
            >
              <Heart
                className="w-5 h-5"
                fill={liked ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:h-[500px] pb-2 lg:pb-0">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === idx
                      ? "border-blue-600 ring-2 ring-blue-100"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={property.images[selectedImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {property.images.length}
              </div>
            </div>
          </div>

          {/* Right: Property Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div className="space-y-4">
              <div className="block lg:flex lg:justify-between lg:items-start">
                {/* Title - always first */}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-3 lg:mb-0">
                  {property.title}
                </h1>

                {/* Price - always below title on mobile, next to it on desktop */}
                <div className="lg:text-right">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-500">
                    ${property.price.toLocaleString()}
                    <span className="text-lg font-normal text-gray-400">
                      /month
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Available from {property.availableFrom}
                  </div>
                </div>
              </div>

              {/* Location and Quick Info */}
              <div className="flex items-center gap-3 text-gray-400 flex-wrap sm:mb-5">
                <div className="flex items-center gap-1 text-[14px]">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[14px]">
                  <Building className="w-4 h-4 text-gray-500 text-[14px]" />
                  <span>{property.propertyType}</span>
                </div>
                <div className="flex items-center gap-1 text-[14px]">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Posted {property.posted}</span>
                </div>
              </div>

              {/* Verified Badges */}
              <div className="flex flex-wrap gap-2">
                {property.verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1  text-green-400 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Verified Listing
                  </span>
                )}
                {property.immediate && (
                  <span className="inline-flex items-center gap-1 px-3 py-1  text-blue-400 rounded-full text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    Immediate Availability
                  </span>
                )}
                {property.discount && (
                  <span className="inline-flex items-center gap-1 px-3 py-1  text-orange-400 rounded-full text-sm font-medium">
                    {property.discount}
                  </span>
                )}
                {property.petFriendly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1  text-pink-400 rounded-full text-sm font-medium">
                    <Dog className="w-4 h-4" />
                    Pet Friendly
                  </span>
                )}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Home className="w-5 h-5" />
                  <span className="text-lg font-semibold text-gray-400">
                    {property.bedrooms}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-1">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Bath className="w-5 h-5" />
                  <span className="text-lg font-semibold text-gray-400">
                    {property.bathrooms}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-1">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Maximize2 className="w-5 h-5" />
                  <span className="text-lg font-semibold text-gray-400">
                    {property.sqft} sqft
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-1">Square Feet</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg font-semibold text-gray-400">
                    {property.leaseTerm}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-1">Lease Term</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-700">
                Description
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {property.details}
              </p>
            </div>

            {/* Posted By Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-blue-50 rounded-xl gap-4">
              {/* Agent info - always first */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">
                    {property.postedBy}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-400 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>
                        {property.rating} ({property.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{property.responseRate} response rate</span>
                    </div>
                    {/* Views & Saves - on next line for mobile, right side for tablet/desktop */}

                    <div className="flex items-center gap-2 sm:ml-auto">
                      <span className="text-sm text-gray-400">
                        {property.views} views
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-400">
                        {property.saves} saves
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">
                  Contact Information
                </h3>
                {showContact ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">{property.contact}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowContact(true)}
                    className="text-blue-400 hover:text-blue-500 font-medium"
                  >
                    Show Contact
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    (window.location.href = `tel:${property.contact}`)
                  }
                  disabled={!property.availableForCall}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    property.availableForCall
                      ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
                <button
                  onClick={() =>
                    alert(`Opening chat with ${property.postedBy}`)
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    liked
                      ? "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={liked ? "currentColor" : "none"}
                  />
                  {liked ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section - Full width below both columns */}
        <div className="mt-12">
          {/* Tabs */}
          <div className="border rounded-xl shadow-sm bg-white">
            <div className="flex overflow-x-auto border-b">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "Overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Property Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Property Type:</span>
                          <span className="font-medium text-gray-600">
                            {property.propertyType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Available From:</span>
                          <span className="font-medium text-gray-600">
                            {property.availableFrom}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Lease Term:</span>
                          <span className="font-medium text-gray-600">
                            {property.leaseTerm}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Square Footage:</span>
                          <span className="font-medium text-gray-600">
                            {property.sqft} sqft
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bedrooms:</span>
                          <span className="font-medium text-gray-600">
                            {property.bedrooms}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bathrooms:</span>
                          <span className="font-medium text-gray-600">
                            {property.bathrooms}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Pet Policy:</span>
                          <span className="font-medium text-gray-600">
                            {property.petFriendly ? "Pet Friendly" : "No Pets"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Furnished:</span>
                          <span className="font-medium text-gray-600">
                            {property.amenities.includes("Furnished")
                              ? "Yes"
                              : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* House Rules */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      House Rules
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {houseRules.map((rule, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
                        >
                          {rule.icon}
                          <span className="font-medium text-gray-500">{rule.rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Amenities" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-700">
                    All Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        {amenityIcons[amenity] || (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        <span className="font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Neighborhood" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Neighborhood Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-700">What's Nearby</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-gray-400">Supermarkets: 3 within 0.5 miles</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-400">Restaurants: 15+ within walking distance</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span className="text-gray-400">Parks: 2 parks within 1 mile</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <span className="text-gray-400">Schools: 4 schools in the area</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-700">
                        Local Attractions
                      </h4>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-gray-600">
                          Located in the heart of {property.neighborhood}, this
                          property offers easy access to local attractions,
                          shopping centers, and entertainment venues. Perfect
                          for those who enjoy city living with all amenities
                          within reach.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Transportation" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Transportation
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-600">
                        Public Transportation
                      </h4>
                      <div className="space-y-2 text-gray-500">
                        {property.distance && (
                          <div className="flex items-center gap-3">
                            <span className="text-xl">🚇</span>
                            <span>{property.distance}</span>
                          </div>
                        )}
                        {property.busStopDistance && (
                          <div className="flex items-center gap-3">
                            <span className="text-xl">🚌</span>
                            <span>{property.busStopDistance}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-600">Parking</h4>
                      <p className="text-gray-400">
                        {property.amenities.includes("Parking")
                          ? "Parking available on premises"
                          : "Street parking only"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">
              Similar Properties in {property.location}
            </h2>
            <button
              onClick={() => navigate("/rentals", { state: { searchParams } })}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
            >
              View All Rentals
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Similar property 1 */}
            <div className="border rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
                  alt="Similar Property"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Modern Downtown Apartment
              </h3>
              <p className="text-gray-600 text-sm mb-3">Downtown Toronto</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-500">
                  $3,200/month
                </span>
                <button className="px-4 py-2 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] text-sm cursor-pointer">
                  View Details
                </button>
              </div>
            </div>

            {/* Similar property 2 */}
            <div className="border rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop"
                  alt="Similar Property"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Luxury Condo with View
              </h3>
              <p className="text-gray-600 text-sm mb-3">North York, Toronto</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-500">
                  $2,800/month
                </span>
                <button className="px-4 py-2 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] text-sm cursor-pointer">
                  View Details
                </button>
              </div>
            </div>

            {/* Similar property 3 */}
            <div className="border rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
                  alt="Similar Property"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Family Home with Garden
              </h3>
              <p className="text-gray-600 text-sm mb-3">Scarborough, Toronto</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-500">
                  $3,500/month
                </span>
                <button className="px-4 py-2 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] text-sm cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom "Back to Home" Button - Fixed at bottom center */}
      {/* This will show on mobile (lg:hidden) and hide on desktop */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <div className="flex justify-center">
          <Link to="/rentals-listings">
            <div
              className="
                flex 
                items-center 
                justify-center 
                gap-2 
                text-[#27bb97] 
                capitalize 
                bg-white 
                px-6 
                py-3 
                rounded-lg 
                shadow-lg 
                border 
                border-gray-300
                hover:bg-gray-50
                transition-all
                duration-200
                whitespace-nowrap
                text-base
                font-medium
                w-fit
                mx-auto
                hover:shadow-xl
                hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              <GoArrowUpLeft className="w-5 h-5" />
              <span>back to home</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RentalDetailsPage;
