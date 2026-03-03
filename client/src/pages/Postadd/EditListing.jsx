import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { electronicsAPI, vehiclesAPI } from "../../services/api";
import {
  fetchElectronicsById,
  updateElectronicsListing,
} from "../../redux/slices/electronicsSlice";
import {
  fetchVehicleById,
  updateVehicleListing,
} from "../../redux/slices/vehiclesSlice";

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
  Vehicles: ["Cars", "Bikes", "Cycle", "Spare Parts"],
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

/* ── Per-subcategory brand / option lists ── */

const CAR_BRANDS = [
  "Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia",
  "MG", "Volkswagen", "Skoda", "Renault", "Nissan", "Ford", "Chevrolet",
  "BMW", "Mercedes-Benz", "Audi", "Jeep", "Citroën", "Other",
];
const BIKE_BRANDS = [
  "Hero", "Honda", "Bajaj", "TVS", "Royal Enfield", "Yamaha", "Suzuki",
  "KTM", "Kawasaki", "BMW", "Ducati", "Harley-Davidson", "Jawa",
  "Benelli", "Aprilia", "Husqvarna", "Triumph", "Other",
];
const CYCLE_BRANDS = [
  "Hero", "Firefox", "Trek", "Giant", "Scott", "Btwin", "Hercules",
  "Atlas", "Montra", "Cannondale", "Specialized", "Merida", "Other",
];
const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "LPG"];
const BIKE_FUEL_TYPES = ["Petrol", "Electric"];
const TRANSMISSIONS = ["Manual", "Automatic"];
const OWNERSHIPS = ["1st Owner", "2nd Owner", "3rd Owner", "4th+ Owner"];
const BIKE_ENGINE_CC = [
  "100cc", "110cc", "125cc", "150cc", "160cc", "180cc", "200cc",
  "250cc", "300cc", "350cc", "400cc", "500cc", "600cc", "650cc+",
];
const CYCLE_TYPES = [
  "Mountain", "Road", "Hybrid", "BMX", "Kids", "Folding", "Electric", "Cruiser",
];
const SPARE_PART_CATEGORIES = [
  "Engine Parts", "Body Parts", "Electrical", "Suspension", "Brakes",
  "Tyres & Wheels", "Interior", "Exterior", "Exhaust", "Filters", "Other",
];
const COMPATIBLE_VEHICLES = ["Car", "Bike", "Cycle", "Universal"];
const YEAR_OPTIONS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

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

/* ── Subcategory-specific field components ── */

const CarFields = ({ form, setField, errors }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField label="Brand *" error={errors.brand} value={form.brand}
        onChange={setField("brand")} placeholder="Select Brand" options={CAR_BRANDS} />
      <Field label="Model *" error={errors.model}>
        <input type="text" value={form.model} onChange={setField("model")}
          placeholder="e.g., i20, Swift, Nexon" className={INPUT_CLS} />
      </Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Variant">
        <input type="text" value={form.variant} onChange={setField("variant")}
          placeholder="e.g., Sportz, VXi, XZ+" className={INPUT_CLS} />
      </Field>
      <SelectField label="Year *" error={errors.year} value={form.year}
        onChange={setField("year")} placeholder="Select Year" options={YEAR_OPTIONS} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Kilometers Driven">
        <input type="text" value={form.kmDriven} onChange={setField("kmDriven")}
          placeholder="e.g., 25,000" className={INPUT_CLS} />
      </Field>
      <SelectField label="Fuel Type *" error={errors.fuelType} value={form.fuelType}
        onChange={setField("fuelType")} placeholder="Select Fuel Type" options={FUEL_TYPES} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField label="Transmission *" error={errors.transmission} value={form.transmission}
        onChange={setField("transmission")} placeholder="Select Transmission" options={TRANSMISSIONS} />
      <SelectField label="Ownership *" error={errors.ownership} value={form.ownership}
        onChange={setField("ownership")} placeholder="Select Ownership" options={OWNERSHIPS} />
    </div>
  </>
);

const BikeFields = ({ form, setField, errors }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField label="Brand *" error={errors.brand} value={form.brand}
        onChange={setField("brand")} placeholder="Select Brand" options={BIKE_BRANDS} />
      <Field label="Model *" error={errors.model}>
        <input type="text" value={form.model} onChange={setField("model")}
          placeholder="e.g., Classic 350, Pulsar NS200" className={INPUT_CLS} />
      </Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField label="Year *" error={errors.year} value={form.year}
        onChange={setField("year")} placeholder="Select Year" options={YEAR_OPTIONS} />
      <SelectField label="Engine (CC)" value={form.engineCC}
        onChange={setField("engineCC")} placeholder="Select CC" options={BIKE_ENGINE_CC} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Kilometers Driven">
        <input type="text" value={form.kmDriven} onChange={setField("kmDriven")}
          placeholder="e.g., 15,000" className={INPUT_CLS} />
      </Field>
      <SelectField label="Fuel Type *" error={errors.fuelType} value={form.fuelType}
        onChange={setField("fuelType")} placeholder="Select Fuel Type" options={BIKE_FUEL_TYPES} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField label="Ownership *" error={errors.ownership} value={form.ownership}
        onChange={setField("ownership")} placeholder="Select Ownership" options={OWNERSHIPS} />
    </div>
  </>
);

const CycleFields = ({ form, setField, errors }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField label="Brand *" error={errors.brand} value={form.brand}
        onChange={setField("brand")} placeholder="Select Brand" options={CYCLE_BRANDS} />
      <Field label="Model">
        <input type="text" value={form.model} onChange={setField("model")}
          placeholder="e.g., Road Runner, Hybrid 700c" className={INPUT_CLS} />
      </Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField label="Cycle Type *" error={errors.cycleType} value={form.cycleType}
        onChange={setField("cycleType")} placeholder="Select Type" options={CYCLE_TYPES} />
      <Field label="Number of Gears">
        <input type="text" value={form.gearCount} onChange={setField("gearCount")}
          placeholder="e.g., 21" className={INPUT_CLS} />
      </Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Frame Size">
        <input type="text" value={form.frameSize} onChange={setField("frameSize")}
          placeholder="e.g., 26 inch, Medium" className={INPUT_CLS} />
      </Field>
    </div>
  </>
);

const SparePartsFields = ({ form, setField, errors }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SelectField label="Compatible Vehicle *" error={errors.compatibleVehicle}
        value={form.compatibleVehicle} onChange={setField("compatibleVehicle")}
        placeholder="Select Vehicle Type" options={COMPATIBLE_VEHICLES} />
      <SelectField label="Part Category *" error={errors.partCategory}
        value={form.partCategory} onChange={setField("partCategory")}
        placeholder="Select Category" options={SPARE_PART_CATEGORIES} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Brand / Manufacturer">
        <input type="text" value={form.brand} onChange={setField("brand")}
          placeholder="e.g., Bosch, Brembo, OEM" className={INPUT_CLS} />
      </Field>
      <Field label="Compatible Models">
        <input type="text" value={form.model} onChange={setField("model")}
          placeholder="e.g., Swift, i20, Pulsar" className={INPUT_CLS} />
      </Field>
    </div>
  </>
);

const VehicleEditFields = ({ form, setField, errors, subcategory }) => {
  switch (subcategory) {
    case "Cars": return <CarFields form={form} setField={setField} errors={errors} />;
    case "Bikes": return <BikeFields form={form} setField={setField} errors={errors} />;
    case "Cycle": return <CycleFields form={form} setField={setField} errors={errors} />;
    case "Spare Parts": return <SparePartsFields form={form} setField={setField} errors={errors} />;
    default: return null;
  }
};

const EditListing = () => {
  const { id, type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [listingType, setListingType] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    condition: "Good",
    location: "",
    phone: "",
    images: [],
    // Vehicle fields
    brand: "",
    model: "",
    variant: "",
    year: "",
    kmDriven: "",
    fuelType: "",
    transmission: "",
    ownership: "",
    engineCC: "",
    cycleType: "",
    gearCount: "",
    frameSize: "",
    compatibleVehicle: "",
    partCategory: "",
  });

  // Existing image URLs from the listing
  const [existingImages, setExistingImages] = useState([]);
  // New files selected by user
  const [newImageFiles, setNewImageFiles] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const normalizedRouteType = (() => {
    const routeType = (type || location.state?.listingType || "")
      .toLowerCase()
      .trim();

    if (routeType === "vehicles" || routeType === "vehicle") return "vehicles";
    if (routeType === "electronics" || routeType === "electronic") return "electronics";
    return null;
  })();

  // Auth guard
  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/signin", { replace: true });
    }
  }, [user, navigate]);

  // Fetch listing data
  useEffect(() => {
    if (!id || !user) return;

    let mounted = true;

    const applyListing = (listing, detectedType) => {
      if (!mounted) return;

      setListingType(detectedType);
      setForm({
        title: listing.title || "",
        description: listing.description || "",
        price: listing.price?.toString() || "",
        condition: listing.condition || "Good",
        location: listing.location || "",
        phone: listing.phone || "",
        images: [],
        // Vehicle fields
        brand: listing.brand || "",
        model: listing.model || "",
        variant: listing.variant || "",
        year: listing.year || "",
        kmDriven: listing.kmDriven || "",
        fuelType: listing.fuelType || "",
        transmission: listing.transmission || "",
        ownership: listing.ownership || "",
        engineCC: listing.engineCC || "",
        cycleType: listing.cycleType || "",
        gearCount: listing.gearCount || "",
        frameSize: listing.frameSize || "",
        compatibleVehicle: listing.compatibleVehicle || "",
        partCategory: listing.partCategory || "",
      });
      setSelectedCategory(
        listing.category || (detectedType === "vehicles" ? "Vehicles" : "Electronics"),
      );
      setSelectedSubcategory(listing.subcategory || null);
      setExistingImages(listing.images || []);
      setFetchLoading(false);
    };

    const fetchByType = async (targetType) => {
      const api = targetType === "vehicles" ? vehiclesAPI : electronicsAPI;
      try {
        // Try Redux thunk first (updates Redux store)
        const action =
          targetType === "vehicles" ? fetchVehicleById(id) : fetchElectronicsById(id);
        const listing = await dispatch(action).unwrap();
        return { listing, targetType };
      } catch (thunkErr) {
        // Fallback: direct API call (bypasses Redux middleware/interceptor issues)
        console.warn(`EditListing: ${targetType} thunk failed, trying direct API`, thunkErr);
        const res = await api.getById(id);
        if (res.data?.listing) return { listing: res.data.listing, targetType };
        throw thunkErr;
      }
    };

    const fetchListing = async () => {
      setFetchLoading(true);
      setFetchError(null);

      // Helper: try one type, then fall back to the other
      const tryBothTypes = async (primaryType) => {
        const otherType = primaryType === "vehicles" ? "electronics" : "vehicles";
        try {
          return await fetchByType(primaryType);
        } catch {
          // The listing may live in the other collection (stale _listingType)
          return await fetchByType(otherType);
        }
      };

      try {
        if (normalizedRouteType) {
          // Type specified in URL — try it first, then fall back to the other
          const { listing, targetType } = await tryBothTypes(normalizedRouteType);
          applyListing(listing, targetType);
          return;
        }

        // No type in URL — try vehicles first, then electronics
        const { listing, targetType } = await tryBothTypes("vehicles");
        applyListing(listing, targetType);
      } catch (err) {
        if (!mounted) return;
        const errorMsg = typeof err === 'string' ? err : err?.message || "Failed to load listing";
        setFetchError(errorMsg);
        setFetchLoading(false);
        toast.error(errorMsg);
      }
    };

    fetchListing();

    return () => {
      mounted = false;
    };
  }, [id, user, dispatch, navigate, normalizedRouteType]);

  if (!user) return null;

  const setField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleNewFiles = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = existingImages.length + newImageFiles.length + files.length;
    if (totalImages > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }
    setNewImageFiles((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
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

    // Subcategory-specific validation for Vehicles
    if (selectedCategory === "Vehicles") {
      switch (selectedSubcategory) {
        case "Cars":
          if (!form.brand) errs.brand = "Brand is required";
          if (!form.model) errs.model = "Model is required";
          if (!form.year) errs.year = "Year is required";
          if (!form.fuelType) errs.fuelType = "Fuel type is required";
          if (!form.transmission) errs.transmission = "Transmission is required";
          if (!form.ownership) errs.ownership = "Ownership is required";
          break;
        case "Bikes":
          if (!form.brand) errs.brand = "Brand is required";
          if (!form.model) errs.model = "Model is required";
          if (!form.year) errs.year = "Year is required";
          if (!form.fuelType) errs.fuelType = "Fuel type is required";
          if (!form.ownership) errs.ownership = "Ownership is required";
          break;
        case "Cycle":
          if (!form.brand) errs.brand = "Brand is required";
          if (!form.cycleType) errs.cycleType = "Cycle type is required";
          break;
        case "Spare Parts":
          if (!form.compatibleVehicle) errs.compatibleVehicle = "Compatible vehicle is required";
          if (!form.partCategory) errs.partCategory = "Part category is required";
          break;
      }
    }

    setForm((f) => ({ ...f, ...trimmed }));
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      // Determine the effective listing type — use multiple fallbacks so
      // the correct API is always used even if state didn't propagate.
      const effectiveType =
        listingType ||
        normalizedRouteType ||
        (selectedCategory === "Vehicles" ? "vehicles" : "electronics");

      // Upload new images if any
      let newImageUrls = [];
      if (newImageFiles.length > 0) {
        try {
          const formData = new FormData();
          newImageFiles.forEach((img) => formData.append("images", img));
          const uploadAPI = effectiveType === "vehicles" ? vehiclesAPI : electronicsAPI;
          const uploadRes = await uploadAPI.uploadImages(formData);
          newImageUrls = uploadRes.data.imageUrls;
        } catch (uploadErr) {
          console.warn("Image upload failed:", uploadErr);
          toast.error("Image upload failed. Keeping existing images.");
        }
      }

      // Combine existing + new images
      const allImages = [...existingImages, ...newImageUrls];

      const listingData = {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        condition: form.condition || "Good",
        location: form.location,
        phone: form.phone,
        images: allImages,
        // Vehicle-specific (only sent for vehicles — server ignores unknown keys)
        brand: form.brand,
        model: form.model,
        variant: form.variant,
        year: form.year,
        kmDriven: form.kmDriven,
        fuelType: form.fuelType,
        transmission: form.transmission,
        ownership: form.ownership,
        engineCC: form.engineCC,
        cycleType: form.cycleType,
        gearCount: form.gearCount,
        frameSize: form.frameSize,
        compatibleVehicle: form.compatibleVehicle,
        partCategory: form.partCategory,
      };

      const updateAction =
        effectiveType === "vehicles"
          ? updateVehicleListing({ id, listingData })
          : updateElectronicsListing({ id, listingData });

      await dispatch(updateAction).unwrap();
      setLoading(false);
      toast.success("Listing updated successfully!");
      navigate("/dashboard/listings", { replace: true });
    } catch (error) {
      setLoading(false);
      console.error("Update listing error:", error);
      toast.error(
        error.message || error || "Failed to update listing. Please try again."
      );
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-500">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Unable to load listing</h2>
          <p className="text-slate-500 mb-6">{fetchError}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/dashboard/posts")}
              className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
            >
              Back to My Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalImages = existingImages.length + newImageFiles.length;

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
              <span className="text-sm text-slate-500 mr-2">Cancel</span>
              <button
                onClick={() => navigate("/dashboard/listings")}
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
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard/listings")}
              className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition"
              aria-label="Back to listings"
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
                Edit Listing
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

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category / Subcategory selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category *" error={errors.category}>
                <select
                  value={selectedCategory || ""}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory(null);
                  }}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition bg-white"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </Field>

              <Field label="Subcategory *" error={errors.subcategory}>
                <select
                  value={selectedSubcategory || ""}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition bg-white"
                  disabled={!selectedCategory}
                >
                  <option value="">Select Subcategory</option>
                  {selectedCategory &&
                    SUBCATEGORIES[selectedCategory]?.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
              </Field>
            </div>

            <Field label="Ad Title *" error={errors.title}>
              <input
                type="text"
                value={form.title}
                onChange={setField("title")}
                placeholder="e.g., iPhone 14 Pro Max 256GB"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
              />
            </Field>

            {/* Vehicle subcategory-specific fields */}
            {selectedCategory === "Vehicles" && selectedSubcategory && (
              <VehicleEditFields form={form} setField={setField} errors={errors} subcategory={selectedSubcategory} />
            )}

            <Field label="Price (₹) *" error={errors.price}>
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

            <Field label="Description *" error={errors.description}>
              <textarea
                value={form.description}
                onChange={setField("description")}
                placeholder="Describe your item in detail..."
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

            {/* Images Section */}
            <Field label={`Photos (Max 6 Images — ${totalImages}/6 used)`}>
              <div className="space-y-4">
                {/* Existing images */}
                {existingImages.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Current images:</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {existingImages.map((url, index) => (
                        <div key={`existing-${index}`} className="relative group">
                          <img
                            src={url}
                            alt={`Current ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newly added images */}
                {newImageFiles.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 mb-2">New images:</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {newImageFiles.map((file, index) => (
                        <div key={`new-${index}`} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`New ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-dashed border-emerald-300"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {totalImages < 6 && (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl h-32 cursor-pointer hover:border-[#27BB97] hover:bg-[#27BB97]/5 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleNewFiles}
                      className="hidden"
                      multiple
                    />
                    <span className="text-3xl mb-1">📸</span>
                    <span className="text-sm text-slate-500">
                      Click to add more photos ({totalImages}/6)
                    </span>
                  </label>
                )}
              </div>
            </Field>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/dashboard/listings")}
                className="flex-1 py-4 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-4 bg-gradient-to-r from-[#27BB97] to-[#1fa987] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#27BB97]/20 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
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
                    Updating listing…
                  </span>
                ) : (
                  "Save Changes →"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditListing;
