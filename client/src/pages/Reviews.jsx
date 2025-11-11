import React from 'react';

const Reviews = () => {
  const testimonials = [
    {
      name: "Mehwish",
      text: "Consequat interrelated discretion astromatting on stimulated apartments oh.",
      avatar: "https://i.pravatar.cc/150?img=47",
      color: "bg-gray-100"
    },
    {
      name: "Elizabeth Jeff",
      text: "Door so sing when in as find food or call. As distruttis behaviour abilities defective is.",
      avatar: "https://i.pravatar.cc/150?img=44",
      color: "bg-purple-50"
    },
    {
      name: "Emily Thomas",
      text: "Never at water me might. On formed merits hunted unable merely by me whence or.",
      avatar: "https://i.pravatar.cc/150?img=45",
      color: "bg-gray-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-8 relative overflow-hidden ">
      {/* Decorative Elements */}
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10   p-24 rounded-3xl">
        {/* Left Section */}
        <div className="space-y-6 pt-8 lg:pt-0">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight uppercase">
            What Our<br />Customers Says
          </h1>
          
          <p className="text-gray-600 leading-relaxed max-w-md">
            Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common.
          </p>

          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2">
            View More
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Right Section - Testimonials */}
        <div className="relative space-y-8 pt-4 p-8 rounded-3xl ">
          {/* Testimonial Cards - Stacked with exact spacing and positioning */}
          <div 
            className={`${testimonials[0].color} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative `}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img 
                src={testimonials[0].avatar}
                alt={testimonials[0].name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-md"
              />
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-gray-900 font-semibold text-base truncate">
                    {testimonials[0].name}
                  </h3>
                
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {testimonials[0].text}
                </p>
              </div>
            </div>
          </div>

          <div 
            className={`${testimonials[1].color} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative border border-purple-100 ml-4 -mt-4`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img 
                src={testimonials[1].avatar}
                alt={testimonials[1].name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-md"
              />
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-gray-900 font-semibold text-base truncate">
                    {testimonials[1].name}
                  </h3>
                 
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {testimonials[1].text}
                </p>
              </div>
            </div>
          </div>

          <div 
            className={`${testimonials[2].color} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img 
                src={testimonials[2].avatar}
                alt={testimonials[2].name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-md"
              />
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-gray-900 font-semibold text-base truncate">
                    {testimonials[2].name}
                  </h3>
                 
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {testimonials[2].text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;