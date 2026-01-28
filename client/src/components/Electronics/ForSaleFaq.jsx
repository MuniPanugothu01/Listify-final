import React, { useState } from 'react';
import { Package, Truck, CheckCircle, ChevronDown, ChevronUp, Shield, Headphones } from 'lucide-react';

export default function ForSaleFaq() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const offers = [
    {
      icon: Shield,
      title: '1-Year Warranty',
      description: 'All electronics come with a comprehensive 1-year warranty covering manufacturing defects.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free next-day delivery on most items. Express shipping available for urgent orders.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock technical support and customer service for all your electronics needs.'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Tech Enthusiast',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'Amazing laptop at a great price! Performance exceeds expectations.',
      product: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
    },
    {
      name: 'Sarah Johnson',
      role: 'Gaming Streamer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      text: 'Best gaming monitor I have ever owned! Colors are vibrant.',
      product: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=200&fit=crop'
    },
    {
      name: 'Marcus Rivera',
      role: 'Photographer',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      rating: 5,
      text: 'Professional camera gear at unbeatable prices!',
      product: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop'
    },
    {
      name: 'Priya Sharma',
      role: 'Student',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      text: 'Perfect smartphone for my budget! Great battery life.',
      product: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=200&fit=crop'
    },
    {
      name: 'David Kim',
      role: 'Home Theater Owner',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 5,
      text: 'Sound system transformed my living room experience!',
      product: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=200&fit=crop'
    },
    {
      name: 'Jessica Miller',
      role: 'Smart Home User',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 5,
      text: 'Smart devices integration was seamless! Excellent support.',
      product: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
    }
  ];

  const faqs = [
    {
      question: 'What is the return policy for electronics?',
      answer: 'We offer a 30-day return policy for all electronics in original condition with packaging. For defective items, we provide a full refund or replacement under our warranty.'
    },
    {
      question: 'Do electronics come with international warranties?',
      answer: 'Most major brands come with international warranties. Please check the product details for specific warranty information. We also offer extended warranty options.'
    },
    {
      question: 'Are your electronics brand new or refurbished?',
      answer: 'We sell both brand new and certified refurbished electronics. Each product is clearly labeled. Refurbished items undergo rigorous testing and come with a 6-month warranty.'
    },
    {
      question: 'Do you provide technical setup assistance?',
      answer: 'Yes, we offer free remote setup assistance for all electronics. For complex installations (home theater systems, smart home setups), we provide professional installation services.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and offer financing options through Affirm and Klarna for qualifying orders over $500.'
    },
    {
      question: 'How do I track my electronics order?',
      answer: 'Once your order ships, you will receive a tracking number via email and SMS. You can also track your order from your account dashboard on our website.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* What We Can Offer You Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose Our Electronics Store
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Premium electronics with exceptional service and support
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{offer.title}</h3>
                <p className="text-gray-600">{offer.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Word From Our Happy Customers Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Electronics Enthusiasts Love Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from tech lovers who found their perfect gadgets with us
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                {/* Customer Info */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-gray-600 mb-4">{testimonial.text}</p>
                </div>

                {/* Product Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={testimonial.product}
                    alt="Electronics Product"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Electronics Shopping Questions Answered
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about buying electronics from us
          </p>
        </div>

        {/* FAQ Accordion */}
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

        {/* Contact Button */}
        <div className="text-center mt-12">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">Still have questions about electronics?</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors mr-4">
              Contact Tech Support
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
    </div>
  );
}