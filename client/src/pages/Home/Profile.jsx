import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  X,
  Menu,
  FileText,
  Heart,
  MapPin,
  User,
  Star,
  ChevronDown,
  Home,
  Car,
  Briefcase,
  Calendar,
  Users,
  Wrench,
  HandHelping,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import UserProfile components
import Sidebar from "../../components/UserProfile/Sidebar";
import ProfileOverview from "../../components/UserProfile/ProfileOverview";
import HomeSection from "../../components/UserProfile/HomeSection";
import MessagesSection from "../../components/UserProfile/MessagesSection";
import PersonalDetailsSection from "../../components/UserProfile/PersonalDetailsSection";
import PropertyCard from "../../components/UserProfile/PropertyCard";
import SmallProfileHeader from "../../components/UserProfile/SmallProfileHeader";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState(
    location.state?.activeSection || "home",
  );
  const [selectedCategory, setSelectedCategory] = useState("for-sale"); // Default category
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Static data for different categories
  const [categoryData, setCategoryData] = useState({
    "for-sale": [
      {
        id: 1,
        title: "Modern Apartment for Sale",
        description: "Beautiful modern apartment with great views.",
        type: "sale",
        price: 350000,
        location: "San Francisco, CA",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
        ],
        category: "apartments",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1200,
        posted: "1 day ago",
      },
      {
        id: 2,
        title: "Luxury Villa",
        description: "Stunning luxury villa with pool and garden.",
        type: "sale",
        price: 1250000,
        location: "Los Angeles, CA",
        images: [
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
        ],
        category: "villas",
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3500,
        posted: "3 days ago",
      },
    ],
    "for-rent": [
      {
        id: 3,
        title: "Cozy Studio Apartment",
        description:
          "Perfect studio apartment for students or young professionals.",
        type: "rent",
        price: 1200,
        location: "New York, NY",
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
        ],
        category: "apartments",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 500,
        posted: "Today",
      },
      {
        id: 4,
        title: "Family House for Rent",
        description: "Spacious family house in a quiet neighborhood.",
        type: "rent",
        price: 2800,
        location: "Chicago, IL",
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
        ],
        category: "houses",
        bedrooms: 4,
        bathrooms: 2,
        sqft: 2000,
        posted: "2 days ago",
      },
    ],
    jobs: [
      {
        id: 5,
        title: "Software Developer",
        description:
          "Looking for experienced React developer for remote position.",
        type: "job",
        price: 95000,
        location: "Remote",
        images: [
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
        ],
        category: "tech",
        company: "Tech Corp",
        employmentType: "Full-time",
        posted: "1 week ago",
      },
      {
        id: 6,
        title: "Marketing Manager",
        description:
          "Marketing manager with 5+ years experience in digital marketing.",
        type: "job",
        price: 75000,
        location: "San Francisco, CA",
        images: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        ],
        category: "marketing",
        company: "Marketing Pro",
        employmentType: "Full-time",
        posted: "3 days ago",
      },
    ],
    cars: [
      {
        id: 7,
        title: "Toyota Camry 2022",
        description:
          "Like new Toyota Camry with low mileage and full service history.",
        type: "sale",
        price: 25000,
        location: "Miami, FL",
        images: [
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2074&auto=format&fit=crop",
        ],
        category: "sedan",
        mileage: "15,000",
        fuelType: "Hybrid",
        transmission: "Automatic",
        posted: "2 days ago",
      },
      {
        id: 8,
        title: "Honda Civic 2020",
        description: "Reliable Honda Civic in excellent condition.",
        type: "sale",
        price: 18000,
        location: "Dallas, TX",
        images: [
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1974&auto=format&fit=crop",
        ],
        category: "sedan",
        mileage: "30,000",
        fuelType: "Gasoline",
        transmission: "Manual",
        posted: "1 week ago",
      },
    ],
    services: [
      {
        id: 9,
        title: "Plumbing Services",
        description:
          "24/7 emergency plumbing services with licensed professionals.",
        type: "service",
        price: 80,
        location: "Seattle, WA",
        images: [
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2071&auto=format&fit=crop",
        ],
        category: "home-services",
        serviceType: "Plumbing",
        rating: 4.8,
        availability: "24/7",
        posted: "Today",
      },
      {
        id: 10,
        title: "Web Development",
        description:
          "Professional website development and maintenance services.",
        type: "service",
        price: 50,
        location: "Remote",
        images: [
          "https://images.unsplash.com/photo-1623282033815-40b05d96c903?q=80&w=2070&auto=format&fit=crop",
        ],
        category: "tech-services",
        serviceType: "Web Development",
        rating: 4.9,
        availability: "Business Hours",
        posted: "2 days ago",
      },
    ],
    roommates: [
      {
        id: 11,
        title: "Roommate Wanted",
        description:
          "Looking for a clean and responsible roommate for 2BR apartment.",
        type: "rent",
        price: 800,
        location: "Boston, MA",
        images: [
          "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=2070&auto=format&fit=crop",
        ],
        category: "roommates",
        roomType: "Private Room",
        moveInDate: "Immediate",
        genderPreference: "Any",
        posted: "Today",
      },
    ],
    takecare: [
      {
        id: 12,
        title: "Pet Sitting Services",
        description:
          "Experienced pet sitter available for dogs, cats, and other pets.",
        type: "service",
        price: 25,
        location: "Portland, OR",
        images: [
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2035&auto=format&fit=crop",
        ],
        category: "pet-care",
        serviceType: "Pet Sitting",
        rating: 5.0,
        availability: "Flexible",
        posted: "1 day ago",
      },
      {
        id: 13,
        title: "Child Care Available",
        description: "Certified child care provider with 10+ years experience.",
        type: "service",
        price: 20,
        location: "Denver, CO",
        images: [
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
        ],
        category: "child-care",
        serviceType: "Child Care",
        rating: 4.7,
        availability: "Weekdays",
        posted: "3 days ago",
      },
    ],
    events: [
      {
        id: 14,
        title: "Music Festival 2024",
        description: "Annual summer music festival featuring top artists.",
        type: "event",
        price: 99,
        location: "Austin, TX",
        images: [
          "https://images.unsplash.com/photo-1501281667305-0d4e3e211d37?q=80&w=2031&auto=format&fit=crop",
        ],
        category: "music",
        eventDate: "2024-07-15",
        eventTime: "6:00 PM",
        venue: "City Park",
        posted: "Today",
      },
      {
        id: 15,
        title: "Tech Conference",
        description:
          "Annual technology conference for developers and innovators.",
        type: "event",
        price: 299,
        location: "San Jose, CA",
        images: [
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
        ],
        category: "conference",
        eventDate: "2024-08-20",
        eventTime: "9:00 AM",
        venue: "Convention Center",
        posted: "1 week ago",
      },
    ],
  });

  // Category configuration with icons and display names
  const categories = [
    {
      id: "for-sale",
      name: "For Sale",
      icon: Home,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "for-rent",
      name: "For Rent",
      icon: Home,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "jobs",
      name: "Jobs",
      icon: Briefcase,
      color: "bg-purple-100 text-purple-800",
    },
    { id: "cars", name: "Cars", icon: Car, color: "bg-red-100 text-red-800" },
    {
      id: "services",
      name: "Services",
      icon: Wrench,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "roommates",
      name: "Roommates",
      icon: Users,
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      id: "takecare",
      name: "Take Care",
      icon: HandHelping,
      color: "bg-pink-100 text-pink-800",
    },
    {
      id: "events",
      name: "Events",
      icon: Calendar,
      color: "bg-orange-100 text-orange-800",
    },
  ];

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA",
    isLoggedIn: true,
    status: "Available",
    memberSince: "2023",
    verified: true,
    rating: 4.8,
  });
  const [savedHouses, setSavedHouses] = useState([]);
  const [myPosts, setMyPosts] = useState([
    {
      id: 1,
      title: "Cozy Apartment in Downtown",
      description:
        "A beautiful and cozy apartment located in the heart of the city.",
      type: "rent",
      price: 2500,
      location: "San Francisco, CA",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      ],
      category: "apartments",
      bedrooms: 2,
      bathrooms: 1,
      sqft: 850,
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Spacious Suburban House",
      description:
        "A spacious house perfect for families, located in a quiet suburb.",
      type: "sale",
      price: 550000,
      location: "San Jose, CA",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      ],
      category: "houses",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2200,
      posted: "1 week ago",
    },
  ]);
  const [myAlerts, setMyAlerts] = useState([]);
  const [messages, setMessages] = useState([
    {
      name: "Alice Brown",
      preview: "Interested in the downtown apartment...",
      time: "11:01",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    {
      name: "Bob Smith",
      preview: "Thanks for the update on villa...",
      time: "09:38",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      name: "Carol Johnson",
      preview: "Scheduling a viewing...",
      time: "09:38",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data for home section - ADDED BACK THESE VARIABLES
  const agendaEvents = {
    2: [
      // Wednesday
      {
        title: "Group Viewing Tour",
        time: "12:30-1:30",
        group: true,
        avatars: [
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=20&h=20",
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=20&h=20",
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20",
        ],
      },
      {
        title: "Viewing with T. Morgan",
        time: "1:40-1:45",
        client: "T. Morgan",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face",
      },
    ],
    3: [
      // Thursday
      {
        title: "Viewing with S. Green",
        time: "1:30-1:45",
        client: "S. Green",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b8e918bb7c5c?w=24&h=24&fit=crop&crop=face",
      },
    ],
  };

  const viewingRequests = [
    {
      client: "James Patel",
      time: "Today, 3:00",
      type: "Apartment Viewing",
      status: "Approved",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
      client: "Hannah Collins",
      time: "Tomorrow, 6:30",
      type: "Villa Tour",
      status: "Pending",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b8e918bb7c5c?w=40&h=40&fit=crop&crop=face",
    },
    {
      client: "Sara Kim",
      time: "Fri, 10:00",
      type: "Property Inspection",
      status: "Declined",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
  ];

  // Load user details from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.profilePic) {
          setProfilePicPreview(parsedUser.profilePic);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  // Load saved items from localStorage
  useEffect(() => {
    const loadSavedItems = () => {
      try {
        const savedItems = JSON.parse(
          localStorage.getItem("savedItems") || "[]",
        );
        setSavedHouses(savedItems);
      } catch (error) {
        console.error("Error loading saved items:", error);
        setSavedHouses([]);
      }
    };

    loadSavedItems();

    // Listen for changes to saved items
    const handleSavedItemsChange = () => {
      loadSavedItems();
    };

    window.addEventListener("savedItemsChanged", handleSavedItemsChange);

    return () => {
      window.removeEventListener("savedItemsChanged", handleSavedItemsChange);
    };
  }, []);

  useEffect(() => {
    setEditData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });
  }, [user]);

  // Update activeSection when location state changes
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
      // Clear the state after using it to prevent sticking on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreview = reader.result;
        setProfilePicPreview(newPreview);
        setEditData({ ...editData, profilePic: newPreview });
        // Update user in localStorage
        const updatedUser = { ...user, profilePic: newPreview };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...editData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  };

  const toggleSave = (item) => {
    const updatedSavedHouses = savedHouses.filter((h) => h.id !== item.id);
    setSavedHouses(updatedSavedHouses);

    // Also update localStorage
    localStorage.setItem("savedItems", JSON.stringify(updatedSavedHouses));
    window.dispatchEvent(new CustomEvent("savedItemsChanged"));
  };

  const counts = {
    posts: myPosts.length,
    saved: savedHouses.length,
    alerts: myAlerts.length,
  };

  // Get current category data
  const currentCategoryData = categoryData[selectedCategory] || [];
  const selectedCategoryInfo = categories.find(
    (cat) => cat.id === selectedCategory,
  );

  // Helper functions for item display
  const getPriceDisplay = (item) => {
    if (!item.price) return "Price not specified";
    const price =
      typeof item.price === "number"
        ? item.price
        : parseFloat(item.price.replace(/[^\d.]/g, ""));
    if (isNaN(price)) return "Price not specified";

    if (item.type === "rent") return `$${price}/mo`;
    if (item.type === "job") return `$${price.toLocaleString()}/year`;
    if (item.type === "service") return `$${price}/hour`;
    if (item.type === "event") return `From $${price}`;
    return `$${price.toLocaleString()}`;
  };

  const getTypeDisplay = (item) => {
    const typeMap = {
      rent: "For Rent",
      sale: "For Sale",
      job: "Job",
      service: "Service",
      event: "Event",
    };
    return typeMap[item.type] || item.type || "Item";
  };

  const getLocationDisplay = (item) =>
    item.location ? item.location.split(",")[0] : "N/A";

  // Render additional details based on category
  const renderAdditionalDetails = (item) => {
    switch (selectedCategory) {
      case "jobs":
        return (
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{item.company}</span>
            <span className="mx-2">•</span>
            <span>{item.employmentType}</span>
          </div>
        );
      case "cars":
        return (
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <span>{item.mileage} miles</span>
            <span className="mx-2">•</span>
            <span>{item.fuelType}</span>
          </div>
        );
      case "services":
        return (
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            <span>{item.rating}</span>
            <span className="mx-2">•</span>
            <span>{item.serviceType}</span>
          </div>
        );
      case "events":
        return (
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{item.eventDate}</span>
            <span className="mx-2">•</span>
            <span>{item.venue}</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsCategoryDropdownOpen(false);
  };

  const handleViewAll = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white shadow-sm border-b border-gray-200 px-1 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <h1
              className="text-xl font-bold text-blue-700 sm:text-2xl flex-shrink-0 cursor-pointer hover:text-blue-800 transition-colors"
              onClick={() => navigate("/")}
            >
              Listify
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveSection("alerts")}
              className="relative p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {counts.alerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {counts.alerts > 99 ? "99+" : counts.alerts}
                </span>
              )}
            </button>
            <SmallProfileHeader profilePic={profilePicPreview} />
          </div>
        </div>
      </header>

      <div className="pt-4 container mx-auto px-1 py-6 mt-4">
        <div className="lg:flex gap-6">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            counts={counts}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          <main className="flex-1 lg:mr-6 space-y-6 w-full">
            {activeSection === "home" && (
              <HomeSection
                savedHouses={savedHouses}
                myPosts={myPosts}
                myAlerts={myAlerts}
                messages={messages}
                agendaEvents={agendaEvents}
                viewingRequests={viewingRequests}
                onViewAll={handleViewAll}
              />
            )}

            {activeSection === "messages" && (
              <MessagesSection messages={messages} />
            )}

            {activeSection === "personal" && (
              <PersonalDetailsSection
                user={user}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editData={editData}
                setEditData={setEditData}
                profilePicPreview={profilePicPreview}
                handleProfilePicChange={handleProfilePicChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            )}

            {activeSection === "saved" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Saved Items
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {savedHouses.length} properties saved
                  </p>
                </div>
                {savedHouses.length === 0 ? (
                  <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No saved items yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start saving properties you love!
                    </p>
                    <button
                      onClick={() => navigate("/roommate-details")}
                      className="px-6 py-3 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] transition-colors font-medium border border-[#27bb97] cursor-pointer"
                    >
                      Browse Properties
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {savedHouses.map((house) => (
                      <div
                        key={house.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-all duration-300"
                      >
                        <div className="relative">
                          <img
                            src={
                              house.images?.[0] ||
                              "https://via.placeholder.com/300x200?text=No+Image"
                            }
                            alt={house.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                house.type === "rent"
                                  ? "bg-blue-100 text-blue-800"
                                  : house.type === "sale"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {getTypeDisplay(house)}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <button
                              onClick={() => toggleSave(house)}
                              className="p-2 rounded-full bg-white hover:bg-gray-50 transition-colors border border-gray-200"
                            >
                              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                            {house.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                            {house.description}
                          </p>
                          <div className="flex items-center text-gray-500 mb-3 text-sm">
                            <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                            <span>{getLocationDisplay(house)}</span>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-bold text-green-600">
                              {getPriceDisplay(house)}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/${house.category || "houses"}/${house.id}`,
                                )
                              }
                              className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm border border-blue-600"
                            >
                              View Details
                            </button>
                            <a
                              href={`mailto:${house.contactEmail || "contact@example.com"}?subject=Inquiry about ${house.title}`}
                              className="flex-1 border border-blue-600 text-blue-600 text-center py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium text-sm"
                            >
                              Contact
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === "posts" && (
              <div>
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="w-full sm:w-auto">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      My Posts ({myPosts.length})
                    </h2>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                    {/* Category Dropdown */}
                    <div className="relative w-full sm:w-48">
                      <button
                        onClick={() =>
                          setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                        }
                        className="flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors w-full min-w-[200px]"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {selectedCategoryInfo && (
                            <>
                              {React.createElement(selectedCategoryInfo.icon, {
                                className: "w-4 h-4 flex-shrink-0",
                              })}
                              <span className="text-sm font-medium truncate">
                                {selectedCategoryInfo.name}
                              </span>
                            </>
                          )}
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isCategoryDropdownOpen && (
                        <>
                          {/* Backdrop for closing dropdown on click outside */}
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsCategoryDropdownOpen(false)}
                          />
                          <div className="absolute top-full left-0 mt-1 w-full sm:w-56 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                            {categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() =>
                                  handleCategoryChange(category.id)
                                }
                                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                                  selectedCategory === category.id
                                    ? "bg-gray-50"
                                    : ""
                                }`}
                              >
                                {React.createElement(category.icon, {
                                  className: "w-4 h-4 flex-shrink-0",
                                })}
                                <span className="text-sm truncate">
                                  {category.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <button className="px-6 py-2.5 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] transition-colors font-medium border border-[#27bb97] w-full sm:w-auto min-w-[140px] cursor-pointer text-sm sm:text-base whitespace-nowrap">
                      Post New Ad
                    </button>
                  </div>
                </div>

                {/* Category Display */}
                {selectedCategoryInfo && (
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${selectedCategoryInfo.color}`}
                    >
                      {React.createElement(selectedCategoryInfo.icon, {
                        className: "w-5 h-5",
                      })}
                      <span className="font-medium">
                        {selectedCategoryInfo.name}
                      </span>
                      <span className="text-sm opacity-80">
                        ({currentCategoryData.length} items)
                      </span>
                    </div>
                  </div>
                )}

                {currentCategoryData.length === 0 ? (
                  <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No posts in this category
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Create your first{" "}
                      {selectedCategoryInfo?.name.toLowerCase()} listing!
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium border border-blue-600">
                      Post New Ad
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {currentCategoryData.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-all duration-300"
                      >
                        <div className="relative">
                          <img
                            src={
                              item.images?.[0] ||
                              "https://via.placeholder.com/300x200?text=No+Image"
                            }
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                item.type === "rent"
                                  ? "bg-blue-100 text-blue-800"
                                  : item.type === "sale"
                                    ? "bg-green-100 text-green-800"
                                    : item.type === "job"
                                      ? "bg-purple-100 text-purple-800"
                                      : item.type === "service"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : item.type === "event"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {getTypeDisplay(item)}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <button
                              onClick={() => toggleSave(item)}
                              className="p-2 rounded-full bg-white hover:bg-gray-50 transition-colors border border-gray-200"
                            >
                              <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Additional details based on category */}
                          {renderAdditionalDetails(item)}

                          <div className="flex items-center text-gray-500 mb-3 text-sm">
                            <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                            <span>{getLocationDisplay(item)}</span>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-bold text-green-600">
                              {getPriceDisplay(item)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {item.posted}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {}}
                              className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm border border-blue-600"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => {}}
                              className="flex-1 border border-blue-600 text-blue-600 text-center py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium text-sm"
                            >
                              Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === "settings" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Settings
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your account preferences
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Email Notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Receive updates about new listings
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alerts" && (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No alerts yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Set up alerts for new listings!
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium border border-blue-600">
                  Set Up Alert
                </button>
              </div>
            )}

            {activeSection === "activity" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:text-3xl">
                  Account Activity
                </h2>
                <p className="text-gray-600">
                  Recent activity will be shown here.
                </p>
              </div>
            )}

            {activeSection === "security" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:text-3xl">
                  Security
                </h2>
                <p className="text-gray-600">
                  Security settings will be managed here.
                </p>
              </div>
            )}
          </main>

          {activeSection === "profile-overview" && (
            <div>
              <ProfileOverview
                user={user}
                profilePic={profilePicPreview}
                myPosts={myPosts}
                onToggleSave={toggleSave}
              />
            </div>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
