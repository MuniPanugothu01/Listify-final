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
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about shopping with us
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              {openFAQ === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {openFAQ === index && (
              <div className="px-6 pb-6 pt-2 bg-white">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="mb-6">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-amber-600 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors mr-4">
            Contact Support
          </button>
          <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors">
            Live Chat Now
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Average response time: <span className="font-semibold">2 minutes</span> • Available 24/7
        </p>
      </div>
    </div>
  );
}