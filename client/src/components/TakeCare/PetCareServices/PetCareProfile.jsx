import React from 'react';
import { User, Image, Star, PawPrint, CheckCircle } from 'lucide-react';

export default function PetCareProfile() {
  const steps = [
    {
      icon: <User className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "Register with your email, password, and details to create a pet care profile. Use Smart Matching to connect with pet owners.",
      buttonText: "Sign Up",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/pet-care-1.jpg"
    },
    {
      icon: <Image className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "Add a friendly photo with pets to make your profile stand out and attract more pet care opportunities.",
      buttonText: "Upload Photos",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/pet-care-2.jpg"
    },
    {
      icon: <Star className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "List your pet care skills, certifications, pet experience, and availability. Real-time updates show pet owners when you're available.",
      buttonText: "Add Skills",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/pet-care-3.jpg"
    },
    {
      icon: <PawPrint className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "Verify your email and phone number to build trust. Reach more pet owners through our Mobile App for flexible scheduling.",
      buttonText: "Get Verified",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/pet-care-4.jpg"
    },
    {
      icon: <CheckCircle className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "Review your profile for accuracy. Use Pet Care Dashboard to manage bookings, reviews, and track your pet sitting schedule.",
      buttonText: "Complete Profile",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/pet-care-5.jpg"
    }
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-3 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
            Create a Pet Sitter Profile
          </h1>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg">
            Connect with pet owners looking for loving care for their furry friends.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 xs:gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Card with Background Image */}
              <div 
                className="rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg sm:shadow-md transition-all duration-300 h-56 xs:h-60 sm:h-64 lg:h-80 flex flex-col relative overflow-hidden hover:scale-[1.02]"
              >
                {/* Background Image with dark overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${step.bgImage})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 lg:from-black/50 lg:via-black/40 lg:to-black/70"></div>

                {/* Content */}
                <div className="relative z-10 flex-grow flex flex-col p-4 xs:p-5 sm:p-6">
                  {/* Step Number */}
                  <div className="absolute top-3 xs:top-4 right-3 xs:right-4 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs xs:text-sm">{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`${step.iconColor} mb-3 xs:mb-4`}>
                    {step.icon}
                  </div>

                  {/* Description */}
                  <p className="text-white text-xs xs:text-sm sm:text-sm leading-relaxed flex-grow line-clamp-4 xs:line-clamp-5">
                    {step.title}
                  </p>
                </div>

                {/* Button */}
                <button 
                  className={`w-full ${step.buttonColor} text-white font-semibold py-2.5 xs:py-3 sm:py-4 rounded-b-lg sm:rounded-b-xl transition-all duration-200 shadow-sm hover:shadow-md text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent relative z-10`}
                  aria-label={`Step ${index + 1}: ${step.buttonText}`}
                >
                  {step.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            className="bg-gradient-to-r from-[#27BB97] to-[#1FA987] hover:from-[#1FA987] hover:to-[#198F72] text-white font-semibold py-3 xs:py-3.5 sm:py-4 px-8 xs:px-10 sm:px-12 rounded-full sm:rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 text-sm xs:text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2"
            aria-label="Create your pet sitter profile"
          >
            <span>Create your profile</span>
            <span className="text-lg xs:text-xl">→</span>
          </button>
          
          {/* Additional Info */}
          <p className="mt-4 sm:mt-6 text-gray-500 text-xs xs:text-sm">
            Join thousands of pet care professionals already connected with pet owners
          </p>
        </div>
      </div>
    </div>
  );
}