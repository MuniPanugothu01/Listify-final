import React from "react";
import { Search, Star, MessageSquare, ShieldCheck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Search & Filter",
      description: "Find caregivers by location, availability, rating, and services",
      icon: <Search className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />,
      bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop"
    },
    {
      step: 2,
      title: "Compare & Review",
      description: "View detailed profiles, read reviews, and compare options",
      icon: <Star className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />,
      bgImage: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=300&fit=crop"
    },
    {
      step: 3,
      title: "Book & Connect",
      description: "Message providers directly and schedule interviews",
      icon: <MessageSquare className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />,
      bgImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop"
    },
    {
      step: 4,
      title: "Peace of Mind",
      description: "All providers are verified and background checked",
      icon: <ShieldCheck className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />,
      bgImage: "https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&h=300&fit=crop"
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-20">
      {/* Centered Header */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 leading-tight">
          How <span className="text-[#27BB97]">Take Care</span> Works
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
          Simple, secure steps to find the perfect childcare solution for your family
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
        {steps.map((step) => (
          <div
            key={step.step}
            className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Card with Background Image */}
            <div 
              className="relative h-48 sm:h-56 bg-cover bg-center"
              style={{ backgroundImage: `url(${step.bgImage})` }}
            >
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-white">
                {/* Icon Container */}
                <div className="relative mb-4 sm:mb-5">
                  <div className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:border-white/50 transition-all duration-300 mx-auto">
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  
                
                </div>

                {/* Title */}
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-center leading-tight drop-shadow-lg">
                  {step.title}
                </h3>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-white p-4 sm:p-6 border border-gray-200 border-t-0 rounded-b-xl sm:rounded-b-2xl group-hover:border-[#27BB97] transition-colors duration-300">
              <p className="text-gray-600 text-xs xs:text-sm sm:text-sm text-center leading-tight">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button - Centered */}
      <div className="mt-8 xs:mt-10 sm:mt-12 text-center">
        <button className="inline-flex items-center justify-center gap-2 px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3  text-[#27BB97] font-semibold rounded-lg xs:rounded-lg sm:rounded-lg hover:bg-[#27BB97]  hover:text-white hover:shadow-lg  border border-[#27BB97] transition-all duration-300 shadow-md hover:scale-105 transform text-xs xs:text-sm sm:text-sm min-w-[140px] xs:min-w-[160px]">
          Get Started Today
          <svg className="w-3 h-3 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;