// src/components/Events/EventDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventsSubNav from '../../components/Events/EventsSubNav';
import {
  Calendar,
  MapPin,
  Search,
  Plus,
  Minus,
  ChevronDown,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  User,
  CheckCircle,
  Eye,
  Phone,
  MessageCircle,
  Images,
  Calendar as CalendarIcon,
  Users,
  Ticket,
  Music,
  Utensils,
  Home,
  ChevronRight as RightArrow,
  Car,
  Wifi,
  Tv,
  Thermometer,
  Snowflake,
  Dumbbell,
  Shirt,
  Zap,
  Coffee,
  Gift,
  Award,
  Camera,
  Headphones,
  Gamepad2,
  Sparkles,
  Beer,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import {
  FaMapMarkerAlt,
  FaMap,
  FaWifi,
  FaTv,
  FaBolt,
  FaThermometerHalf,
  FaSnowflake,
  FaCar,
  FaUtensils,
  FaDumbbell,
  FaMusic,
  FaFilm,
  FaMicrophone,
  FaGlassCheers,
  FaHeartbeat,
  FaUsers,
  FaLanguage,
  FaQrcode,
  FaDoorOpen,
  FaParking,
  FaSubway,
  FaWheelchair,
  FaCamera,
  FaVideo,
  FaBeer,
  FaUtensilSpoon,
  FaRegCalendarPlus,
  FaFire,
  FaCouch,
  FaGift,
  FaLock,
  FaCreditCard,
  FaShoppingCart,
  FaTag,
  FaPercent,
  FaUserFriends,
  FaCrown,
  FaShieldAlt,
  FaCalendarCheck,
  FaExternalLinkAlt,
  FaDirections,
  FaExclamationTriangle,
} from "react-icons/fa";
import { GiGrass, GiWashingMachine } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { TbShirt } from "react-icons/tb";

// Primary color constants
const PRIMARY_COLOR = "#27bb97";
const PRIMARY_HOVER = "#1FA987";

// Enhanced sample events data with multiple photos
const allEvents = [
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    ],
    title: "Sunburn Goa 2025 - Asia's Biggest Music Festival",
    description: "Vagator Beach, Goa, India",
    category: "Music Festival",
    date: "Dec 27-30, 2024",
    time: "6:00 PM onwards",
    posted: "2 days ago",
    postedBy: "Sunburn Events",
    eventType: "Music Festival",
    ticketType: "Multi-Day Pass",
    ageLimit: "18+",
    availableFrom: "Available Now",
    duration: "4 Days",
    amenities: [
      "Multiple Stages",
      "Food Court",
      "VIP Lounge",
      "Parking",
      "Camping",
      "Merch Store",
      "Charging Stations",
      "Medical Aid",
    ],
    details: "Experience Asia's biggest music festival with top international DJs and artists. 4 days of non-stop music across 8 stages, featuring EDM, techno, house, and more. Camping options available.",
    price: 2999,
    ticketsAvailable: 45,
    location: "Goa, India",
    verified: true,
    immediate: true,
    discount: "Early Bird 20% Off",
    distance: "0.5 km from Beach",
    busStopDistance: "1 km from Bus Stop",
    contact: "+91 9876543210",
    views: 1280,
    saves: 156,
    rating: 4.8,
    reviews: 284,
    photos: 24,
    responseRate: "98%",
    responseTime: "< 1h",
    availableForCall: true,
    performers: [
      { name: "Martin Garrix", type: "Headliner" },
      { name: "Marshmello", type: "International" },
      { name: "Nikhil Chinapa", type: "Indian" },
    ],
    organizers: "Sunburn Events Pvt Ltd",
    hashtags: ["#Sunburn2025", "#GoaFestival", "#EDM"],
    coordinates: {
      lat: 15.5939,
      lng: 73.7749,
      address: "Vagator Beach, North Goa, Goa 403509"
    }
  },
  {
    id: 2,
    images: [
      "https://images.unsplash.com/photo-1562979314-bee745e8b9b8?w=800&q=80",
      "https://images.unsplash.com/photo-1514327605112-b887c0e61c6a?w=800&q=80",
    ],
    title: "Rangoli Night Market - Cultural Food Festival",
    description: "DLF CyberHub, Gurgaon",
    category: "Food Festival",
    date: "Nov 2, 2024",
    time: "5:00 PM - 11:00 PM",
    posted: "5 hrs ago",
    postedBy: "DLF Events",
    eventType: "Cultural Festival",
    ticketType: "Free Entry",
    ageLimit: "All Ages",
    availableFrom: "Nov 1, 2024",
    duration: "6 Hours",
    amenities: [
      "Food Stalls",
      "Cultural Performances",
      "Shopping",
      "Parking",
      "Kids Zone",
      "Photo Booths",
    ],
    details: "Experience the vibrant colors and flavors of India. 100+ food stalls, cultural performances, traditional crafts shopping, and family entertainment.",
    price: 0,
    ticketsAvailable: 1000,
    location: "Gurgaon, India",
    verified: true,
    immediate: false,
    discount: "Free Entry",
    distance: "0.2 km from Metro",
    busStopDistance: "0.1 km from Bus Stop",
    contact: "+91 9876543211",
    views: 920,
    saves: 89,
    rating: 4.3,
    reviews: 156,
    photos: 18,
    responseRate: "95%",
    responseTime: "< 2h",
    availableForCall: true,
    performers: [
      { name: "Traditional Dance Troupes", type: "Cultural" },
      { name: "Local Bands", type: "Music" },
    ],
    organizers: "DLF Events & Culture Society",
    hashtags: ["#RangoliNight", "#FoodFestival", "#Cultural"],
    coordinates: {
      lat: 28.4916,
      lng: 77.0946,
      address: "DLF CyberHub, Cyber City, Gurugram, Haryana 122002"
    }
  },
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&q=80",
      "https://images.unsplash.com/photo-1577483482955-b5c36b5e807?w=800&q=80",
    ],
    title: "Stand-up Comedy Night with Top Indian Comedians",
    description: "The Comedy Club, Mumbai",
    category: "Comedy Show",
    date: "Oct 25, 2024",
    time: "8:00 PM - 11:00 PM",
    posted: "1 day ago",
    postedBy: "The Comedy Club",
    eventType: "Entertainment",
    ticketType: "Premium Seating",
    ageLimit: "16+",
    availableFrom: "Oct 20, 2024",
    duration: "3 Hours",
    amenities: [
      "Premium Seating",
      "Food & Drinks",
      "Parking",
      "AC Hall",
      "Merchandise",
    ],
    details: "Laugh your heart out with India's top comedians. An evening of fresh jokes, hilarious observations, and non-stop entertainment.",
    price: 599,
    ticketsAvailable: 150,
    location: "Mumbai, India",
    verified: false,
    immediate: true,
    discount: "Group Discount",
    distance: "0.3 km from Station",
    busStopDistance: "0.2 km from Bus Stop",
    contact: "+91 9876543212",
    views: 1560,
    saves: 203,
    rating: 4.6,
    reviews: 89,
    photos: 12,
    responseRate: "90%",
    responseTime: "< 3h",
    availableForCall: false,
    performers: [
      { name: "Zakir Khan", type: "Headliner" },
      { name: "Kanan Gill", type: "Special Guest" },
      { name: "Biswa Kalyan Rath", type: "Featured" },
    ],
    organizers: "The Comedy Club Mumbai",
    hashtags: ["#ComedyNight", "#StandUp", "#MumbaiEvents"],
    coordinates: {
      lat: 19.0760,
      lng: 72.8777,
      address: "The Comedy Club, Bandra West, Mumbai, Maharashtra 400050"
    }
  },
  {
    id: 4,
    images: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    ],
    title: "Tech Startup Summit 2024",
    description: "Bangalore International Center",
    category: "Tech Conference",
    date: "Nov 15-16, 2024",
    time: "9:00 AM - 6:00 PM",
    posted: "3 days ago",
    postedBy: "TechConnect India",
    eventType: "Conference",
    ticketType: "Two-Day Pass",
    ageLimit: "18+",
    availableFrom: "Oct 25, 2024",
    duration: "2 Days",
    amenities: [
      "Networking",
      "Workshops",
      "Startup Expo",
      "Food Court",
      "WiFi",
      "Parking",
      "Charging Stations",
    ],
    details: "Join India's largest tech startup gathering. Featuring keynote speakers, pitch sessions, investor meetings, and workshops on AI, Blockchain, and SaaS.",
    price: 2499,
    ticketsAvailable: 300,
    location: "Bangalore, India",
    verified: true,
    immediate: true,
    discount: "Early Bird 25% Off",
    distance: "1.2 km from Metro",
    busStopDistance: "0.5 km from Bus Stop",
    contact: "+91 9876543213",
    views: 2100,
    saves: 345,
    rating: 4.7,
    reviews: 189,
    photos: 32,
    responseRate: "96%",
    responseTime: "< 2h",
    availableForCall: true,
    performers: [
      { name: "Nandan Nilekani", type: "Keynote" },
      { name: "Kunal Shah", type: "Speaker" },
      { name: "Falguni Nayar", type: "Panelist" },
    ],
    organizers: "TechConnect India Ventures",
    hashtags: ["#TechSummit", "#StartupIndia", "#Innovation"],
    coordinates: {
      lat: 12.9716,
      lng: 77.5946,
      address: "Bangalore International Center, Domlur, Bengaluru, Karnataka 560071"
    }
  },
  {
    id: 5,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    ],
    title: "Yoga & Wellness Retreat",
    description: "Rishikesh Ashram, Uttarakhand",
    category: "Wellness",
    date: "Dec 5-8, 2024",
    time: "6:00 AM - 8:00 PM",
    posted: "1 week ago",
    postedBy: "Spiritual India",
    eventType: "Retreat",
    ticketType: "All Inclusive",
    ageLimit: "16+",
    availableFrom: "Nov 1, 2024",
    duration: "4 Days",
    amenities: [
      "Accommodation",
      "Vegetarian Meals",
      "Yoga Mats",
      "Meditation Hall",
      "Nature Walks",
      "Ayurvedic Spa",
      "Library",
    ],
    details: "Rejuvenate your mind, body, and soul in the yoga capital of the world. Daily yoga sessions, meditation, healthy meals, and spiritual guidance.",
    price: 8999,
    ticketsAvailable: 50,
    location: "Rishikesh, India",
    verified: true,
    immediate: false,
    discount: "Group Discount Available",
    distance: "0.1 km from Ganges",
    busStopDistance: "0.8 km from Bus Stand",
    contact: "+91 9876543214",
    views: 890,
    saves: 167,
    rating: 4.9,
    reviews: 245,
    photos: 28,
    responseRate: "99%",
    responseTime: "< 4h",
    availableForCall: true,
    performers: [
      { name: "Swami Gyan", type: "Yoga Master" },
      { name: "Dr. Sharma", type: "Ayurvedic Expert" },
    ],
    organizers: "Spiritual India Foundation",
    hashtags: ["#YogaRetreat", "#Wellness", "#Rishikesh"],
    coordinates: {
      lat: 30.0869,
      lng: 78.2676,
      address: "Parmarth Niketan Ashram, Rishikesh, Uttarakhand 249304"
    }
  },
  {
    id: 6,
    images: [
      "https://images.unsplash.com/photo-1510629954389-c1e0da47d5d3?w=800&q=80",
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&q=80",
    ],
    title: "Marvel Movie Marathon",
    description: "PVR Cinemas, Delhi",
    category: "Movie Screening",
    date: "Nov 10, 2024",
    time: "10:00 AM - 10:00 PM",
    posted: "2 days ago",
    postedBy: "PVR Events",
    eventType: "Entertainment",
    ticketType: "Day Pass",
    ageLimit: "12+",
    availableFrom: "Available Now",
    duration: "12 Hours",
    amenities: [
      "Recliner Seats",
      "Food Combo",
      "Free Popcorn",
      "Merchandise",
      "Parking",
      "AC Theater",
    ],
    details: "Watch all Avengers movies back-to-back! Includes Infinity War and Endgame. Special merchandise and unlimited popcorn for attendees.",
    price: 1299,
    ticketsAvailable: 200,
    location: "Delhi, India",
    verified: true,
    immediate: true,
    discount: "Combo Offer",
    distance: "0.4 km from Metro",
    busStopDistance: "0.3 km from Bus Stop",
    contact: "+91 9876543215",
    views: 1560,
    saves: 289,
    rating: 4.5,
    reviews: 134,
    photos: 15,
    responseRate: "92%",
    responseTime: "< 1h",
    availableForCall: false,
    performers: [],
    organizers: "PVR Cinemas Ltd",
    hashtags: ["#MarvelMarathon", "#MovieNight", "#Avengers"],
    coordinates: {
      lat: 28.7041,
      lng: 77.1025,
      address: "PVR Select Citywalk, Saket, New Delhi, Delhi 110017"
    }
  },
  {
    id: 7,
    images: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    ],
    title: "Art Exhibition: Modern Indian Masters",
    description: "National Gallery of Modern Art, Delhi",
    category: "Art Exhibition",
    date: "Oct 28 - Nov 28, 2024",
    time: "10:00 AM - 6:00 PM",
    posted: "4 days ago",
    postedBy: "NGMA Delhi",
    eventType: "Art & Culture",
    ticketType: "Daily Pass",
    ageLimit: "All Ages",
    availableFrom: "Oct 20, 2024",
    duration: "1 Month",
    amenities: [
      "Guided Tours",
      "Audio Guide",
      "Cafeteria",
      "Gift Shop",
      "Parking",
      "Wheelchair Access",
    ],
    details: "Exhibition featuring works by MF Husain, FN Souza, SH Raza, and other modern Indian masters. Curated collection with rare pieces.",
    price: 200,
    ticketsAvailable: 500,
    location: "Delhi, India",
    verified: true,
    immediate: false,
    discount: "Student Discount",
    distance: "0.8 km from India Gate",
    busStopDistance: "0.2 km from Bus Stop",
    contact: "+91 9876543216",
    views: 1250,
    saves: 178,
    rating: 4.8,
    reviews: 96,
    photos: 42,
    responseRate: "94%",
    responseTime: "< 5h",
    availableForCall: false,
    performers: [],
    organizers: "National Gallery of Modern Art",
    hashtags: ["#ArtExhibition", "#IndianArt", "#NGMA"],
    coordinates: {
      lat: 28.6139,
      lng: 77.2295,
      address: "National Gallery of Modern Art, Jaipur House, New Delhi 110003"
    }
  },
  {
    id: 8,
    images: [
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
    ],
    title: "Food Truck Festival: Global Cuisines",
    description: "Phoenix Marketcity, Chennai",
    category: "Food Festival",
    date: "Nov 8-10, 2024",
    time: "4:00 PM - 11:00 PM",
    posted: "6 hrs ago",
    postedBy: "Foodie Events",
    eventType: "Food Festival",
    ticketType: "Free Entry",
    ageLimit: "All Ages",
    availableFrom: "Nov 1, 2024",
    duration: "3 Days",
    amenities: [
      "50+ Food Trucks",
      "Live Music",
      "Beer Garden",
      "Kids Play Area",
      "Seating",
      "Parking",
      "Restrooms",
    ],
    details: "Taste global flavors from 50+ food trucks. Featuring Mexican, Italian, Asian, and Indian street food. Live music and entertainment.",
    price: 0,
    ticketsAvailable: 2000,
    location: "Chennai, India",
    verified: true,
    immediate: true,
    discount: "Free Entry",
    distance: "0.3 km from Mall",
    busStopDistance: "0.1 km from Bus Stop",
    contact: "+91 9876543217",
    views: 1890,
    saves: 234,
    rating: 4.4,
    reviews: 178,
    photos: 36,
    responseRate: "97%",
    responseTime: "< 2h",
    availableForCall: true,
    performers: [
      { name: "Local Bands", type: "Live Music" },
      { name: "DJ Night", type: "Music" },
    ],
    organizers: "Foodie Events Network",
    hashtags: ["#FoodTruckFest", "#ChennaiFood", "#StreetFood"],
    coordinates: {
      lat: 13.0827,
      lng: 80.2707,
      address: "Phoenix Marketcity, Velachery, Chennai, Tamil Nadu 600042"
    }
  },
  {
    id: 9,
    images: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
    ],
    title: "Half Marathon: Run for Education",
    description: "Marine Drive, Mumbai",
    category: "Sports",
    date: "Nov 24, 2024",
    time: "5:30 AM - 10:00 AM",
    posted: "1 week ago",
    postedBy: "Mumbai Runners",
    eventType: "Sports Event",
    ticketType: "Registration",
    ageLimit: "16+",
    availableFrom: "Oct 15, 2024",
    duration: "4.5 Hours",
    amenities: [
      "Timing Chip",
      "Medal",
      "T-Shirt",
      "Water Stations",
      "Medical Aid",
      "Changing Rooms",
      "Breakfast",
    ],
    details: "21km run along Marine Drive. All proceeds go to education for underprivileged children. Timing chips, medals, and certificates for all finishers.",
    price: 800,
    ticketsAvailable: 5000,
    location: "Mumbai, India",
    verified: true,
    immediate: false,
    discount: "Early Bird Registration",
    distance: "On Marine Drive",
    busStopDistance: "0.5 km from Bus Stop",
    contact: "+91 9876543218",
    views: 3450,
    saves: 456,
    rating: 4.7,
    reviews: 324,
    photos: 56,
    responseRate: "95%",
    responseTime: "< 3h",
    availableForCall: true,
    performers: [],
    organizers: "Mumbai Runners Association",
    hashtags: ["#Marathon", "#RunForEducation", "#MumbaiRun"],
    coordinates: {
      lat: 18.9440,
      lng: 72.8229,
      address: "Marine Drive, Netaji Subhash Chandra Bose Rd, Mumbai, Maharashtra 400020"
    }
  },
  {
    id: 10,
    images: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    ],
    title: "Indie Music Festival: Rising Stars",
    description: "Purple Haze, Bangalore",
    category: "Music Concert",
    date: "Nov 16, 2024",
    time: "7:00 PM - 1:00 AM",
    posted: "2 days ago",
    postedBy: "Indie Music Collective",
    eventType: "Music Festival",
    ticketType: "Night Pass",
    ageLimit: "21+",
    availableFrom: "Oct 30, 2024",
    duration: "6 Hours",
    amenities: [
      "Live Music",
      "Dance Floor",
      "Bar",
      "Food",
      "Parking",
      "Coat Check",
      "Smoking Area",
    ],
    details: "Discover India's best indie bands and solo artists. Featuring alternative rock, indie pop, and experimental music genres.",
    price: 999,
    ticketsAvailable: 300,
    location: "Bangalore, India",
    verified: false,
    immediate: true,
    discount: "Student Discount",
    distance: "1.5 km from MG Road",
    busStopDistance: "0.4 km from Bus Stop",
    contact: "+91 9876543219",
    views: 890,
    saves: 123,
    rating: 4.5,
    reviews: 67,
    photos: 22,
    responseRate: "88%",
    responseTime: "< 6h",
    availableForCall: false,
    performers: [
      { name: "The Local Train", type: "Headliner" },
      { name: "When Chai Met Toast", type: "Featured" },
      { name: "Anuv Jain", type: "Special Guest" },
    ],
    organizers: "Indie Music Collective Bangalore",
    hashtags: ["#IndieMusic", "#LiveMusic", "#BangaloreGigs"],
    coordinates: {
      lat: 12.9762,
      lng: 77.6033,
      address: "Purple Haze, Church Street, Bengaluru, Karnataka 560001"
    }
  },
  {
    id: 11,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
    ],
    title: "Wine Tasting & Cheese Pairing",
    description: "The Oberoi, Gurgaon",
    category: "Food & Drink",
    date: "Nov 12, 2024",
    time: "7:00 PM - 10:00 PM",
    posted: "1 day ago",
    postedBy: "The Oberoi Events",
    eventType: "Culinary Experience",
    ticketType: "Premium Experience",
    ageLimit: "25+",
    availableFrom: "Nov 1, 2024",
    duration: "3 Hours",
    amenities: [
      "Wine Expert",
      "Cheese Selection",
      "Small Plates",
      "Souvenir Glass",
      "Valet Parking",
      "Lounge Seating",
    ],
    details: "Experience curated wine tasting with international wines paired with artisanal cheeses. Led by master sommelier.",
    price: 2999,
    ticketsAvailable: 40,
    location: "Gurgaon, India",
    verified: true,
    immediate: true,
    discount: "Couples Package",
    distance: "0.1 km from Hotel",
    busStopDistance: "0.3 km from Bus Stop",
    contact: "+91 9876543220",
    views: 670,
    saves: 98,
    rating: 4.9,
    reviews: 45,
    photos: 18,
    responseRate: "99%",
    responseTime: "< 1h",
    availableForCall: true,
    performers: [
      { name: "Master Sommelier", type: "Expert" },
    ],
    organizers: "The Oberoi Hotels & Resorts",
    hashtags: ["#WineTasting", "#CheesePairing", "#GurgaonEvents"],
    coordinates: {
      lat: 28.4595,
      lng: 77.0266,
      address: "The Oberoi, Udyog Vihar, Gurugram, Haryana 122016"
    }
  },
  {
    id: 12,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    title: "Winter Trek to Triund",
    description: "Dharamshala, Himachal Pradesh",
    category: "Adventure",
    date: "Dec 14-15, 2024",
    time: "7:00 AM - 6:00 PM",
    posted: "3 days ago",
    postedBy: "Adventure Nation",
    eventType: "Trekking",
    ticketType: "All Inclusive",
    ageLimit: "18+",
    availableFrom: "Nov 15, 2024",
    duration: "2 Days",
    amenities: [
      "Guide",
      "Camping Equipment",
      "Meals",
      "First Aid",
      "Transport",
      "Insurance",
      "Bonfire",
    ],
    details: "Moderate winter trek to Triund with stunning Himalayan views. Includes camping overnight and bonfire under the stars.",
    price: 3499,
    ticketsAvailable: 30,
    location: "Dharamshala, India",
    verified: true,
    immediate: false,
    discount: "Group of 4 Discount",
    distance: "Starting from Dharamshala",
    busStopDistance: "Meet at Bus Stand",
    contact: "+91 9876543221",
    views: 1230,
    saves: 189,
    rating: 4.8,
    reviews: 156,
    photos: 38,
    responseRate: "96%",
    responseTime: "< 4h",
    availableForCall: true,
    performers: [],
    organizers: "Adventure Nation Treks",
    hashtags: ["#WinterTrek", "#Triund", "#Himalayas"],
    coordinates: {
      lat: 32.2190,
      lng: 76.3234,
      address: "Triund Trek Starting Point, Dharamshala, Himachal Pradesh 176215"
    }
  },
  {
    id: 13,
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    ],
    title: "Book Launch: 'The Midnight Library' Author Talk",
    description: "Oxford Bookstore, Kolkata",
    category: "Literary Event",
    date: "Nov 5, 2024",
    time: "6:00 PM - 8:00 PM",
    posted: "4 days ago",
    postedBy: "Oxford Bookstore",
    eventType: "Author Event",
    ticketType: "Free Registration",
    ageLimit: "All Ages",
    availableFrom: "Oct 25, 2024",
    duration: "2 Hours",
    amenities: [
      "Author Interaction",
      "Book Signing",
      "Tea & Coffee",
      "Bookstore Discount",
      "Seating",
      "Parking",
    ],
    details: "Meet the author of 'The Midnight Library' for an intimate discussion, Q&A session, and book signing.",
    price: 0,
    ticketsAvailable: 100,
    location: "Kolkata, India",
    verified: true,
    immediate: true,
    discount: "Free Event",
    distance: "0.2 km from Park Street",
    busStopDistance: "0.1 km from Bus Stop",
    contact: "+91 9876543222",
    views: 980,
    saves: 145,
    rating: 4.6,
    reviews: 78,
    photos: 16,
    responseRate: "93%",
    responseTime: "< 2h",
    availableForCall: false,
    performers: [
      { name: "Matt Haig", type: "Author" },
    ],
    organizers: "Oxford Bookstore Kolkata",
    hashtags: ["#BookLaunch", "#AuthorTalk", "#KolkataEvents"],
    coordinates: {
      lat: 22.5726,
      lng: 88.3639,
      address: "Oxford Bookstore, Park Street, Kolkata, West Bengal 700016"
    }
  },
  {
    id: 14,
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80",
    ],
    title: "Pottery Workshop for Beginners",
    description: "Artisan Studio, Pune",
    category: "Workshop",
    date: "Nov 18, 2024",
    time: "10:00 AM - 4:00 PM",
    posted: "5 days ago",
    postedBy: "Artisan Studio Pune",
    eventType: "Creative Workshop",
    ticketType: "Workshop Pass",
    ageLimit: "12+",
    availableFrom: "Nov 1, 2024",
    duration: "6 Hours",
    amenities: [
      "Materials Provided",
      "Expert Guidance",
      "Lunch",
      "Take Home Creation",
      "Aprons",
      "Studio Access",
    ],
    details: "Learn basic pottery techniques including wheel throwing and hand building. Take home your creations after firing.",
    price: 1999,
    ticketsAvailable: 15,
    location: "Pune, India",
    verified: true,
    immediate: false,
    discount: "Bring a Friend Discount",
    distance: "0.5 km from Koregaon Park",
    busStopDistance: "0.2 km from Bus Stop",
    contact: "+91 9876543223",
    views: 540,
    saves: 89,
    rating: 4.7,
    reviews: 56,
    photos: 24,
    responseRate: "97%",
    responseTime: "< 3h",
    availableForCall: true,
    performers: [
      { name: "Master Potter", type: "Instructor" },
    ],
    organizers: "Artisan Studio Pune",
    hashtags: ["#PotteryWorkshop", "#Creative", "#PuneEvents"],
    coordinates: {
      lat: 18.5204,
      lng: 73.8567,
      address: "Artisan Studio, Koregaon Park, Pune, Maharashtra 411001"
    }
  },
  {
    id: 15,
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    ],
    title: "DJ Night: Bollywood vs Hollywood",
    description: "Kitty Su, Delhi",
    category: "Nightlife",
    date: "Nov 9, 2024",
    time: "9:00 PM - 2:00 AM",
    posted: "1 day ago",
    postedBy: "Kitty Su",
    eventType: "Club Night",
    ticketType: "Entry Pass",
    ageLimit: "21+",
    availableFrom: "Available Now",
    duration: "5 Hours",
    amenities: [
      "DJ Performance",
      "Dance Floor",
      "Bar",
      "VIP Tables",
      "Coat Check",
      "Valet Parking",
      "Smoking Lounge",
    ],
    details: "Experience the ultimate Bollywood vs Hollywood music battle with top DJs. Premium sound system and light show.",
    price: 1499,
    ticketsAvailable: 200,
    location: "Delhi, India",
    verified: true,
    immediate: true,
    discount: "Ladies Night Special",
    distance: "0.3 km from Connaught Place",
    busStopDistance: "0.4 km from Bus Stop",
    contact: "+91 9876543224",
    views: 1780,
    saves: 234,
    rating: 4.4,
    reviews: 189,
    photos: 28,
    responseRate: "91%",
    responseTime: "< 2h",
    availableForCall: false,
    performers: [
      { name: "DJ NYK", type: "Headliner" },
      { name: "DJ Aqeel", type: "Special Guest" },
    ],
    organizers: "Kitty Su Delhi",
    hashtags: ["#DJNight", "#Bollywood", "#DelhiNightlife"],
    coordinates: {
      lat: 28.6315,
      lng: 77.2167,
      address: "Kitty Su, The Lalit Hotel, Connaught Place, New Delhi 110001"
    }
  },
  {
    id: 16,
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    title: "Photography Expedition: Ladakh Landscapes",
    description: "Leh, Ladakh",
    category: "Photography",
    date: "Jun 10-18, 2025",
    time: "All Day",
    posted: "2 weeks ago",
    postedBy: "Photography Expeditions",
    eventType: "Photography Tour",
    ticketType: "Full Package",
    ageLimit: "18+",
    availableFrom: "Jan 1, 2025",
    duration: "9 Days",
    amenities: [
      "Professional Guide",
      "Transport",
      "Accommodation",
      "Meals",
      "Workshops",
      "Equipment Support",
      "Photo Review Sessions",
    ],
    details: "Capture the stunning landscapes of Ladakh with professional photographers. Visit Pangong Lake, Nubra Valley, and more.",
    price: 45999,
    ticketsAvailable: 12,
    location: "Ladakh, India",
    verified: true,
    immediate: false,
    discount: "Early Bird 15% Off",
    distance: "Leh based tour",
    busStopDistance: "Airport pick-up",
    contact: "+91 9876543225",
    views: 890,
    saves: 167,
    rating: 4.9,
    reviews: 89,
    photos: 64,
    responseRate: "98%",
    responseTime: "< 6h",
    availableForCall: true,
    performers: [
      { name: "Professional Photographer", type: "Guide" },
      { name: "Local Expert", type: "Coordinator" },
    ],
    organizers: "Photography Expeditions India",
    hashtags: ["#PhotographyTour", "#Ladakh", "#LandscapePhotography"],
    coordinates: {
      lat: 34.1526,
      lng: 77.5770,
      address: "Leh Main Market, Leh, Ladakh 194101"
    }
  }
];

// Options data
const searchTypes = [
  "Music Events",
  "Sports Events",
  "Food Festivals",
  "Comedy Shows",
  "Workshops",
  "Conferences",
  "Parties",
  "All Events",
];

const locationTypes = ["By City", "By Venue", "By Metro", "By Landmark"];

const radiusOptions = [
  "5 km",
  "10 km",
  "25 km",
  "50 km",
  "100 km",
  "Any Distance",
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
  "Music Concert",
  "Festival",
  "Sports Match",
  "Food Festival",
  "Comedy Show",
  "Workshop",
  "Conference",
  "Exhibition",
];

const openEvents = [
  {
    title: "Coldplay Live in Mumbai - World Tour 2025",
    timeAgo: "2 hrs ago",
    location: "Mumbai, DY Patil Stadium",
    organizer: "Live Nation",
    price: "4,500",
    eventType: "Music Concert",
    date: "Jan 18, 2025",
    eventTime: "7:00 PM onwards",
  },
  {
    title: "IPL 2025 Opening Ceremony",
    timeAgo: "1 day ago",
    location: "Ahmedabad, Narendra Modi Stadium",
    organizer: "BCCI",
    price: "1,200",
    eventType: "Sports Event",
    date: "Mar 22, 2025",
    eventTime: "6:30 PM - 10:30 PM",
  },
];

const itemsPerPageOptions = [3, 6, 9, 12];

// Google Maps Component
const EventMap = ({ eventData }) => {
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate Google Maps URL for the event
  const getGoogleMapsUrl = () => {
    const query = encodeURIComponent(`${eventData.title} ${eventData.description}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const getDirectionsUrl = () => {
    const destination = encodeURIComponent(eventData.description);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  };

  // Get coordinates for the map
  const getEventCoordinates = () => {
    // Default coordinates for India
    const defaultCoords = { lat: 20.5937, lng: 78.9629 };
    
    // Mock coordinates based on location
    const locationMap = {
      'Goa, India': { lat: 15.5939, lng: 73.7749 },
      'Mumbai, India': { lat: 19.0760, lng: 72.8777 },
      'Delhi, India': { lat: 28.7041, lng: 77.1025 },
      'Bangalore, India': { lat: 12.9716, lng: 77.5946 },
      'Gurgaon, India': { lat: 28.4595, lng: 77.0266 },
      'Chennai, India': { lat: 13.0827, lng: 80.2707 },
      'Rishikesh, India': { lat: 30.0869, lng: 78.2676 },
      'Dharamshala, India': { lat: 32.2190, lng: 76.3234 },
      'Kolkata, India': { lat: 22.5726, lng: 88.3639 },
      'Pune, India': { lat: 18.5204, lng: 73.8567 },
      'Ladakh, India': { lat: 34.1526, lng: 77.5770 },
      'Ahmedabad, India': { lat: 23.0225, lng: 72.5714 },
    };
    
    return eventData.coordinates || locationMap[eventData.location] || defaultCoords;
  };

  const coordinates = getEventCoordinates();

  return (
    <div className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Location & Directions</h3>
            <p className="text-xs sm:text-sm text-gray-600">Find how to reach the event venue</p>
          </div>
          
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setShowInteractiveMap(!showInteractiveMap)}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm"
            >
              <FaMap className="text-xs sm:text-sm" />
              {showInteractiveMap ? (isMobile ? "Hide Map" : "Hide Interactive Map") : (isMobile ? "Show Map" : "Interactive Map")}
            </button>
            
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-[${PRIMARY_COLOR}] text-white rounded-lg hover:bg-[${PRIMARY_HOVER}] transition-colors text-xs sm:text-sm`}
            >
              <FaDirections className="text-xs sm:text-sm" />
              {isMobile ? "Directions" : "Get Directions"}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Location Details */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Venue Info */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-600 text-sm sm:text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-lg">Venue Address</h4>
                  <p className="text-gray-700 mt-1 sm:mt-2 leading-relaxed text-xs sm:text-sm">
                    {eventData.description}
                    <br />
                    <span className="text-gray-500 text-xs sm:text-sm">{eventData.location}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Transport Info */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-lg mb-3 sm:mb-4">How to Get There</h4>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Public Transport */}
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-purple-100 rounded">
                      <span className="text-purple-600 text-xs sm:text-sm">🚇</span>
                    </div>
                    <span className="font-medium text-gray-900 text-xs sm:text-sm">Nearest Metro Station</span>
                  </div>
                  <p className="text-gray-700 ml-6 sm:ml-8 text-xs sm:text-sm">
                    {eventData.distance || "Walking distance from nearest metro station"}
                  </p>
                </div>

                {/* Bus Stop */}
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-green-100 rounded">
                      <span className="text-green-600 text-xs sm:text-sm">🚌</span>
                    </div>
                    <span className="font-medium text-gray-900 text-xs sm:text-sm">Bus Stop</span>
                  </div>
                  <p className="text-gray-700 ml-6 sm:ml-8 text-xs sm:text-sm">
                    {eventData.busStopDistance || "Multiple bus routes available nearby"}
                  </p>
                </div>

                {/* Parking */}
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-blue-100 rounded">
                      <span className="text-blue-600 text-xs sm:text-sm">🅿️</span>
                    </div>
                    <span className="font-medium text-gray-900 text-xs sm:text-sm">Parking</span>
                  </div>
                  <p className="text-gray-700 ml-6 sm:ml-8 text-xs sm:text-sm">
                    {eventData.amenities?.includes("Parking") 
                      ? "Parking available at venue" 
                      : "Limited street parking available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2">
            {showInteractiveMap ? (
              // Interactive Google Maps
              <div className="h-[300px] sm:h-[400px] rounded-lg overflow-hidden border border-gray-300 relative">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&q=${encodeURIComponent(eventData.description)}&zoom=15&center=${coordinates.lat},${coordinates.lng}`}
                  allowFullScreen
                  title={`Location of ${eventData.title}`}
                  loading="lazy"
                />
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white rounded-lg shadow-lg p-2 sm:p-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-semibold">Event Location</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 max-w-[120px] sm:max-w-[200px] truncate">{eventData.description}</p>
                </div>
              </div>
            ) : (
              // Simple Static Map
              <div className="h-[300px] sm:h-[400px] rounded-lg overflow-hidden border border-gray-300 relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                  <div className="text-center p-4 sm:p-6">
                    <div className="inline-block p-3 sm:p-4 bg-blue-100 rounded-full mb-3 sm:mb-4">
                      <FaMapMarkerAlt className="text-blue-600 text-2xl sm:text-3xl" />
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Event Location</h4>
                    <p className="text-gray-700 mb-3 sm:mb-4 max-w-md mx-auto text-xs sm:text-sm">{eventData.description}</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                      <a
                        href={getGoogleMapsUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 sm:gap-2 bg-[${PRIMARY_COLOR}] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-[${PRIMARY_HOVER}] transition-colors text-xs sm:text-sm`}
                      >
                        <FaMap className="text-xs sm:text-sm" />
                        View on Map
                      </a>
                      <button
                        onClick={() => setShowInteractiveMap(true)}
                        className={`inline-flex items-center gap-1 sm:gap-2 border border-[${PRIMARY_COLOR}] text-[${PRIMARY_COLOR}] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-xs sm:text-sm`}
                      >
                        <FaDirections className="text-xs sm:text-sm" />
                        {isMobile ? "Interactive" : "Interactive Map"}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Map Preview with Marker */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-bounce"></div>
                      <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-md whitespace-nowrap text-xs sm:text-sm font-medium">
                        📍 {eventData.location.split(',')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // State for search filters
  const [searchType, setSearchType] = useState("Music Events");
  const [locationType, setLocationType] = useState("By City");
  const [location, setLocation] = useState("Mumbai");
  const [radius, setRadius] = useState("25 km");
  const [budget, setBudget] = useState("Any Budget");
  const [eventType, setEventType] = useState("Music Events");
  const [mainTab, setMainTab] = useState("upcoming");
  const [dropdownTab, setDropdownTab] = useState("need");
  const [sortBy, setSortBy] = useState("featured");
  const [showMoreAmenities, setShowMoreAmenities] = useState({});
  const [likedEvents, setLikedEvents] = useState({});
  const [showContact, setShowContact] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showPlusDropdown, setShowPlusDropdown] = useState(false);

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // Find the event by ID
    const foundEvent = allEvents.find(e => e.id === parseInt(eventId));
    if (foundEvent) {
      setEventData(foundEvent);
    }
    setLoading(false);
  }, [eventId]);

  // Enhanced navigation function
  const handleNavigate = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(path);
    }, 100);
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
      location,
      radius,
      budget,
      eventType,
    });
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
      alert("Link copied to clipboard!");
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
    alert(`Opening chat with ${event.postedBy} for ${event.title}`);
  };

  // Badge Component
  const Badge = ({ children, type = "default" }) => {
    const styles = {
      verified: "bg-green-100 text-green-800 border-green-200",
      immediate: "bg-blue-100 text-blue-800 border-blue-200",
      discount: "bg-orange-100 text-orange-800 border-orange-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
      free: "bg-green-100 text-green-800 border-green-200",
      vip: "bg-purple-100 text-purple-800 border-purple-200",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[type]}`}
      >
        {type === "verified" && <CheckCircle size={12} />}
        {type === "immediate" && <Clock size={12} />}
        {type === "free" && <Gift size={12} />}
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

  // Get event icon based on category
  const getEventIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'music festival':
      case 'music concert':
        return <Music size={16} className="text-blue-600" />;
      case 'food festival':
        return <Utensils size={16} className="text-red-600" />;
      case 'cultural festival':
        return <Sparkles size={16} className="text-yellow-600" />;
      default:
        return <Calendar size={16} className="text-gray-600" />;
    }
  };

  // Event Amenity icons mapping
  const amenityIcons = {
    "Multiple Stages": <Music size={14} />,
    "Food Court": <Utensils size={14} />,
    "Parking": <Car size={14} />,
    "Merch Store": <Shirt size={14} />,
    "Medical Aid": <Heart size={14} />,
    "Cultural Performances": <Users size={14} />,
    "Kids Zone": <Gamepad2 size={14} />,
    "Photo Booths": <Camera size={14} />,
    "Food & Drinks": <Coffee size={14} />,
    "AC Hall": <Snowflake size={14} />,
    "Merchandise": <Gift size={14} />,
  };

  // Event Card Component
  const EventCard = ({ event }) => {
    const currentIndex = currentImageIndex[event.id] || 0;
    const totalImages = event.images.length;

    const handleCardClick = () => {
      navigate(`/events/${event.id}`);
    };

    const handleTitleClick = (e) => {
      e.stopPropagation();
      navigate(`/events/${event.id}`);
    };

    return (
      <div
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer w-full"
        onClick={handleCardClick}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Gallery Section */}
          <div className="md:w-2/5 h-48 md:h-auto relative">
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={event.images[currentIndex]}
                alt={`${event.title} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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

              {/* Top Left Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {event.verified && <Badge type="verified">Verified</Badge>}
                {event.immediate && <Badge type="immediate">On Sale</Badge>}
                {event.price === 0 ? (
                  <Badge type="free">Free Entry</Badge>
                ) : (
                  event.discount && <Badge type="discount">{event.discount}</Badge>
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

              {/* Distance Information */}
              <div className="absolute bottom-12 left-3 right-3">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap gap-2">
                    {event.distance && (
                      <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                        🚇 {event.distance}
                      </div>
                    )}
                    {event.busStopDistance && (
                      <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                        🚌 {event.busStopDistance}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-4 sm:p-5 flex flex-col justify-between">
            {/* Header with Price and Badges */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
                <div className="flex-1 pr-4">
                  <h3
                    className="text-base sm:text-lg font-bold text-gray-800 mb-2 leading-tight hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={handleTitleClick}
                  >
                    {isMobile && event.title.length > 60 
                      ? `${event.title.substring(0, 60)}...` 
                      : event.title}
                  </h3>

                  {/* Location and Quick Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      {getEventIcon(event.category)}
                      <span className="truncate">{event.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  {/* Rating and Response Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <RatingStars
                      rating={event.rating}
                      reviews={event.reviews}
                    />
                    <div className="text-xs sm:text-sm text-gray-600">
                      ⚡ {event.responseRate} response • {event.responseTime}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
                      <Users size={16} />
                      <span>{event.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
                      <Clock size={16} />
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
                      <Ticket size={16} />
                      <span>{event.ticketsAvailable} tickets</span>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                    {event.price === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <>
                        ₹{event.price.toLocaleString()}
                        <span className="text-xs sm:text-sm font-normal text-gray-600">/person</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    By: {event.postedBy}
                  </div>
                </div>
              </div>

              {/* Event Details in Compact Grid */}
              <div className="grid grid-cols-3 gap-2 text-xs mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Type</div>
                  <div className="text-gray-600 truncate">{event.eventType}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Age Limit</div>
                  <div className="text-gray-600">{event.ageLimit}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Saves</div>
                  <div className="text-gray-600">{event.saves}</div>
                </div>
              </div>

              {/* Key Amenities */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Event Features
                </h4>
                <div className="flex flex-wrap gap-1">
                  {event.amenities.slice(0, isMobile ? 2 : 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 text-xs text-blue-700 px-2 py-1.5 rounded-lg border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      {amenityIcons[amenity] || <Sparkles size={14} />}
                      <span className="truncate max-w-[100px] sm:max-w-none">{amenity}</span>
                    </span>
                  ))}
                  {event.amenities.length > (isMobile ? 2 : 4) && (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMoreAmenities(prev => ({
                            ...prev,
                            [event.id]: !prev[event.id]
                          }));
                        }}
                        className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
                      >
                        +{event.amenities.length - (isMobile ? 2 : 4)} more
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Description Line */}
              <div className="text-sm text-gray-600 mb-4 leading-relaxed">
                <p className="line-clamp-2">{event.details}</p>
              </div>

              {/* Performers */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Featured Artists
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.performers.map((performer, index) => (
                    <span
                      key={index}
                      className="text-xs bg-purple-50 text-purple-700 px-2 py-1.5 rounded-full border border-purple-200 truncate max-w-[120px] sm:max-w-none"
                    >
                      {performer.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pt-4 border-t border-gray-200">
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
                    className="text-blue-600 hover:text-blue-700 hover:underline transition-colors text-xs sm:text-sm"
                  >
                    Show Contact
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(event);
                  }}
                  disabled={!event.availableForCall}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                    event.availableForCall
                      ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:shadow-sm"
                      : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  }`}
                >
                  <Phone size={16} />
                  <span className="hidden xs:inline">Call</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessage(event);
                  }}
                  className={`flex items-center gap-1 sm:gap-2 bg-[${PRIMARY_COLOR}] hover:bg-[${PRIMARY_HOVER}] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md`}
                >
                  <MessageCircle size={16} />
                  <span className="hidden xs:inline">Message</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick();
                  }}
                  className={`flex items-center gap-1 sm:gap-2 bg-[${PRIMARY_COLOR}] hover:bg-[${PRIMARY_HOVER}] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md`}
                >
                  <Ticket size={16} />
                  <span className="hidden xs:inline">Book Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Event Details Main Section
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading event details...</div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event not found</h2>
          <button
            onClick={() => navigate('/events')}
            className={`bg-[${PRIMARY_COLOR}] text-white px-6 py-3 rounded-lg hover:bg-[${PRIMARY_HOVER}] transition-colors`}
          >
            Browse All Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <EventsSubNav />

      {/* Mobile Back Button */}
      {isMobile && (
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="font-medium text-gray-900 truncate max-w-[200px]">
            {eventData.title}
          </span>
        </div>
      )}

      {/* Header Section */}
      <div className="pt-4 pb-4 px-3 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation - Hidden on mobile */}
          {!isMobile && (
            <div className="flex items-center gap-2 text-sm mb-4">
              <button 
                onClick={() => handleNavigate('/')}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              >
                <Home size={14} />
                Home
              </button>
              <span className="text-gray-400">→</span>
              <button 
                onClick={() => handleNavigate('/events')}
                className="text-gray-600 hover:text-gray-900"
              >
                Events
              </button>
              <span className="text-gray-400">→</span>
              <span className="text-gray-900 font-medium truncate max-w-xs">
                {eventData.title}
              </span>
            </div>
          )}

          {/* Main Event Details */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Event Images */}
              <div className="lg:w-2/5">
                <div className="relative h-56 sm:h-64 lg:h-80 xl:h-96 rounded-lg overflow-hidden">
                  <img
                    src={eventData.images[0]}
                    alt={eventData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
                    {eventData.price === 0 ? (
                      <Badge type="free">FREE ENTRY</Badge>
                    ) : (
                      <Badge type="discount">TICKETS AVAILABLE</Badge>
                    )}
                    {eventData.verified && <Badge type="verified">VERIFIED</Badge>}
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {(currentImageIndex[eventData.id] || 0) + 1} / {eventData.images.length}
                  </div>
                </div>
                
                {/* Thumbnail Images */}
                <div className="flex gap-2 mt-3 sm:mt-4">
                  {eventData.images.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(prev => ({
                        ...prev,
                        [eventData.id]: index
                      }))}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 ${
                        (currentImageIndex[eventData.id] || 0) === index
                          ? 'border-blue-500'
                          : 'border-gray-200'
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
              </div>

              {/* Event Info */}
              <div className="lg:w-3/5">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {isMobile && eventData.title.length > 70 
                        ? `${eventData.title.substring(0, 70)}...` 
                        : eventData.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1 text-sm sm:text-base">
                        <MapPin size={16} />
                        <span className="truncate">{eventData.description}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm sm:text-base">
                        <Calendar size={16} />
                        <span>{eventData.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      onClick={() => toggleLike(eventData.id)}
                      className={`p-2 sm:p-3 rounded-full ${
                        likedEvents[eventData.id]
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      } hover:bg-gray-200 transition-colors`}
                    >
                      <Heart
                        size={18}
                        fill={likedEvents[eventData.id] ? 'currentColor' : 'none'}
                      />
                    </button>
                    <button
                      onClick={() => handleShare(eventData)}
                      className="p-2 sm:p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Event Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Price</div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                      {eventData.price === 0 ? 'FREE' : `₹${eventData.price}`}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Duration</div>
                    <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{eventData.duration}</div>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Age Limit</div>
                    <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{eventData.ageLimit}</div>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Tickets Left</div>
                    <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{eventData.ticketsAvailable}</div>
                  </div>
                </div>

                {/* Event Description */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">About this Event</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{eventData.details}</p>
                </div>

                {/* Performers */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Featured Performers</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {eventData.performers.map((performer, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-2 sm:p-3 rounded-lg flex-1 min-w-[140px]"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-black font-bold">
                          {performer.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{performer.name}</div>
                          <div className="text-xs sm:text-sm text-gray-600 truncate">{performer.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => alert(`Booking tickets for ${eventData.title}`)}
                    className={`flex-1 bg-[${PRIMARY_COLOR}] hover:bg-[${PRIMARY_HOVER}] text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base`}
                  >
                    <Ticket size={18} />
                    Book Tickets Now
                  </button>
                  <button
                    onClick={() => handleMessage(eventData)}
                    className={`px-4 sm:px-6 py-3 sm:py-4 border-2 border-[${PRIMARY_COLOR}] text-[${PRIMARY_COLOR}] font-semibold rounded-lg hover:bg-[${PRIMARY_COLOR}] hover:text-white transition-colors text-sm sm:text-base`}
                  >
                    <MessageCircle size={18} className="inline mr-2" />
                    Contact Organizer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Event Features Grid */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                  <Calendar size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">Date & Time</div>
                  <div className="text-xs sm:text-sm text-gray-600">{eventData.date} • {eventData.time}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                  <MapPin size={18} className="text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">Venue</div>
                  <div className="text-xs sm:text-sm text-gray-600 truncate">{eventData.description}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                  <Users size={18} className="text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">Organizer</div>
                  <div className="text-xs sm:text-sm text-gray-600">{eventData.postedBy}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg">
                  <FaTag size={18} className="text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">Category</div>
                  <div className="text-xs sm:text-sm text-gray-600">{eventData.category}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Section */}
          <EventMap eventData={eventData} />

          {/* Search Section for Related Events */}
          <div className="mt-8 sm:mt-12">
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Find Similar Events</h2>
              
              {/* Search Bar */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-4 sm:mb-6">
                <div className="w-full lg:w-auto">
                  <div className="relative">
                    <select
                      className="w-full pl-3 pr-10 py-3 text-sm sm:text-base border border-gray-200 rounded-lg lg:rounded-l-lg lg:rounded-r-none text-gray-700 focus:outline-none appearance-none bg-white"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <div className="w-full lg:w-auto">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Enter location..."
                      className="w-full pl-10 pr-3 py-3 text-sm sm:text-base border border-gray-200 bg-white text-gray-800 focus:outline-none rounded-lg lg:rounded-none"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-auto">
                  <div className="relative">
                    <select
                      className="w-full pl-3 pr-10 py-3 text-sm sm:text-base border border-gray-200 rounded-lg lg:rounded-none text-gray-700 focus:outline-none appearance-none bg-white"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      {budgetOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={handleSearch}
                  className={`w-full lg:w-auto px-4 sm:px-6 flex items-center justify-center gap-2 bg-[${PRIMARY_COLOR}] text-white font-semibold rounded-lg lg:rounded-r-lg py-3 hover:bg-[${PRIMARY_HOVER}] shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base`}
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden xs:inline">Search Events</span>
                  <span className="xs:hidden">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Events Section */}
      <div className="py-6 sm:py-8 px-3 sm:px-6 lg:px-8 xl:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Similar Events You Might Like</h2>
          
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 mb-4 sm:mb-6 scrollbar-hide">
            <button
              onClick={() => setMainTab("upcoming")}
              className={`pb-3 px-3 sm:px-6 font-medium transition-colors whitespace-nowrap ${
                mainTab === "upcoming"
                  ? "text-gray-900 border-b-2 border-[${PRIMARY_COLOR}]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setMainTab("nearby")}
              className={`pb-3 px-3 sm:px-6 font-medium transition-colors whitespace-nowrap ${
                mainTab === "nearby"
                  ? "text-gray-900 border-b-2 border-[${PRIMARY_COLOR}]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Nearby Events
            </button>
            <button
              onClick={() => setMainTab("category")}
              className={`pb-3 px-3 sm:px-6 font-medium transition-colors whitespace-nowrap ${
                mainTab === "category"
                  ? "text-gray-900 border-b-2 border-[${PRIMARY_COLOR}]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Same Category
            </button>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
            {allEvents
              .filter(event => event.id !== eventData.id)
              .slice(0, isMobile ? 2 : isTablet ? 3 : 14)
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventDetailPage;