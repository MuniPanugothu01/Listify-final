import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { electronicsAPI, vehiclesAPI } from "../../services/api";


const CATEGORIES = [
  "Electronics",
  "Vehicles",
  "Mobiles",
  "Furniture",
  "Fashion",
  "Books, Sports",
];

const SUBCATEGORIES = {
  Electronics: [
    "TVs, Video - Audio",
    "Kitchen & Other Appliances",
    "Fridges",
    "Washing Machines",
    "ACs",
    "Computers & Laptops",
    "Computer Accessories",
    "Hard Disks, Printers & Monitors",
    "Cameras & Lenses",
  ],
  Vehicles: ["Cars", "Motorcycles", "Scooters", "Bicycles", "Spare Parts"],
  Mobiles: ["Mobile Phones", "Accessories", "Tablets"],
  Furniture: [
    "Sofas & Dining",
    "Beds & Wardrobes",
    "Tables & Chairs",
    "Home Decor",
    "Office Furniture",
  ],
  Fashion: [
    "Men's Clothing",
    "Women's Clothing",
    "Kids Clothing",
    "Footwear",
    "Watches",
    "Accessories",
  ],
  "Books, Sports": [
    "Books",
    "Gym & Fitness",
    "Sports Equipment",
    "Musical Instruments",
    "Hobbies",
    "Cycling",
  ],
};

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PostAdPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [mobileView, setMobileView] = useState("categories"); // 'categories' or 'subcategories'

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    condition: "Good",
    location: "",
    phone: "",
    images: [],
    // Vehicle-specific fields
    brand: "",
    model: "",
    variant: "",
    year: "",
    kmDriven: "",
    fuelType: "",
    transmission: "",
    ownership: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/signin", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  const setField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setForm((f) => ({ ...f, images: [...f.images, ...files].slice(0, 6) }));
  };

  const removeImage = (index) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    // On mobile, switch to subcategories view
    if (window.innerWidth < 1024) {
      setMobileView("subcategories");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackToCategories = () => {
    setMobileView("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const validate = () => {
    const errs = {};
    const trimmed = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      phone: form.phone.replace(/[\s-]/g, ""),
    };

    if (!trimmed.title) errs.title = "Title is required";
    if (!selectedCategory) errs.category = "Please select a category";
    if (!selectedSubcategory) errs.subcategory = "Please select a subcategory";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      errs.price = "Enter a valid price";
    if (trimmed.description.length < 20)
      errs.description = "Description must be at least 20 characters";
    if (!trimmed.location) errs.location = "Location is required";
    if (!trimmed.phone || !/^\d{10}$/.test(trimmed.phone))
      errs.phone = "Enter a valid 10-digit phone number";
    if (!form.images || form.images.length === 0)
      errs.images = "At least one image is required";

    // Vehicle-specific validation
    if (selectedCategory === "Vehicles") {
      if (!form.brand) errs.brand = "Brand is required";
      if (!form.model) errs.model = "Model is required";
      if (!form.year) errs.year = "Year of manufacture is required";
      if (!form.fuelType) errs.fuelType = "Fuel type is required";
      if (!form.transmission) errs.transmission = "Transmission is required";
      if (!form.ownership) errs.ownership = "Ownership is required";
    }

    setForm((f) => ({ ...f, ...trimmed }));
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const saveLocalProduct = (product) => {
    const existing = JSON.parse(localStorage.getItem("localProducts") || "[]");
    existing.push(product);
    localStorage.setItem("localProducts", JSON.stringify(existing));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      // If category is Electronics, submit to the backend API
      if (selectedCategory === "Electronics") {
        // Step 1: Upload images if any
        let imageUrls = [];
        if (form.images.length > 0) {
          try {
            const formData = new FormData();
            form.images.forEach((img) => formData.append("images", img));
            const uploadRes = await electronicsAPI.uploadImages(formData);
            imageUrls = uploadRes.data.imageUrls;
          } catch (uploadErr) {
            console.warn("Image upload failed, using placeholders:", uploadErr);
            imageUrls = [
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
            ];
          }
        }

        // Step 2: Create the listing via API
        const listingData = {
          title: form.title,
          price: Number(form.price),
          description: form.description,
          category: selectedCategory,
          subcategory: selectedSubcategory,
          condition: form.condition || "Good",
          location: form.location,
          phone: form.phone,
          images:
            imageUrls.length > 0
              ? imageUrls
              : [
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
                ],
        };

        await electronicsAPI.create(listingData);
        setLoading(false);
        setSubmitted(true);
        toast.success("Electronics listing posted successfully!");
      } else if (selectedCategory === "Vehicles") {
        // Step 1: Upload images
        let imageUrls = [];
        if (form.images.length > 0) {
          try {
            const formData = new FormData();
            form.images.forEach((img) => formData.append("images", img));
            const uploadRes = await vehiclesAPI.uploadImages(formData);
            imageUrls = uploadRes.data.imageUrls;
          } catch (uploadErr) {
            console.warn("Image upload failed, using placeholders:", uploadErr);
            imageUrls = [
              "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
            ];
          }
        }

        // Step 2: Create the vehicle listing via API
        const listingData = {
          title: form.title,
          price: Number(form.price),
          description: form.description,
          category: selectedCategory,
          subcategory: selectedSubcategory,
          condition: form.condition || "Good",
          location: form.location,
          phone: form.phone,
          brand: form.brand,
          model: form.model,
          variant: form.variant,
          year: form.year,
          kmDriven: form.kmDriven,
          fuelType: form.fuelType,
          transmission: form.transmission,
          ownership: form.ownership,
          images:
            imageUrls.length > 0
              ? imageUrls
              : [
                  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
                ],
        };

        await vehiclesAPI.create(listingData);
        setLoading(false);
        setSubmitted(true);
        toast.success("Vehicle listing posted successfully!");
      } else {
        // For other categories, save locally (same as before)
        const newProduct = {
          id: `local-${Date.now()}`,
          title: form.title,
          price: Number(form.price),
          category: selectedCategory,
          subcategory: selectedSubcategory,
          description: form.description,
          location: form.location,
          seller: { name: user?.firstName || "User", rating: 5.0, since: "2026" },
          images:
            form.images.length > 0
              ? form.images.map((img) => URL.createObjectURL(img))
              : [
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
                ],
          postedAt: new Date().toISOString().split("T")[0],
          featured: false,
        };

        saveLocalProduct(newProduct);
        setLoading(false);
        setSubmitted(true);
        toast.success("Listing posted successfully!");
      }
    } catch (error) {
      setLoading(false);
      console.error("Post ad error:", error);
      toast.error(
        error.message ||
          error.response?.data?.message ||
          "Failed to post listing. Please try again."
      );
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      title: "",
      description: "",
      price: "",
      condition: "Good",
      location: "",
      phone: "",
      images: [],
      brand: "",
      model: "",
      variant: "",
      year: "",
      kmDriven: "",
      fuelType: "",
      transmission: "",
      ownership: "",
    });
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setMobileView("categories");
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4 page-enter">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl">
          🎉
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Ad Posted Successfully!
        </h2>
        <p className="text-slate-500 max-w-sm">Your listing is now live.</p>
        <div className="flex gap-3">
          <button
            onClick={resetForm}
            className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all"
          >
            Post Another
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-[#27BB97] to-[#1fa987] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#27BB97]/20 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // If no category and subcategory selected yet
  if (!selectedCategory || !selectedSubcategory) {
    return (
      <div className="page-enter min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#27BB97] to-[#1fa987] rounded-xl flex items-center justify-center shadow-lg shadow-[#27BB97]/20">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#27BB97] to-[#1fa987] bg-clip-text text-transparent">
                  Listify
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 mr-2">Back</span>
                <button
                  onClick={() => navigate(-1)}
                  className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8">
            {/* Header with back arrow */}
            <div className="flex items-center gap-4 mb-6">
              {/* Back arrow - visible on mobile when in subcategories, on desktop always visible */}
              {(mobileView === "subcategories" || window.innerWidth >= 1024) &&
                selectedCategory && (
                  <button
                    onClick={handleBackToCategories}
                    className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition lg:block"
                    aria-label="Back to categories"
                  >
                    <svg
                      className="w-6 h-6 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}
              <div>
                <h1 className="text-3xl font-black text-slate-900">
                  Post Your Ad
                </h1>
                <p className="text-slate-500 mt-1">
                  {selectedCategory
                    ? `Choose a subcategory for ${selectedCategory}`
                    : "Choose a category to continue"}
                </p>
              </div>
            </div>

            {/* Desktop Headers */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6">
              <h2 className="text-lg font-semibold text-slate-800">
                SELECT CATEGORY
              </h2>
              <h2 className="text-lg font-semibold text-slate-800">
                {selectedCategory ? "SELECT SUBCATEGORY" : "SUBCATEGORIES"}
              </h2>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                {mobileView === "categories"
                  ? "SELECT CATEGORY"
                  : `SELECT SUBCATEGORY`}
              </h2>
            </div>

            {/* Categories and Subcategories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              {/* Categories - Always visible on desktop, conditionally on mobile */}
              <div
                className={`${mobileView === "categories" ? "block" : "hidden lg:block"}`}
              >
                <div className="space-y-1 max-h-[480px] overflow-y-auto pr-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 border-b border-slate-200 hover:bg-slate-50 transition text-left
                        ${selectedCategory === cat ? "bg-[#27BB97]/10 font-medium text-[#27BB97]" : ""}`}
                    >
                      <span>{cat}</span>
                      <span className="text-slate-400 text-xl lg:hidden">
                        ›
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategories - Always visible on desktop, conditionally on mobile */}
              <div
                className={`${mobileView === "subcategories" ? "block" : "hidden lg:block"} lg:border-l border-slate-200 lg:pl-6`}
              >
                {selectedCategory ? (
                  <div className="space-y-1 max-h-[480px] overflow-y-auto">
                    {SUBCATEGORIES[selectedCategory]?.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => handleSubcategorySelect(sub)}
                        className={`w-full px-4 py-3.5 border-b border-slate-200 hover:bg-slate-50 transition text-left
                          ${selectedSubcategory === sub ? "bg-[#27BB97]/10 font-medium text-[#27BB97]" : ""}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm py-10">
                    Select a category to view subcategories
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form view (category and subcategory selected)
  return (
    <div className="page-enter min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#27BB97] to-[#1fa987] rounded-xl flex items-center justify-center shadow-lg shadow-[#27BB97]/20">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#27BB97] to-[#1fa987] bg-clip-text text-transparent">
                Listify
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 mr-2">Back</span>
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <svg
                  className="w-5 h-5 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8">
          {/* Category breadcrumb and edit option */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Back arrow to go back to category selection */}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setMobileView("categories");
                }}
                className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition"
                aria-label="Back to categories"
              >
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-black text-slate-900">
                  Post Your Ad
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700">
                    {selectedCategory}
                  </span>
                  <span className="text-slate-400">›</span>
                  <span className="text-sm bg-[#27BB97]/10 px-3 py-1.5 rounded-lg text-[#27BB97] font-medium">
                    {selectedSubcategory}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label={selectedCategory === "Vehicles" ? "Car Title *" : "Ad Title *"} error={errors.title}>
              <input
                type="text"
                value={form.title}
                onChange={setField("title")}
                placeholder={selectedCategory === "Vehicles" ? 'e.g., 2019 Hyundai i20 Sportz – Excellent Condition' : "e.g., iPhone 14 Pro Max 256GB"}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
              />
            </Field>

            {/* Vehicle-specific fields */}
            {selectedCategory === "Vehicles" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Brand *" error={errors.brand}>
                    <select
                      value={form.brand}
                      onChange={setField("brand")}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition bg-white"
                    >
                      <option value="">Select Brand</option>
                      <option value="Maruti Suzuki">Maruti Suzuki</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Tata">Tata</option>
                      <option value="Honda">Honda</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Mahindra">Mahindra</option>
                      <option value="Kia">Kia</option>
                      <option value="MG">MG</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Skoda">Skoda</option>
                      <option value="Renault">Renault</option>
                      <option value="Nissan">Nissan</option>
                      <option value="Ford">Ford</option>
                      <option value="Chevrolet">Chevrolet</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="Audi">Audi</option>
                      <option value="Jeep">Jeep</option>
                      <option value="Citroën">Citroën</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>

                  <Field label="Model *" error={errors.model}>
                    <input
                      type="text"
                      value={form.model}
                      onChange={setField("model")}
                      placeholder="e.g., i20, Swift, Nexon"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Variant">
                    <input
                      type="text"
                      value={form.variant}
                      onChange={setField("variant")}
                      placeholder="e.g., Sportz, VXi, XZ+"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                    />
                  </Field>

                  <Field label="Year of Manufacture *" error={errors.year}>
                    <select
                      value={form.year}
                      onChange={setField("year")}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition bg-white"
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Kilometers Driven">
                    <input
                      type="text"
                      value={form.kmDriven}
                      onChange={setField("kmDriven")}
                      placeholder="e.g., 25,000"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                    />
                  </Field>

                  <Field label="Fuel Type *" error={errors.fuelType}>
                    <select
                      value={form.fuelType}
                      onChange={setField("fuelType")}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition bg-white"
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="LPG">LPG</option>
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Transmission *" error={errors.transmission}>
                    <select
                      value={form.transmission}
                      onChange={setField("transmission")}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition bg-white"
                    >
                      <option value="">Select Transmission</option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </Field>

                  <Field label="Ownership *" error={errors.ownership}>
                    <select
                      value={form.ownership}
                      onChange={setField("ownership")}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition bg-white"
                    >
                      <option value="">Select Ownership</option>
                      <option value="1st Owner">1st Owner</option>
                      <option value="2nd Owner">2nd Owner</option>
                      <option value="3rd Owner">3rd Owner</option>
                      <option value="4th+ Owner">4th+ Owner</option>
                    </select>
                  </Field>
                </div>
              </>
            )}

            <Field label={selectedCategory === "Vehicles" ? "Expected Price (₹) *" : "Price (₹) *"} error={errors.price}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  value={form.price}
                  onChange={setField("price")}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                  min="1"
                />
              </div>
            </Field>

            {selectedCategory === "Electronics" && (
              <Field label="Condition *">
                <select
                  value={form.condition}
                  onChange={setField("condition")}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition bg-white"
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Used">Used</option>
                </select>
              </Field>
            )}

            <Field label="Description *" error={errors.description}>
              <textarea
                value={form.description}
                onChange={setField("description")}
                placeholder="Describe your item in detail — include brand, model, age, any damage, reason for selling…"
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition resize-none"
              />
              <p className="text-xs text-slate-400 mt-1">
                {form.description.length} / 20 minimum characters
              </p>
            </Field>

            <Field label="Location *" error={errors.location}>
              <input
                type="text"
                value={form.location}
                onChange={setField("location")}
                placeholder="e.g., Kukatpally, Hyderabad"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
              />
            </Field>

            <Field label="Phone Number *" error={errors.phone}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={setField("phone")}
                  placeholder="9999999999"
                  maxLength={10}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                />
              </div>
            </Field>

            <Field label="Photos * (Min 1 - Max 6 Images)" error={errors.images}>
              <div className="space-y-4">
                {form.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {form.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {form.images.length < 6 && (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl h-32 cursor-pointer hover:border-[#27BB97] hover:bg-[#27BB97]/5 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFiles}
                      className="hidden"
                      multiple
                    />
                    <span className="text-3xl mb-1">📸</span>
                    <span className="text-sm text-slate-500">
                      Click to upload photos ({form.images.length}/6)
                    </span>
                  </label>
                )}

                <p className="text-xs text-slate-400">
                  You can upload up to 6 images. First image will be the cover
                  photo.
                </p>
              </div>
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#27BB97] to-[#1fa987] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#27BB97]/20 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing listing…
                </span>
              ) : (
                "Post Ad for Free →"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAdPage;
