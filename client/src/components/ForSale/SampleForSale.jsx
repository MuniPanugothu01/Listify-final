import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Search,
  ChevronRight,
  X,
  Filter,
  Gamepad,
  Armchair,
  BookOpen,
  Utensils,
  Home,
  Sprout,
  Dumbbell,
  Baby,
  Wrench,
} from 'lucide-react';

const marketplaceItems = [
  {
    id: 1,
    title: "Wooden Dining Table with 6 Chairs",
    price: 18500,
    location: "Kukatpally, Hyderabad",
    postedTime: "Today, 2:15 PM",
    condition: "Used - Good",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    category: "Furniture",
  },
  {
    id: 2,
    title: "Modern L-Shaped Sofa Set (6 Seater)",
    price: 24500,
    location: "Gachibowli, Hyderabad",
    postedTime: "Yesterday, 11:30 AM",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "Furniture",
  },
  {
    id: 3,
    title: "Queen Size Bed with Storage (Teak Wood)",
    price: 28500,
    location: "Hitech City, Hyderabad",
    postedTime: "3 days ago",
    condition: "Used - Excellent",
    image: "https://images.unsplash.com/photo-1618843479313-40f2e308488e?w=800&q=80",
    category: "Furniture",
  },
  {
    id: 4,
    title: "LEGO Star Wars Millennium Falcon (75192)",
    price: 4200,
    location: "Madhapur, Hyderabad",
    postedTime: "2 hours ago",
    condition: "New - Box Opened",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    category: "Toys & Games",
  },
  {
    id: 5,
    title: "Monopoly Board Game - Classic Edition",
    price: 899,
    location: "Ameerpet, Hyderabad",
    postedTime: "Today, 8:45 AM",
    condition: "New",
    image: "https://images.unsplash.com/photo-1637853088870-2e4e2e8d3b4e?w=800&q=80",
    category: "Toys & Games",
  },
  {
    id: 6,
    title: "Remote Control Car - 4x4 Off-Road",
    price: 1450,
    location: "Uppal, Hyderabad",
    postedTime: "4 days ago",
    condition: "Used - Good",
    image: "https://images.unsplash.com/photo-1581235720704-06d1018152dc?w=800&q=80",
    category: "Toys & Games",
  },
  {
    id: 7,
    title: "NCERT Class 10 All Subjects Set (2025-26)",
    price: 950,
    location: "Dilsukhnagar, Hyderabad",
    postedTime: "1 week ago",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "Books",
  },
  {
    id: 8,
    title: "Harry Potter Complete Series (7 Books)",
    price: 2100,
    location: "Secunderabad",
    postedTime: "Yesterday",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80",
    category: "Books",
  },
  {
    id: 9,
    title: "Prestige Induction Cooktop + Mixer Grinder Combo",
    price: 3200,
    location: "Miyapur, Hyderabad",
    postedTime: "1 hour ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1556911220-b0b895fafb40?w=800&q=80",
    category: "Kitchenware",
  },
  {
    id: 10,
    title: "Prestige Pressure Cooker 10L + Idli Cooker",
    price: 2800,
    location: "Kondapur, Hyderabad",
    postedTime: "Today, 12:20 PM",
    condition: "New",
    image: "https://images.unsplash.com/photo-1618843479313-40f2e308488e?w=800&q=80",
    category: "Kitchenware",
  },
  {
    id: 11,
    title: "Stainless Steel Cookware Set (10 pcs)",
    price: 4200,
    location: "Banjara Hills, Hyderabad",
    postedTime: "5 days ago",
    condition: "Used - Excellent",
    image: "https://images.unsplash.com/photo-1637853088870-2e4e2e8d3b4e?w=800&q=80",
    category: "Kitchenware",
  },
  {
    id: 12,
    title: "Wall Art Canvas Set – Modern Abstract (3 pcs)",
    price: 1400,
    location: "Jubilee Hills, Hyderabad",
    postedTime: "4 hours ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
    category: "Home Decor",
  },
  {
    id: 13,
    title: "Ceramic Vase Set (3 pcs) - Bohemian Style",
    price: 950,
    location: "Manikonda, Hyderabad",
    postedTime: "2 days ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1581235720704-06d1018152dc?w=800&q=80",
    category: "Home Decor",
  },
  {
    id: 14,
    title: "Table Lamp with Marble Base",
    price: 1800,
    location: "LB Nagar, Hyderabad",
    postedTime: "Today, 6:30 PM",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80",
    category: "Home Decor",
  },
  {
    id: 15,
    title: "Rose Plants (4 varieties) + Decor Pots",
    price: 850,
    location: "Uppal, Hyderabad",
    postedTime: "2 days ago",
    condition: "Healthy",
    image: "https://images.unsplash.com/photo-1556911220-b0b895fafb40?w=800&q=80",
    category: "Gardening",
  },
  {
    id: 16,
    title: "Indoor Succulent Plants Collection (8 pcs)",
    price: 650,
    location: "KPHB Colony, Hyderabad",
    postedTime: "3 days ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=800&q=80",
    category: "Gardening",
  },
  {
    id: 17,
    title: "York Dumbbell Set 2–20 kg + Yoga Mat",
    price: 6200,
    location: "Banjara Hills, Hyderabad",
    postedTime: "Today, 9:40 AM",
    condition: "Used - Excellent",
    image: "https://images.unsplash.com/photo-1588880331179-46d541a819de?w=800&q=80",
    category: "Sports Gear",
  },
  {
    id: 18,
    title: "Badminton Racket Set + Shuttlecocks",
    price: 1200,
    location: "Nallagandla, Hyderabad",
    postedTime: "1 day ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1622625503831-3f7f6762734d?w=800&q=80",
    category: "Sports Gear",
  },
  {
    id: 19,
    title: "Baby Pram with Carry Cot & Mosquito Net",
    price: 4800,
    location: "Secunderabad",
    postedTime: "1 week ago",
    condition: "Gently Used",
    image: "https://images.unsplash.com/photo-1588880331179-46d541a819de?w=800&q=80",
    category: "Baby Items",
  },
  {
    id: 20,
    title: "Baby Walker with Music & Activity Panel",
    price: 2200,
    location: "Alwal, Hyderabad",
    postedTime: "6 days ago",
    condition: "Used - Good",
    image: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=800&q=80",
    category: "Baby Items",
  },
  {
    id: 21,
    title: "Bosch Cordless Drill + 100 pcs Bit Set",
    price: 5200,
    location: "Dilsukhnagar, Hyderabad",
    postedTime: "5 days ago",
    condition: "Used - Very Good",
    image: "https://images.unsplash.com/photo-1581092160607-8d2a3a5c3f5a?w=800&q=80",
    category: "Tools",
  },
  {
    id: 22,
    title: "Stanley Tool Kit (120 pcs) - Home Use",
    price: 3800,
    location: "Toli Chowki, Hyderabad",
    postedTime: "Today, 10:10 AM",
    condition: "New",
    image: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=800&q=80",
    category: "Tools",
  },
  {
    id: 23,
    title: "Hammer & Screwdriver Set + Measuring Tape",
    price: 950,
    location: "Mehdipatnam, Hyderabad",
    postedTime: "2 hours ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1581092160607-8d2a3a5c3f5a?w=800&q=80",
    category: "Tools",
  },
  {
    id: 24,
    title: "Gardening Tool Kit (9 pcs) + Gloves",
    price: 1100,
    location: "Attapur, Hyderabad",
    postedTime: "4 days ago",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    category: "Tools",
  },
];

// Product Card Component - Updated to match Sample
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
          className="w-full h-full  group-hover:scale-105 transition-transform duration-300 "
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
            ₹{product.price.toLocaleString()}
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

// Marketplace Listing Page Component
export default function SampleForSale() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filtering logic
  const filteredProducts = marketplaceItems.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      (!priceMin || product.price >= Number(priceMin)) &&
      (!priceMax || product.price <= Number(priceMax));
    return matchesSearch && matchesPrice;
  });

  const handleProductClick = (productId) => {
    navigate(`/forsale/${productId}`);
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
            <span className="text-gray-900 font-medium">For Sale</span>
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
          {/* Sidebar Filters - Static on scroll */}
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
                    placeholder="Min ₹"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <span className="text-gray-500 text-sm">to</span>
                  <input
                    type="number"
                    placeholder="Max ₹"
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
                {["New", "Like New", "Used - Excellent"].map((condition) => (
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
                  "Furniture",
                  "Toys & Games", 
                  "Books",
                  "Kitchenware",
                  "Home Decor",
                  "Baby Items",
                  "Tools",
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
            {/* Page Title and Sort - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                For Sale Items
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

                  {/* Sort Dropdown - Beside search bar as in Sample */}
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
              Showing {filteredProducts.length} of {marketplaceItems.length} items
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
}

export { marketplaceItems };