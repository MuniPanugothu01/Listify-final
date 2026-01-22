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
  const [location, setLocation] = useState('');

  // Top Service Categories
  const serviceCategories = [
    {
      id: 'wedding',
      name: 'Wedding Services',
      description: 'Planners, venues, photographers, catering & more for your special day',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=90',
      icon: <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'from-[#27BB97] to-[#1FA987]',
      listings: '1,200+'
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      description: 'Buy, sell, rent properties with trusted agents and verified listings',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=90',
      icon: <Home className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'from-[#27BB97] to-[#198F72]',
      listings: '3,500+'
    },
    {
      id: 'food',
      name: 'Food & Catering',
      description: 'Restaurants, catering services, food delivery & culinary experiences',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=90',
      icon: <Utensils className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'from-[#27BB97] to-[#1FA987]',
      listings: '2,800+'
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Tutoring, online courses, workshops, language classes & skill development',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=90',
      icon: <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'from-[#27BB97] to-[#198F72]',
      listings: '1,900+'
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      description: 'Doctors, fitness trainers, yoga studios, nutritionists & wellness centers',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d6b?w=800&q=90',
      icon: <Dumbbell className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'from-[#27BB97] to-[#1FA987]',
      listings: '1,500+'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      description: 'Car sales, repairs, rentals, detailing services & auto parts',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=90',
      icon: <Car className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'from-[#27BB97] to-[#198F72]',
      listings: '2,300+'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Tech gadgets, repairs, installations, smart home solutions & accessories',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=90',
      icon: <Laptop className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'from-gray-700 to-black',
      listings: '1,800+'
    },
    {
      id: 'home',
      name: 'Home Services',
      description: 'Plumbing, cleaning, renovations, gardening & maintenance professionals',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=90',
      icon: <Wrench className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'from-[#27BB97] to-[#1FA987]',
      listings: '4,200+'
    }
  ];

  // How Listify Works
  const howItWorks = [
    {
      title: 'Browse & Discover',
      description: 'Search through our extensive directory of verified service providers. Filter by category, expertise, rating, and budget to find the perfect match.',
      features: [
        'Advanced search filters',
        'Verified provider profiles',
        'Authentic customer reviews',
        'Transparent pricing'
      ],
      icon: <Eye className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
      color: 'bg-gradient-to-r from-[#27BB97] to-[#1FA987]',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
      imagePosition: 'left'
    },
    {
      title: 'Connect & Book',
      description: 'Communicate directly with service professionals through our secure platform. Book appointments, get quotes, and schedule services effortlessly.',
      features: [
        'Instant messaging',
        'Secure booking system',
        'Real-time availability',
        'Appointment scheduling'
      ],
      icon: <PhoneCall className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
      color: 'bg-gradient-to-r from-[#27BB97] to-[#198F72]',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1920&q=80',
      imagePosition: 'right'
    },
    {
      title: 'Experience & Review',
      description: 'Receive quality services from trusted professionals. Share your feedback to help maintain our community standards and assist others.',
      features: [
        'Service completion tracking',
        'Secure payment processing',
        'Rating & review system',
        'Dispute resolution'
      ],
      icon: <ClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
      color: 'bg-gradient-to-r from-[#27BB97] to-[#146C54]',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1920&q=80',
      imagePosition: 'left'
    }
  ];

  // Enhanced Why Choose Listify Section with Images
  const enhancedWhyChooseUs = [
    {
      icon: <Target className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
      title: 'Local Expertise',
      description: 'Connect with providers who understand your local needs and preferences, wherever you are located.',
      stats: '500+ Service Areas',
      color: 'bg-gradient-to-br from-[#27BB97]/20 to-[#1FA987]/10',
      borderColor: 'border-[#27BB97]/20',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=90'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
      title: 'Trust & Safety',
      description: 'Every provider undergoes rigorous background checks, verification, and continuous quality monitoring.',
      stats: '99.8% Verified',
      color: 'bg-gradient-to-br from-[#27BB97]/20 to-[#198F72]/10',
      borderColor: 'border-[#1FA987]/20',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=90'
    },
    {
      icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
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
      name: 'Elite Wedding Planners',
      category: 'Wedding Services',
      rating: 4.9,
      reviews: 247,
      price: '$$$',
      location: 'Multiple Locations',
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
      location: 'National Coverage',
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
      location: 'Major Cities',
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
      location: 'Urban & Suburban',
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
      icon: <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'bg-gradient-to-r from-[#27BB97] to-[#1FA987]',
      steps: ['Check notifications', 'Review bookings', 'Plan schedule'],
      timeSlot: '8-10 AM'
    },
    {
      time: 'Afternoon Routine',
      title: 'Compare & Decide',
      description: 'Research and compare different providers to make informed choices',
      icon: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'bg-gradient-to-r from-[#1FA987] to-[#198F72]',
      steps: ['Compare quotes', 'Read reviews', 'Check availability'],
      timeSlot: '12-2 PM'
    },
    {
      time: 'Evening Routine',
      title: 'Book Services',
      description: 'Finalize bookings and prepare for upcoming service appointments',
      icon: <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      color: 'bg-gradient-to-r from-[#198F72] to-[#146C54]',
      steps: ['Confirm appointments', 'Arrange payment', 'Set reminders'],
      timeSlot: '5-7 PM'
    },
    {
      time: 'Night Routine',
      title: 'Review & Share',
      description: 'Share your experiences and help build our trusted community',
      icon: <ThumbsUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
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

    @media (max-width: 640px) {
      .mobile-stack {
        flex-direction: column !important;
      }
      
      .mobile-text-center {
        text-align: center !important;
      }
      
      .mobile-w-full {
        width: 100% !important;
      }
      
      .mobile-space-y-4 > * + * {
        margin-top: 1rem !important;
      }
      
      .mobile-space-y-6 > * + * {
        margin-top: 1.5rem !important;
      }
      
      .mobile-grid-cols-1 {
        grid-template-columns: 1fr !important;
      }
      
      .mobile-grid-cols-2 {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      
      .mobile-px-2 {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
      }
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
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
    <div className="min-h-screen ">
      <style>{animationStyles}</style>
      
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[70vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=90"
            alt="Modern workspace with services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-4 sm:mb-6 animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight mb-4 sm:mb-6 text-center sm:text-left">
                Find Trusted Services  with<br />
                <span className="text-[#27BB97]">Listify</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-10 leading-relaxed text-center sm:text-left">
                Connect with verified professionals for roommates, takeCare, automotive, electronics, home services and more. Your trusted marketplace for quality services.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl animate-fade-in-up">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="flex-1">
                  <div className="flex items-center bg-gray-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    <input
                      type="text"
                      placeholder="What service are you looking for?"
                      className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm sm:text-base lg:text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center bg-gray-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-3 sm:mr-4" />
                    <input
                      type="text"
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm sm:text-base lg:text-lg"
                    />
                  </div>
                </div>

                <button className="flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white rounded-lg sm:rounded-xl font-semibold hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                  <Search className="w-8 h-8" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Service Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Explore Our <span className="gradient-text">Service Categories</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Discover quality services across various categories. All providers are verified and ready to serve you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {serviceCategories.map((category, index) => (
              <div 
                key={category.id}
                className={`scroll-animate stagger-delay-${(index % 4) + 1} hover-lift`}
              >
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                      <span className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs sm:text-sm font-semibold rounded-full">
                        {category.listings} Listings
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4 sm:mt-6 pt-3 sm:pt-6 border-t border-gray-100">
                      <button className="text-[#27BB97] font-semibold text-xs sm:text-sm hover:text-[#1FA987] transition-colors flex items-center gap-1 sm:gap-2">
                        Browse Services
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      
                      <div className="text-xs text-gray-500">
                        Available Nationwide
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 scroll-animate">
            <button className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border border-[#27BB97] text-[#27BB97] hover:bg-[#27BB97] hover:text-white font-semibold rounded-lg sm:rounded-xl hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              View All Services
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How Listify Works Section - Uncommented */}
      {/* <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              How <span className="gradient-text">Listify Services</span> Works
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              A seamless three-step process to connect you with trusted professionals
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {howItWorks.map((step, index) => (
              <div 
                key={index}
                className={`scroll-animate`}
              >
                <div className={`grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${step.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                  
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-48 sm:h-64 md:h-72 lg:h-[400px] object-cover transform transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>

                  <div className="">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-2 sm:space-y-3">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#27BB97] mt-0.5 sm:mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="mt-6 sm:mt-8 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white font-semibold rounded-lg hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Why Trust Listify Section - Uncommented */}
      {/* <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#27bb97]/5 to-[#2d7dd7]/5 rounded-full blur-3xl -translate-y-24 sm:-translate-y-32 md:-translate-y-48 translate-x-24 sm:translate-x-32 md:translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-[#27bb97]/5 to-[#1FA987]/5 rounded-full blur-3xl translate-y-24 sm:translate-y-32 md:translate-y-48 -translate-x-24 sm:-translate-x-32 md:-translate-x-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Why Trust <span className="gradient-text">Listify</span> for Your Services
              </h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              We're not just a platform - we're your trusted partner in finding quality services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {enhancedWhyChooseUs.map((feature, index) => (
              <div 
                key={index}
                className={`scroll-animate stagger-delay-${(index % 3) + 1}`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm"></div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="relative mb-4 sm:mb-6">
                      <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-[#27bb97]/20 to-[#1FA987]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className={`${feature.color} w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center relative z-10 transform group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-[#27bb97]">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#27bb97] transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-animate rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 bg-gradient-to-r from-[#27BB97]/5 to-[#1FA987]/5 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 sm:mb-2 text-gray-900">2M+</div>
                <div className="text-gray-600 text-sm sm:text-base">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 sm:mb-2 text-gray-900">99.8%</div>
                <div className="text-gray-600 text-sm sm:text-base">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 sm:mb-2 text-gray-900">24/7</div>
                <div className="text-gray-600 text-sm sm:text-base">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Optimize your service routine */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Optimize Your <span className="gradient-text">Service Routine</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Follow our proven daily routine to maximize your service experience
            </p>
          </div>

          <div className="scroll-animate">
            <div className="flex overflow-x-auto pb-4 sm:pb-6 lg:pb-8 snap-x snap-mandatory gap-4 sm:gap-6 px-4 -mx-4 scrollbar-hide">
              {enhancedDailyRoutine.map((routine, index) => (
                <div 
                  key={index}
                  className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[400px] flex-shrink-0 snap-center"
                >
                  <div className="group h-full">
                    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 h-full">
                      {/* Card Header with Image Background */}
                      <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                        <img
                          src={`https://images.unsplash.com/photo-${index === 0 ? '1497366754035-f200968a6e72' : index === 1 ? '1559028012-481c04fa702d' : index === 2 ? '1545235617-9465d2a55698' : '1521791136064-7986c2920216'}?w=800&q=90`}
                          alt={routine.time}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#27bb97]/90 to-[#1FA987]/90 mix-blend-multiply"></div>
                        
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <div className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full">
                            <span className="text-white font-bold text-xs sm:text-sm">{routine.timeSlot}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="mb-3 sm:mb-4">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{routine.title}</h3>
                          <span className="text-xs sm:text-sm font-medium text-[#27bb97] bg-[#27bb97]/10 px-2 sm:px-3 py-1 rounded-full">
                            {routine.time}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm">
                          {routine.description}
                        </p>
                        
                        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                          {routine.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start gap-2 sm:gap-3">
                              <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#27bb97]/10 flex items-center justify-center mt-0.5">
                                <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-[#27bb97]" />
                              </div>
                              <span className="text-xs sm:text-sm text-gray-700">
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <button className="w-full py-2.5 sm:py-3 border border-[#27BB97] text-[#27BB97] hover:bg-[#27BB97] hover:text-white font-semibold rounded-lg hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          Set Reminder
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
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

      {/* Service Providers Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Top-Rated <span className="gradient-text">Service Providers</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Featured professionals delivering exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {enhancedServiceProviders.map((provider, index) => (
              <div 
                key={index}
                className={`scroll-animate stagger-delay-${(index % 4) + 1} hover-lift`}
              >
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {provider.featured && (
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white text-xs font-bold rounded-full shadow-lg">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                    
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex flex-col items-end gap-1 sm:gap-2">
                      <span className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs sm:text-sm font-semibold rounded-full">
                        {provider.price}
                      </span>
                      <span className="px-2 py-1 bg-[#27BB97]/90 backdrop-blur-sm text-white text-xs rounded-full">
                        {provider.responseTime} response
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{provider.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-2">{provider.category}</p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                          {provider.specialties.slice(0, 2).map((specialty, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-900 text-sm sm:text-base">{provider.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({provider.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 sm:mb-6 pt-3 sm:pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        <span className="text-xs sm:text-sm text-gray-600">{provider.location}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#27BB97]">✓ Available</span>
                    </div>
                    
                    <button className="w-full py-2.5 sm:py-3 border border-[#27BB97] text-[#27BB97] hover:bg-[#27BB97] hover:text-white font-semibold rounded-lg hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                      Contact Provider
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 scroll-animate">
            <button className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border border-[#27BB97] text-[#27BB97] hover:bg-[#27BB97] hover:text-white font-semibold rounded-lg sm:rounded-xl hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base">
              <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              Explore All Providers
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServicesPage;