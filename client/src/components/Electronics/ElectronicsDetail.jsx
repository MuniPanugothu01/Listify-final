import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  ChevronRight,
  Star,
  Check,
  Clock,
  Shield,
  Truck,
  Package,
  Battery,
  Camera,
  Wifi,
  Smartphone,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Navigation,
  Globe,
  Headphones,
  Watch,
  Gamepad,
  Laptop,
  Loader2,
} from 'lucide-react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  fetchElectronicsById,
  fetchAllElectronics,
  clearCurrentListing,
  toggleSaveElectronics,
} from '../../redux/slices/electronicsSlice';

// Location Map Component
const LocationMap = ({ location }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#27bb97]" />
          Location
        </h3>
        <p className="text-gray-600 mt-2">{location}</p>
      </div>
      
      <div className="relative h-64 sm:h-72 md:h-80 bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-50">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #cbd5e1 1px, transparent 1px),
              linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
          
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="w-12 h-12 text-red-500 animate-pulse" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg text-center">
              <p className="font-medium text-gray-800">{location}</p>
              <p className="text-xs text-gray-500 mt-1">Approximate location</p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm">
          <Navigation className="w-4 h-4 text-gray-600" />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Globe className="w-4 h-4 mr-2" />
            <span>Local pickup available</span>
          </div>
          <button className="text-sm text-[#27bb97] hover:text-[#1fa987] font-medium">
            Get directions →
          </button>
        </div>
      </div>
    </div>
  );
};

const ElectronicsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentListing: product, detailLoading, listings, error } = useSelector(
    (state) => state.electronics
  );
  const { user } = useSelector((state) => state.auth);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isSaved =
    product?._saved ||
    (user && product?.savedBy?.includes(user._id || user.id));

  const handleToggleSave = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (product?._id) {
      dispatch(toggleSaveElectronics(product._id));
    }
  };

  useEffect(() => {
    // Fetch the product from API
    dispatch(fetchElectronicsById(id));
    // Also fetch all listings for similar items section
    if (listings.length === 0) {
      dispatch(fetchAllElectronics());
    }
    return () => {
      dispatch(clearCurrentListing());
    };
  }, [id, dispatch]);

  const productImages = product?.images?.length > 0
    ? product.images
    : [
        product?.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
      ];

  const handleThumbnailClick = (index) => setSelectedImageIndex(index);
  const handlePrevImage = () =>
    setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  const handleNextImage = () =>
    setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));

  // Get similar products from Redux store (excluding current product)
  const similarProducts = listings
    .filter(p => (p._id || p.id) !== (product?._id || product?.id))
    .slice(0, 4);

  // Loading state
  if (detailLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#27bb97] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-md">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600 mb-6">Please select a product from the electronics listing page.</p>
          <button
            onClick={() => navigate('/electronics')}
            className="px-6 py-3 bg-[#27BB97] text-white rounded-lg hover:bg-[#1E9E7E] transition-colors font-medium text-base sm:text-lg"
          >
            Back to Electronics
          </button>
        </div>
      </div>
    );
  }

  // Generate specs based on product category
  const getProductSpecs = () => {
    const category = product.category?.toLowerCase() || '';
    const title = product.title.toLowerCase();
    
    if (category.includes('wearables') || title.includes('watch') || title.includes('fitbit')) {
      return [
        { icon: <Watch className="text-[#27bb97] text-xl" />, label: 'Battery Life', value: '24+ hours' },
        { icon: <Wifi className="text-[#27bb97] text-xl" />, label: 'Connectivity', value: 'Bluetooth 5.2' },
        { icon: <Shield className="text-[#27bb97] text-xl" />, label: 'Water Resistance', value: 'IP68' },
        { icon: <Smartphone className="text-[#27bb97] text-xl" />, label: 'Display', value: '1.93" AMOLED' },
      ];
    } else if (category.includes('headphones') || title.includes('headphone') || title.includes('airpod') || title.includes('earbud')) {
      return [
        { icon: <Headphones className="text-[#27bb97] text-xl" />, label: 'Battery Life', value: '30 hours' },
        { icon: <Wifi className="text-[#27bb97] text-xl" />, label: 'Connectivity', value: 'Bluetooth 5.0' },
        { icon: <Shield className="text-[#27bb97] text-xl" />, label: 'Noise Cancelling', value: 'Active' },
        { icon: <Battery className="text-[#27bb97] text-xl" />, label: 'Charging', value: 'USB-C' },
      ];
    } else if (category.includes('camera') || title.includes('camera') || title.includes('dji') || title.includes('canon')) {
      return [
        { icon: <Camera className="text-[#27bb97] text-xl" />, label: 'Megapixels', value: '24MP+' },
        { icon: <Wifi className="text-[#27bb97] text-xl" />, label: 'Video', value: '4K' },
        { icon: <Shield className="text-[#27bb97] text-xl" />, label: 'Stabilization', value: 'Yes' },
        { icon: <Package className="text-[#27bb97] text-xl" />, label: 'Storage', value: 'SD Card' },
      ];
    } else if (category.includes('video games') || title.includes('ps4') || title.includes('xbox') || title.includes('game')) {
      return [
        { icon: <Gamepad className="text-[#27bb97] text-xl" />, label: 'Platform', value: title.includes('ps4') ? 'PS4' : 'Xbox' },
        { icon: <Package className="text-[#27bb97] text-xl" />, label: 'Condition', value: product.condition },
        { icon: <Shield className="text-[#27bb97] text-xl" />, label: 'Region', value: 'US' },
        { icon: <Check className="text-[#27bb97] text-xl" />, label: 'Case', value: 'Included' },
      ];
    } else if (category.includes('cell phones') || title.includes('iphone') || title.includes('phone') || title.includes('mobile')) {
      return [
        { icon: <Smartphone className="text-[#27bb97] text-xl" />, label: 'Storage', value: '128GB' },
        { icon: <Battery className="text-[#27bb97] text-xl" />, label: 'Battery Health', value: '90%+' },
        { icon: <Camera className="text-[#27bb97] text-xl" />, label: 'Camera', value: '48MP' },
        { icon: <Shield className="text-[#27bb97] text-xl" />, label: 'Face ID', value: 'Yes' },
      ];
    } else if (category.includes('audio') || title.includes('speaker') || title.includes('microphone')) {
      return [
        { icon: <Headphones className="text-[#27bb97] text-xl" />, label: 'Sound', value: 'Stereo' },
        { icon: <Wifi className="text-[#27bb97] text-xl" />, label: 'Connectivity', value: 'Bluetooth' },
        { icon: <Battery className="text-[#27bb97] text-xl" />, label: 'Battery', value: '10+ hours' },
        { icon: <Shield className="text-[#27bb97] text-xl" />, label: 'Waterproof', value: 'IPX7' },
      ];
    } else {
      return [
        { icon: <Package className="text-[#27bb97] text-xl" />, label: 'Condition', value: product.condition },
        { icon: <Shield className="text-[#27bb97] text-xl" />, label: 'Warranty', value: 'Not included' },
        { icon: <Truck className="text-[#27bb97] text-xl" />, label: 'Shipping', value: 'Local pickup' },
        { icon: <Clock className="text-[#27bb97] text-xl" />, label: 'Listed', value: product.postedTime },
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <div className="bg-white shadow-sm top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-sm text-gray-600 min-w-0 flex-1">
              <button
                onClick={() => navigate('/electronics')}
                className="hover:text-[#27bb97] transition-colors whitespace-nowrap"
              >
                Electronics
              </button>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-gray-900 truncate">{product.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 lg:px-8 py-6 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-6">
          {/* Left Column - Images - Takes 60% (6 columns) */}
          <div className="lg:col-span-6">
            {/* Main Image with Scroll Buttons */}
            <div className="rounded-md mb-6 shadow-sm overflow-hidden bg-white">
              <div className="relative">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.title}
                  className="w-full h-auto max-h-[500px] rounded-md object-cover bg-gray-50"
                />
                
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:shadow-xl z-20"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:shadow-xl z-20"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
                
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm z-10">
                  {selectedImageIndex + 1} / {productImages.length}
                </div>

                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={handleToggleSave}
                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isSaved ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                    />
                  </button>
                  <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="relative flex gap-3 justify-start overflow-x-auto md:overflow-visible pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`min-w-[180px] md:min-w-0 w-32 h-24 rounded-md overflow-hidden cursor-pointer transition-all ${
                    selectedImageIndex === index
                      ? 'border-2 border-[#27bb97] shadow-md'
                      : 'hover:border-2 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover bg-gray-50 hover:scale-105 transition-transform duration-300"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>

            {/* Location Map */}
            <LocationMap location={product.location} />

            {/* Additional Information Below Images */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

                  {/* Specifications */}
              {/* <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 tracking-wider text-gray-700">
                  SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-2 gap-y-4">
                  {getProductSpecs().map((spec, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg">
                        {spec.icon}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">{spec.label}</div>
                        <div className="text-sm font-medium text-gray-700">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
              

            </div>
          </div>

          {/* Right Column - Details - Takes 40% (4 columns) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Title and Price */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-3xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h2>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1 tracking-wider font-medium">
                    ASKING PRICE
                  </div>
                  <div className="text-4xl lg:text-4xl font-bold text-[#27bb97]">
                    ${product.price}
                  </div>
                </div>

                {/* Condition & Location */}
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    <span>{product.location}</span>
                  </div>
                </div>


                
               {/* Seller Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-700">SELLER INFORMATION</h3>
                  <button className="text-[#27bb97] text-sm font-medium hover:text-[#1fa987]">
                    View Profile →
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#27bb97] to-[#1E9E7E] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {(product.sellerName || product.seller?.firstName || 'U')[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center">
                      {product.sellerName || product.seller?.firstName || 'User'}
                      <Shield className="w-4 h-4 text-blue-500 ml-2" />
                    </h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.sellerRating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({product.sellerReviews || 0})</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Joined {product.sellerJoined || 'Recently'}</span>
                    </div>
                  </div>
                </div>
              </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-2">
                  <button className="w-full py-4 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-base uppercase">
                    <MessageCircle className="w-5 h-5 inline mr-2" />
                    Contact Seller
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-300 transition-colors">
                      Make Offer
                    </button>
                    <button
                      onClick={handleToggleSave}
                      className={`py-3 rounded-lg font-medium transition-colors border-2 ${
                        isSaved
                          ? 'bg-[#27bb97]/10 border-[#27bb97] text-[#27bb97]'
                          : 'bg-white border-[#27bb97] text-[#27bb97] hover:bg-[#27bb97]/5'
                      }`}
                    >
                      {isSaved ? '✓ Saved' : 'Save Item'}
                    </button>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Similar Items */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Similar Electronics</h2>
              <button 
                onClick={() => navigate('/electronics')}
                className="text-[#27bb97] hover:text-[#1E9E7E] font-medium"
              >
                View all →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((item) => (
                <div
                  key={item._id || item.id}
                  onClick={() => {
                    navigate(`/electronics/${item._id || item.id}`);
                  }}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={item.images?.[0] || item.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description?.substring(0, 80)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#27bb97]">
                        ${item.price}
                      </span>
                      {item.condition && (
                        <span className="text-xs font-medium text-gray-500 px-3 py-1.5 bg-gray-100 rounded-full">
                          {item.condition}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ElectronicsDetail;