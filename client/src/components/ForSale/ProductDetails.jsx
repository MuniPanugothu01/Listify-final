import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Share2,
    MapPin,
    Clock,
    User,
    CheckCircle,
    Phone,
    MessageCircle,
    DollarSign,
    Package,
    Shield,
    Truck,
    RotateCcw,
    Zap,
} from "lucide-react";
import { GoArrowUpLeft } from "react-icons/go";

const ProductDetails = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        // Get product from localStorage
        const storedProduct = localStorage.getItem('selectedProduct');
        
        if (storedProduct) {
            try {
                setProduct(JSON.parse(storedProduct));
            } catch (error) {
                console.error('Error parsing product:', error);
                navigate('/');
            }
        } else {
            // If no product in localStorage, go back to products page
            navigate('/');
        }

        // Cleanup function
        return () => {
            // Optional: Clear localStorage when leaving page
            // localStorage.removeItem('selectedProduct');
        };
    }, [navigate]);

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

    // Create a default images array if the product doesn't have one
    const productImages = product.images || [product.image];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <div className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <GoArrowUpLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Listings</span>
                    </button>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setLiked(!liked)}
                            className={`p-2 rounded-full hover:bg-gray-100 ${
                                liked ? "text-red-500 bg-red-50" : "text-gray-400"
                            }`}
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
                                    src={productImages[selectedImage]}
                                    alt={product.title}
                                    className="w-full h-full object-contain p-4"
                                />

                                {productImages.length > 1 && (
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

                                {product.promoted && (
                                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Promoted
                                    </div>
                                )}

                                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                    {selectedImage + 1} / {productImages.length}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {productImages.length > 1 && (
                                <div className="p-4 flex gap-3 overflow-x-auto">
                                    {productImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                                selectedImage === idx 
                                                    ? "border-blue-600 ring-2 ring-blue-100" 
                                                    : "border-transparent hover:border-gray-200"
                                            }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <div className="mb-6">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                    {product.title}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{product.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>Posted just now</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description || `This ${product.title} is in great condition and ready for a new home. 
                                    Perfect for anyone looking for a quality item at a fair price. 
                                    Please contact the seller for more details or to arrange a viewing.`}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Item Details</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Condition</div>
                                        <div className="font-semibold text-gray-900">Good</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Category</div>
                                        <div className="font-semibold text-gray-900">General</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                                        <div className="p-2 bg-green-50 rounded-full">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        </div>
                                        <span className="text-gray-700">Excellent condition</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                                        <div className="p-2 bg-blue-50 rounded-full">
                                            <Package className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <span className="text-gray-700">Original packaging</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                                        <div className="p-2 bg-yellow-50 rounded-full">
                                            <Shield className="w-5 h-5 text-yellow-500" />
                                        </div>
                                        <span className="text-gray-700">Authentic item</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                                        <div className="p-2 bg-purple-50 rounded-full">
                                            <Truck className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <span className="text-gray-700">Local pickup only</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sticky Purchase Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Price</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-gray-900">
                                                ${product.price.toLocaleString()}
                                            </span>
                                            <span className="text-gray-500 text-sm font-medium">USD</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2"
                                        onClick={() => alert('Message seller functionality')}
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Message Seller
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        {showContact ? (
                                            <div className="col-span-2 bg-gray-50 p-4 rounded-xl text-center border border-gray-200">
                                                <p className="text-sm text-gray-500 mb-1">Contact Seller</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    (555) 123-4567
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Available 9AM - 8PM EST
                                                </p>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setShowContact(true)}
                                                className="col-span-2 w-full py-3 bg-white border-2 border-gray-100 hover:border-blue-100 hover:bg-blue-50 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                                            >
                                                <Phone className="w-5 h-5" />
                                                Show Phone Number
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <Shield className="w-4 h-4 text-green-500" />
                                    <span>Buy with confidence • Protected payments</span>
                                </div>
                            </div>

                            {/* Seller Info Card */}
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">
                                        S
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Seller</h4>
                                        <p className="text-sm text-gray-600">Member since 2024</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Response rate:</span>
                                        <span className="font-medium text-gray-900">98%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Response time:</span>
                                        <span className="font-medium text-gray-900">Within 1 hour</span>
                                    </div>
                                </div>
                            </div>

                            {/* Safety Tips Card */}
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900">Safety Tips</h4>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                                    <li>Meet in a public place</li>
                                    <li>Inspect the item before paying</li>
                                    <li>Cash is recommended for local deals</li>
                                    <li>Don't wire money to strangers</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;