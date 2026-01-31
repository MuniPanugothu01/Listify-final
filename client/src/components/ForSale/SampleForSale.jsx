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
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
    category: "Furniture",
  },
  {
    id: 4,
    title: "LEGO Star Wars Millennium Falcon (75192)",
    price: 4200,
    location: "Madhapur, Hyderabad",
    postedTime: "2 hours ago",
    condition: "New - Box Opened",
    image: "https://images.unsplash.com/photo-1618843479313-40f2e308488e?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1585576691778-2e5aeadb0d46?w=800&q=80",
    category: "Kitchenware",
  },
  {
    id: 11,
    title: "Stainless Steel Cookware Set (10 pcs)",
    price: 4200,
    location: "Banjara Hills, Hyderabad",
    postedTime: "5 days ago",
    condition: "Used - Excellent",
    image: "https://images.unsplash.com/photo-1583417314155-6b8d2e1e2e6f?w=800&q=80",
    category: "Kitchenware",
  },
  {
    id: 12,
    title: "Wall Art Canvas Set – Modern Abstract (3 pcs)",
    price: 1400,
    location: "Jubilee Hills, Hyderabad",
    postedTime: "4 hours ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1540575861509-4c0e9d367d0f?w=800&q=80",
    category: "Home Decor",
  },
  {
    id: 13,
    title: "Ceramic Vase Set (3 pcs) - Bohemian Style",
    price: 950,
    location: "Manikonda, Hyderabad",
    postedTime: "2 days ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1572048572872-2394404cf1f3?w=800&q=80",
    category: "Home Decor",
  },
  {
    id: 14,
    title: "Table Lamp with Marble Base",
    price: 1800,
    location: "LB Nagar, Hyderabad",
    postedTime: "Today, 6:30 PM",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    category: "Home Decor",
  },
  {
    id: 15,
    title: "Rose Plants (4 varieties) + Decor Pots",
    price: 850,
    location: "Uppal, Hyderabad",
    postedTime: "2 days ago",
    condition: "Healthy",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    category: "Gardening",
  },
  {
    id: 16,
    title: "Indoor Succulent Plants Collection (8 pcs)",
    price: 650,
    location: "KPHB Colony, Hyderabad",
    postedTime: "3 days ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1459411559334-6f5a0f5d9e9e?w=800&q=80",
    category: "Gardening",
  },
  {
    id: 17,
    title: "York Dumbbell Set 2–20 kg + Yoga Mat",
    price: 6200,
    location: "Banjara Hills, Hyderabad",
    postedTime: "Today, 9:40 AM",
    condition: "Used - Excellent",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80",
    category: "Tools",
  },
  {
    id: 23,
    title: "Hammer & Screwdriver Set + Measuring Tape",
    price: 950,
    location: "Mehdipatnam, Hyderabad",
    postedTime: "2 hours ago",
    condition: "New",
    image: "https://images.unsplash.com/photo-1581092160384-0a4a0c3e0e6f?w=800&q=80",
    category: "Tools",
  },
  {
    id: 24,
    title: "Gardening Tool Kit (9 pcs) + Gloves",
    price: 1100,
    location: "Attapur, Hyderabad",
    postedTime: "4 days ago",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1581093458795-4a4e1b0d4a4e?w=800&q=80",
    category: "Tools",
  },
];





// ProductCard component (unchanged)
const ProductCard = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 overflow-hidden group"
  >
    <div className="relative aspect-[4/3] bg-gray-50">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 p-3"
      />
      <button
        onClick={e => e.stopPropagation()}
        className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-red-50 transition-colors"
      >
        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
      </button>
    </div>
    <div className="p-3.5">
      <h3 className="font-medium text-gray-900 text-[15px] leading-tight line-clamp-2 min-h-[2.6rem] mb-2">
        {item.title}
      </h3>
      <div className="flex items-center justify-between mb-1">
        <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
        <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
          {item.condition}
        </span>
      </div>
      <div className="flex items-center text-xs text-gray-600">
        <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
        <span className="truncate">{item.location}</span>
      </div>
    </div>
  </div>
);

export default function ForSale() {
  const navigate = useNavigate();

  // ─── Filter States ────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, price-low, price-high
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Available filter options
  const conditions = [
    'New',
    'Like New',
    'Used - Excellent',
    'Used - Good',
    'Used - Fair',
  ];

  const categories = [
    'Furniture',
    'Toys & Games',
    'Books',
    'Kitchenware',
    'Home Decor',
    'Gardening',
    'Sports Gear',
    'Baby Items',
    'Tools',
  ];

  // ─── Filtering Logic ──────────────────────────────────────
  let filtered = marketplaceItems.filter(item => {
    // Search title
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;

    // Price range
    const priceNum = item.price;
    if (minPrice && priceNum < Number(minPrice)) return false;
    if (maxPrice && priceNum > Number(maxPrice)) return false;

    // Condition
    if (selectedConditions.length > 0 && !selectedConditions.includes(item.condition)) {
      return false;
    }

    // Category
    if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
      return false;
    }

    // Location (contains search – case insensitive)
    if (locationFilter && !item.location.toLowerCase().includes(locationFilter.toLowerCase())) {
      return false;
    }

    return true;
  });

  // ─── Sorting ──────────────────────────────────────────────
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'recent') {
    // For demo: we can simulate recency by postedTime string comparison
    // In real app you would parse dates properly
    filtered = [...filtered].sort((a, b) => b.postedTime.localeCompare(a.postedTime));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-teal-700">Home</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-medium text-gray-900">For Sale</span>
          </div>
        </div>
      </div>

      <div className=" px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-5">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-teal-600 text-white rounded-xl font-medium shadow-sm"
          >
            <Filter size={18} />
            {filtersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* ─── FILTER SIDEBAR ─────────────────────────────────── */}
          {/* <aside
            className={`
              ${filtersOpen ? 'block fixed inset-0 z-50 bg-gray-50 overflow-y-auto p-5 lg:static lg:block' : 'hidden lg:block'}
              lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-6
            `}
          >
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button onClick={() => setFiltersOpen(false)}>
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <h2 className="text-xl font-bold mb-6 hidden lg:block">Filters</h2>

              <div className="mb-7">
                <label className="block text-sm font-medium text-gray-700 mb-2.5">Price Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                  />
                  <input
                    type="number"
                    placeholder="Max ₹"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="mb-7">
                <label className="block text-sm font-medium text-gray-700 mb-2.5">Condition</label>
                <div className="space-y-2">
                  {conditions.map(cond => (
                    <label key={cond} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(cond)}
                        onChange={() => {
                          setSelectedConditions(prev =>
                            prev.includes(cond)
                              ? prev.filter(c => c !== cond)
                              : [...prev, cond]
                          );
                        }}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <label className="block text-sm font-medium text-gray-700 mb-2.5">Category</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => {
                          setSelectedCategories(prev =>
                            prev.includes(cat)
                              ? prev.filter(c => c !== cat)
                              : [...prev, cat]
                          );
                        }}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <label className="block text-sm font-medium text-gray-700 mb-2.5">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Kukatpally, Gachibowli..."
                  value={locationFilter}
                  onChange={e => setLocationFilter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2.5">Sort by</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 bg-white"
                >
                  <option value="recent">Most Recent</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <div className="mt-8 lg:hidden">
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-full py-3.5 bg-teal-600 text-white rounded-xl font-medium shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </aside> */}

          {/* ─── MAIN CONTENT ───────────────────────────────────── */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                For Sale Items
              </h2>
              <div className="relative flex-1 sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search in For Sale..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-transparent text-base shadow-sm"
                />
              </div>
            </div>

            {/* <div className="text-sm text-gray-600 mb-5">
              {filtered.length} items found
              {filtered.length > 0 && ` • sorted by ${sortBy === 'recent' ? 'most recent' : sortBy === 'price-low' ? 'price low→high' : 'price high→low'}`}
            </div> */}

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {filtered.map(item => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/forsale/${item.id}`)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-600 bg-white rounded-xl border mt-8">
                No items match your filters.<br />
                Try adjusting search, price, condition or category.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export { marketplaceItems };