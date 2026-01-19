import React from "react";
import { ShieldCheck, ThumbsUp, Clock, Phone, MessageSquare, Star } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: "Verified Safety",
      description: "Every provider undergoes our rigorous 5-step verification process ensuring complete safety and reliability.",
      details: ["Background Checks", "ID Verification", "Safety Rating"]
    },
    {
      icon: <ThumbsUp className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: "Quality Excellence",
      description: "Backed by thousands of 5-star reviews and our 100% satisfaction guarantee for peace of mind.",
      rating: "4.8",
      reviews: "10,000+ Reviews"
    },
    {
      icon: <Clock className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: "Always Available",
      description: "24/7 dedicated support team ready to assist you with any questions or concerns, anytime.",
      support: ["Phone Support", "Live Chat", "Email Help"]
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-20">
      {/* Centered Header */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 leading-tight">
          Why Choose <span className="text-[#27BB97]">Take Care</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
          Trusted childcare solutions designed for modern families
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-[#27BB97] hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white"
          >
            {/* Icon Container - Adjusted size */}
            <div className="relative mb-5 sm:mb-6">
              <div className="w-20 h-20 xs:w-22 xs:h-22 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg sm:shadow-xl group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300 flex items-center justify-center bg-gradient-to-br from-[#27BB97]/10 to-[#1FA987]/10 mx-auto">
                <div className="text-[#27BB97] group-hover:text-[#1FA987] transition-colors">
                  {feature.icon}
                </div>
              </div>
              
              {/* Gradient Ring Effect */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#27BB97] to-[#1FA987] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#27BB97] transition-colors leading-tight">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-xs xs:text-sm sm:text-sm mb-4 sm:mb-6 leading-tight px-1">
              {feature.description}
            </p>

            {/* Feature-specific Content */}
            {feature.details && (
              <div className="w-full space-y-2">
                {feature.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">
                      {detail}
                    </span>
                    <div className="w-2 h-2 bg-[#27BB97] rounded-full" />
                  </div>
                ))}
              </div>
            )}

            {feature.rating && (
              <div className="w-full">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 xs:w-5 xs:h-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-xl xs:text-2xl font-bold text-gray-900 mb-1">
                    {feature.rating}/5
                  </div>
                  <div className="text-gray-600 text-xs xs:text-sm">
                    {feature.reviews}
                  </div>
                </div>
              </div>
            )}

            {feature.support && (
              <div className="w-full space-y-2">
                {feature.support.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700 p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-[#27BB97] rounded-full flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-left">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Support Buttons */}
            {feature.title === "Always Available" && (
              <div className="w-full space-y-2 mt-4">
                <button className="w-full py-2 xs:py-2.5 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-lg hover:from-[#1FA987] hover:to-[#198F72] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-xs xs:text-sm">
                  <Phone className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                  Call Now
                </button>
                <button className="w-full py-2 xs:py-2.5 border border-[#27BB97] text-[#27BB97] font-semibold rounded-lg hover:bg-[#27BB97] hover:text-white transition-all flex items-center justify-center gap-2 text-xs xs:text-sm">
                  <MessageSquare className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                  Start Chat
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Button - Centered (keeping your changes) */}
      <div className="mt-8 xs:mt-10 sm:mt-12 text-center">
        <button className="inline-flex items-center justify-center gap-2 px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3 text-[#27BB97] font-semibold rounded-lg xs:rounded-lg sm:rounded-lg hover:bg-[#27BB97] hover:text-white hover:shadow-lg border border-[#27BB97] transition-all duration-300 shadow-md hover:scale-105 transform text-xs xs:text-sm sm:text-sm min-w-[140px] xs:min-w-[160px]">
          Join Our Community
          <svg className="w-3 h-3 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default WhyChooseUs;