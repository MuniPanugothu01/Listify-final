import React, { useState } from 'react';
import { Search, MapPin, Heart, Shield, Star, CheckCircle, Users, Home, BookOpen } from 'lucide-react';

const TakeCare = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  // Baby care service categories
  const serviceCategories = [
    {
      id: 'daycare',
      name: 'Day Care',
      description: 'Safe & nurturing daycare facilities with certified staff',
      icon: <Home className="w-6 h-6" />,
      color: 'from-pink-400 to-pink-600',
      count: '1,200+'
    },
    {
      id: 'nanny care',
      name: 'Nanny Care',
      description: 'Experienced nannies for in-home childcare',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600',
      count: '850+'
    },
    {
      id: 'babysitter',
      name: 'Baby Sitting',
      description: 'Trusted babysitters for flexible hours',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-green-400 to-green-600',
      count: '2,300+'
    }
  ];

  return (
    <div className="">
      {/* Hero Section - Only background image and text */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('babycare-7.jpg')`,
          }}
        />

        {/* Optional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Centered Content Container */}
        <div className="relative z-10 px-6 w-full max-w-7xl mx-auto">
          {/* Top Content - Centered */}
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight">
              Joy for Every
              <br />
              Little One!
            </h1>

            {/* Heart Icon */}
            <div className="flex justify-center my-6">
              <Heart className="w-16 h-16 md:w-20 md:h-20 text-white fill-white" />
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mt-8">
              Find the perfect, certified caregivers and daycare centers for your child. 
              Safe, loving environments where your baby can learn, grow, and thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar Section - Between hero and white content */}
      <div className="relative -mt-12 z-20  ">
        <div className="w-full max-w-5xl mx-auto ">
          <div className="bg-white rounded-xl shadow-2xl p-2 border border-gray-200  px-6 py-6">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-300">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search daycares, nannies, preschools..."
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 px-2 py-2 "
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-300">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Enter city or zip code"
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 px-2 py-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white rounded-lg font-semibold hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:shadow-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your page (white background sections) */}
      <section className="bg-white py-16 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Service Categories */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Find Trusted <span className="text-[#27BB97]">Baby Care Services</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our wide range of certified childcare providers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category) => (
                <div 
                  key={category.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group hover:border-[#27BB97]/20"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 text-center">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {category.count}
                    </span>
                    <button className="text-[#27BB97] font-medium text-sm hover:text-[#1FA987] transition-colors">
                      Browse →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
        </div>
      </section>


      <section className="bg-white">
         {/* Why Choose Us */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Parents <span className="text-[#27BB97]">Trust Us</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We make finding quality childcare simple, safe, and stress-free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Providers</h3>
                <p className="text-gray-600">All caregivers pass strict background checks</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">We stand behind every service we list</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Loving Care</h3>
                <p className="text-gray-600">Nurturing environments for happy babies</p>
              </div>
            </div>
          </div>

      </section>
    </div>
  );
};

export default TakeCare;