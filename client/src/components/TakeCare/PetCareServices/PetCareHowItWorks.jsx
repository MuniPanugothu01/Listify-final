import React from 'react';
import { UserPlus, Search, ClipboardCheck, PawPrint, ArrowRight } from 'lucide-react';

const PetCareHowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: 'Sign Up',
      description: 'Register on our website and provide your pet care details or pet owner information to set up your profile.'
    },
    {
      icon: <Search className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: 'Search & Connect',
      description: 'Use our platform to find pet sitters, dog walkers, or pet care jobs that match your needs and schedule.'
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: 'Review & Book',
      description: 'Review profiles, read reviews, and book the perfect pet care provider for your furry friend.'
    },
    {
      icon: <PawPrint className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: 'Dashboard & Support',
      description: 'Utilize customer support and dashboards for pet owners and pet care professionals.'
    }
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-3 xs:px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight">
            How It <span className="text-[#27BB97]">Works</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg max-w-3xl mx-auto">
            Simple steps to find loving pet care or start your pet sitting business
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 border border-gray-200 hover:border-[#27BB97] transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl group flex flex-col items-center"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -right-3 w-8 h-8 xs:w-10 xs:h-10 bg-[#27BB97] text-white rounded-full flex items-center justify-center text-sm xs:text-base font-bold shadow-md">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="text-[#27BB97] mb-4 xs:mb-5 sm:mb-6">
                <div className="p-3 xs:p-4 bg-[#27BB97]/10 rounded-xl xs:rounded-2xl group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-900 text-center mb-2 xs:mb-3 line-clamp-1">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center text-xs xs:text-sm sm:text-sm leading-relaxed flex-grow">
                {step.description}
              </p>
              
              {/* Bottom border effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-16 xs:group-hover:w-20 sm:group-hover:w-24 h-1 bg-[#27BB97] transition-all duration-300 rounded-t-full"></div>
            </div>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Find a Pet Sitter Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-7 lg:p-8 shadow-md sm:shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-200">
            <div className="text-center mb-4 xs:mb-5 sm:mb-6">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#27BB97] to-[#1EA583] rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4 shadow-md">
                <PawPrint className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 line-clamp-1">
                Find a Pet Sitter
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm xs:text-base sm:text-base">
                Need reliable pet care? Set up your profile and find experienced pet sitters and dog walkers in your area.
              </p>
            </div>
            <button className="w-full bg-gradient-to-r from-[#27BB97] to-[#1EA583] hover:from-[#1EA583] hover:to-[#168F6F] text-white font-semibold py-2.5 xs:py-3 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg text-sm xs:text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2">
              Find Pet Care
              <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
            </button>
          </div>

          {/* Become a Pet Sitter Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-7 lg:p-8 shadow-md sm:shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-200">
            <div className="text-center mb-4 xs:mb-5 sm:mb-6">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#27BB97] to-[#1EA583] rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4 shadow-md">
                <UserPlus className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 line-clamp-1">
                Become a Pet Sitter
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm xs:text-base sm:text-base">
                Love animals? Create your profile and start earning by providing pet care services in your neighborhood.
              </p>
            </div>
            <button className="w-full bg-gradient-to-r from-[#27BB97] to-[#1EA583] hover:from-[#1EA583] hover:to-[#168F6F] text-white font-semibold py-2.5 xs:py-3 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg text-sm xs:text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2">
              Start Pet Sitting
              <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center px-2">
          <div className="inline-flex items-center gap-2 xs:gap-3 text-gray-600 mb-2 xs:mb-3">
            <div className="w-8 xs:w-10 sm:w-12 h-0.5 bg-gray-300"></div>
            <span className="text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap">
              Trusted, Loving, and Reliable
            </span>
            <div className="w-8 xs:w-10 sm:w-12 h-0.5 bg-gray-300"></div>
          </div>
          <p className="text-gray-500 text-xs xs:text-sm">
            Join thousands of pet owners and pet sitters who trust our platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetCareHowItWorks;