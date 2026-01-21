import React, { useRef, useState } from "react";
import { FiNavigation, FiChevronLeft, FiChevronRight, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { MdApartment, MdOutlineBed } from "react-icons/md";

// -----------------------------------------------------
// Neighborhood Card Component
// -----------------------------------------------------
const NeighborhoodCard = ({ name, city, state, distance, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Mock data for rental statistics
  const avgRent = Math.floor(Math.random() * 2000) + 1500;
  const listingsCount = Math.floor(Math.random() * 50) + 20;
  const avgBedrooms = (Math.random() * 2 + 1).toFixed(1);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateY(-8px) scale(1.02)';
      cardRef.current.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateY(0) scale(1)';
    }
  };

  return (
    <div
      ref={cardRef}
      className="
        relative bg-white rounded-xl border border-gray-200 
        overflow-hidden shadow-sm hover:shadow-2xl 
        transition-all duration-500 ease-out
        min-w-[240px] cursor-pointer flex-shrink-0
        transform-gpu
      "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container with Overlay */}
      <div className="relative w-full h-32 overflow-hidden">
        <img 
          src={image} 
          alt={`${name} neighborhood in ${city}, ${state}`}
          className={`
            w-full h-full object-cover transition-all duration-700 ease-out
            ${isHovered ? 'scale-110 rotate-1' : 'scale-100'}
          `}
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
          transition-all duration-500 ease-out
          ${isHovered ? 'opacity-100' : 'opacity-60'}
        `} />
        
        {/* Distance Badge */}
        <div className={`
          absolute top-3 right-3 transition-all duration-300 ease-out
          ${isHovered ? 'scale-110 rotate-12' : 'scale-100'}
        `}>
          <div className="
            bg-white/95 backdrop-blur-sm px-3 py-1 
            rounded-full text-xs font-semibold text-gray-800
            flex items-center gap-1 transition-all duration-300
            hover:bg-[#27bb97] hover:text-white
          ">
            <FiNavigation className="w-3 h-3 transition-transform duration-300" />
            {distance} mi
          </div>
        </div>
        
        {/* Hover Title Overlay */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4
          transition-all duration-500 ease-out transform
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}>
          <h3 className="
            text-white text-lg font-bold mb-1
            drop-shadow-lg transform transition-transform duration-300
            ${isHovered ? 'translate-x-0' : 'translate-x-2'}
          ">
            {name}
          </h3>
          <div className="flex items-center text-white/90 text-sm
            transform transition-transform duration-300 delay-75
            ${isHovered ? 'translate-x-0' : 'translate-x-2'}
          ">
            <FiMapPin className="w-4 h-4 mr-1 transition-transform duration-300
              ${isHovered ? 'scale-110' : 'scale-100'}" 
            />
            <span>{city}, {state}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Always Visible Title */}
        <div className={`
          transition-all duration-300 ease-out overflow-hidden
          ${isHovered ? 'opacity-0 max-h-0' : 'opacity-100 max-h-20'}
        `}>
          <h3 className="text-gray-900 font-semibold text-base mb-1 transform transition-transform duration-300
            ${isHovered ? 'translate-y-4' : 'translate-y-0'}
          ">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 transform transition-transform duration-300 delay-75
            ${isHovered ? 'translate-y-4' : 'translate-y-0'}
          ">
            <FiNavigation className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {city}, {state}
            </span>
          </div>
        </div>

        {/* Hover Content - Rental Stats */}
        <div className={`
          transition-all duration-500 ease-out overflow-hidden
          ${isHovered ? 'max-h-48 opacity-100 mt-0' : 'max-h-0 opacity-0 mt-4'}
        `}>
          {/* Divider */}
          <div className={`
            border-t border-gray-100 my-3 transition-all duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}></div>
          
          {/* Rental Statistics */}
          <div className="space-y-3">
            {/* Average Rent */}
            <div className={`
              flex items-center justify-between transform transition-all duration-300
              ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
            `}>
              <div className="flex items-center gap-2 text-gray-600">
                <MdApartment className="w-4 h-4 text-[#27bb97] transition-transform duration-300
                  ${isHovered ? 'scale-110' : 'scale-100'}" 
                />
                <span className="text-sm">Avg Rent</span>
              </div>
              <div className="text-gray-900 font-semibold transform transition-transform duration-300
                ${isHovered ? 'scale-105' : 'scale-100'}"
              >
                ${avgRent.toLocaleString()}
                <span className="text-xs text-gray-500 ml-1">/mo</span>
              </div>
            </div>

            {/* Listings Count */}
            <div className={`
              flex items-center justify-between transform transition-all duration-300 delay-75
              ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
            `}>
              <div className="flex items-center gap-2 text-gray-600">
                <FiTrendingUp className="w-4 h-4 text-[#27bb97] transition-transform duration-300
                  ${isHovered ? 'scale-110' : 'scale-100'}" 
                />
                <span className="text-sm">Listings</span>
              </div>
              <div className="text-gray-900 font-semibold transform transition-transform duration-300
                ${isHovered ? 'scale-105' : 'scale-100'}"
              >
                {listingsCount}+
              </div>
            </div>

            {/* Average Bedrooms */}
            <div className={`
              flex items-center justify-between transform transition-all duration-300 delay-100
              ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
            `}>
              <div className="flex items-center gap-2 text-gray-600">
                <MdOutlineBed className="w-4 h-4 text-[#27bb97] transition-transform duration-300
                  ${isHovered ? 'scale-110' : 'scale-100'}" 
                />
                <span className="text-sm">Avg Beds</span>
              </div>
              <div className="text-gray-900 font-semibold transform transition-transform duration-300
                ${isHovered ? 'scale-105' : 'scale-100'}"
              >
                {avgBedrooms}
              </div>
            </div>
          </div>

          {/* Explore Button */}
          <button className={`
            w-full mt-4 py-2 px-4 
            bg-gradient-to-r from-[#27bb97] to-[#1fa888] text-white 
            rounded-lg font-medium text-sm
            hover:from-[#1fa888] hover:to-[#27bb97]
            transition-all duration-300 ease-out
            flex items-center justify-center gap-2
            transform ${isHovered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}
            shadow-lg hover:shadow-xl
            active:scale-95
          `}>
            Explore Rentals
            <svg className="w-4 h-4 transition-transform duration-300 hover:translate-x-1" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className={`
        absolute inset-0 border-2 border-[#27bb97] rounded-xl
        transition-all duration-500 ease-out pointer-events-none
        ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `} />

      {/* Glow Effect */}
      <div className={`
        absolute inset-0 rounded-xl
        transition-all duration-500 ease-out pointer-events-none
        ${isHovered ? 'shadow-[0_0_30px_rgba(39,187,151,0.3)]' : 'shadow-none'}
      `} />
    </div>
  );
};

// -----------------------------------------------------
// Scroll Navigation Button Component
// -----------------------------------------------------
const ScrollButton = ({ direction, onClick }) => {
  const Icon = direction === "left" ? FiChevronLeft : FiChevronRight;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        hidden md:flex absolute top-1/2 -translate-y-1/2 
        bg-white/90 backdrop-blur-sm border border-gray-300 text-gray-600 
        hover:bg-white hover:text-[#27bb97] hover:border-[#27bb97]
        transition-all duration-300 ease-out
        rounded-full w-12 h-12 items-center justify-center 
        shadow-lg z-10 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-[#27bb97] focus:ring-offset-2
        transform-gpu
      "
      aria-label={`Scroll ${direction}`}
      style={{
        transform: isHovered 
          ? `translateY(-50%) scale(1.1) ${direction === 'left' ? 'translateX(-4px)' : 'translateX(4px)'}`
          : 'translateY(-50%) scale(1)'
      }}
    >
      <Icon className="w-6 h-6 transition-transform duration-300
        ${isHovered ? 'scale-110' : 'scale-100'}" 
      />
    </button>
  );
};

// -----------------------------------------------------
// Neighborhood Data - Using YOUR original images
// -----------------------------------------------------
const NEIGHBORHOOD_DATA = [
  {
    id: 1,
    name: "Harlem",
    city: "New York",
    state: "NY",
    distance: "0.06",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400",
  },
  {
    id: 2,
    name: "Morningside Heights",
    city: "New York",
    state: "NY",
    distance: "0.61",
    image: "/roomrental.jpg",
  },
  {
    id: 3,
    name: "East Harlem",
    city: "New York",
    state: "NY",
    distance: "0.96",
    image: "/roomrental2.jpg",
  },
  {
    id: 4,
    name: "Central Park",
    city: "New York",
    state: "NY",
    distance: "1.63",
    image: "/roomrental4.jpg",
  },
  {
    id: 5,
    name: "Marcus Garvey",
    city: "New York",
    state: "NY",
    distance: "0.46",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
  },
  {
    id: 6,
    name: "Central Harlem",
    city: "New York",
    state: "NY",
    distance: "0.74",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
  },
  {
    id: 7,
    name: "Hamilton Heights",
    city: "New York",
    state: "NY",
    distance: "1.59",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
  },
  {
    id: 8,
    name: "Concourse",
    city: "New York",
    state: "NY",
    distance: "1.68",
    image: "/roomrental5.jpg",
  },
  {
    id: 9,
    name: "Washington Heights",
    city: "New York",
    state: "NY",
    distance: "2.10",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400",
  },
  {
    id: 10,
    name: "Union City",
    city: "New Jersey",
    state: "NJ",
    distance: "2.45",
    image: "/roomrental6.jpg",
  },
  {
    id: 11,
    name: "Long Island City",
    city: "Queens",
    state: "NY",
    distance: "3.12",
    image: "/roomrental7.jpg",
  },
];

// -----------------------------------------------------
// Main Component
// -----------------------------------------------------
export default function NeighborhoodListings() {
  const scrollRef = useRef(null);
  const SCROLL_AMOUNT = 550;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 md:mb-12 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
            Explore rentals in popular neighborhoods in and near New York, NY
          </h1>
          <p className="text-gray-600 mt-3 text-base md:text-lg max-w-3xl">
            Hover over any neighborhood to see detailed rental statistics and available listings.
          </p>
        </header>

        {/* Scrollable Neighborhoods Section */}
        <div className="relative">
          {/* Left Scroll Button */}
          <div className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-10">
            <ScrollButton direction="left" onClick={scrollLeft} />
          </div>

          {/* Neighborhood Grid */}
          <div
            ref={scrollRef}
            className="
              grid grid-flow-col auto-cols-max 
              grid-rows-2 gap-4 md:gap-6 
              overflow-x-auto pb-6 md:pb-8
              scrollbar-hide scroll-smooth
              px-2 md:px-0
            "
          >
            {NEIGHBORHOOD_DATA.map((neighborhood) => (
              <NeighborhoodCard
                key={neighborhood.id}
                name={neighborhood.name}
                city={neighborhood.city}
                state={neighborhood.state}
                distance={neighborhood.distance}
                image={neighborhood.image}
              />
            ))}
          </div>

          {/* Right Scroll Button */}
          <div className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-10">
            <ScrollButton direction="right" onClick={scrollRight} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-gray-500 text-sm animate-pulse">
            <span className="transition-transform duration-1000 hover:scale-110">←</span>
            <span>Scroll to explore more neighborhoods</span>
            <span className="transition-transform duration-1000 hover:scale-110">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}