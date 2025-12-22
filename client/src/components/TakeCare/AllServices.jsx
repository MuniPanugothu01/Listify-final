import React from "react";
import { ArrowRight } from "lucide-react";

const AllServices = ({ services, onServiceClick }) => {
  const handleItemClick = (e, item) => {
    e.stopPropagation();
    onServiceClick(item.toLowerCase().replace(' ', '-'));
  };

  return (
    <section className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          TYPES OF <span className="text-[#27BB97]">SERVICES</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive care solutions for all your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id}
            className={`${service.bgColor} rounded-2xl border border-gray-200 hover:border-[#27BB97] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer`}
            onClick={() => onServiceClick(service.id)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {service.services.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full border border-gray-300 hover:bg-[#27BB97] hover:text-white hover:border-[#27BB97] transition-colors cursor-pointer"
                      onClick={(e) => handleItemClick(e, item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-[#27BB97] font-semibold rounded-lg border border-[#27BB97] hover:bg-[#27BB97] hover:text-white transition-all group-hover:shadow-md">
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllServices;