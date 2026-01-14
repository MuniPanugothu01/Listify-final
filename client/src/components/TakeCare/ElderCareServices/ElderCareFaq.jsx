import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ElderCareFaq() {
  const [activeTab, setActiveTab] = useState('family');
  const [openQuestion, setOpenQuestion] = useState(null);

  const familyFAQs = [
    {
      question: "How much does it cost to hire an elder caregiver?",
      answer: "The cost of hiring an elder caregiver varies based on care needs, experience, and schedule. On average, caregivers charge between $18-35 per hour. Rates may be higher for specialized care, overnight shifts, or medical training."
    },
    {
      question: "What are the typical working hours for an elder caregiver?",
      answer: "Caregiving hours are flexible based on your needs. Common arrangements include daytime shifts, overnight care, live-in arrangements, or 24/7 care for more intensive needs."
    },
    {
      question: "What are the benefits of hiring a regular caregiver versus occasional help?",
      answer: "Regular caregivers provide consistency, understand specific care needs, and build rapport with seniors. Occasional help is ideal for respite care or temporary assistance."
    },
    {
      question: "How do I create an attractive job post to find a caregiver?",
      answer: "Include details about care needs, medical conditions, required assistance, schedule, pay rate, and any special requirements. Be clear about expectations and care philosophy."
    },
    {
      question: "How do I check a caregiver's references and qualifications?",
      answer: "Review caregiving certifications, medical training, and contact at least 2-3 previous families. Ask about reliability, compassion, and specific care experience."
    }
  ];

  const caregiverFAQs = [
    {
      question: "What qualifications do I need to become a professional elder caregiver?",
      answer: "While CNA or HHA certifications are valuable, most families look for caregivers with experience, compassion, and good references. Specialized training in dementia care or medication management is highly valued."
    },
    {
      question: "What are the typical responsibilities of an elder caregiver?",
      answer: "Typical responsibilities include personal care assistance, medication reminders, companionship, meal preparation, light housekeeping, and mobility support. Some positions may include medical tasks."
    },
    {
      question: "How do I create a standout profile on Sulekha Care Services?",
      answer: "Include professional certifications, detailed care experience, special skills (dementia care, mobility assistance), and a compassionate bio. Highlight your availability and care philosophy."
    },
    {
      question: "Can I apply to multiple jobs at once on Sulekha Care Services?",
      answer: "Yes, you can apply to multiple positions simultaneously. This increases your chances of finding the right fit. Customize your application for each family to show understanding of their specific needs."
    },
    {
      question: "What are the advantages of having caregiving certifications?",
      answer: "Caregiving certifications demonstrate professionalism, knowledge of proper care techniques, and commitment to quality care. These certifications often make you more competitive and can justify higher rates."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const currentFAQs = activeTab === 'family' ? familyFAQs : caregiverFAQs;

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
                We've Answered Common Questions to Help You Find Compassionate Elder Care or Caregiving Jobs.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-8">
            {/* Tab Buttons */}
            <div className="flex justify-start lg:justify-end mb-4 sm:mb-6">
              <div className="inline-flex bg-white rounded-full p-1 shadow-sm sm:shadow-md border border-gray-200 w-full lg:w-auto">
                <button
                  onClick={() => setActiveTab('family')}
                  className={`flex-1 lg:flex-none px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm ${
                    activeTab === 'family'
                      ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View family FAQs"
                >
                  Family
                </button>
                <button
                  onClick={() => setActiveTab('caregiver')}
                  className={`flex-1 lg:flex-none px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm ${
                    activeTab === 'caregiver'
                      ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View caregiver FAQs"
                >
                  Caregiver
                </button>
              </div>
            </div>

            {/* Section Title */}
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#27BB97] mb-4 sm:mb-6">
              {activeTab === 'family' ? 'Family' : 'Caregiver'}
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