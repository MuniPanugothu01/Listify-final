import React from "react";
import { ChevronRight, Star, MapPin, ShieldCheck } from "lucide-react";

const FeaturedServices = ({ providers }) => {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-20 px-3 xs:px-4 sm:px-6 lg:px-8">
      {/* Centered Header */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-2">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Featured Providers
        </h2>
        <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
          Top-rated childcare services near you
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-lg sm:hover:shadow-2xl hover:border-[#27BB97]/60 transition-all duration-300 flex flex-col h-full"
          >
            {/* Image Section */}
            <div className="relative h-48 xs:h-52 sm:h-56 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
              {provider.badge && (
                <div className="absolute top-3 left-3 xs:top-4 xs:left-4 z-20">
                  <span className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
                    {provider.badge}
                  </span>
                </div>
              )}
              <div className="absolute top-3 right-3 xs:top-4 xs:right-4 z-20">
                {provider.verified && (
                  <ShieldCheck className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-[#27BB97] drop-shadow-md" />
                )}
              </div>
              <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-4 xs:p-5 sm:p-6 flex flex-col flex-grow">
              {/* Header with name and rating */}
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2 xs:gap-0 mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-900 group-hover:text-[#27BB97] transition-colors line-clamp-1">
                    {provider.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-1">
                    {provider.type}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 xs:px-3 py-1 rounded-full self-start xs:self-center">
                  <Star className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-800 text-xs xs:text-sm">{provider.rating}</span>
                  <span className="text-gray-500 text-xs">({provider.reviews})</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-4 sm:mb-6">
                {provider.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 xs:px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full whitespace-nowrap line-clamp-1"
                    title={feature}
                  >
                    {feature}
                  </span>
                ))}
                {provider.features.length > 3 && (
                  <span className="px-2 xs:px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                    +{provider.features.length - 3}
                  </span>
                )}
              </div>

              {/* Footer Info */}
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2 xs:gap-0 mt-auto pt-3 xs:pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 xs:gap-2 text-gray-600">
                  <MapPin className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-xs xs:text-sm line-clamp-1" title={provider.location}>
                    {provider.location}
                  </span>
                </div>
                <div className="text-xs xs:text-sm font-semibold text-[#27BB97] whitespace-nowrap">
                  {provider.availability}
                </div>
              </div>

              {/* View Details Button */}
              <button 
                className="w-full mt-4 xs:mt-5 sm:mt-6 py-2.5 xs:py-3 sm:py-3 text-[#27BB97] font-semibold rounded-lg sm:rounded-xl border border-[#27BB97] hover:text-white hover:bg-[#27BB97] transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2 text-xs xs:text-sm sm:text-base"
                aria-label={`View details for ${provider.name}`}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button - Responsive */}
      <div className="mt-8 sm:mt-10 lg:mt-12 text-center px-2">
        <button 
          className="inline-flex items-center justify-center gap-2 xs:gap-3 px-5 xs:px-6 sm:px-8 py-3 xs:py-3.5 sm:py-4 bg-white border-2 border-[#27BB97] text-[#27BB97] font-semibold rounded-lg sm:rounded-xl hover:bg-[#27BB97] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2 text-sm xs:text-base sm:text-lg"
          aria-label="View more providers"
        >
          <span className="whitespace-nowrap">View More Providers</span>
          <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedServices;