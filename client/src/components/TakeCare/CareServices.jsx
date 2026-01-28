import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CareServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  
  // Check if we're on a specific service page (not the main takecare page)
  const currentPath = location.pathname;
  const isOnSpecificServicePage = currentPath !== '/takecare' && currentPath !== '/';
  
  const allServices = [
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
      id: "carecenter",
      title: "Care Center",
      description: "Discover or List a Care Center",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=200&fit=crop&crop=face",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: "eldercare",
      title: "Eldercare",
      description: "Offer or Arrange Senior Care",
      image: "/elder-care.jpg",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: "petcare",
      title: "Pet Care",
      description: "Find a Pet Care Provider or Job",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=200&h=200&fit=crop&crop=face",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  // Get current service ID from URL (e.g., /takecare/nanny -> "nanny")
  const getCurrentServiceId = () => {
    const pathParts = currentPath.split('/');
    return pathParts[pathParts.length - 1];
  };

  const currentServiceId = getCurrentServiceId();
  
  // Filter out current service if we're on its specific page
  const services = isOnSpecificServicePage 
    ? allServices.filter(service => service.id !== currentServiceId)
    : allServices;

  // Update scroll button visibility
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check
      
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, [services]); // Re-run when services change

  // Handle card click to navigate to specific service page with scroll to top
  const handleServiceClick = (serviceId) => {
    // Scroll to top first
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Then navigate to the service page
    navigate(`/takecare/${serviceId}`);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 288; // w-72 = 288px
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 288; // w-72 = 288px
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-20 ">
      {/* Header with Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 lg:mb-12 gap-4 ">
        <div className="text-left">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 leading-tight">
            {isOnSpecificServicePage ? "OTHER CARE SERVICES" : "ALL IN ONE PLACE"}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl">
            {isOnSpecificServicePage ? "Explore other care services we offer" : "Providing care, finding care"}
          </p>
        </div>

        {/* Navigation Buttons - Hidden on mobile, visible on tablet+ */}
        <div className="hidden sm:flex space-x-3 lg:space-x-4 self-start sm:self-center">
          <button
            onClick={scrollLeft}
            className={`bg-white border border-gray-300 rounded-full p-2 lg:p-3 shadow-md hover:bg-gray-50 hover:shadow-lg hover:border-[#27BB97] transition-all duration-300 flex items-center justify-center ${
              !showLeftButton ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Scroll left"
            disabled={!showLeftButton}
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-[#27BB97]" />
          </button>
          <button
            onClick={scrollRight}
            className={`bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white rounded-full p-2 lg:p-3 shadow-md hover:from-[#1FA987] hover:to-[#198F72] hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
              !showRightButton ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Scroll right"
            disabled={!showRightButton}
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="relative">
        {/* Mobile-only scroll indicators */}
        <div className="sm:hidden flex justify-center mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Swipe to explore</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Mobile scroll buttons (floating) */}
        <div className="sm:hidden flex justify-between absolute top-1/2 transform -translate-y-1/2 w-full z-10 px-2">
          <button
            onClick={scrollLeft}
            className={`bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl hover:border-[#27BB97] transition-all duration-300 flex items-center justify-center ${
              !showLeftButton ? 'opacity-0 pointer-events-none' : ''
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 hover:text-[#27BB97]" />
          </button>
          <button
            onClick={scrollRight}
            className={`bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white rounded-full p-2 shadow-lg hover:from-[#1FA987] hover:to-[#198F72] hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
              !showRightButton ? 'opacity-0 pointer-events-none' : ''
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 xs:gap-5 sm:gap-6 pb-4 sm:pb-6 px-2 xs:px-3 sm:px-0 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.length > 0 ? (
            services.map((service) => (
              <div 
                key={service.id}
                className="flex-shrink-0 w-[260px] xs:w-[280px] sm:w-72 flex flex-col items-center text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-[#27BB97] hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white snap-center"
                onClick={() => handleServiceClick(service.id)}
                role="link"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleServiceClick(service.id);
                  }
                }}
              >
                {/* Rounded Image */}
                <div className="relative mb-5 sm:mb-6 ">
                  <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg sm:shadow-xl group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Gradient Ring Effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#27BB97] transition-colors leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs xs:text-sm sm:text-sm mb-6 sm:mb-8 min-h-[2.5rem] xs:min-h-[3rem] leading-tight px-1">
                  {service.description}
                </p>

                {/* Explore Button */}
                <button 
                  className="w-full flex items-center justify-center gap-2 px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3 text-[#27BB97] font-semibold rounded-lg xs:rounded-lg sm:rounded-lg border border-[#27BB97] hover:bg-[#27BB97] hover:text-white transition-all group-hover:shadow-md text-xs xs:text-sm sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceClick(service.id);
                  }}
                  aria-label={`Explore ${service.title} services`}
                >
                  Explore
                  <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))
          ) : (
            // Fallback if no services
            <div className="flex-shrink-0 w-full text-center py-8">
              <p className="text-gray-500">No other services available</p>
            </div>
          )}
        </div>

        {/* Scroll progress indicator */}
        <div className="hidden sm:block mt-4">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#27BB97] to-[#1FA987] rounded-full transition-all duration-300"
              style={{
                width: showRightButton ? '50%' : '100%',
                transform: showLeftButton ? 'translateX(50%)' : 'translateX(0)',
              }}
            />
          </div>
        </div>
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
        
        /* Better snap scrolling for mobile */
        @media (max-width: 640px) {
          .snap-x {
            scroll-snap-type: x mandatory;
          }
          .snap-center {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default CareServices;