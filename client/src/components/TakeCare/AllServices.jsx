import React from "react";
import { ArrowRight } from "lucide-react";

const AllServices = ({ services, onServiceClick }) => {
  const handleItemClick = (e, item) => {
    e.stopPropagation();
    onServiceClick(item.toLowerCase().replace(' ', '-'));
  };

  return (
    <section className="mt-12 sm:mt-16 lg:mt-20">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-3 xs:px-4">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          TYPES OF <span className="text-[#27BB97]">SERVICES</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
          Comprehensive care solutions for all your needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 px-3 xs:px-4 sm:px-6 lg:px-8">
        {services.map((service) => (
          <div 
            key={service.id}
            className={`${service.bgColor} rounded-xl sm:rounded-2xl border border-gray-200 hover:border-[#27BB97] hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer`}
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
            <div className="relative h-40 xs:h-44 sm:h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-4 xs:p-5 sm:p-6">
              {/* Title and Description */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                  <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs xs:text-sm sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Services Tags */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-wrap gap-1.5 xs:gap-2">
                  {service.services.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 xs:px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full border border-gray-300 hover:bg-[#27BB97] hover:text-white hover:border-[#27BB97] transition-colors cursor-pointer whitespace-nowrap"
                      onClick={(e) => handleItemClick(e, item)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleItemClick(e, item);
                        }
                      }}
                      title={item}
                    >
                      <span className="line-clamp-1">{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Explore Button */}
              <button 
                className="w-full flex items-center justify-center gap-2 py-2.5 xs:py-3 sm:py-3 bg-white text-[#27BB97] font-semibold rounded-lg xs:rounded-lg sm:rounded-lg border border-[#27BB97] hover:bg-[#27BB97] hover:text-white transition-all group-hover:shadow-md text-xs xs:text-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onServiceClick(service.id);
                }}
                aria-label={`Explore ${service.title} services`}
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllServices;