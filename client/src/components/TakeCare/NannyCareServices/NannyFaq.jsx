import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';

export default function NannyFaq() {
  const [activeTab, setActiveTab] = useState('careSeeker');
  const [openQuestion, setOpenQuestion] = useState(null);

  const careSeekerFAQs = [
    {
      question: "How much does it cost to hire a nanny?",
      answer: "The cost of hiring a nanny varies based on location, experience, and responsibilities. On average, nannies charge between $15-25 per hour. Live-in nannies may have different compensation structures including room and board."
    },
    {
      question: "What are the typical working hours for a nanny?",
      answer: "Typical working hours vary based on family needs. Full-time nannies usually work 40-50 hours per week, while part-time arrangements can range from 15-30 hours. Some families need evening or weekend care as well."
    },
    {
      question: "What are the benefits of hiring a live-in nanny versus a live-out nanny?",
      answer: "Live-in nannies provide more flexibility and availability, often at a lower hourly rate since room and board are included. Live-out nannies maintain separate living arrangements, which can provide better work-life boundaries for both parties."
    },
    {
      question: "How do I create an attractive job post to find a nanny?",
      answer: "Include detailed information about your family, children's ages, responsibilities, schedule, compensation, and any special requirements. Be clear about expectations and highlight what makes your family a great place to work."
    },
    {
      question: "How do I check a nanny's references?",
      answer: "Contact at least 2-3 previous employers, ask specific questions about reliability, childcare skills, and professionalism. Verify employment dates and reasons for leaving. Consider background checks and credential verification as well."
    }
  ];

  const caregiverFAQs = [
    {
      question: "What qualifications do I need to become a nanny?",
      answer: "While formal qualifications aren't always required, most families prefer nannies with CPR/First Aid certification, childcare experience, and relevant education. Some positions may require early childhood education degrees or specialized training."
    },
    {
      question: "What are the typical responsibilities of a nanny?",
      answer: "Typical responsibilities include supervising children, preparing meals, helping with homework, organizing activities, light housekeeping related to children, transportation to activities, and maintaining a safe environment."
    },
    {
      question: "How do I create a standout profile on Sulekha Care Services?",
      answer: "Include a professional photo, detailed work history, certifications, special skills, and a compelling bio. Highlight your unique qualities, experience with different age groups, and any additional languages or skills you offer."
    },
    {
      question: "Can I apply to multiple jobs at once on Sulekha Care Services?",
      answer: "Yes, you can apply to multiple positions simultaneously. This increases your chances of finding the right fit. Make sure to customize your application for each family to show genuine interest."
    },
    {
      question: "What are the advantages of having CPR or First Aid certifications as a nanny?",
      answer: "CPR and First Aid certifications demonstrate professionalism, preparedness for emergencies, and commitment to child safety. These certifications often make you more competitive and can justify higher rates."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const currentFAQs = activeTab === 'careSeeker' ? careSeekerFAQs : caregiverFAQs;

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
                We've Answered Common Questions to Help You Choose the Right Care and Services for Your Needs.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-8">
            {/* Tab Buttons */}
            <div className="flex justify-start lg:justify-end mb-4 sm:mb-6">
              <div className="inline-flex bg-white rounded-full p-1 shadow-sm sm:shadow-md border border-gray-200 w-full lg:w-auto">
                <button
                  onClick={() => setActiveTab('careSeeker')}
                  className={`flex-1 lg:flex-none px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm ${
                    activeTab === 'careSeeker'
                      ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View care seeker FAQs"
                >
                  Care Seeker
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
              {activeTab === 'careSeeker' ? 'Care Seeker' : 'Caregiver'}
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


        {/* Scroll to Top Button */}
        <button 
          className="fixed bottom-4 xs:bottom-6 sm:bottom-8 right-3 xs:right-4 sm:right-6 lg:right-8 w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#27BB97] z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}