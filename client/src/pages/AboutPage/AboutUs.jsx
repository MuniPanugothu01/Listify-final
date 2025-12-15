import React, { useEffect } from 'react';
import { 
  Users, 
  Target, 
  Globe, 
  Shield, 
  Zap,
  CheckCircle,
  Award,
  ThumbsUp,
  ArrowRight,
  Heart,
  Star,
  Users as UsersIcon,
  Zap as ZapIcon,
  ShieldCheck,
  MapPin,
  HeartHandshake,
  Leaf,
  Globe2,
  UsersRound,
  BarChart3,
  Rocket,
  Handshake,
  Mail,
  Phone,
  MapPin as MapPinIcon,
  Briefcase,
  TrendingUp,
  Lightbulb,
  Building,
  Cloud,
  Phone as PhoneIcon,
  Search,
  Tag,
  Calendar,
  MessageSquare,
  Home,
  BookOpen
} from 'lucide-react';

const AboutUs = () => {
  // Stats
  const stats = [
    { number: '2M+', label: 'Monthly Active Users', icon: <Users className="w-6 h-6" /> },
    { number: '5M+', label: 'Listings Posted', icon: <Briefcase className="w-6 h-6" /> },
    { number: '500+', label: 'Cities & Towns', icon: <Globe className="w-6 h-6" /> },
    { number: '4.9/5', label: 'Trust Rating', icon: <ThumbsUp className="w-6 h-6" /> },
  ];

  // Timeline
  const timeline = [
    { year: '2019', title: 'Concept Born', description: 'The idea to combine classifieds with community features was born' },
    { year: '2020', title: 'Listify Launched', description: 'Beta launched in 5 major cities with free classifieds' },
    { year: '2021', title: 'Community Features Added', description: 'Introduced events, forums, and local services marketplace' },
    { year: '2022', title: 'National Expansion', description: 'Expanded to 50+ cities across the country' },
    { year: '2023', title: 'AI & Safety Launch', description: 'Introduced AI-powered verification and safety features' },
  ];

  // Achievements
  const achievements = [
    { icon: <Award className="w-8 h-8" />, title: 'Best Local Marketplace 2023', description: 'Community Choice Awards' },
    { icon: <ShieldCheck className="w-8 h-8" />, title: 'Trust & Safety Excellence', description: 'Digital Safety Certified' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Fastest Growing Platform', description: 'Local Commerce Report 2023' },
  ];

  // Values
  const values = [
    { icon: <ShieldCheck />, title: "Trust First", description: "Verified users and secure transactions are our foundation" },
    { icon: <UsersRound />, title: "Community Driven", description: "Built by the community, for the community" },
    { icon: <Heart />, title: "Accessibility", description: "Free basic listings for everyone, always" },
    { icon: <Zap />, title: "Simplicity", description: "Easy to use, no unnecessary complexity" },
    { icon: <HeartHandshake />, title: "Local Focus", description: "Hyperlocal connections strengthen neighborhoods" },
    { icon: <BarChart3 />, title: "Transparency", description: "Clear pricing and honest interactions" }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      content: "Listify helped me grow my tutoring business locally. I found 20+ students in my neighborhood within 2 months! The community features are amazing.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=90"
    },
    {
      name: "Priya Sharma",
      role: "Community Event Organizer",
      content: "From selling furniture to promoting our local Diwali celebration, Listify has everything. It's like Craigslist and a community bulletin board combined!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=90"
    },
    {
      name: "Michael Chen",
      role: "Homeowner",
      content: "Found a reliable plumber, sold my old bicycle, and joined a local hiking group—all on Listify. It's transformed how I connect with my community.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=90"
    }
  ];

  // Team
  const team = [
    { 
      name: "Sarah Chen", 
      role: "CEO & Founder", 
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=90",
      bio: "Former product lead at a major social network, passionate about using technology to strengthen local communities"
    },
    { 
      name: "Michael Torres", 
      role: "Head of Product", 
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=90",
      bio: "Built scalable marketplace platforms serving millions of users, focusing on trust and user experience"
    },
    { 
      name: "Emma Williams", 
      role: "Head of Community", 
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=90",
      bio: "15+ years in community building, previously managed local engagement for major civic organizations"
    }
  ];

  // Impact Stats
  const impactStats = [
    { metric: "$850M+", label: "Local Economic Impact", description: "Transactions facilitated through our platform" },
    { metric: "200K+", label: "Local Jobs Created", description: "Through services and small businesses" },
    { metric: "50K+", label: "Community Events", description: "Listed and promoted locally" },
    { metric: "95%", label: "User Satisfaction", description: "Based on verified reviews" }
  ];

  // Our Story
  const ourStory = {
    title: "Our Story",
    description: "Listify was founded on a simple but powerful idea: what if you could combine the straightforward classifieds of Craigslist with the vibrant community and local service discovery of Sulekha? What began as a project to help neighbors connect has grown into a trusted platform for millions, making local commerce more accessible, social, and secure.",
    milestones: [
      "Started with free classifieds in 3 cities",
      "Added community forums and events in year two",
      "Launched verified local services marketplace",
      "Reached 2 million monthly active users"
    ]
  };

  // Technology
  const technology = [
    { 
      title: "Smart Categorization", 
      description: "AI that intelligently sorts listings and matches users with relevant local services and events",
      icon: <Lightbulb className="w-8 h-8" />
    },
    { 
      title: "Verified Profiles", 
      description: "Multi-layer verification system for users and service providers to ensure safety and trust",
      icon: <ShieldCheck className="w-8 h-8" />
    },
    { 
      title: "Community Moderation", 
      description: "Advanced tools and guidelines that foster positive, self-regulating local forums and discussions",
      icon: <Users className="w-8 h-8" />
    },
    { 
      title: "Real-Time Alerts", 
      description: "Instant notifications for new listings in your area, messages, and upcoming event reminders",
      icon: <Zap className="w-8 h-8" />
    }
  ];

  // Community Initiatives
  const communityInitiatives = [
    {
      title: "Local Business Boost",
      description: "Special programs and free listings to help small businesses thrive in the digital economy",
      icon: <Building className="w-8 h-8" />
    },
    {
      title: "Neighborhood Clean-Up Drives",
      description: "Organizing and promoting local environmental initiatives and community service events",
      icon: <Leaf className="w-8 h-8" />
    },
    {
      title: "Skill Sharing Workshops",
      description: "Regular local workshops where community members teach and learn practical skills",
      icon: <BookOpen className="w-8 h-8" />
    }
  ];

  // Services
  const services = [
    {
      icon: <Tag className="w-8 h-8" />,
      title: "Local Classifieds",
      desc: "Post and browse items for sale, housing, jobs, and services with the simplicity and trust you expect from the best classified platforms.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Community & Events",
      desc: "Discover and promote local events, join community forums, and connect with neighbors who share your interests and passions.",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Service Marketplace",
      desc: "Find and book verified local professionals for home services, repairs, tutoring, wellness, and everything your household needs.",
    },
  ];

  // Why Choose Us reasons
  const whyChooseUs = [
    "Free Basic Listings",
    "AI-Powered Trust & Safety",
    "Vibrant Community Forums",
    "Hyperlocal Service Discovery",
    "Simple, No-Fuss Interface",
    "Real Human Support"
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

    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
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

    @keyframes border-rotate {
      0% { --gradient-angle: 0deg; }
      100% { --gradient-angle: 360deg; }
    }
    
    @property --gradient-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
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
      
      {/* HERO SECTION WITH BG IMAGE */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=90"
            alt="Community marketplace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        {/* Hero Content with Hover Effects */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Heading with Hover Effect */}
              <div className="group animate-fade-in-up">
                <h1 className="text-5xl lg:text-5xl font-black  text-white leading-tight mb-6 transition-all duration-300 group-hover:translate-x-4">
                  THE SMART WAY TO<br />
                  <span className="text-[#27bb97] group-hover:text-[#1FA987] transition-colors duration-300">BUY, SELL & CONNECT</span>
                </h1>
                <div className="w-32 h-1 bg-[#27bb97] transform transition-all duration-500 group-hover:w-48 group-hover:bg-[#1FA987]"></div>
              </div>

              {/* Description with Hover Effect */}
              <div className="group animate-fade-in-up">
                <p className="text-xl text-gray-200 mb-10 max-w-xl transition-all duration-300 group-hover:translate-x-2">
                  Listify brings together the trusted simplicity of Craigslist with the rich community features of Sulekha. We're the modern hyperlocal platform where you can discover events, find local services, post classifieds, and build meaningful community connections-all in one place.
                </p>
              </div>

              {/* Buttons with Hover Effects */}
              {/* <div className="flex flex-wrap gap-6 pt-4">
                <button className="group relative px-10 py-4 bg-gradient-to-r from-[#27bb97] to-[#1FA987] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <span className="relative z-10">Browse Local Listings</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1FA987] to-[#198F72] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                
                <button className="group relative px-10 py-4 border-2 border-white text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <span className="relative z-10">Post For Free</span>
                  <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-[#27bb97] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    Post For Free
                  </span>
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-8 h-8 text-white rotate-90" />
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">From a Simple Idea to a Community Hub</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{ourStory.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate stagger-delay-1">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=90"
                alt="Listify team working on community platform"
                className="rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover-lift"
              />
            </div>
            <div className="scroll-animate stagger-delay-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Journey's Milestones</h3>
              <ul className="space-y-4">
                {ourStory.milestones.map((milestone, i) => (
                  <li key={i} className="flex items-start gap-3 group hover-lift p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-[#27bb97] mt-1 flex-shrink-0 transform group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-[#27bb97] transition-colors">{milestone}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Purpose</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Reimagining local connections through technology while keeping community at our core
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-animate stagger-delay-1 hover-lift bg-gradient-to-br from-[#27bb97]/5 to-[#2d7dd7]/5 p-8 rounded-lg hover:shadow-xl transition-shadow duration-300 border border-[#27bb97]/10">
              <div className="flex items-center gap-4 mb-6 group">
                <Target className="w-10 h-10 text-[#27bb97] group-hover:rotate-12 transition-transform" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 mb-6">
                To make local commerce and community connections accessible, secure, and rewarding for everyone—whether you're buying, selling, or simply connecting with neighbors.
              </p>
              <ul className="space-y-3">
                {['Always free basic listings', 'AI-powered safety & verification', 'Hyperlocal matching algorithm', 'Community-first design'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 group">
                    <CheckCircle className="w-5 h-5 text-[#27bb97] group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-[#27bb97] transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="scroll-animate stagger-delay-2 hover-lift bg-gradient-to-br from-[#27bb97]/5 to-[#2d7dd7]/5 p-8 rounded-lg hover:shadow-xl transition-shadow duration-300 border border-[#27bb97]/10">
              <div className="flex items-center gap-4 mb-6 group">
                <Globe className="w-10 h-10 text-[#27bb97] group-hover:rotate-12 transition-transform" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 mb-6">
                A world where every neighborhood has a vibrant digital town square—where transactions build trust, events foster connections, and local services are just a click away.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2025', label: 'National Coverage' },
                  { value: '10M+', label: 'Monthly Users' },
                  { value: 'Zero', label: 'Basic Fees' },
                  { value: '100%', label: 'Verified Services' }
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow hover-lift">
                    <div className="text-xl font-bold text-[#27bb97]">{item.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <p className="text-[#27bb97] font-bold uppercase tracking-wider text-sm">Everything Your Community Needs</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Our Platform Features</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <div key={i} className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift group text-center p-10 bg-white border border-gray-200 rounded-2xl hover:border-[#27bb97] hover:shadow-xl transition-all duration-300`}>
                <div className="w-20 h-20 bg-gradient-to-br from-[#27bb97]/10 to-[#2d7dd7]/10 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:from-[#27bb97]/20 group-hover:to-[#2d7dd7]/20 transition-colors">
                  <div className="text-[#27bb97] group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#27bb97] transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 scroll-animate">
            <button className="bg-gradient-to-r from-[#27bb97] to-[#1FA987] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 hover:scale-105">
              Explore All Features
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <p className="text-[#27bb97] font-bold uppercase tracking-wider text-sm">Why Listify Stands Out</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Why Choose Listify</h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {whyChooseUs.map((reason, i) => (
              <div key={i} className={`scroll-animate stagger-delay-${(i % 6) + 1} hover-lift text-center group p-4 rounded-lg bg-gray-50 hover:bg-gradient-to-br hover:from-[#27bb97]/10 hover:to-[#1FA987]/10 transition-all duration-300`}>
                <span className="text-5xl font-black text-[#27bb97] group-hover:text-[#1FA987] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-semibold text-gray-800 group-hover:text-[#27bb97] transition-colors">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide every feature, interaction, and community guideline
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div key={i} className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-[#27bb97]/10 to-[#2d7dd7]/10 rounded-lg group-hover:from-[#27bb97]/20 group-hover:to-[#2d7dd7]/20 transition-colors">
                    <div className="text-[#27bb97] group-hover:scale-110 transition-transform">
                      {React.cloneElement(value.icon, { className: "w-6 h-6" })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#27bb97] transition-colors">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16 items-center">
          <div className="scroll-animate text-center lg:text-left">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 group">
              Listify by the Numbers
              <div className="w-20 h-1 bg-[#27bb97] mt-2 transform transition-all duration-500 group-hover:w-32"></div>
            </h3>
            <p className="text-gray-600">
              Real impact through real connections. Our platform has facilitated millions of local transactions and community interactions that strengthen neighborhoods.
            </p>
          </div>

          <div className="scroll-animate stagger-delay-1 relative group">
            <div className="w-64 h-64 mx-auto relative">
              <svg className="w-full h-full -rotate-90">
                <circle cx="128" cy="128" r="120" stroke="#e5e7eb" strokeWidth="16" fill="none" />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="#27bb97"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray="754"
                  strokeDashoffset="150"
                  className="transition-all duration-1000 group-hover:stroke-dashoffset-0"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center group-hover:scale-110 transition-transform duration-300">
                  <p className="text-6xl font-black text-[#27bb97]">95%</p>
                  <p className="text-xl font-bold text-gray-900">Satisfaction<br />Rate</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className={`scroll-animate stagger-delay-${i + 2} hover-lift group p-4 rounded-lg bg-gray-50 hover:bg-gradient-to-br hover:from-[#27bb97]/10 hover:to-[#1FA987]/10 transition-all duration-300`}>
                <p className="text-5xl font-black text-[#27bb97] group-hover:scale-110 transition-transform">{stat.number}</p>
                <p className="text-gray-700 font-medium group-hover:text-[#27bb97] transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Trust & Connection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The technology that powers safe, meaningful local interactions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {technology.map((tech, i) => (
              <div key={i} className={`scroll-animate stagger-delay-${(i % 2) + 1} hover-lift group flex gap-6 p-6 bg-white rounded-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex-shrink-0">
                  <div className="p-4 bg-gradient-to-br from-[#27bb97]/10 to-[#2d7dd7]/10 rounded-lg group-hover:from-[#27bb97]/20 group-hover:to-[#2d7dd7]/20 transition-colors">
                    <div className="text-[#27bb97] group-hover:scale-110 transition-transform">
                      {tech.icon}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#27bb97] transition-colors">{tech.title}</h3>
                  <p className="text-gray-600">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 bg-gray-300"></div>
            
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={i} className={`scroll-animate stagger-delay-${(i % 5) + 1} flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-[#27bb97] rounded-full group hover:scale-150 transition-transform"></div>
                  
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover-lift">
                      <div className="text-2xl font-bold text-[#27bb97] mb-2 group-hover:scale-110 transition-transform inline-block">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#27bb97] transition-colors">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Making a tangible difference in communities nationwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {impactStats.map((stat, i) => (
              <div key={i} className={`scroll-animate stagger-delay-${(i % 4) + 1} hover-lift text-center group p-6 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300`}>
                <div className="text-4xl font-bold text-[#27bb97] mb-4 group-hover:scale-110 transition-transform">{stat.metric}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#27bb97] transition-colors">{stat.label}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>

          <div className="scroll-animate bg-white p-8 rounded-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group">
                  Community Initiatives
                  <div className="w-16 h-1 bg-[#27bb97] mt-2 transform transition-all duration-500 group-hover:w-24"></div>
                </h3>
                <div className="space-y-6">
                  {communityInitiatives.map((initiative, i) => (
                    <div key={i} className="flex items-start gap-4 group hover-lift p-4 rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <div className="p-3 bg-gradient-to-br from-[#27bb97]/10 to-[#2d7dd7]/10 rounded-lg group-hover:from-[#27bb97]/20 group-hover:to-[#2d7dd7]/20 transition-colors">
                        <div className="text-[#27bb97] group-hover:scale-110 transition-transform">
                          {initiative.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#27bb97] transition-colors">{initiative.title}</h4>
                        <p className="text-gray-600">{initiative.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="scroll-animate stagger-delay-1 group">
                <img 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&q=90"
                  alt="Community gathering at local event"
                  className="rounded-lg shadow-lg transform transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">Award-Winning</span> Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, i) => (
              <div key={i} className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift relative group`}>
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-[#27bb97]/20">
                  <div className="text-[#27bb97] mb-6 group-hover:scale-110 transition-transform inline-block">
                    {achievement.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#27bb97] transition-colors">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate builders dedicated to strengthening local connections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-64 object-cover transform transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#27bb97] transition-colors">{member.name}</h3>
                  <p className="text-[#27bb97] font-medium mb-4 group-hover:text-[#1FA987] transition-colors">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our community members across the country
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift group bg-gray-50 p-6 rounded-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#27bb97] transition-colors">{testimonial.name}</h3>
                    <p className="text-[#27bb97] group-hover:text-[#1FA987] transition-colors">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-[#27bb97] to-[#1FA987]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="scroll-animate">
            <h2 className="text-4xl font-bold text-white mb-6 group">
              Join the Listify Community Today
              <div className="w-32 h-1 bg-white mt-2 mx-auto transform transition-all duration-500 group-hover:w-48"></div>
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Discover local listings, connect with neighbors, and build your community—all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/signup" 
                className="group relative px-10 py-4 bg-white text-[#27bb97] font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gray-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </a>
              
              <a 
                href="/contact-us" 
                className="group relative px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Contact Community Team</span>
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="absolute inset-0 flex items-center justify-center text-[#27bb97] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  Contact Us
                </span>
              </a>
            </div>
            
            <p className="text-white/80 mt-8 text-sm">
              No credit card required • Free basic listings forever • Join 2 million+ community members
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;