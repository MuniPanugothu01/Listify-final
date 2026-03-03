<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
=======
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
import {
  Heart,
  MapPin,
  Search,
  ChevronRight,
  X,
  Filter,
  Star,
  Package,
  Clock,
<<<<<<< HEAD
} from "lucide-react";
=======
  Loader2,
} from 'lucide-react';
import {
  fetchAllElectronics,
  toggleSaveElectronics,
} from '../../redux/slices/electronicsSlice';
import { ProductGridSkeleton, ButtonSpinner } from '../common/Skeleton';
import OptimisedImage from '../common/OptimisedImage';
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19

// Product Card Component — memoised to prevent re-renders
const ProductCard = React.memo(({ product, onClick, onToggleSave, isSaved, isLoggedIn }) => {
  const [saving, setSaving] = React.useState(false);

  // Support both API data (product.images[]) and legacy data (product.image)
  const image = product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80';
  const displayPrice = product.price;
  const location = product.location || 'Unknown';
  const postedTime = product.postedTime || product.createdAt
    ? new Date(product.createdAt).toLocaleDateString()
    : '';

  const handleSave = async (e) => {
    e.stopPropagation();
    setSaving(true);
    if (onToggleSave) await onToggleSave(product._id || product.id);
    setTimeout(() => setSaving(false), 400);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200 animate-fade-in-up"
    >
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
        <OptimisedImage
          src={image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          wrapperClassName="w-full h-full"
        />
        {product.condition && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700">
            {product.condition}
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors disabled:opacity-70"
        >
          {saving ? (
            <ButtonSpinner size="xs" className="text-gray-500" />
          ) : (
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            />
          )}
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[36px] leading-tight">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ${displayPrice}
          </span>
        </div>

        <div className="flex items-center text-xs text-gray-600 mt-1">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <div className="text-xs text-gray-400 mt-1">{postedTime}</div>
      </div>
    </div>
  );
});

const ElectronicsListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listings, loading, error } = useSelector((state) => state.electronics);
  const { user } = useSelector((state) => state.auth);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [sortBy, setSortBy] = useState("recent");

  // Fetch electronics from API on mount
  useEffect(() => {
<<<<<<< HEAD
    localStorage.setItem("allElectronics", JSON.stringify(electronicsData));
  }, []);

  // Get unique categories and conditions
  const categories = [...new Set(electronicsData.map((p) => p.category))];
  const conditions = [...new Set(electronicsData.map((p) => p.condition))];

  const filteredProducts = electronicsData.filter((product) => {
    // Search filter
    if (
      searchQuery &&
      !product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
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
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    ) {
      return false;
    }

    // Condition filter
    if (
      selectedConditions.length > 0 &&
      !selectedConditions.includes(product.condition)
    ) {
      return false;
    }

    return true;
  });

  const handleProductClick = (product) => {
    // Store the selected product in localStorage
    localStorage.setItem("selectedElectronics", JSON.stringify(product));
    navigate(`/electronics/${product.id}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
=======
    dispatch(fetchAllElectronics());
  }, [dispatch]);

  // Memoised unique filter options from API data
  const categories = useMemo(
    () => [...new Set(listings.map(p => p.subcategory).filter(Boolean))],
    [listings]
  );
  const conditions = useMemo(
    () => [...new Set(listings.map(p => p.condition).filter(Boolean))],
    [listings]
  );

  // Memoised client-side filtering for real-time search/filter experience
  const filteredProducts = useMemo(() =>
    listings.filter((product) => {
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (priceMin && product.price < parseFloat(priceMin)) {
        return false;
      }
      if (priceMax && product.price > parseFloat(priceMax)) {
        return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.subcategory)) {
        return false;
      }
      if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) {
        return false;
      }
      return true;
    }),
    [listings, searchQuery, priceMin, priceMax, selectedCategories, selectedConditions]
  );

  // Memoised sort
  const sortedProducts = useMemo(() =>
    [...filteredProducts].sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      // default: newest first
      return new Date(b.createdAt) - new Date(a.createdAt);
    }),
    [filteredProducts, sortBy]
  );

  const handleProductClick = useCallback((product) => {
    navigate(`/electronics/${product._id || product.id}`);
  }, [navigate]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategories(prev =>
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }, []);

<<<<<<< HEAD
  const handleConditionChange = (condition) => {
    setSelectedConditions((prev) =>
=======
  const handleConditionChange = useCallback((condition) => {
    setSelectedConditions(prev =>
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
  }, []);

  const handleToggleSave = useCallback((id) => {
    if (!user) {
      navigate('/signin');
      return;
    }
    dispatch(toggleSaveElectronics(id));
  }, [user, navigate, dispatch]);

  return (
    <div className="min-h-screen">
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

            {conditions.length > 0 && (
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
            )}

            {categories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Subcategories
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
            )}

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
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27bb97] focus:border-transparent w-full xs:w-auto min-w-[120px] sm:min-w-[180px]"
                    >
                      <option value="recent">Recent first</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4 lg:hidden">
              {sortedProducts.length} items found
            </div>

            {/* Loading State - Skeleton */}
            {loading && <ProductGridSkeleton count={8} />}

<<<<<<< HEAD
            <div className="mt-8 text-center text-gray-600 hidden lg:block">
              Showing {filteredProducts.length} of {electronicsData.length}{" "}
              items
            </div>

            {filteredProducts.length === 0 && (
=======
            {/* Error State */}
            {error && !loading && (
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
              <div className="text-center py-12">
                <div className="text-red-500 mb-2">Failed to load electronics</div>
                <p className="text-gray-500 text-sm mb-4">{error}</p>
                <button
                  onClick={() => dispatch(fetchAllElectronics())}
                  className="text-[#27bb97] hover:text-[#1fa987] font-medium"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <>
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                      onToggleSave={handleToggleSave}
                      isSaved={
                        product._saved ||
                        (user && product.savedBy?.includes(user._id || user.id))
                      }
                      isLoggedIn={!!user}
                    />
                  ))}
                </div>

                <div className="mt-8 text-center text-gray-600 hidden lg:block">
                  Showing {sortedProducts.length} of {listings.length} items
                </div>

                {sortedProducts.length === 0 && listings.length > 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-2">No items match your filters</div>
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

                {sortedProducts.length === 0 && listings.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No electronics listed yet</h3>
                    <p className="text-gray-500 mb-6">Be the first to post an electronics listing!</p>
                    <button
                      onClick={() => navigate("/post-add")}
                      className="px-6 py-3 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] transition-colors font-medium"
                    >
                      Post Electronics Ad
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ElectronicsListing;
