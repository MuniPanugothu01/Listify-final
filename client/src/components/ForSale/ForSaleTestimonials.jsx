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
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from satisfied shoppers across all product categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
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
                
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
              </div>

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
  );
}