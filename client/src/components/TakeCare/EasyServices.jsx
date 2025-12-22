import React from "react";
import { ArrowRight } from "lucide-react";

const EasyServices = ({ services, onServiceClick }) => {
  return (
    <section className="mb-20 mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          IT'S EASY TO FIND WHAT YOU NEED!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Are you seeking care services in your neighborhood? With us, it's easy!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div 
            key={service.id}
            className="bg-white rounded-2xl border border-gray-200 hover:border-[#27BB97] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => onServiceClick(service.id)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1 bg-gradient-to-r ${service.color} text-white text-xs font-bold rounded-full`}>
                  Popular
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 text-[#27BB97] font-semibold rounded-lg border border-[#27BB97] hover:bg-[#27BB97] hover:text-white transition-all">
                <span>Post your care needs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EasyServices;