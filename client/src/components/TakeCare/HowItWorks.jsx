import React from "react";
import { Search, Star, MessageSquare, ShieldCheck } from "lucide-react";

// Replace with your actual background image URL
const bgImage = "babycare-1.jpg";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Search & Filter",
      description: "Find caregivers by location, availability, rating, and services",
      icon: <Search className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" />,
    },
    {
      step: 2,
      title: "Compare & Review",
      description: "View detailed profiles, read reviews, and compare options",
      icon: <Star className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" />,
    },
    {
      step: 3,
      title: "Book & Connect",
      description: "Message providers directly and schedule interviews",
      icon: <MessageSquare className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" />,
    },
    {
      step: 4,
      title: "Peace of Mind",
      description: "All providers are verified and background checked",
      icon: <ShieldCheck className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" />,
    },
  ];

  return (
    <section className="relative w-full py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      </div>

      {/* Content Container - Centered with max width */}
      <div className="relative z-10 w-full">
        <div className=" px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          {/* Header - Centered */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 px-2">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[3.5rem] font-bold text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight drop-shadow-lg">
              How <span className="text-[#27BB97]">Take Care</span> Works
            </h2>
            <p className="text-gray-200 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto drop-shadow-md">
              Simple, secure steps to find the perfect childcare solution for your family
            </p>
          </div>

          {/* Cards Grid - Centered with responsive layout */}
          <div className="flex justify-center">
            <div className="w-full max-w-7xl">
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
                {steps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-white/95 backdrop-blur-sm rounded-xl xs:rounded-2xl lg:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 border border-white/30 flex flex-col items-center text-center group relative w-full"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-2 -left-2 xs:-top-3 xs:-left-3 w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-gradient-to-br from-[#27BB97] to-[#1FA987] flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xs xs:text-sm sm:text-base">
                        {step.step}
                      </span>
                    </div>

                    {/* Icon - Perfectly centered */}
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-22 xl:h-22 rounded-xl xs:rounded-2xl bg-gradient-to-br from-[#27BB97]/10 to-[#1FA987]/10 flex items-center justify-center mb-3 xs:mb-4 sm:mb-5 md:mb-6 group-hover:scale-105 transition-transform duration-300 mx-auto">
                      <div className="text-[#27BB97] group-hover:text-[#1FA987] transition-colors">
                        {step.icon}
                      </div>
                    </div>

                    {/* Title - Centered */}
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] xl:text-3xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 group-hover:text-[#27BB97] transition-colors leading-tight w-full">
                      {step.title}
                    </h3>

                    {/* Description - Centered with max width */}
                    <p className="text-gray-700 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed max-w-[180px] xs:max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button - Centered */}
          <div className="mt-8 xs:mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20 text-center">
            <button className="inline-flex items-center justify-center gap-2 xs:gap-3 px-5 xs:px-6 sm:px-7 md:px-8 lg:px-10 py-2 xs:py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-lg xs:rounded-xl lg:rounded-2xl hover:from-[#1FA987] hover:to-[#198F72] hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl min-w-[140px] xs:min-w-[160px] sm:min-w-[180px] md:min-w-[200px]">
              Get Started Today
              <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Performance optimization for mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          .bg-cover {
            background-size: cover;
            background-position: center;
          }
        }
        
        @media (max-width: 640px) {
          .py-8 {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;