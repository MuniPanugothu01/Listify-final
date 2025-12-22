import React from "react";
import { Search, Star, MessageSquare, ShieldCheck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Search & Filter",
      description: "Find caregivers by location, availability, rating, and services",
      icon: <Search className="w-8 h-8" />,
    },
    {
      step: 2,
      title: "Compare & Review",
      description: "View detailed profiles, read reviews, and compare options",
      icon: <Star className="w-8 h-8" />,
    },
    {
      step: 3,
      title: "Book & Connect",
      description: "Message providers directly and schedule interviews",
      icon: <MessageSquare className="w-8 h-8" />,
    },
    {
      step: 4,
      title: "Peace of Mind",
      description: "All providers are verified and background checked",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          How <span className="text-[#27BB97]">BabyCare</span> Works
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Simple, secure steps to find the perfect childcare solution for your family
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {steps.map((step) => (
          <div
            key={step.step}
            className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 hover:border-[#27BB97]/40 transition-all duration-300 group flex flex-col items-center text-center"
          >
           

            {/* Icon */}
            <div className="mt-8 mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#27BB97]/10 to-[#1FA987]/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#27BB97]/20 group-hover:to-[#1FA987]/20 transition-all duration-300">
              <div className="text-[#27BB97] group-hover:text-[#1FA987] transition-colors">
                {step.icon}
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#27BB97] transition-colors">
              {step.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;