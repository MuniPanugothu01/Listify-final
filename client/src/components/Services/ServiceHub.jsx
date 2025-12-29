import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Star,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

const ServiceHub = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [loadedSections, setLoadedSections] = useState([
    "home",
    "appliance",
    "cleaning",
    "personal",
  ]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const loadMoreSections = () => {
    const newSections = ["event", "education", "it", "repair"];
    setLoadedSections((prev) => [...prev, ...newSections]);
  };

  const topCategories = [
    { icon: "/Services/home.jpg", label: "Home", key: "home" },
    { icon: "/Services/appliance.jpg", label: "Appliance", key: "appliance" },
    { icon: "/Services/cleaning.jpg", label: "Cleaning", key: "cleaning" },
    {
      icon: "/Services/personallifestyle.jpg",
      label: "Personal",
      key: "personal",
    },
    { icon: "/Services/eventservices.jpg", label: "Event", key: "event" },
    { icon: "/Services/ITDigital.jpg", label: "Digital", key: "it" },
  ];

  const serviceSections = {
    home: {
      title: "Home Services",
      icon: "/Services/HomeServices/homeicon.jpg",
      services: [
        { icon: "/Services/HomeServices/plumbing.jpg", label: "Plumbing" },
        { icon: "/Services/HomeServices/electrical.jpg", label: "Electrical" },
        { icon: "/Services/HomeServices/carpentry2.jpg", label: "Carpentry" },
        { icon: "/Services/HomeServices/painting.jpg", label: "Painting" },
        { icon: "/Services/HomeServices/cleaning.jpg", label: "Cleaning" },
        {
          icon: "/Services/HomeServices/pest-control.jpg",
          label: "Pest Control",
        },
        { icon: "/Services/HomeServices/acrepair.jpg", label: "AC Service" },
        {
          icon: "https://techsquadteam.com/assets/profile/blogimages/8c42c134c477b719fd540549fdaf44fb.jpg",
          label: "Bathroom",
        },
      ],
    },
    appliance: {
      title: "Appliance Repair",
      icon: "/appliance-repair.jpg",
      services: [
        { icon: "/washing-machine.jpg", label: "Washing Machine" },
        { icon: "/refrigerator.jpg", label: "Refrigerator" },
        { icon: "/tv-repair.jpg", label: "TV Repair" },
        { icon: "/microwave.jpg", label: "Microwave" },
        { icon: "/water-purifier.jpg", label: "Water Purifier" },
      ],
    },
    cleaning: {
      title: "Cleaning & Maintenance",
      icon: "/cleaning-maintenance.jpg",
      services: [
        { icon: "/house-cleaning.jpg", label: "House Cleaning" },
        { icon: "/bathroom-cleaning.jpg", label: "Bathroom Cleaning" },
        { icon: "/sofa-cleaning.jpg", label: "Sofa Cleaning" },
        { icon: "/water-tank-cleaning.jpg", label: "Water Tank Cleaning" },
        { icon: "/window-cleaning.jpg", label: "Window Cleaning" },
      ],
    },
    personal: {
      title: "Personal & Lifestyle",
      icon: "/personal-lifestyle.jpg",
      services: [
        { icon: "/salon.jpg", label: "Salon at Home" },
        { icon: "/massage.jpg", label: "Massage" },
        { icon: "/yoga.jpg", label: "Yoga Trainer" },
        { icon: "/gym.jpg", label: "Gym Trainer" },
      ],
    },
    event: {
      title: "Event Services",
      icon: "/event-services.jpg",
      services: [
        { icon: "/photography.jpg", label: "Photography" },
        { icon: "/catering.jpg", label: "Catering" },
        { icon: "/decoration.jpg", label: "Decoration" },
        { icon: "/dj.jpg", label: "DJ" },
      ],
    },
    education: {
      title: "Education & Training",
      icon: "/education.jpg",
      services: [
        { icon: "/tuition.jpg", label: "Home Tuition" },
        { icon: "/online-classes.jpg", label: "Online Classes" },
        { icon: "/coaching.jpg", label: "Exam Coaching" },
      ],
    },
    it: {
      title: "IT & Digital Services",
      icon: "/it-services.jpg",
      services: [
        { icon: "/web-development.jpg", label: "Web Development" },
        { icon: "/app-development.jpg", label: "App Development" },
        { icon: "/digital-marketing.jpg", label: "Digital Marketing" },
        { icon: "/design.jpg", label: "Design" },
      ],
    },
    repair: {
      title: "Repair & Fabrication",
      icon: "/repair.jpg",
      services: [
        { icon: "/welding.jpg", label: "Welding" },
        { icon: "/furniture-repair.jpg", label: "Furniture Repair" },
        { icon: "/glass-work.jpg", label: "Glass Work" },
      ],
    },
  };

  const featuredProfessionals = [
    {
      rating: 4.8,
      title: "Top-rated Plumbers",
      serviceCount: "250+ Professionals",
    },
    {
      rating: 4.9,
      title: "Certified Electricians",
      serviceCount: "180+ Experts",
    },
    { rating: 4.7, title: "Same-day Cleaning", serviceCount: "300+ Cleaners" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">
            Find & Book <span className="text-[#27bb97]">Trusted</span> Service
            Professionals
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From home repairs to personal wellness, connect with verified
            professionals ready to serve you
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
              {[
                "Plumbing",
                "Cleaning",
                "Electrician",
                "AC Repair",
                "Painting",
              ].map((tag) => (
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
            <button className="text-[#27bb97] hover:text-[#1fa987] font-medium flex items-center gap-1 hover:underline cursor-pointer">
              See all categories
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {topCategories.map((category) => (
              <button
                key={category.key}
                className="group relative flex flex-col items-center justify-end text-black bg-white rounded-2xl border-2 border-gray-200 hover:border-[#27bb97] hover:shadow-lg transition-all duration-300 overflow-hidden min-h-[120px] md:min-h-[140px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={category.icon}
                    alt={category.label}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/300x140/27bb97/ffffff?text=${category.label}`;
                    }}
                  />
                  {/* Gradient overlay for better text visibility */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/60 group-hover:via-black/30 transition-colors duration-300"></div> */}
                </div>

                {/* Label at bottom */}
                <div className="relative z-10 w-full p-3 text-center">
                  <span className="text-base font-semibold text-white group-hover:text-[#27bb97] drop-shadow-md">
                    {category.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Service Sections */}
        {loadedSections.map((sectionKey) => {
          const section = serviceSections[sectionKey];
          if (!section) return null;

          const isExpanded = expandedSections[sectionKey];
          const visibleServices = isExpanded
            ? section.services
            : section.services.slice(0, 6);

          return (
            <section
              key={sectionKey}
              className=" bg-white  p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={section.icon}
                      alt={section.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/48/27bb97/ffffff?text=${section.title.charAt(
                          0
                        )}`;
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-700">
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {section.services.length} services available
                    </p>
                  </div>
                </div>
                {section.services.length > 6 && (
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="flex items-center gap-2 text-[#27bb97] hover:text-[#1fa987] font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isExpanded ? "Show Less" : "View All"}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
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
                    <div className="w-20 h-20 mb-3 overflow-hidden rounded-full group-hover:scale-110 transition-transform">
                      <img
                        src={service.icon}
                        alt={service.label}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/48/cccccc/333333?text=${service.label.charAt(
                            0
                          )}`;
                        }}
                      />
                    </div>
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
                <span className="px-4 bg-gray-50 text-gray-500 text-sm">
                  OR
                </span>
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
            <h2 className="text-3xl font-bold text-gray-700 mb-3">
              Featured Professionals
            </h2>
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
                      <span className="ml-1 font-bold text-gray-700">
                        {professional.rating}
                      </span>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(professional.rating)
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-[#27bb97]/10 text-[#27bb97] rounded-full">
                    Verified
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  {professional.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {professional.serviceCount}
                </p>
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
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              We're Here to Help!
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Not sure what you need? Our service experts will guide you to the
              perfect professional
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
              Average response time:{" "}
              <span className="font-medium text-[#27bb97]">2 minutes</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServiceHub;
