import React from "react";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTicketAlt,
  FaUsers,
  FaLanguage,
  FaClock,
  FaStar,
} from "react-icons/fa";

// Sample Data
const popularEvents = [
  {
    id: 1,
    title: "Diwali Mela 2025 - Grand Celebration",
    date: "Nov 28 - Dec 1",
    location: "Santa Clara County Fairgrounds",
    price: "From $15",
    attendees: "5.2k+ going",
    image: "https://images.unsplash.com/photo-1603186940408-6d1a49c2e64f?w=1200&q=80",
    language: "Hindi • Gujarati",
  },
  {
    id: 2,
    title: "Atif Aslam Live in Concert",
    date: "Dec 14 • 7:00 PM",
    location: "SAP Center, San Jose",
    price: "From $75",
    attendees: "8.9k+ going",
    image: "https://images.unsplash.com/photo-1470229722913-7bfdb0e2517e?w=1200&q=80",
    language: "Hindi • Urdu",
  },
];

const upcomingEvents = [
  {
    id: 3,
    title: "Navratri Garba with Falguni Pathak",
    date: "Sat, Oct 25 • 7:30 PM",
    location: "San Jose Convention Center",
    price: "From $40",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421047e5f?w=1200&q=80",
    tags: ["Garba", "Live Music", "Falguni Pathak"],
  },
  {
    id: 4,
    title: "Holi Festival of Colors 2026",
    date: "Mar 15, 2026 • 11:00 AM",
    location: "Discovery Meadow, San Jose",
    price: "From $20",
    image: "https://images.unsplash.com/photo-1580130718649-c24e0636a8ef?w=1200&q=80",
    tags: ["Holi", "Free Entry", "Family Friendly"],
  },
];

const otherEvents = [
  { id: 5, title: "Free Yoga in the Park", date: "Every Sunday • 9 AM", price: "FREE", location: "Central Park", tags: ["Free", "Wellness"] },
  { id: 6, title: "Tamil New Year Celebration", date: "Apr 14 • 6 PM", price: "From $25", location: "Milpitas Community Center", tags: ["Tamil", "Cultural"] },
  { id: 7, title: "Bollywood Dance Workshop", date: "Nov 22 • 3 PM", price: "From $30", location: "Sunnyvale", tags: ["Dance", "Workshop"] },
  { id: 8, title: "Punjabi Food Festival", date: "Dec 7 • 12 PM", price: "Pay What You Want", location: "Fremont", tags: ["Food", "Punjabi"] },
];

// SECTION 1: Popular Events – Horizontal Scroll
const PopularEventCard = ({ event }) => (
  <div className="relative w-80 flex-shrink-0 mr-5 rounded-3xl overflow-hidden shadow-xl group cursor-pointer">
    <img src={event.image} alt={event.title} className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
    
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
      <div className="flex items-center gap-4 text-sm mb-3">
        <div className="flex items-center gap-2">
          <FaCalendarAlt /> <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt /> <span>{event.location}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">{event.price}</span>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
          <FaUsers className="text-yellow-400" />
          <span className="font-bold">{event.attendees}</span>
        </div>
      </div>
    </div>
    <div className="absolute top-5 right-5 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold">
      {event.language}
    </div>
  </div>
);

// SECTION 2: Upcoming Big Hero Cards
const UpcomingEventCard = ({ event }) => (
  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3">
    <div className="relative">
      <img src={event.image} alt={event.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <button className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition">
        <FaHeart className="w-6 h-6 text-red-500" />
      </button>
    </div>

    <div className="p-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h3>
      <div className="flex flex-wrap gap-3 mb-6">
        {event.tags.map((tag) => (
          <span key={tag} className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 text-gray-600 mb-2">
            <FaCalendarAlt className="text-purple-600" />
            <span className="font-medium">{event.date}</span>
          </div>
          <div className="text-4xl font-bold text-purple-700">{event.price}</div>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all">
          Book Now
        </button>
      </div>
    </div>
  </div>
);

// SECTION 3: All Other Events – Clean & Minimal Grid
const SimpleEventCard = ({ event }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer">
    <h4 className="font-bold text-lg mb-2 text-gray-900">{event.title}</h4>
    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <FaCalendarAlt className="text-purple-500" />
        <span>{event.date}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-pink-500" />
        <span>{event.location}</span>
      </div>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <span className={`font-bold text-lg ${event.price === "FREE" ? "text-green-600" : "text-purple-700"}`}>
        {event.price}
      </span>
      <div className="flex gap-2">
        {event.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// MAIN COMPONENT
export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">

      {/* Section 1: Popular Events */}
      <section>
        <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <FaStar className="text-yellow-500" /> Popular Right Now
        </h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex">
            {popularEvents.map((event) => (
              <PopularEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Upcoming Big Events */}
      <section>
        <h2 className="text-4xl font-bold text-gray-900 mb-10">Upcoming Big Events</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {upcomingEvents.map((event) => (
            <UpcomingEventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Section 3: All Other Events */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">More Events Near You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otherEvents.map((event) => (
            <SimpleEventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}