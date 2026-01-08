import React from "react";
import { ShieldCheck, ThumbsUp, Clock, CheckCircle, Phone, MessageSquare, Star, Users, Award, Heart } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />,
      title: "Verified Safety",
      description: "Every provider undergoes our rigorous 5-step verification process ensuring complete safety and reliability.",
      details: [
        { label: "Background Checks", value: "100% Verified" },
        { label: "ID Verification", value: "Mandatory" },
        { label: "Safety Rating", value: "99.8%" }
      ],
      color: "border-blue-200 hover:border-blue-400",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      icon: <ThumbsUp className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />,
      title: "Quality Excellence",
      description: "Backed by thousands of 5-star reviews and our 100% satisfaction guarantee for peace of mind.",
      rating: "4.8",
      stars: 5,
      reviews: "10,000+ Reviews",
      color: "border-emerald-200 hover:border-emerald-400",
      gradient: "from-emerald-400 to-green-400"
    },
    {
      icon: <Clock className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />,
      title: "Always Available",
      description: "24/7 dedicated support team ready to assist you with any questions or concerns, anytime.",
      support: ["Phone Support", "Live Chat", "Email Help"],
      color: "border-purple-200 hover:border-purple-400",
      gradient: "from-purple-400 to-pink-400"
    },
  ];

  return (
    <section className="relative mb-12 sm:mb-16 lg:mb-20 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto">
      {/* Decorative Background - Optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 xs:w-48 xs:h-48 sm:w-64 sm:h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl lg:blur-3xl opacity-10 sm:opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-32 h-32 xs:w-48 xs:h-48 sm:w-64 sm:h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl lg:blur-3xl opacity-10 sm:opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 xs:w-48 xs:h-48 sm:w-64 sm:h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl lg:blur-3xl opacity-10 sm:opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-16 px-2">
          <div className="inline-block mb-4 sm:mb-6">
            {/* You can add a logo or decorative element here */}
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight">
            Why We're Different
          </h1>
          <p className="text-gray-700 text-sm xs:text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-2">
            Trusted childcare solutions designed for modern families
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Main Card */}
              <div className={`relative bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 lg:p-8 border-2 ${feature.color} shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col`}>
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
                </div>

                {/* Icon Container */}
                <div className="relative z-10 mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
                  <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg xs:rounded-xl sm:rounded-2xl border-2 border-gray-100 shadow-lg sm:shadow-xl flex items-center justify-center w-full h-full transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500">
                      <div className={`text-[#27BB97] bg-gradient-to-r ${feature.gradient} bg-clip-text`}>
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 text-center group-hover:text-gray-800 transition-colors line-clamp-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs xs:text-sm sm:text-base lg:text-lg mb-4 xs:mb-5 sm:mb-6 lg:mb-8 text-center leading-relaxed line-clamp-3 xs:line-clamp-none">
                    {feature.description}
                  </p>

                  {/* Feature-specific Content */}
                  {feature.details && (
                    <div className="space-y-2 xs:space-y-3 sm:space-y-4 mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 xs:p-3 sm:p-4 bg-gray-50 rounded-lg xs:rounded-xl group-hover:bg-gray-100 transition-colors">
                          <span className="text-gray-700 font-medium text-xs xs:text-sm sm:text-base truncate pr-2">{detail.label}</span>
                          <span className="text-gray-900 font-bold text-xs xs:text-sm sm:text-base whitespace-nowrap">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.rating && (
                    <div className="mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
                      <div className="flex justify-center gap-0.5 xs:gap-1 sm:gap-1 mb-2 xs:mb-3 sm:mb-4">
                        {[...Array(feature.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="text-center">
                        <div className="text-2xl xs:text-3xl sm:text-4xl font-black text-gray-900 mb-0.5 xs:mb-1">
                          {feature.rating}/5
                        </div>
                        <div className="text-gray-600 text-xs xs:text-sm sm:text-base">{feature.reviews}</div>
                      </div>
                    </div>
                  )}

                  {feature.support && (
                    <div className="mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
                      <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                        {feature.support.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 xs:gap-3 text-gray-700">
                            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-[#27BB97] rounded-full flex-shrink-0" />
                            <span className="text-xs xs:text-sm sm:text-base truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Support Buttons */}
                  {feature.title === "Always Available" && (
                    <div className="space-y-2 xs:space-y-3 sm:space-y-4 mt-auto">
                      <button className="w-full py-2 xs:py-2.5 sm:py-3 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-lg xs:rounded-xl hover:from-[#1FA987] hover:to-[#198F72] transition-all shadow-sm sm:shadow-md hover:shadow-lg flex items-center justify-center gap-2 xs:gap-3 group-hover:scale-105 text-xs xs:text-sm sm:text-base">
                        <Phone className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        Call Now
                      </button>
                      <button className="w-full py-2 xs:py-2.5 sm:py-3 border-2 border-[#27BB97] text-[#27BB97] font-semibold rounded-lg xs:rounded-xl hover:bg-[#27BB97] hover:text-white transition-all flex items-center justify-center gap-2 xs:gap-3 text-xs xs:text-sm sm:text-base">
                        <MessageSquare className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        Start Chat
                      </button>
                    </div>
                  )}
                </div>

                {/* Corner Accent */}
                <div className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-gray-200 rounded-tr-lg xs:rounded-tr-xl sm:rounded-tr-2xl group-hover:border-[#27BB97] transition-colors" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-2 xs:-top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <div className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 bg-white border-2 border-gray-200 rounded-full shadow-md sm:shadow-lg">
                  <span className="text-xs xs:text-sm font-semibold text-gray-700 whitespace-nowrap">
                    Feature {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section - Optional Responsive Add-on */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-6">
          {[
            { icon: <Users className="w-6 h-6 xs:w-8 xs:h-8" />, value: "50K+", label: "Happy Families" },
            { icon: <CheckCircle className="w-6 h-6 xs:w-8 xs:h-8" />, value: "10K+", label: "Verified Providers" },
            { icon: <Award className="w-6 h-6 xs:w-8 xs:h-8" />, value: "99%", label: "Satisfaction Rate" },
            { icon: <Heart className="w-6 h-6 xs:w-8 xs:h-8" />, value: "24/7", label: "Support Available" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-[#27BB97] mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-2xl xs:text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-xs xs:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations - Optimized for performance */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(20px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-10px, 10px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-blob,
          .group-hover\\:rotate-12,
          .group-hover\\:-rotate-12,
          .group-hover\\:scale-105 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;