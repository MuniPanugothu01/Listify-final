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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);



  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  },);

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
    <div className="relative h-[300px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden mt-16 md:mt-16 lg:mt-18">
      {/* Carousel Container */}
      <div className="">
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