import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, MessageCircle, MapPin, ChevronRight, Star, Check, Clock, Shield, Truck, Package, Battery, Camera, Wifi, Smartphone, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { electronicsData } from './Sample';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = electronicsData.find(p => p.id === parseInt(id));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sample additional images for the product
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1579586337278-3f576cfc5113?w=500&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    'https://images.unsplash.com/photo-1546054451-aa224c0e8c23?w=500&q=80',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80',
  ];

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => prev === productImages.length - 1 ? 0 : prev + 1);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button 
            onClick={() => navigate('/electronics')}
            className="px-6 py-3 bg-[#27BB97] text-white rounded-lg hover:bg-[#1E9E7E] transition-colors font-medium"
          >
            Back to Electronics
          </button>
        </div>
      </div>
    );
  }



  const techSpecs = [
    { label: "Battery Life", value: "24 hours", icon: <Battery className="w-4 h-4" /> },
    { label: "Connectivity", value: "Bluetooth 5.2", icon: <Wifi className="w-4 h-4" /> },
    { label: "Water Resistance", value: "IP68", icon: <Shield className="w-4 h-4" /> },
    { label: "Display", value: "1.93\" AMOLED", icon: <Smartphone className="w-4 h-4" /> },
  ];

  const similarProducts = electronicsData.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Sticky Navigation Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <button 
                onClick={() => navigate('/electronics')}
                className="hover:text-[#27BB97] transition-colors"
              >
                Electronics
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium truncate max-w-[200px]">
                {product.title}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Main Image - REDUCED SIZE */}
              <div className="relative h-[400px] bg-gradient-to-br from-gray-50 to-gray-100">
                <img 
                  src={productImages[selectedImageIndex]} 
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                />
                
                {/* Navigation Arrows */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      <ChevronRightIcon className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {selectedImageIndex + 1} / {productImages.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index 
                          ? "border-[#27BB97] ring-2 ring-[#27BB97]/20" 
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Product view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

         

            {/* Product Info Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex overflow-x-auto">
                  {['Overview', 'Specifications', 'Seller Info'].map((tab) => (
                    <button
                      key={tab}
                      className="px-6 py-4 font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-[#27BB97] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Specs</h3>
                    <div className="space-y-3">
                      {techSpecs.map((spec, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#27BB97] to-[#1E9E7E] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {product.seller[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      {product.seller}
                      <Shield className="w-5 h-5 text-blue-500 ml-2" />
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.sellerRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({product.sellerReviews})</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Joined {product.sellerJoined}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase & Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price & Purchase Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-gray-500 ml-2">CAD</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{product.location}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{product.postedTime}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-[#27BB97] hover:bg-[#1E9E7E] text-white font-bold rounded-xl shadow-lg shadow-[#27BB97]/20 transition-all hover:shadow-xl flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Seller
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 bg-white border-2 border-gray-100 text-gray-700 font-semibold rounded-xl hover:border-gray-200 transition-colors">
                      Make Offer
                    </button>
                    <button className="py-3 bg-white border-2 border-[#27BB97] text-[#27BB97] font-semibold rounded-xl hover:bg-[#27BB97]/5 transition-colors">
                      Save for Later
                    </button>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span>Protected by our safety guidelines</span>
                  </div>
                </div>
              </div>

              
              {/* Location Map Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Location</h3>
                </div>
                <div className="p-4">
                  <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-[#27BB97] mx-auto mb-2" />
                      <p className="font-medium text-gray-900">{product.location}</p>
                      <p className="text-xs text-gray-500 mt-1">View on map →</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Condition & Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Condition & Details</h3>
                <div className="space-y-2">
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
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar Items</h2>
            <button className="text-[#27BB97] hover:text-[#1E9E7E] font-medium">
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarProducts.map((item) => (
              <div 
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                    <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
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