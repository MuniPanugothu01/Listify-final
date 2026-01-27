import React from 'react';

export default function ForSaleTestimonials() {
  const testimonials = [
    {
      name: 'Sarah Miller',
      role: 'Homeowner',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      text: 'Beautiful furniture that transformed my living space!',
      product: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Fashion Enthusiast',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'Amazing clothing selection and perfect fit!',
      product: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=200&fit=crop'
    },
    {
      name: 'Jessica Wilson',
      role: 'Kitchen Lover',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      text: 'Professional cookware at unbeatable prices!',
      product: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop'
    },
    {
      name: 'David Park',
      role: 'Outdoor Enthusiast',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 5,
      text: 'Perfect patio set for summer gatherings!',
      product: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
    },
    {
      name: 'Priya Sharma',
      role: 'Beauty Blogger',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 5,
      text: 'Premium skincare products with visible results!',
      product: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop'
    },
    {
      name: 'Robert Kim',
      role: 'Fitness Coach',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      rating: 5,
      text: 'Excellent fitness equipment for home workouts!',
      product: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=300&h=200&fit=crop'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Hear from satisfied shoppers across all product categories
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="hover-lift">
              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-full">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-0.5 mb-2 sm:mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 text-sm sm:text-base mb-4">{testimonial.text}</p>
                </div>

                <div className="h-32 sm:h-36 md:h-40 overflow-hidden">
                  <img
                    src={testimonial.product}
                    alt="Product"
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}