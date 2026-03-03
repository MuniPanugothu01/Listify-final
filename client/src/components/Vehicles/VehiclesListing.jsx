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
  Users,
  Cog,
  Shield,
  Loader2,
} from "lucide-react";
<<<<<<< HEAD

// Vehicles data
const vehiclesData = [
  {
    id: 1,
    title: "2022 Toyota Camry XLE",
    price: 24500,
    location: "Queens, NY",
    postedTime: "2 hours ago",
    condition: "Used",
    seller: "AutoDirect NYC",
    sellerRating: 4.8,
    sellerReviews: 342,
    sellerJoined: "Jan 2019",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    description:
      "2022 Toyota Camry XLE with only 18,500 miles. Excellent condition, one owner, no accidents. All maintenance records available.",
    features: [
      "18,500 Miles",
      "One Owner",
      "No Accidents",
      "Leather Seats",
      "Sunroof",
    ],
    category: "Sedan",
    mileage: "18,500",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2022",
    color: "Silver",
  },
  {
    id: 2,
    title: "2020 Honda CR-V EX",
    price: 26900,
    location: "Brooklyn, NY",
    postedTime: "5 hours ago",
    condition: "Used",
    seller: "City Auto Sales",
    sellerRating: 4.6,
    sellerReviews: 189,
    sellerJoined: "Mar 2020",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    description:
      "2020 Honda CR-V EX with 32,000 miles. Well-maintained SUV with all features working perfectly.",
    features: [
      "32,000 Miles",
      "AWD",
      "Backup Camera",
      "Bluetooth",
      "Heated Seats",
    ],
    category: "SUV",
    mileage: "32,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2020",
    color: "White",
  },
  {
    id: 3,
    title: "2023 Tesla Model 3",
    price: 38500,
    location: "Manhattan, NY",
    postedTime: "1 day ago",
    condition: "Used",
    seller: "Elite EV Motors",
    sellerRating: 4.9,
    sellerReviews: 456,
    sellerJoined: "Aug 2018",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    description:
      "2023 Tesla Model 3 with Enhanced Autopilot. Premium interior, long range battery.",
    features: [
      "12,000 Miles",
      "Enhanced Autopilot",
      "Premium Interior",
      "Long Range",
      "One Owner",
    ],
    category: "Electric",
    mileage: "12,000",
    transmission: "Automatic",
    fuelType: "Electric",
    year: "2023",
    color: "Red",
  },
  {
    id: 4,
    title: "2019 Ford F-150 XLT",
    price: 32900,
    location: "Staten Island, NY",
    postedTime: "3 hours ago",
    condition: "Used",
    seller: "Truck Masters",
    sellerRating: 4.7,
    sellerReviews: 234,
    sellerJoined: "Nov 2019",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    description:
      "2019 Ford F-150 XLT with 45,000 miles. Crew cab, 4x4, tow package included.",
    features: [
      "45,000 Miles",
      "4x4",
      "Crew Cab",
      "Tow Package",
      "Backup Camera",
    ],
    category: "Truck",
    mileage: "45,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2019",
    color: "Blue",
  },
  {
    id: 5,
    title: "2021 BMW 330i",
    price: 35900,
    location: "Long Island, NY",
    postedTime: "6 hours ago",
    condition: "Used",
    seller: "Luxury Auto Group",
    sellerRating: 4.8,
    sellerReviews: 312,
    sellerJoined: "Feb 2020",
    image:
      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&q=80",
    description:
      "2021 BMW 330i with M Sport package. Low miles, excellent condition.",
    features: [
      "22,000 Miles",
      "M Sport Package",
      "Premium Sound",
      "Navigation",
      "Heated Seats",
    ],
    category: "Luxury",
    mileage: "22,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2021",
    color: "Black",
  },
  {
    id: 6,
    title: "2018 Toyota RAV4 LE",
    price: 19900,
    location: "Bronx, NY",
    postedTime: "12 hours ago",
    condition: "Used",
    seller: "Family Auto Sales",
    sellerRating: 4.5,
    sellerReviews: 167,
    sellerJoined: "Jun 2021",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    description:
      "2018 Toyota RAV4 LE with 55,000 miles. Reliable SUV, great for families.",
    features: [
      "55,000 Miles",
      "Good Condition",
      "Backup Camera",
      "Bluetooth",
      "Spare Key",
    ],
    category: "SUV",
    mileage: "55,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2018",
    color: "Gray",
  },
  {
    id: 7,
    title: "2020 Subaru Outback",
    price: 27900,
    location: "Westchester, NY",
    postedTime: "1 day ago",
    condition: "Used",
    seller: "All-Wheel Auto",
    sellerRating: 4.7,
    sellerReviews: 278,
    sellerJoined: "Apr 2019",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    description:
      "2020 Subaru Outback with 28,000 miles. All-wheel drive, excellent for all weather.",
    features: [
      "28,000 Miles",
      "AWD",
      "EyeSight Safety",
      "Roof Rails",
      "All-Weather Mats",
    ],
    category: "Wagon",
    mileage: "28,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2020",
    color: "Green",
  },
  {
    id: 8,
    title: "2017 Honda Civic EX",
    price: 15900,
    location: "Jersey City, NJ",
    postedTime: "4 hours ago",
    condition: "Used",
    seller: "Economy Cars Inc",
    sellerRating: 4.4,
    sellerReviews: 145,
    sellerJoined: "Oct 2020",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    description:
      "2017 Honda Civic EX with 65,000 miles. Great fuel economy, reliable daily driver.",
    features: [
      "65,000 Miles",
      "Great MPG",
      "Backup Camera",
      "Sunroof",
      "Clean Interior",
    ],
    category: "Sedan",
    mileage: "65,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2017",
    color: "White",
  },
  {
    id: 9,
    title: "2021 Jeep Wrangler Sahara",
    price: 42900,
    location: "Rockland County, NY",
    postedTime: "8 hours ago",
    condition: "Used",
    seller: "Adventure Motors",
    sellerRating: 4.6,
    sellerReviews: 189,
    sellerJoined: "May 2019",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    description:
      "2021 Jeep Wrangler Sahara with 15,000 miles. 4x4, hard top, premium package.",
    features: [
      "15,000 Miles",
      "4x4",
      "Hard Top",
      "Premium Package",
      "Low Miles",
    ],
    category: "SUV",
    mileage: "15,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2021",
    color: "Black",
  },
  {
    id: 10,
    title: "2019 Mercedes-Benz C300",
    price: 34900,
    location: "Fairfield, CT",
    postedTime: "2 days ago",
    condition: "Used",
    seller: "European Auto Imports",
    sellerRating: 4.8,
    sellerReviews: 423,
    sellerJoined: "Jan 2018",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    description:
      "2019 Mercedes-Benz C300 with 30,000 miles. Luxury sedan in excellent condition.",
    features: [
      "30,000 Miles",
      "Premium Package",
      "Leather Interior",
      "Panoramic Roof",
      "Burmester Sound",
    ],
    category: "Luxury",
    mileage: "30,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2019",
    color: "Silver",
  },
  {
    id: 11,
    title: "2020 Hyundai Tucson SEL",
    price: 21900,
    location: "Newark, NJ",
    postedTime: "10 hours ago",
    condition: "Used",
    seller: "Value Auto Sales",
    sellerRating: 4.5,
    sellerReviews: 178,
    sellerJoined: "Mar 2021",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    description:
      "2020 Hyundai Tucson SEL with 35,000 miles. Great family SUV with warranty remaining.",
    features: [
      "35,000 Miles",
      "Warranty Remaining",
      "Apple CarPlay",
      "Heated Seats",
      "Blind Spot Monitor",
    ],
    category: "SUV",
    mileage: "35,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2020",
    color: "Blue",
  },
  {
    id: 12,
    title: "2016 Toyota Prius",
    price: 14900,
    location: "Queens, NY",
    postedTime: "5 hours ago",
    condition: "Used",
    seller: "Eco Auto Solutions",
    sellerRating: 4.3,
    sellerReviews: 132,
    sellerJoined: "Sep 2020",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    description:
      "2016 Toyota Prius with 75,000 miles. Excellent fuel economy, well-maintained.",
    features: [
      "75,000 Miles",
      "Great MPG",
      "Hybrid",
      "Backup Camera",
      "Clean History",
    ],
    category: "Hybrid",
    mileage: "75,000",
    transmission: "Automatic",
    fuelType: "Hybrid",
    year: "2016",
    color: "White",
  },
  {
    id: 13,
    title: "2022 Audi A4 Premium",
    price: 37900,
    location: "Manhattan, NY",
    postedTime: "3 hours ago",
    condition: "Used",
    seller: "Luxury Auto Group",
    sellerRating: 4.8,
    sellerReviews: 312,
    sellerJoined: "Feb 2020",
    image:
      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&q=80",
    description:
      "2022 Audi A4 Premium with 20,000 miles. Luxury sedan with advanced features.",
    features: [
      "20,000 Miles",
      "Premium Package",
      "Leather Interior",
      "Virtual Cockpit",
      "Bang & Olufsen Sound",
    ],
    category: "Luxury",
    mileage: "20,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2022",
    color: "Gray",
  },
  {
    id: 14,
    title: "2018 Nissan Rogue SV",
    price: 18900,
    location: "Brooklyn, NY",
    postedTime: "12 hours ago",
    condition: "Used",
    seller: "City Auto Sales",
    sellerRating: 4.6,
    sellerReviews: 189,
    sellerJoined: "Mar 2020",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    description:
      "2018 Nissan Rogue SV with 40,000 miles. Comfortable SUV with great features.",
    features: [
      "40,000 Miles",
      "SV Package",
      "Backup Camera",
      "Bluetooth",
      "Remote Start",
    ],
    category: "SUV",
    mileage: "40,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2018",
    color: "Silver",
  },
  {
    id: 15,
    title: "2019 Kia Soul +",
    price: 15900,
    location: "Jersey City, NJ",
    postedTime: "8 hours ago",
    condition: "Used",
    seller: "Economy Cars Inc",
    sellerRating: 4.4,
    sellerReviews: 145,
    sellerJoined: "Oct 2020",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    description:
      "2019 Kia Soul + with 30,000 miles. Unique design, great for city driving.",
    features: [
      "30,000 Miles",
      "Unique Design",
      "Backup Camera",
      "Touchscreen Display",
      "Bluetooth",
    ],
    category: "Wagon",
    mileage: "30,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2019",
    color: "Red",
  },
  {
    id: 16,
    title: "2020 Chevrolet Silverado 1500 LT",
    price: 33900,
    location: "Staten Island, NY",
    postedTime: "6 hours ago",
    condition: "Used",
    seller: "Truck Masters",
    sellerRating: 4.7,
    sellerReviews: 234,
    sellerJoined: "Nov 2019",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    description:
      "2020 Chevrolet Silverado 1500 LT with 25,000 miles. Powerful truck with great towing capacity.",
    features: [
      "25,000 Miles",
      "V8 Engine",
      "Crew Cab",
      "Tow Package",
      "Backup Camera",
    ],
    category: "Truck",
    mileage: "25,000",
    transmission: "Automatic",
    fuelType: "Gasoline",
    year: "2020",
    color: "Blue",
  },
];
=======
import { fetchAllVehicles, toggleSaveVehicle } from "../../redux/slices/vehiclesSlice";
import { VehicleGridSkeleton, ButtonSpinner } from '../common/Skeleton';
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19

// Vehicle Card Component
const VehicleCard = ({ vehicle, onClick, onToggleSave, isSaved, user }) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const categoryIcons = {
<<<<<<< HEAD
    Sedan: <Car className="w-4 h-4" />,
    SUV: <Users className="w-4 h-4" />,
    Electric: <Car className="w-4 h-4" />,
    Truck: <Car className="w-4 h-4" />,
    Luxury: <Shield className="w-4 h-4" />,
    Wagon: <Car className="w-4 h-4" />,
    Hybrid: <Fuel className="w-4 h-4" />,
=======
    'Sedan': <Car className="w-4 h-4" />,
    'SUV': <Users className="w-4 h-4" />,
    'Electric': <Car className="w-4 h-4" />,
    'Truck': <Car className="w-4 h-4" />,
    'Luxury': <Shield className="w-4 h-4" />,
    'Wagon': <Car className="w-4 h-4" />,
    'Hybrid': <Fuel className="w-4 h-4" />,
    'Cars': <Car className="w-4 h-4" />,
    'Motorcycles': <Car className="w-4 h-4" />,
    'Scooters': <Car className="w-4 h-4" />,
    'Bicycles': <Car className="w-4 h-4" />,
    'Spare Parts': <Cog className="w-4 h-4" />,
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200 animate-fade-in-up"
    >
      <div className="relative pt-[75%] sm:pt-[75%] overflow-hidden bg-gray-100">
<<<<<<< HEAD
=======
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 skeleton-shimmer" />
        )}
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
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

        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[36px] leading-tight">
          {vehicle.title}
        </h3>

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

<<<<<<< HEAD
  // Get unique categories and years
  const categories = [...new Set(vehiclesData.map((p) => p.category))];
  const years = [...new Set(vehiclesData.map((p) => p.year))].sort(
    (a, b) => b - a,
  );

  const filteredVehicles = vehiclesData.filter((vehicle) => {
    // Search filter
    if (
      searchQuery &&
      !vehicle.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Price filter
=======
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
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
    if (priceMin && vehicle.price < parseFloat(priceMin)) {
      return false;
    }
    if (priceMax && vehicle.price > parseFloat(priceMax)) {
      return false;
    }
<<<<<<< HEAD

    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(vehicle.category)
    ) {
      return false;
    }

    // Year filter
    if (selectedYears.length > 0 && !selectedYears.includes(vehicle.year)) {
      return false;
    }

=======
    if (selectedCategories.length > 0 && !selectedCategories.includes(vehicle.subcategory || vehicle.category)) {
      return false;
    }
    if (selectedYears.length > 0 && !selectedYears.includes(vehicle.year)) {
      return false;
    }
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
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
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleYearChange = (year) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
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
                Price range ($)
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
<<<<<<< HEAD
            <div className="mt-8 text-center text-gray-600 hidden lg:block">
              Showing {filteredVehicles.length} of {vehiclesData.length}{" "}
              vehicles
            </div>
=======
            {!loading && !error && (
              <div className="mt-8 text-center text-gray-600 hidden lg:block">
                Showing {sortedVehicles.length} of {listings.length} vehicles
              </div>
            )}
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19

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
<<<<<<< HEAD
export { vehiclesData };
=======
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
