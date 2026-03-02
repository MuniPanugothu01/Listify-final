import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Bell, 
  X, 
  Menu,
  FileText,
  Heart,
  Home,
  MessageCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";

// Import Redux actions
import { fetchProfile, updateProfile, setProfilePicPreview, uploadProfileImage, fetchDevices, fetchLoginHistory } from "../../redux/slices/profileSlice";
import { fetchSavedElectronics, toggleSaveElectronics, fetchMyElectronics, deleteElectronicsListing } from "../../redux/slices/electronicsSlice";
import { fetchSavedVehicles, toggleSaveVehicle, fetchMyVehicles, deleteVehicleListing } from "../../redux/slices/vehiclesSlice";

// Import components
import Sidebar from "../../components/UserProfile/Sidebar";
import ProfileOverview from "../../components/UserProfile/ProfileOverview";
import HomeSection from "../../components/UserProfile/HomeSection";
import MessagesSection from "../../components/UserProfile/MessagesSection";
import PersonalDetailsSection from "../../components/UserProfile/PersonalDetailsSection";
import PropertyCard from "../../components/UserProfile/PropertyCard";
import ProfileMain from "../../components/UserProfile/ProfileMin";
import DevicesSection from "../../components/UserProfile/DevicesSection";
import ActivitySection from "../../components/UserProfile/ActivitySection";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { section: urlSection } = useParams();
  const dispatch = useDispatch();

  // Map URL segments to internal section IDs
  const sectionFromUrl = {
    undefined: "home",
    "profile": "personal",
    "listings": "posts",
    "saved": "saved",
    "messages": "messages",
    "devices": "devices",
    "activity": "activity",
    "overview": "profile-overview",
    "alerts": "alerts",
    "settings": "settings",
    "security": "security",
  };

  // Reverse map: section ID -> URL segment
  const sectionToUrl = {
    "home": "",
    "personal": "profile",
    "posts": "listings",
    "saved": "saved",
    "messages": "messages",
    "devices": "devices",
    "activity": "activity",
    "profile-overview": "overview",
    "alerts": "alerts",
    "settings": "settings",
    "security": "security",
  };

  // Redux state
  const { user: authUser } = useSelector((state) => state.auth);
  const { profile, profilePicPreview, loading: profileLoading, imageUploading, devices, loginHistory } = useSelector((state) => state.profile);
  const { savedItems: savedElectronics, savedLoading, myListings, myListingsLoading } = useSelector((state) => state.electronics);
  const { savedItems: savedVehicles, savedLoading: savedVehiclesLoading, myListings: myVehicleListings, myListingsLoading: myVehiclesLoading } = useSelector((state) => state.vehicles);

  // Combine electronics + vehicles
  const allMyListings = [
    ...(myListings || []).map(item => ({ ...item, _listingType: 'electronics' })),
    ...(myVehicleListings || []).map(item => ({ ...item, _listingType: 'vehicles' })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const allSavedItems = [
    ...(savedElectronics || []).map(item => ({ ...item, _listingType: 'electronics' })),
    ...(savedVehicles || []).map(item => ({ ...item, _listingType: 'vehicles' })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const allMyListingsLoading = myListingsLoading || myVehiclesLoading;
  const allSavedLoading = savedLoading || savedVehiclesLoading;

  // Derive initial active section from URL param
  const initialSection = sectionFromUrl[urlSection] || location.state?.activeSection || "home";
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    dateOfBirth: "",
    gender: "",
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Mock data for now
  const [myAlerts, setMyAlerts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Fetch saved electronics + vehicles when saved tab is active
  useEffect(() => {
    if (activeSection === "saved" || activeSection === "home") {
      dispatch(fetchSavedElectronics());
      dispatch(fetchSavedVehicles());
    }
  }, [activeSection, dispatch]);

  // Fetch my listings (electronics + vehicles) when posts tab is active
  useEffect(() => {
    if (activeSection === "posts" || activeSection === "home") {
      dispatch(fetchMyElectronics());
      dispatch(fetchMyVehicles());
    }
  }, [activeSection, dispatch]);

  // Update edit data when profile changes
  useEffect(() => {
    if (profile) {
      setEditData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        bio: profile.bio || "",
        dateOfBirth: profile.dateOfBirth || "",
        gender: profile.gender || "",
      });
    }
  }, [profile]);

  // Sync active section from URL param changes
  useEffect(() => {
    const mapped = sectionFromUrl[urlSection];
    if (mapped && mapped !== activeSection) {
      setActiveSection(mapped);
    }
  }, [urlSection]);

  // Update active section from location state (legacy support)
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  // When activeSection changes, update the URL to match
  const handleSetActiveSection = (sectionId) => {
    setActiveSection(sectionId);
    const urlSegment = sectionToUrl[sectionId];
    const newPath = urlSegment ? `/dashboard/${urlSegment}` : "/dashboard";
    navigate(newPath, { replace: true });
  };

  const loadUserData = async () => {
    try {
      await dispatch(fetchProfile()).unwrap();
      await dispatch(fetchDevices()).unwrap();
      await dispatch(fetchLoginHistory()).unwrap();
      console.log("Profile data loaded successfully");
    } catch (error) {
      console.error("Failed to load profile data:", error);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result;
        dispatch(setProfilePicPreview(preview));
      };
      reader.readAsDataURL(file);
      
      // Upload to server
      dispatch(uploadProfileImage(file));
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProfile(editData)).unwrap();
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      bio: profile?.bio || "",
      dateOfBirth: profile?.dateOfBirth || "",
      gender: profile?.gender || "",
    });
  };

  const counts = {
    posts: allMyListings?.length || 0,
    saved: allSavedItems?.length || 0,
    alerts: myAlerts?.length || 0,
    messages: unreadCount || 0,
    devices: devices?.length || 0,
  };

  // Get profile image preview
  const getProfileImagePreview = () => {
    if (profilePicPreview) return profilePicPreview;
    if (profile?.profileImage) return profile.profileImage;
    if (profile?.profileImageUrl) return profile.profileImageUrl;
    if (profile?.googleProfileImage) return profile.googleProfileImage;
    if (profile?.avatar) return profile.avatar;
    if (authUser?.profileImageUrl) return authUser.profileImageUrl;
    if (authUser?.avatar) return authUser.avatar;
    return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";
  };

  // Mock data for home section
  const agendaEvents = {
    2: [
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
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face",
      },
    ],
    3: [
      {
        title: "Viewing with S. Green",
        time: "1:30-1:45",
        client: "S. Green",
        avatar: "https://images.unsplash.com/photo-1524504388940-b8e918bb7c5c?w=24&h=24&fit=crop&crop=face",
      },
    ],
  };

  const mobileNavItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "posts", label: "Listings", icon: FileText },
    { id: "saved", label: "Saved", icon: Heart },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "profile-overview", label: "Overview", icon: Calendar },
  ];

  if (profileLoading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between px-4">
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
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => handleSetActiveSection('alerts')}
              className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {counts.alerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {counts.alerts}
                </span>
              )}
            </button>
            
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSetActiveSection('personal')}>
              <img 
                src={getProfileImagePreview()} 
                alt="Profile" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover border-2 border-white shadow-xs" 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";
                }}
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{profile?.name || authUser?.name || "User"}</p>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {profile?.provider === "google" ? "Google Account" : "Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-4 container mx-auto px-1 py-6 mt-20">
        <div className="lg:flex gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 xl:w-72 flex-shrink-0">
            <Sidebar 
              activeSection={activeSection}
              setActiveSection={handleSetActiveSection}
              counts={counts}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
          
          {/* Main Content Area */}
          <main className="flex-1 lg:mr-6 space-y-6 w-full min-w-0">
            {activeSection === "home" && (
              <HomeSection
                savedHouses={allSavedItems || []}
                myPosts={allMyListings || []}
                myAlerts={myAlerts || []}
                messages={conversations || []}
                agendaEvents={agendaEvents}
                onViewAll={handleSetActiveSection}
                user={profile || authUser}
              />
            )}

            {activeSection === "messages" && (
              <MessagesSection messages={conversations || []} />
            )}

            {activeSection === "personal" && (
              <PersonalDetailsSection
                user={profile || authUser}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editData={editData}
                setEditData={setEditData}
                profilePicPreview={getProfileImagePreview()}
                handleProfilePicChange={handleProfilePicChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
                isUploading={imageUploading}
              />
            )}

            {activeSection === "devices" && (
              <DevicesSection devices={devices} />
            )}

            {activeSection === "activity" && (
              <ActivitySection loginHistory={loginHistory} />
            )}

            {activeSection === "profile-overview" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Overview</h2>
                  <p className="text-gray-500 text-sm mt-1">Your complete profile statistics and performance metrics</p>
                </div>
                <ProfileMain
                  user={profile || authUser} 
                  profilePic={getProfileImagePreview()} 
                  myPosts={allMyListings || []} 
                />
              </div>
            )}

            {activeSection === "saved" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Saved Items</h2>
                  <p className="text-gray-500 text-sm mt-1">{allSavedItems?.length || 0} items saved</p>
                </div>
                {allSavedLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
                  </div>
                ) : !allSavedItems || allSavedItems.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 md:w-12 md:h-12 text-emerald-500 fill-emerald-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">No saved items yet</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">Start saving listings you like to view them later!</p>
                    <button 
                      onClick={() => navigate('/electronics')}
                      className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
                    >
                      Browse Listings
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {allSavedItems.map((item) => (
                      <div
                        key={`${item._listingType}-${item._id}`}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                        onClick={() => navigate(`/${item._listingType}/${item._id}`)}
                      >
                        <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100">
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80'}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {item.condition && (
                            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700">
                              {item.condition}
                            </span>
                          )}
                          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full capitalize">
                            {item._listingType}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item._listingType === 'vehicles') dispatch(toggleSaveVehicle(item._id));
                              else dispatch(toggleSaveElectronics(item._id));
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                          >
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-bold text-emerald-600">${item.price}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{item.location || 'Unknown'}</span>
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
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">My Listings</h2>
                    <p className="text-gray-500 text-sm mt-1">{allMyListings?.length || 0} active listings</p>
                  </div>
                  <button 
                    onClick={() => navigate('/post-add')}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Post New Ad
                  </button>
                </div>
                {allMyListingsLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
                  </div>
                ) : !allMyListings || allMyListings.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-10 h-10 md:w-12 md:h-12 text-blue-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">No posts yet</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">Create your first listing to get started!</p>
                    <button 
                      onClick={() => navigate('/post-add')}
                      className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
                    >
                      Post New Ad
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {allMyListings.map((item) => (
                      <div
                        key={`${item._listingType}-${item._id}`}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                        onClick={() => navigate(`/${item._listingType}/${item._id}`)}
                      >
                        <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100">
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80'}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {item.condition && (
                            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700">
                              {item.condition}
                            </span>
                          )}
                          <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${
                            item.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            item.status === 'sold' ? 'bg-gray-100 text-gray-600' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status?.charAt(0).toUpperCase() + item.status?.slice(1) || 'Active'}
                          </span>
                          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full capitalize">
                            {item._listingType}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-bold text-emerald-600">${item.price}</span>
                            <span className="text-xs text-gray-400">{item.views || 0} views</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mb-3">
                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{item.location || 'Unknown'}</span>
                          </div>
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => navigate(`/${item._listingType}/${item._id}`)}
                              className="flex-1 py-2 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
                            >
                              View
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/edit-listing/${item._listingType}/${item._id}`)
                              }
                              className="flex-1 py-2 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                toast((t) => (
                                  <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-gray-900">Delete this listing?</p>
                                    <p className="text-xs text-gray-500">This action cannot be undone.</p>
                                    <div className="flex gap-2 mt-1">
                                      <button
                                        onClick={() => {
                                          toast.dismiss(t.id);
                                          const deleteAction = item._listingType === 'vehicles' ? deleteVehicleListing : deleteElectronicsListing;
                                          dispatch(deleteAction(item._id))
                                            .unwrap()
                                            .then(() => toast.success('Listing deleted successfully'))
                                            .catch((err) => toast.error(err || 'Failed to delete listing'));
                                        }}
                                        className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                      >
                                        Yes, Delete
                                      </button>
                                      <button
                                        onClick={() => toast.dismiss(t.id)}
                                        className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ), { duration: 10000 });
                              }}
                              className="flex-1 py-2 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Delete
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
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h2>
                  <p className="text-gray-500 text-sm mt-1">Manage your account preferences</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                  {/* Settings content */}
                </div>
              </div>
            )}

            {activeSection === "alerts" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No alerts yet</h3>
                <p className="text-gray-600 mb-6">Set up alerts for new listings that match your criteria!</p>
                <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium">
                  Set Up Alert
                </button>
              </div>
            )}

            {activeSection === "security" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Security</h2>
                  <p className="text-gray-500 text-sm mt-1">Manage your account security settings</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                  {/* Security content */}
                </div>
              </div>
            )}
          </main>

          {/* Right Profile Section */}
          {activeSection === "profile-overview" && (
            <div className="hidden xl:block w-80 flex-shrink-0">
              <ProfileOverview 
                user={profile || authUser} 
                profilePic={getProfileImagePreview()} 
                myPosts={myListings || []} 
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 p-2 shadow-lg">
        <div className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleSetActiveSection(item.id);
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


    </div>
  );
}