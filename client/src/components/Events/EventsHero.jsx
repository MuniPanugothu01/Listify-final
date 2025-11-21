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
  const [direction, setDirection] = useState('down'); // 'up' or 'down'

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
    setDirection('down');
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('up');
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setDirection(index > currentSlide ? 'down' : 'up');
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const getSlidePosition = (index) => {
    const totalSlides = carouselItems.length;
    const diff = (index - currentSlide + totalSlides) % totalSlides;
    
    if (index === currentSlide) return 'active';
    if (diff === 1) return direction === 'down' ? 'next' : 'prev-out';
    if (diff === totalSlides - 1) return direction === 'up' ? 'prev' : 'next-out';
    return 'hidden';
  };

  return (
    <div className="relative h-[50vh] z-50 ">
      {/* Carousel Container */}
      <div className="relative w-full h-[55vh] min-h-[500px] ">
        {carouselItems.map((item, index) => {
          const position = getSlidePosition(index);

          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-800 ease-in-out transform ${
                position === 'active'
                  ? 'translate-y-0 opacity-100 scale-100 z-20'
                  : position === 'next'
                  ? 'translate-y-full opacity-0 scale-95 z-10'
                  : position === 'prev'
                  ? '-translate-y-full opacity-0 scale-95 z-10'
                  : position === 'next-out'
                  ? 'translate-y-full opacity-0 scale-95 z-0'
                  : position === 'prev-out'
                  ? '-translate-y-full opacity-0 scale-95 z-0'
                  : 'translate-y-full opacity-0 scale-95 z-0'
              }`}
              style={{ transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-semibold text-white mb-4">
                      {item.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 mb-10">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows - Vertical */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 flex flex-col space-y-4">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 group"
          >
            <ChevronUp className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 group"
          >
            <ChevronDown className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Dots Indicator - Vertical on the left */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 flex flex-col space-y-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/70"
              } ${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-32 h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{ 
              width: '100%',
              transform: `translateX(${isAnimating ? '0%' : '-100%'})`,
              transition: isAnimating ? 'none' : 'transform 5s linear'
            }}
          />
        </div>
      </div>

      {/* 🌟 Floating Search Bar */}
      <div className="absolute left-1/2 -bottom-45 transform -translate-x-1/2 w-full px-6 z-50">
        <div className="rounded-2xl shadow-lg p-6 max-w-7xl mx-auto bg-gray-50 z-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Event Type */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Event Type
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 
                           focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
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
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or area"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-800 
                             focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                When
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 
                           focus:outline-none focus:ring-2 focus:ring-gray-400"
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
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Category
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 
                           focus:outline-none focus:ring-2 focus:ring-gray-400"
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
            <div className="flex items-end">
              <button className="w-full bg-[#25676D] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Custom CSS for vertical wheel animation */}
      <style jsx>{`
        @keyframes rollDown {
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

        @keyframes rollUp {
          0% {
            transform: translateY(100%) rotateX(-90deg);
            opacity: 0;
          }
          50% {
            transform: translateY(50%) rotateX(-45deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes rollOutDown {
          0% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(50%) rotateX(45deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(100%) rotateX(90deg);
            opacity: 0;
          }
        }

        @keyframes rollOutUp {
          0% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-50%) rotateX(-45deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100%) rotateX(-90deg);
            opacity: 0;
          }
        }

        .roll-enter-down {
          animation: rollDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .roll-enter-up {
          animation: rollUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .roll-exit-down {
          animation: rollOutDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .roll-exit-up {
          animation: rollOutUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}