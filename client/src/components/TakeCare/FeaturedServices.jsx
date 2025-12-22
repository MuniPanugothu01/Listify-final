import React from "react";
import { ChevronRight, Star, MapPin, ShieldCheck } from "lucide-react";

const FeaturedServices = ({ providers }) => {
  return (
    <section className="mb-20">
      {/* Centered Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Featured Providers
        </h2>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Top-rated childcare services near you
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-2xl hover:border-[#27BB97]/60 transition-all duration-300 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
              {provider.badge && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white text-xs font-bold rounded-full shadow-sm">
                    {provider.badge}
                  </span>
                </div>
              )}
              <div className="absolute top-4 right-4 z-20">
                {provider.verified && (
                  <ShieldCheck className="w-7 h-7 text-[#27BB97] drop-shadow-md" />
                )}
              </div>
              <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#27BB97] transition-colors">
                    {provider.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{provider.type}</p>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-800">{provider.rating}</span>
                  <span className="text-gray-500 text-xs">({provider.reviews})</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {provider.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {provider.features.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                    +{provider.features.length - 3}
                  </span>
                )}
              </div>

              {/* Footer Info */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{provider.location}</span>
                </div>
                <div className="text-sm font-semibold text-[#27BB97]">
                  {provider.availability}
                </div>
              </div>

              {/* View Details Button */}
              <button className="w-full mt-6 py-3  text-[#27BB97] font-semibold rounded-xl border border-[#27BB97] hover:text-white hover:bg-[#27BB97] transition-all shadow-md hover:shadow-lg">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button at the bottom */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#27BB97] text-[#27BB97] font-semibold rounded-xl hover:bg-[#27BB97] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
          View More Providers
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedServices;