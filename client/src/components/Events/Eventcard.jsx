// src/components/Events/EventsShowcase.jsx

import React, { useState, useRef } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart, FaChevronLeft, FaChevronRight, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// import EventDetails from '../../components/Events/EventDetails';


const eventsData = {
  popular: [
    {
      id: 1,
      title: "Sunburn Goa 2025",
      date: "Dec 27–30",
      location: "Vagator Beach, Goa",
      price: "₹2,999 onwards",
      attendees: "15.8k",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      tag: "Music Festival",
    },
    {
      id: 2,
      title: "Rangoli Night Market",
      date: "Nov 2",
      location: "DLF CyberHub, Gurgaon",
      price: "Free Entry",
      attendees: "9.2k",
      isFree: true,
      image: "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2017/03/Holi-Festival.png",
      tag: "Festival",
    },
    {
      id: 3,
      title: "Stand-up Comedy Night",
      date: "Oct 25",
      location: "The Comedy Club, Mumbai",
      price: "₹599",
      attendees: "1.8k",
      image: "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2017/03/ticketbox-unlike-dummy-1110x600.jpg",
      tag: "Comedy",
    },
    {
      id: 4,
      title: "Yoga by the Beach",
      date: "Every Sunday",
      location: "Juhu Beach",
      price: "Free",
      attendees: "3.1k",
      isFree: true,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      tag: "Wellness",
    },
    {
      id: 5,
      title: "Coldplay India Tour 2025",
      date: "Jan 18–19",
      location: "DY Patil Stadium, Mumbai",
      price: "₹4,500 onwards",
      attendees: "82.5k",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      tag: "Concert",
    },
    {
      id: 6,
      title: "IPL 2025 Opening Ceremony",
      date: "Mar 22, 2025",
      location: "Narendra Modi Stadium",
      price: "₹1,200 onwards",
      attendees: "95.3k",
      image: "https://images.unsplash.com/photo-1621430669951-5e9e3b98ed8b?w=800&q=80",
      tag: "Sports",
    },
    {
      id: 7,
      title: "Navratri Garba Nights",
      date: "Sep 28 – Oct 6",
      location: "Multiple Venues",
      price: "₹399 onwards",
      attendees: "67.2k",
      image: "https://images.unsplash.com/photo-1603195453802-0b0381d62c43?w=800&q=80",
      tag: "Garba",
    },
    {
      id: 8,
      title: "Food & Wine Festival",
      date: "Nov 15–17",
      location: "JL Nehru Stadium, Delhi",
      price: "₹1,299",
      attendees: "28.9k",
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80",
      tag: "Food",
    },
    {
      id: 9,
      title: "Tech Conference 2025",
      date: "Feb 14–15",
      location: "Bangalore Palace",
      price: "₹3,999",
      attendees: "12.4k",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      tag: "Technology",
    },
    {
      id: 10,
      title: "Art Exhibition Opening",
      date: "Oct 30",
      location: "National Gallery of Modern Art",
      price: "₹299",
      attendees: "5.7k",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
      tag: "Art",
    },
    {
      id: 11,
      title: "Marathon 2025",
      date: "Jan 26",
      location: "Marine Drive, Mumbai",
      price: "₹899",
      attendees: "45.2k",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
      tag: "Sports",
    },
    {
      id: 12,
      title: "Jazz Music Festival",
      date: "Dec 5–7",
      location: "Shanti Bagh, Delhi",
      price: "₹1,799",
      attendees: "18.3k",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
      tag: "Music",
    },
  ],
  upcoming: [
    {
      id: 13,
      title: "New Year's Eve Party",
      date: "Dec 31",
      location: "Multiple Venues",
      price: "₹2,499 onwards",
      attendees: "34.7k",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      tag: "Party",
    },
    {
      id: 14,
      title: "Winter Music Festival",
      date: "Jan 10–12",
      location: "Snow Valley, Manali",
      price: "₹3,299",
      attendees: "22.1k",
      image: "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2016/12/78459379.jpg",
      tag: "Music",
    },
    {
      id: 15,
      title: "Startup Summit",
      date: "Feb 8–9",
      location: "Hitech City, Hyderabad",
      price: "₹1,999",
      attendees: "8.9k",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      tag: "Business",
    },
    {
      id: 16,
      title: "Holifest 2025",
      date: "Mar 14",
      location: "Multiple Cities",
      price: "Free",
      attendees: "120.5k",
      isFree: true,
      image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=800&q=80",
      tag: "Festival",
    },
    {
      id: 17,
      title: "Summer Beach Festival",
      date: "Apr 15–20",
      location: "Goa Beaches",
      price: "₹1,599",
      attendees: "56.3k",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      tag: "Music",
    },
    {
      id: 18,
      title: "Film Awards Night",
      date: "May 5",
      location: "JW Marriott, Mumbai",
      price: "₹5,999",
      attendees: "3.2k",
      image: "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2016/12/events-category-bg-dark.jpg?id=893",
      tag: "Awards",
    },
    {
      id: 19,
      title: "Monsoon Trekking",
      date: "Jun 20",
      location: "Western Ghats",
      price: "₹799",
      attendees: "7.8k",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      tag: "Adventure",
    },
    {
      id: 20,
      title: "Cultural Dance Festival",
      date: "Jul 12–14",
      location: "Ravindra Natya Mandir",
      price: "₹899",
      attendees: "14.6k",
      image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80",
      tag: "Dance",
    },
  ]
};

const ticketData = {
  1: [
    { type: "Early Bird", price: "₹2,999", available: 50, benefits: ["Entry to all stages", "Free water bottle"] },
    { type: "Regular", price: "₹3,999", available: 200, benefits: ["Entry to all stages", "Free merchandise"] },
    { type: "VIP", price: "₹7,999", available: 20, benefits: ["VIP lounge access", "Meet & greet", "Premium bar"] }
  ],
  2: [
    { type: "General Admission", price: "Free", available: 1000, benefits: ["Access to all market areas", "Free parking"] }
  ],
  3: [
    { type: "Standard", price: "₹599", available: 150, benefits: ["Guaranteed seating", "1 drink coupon"] },
    { type: "Premium", price: "₹999", available: 50, benefits: ["Front row seating", "2 drink coupons", "Meet comedians"] }
  ],
  5: [
    { type: "General Stands", price: "₹4,500", available: 5000, benefits: ["Stadium entry", "Official merchandise access"] },
    { type: "VIP Stands", price: "₹8,999", available: 500, benefits: ["Premium seating", "VIP lounge", "Complimentary food"] }
  ]
};

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="block">
      <div className="bg-gray-200 z-0 rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
        {/* Image */}
        <div className="relative h-48">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />

          {/* Tag */}
          <span className="absolute top-3 left-3 px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full shadow-sm">
            {event.tag}
          </span>

          {/* Heart */}
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition">
            <FaHeart className="w-4 h-4 text-gray-600" />
          </button>

          {/* Free Badge */}
          {event.isFree && (
            <span className="absolute bottom-3 left-3 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
              FREE
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 mb-3">
            {event.title}
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4 text-gray-500" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4 text-gray-500" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <p className={`font-bold text-lg ${event.isFree ? "text-green-600" : "text-gray-800"}`}>
              {event.price}
            </p>

            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <FaUsers className="w-4 h-4" />
              <span>{event.attendees}+ going</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const EventsShowcase = () => {
  const scrollRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    setSelectedEvent(event);
  };

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. POPULAR EVENTS with Scroll Bar */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-5xl font-bold text-gray-900 text-center w-full">
              POPULAR EVENTS
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={scrollLeft}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={scrollRight}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {eventsData.popular.map((event) => (
              <div key={event.id} className="min-w-[300px] flex-shrink-0">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>


        <h2 className="text-5xl font-bold text-gray-900 text-center mb-8 uppercase">
             EVENTS AND TICKETS
          </h2>

        {/* 2. EVENTS AND TICKETS Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            
          <div className="flex min-h-[500px]">
            
            {/* Events List */}
            <div className="w-1/3 border-r border-gray-200">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Events</h3>
              </div>
              <div className="overflow-y-auto max-h-[450px]">
                {eventsData.popular.slice(0, 8).map((event) => (
                  <button
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                      selectedEvent?.id === event.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCalendarAlt className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Details */}
            <div className="flex-1 p-6">
              {selectedEvent ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {selectedEvent.tag}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="w-4 h-4" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers className="w-4 h-4" />
                      <span>{selectedEvent.attendees}+ going</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Available Tickets</h4>
                    {(ticketData[selectedEvent.id] || []).map((ticket, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-semibold text-gray-900">{ticket.type}</h5>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{ticket.price}</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {ticket.available} available
                          </span>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {ticket.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                          <FaTicketAlt className="inline w-4 h-4 mr-2" />
                          Book Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <FaTicketAlt className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Select an event to view ticket details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

{/* 
                <div className="w-full h-full">
                                     <EventDetails/>

                </div> */}
        

        {/* 3. UPCOMING EVENTS Section */}
        <section>
          <h2 className="text-5xl font-bold text-gray-900 text-center mb-8 uppercase">
            UPCOMING EVENTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventsData.upcoming.slice(0, 8).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventsShowcase;