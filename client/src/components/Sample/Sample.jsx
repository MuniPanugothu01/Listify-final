import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  MapPin,
  Search,
  ChevronRight,
  Menu,
  X,
  Filter,
} from "lucide-react";

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

// Product Card Component
const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200"
    >
      {/* Image Container */}
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

      {/* Content Container */}
      <div className="p-3">
        {/* Title */}
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[36px] leading-tight">
          {product.title}
        </h3>

        {/* Price and Condition */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
            {product.condition}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-xs text-gray-600 mt-1">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{product.location}</span>
        </div>

        {/* Posted Time */}
        <div className="text-xs text-gray-400 mt-1">{product.postedTime}</div>
      </div>
    </div>
  );
};

// Electronics Listing Page Component
const Sample = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = electronicsData.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      (!priceMin || product.price >= Number(priceMin)) &&
      (!priceMax || product.price <= Number(priceMax));
    return matchesSearch && matchesPrice;
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
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
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Filter className="w-5 h-5" />
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters - Responsive */}
          <aside
            className={`
            ${isFilterOpen ? "block" : "hidden"} 
            lg:block lg:w-72 xl:w-80 flex-shrink-0
            bg-white rounded-lg shadow-sm p-4 sm:p-6 
            lg:sticky lg:top-24 h-fit
            max-h-[80vh] overflow-y-auto
          `}
          >
            {/* Close button for mobile */}
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <span className="text-gray-500 text-sm">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap text-sm sm:text-base">
                  Apply
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Condition
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {["New", "Open box", "Used", "For parts"].map((condition) => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
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
                {[
                  "Electronics & Media",
                  "Audio & Speakers",
                  "Cell phones & Accessories",
                  "Cameras & Photography",
                  "Video games & Consoles",
                ].map((cat) => (
                  <label key={cat} className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium mt-3">
                + Show more
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {" "}
            {/* min-w-0 prevents flex overflow */}
            {/* Page Title and Sort - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Electronics
              </h1>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                {/* Search Bar and Sort in single row on mobile */}
                <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                  {/* Search Bar */}
                  <div className="relative flex-1 sm:flex-initial sm:min-w-[250px] lg:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2 sm:flex-shrink-0">
                    <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap hidden xs:inline">
                      Sort by:
                    </span>
                    <select className="px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full xs:w-auto min-w-[120px] sm:min-w-[180px]">
                      <option>Recent first</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Distance</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Results Count - Mobile */}
            <div className="text-sm text-gray-600 mb-4 lg:hidden">
              {filteredProducts.length} items found
            </div>
            {/* Products Grid - Responsive */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product.id)}
                />
              ))}
            </div>
            {/* Results count - Desktop */}
            <div className="mt-8 text-center text-gray-600 hidden lg:block">
              Showing {filteredProducts.length} of {electronicsData.length}{" "}
              items
            </div>
            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">No items found</div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPriceMin("");
                    setPriceMax("");
                  }}
                  className="text-teal-600 hover:text-teal-700 font-medium"
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

export default Sample;
export { electronicsData };
