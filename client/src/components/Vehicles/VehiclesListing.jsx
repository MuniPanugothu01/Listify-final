import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Heart,
  MapPin,
  Search,
  ChevronRight,
  X,
  Filter,
  Car,
  Fuel,
  Gauge,
  Calendar,
  Cog,
  Loader2,
} from "lucide-react";
import { fetchAllVehicles, toggleSaveVehicle } from "../../redux/slices/vehiclesSlice";
import { VehicleGridSkeleton, ButtonSpinner } from '../common/Skeleton';

// Vehicle Card Component
const VehicleCard = ({ vehicle, onClick, onToggleSave, isSaved, user }) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const categoryIcons = {
    'Cars': <Car className="w-4 h-4" />,
    'Bikes': <Car className="w-4 h-4" />,
    'Cycle': <Car className="w-4 h-4" />,
    'Spare Parts': <Cog className="w-4 h-4" />,
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200 animate-fade-in-up"
    >
      <div className="relative pt-[75%] sm:pt-[75%] overflow-hidden bg-gray-100">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 skeleton-shimmer" />
        )}
        <img
          src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80'}
          alt={vehicle.title}
          className={`absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${!imgLoaded ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImgLoaded(true)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaving(true);
            if (onToggleSave) onToggleSave(vehicle._id);
            setTimeout(() => setSaving(false), 400);
          }}
          disabled={saving}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors z-10 disabled:opacity-70"
        >
          {saving ? (
            <ButtonSpinner size="xs" className="text-gray-500" />
          ) : (
            <Heart className={`w-4 h-4 ${isSaved ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'}`} />
          )}
        </button>
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full flex items-center z-10">
          {categoryIcons[vehicle.subcategory] || categoryIcons[vehicle.category] || <Car className="w-3 h-3 mr-1" />}
          <span className="ml-1">{vehicle.subcategory || vehicle.category}</span>
        </div>
      </div>

      <div className="p-3">
        {(vehicle.year || vehicle.kmDriven || vehicle.fuelType) && (
          <div className="flex items-center flex-wrap gap-x-1 text-xs text-gray-500 mb-2">
            {vehicle.year && (
              <>
                <Calendar className="w-3 h-3 mr-0.5" />
                <span>{vehicle.year}</span>
              </>
            )}
            {vehicle.year && vehicle.kmDriven && <span className="mx-0.5">•</span>}
            {vehicle.kmDriven && (
              <>
                <Gauge className="w-3 h-3 mr-0.5" />
                <span>{vehicle.kmDriven} km</span>
              </>
            )}
            {(vehicle.year || vehicle.kmDriven) && vehicle.fuelType && <span className="mx-0.5">•</span>}
            {vehicle.fuelType && (
              <>
                <Fuel className="w-3 h-3 mr-0.5" />
                <span>{vehicle.fuelType}</span>
              </>
            )}
          </div>
        )}

        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 min-h-[36px] leading-tight">
          {vehicle.title}
        </h3>
        {vehicle.brand && (
          <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded mb-1 inline-block">
            {vehicle.brand}
          </span>
        )}

        <div className="flex items-center justify-between mb-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ₹{typeof vehicle.price === 'number' ? vehicle.price.toLocaleString('en-IN') : vehicle.price}
          </span>
          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
            {vehicle.ownership || vehicle.condition}
          </span>
        </div>

        <div className="flex items-center text-xs text-gray-600 mt-1">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{vehicle.location}</span>
        </div>

        <div className="text-xs text-gray-400 mt-1">{vehicle.postedTime || ''}</div>
      </div>
    </div>
  );
};

// Main Vehicles Listing Component
const VehiclesListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listings, loading, error } = useSelector((state) => state.vehicles);
  const { user } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  // Fetch vehicles from API on mount
  useEffect(() => {
    dispatch(fetchAllVehicles());
  }, [dispatch]);

  // Get unique categories and years from fetched data
  const categories = [...new Set(listings.map(p => p.subcategory || p.category).filter(Boolean))];
  const years = [...new Set(listings.map(p => p.year).filter(Boolean))].sort((a, b) => b - a);

  const filteredVehicles = listings.filter((vehicle) => {
    if (searchQuery && !vehicle.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (priceMin && vehicle.price < parseFloat(priceMin)) {
      return false;
    }
    if (priceMax && vehicle.price > parseFloat(priceMax)) {
      return false;
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(vehicle.subcategory || vehicle.category)) {
      return false;
    }
    if (selectedYears.length > 0 && !selectedYears.includes(vehicle.year)) {
      return false;
    }
    return true;
  });

  // Sort
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortOption) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
      default: return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const handleVehicleClick = (vehicleId) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  const handleToggleSave = (id) => {
    if (!user) {
      navigate('/signin');
      return;
    }
    dispatch(toggleSaveVehicle(id));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleYearChange = (year) => {
    setSelectedYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
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
            <span className="text-gray-900 font-medium">Vehicles</span>
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
                Price range (₹)
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
            {categories.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Vehicle Type
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
            )}

            {/* Years */}
            {years.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Year
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                  {years.slice(0, 6).map((year) => (
                    <label key={year} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedYears.includes(year)}
                        onChange={() => handleYearChange(year)}
                        className="w-4 h-4 text-[#27bb97] border-gray-300 rounded focus:ring-[#27bb97]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{year}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchQuery("");
                setPriceMin("");
                setPriceMax("");
                setSelectedCategories([]);
                setSelectedYears([]);
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
                Vehicles
              </h1>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:flex-initial sm:min-w-[250px] lg:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search vehicles..."
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
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27bb97] focus:border-transparent w-full xs:w-auto min-w-[120px] sm:min-w-[180px]"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Results Count */}
            <div className="text-sm text-gray-600 mb-4 lg:hidden">
              {sortedVehicles.length} vehicles found
            </div>

            {/* Loading - Skeleton */}
            {loading && <VehicleGridSkeleton count={8} />}

            {/* Error */}
            {error && !loading && (
              <div className="text-center py-12">
                <div className="text-red-500 mb-2">Failed to load vehicles</div>
                <button
                  onClick={() => dispatch(fetchAllVehicles())}
                  className="text-[#27bb97] hover:text-[#1fa987] font-medium"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Vehicles Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {sortedVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle._id || vehicle.id}
                    vehicle={vehicle}
                    user={user}
                    isSaved={vehicle._saved || (user && vehicle.savedBy?.includes(user._id || user.id))}
                    onToggleSave={handleToggleSave}
                    onClick={() => handleVehicleClick(vehicle._id || vehicle.id)}
                  />
                ))}
              </div>
            )}

            {/* Desktop Results Count */}
            {!loading && !error && (
              <div className="mt-8 text-center text-gray-600 hidden lg:block">
                Showing {sortedVehicles.length} of {listings.length} vehicles
              </div>
            )}

            {/* No Results */}
            {!loading && !error && sortedVehicles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">No vehicles found</div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPriceMin("");
                    setPriceMax("");
                    setSelectedCategories([]);
                    setSelectedYears([]);
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

export default VehiclesListing;
