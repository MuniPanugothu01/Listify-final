import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';

export default function BabysitterFaq() {
  const [activeTab, setActiveTab] = useState('parent');
  const [openQuestion, setOpenQuestion] = useState(null);

  const parentFAQs = [
    {
      question: "How much does it cost to hire a babysitter?",
      answer: "The cost of hiring a babysitter varies based on location, experience, and number of children. On average, babysitters charge between $15-25 per hour. Rates may be higher for multiple children, late nights, or special requirements."
    },
    {
      question: "What are the typical working hours for a babysitter?",
      answer: "Babysitting hours are typically flexible and based on your needs. Common times include evenings, weekends, after-school hours, and date nights. Some babysitters also offer regular part-time schedules or daytime care."
    },
    {
      question: "What are the benefits of hiring a regular babysitter versus occasional sitters?",
      answer: "Regular babysitters build rapport with your children, understand family routines, and provide consistency. Occasional sitters offer flexibility for one-time needs. Many families use a mix of both depending on their schedule."
    },
    {
      question: "How do I create an attractive job post to find a babysitter?",
      answer: "Include details about your children's ages, schedule needed, responsibilities, pay rate, and any special requirements. Be clear about expectations and highlight what makes your family a great place to work."
    },
    {
      question: "How do I check a babysitter's references?",
      answer: "Contact at least 2-3 previous families, ask about reliability, interaction with children, and professionalism. Verify experience with similar age groups and ask about any special skills or certifications."
    }
  ];

  const babysitterFAQs = [
    {
      question: "What qualifications do I need to become a babysitter?",
      answer: "While formal qualifications aren't always required, most families prefer babysitters with CPR/First Aid certification, childcare experience, and good references. Experience with specific age groups and educational activities is valued."
    },
    {
      question: "What are the typical responsibilities of a babysitter?",
      answer: "Typical responsibilities include supervising children, preparing simple meals, helping with homework, organizing safe activities, following bedtime routines, and maintaining a safe environment. Light housekeeping is sometimes included."
    },
    {
      question: "How do I create a standout profile on Sulekha Care Services?",
      answer: "Include a friendly photo, detailed experience with different age groups, certifications, special skills (music, arts, tutoring), and a warm bio. Highlight your availability for evenings, weekends, or last-minute bookings."
    },
    {
      question: "Can I apply to multiple jobs at once on Sulekha Care Services?",
      answer: "Yes, you can apply to multiple positions simultaneously. This increases your chances of finding the right fit. Customize your application for each family to show genuine interest and understanding of their needs."
    },
    {
      question: "What are the advantages of having CPR or First Aid certifications as a babysitter?",
      answer: "CPR and First Aid certifications demonstrate professionalism, preparedness for emergencies, and commitment to child safety. These certifications often make you more competitive and can justify higher rates with safety-conscious families."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const currentFAQs = activeTab === 'parent' ? parentFAQs : babysitterFAQs;

  return (
    <div className=" px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
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
                We've Answered Common Questions to Help You Find the Perfect Babysitter or Babysitting Job.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-8">
            {/* Tab Buttons */}
            <div className="flex justify-start lg:justify-end mb-4 sm:mb-6">
              <div className="inline-flex bg-white rounded-full p-1 shadow-sm sm:shadow-md border border-gray-200 w-full lg:w-auto">
                <button
                  onClick={() => setActiveTab('parent')}
                  className={`flex-1 lg:flex-none px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm ${
                    activeTab === 'parent'
                      ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View parent FAQs"
                >
                  Parent
                </button>
                <button
                  onClick={() => setActiveTab('babysitter')}
                  className={`flex-1 lg:flex-none px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm ${
                    activeTab === 'babysitter'
                      ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View babysitter FAQs"
                >
                  Babysitter
                </button>
              </div>
            </div>

            {/* Section Title */}
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#27BB97] mb-4 sm:mb-6">
              {activeTab === 'parent' ? 'Parent' : 'Babysitter'}
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