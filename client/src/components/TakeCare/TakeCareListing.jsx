import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  Search,
  ChevronRight,
  X,
  Filter,
  User,
  Star,
  Clock,
  Shield,
  Baby,
  Users,
  PawPrint,
  Sparkles,
  Briefcase,
} from "lucide-react";

// Care Taker data
const careTakerData = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Experienced Nanny & Childcare Specialist",
    price: 25,
    location: "Manhattan, NYC",
    postedTime: "2 hours ago",
    experience: "8 years",
    rating: 4.9,
    reviews: 124,
    age: 32,
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
    description:
      "Certified professional nanny with extensive experience in childcare. Specialized in newborn care and early childhood development.",
    services: [
      "Newborn Care",
      "Toddler Activities",
      "Meal Preparation",
      "Educational Play",
      "Light Housekeeping",
    ],
    category: "Nanny",
    availability: "Full-time",
    languages: ["English", "Spanish"],
    certifications: ["CPR Certified", "Early Childhood Education"],
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Dedicated Babysitter & Tutor",
    price: 20,
    location: "Brooklyn, NY",
    postedTime: "5 hours ago",
    experience: "4 years",
    rating: 4.7,
    reviews: 89,
    age: 28,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    description:
      "Reliable babysitter with tutoring background. Great with school-age children and homework help.",
    services: [
      "Homework Help",
      "After-school Care",
      "Weekend Sitting",
      "Activity Planning",
      "Transportation",
    ],
    category: "Babysitter",
    availability: "Part-time",
    languages: ["English", "Mandarin"],
    certifications: ["First Aid Certified", "Teaching Certificate"],
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    title: "Compassionate Elder Care Provider",
    price: 30,
    location: "Queens, NY",
    postedTime: "1 day ago",
    experience: "12 years",
    rating: 4.8,
    reviews: 156,
    age: 45,
    image:
      "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=800&q=80",
    description:
      "Experienced elder care specialist with medical background. Patient and attentive to seniors' needs.",
    services: [
      "Medication Management",
      "Mobility Assistance",
      "Meal Preparation",
      "Companionship",
      "Doctor Appointments",
    ],
    category: "Elder Care",
    availability: "Full-time",
    languages: ["English", "Spanish"],
    certifications: ["CNA Certified", "Dementia Care", "CPR Certified"],
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Professional Pet Care Specialist",
    price: 18,
    location: "Upper West Side, NYC",
    postedTime: "3 hours ago",
    experience: "6 years",
    rating: 4.9,
    reviews: 203,
    age: 29,
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800&q=80",
    description:
      "Animal lover with professional pet care training. Experienced with all breeds and special needs pets.",
    services: [
      "Dog Walking",
      "Pet Sitting",
      "Grooming",
      "Medication Administration",
      "Overnight Care",
    ],
    category: "Pet Care",
    availability: "Flexible",
    languages: ["English"],
    certifications: [
      "Pet First Aid",
      "Animal Behavior",
      "Grooming Certification",
    ],
  },
  {
    id: 5,
    name: "Emma Thompson",
    title: "Loving Nanny & Newborn Specialist",
    price: 28,
    location: "Park Slope, Brooklyn",
    postedTime: "8 hours ago",
    experience: "10 years",
    rating: 4.8,
    reviews: 178,
    age: 35,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&q=80",
    description:
      "Specialized in newborn and infant care. Creating nurturing environments for early development.",
    services: [
      "Infant Care",
      "Sleep Training",
      "Developmental Activities",
      "Bottle Feeding",
      "Baby Laundry",
    ],
    category: "Nanny",
    availability: "Full-time",
    languages: ["English", "French"],
    certifications: [
      "Newborn Care Specialist",
      "Infant CPR",
      "Child Development",
    ],
  },
  {
    id: 6,
    name: "James Miller",
    title: "Energetic Babysitter & Sports Coach",
    price: 22,
    location: "Williamsburg, Brooklyn",
    postedTime: "12 hours ago",
    experience: "5 years",
    rating: 4.6,
    reviews: 67,
    age: 26,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    description:
      "Active babysitter who engages children in sports and outdoor activities. Great for active families.",
    services: [
      "Sports Activities",
      "Outdoor Play",
      "Healthy Cooking",
      "Homework Supervision",
      "Weekend Care",
    ],
    category: "Babysitter",
    availability: "Evenings & Weekends",
    languages: ["English"],
    certifications: ["Sports Coaching", "First Aid"],
  },
  {
    id: 7,
    name: "Patricia Lee",
    title: "Senior Companion & Caregiver",
    price: 32,
    location: "Upper East Side, NYC",
    postedTime: "6 hours ago",
    experience: "15 years",
    rating: 4.9,
    reviews: 234,
    age: 52,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    description:
      "Compassionate caregiver specializing in Alzheimer's and dementia care. Creating safe, engaging environments.",
    services: [
      "Dementia Care",
      "Memory Exercises",
      "Nutrition Planning",
      "Personal Care",
      "Therapy Exercises",
    ],
    category: "Elder Care",
    availability: "Live-in Available",
    languages: ["English", "Korean"],
    certifications: [
      "Alzheimer's Specialist",
      "Physical Therapy Aid",
      "Medication Certified",
    ],
  },
  {
    id: 8,
    name: "Robert Garcia",
    title: "Expert Dog Trainer & Pet Sitter",
    price: 35,
    location: "Chelsea, Manhattan",
    postedTime: "4 hours ago",
    experience: "8 years",
    rating: 4.8,
    reviews: 189,
    age: 31,
    image:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
    description:
      "Professional dog trainer offering specialized pet care services. Expert in behavior modification.",
    services: [
      "Dog Training",
      "Behavior Modification",
      "Agility Training",
      "Pet Boarding",
      "Special Needs Care",
    ],
    category: "Pet Care",
    availability: "Weekdays",
    languages: ["English", "Spanish"],
    certifications: [
      "Professional Dog Trainer",
      "Animal Psychology",
      "Behavior Specialist",
    ],
  },
  {
    id: 9,
    name: "Jennifer Park",
    title: "Multilingual Nanny & Tutor",
    price: 27,
    location: "Long Island City, Queens",
    postedTime: "1 day ago",
    experience: "7 years",
    rating: 4.7,
    reviews: 145,
    age: 30,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
    description:
      "Multilingual nanny offering language immersion and educational support for children.",
    services: [
      "Language Immersion",
      "Academic Tutoring",
      "Cultural Activities",
      "Art & Music",
      "Travel Companion",
    ],
    category: "Nanny",
    availability: "Full-time",
    languages: ["English", "Korean", "Japanese", "French"],
    certifications: ["Teaching Degree", "TEFL Certified", "Child Psychology"],
  },
  {
    id: 10,
    name: "Thomas Brown",
    title: "Retired Nurse - Elder Care Specialist",
    price: 40,
    location: "Westchester, NY",
    postedTime: "2 days ago",
    experience: "25 years",
    rating: 4.9,
    reviews: 312,
    age: 62,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    description:
      "Retired RN providing professional medical care for seniors at home. Extensive hospital experience.",
    services: [
      "Medical Care",
      "Wound Care",
      "Physical Therapy",
      "Medical Equipment",
      "24/7 Monitoring",
    ],
    category: "Elder Care",
    availability: "Full-time",
    languages: ["English"],
    certifications: [
      "Registered Nurse",
      "Geriatric Specialist",
      "Emergency Care",
    ],
  },
  {
    id: 11,
    name: "Lisa Martinez",
    title: "Cat Specialist & Pet Caregiver",
    price: 15,
    location: "Astoria, Queens",
    postedTime: "9 hours ago",
    experience: "4 years",
    rating: 4.8,
    reviews: 98,
    age: 27,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    description:
      "Cat lover specializing in feline care. Expert in cat behavior and special needs cats.",
    services: [
      "Cat Sitting",
      "Litter Maintenance",
      "Play Therapy",
      "Medication",
      "Multiple Cat Households",
    ],
    category: "Pet Care",
    availability: "Flexible",
    languages: ["English", "Spanish"],
    certifications: ["Feline Behavior", "Cat Grooming", "Special Needs Cats"],
  },
  {
    id: 12,
    name: "Kevin Wilson",
    title: "College Student Babysitter",
    price: 18,
    location: "East Village, NYC",
    postedTime: "5 hours ago",
    experience: "3 years",
    rating: 4.5,
    reviews: 56,
    age: 22,
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=800&q=80",
    description:
      "Education major offering fun, educational babysitting services. Great with school projects.",
    services: [
      "Homework Help",
      "STEM Activities",
      "Creative Arts",
      "Evening Care",
      "Summer Camp Activities",
    ],
    category: "Babysitter",
    availability: "Evenings & Weekends",
    languages: ["English"],
    certifications: ["Education Student", "First Aid", "Child Safety"],
  },
];

// Care Taker Card Component
const CareTakerCard = ({ careTaker, onClick }) => {
  const categoryIcons = {
    Nanny: <Baby className="w-4 h-4" />,
    Babysitter: <Users className="w-4 h-4" />,
    "Elder Care": <Shield className="w-4 h-4" />,
    "Pet Care": <PawPrint className="w-4 h-4" />,
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200"
    >
      <div className="relative pt-[75%] sm:pt-[75%] overflow-hidden bg-gray-100">
        <img
          src={careTaker.image}
          alt={careTaker.name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors z-10"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full flex items-center z-10">
          {categoryIcons[careTaker.category] || (
            <User className="w-3 h-3 mr-1" />
          )}
          <span className="ml-1">{careTaker.category}</span>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-sm">{careTaker.name}</h3>
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
            <span className="text-xs font-medium text-gray-700">
              {careTaker.rating}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({careTaker.reviews})
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {careTaker.title}
        </p>

        <div className="flex items-center justify-between mb-2">
          <span className="text-base sm:text-lg font-bold text-[#27bb97]">
            ${careTaker.price}
            <span className="text-xs text-gray-500 font-normal">/hr</span>
          </span>
          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
            <Briefcase className="w-3 h-3 inline mr-1" />
            {careTaker.experience}
          </span>
        </div>

        <div className="flex items-center text-xs text-gray-600 mt-1">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{careTaker.location}</span>
        </div>

        <div className="text-xs text-gray-400 mt-1">{careTaker.postedTime}</div>
      </div>
    </div>
  );
};

// Main Care Taker Listing Component
const CareTakerListing = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);

  // Get unique categories and availability options
  const categories = [...new Set(careTakerData.map((p) => p.category))];
  const availabilityOptions = [
    ...new Set(careTakerData.map((p) => p.availability)),
  ];

  const filteredCareTakers = careTakerData.filter((careTaker) => {
    // Search filter
    if (
      searchQuery &&
      !careTaker.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !careTaker.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Price filter
    if (priceMin && careTaker.price < parseFloat(priceMin)) {
      return false;
    }
    if (priceMax && careTaker.price > parseFloat(priceMax)) {
      return false;
    }

    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(careTaker.category)
    ) {
      return false;
    }

    // Availability filter
    if (
      selectedAvailability.length > 0 &&
      !selectedAvailability.includes(careTaker.availability)
    ) {
      return false;
    }

    return true;
  });

  const handleCareTakerClick = (careTakerId) => {
    navigate(`/takecare/${careTakerId}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability((prev) =>
      prev.includes(availability)
        ? prev.filter((a) => a !== availability)
        : [...prev, availability],
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
            <span className="text-gray-900 font-medium">Care Takers</span>
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
                Hourly Rate ($)
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
                Service Type
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

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Availability
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {availabilityOptions.map((availability) => (
                  <label key={availability} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAvailability.includes(availability)}
                      onChange={() => handleAvailabilityChange(availability)}
                      className="w-4 h-4 text-[#27bb97] border-gray-300 rounded focus:ring-[#27bb97]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {availability}
                    </span>
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
                setSelectedAvailability([]);
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
                Find Care Takers
              </h1>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:flex-initial sm:min-w-[250px] lg:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search care takers..."
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
                      <option>Rating: High to Low</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Experience</option>
                      <option>Recently Posted</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Results Count */}
            <div className="text-sm text-gray-600 mb-4 lg:hidden">
              {filteredCareTakers.length} care takers found
            </div>

            {/* Care Takers Grid */}
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredCareTakers.map((careTaker) => (
                <CareTakerCard
                  key={careTaker.id}
                  careTaker={careTaker}
                  onClick={() => handleCareTakerClick(careTaker.id)}
                />
              ))}
            </div>

            {/* Desktop Results Count */}
            <div className="mt-8 text-center text-gray-600 hidden lg:block">
              Showing {filteredCareTakers.length} of {careTakerData.length} care
              takers
            </div>

            {/* No Results */}
            {filteredCareTakers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">No care takers found</div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPriceMin("");
                    setPriceMax("");
                    setSelectedCategories([]);
                    setSelectedAvailability([]);
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

export default CareTakerListing;
export { careTakerData };
