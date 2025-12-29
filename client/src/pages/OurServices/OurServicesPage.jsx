import React, { useState, useEffect } from 'react';
import { 
  Search,
  MapPin,
  Heart,
  Shield,
  Zap,
  DollarSign,
  Star,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Building,
  Users,
  Calendar,
  Home,
  Utensils,
  GraduationCap,
  Dumbbell,
  Car,
  Laptop,
  Wrench,
  ShieldCheck,
  Globe,
  BarChart3,
  MessageSquare,
  Bell,
  TrendingUp,
  Award,
  Users as UsersIcon,
  Eye,
  ThumbsUp,
  ClipboardCheck,
  PhoneCall,
  Cpu,
  Smartphone
} from 'lucide-react';

const OurServicesPage = () => {
  // Search filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('New York');

  // Top Service Categories in New York
  const serviceCategories = [
    {
      id: 'wedding',
      name: 'Wedding Services',
      description: 'Planners, venues, photographers, catering & more for your special day',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=90',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-[#27BB97] to-[#1FA987]',
      listings: '1,200+'
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      description: 'Buy, sell, rent properties with trusted agents and verified listings',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=90',
      icon: <Home className="w-8 h-8" />,
      color: 'from-[#27BB97] to-[#198F72]',
      listings: '3,500+'
    },
    {
      id: 'food',
      name: 'Food & Catering',
      description: 'Restaurants, catering services, food delivery & culinary experiences',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=90',
      icon: <Utensils className="w-8 h-8" />,
      color: 'from-[#27BB97] to-[#1FA987]',
      listings: '2,800+'
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Tutoring, online courses, workshops, language classes & skill development',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=90',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-[#27BB97] to-[#198F72]',
      listings: '1,900+'
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      description: 'Doctors, fitness trainers, yoga studios, nutritionists & wellness centers',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d6d?w=800&q=90',
      icon: <Dumbbell className="w-8 h-8" />,
      color: 'from-[#27BB97] to-[#1FA987]',
      listings: '1,500+'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      description: 'Car sales, repairs, rentals, detailing services & auto parts',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=90',
      icon: <Car className="w-8 h-8" />,
      color: 'from-[#27BB97] to-[#198F72]',
      listings: '2,300+'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Tech gadgets, repairs, installations, smart home solutions & accessories',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=90',
      icon: <Laptop className="w-8 h-8" />,
      color: 'from-gray-700 to-black',
      listings: '1,800+'
    },
    {
      id: 'home',
      name: 'Home Services',
      description: 'Plumbing, cleaning, renovations, gardening & maintenance professionals',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=90',
      icon: <Wrench className="w-8 h-8" />,
      color: 'from-[#27BB97] to-[#1FA987]',
      listings: '4,200+'
    }
  ];

  // How Listify Works
  const howItWorks = [
    {
      title: 'Browse & Discover',
      description: 'Search through thousands of verified service providers in New York. Filter by category, location, rating, and price to find exactly what you need.',
      features: [
        'Advanced search filters',
        'Verified provider profiles',
        'Real customer reviews',
        'Transparent pricing'
      ],
      icon: <Eye className="w-12 h-12" />,
      color: 'bg-gradient-to-r from-[#27BB97] to-[#1FA987]',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
      imagePosition: 'left'
    },
    {
      title: 'Connect & Book',
      description: 'Instantly connect with service providers through our secure messaging system. Book appointments, get quotes, and schedule services in just a few clicks.',
      features: [
        'Instant messaging',
        'Secure booking system',
        'Real-time availability',
        'Appointment scheduling'
      ],
      icon: <PhoneCall className="w-12 h-12" />,
      color: 'bg-gradient-to-r from-[#27BB97] to-[#198F72]',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1920&q=80',
      imagePosition: 'right'
    },
    {
      title: 'Experience & Review',
      description: 'Enjoy quality services from trusted professionals. Share your experience to help others make informed decisions and build a stronger community.',
      features: [
        'Service completion tracking',
        'Secure payment processing',
        'Rating & review system',
        'Dispute resolution'
      ],
      icon: <ClipboardCheck className="w-12 h-12" />,
      color: 'bg-gradient-to-r from-[#27BB97] to-[#146C54]',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1920&q=80',
      imagePosition: 'left'
    }
  ];

  // Enhanced Why Choose Listify Section with Images
  const enhancedWhyChooseUs = [
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Hyperlocal Expertise',
      description: 'We understand New York neighborhoods intimately. Our platform connects you with providers who know your area best.',
      stats: '500+ NYC Neighborhoods',
      color: 'bg-gradient-to-br from-[#27BB97]/20 to-[#1FA987]/10',
      borderColor: 'border-[#27BB97]/20',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=90'
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: 'Trust & Safety',
      description: 'Every provider undergoes rigorous background checks, verification, and continuous quality monitoring.',
      stats: '99.8% Verified',
      color: 'bg-gradient-to-br from-[#27BB97]/20 to-[#198F72]/10',
      borderColor: 'border-[#1FA987]/20',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=90'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Quality Guarantee',
      description: 'We stand behind every service. If you\'re not satisfied, we\'ll work to make it right or provide a refund.',
      stats: '4.9/5 Average Rating',
      color: 'bg-gradient-to-br from-[#27BB97]/20 to-[#146C54]/10',
      borderColor: 'border-[#198F72]/20',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=90'
    }
  ];

  // Enhanced Service Providers
  const enhancedServiceProviders = [
    {
      name: 'Elite Wedding Planners NYC',
      category: 'Wedding Services',
      rating: 4.9,
      reviews: 247,
      price: '$$$',
      location: 'Manhattan',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=90',
      featured: true,
      specialties: ['Venue Booking', 'Catering', 'Photography'],
      responseTime: '< 1 hour'
    },
    {
      name: 'Metro Realty Group',
      category: 'Real Estate',
      rating: 4.8,
      reviews: 512,
      price: '$$$$',
      location: 'Brooklyn',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=90',
      featured: true,
      specialties: ['Property Sales', 'Rentals', 'Commercial'],
      responseTime: '< 2 hours'
    },
    {
      name: 'TechFix Solutions',
      category: 'Electronics Repair',
      rating: 4.7,
      reviews: 189,
      price: '$$',
      location: 'Queens',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d4cb184827?w=800&q=90',
      featured: false,
      specialties: ['Phone Repair', 'Laptop Service', 'Data Recovery'],
      responseTime: '< 30 mins'
    },
    {
      name: 'Green Thumb Landscaping',
      category: 'Home Services',
      rating: 4.9,
      reviews: 324,
      price: '$$$',
      location: 'Long Island',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=90',
      featured: true,
      specialties: ['Lawn Care', 'Gardening', 'Landscape Design'],
      responseTime: '< 4 hours'
    }
  ];

  // Enhanced Daily Routine Section
  const enhancedDailyRoutine = [
    {
      time: 'Morning Routine',
      title: 'Plan Your Day',
      description: 'Browse morning listings and schedule services for the day ahead',
      icon: <Calendar className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-[#27BB97] to-[#1FA987]',
      steps: ['Check notifications', 'Review bookings', 'Plan schedule'],
      timeSlot: '8-10 AM'
    },
    {
      time: 'Afternoon Routine',
      title: 'Compare & Decide',
      description: 'Research and compare different providers to make informed choices',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-[#1FA987] to-[#198F72]',
      steps: ['Compare quotes', 'Read reviews', 'Check availability'],
      timeSlot: '12-2 PM'
    },
    {
      time: 'Evening Routine',
      title: 'Book Services',
      description: 'Finalize bookings and prepare for upcoming service appointments',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-[#198F72] to-[#146C54]',
      steps: ['Confirm appointments', 'Arrange payment', 'Set reminders'],
      timeSlot: '5-7 PM'
    },
    {
      time: 'Night Routine',
      title: 'Review & Share',
      description: 'Share your experiences and help build our trusted community',
      icon: <ThumbsUp className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-[#146C54] to-[#0D4C3C]',
      steps: ['Rate providers', 'Write reviews', 'Share recommendations'],
      timeSlot: '8-10 PM'
    }
  ];

  // Animation styles
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .hover-lift {
      transition: all 0.3s ease;
    }

    .hover-lift:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(39, 187, 151, 0.15);
    }

    .gradient-text {
      background: linear-gradient(135deg, #27BB97 0%, #1FA987 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .scroll-animate {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out;
    }

    .scroll-animate.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .stagger-delay-1 { transition-delay: 0.1s; }
    .stagger-delay-2 { transition-delay: 0.2s; }
    .stagger-delay-3 { transition-delay: 0.3s; }
    .stagger-delay-4 { transition-delay: 0.4s; }
    .stagger-delay-5 { transition-delay: 0.5s; }

    .glass-effect {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .gradient-border {
      position: relative;
      background: white;
    }

    .gradient-border::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg, #27BB97 0%, #1FA987 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    .delay-1000 {
      animation-delay: 1s;
    }

    .hover-scale {
      transition: transform 0.3s ease;
    }

    .hover-scale:hover {
      transform: scale(1.05);
    }
  `;

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style>{animationStyles}</style>
      
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=90"
            alt="New York City skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="mb-4 animate-fade-in-up">
              <h1 className="text-5xl lg:text-5xl font-black text-white leading-tight mb-6">
                Find Trusted Services in<br />
                <span className="text-[#27BB97]">New York</span> Metro Area
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Connect with verified professionals for weddings, real estate, food, education, 
                health, automotive, electronics, home services and more. Your local marketplace for quality services.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl animate-fade-in-up">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <div className="flex items-center bg-gray-50 rounded-xl px-4 py-4">
                    <Search className="w-6 h-6 text-gray-400 mr-4" />
                    <input
                      type="text"
                      placeholder="What service are you looking for?"
                      className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center bg-gray-50 rounded-xl px-4 py-4">
                    <MapPin className="w-6 h-6 text-gray-400 mr-4" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-lg"
                    />
                  </div>
                </div>

                <button className="flex items-center justify-center gap-4 px-4 py-4 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white rounded-xl font-semibold hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105">
                  <Search className="w-5 h-5" />
                  <span className="text-lg">Search Services</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Service Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top Local Service Categories in <span className="gradient-text">New York Metro Area</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the best local services across various categories. All providers are verified and ready to serve you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map((category, index) => (
              <div 
                key={category.id}
                className={`scroll-animate stagger-delay-${(index % 4) + 1} hover-lift`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full">
                        {category.listings} Listings
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                      <button className="text-[#27BB97] font-semibold text-sm hover:text-[#1FA987] transition-colors flex items-center gap-2">
                        Browse Services
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      <div className="text-xs text-gray-500">
                        New York Area
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 scroll-animate">
            <button className="px-8 py-4 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-xl hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
              <Globe className="w-5 h-5" />
              View All Service Categories
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How Listify Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How <span className="gradient-text">Listify Services</span> Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A seamless three-step process to connect you with trusted local professionals
            </p>
          </div>

          <div className="space-y-24">
            {howItWorks.map((step, index) => (
              <div 
                key={index}
                className={`scroll-animate`}
              >
                <div className={`grid md:grid-cols-2 gap-12 items-center ${step.imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Image Column */}
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-[400px] object-cover transform transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={``}>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-4">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-[#27BB97] mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="mt-8 px-6 py-3 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-lg hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Why Trust Listify Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#27bb97]/5 to-[#2d7dd7]/5 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#27bb97]/5 to-[#1FA987]/5 rounded-full blur-3xl translate-y-48 -translate-x-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <div className="inline-flex items-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-[#27bb97]" />
              <h2 className="text-4xl font-bold text-gray-900">
                Why Trust <span className="gradient-text">Listify</span> for Your Services
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just a platform - we're your trusted partner in finding quality local services
            </p>
          </div>

          {/* Magic UI Cards with Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {enhancedWhyChooseUs.map((feature, index) => (
              <div 
                key={index}
                className={`scroll-animate stagger-delay-${(index % 3) + 1}`}
              >
                {/* Glass Morphism Card */}
                <div className="relative group">
                  {/* Card Background with Image */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm"></div>
                  </div>
                  
                  {/* Main Card Content */}
                  <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    {/* Floating Icon with Glow Effect */}
                    <div className="relative mb-6">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#27bb97]/20 to-[#1FA987]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className={`${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center relative z-10 transform group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-[#27bb97]">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#27bb97] transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {feature.description}
                    </p>
                    
                    {/* Stats with Animated Background */}
                    <div className="relative mt-8 pt-6 border-t border-gray-100/50">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-white rounded-full shadow-lg border border-gray-100">
                        <span className="text-[#27bb97] font-bold text-lg">{feature.stats}</span>
                      </div>
                    </div>
                    
                    {/* Hover Effect Line */}
                  </div>
                  
                  {/* Floating Image Element */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl overflow-hidden shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-2">
                    <img
                      src={`https://images.unsplash.com/photo-${index === 0 ? '1556761175-b413da4baf72' : index === 1 ? '1521791136064-7986c2920216' : '1543269865-cbf427effbad'}?w=200&q=90`}
                      alt="Trust illustration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Testimonial Banner */}
          <div className="scroll-animate rounded-3xl p-8 text-[#27bb97] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
             
            </div>
            
            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center ">
              <div className="text-center ">
                <div className="text-5xl font-black mb-2">2M+</div>
                <div className="text-black">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">99.8%</div>
                <div className="text-black">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">24/7</div>
                <div className="text-black">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Optimize Your Service Routine Section */}
   <section className="py-20 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="text-center mb-16 scroll-animate">
      <div className="inline-flex items-center gap-3 mb-4">
        <Calendar className="w-8 h-8 text-[#27bb97]" />
        <h2 className="text-4xl font-bold text-gray-900">
          Optimize Your <span className="gradient-text">Service Routine</span>
        </h2>
      </div>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Follow our proven daily routine to maximize your service experience in New York
      </p>
    </div>

    {/* Horizontal Scroll Cards */}
    <div className="scroll-animate">
      <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 px-4 -mx-4 scrollbar-hide">
        {enhancedDailyRoutine.map((routine, index) => (
          <div 
            key={index}
            className="min-w-[85vw] md:min-w-[400px] flex-shrink-0 snap-center"
          >
            <div className="group h-full">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 h-full">
                {/* Card Header with Image Background */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1497366754035-f200968a6e72' : index === 1 ? '1559028012-481c04fa702d' : index === 2 ? '1545235617-9465d2a55698' : '1521791136064-7986c2920216'}?w=800&q=90`}
                    alt={routine.time}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#27bb97]/90 to-[#1FA987]/90 mix-blend-multiply"></div>
                  
                  {/* Time Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <span className="text-white font-bold text-sm">{routine.timeSlot}</span>
                    </div>
                  </div>
                  
                 
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{routine.title}</h3>
                    <span className="text-sm font-medium text-[#27bb97] bg-[#27bb97]/10 px-3 py-1 rounded-full">
                      {routine.time}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-sm">
                    {routine.description}
                  </p>
                  
                  {/* Steps */}
                  <div className="space-y-3 mb-6">
                    {routine.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#27bb97]/10 flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-3 h-3 text-[#27bb97]" />
                        </div>
                        <span className="text-sm text-gray-700">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-[#27bb97] to-[#1FA987] text-white font-semibold rounded-lg hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Set Reminder
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Enhanced Featured Service Providers Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top-Rated <span className="gradient-text">Service Providers</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Featured professionals delivering exceptional service across New York
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enhancedServiceProviders.map((provider, index) => (
              <div 
                key={index}
                className={`scroll-animate stagger-delay-${(index % 4) + 1} hover-lift`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  {/* Provider Image with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Featured Badge */}
                    {provider.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white text-xs font-bold rounded-full shadow-lg">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                    
                    {/* Price & Response Time */}
                    <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full">
                        {provider.price}
                      </span>
                      <span className="px-2 py-1 bg-[#27BB97]/90 backdrop-blur-sm text-white text-xs rounded-full">
                        {provider.responseTime} response
                      </span>
                    </div>
                  </div>

                  {/* Provider Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{provider.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{provider.category}</p>
                        
                        {/* Specialties */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {provider.specialties.slice(0, 2).map((specialty, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-900">{provider.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({provider.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    {/* Location & Contact */}
                    <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{provider.location}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#27BB97]">✓ Available</span>
                    </div>
                    
                    <button className="w-full py-3 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-lg hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105">
                      Contact Provider
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12 scroll-animate">
            <button className="px-8 py-4 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-xl hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
              <UsersIcon className="w-5 h-5" />
              Explore All Providers
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServicesPage;