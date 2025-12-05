import React, { useRef, useState } from "react";
import { FiNavigation, FiChevronLeft, FiChevronRight, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { MdApartment, MdOutlineBed } from "react-icons/md";

// -----------------------------------------------------
// Neighborhood Card Component
// -----------------------------------------------------
const NeighborhoodCard = ({ name, city, state, distance, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mock data for rental statistics
  const avgRent = Math.floor(Math.random() * 2000) + 1500;
  const listingsCount = Math.floor(Math.random() * 50) + 20;
  const avgBedrooms = (Math.random() * 2 + 1).toFixed(1);

  return (
    <div
      className="
        relative bg-white rounded-xl border border-gray-200 
        overflow-hidden shadow-sm hover:shadow-xl 
        transition-all duration-300 min-w-[240px] 
        cursor-pointer flex-shrink-0
        transform hover:-translate-y-1
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative w-full h-32 overflow-hidden">
        <img 
          src={image} 
          alt={`${name} neighborhood in ${city}, ${state}`}
          className={`
            w-full h-full object-cover transition-transform duration-500
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          loading="lazy"
        />
        
        {/* Gradient Overlay on Hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-40'}
        `} />
        
        {/* Distance Badge */}
        <div className="absolute top-3 right-3">
          <div className="
            bg-white/95 backdrop-blur-sm px-3 py-1 
            rounded-full text-xs font-semibold text-gray-800
            flex items-center gap-1
          ">
            <FiNavigation className="w-3 h-3" />
            {distance} mi
          </div>
        </div>
        
        {/* Hover Title Overlay */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4
          transition-all duration-300 transform
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <h3 className="
            text-white text-lg font-bold mb-1
            drop-shadow-lg
          ">
            {name}
          </h3>
          <div className="flex items-center text-white/90 text-sm">
            <FiMapPin className="w-4 h-4 mr-1" />
            <span>{city}, {state}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Always Visible Title */}
        <div className={`
          transition-all duration-300
          ${isHovered ? 'opacity-0 h-0' : 'opacity-100 h-auto'}
        `}>
          <h3 className="text-gray-900 font-semibold text-base mb-1">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiNavigation className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {city}, {state}
            </span>
          </div>
        </div>

        {/* Hover Content - Rental Stats */}
        <div className={`
          transition-all duration-300 overflow-hidden
          ${isHovered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          {/* Divider */}
          <div className="border-t border-gray-100 my-3"></div>
          
          {/* Rental Statistics */}
          <div className="space-y-3">
            {/* Average Rent */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <MdApartment className="w-4 h-4 text-[#27bb97]" />
                <span className="text-sm">Avg Rent</span>
              </div>
              <div className="text-gray-900 font-semibold">
                ${avgRent.toLocaleString()}
                <span className="text-xs text-gray-500 ml-1">/mo</span>
              </div>
            </div>

            {/* Listings Count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <FiTrendingUp className="w-4 h-4 text-[#27bb97]" />
                <span className="text-sm">Listings</span>
              </div>
              <div className="text-gray-900 font-semibold">{listingsCount}+</div>
            </div>

            {/* Average Bedrooms */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <MdOutlineBed className="w-4 h-4 text-[#27bb97]" />
                <span className="text-sm">Avg Beds</span>
              </div>
              <div className="text-gray-900 font-semibold">{avgBedrooms}</div>
            </div>
          </div>

          {/* Explore Button */}
          <button className="
            w-full mt-4 py-2 px-4 
            bg-[#27bb97] text-white 
            rounded-lg font-medium text-sm
            hover:bg-[#1fa888] 
            active:scale-95
            transition-all duration-200
            flex items-center justify-center gap-2
          ">
            Explore Rentals
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className={`
        absolute inset-0 border-2 border-[#27bb97] rounded-xl
        transition-opacity duration-300 pointer-events-none
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />
    </div>
  );
};

// -----------------------------------------------------
// Scroll Navigation Button Component
// -----------------------------------------------------
const ScrollButton = ({ direction, onClick }) => {
  const Icon = direction === "left" ? FiChevronLeft : FiChevronRight;
  
  return (
    <button
      onClick={onClick}
      className="
        hidden md:flex absolute top-1/2 -translate-y-1/2 
        bg-white border border-gray-300 text-gray-600 
        hover:bg-gray-100 hover:text-black hover:border-[#27bb97]
        hover:scale-110 active:scale-95
        rounded-full w-12 h-12 items-center justify-center 
        shadow-lg transition-all duration-200 z-10 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-[#27bb97] focus:ring-offset-2
      "
      aria-label={`Scroll ${direction}`}
    >
      <Icon className="w-6 h-6" />
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
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="animate-pulse">←→</span>
            <span>Scroll to explore more neighborhoods</span>
            <span className="animate-pulse">←→</span>
          </div>
        </div>
      </div>
    </div>
  );
}