import React from 'react';
import { Star, MapPin, Users, CheckCircle, Home, Calendar } from 'lucide-react';

export default function CareCenterJobs() {
  const careCenters = [
    {
      name: "Harmony Senior Living",
      type: "Assisted Living",
      rating: 4.8,
      reviews: 124,
      location: "Manhattan, NY",
      distance: "2.5 miles",
      amenities: ["24/7 Nursing", "Memory Care", "Physical Therapy"],
      price: "$5,200/month",
      availability: "3 spots available"
    },
    {
      name: "Golden Years Nursing Home",
      type: "Nursing Home",
      rating: 4.6,
      reviews: 89,
      location: "Brooklyn, NY",
      distance: "3.1 miles",
      amenities: ["Skilled Nursing", "Rehabilitation", "Hospice Care"],
      price: "$7,800/month",
      availability: "Limited availability"
    },
    {
      name: "Serenity Memory Care",
      type: "Memory Care",
      rating: 4.9,
      reviews: 67,
      location: "Queens, NY",
      distance: "4.2 miles",
      amenities: ["Specialized Dementia Care", "Secure Facility", "Activities"],
      price: "$6,500/month",
      availability: "5 spots available"
    },
    {
      name: "Evergreen Rehabilitation",
      type: "Rehab Center",
      rating: 4.7,
      reviews: 112,
      location: "Bronx, NY",
      distance: "5.0 miles",
      amenities: ["Physical Therapy", "Occupational Therapy", "Speech Therapy"],
      price: "$350/day",
      availability: "10 spots available"
    }
  ];

  return (
    <div className="px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-2">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="text-[#27BB97] text-xs xs:text-sm font-medium">Quality Care Centers</span>
            <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5 text-[#27BB97]" />
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-tight">
            Top Rated Care Centers In New York, NY
          </h1>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg max-w-3xl mx-auto">
            Browse licensed and accredited care facilities with verified reviews and transparent pricing
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button className="px-3 xs:px-4 py-1.5 xs:py-2 bg-[#27BB97] text-white rounded-full text-xs xs:text-sm font-medium">
              All Centers
            </button>
            <button className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-100 text-gray-700 rounded-full text-xs xs:text-sm font-medium hover:bg-gray-200">
              Assisted Living
            </button>
            <button className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-100 text-gray-700 rounded-full text-xs xs:text-sm font-medium hover:bg-gray-200">
              Nursing Homes
            </button>
            <button className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-100 text-gray-700 rounded-full text-xs xs:text-sm font-medium hover:bg-gray-200">
              Memory Care
            </button>
            <button className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-100 text-gray-700 rounded-full text-xs xs:text-sm font-medium hover:bg-gray-200">
              Rehabilitation
            </button>
          </div>
        </div>

        {/* Care Centers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
          {careCenters.map((center, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg sm:shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-[1.02]">
              {/* Center Header */}
              <div className="p-4 xs:p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-3 xs:mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-r from-[#27BB97] to-[#1EA583] rounded-xl flex items-center justify-center">
                      <Home className="w-8 h-8 xs:w-10 xs:h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1 xs:mb-2">
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900">
                        {center.name}
                      </h3>
                      <span className="px-2 py-0.5 bg-[#27BB97]/10 text-[#27BB97] rounded-full text-xs font-medium">
                        {center.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 xs:mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 xs:w-4 xs:h-4 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-gray-900 text-sm xs:text-base">{center.rating}</span>
                      </div>
                      <span className="text-gray-500 text-xs xs:text-sm">({center.reviews} reviews)</span>
                      <div className="flex items-center gap-1 text-gray-500 text-xs xs:text-sm">
                        <MapPin className="w-3 h-3 xs:w-4 xs:h-4" />
                        <span>{center.distance} away</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs xs:text-sm mb-3">
                      {center.location}
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-3 xs:mb-4">
                  <p className="text-gray-700 font-medium text-xs xs:text-sm mb-2">Key Amenities:</p>
                  <div className="flex flex-wrap gap-1.5 xs:gap-2">
                    {center.amenities.map((amenity, idx) => (
                      <span key={idx} className="px-2 xs:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Availability */}
                <div className="flex flex-wrap items-center justify-between pt-3 xs:pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-lg xs:text-xl font-bold text-gray-900">{center.price}</p>
                    <p className="text-gray-600 text-xs xs:text-sm">{center.availability}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs xs:text-sm text-gray-600">
                    <Users className="w-3 h-3 xs:w-4 xs:h-4" />
                    <span>Licensed Staff</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6">
                <div className="grid grid-cols-2 gap-2 xs:gap-3">
                  <button 
                    className="bg-white border border-gray-300 text-gray-700 py-2 xs:py-2.5 sm:py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-1 xs:gap-2 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                    aria-label={`Schedule tour for ${center.name}`}
                  >
                    <Calendar className="w-3 h-3 xs:w-4 xs:h-4" />
                    Schedule Tour
                  </button>
                  <button 
                    className="bg-gradient-to-r from-[#27BB97] to-[#1EA583] text-white py-2 xs:py-2.5 sm:py-3 px-4 rounded-lg hover:from-[#1EA583] hover:to-[#168F6F] transition-all duration-200 flex items-center justify-center gap-1 xs:gap-2 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                    aria-label={`View details for ${center.name}`}
                  >
                    View Details
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button 
            className="bg-white border border-gray-300 text-gray-700 py-2.5 xs:py-3 sm:py-3 px-6 xs:px-8 sm:px-10 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
            aria-label="View all care centers"
          >
            View All Care Centers
          </button>
        </div>
      </div>
    </div>
  );
}