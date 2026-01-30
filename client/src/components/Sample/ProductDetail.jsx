import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import { electronicsData } from './Sample';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = electronicsData.find((p) => p.id === parseInt(id));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productImages = [
    product?.image,
    'https://images.unsplash.com/photo-1579586337278-3f576cfc5113?w=500&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    'https://images.unsplash.com/photo-1546054451-aa224c0e8c23?w=500&q=80',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80',
  ].filter(Boolean);

  const handleThumbnailClick = (index) => setSelectedImageIndex(index);
  const handlePrevImage = () =>
    setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  const handleNextImage = () =>
    setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-md">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
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

  const techSpecs = [
    { label: 'Battery Life', value: '24 hours', icon: <Battery className="w-4 h-4" /> },
    { label: 'Connectivity', value: 'Bluetooth 5.2', icon: <Wifi className="w-4 h-4" /> },
    { label: 'Water Resistance', value: 'IP68', icon: <Shield className="w-4 h-4" /> },
    { label: 'Display', value: '1.93" AMOLED', icon: <Smartphone className="w-4 h-4" /> },
  ];

  const similarProducts = electronicsData.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-sm text-gray-600 min-w-0 flex-1">
              <button
                onClick={() => navigate('/electronics')}
                className="hover:text-[#27BB97] transition-colors whitespace-nowrap"
              >
                Electronics
              </button>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-gray-900 truncate">{product.title}</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Images + Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Main Image */}
              <div className="relative w-full pt-[100%] sm:pt-[75%] lg:pt-[66.67%] bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-contain p-4 sm:p-8 lg:p-10"
                />

                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/70 text-white px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                  {selectedImageIndex + 1} / {productImages.length}
                </div>

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-2">
                  <button className="p-2 sm:p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                  <button className="p-2 sm:p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="p-3 sm:p-4 border-t border-gray-100">
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 snap-center transition-all duration-200 ${
                        selectedImageIndex === index
                          ? 'border-[#27BB97] ring-2 ring-[#27BB97]/30 scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description & Specs */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex overflow-x-auto">
                  {['Overview', 'Specifications', 'Seller Info'].map((tab) => (
                    <button
                      key={tab}
                      className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap transition-colors"
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-5 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Product Description</h2>
                <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                  {product.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm sm:text-base">
                          <Check className="w-5 h-5 text-[#27BB97] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Technical Specs</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {techSpecs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-sm sm:text-base"
                        >
                          <div className="flex items-center">
                            <div className="text-gray-500 mr-2">{spec.icon}</div>
                            <span className="text-gray-600">{spec.label}</span>
                          </div>
                          <span className="font-medium text-gray-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#27BB97] to-[#1E9E7E] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                    {product.seller[0]}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center">
                      {product.seller}
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 ml-2" />
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-1 text-sm">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.sellerRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-1.5 text-gray-600">({product.sellerReviews})</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Joined {product.sellerJoined}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors text-sm sm:text-base whitespace-nowrap">
                  View Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-20">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 p-5 sm:p-6">
                <div className="mb-5 sm:mb-6">
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-gray-500 ml-2 text-lg sm:text-xl">CAD</span>
                  </div>
                  <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location}</span>
                    <span className="mx-1">•</span>
                    <Clock className="w-4 h-4" />
                    <span>{product.postedTime}</span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <button className="w-full py-3.5 sm:py-4 bg-[#27BB97] hover:bg-[#1E9E7E] text-white font-bold rounded-xl shadow-lg shadow-[#27BB97]/20 transition-all hover:shadow-xl flex items-center justify-center text-base sm:text-lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Seller
                  </button>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button className="py-3 sm:py-3.5 bg-white border-2 border-gray-100 text-gray-700 font-semibold rounded-xl hover:border-gray-200 transition-colors text-sm sm:text-base">
                      Make Offer
                    </button>
                    <button className="py-3 sm:py-3.5 bg-white border-2 border-[#27BB97] text-[#27BB97] font-semibold rounded-xl hover:bg-[#27BB97]/5 transition-colors text-sm sm:text-base">
                      Save for Later
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-5 sm:pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span>Protected by our safety guidelines</span>
                  </div>
                </div>
              </div>

              {/* Location & Condition */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Location</h3>
                </div>
                <div className="p-4">
                  <div className="h-28 sm:h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-[#27BB97] mx-auto mb-2" />
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{product.location}</p>
                      <p className="text-xs text-gray-500 mt-1">View on map →</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Condition & Details</h3>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Condition</span>
                    <span className="font-medium text-gray-900">{product.condition}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Warranty</span>
                    <span className="font-medium text-green-600">1 Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-10 sm:mt-12 lg:mt-16">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Similar Items</h2>
            <button className="text-[#27BB97] hover:text-[#1E9E7E] font-medium text-sm sm:text-base">
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">${item.price}</span>
                    <span className="text-xs sm:text-sm text-gray-500 px-2.5 py-1 bg-gray-100 rounded-full">
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;