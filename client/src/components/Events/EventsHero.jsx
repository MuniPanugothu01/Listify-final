import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function EventsHero() {
  const [searchType, setSearchType] = useState("All Events");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("All Dates");
  const [category, setCategory] = useState("All Categories");

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

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="relative w-full h-[55vh] min-h-[500px]">
        <img
          src="Event-hero-img.jpg"
          alt="Events"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Heading Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-semibold text-white mb-4">
              Discover Events Near You
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10">
              Concerts, festivals, workshops, comedy shows — all in one place
            </p>
          </div>
        </div>
      </div>

      {/* 🌟 Floating Search Bar Here */}
      <div className="absolute left-1/2 bottom-[-60px] transform -translate-x-1/2 w-full px-6 z-20">
        <div className=" rounded-2xl shadow-lg p-6 max-w-7xl mx-auto bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ">
            
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
              <button className="w-full bg-[#25676D] text-white font-medium px-8 py-3.5 rounded-lg  hover:bg-gray-800 transition flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
