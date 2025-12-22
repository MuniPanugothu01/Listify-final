import React from "react";
import { ShieldCheck, ThumbsUp, Clock, CheckCircle, Phone, MessageSquare, Star } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Verified Safety",
      description: "Every provider undergoes comprehensive background checks, reference verification, and qualification confirmation.",
      list: ["Background Checks", "Reference Verification", "ID Verification"],
      color: "from-[#27BB97] to-[#1FA987]",
    },
    {
      icon: <ThumbsUp className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "We stand behind every service. If you're not satisfied, we'll work to make it right.",
      rating: "4.8",
      ratingText: "Average Parent Rating",
      color: "from-[#27BB97] to-[#1FA987]",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our dedicated support team is always available to help with any questions or concerns.",
      color: "from-[#27BB97] to-[#1FA987]",
    },
  ];

  return (
    <section className="mb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Parents <span className="text-[#27BB97]">Trust Us</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Safe, reliable, and stress-free childcare solutions you can count on
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#27BB97] hover:shadow-2xl transition-all duration-300 flex flex-col group"
          >
            {/* Icon Header */}
            <div className="h-32 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#27BB97] to-[#1FA987] flex items-center justify-center shadow-lg">
                <div className="text-white">{feature.icon}</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#27BB97] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Specific content per card */}
              {feature.list && (
                <ul className="space-y-3 mb-6">
                  {feature.list.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#27BB97]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {feature.rating && (
                <div className="mt-auto bg-gray-50 rounded-xl p-5 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {feature.rating}
                  </div>
                  <div className="text-gray-600 text-sm">{feature.ratingText}</div>
                </div>
              )}

              {feature.title === "24/7 Support" && (
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button className="flex-1 py-3 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-xl hover:from-[#1FA987] hover:to-[#198F72] transition-all shadow-md flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </button>
                  <button className="flex-1 py-3 border-2 border-[#27BB97] text-[#27BB97] font-semibold rounded-xl hover:bg-[#27BB97] hover:text-white transition-all flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;