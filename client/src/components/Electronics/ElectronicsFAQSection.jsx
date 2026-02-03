import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ElectronicsFAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: 'What is the warranty on used electronics?',
      answer: 'We provide a 90-day warranty on all certified used electronics. For individual sellers, warranty terms are specified in each listing.'
    },
    {
      question: 'How do I test electronics before buying?',
      answer: 'We recommend meeting in public places where you can test devices. For high-value items, consider meeting at electronics stores that offer testing facilities.'
    },
    {
      question: 'Can I return electronics if they don\'t work?',
      answer: 'Yes, all defective electronics can be returned within 7 days. Make sure to test thoroughly before purchase and keep all communication records.'
    },
    {
      question: 'What payment methods are safest for electronics?',
      answer: 'We recommend cash for transactions under $500. For higher amounts, use secure payment apps with purchase protection like PayPal Goods & Services.'
    },
    {
      question: 'How do I verify electronics are not stolen?',
      answer: 'Always ask for original purchase receipts and check IMEI/Serial numbers. Avoid deals that seem too good to be true.'
    },
    {
      question: 'Do you offer tech support for electronics?',
      answer: 'While we don\'t provide direct tech support, our community forum has experienced members who can help with common electronics issues.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Electronics Buying <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Everything you need to know about buying electronics safely
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#27BB97' }} />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#27BB97' }} />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 sm:pt-2 bg-white">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}