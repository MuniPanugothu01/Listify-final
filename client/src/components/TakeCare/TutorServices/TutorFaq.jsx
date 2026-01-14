import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function TutorFaq() {
  const [activeTab, setActiveTab] = useState('student');
  const [openQuestion, setOpenQuestion] = useState(null);

  const studentFAQs = [
    {
      question: "How much does it cost to hire a tutor?",
      answer: "The cost of hiring a tutor varies based on subject, experience, and qualifications. On average, tutors charge between $25-60 per hour. Rates may be higher for specialized subjects, test prep, or advanced degrees."
    },
    {
      question: "What are the typical tutoring session hours?",
      answer: "Tutoring hours are flexible based on your schedule. Common arrangements include after-school hours, weekends, online sessions, or intensive exam preparation periods."
    },
    {
      question: "What are the benefits of hiring a regular tutor versus occasional help?",
      answer: "Regular tutors provide consistency, understand your learning style, and can track progress over time. Occasional help is ideal for specific topics or exam preparation."
    },
    {
      question: "How do I create an attractive job post to find a tutor?",
      answer: "Include details about subject needs, student grade level, learning goals, preferred schedule, pay rate, and any special requirements. Be clear about expectations and learning objectives."
    },
    {
      question: "How do I check a tutor's qualifications and references?",
      answer: "Review educational credentials, teaching certifications, and contact at least 2-3 previous students/parents. Ask about teaching effectiveness, reliability, and student progress."
    }
  ];

  const tutorFAQs = [
    {
      question: "What qualifications do I need to become a professional tutor?",
      answer: "While degrees in education or specific subjects are valuable, most clients look for tutors with teaching experience, subject expertise, and good references. Teaching certifications and proven results are highly valued."
    },
    {
      question: "What are the typical responsibilities of a tutor?",
      answer: "Typical responsibilities include lesson planning, teaching concepts, homework assistance, progress tracking, test preparation, and adapting teaching methods to student needs."
    },
    {
      question: "How do I create a standout profile on Sulekha Care Services?",
      answer: "Include professional credentials, detailed subject expertise, teaching philosophy, student success stories, and a compelling bio. Highlight your availability and preferred teaching methods."
    },
    {
      question: "Can I apply to multiple jobs at once on Sulekha Care Services?",
      answer: "Yes, you can apply to multiple positions simultaneously. This increases your chances of finding the right fit. Customize your application for each student to show understanding of their specific needs."
    },
    {
      question: "What are the advantages of having teaching certifications as a tutor?",
      answer: "Teaching certifications demonstrate professionalism, knowledge of educational methodologies, and commitment to quality instruction. These certifications often make you more competitive and can justify higher rates."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const currentFAQs = activeTab === 'student' ? studentFAQs : tutorFAQs;

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
                We've Answered Common Questions to Help You Find the Perfect Tutor or Tutoring Job.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-8">
            {/* Tab Buttons */}
            <div className="flex justify-start lg:justify-end mb-4 sm:mb-6">
              <div className="inline-flex bg-white rounded-full p-1 shadow-sm sm:shadow-md border border-gray-200 w-full lg:w-auto">
                <button
                  onClick={() => setActiveTab('student')}
                  className={`flex-1 lg:flex-none px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm ${
                    activeTab === 'student'
                      ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View student FAQs"
                >
                  Student
                </button>
                <button
                  onClick={() => setActiveTab('tutor')}
                  className={`flex-1 lg:flex-none px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm ${
                    activeTab === 'tutor'
                      ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View tutor FAQs"
                >
                  Tutor
                </button>
              </div>
            </div>

            {/* Section Title */}
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#27BB97] mb-4 sm:mb-6">
              {activeTab === 'student' ? 'Student' : 'Tutor'}
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