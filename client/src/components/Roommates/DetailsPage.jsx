import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Search } from 'lucide-react';
import RoommateSubNav from './RoommateSubNav';
import { FaArrowRight } from "react-icons/fa";

const DetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [shirtSize, setShirtSize] = useState('');
  const [pantSize, setPantSize] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState('4DAY');
  const [deliveryDate, setDeliveryDate] = useState('');

  const images = [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop'
  ];

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-white">
        <RoommateSubNav/>
      {/* Header */}
      <header className=" border-gray-200">
        {/* Breadcrumb */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <a href="#" className="hover:text-gray-900">Indian Roommates</a>
            <FaArrowRight className='font-bold ' />
            <a href="#" className="hover:text-gray-900 text-gray-800 font-extrabold">Roommates in New York</a>
            <FaArrowRight />
            <a href="#" className="hover:text-gray-900">Roommates in New York Metro Area</a>
            <FaArrowRight />
            <a href="#" className="hover:text-gray-900">Roommates in New York</a>
            <FaArrowRight />
            <span className="text-gray-500">Double Sharing/Couples Wanted For Luxury Home,1 Minute Walk From/To Journal Square PATH Train Station To Go To Manhattan</span>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-700 cursor-pointer" />
            <Heart className="w-5 h-5 text-gray-700 cursor-pointer" />
         
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnail Column */}
            <div className="flex flex-col gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-28 border-2 cursor-pointer overflow-hidden ${
                    selectedImage === idx ? 'border-gray-800' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative bg-gray-100">
              <img
                src={images[selectedImage]}
                alt="Black Cinzato Suit"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-medium text-gray-900">Black Cinzato Suit</h1>
                <p className="text-sm text-gray-600 mt-1">Black office style cinzato suit. Slim fit</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <div>
                  <div className="font-medium">Custom Fitting</div>
                  <div className="text-blue-600 text-xs">Available</div>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-medium">₹389</span>
              <span className="text-sm text-gray-600">/ 4 DAY</span>
              <span className="text-xs text-gray-500">+cost of all taxes</span>
              <span className="ml-auto text-sm text-gray-500">VALUE ₹34,000</span>
            </div>

            <div className="bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">SECURITY</span>
                <span className="text-lg font-semibold">₹6800</span>
                <span className="text-xs text-gray-600">Refunded within 7 business days</span>
              </div>
            </div>

            <div className="border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div className="flex-1">
                  <div className="text-sm font-medium mb-2">IN THE BOX?</div>
                  <p className="text-sm text-gray-600">
                    1 Cinzato suit Jacket, 2 White Slim fit Shirt, 3 Black Cinzato Suit Pant
                  </p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">SHIRT SIZE</label>
                <select
                  value={shirtSize}
                  onChange={(e) => setShirtSize(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="">Select size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">PANT SIZE</label>
                <select
                  value={pantSize}
                  onChange={(e) => setPantSize(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="">Select size</option>
                  <option value="30">30</option>
                  <option value="32">32</option>
                  <option value="34">34</option>
                  <option value="36">36</option>
                </select>
              </div>
            </div>

            <div className="text-xs text-gray-600">
              Note: Size order varies based on shirt.{' '}
              <a href="#" className="text-blue-600 underline">View Size Guide</a>
            </div>

            {/* Rental Period */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">SELECT A RENTAL PERIOD</label>
              <div className="flex gap-4">
                {['4 DAY', '6 DAY', '8 DAY'].map((period) => (
                  <label key={period} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rental"
                      value={period}
                      checked={rentalPeriod === period}
                      onChange={(e) => setRentalPeriod(e.target.value)}
                      className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm">{period}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Date */}
            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">DELIVERY DATE</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div className="text-sm text-gray-700">Cash On Delivery</div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="bg-gray-900 text-white py-3 px-6 text-sm font-medium hover:bg-gray-800 transition">
                ADD TO CART
              </button>
              <button className="border border-gray-900 text-gray-900 py-3 px-6 text-sm font-medium hover:bg-gray-50 transition">
                ADD TO WISHLIST
              </button>
            </div>

            {/* Product Detail */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium mb-3">Product Detail</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We have redefined a single breasted Blazer. The Sharp-Cut, Modern Design, 
                Classic Tailoring and Balanced Proportions will take you by surprise. This 
                Cinzato is best for...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;