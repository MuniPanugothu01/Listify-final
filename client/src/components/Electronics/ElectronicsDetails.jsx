import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Share2,
    MapPin,
    Star,
    Clock,
    User,
    CheckCircle,
    Phone,
    MessageCircle,
    Wifi,
    Cpu,
    Monitor,
    Battery,
    Shield,
    Box,
    Truck,
    RotateCcw,
    Zap,
} from "lucide-react";
import {
    FaMapMarkerAlt,
    FaMicrochip,
    FaMemory,
    FaHdd,
    FaBluetooth,
    FaCamera,
} from "react-icons/fa";
import { GoArrowUpLeft } from "react-icons/go";

const ElectronicsDetails = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState("Overview");
    const [liked, setLiked] = useState(false);
    const [showContact, setShowContact] = useState(false);

    // Default product data in case localStorage is empty
    const defaultProduct = {
        id: 1,
        title: 'iPhone 15 Pro Max',
        category: 'Smartphones',
        price: 899,
        details: 'Brand new iPhone 15 Pro Max in excellent condition with all accessories. Perfect for everyday use with excellent performance.',
        condition: 'Like New',
        features: [
            'Excellent condition',
            'Complete accessories',
            'Original packaging',
            'Tested & working',
            '30-day return policy',
            'Free shipping available'
        ],
        specs: {
            storage: '256GB',
            ram: '8GB',
            screenSize: '6.1"',
            processor: 'A16 Bionic',
            battery: 'All day battery',
            camera: '48MP Main',
            connectivity: '5G, WiFi 6, Bluetooth 5.3',
            os: 'iOS 17'
        },
        warranty: 'No manufacturer warranty',
        boxIncluded: true,
        availableForCall: true,
        contact: '+1 (416) 123-4567',
        responseTime: 'Less than 1 hour',
        responseRate: '98%',
        postedBy: 'Alex Johnson',
        verified: true,
        images: [
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
            'https://images.unsplash.com/photo-1546054451-aa224c0e8c23?w=400&q=80'
        ],
        location: 'Toronto, ON',
        postedDate: '2 days ago'
    };

    useEffect(() => {
        // Get product from localStorage
        const storedProduct = localStorage.getItem('selectedProduct');
        
        if (storedProduct) {
            try {
                setProduct(JSON.parse(storedProduct));
            } catch (error) {
                console.error('Error parsing product:', error);
                setProduct(defaultProduct);
            }
        } else {
            // If no product in localStorage, use default
            setProduct(defaultProduct);
        }

        // Cleanup function
        return () => {
            // Optional: Clear localStorage when leaving page
            // localStorage.removeItem('selectedProduct');
        };
    }, []);

    const handlePrevImage = () => {
        setSelectedImage((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setSelectedImage((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const tabs = ["Overview", "Specs", "Warranty", "Seller"];

    // Mapping features to icons
    const featureIcons = {
        "Wi-Fi": <Wifi className="w-5 h-5 text-blue-500" />,
        "Bluetooth": <FaBluetooth className="w-5 h-5 text-blue-600" />,
        "5G Capable": <Zap className="w-5 h-5 text-yellow-500" />,
        "4K Video": <FaCamera className="w-5 h-5 text-gray-700" />,
        "Retina Display": <Monitor className="w-5 h-5 text-purple-500" />,
        "Touch ID": <FaMicrochip className="w-5 h-5 text-pink-500" />,
        "M1 Max Chip": <Cpu className="w-5 h-5 text-gray-900" />,
        "M1 Chip": <Cpu className="w-5 h-5 text-blue-500" />,
        "Noise Cancellation": <Zap className="w-5 h-5 text-orange-500" />,
        "Water Resistant": <Shield className="w-5 h-5 text-blue-400" />,
        "32GB RAM": <FaMemory className="w-5 h-5 text-green-600" />,
        "1TB SSD": <FaHdd className="w-5 h-5 text-indigo-500" />,
        "MagSafe": <Zap className="w-5 h-5 text-yellow-400" />,
        "Face ID": <User className="w-5 h-5 text-green-500" />,
        "OLED Display": <Monitor className="w-5 h-5 text-black" />,
        "Excellent condition": <CheckCircle className="w-5 h-5 text-green-500" />,
        "Complete accessories": <Box className="w-5 h-5 text-blue-500" />,
        "Original packaging": <Box className="w-5 h-5 text-yellow-500" />,
        "Tested & working": <CheckCircle className="w-5 h-5 text-green-500" />,
        "30-day return policy": <RotateCcw className="w-5 h-5 text-blue-500" />,
        "Free shipping available": <Truck className="w-5 h-5 text-green-500" />,
    };

    const policies = [
        {
            rule: "Return Policy",
            details: "30-day returns accepted if item is not as described.",
            icon: <RotateCcw className="w-5 h-5 text-blue-500" />,
        },
        {
            rule: "Shipping",
            details: "Free shipping within Canada via Canada Post Expedited.",
            icon: <Truck className="w-5 h-5 text-green-500" />,
        },
        {
            rule: "Box Included",
            details: product?.boxIncluded ? "Original box and accessories included" : "Device only, no original box",
            icon: <Box className="w-5 h-5 text-yellow-500" />,
        },
    ];

    // If product is still loading
    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 ">
            {/* Top Navigation */}
            <div className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#27bb97] transition-colors"
                    >
                        <GoArrowUpLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Listings</span>
                    </button>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setLiked(!liked)}
                            className={`p-2 rounded-full hover:bg-gray-100 ${liked ? "text-red-500 bg-red-50" : "text-gray-400"}`}
                        >
                            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN - Images & Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                            <div className="relative h-[400px] sm:h-[500px] bg-gray-100">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.title}
                                    className="w-full h-full object-contain mix-blend-multiply p-4"
                                />

                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all"
                                        >
                                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all"
                                        >
                                            <ChevronRight className="w-6 h-6 text-gray-700" />
                                        </button>
                                    </>
                                )}

                                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                    {selectedImage + 1} / {product.images.length}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="p-4 flex gap-3 overflow-x-auto">
                                    {product.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-blue-600 ring-2 ring-blue-100" : "border-transparent hover:border-gray-200"}`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Tabs Navigation */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                            <div className="flex space-x-1 overflow-x-auto no-scrollbar">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${activeTab === tab ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            {activeTab === "Overview" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">About this {product.category}</h2>
                                        <p className="text-gray-600 leading-relaxed">{product.details}</p>
                                    </div>

                                    {/* Quick Specs Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                                            <FaHdd className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Storage</div>
                                            <div className="font-semibold text-gray-900">{product.specs.storage || "N/A"}</div>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                                            <FaMemory className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">RAM</div>
                                            <div className="font-semibold text-gray-900">{product.specs.ram || "N/A"}</div>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                                            <Monitor className="w-6 h-6 mx-auto mb-2 text-green-500" />
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Screen</div>
                                            <div className="font-semibold text-gray-900">{product.specs.screenSize || "N/A"}</div>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                                            <FaMicrochip className="w-6 h-6 mx-auto mb-2 text-red-500" />
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Processor</div>
                                            <div className="font-semibold text-gray-900">{product.specs.processor || "N/A"}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {product.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                                    <div className="p-2 bg-gray-50 rounded-full">
                                                        {featureIcons[feature] || <CheckCircle className="w-5 h-5 text-blue-500" />}
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Specs" && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                                    <div className="divide-y divide-gray-100">
                                        {Object.entries(product.specs).map(([key, value]) => (
                                            <div key={key} className="py-4 flex justify-between items-center group hover:bg-gray-50 px-2 rounded-lg transition-colors">
                                                <span className="text-gray-600 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="text-gray-900 font-semibold">{value || "-"}</span>
                                            </div>
                                        ))}
                                        <div className="py-4 flex justify-between items-center px-2">
                                            <span className="text-gray-600 font-medium">Condition</span>
                                            <span className="text-gray-900 font-semibold">{product.condition}</span>
                                        </div>
                                        <div className="py-4 flex justify-between items-center px-2">
                                            <span className="text-gray-600 font-medium">Original Box</span>
                                            <span className="text-gray-900 font-semibold">{product.boxIncluded ? "Yes" : "No"}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Warranty" && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Warranty & Policies</h2>
                                    <div className="space-y-4">
                                        <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 bg-white rounded-full shadow-sm text-blue-600">
                                                    <Shield className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-blue-900">Warranty Status</h4>
                                                    <p className="text-blue-700 mt-1">{product.warranty}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {policies.map((policy, idx) => (
                                            <div key={idx} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                                                <div className="p-2 bg-gray-50 rounded-full text-gray-600">
                                                    {policy.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{policy.rule}</h4>
                                                    <p className="text-gray-600 text-sm mt-1">{policy.details}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "Seller" && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Seller Information</h2>
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                                                {product.postedBy.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                    {product.postedBy}
                                                    {product.verified && <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-50" />}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="font-medium text-gray-900">4.9</span> (120 reviews)
                                                    </div>
                                                    <span>•</span>
                                                    <span>Member since 2021</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="bg-white p-4 rounded-lg border border-gray-100">
                                                <div className="text-sm text-gray-500 mb-1">Response Time</div>
                                                <div className="font-semibold text-gray-900">{product.responseTime}</div>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg border border-gray-100">
                                                <div className="text-sm text-gray-500 mb-1">Response Rate</div>
                                                <div className="font-semibold text-gray-900">{product.responseRate}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sticky Booking/Contact Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Price</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                                            <span className="text-gray-500 text-sm font-medium">CAD</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.availableForCall ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                            {product.availableForCall ? "Available Now" : "Busy"}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-blue-200 shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2"
                                        onClick={() => alert('Offer functionality would go here')}
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Make an Offer
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        {showContact ? (
                                            <div className="col-span-2 bg-gray-50 p-4 rounded-xl text-center border border-gray-200">
                                                <p className="text-sm text-gray-500 mb-1">Contact Number</p>
                                                <a href={`tel:${product.contact}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 block">
                                                    {product.contact}
                                                </a>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setShowContact(true)}
                                                className="w-full py-3 bg-white border-2 border-gray-100 hover:border-blue-100 hover:bg-blue-50 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                                            >
                                                <Phone className="w-5 h-5" />
                                                Show Number
                                            </button>
                                        )}

                                        {!showContact && (
                                            <button
                                                className="w-full py-3 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                                                onClick={() => alert("Save functionality")}
                                            >
                                                <Heart className="w-5 h-5" />
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <Shield className="w-4 h-4 text-green-500" />
                                    <span>Id checked • Payment Protection</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Safety Tips</h4>
                                    </div>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                                    <li>Meet in a public place</li>
                                    <li>Check the item before paying</li>
                                    <li>Don't send money in advance</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElectronicsDetails;