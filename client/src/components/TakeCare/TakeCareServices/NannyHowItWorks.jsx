import React from 'react';
import { UserPlus, Search, ClipboardCheck, LayoutDashboard, ArrowRight, ArrowUp } from 'lucide-react';

const NannyHowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-16 h-16" />,
      title: 'Sign Up',
      description: 'Register on our website and provide your personal or professional details to set up your profile.'
    },
    {
      icon: <Search className="w-16 h-16" />,
      title: 'Search & Connect',
      description: 'Use our platform to find nanny or job listings that meet your needs and preferences.'
    },
    {
      icon: <ClipboardCheck className="w-16 h-16" />,
      title: 'Review & Hire',
      description: 'Review profiles, conduct interviews, and hire or get hired.'
    },
    {
      icon: <LayoutDashboard className="w-16 h-16" />,
      title: 'Dashboard & Support',
      description: 'Utilize customer support and dashboards provided by our website for families and caregivers.'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative py-20 px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/nanny-care-4.jpg')`,
        }}
      >
 
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 800 - 400}px`,
                  top: `${Math.random() * 400 - 200}px`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className=" relative z-10">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          How it works
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-white mb-6 flex justify-center">
                <div className="p-4 bg-white/10 rounded-full">
                  {step.icon}
                </div>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-white text-[#27BB97] rounded-full flex items-center justify-center font-bold mr-2">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-white/90 text-center leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connecting lines for steps (desktop only) */}
        <div className="hidden lg:flex items-center justify-center mb-16 px-8">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              <div className="h-0.5 bg-white/30 flex-1 max-w-24"></div>
              {index < steps.length - 1 && (
                <div className="w-3 h-3 bg-white rounded-full mx-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Find a Job Card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Find a Job today
            </h3>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              Ready to be an exceptional nanny? Set up your profile and apply for nanny jobs to bring joy and care.
            </p>
            <button className="w-full bg-gradient-to-r from-[#27BB97] to-[#1EA583] hover:from-[#1EA583] hover:to-[#168F6F] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              Create Your Nanny Profile
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Hire a Nanny Card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Hire a Nanny
            </h3>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              Seeking trusted nanny? Create a profile and find nannies to bring joy and care to your children.
            </p>
            <button className="w-full bg-gradient-to-r from-[#27BB97] to-[#1EA583] hover:from-[#1EA583] hover:to-[#168F6F] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              Post Your Nanny Job
              <ArrowRight className="w-5 h-5" />

            </button>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-white/80">
            <div className="w-8 h-0.5 bg-white/50"></div>
            <span className="text-sm font-medium">Simple, Secure, and Efficient</span>
            <div className="w-8 h-0.5 bg-white/50"></div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-white hover:bg-gray-100 text-[#27BB97] w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl z-50 hover:scale-110"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default NannyHowItWorks;