import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  Search,
  ChevronRight,
  X,
  Filter,
  Calendar,
  Clock,
  Users,
  Ticket,
  Music,
  Film,
  Camera,
  Utensils,
  Coffee,
  BookOpen,
  Globe,
} from "lucide-react";

// Events data
const eventsData = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    price: 65,
    location: "Central Park, NYC",
    date: "Jun 15, 2024",
    time: "2:00 PM - 10:00 PM",
    postedTime: "2 hours ago",
    category: "Music",
    organizer: "NYC Events Co.",
    organizerRating: 4.8,
    organizerReviews: 256,
    organizerJoined: "Jan 2020",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    description:
      "Join us for the biggest summer music festival in Central Park! Featuring top artists across multiple stages, food trucks, and art installations.",
    features: [
      "Multiple Music Stages",
      "Food & Drink Vendors",
      "Art Installations",
    ],
    ticketsAvailable: 150,
    ageRestriction: "All Ages",
    dressCode: "Casual",
  },
  {
    id: 2,
    title: "Food & Wine Tasting Gala",
    price: 120,
    location: "Metropolitan Museum, NYC",
    date: "Jul 22, 2024",
    time: "6:00 PM - 11:00 PM",
    postedTime: "5 hours ago",
    category: "Food & Drink",
    organizer: "Gourmet Events",
    organizerRating: 4.9,
    organizerReviews: 189,
    organizerJoined: "Mar 2019",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    description:
      "An exclusive evening of gourmet food and fine wine tasting featuring top chefs and sommeliers.",
    features: [
      "Gourmet Food Stations",
      "Wine & Cocktail Tasting",
      "Live Cooking Demos",
    ],
    ticketsAvailable: 80,
    ageRestriction: "21+",
    dressCode: "Smart Casual",
  },
  {
    id: 3,
    title: "Tech Startup Conference",
    price: 299,
    location: "Javits Center, NYC",
    date: "Aug 10-12, 2024",
    time: "9:00 AM - 6:00 PM",
    postedTime: "1 day ago",
    category: "Business",
    organizer: "TechForward Inc",
    organizerRating: 4.7,
    organizerReviews: 324,
    organizerJoined: "Aug 2018",
    image:
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&q=80",
    description:
      "Annual tech conference for startups and entrepreneurs. Network with investors and learn from industry leaders.",
    features: [
      "Keynote Speakers",
      "Investor Networking",
      "Startup Pitch Competition",
    ],
    ticketsAvailable: 500,
    ageRestriction: "18+",
    dressCode: "Business Casual",
  },
  {
    id: 4,
    title: "Yoga in the Park",
    price: 25,
    location: "Brooklyn Bridge Park",
    date: "Every Saturday",
    time: "8:00 AM - 9:30 AM",
    postedTime: "3 hours ago",
    category: "Health & Wellness",
    organizer: "Urban Yoga Collective",
    organizerRating: 4.6,
    organizerReviews: 167,
    organizerJoined: "May 2020",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    description:
      "Weekly outdoor yoga sessions with experienced instructors. All levels welcome. Mats provided.",
    features: [
      "All Levels Welcome",
      "Yoga Mats Provided",
      "Water & Snacks Included",
    ],
    ticketsAvailable: 20,
    ageRestriction: "16+",
    dressCode: "Athletic Wear",
  },
  {
    id: 5,
    title: "Indie Film Festival Opening Night",
    price: 45,
    location: "Film Forum, NYC",
    date: "Sep 5, 2024",
    time: "7:00 PM - 11:00 PM",
    postedTime: "6 hours ago",
    category: "Film",
    organizer: "NYC Film Society",
    organizerRating: 4.5,
    organizerReviews: 213,
    organizerJoined: "Feb 2019",
    image:
      "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=800&q=80",
    description:
      "Opening night of the annual indie film festival with red carpet, film screening, and after-party.",
    features: ["Red Carpet Access", "Film Screening", "Q&A with Directors"],
    ticketsAvailable: 120,
    ageRestriction: "18+",
    dressCode: "Cocktail Attire",
  },
  {
    id: 6,
    title: "Comedy Night Special",
    price: 35,
    location: "Comedy Cellar, NYC",
    date: "Jun 28, 2024",
    time: "8:00 PM - 10:00 PM",
    postedTime: "12 hours ago",
    category: "Comedy",
    organizer: "Laugh Factory",
    organizerRating: 4.4,
    organizerReviews: 145,
    organizerJoined: "Nov 2020",
    image:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&q=80",
    description:
      "Special comedy night featuring up-and-coming comedians and surprise special guests.",
    features: ["Featured Comedians", "Surprise Guests", "Two Drink Minimum"],
    ticketsAvailable: 60,
    ageRestriction: "21+",
    dressCode: "Casual",
  },
  {
    id: 7,
    title: "Art Gallery Opening",
    price: 50,
    location: "Chelsea Art District",
    date: "Jul 14, 2024",
    time: "6:00 PM - 9:00 PM",
    postedTime: "1 day ago",
    category: "Art",
    organizer: "Modern Art Collective",
    organizerRating: 4.8,
    organizerReviews: 278,
    organizerJoined: "Apr 2018",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
    description:
      "Opening night of contemporary art exhibition featuring emerging artists.",
    features: ["Meet the Artists", "Wine & Appetizers", "Live Music"],
    ticketsAvailable: 100,
    ageRestriction: "21+",
    dressCode: "Smart Casual",
  },
  {
    id: 8,
    title: "Jazz Night at Blue Note",
    price: 75,
    location: "Blue Note Jazz Club",
    date: "Aug 3, 2024",
    time: "7:30 PM - 11:00 PM",
    postedTime: "4 hours ago",
    category: "Music",
    organizer: "Blue Note NYC",
    organizerRating: 4.9,
    organizerReviews: 456,
    organizerJoined: "Jan 2010",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    description:
      "Evening of smooth jazz featuring Grammy-winning artists. Premium seating available.",
    features: [
      "Grammy-winning Artists",
      "Premium Seating",
      "Signature Cocktails",
    ],
    ticketsAvailable: 40,
    ageRestriction: "21+",
    dressCode: "Smart Casual",
  },
  {
    id: 9,
    title: "Marathon Training Workshop",
    price: 30,
    location: "Prospect Park, Brooklyn",
    date: "Jun 30, 2024",
    time: "7:00 AM - 10:00 AM",
    postedTime: "8 hours ago",
    category: "Sports",
    organizer: "NYC Runners Club",
    organizerRating: 4.7,
    organizerReviews: 189,
    organizerJoined: "Jun 2019",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd8facb5?w=800&q=80",
    description:
      "Comprehensive marathon training workshop for beginners and intermediate runners.",
    features: ["Expert Coaches", "Training Plan", "Nutrition Workshop"],
    ticketsAvailable: 50,
    ageRestriction: "18+",
    dressCode: "Running Gear",
  },
  {
    id: 10,
    title: "Cooking Masterclass: Italian Cuisine",
    price: 95,
    location: "Institute of Culinary Education",
    date: "Jul 18, 2024",
    time: "5:00 PM - 8:00 PM",
    postedTime: "2 days ago",
    category: "Food & Drink",
    organizer: "Master Chef Academy",
    organizerRating: 4.8,
    organizerReviews: 234,
    organizerJoined: "Sep 2018",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    description:
      "Hands-on cooking class focusing on authentic Italian dishes. Learn from award-winning chef.",
    features: [
      "Hands-on Cooking",
      "Professional Chef",
      "All Ingredients Provided",
    ],
    ticketsAvailable: 15,
    ageRestriction: "18+",
    dressCode: "Casual (Aprons Provided)",
  },
  {
    id: 11,
    title: "Broadway Behind the Scenes",
    price: 85,
    location: "Times Square Theater District",
    date: "Aug 25, 2024",
    time: "2:00 PM - 4:30 PM",
    postedTime: "10 hours ago",
    category: "Theater",
    organizer: "Broadway Tours",
    organizerRating: 4.6,
    organizerReviews: 178,
    organizerJoined: "Mar 2020",
    image:
      "https://images.unsplash.com/photo-1492684223066-e9e4aab4d25e?w=800&q=80",
    description:
      "Exclusive behind-the-scenes tour of Broadway theaters. Meet crew members and learn theater secrets.",
    features: [
      "Backstage Access",
      "Meet Crew Members",
      "Costume & Prop Viewing",
    ],
    ticketsAvailable: 25,
    ageRestriction: "12+",
    dressCode: "Casual",
  },
  {
    id: 12,
    title: "Silent Disco Yoga",
    price: 40,
    location: "Williamsburg Waterfront",
    date: "Jul 29, 2024",
    time: "6:00 PM - 8:00 PM",
    postedTime: "5 hours ago",
    category: "Health & Wellness",
    organizer: "Mindful Movement",
    organizerRating: 4.5,
    organizerReviews: 132,
    organizerJoined: "Oct 2020",
    image:
      "https://images.unsplash.com/photo-1598974357801-cbca100e5d10?w=800&q=80",
    description:
      "Unique yoga experience with silent disco headphones. Choose your music channel.",
    features: [
      "Silent Disco Headphones",
      "Multiple Music Channels",
      "Sunset Views",
    ],
    ticketsAvailable: 30,
    ageRestriction: "18+",
    dressCode: "Yoga Attire",
  },
];

// Event Card Component
const EventCard = ({ event, onClick }) => {
  const categoryIcons = {
    Music: <Music className="w-4 h-4" />,
    "Food & Drink": <Utensils className="w-4 h-4" />,
    Business: <Globe className="w-4 h-4" />,
    "Health & Wellness": <BookOpen className="w-4 h-4" />,
    Film: <Film className="w-4 h-4" />,
    Comedy: <Coffee className="w-4 h-4" />,
    Art: <Camera className="w-4 h-4" />,
    Sports: <Users className="w-4 h-4" />,
    Theater: <Ticket className="w-4 h-4" />,
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200"
    >
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full flex items-center">
          {categoryIcons[event.category] || <Ticket className="w-3 h-3 mr-1" />}
          <span className="ml-1">{event.category}</span>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{event.date}</span>
          <span className="mx-1">•</span>
          <Clock className="w-3 h-3 mr-1" />
          <span>{event.time}</span>
        </div>

        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[36px] leading-tight">
          {event.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ${event.price}
          </span>
          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
            <Users className="w-3 h-3 inline mr-1" />
            {event.ticketsAvailable} left
          </span>
        </div>

        <div className="flex items-center text-xs text-gray-600 mt-1">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        <div className="text-xs text-gray-400 mt-1">{event.postedTime}</div>
      </div>
    </div>
  );
};

// Main Events Listing Component
const EventsListing = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  // Get unique categories and dates
  const categories = [...new Set(eventsData.map((p) => p.category))];
  const dates = [...new Set(eventsData.map((p) => p.date))];

  const filteredEvents = eventsData.filter((event) => {
    // Search filter
    if (
      searchQuery &&
      !event.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Price filter
    if (priceMin && event.price < parseFloat(priceMin)) {
      return false;
    }
    if (priceMax && event.price > parseFloat(priceMax)) {
      return false;
    }

    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(event.category)
    ) {
      return false;
    }

    // Date filter
    if (selectedDates.length > 0 && !selectedDates.includes(event.date)) {
      return false;
    }

    return true;
  });

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleDateChange = (date) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">
              Home
            </a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">Events</span>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] transition-colors"
          >
            <Filter className="w-5 h-5" />
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside
            className={`
            ${isFilterOpen ? "block" : "hidden"} 
            lg:block lg:w-72 xl:w-80 flex-shrink-0
            bg-white rounded-lg shadow-sm p-4 sm:p-6 
            lg:sticky lg:top-24 h-fit
            max-h-[80vh] overflow-y-auto
          `}
          >
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6 hidden lg:block">
              Filters
            </h2>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27bb97] focus:border-transparent text-sm"
                />
                <span className="text-gray-500 text-sm">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27bb97] focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Event Categories
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-[#27bb97] border-gray-300 rounded focus:ring-[#27bb97]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Event Dates
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {dates.slice(0, 5).map((date) => (
                  <label key={date} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedDates.includes(date)}
                      onChange={() => handleDateChange(date)}
                      className="w-4 h-4 text-[#27bb97] border-gray-300 rounded focus:ring-[#27bb97]"
                    />
                    <span className="ml-2 text-sm text-gray-700">{date}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchQuery("");
                setPriceMin("");
                setPriceMax("");
                setSelectedCategories([]);
                setSelectedDates([]);
              }}
              className="w-full mt-6 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Header with Search and Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Events
              </h1>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:flex-initial sm:min-w-[250px] lg:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27bb97] focus:border-transparent"
                    />
                  </div>

                  {/* Sort */}
                  <div className="flex items-center gap-2 sm:flex-shrink-0">
                    <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap hidden xs:inline">
                      Sort by:
                    </span>
                    <select className="px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27bb97] focus:border-transparent w-full xs:w-auto min-w-[120px] sm:min-w-[180px]">
                      <option>Date: Soonest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Popularity</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Results Count */}
            <div className="text-sm text-gray-600 mb-4 lg:hidden">
              {filteredEvents.length} events found
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event.id)}
                />
              ))}
            </div>

            {/* Desktop Results Count */}
            <div className="mt-8 text-center text-gray-600 hidden lg:block">
              Showing {filteredEvents.length} of {eventsData.length} events
            </div>

            {/* No Results */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">No events found</div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPriceMin("");
                    setPriceMax("");
                    setSelectedCategories([]);
                    setSelectedDates([]);
                  }}
                  className="text-[#27bb97] hover:text-[#1fa987] font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EventsListing;
export { eventsData };
