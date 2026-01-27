import React from 'react';

export default function ForSaleRecommended() {
  const recommendedProducts = [
    {
      title: 'Home Essentials',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      buttonText: 'Shop Home'
    },
    {
      title: 'Fashion Collection',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&h=600&fit=crop',
      buttonText: 'Shop Fashion'
    },
    {
      title: 'Electronics',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      buttonText: 'Shop Electronics'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Recommended <span className="gradient-text">For You</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Discover personalized recommendations across all categories based on your interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer hover-lift">
            <img
              src={recommendedProducts[0].image}
              alt={recommendedProducts[0].title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent" />
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                {recommendedProducts[0].title}
              </h3>
              <button 
                className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full font-medium transition-colors text-sm sm:text-base"
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
                {recommendedProducts[0].buttonText}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="relative h-[145px] sm:h-[165px] md:h-[190px] rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer hover-lift">
              <img
                src={recommendedProducts[1].image}
                alt={recommendedProducts[1].title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  {recommendedProducts[1].title}
                </h3>
                <button 
                  className="px-3 sm:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
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
                  {recommendedProducts[1].buttonText}
                </button>
              </div>
            </div>

            <div className="relative h-[145px] sm:h-[165px] md:h-[190px] rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer hover-lift">
              <img
                src={recommendedProducts[2].image}
                alt={recommendedProducts[2].title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  {recommendedProducts[2].title}
                </h3>
                <button 
                  className="px-3 sm:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
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
                  {recommendedProducts[2].buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}