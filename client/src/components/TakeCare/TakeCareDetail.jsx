import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  ChevronRight,
  Star,
  Check,
  Clock,
  Shield,
  User,
  Baby,
  Users,
  PawPrint,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Verified,
  Award,
  Calendar,
  Phone,
  Mail,
  Globe,
  BookOpen,
  Sparkles,
  Briefcase,
} from "lucide-react";

// Import care taker data
import { careTakerData } from "./TakeCareListing";

// Location Map Component
const CareTakerLocationMap = ({ location }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#27bb97]" />
          Location
        </h3>
        <p className="text-gray-600 mt-2">{location}</p>
      </div>

      <div className="relative h-64 sm:h-72 md:h-80 bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-50">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, #cbd5e1 1px, transparent 1px),
              linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          ></div>

          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <User className="w-12 h-12 text-[#27bb97] animate-pulse" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#27bb97] rounded-full"></div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg text-center">
              <p className="font-medium text-gray-800">{location}</p>
              <p className="text-xs text-gray-500 mt-1">
                Service area: 10 mile radius
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="w-4 h-4 mr-2" />
            <span>Background checked & verified</span>
          </div>
          <button className="text-sm text-[#27bb97] hover:text-[#1fa987] font-medium">
            View service area →
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Care Taker Detail Component
const TakeCareDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const careTaker = careTakerData.find((p) => p.id === parseInt(id));

  if (!careTaker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-md">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Care Taker not found
          </h2>
          <button
            onClick={() => navigate("/caretakers")}
            className="px-6 py-3 bg-[#27bb97] text-white rounded-lg hover:bg-[#1E9E7E] transition-colors font-medium text-base sm:text-lg"
          >
            Back to Care Takers
          </button>
        </div>
      </div>
    );
  }

  // Additional images for gallery
  const careTakerImages = [
    careTaker.image,
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&q=80",
  ].filter(Boolean);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => setSelectedImageIndex(index);
  const handlePrevImage = () =>
    setSelectedImageIndex((prev) =>
      prev === 0 ? careTakerImages.length - 1 : prev - 1,
    );
  const handleNextImage = () =>
    setSelectedImageIndex((prev) =>
      prev === careTakerImages.length - 1 ? 0 : prev + 1,
    );

  // Care Taker details
  const careTakerDetails = [
    {
      icon: <Briefcase className="text-[#27bb97] text-xl" />,
      label: "Experience",
      value: careTaker.experience,
    },
    {
      icon: <Calendar className="text-[#27bb97] text-xl" />,
      label: "Availability",
      value: careTaker.availability,
    },
    {
      icon: <User className="text-[#27bb97] text-xl" />,
      label: "Age",
      value: `${careTaker.age} years`,
    },
    {
      icon: <Globe className="text-[#27bb97] text-xl" />,
      label: "Languages",
      value: careTaker.languages.join(", "),
    },
  ];

  // Service specifications
  const serviceSpecs = [
    {
      icon: <Shield className="text-[#27bb97] text-xl" />,
      label: "Background Check",
      value: "Completed & Verified",
    },
    {
      icon: <Award className="text-[#27bb97] text-xl" />,
      label: "Response Time",
      value: "Within 1 hour",
    },
    {
      icon: <Verified className="text-[#27bb97] text-xl" />,
      label: "Verification Status",
      value: "Fully Verified",
    },
    {
      icon: <BookOpen className="text-[#27bb97] text-xl" />,
      label: "Education Level",
      value: "Certified Professional",
    },
  ];

  // Category icon mapping
  const categoryIcons = {
    Nanny: <Baby className="w-5 h-5" />,
    Babysitter: <Users className="w-5 h-5" />,
    "Elder Care": <Shield className="w-5 h-5" />,
    "Pet Care": <PawPrint className="w-5 h-5" />,
  };

  // Find similar care takers (same category)
  const similarCareTakers = careTakerData
    .filter((c) => c.id !== careTaker.id && c.category === careTaker.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <div className="bg-white shadow-sm top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-sm text-gray-600 min-w-0 flex-1">
              <button
                onClick={() => navigate("/caretakers")}
                className="hover:text-[#27bb97] transition-colors whitespace-nowrap"
              >
                Care Takers
              </button>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-gray-900 truncate">
                {careTaker.name}
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
          {/* Left Column - 60% */}
          <div className="lg:col-span-6">
            {/* Main Image */}
            <div className="rounded-md mb-6 shadow-sm overflow-hidden bg-white p-4">
              <div className="relative">
                <img
                  src={careTakerImages[selectedImageIndex]}
                  alt={careTaker.name}
                  className="w-full h-auto max-h-[500px] rounded-md object-cover bg-gray-50"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:shadow-xl z-20"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:shadow-xl z-20"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mb-8">
              {careTakerImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer transition-all ${
                    selectedImageIndex === index
                      ? "border-2 border-[#27bb97] shadow-md"
                      : "hover:border-2 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>

            {/* Location Map */}
            <CareTakerLocationMap location={careTaker.location} />

            {/* Care Taker Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                About {careTaker.name}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {careTaker.description}
              </p>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-lg font-semibold mb-3">Services Offered</h4>
                <ul className="space-y-2">
                  {careTaker.services.map((service, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-[#27bb97] mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Care Taker Info Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#27bb97]/10 text-[#1E9E7E]">
                    {categoryIcons[careTaker.category]}
                    <span className="ml-1">{careTaker.category}</span>
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {careTaker.rating}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      ({careTaker.reviews} reviews)
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {careTaker.name}
                </h2>

                <p className="text-gray-600 mb-6">{careTaker.title}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1 font-medium">
                    HOURLY RATE
                  </div>
                  <div className="text-4xl font-bold text-[#27bb97]">
                    ${careTaker.price}
                    <span className="text-lg text-gray-500">/hr</span>
                  </div>
                </div>

                {/* Care Taker Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {careTakerDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-600"
                    >
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        {detail.icon}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">
                          {detail.label}
                        </div>
                        <div className="font-medium text-sm">
                          {detail.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {careTaker.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full py-4 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                    <MessageCircle className="w-5 h-5 inline mr-2" />
                    Contact {careTaker.name.split(" ")[0]}
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-300 transition-colors">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Call Now
                    </button>
                    <button className="py-3 bg-white border-2 border-[#27bb97] text-[#27bb97] rounded-lg font-medium hover:bg-[#27bb97]/5 transition-colors">
                      <Heart className="w-4 h-4 inline mr-2" />
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Specifications */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-700">
                  Service Details
                </h3>
                <div className="grid grid-cols-2 gap-y-4">
                  {serviceSpecs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg">
                        {spec.icon}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">
                          {spec.label}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {spec.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Care Takers */}
        {similarCareTakers.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Similar {careTaker.category}s
              </h2>
              <button
                onClick={() => navigate("/caretakers")}
                className="text-[#27bb97] hover:text-[#1E9E7E] font-medium"
              >
                View all care takers →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCareTakers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/caretaker/${item.id}`)}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {item.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#27bb97]">
                        ${item.price}
                        <span className="text-xs text-gray-500">/hr</span>
                      </span>
                      <span className="text-xs font-medium text-gray-500 px-3 py-1.5 bg-gray-100 rounded-full">
                        <Briefcase className="w-3 h-3 inline mr-1" />
                        {item.experience}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeCareDetail;
