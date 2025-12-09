import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';

// Your full JSON data
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

const EventsPopular = () => {
  const navigate = useNavigate();

  const allEvents = [...eventsData.popular, ...eventsData.upcoming];

  // Group events by time
  const todayEvents = allEvents.filter(event => isToday(parseISO(event.date)));
  const tomorrowEvents = allEvents.filter(event => isTomorrow(parseISO(event.date)));
  const thisWeekendEvents = allEvents.filter(event => {
    const eventDate = parseISO(event.date);
    return isThisWeek(eventDate, { weekStartsOn: 1 }) && !isToday(eventDate) && !isTomorrow(eventDate);
  });
  const upcomingEvents = allEvents.filter(event => {
    const eventDate = parseISO(event.date);
    return !isToday(eventDate) && !isTomorrow(eventDate) && !isThisWeek(eventDate, { weekStartsOn: 1 });
  });

  const EventCard = ({ event }) => {
    const handleCardClick = () => {
      navigate(`/events/${event.id}`);
    };

    const handleButtonClick = (e) => {
      e.stopPropagation();
      navigate(`/events/${event.id}`);
    };

    return (
      <div
        onClick={handleCardClick}
        className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
      >
        <div className="relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {event.isFree && (
            <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              FREE
            </span>
          )}
          {event.ticketsLeft < 50 && event.ticketsLeft > 0 && (
            <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Almost Sold Out
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>{format(parseISO(event.date), 'EEE, MMM d')}</span>
            <span>•</span>
            <span>{event.time}</span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-1">{event.location}</p>

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-xl font-bold text-gray-900">{event.displayPrice}</p>
              {event.attendees && (
                <p className="text-xs text-gray-500">{event.attendees} interested</p>
              )}
            </div>
            <button 
              onClick={handleButtonClick}
              className="bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 font-medium text-sm px-5 py-2 rounded-md transition"
            >
              More Info
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">#{event.tag}</span>
            {event.category && (
              <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                #{event.category}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const EventSection = ({ title, events, badgeColor }) => {
    if (events.length === 0) return null;

    return (
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className={`px-5 py-2 rounded-full text-white font-bold text-sm ${badgeColor}`}>
            {title}
          </span>
          <h2 className="text-2xl font-bold text-gray-800">
            {title === "Today" ? "Today's Events" : title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Just Listed Events
          </h1>
          <p className="text-lg text-pink-600">
            Explore events near you
          </p>
        </div>

        <EventSection title="Today" events={todayEvents} badgeColor="bg-blue-600" />
        <EventSection title="Tomorrow" events={tomorrowEvents} badgeColor="bg-green-600" />
        <EventSection title="This Weekend" events={thisWeekendEvents} badgeColor="bg-teal-600" />
        <EventSection title="Upcoming" events={upcomingEvents} badgeColor="bg-purple-600" />

        {allEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPopular;