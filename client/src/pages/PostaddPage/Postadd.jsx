import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Briefcase, 
  Wrench, 
  ShoppingBag,
  Car,
  Users,
  ArrowLeft,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  User,
  ChevronDown,
  Camera,
  DollarSign,
  Upload,
  X,
  Image as ImageIcon,
  Shield,
  Search
} from 'lucide-react';

const PostAdPage = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [subCategorySearch, setSubCategorySearch] = useState('');
  
  const categoryDropdownRef = useRef(null);
  const subCategoryDropdownRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    name: '',
    phone: '',
    email: ''
  });
  
  // Categories with icons and subcategories
  const categories = [
    { 
      id: 'housing', 
      name: 'Housing', 
      icon: <Home className="w-5 h-5" />,
      subcategories: [
        'Apartments for Rent',
        'Rooms for Rent', 
        'Houses for Sale',
        'Roommates Wanted',
        'Vacation Rentals',
        'Commercial Space'
      ]
    },
    { 
      id: 'jobs', 
      name: 'Jobs', 
      icon: <Briefcase className="w-5 h-5" />,
      subcategories: [
        'Full-time Jobs',
        'Part-time Jobs',
        'Contract Work',
        'Remote Jobs',
        'Internships'
      ]
    },
    { 
      id: 'services', 
      name: 'Services', 
      icon: <Wrench className="w-5 h-5" />,
      subcategories: [
        'Cleaning Services',
        'Repair Services',
        'Tutoring',
        'Beauty Services',
        'Delivery Services',
        'Plumbing Services',
        'Electrical Services'
      ]
    },
    { 
      id: 'buySell', 
      name: 'Buy & Sell', 
      icon: <ShoppingBag className="w-5 h-5" />,
      subcategories: [
        'Electronics',
        'Furniture',
        'Clothing & Accessories',
        'Books & Media',
        'Sports Equipment',
        'Home Appliances',
        'Mobile Phones'
      ]
    },
    { 
      id: 'automotive', 
      name: 'Vehicles', 
      icon: <Car className="w-5 h-5" />,
      subcategories: [
        'Cars for Sale',
        'Motorcycles',
        'Auto Parts',
        'Car Rental',
        'Bicycles',
        'Scooters'
      ]
    },
    { 
      id: 'events', 
      name: 'Events', 
      icon: <Users className="w-5 h-5" />,
      subcategories: [
        'Concerts & Shows',
        'Workshops',
        'Festivals',
        'Sports Events',
        'Parties'
      ]
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (subCategoryDropdownRef.current && !subCategoryDropdownRef.current.contains(event.target)) {
        setShowSubCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current category object
  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  
  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
    category.subcategories.some(subcat => 
      subcat.toLowerCase().includes(categorySearch.toLowerCase())
    )
  );

  // Filter subcategories based on search
  const filteredSubCategories = currentCategory?.subcategories.filter(subcat =>
    subcat.toLowerCase().includes(subCategorySearch.toLowerCase())
  ) || [];

  // Reset subcategory search when category changes
  useEffect(() => {
    setSubCategorySearch('');
  }, [selectedCategory]);

  // Handle back to step 1
  const handleBack = () => {
    setStep(1);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }

    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newImages = files.map(file => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));
      
      setImages(prev => [...prev, ...newImages]);
      setUploading(false);
    }, 500);
  };

  // Remove image
  const handleRemoveImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Handle continue to step 2
  const handleContinue = () => {
    if (!selectedCategory || !selectedSubCategory) {
      alert('Please select both category and subcategory');
      return;
    }
    setStep(2);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (images.length === 0) {
      alert('Please add at least one image');
      return;
    }
    
    console.log('Ad Posted:', {
      category: selectedCategory,
      subCategory: selectedSubCategory,
      images: images,
      ...formData
    });
    
    alert('Ad posted successfully!');
    
    // Reset form
    setStep(1);
    setSelectedCategory('');
    setSelectedSubCategory('');
    setImages([]);
    setCategorySearch('');
    setSubCategorySearch('');
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      name: '',
      phone: '',
      email: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative z-0">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Post Your Ad</h1>
            <p className="text-gray-600 mt-2">Quick and easy ad posting</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 ">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              step === 1 ? 'bg-[#27BB97] text-white' : 'bg-gray-200 text-gray-400'
            } font-bold text-lg transition-all duration-300`}>
              1
            </div>
            <div className="w-32 h-1 bg-gray-200"></div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              step === 2 ? 'bg-[#27BB97] text-white' : 'bg-gray-200 text-gray-400'
            } font-bold text-lg transition-all duration-300`}>
              2
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900 mb-1">
              {step === 1 ? 'Select Category' : 'Fill Details'}
            </div>
            <div className="text-xs text-gray-500">
              Step {step} of 2
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Step 1: Category & Subcategory Selection */}
          {step === 1 && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Ad Type</h2>
                <p className="text-gray-600">Choose what you want to post</p>
              </div>

              {/* Category Selection */}
              <div className="space-y-6">
                {/* Category Dropdown */}
                <div className="space-y-2" ref={categoryDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCategoryDropdown(!showCategoryDropdown);
                        setShowSubCategoryDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-[#27BB97] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {selectedCategory ? (
                          <>
                            <div className="text-[#27BB97]">
                              {categories.find(cat => cat.id === selectedCategory)?.icon}
                            </div>
                            <span className="text-gray-900">
                              {categories.find(cat => cat.id === selectedCategory)?.name}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-500">Select a category</span>
                        )}
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showCategoryDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-hidden">
                        {/* Search Bar */}
                        <div className="p-3 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search categories..."
                              value={categorySearch}
                              onChange={(e) => setCategorySearch(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#27BB97] focus:border-[#27BB97]"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        
                        {/* Category List */}
                        <div className="max-h-60 overflow-auto">
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                              <button
                                key={category.id}
                                type="button"
                                onClick={() => {
                                  setSelectedCategory(category.id);
                                  setSelectedSubCategory('');
                                  setShowCategoryDropdown(false);
                                  setCategorySearch('');
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0"
                              >
                                <div className="text-[#27BB97]">
                                  {category.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{category.name}</div>
                                  <div className="text-xs text-gray-500">{category.subcategories.length} options</div>
                                </div>
                                {selectedCategory === category.id && (
                                  <CheckCircle className="w-5 h-5 text-[#27BB97]" />
                                )}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-6 text-center">
                              <p className="text-gray-500">No categories found</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subcategory Dropdown (only shows when category is selected) */}
                {selectedCategory && (
                  <div className="space-y-2" ref={subCategoryDropdownRef}>
                    <label className="block text-sm font-medium text-gray-700">
                      Subcategory <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowSubCategoryDropdown(!showSubCategoryDropdown);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-[#27BB97] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {selectedSubCategory ? (
                            <span className="text-gray-900">{selectedSubCategory}</span>
                          ) : (
                            <span className="text-gray-500">Select a subcategory</span>
                          )}
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showSubCategoryDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showSubCategoryDropdown && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-hidden">
                          {/* Search Bar for Subcategories */}
                          <div className="p-3 border-b border-gray-100">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Search subcategories..."
                                value={subCategorySearch}
                                onChange={(e) => setSubCategorySearch(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#27BB97] focus:border-[#27BB97]"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>
                          
                          {/* Subcategory List */}
                          <div className="max-h-60 overflow-auto">
                            {filteredSubCategories.length > 0 ? (
                              filteredSubCategories.map((subcat, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => {
                                    setSelectedSubCategory(subcat);
                                    setShowSubCategoryDropdown(false);
                                    setSubCategorySearch('');
                                  }}
                                  className="w-full px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0 flex items-center justify-between"
                                >
                                  <div className="font-medium text-gray-900">{subcat}</div>
                                  {selectedSubCategory === subcat && (
                                    <CheckCircle className="w-5 h-5 text-[#27BB97]" />
                                  )}
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-6 text-center">
                                <p className="text-gray-500">No subcategories found</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Category Info (when both selected) */}
                {selectedCategory && selectedSubCategory && (
                  <div className="bg-[#27BB97]/5 border border-[#27BB97]/20 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#27BB97]/10 rounded-lg">
                        {currentCategory?.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Posting: {selectedSubCategory}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Category: {currentCategory?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={!selectedCategory || !selectedSubCategory}
                    className="w-full py-3 bg-[#27BB97] text-white font-semibold rounded-lg hover:bg-[#1fa987] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Form Details */}
          {step === 2 && (
            <div>
              <div className="flex items-center mb-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Post your {selectedSubCategory}
                  </h2>
                  <p className="text-gray-600">Fill in the details for your ad</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Info Banner */}
                <div className="bg-[#27BB97]/5 border border-[#27BB97]/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#27BB97]/10 rounded-lg">
                      {currentCategory?.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedSubCategory}</h4>
                      <p className="text-sm text-gray-600">Category: {currentCategory?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Images</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add photos to make your ad more attractive (Max 10 images)
                    </p>
                  </div>

                  {/* Image Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#27BB97] transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading || images.length >= 10}
                    />
                    <label 
                      htmlFor="image-upload" 
                      className={`cursor-pointer ${(uploading || images.length >= 10) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-[#27BB97]/10 rounded-full flex items-center justify-center mb-4">
                          {uploading ? (
                            <div className="w-8 h-8 border-2 border-[#27BB97] border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Upload className="w-8 h-8 text-[#27BB97]" />
                          )}
                        </div>
                        <p className="font-medium text-gray-900 mb-1">
                          {uploading ? 'Uploading...' : 'Click to upload images'}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          PNG, JPG, JPEG up to 5MB each
                        </p>
                        <button
                          type="button"
                          className="px-4 py-2 bg-[#27BB97] text-white text-sm font-medium rounded-lg hover:bg-[#1fa987] transition-colors"
                        >
                          Select Files
                        </button>
                      </div>
                    </label>
                  </div>

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-medium text-gray-900">Uploaded Images ({images.length}/10)</h4>
                        <button
                          type="button"
                          onClick={() => setImages([])}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove All
                        </button>
                      </div>
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={image.preview}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(image.id)}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ad Details */}
                <div className="space-y-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Ad Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="What are you offering?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27BB97] focus:border-[#27BB97] transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder={`Describe your ${selectedSubCategory.toLowerCase()} in detail...`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27BB97] focus:border-[#27BB97] transition"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#27BB97] focus-within:border-[#27BB97]">
                          <div className="pl-4 pr-3">
                            <DollarSign className="w-5 h-5 text-gray-500" />
                          </div>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Enter amount"
                            className="flex-1 py-3 px-2 outline-none"
                            required
                          />
                          <div className="pr-4 text-gray-500">USD</div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#27BB97] focus-within:border-[#27BB97]">
                          <div className="pl-4 pr-3">
                            <MapPin className="w-5 h-5 text-gray-500" />
                          </div>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="City, State"
                            className="flex-1 py-3 px-2 outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#27BB97] focus-within:border-[#27BB97]">
                        <div className="pl-4 pr-3">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="flex-1 py-3 px-2 outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#27BB97] focus-within:border-[#27BB97]">
                        <div className="pl-4 pr-3">
                          <Phone className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                          className="flex-1 py-3 px-2 outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#27BB97] focus-within:border-[#27BB97]">
                        <div className="pl-4 pr-3">
                          <Mail className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                          className="flex-1 py-3 px-2 outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#27BB97] text-white font-semibold rounded-lg hover:bg-[#1fa987] transition-all duration-300 hover:scale-105 flex items-center gap-3"
                      disabled={images.length === 0}
                    >
                      {images.length === 0 ? (
                        <>
                          <Camera className="w-5 h-5" />
                          Add Images to Post
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Post Ad Now
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
                    <Shield className="w-4 h-4 text-[#27BB97]" />
                    <span>Protected by our safety guidelines</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    By posting this ad, you agree to our terms of service.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostAdPage;