import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  CheckCircle,
  Search,
  Plus,
  Minus,
  ChevronDown,
  Phone,
  MessageCircle,
  Home,
  Bath,
  Maximize2,
  User,
  Images,
  Tag,
  Menu,
  X,
} from "lucide-react";
import {
  FaMapMarkerAlt,
  FaMap,
  FaMusic,
  FaFutbol,
  FaUtensils,
  FaFilm,
  FaUsers as FaConference,
  FaHeartbeat,
  FaGlassCheers,
  FaTicketAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import EventsSubNav from '../../components/Events/EventsSubNav';
import Footer from "../../pages/Home/Footer.jsx";

// Events Data (using your EventsShowcase data)
const allEvents = [
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
    ],
    title: "Sunburn Goa 2025",
    description: "Asia's biggest electronic dance music festival featuring top international DJs",
    date: "2024-12-27",
    displayDate: "Dec 27–30",
    location: "Vagator Beach, Goa",
    venue: "Vagator Beach",
    price: 2999,
    displayPrice: "₹2,999 onwards",
    attendees: "15.8k",
    category: "Music Festival",
    tag: "Music Festival",
    time: "18:00",
    duration: "4 Days",
    rating: 4.8,
    reviews: 1245,
    ticketsLeft: 45,
    artist: "Various Artists",
    organizer: "Sunburn Events",
    ageLimit: "18+",
    verified: true,
    featured: true,
    views: 12500,
    saves: 3200,
    responseRate: "98%",
    responseTime: "< 1h",
    contact: "+91 98765 43210",
    availableForCall: true,
    amenities: [
      "Multiple Stages",
      "Food Courts",
      "Bar Services",
      "VIP Lounge",
      "Parking",
      "Security",
      "Medical Facilities",
      "Chill Zones"
    ],
    details: "Sunburn Goa is Asia's premier electronic dance music festival. Experience 4 days of non-stop music across multiple stages with world-class production, lighting, and sound systems. Featuring top international DJs and artists from around the globe.",
    tags: ["EDM", "Festival", "Electronic Music", "Beach Party", "Nightlife"],
    immediate: true,
    discount: "Early Bird",
    distance: "5 km from Airport",
    busStopDistance: "1 km from Bus Stop",
    photos: 15,
  },
  {
    id: 2,
    images: [
      "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2017/03/Holi-Festival.png",
      "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=800&q=80",
    ],
    title: "Rangoli Night Market",
    description: "Traditional Indian festival market with food, shopping, and cultural performances",
    date: "2024-11-02",
    displayDate: "Nov 2",
    location: "DLF CyberHub, Gurgaon",
    venue: "DLF CyberHub",
    price: 0,
    displayPrice: "Free Entry",
    attendees: "9.2k",
    category: "Festival",
    tag: "Festival",
    time: "17:00",
    duration: "6 Hours",
    rating: 4.3,
    reviews: 856,
    ticketsLeft: 1000,
    artist: "Local Vendors",
    organizer: "DLF Events",
    ageLimit: "All Ages",
    verified: true,
    featured: false,
    views: 8900,
    saves: 1200,
    responseRate: "95%",
    responseTime: "< 2h",
    contact: "+91 98765 43211",
    availableForCall: true,
    amenities: [
      "Food Stalls",
      "Shopping",
      "Cultural Performances",
      "Kids Zone",
      "Parking",
      "Free Entry"
    ],
    details: "Experience the vibrant colors and flavors of India at Rangoli Night Market. Featuring traditional food stalls, handicraft vendors, cultural performances, and interactive workshops. Perfect for families and culture enthusiasts.",
    tags: ["Cultural", "Food", "Shopping", "Family Friendly", "Traditional"],
    immediate: true,
    discount: "Free Entry",
    distance: "2 km from Metro",
    busStopDistance: "500 m from Bus Stop",
    photos: 8,
  },
  {
    id: 3,
    images: [
      "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2017/03/ticketbox-unlike-dummy-1110x600.jpg",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
    ],
    title: "Stand-up Comedy Night",
    description: "Laugh out loud with India's top comedians in an intimate setting",
    date: "2024-10-25",
    displayDate: "Oct 25",
    location: "The Comedy Club, Mumbai",
    venue: "The Comedy Club",
    price: 599,
    displayPrice: "₹599",
    attendees: "1.8k",
    category: "Comedy",
    tag: "Comedy",
    time: "20:00",
    duration: "3 Hours",
    rating: 4.6,
    reviews: 432,
    ticketsLeft: 150,
    artist: "Comedy Collective",
    organizer: "The Comedy Club",
    ageLimit: "16+",
    verified: true,
    featured: true,
    views: 6500,
    saves: 850,
    responseRate: "90%",
    responseTime: "< 3h",
    contact: "+91 98765 43212",
    availableForCall: false,
    amenities: [
      "Intimate Setting",
      "Food & Drinks",
      "Open Mic",
      "Parking",
      "AC Hall"
    ],
    details: "An evening of laughter with India's finest comedians. Featuring both established names and rising stars. Perfect for date nights, friend gatherings, or corporate outings. Limited seats available for an intimate experience.",
    tags: ["Comedy", "Entertainment", "Night Out", "Social"],
    immediate: true,
    discount: "Group Discount",
    distance: "1 km from Station",
    busStopDistance: "200 m from Bus Stop",
    photos: 6,
  },
  {
    id: 4,
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    ],
    title: "Yoga by the Beach",
    description: "Morning yoga sessions with sunrise view at Juhu Beach",
    date: "2024-12-01",
    displayDate: "Every Sunday",
    location: "Juhu Beach, Mumbai",
    venue: "Juhu Beach",
    price: 0,
    displayPrice: "Free",
    attendees: "3.1k",
    category: "Wellness",
    tag: "Wellness",
    time: "06:00",
    duration: "2 Hours",
    rating: 4.7,
    reviews: 678,
    ticketsLeft: 200,
    artist: "Yoga Masters",
    organizer: "Beach Wellness",
    ageLimit: "All Ages",
    verified: true,
    featured: false,
    views: 5400,
    saves: 950,
    responseRate: "85%",
    responseTime: "< 4h",
    contact: "+91 98765 43213",
    availableForCall: true,
    amenities: [
      "Beach Front",
      "Yoga Mats",
      "Meditation",
      "Sunrise View",
      "Free Session"
    ],
    details: "Start your Sunday with rejuvenating yoga by the sea. Professional instructors guide you through asanas, pranayama, and meditation. All levels welcome. Experience peace and tranquility with the sound of waves.",
    tags: ["Yoga", "Wellness", "Beach", "Meditation", "Free"],
    immediate: false,
    discount: "Free Session",
    distance: "On the Beach",
    busStopDistance: "300 m from Bus Stop",
    photos: 5,
  },
  {
    id: 5,
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    ],
    title: "Coldplay India Tour 2025",
    description: "Coldplay's highly anticipated concert in Mumbai",
    date: "2025-01-18",
    displayDate: "Jan 18–19",
    location: "DY Patil Stadium, Mumbai",
    venue: "DY Patil Stadium",
    price: 4500,
    displayPrice: "₹4,500 onwards",
    attendees: "82.5k",
    category: "Concert",
    tag: "Concert",
    time: "19:00",
    duration: "3 Hours",
    rating: 4.9,
    reviews: 3567,
    ticketsLeft: 12,
    artist: "Coldplay",
    organizer: "Live Nation",
    ageLimit: "12+",
    verified: true,
    featured: true,
    views: 45000,
    saves: 12500,
    responseRate: "99%",
    responseTime: "< 30m",
    contact: "+91 98765 43214",
    availableForCall: true,
    amenities: [
      "World-class Production",
      "Multiple Screens",
      "Food Courts",
      "Merchandise",
      "Parking",
      "Security"
    ],
    details: "Witness Coldplay's spectacular live performance featuring hits from their entire career. The concert includes stunning visual effects, pyrotechnics, and audience interaction. Don't miss this once-in-a-lifetime experience.",
    tags: ["Coldplay", "Concert", "International", "Music", "Live"],
    immediate: true,
    discount: "VIP Packages",
    distance: "15 km from City",
    busStopDistance: "1 km from Bus Stop",
    photos: 20,
  },
  {
    id: 6,
    images: [
      "https://images.unsplash.com/photo-1621430669951-5e9e3b98ed8b?w=800&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    ],
    title: "IPL 2025 Opening Ceremony",
    description: "Grand opening ceremony for Indian Premier League 2025 season",
    date: "2025-03-22",
    displayDate: "Mar 22, 2025",
    location: "Narendra Modi Stadium, Ahmedabad",
    venue: "Narendra Modi Stadium",
    price: 1200,
    displayPrice: "₹1,200 onwards",
    attendees: "95.3k",
    category: "Sports",
    tag: "Sports",
    time: "19:30",
    duration: "4 Hours",
    rating: 4.8,
    reviews: 2890,
    ticketsLeft: 89,
    artist: "Various Performers",
    organizer: "BCCI",
    ageLimit: "All Ages",
    verified: true,
    featured: true,
    views: 38000,
    saves: 9800,
    responseRate: "97%",
    responseTime: "< 1h",
    contact: "+91 98765 43215",
    availableForCall: true,
    amenities: [
      "Celebrity Performances",
      "Fireworks",
      "Food Stalls",
      "Stadium Seating",
      "Security",
      "Parking"
    ],
    details: "Witness the spectacular opening ceremony of IPL 2025 featuring Bollywood stars, international artists, and breathtaking fireworks. The ceremony sets the stage for another exciting season of cricket.",
    tags: ["IPL", "Cricket", "Sports", "Ceremony", "Entertainment"],
    immediate: false,
    discount: "Season Pass",
    distance: "10 km from Airport",
    busStopDistance: "500 m from Bus Stop",
    photos: 12,
  },
  {
    id: 7,
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    ],
    title: "New Year's Eve Party",
    description: "Celebrate New Year 2025 with the biggest party in town",
    date: "2024-12-31",
    displayDate: "Dec 31",
    location: "Multiple Venues, Delhi",
    venue: "Various Locations",
    price: 2499,
    displayPrice: "₹2,499 onwards",
    attendees: "34.7k",
    category: "Party",
    tag: "Party",
    time: "21:00",
    duration: "8 Hours",
    rating: 4.5,
    reviews: 1567,
    ticketsLeft: 156,
    artist: "Top DJs",
    organizer: "Nightlife Events",
    ageLimit: "21+",
    verified: true,
    featured: true,
    views: 28000,
    saves: 6500,
    responseRate: "96%",
    responseTime: "< 2h",
    contact: "+91 98765 43216",
    availableForCall: true,
    amenities: [
      "Multiple DJs",
      "Open Bar",
      "Dance Floor",
      "Photo Booth",
      "VIP Sections",
      "Security"
    ],
    details: "Ring in the New Year with the most extravagant party featuring top DJs, unlimited drinks, and amazing company. Multiple venues across the city with shuttle services available.",
    tags: ["New Year", "Party", "DJ", "Celebration", "Nightlife"],
    immediate: true,
    discount: "Couple Offer",
    distance: "Various Locations",
    busStopDistance: "Near Metro Stations",
    photos: 10,
  },
  {
    id: 8,
    images: [
      "https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2016/12/78459379.jpg",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    ],
    title: "Winter Music Festival",
    description: "Music festival in the snowy mountains of Manali",
    date: "2025-01-10",
    displayDate: "Jan 10–12",
    location: "Snow Valley, Manali",
    venue: "Snow Valley",
    price: 3299,
    displayPrice: "₹3,299",
    attendees: "22.1k",
    category: "Music",
    tag: "Music",
    time: "16:00",
    duration: "3 Days",
    rating: 4.4,
    reviews: 1234,
    ticketsLeft: 78,
    artist: "Indie Artists",
    organizer: "Mountain Events",
    ageLimit: "18+",
    verified: true,
    featured: false,
    views: 19500,
    saves: 4200,
    responseRate: "88%",
    responseTime: "< 3h",
    contact: "+91 98765 43217",
    availableForCall: false,
    amenities: [
      "Mountain Setting",
      "Camping",
      "Bonfire",
      "Food Stalls",
      "Adventure Activities"
    ],
    details: "Experience music like never before in the snow-clad mountains of Manali. Featuring indie artists, acoustic sessions, bonfire nights, and adventure activities. Package includes accommodation and meals.",
    tags: ["Mountain", "Indie", "Camping", "Adventure", "Music"],
    immediate: true,
    discount: "Early Bird",
    distance: "50 km from Airport",
    busStopDistance: "2 km from Bus Stop",
    photos: 14,
  },
];

// Options data for filters
const searchTypes = [
  "All Events",
  "Music Events",
  "Sports Events",
  "Cultural Events",
  "Workshops",
  "Conferences",
];

const locationTypes = ["By City", "By Metro", "By Venue", "By Neighborhood"];

const radiusOptions = [
  "5 km",
  "10 km",
  "25 km",
  "50 km",
  "100 km",
  "Anywhere",
];

const budgetOptions = [
  "Any Budget",
  "Free Events",
  "Under ₹500",
  "₹500 - ₹1,000",
  "₹1,000 - ₹2,000",
  "₹2,000 - ₹5,000",
  "Over ₹5,000",
];

const eventTypes = [
  "Music Festival",
  "Concert",
  "Sports",
  "Comedy",
  "Workshop",
  "Conference",
  "Exhibition",
  "Party",
];

const eventCategories = [
  { id: 'all', name: 'All Events', icon: FaCalendarAlt },
  { id: 'music', name: 'Music', icon: FaMusic },
  { id: 'sports', name: 'Sports', icon: FaFutbol },
  { id: 'food', name: 'Food & Drink', icon: FaUtensils },
  { id: 'entertainment', name: 'Entertainment', icon: FaFilm },
  { id: 'conference', name: 'Conference', icon: FaConference },
  { id: 'wellness', name: 'Wellness', icon: FaHeartbeat },
  { id: 'festival', name: 'Festival', icon: FaGlassCheers }
];

const itemsPerPageOptions = [4, 8, 12, 16];

const EventList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // State for search filters
  const [searchType, setSearchType] = useState("All Events");
  const [locationType, setLocationType] = useState("By City");
  const [eventLocation, setEventLocation] = useState("Mumbai");
  const [radius, setRadius] = useState("25 km");
  const [budget, setBudget] = useState("Any Budget");
  const [eventType, setEventType] = useState("All Events");
  const [mainTab, setMainTab] = useState("upcoming");
  const [dropdownTab, setDropdownTab] = useState("music");
  const [sortBy, setSortBy] = useState("featured");
  const [showMoreAmenities, setShowMoreAmenities] = useState({});
  const [likedEvents, setLikedEvents] = useState({});
  const [showContact, setShowContact] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showPlusDropdown, setShowPlusDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Toggle more amenities view
  const toggleAmenities = (eventId) => {
    setShowMoreAmenities((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  // Toggle like event
  const toggleLike = (eventId) => {
    setLikedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  // Toggle contact visibility
  const toggleContact = (eventId) => {
    setShowContact((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  // Navigate images
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

  // Search functions
  const handleSearch = () => {
    console.log("Searching events with filters:", {
      searchType,
      locationType,
      eventLocation,
      radius,
      budget,
      eventType,
      searchTerm,
    });
    setCurrentPage(1);
  };

  const handleSaveSearch = () => {
    console.log("Saving search criteria");
    alert("Search criteria saved!");
  };

  // Share event
  const handleShare = (event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    }
  };

  // Handle call
  const handleCall = (event) => {
    if (event.availableForCall && event.contact) {
      window.location.href = `tel:${event.contact}`;
    }
  };

  // Handle message
  const handleMessage = (event) => {
    alert(
      `Opening chat with ${event.organizer}. This would redirect to your messaging system.`
    );
  };

  // Pagination functions
  const totalPages = Math.ceil(allEvents.length / itemsPerPage);

  const getCurrentEvents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allEvents.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const eventsSection = document.querySelector(".events-section");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = isMobile ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pageNumbers.push(1);

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Event amenities icons mapping
  const amenityIcons = {
    "Multiple Stages": <FaMusic size={14} />,
    "Food Courts": <FaUtensils size={14} />,
    "Bar Services": <FaGlassCheers size={14} />,
    "VIP Lounge": <Star size={14} />,
    "Parking": <FaMapMarkerAlt size={14} />,
    "Security": <CheckCircle size={14} />,
    "Medical Facilities": <FaHeartbeat size={14} />,
    "Chill Zones": <Home size={14} />,
    "Food Stalls": <FaUtensils size={14} />,
    "Shopping": <Tag size={14} />,
    "Cultural Performances": <FaMusic size={14} />,
    "Kids Zone": <Users size={14} />,
    "Free Entry": <Tag size={14} />,
    "Intimate Setting": <Users size={14} />,
    "Open Mic": <FaMusic size={14} />,
    "AC Hall": <Home size={14} />,
    "Beach Front": <MapPin size={14} />,
    "Yoga Mats": <FaHeartbeat size={14} />,
    "Meditation": <FaHeartbeat size={14} />,
    "Sunrise View": <Eye size={14} />,
    "Free Session": <Tag size={14} />,
    "World-class Production": <FaMusic size={14} />,
    "Multiple Screens": <Images size={14} />,
    "Merchandise": <Tag size={14} />,
    "Celebrity Performances": <Star size={14} />,
    "Fireworks": <Eye size={14} />,
    "Stadium Seating": <Users size={14} />,
    "Multiple DJs": <FaMusic size={14} />,
    "Open Bar": <FaGlassCheers size={14} />,
    "Dance Floor": <FaMusic size={14} />,
    "Photo Booth": <Images size={14} />,
    "VIP Sections": <Star size={14} />,
    "Mountain Setting": <MapPin size={14} />,
    "Camping": <Home size={14} />,
    "Bonfire": <Eye size={14} />,
    "Adventure Activities": <FaFutbol size={14} />,
  };

  // Badge Component
  const Badge = ({ children, type = "default" }) => {
    const styles = {
      verified: "bg-green-100 text-green-800 border-green-200",
      featured: "bg-[#27bb97]/10 text-[#27bb97] border-[#27bb97]/20",
      discount: "bg-orange-100 text-orange-800 border-orange-200",
      free: "bg-green-100 text-green-800 border-green-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[type]}`}
      >
        {type === "verified" && <CheckCircle size={12} />}
        {type === "featured" && <Star size={12} />}
        {children}
      </span>
    );
  };

  // Rating Stars Component
  const RatingStars = ({ rating, reviews }) => (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      <span className="text-xs sm:text-sm text-gray-600">({reviews})</span>
    </div>
  );

  // Enhanced Event Card Component with Improved Image Gallery
  const EventCard = ({ event }) => {
    const currentIndex = currentImageIndex[event.id] || 0;
    const totalImages = event.images.length;

    // Handle card click to navigate to Event Details Page
    const handleCardClick = () => {
      navigate(`/events/${event.id}`, { state: { event } });
    };

    // Handle title click (stop propagation to prevent double navigation)
    const handleTitleClick = (e) => {
      e.stopPropagation();
      navigate(`/events/${event.id}`, { state: { event } });
    };

    return (
      <div
        className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer w-full "
        onClick={handleCardClick}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Enhanced Image Gallery Section */}
          <div className="lg:w-2/5 h-48 sm:h-56 lg:h-auto relative">
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={event.images[currentIndex]}
                alt={`${event.title} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />

              {/* Image Navigation Arrows */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(event.id, totalImages);
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-200"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(event.id, totalImages);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-200"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {totalImages > 1 && (
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {currentIndex + 1} / {totalImages}
                </div>
              )}

              {/* Image Thumbnails Preview (only on larger screens) */}
              {totalImages > 1 && !isMobile && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex gap-1 justify-center">
                    {event.images.slice(0, 4).map((img, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => ({
                            ...prev,
                            [event.id]: index,
                          }));
                        }}
                        className={`w-8 h-8 rounded border-2 ${
                          index === currentIndex
                            ? "border-white"
                            : "border-transparent"
                        } overflow-hidden`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    {totalImages > 4 && (
                      <div className="w-8 h-8 bg-black/70 text-white text-xs flex items-center justify-center rounded border-2 border-transparent">
                        +{totalImages - 4}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Top Left Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {event.verified && <Badge type="verified">Verified</Badge>}
              {event.featured && <Badge type="featured">Featured</Badge>}
              {event.price === 0 && <Badge type="free">Free</Badge>}
              {event.discount && (
                <Badge type="discount">{event.discount}</Badge>
              )}
            </div>

            {/* Like and Share Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(event.id);
                }}
                className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
                  likedEvents[event.id]
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart
                  size={18}
                  fill={likedEvents[event.id] ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(event);
                }}
                className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Enhanced Distance Information - Separated and Clear */}
            <div className="absolute bottom-12 left-3 right-3">
              <div className="flex flex-col gap-1">
                {/* Transport Distances */}
                <div className="flex flex-wrap gap-2">
                  {event.distance && (
                    <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                      🚗 {event.distance}
                    </div>
                  )}
                  {event.busStopDistance && (
                    <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                      🚌 {event.busStopDistance}
                    </div>
                  )}
                </div>

                {/* Views and Saves */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center -mb-12 gap-1  px-2 py-1 rounded text-xs text-white">
                    <Eye size={12} />
                    <span>{event.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-3/5 p-4 sm:p-5 flex flex-col justify-between">
            {/* Header with Price and Badges */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
                <div className="flex-1 pr-4">
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-tight hover:text-[#27bb97] transition-colors cursor-pointer"
                    onClick={handleTitleClick}
                  >
                    {isMobile && event.title.length > 50
                      ? `${event.title.slice(0, 50)}...`
                      : isTablet && event.title.length > 70
                      ? `${event.title.slice(0, 70)}...`
                      : event.title}
                  </h3>

                  {/* Location and Quick Info */}
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{event.organizer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{event.displayDate}</span>
                    </div>
                  </div>

                  {/* Rating and Response Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <RatingStars
                      rating={event.rating}
                      reviews={event.reviews}
                    />
                    <div className="text-xs sm:text-sm text-gray-600">
                      ⚡ {event.responseRate} response •{" "}
                      {event.responseTime}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
                      <Calendar size={16} />
                      <span className="truncate">{event.displayDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
                      <Users size={16} />
                      <span>{event.attendees}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
                      <span className="text-gray-600">👥</span>
                      <span>{event.ageLimit}</span>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-[#27bb97] mb-1">
                    {event.price === 0 ? "FREE" : `₹${event.price.toLocaleString()}`}
                    {event.price > 0 && <span className="text-xs sm:text-sm font-normal text-gray-600">/person</span>}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {event.ticketsLeft} tickets left
                  </div>
                </div>
              </div>

              {/* Event Details in Compact Grid */}
              <div className="grid grid-cols-3 gap-2 text-xs mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Category</div>
                  <div className="text-gray-600 truncate">{event.category}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Duration</div>
                  <div className="text-gray-600">{event.duration}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Saves</div>
                  <div className="text-gray-600">{event.saves}</div>
                </div>
              </div>

              {/* Premium Amenities with Icons */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Event Features
                </h4>
                <div className="flex flex-wrap gap-1">
                  {event.amenities.slice(0, isMobile ? 4 : 6).map((amenity, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 text-xs text-[#27bb97] px-2 py-1.5 rounded-lg border-[#27bb97]/20 hover:bg-[#27bb97]/10 transition-colors"
                    >
                      {amenityIcons[amenity] || <FaMusic size={14} />}
                      <span className="truncate max-w-[120px]">{amenity}</span>
                    </span>
                  ))}
                  {event.amenities.length > (isMobile ? 4 : 6) && (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAmenities(event.id);
                        }}
                        className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
                      >
                        +{event.amenities.length - (isMobile ? 4 : 6)} more
                      </button>

                      {showMoreAmenities[event.id] && (
                        <div className="absolute top-full left-0 mt-2 z-20 bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-[250px] max-w-[90vw]">
                          <div className="text-sm font-semibold text-gray-900 mb-3">
                            All Features
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                            {event.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="flex items-center gap-1.5 text-xs bg-gray-50 text-gray-700 px-2 py-1.5 rounded border border-gray-200"
                              >
                                {amenityIcons[amenity] || <FaMusic size={12} />}
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description Line */}
              <div className="text-sm text-gray-600 mb-4 leading-relaxed">
                <p className="line-clamp-2">{event.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {event.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {event.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                    +{event.tags.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Enhanced Action Section with Smart Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
              {/* Contact Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {showContact[event.id] ? (
                  <div className="flex items-center gap-1">
                    <Phone size={14} />
                    <span className="font-medium text-xs sm:text-sm">{event.contact}</span>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleContact(event.id);
                    }}
                    className="text-[#27bb97] hover:text-[#1fa582] hover:underline transition-colors text-xs sm:text-sm"
                  >
                    Show Contact
                  </button>
                )}
              </div>

              {/* Action Buttons - Call, Message, Save */}
              <div className="flex gap-2">
                {/* Call Button - Conditionally Disabled */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(event);
                  }}
                  disabled={!event.availableForCall}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                    event.availableForCall
                      ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:shadow-sm"
                      : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  }`}
                  title={
                    event.availableForCall
                      ? "Call now"
                      : "Organizer unavailable for calls"
                  }
                >
                  <Phone size={16} />
                  <span className="hidden xs:inline">Call</span>
                </button>

                {/* Message Button - Always Active */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessage(event);
                  }}
                  className="flex items-center gap-2 bg-[#27bb97] hover:bg-[#1fa582] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <MessageCircle size={16} />
                  <span className="hidden xs:inline">Message</span>
                </button>

                {/* Book Now Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/event/${event.id}`, { state: { event } });
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                    likedEvents[event.id]
                      ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
                      : "bg-[#27bb97] hover:bg-[#1fa582] text-white border-[#27bb97]"
                  } hover:shadow-sm`}
                >
                  <FaTicketAlt size={16} />
                  <span className="hidden xs:inline">Book Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <EventsSubNav />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm pt-4 px-3 sm:px-4 lg:px-6 mt-2 ml-2">
        <span className="font-semibold text-gray-900 truncate">
          Indian Events
        </span>
        <span className="text-gray-400">→</span>
        <span className="text-gray-500 truncate">
          {searchType} in {eventLocation}
        </span>
      </div>

      {/* Mobile Filter Button */}
      {isMobile && (
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="flex items-center gap-2 text-gray-700"
            >
              <Menu size={20} />
              <span className="text-sm font-medium">Filters & Tabs</span>
            </button>
            <div className="text-sm text-gray-600">
              {allEvents.length} Events
            </div>
          </div>
        </div>
      )}

      {/* Events Section */}
      <div className="min-h-screen p-3 sm:p-4 lg:p-6 mt-4">
        <div className="max-w-7xl mx-auto">
          {/* Tabs - Hidden on mobile when menu is collapsed */}
          <div className={`${isMobile && !showMobileMenu ? 'hidden' : 'block'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-[85%] border-gray-200 gap-4 mb-6">
              <div className="flex overflow-x-auto gap-4 lg:gap-8 pb-2 scrollbar-hide">
                <button
                  onClick={() => setMainTab("upcoming")}
                  className={`pb-2 px-2 font-medium transition-colors whitespace-nowrap ${
                    mainTab === "upcoming"
                      ? "text-gray-900 border-t-4 border-[#27bb97] rounded-t-lg bg-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setMainTab("today")}
                  className={`pb-2 px-2 font-medium transition-colors whitespace-nowrap ${
                    mainTab === "today"
                      ? "text-gray-900 border-t-4 border-[#27bb97] rounded-t-lg bg-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Today's Events
                </button>
                <button
                  onClick={() => setMainTab("weekend")}
                  className={`pb-2 px-2 font-medium transition-colors whitespace-nowrap ${
                    mainTab === "weekend"
                      ? "text-gray-900 border-t-4 border-[#27bb97] rounded-t-lg bg-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  This Weekend
                </button>
                <button
                  onClick={() => setMainTab("free")}
                  className={`pb-2 px-2 font-medium transition-colors whitespace-nowrap ${
                    mainTab === "free"
                      ? "text-gray-900 border-t-4 border-[#27bb97] rounded-t-lg bg-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Free Events
                </button>
              </div>
              <div className="lg:-mt-2 ml-auto lg:ml-0">
                <button className="flex items-center gap-2 bg-[#27bb97] hover:bg-[#1fa582] text-white px-4 py-2 rounded text-sm font-medium transition-colors justify-center w-full lg:w-auto">
                  <FaMap />
                  <span className="hidden sm:inline">Switch to Calendar View</span>
                  <span className="sm:hidden">Calendar View</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - 100% on mobile/tablet, 70% on desktop */}
            <div className="w-full lg:w-[70%]">
              {/* White background section for header */}
              <div className="bg-white p-4 rounded-lg">
                {/* Header with Sort */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-1">
                      Events in {eventLocation}
                    </h1>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {allEvents.length} Events available in your city
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-gray-600">Sort by</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-700 focus:outline-none custom-select w-full sm:w-auto"
                      >
                        <option value="featured">Featured first</option>
                        <option value="date">Date</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="popularity">Most Popular</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] bg-gray-400 w-full my-4" />
                {/* Nearby Locations */}
                <div className="">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                    Popular event locations in {eventLocation}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Concert Halls",
                      "Stadiums",
                      "Beaches",
                      "Parks",
                      "Auditoriums",
                      "Clubs",
                    ].map((location) => (
                      <button
                        key={location}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded-full transition-colors hover:bg-gray-200 text-xs sm:text-sm"
                      >
                        <FaMapMarkerAlt className="text-gray-500 text-xs" />
                        <span className="text-gray-700 hover:text-[#27bb97] cursor-pointer truncate">
                          {location}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Event Cards Grid */}
              <div className="events-section grid grid-cols-1 gap-4 sm:gap-6 cursor-pointer mt-6">
                {getCurrentEvents().map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 sm:mt-8 bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Items per page selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs sm:text-sm text-gray-600">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(e.target.value)}
                      className="border border-gray-300 rounded px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#27bb97] focus:border-[#27bb97] w-32"
                    >
                      {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option} per page
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Page info */}
                  <div className="text-xs sm:text-sm text-gray-600 text-center">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, allEvents.length)}{" "}
                    of {allEvents.length} events
                  </div>

                  {/* Pagination controls */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                          {page === "..." ? (
                            <span className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-500">...</span>
                          ) : (
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors min-w-[2rem] sm:min-w-[2.5rem] ${
                                currentPage === page
                                  ? "bg-[#27bb97] text-white shadow-sm"
                                  : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                              }`}
                            >
                              {page}
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Hidden on mobile/tablet, 30% on desktop */}
            <div className={`${isMobile ? 'hidden' : isTablet ? 'hidden' : 'w-full lg:w-[30%] space-y-6'}`}>
              {/* Categories near Location */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Event Categories in {eventLocation}
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Music Concerts in Mumbai",
                    "Sports Events in Mumbai",
                    "Food Festivals in Mumbai",
                    "Art Exhibitions in Mumbai",
                    "Workshops in Mumbai",
                  ].map((category) => (
                    <a
                      key={category}
                      href="#"
                      className="text-[#27bb97] hover:text-[#1fa582] hover:underline text-sm transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>

              {/* Popular Venues */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Popular Venues
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Events at Jio World Garden",
                    "Events at NSCI Dome",
                    "Events at Bandra Kurla Complex",
                    "Events at Phoenix Marketcity",
                    "Events at Powai Lake",
                  ].map((venue) => (
                    <a
                      key={venue}
                      href="#"
                      className="text-[#27bb97] hover:text-[#1fa582] hover:underline text-sm transition-colors"
                    >
                      {venue}
                    </a>
                  ))}
                </div>
              </div>

              {/* Upcoming Festivals */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Upcoming Festivals
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-2"></div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { name: "Diwali Celebrations", date: "Nov 2024" },
                    { name: "Christmas Markets", date: "Dec 2024" },
                    { name: "New Year Parties", date: "Dec 2024" },
                    { name: "Holi Festivals", date: "Mar 2025" },
                    { name: "Ganesh Chaturthi", date: "Sep 2025" },
                  ].map((festival) => (
                    <a
                      key={festival.name}
                      href="#"
                      className="text-[#27bb97] hover:text-[#1fa582] hover:underline text-sm transition-colors"
                    >
                      {festival.name} <span className="text-gray-500">({festival.date})</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Top Organizers */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Top Event Organizers
                </h2>
                <div className="h-[1px] bg-gray-300 w-full mb-4"></div>
                <div className="flex flex-col gap-6">
                  {[
                    {
                      name: "BookMyShow",
                      events: "1250+ events",
                      rating: "4.8",
                      initialBg: "bg-[#27bb97]/20",
                      initial: "B",
                    },
                    {
                      name: "Insider.in",
                      events: "980+ events",
                      rating: "4.7",
                      initialBg: "bg-[#1fa582]/20",
                      initial: "I",
                    },
                    {
                      name: "Townscript",
                      events: "750+ events",
                      rating: "4.6",
                      initialBg: "bg-[#27bb97]/20",
                      initial: "T",
                    },
                  ].map((organizer, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center text-[#27bb97] font-semibold text-lg sm:text-xl ${organizer.initialBg} border border-[#27bb97]/30`}
                        >
                          {organizer.initial}
                        </div>
                        <div>
                          <a
                            href="#"
                            className="text-[#27bb97] font-semibold hover:underline text-sm sm:text-base"
                          >
                            {organizer.name}
                          </a>
                          <p className="text-xs sm:text-sm text-gray-700">
                            {organizer.events}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">{organizer.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Events This Week */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 border border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                  Free Events This Week
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {allEvents
                    .filter(e => e.price === 0)
                    .slice(0, 3)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                      >
                        <a
                          href="#"
                          className="text-[#27bb97] font-medium hover:underline text-sm leading-5 block mb-1"
                        >
                          {event.title}
                        </a>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {event.displayDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            {event.location}
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700">
                          <span className="font-medium">Time:</span> {event.time}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-r from-[#27bb97] to-[#1fa582] rounded-xl p-5 sm:p-6 text-white text-center">
                <h3 className="text-base sm:text-lg font-bold mb-3">Never Miss an Event!</h3>
                <p className="text-xs sm:text-sm mb-4 opacity-90">
                  Get weekly updates on the best events in your city
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded text-sm text-gray-800"
                  />
                  <button className="bg-white text-[#27bb97] px-4 py-2 rounded text-sm font-semibold hover:bg-gray-100">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;