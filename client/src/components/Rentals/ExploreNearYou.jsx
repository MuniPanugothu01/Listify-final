import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const exploreItems = [
  {
    title: "Single Rooms",
    subtitle: "Affordable private rooms",
    image: "/singlenearBY.jpg",
  },
  {
    title: "Shared Rooms",
    subtitle: "Budget-friendly shared spaces",
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Rental Houses",
    subtitle: "Family & group homes",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "PG / Paying Guest",
    subtitle: "Comfortable PG accommodations",
    image:
      "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=60",
  },
];

export default function ExploreNearYou() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector("a").offsetWidth + 24; // width + gap
      container.scrollLeft -= cardWidth;
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector("a").offsetWidth + 24; // width + gap
      container.scrollLeft += cardWidth;
      setCurrentIndex(Math.min(exploreItems.length - 1, currentIndex + 1));
    }
  };

  return (
    <div className="w-full py-14 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Explore Rooms & Rental Houses Near You
        </h2>

        <div className="w-20 h-1 bg-blue-600 rounded-md mt-2 mb-8"></div>

        {/* Cards Container with relative positioning */}
     <Link to="/rentals-listings">
        <div className="relative group">
          {/* Navigation Buttons positioned over the cards */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2
            z-10 bg-white/95 backdrop-blur-sm border border-gray-200
            rounded-full p-2.5 shadow-lg hover:shadow-xl
            hover:bg-white hover:scale-110 active:scale-95
            transition-all duration-300 cursor-pointer
            opacity-0 group-hover:opacity-100 focus:opacity-100
            hover:border-blue-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2
            z-10 bg-white/95 backdrop-blur-sm border border-gray-200
            rounded-full p-2.5 shadow-lg hover:shadow-xl
            hover:bg-white hover:scale-110 active:scale-95
            transition-all duration-300 cursor-pointer
            opacity-0 group-hover:opacity-100 focus:opacity-100
            hover:border-blue-300"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto scroll-smooth
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
            pb-4 -mx-5 px-5 md:mx-0 md:px-0 md:pb-0"
            style={{
              scrollbarWidth: 'thin',
              msOverflowStyle: 'none'
            }}
          >
            {exploreItems.map((item, index) => (
              <a
                key={index}
                href={`/explore/${item.title.toLowerCase().replace(/ /g, "-")}`}
                aria-label={`Explore ${item.title}`}
                className="relative min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink
                group/card block rounded-xl overflow-hidden cursor-pointer
                border border-gray-200 bg-white shadow-sm
                hover:shadow-lg hover:-translate-y-1
                transition-all duration-300"
              >
                <div className="h-36 md:h-40 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover 
                    group-hover/card:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-md font-semibold text-gray-800 group-hover/card:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div></Link>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {exploreItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const container = scrollContainerRef.current;
                  const cardWidth = container.querySelector("a").offsetWidth + 24;
                  container.scrollLeft = index * cardWidth;
                  setCurrentIndex(index);
                }
              }}
              aria-label={`Go to item ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-blue-600 w-8" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>  
      </div>
    </div>
  );
}