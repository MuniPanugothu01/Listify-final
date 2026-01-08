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
      icon: <Search className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10" />,
    },
    {
      step: 2,
      title: "Compare & Review",
      description: "View detailed profiles, read reviews, and compare options",
      icon: <Star className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10" />,
    },
    {
      step: 3,
      title: "Book & Connect",
      description: "Message providers directly and schedule interviews",
      icon: <MessageSquare className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10" />,
    },
    {
      step: 4,
      title: "Peace of Mind",
      description: "All providers are verified and background checked",
      icon: <ShieldCheck className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10" />,
    },
  ];

  return (
    <section className="relative py-8 sm:py-10 lg:py-12 xl:py-14">
      {/* Background Image - Fixed on desktop, static on mobile for performance */}
      <div
        className="absolute inset-0 bg-cover bg-center lg:bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container px-4 xs:px-6 sm:px-8 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight">
            How <span className="text-[#27BB97]">Take Care</span> Works
          </h2>
          <p className="text-gray-200 text-sm xs:text-base sm:text-lg lg:text-xl max-w-3xl mx-auto drop-shadow-md px-4">
            Simple, secure steps to find the perfect childcare solution for your family
          </p>
        </div>

        {/* Modal-like Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.step}
              className="bg-white/95 backdrop-blur-sm rounded-xl xs:rounded-2xl lg:rounded-3xl p-5 xs:p-6 sm:p-7 lg:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 border border-white/30 flex flex-col items-center text-center group"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 xs:-top-4 xs:-left-4 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#27BB97] to-[#1FA987] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm xs:text-base sm:text-lg">
                  {step.step}
                </span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-xl xs:rounded-2xl bg-gradient-to-br from-[#27BB97]/10 to-[#1FA987]/10 flex items-center justify-center mb-4 xs:mb-5 sm:mb-6 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300">
                <div className="text-[#27BB97] group-hover:text-[#1FA987] transition-colors">
                  {step.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-3 xs:mb-4 group-hover:text-[#27BB97] transition-colors leading-tight">
                {step.title}
              </h3>
              <p className="text-gray-700 text-xs xs:text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional CTA Button */}
        <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
          <button className="inline-flex items-center justify-center gap-2 xs:gap-3 px-6 xs:px-8 sm:px-10 py-3 xs:py-3.5 sm:py-4 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-xl hover:from-[#1FA987] hover:to-[#198F72] hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent text-sm xs:text-base sm:text-lg">
            Get Started Today
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Performance optimization: Remove bg-fixed on mobile */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .lg\\:bg-fixed {
            background-attachment: scroll !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;