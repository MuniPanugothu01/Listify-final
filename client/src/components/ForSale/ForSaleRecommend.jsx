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
      title: 'Outdoor Living',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      buttonText: 'Shop Outdoor'
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Recommended For You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover personalized recommendations across all categories based on your interests and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={recommendedProducts[0].image}
              alt={recommendedProducts[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-amber-900/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
                {recommendedProducts[0].title}
              </h3>
              <button className="bg-white text-amber-900 px-6 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
                {recommendedProducts[0].buttonText}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="relative h-[195px] md:h-[240px] rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={recommendedProducts[1].image}
                alt={recommendedProducts[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                  {recommendedProducts[1].title}
                </h3>
                <button className="bg-white text-purple-900 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                  {recommendedProducts[1].buttonText}
                </button>
              </div>
            </div>

            <div className="relative h-[195px] md:h-[240px] rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={recommendedProducts[2].image}
                alt={recommendedProducts[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                  {recommendedProducts[2].title}
                </h3>
                <button className="bg-white text-green-900 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                  {recommendedProducts[2].buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}