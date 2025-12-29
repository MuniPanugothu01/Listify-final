import React from 'react';
import { User, Image, Lightbulb, Award, Send } from 'lucide-react';

export default function NannyProfile() {
  const steps = [
    {
      icon: <User className="w-8 h-8" />,
      iconColor: "text-orange-500",
      title: "Register with your email, password, and personal details to create a profile. Use Neighborhood-Based Matching to connect with local families effortlessly.",
      buttonText: "Sign Up",
      buttonColor: "bg-orange-500 hover:bg-orange-600"
    },
    {
      icon: <Image className="w-8 h-8" />,
      iconColor: "text-blue-600",
      title: "Add a professional, welcoming photo to make your profile stand out to attract more families in your area.",
      buttonText: "Upload a Photo",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      iconColor: "text-red-500",
      title: "List your caregiving skills, certifications, and availability. Real-time updates ensure families know when you're available.",
      buttonText: "Highlight Skills",
      buttonColor: "bg-red-500 hover:bg-red-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      iconColor: "text-teal-500",
      title: "Verify your email and phone number to build trust. Reach more families through our Mobile App integration.",
      buttonText: "Verification Check",
      buttonColor: "bg-teal-500 hover:bg-teal-600"
    },
    {
      icon: <Send className="w-8 h-8" />,
      iconColor: "text-yellow-500",
      title: "Review your profile for accuracy. Use Smart Dashboard Features to manage responses and track performance.",
      buttonText: "Submit & Review",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Create a Nanny Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with families looking for trusted care.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Card */}
              <div className="bg-white rounded-lg shadow-md p-6 h-80 flex flex-col">
                {/* Icon */}
                <div className={`${step.iconColor} mb-4`}>
                  {step.icon}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {step.title}
                </p>
              </div>

              {/* Button with speech bubble tail */}
              <div className="relative mt-[-1px]">  
                {/* Button */}
                <button className={`w-full ${step.buttonColor} text-white font-semibold py-3 px-6 rounded-b-lg transition-colors duration-200 shadow-md`}>
                  {step.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-[#27BB97] text-white font-semibold py-4 px-12 rounded-full shadow-lg transition-colors duration-200 inline-flex items-center gap-2">
            Create your profile
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}