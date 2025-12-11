import React from 'react';
import { 
  Users, 
  Target, 
  Globe, 
  Shield, 
  TrendingUp, 
  Zap,
  CheckCircle,
  Award,
  Sparkles,
  ThumbsUp,
  Building2,
  ArrowRight,
  Heart,
  Star,
  Target as TargetIcon,
  Users as UsersIcon,
  Zap as ZapIcon,
  ChevronRight,
  ShieldCheck,
  TrendingUp as TrendingUpIcon,
  MapPin,
  Clock,
  Search,
  Filter,
  HeartHandshake,
  Leaf,
  Globe2,
  UsersRound,
  BarChart3,
  Lightbulb,
  Rocket,
  Smile,
  Megaphone,
  Handshake,
  Building,
  Globe as GlobeIcon,
  PieChart,
  Activity,
  Mail,
  Phone,
  MapPin as MapPinIcon,
  Calendar,
  MessageSquare
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { number: '50K+', label: 'Active Users', icon: <Users className="w-6 h-6" />, suffix: 'Daily' },
    { number: '100K+', label: 'Listings Posted', icon: <Award className="w-6 h-6" />, suffix: 'Monthly' },
    { number: '10K+', label: 'Cities Covered', icon: <Globe className="w-6 h-6" />, suffix: 'Worldwide' },
    { number: '99%', label: 'Satisfaction', icon: <ThumbsUp className="w-6 h-6" />, suffix: 'Score' },
  ];

  const timeline = [
    { year: '2020', title: 'Founded', description: 'Listify was born in a small apartment' },
    { year: '2021', title: 'First 10K Users', description: 'Reached our first major milestone' },
    { year: '2022', title: 'Series A', description: 'Raised $10M to scale globally' },
    { year: '2023', title: '1M Downloads', description: 'Became top marketplace app' },
    { year: '2024', title: 'AI Launch', description: 'Introduced AI-powered features' },
  ];

  const achievements = [
    { icon: <Award className="w-8 h-8" />, title: 'Best Marketplace 2023', description: 'TechCrunch Awards' },
    { icon: <ShieldCheck className="w-8 h-8" />, title: 'Security Excellence', description: 'Privacy First Certified' },
    { icon: <TrendingUpIcon className="w-8 h-8" />, title: 'Fastest Growing', description: 'Forbes 30 Under 30' },
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Integrity",
      description: "We operate with honesty and transparency in all our dealings"
    },
    {
      icon: <UsersRound className="w-6 h-6" />,
      title: "Inclusivity",
      description: "Building platforms accessible to everyone, everywhere"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainability",
      description: "Promoting eco-friendly practices in local commerce"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Innovation",
      description: "Continuously evolving to serve our community better"
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Collaboration",
      description: "Working together with communities for mutual growth"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Excellence",
      description: "Striving for the highest quality in everything we do"
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Small Business Owner",
      content: "Listify transformed how I connect with local customers. My sales increased by 300% in just 3 months!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=90"
    },
    {
      name: "Maria Garcia",
      role: "Community Leader",
      content: "The trust and safety features are unparalleled. I feel completely secure buying and selling locally.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=90"
    },
    {
      name: "David Kim",
      role: "Environmental Activist",
      content: "By promoting local trade, Listify helps reduce carbon footprint significantly. A win for the planet!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=90"
    }
  ];

  const locations = [
    { city: "San Francisco", country: "USA", users: "50K+" },
    { city: "London", country: "UK", users: "45K+" },
    { city: "Tokyo", country: "Japan", users: "38K+" },
    { city: "Sydney", country: "Australia", users: "32K+" },
    { city: "Berlin", country: "Germany", users: "28K+" },
    { city: "Toronto", country: "Canada", users: "25K+" },
    { city: "Singapore", country: "Singapore", users: "22K+" },
    { city: "Paris", country: "France", users: "20K+" }
  ];

  const impactStats = [
    { metric: "$1.2B+", label: "Economic Impact", description: "Generated for local economies" },
    { metric: "500K+", label: "Jobs Supported", description: "Created or sustained locally" },
    { metric: "85%", label: "Waste Reduction", description: "Through local reuse and recycling" },
    { metric: "4.8/5", label: "Trust Rating", description: "Average user satisfaction score" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ENHANCED HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=90"
            alt="Modern marketplace community"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.1) 100%)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-200">
              Redefining
            </span>
            <br />
            <span className="text-teal-400 relative">
              Local Commerce
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Where communities connect, trust thrives, and every transaction 
            builds stronger local networks.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why <span className="text-teal-600">Choose</span> Listify?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another marketplace - we're a movement dedicated to revitalizing local economies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Unmatched Security",
                description: "Bank-level encryption and AI-powered fraud detection keep every transaction safe"
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "Lightning Fast",
                description: "Instant matching with local buyers and sellers within your neighborhood"
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Community Focused",
                description: "Built with features that strengthen local connections and trust"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED MISSION & VISION */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="relative">Purpose</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving innovation while keeping communities at the heart of everything we do
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl">
                      <Target className="w-10 h-10 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                      <span className="font-semibold text-teal-600 uppercase tracking-wider text-sm">Mission</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      Democratizing Local Commerce
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      We're on a mission to make buying and selling locally accessible, secure, 
                      and rewarding for everyone, regardless of technical expertise or location.
                    </p>
                    <ul className="space-y-4">
                      {['Zero commission fees', 'AI-powered safety checks', 'Instant local matching', 'Carbon-neutral deliveries'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-teal-500" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl">
                      <Globe className="w-10 h-10 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                      <span className="font-semibold text-teal-600 uppercase tracking-wider text-sm">Vision</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      The Future of Community Commerce
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      We envision a world where every local transaction strengthens community bonds, 
                      reduces waste, and creates economic opportunities for all.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: '2025', label: 'Global Expansion' },
                        { value: '10M+', label: 'Users Target' },
                        { value: '100%', label: 'Renewable Energy' },
                        { value: '0', label: 'Transaction Fees' }
                      ].map((item, i) => (
                        <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                          <div className="text-2xl font-bold text-teal-600">{item.value}</div>
                          <div className="text-sm text-gray-600 mt-1">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED CORE VALUES */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              The <span className="text-teal-600">Pillars</span> We Stand On
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Principles that guide every decision, feature, and interaction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Trust First", 
                icon: <Shield className="w-12 h-12" />, 
                desc: "Every user verified, every transaction protected",
                features: ["AI Fraud Detection", "Escrow Payments", "24/7 Moderation"]
              },
              { 
                title: "Community First", 
                icon: <UsersIcon className="w-12 h-12" />, 
                desc: "Built by the community, for the community",
                features: ["Local Ambassadors", "Town Hall Meetings", "Feature Voting"]
              },
              { 
                title: "Simplicity First", 
                icon: <ZapIcon className="w-12 h-12" />, 
                desc: "Complex problems, simple solutions",
                features: ["One-Tap Posting", "Smart Search", "Instant Chat"]
              }
            ].map((value, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl transform scale-95 opacity-0 group-hover:opacity-20 group-hover:scale-100 transition-all duration-500"></div>
                
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-teal-100">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl blur-xl opacity-20"></div>
                    <div className="relative p-5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl inline-flex">
                      <div className="text-teal-600">{value.icon}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg">
                    {value.desc}
                  </p>
                  
                  <ul className="space-y-3">
                    {value.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT IN NUMBERS SECTION */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-teal-600">Impact</span> in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real metrics showing how we're making a difference in communities worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {impactStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-teal-600 mb-4">{stat.metric}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Global Reach, <span className="text-teal-600">Local Touch</span>
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  While we operate worldwide, our technology is designed to understand and serve 
                  local needs, customs, and business practices in every market we enter.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {locations.slice(0, 4).map((loc, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-teal-600" />
                      <div>
                        <div className="font-bold text-gray-900">{loc.city}</div>
                        <div className="text-sm text-gray-600">{loc.country}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-2xl opacity-10"></div>
                <div className="relative bg-gray-900 rounded-2xl p-8 text-white">
                  <Globe2 className="w-16 h-16 text-teal-400 mb-6" />
                  <h4 className="text-2xl font-bold mb-4">8 Countries & Growing</h4>
                  <p className="text-gray-300 mb-6">
                    Active communities across North America, Europe, Asia, and Australia
                  </p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center">
                        <span className="text-sm font-bold">{i}</span>
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-teal-400/40 flex items-center justify-center">
                      <span className="text-sm font-bold">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY TIMELINE */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Milestones That <span className="text-teal-600">Shaped Us</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-teal-400 via-teal-300 to-teal-200"></div>
            
            <div className="space-y-20">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-teal-400 rounded-full z-10"></div>
                  
                  <div className={`w-1/2 ${i % 2 === 0 ? 'pr-16 text-right' : 'pl-16'}`}>
                    <div className="inline-block p-6 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
                      <div className="text-4xl font-black text-teal-600 mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-teal-600">Award-Winning</span> Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {achievements.map((achievement, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="text-teal-600 mb-6">{achievement.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY TESTIMONIALS */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-teal-600">Community</span> Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from real users who are transforming their local commerce experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-teal-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full shadow-lg">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-xl font-bold text-gray-900">4.9/5 Average Rating</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">Based on 25,000+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED TEAM SECTION */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              The <span className="relative">
                Minds
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-teal-100 -z-10"></span>
              </span> Behind the Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visionaries dedicated to transforming how communities connect and commerce flows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                name: "Sarah Chen", 
                role: "CEO & Founder", 
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=90",
                bio: "Former Google PM, passionate about community empowerment",
                social: "@sarahchen"
              },
              { 
                name: "Michael Torres", 
                role: "Head of Product", 
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w-600&q=90",
                bio: "Ex-Uber, built platforms serving 10M+ users",
                social: "@miketorres"
              },
              { 
                name: "Emma Williams", 
                role: "Head of Community", 
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=90",
                bio: "Community builder with 15+ years experience",
                social: "@emmawilliams"
              }
            ].map((member, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-teal-100">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    
                    <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-sm font-semibold text-teal-600">{member.role}</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex items-center gap-2 text-teal-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">{member.social}</span>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"></div>
                        <div className="text-sm text-gray-500">Listify Team Member</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES IN ACTION SECTION */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-teal-600">Values</span> in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Principles that guide every decision and define our company culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="group">
                <div className="h-full bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-teal-400 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                      <div className="text-teal-600">{value.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                  </div>
                  <p className="text-gray-600">{value.description}</p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="text-sm font-semibold text-teal-600 mb-2">How we live it:</div>
                    <ul className="space-y-2">
                      {[
                        "Quarterly transparency reports",
                        "Community feedback sessions",
                        "Sustainable business practices"
                      ].map((example, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-block p-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full">
              <div className="bg-white rounded-full px-8 py-4">
                <div className="flex items-center gap-4">
                  <Handshake className="w-6 h-6 text-teal-600" />
                  <span className="text-lg font-bold text-gray-900">
                    Join us in building a better, more connected world
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP/CONTACT SECTION */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Ready to <span className="text-teal-600">Partner</span> with Us?
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Whether you're a business looking to reach local customers, 
                a developer wanting to build on our platform, or an organization 
                seeking collaboration - we'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-50 rounded-lg">
                    <Mail className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Business Inquiries</h3>
                    <p className="text-gray-600">partnerships@listify.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-50 rounded-lg">
                    <Phone className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Support</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-50 rounded-lg">
                    <MapPinIcon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Headquarters</h3>
                    <p className="text-gray-600">123 Innovation Drive, San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-10 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                      placeholder="Tell us about your interest..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-400/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED CTA SECTION */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-gray-50"></div>
        
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-teal-400/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-teal-400/5 blur-3xl"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-10 shadow-xl">
              <Star className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg tracking-wide">JOIN THE REVOLUTION</span>
            </div>

            <h2 className="text-6xl font-black text-gray-900 mb-8 leading-tight">
              Ready to <span className="relative">Transform</span>
              <br />
              Your Local Experience?
            </h2>

            <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join millions who trust Listify for safe, simple, and rewarding 
              local commerce. Start your journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a 
                href="/signup" 
                className="group relative px-14 py-5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-4 hover:scale-105"
              >
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </a>
              
              <a 
                href="/contact-us" 
                className="group relative px-14 py-5 bg-white text-gray-900 font-bold rounded-2xl border-2 border-gray-300 hover:border-teal-400 transition-all duration-300 text-lg flex items-center justify-center gap-4 hover:scale-105 shadow-lg"
              >
                <span className="relative z-10">CONTACT US</span>
              </a>
            </div>

            <div className="text-gray-500 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;