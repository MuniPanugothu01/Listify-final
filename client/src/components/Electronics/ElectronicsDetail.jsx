import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
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
  X,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Send,
  User as UserIcon,
} from 'lucide-react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  fetchElectronicsById,
  fetchAllElectronics,
  clearCurrentListing,
  toggleSaveElectronics,
} from '../../redux/slices/electronicsSlice';
import { DetailPageSkeleton, ButtonSpinner } from '../common/Skeleton';

// Location Map Component
const LocationMap = ({ location }) => {
  const encodedLocation = encodeURIComponent(location || 'India');
  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;

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
        <iframe
          title="Listing Location"
          src={mapsEmbedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Globe className="w-4 h-4 mr-2" />
            <span>Local pickup available</span>
          </div>
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#27bb97] hover:text-[#1fa987] font-medium"
          >
            Get directions →
          </a>
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
  const [showSellerProfile, setShowSellerProfile] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [savingItem, setSavingItem] = useState(false);
  const [contactingLoading, setContactingLoading] = useState(false);
  const [mainImgLoaded, setMainImgLoaded] = useState(false);

  const isSaved =
    product?._saved ||
    (user && product?.savedBy?.includes(user._id || user.id));

  const handleToggleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (product?._id) {
      setSavingItem(true);
      await dispatch(toggleSaveElectronics(product._id));
      setTimeout(() => setSavingItem(false), 400);
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

  const handleThumbnailClick = (index) => { setMainImgLoaded(false); setSelectedImageIndex(index); };
  const handlePrevImage = () => {
    setMainImgLoaded(false);
    setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };
  const handleNextImage = () => {
    setMainImgLoaded(false);
    setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  // Get similar products from Redux store (excluding current product)
  const similarProducts = listings
    .filter(p => (p._id || p.id) !== (product?._id || product?.id))
    .slice(0, 4);

  // Loading state — skeleton
  if (detailLoading) {
    return <DetailPageSkeleton />;
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
    <div className="min-h-screen bg-gray-50 animate-fade-in-up">
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
                {!mainImgLoaded && (
                  <div className="w-full h-[400px] lg:h-[500px] bg-gray-200 skeleton-shimmer rounded-md" />
                )}
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.title}
                  className={`w-full h-auto max-h-[500px] rounded-md object-cover bg-gray-50 transition-opacity duration-300 ${!mainImgLoaded ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}
                  onLoad={() => setMainImgLoaded(true)}
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
                    disabled={savingItem}
                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow disabled:opacity-70"
                  >
                    {savingItem ? (
                      <ButtonSpinner size="sm" className="text-gray-500" />
                    ) : (
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          isSaved ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      />
                    )}
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
                  <button
                    onClick={() => setShowSellerProfile(!showSellerProfile)}
                    className="text-[#27bb97] text-sm font-medium hover:text-[#1fa987] transition-colors"
                  >
                    {showSellerProfile ? 'Hide Profile ↑' : 'View Profile →'}
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  {product.seller?.profileImage ? (
                    <img
                      src={product.seller.profileImage}
                      alt={product.sellerName || 'Seller'}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#27bb97]/20"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-[#27bb97] to-[#1E9E7E] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {(product.sellerName || product.seller?.firstName || 'U')[0]}
                    </div>
                  )}
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

                {/* Expanded Seller Profile */}
                {showSellerProfile && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <UserIcon className="w-4 h-4 text-[#27bb97]" />
                      <span className="font-medium">Full Name:</span>
                      <span>
                        {product.seller?.firstName && product.seller?.lastName
                          ? `${product.seller.firstName} ${product.seller.lastName}`
                          : product.sellerName || 'Not provided'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-[#27bb97]" />
                      <span className="font-medium">Email:</span>
                      <span>{product.seller?.email || 'Not provided'}</span>
                    </div>
                    {product.phone && (
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-[#27bb97]" />
                        <span className="font-medium">Phone:</span>
                        <span>+91 {product.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-[#27bb97]" />
                      <span className="font-medium">Member since:</span>
                      <span>
                        {product.seller?.createdAt
                          ? new Date(product.seller.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                          : product.sellerJoined || 'Recently'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#27bb97]" />
                      <span className="font-medium">Location:</span>
                      <span>{product.location || 'Not specified'}</span>
                    </div>
                  </div>
                )}
              </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-2">
                  <button
                    onClick={() => {
                      setContactingLoading(true);
                      setTimeout(() => {
                        navigate('/dashboard/messages');
                      }, 600);
                    }}
                    disabled={contactingLoading}
                    className="w-full py-4 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-base uppercase disabled:opacity-90 disabled:cursor-not-allowed"
                  >
                    {contactingLoading ? (
                      <>
                        <ButtonSpinner size="sm" className="inline mr-2 text-white" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 inline mr-2" />
                        Contact Seller
                      </>
                    )}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        if (!user) {
                          toast.error('Please login to make an offer');
                          navigate('/signin');
                          return;
                        }
                        setOfferAmount('');
                        setShowOfferModal(true);
                      }}
                      className="py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-300 transition-colors"
                    >
                      Make Offer
                    </button>
                    <button
                      onClick={handleToggleSave}
                      disabled={savingItem}
                      className={`py-3 rounded-lg font-medium transition-colors border-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                        isSaved
                          ? 'bg-[#27bb97]/10 border-[#27bb97] text-[#27bb97]'
                          : 'bg-white border-[#27bb97] text-[#27bb97] hover:bg-[#27bb97]/5'
                      }`}
                    >
                      {savingItem ? (
                        <><ButtonSpinner size="xs" className="inline mr-1.5 text-[#27bb97]" />Saving...</>
                      ) : (
                        isSaved ? '✓ Saved' : 'Save Item'
                      )}
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

      {/* Make Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowOfferModal(false)}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95">
            <button
              onClick={() => setShowOfferModal(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#27bb97]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-7 h-7 text-[#27bb97]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Make an Offer</h3>
              <p className="text-sm text-gray-500 mt-1">
                Listing price: <span className="font-semibold text-[#27bb97]">${product.price}</span>
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Offer Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-lg">₹</span>
                <input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder="Enter your offer"
                  min="1"
                  autoFocus
                  className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-lg font-medium focus:border-[#27bb97] focus:ring-2 focus:ring-[#27bb97]/20 outline-none transition-all"
                />
              </div>
              {offerAmount && Number(offerAmount) > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  {Number(offerAmount) < product.price
                    ? `${Math.round(((product.price - Number(offerAmount)) / product.price) * 100)}% below asking price`
                    : Number(offerAmount) === product.price
                    ? 'Matches asking price'
                    : `${Math.round(((Number(offerAmount) - product.price) / product.price) * 100)}% above asking price`}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowOfferModal(false)}
                className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!offerAmount || Number(offerAmount) <= 0) {
                    toast.error('Please enter a valid offer amount');
                    return;
                  }
                  setShowOfferModal(false);
                  toast.success(
                    `Offer of ₹${Number(offerAmount).toLocaleString()} sent to ${product.sellerName || 'seller'} successfully!`,
                    { duration: 4000 }
                  );
                }}
                className="flex-[1.5] py-3 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default ElectronicsDetail;