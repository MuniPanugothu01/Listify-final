import React from 'react';
import { Shield, Truck, MessageCircle, CreditCard, Star, Users } from 'lucide-react';

export default function ForSaleOffers() {
  const offers = [
    {
      icon: Users,
      title: 'Local Community',
      description: 'Buy and sell directly with people in your neighborhood. Trusted local transactions.'
    },
    {
      icon: MessageCircle,
      title: 'Direct Messaging',
      description: 'Chat directly with sellers. Negotiate prices and arrange meetups securely.'
    },
    {
      icon: Shield,
      title: 'Safe Transactions',
      description: 'Meet in public places. Cash on delivery. Verified user profiles for safety.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Why Use Our Marketplace
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect directly with buyers and sellers in your community. No middlemen, no hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer, index) => {
          const Icon = offer.icon;
          return (
            <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
                <Icon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
            </div>
          );
        })}
      </div>

      {/* Additional Features */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CreditCard className="w-6 h-6 text-gray-600 mr-2" />
              <span className="font-semibold text-gray-900">Flexible Payment</span>
            </div>
            <p className="text-sm text-gray-500">Cash, UPI, Bank Transfer</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Truck className="w-6 h-6 text-gray-600 mr-2" />
              <span className="font-semibold text-gray-900">Local Pickup</span>
            </div>
            <p className="text-sm text-gray-500">Arrange convenient meetups</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-gray-600 mr-2" />
              <span className="font-semibold text-gray-900">User Ratings</span>
            </div>
            <p className="text-sm text-gray-500">Trusted seller reviews</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-6 h-6 text-gray-600 mr-2" />
              <span className="font-semibold text-gray-900">Free Listing</span>
            </div>
            <p className="text-sm text-gray-500">Post ads at no cost</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="inline-flex flex-col sm:flex-row gap-4">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
            List an Item for Free
          </button>
          <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors">
            Browse Local Listings
          </button>
        </div>
      </div>
    </div>
  );
}