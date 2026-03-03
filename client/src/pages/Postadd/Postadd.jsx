import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { submitPostAd } from "../../redux/thunks/listingsThunks";

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

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

const INPUT_CLS =
  "w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition";
const SELECT_CLS = `${INPUT_CLS} bg-white`;

const VEHICLE_BRANDS = [
  "Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia",
  "MG", "Volkswagen", "Skoda", "Renault", "Nissan", "Ford", "Chevrolet",
  "BMW", "Mercedes-Benz", "Audi", "Jeep", "Citroën", "Other",
];

const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "LPG"];
const TRANSMISSIONS = ["Manual", "Automatic"];
const OWNERSHIPS = ["1st Owner", "2nd Owner", "3rd Owner", "4th+ Owner"];
const CONDITIONS = ["New", "Like New", "Good", "Fair", "Used"];

const YEAR_OPTIONS = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i
);

const DEFAULT_FORM = {
  title: "",
  description: "",
  price: "",
  condition: "Good",
  location: "",
  phone: "",
  images: [],
  // Vehicle-specific
  brand: "",
  model: "",
  variant: "",
  year: "",
  kmDriven: "",
  fuelType: "",
  transmission: "",
  ownership: "",
};

/* ─────────────────────────────────────────────
   Per-category configuration
   ───────────────────────────────────────────── */

/** Extra form fields to add per category (merged into initial form state). */
const CATEGORY_EXTRA_FIELDS = {
  Vehicles: {
    brand: "", model: "", variant: "", year: "",
    kmDriven: "", fuelType: "", transmission: "", ownership: "",
  },
};

/** Per-category validation — returns an errors object fragment. */
const CATEGORY_VALIDATORS = {
  Vehicles: (form) => {
    const errs = {};
    if (!form.brand) errs.brand = "Brand is required";
    if (!form.model) errs.model = "Model is required";
    if (!form.year) errs.year = "Year of manufacture is required";
    if (!form.fuelType) errs.fuelType = "Fuel type is required";
    if (!form.transmission) errs.transmission = "Transmission is required";
    if (!form.ownership) errs.ownership = "Ownership is required";
    return errs;
  },
};

/** Per-category form overrides (title label, title placeholder, price label). */
const CATEGORY_FORM_CONFIG = {
  Vehicles: {
    titleLabel: "Car Title *",
    titlePlaceholder: "e.g., 2019 Hyundai i20 Sportz – Excellent Condition",
    priceLabel: "Expected Price (₹) *",
  },
};

/* Submit routing is handled by the submitPostAd Redux thunk. */

/* ─────────────────────────────────────────────
   Shared tiny components
   ───────────────────────────────────────────── */

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, error, value, onChange, placeholder, options }) => (
  <Field label={label} error={error}>
    <select value={value} onChange={onChange} className={SELECT_CLS}>
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </Field>
);

const PageHeader = ({ navigate }) => (
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
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const BackArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition"
    aria-label="Back to categories"
  >
    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

/* ─────────────────────────────────────────────
   Category-specific field components
   ───────────────────────────────────────────── */

const VehicleFields = ({ form, setField, errors }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField
        label="Brand *"
        error={errors.brand}
        value={form.brand}
        onChange={setField("brand")}
        placeholder="Select Brand"
        options={VEHICLE_BRANDS}
      />
      <Field label="Model *" error={errors.model}>
        <input
          type="text"
          value={form.model}
          onChange={setField("model")}
          placeholder="e.g., i20, Swift, Nexon"
          className={INPUT_CLS}
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
          className={INPUT_CLS}
        />
      </Field>
      <SelectField
        label="Year of Manufacture *"
        error={errors.year}
        value={form.year}
        onChange={setField("year")}
        placeholder="Select Year"
        options={YEAR_OPTIONS}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Kilometers Driven">
        <input
          type="text"
          value={form.kmDriven}
          onChange={setField("kmDriven")}
          placeholder="e.g., 25,000"
          className={INPUT_CLS}
        />
      </Field>
      <SelectField
        label="Fuel Type *"
        error={errors.fuelType}
        value={form.fuelType}
        onChange={setField("fuelType")}
        placeholder="Select Fuel Type"
        options={FUEL_TYPES}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField
        label="Transmission *"
        error={errors.transmission}
        value={form.transmission}
        onChange={setField("transmission")}
        placeholder="Select Transmission"
        options={TRANSMISSIONS}
      />
      <SelectField
        label="Ownership *"
        error={errors.ownership}
        value={form.ownership}
        onChange={setField("ownership")}
        placeholder="Select Ownership"
        options={OWNERSHIPS}
      />
    </div>
  </>
);

const ElectronicsFields = ({ form, setField }) => (
  <SelectField
    label="Condition *"
    value={form.condition}
    onChange={setField("condition")}
    placeholder="Select Condition"
    options={CONDITIONS}
  />
);

/* ─────────────────────────────────────────────
   Dynamic category → component mapping
   ───────────────────────────────────────────── */

const CATEGORY_COMPONENTS = {
  Vehicles: VehicleFields,
  Electronics: ElectronicsFields,
};

/* ─────────────────────────────────────────────
   Success screen
   ───────────────────────────────────────────── */

const SuccessScreen = ({ onReset, onGoHome }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4 page-enter">
    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl">
      🎉
    </div>
    <h2 className="text-2xl font-bold text-slate-900">Ad Posted Successfully!</h2>
    <p className="text-slate-500 max-w-sm">Your listing is now live.</p>
    <div className="flex gap-3">
      <button
        onClick={onReset}
        className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all"
      >
        Post Another
      </button>
      <button
        onClick={onGoHome}
        className="px-6 py-3 bg-gradient-to-r from-[#27BB97] to-[#1fa987] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#27BB97]/20 transition-all"
      >
        Go to Home
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Category selection screen
   ───────────────────────────────────────────── */

const CategorySelectionScreen = ({
  navigate,
  selectedCategory,
  selectedSubcategory,
  mobileView,
  onCategorySelect,
  onSubcategorySelect,
  onBack,
}) => (
  <div className="page-enter min-h-screen bg-slate-50">
    <PageHeader navigate={navigate} />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8">
        {/* Header with back arrow */}
        <div className="flex items-center gap-4 mb-6">
          {(mobileView === "subcategories" || window.innerWidth >= 1024) &&
            selectedCategory && <BackArrow onClick={onBack} />}
          <div>
            <h1 className="text-3xl font-black text-slate-900">Post Your Ad</h1>
            <p className="text-slate-500 mt-1">
              {selectedCategory
                ? `Choose a subcategory for ${selectedCategory}`
                : "Choose a category to continue"}
            </p>
          </div>
        </div>

        {/* Desktop Headers */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          <h2 className="text-lg font-semibold text-slate-800">SELECT CATEGORY</h2>
          <h2 className="text-lg font-semibold text-slate-800">
            {selectedCategory ? "SELECT SUBCATEGORY" : "SUBCATEGORIES"}
          </h2>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            {mobileView === "categories" ? "SELECT CATEGORY" : "SELECT SUBCATEGORY"}
          </h2>
        </div>

        {/* Categories and Subcategories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className={mobileView === "categories" ? "block" : "hidden lg:block"}>
            <div className="space-y-1 max-h-[480px] overflow-y-auto pr-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onCategorySelect(cat)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 border-b border-slate-200 hover:bg-slate-50 transition text-left
                    ${selectedCategory === cat ? "bg-[#27BB97]/10 font-medium text-[#27BB97]" : ""}`}
                >
                  <span>{cat}</span>
                  <span className="text-slate-400 text-xl lg:hidden">›</span>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`${mobileView === "subcategories" ? "block" : "hidden lg:block"} lg:border-l border-slate-200 lg:pl-6`}
          >
            {selectedCategory ? (
              <div className="space-y-1 max-h-[480px] overflow-y-auto">
                {SUBCATEGORIES[selectedCategory]?.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => onSubcategorySelect(sub)}
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

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */

const PostAdPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [mobileView, setMobileView] = useState("categories");
  const [form, setForm] = useState({ ...DEFAULT_FORM });
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

  /* ── helpers ── */

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

  /* ── validation ── */

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

    // Category-specific validation (dynamic)
    const categoryValidator = CATEGORY_VALIDATORS[selectedCategory];
    if (categoryValidator) {
      Object.assign(errs, categoryValidator(form));
    }

    setForm((f) => ({ ...f, ...trimmed }));
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── submission ── */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      const result = await dispatch(
        submitPostAd({
          form,
          category: selectedCategory,
          subcategory: selectedSubcategory,
          user,
        }),
      ).unwrap();

      setLoading(false);
      setSubmitted(true);
      toast.success(result.message);
    } catch (error) {
      setLoading(false);
      console.error("Post ad error:", error);
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to post listing. Please try again.",
      );
    }
  };

  /* ── reset ── */

  const resetForm = () => {
    setSubmitted(false);
    setForm({ ...DEFAULT_FORM });
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setMobileView("categories");
  };

  /* ── render: success ── */

  if (submitted) {
    return <SuccessScreen onReset={resetForm} onGoHome={() => navigate("/")} />;
  }

  /* ── render: category / subcategory picker ── */

  if (!selectedCategory || !selectedSubcategory) {
    return (
      <CategorySelectionScreen
        navigate={navigate}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        mobileView={mobileView}
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
        onBack={handleBackToCategories}
      />
    );
  }

  /* ── render: ad form ── */

  const categoryConfig = CATEGORY_FORM_CONFIG[selectedCategory] || {};
  const titleLabel = categoryConfig.titleLabel || "Ad Title *";
  const titlePlaceholder = categoryConfig.titlePlaceholder || "e.g., iPhone 14 Pro Max 256GB";
  const priceLabel = categoryConfig.priceLabel || "Price (₹) *";

  const CategoryFields = CATEGORY_COMPONENTS[selectedCategory];

  return (
    <div className="page-enter min-h-screen bg-slate-50">
      <PageHeader navigate={navigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8">
          {/* Category breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <BackArrow
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setMobileView("categories");
                }}
              />
              <div>
                <h1 className="text-3xl font-black text-slate-900">Post Your Ad</h1>
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
            {/* Title */}
            <Field label={titleLabel} error={errors.title}>
              <input
                type="text"
                value={form.title}
                onChange={setField("title")}
                placeholder={titlePlaceholder}
                className={INPUT_CLS}
              />
            </Field>

            {/* Category-specific fields (dynamic) */}
            {CategoryFields && (
              <CategoryFields form={form} setField={setField} errors={errors} />
            )}

            {/* Price */}
            <Field label={priceLabel} error={errors.price}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
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

            {/* Description */}
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

            {/* Location */}
            <Field label="Location *" error={errors.location}>
              <input
                type="text"
                value={form.location}
                onChange={setField("location")}
                placeholder="e.g., Kukatpally, Hyderabad"
                className={INPUT_CLS}
              />
            </Field>

            {/* Phone */}
            <Field label="Phone Number *" error={errors.phone}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">+91</span>
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

            {/* Images */}
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
                  You can upload up to 6 images. First image will be the cover photo.
                </p>
              </div>
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#27BB97] to-[#1fa987] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#27BB97]/20 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
