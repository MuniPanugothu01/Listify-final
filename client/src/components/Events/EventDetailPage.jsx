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
  FaTimes,
  FaShareAlt,
  FaArrowLeft,
  FaCheck,
  FaMusic,
  FaFutbol,
  FaUtensils,
  FaFilm,
  FaUsers as FaConference,
  FaHeartbeat,
  FaGlassCheers
} from "react-icons/fa";

// Events Data (same as in EventsShowcase)
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

// Related Event Card Component
const RelatedEventCard = ({ event, onEventClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl border border-gray-200 hover:border-[#27bb97] transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer group shadow-sm hover:shadow-md"
    >
      <div className="relative h-40 overflow-hidden rounded-t-xl">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded-full">
            {event.tag}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
            event.isFree ? 'bg-green-500' : 'bg-[#27bb97]'
          } text-white`}>
            {event.isFree ? 'FREE' : `₹${event.price}`}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-[#27bb97] transition-colors">
          {event.title}
        </h4>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <FaCalendarAlt className="w-3 h-3 text-[#27bb97]" />
          <span>{event.displayDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <FaMapMarkerAlt className="w-3 h-3 text-[#27bb97]" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaStar className="w-3 h-3 text-yellow-400" />
            <span className="text-sm text-gray-600">{event.rating}</span>
          </div>
          <button className="px-3 py-1 bg-[#27bb97] hover:bg-[#1fa582] text-white text-sm rounded-lg transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

// EventDetailPage Component
const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the event by ID
    const allEvents = [...eventsData.popular, ...eventsData.upcoming];
    const foundEvent = allEvents.find(e => e.id === parseInt(eventId));
    
    if (foundEvent) {
      setEvent(foundEvent);
    }
    setLoading(false);
  }, [eventId]);

  const handleClose = () => {
    navigate('/');
  };

  const handleBookTickets = () => {
    if (!selectedTicket) {
      alert("Please select a ticket type");
      return;
    }
    // Navigate to booking page or handle booking
    alert(`Booking ${quantity} ${selectedTicket.type} ticket(s) for ₹${totalPrice}`);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'music': return <FaMusic className="w-4 h-4" />;
      case 'sports': return <FaFutbol className="w-4 h-4" />;
      case 'food': return <FaUtensils className="w-4 h-4" />;
      case 'entertainment': return <FaFilm className="w-4 h-4" />;
      case 'conference': return <FaConference className="w-4 h-4" />;
      case 'wellness': return <FaHeartbeat className="w-4 h-4" />;
      case 'festival': return <FaGlassCheers className="w-4 h-4" />;
      default: return <FaStar className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-[#27bb97] text-white px-6 py-2 rounded-lg"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const ticketTypes = [
    { type: "General Admission", price: event.isFree ? 0 : event.price, available: event.ticketsLeft, benefits: ["Entry to event", "Standard seating"] },
    { type: "VIP", price: event.isFree ? 0 : event.price * 2, available: Math.floor(event.ticketsLeft / 3), benefits: ["VIP lounge access", "Premium seating", "Complimentary drinks"] },
    { type: "Premium", price: event.isFree ? 0 : event.price * 3, available: Math.floor(event.ticketsLeft / 5), benefits: ["Front row seating", "Meet & greet", "Exclusive merchandise"] }
  ];

  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;
  const relatedEvents = eventsData.popular.filter(e => e.id !== event.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={handleClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Events
        </button>
      </div>

      {/* Event Details Content */}
      <div className="bg-white rounded-2xl max-w-7xl w-full mx-auto mb-8 shadow-lg">
        {/* Header */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition"
            >
              <FaHeart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-white'}`} />
            </button>
            <button className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition">
              <FaShareAlt className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Event Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium">
                {event.tag}
              </span>
              <span className="px-3 py-1 bg-[#27bb97] rounded-full text-sm font-medium">
                {event.isFree ? 'FREE' : `₹${event.price}`}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <FaStar className="w-4 h-4 text-yellow-400" />
                <span>{event.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUsers className="w-4 h-4" />
                <span>{event.attendees} attending</span>
              </div>
              <div className="flex items-center gap-1">
                <FaTicketAlt className="w-4 h-4" />
                <span>{event.ticketsLeft} tickets left</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-[#27bb97] rounded-lg">
                    <FaCalendarAlt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold">{event.displayDate} at {event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-[#27bb97] rounded-lg">
                    <FaMapMarkerAlt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-[#27bb97] rounded-lg">
                    <FaClock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{event.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-[#27bb97] rounded-lg">
                    {getCategoryIcon(event.category)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold capitalize">{event.category}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">About This Event</h3>
                <p className="text-gray-700 leading-relaxed">
                  Join us for an unforgettable {event.category} experience! {event.title} brings together {event.attendees} of like-minded individuals for a day filled with excitement, entertainment, and memories that will last a lifetime.
                </p>
              </div>

              {/* Artist/Organizer */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Featured Artist</h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-[#27bb97] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {event.artist?.charAt(0) || event.organizer?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{event.artist || event.organizer}</p>
                    <p className="text-sm text-gray-600">Performer/Organizer</p>
                  </div>
                </div>
              </div>

              {/* Age Limit & Organizer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 border border-gray-200 rounded-xl">
                  <h4 className="font-semibold mb-2">Age Limit</h4>
                  <p className="text-gray-600">{event.ageLimit}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-xl">
                  <h4 className="font-semibold mb-2">Organized By</h4>
                  <p className="text-gray-600">{event.organizer}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Ticket Selection */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                <h3 className="text-xl font-bold mb-4">Select Tickets</h3>
                
                {/* Ticket Types */}
                <div className="space-y-3 mb-6">
                  {ticketTypes.map((ticket, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedTicket?.type === ticket.type
                          ? 'border-[#27bb97] bg-[#27bb97] bg-opacity-5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{ticket.type}</span>
                        {selectedTicket?.type === ticket.type && (
                          <FaCheck className="w-4 h-4 text-[#27bb97]" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#27bb97]">
                          {ticket.price === 0 ? 'FREE' : `₹${ticket.price}`}
                        </span>
                        <span className="text-sm text-gray-500">
                          {ticket.available} left
                        </span>
                      </div>
                      {ticket.benefits && (
                        <ul className="mt-2 space-y-1">
                          {ticket.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quantity Selector */}
                {selectedTicket && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(selectedTicket.available, quantity + 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                      <span className="text-sm text-gray-500 ml-auto">
                        Max {selectedTicket.available}
                      </span>
                    </div>
                  </div>
                )}

                {/* Total Price */}
                {selectedTicket && (
                  <div className="flex items-center justify-between mb-6 p-3 bg-white rounded-lg">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-[#27bb97]">
                      ₹{totalPrice}
                    </span>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBookTickets}
                  disabled={!selectedTicket}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
                    selectedTicket
                      ? 'bg-[#27bb97] hover:bg-[#1fa582]'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FaTicketAlt className="w-5 h-5" />
                  {selectedTicket ? 'Book Now' : 'Select Tickets'}
                </button>
              </div>
            </div>
          </div>

          {/* Related Events Section */}
          {relatedEvents && relatedEvents.length > 0 && (
            <div className="mt-12 border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map((relatedEvent) => (
                  <RelatedEventCard
                    key={relatedEvent.id}
                    event={relatedEvent}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;