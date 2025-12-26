import React, { useState } from 'react';
import { Search, ChevronDown, Star, MessageCircle, Phone, Sparkles } from 'lucide-react';

const ServiceHub = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [loadedSections, setLoadedSections] = useState(['home', 'appliance', 'cleaning', 'personal']);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const loadMoreSections = () => {
    const newSections = ['event', 'education', 'it', 'repair'];
    setLoadedSections(prev => [...prev, ...newSections]);
  };

  const topCategories = [
    { icon: '🏠', label: 'Home', key: 'home' },
    { icon: '🔌', label: 'Appliance', key: 'appliance' },
    { icon: '🧹', label: 'Cleaning', key: 'cleaning' },
    { icon: '💇', label: 'Personal', key: 'personal' },
    { icon: '🎉', label: 'Event', key: 'event' },
    { icon: '💻', label: 'Digital', key: 'it' }
  ];

  const serviceSections = {
    home: {
      title: 'Home Services',
      icon: '🏠',
      services: [
        { icon: '🚿', label: 'Plumbing' },
        { icon: '⚡', label: 'Electrical' },
        { icon: '🪚', label: 'Carpentry' },
        { icon: '🎨', label: 'Painting' },
        { icon: '🧹', label: 'Cleaning' },
        { icon: '🐜', label: 'Pest Control' },
        { icon: '❄️', label: 'AC Service' },
        { icon: '🚽', label: 'Bathroom' }
      ]
    },
    appliance: {
      title: 'Appliance Repair',
      icon: '🔌',
      services: [
        { icon: '🧺', label: 'Washing Machine' },
        { icon: '🧊', label: 'Refrigerator' },
        { icon: '📺', label: 'TV Repair' },
        { icon: '🔥', label: 'Microwave' },
        { icon: '💧', label: 'Water Purifier' }
      ]
    },
    cleaning: {
      title: 'Cleaning & Maintenance',
      icon: '🧼',
      services: [
        { icon: '🏠', label: 'House Cleaning' },
        { icon: '🚿', label: 'Bathroom Cleaning' },
        { icon: '🛋️', label: 'Sofa Cleaning' },
        { icon: '💧', label: 'Water Tank Cleaning' },
        { icon: '🪟', label: 'Window Cleaning' }
      ]
    },
    personal: {
      title: 'Personal & Lifestyle',
      icon: '💇',
      services: [
        { icon: '✂️', label: 'Salon at Home' },
        { icon: '💆', label: 'Massage' },
        { icon: '🧘', label: 'Yoga Trainer' },
        { icon: '🏋️', label: 'Gym Trainer' }
      ]
    },
    event: {
      title: 'Event Services',
      icon: '🎉',
      services: [
        { icon: '📸', label: 'Photography' },
        { icon: '🍽️', label: 'Catering' },
        { icon: '🎈', label: 'Decoration' },
        { icon: '🎧', label: 'DJ' }
      ]
    },
    education: {
      title: 'Education & Training',
      icon: '🎓',
      services: [
        { icon: '📚', label: 'Home Tuition' },
        { icon: '💻', label: 'Online Classes' },
        { icon: '📝', label: 'Exam Coaching' }
      ]
    },
    it: {
      title: 'IT & Digital Services',
      icon: '💻',
      services: [
        { icon: '🌐', label: 'Web Development' },
        { icon: '📱', label: 'App Development' },
        { icon: '📈', label: 'Digital Marketing' },
        { icon: '🎨', label: 'Design' }
      ]
    },
    repair: {
      title: 'Repair & Fabrication',
      icon: '🛠️',
      services: [
        { icon: '🔥', label: 'Welding' },
        { icon: '🛋️', label: 'Furniture Repair' },
        { icon: '🪟', label: 'Glass Work' }
      ]
    }
  };

  const featuredProfessionals = [
    { rating: 4.8, title: 'Top-rated Plumbers', serviceCount: '250+ Professionals' },
    { rating: 4.9, title: 'Certified Electricians', serviceCount: '180+ Experts' },
    { rating: 4.7, title: 'Same-day Cleaning', serviceCount: '300+ Cleaners' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">
            Find & Book <span className="text-[#27bb97]">Trusted</span> Service Professionals
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From home repairs to personal wellness, connect with verified professionals ready to serve you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="What service do you need? (e.g., plumber, cleaner, electrician)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#27bb97] focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>
              <button className="px-8 py-4 bg-[#27bb97] text-white rounded-xl hover:bg-[#1fa987] transition-colors font-medium text-lg whitespace-nowrap">
                Search Services
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-500">Popular:</span>
              {['Plumbing', 'Cleaning', 'Electrician', 'AC Repair', 'Painting'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
              <span className="text-[#27bb97]"></span> Popular Categories
            </h2>
            <button className="text-[#27bb97] hover:text-[#1fa987] font-medium flex items-center gap-1">
              See all categories
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {topCategories.map((category) => (
              <button
                key={category.key}
                className="group flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[#27bb97] hover:shadow-lg transition-all duration-300"
              >
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</span>
                <span className="text-base font-semibold text-gray-700 group-hover:text-[#27bb97]">
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Service Sections */}
        {loadedSections.map((sectionKey) => {
          const section = serviceSections[sectionKey];
          if (!section) return null;
          
          const isExpanded = expandedSections[sectionKey];
          const visibleServices = isExpanded ? section.services : section.services.slice(0, 6);

          return (
            <section key={sectionKey} className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{section.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-700">{section.title}</h2>
                    <p className="text-sm text-gray-500">{section.services.length} services available</p>
                  </div>
                </div>
                {section.services.length > 6 && (
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="flex items-center gap-2 text-[#27bb97] hover:text-[#1fa987] font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isExpanded ? 'Show Less' : 'View All'}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {visibleServices.map((service, index) => (
                  <div
                    key={index}
                    className="group relative flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg hover:border hover:border-[#27bb97]/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-[#27bb97] rounded-full"></div>
                    </div>
                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{service.icon}</span>
                    <span className="text-sm font-medium text-gray-700 text-center group-hover:text-[#27bb97] leading-tight">
                      {service.label}
                    </span>
                    <div className="mt-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      100+ professionals
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Lazy Loading Area */}
        {loadedSections.length < Object.keys(serviceSections).length && (
          <div className="my-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-500 text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-[#27bb97] rounded-full animate-pulse"></div>
              Scroll to load more services
            </div>
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-gray-50 text-gray-500 text-sm">OR</span>
              </div>
            </div>
            <button
              onClick={loadMoreSections}
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-[#27bb97] hover:text-[#27bb97] transition-all font-medium text-lg"
            >
              Load More Services
            </button>
          </div>
        )}

        {/* Featured Professionals */}
        <section className="my-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-700 mb-3">Featured Professionals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hand-picked, verified professionals with top ratings and reviews
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProfessionals.map((professional, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-[#27bb97]/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="ml-1 font-bold text-gray-700">{professional.rating}</span>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(professional.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-[#27bb97]/10 text-[#27bb97] rounded-full">
                    Verified
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">{professional.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{professional.serviceCount}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Starting from</span>
                  <span className="text-lg font-bold text-[#27bb97]">₹499</span>
                </div>
                <button className="w-full mt-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-[#27bb97] hover:text-white transition-colors font-medium">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="my-14 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#27bb97]/10 text-[#27bb97] rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Need Help Choosing?
            </div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">We're Here to Help!</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Not sure what you need? Our service experts will guide you to the perfect professional
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-[#27bb97] text-white rounded-xl hover:bg-[#1fa987] transition-colors font-medium text-lg">
                <MessageCircle className="w-5 h-5" />
                Chat with Service Expert
              </button>
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:border-[#27bb97] hover:text-[#27bb97] transition-colors font-medium text-lg">
                <Phone className="w-5 h-5" />
                Call: 1-800-SERVICE
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Average response time: <span className="font-medium text-[#27bb97]">2 minutes</span>
            </p>
          </div>
        </section>
      </main>

  
    </div>
  );
};

export default ServiceHub;