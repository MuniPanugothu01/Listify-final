import React from "react";
import HeroRoom from "../../components/Roommates/RoommateCard.jsx";
import RoommateSubNav from "../../components/Roommates/RoommateSubNav";
import Footer from "../Home/Footer.jsx";

export default function Roommates() {
  return (
    <div className="min-h-screen">
      {/* SubNav will automatically handle its visibility */}
      <RoommateSubNav />
      <HeroRoom />
      
      {/* Roommate Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Available Roommates & Rentals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your perfect living situation with trusted roommates and verified listings
          </p>
        </div>
        
        {/* Add more content to test scrolling */}
        <div className="space-y-8">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Roommate Listing {index + 1}</h3>
                  <p className="text-gray-600 text-sm mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>📍 New York, NY</span>
                    <span>💰 $800/month</span>
                    <span>🛏️ Single Room</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}