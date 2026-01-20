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
  Search,
  Home,
  MessageCircle,
  Settings,
  Calendar
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components
import Sidebar from "../../components/UserProfile/Sidebar";
import ProfileOverview from "../../components/UserProfile/ProfileOverview"; // Changed from RightProfileSection
import HomeSection from "../../components/UserProfile/HomeSection";
import MessagesSection from "../../components/UserProfile/MessagesSection";
import PersonalDetailsSection from "../../components/UserProfile/PersonalDetailsSection";
import PropertyCard from "../../components/UserProfile/PropertyCard";
import ProfileMain from "./ProfileMin";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeSection, setActiveSection] = useState(
    location.state?.activeSection || "home"
  );
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
    bio: "Professional real estate agent with 8+ years experience"
  });
  const [savedHouses, setSavedHouses] = useState([]);
  const [myPosts, setMyPosts] = useState([
    { 
      id: 1, 
      title: "Cozy Apartment in Downtown", 
      description: "A beautiful and cozy apartment located in the heart of the city.", 
      type: "rent", 
      price: 2500, 
      location: "San Francisco, CA", 
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"], 
      category: "apartments",
      bedrooms: 2,
      bathrooms: 1,
      sqft: 850,
      posted: "2 days ago",
      views: 245,
      featured: true
    },
    { 
      id: 2, 
      title: "Spacious Suburban House", 
      description: "A spacious house perfect for families, located in a quiet suburb.", 
      type: "sale", 
      price: 550000, 
      location: "San Jose, CA", 
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"], 
      category: "houses",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2200,
      posted: "1 week ago",
      views: 189,
      featured: false
    }
  ]);
  const [myAlerts, setMyAlerts] = useState([1, 2, 3]);
  const [messages, setMessages] = useState([
    { name: "Alice Brown", preview: "Interested in the downtown apartment...", time: "11:01", unread: true, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
    { name: "Bob Smith", preview: "Thanks for the update on villa...", time: "09:38", unread: false, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    { name: "Carol Johnson", preview: "Scheduling a viewing...", time: "09:38", unread: false, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Load user details
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.profilePic) {
          setProfilePicPreview(parsedUser.profilePic);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
  }, []);

  // Load saved items
  useEffect(() => {
    const loadSavedItems = () => {
      try {
        const savedItems = JSON.parse(localStorage.getItem("savedItems") || "[]");
        setSavedHouses(savedItems);
      } catch (error) {
        console.error('Error loading saved items:', error);
        setSavedHouses([]);
      }
    };

    loadSavedItems();
    window.addEventListener("savedItemsChanged", loadSavedItems);
    return () => window.removeEventListener("savedItemsChanged", loadSavedItems);
  }, []);

  useEffect(() => {
    setEditData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      bio: user.bio || "Professional real estate agent with 8+ years experience"
    });
  }, [user]);

  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
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
        const updatedUser = { ...user, profilePic: newPreview };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...editData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
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
      bio: user.bio || "Professional real estate agent with 8+ years experience"
    });
  };

  const toggleSave = (house) => {
    const updatedSavedHouses = savedHouses.filter(h => h.id !== house.id);
    setSavedHouses(updatedSavedHouses);
    localStorage.setItem("savedItems", JSON.stringify(updatedSavedHouses));
    window.dispatchEvent(new CustomEvent("savedItemsChanged"));
  };

  const counts = {
    posts: myPosts.length,
    saved: savedHouses.length,
    alerts: myAlerts.length
  };

  const agendaEvents = {
    2: [ // Wednesday
      { title: "Group Viewing Tour", time: "12:30-1:30", group: true, avatars: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?w=20&h=20", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=20&h=20", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20"] },
      { title: "Viewing with T. Morgan", time: "1:40-1:45", client: "T. Morgan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face" }
    ],
    3: [ // Thursday
      { title: "Viewing with S. Green", time: "1:30-1:45", client: "S. Green", avatar: "https://images.unsplash.com/photo-1524504388940-b8e918bb7c5c?w=24&h=24&fit=crop&crop=face" }
    ]
  };

  const getPriceDisplay = (item) => {
    if (!item.price) return "Price not specified";
    const price = typeof item.price === "number" ? item.price : parseFloat(item.price.replace(/[^\d.]/g, ""));
    if (isNaN(price)) return "Price not specified";
    return item.type === "rent" ? `$${price}/mo` : `$${price.toLocaleString()}`;
  };

  const getLocationDisplay = (item) => item.location ? item.location.split(",")[0] : "N/A";

  // Mobile navigation items - updated to include Profile Overview
  const mobileNavItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "posts", label: "Listings", icon: FileText },
    { id: "saved", label: "Saved", icon: Heart },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "profile-overview", label: "Overview", icon: Calendar } // Added Profile Overview
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Section */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
            <h1 
              className="text-xl md:text-2xl font-bold text-emerald-700 cursor-pointer hover:text-emerald-800 transition-colors"
              onClick={() => navigate('/')}
            >
              Listify
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 ml-6">
              {['home', 'posts', 'saved', 'messages', 'profile-overview'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {section === 'profile-overview' ? 'Overview' : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            {isSearchVisible ? (
              <div className="absolute top-full left-0 right-0 bg-white p-4 border-b border-gray-200 shadow-lg lg:hidden">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search properties, messages..."
                      className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  <button 
                    onClick={() => setIsSearchVisible(false)}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchVisible(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Desktop Search */}
            <div className="hidden lg:block relative w-64">
              <input
                type="text"
                placeholder="Search properties, messages..."
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all text-sm"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <button 
              onClick={() => setActiveSection('alerts')}
              className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {counts.alerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {counts.alerts}
                </span>
              )}
            </button>
            
            {/* Profile Dropdown Trigger */}
            <div className="flex items-center gap-2">
              <img 
                src={profilePicPreview} 
                alt="Profile" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover border-2 border-white shadow-xs" 
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16 max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="lg:flex gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 xl:w-72 flex-shrink-0">
            <Sidebar 
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              counts={counts}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
          
          {/* Main Content Area */}
          <main className="flex-1 lg:mr-6 space-y-6 w-full min-w-0">
            {activeSection === "home" && (
              <HomeSection
                savedHouses={savedHouses}
                myPosts={myPosts}
                myAlerts={myAlerts}
                messages={messages}
                agendaEvents={agendaEvents}
                onViewAll={setActiveSection}
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

            {activeSection === "profile-overview" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Overview</h2>
                  <p className="text-gray-500 text-sm mt-1">Your complete profile statistics and performance metrics</p>
                </div>
                <ProfileMain
                  user={user} 
                  profilePic={profilePicPreview} 
                  myPosts={myPosts} 
                />
              </div>
            )}

            {activeSection === "saved" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Saved Items</h2>
                  <p className="text-gray-500 text-sm mt-1">{savedHouses.length} properties saved</p>
                </div>
                {savedHouses.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 md:w-12 md:h-12 text-emerald-500 fill-emerald-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">No saved items yet</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">Start saving properties you love to view them later!</p>
                    <button 
                      onClick={() => navigate('/roommate-details')}
                      className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
                    >
                      Browse Properties
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {savedHouses.map((house) => (
                      <PropertyCard 
                        key={house.id}
                        property={house}
                        onToggleSave={() => toggleSave(house)}
                        showSaveButton={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === "posts" && (
              <div>
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">My Listings</h2>
                    <p className="text-gray-500 text-sm mt-1">{myPosts.length} active listings</p>
                  </div>
                  <button className="w-full sm:w-auto px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    Post New Ad
                  </button>
                </div>
                {myPosts.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-10 h-10 md:w-12 md:h-12 text-blue-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">No posts yet</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">Create your first listing to get started!</p>
                    <button className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold">
                      Post New Ad
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {myPosts.map((post) => (
                      <PropertyCard 
                        key={post.id} 
                        property={post} 
                        isMyPost={true}
                        onToggleSave={() => {}}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === "settings" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h2>
                  <p className="text-gray-500 text-sm mt-1">Manage your account preferences</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates about new listings</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive text message updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-500">Receive browser notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "alerts" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-10 h-10 md:w-12 md:h-12 text-amber-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">No alerts yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Set up alerts for new listings that match your criteria!</p>
                <button className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold">
                  Set Up Alert
                </button>
              </div>
            )}

            {activeSection === "activity" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Account Activity</h2>
                  <p className="text-gray-500 text-sm mt-1">Recent account activities and history</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="space-y-4">
                    {[
                      { action: "Logged in", time: "Just now", icon: "👤" },
                      { action: "Viewed property listing", time: "2 hours ago", icon: "👁️" },
                      { action: "Saved a property", time: "4 hours ago", icon: "❤️" },
                      { action: "Posted new listing", time: "Yesterday", icon: "📝" },
                      { action: "Updated profile", time: "2 days ago", icon: "⚙️" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )} 

            {activeSection === "security" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Security</h2>
                  <p className="text-gray-500 text-sm mt-1">Manage your account security settings</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                  <div className="p-4 border border-gray-100 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-2">Change Password</h3>
                    <p className="text-sm text-gray-500 mb-4">Update your password regularly for better security</p>
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
                      Change Password
                    </button>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                    <button className="px-4 py-2 border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-medium">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )} 
          </main>

          {/* Right Profile Section - Hidden on mobile, visible on large screens */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <ProfileOverview 
              user={user} 
              profilePic={profilePicPreview} 
              myPosts={myPosts} 
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 p-2 shadow-lg">
        <div className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
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