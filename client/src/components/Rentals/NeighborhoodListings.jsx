import React, { useRef } from "react";
import { Navigation, ChevronLeft, ChevronRight } from "lucide-react";

const NeighborhoodCard = ({ name, city, state, distance }) => (
  <div className="
    bg-white rounded-lg border border-gray-200 
    p-4 shadow-sm hover:shadow-md 
    transition-all duration-200 min-w-[240px]
  ">
    <h3 className="text-gray-900 font-semibold text-base mb-1">
      {name}
    </h3>
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Navigation className="w-4 h-4" />
      <span>
        {city}, {state} • {distance} miles
      </span>
    </div>
  </div>
);

export default function NeighborhoodListings() {
  const scrollRef = useRef(null);

  const scrollAmount = 550; // scroll two cards at once

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const neighborhoods = [
    { name: "Harlem", city: "New York", state: "NY", distance: "0.06" },
    { name: "Morningside Heights", city: "New York", state: "NY", distance: "0.61" },
    { name: "East Harlem", city: "New York", state: "NY", distance: "0.96" },
    { name: "Central Park", city: "New York", state: "NY", distance: "1.63" },
    { name: "Marcus Garvey", city: "New York", state: "NY", distance: "0.46" },
    { name: "Central Harlem", city: "New York", state: "NY", distance: "0.74" },
    { name: "Hamilton Heights", city: "New York", state: "NY", distance: "1.59" },
    { name: "Concourse", city: "New York", state: "NY", distance: "1.68" },
    { name: "Washington Heights", city: "New York", state: "NY", distance: "2.10" },
    { name: "Union City", city: "New Jersey", state: "NJ", distance: "2.45" },
    { name: "Long Island City", city: "Queens", state: "NY", distance: "3.12" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Explore rentals in popular neighborhoods in and near New York, NY
        </h1>

        <div className="relative">

          {/* LEFT BUTTON */}
          <button
            onClick={scrollLeft}
            className="
              hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 
              bg-white border border-gray-300 text-gray-600 
              hover:bg-gray-100 hover:text-black 
              rounded-full w-12 h-12 items-center justify-center 
              shadow-md transition-all z-10
            "
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 2-ROW SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            className="
              grid grid-flow-col auto-cols-max 
              grid-rows-2 gap-4 overflow-x-auto 
              pb-2 scrollbar-hide scroll-smooth
            "
          >
            {neighborhoods.map((neigh, index) => (
              <NeighborhoodCard key={index} {...neigh} />
            ))}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={scrollRight}
            className="
              hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 
              bg-white border border-gray-300 text-gray-600 
              hover:bg-gray-100 hover:text-black 
              rounded-full w-12 h-12 items-center justify-center 
              shadow-md transition-all z-10
            "
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>
      </div>
    </div>
  );
}
