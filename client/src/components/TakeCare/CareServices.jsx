import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CareServices = () => {
  const scrollContainerRef = useRef(null);
  const services = [
    {
      id: "nanny",
      title: "Nanny",
      description: "Find a Nanny or Nanny Job",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: "babysitter",
      title: "Babysitter",
      description: "Discover or Secure a Babysitter",
      image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=200&h=200&fit=crop&crop=face",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "cook",
      title: "Cook",
      description: "Join or Book a Cooking Service",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&crop=face",
      color: "from-orange-500 to-amber-500"
    },
    {
      id: "housekeeper",
      title: "Housekeeper",
      description: "Manage or Request Household Help",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop&crop=face",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "tutor",
      title: "Tutor",
      description: "Find a Tutor or Tutor Job",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=200&h=200&fit=crop&crop=face",
      color: "from-purple-500 to-violet-500"
    },
    {
      id: "care-center",
      title: "Care Center",
      description: "Discover or List a Care Center",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=200&fit=crop&crop=face",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: "eldercare",
      title: "Eldercare",
      description: "Offer or Arrange Senior Care",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop&crop=face",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: "pet-care",
      title: "Pet Care",
      description: "Find a Pet Care Provider or Job",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=200&h=200&fit=crop&crop=face",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const handleServiceClick = (serviceId) => {
    console.log(`Navigating to: ${serviceId}`);
    // Add your routing logic here
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      {/* Header with Navigation Buttons */}
      <div className="flex justify-between items-center mb-12">
        <div className="text-left">
          <h2 className="text-5xl md:text-5xl font-bold text-gray-900 mb-4">
            ALL IN ONE PLACE
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Providing care, finding care
          </p>
        </div>

        {/* Navigation Buttons - Top Right */}
        <div className="flex space-x-4">
          <button
            onClick={scrollLeft}
            className="bg-white border border-gray-300 rounded-full p-3 shadow-md hover:bg-gray-50 hover:shadow-lg hover:border-[#27BB97] transition-all duration-300 flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 hover:text-[#27BB97]" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white rounded-full p-3 shadow-md hover:from-[#1FA987] hover:to-[#198F72] hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => (
          <div 
            key={service.id}
            className="flex-shrink-0 w-72 flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 hover:border-[#27BB97] hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white"
            onClick={() => handleServiceClick(service.id)}
          >
            {/* Rounded Image */}
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gradient Ring Effect */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#27BB97] transition-colors">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-8 min-h-[3rem] leading-tight px-2">
              {service.description}
            </p>

            {/* Explore Button */}
            <button 
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-[#27BB97] font-semibold rounded-lg border border-[#27BB97] hover:bg-[#27BB97] hover:text-white transition-all group-hover:shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                handleServiceClick(service.id);
              }}
            >
              Explore
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CareServices;