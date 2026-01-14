import React from 'react';
import { Building, Image, Star, Award, CheckCircle } from 'lucide-react';

export default function CareCenterProfile() {
  const steps = [
    {
      icon: <Building className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "Register your care center with license details, services offered, and facility information to create a comprehensive profile.",
      buttonText: "Register Center",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/care-center-1.jpg"
    },
    {
      icon: <Image className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "Add facility photos, virtual tours, and amenities visuals to showcase your center's environment and quality.",
      buttonText: "Add Photos",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/care-center-2.jpg"
    },
    {
      icon: <Star className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "List your services, staff qualifications, special programs, and care specialties. Highlight your unique offerings.",
      buttonText: "Add Services",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/care-center-3.jpg"
    },
    {
      icon: <Award className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "Upload licenses, certifications, and accreditation documents. Verified centers receive priority in search results.",
      buttonText: "Upload Documents",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/care-center-4.jpg"
    },
    {
      icon: <CheckCircle className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      iconColor: "text-white",
      title: "Complete your profile with pricing, availability, and contact information. Use our dashboard to manage inquiries.",
      buttonText: "Complete Profile",
      buttonColor: "bg-[#27BB97] hover:bg-[#1FA987]",
      bgImage: "/care-center-5.jpg"
    }
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-3 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
            List Your Care Center
          </h1>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg">
            Connect with families looking for quality care facilities.
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
            aria-label="List your care center"
          >
            <span>List Your Center</span>
            <span className="text-lg xs:text-xl">→</span>
          </button>
          
          {/* Additional Info */}
          <p className="mt-4 sm:mt-6 text-gray-500 text-xs xs:text-sm">
            Join hundreds of care centers already connected with families
          </p>
        </div>
      </div>
    </div>
  );
}