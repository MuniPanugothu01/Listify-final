import React from 'react';
import { Search, Zap, Target, Shield, Settings } from 'lucide-react';

export default function Carousel() {
  return (
    <div className="min-h-screen">
    
      {/* Hero Section */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              We Are Solution Oriented{' '}
              <span className="text-orange-500 relative">
                Digital
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                  <path d="M0,4 Q50,0 100,4 T200,4" stroke="#ff6b35" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                </svg>
              </span>
              {' '}Agency
             
            </h1>
            
            <p className="text-gray-600 text-lg">
              Suspendisse id odio a felis porta semper eu id ligula. Cras vestibulum nibh eu vehicula finibus. Praesent sollicitudin, arcu eu facilisis.
            </p>

            <div className="flex gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full hover:shadow-lg transition transform hover:scale-105">
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition">
                How It Works
              </button>
            </div>

         

          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            {/* Main Circle */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Yellow Circle Background */}
              <div className="absolute inset-0  rounded-full"></div>
              
              {/* Person Image */}
          <div className="flex items-center justify-center  h-[600px] w-[600px] mx-auto border border-orange-300 rounded-full p-4">
              <div className='bg-orange-400 rounded-full h-[500px] w-[500px] overflow-hidden flex items-center justify-center mx-auto'>
              <div className='bg-orange-300 rounded-full h-[400px] w-[400px] overflow-hidden'>
              <img 
                    src="/Services/HomeServices/hero-1.png" 
                    alt="Hero-image" 
                    className="w-full h-full object-cover"
                  />
            </div>
            </div>
          </div>
            </div>

            {/* Decorative wavy line */}
            {/* <svg className="absolute -bottom-12 left-0 w-full" height="100" viewBox="0 0 500 100">
              <path d="M0,50 Q125,30 250,50 T500,50" stroke="#FFA500" strokeWidth="3" fill="none" opacity="0.3"/>
            </svg> */}
          </div>
        </div>
      </section>

    </div>
  );
}