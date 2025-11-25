// src/components/Events/EventsShowcase.jsx

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart, 
  FaChevronLeft, FaChevronRight, FaTicketAlt, 
  FaSearch, FaFilter, FaStar, FaClock, FaMusic,
  FaFutbol, FaUtensils, FaFilm, FaUsers as FaConference,
  FaHeartbeat, FaGlassCheers, FaTimes,
  FaCheck, FaShareAlt
} from "react-icons/fa";

// Events Data (same as before)
const eventsData = {
  popular: [
    {
      id: 1,
      title: "Sunburn Goa 2025",
      date: "2024-12-27",
      displayDate: "Dec 27–30",
      location: "Vagator Beach, Goa",
      price: 2999,
      displayPrice: "₹2,999 onwards",
      attendees: "15.8k",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      tag: "Music Festival",
      category: "music",
      time: "18:00",
      rating: 4.8,
      ticketsLeft: 45,
      artist: "Various Artists",
      duration: "4 Days",
      ageLimit: "18+",
      organizer: "Sunburn Events"
    },
    {
      id: 2,
      title: "Rangoli Night Market",
      date: "2024-11-02",
      displayDate: "Nov 2",
      location: "DLF CyberHub, Gurgaon",
      price: 0,
      displayPrice: "Free Entry",
      attendees: "9.2k",
      isFree: true,
      image: "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2017/03/Holi-Festival.png",
      tag: "Festival",
      category: "food",
      time: "17:00",
      rating: 4.3,
      ticketsLeft: 1000,
      artist: "Local Vendors",
      duration: "6 Hours",
      ageLimit: "All Ages",
      organizer: "DLF Events"
    },
    {
      id: 3,
      title: "Stand-up Comedy Night",
      date: "2024-10-25",
      displayDate: "Oct 25",
      location: "The Comedy Club, Mumbai",
      price: 599,
      displayPrice: "₹599",
      attendees: "1.8k",
      image: "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2017/03/ticketbox-unlike-dummy-1110x600.jpg",
      tag: "Comedy",
      category: "entertainment",
      time: "20:00",
      rating: 4.6,
      ticketsLeft: 150,
      artist: "Comedy Collective",
      duration: "3 Hours",
      ageLimit: "16+",
      organizer: "The Comedy Club"
    },
    {
      id: 4,
      title: "Yoga by the Beach",
      date: "2024-12-01",
      displayDate: "Every Sunday",
      location: "Juhu Beach",
      price: 0,
      displayPrice: "Free",
      attendees: "3.1k",
      isFree: true,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      tag: "Wellness",
      category: "wellness",
      time: "06:00",
      rating: 4.7,
      ticketsLeft: 200,
      artist: "Yoga Masters",
      duration: "2 Hours",
      ageLimit: "All Ages",
      organizer: "Beach Wellness"
    },
    {
      id: 5,
      title: "Coldplay India Tour 2025",
      date: "2025-01-18",
      displayDate: "Jan 18–19",
      location: "DY Patil Stadium, Mumbai",
      price: 4500,
      displayPrice: "₹4,500 onwards",
      attendees: "82.5k",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      tag: "Concert",
      category: "music",
      time: "19:00",
      rating: 4.9,
      ticketsLeft: 12,
      artist: "Coldplay",
      duration: "3 Hours",
      ageLimit: "12+",
      organizer: "Live Nation"
    },
    {
      id: 6,
      title: "IPL 2025 Opening Ceremony",
      date: "2025-03-22",
      displayDate: "Mar 22, 2025",
      location: "Narendra Modi Stadium",
      price: 1200,
      displayPrice: "₹1,200 onwards",
      attendees: "95.3k",
      image: "https://images.unsplash.com/photo-1621430669951-5e9e3b98ed8b?w=800&q=80",
      tag: "Sports",
      category: "sports",
      time: "19:30",
      rating: 4.8,
      ticketsLeft: 89,
      artist: "Various Performers",
      duration: "4 Hours",
      ageLimit: "All Ages",
      organizer: "BCCI"
    }
  ],
  upcoming: [
    {
      id: 13,
      title: "New Year's Eve Party",
      date: "2024-12-31",
      displayDate: "Dec 31",
      location: "Multiple Venues",
      price: 2499,
      displayPrice: "₹2,499 onwards",
      attendees: "34.7k",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      tag: "Party",
      category: "entertainment",
      time: "21:00",
      rating: 4.5,
      ticketsLeft: 156,
      artist: "Top DJs",
      duration: "8 Hours",
      ageLimit: "21+",
      organizer: "Nightlife Events"
    },
    {
      id: 14,
      title: "Winter Music Festival",
      date: "2025-01-10",
      displayDate: "Jan 10–12",
      location: "Snow Valley, Manali",
      price: 3299,
      displayPrice: "₹3,299",
      attendees: "22.1k",
      image: "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2016/12/78459379.jpg",
      tag: "Music",
      category: "music",
      time: "16:00",
      rating: 4.4,
      ticketsLeft: 78,
      artist: "Indie Artists",
      duration: "3 Days",
      ageLimit: "18+",
      organizer: "Mountain Events"
    },
    {
      id: 15,
      title: "Startup Summit",
      date: "2025-02-08",
      displayDate: "Feb 8–9",
      location: "Hitech City, Hyderabad",
      price: 1999,
      displayPrice: "₹1,999",
      attendees: "8.9k",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      tag: "Business",
      category: "conference",
      time: "09:00",
      rating: 4.6,
      ticketsLeft: 45,
      artist: "Industry Leaders",
      duration: "2 Days",
      ageLimit: "18+",
      organizer: "Tech Summit India"
    },
    {
      id: 16,
      title: "Holifest 2025",
      date: "2025-03-14",
      displayDate: "Mar 14",
      location: "Multiple Cities",
      price: 0,
      displayPrice: "Free",
      attendees: "120.5k",
      isFree: true,
      image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=800&q=80",
      tag: "Festival",
      category: "festival",
      time: "10:00",
      rating: 4.7,
      ticketsLeft: 5000,
      artist: "Cultural Performers",
      duration: "Full Day",
      ageLimit: "All Ages",
      organizer: "Cultural Society"
    }
  ]
};

// EventCard Component with Routing
const EventCard = ({ event, onEventClick }) => {
  return (
    <div onClick={onEventClick} className="block cursor-pointer">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-300 hover:border-[#27bb97] transition-all duration-300 hover:transform hover:-translate-y-2 group shadow-lg hover:shadow-xl">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Tag */}
          <span className="absolute top-3 left-3 px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded-full uppercase tracking-wide">
            {event.tag}
          </span>

          {/* Heart */}
          <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition">
            <FaHeart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>

          {/* Price Badge */}
          <span className={`absolute bottom-3 left-3 px-3 py-2 ${event.isFree ? 'bg-green-500' : 'bg-[#27bb97]'} text-white text-sm font-bold rounded-full shadow-lg`}>
            {event.isFree ? 'FREE' : `₹${event.price}`}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 mb-3  transition-colors">
            {event.title}
          </h3>

          {/* Event Details */}
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4 " />
              <span>{event.displayDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 " />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4 " />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Stats and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <FaStar className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{event.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaTicketAlt className="w-4 h-4 " />
              <span className="text-sm text-gray-600">{event.ticketsLeft} left</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <FaUsers className="w-4 h-4" />
              <span>{event.attendees}</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-[#27bb97] hover:bg-[#1fa582] text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#27bb97]/20">
            <FaTicketAlt className="w-4 h-4" />
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

// DiscoverEventCard Component with Routing
const DiscoverEventCard = ({ event, onEventClick }) => {
  return (
    <div onClick={onEventClick} className="cursor-pointer">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#27bb97] transition-all duration-300 hover:transform hover:-translate-y-1 group shadow-md hover:shadow-lg">
        {/* Image with overlay */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-full capitalize">
              {event.category}
            </span>
          </div>
          
          {/* Favorite Button */}
          <button className="absolute top-3 right-3 p-2 bg-opacity-30 rounded-full hover:bg-opacity-30 transition backdrop-blur-sm">
            <FaHeart className="w-4 h-4 text-white hover:text-red-400 transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Date */}
          <div className="mb-3">
            <h3 className="font-bold text-gray-800 text-lg line-clamp-2 mb-2  transition-colors">
              {event.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendarAlt className="w-3 h-3 " />
              <span>{event.displayDate}</span>
              <span className="mx-1">•</span>
              <FaClock className="w-3 h-3 " />
              <span>{event.time}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <FaMapMarkerAlt className="w-3 h-3  flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          {/* Price and Rating Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${event.isFree ? 'text-green-600' : 'text-[#27bb97]'}`}>
                {event.isFree ? 'FREE' : `₹${event.price}`}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
              <FaStar className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-gray-700">{event.rating}</span>
            </div>
          </div>

          {/* Stats and CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <FaUsers className="w-3 h-3" />
                <span>{event.attendees}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaTicketAlt className="w-3 h-3" />
                <span>{event.ticketsLeft} left</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#27bb97] hover:bg-[#1fa582] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
              <FaTicketAlt className="w-3 h-3" />
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// UpcomingEventsSection Component with Routing
const UpcomingEventsSection = ({ onEventClick }) => {
  return (
    <section className="mt-20 px-4 md:px-8 lg:px-16">
      <div>
        <h1 className="text-black font-extrabold text-center text-3xl md:text-4xl">
          Upcoming Events You Can't Miss!
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#25676D] to-[#2D8690] mt-3 rounded-full mx-auto"></div>
        <p className="text-center text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto">
          Discover exciting upcoming events featuring music, sports, entertainment, and more. Book your tickets early!
        </p>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto cursor-pointer mt-10">
          {eventsData.upcoming.map((event) => (
            <div
              key={event.id}
              onClick={() => onEventClick(event)}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="sm:w-2/5 h-48 sm:h-auto relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Event Tag */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded-full uppercase tracking-wide">
                    {event.tag}
                  </span>
                </div>

                {/* Content Section */}
                <div className="sm:w-3/5 p-5 flex flex-col justify-between">
                  {/* Title and Rating */}
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <div className="text-blue-600 px-3 py-1 font-bold text-[20px]">
                        {event.isFree ? 'FREE' : `₹${event.price.toLocaleString()}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({event.rating}/5 Rating)
                      </span>
                    </div>

                    {/* Event Type and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt size={16} />
                        <span>{event.displayDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaUsers size={16} />
                        <span>{event.attendees}</span>
                      </div>
                    </div>

                    {/* Artist/Organizer */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span className="font-medium">By:</span>
                      <span>{event.artist || event.organizer}</span>
                    </div>

                    {/* Horizontal Line */}
                    <div className="border-t border-gray-200 mb-4"></div>

                    {/* Location and Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <FaMapMarkerAlt size={14} />
                        <span>{event.location}</span>
                      </div>
                      <button className="bg-[#2D8690] hover:bg-[#25676D] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Events Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer">
            View All Upcoming Events
          </button>
        </div>
      </div>
    </section>
  );
};

// Main EventsShowcase Component
const EventsShowcase = () => {
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();

  // Combine all events for filtering
  const allEvents = [...eventsData.popular, ...eventsData.upcoming];

  // Filter events based on criteria
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || event.date === selectedDate;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesPrice = 
      priceRange === 'all' ||
      (priceRange === 'free' && event.price === 0) ||
      (priceRange === 'under1000' && event.price > 0 && event.price < 1000) ||
      (priceRange === '1000to5000' && event.price >= 1000 && event.price <= 5000) ||
      (priceRange === 'over5000' && event.price > 5000);
    
    return matchesSearch && matchesDate && matchesCategory && matchesPrice;
  });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleEventClick = (event) => {
    // Navigate to event detail page with event ID
    navigate(`/events/${event.id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDate('');
    setSelectedCategory('all');
    setPriceRange('all');
  };

  const categories = [
    { id: 'all', name: 'All Events', icon: FaStar },
    { id: 'music', name: 'Music', icon: FaMusic },
    { id: 'sports', name: 'Sports', icon: FaFutbol },
    { id: 'food', name: 'Food & Drink', icon: FaUtensils },
    { id: 'entertainment', name: 'Entertainment', icon: FaFilm },
    { id: 'conference', name: 'Conference', icon: FaConference },
    { id: 'wellness', name: 'Wellness', icon: FaHeartbeat },
    { id: 'festival', name: 'Festival', icon: FaGlassCheers }
  ];

  return (
    <div className="min-h-screen text-gray-800 relative overflow-hidden">
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 1. POPULAR EVENTS with Scroll Bar */}
          <section>
            <div className="flex items-center justify-between mb-8 pt-10">
              <h2 className="text-4xl font-bold text-gray-800 text-center w-full">
                POPULAR EVENTS
                <div className="h-1 w-20 bg-gradient-to-r from-[#25676D] to-[#2D8690] rounded-full mx-auto mt-3"></div>
              </h2>

              <div className="flex gap-2">
                <button 
                  onClick={scrollLeft}
                  className="p-3 rounded-full bg-white border border-gray-300 hover:border-[#27bb97] transition shadow-sm"
                >
                  <FaChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={scrollRight}
                  className="p-3 rounded-full bg-white border border-gray-300 hover:border-[#27bb97] transition shadow-sm"
                >
                  <FaChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {eventsData.popular.map((event) => (
                <div key={event.id} className="min-w-[320px] flex-shrink-0">
                  <EventCard event={event} onEventClick={() => handleEventClick(event)} />
                </div>
              ))}
            </div>
          </section>

          {/* 2. DISCOVER EVENTS Section with NEW Card Design */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-4 tracking-wide text-gray-800">
              DISCOVER EVENTS
            </h2>
            
            {/* Gradient Divider */}
            <div className="h-1 w-20 bg-gradient-to-r from-[#25676D] to-[#2D8690] mt-3 rounded-full mx-auto mb-8"></div>

            <p className="text-center text-gray-600 mb-8 text-base md:text-lg max-w-2xl mx-auto">
              Find your perfect event with our advanced filters and search options
            </p>

            {/* Enhanced Filter Section */}
            <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-300 shadow-lg">
              {/* Search and Main Filters */}
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
                {/* Search Bar */}
                <div className="relative flex-1 w-full">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search events, locations, or artists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#27bb97] transition-colors"
                  />
                </div>

                {/* Date Filter */}
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl border border-gray-300">
                  <FaCalendarAlt className="w-5 h-5 text-[#27bb97]" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-gray-800 focus:outline-none"
                  />
                </div>

                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 bg-[#27bb97] hover:bg-[#1fa582] text-white rounded-xl transition-colors font-medium flex items-center gap-2"
                >
                  <FaFilter className="w-4 h-4" />
                  Filters
                </button>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Expandable Filters */}
              {showFilters && (
                <div className="border-t border-gray-300 pt-4 mt-4">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Category Filter */}
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-[#27bb97] transition-colors flex-1"
                    >
                      <option value="all">All Categories</option>
                      <option value="music">Music</option>
                      <option value="sports">Sports</option>
                      <option value="food">Food & Drink</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="conference">Conference</option>
                      <option value="wellness">Wellness</option>
                      <option value="festival">Festival</option>
                    </select>

                    {/* Price Filter */}
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-[#27bb97] transition-colors flex-1"
                    >
                      <option value="all">Any Price</option>
                      <option value="free">Free Events</option>
                      <option value="under1000">Under ₹1,000</option>
                      <option value="1000to5000">₹1,000 - ₹5,000</option>
                      <option value="over5000">Over ₹5,000</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Categories */}
            <div className="flex overflow-x-auto gap-3 mb-8 pb-4 scrollbar-hide">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-[#27bb97] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    } shadow-sm`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Events Grid with NEW Discover Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <DiscoverEventCard key={event.id} event={event} onEventClick={() => handleEventClick(event)} />
              ))}
            </div>

            {/* No Results Message */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-300 shadow-lg">
                <FaSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#27bb97] hover:bg-[#1fa582] text-white rounded-xl transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </section>

          {/* 3. UPCOMING EVENTS Section with Property Card Style */}
          <UpcomingEventsSection onEventClick={handleEventClick} />
        </div>
      </div>
    </div>
  );
};

export default EventsShowcase;