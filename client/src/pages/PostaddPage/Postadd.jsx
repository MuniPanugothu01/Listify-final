import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  Wrench, 
  ShoppingBag,
  Car,
  Users,
  MapPin,
  Phone,
  Mail,
  User,
  DollarSign,
  X,
  Camera,
  Upload,
  Check,
  ChevronRight,
  Package,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  PlusCircle,
  Image as ImageIcon,
  Tag,
  Heart
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const PostAdPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    name: '',
    phone: '',
    email: ''
  });

  const categories = [
     { 
      id: 1, 
      name: 'For Sale', 
      icon: <ShoppingBag className="w-6 h-6" />, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      subcategories: ['Electronics', 'Furniture', 'Clothing', 'Books', 'Sports']
    },
     { 
      id: 2, 
      name: 'Vehicles', 
      icon: <Car className="w-6 h-6" />, 
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      subcategories: ['Cars', 'Motorcycles', 'Trucks', 'Boats', 'Parts']
    },
    { 
      id: 3, 
      name: 'Events', 
      icon: <Users className="w-6 h-6" />, 
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      subcategories: ['Concerts', 'Workshops', 'Festivals', 'Sports', 'Parties']
    },
    { 
      id: 4, 
      name: 'Housing', 
      icon: <Home className="w-6 h-6" />, 
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      subcategories: ['Apartment', 'House', 'Room', 'Commercial', 'Land']
    },
    { 
      id: 5, 
      name: 'Jobs', 
      icon: <Briefcase className="w-6 h-6" />, 
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      subcategories: ['Full Time', 'Part Time', 'Contract', 'Remote', 'Internship']
    },
    { 
      id: 6, 
      name: 'Services', 
      icon: <Wrench className="w-6 h-6" />, 
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      subcategories: ['Cleaning', 'Repair', 'Tutoring', 'Beauty', 'Delivery']
    },
    {
      id: 7,
      name: 'Take Care',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      subcategories: ['Nanny Care','Elder Care', 'Child Care', 'Tutoring']
    }
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 6) {
      alert('Maximum 6 images allowed');
      return;
    }

    setIsUploading(true);
    
    setTimeout(() => {
      const newImages = files.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        file
      }));
      setImages([...images, ...newImages]);
      setIsUploading(false);
    }, 1000);
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (images.length === 0) {
    toast.error('Please add at least one image', {
      duration: 3000, // 3 seconds
      position: 'top-center',
      style: {
        background: '#ef4444',
        color: '#fff',
      },
    });
    return;
  }
  
  toast.success('Listing posted successfully!', {
    duration: 3000, // 3 seconds
    position: 'top-center',
    style: {
      color: '#27BB97',
    },
  });
  
  // Navigate after toast appears
  setTimeout(() => {
    navigate('/');
  }, 1000); // Navigate after 1 second so user sees the toast
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#27BB97] to-[#1fa987] rounded-xl flex items-center justify-center shadow-lg shadow-[#27BB97]/20">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#27BB97] to-[#1fa987] bg-clip-text text-transparent">
                  Listify
                </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 mr-2">
                Step {currentStep}/2
              </span>
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className=" rounded-2xl p-6 text-black mb-8 bg-gray-50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Create a Listing</h2>
              <p className="text-gray-600 text-sm">Share what you're selling with thousands of buyers</p>
            </div>
          </div>
        </div>

        {/* Step 1: Category Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubcategory(null);
                  }}
                  className={`group relative p-4 rounded-xl border-2 transition-all ${
                    selectedCategory?.id === category.id
                      ? 'border-[#27BB97] bg-[#27BB97]/5 shadow-lg shadow-[#27BB97]/10'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <div className={category.textColor}>
                      {category.icon}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 block text-center">
                    {category.name}
                  </span>
                  {selectedCategory?.id === category.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#27BB97] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Subcategories */}
            {selectedCategory && (
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#27BB97]" />
                  Choose Subcategory
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedCategory.subcategories.map((sub, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedSubcategory === sub
                          ? 'border-[#27BB97] bg-[#27BB97]/5 text-[#27BB97]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="text-sm font-medium">{sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Continue Button */}
            {selectedCategory && selectedSubcategory && (
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full py-4 bg-gradient-to-r from-[#27BB97] to-[#1fa987] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#27BB97]/20 transition-all flex items-center justify-center gap-2"
              >
                Continue to Details
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Step 2: Form Details */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Back Button */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Change Category</span>
            </button>

            {/* Selected Category Badge */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className={`w-12 h-12 ${selectedCategory.bgColor} rounded-xl flex items-center justify-center`}>
                <div className={selectedCategory.textColor}>
                  {selectedCategory.icon}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Selected Category</p>
                <p className="font-medium text-gray-900">
                  {selectedCategory.name} • {selectedSubcategory}
                </p>
              </div>
            </div>

            {/* Image Upload - Modern Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#27BB97]" />
                  Add Photos
                </h3>
                <span className="text-sm text-gray-500">{images.length}/6</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {images.length < 6 && (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <div className={`aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-[#27BB97] transition-colors ${
                      isUploading ? 'bg-gray-50' : 'bg-white'
                    }`}>
                      {isUploading ? (
                        <div className="w-6 h-6 border-2 border-[#27BB97] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <PlusCircle className="w-6 h-6 text-gray-400" />
                          <span className="text-xs text-gray-500">Add Photo</span>
                        </>
                      )}
                    </div>
                  </label>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Title */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., iPhone 13 Pro Max - 256GB - Like New"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                  required
                />
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  placeholder="Describe your item in detail... Include condition, features, and any other relevant information."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition resize-none"
                  required
                />
              </div>

              {/* Price & Location Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="City, State"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#27BB97]" />
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Phone number"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#27BB97] to-[#1fa987] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#27BB97]/20 transition-all flex items-center justify-center gap-2 text-lg"
            >
              Post Listing Now
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500">
              By posting, you agree to our Terms of Service and Community Guidelines
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostAdPage;