import React, { useState, useEffect } from "react";
import { Search, MapPin, ChevronUp, ChevronDown } from "lucide-react";

// Carousel images data
const carouselItems = [
  {
    id: 1,
    image: "Event-hero-img.jpg",
    title: "Discover Events Near You",
    subtitle: "Concerts, festivals, workshops, comedy shows — all in one place"
  },
  {
    id: 2,
    image: "Event-hero-img1.jpg",
    title: "Live Music Concerts",
    subtitle: "Experience the best live performances in your city"
  },
  {
    id: 3,
    image: "Event-hero-img2.jpg",
    title: "Cultural Festivals",
    subtitle: "Immerse yourself in diverse cultural experiences"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Comedy & Entertainment",
    subtitle: "Laugh your heart out with top comedians"
  }
];

export default function EventsHero() {
  const [searchType, setSearchType] = useState("All Events");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("All Dates");
  const [category, setCategory] = useState("All Categories");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const searchTypes = [
    "All Events",
    "Music & Concerts",
    "Comedy",
    "Garba/Dandiya",
    "Bollywood",
    "Spiritual",
    "Free Events",
  ];

  const dates = [
    "All Dates",
    "Today",
    "Tomorrow",
    "This Weekend",
    "Next Week",
    "This Month",
  ];

  const categories = [
    "All Categories",
    "Music",
    "Dance",
    "Comedy",
    "Food",
    "Cultural",
    "Workshop",
    "Free",
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] xl:h-[70vh]">
      {/* Carousel Container */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] xl:h-[70vh] min-h-[400px] sm:min-h-[500px] overflow-hidden">
        {carouselItems.map((item, index) => {
          const isActive = index === currentSlide;
          const isPrevious = index === (currentSlide - 1 + carouselItems.length) % carouselItems.length;
          const isNext = index === (currentSlide + 1) % carouselItems.length;

          let transformClass = '';
          if (isActive) {
            transformClass = 'translate-y-0 opacity-100 scale-100 z-20';
          } else if (isPrevious) {
            transformClass = '-translate-y-full opacity-0 scale-95 z-10';
          } else if (isNext) {
            transformClass = 'translate-y-full opacity-0 scale-95 z-10';
          } else {
            transformClass = 'translate-y-full opacity-0 scale-95 z-0';
          }

          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-800 ease-in-out transform ${transformClass}`}
              style={{ 
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center px-4 xs:px-6 sm:px-8 lg:px-12">
                <div className="container mx-auto">
                  <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2 sm:mb-3 lg:mb-4 leading-tight">
                      {item.title}
                    </h1>
                    <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-0">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows - Vertical (Hidden on mobile, visible on tablet+) */}
        <div className="hidden sm:flex absolute right-3 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-30 flex-col space-y-3 sm:space-y-4">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 disabled:opacity-50 group"
            aria-label="Previous slide"
          >
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 disabled:opacity-50 group"
            aria-label="Next slide"
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Dots Indicator - Horizontal on mobile, Vertical on tablet+ */}
        <div className="absolute bottom-4 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 left-1/2 sm:left-4 lg:left-6 transform -translate-x-1/2 sm:transform-none z-30 flex sm:flex-col space-x-3 sm:space-x-0 sm:space-y-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125 sm:scale-110"
                  : "bg-white/50 hover:bg-white/70"
              } ${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-24 sm:w-32 h-0.5 sm:h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{ 
              width: '100%',
              transform: `translateX(${isAnimating ? '0%' : '-100%'})`,
              transition: isAnimating ? 'none' : 'transform 5s linear'
            }}
          />
        </div>

        {/* Mobile Navigation Arrows (Horizontal at bottom) */}
        <div className="sm:hidden absolute bottom-8 left-0 right-0 flex justify-center space-x-8 z-30">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 group"
            aria-label="Previous slide"
          >
            <ChevronUp className="w-5 h-5 text-white group-hover:scale-110 transition-transform rotate-90" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 group"
            aria-label="Next slide"
          >
            <ChevronDown className="w-5 h-5 text-white group-hover:scale-110 transition-transform rotate-90" />
          </button>
        </div>
      </div>

      {/* 🌟 Floating Search Bar - Responsive positioning */}
      <div className="absolute left-1/2 -bottom-15 transform -translate-x-1/2 w-full px-3 xs:px-4 sm:px-6 lg:px-8 z-30" 
          >
        <div className="rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 mx-auto bg-white/95 backdrop-blur-sm border border-gray-200">
          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
            
            {/* Event Type */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Event Type
              </label>
              <select
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-800 
                           focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm sm:text-base"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                {searchTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or area"
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-800 
                             focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Date */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                When
              </label>
              <select
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-800 
                           focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              >
                {dates.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-800 
                           focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="xs:col-span-2 lg:col-span-1 flex items-end mt-1">
              <button className="w-full bg-[#27bb97] text-white font-medium px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 rounded-lg hover:bg-[#1fa987] transition flex items-center justify-center gap-2 text-sm sm:text-base">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">Search</span>
              </button>
            </div>

          </div>

          {/* Mobile: Show 2 columns for better visibility */}
          <style jsx>{`
            @media (max-width: 475px) {
              .xs\\:grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }
          `}</style>
        </div>
      </div>

      {/* Custom CSS for upward wheel animation only */}
      <style jsx>{`
        @keyframes rollInFromTop {
          0% {
            transform: translateY(-100%) rotateX(90deg);
            opacity: 0;
          }
          50% {
            transform: translateY(-50%) rotateX(45deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes rollOutToTop {
          0% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-50%) rotateX(45deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100%) rotateX(90deg);
            opacity: 0;
          }
        }

        .slide-enter {
          animation: rollInFromTop 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .slide-exit {
          animation: rollOutToTop 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Responsive height calculations */
        @media (max-width: 640px) {
          .min-h-\\[400px\\] {
            min-height: 400px;
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .min-h-\\[500px\\] {
            min-height: 500px;
          }
        }
      `}</style>
    </div>
  );
}