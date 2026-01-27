import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ForSaleFAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all products in original condition with packaging. For defective items, we provide a full refund or replacement.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. Please check at checkout for specific rates.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email and SMS. You can also track your order from your account dashboard on our website.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and offer financing options through Affirm and Klarna for qualifying orders over $500.'
    },
    {
      question: 'Do you price match?',
      answer: 'Yes, we offer price matching on identical items from authorized retailers. Contact our customer service with the competitor\'s listing for verification.'
    },
    {
      question: 'How do I contact customer service?',
      answer: 'You can reach us 24/7 via live chat on our website, email at support@example.com, or call our toll-free number at 1-800-123-4567.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Everything you need to know about shopping with us
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

        <div className="text-center mt-8 sm:mt-12">
          <div className="mb-4 sm:mb-6">
            <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">Still have questions?</p>
            <div className="inline-flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
                style={{ 
                  backgroundColor: '#27BB97',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1E9E7E';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#27BB97';
                }}
              >
                Contact Support
              </button>
              <button 
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
                style={{ 
                  border: '2px solid #27BB97',
                  color: '#27BB97',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#27BB97';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#27BB97';
                }}
              >
                Live Chat Now
              </button>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Average response time: <span className="font-semibold">2 minutes</span> • Available 24/7
          </p>
        </div>
      </div>
    </section>
  );
}