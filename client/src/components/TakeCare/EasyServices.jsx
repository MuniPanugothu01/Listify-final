import React from "react";
import { ArrowRight } from "lucide-react";

const EasyServices = ({ services, onServiceClick }) => {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-20 mt-12 sm:mt-16 lg:mt-20">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-3 xs:px-4">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
          IT'S EASY TO FIND WHAT YOU NEED!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
          Are you seeking care services in your neighborhood? With us, it's easy!
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 px-3 xs:px-4 sm:px-6 lg:px-8">
        {services.map((service) => (
          <div 
            key={service.id}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 hover:border-[#27BB97] hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col h-full"
            onClick={() => onServiceClick(service.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onServiceClick(service.id);
              }
            }}
          >
            {/* Image Section */}
            <div className="relative h-36 xs:h-40 sm:h-44 md:h-48 overflow-hidden flex-shrink-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Popular Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <div className={`px-2 xs:px-3 py-1 bg-gradient-to-r ${service.color} text-white text-xs font-bold rounded-full whitespace-nowrap`}>
                  Popular
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 xs:p-5 sm:p-6 flex flex-col flex-grow">
              {/* Title and Description */}
              <div className="mb-3 sm:mb-4 flex-grow">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <h3 className="text-base xs:text-lg sm:text-lg font-bold text-gray-900 line-clamp-1">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-sm line-clamp-2 xs:line-clamp-3 mb-3 sm:mb-4">
                  {service.description}
                </p>
              </div>

              {/* Action Button */}
              <button 
                className="w-full flex items-center justify-center gap-2 py-2.5 xs:py-3 sm:py-3 text-[#27BB97] font-semibold rounded-lg border border-[#27BB97] hover:bg-[#27BB97] hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2 group-hover:shadow-sm text-xs xs:text-sm sm:text-sm whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  onServiceClick(service.id);
                }}
                aria-label={`Post your ${service.title} care needs`}
              >
                <span className="truncate">Post your care needs</span>
                <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-only CTA (Optional) */}
      <div className="mt-8 sm:hidden text-center px-4">
        <p className="text-sm text-gray-600 mb-3">
          Can't find what you're looking for?
        </p>
        <button 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-lg hover:from-[#1FA987] hover:to-[#198F72] transition-all shadow-lg hover:shadow-xl"
          onClick={() => console.log('Browse all services clicked')}
        >
          Browse All Services
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default EasyServices;