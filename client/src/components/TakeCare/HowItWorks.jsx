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
      icon: <Search className="w-10 h-10" />,
    },
    {
      step: 2,
      title: "Compare & Review",
      description: "View detailed profiles, read reviews, and compare options",
      icon: <Star className="w-10 h-10" />,
    },
    {
      step: 3,
      title: "Book & Connect",
      description: "Message providers directly and schedule interviews",
      icon: <MessageSquare className="w-10 h-10" />,
    },
    {
      step: 4,
      title: "Peace of Mind",
      description: "All providers are verified and background checked",
      icon: <ShieldCheck className="w-10 h-10" />,
    },
  ];

  return (
    <section className="relative py-10 md:py-10">
      {/* Sticky Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            How <span className="text-[#27BB97]">Take Care</span> Works
          </h2>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            Simple, secure steps to find the perfect childcare solution for your family
          </p>
        </div>

        {/* Modal-like Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.step}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 border border-white/30 flex flex-col items-center text-center group"
            >
             

              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#27BB97]/10 to-[#1FA987]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-[#27BB97] group-hover:text-[#1FA987] transition-colors">
                  {step.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#27BB97] transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;