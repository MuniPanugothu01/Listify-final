import React, { useEffect } from "react";
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
  BookOpen,
} from "lucide-react";

const AboutUs = () => {
  // Stats
  const stats = [
    {
      number: "2M+",
      label: "Monthly Active Users",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    },
    {
      number: "5M+",
      label: "Listings Posted",
      icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    },
    {
      number: "500+",
      label: "Cities & Towns",
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    },
    {
      number: "4.9/5",
      label: "Trust Rating",
      icon: <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    },
  ];

  // Enhanced Timeline with Images
  const timeline = [
    {
      year: "2019",
      title: "Concept Born",
      description: "The idea to combine classifieds with community features was born",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=90",
    },
    {
      year: "2020",
      title: "Listify Launched",
      description: "Beta launched in 5 major cities with free classifieds",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w-800&q=90",
    },
    {
      year: "2021",
      title: "Community Features Added",
      description: "Introduced events, forums, and local services marketplace",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=90",
    },
    {
      year: "2022",
      title: "National Expansion",
      description: "Expanded to 50+ cities across the country",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&q=90",
    },
    {
      year: "2023",
      title: "AI & Safety Launch",
      description: "Introduced AI-powered verification and safety features",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=90",
    },
  ];

  // Achievements
  const achievements = [
    {
      icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      title: "Best Local Marketplace 2023",
      description: "Community Choice Awards",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      title: "Trust & Safety Excellence",
      description: "Digital Safety Certified",
    },
    {
      icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      title: "Fastest Growing Platform",
      description: "Local Commerce Report 2023",
    },
  ];

  // Values with Images
  const values = [
    {
      icon: <ShieldCheck />,
      title: "Trust First",
      description: "Verified users and secure transactions are our foundation",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&q=90",
    },
    {
      icon: <UsersRound />,
      title: "Community Driven",
      description: "Built by the community, for the community",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=90",
    },
    {
      icon: <Heart />,
      title: "Accessibility",
      description: "Free basic listings for everyone, always",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&q=90",
    },
    {
      icon: <Zap />,
      title: "Simplicity",
      description: "Easy to use, no unnecessary complexity",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=90",
    },
    {
      icon: <HeartHandshake />,
      title: "Local Focus",
      description: "Hyperlocal connections strengthen neighborhoods",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=90",
    },
    {
      icon: <BarChart3 />,
      title: "Transparency",
      description: "Clear pricing and honest interactions",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=90",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      content: "Listify helped me grow my tutoring business locally. I found 20+ students in my neighborhood within 2 months! The community features are amazing.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=90",
    },
    {
      name: "Priya Sharma",
      role: "Community Event Organizer",
      content: "From selling furniture to promoting our local Diwali celebration, Listify has everything. It's like Craigslist and a community bulletin board combined!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=90",
    },
    {
      name: "Michael Chen",
      role: "Homeowner",
      content: "Found a reliable plumber, sold my old bicycle, and joined a local hiking group—all on Listify. It's transformed how I connect with my community.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=90",
    },
  ];

  // Team
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=90",
      bio: "Former product lead at a major social network, passionate about using technology to strengthen local communities",
    },
    {
      name: "Michael Torres",
      role: "Head of Product",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=90",
      bio: "Built scalable marketplace platforms serving millions of users, focusing on trust and user experience",
    },
    {
      name: "Emma Williams",
      role: "Head of Community",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=90",
      bio: "15+ years in community building, previously managed local engagement for major civic organizations",
    },
  ];

  // Impact Stats
  const impactStats = [
    {
      metric: "$850M+",
      label: "Local Economic Impact",
      description: "Transactions facilitated through our platform",
    },
    {
      metric: "200K+",
      label: "Local Jobs Created",
      description: "Through services and small businesses",
    },
    {
      metric: "50K+",
      label: "Community Events",
      description: "Listed and promoted locally",
    },
    {
      metric: "95%",
      label: "User Satisfaction",
      description: "Based on verified reviews",
    },
  ];

  // Services
  const services = [
    {
      icon: <Tag className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      title: "Local Classifieds",
      desc: "Post and browse items for sale, housing, jobs, and services with the simplicity and trust you expect from the best classified platforms.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=90",
    },
    {
      icon: <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      title: "Community & Events",
      desc: "Discover and promote local events, join community forums, and connect with neighbors who share your interests and passions.",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=90",
    },
    {
      icon: <Home className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      title: "Service Marketplace",
      desc: "Find and book verified local professionals for home services, repairs, tutoring, wellness, and everything your household needs.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=90",
    },
  ];

  // Technology
  const technology = [
    {
      title: "Smart Categorization",
      description: "AI that intelligently sorts listings and matches users with relevant local services and events",
      icon: <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=90",
    },
    {
      title: "Verified Profiles",
      description: "Multi-layer verification system for users and service providers to ensure safety and trust",
      icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=90",
    },
    {
      title: "Community Moderation",
      description: "Advanced tools and guidelines that foster positive, self-regulating local forums and discussions",
      icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=90",
    },
    {
      title: "Real-Time Alerts",
      description: "Instant notifications for new listings in your area, messages, and upcoming event reminders",
      icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#27bb97]" />,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=90",
    },
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

    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
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
      background: linear-gradient(135deg, #27BB97 0%, #2d7dd7 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
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
    }
  `;

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style>{animationStyles}</style>

      {/* HERO SECTION */}
      <section className="relative md:min-h-[70vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=90"
            alt="Community marketplace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mobile-space-y-8 lg:space-y-0">
            <div className="space-y-6 sm:space-y-8">
              <div className="group animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight mb-4 sm:mb-6 mobile-text-center lg:text-left">
                  THE SMART WAY TO
                  <br />
                  <span className="bg-gradient-to-r from-[#27bb97] via-white to-[#27bb97] bg-clip-text text-transparent block">
                    BUY, SELL & CONNECT
                  </span>
                </h1>
                <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-[#27bb97] to-white transform transition-all duration-500 group-hover:w-32 sm:group-hover:w-48 mx-auto lg:mx-0"></div>
                <div className="mt-4 sm:mt-6">
                  <span className="text-base sm:text-lg text-white/90 mobile-text-center lg:text-left block">
                    Listify combines the best of classifieds with community features to
                    create a trusted, local marketplace for everyone.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED SERVICES */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Everything Your <span className="gradient-text">Community</span> Needs
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              A comprehensive platform designed to meet all your local needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift`}
              >
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-full">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED VALUES */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              The principles that guide every feature and community interaction
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift group`}
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg border border-gray-200 h-full">
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                      {React.cloneElement(value.icon, { className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" })}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#27bb97] transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED TECHNOLOGY */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Powered by <span className="gradient-text">Innovation</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Cutting-edge technology that ensures safety, relevance, and seamless connections
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {technology.map((tech, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 2) + 1} hover-lift`}
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 h-full">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gray-50 flex items-center justify-center">
                        {tech.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{tech.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{tech.description}</p>
                      <div className="relative h-24 sm:h-32 rounded-lg overflow-hidden">
                        <img
                          src={tech.image}
                          alt={tech.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED TIMELINE */}
      {/* <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              From a simple idea to a nationwide community platform
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#27bb97] to-[#2d7dd7]"></div>

            <div className="space-y-8 sm:space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`scroll-animate stagger-delay-${(i % 5) + 1} flex items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-3 sm:border-4 border-[#27bb97]"></div>

                  <div className={`ml-10 sm:ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-8 lg:pr-12" : "md:pl-8 lg:pl-12"}`}>
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover-lift border border-gray-200">
                      <div className="h-32 sm:h-40 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="text-xl sm:text-2xl font-bold text-[#27bb97] mb-3 sm:mb-4">{item.year}</div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                        <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* TEAM */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Meet Our <span className="gradient-text">Leaders</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Passionate individuals dedicated to strengthening local connections
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift group`}
              >
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-full">
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#27bb97] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[#27bb97] font-medium mb-2 sm:mb-4 text-sm sm:text-base">{member.role}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Community <span className="gradient-text">Love</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Hear from our community members across the country
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift`}
              >
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 h-full">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</h3>
                      <p className="text-[#27bb97] text-xs sm:text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      {/* <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="scroll-animate">
            <div className=" rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
                Join <span className="text-black font-black">2 Million+</span> Community Members
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-black mb-6 sm:mb-8">
                Start connecting with your neighbors, discover local services, and build meaningful relationships today.
              </p>

              <div className="justify-center items-center gap-4 sm:gap-6">
                <button className="border border-gray-500 text-[#27bb97] px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold">
                  <span className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                    Get Started
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                </button>
              </div>

              <p className="text-black mt-6 sm:mt-8 text-xs sm:text-sm">
                No credit card required • Free forever for basic listings • Join the movement
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutUs;