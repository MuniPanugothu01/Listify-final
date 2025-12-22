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
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      number: "5M+",
      label: "Listings Posted",
      icon: <Briefcase className="w-6 h-6 text-white" />,
    },
    {
      number: "500+",
      label: "Cities & Towns",
      icon: <Globe className="w-6 h-6 text-white" />,
    },
    {
      number: "4.9/5",
      label: "Trust Rating",
      icon: <ThumbsUp className="w-6 h-6 text-white" />,
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
      icon: <Award className="w-8 h-8 text-[#27bb97]" />,
      title: "Best Local Marketplace 2023",
      description: "Community Choice Awards",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#27bb97]" />,
      title: "Trust & Safety Excellence",
      description: "Digital Safety Certified",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#27bb97]" />,
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
      icon: <Tag className="w-8 h-8 text-[#27bb97]" />,
      title: "Local Classifieds",
      desc: "Post and browse items for sale, housing, jobs, and services with the simplicity and trust you expect from the best classified platforms.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=90",
    },
    {
      icon: <Calendar className="w-8 h-8 text-[#27bb97]" />,
      title: "Community & Events",
      desc: "Discover and promote local events, join community forums, and connect with neighbors who share your interests and passions.",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=90",
    },
    {
      icon: <Home className="w-8 h-8 text-[#27bb97]" />,
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
      icon: <Lightbulb className="w-8 h-8 text-[#27bb97]" />,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=90",
    },
    {
      title: "Verified Profiles",
      description: "Multi-layer verification system for users and service providers to ensure safety and trust",
      icon: <ShieldCheck className="w-8 h-8 text-[#27bb97]" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=90",
    },
    {
      title: "Community Moderation",
      description: "Advanced tools and guidelines that foster positive, self-regulating local forums and discussions",
      icon: <Users className="w-8 h-8 text-[#27bb97]" />,
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=90",
    },
    {
      title: "Real-Time Alerts",
      description: "Instant notifications for new listings in your area, messages, and upcoming event reminders",
      icon: <Zap className="w-8 h-8 text-[#27bb97]" />,
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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=90"
            alt="Community marketplace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="group animate-fade-in-up">
                <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                  THE SMART WAY TO
                  <br />
                  <span className="bg-gradient-to-r from-[#27bb97] via-white to-[#27bb97] bg-clip-text text-transparent">
                    BUY, SELL & CONNECT
                  </span>
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-[#27bb97] to-white transform transition-all duration-500 group-hover:w-48"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover-lift border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=90"
                  alt="Local Marketplace"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p className="text-white font-semibold">Local Marketplace</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover-lift border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=90"
                  alt="Community Events"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p className="text-white font-semibold">Community Events</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover-lift border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=90"
                  alt="Verified Services"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p className="text-white font-semibold">Verified Services</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover-lift border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=90"
                  alt="Neighborhood Network"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p className="text-white font-semibold">Neighborhood Network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED STATS SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="scroll-animate">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Trusted by <span className="gradient-text">Millions</span>
              </h2>
              <p className="text-gray-600 mb-8">
                From local businesses to community organizers, people across the country rely on Listify.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift border border-gray-200">
                  <div className="text-4xl font-bold text-[#27bb97] mb-2">24/7</div>
                  <p className="text-gray-700 font-medium">Active Support</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift border border-gray-200">
                  <div className="text-4xl font-bold text-[#27bb97] mb-2">99.9%</div>
                  <p className="text-gray-700 font-medium">Uptime</p>
                </div>
              </div>
            </div>
            <div className="scroll-animate stagger-delay-1">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-[#27bb97] to-[#1FA987] p-6 rounded-2xl text-white hover-lift"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold">{stat.number}</div>
                      {stat.icon}
                    </div>
                    <p className="font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="scroll-animate">
            <div className="bg-gradient-to-r from-[#27bb97] to-[#2d7dd7] rounded-3xl p-8 text-white">
              <div className="grid md:grid-cols-4 gap-8">
                {impactStats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold mb-2">{stat.metric}</div>
                    <p className="font-medium mb-1">{stat.label}</p>
                    <p className="text-white/80 text-sm">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything Your <span className="gradient-text">Community</span> Needs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform designed to meet all your local needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED VALUES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide every feature and community interaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift group`}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-200">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      {React.cloneElement(value.icon, { className: "w-8 h-8" })}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#27bb97] transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED TECHNOLOGY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by <span className="gradient-text">Innovation</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology that ensures safety, relevance, and seamless connections
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {technology.map((tech, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 2) + 1} hover-lift`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center">
                        {tech.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.title}</h3>
                      <p className="text-gray-600 mb-4">{tech.description}</p>
                      <div className="relative h-32 rounded-lg overflow-hidden">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a simple idea to a nationwide community platform
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#27bb97] to-[#2d7dd7]"></div>

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`scroll-animate stagger-delay-${(i % 5) + 1} flex items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#27bb97]"></div>

                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift border border-gray-200">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-2xl font-bold text-[#27bb97] mb-4">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recognized <span className="gradient-text">Excellence</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
                  <div className="inline-block mb-6 p-4 bg-gray-50 rounded-full">
                    {achievement.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* TEAM */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="gradient-text">Leaders</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to strengthening local connections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift group`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#27bb97] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[#27bb97] font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Community <span className="gradient-text">Love</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our community members across the country
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`scroll-animate stagger-delay-${(i % 3) + 1} hover-lift`}
              >
                <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-[#27bb97]">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=90"
            alt="Community celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#27bb97]/90 to-[#2d7dd7]/90"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="scroll-animate">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <h2 className="text-4xl font-bold text-white mb-6">
                Join <span className="text-white font-black">2 Million+</span> Community Members
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Start connecting with your neighbors, discover local services, and build meaningful relationships today.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <button className="bg-white text-[#27bb97] px-8 py-4 rounded-xl font-bold hover-lift">
                  <span className="flex items-center justify-center gap-3">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>

                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover-lift hover:bg-white/10">
                  <span className="flex items-center justify-center gap-3">
                    Schedule Demo
                    <Calendar className="w-5 h-5" />
                  </span>
                </button>
              </div>

              <p className="text-white/80 mt-8 text-sm">
                No credit card required • Free forever for basic listings • Join the movement
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;