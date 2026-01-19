import React, { useState } from 'react';
import { Package, Truck, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ForSaleFaq() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const offers = [
    {
      icon: Package,
      title: 'Made Your Order',
      description: 'Browse our extensive collection and select the perfect furniture pieces for your home.'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Enjoy complimentary delivery on all orders, bringing your new furniture right to your doorstep.'
    },
    {
      icon: CheckCircle,
      title: 'Fast & Secure',
      description: 'Experience quick processing and secure transactions for a worry-free shopping experience.'
    }
  ];

  const testimonials = [
    {
      name: 'Bessie Cooper',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      text: 'Beautiful and well-made product!',
      product: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop'
    },
    {
      name: 'Jane Cooper',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 5,
      text: 'Amazing customer service and quality!',
      product: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
    },
    {
      name: 'Savannah Nguyen',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
      text: 'Exceeded all my expectations!',
      product: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=200&fit=crop'
    },
    {
      name: 'Guy Hawkins',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 5,
      text: 'Great quality and fast shipping!',
      product: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=300&h=200&fit=crop'
    },
    {
      name: 'Kristin Watson',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      rating: 5,
      text: 'Absolutely love my new furniture!',
      product: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&h=200&fit=crop'
    },
    {
      name: 'Robert Fox',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 5,
      text: 'Best purchase Ive made this year!',
      product: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=200&fit=crop'
    }
  ];

  const faqs = [
    {
      question: 'What is the estimated delivery time for my order?',
      answer: 'Delivery times vary depending on your location and the product. Typically, orders are delivered within 5-10 business days. You will receive a tracking number once your order ships.'
    },
    {
      question: 'Do you offer a customization service for furniture?',
      answer: 'Yes, we offer customization services for select furniture pieces. You can choose from various materials, colors, and sizes to match your specific needs and preferences.'
    },
    {
      question: 'Do you offer furniture assembly services?',
      answer: 'Yes, we provide professional furniture assembly services for an additional fee. Our experienced team will ensure your furniture is assembled correctly and safely.'
    },
    {
      question: 'What are my delivery or pick-up options?',
      answer: 'We offer both home delivery and in-store pickup options. For delivery, we provide white-glove service including placement in your desired room. Pick-up is available at our warehouse locations.'
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
            What We Can Offer You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to providing the best experience
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                  <Icon className="w-8 h-8 text-gray-900" />
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
              Word From Our Happy Customers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our satisfied customers have to say about their experience
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
                    alt="Product"
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
            You've Got Questions & We've Got Answers!
          </h2>
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
        <div className="text-center mt-8">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}