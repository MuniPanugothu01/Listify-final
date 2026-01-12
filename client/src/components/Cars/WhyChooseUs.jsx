import React from "react";
import { FiClock, FiAward, FiTag, FiTool } from "react-icons/fi";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FiClock className="w-10 h-10" />,
      title: "Special Financing Offers",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: <FiAward className="w-10 h-10" />,
      title: "Trusted Car Dealership",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: <FiTag className="w-10 h-10" />,
      title: "Transparent Pricing",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: <FiTool className="w-10 h-10" />,
      title: "Expert Car Service",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start transition-all duration-300 ease-out
                         hover:-translate-y-1"
            >
              <div className="text-[#27bb97] mb-4">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
