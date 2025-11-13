import React, { useState, useRef, useEffect } from "react";
import CircularGallery from "./CircularGallery";
import Gallery from "./Gallery";

const HeroSection = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        closeCategories();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    if (!isCategoriesOpen) {
      setIsExpanded(true);
      setIsAnimating(true);
      setIsCategoriesOpen(true);
    }
  };

  const closeCategories = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsCategoriesOpen(false);
      setIsExpanded(false);
    }, 300);
  };

  const categories = [
    { name: "Housing", image: "/house.png", color: "bg-purple-100" },
    { name: "Jobs", image: "/car1.png", color: "bg-blue-100" },
    { name: "Services", image: "/carservice.png", color: "bg-green-100" },
    {
      name: "TakeCare",
      image: "/categories/amazon.png",
      color: "bg-yellow-100",
    },
    { name: "Marketplace", image: "/Furniture.png", color: "bg-blue-50" },
    { name: "Freelancers", image: "/phiyano.png", color: "bg-orange-100" },
    { name: "Relocation Services", image: "/bag.png", color: "bg-red-100" },
    { name: "Local Events", image: "/bike.png", color: "bg-teal-100" },
  ];

  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(/herobg.jpg)` }}
    >
      <div className="relative border-t-4 border-x-4 border-black/40 rounded-t-xl px-170 py-70 text-center">
        {/* Title overlapping the top border */}
        <h1 className="absolute -top-6 left-1/2 -translate-x-1/2 text-black font-bold bg-white text-3xl px-7 py-2 broder-5 rounded-md">
          Listify
        </h1>

        {/* 🧩 Content inside border */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col gap-4">
          <div
            ref={searchContainerRef}
            className={`relative transition-all duration-500 ease-out ${
              isExpanded ? "w-180" : "w-150"
            }`}
          >
            <button
              onClick={handleSearchClick}
              className="absolute right-3 z-50 top-1/2 -translate-y-1/2 bg-[#3F929A] text-white px-6 py-4 rounded-xl text-sm cursor-pointer transition-all duration-500 hover:bg-[#2d7a82]"
            >
              Search
            </button>
            <input
              type="text"
              placeholder="Search for a listing..."
              className="w-full pl-28 pr-6 py-4 backdrop-blur-3xl bg-black/20 border-2 border-white/50 rounded-xl focus:outline-none placeholder:text-gray-100 text-gray-100 cursor-text transition-all duration-500"
              onClick={handleSearchClick}
            />
          </div>

          {/* Categories Dropdown */}
          {(isCategoriesOpen || isAnimating) && (
            <div
              ref={dropdownRef}
              className={`absolute top-full left-0 z-50  right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden  transform transition-all duration-500 ease-out ${
                isAnimating
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-4 opacity-0 scale-95"
              }`}
              style={{
                transformOrigin: "top center",
              }}
            >
              <div className="p-6">
                {/* Header with Browse Categories and View All side by side */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    Browse Categories
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#3F929A] hover:text-white transition-all duration-300 group text-gray-700 hover:shadow-md">
                    <span className="font-semibold">View all categories</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Image Categories Grid */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex flex-col bg-gray-100  items-center p-4 rounded-xl  hover:shadow-lg cursor-pointer transition-all duration-300 border border-gray-100 hover:border-[#3F929A] group"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isAnimating
                          ? `fadeInUp 0.5s ease-out ${index * 50}ms both`
                          : "none",
                      }}
                    >
                      <div
                        className={`w-18 h-18 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-15 h-19 object-contain"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center group-hover:text-[#3F929A]">
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute z-0 bg-gradient-to-t from-white to-transparent w-full bottom-0 h-[20%]" />

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
