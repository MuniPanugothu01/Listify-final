import React from 'react';
import { UserPlus, Search, ClipboardCheck, LayoutDashboard, ArrowRight } from 'lucide-react';

const NannyHowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: 'Sign Up',
      description: 'Register on our website and provide your personal or professional details to set up your profile.'
    },
    {
      icon: <Search className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: 'Search & Connect',
      description: 'Use our platform to find nanny or job listings that meet your needs and preferences.'
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: 'Review & Hire',
      description: 'Review profiles, conduct interviews, and hire or get hired.'
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12" />,
      title: 'Dashboard & Support',
      description: 'Utilize customer support and dashboards provided by our website for families and caregivers.'
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
            Simple steps to find the perfect nanny or the ideal nanny job
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-6 xs:p-7 sm:p-8 lg:p-10 border border-gray-200 hover:border-[#27BB97] transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl group flex flex-col items-center"
            >
              {/* Icon */}
              <div className="text-[#27BB97] mb-4 xs:mb-5 sm:mb-6">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-900 text-center mb-3 xs:mb-4 line-clamp-1">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center text-xs xs:text-sm sm:text-sm leading-relaxed flex-grow">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Find a Job Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-7 lg:p-8 shadow-md sm:shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-200">
            <div className="text-center mb-4 xs:mb-5 sm:mb-6">
              <h3 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 line-clamp-1">
                Find a Job Today
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm xs:text-base sm:text-base">
                Ready to be an exceptional nanny? Set up your profile and apply for nanny jobs to bring joy and care.
              </p>
            </div>
            <button className="w-full bg-gradient-to-r from-[#27BB97] to-[#1EA583] hover:from-[#1EA583] hover:to-[#168F6F] text-white font-semibold py-3 xs:py-3.5 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg text-sm xs:text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2">
              Create Your Nanny Profile
              <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
            </button>
          </div>

          {/* Hire a Nanny Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-7 lg:p-8 shadow-md sm:shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-200">
            <div className="text-center mb-4 xs:mb-5 sm:mb-6">
              <h3 className="text-xl xs:text-2xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 line-clamp-1">
                Hire a Nanny
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm xs:text-base sm:text-base">
                Seeking trusted nanny? Create a profile and find nannies to bring joy and care to your children.
              </p>
            </div>
            <button className="w-full bg-gradient-to-r from-[#27BB97] to-[#1EA583] hover:from-[#1EA583] hover:to-[#168F6F] text-white font-semibold py-3 xs:py-3.5 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg text-sm xs:text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2">
              Post Your Nanny Job
              <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center px-2">
          <div className="inline-flex items-center gap-2 xs:gap-3 text-gray-600 mb-2 xs:mb-3">
            <div className="w-8 xs:w-10 sm:w-12 h-0.5 bg-gray-300"></div>
            <span className="text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap">
              Simple, Secure, and Efficient
            </span>
            <div className="w-8 xs:w-10 sm:w-12 h-0.5 bg-gray-300"></div>
          </div>
          <p className="text-gray-500 text-xs xs:text-sm">
            Join thousands of families and caregivers who trust our platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default NannyHowItWorks;