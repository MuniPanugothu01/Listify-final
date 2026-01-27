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
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Why Choose <span className="gradient-text">Our Marketplace</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Connect directly with buyers and sellers in your community. No middlemen, no hidden fees.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div key={index} className="hover-lift">
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-full">
                  <div className="p-6 sm:p-8">
                    <div 
                      className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-4 sm:mb-6"
                      style={{ backgroundColor: '#E8F7F3' }} // Light green background
                    >
                      <Icon 
                        className="w-6 h-6 sm:w-8 sm:h-8" 
                        style={{ color: '#27BB97' }} // Custom green for icons
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{offer.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{offer.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mt-8 sm:mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center mb-1 sm:mb-2">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-2" style={{ color: '#27BB97' }} />
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Flexible Payment</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Cash, UPI, Bank Transfer</p>
            </div>
            
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center mb-1 sm:mb-2">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 mr-2" style={{ color: '#27BB97' }} />
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Local Pickup</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Arrange convenient meetups</p>
            </div>
            
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center mb-1 sm:mb-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 mr-2" style={{ color: '#27BB97' }} />
                <span className="font-semibold text-gray-900 text-sm sm:text-base">User Ratings</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Trusted seller reviews</p>
            </div>
            
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center mb-1 sm:mb-2">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2" style={{ color: '#27BB97' }} />
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Free Listing</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Post ads at no cost</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
              style={{ 
                backgroundColor: '#27BB97',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1E9E7E';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#27BB97';
              }}
            >
              List an Item for Free
            </button>
            <button 
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
              style={{ 
                border: '2px solid #27BB97',
                color: '#27BB97',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#27BB97';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#27BB97';
              }}
            >
              Browse Local Listings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}