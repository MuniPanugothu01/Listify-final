import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CareCenterFaq() {
  const [activeTab, setActiveTab] = useState('families');
  const [openQuestion, setOpenQuestion] = useState(null);

  const familyFAQs = [
    {
      question: "How much does assisted living typically cost?",
      answer: "Costs vary by location and services. In New York, assisted living averages $5,000-$7,000/month, nursing homes $8,000-$12,000/month, and memory care $6,000-$9,000/month."
    },
    {
      question: "What's the difference between assisted living and nursing homes?",
      answer: "Assisted living provides help with daily activities while nursing homes offer 24/7 medical care. Assisted living is for those needing some help, nursing homes for those requiring constant medical attention."
    },
    {
      question: "How do I choose the right care center?",
      answer: "Consider care needs, location, staff qualifications, resident reviews, facility cleanliness, activities offered, and your budget. Schedule tours and ask about staff-to-resident ratios."
    },
    {
      question: "What questions should I ask during a tour?",
      answer: "Ask about staff training, emergency procedures, meal options, activity schedules, visitor policies, medication management, and how they handle care plan changes."
    },
    {
      question: "Are there financial assistance options?",
      answer: "Yes, options include long-term care insurance, Medicaid (for those who qualify), veterans benefits, and sometimes state assistance programs. Our advisors can help explore options."
    }
  ];

  const providerFAQs = [
    {
      question: "How do I list my care center on your platform?",
      answer: "Create an account, complete the verification process, provide licensing information, add facility details and photos, and set your availability. Our team reviews all applications."
    },
    {
      question: "What are the requirements to list a care center?",
      answer: "Valid state license, insurance coverage, staff certifications, facility inspection reports, and compliance with local regulations. We verify all documentation."
    },
    {
      question: "How can I improve my center's visibility?",
      answer: "Complete your profile, add high-quality photos, respond to reviews, keep availability updated, and highlight special programs or amenities."
    },
    {
      question: "Is there a fee to list my care center?",
      answer: "Basic listings are free with premium options available. Premium features include priority placement, enhanced profiles, and advanced analytics."
    },
    {
      question: "How do I handle tour requests and inquiries?",
      answer: "Use our dashboard to manage inquiries, schedule tours, and communicate with families. We provide tools for efficient center management."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const currentFAQs = activeTab === 'families' ? familyFAQs : providerFAQs;

  return (
    <div className="px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Section */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <div className="inline-block bg-[#27BB97] text-white px-3 py-1 rounded-md text-xs xs:text-sm font-semibold mb-3 xs:mb-4">
                FAQS
              </div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                The answers you're looking for
              </h1>
              <p className="text-gray-600 text-sm xs:text-base sm:text-lg leading-relaxed">
                We've Answered Common Questions to Help You Find Quality Care or List Your Care Center.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-8">
            {/* Tab Buttons */}
            <div className="flex justify-start lg:justify-end mb-4 sm:mb-6">
              <div className="inline-flex bg-white rounded-full p-1 shadow-sm sm:shadow-md border border-gray-200 w-full lg:w-auto">
                <button
                  onClick={() => setActiveTab('families')}
                  className={`flex-1 lg:flex-none px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm ${
                    activeTab === 'families'
                      ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View family FAQs"
                >
                  Families
                </button>
                <button
                  onClick={() => setActiveTab('providers')}
                  className={`flex-1 lg:flex-none px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm ${
                    activeTab === 'providers'
                      ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View provider FAQs"
                >
                  Providers
                </button>
              </div>
            </div>

            {/* Section Title */}
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#27BB97] mb-4 sm:mb-6">
              {activeTab === 'families' ? 'Families' : 'Care Providers'}
            </h2>

            {/* FAQ Accordion */}
            <div className="space-y-3 sm:space-y-4">
              {currentFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl shadow-xs sm:shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-sm sm:hover:shadow-md"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-4 xs:px-5 sm:px-6 py-3 xs:py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-inset"
                    aria-expanded={openQuestion === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-gray-900 font-medium text-sm xs:text-base pr-3 xs:pr-4 flex-1 text-left">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center ml-2">
                      {openQuestion === index ? (
                        <ChevronUp className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
                      )}
                    </div>
                  </button>
                  
                  {openQuestion === index && (
                    <div 
                      id={`faq-answer-${index}`}
                      className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 pt-0 border-t border-gray-100"
                    >
                      <p className="text-gray-600 leading-relaxed text-sm xs:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}