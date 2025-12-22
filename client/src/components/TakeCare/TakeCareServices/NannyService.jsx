import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  CheckCircle, 
  ChevronRight,
  ArrowRight,
  Phone,
  MessageSquare
} from "lucide-react";

const NannyService = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  // Section 1: Hero Section
  const heroData = {
    title: "Find Your Perfect Nanny",
    subtitle: "Trusted, verified nannies for your family's needs",
    description: "Connect with experienced nannies who provide loving care and professional support for your children.",
    stats: [
      { value: "5,000+", label: "Verified Nannies" },
      { value: "4.8★", label: "Avg. Rating" },
      { value: "99%", label: "Satisfaction Rate" }
    ]
  };

  // Section 2: Nanny Categories with Images
  const nannyCategories = [
    {
      id: "full-time",
      title: "Full-Time Nanny",
      description: "40+ hours per week, long-term commitment",
      image: "https://images.unsplash.com/photo-1516627145497-ae6958e7d6e1?w=400&h=300&fit=crop",
      features: ["Live-in/Live-out", "Long-term", "Benefits included"],
      color: "border-blue-200"
    },
    {
      id: "part-time",
      title: "Part-Time Nanny",
      description: "Flexible hours, occasional care",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=300&fit=crop",
      features: ["Flexible schedule", "After school", "Weekends"],
      color: "border-purple-200"
    },
    {
      id: "special-needs",
      title: "Special Needs Care",
      description: "Trained for special requirements",
      image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=300&fit=crop",
      features: ["Specialized training", "Medical knowledge", "Therapy support"],
      color: "border-emerald-200"
    },
    {
      id: "newborn",
      title: "Newborn Specialist",
      description: "Expert infant care",
      image: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=400&h=300&fit=crop",
      features: ["Newborn care", "Sleep training", "Feeding support"],
      color: "border-pink-200"
    }
  ];

  // Section 3: Featured Nannies
  const featuredNannies = [
    {
      id: 1,
      name: "Sarah Johnson",
      experience: "8 years",
      rating: 4.9,
      reviews: 127,
      location: "Manhattan, NY",
      rate: "$25-30/hr",
      specialties: ["Newborn Care", "Tutoring", "Languages"],
      availability: "Full-time",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w-400&h=500&fit=crop",
      verified: true,
      badge: "Top Rated"
    },
    {
      id: 2,
      name: "Maria Garcia",
      experience: "12 years",
      rating: 4.8,
      reviews: 89,
      location: "Brooklyn, NY",
      rate: "$28-35/hr",
      specialties: ["Special Needs", "Cooking", "Music"],
      availability: "Part-time",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
      verified: true,
      badge: "Featured"
    },
    {
      id: 3,
      name: "Emily Chen",
      experience: "6 years",
      rating: 4.7,
      reviews: 64,
      location: "Queens, NY",
      rate: "$22-28/hr",
      specialties: ["Homework Help", "Art Activities", "Driving"],
      availability: "Full-time",
      image: "https://images.unsplash.com/photo-1551836026-d5c2c0b4d2a3?w=400&h=500&fit=crop",
      verified: true,
      badge: "New"
    }
  ];

  // Section 4: Nanny Qualifications with Images
  const qualifications = [
    {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
      title: "Background Checked",
      description: "Comprehensive criminal and reference checks"
    },
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
      title: "Certified",
      description: "CPR, First Aid, and childcare certifications"
    },
    {
      image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300&h=200&fit=crop",
      title: "Experience",
      description: "Minimum 2+ years of professional childcare experience"
    },
    {
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=300&h=200&fit=crop",
      title: "Multilingual",
      description: "Many nannies speak multiple languages"
    }
  ];

  // Section 5: How It Works with Images
  const processSteps = [
    {
      step: 1,
      title: "Search & Filter",
      description: "Find nannies by location, experience, and specialties",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
      step: 2,
      title: "View Profiles",
      description: "Read detailed profiles, reviews, and watch videos",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"
    },
    {
      step: 3,
      title: "Interview",
      description: "Schedule virtual or in-person interviews",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop"
    },
    {
      step: 4,
      title: "Hire & Start",
      description: "Complete paperwork and begin care",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=300&h=200&fit=crop"
    }
  ];

  // Section 6: Nanny Services with Images
  const services = [
    {
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop",
      title: "Homework Help",
      description: "Academic support and tutoring"
    },
    {
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
      title: "Meal Preparation",
      description: "Healthy meals and snacks"
    },
    {
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop",
      title: "Music & Arts",
      description: "Creative activities and lessons"
    },
    {
      image: "https://images.unsplash.com/photo-1516627145497-ae6958e7d6e1?w=200&h=200&fit=crop",
      title: "Play & Activities",
      description: "Educational games and outdoor play"
    },
    {
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=200&h=200&fit=crop",
      title: "Transportation",
      description: "School pickup and activities"
    },
    {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop",
      title: "Light Housekeeping",
      description: "Child-related cleaning"
    }
  ];

  // Section 7: Pricing Plans
  const pricingPlans = [
    {
      plan: "Basic",
      price: "$20-25",
      period: "per hour",
      features: [
        "Part-time care",
        "Light housekeeping",
        "Meal prep for kids",
        "Basic activities"
      ]
    },
    {
      plan: "Standard",
      price: "$25-35",
      period: "per hour",
      features: [
        "Full-time care",
        "Educational activities",
        "Homework help",
        "Transportation",
        "CPR Certified"
      ],
      popular: true
    },
    {
      plan: "Premium",
      price: "$35-50",
      period: "per hour",
      features: [
        "Special needs care",
        "Language lessons",
        "Music/Art tutoring",
        "Travel with family",
        "Overnight care",
        "Newborn specialist"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero with Background Image */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
              backgroundImage: `url('/nany-care-1.jpg')`, 
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              {heroData.title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto">
              {heroData.subtitle}
            </p>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              {heroData.description}
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-12">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for nannies by skills, experience..."
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter city, state, or zip code"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 transition-all"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 hover:shadow-lg border-2 border-gray-900 hover:border-white">
                  <Search className="w-5 h-5" />
                  Search Nannies
                </button>
              </div>
            </div>

           
          </div>
        </div>
      </section>

      {/* Section 2: Nanny Categories */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Types of <span className="text-gray-900">Nanny Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect nanny service for your family's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nannyCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group"
              >
                
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {category.title}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>

                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-gray-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full mt-6 py-3 text-gray-900 font-semibold rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all group-hover:shadow-md">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Section 3: Featured Nannies */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">
                Featured Nannies
              </h2>
              <p className="text-gray-600 mt-2">
                Top-rated nannies available now
              </p>
            </div>
            <button className="text-gray-900 font-semibold flex items-center gap-2 hover:gap-3 transition-all border-b-2 border-gray-900 pb-1">
              View All Nannies
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNannies.map((nanny) => (
              <div
                key={nanny.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                
                <div className="relative h-64">
                  <img
                    src={nanny.image}
                    alt={nanny.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {nanny.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
                        {nanny.badge}
                      </span>
                    </div>
                  )}
                </div>

              
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {nanny.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">{nanny.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-bold">{nanny.rating}</span>
                      <span className="text-gray-500 text-sm">({nanny.reviews})</span>
                    </div>
                  </div>

              
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-600">
                      <span className="font-semibold">{nanny.experience}</span> experience
                    </div>
                    <div className="text-gray-900 font-bold">
                      {nanny.rate}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">Specialties:</div>
                    <div className="flex flex-wrap gap-2">
                      {nanny.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all border-2 border-gray-900">
                      View Profile
                    </button>
                    <button className="px-4 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Section 4: Qualifications */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-gray-900">Rigorous Standards</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every nanny meets our strict qualification requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualifications.map((qual, index) => (
              <div key={index} className="text-center group">
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={qual.image}
                    alt={qual.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {qual.title}
                </h3>
                <p className="text-gray-600">
                  {qual.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Section 5: How It Works */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How to Hire a <span className="text-gray-900">Nanny</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to find your perfect nanny
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
               
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border-2 border-gray-900 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Section 6: Services Offered */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional <span className="text-gray-900">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Many nannies offer these additional services
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Section 7: Pricing */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transparent <span className="text-gray-900">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Competitive rates for quality nanny services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 border-2 ${plan.popular ? 'border-gray-900 shadow-xl' : 'border-gray-200'} hover:shadow-2xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gray-900 text-white text-sm font-bold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.plan}
                  </h3>
                  <div className="flex items-end justify-center mb-2">
                    <span className="text-5xl font-black text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-semibold transition-all border-2 ${plan.popular ? 'bg-gray-900 text-white hover:bg-gray-800 border-gray-900' : 'bg-white text-gray-900 hover:bg-gray-900 hover:text-white border-gray-900'}`}>
                  {plan.popular ? 'Get Started Now' : 'Learn More'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Nanny?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of families who found their ideal nanny through us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all border-2 border-white hover:border-gray-100 flex items-center justify-center gap-3">
              <Phone className="w-5 h-5" />
              Schedule a Call
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-3">
              <MessageSquare className="w-5 h-5" />
              Chat with Support
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default NannyService;