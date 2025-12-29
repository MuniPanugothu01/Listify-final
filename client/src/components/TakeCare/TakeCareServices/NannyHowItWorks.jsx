import React from 'react';
import { UserPlus, Search, ClipboardCheck, LayoutDashboard, ArrowRight } from 'lucide-react';

const NannyHowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-12 h-12" />,
      title: 'Sign Up',
      description: 'Register on our website and provide your personal or professional details to set up your profile.'
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: 'Search & Connect',
      description: 'Use our platform to find nanny or job listings that meet your needs and preferences.'
    },
    {
      icon: <ClipboardCheck className="w-12 h-12" />,
      title: 'Review & Hire',
      description: 'Review profiles, conduct interviews, and hire or get hired.'
    },
    {
      icon: <LayoutDashboard className="w-12 h-12" />,
      title: 'Dashboard & Support',
      description: 'Utilize customer support and dashboards provided by our website for families and caregivers.'
    }
  ];

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="text-[#27BB97]">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simple steps to find the perfect nanny or the ideal nanny job
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl p-6 border border-gray-200 hover:border-[#27BB97] transition-all duration-300 hover:shadow-xl group"
            >
            
              
              {/* Icon */}
              <div className="text-[#27BB97] mb-6 flex justify-center">
                <div className="p-4 bg-[#27BB97]/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {step.description}
              </p>
              
              {/* Bottom border effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-24 h-1 bg-[#27BB97] transition-all duration-300 rounded-t-full"></div>
            </div>
          ))}
        </div>

        {/* Connecting lines for desktop */}
        <div className="hidden lg:flex items-center justify-center mb-16 px-8">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              <div className="h-0.5 bg-gray-300 flex-1 max-w-20"></div>
              {index < steps.length - 1 && (
                <div className="w-3 h-3 bg-[#27BB97] rounded-full mx-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Find a Job Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#27BB97] to-[#1EA583] rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Find a Job Today
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ready to be an exceptional nanny? Set up your profile and apply for nanny jobs to bring joy and care.
              </p>
            </div>
            <button className="w-full bg-gradient-to-r from-[#27BB97] to-[#1EA583] hover:from-[#1EA583] hover:to-[#168F6F] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
              Create Your Nanny Profile
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Hire a Nanny Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#27BB97] to-[#1EA583] rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Hire a Nanny
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Seeking trusted nanny? Create a profile and find nannies to bring joy and care to your children.
              </p>
            </div>
            <button className="w-full bg-gradient-to-r from-[#27BB97] to-[#1EA583] hover:from-[#1EA583] hover:to-[#168F6F] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
              Post Your Nanny Job
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 text-gray-600">
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <span className="text-sm font-medium">Simple, Secure, and Efficient</span>
            <div className="w-12 h-0.5 bg-gray-300"></div>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            Join thousands of families and caregivers who trust our platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default NannyHowItWorks;