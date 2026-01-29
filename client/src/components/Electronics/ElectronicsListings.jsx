import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    Smartphone,
    Laptop,
    Camera,
    Headphones,
    Watch,
    Search,
    Plus,
    Minus,
    ChevronDown,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight,
    Star,
    Clock,
    User,
    CheckCircle,
    Eye,
    Phone,
    MessageCircle,
    Images,
    Calendar,
    Monitor,
    Cpu,
    Tv,
    Wifi,
} from "lucide-react";
import {
    FaMapMarkerAlt,
    FaMemory,
    FaMicrochip,
    FaBatteryFull,
    FaBluetooth,
    FaHdd,
    FaMobileAlt,
    FaCamera,
} from "react-icons/fa";
import { GoArrowUpLeft } from "react-icons/go";

// Mock data for electronics
const allElectronics = [
    {
        id: 1,
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1611186871348-184ac2dc96db?w=800&h=600&fit=crop",
        ],
        title: "MacBook Pro 16-inch M1 Max",
        description: "Silver, 32GB RAM, 1TB SSD",
        brand: "Apple",
        condition: "Like New",
        posted: "2 hrs ago",
        postedBy: "TechResale Pro",
        category: "Laptop",
        price: 2400,
        location: "Toronto, ON",
        verified: true,
        immediate: true,
        discount: "Includes Case",
        contact: "+1 (416) 555-0101",
        views: 156,
        saves: 42,
        rating: 4.9,
        reviews: 12,
        responseRate: "100%",
        responseTime: "< 30m",
        availableForCall: true,
        warranty: "6 months AppleCare",
        boxIncluded: true,
        specs: {
            storage: "1TB SSD",
            ram: "32GB",
            screenSize: "16 inch",
            processor: "M1 Max",
        },
        features: [
            "M1 Max Chip",
            "Retina Display",
            "Touch ID",
            "32GB RAM",
            "1TB SSD",
            "MagSafe",
        ],
        details:
            "Pristine condition MacBook Pro 16. Battery health 98%. Comes with original box and charger. AppleCare+ valid until 2025.",
    },
    {
        id: 2,
        images: [
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&h=600&fit=crop",
        ],
        title: "iPhone 14 Pro Max - Deep Purple",
        description: "256GB, Unlocked",
        brand: "Apple",
        condition: "Used - Good",
        posted: "5 hrs ago",
        postedBy: "John Doe",
        category: "Smartphone",
        price: 950,
        location: "Mississauga, ON",
        verified: true,
        immediate: false,
        discount: "Negotiable",
        contact: "+1 (416) 555-0102",
        views: 89,
        saves: 23,
        rating: 4.5,
        reviews: 5,
        responseRate: "90%",
        responseTime: "< 2h",
        availableForCall: true,
        warranty: "Expired",
        boxIncluded: false,
        specs: {
            storage: "256GB",
            ram: "6GB",
            screenSize: "6.7 inch",
            processor: "A16 Bionic",
        },
        features: [
            "Dynamic Island",
            "48MP Camera",
            "5G Capable",
            "Face ID",
            "OLED Display",
        ],
        details:
            "Great condition, minor scratches on the bezel but screen is perfect. Battery health 88%. Selling because updated to 15.",
    },
    {
        id: 3,
        images: [
            "https://images.unsplash.com/photo-1593305841991-05c2e449e08e?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop",
        ],
        title: "Sony A7III Mirrorless Camera Body",
        description: "Low Shutter Count",
        brand: "Sony",
        condition: "Used - Excellent",
        posted: "1 day ago",
        postedBy: "Camera Gear Exchange",
        category: "Camera",
        price: 1300,
        location: "North York, ON",
        verified: true,
        immediate: true,
        discount: "Bundle Deal with Lens",
        contact: "+1 (416) 555-0103",
        views: 210,
        saves: 56,
        rating: 4.8,
        reviews: 34,
        responseRate: "95%",
        responseTime: "< 1h",
        availableForCall: true,
        warranty: "30 Days Store",
        boxIncluded: true,
        specs: {
            storage: "Dual SD Slot",
            ram: "N/A",
            screenSize: "3 inch Touch",
            processor: "BIONZ X",
        },
        features: [
            "Full Frame",
            "4K Video",
            "24MP",
            "Dual Slot",
            "IBIS",
            "Wifi",
        ],
        details:
            "Excellent condition Sony A7III. Shutter count only 15k. minimal signs of wear. Sensor is clean.",
    },
    {
        id: 4,
        images: [
            "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1588872657578-c011f01684c7?w=800&h=600&fit=crop",
        ],
        title: "Dell XPS 15 9500",
        description: "4K Touch, i7, 16GB, 512GB",
        brand: "Dell",
        condition: "Refurbished",
        posted: "3 hrs ago",
        postedBy: "Laptop Outlet",
        category: "Laptop",
        price: 1100,
        location: "Markham, ON",
        verified: true,
        immediate: true,
        discount: "1 Year Warning",
        contact: "+1 (905) 555-0104",
        views: 120,
        saves: 15,
        rating: 4.7,
        reviews: 8,
        responseRate: "98%",
        responseTime: "< 4h",
        availableForCall: false,
        warranty: "1 Year Official",
        boxIncluded: true,
        specs: {
            storage: "512GB SSD",
            ram: "16GB",
            screenSize: "15.6 inch 4K",
            processor: "Core i7-10750H",
        },
        features: [
            "4K Touchscreen",
            "NVIDIA GTX 1650Ti",
            "Face Unlock",
            "Thunderbolt 3",
            "Backlit Keyboard",
        ],
        details:
            "Professionally refurbished by Dell. Looks brand new. Zero cycles on battery. Amazing 4K display.",
    },
    {
        id: 5,
        images: [
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=600&fit=crop",
        ],
        title: "Apple Watch Series 8 45mm",
        description: "Midnight Aluminum, GPS",
        brand: "Apple",
        condition: "Open Box",
        posted: "12 hrs ago",
        postedBy: "Gadget Guys",
        category: "Wearable",
        price: 350,
        location: "Vaughan, ON",
        verified: true,
        immediate: true,
        discount: "No Tax",
        contact: "+1 (905) 555-0105",
        views: 95,
        saves: 10,
        rating: 5.0,
        reviews: 3,
        responseRate: "100%",
        responseTime: "< 10m",
        availableForCall: true,
        warranty: "10 months Apple",
        boxIncluded: true,
        specs: {
            storage: "32GB",
            ram: "1GB",
            screenSize: "45mm",
            processor: "S8",
        },
        features: [
            "Always-on Display",
            "ECG App",
            "Blood Oxygen",
            "Water Resistant",
            "Sleep Tracking",
        ],
        details:
            "Opened but never used. Strap is still sealed. Full warranty remaining.",
    },
    {
        id: 6,
        images: [
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop",
        ],
        title: "iPad Air 5th Gen (Blue)",
        description: "64GB, Wifi",
        brand: "Apple",
        condition: "Used - Good",
        posted: "1 day ago",
        postedBy: "Sarah Smith",
        category: "Tablet",
        price: 500,
        location: "Toronto, ON",
        verified: false,
        immediate: false,
        discount: "Firm Price",
        contact: "+1 (416) 555-0106",
        views: 180,
        saves: 28,
        rating: 4.8,
        reviews: 14,
        responseRate: "85%",
        responseTime: "< 5h",
        availableForCall: true,
        warranty: "None",
        boxIncluded: false,
        specs: {
            storage: "64GB",
            ram: "8GB",
            screenSize: "10.9 inch",
            processor: "M1",
        },
        features: [
            "M1 Chip",
            "Liquid Retina",
            "Apple Pencil 2 Support",
            "Touch ID",
            "USB-C",
        ],
        details:
            "Good condition iPad Air. Screen has a screen protector since day 1. Back has some sticker residue.",
    },
    {
        id: 7,
        images: [
            "https://images.unsplash.com/photo-1628135043818-7f240292be95?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=600&fit=crop",
        ],
        title: "PlayStation 5 Disc Edition",
        description: "Includes 2 Controllers",
        brand: "Sony",
        condition: "Used - Like New",
        posted: "4 hrs ago",
        postedBy: "Gamer Zone",
        category: "Gaming",
        price: 450,
        location: "Brampton, ON",
        verified: true,
        immediate: true,
        discount: "Bundle",
        contact: "+1 (905) 555-0107",
        views: 300,
        saves: 80,
        rating: 4.6,
        reviews: 40,
        responseRate: "92%",
        responseTime: "1h",
        availableForCall: true,
        warranty: "Expired",
        boxIncluded: true,
        specs: {
            storage: "825GB SSD",
            ram: "16GB",
            screenSize: "N/A",
            processor: "Zen 2",
        },
        features: [
            "4K 120Hz",
            "Ray Tracing",
            "Haptic Feedback",
            "3D Audio",
            "Disc Drive",
        ],
        details:
            "Barely used PS5. Comes with God of War Ragnarök and 2 DualSense controllers. Original box included.",
    },
    {
        id: 8,
        images: [
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
        ],
        title: "Sony WH-1000XM5 Headphones",
        description: "Noise Cancelling, Black",
        brand: "Sony",
        condition: "New",
        posted: "1 hr ago",
        postedBy: "Audio World",
        category: "Headphones",
        price: 380,
        location: "Toronto, ON",
        verified: true,
        immediate: true,
        discount: "Sale",
        contact: "+1 (416) 555-0108",
        views: 60,
        saves: 12,
        rating: 4.9,
        reviews: 20,
        responseRate: "99%",
        responseTime: "< 5m",
        availableForCall: true,
        warranty: "1 Year",
        boxIncluded: true,
        specs: {
            storage: "N/A",
            ram: "N/A",
            screenSize: "N/A",
            processor: "V1",
        },
        features: [
            "Noise Cancellation",
            "30h Battery",
            "LDAC",
            "Multipoint",
            "Touch Control",
        ],
        details:
            "Brand new sealed in box Sony XM5 headphones. Unwanted gift. Receipt included for warranty.",
    },
];

const categoryOptions = [
    "All Electronics",
    "Laptops",
    "Smartphones",
    "Tablets",
    "Cameras",
    "Audio",
    "Gaming",
    "Wearables",
    "Accessories",
];

const locationTypes = ["By City", "By Region", "By Postal Code"];

const radiusOptions = ["5 km", "10 km", "25 km", "50 km", "100 km"];

const priceOptions = [
    "Any Price",
    "Under $200",
    "$200 - $500",
    "$500 - $1000",
    "$1000 - $2000",
    "Over $2000",
];

const itemsPerPageOptions = [4, 8, 12, 16];

const ElectronicsListings = () => {
    const navigate = useNavigate();

    // State
    const [category, setCategory] = useState("All Electronics");
    const [locationType, setLocationType] = useState("By City");
    const [inputLocation, setInputLocation] = useState("Toronto, ON");
    const [radius, setRadius] = useState("10 km");
    const [priceRange, setPriceRange] = useState("Any Price");
    const [mainTab, setMainTab] = useState("all");
    const [sortBy, setSortBy] = useState("featured");
    const [showMoreFeatures, setShowMoreFeatures] = useState({});
    const [likedItems, setLikedItems] = useState({});
    const [showContact, setShowContact] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showPlusDropdown, setShowPlusDropdown] = useState(false);

    // Mobile sidebar state
    const [showRightSidebar, setShowRightSidebar] = useState({});

    // Sub filters
    const [subChecks, setSubChecks] = useState({
        brands: {
            Apple: true,
            Samsung: false,
            Sony: false,
            Dell: false,
            LG: false,
            Other: false,
        },
        condition: {
            New: false,
            "Like New": false,
            Used: true,
            Refurbished: false,
        },
        features: {
            "5G Capable": false,
            "4K Display": false,
            "Bluetooth": false,
            "Warranty": false,
        },
    });

    // Toggle right sidebar sections on mobile
    const toggleRightSidebar = (section) => {
        setShowRightSidebar((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleSubToggle = (mainId, subLabel) => {
        setSubChecks((prev) => ({
            ...prev,
            [mainId]: {
                ...prev[mainId],
                [subLabel]: !prev[mainId][subLabel],
            },
        }));
    };

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const toggleFeatures = (id) => {
        setShowMoreFeatures((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleLike = (id) => {
        setLikedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleContact = (id) => {
        setShowContact((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const nextImage = (id, totalImages) => {
        setCurrentImageIndex((prev) => ({
            ...prev,
            [id]: ((prev[id] || 0) + 1) % totalImages,
        }));
    };

    const prevImage = (id, totalImages) => {
        setCurrentImageIndex((prev) => ({
            ...prev,
            [id]: ((prev[id] || 0) - 1 + totalImages) % totalImages,
        }));
    };

    const handleSearch = () => {
        console.log("Searching Electronics:", {
            category,
            locationType,
            inputLocation,
            radius,
            priceRange,
        });
        setCurrentPage(1);
    };

    const handleSaveSearch = () => {
        alert("Search criteria saved!");
    };

    const handleShare = (item) => {
        if (navigator.share) {
            navigator.share({
                title: item.title,
                text: item.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
        }
    };

    const handleCall = (item) => {
        if (item.availableForCall && item.contact) {
            window.location.href = `tel:${item.contact}`;
        }
    };

    const handleMessage = (item) => {
        alert(`Opening chat with ${item.postedBy}`);
    };

    // Pagination logic
    const totalPages = Math.ceil(allElectronics.length / itemsPerPage);

    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allElectronics.slice(startIndex, endIndex);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const section = document.querySelector(".listings-section");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleItemsPerPageChange = (val) => {
        setItemsPerPage(Number(val));
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        // simplified
        const pages = [];
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        return pages;
    };

    // Icons mapping
    const featureIcons = {
        "Wi-Fi": <Wifi size={14} />,
        "Bluetooth": <FaBluetooth size={14} />,
        "5G Capable": <FaMobileAlt size={14} />,
        "4K Video": <FaCamera size={14} />,
        "Retina Display": <Monitor size={14} />,
        "Touch ID": <FaMicrochip size={14} />,
        "M1 Max Chip": <Cpu size={14} />,
        "Noise Cancellation": <Headphones size={14} />,
        "Water Resistant": <FaMapMarkerAlt size={14} />, // Placeholder or use specialized icon
        "SSD": <FaHdd size={14} />,
        "Batty": <FaBatteryFull size={14} />,
    };

    const Badge = ({ children, type = "default" }) => {
        const styles = {
            verified: "bg-green-100 text-green-800 border-green-200",
            immediate: "bg-blue-100 text-blue-800 border-blue-200",
            discount: "bg-orange-100 text-orange-800 border-orange-200",
            default: "bg-gray-100 text-gray-800 border-gray-200",
        };
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[type]}`}>
                {type === "verified" && <CheckCircle size={12} />}
                {type === "immediate" && <Clock size={12} />}
                {children}
            </span>
        );
    };

    const RatingStars = ({ rating, reviews }) => (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={14} className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
            </div>
            <span className="text-sm text-gray-600">({reviews})</span>
        </div>
    );

    const ElectronicsCard = ({ item }) => {
        const currentIndex = currentImageIndex[item.id] || 0;
        const totalImages = item.images.length;

        // Navigate to details page
        const goToDetails = () => {
            navigate("/electronics-details", {
                state: {
                    product: item,
                    fromListings: true,
                    searchParams: { category, inputLocation, priceRange }
                }
            });
        };

        return (
            <div
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                onClick={goToDetails}
            >
                <div className="flex flex-col sm:flex-row">
                    {/* Image Section */}
                    <div className="sm:w-2/5 h-48 sm:h-auto relative">
                        <div className="relative w-full h-full overflow-hidden">
                            <img
                                src={item.images[currentIndex]}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />

                            {totalImages > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); prevImage(item.id, totalImages); }}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); nextImage(item.id, totalImages); }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </>
                            )}

                            {/* Like/Share */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                                    className={`p-2 rounded-full shadow-lg ${likedItems[item.id] ? "bg-red-500 text-white" : "bg-white text-gray-600"} hover:shadow-xl`}
                                >
                                    <Heart size={16} fill={likedItems[item.id] ? "currentColor" : "none"} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleShare(item); }}
                                    className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-100"
                                >
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="sm:w-3/5 p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-1 pr-4">
                                    <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 line-clamp-2 leading-tight">
                                        {item.title}
                                    </h3>
                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><FaMapMarkerAlt size={12} /> {item.location}</span>
                                        <span className="flex items-center gap-1"><Monitor size={12} /> {item.category}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {item.posted}</span>
                                    </div>

                                    {/* Rating */}
                                    <div className="mt-2 flex items-center gap-3">
                                        <RatingStars rating={item.rating} reviews={item.reviews} />
                                        <span className="text-xs text-gray-400">Response: {item.responseTime}</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">${item.price.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">{item.condition}</div>
                                </div>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-gray-50 p-2 rounded-lg mb-3">
                                <div className="text-center">
                                    <div className="font-semibold text-gray-700">Storage</div>
                                    <div className="text-gray-500 truncate">{item.specs.storage || "N/A"}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-gray-700">RAM</div>
                                    <div className="text-gray-500 truncate">{item.specs.ram || "N/A"}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-gray-700">Screen</div>
                                    <div className="text-gray-500 truncate">{item.specs.screenSize || "N/A"}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-gray-700">Warranty</div>
                                    <div className="text-gray-500 truncate">{item.warranty}</div>
                                </div>
                            </div>

                            {/* Features / Amenities */}
                            <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                    {item.features.slice(0, 4).map((feat, idx) => (
                                        <span key={idx} className="flex items-center gap-1 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                            {featureIcons[feat] || <CheckCircle size={10} />} {feat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.details}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <div className="text-sm text-gray-500">
                                {showContact[item.id] ? (
                                    <span className="flex items-center gap-1 text-gray-800 font-medium"><Phone size={14} /> {item.contact}</span>
                                ) : (
                                    <button onClick={(e) => { e.stopPropagation(); toggleContact(item.id); }} className="text-blue-500 hover:underline">Show Contact</button>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleCall(item); }}
                                    disabled={!item.availableForCall}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border ${item.availableForCall ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                                >
                                    <Phone size={14} /> Call
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleMessage(item); }}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-[#27bb97] text-white hover:bg-[#1fa987] shadow-sm"
                                >
                                    <MessageCircle size={14} /> Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white pb-20 lg:pb-0">
            <div className="hidden lg:block ml-10 mt-2">
                <Link to="/electronics">
                    <p className="flex items-center gap-2 text-[#27bb97] capitalize hover:underline">
                        <GoArrowUpLeft /> back to home
                    </p>
                </Link>
            </div>

            {/* Header / Search Section */}
            <div className="pt-10 pb-6 px-4 sm:px-8 lg:px-20">
                <div className="flex items-center gap-2 text-sm mb-6 overflow-x-auto pb-1">
                    <span className="font-semibold text-gray-900 whitespace-nowrap">Electronics</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-gray-500 whitespace-nowrap">{category} in {inputLocation}</span>
                </div>

                <div className="mb-6">
                    <div className="flex flex-col lg:flex-row items-center gap-3">
                        <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto gap-2">
                            {/* Category Dropdown */}
                            <div className="w-full lg:w-auto relative">
                                <button
                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                    className="w-full flex justify-between items-center pl-3 pr-10 py-3 text-base border border-gray-200 rounded-lg text-gray-700 bg-white"
                                >
                                    <span className="truncate">{category}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>
                                {showCategoryDropdown && (
                                    <div className="absolute top-full left-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg w-full lg:w-64 p-2 mt-1">
                                        {categoryOptions.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => { setCategory(opt); setShowCategoryDropdown(false); }}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-gray-700"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Location Type */}
                            <div className="w-full lg:w-auto relative">
                                <select
                                    value={locationType}
                                    onChange={(e) => setLocationType(e.target.value)}
                                    className="w-full pl-3 pr-10 py-3 text-base border border-gray-200 rounded-lg text-gray-700 bg-white appearance-none"
                                >
                                    {locationTypes.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>

                            {/* Location Input */}
                            <div className="w-full lg:w-auto relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={inputLocation}
                                    onChange={(e) => setInputLocation(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 text-base border border-gray-200 rounded-lg"
                                    placeholder="Enter city..."
                                />
                            </div>

                            {/* Radius */}
                            <div className="w-full lg:w-auto relative">
                                <select
                                    value={radius}
                                    onChange={(e) => setRadius(e.target.value)}
                                    className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-lg bg-white appearance-none"
                                >
                                    {radiusOptions.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>

                            {/* Price */}
                            <div className="w-full lg:w-auto relative">
                                <select
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-lg bg-white appearance-none"
                                >
                                    {priceOptions.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="w-full lg:w-fit px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            <span>View Results</span>
                        </button>

                        {/* Plus Button - Simplified for brevity */}
                        <button
                            onClick={() => setShowPlusDropdown(!showPlusDropdown)}
                            className="p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                        >
                            {showPlusDropdown ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Banner Section */}
                <div className="w-full h-auto lg:h-[40vh] mt-8 bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col lg:flex-row items-center justify-between p-8 lg:px-16 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="w-full lg:w-1/2 z-10 text-white mb-6 lg:mb-0">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Upgrade Your Tech Game</h2>
                        <p className="text-lg opacity-90 mb-6">Find the best deals on latops, phones, and more. Verified sellers, secure transactions.</p>
                        <button className="bg-[#27bb97] hover:bg-[#1fa987] text-white px-6 py-3 rounded font-semibold uppercase tracking-wider text-sm transition-all">
                            Browse Deals
                        </button>
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
                        <Laptop size={200} className="text-white/20 absolute right-10 -bottom-10 rotate-12" />
                        <Smartphone size={150} className="text-white/10 absolute right-60 top-10 -rotate-12" />
                        {/* Placeholder image representation */}
                        <div className="relative w-64 h-48 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center">
                            <Camera size={64} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 mt-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Listings */}
                    <div className="w-full lg:w-[70%]">
                        <div className="bg-white p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center mb-6">
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800">Electronics in {inputLocation}</h1>
                                <p className="text-sm text-gray-500">{allElectronics.length} items found</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <select className="border-none bg-transparent font-medium text-gray-700 focus:ring-0 cursor-pointer">
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest</option>
                                </select>
                            </div>
                        </div>

                        <div className="listings-section grid grid-cols-1 gap-4">
                            {getCurrentItems().map(item => (
                                <ElectronicsCard key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Show:</span>
                                <select
                                    value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(e.target.value)}
                                    className="border border-gray-300 rounded text-sm py-1"
                                >
                                    {itemsPerPageOptions.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                            </div>

                            <div className="flex gap-1">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                {getPageNumbers().map(p => (
                                    <button
                                        key={p}
                                        onClick={() => handlePageChange(p)}
                                        className={`px-3 py-1 rounded border ${currentPage === p ? "bg-blue-600 text-white" : "hover:bg-gray-50"}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-[30%] space-y-4">
                        {/* Popular Categories */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-800 mb-3">Popular Categories</h3>
                            <div className="flex flex-col gap-2 text-sm">
                                <a href="#" className="text-blue-600 hover:underline">Laptops</a>
                                <a href="#" className="text-blue-600 hover:underline">Smartphones</a>
                                <a href="#" className="text-blue-600 hover:underline">Cameras</a>
                                <a href="#" className="text-blue-600 hover:underline">Gaming Consoles</a>
                            </div>
                        </div>

                        {/* Top Brands */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-800 mb-3">Top Brands</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Apple", "Samsung", "Sony", "Dell", "Canon", "Nintendo"].map(b => (
                                    <span key={b} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 font-medium">
                                        {b}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Deals */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <h3 className="font-semibold text-blue-800 mb-2">Refurbished Deals</h3>
                            <p className="text-xs text-blue-600 mb-3">Save up to 40% on certified refurbished electronics.</p>
                            <button className="w-full py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">View Offers</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ElectronicsListings;
