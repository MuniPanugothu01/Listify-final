import React from 'react';

export default function ForSaleRecommended() {
  const recommendedProducts = [
    {
      title: 'Living Room Furnitures',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop',
      buttonText: 'View all products'
    },
    {
      title: 'Bedroom Furnitures',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
      buttonText: 'View all products'
    },
    {
      title: 'Dining Furnitures',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop',
      buttonText: 'View all products'
    }
  ];

  return (
    <div className="bg-white">
      {/* Most Recommend Product For You Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Most Recommend Product For You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-recommended furniture tailored to your style and needs. Elevate your home with pieces crafted for comfort and sophistication.
          </p>
        </div>

        {/* Recommended Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Living Room - Large Card */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={recommendedProducts[0].image}
              alt={recommendedProducts[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
                {recommendedProducts[0].title}
              </h3>
              <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
                {recommendedProducts[0].buttonText}
              </button>
            </div>
          </div>

          {/* Right Column - Bedroom & Dining */}
          <div className="grid grid-cols-1 gap-6">
            {/* Bedroom Card */}
            <div className="relative h-[195px] md:h-[240px] rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={recommendedProducts[1].image}
                alt={recommendedProducts[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                  {recommendedProducts[1].title}
                </h3>
                <button className="bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                  {recommendedProducts[1].buttonText}
                </button>
              </div>
            </div>

            {/* Dining Card */}
            <div className="relative h-[195px] md:h-[240px] rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={recommendedProducts[2].image}
                alt={recommendedProducts[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                  {recommendedProducts[2].title}
                </h3>
                <button className="bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                  {recommendedProducts[2].buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Build Your Home Section */}
      {/* <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1600&h=900&fit=crop"
          alt="Comfortable interior room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 bg-opacity-50" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl">
            Build Your Home With A Comfortable Room By Using Our Interior
          </h2>
          <p className="text-white text-base md:text-lg mb-8 max-w-2xl opacity-90">
            Transform your space into a haven of comfort and style with our expertly curated interior solutions.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
      </div> */}
    </div>
  );
}