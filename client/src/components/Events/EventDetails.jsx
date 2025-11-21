import React, { useState } from 'react';
import { Flag, CreditCard, Monitor, Headphones, Play } from 'lucide-react';

export default function EventDetails() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://demo.dawnthemes.com/ticketbox/wp-content/uploads/2016/12/events-category-bg-dark.jpg?id=893')`,
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-20 tracking-wide">
          WE HAVE WHAT YOU NEED!
        </h1>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Creating Events */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-700 bg-opacity-80 mb-6">
                <Flag className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 uppercase tracking-wide">
                Creating Events Easily
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Hamster reindeer hence shined less gosh furrowed and under magnificently
              </p>
            </div>

            {/* Buy Online & Check In */}
            <div className="text-center lg:text-left mt-16">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-700 bg-opacity-80 mb-6">
                <Monitor className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 uppercase tracking-wide">
                Buy Online & Check In
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Naively adequately irrespective one sheep-ishly politely terrier ouch kangaroo
              </p>
            </div>
          </div>

          {/* Center Column - Video */}
          <div className="lg:col-span-1">
            <div className="bg-[#302D28] bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl  border-opacity-20">
              {/* <div className="relative aspect-video bg-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Office workspace"
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all group"
                >
                  <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-gray-800 ml-1" fill="currentColor" />
                  </div>
                </button>
              </div> */}
              {/* <div className="p-6 text-center">
                <p className="text-gray-200 text-sm">
                  Kiwi agonizingly that genially cliquish
                </p>
              </div> */}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Payment Method */}
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-700 bg-opacity-80 mb-6">
                <CreditCard className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 uppercase tracking-wide">
                Payment Method
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Guinea piquantly contrary far far darn chuckled this this fish and towards
              </p>
            </div>

            {/* Great Support */}
            <div className="text-center lg:text-right mt-16">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-700 bg-opacity-80 mb-6">
                <Headphones className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 uppercase tracking-wide">
                Great Support
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Much but had leapt much enticing wept thus dear besides lynx split fidgeted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}