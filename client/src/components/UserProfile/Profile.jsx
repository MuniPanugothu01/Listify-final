import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, getUserProfile } from "../../redux/slices/authSlice";
import {
  selectAllSavedItems,
} from "../../redux/selectors/forSaleSelectors";
import {
  unsaveItem,
} from "../../redux/slices/forSaleSlice";
import {
  Bell, 
  X, 
  Menu,
  FileText,
  Heart,
  MapPin,
  Home,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";

// Import components
import Sidebar from "../../components/UserProfile/Sidebar";
import HomeSection from "../../components/UserProfile/HomeSection";
import MessagesSection from "../../components/UserProfile/MessagesSection";
import PersonalDetailsSection from "../../components/UserProfile/PersonalDetailsSection";
import PropertyCard from "../../components/UserProfile/PropertyCard";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const devices = useSelector((state) => state.profile?.devices || []);
  
  const [activeSection, setActiveSection] = useState(
    location.state?.activeSection || "home"
  );

  // Merge Redux auth user with sensible defaults
  const user = {
    name: authUser?.name || "",
    email: authUser?.email || "",
    phone: authUser?.phone || "",
    address: authUser?.address || "",
    isLoggedIn: !!authUser,
    status: authUser?.status || "",
    createdAt: authUser?.createdAt || null,
    memberSince: authUser?.createdAt ? new Date(authUser.createdAt).getFullYear().toString() : "",
    verified: authUser?.isVerified || false,
    rating: authUser?.rating || null,
    bio: authUser?.bio || "",
    provider: authUser?.provider || "",
    isVerified: !!authUser?.isVerified,
    profilePic: authUser?.profileImage || authUser?.profileImageUrl || authUser?.googleProfileImage || authUser?.avatar,
  };
  const savedHouses = useSelector(selectAllSavedItems);
  const [myPosts, setMyPosts] = useState([]);
  const [myAlerts, setMyAlerts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState(
    authUser?.profileImage || authUser?.profileImageUrl || authUser?.googleProfileImage || authUser?.avatar || null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Saved items are now read from Redux (forSale slice, persisted via redux-persist)

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    setEditData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      bio: user.bio || ""
    });
  }, [user.name, user.email, user.phone, user.address, user.bio]);

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
        dispatch(updateUser({ profileImageUrl: newPreview }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    dispatch(updateUser(editData));
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
      bio: user.bio || ""
    });
  };

  const toggleSave = (house) => {
    dispatch(unsaveItem(house.id));
  };

  const counts = {
    posts: myPosts.length,
    saved: savedHouses.length,
    alerts: myAlerts.length
  };

  const mobileNavItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "posts", label: "Listings", icon: FileText },
    { id: "saved", label: "Saved", icon: Heart },
    { id: "messages", label: "Messages", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
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
              {['home', 'posts', 'saved', 'messages'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
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
              {profilePicPreview ? (
                <img 
                  src={profilePicPreview} 
                  alt="Profile" 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover border-2 border-white shadow-xs" 
                />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-xs">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user.name || "User"}</p>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16 max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-24 lg:pb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
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
          <main className="flex-1 space-y-6 w-full min-w-0">
            {activeSection === "home" && (
              <HomeSection
                savedHouses={savedHouses}
                myPosts={myPosts}
                myAlerts={myAlerts}
                messages={messages}
                onViewAll={setActiveSection}
                user={user}
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates about new listings</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive text message updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-gray-100 rounded-xl">
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
                <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity yet</h3>
                  <p className="text-gray-500 text-sm">Your account activity will appear here</p>
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
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 p-2 shadow-lg">
        <div className="grid grid-cols-4 gap-1">
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
              <span className="text-[10px] mt-1 w-full truncate text-center px-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>


    </div>
  );
}