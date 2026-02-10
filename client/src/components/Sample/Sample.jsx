import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  MapPin,
  Search,
  ChevronRight,
  Menu,
  X,
  Filter,
  MessageCircle,
  Star,
  Check,
  Clock,
  Shield,
  Package,
  Battery,
  Camera,
  Wifi,
  Smartphone,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  User,
  Phone,
  Mail,
  Verified,
} from "lucide-react";
import { FaMinus, FaPlus } from "react-icons/fa";

// Product data (keep the same)
const electronicsData = [
  {
    id: 1,
    title: "Brand new Smart Watch for Men Women, 2026 Smartwatch (Metal body)",
    price: 17,
    location: "Queens, NY",
    postedTime: "2 hours ago",
    condition: "New",
    seller: "Michelle",
    sellerRating: 4.5,
    sellerReviews: 399,
    sellerJoined: "Sep 2020",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80",
    description:
      'Brand new Smart Watch for Men Women, 2026 Smartwatch (Metal body), 1.93" New Fitness Watch with Answer/Make Call/120+ Sport Modes/Pedometer/IP68 Waterproof. Fitness Tracker Fits for Android/iPhone. Pink Whitestone/Flushing, Queens or Downtown Manhattan pickup Cash only',
    features: [
      "120+ Sport Modes",
      "IP68 Waterproof",
      "Answer/Make Calls",
      "Heart Rate Monitor",
      "Sleep Tracking",
    ],
    category: "Wearables",
  },
  {
    id: 2,
    title: "KLHIIII Audio System with Subwoofer",
    price: 60,
    location: "Bergenfield, NJ",
    postedTime: "5 hours ago",
    condition: "Used",
    seller: "John",
    sellerRating: 4.2,
    sellerReviews: 156,
    sellerJoined: "Jan 2021",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80",
    description:
      "High-quality audio system with powerful subwoofer. Great condition, perfect for home entertainment setup.",
    features: [
      "Powerful Bass",
      "Multiple Inputs",
      "Remote Control",
      "Bluetooth Connectivity",
    ],
    category: "Audio & Speakers",
  },
  {
    id: 3,
    title: "15 Pro Max",
    price: 650,
    location: "Bronx, NY",
    postedTime: "1 day ago",
    condition: "New",
    seller: "Sarah",
    sellerRating: 4.8,
    sellerReviews: 523,
    sellerJoined: "Mar 2019",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    description:
      "Brand new iPhone 15 Pro Max, unlocked, all colors available. Comes with original packaging and accessories.",
    features: ["A17 Pro Chip", "Titanium Design", "48MP Camera", "USB-C Port"],
    category: "Cell phones & Accessories",
  },
  {
    id: 4,
    title: "PS4 Video Games (44 Games Collection)",
    price: 210,
    location: "Hoboken, NJ",
    postedTime: "3 hours ago",
    condition: "Used",
    seller: "Mike",
    sellerRating: 4.6,
    sellerReviews: 234,
    sellerJoined: "Aug 2020",
    image:
      "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&q=80",
    description:
      "Collection of 44 PS4 games including popular titles. All games in good condition with cases.",
    features: [
      "44 Games",
      "Various Genres",
      "All with Cases",
      "Popular Titles",
    ],
    category: "Video games & Consoles",
  },
  {
    id: 5,
    title: "(Open Box) HyperX SoloCast USB Microphone",
    price: 40,
    location: "Hoboken, NJ",
    postedTime: "6 hours ago",
    condition: "Open box",
    seller: "Alex",
    sellerRating: 4.4,
    sellerReviews: 178,
    sellerJoined: "Nov 2020",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80",
    description:
      "Open box HyperX SoloCast USB microphone, perfect for streaming and podcasting. Tested and works perfectly.",
    features: [
      "USB Connectivity",
      "Tap-to-Mute",
      "LED Status Indicator",
      "Plug and Play",
    ],
    category: "Audio & Speakers",
  },
  {
    id: 6,
    title: "WH-1000XM3 Premium Noise Cancelling Headphones",
    price: 250,
    location: "Port Chester, NY",
    postedTime: "12 hours ago",
    condition: "Used",
    seller: "Emma",
    sellerRating: 4.7,
    sellerReviews: 312,
    sellerJoined: "Jun 2019",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80",
    description:
      "Sony WH-1000XM3 wireless noise cancelling headphones. Excellent condition with carrying case.",
    features: [
      "Active Noise Cancellation",
      "30-Hour Battery",
      "Touch Controls",
      "Foldable Design",
    ],
    category: "Headphones",
  },
  {
    id: 7,
    title: "Gaming PC Rtx 4060 + Full Setup",
    price: 750,
    location: "White Plains, NY",
    postedTime: "1 day ago",
    condition: "Used",
    seller: "Ryan",
    sellerRating: 4.5,
    sellerReviews: 267,
    sellerJoined: "Feb 2021",
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&q=80",
    description:
      "Complete gaming PC with RTX 4060, RGB lighting, and full setup ready to game.",
    features: [
      "RTX 4060 GPU",
      "16GB RAM",
      "1TB SSD",
      "RGB Lighting",
      "Gaming Keyboard & Mouse",
    ],
    category: "Video games & Consoles",
  },
  {
    id: 8,
    title: "Fitbit Sense Smartwatch",
    price: 80,
    location: "Queens, NY",
    postedTime: "4 hours ago",
    condition: "Used",
    seller: "Lisa",
    sellerRating: 4.3,
    sellerReviews: 145,
    sellerJoined: "Oct 2020",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    description:
      "Fitbit Sense advanced health smartwatch with stress management and heart health tools.",
    features: [
      "ECG App",
      "Stress Management",
      "6+ Days Battery",
      "Built-in GPS",
    ],
    category: "Wearables",
  },
  {
    id: 9,
    title: "AirPod Pro Gen 2",
    price: 85,
    location: "The Bronx, NY",
    postedTime: "8 hours ago",
    condition: "Used",
    seller: "David",
    sellerRating: 4.6,
    sellerReviews: 289,
    sellerJoined: "May 2020",
    image:
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&q=80",
    description:
      "Apple AirPods Pro 2nd Generation with active noise cancellation and spatial audio.",
    features: [
      "Active Noise Cancellation",
      "Spatial Audio",
      "MagSafe Charging",
      "Sweat & Water Resistant",
    ],
    category: "Headphones",
  },
  {
    id: 10,
    title: "Call Of Duty: Infinite Warfare - Xbox One",
    price: 13,
    location: "Garfield, NJ",
    postedTime: "2 days ago",
    condition: "Used",
    seller: "Chris",
    sellerRating: 4.1,
    sellerReviews: 98,
    sellerJoined: "Dec 2021",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500&q=80",
    description:
      "Call of Duty: Infinite Warfare for Xbox One. Good condition with case.",
    features: ["Complete Game", "With Case", "Xbox One Compatible"],
    category: "Video games & Consoles",
  },
  {
    id: 11,
    title: "DJI RS3 With Arm Attachment",
    price: 475,
    location: "New York, NY",
    postedTime: "10 hours ago",
    condition: "Used",
    seller: "Tom",
    sellerRating: 4.8,
    sellerReviews: 412,
    sellerJoined: "Apr 2019",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80",
    description:
      "DJI RS3 gimbal stabilizer with arm attachment. Perfect for professional videography.",
    features: [
      "3-Axis Stabilization",
      "Automated Features",
      "Long Battery Life",
      "Professional Grade",
    ],
    category: "Cameras & Photography",
  },
  {
    id: 12,
    title: 'iPad Pro 13" + Keyboard Case',
    price: 900,
    location: "New York, NY",
    postedTime: "5 hours ago",
    condition: "Used",
    seller: "Jennifer",
    sellerRating: 4.9,
    sellerReviews: 567,
    sellerJoined: "Jan 2019",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    description:
      "iPad Pro 13 inch with Magic Keyboard case. Excellent condition, barely used.",
    features: [
      "M2 Chip",
      "Liquid Retina Display",
      "Apple Pencil Support",
      "Magic Keyboard Included",
    ],
    category: "Electronics & Media",
  },
  {
    id: 13,
    title: "NEW Gaming Microphone with Stand",
    price: 25,
    location: "Queens, NY",
    postedTime: "7 hours ago",
    condition: "New",
    seller: "Kevin",
    sellerRating: 4.2,
    sellerReviews: 134,
    sellerJoined: "Sep 2021",
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80",
    description:
      "Brand new gaming microphone with adjustable stand. Perfect for streaming and gaming.",
    features: [
      "Adjustable Stand",
      "USB Connection",
      "Noise Cancelling",
      "RGB Lighting",
    ],
    category: "Audio & Speakers",
  },
  {
    id: 14,
    title: "Town of Light (Microsoft Xbox One)",
    price: 15,
    location: "Clifton, NJ",
    postedTime: "1 day ago",
    condition: "Used",
    seller: "Amanda",
    sellerRating: 4.0,
    sellerReviews: 76,
    sellerJoined: "Mar 2022",
    image:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80",
    description:
      "Town of Light game for Xbox One. Complete with case and manual.",
    features: ["Complete Game", "Original Case", "Xbox One"],
    category: "Video games & Consoles",
  },
  {
    id: 15,
    title: "NEW Pink Unicorn Kids Instant Camera",
    price: 15,
    location: "Queens, NY",
    postedTime: "9 hours ago",
    condition: "New",
    seller: "Maria",
    sellerRating: 4.5,
    sellerReviews: 201,
    sellerJoined: "Jul 2020",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    description:
      "Brand new pink unicorn themed instant camera for kids. Makes photography fun!",
    features: [
      "Instant Print",
      "Kid-Friendly Design",
      "Built-in Flash",
      "Fun Stickers Included",
    ],
    category: "Cameras & Photography",
  },
  {
    id: 16,
    title: "NEW Magnetic Car iPhone Mount",
    price: 5,
    location: "Queens, NY",
    postedTime: "3 hours ago",
    condition: "New",
    seller: "Robert",
    sellerRating: 4.3,
    sellerReviews: 167,
    sellerJoined: "Nov 2021",
    image:
      "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=500&q=80",
    description:
      "Brand new magnetic car mount for iPhone. Strong magnets, 360-degree rotation.",
    features: [
      "Strong Magnet",
      "360° Rotation",
      "Easy Installation",
      "Universal Fit",
    ],
    category: "Cell phones & Accessories",
  },
  {
    id: 17,
    title: "NEW Drone with Camera 4K",
    price: 30,
    location: "Queens, NY",
    postedTime: "6 hours ago",
    condition: "New",
    seller: "Daniel",
    sellerRating: 4.7,
    sellerReviews: 345,
    sellerJoined: "Apr 2020",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&q=80",
    description:
      "Brand new drone with 4K camera. Perfect for beginners and aerial photography enthusiasts.",
    features: ["4K Camera", "GPS", "Return to Home", "30 Min Flight Time"],
    category: "Cameras & Photography",
  },
  {
    id: 18,
    title: "Apple MacBook Air M1 Chip",
    price: 800,
    location: "The Bronx, NY",
    postedTime: "12 hours ago",
    condition: "Used",
    seller: "Sophia",
    sellerRating: 4.9,
    sellerReviews: 678,
    sellerJoined: "Feb 2019",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    description:
      "Apple MacBook Air with M1 chip. Excellent condition, includes charger and original box.",
    features: [
      "M1 Chip",
      "8GB RAM",
      "256GB SSD",
      "Retina Display",
      "All-Day Battery",
    ],
    category: "Electronics & Media",
  },
  {
    id: 19,
    title: "JBL Bluetooth Speaker Portable",
    price: 45,
    location: "Newark, NJ",
    postedTime: "4 hours ago",
    condition: "Used",
    seller: "James",
    sellerRating: 4.4,
    sellerReviews: 189,
    sellerJoined: "Aug 2021",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    description:
      "JBL portable Bluetooth speaker. Waterproof, great sound quality, long battery life.",
    features: [
      "Waterproof IPX7",
      "12 Hours Playtime",
      "Wireless Bluetooth",
      "Deep Bass",
    ],
    category: "Audio & Speakers",
  },
  {
    id: 20,
    title: "Canon EOS Rebel T7 DSLR Camera Bundle",
    price: 420,
    location: "Brooklyn, NY",
    postedTime: "1 day ago",
    condition: "Used",
    seller: "Olivia",
    sellerRating: 4.8,
    sellerReviews: 445,
    sellerJoined: "May 2019",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    description:
      "Canon EOS Rebel T7 DSLR camera with two lenses, bag, and accessories. Perfect for beginners.",
    features: [
      "24.1MP Sensor",
      "WiFi Connectivity",
      "Full HD Video",
      "Two Lenses Included",
    ],
    category: "Cameras & Photography",
  },
];

// Static Map Component
const LocationMap = ({ location }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#27bb97]" />
          Location
        </h3>
        <p className="text-gray-600 mt-1">{location}</p>
      </div>
      <div className="relative h-64 sm:h-72 md:h-80 bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <div className="bg-white p-4 rounded-lg shadow-md inline-block">
              <p className="font-medium text-gray-800">{location}</p>
              <p className="text-sm text-gray-600 mt-1">Contact seller for exact address</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-blue-50 to-gray-50">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Seller Details Component
const SellerDetails = ({ seller, rating, reviews, joined }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Seller Information</h3>
        <button className="text-[#27bb97] text-sm font-medium hover:text-[#1fa987]">
          View Profile →
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-[#27bb97] to-[#1E9E7E] rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {seller[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-gray-900 text-lg">{seller}</h4>
            <Verified className="w-5 h-5 text-blue-500" />
          </div>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500 ml-2">({reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Package className="w-4 h-4 mr-1.5" />
              <span>42 sold</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>Joined {joined}</span>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full py-3 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-lg font-medium transition-colors mb-4 flex items-center justify-center">
        <MessageCircle className="w-5 h-5 mr-2" />
        Contact Seller
      </button>

      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">98%</div>
          <div className="text-xs text-gray-500">Response Rate</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">1hr</div>
          <div className="text-xs text-gray-500">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">100%</div>
          <div className="text-xs text-gray-500">Positive Feedback</div>
        </div>
      </div>
    </div>
  );
};

// Product Card Component (for listing page)
const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200"
    >
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[36px] leading-tight">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
            {product.condition}
          </span>
        </div>

        <div className="flex items-center text-xs text-gray-600 mt-1">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{product.location}</span>
        </div>

        <div className="text-xs text-gray-400 mt-1">{product.postedTime}</div>
      </div>
    </div>
  );
};

// Electronics Listing Page Component
const ElectronicsListing = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);

  // Get unique categories and conditions
  const categories = [...new Set(electronicsData.map(p => p.category))];
  const conditions = [...new Set(electronicsData.map(p => p.condition))];

  const filteredProducts = electronicsData.filter((product) => {
    // Search filter
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Price filter
    if (priceMin && product.price < parseFloat(priceMin)) {
      return false;
    }
    if (priceMax && product.price > parseFloat(priceMax)) {
      return false;
    }
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    // Condition filter
    if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) {
      return false;
    }
    
    return true;
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleConditionChange = (condition) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="bg-white border-b ">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">
              Home
            </a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">Electronics</span>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4">
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

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Condition
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {conditions.map((condition) => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(condition)}
                      onChange={() => handleConditionChange(condition)}
                      className="w-4 h-4 text-[#27bb97] border-gray-300 rounded focus:ring-[#27bb97]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {condition}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Categories
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                      className="w-4 h-4 text-[#27bb97] border-gray-300 rounded focus:ring-[#27bb97]"
                    />
                    <span className="ml-2 text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSearchQuery("");
                setPriceMin("");
                setPriceMax("");
                setSelectedCategories([]);
                setSelectedConditions([]);
              }}
              className="w-full mt-6 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Electronics
              </h1>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial sm:min-w-[250px] lg:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27bb97] focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center gap-2 sm:flex-shrink-0">
                    <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap hidden xs:inline">
                      Sort by:
                    </span>
                    <select className="px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27bb97] focus:border-transparent w-full xs:w-auto min-w-[120px] sm:min-w-[180px]">
                      <option>Recent first</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Distance</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4 lg:hidden">
              {filteredProducts.length} items found
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product.id)}
                />
              ))}
            </div>

            <div className="mt-8 text-center text-gray-600 hidden lg:block">
              Showing {filteredProducts.length} of {electronicsData.length} items
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">No items found</div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPriceMin("");
                    setPriceMax("");
                    setSelectedCategories([]);
                    setSelectedConditions([]);
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

// Product Detail Page Component
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = electronicsData.find((p) => p.id === parseInt(id));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    product?.image,
    'https://images.unsplash.com/photo-1579586337278-3f576cfc5113?w=500&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    'https://images.unsplash.com/photo-1546054451-aa224c0e8c23?w=500&q=80',
  ].filter(Boolean);

  const handleThumbnailClick = (index) => setSelectedImageIndex(index);
  const handlePrevImage = () =>
    setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  const handleNextImage = () =>
    setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-md">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/electronics')}
            className="px-6 py-3 bg-[#27BB97] text-white rounded-lg hover:bg-[#1E9E7E] transition-colors font-medium text-base sm:text-lg"
          >
            Back to Electronics
          </button>
        </div>
      </div>
    );
  }

  const techSpecs = [
    { icon: <Battery className="text-[#27bb97] text-xl" />, label: 'Battery Life', value: '24 hours' },
    { icon: <Wifi className="text-[#27bb97] text-xl" />, label: 'Connectivity', value: 'Bluetooth 5.2' },
    { icon: <Shield className="text-[#27bb97] text-xl" />, label: 'Water Resistance', value: 'IP68' },
    { icon: <Smartphone className="text-[#27bb97] text-xl" />, label: 'Display', value: '1.93" AMOLED' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-sm text-gray-600 min-w-0 flex-1">
              <button
                onClick={() => navigate('/electronics')}
                className="hover:text-[#27bb97] transition-colors whitespace-nowrap"
              >
                Electronics
              </button>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-gray-900 truncate">{product.title}</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="rounded-md mb-6 shadow-sm overflow-hidden bg-white p-4">
              <div className="relative">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.title}
                  className="w-full h-auto max-h-[500px] rounded-md object-cover bg-gray-50"
                />
                
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:shadow-xl z-20"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:shadow-xl z-20"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer transition-all ${
                    selectedImageIndex === index
                      ? 'border-2 border-[#27bb97] shadow-md'
                      : 'hover:border-2 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>

            <div className="mb-8">
              <LocationMap location={product.location} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Product Description</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-[#27bb97] mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h2>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1 font-medium">
                    PRICE
                  </div>
                  <div className="text-4xl font-bold text-[#27bb97]">
                    ${product.price}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1.5" />
                    <span className="font-medium">{product.condition}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    <span>{product.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                    >
                      <FaMinus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <span className="text-xl font-semibold w-10 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                    >
                      <FaPlus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                    <MessageCircle className="w-5 h-5 inline mr-2" />
                    Contact Seller
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-300 transition-colors">
                      Make Offer
                    </button>
                    <button className="py-3 bg-white border-2 border-[#27bb97] text-[#27bb97] rounded-lg font-medium hover:bg-[#27bb97]/5 transition-colors">
                      Save Item
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-700">
                  Specifications
                </h3>
                <div className="space-y-4">
                  {techSpecs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg">
                        {spec.icon}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{spec.label}</div>
                        <div className="font-medium text-gray-700">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <SellerDetails
                seller={product.seller}
                rating={product.sellerRating}
                reviews={product.sellerReviews}
                joined={product.sellerJoined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Routing
const ElectronicsApp = () => {
  const { id } = useParams();
  
  // If there's a product ID in the URL, show product detail page
  // Otherwise, show the listing page
  if (id) {
    return <ProductDetail />;
  }
  
  return <ElectronicsListing />;
};

export default ElectronicsApp;
export { electronicsData };