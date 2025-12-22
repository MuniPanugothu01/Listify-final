import React from "react";
import { ShieldCheck, ThumbsUp, Clock, CheckCircle, Phone, MessageSquare, Star, Users, Award, Heart } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-14 h-14" />,
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
      icon: <ThumbsUp className="w-14 h-14" />,
      title: "Quality Excellence",
      description: "Backed by thousands of 5-star reviews and our 100% satisfaction guarantee for peace of mind.",
      rating: "4.8",
      stars: 5,
      reviews: "10,000+ Reviews",
      color: "border-emerald-200 hover:border-emerald-400",
      gradient: "from-emerald-400 to-green-400"
    },
    {
      icon: <Clock className="w-14 h-14" />,
      title: "Always Available",
      description: "24/7 dedicated support team ready to assist you with any questions or concerns, anytime.",
      support: ["Phone Support", "Live Chat", "Email Help"],
      color: "border-purple-200 hover:border-purple-400",
      gradient: "from-purple-400 to-pink-400"
    },
  ];

  return (
    <section className="relative mb-20 py-20 max-w-7xl mx-auto">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10  px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            
          </div>
          <h1 className="text-5xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Why We're Different
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            Trusted childcare solutions designed for modern families
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Main Card */}
              <div className={`relative bg-white rounded-3xl p-8 border-2 ${feature.color} shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full`}>
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
                </div>

                {/* Icon Container */}
                <div className="relative z-10 mb-8">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-100 shadow-xl flex items-center justify-center w-full h-full transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500">
                      <div className={`text-[#27BB97] bg-gradient-to-r ${feature.gradient} bg-clip-text`}>
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 text-center leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature-specific Content */}
                  {feature.details && (
                    <div className="space-y-4 mb-8">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                          <span className="text-gray-700 font-medium">{detail.label}</span>
                          <span className="text-gray-900 font-bold">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.rating && (
                    <div className="mb-8">
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(feature.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-black text-gray-900 mb-1">
                          {feature.rating}/5
                        </div>
                        <div className="text-gray-600">{feature.reviews}</div>
                      </div>
                    </div>
                  )}

                  {feature.support && (
                    <div className="mb-8">
                      <div className="space-y-3">
                        {feature.support.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-gray-700">
                            <div className="w-2 h-2 bg-[#27BB97] rounded-full" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Support Buttons */}
                  {feature.title === "Always Available" && (
                    <div className="space-y-4">
                      <button className="w-full py-3 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-xl hover:from-[#1FA987] hover:to-[#198F72] transition-all shadow-md flex items-center justify-center gap-3 group-hover:scale-105">
                        <Phone className="w-5 h-5" />
                        Call Now
                      </button>
                      <button className="w-full py-3 border-2 border-[#27BB97] text-[#27BB97] font-semibold rounded-xl hover:bg-[#27BB97] hover:text-white transition-all flex items-center justify-center gap-3">
                        <MessageSquare className="w-5 h-5" />
                        Start Chat
                      </button>
                    </div>
                  )}
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gray-200 rounded-tr-2xl group-hover:border-[#27BB97] transition-colors" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-gray-700">Feature {index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
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
      `}</style>
    </section>
  );
};

export default WhyChooseUs;