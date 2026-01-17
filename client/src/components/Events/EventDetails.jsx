// src/components/Events/EventDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaHeart,
  FaTicketAlt,
  FaStar,
  FaClock,
  FaShareAlt,
  FaCheck,
  FaMusic,
  FaFutbol,
  FaUtensils,
  FaFilm,
  FaUsers as FaConference,
  FaHeartbeat,
  FaGlassCheers,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaPhone,
  FaComments,
  FaImages,
  FaBath,
  FaExpand,
  FaUser,
  FaCheckCircle,
  FaRegClock,
  FaRegStar,
  FaShare,
  FaRegHeart,
  FaCar,
  FaMobileAlt,
  FaLanguage,
  FaMicrophone,
  FaDoorOpen,
  FaExclamationTriangle,
  FaDirections,
  FaExternalLinkAlt,
  FaWifi,
  FaTv,
  FaBolt,
  FaThermometerHalf,
  FaSnowflake,
  FaUtensils as FaKitchen,
  FaDumbbell,
  FaParking,
  FaSwimmingPool,
  FaShieldAlt,
  FaConciergeBell,
} from "react-icons/fa";

// Events Data
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

// Google Maps Component
const EventLocationMap = ({ location, fullLocation }) => {
  const encodedLocation = encodeURIComponent(fullLocation || location);
  const googleMapsUrl = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
  
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <FaMapMarkerAlt className="text-[#27bb97]" />
          Event Location
        </h2>
        <div className="flex gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#27bb97] hover:bg-[#1fa582] text-white px-4 py-2 rounded-xl transition transform hover:-translate-y-1"
          >
            <FaDirections className="w-4 h-4" />
            Get Directions
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition transform hover:-translate-y-1"
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            Open in Maps
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Location Details */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#27bb97]" />
              Venue Address
            </h3>
            <p className="text-gray-700 leading-relaxed">{fullLocation || location}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">Parking Available</h4>
              <p className="text-sm text-green-700">Free parking with validation</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Public Transport</h4>
              <p className="text-sm text-blue-700">Easily accessible via metro/bus</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
              <FaCar className="w-5 h-5" />
              Getting There
            </h4>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>• Free parking available across the street</li>
              <li>• Additional parking at Flushing Hospital</li>
              <li>• See security for parking validation</li>
              <li>• Public transportation recommended</li>
            </ul>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src={googleMapsUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Event Location Map"
            className="w-full h-full min-h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

// Badge Component
const Badge = ({ children, type = "default" }) => {
  const styles = {
    verified: "bg-green-100 text-green-800 border-green-200",
    immediate: "bg-blue-100 text-blue-800 border-blue-200",
    discount: "bg-orange-100 text-orange-800 border-orange-200",
    featured: "bg-purple-100 text-purple-800 border-purple-200",
    default: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[type]}`}
    >
      {type === "verified" && <FaCheckCircle className="w-3 h-3" />}
      {type === "immediate" && <FaRegClock className="w-3 h-3" />}
      {type === "featured" && <FaRegStar className="w-3 h-3" />}
      {children}
    </span>
  );
};

// Rating Stars Component
const RatingStars = ({ rating, reviews }) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaRegStar
          key={star}
          className={
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
    <span className="text-sm text-gray-600">({reviews})</span>
  </div>
);

// Related Events Section
const RelatedEventsSection = ({ events, onEventClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const nextImage = (eventId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [eventId]: ((prev[eventId] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (eventId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [eventId]: ((prev[eventId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  return (
    <section className="mt-20">
      <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        More Events You'll Love
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => {
          const currentIndex = currentImageIndex[event.id] || 0;
          const totalImages = 3; // Assuming 3 images per event

          return (
            <div
              key={event.id}
              onClick={() => onEventClick(event)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-300 hover:border-[#27bb97] transition-all duration-300 hover:transform hover:-translate-y-2 group shadow-lg hover:shadow-xl cursor-pointer"
            >
              {/* Image Gallery */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Image Navigation */}
                {totalImages > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage(event.id, totalImages);
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-200"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(event.id, totalImages);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-200"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {totalImages > 1 && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {currentIndex + 1} / {totalImages}
                  </div>
                )}

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge type="featured">{event.tag}</Badge>
                  {event.ticketsLeft < 100 && (
                    <Badge type="immediate">Selling Fast</Badge>
                  )}
                </div>

                {/* Price Badge */}
                <span className={`absolute bottom-3 left-3 px-3 py-2 ${
                  event.isFree ? 'bg-green-500' : 'bg-[#27bb97]'
                } text-white text-sm font-bold rounded-full shadow-lg`}>
                  {event.isFree ? 'FREE' : `₹${event.price}`}
                </span>

                {/* Views */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 px-2 py-1 rounded text-xs text-white">
                  <FaEye className="w-3 h-3" />
                  <span>{event.attendees}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 mb-3 group-hover:text-[#27bb97] transition-colors">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4 text-[#27bb97]" />
                    <span>{event.displayDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4 text-[#27bb97]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4 text-[#27bb97]" />
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
                    <FaTicketAlt className="w-4 h-4 text-[#27bb97]" />
                    <span className="text-sm text-gray-600">{event.ticketsLeft} left</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-[#27bb97] hover:bg-[#1fa582] text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#27bb97]/20">
                  <FaTicketAlt className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [eventId]);

  // Enhanced navigation function
  const handleNavigate = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  // Handle related event click
  const handleRelatedEventClick = (relatedEvent) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(`/events/${relatedEvent.id}`);
    }, 100);
  };

  // Image navigation
  const nextImage = () => {
    if (event && event.images) {
      setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
    }
  };

  const prevImage = () => {
    if (event && event.images) {
      setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
    }
  };

  useEffect(() => {
    const allEvents = [...eventsData.popular, ...eventsData.upcoming];
    const foundEvent = allEvents.find(e => e.id === parseInt(eventId));
    if (foundEvent) {
      const enhancedEvent = {
        ...foundEvent,
        images: [
          foundEvent.image,
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        ],
        fullLocation: "Community Center (The Hindu Temple), 143-09 Holly Ave, Flushing, NY 11355",
        startTime: "6:00 PM (EST)",
        doorsOpen: "5:00 PM (EST)",
        duration: "5 hours",
        language: "Bengali",
        parking: "Free Parking (with validation)",
        mobileTicket: true,
        performers: [
          { name: "Aurthohin", events: 1, role: "Headliner" },
          { name: "Tanzir C Tuhin", events: 1, role: "Support Act" },
          { name: "Rafi Alam", events: 1, role: "Opening Act" }
        ],
        categories: ["Live Concert", "Singing", "Music"],
        description: `🎶Aurthohin, Tanzir Tuhin (X-Sironamhin) & Rafi Alam Live in New York 🎶
Date: Sunday, November 30 | Time: 6:00 PM (EST)
Venue: 143-09 Holly Ave, Flushing NY 11355
Come join us for an electrifying evening with Aurthohin, Tanzir Tuhin (X-Sironamhin) and Rafi Alam as they perform live in NYC! Get ready to rock out to their iconic tunes and experience their incredible stage presence up close. Don't miss this epic event filled with music, energy, and unforgettable memories. Grab your tickets now and get ready for a night to remember!
🎶 An unforgettable musical journey awaits—join us for Aurthohin, Tanzir Tuhin & Rafi Live in NY!`,
        parkingInstructions: [
          "Limited parking is available across the street from the Community Center",
          "Additional parking is available at Flushing Hospital Parking lot (Burlington Street)",
          "See security staff at the venue for seal on the hospital parking ticket to get $7 as parking fee for the event.",
          "No parking of cars or other vehicles blocking the entrance to the nearby houses of residents."
        ],
        amenities: [
          "Wi-Fi", "AC", "Food Stalls", "Bar", "Merchandise", 
          "VIP Lounge", "Photo Booth", "Charging Stations", "First Aid"
        ],
        ticketTypes: [
          { type: "General", price: 40, status: "Going fast", closes: "Dec 1", benefits: ["Basic entry"] },
          { type: "Gold", price: 50, status: "Going fast", closes: "Dec 1", benefits: ["Priority entry"] },
          { type: "Premium", price: 75, status: "Available", closes: "Dec 1", benefits: ["Premium seating"] },
          { 
            type: "VIP (Includes Meet & Greet and exclusive Aurthohin Merchandise)", 
            price: 100, 
            status: "Available", 
            closes: "Dec 1", 
            benefits: ["Meet & Greet", "Exclusive Merch", "VIP Lounge"] 
          }
        ],
        organizer: "Music Bangla Boston",
        contact: "+1 (555) 123-4567",
        responseRate: "95%",
        responseTime: "< 2h",
        views: "15.8k",
        saves: "2.3k",
        verified: true,
        immediate: true,
        sellingFast: true
      };
      setEvent(enhancedEvent);
    }
    setLoading(false);
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-10 bg-white rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Event Not Found</h2>
          <button 
            onClick={() => handleNavigate('/events')} 
            className="bg-[#27bb97] hover:bg-[#1fa582] text-white font-bold py-3 px-8 rounded-xl transition transform hover:-translate-y-1"
          >
            ← Back to Events
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;
  const relatedEvents = eventsData.popular.filter(e => e.id !== event.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center gap-3 text-sm font-medium">
            <button 
              onClick={() => handleNavigate('/')} 
              className="flex items-center gap-2 hover:text-[#27bb97] transition transform hover:-translate-y-0.5"
            >
              <FaHome className="w-4 h-4" /> Home
            </button>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
            <button 
              onClick={() => handleNavigate('/events')} 
              className="hover:text-[#27bb97] transition transform hover:-translate-y-0.5"
            >
              Events
            </button>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#27bb97] font-bold truncate max-w-md">
              {event.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Enhanced Image Gallery */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {/* Main Image */}
        <img 
          src={event.images[currentImageIndex]} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover brightness-75" 
        />
        
        {/* Image Navigation */}
        {event.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {event.images.length}
            </div>

            {/* Image Thumbnails */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {event.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-12 h-12 rounded border-2 overflow-hidden ${
                    index === currentImageIndex ? 'border-white' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {event.sellingFast && (
                <Badge type="immediate">🔥 Selling Fast</Badge>
              )}
              {event.verified && (
                <Badge type="verified">Verified</Badge>
              )}
              <Badge type="featured">{event.tag}</Badge>
              <span className="px-5 py-2 bg-[#27bb97] rounded-full font-bold text-lg shadow-lg">
                {event.isFree ? 'FREE EVENT' : event.displayPrice}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                <FaCalendarAlt /> {event.displayDate} • {event.startTime}
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                <FaMapMarkerAlt /> {event.fullLocation}
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                <FaUsers /> {event.attendees} Going
              </div>
            </div>
          </div>
        </div>

        {/* FABs */}
        <div className="absolute top-8 right-8 flex flex-col gap-3">
          <button 
            onClick={() => setIsFavorite(!isFavorite)} 
            className="p-4 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition shadow-xl transform hover:-translate-y-1"
          >
            <FaRegHeart
              className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`}
            />
          </button>
          <button className="p-4 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition shadow-xl transform hover:-translate-y-1">
            <FaShare className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center transform hover:-translate-y-1 transition">
                <div className="w-12 h-12 bg-[#27bb97] rounded-full mx-auto mb-3 flex items-center justify-center">
                  <FaClock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Duration</h3>
                <p className="text-lg font-semibold text-[#27bb97]">{event.duration}</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center transform hover:-translate-y-1 transition">
                <div className="w-12 h-12 bg-[#27bb97] rounded-full mx-auto mb-3 flex items-center justify-center">
                  <FaLanguage className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Language</h3>
                <p className="text-lg font-semibold text-[#27bb97]">{event.language}</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center transform hover:-translate-y-1 transition">
                <div className="w-12 h-12 bg-[#27bb97] rounded-full mx-auto mb-3 flex items-center justify-center">
                  <FaDoorOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Doors Open</h3>
                <p className="text-lg font-semibold text-[#27bb97]">{event.doorsOpen}</p>
              </div>
            </div>

            {/* Event Details Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <FaExclamationTriangle className="text-yellow-500" />
                Event Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="font-semibold text-lg">{event.categories.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Start Time</span>
                    <p className="font-semibold text-lg">{event.startTime}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Show Duration</span>
                    <p className="font-semibold text-lg">{event.duration}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Language</span>
                    <p className="font-semibold text-lg">{event.language}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Doors Open</span>
                    <p className="font-semibold text-lg">{event.doorsOpen}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Parking</span>
                    <p className="font-semibold text-lg">{event.parking}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location with Google Maps */}
            <EventLocationMap 
              location={event.location} 
              fullLocation={event.fullLocation} 
            />

            {/* Performers - Enhanced Card Layout */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold mb-6">Event Performers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {event.performers.map((performer, i) => (
                  <div key={i} className="text-center p-6 border-2 border-gray-100 rounded-2xl hover:border-[#27bb97] transition group transform hover:-translate-y-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#27bb97] to-[#1fa582] rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition">
                      <span className="text-2xl font-bold text-white">{performer.name.charAt(0)}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-[#27bb97] transition">{performer.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{performer.role}</p>
                    <p className="text-xs text-gray-400">{performer.events} Upcoming Event(s)</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold mb-6">Event Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {event.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-8 h-8 bg-[#27bb97] rounded-full flex items-center justify-center">
                      <FaBolt className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About & Description */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold mb-6">About this event</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
                <p className="whitespace-pre-wrap">{event.description}</p>
              </div>
              {event.parkingInstructions && event.parkingInstructions.length > 0 && (
                <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-yellow-800">
                    <FaCar className="w-5 h-5" /> PARKING INSTRUCTIONS:
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {event.parkingInstructions.map((instr, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-yellow-600 font-bold bg-yellow-100 px-2 py-1 rounded-full text-xs">{i + 1}</span>
                        <span className="flex-1">{instr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Ticket Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 sticky top-24 p-8">
              <h3 className="text-2xl font-bold mb-6">Ticket Information</h3>
              
              <div className="space-y-4 mb-6">
                {event.ticketTypes.map((ticket) => (
                  <div
                    key={ticket.type}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative transform hover:-translate-y-1 ${
                      selectedTicket?.type === ticket.type
                        ? 'border-[#27bb97] bg-[#27bb97]/5 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full ${
                      ticket.status === 'Going fast' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                      {ticket.status}
                    </span>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg line-clamp-2 pr-8">{ticket.type}</h4>
                        <p className="text-2xl font-extrabold text-[#27bb97] mt-1">
                          ${ticket.price}.00
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Ticket close on {ticket.closes}</p>
                        {ticket.benefits && (
                          <ul className="mt-2 space-y-1 text-xs text-gray-600">
                            {ticket.benefits.map((benefit, j) => (
                              <li key={j} className="flex items-center gap-1">
                                • {benefit}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {selectedTicket?.type === ticket.type && <FaCheck className="w-6 h-6 text-[#27bb97]" />}
                    </div>
                  </div>
                ))}
              </div>

              {selectedTicket && (
                <>
                  <div className="mt-8">
                    <label className="block font-semibold mb-3">Quantity</label>
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                      <button 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                        className="w-12 h-12 rounded-full bg-white shadow hover:shadow-md text-xl transition hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold w-20 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(q => Math.min(999, q + 1))} 
                        className="w-12 h-12 rounded-full bg-white shadow hover:shadow-md text-xl transition hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-[#27bb97]/10 to-[#27bb97]/5 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-3xl font-extrabold text-[#27bb97]">${totalPrice}.00</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Booking ${quantity} × ${selectedTicket.type} for $${totalPrice}`)}
                    className="w-full mt-6 py-5 bg-[#27bb97] hover:bg-[#1fa582] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center justify-center gap-3"
                  >
                    <FaTicketAlt className="w-6 h-6" />
                    ADD TO CART
                  </button>
                </>
              )}

              {/* Contact Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#27bb97] rounded-full flex items-center justify-center">
                      <FaUser className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{event.organizer}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>⚡ {event.responseRate} response</span>
                        <span>• {event.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowContact(!showContact)}
                    className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                  >
                    <FaPhone className="w-4 h-4" />
                    {showContact ? event.contact : 'Show Contact'}
                  </button>
                  <button className="flex-1 flex items-center gap-2 px-4 py-3 bg-[#27bb97] hover:bg-[#1fa582] text-white rounded-xl transition-colors">
                    <FaComments className="w-4 h-4" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events Section */}
        <RelatedEventsSection 
          events={relatedEvents} 
          onEventClick={handleRelatedEventClick}
        />
      </div>
    </div>
  );
};

export default EventDetails;