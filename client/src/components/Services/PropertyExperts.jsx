import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineClose,
  AiOutlineMail,
  AiOutlineCalendar,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import {
  HiLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
} from "react-icons/hi";
import {
  MdOutlinePhoneInTalk,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdLanguage,
  MdOutlineMessage,
} from "react-icons/md";
import {
  FaBriefcase,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { TbBuildingSkyscraper } from "react-icons/tb";

const initialAgents = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Elite Realty Solutions",
    role: "Luxury Home Specialist",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@eliterealty.com",
    experience: "12 Years Experience",
    deals: "350+ Luxury Homes Sold",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    location: "Beverly Hills, CA",
    verified: true,
    featured: true,
    bio: "Specializing in luxury residential properties across Southern California. Known for discreet service and exceptional market insights for high-net-worth clients.",
    specialties: [
      "Luxury Estates",
      "Waterfront Properties",
      "Celebrity Real Estate",
    ],
    languages: ["English", "Spanish", "French"],
    certification: "Certified Luxury Home Marketing Specialist",
    website: "www.eliterealtysolutions.com",
    social: {
      facebook: "sarahjohnsonluxury",
      twitter: "@SarahJLuxuryHomes",
      linkedin: "in/sarah-johnson-luxury",
    },
    stats: {
      satisfaction: "99%",
      responseTime: "< 1 hour",
      repeatClients: "75%",
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Metro Commercial Group",
    role: "Commercial Real Estate Broker",
    phone: "+1 (555) 987-6543",
    email: "michael.chen@metrogroup.com",
    experience: "15 Years Experience",
    deals: "200+ Commercial Deals",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    location: "Manhattan, NY",
    verified: true,
    featured: true,
    bio: "Expert in Manhattan commercial real estate with focus on office spaces, retail locations, and mixed-use developments.",
    specialties: ["Office Leasing", "Retail Spaces", "Investment Properties"],
    languages: ["English", "Mandarin", "Cantonese"],
    certification: "CCIM Designation",
    website: "www.metrocommercialgroup.com",
    social: {
      facebook: "michaelchencommercial",
      twitter: "@MichaelChenCRE",
      linkedin: "in/michael-chen-cre",
    },
    stats: {
      satisfaction: "97%",
      responseTime: "< 2 hours",
      repeatClients: "65%",
    },
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    company: "Sunshine Properties",
    role: "Residential & Vacation Homes",
    phone: "+1 (555) 456-7890",
    email: "elena.rodriguez@sunshine.com",
    experience: "8 Years Experience",
    deals: "180+ Properties Sold",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 4.7,
    location: "Miami, FL",
    verified: true,
    featured: true,
    bio: "Specializing in South Florida residential and vacation properties. Expertise in international buyers and waterfront homes.",
    specialties: [
      "Waterfront Homes",
      "Vacation Properties",
      "International Buyers",
    ],
    languages: ["English", "Spanish", "Portuguese"],
    certification: "International Property Specialist",
    website: "www.sunshinepropertiesmiami.com",
    social: {
      facebook: "elenamiamirealty",
      twitter: "@ElenaMiamiHomes",
      linkedin: "in/elena-rodriguez-miami",
    },
    stats: {
      satisfaction: "96%",
      responseTime: "< 3 hours",
      repeatClients: "60%",
    },
  },
  {
    id: 4,
    name: "David Wilson",
    company: "Urban Living Realty",
    role: "First-Time Home Buyer Specialist",
    phone: "+1 (555) 234-5678",
    email: "david.wilson@urbanliving.com",
    experience: "6 Years Experience",
    deals: "120+ First-Time Buyers",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.9,
    location: "Austin, TX",
    verified: true,
    featured: true,
    bio: "Dedicated to helping first-time home buyers navigate the market with comprehensive education and patient guidance.",
    specialties: ["First-Time Buyers", "Starter Homes", "Down Payment Assistance"],
    languages: ["English"],
    certification: "First-Time Home Buyer Certified",
    website: "www.urbanlivingrealty.com",
    social: {
      facebook: "davidwilsonfirsttimehomes",
      twitter: "@DavidFirstHome",
      linkedin: "in/david-wilson-firsttime",
    },
    stats: {
      satisfaction: "100%",
      responseTime: "< 4 hours",
      repeatClients: "55%",
    },
  },
];

const remainingAgents = [
  {
    id: 5,
    name: "Jessica Park",
    company: "Luxe Condo Group",
    role: "High-Rise Condo Expert",
    phone: "+1 (555) 876-5432",
    email: "jessica.park@luxecondo.com",
    experience: "10 Years Experience",
    deals: "250+ Condo Sales",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
    rating: 4.8,
    location: "Chicago, IL",
    verified: true,
    featured: false,
    bio: "Chicago's premier high-rise condo specialist with deep knowledge of downtown luxury buildings and amenities.",
    specialties: ["Luxury Condos", "Penthouse Sales", "Downtown Living"],
    languages: ["English", "Korean"],
    certification: "High-Rise Condo Specialist",
    website: "www.luxecondochicago.com",
    social: {
      facebook: "jessicaparkcondos",
      twitter: "@JessicaParkCondos",
      linkedin: "in/jessica-park-condos",
    },
    stats: {
      satisfaction: "98%",
      responseTime: "< 24 hours",
      repeatClients: "70%",
    },
  },
  {
    id: 6,
    name: "Robert Garcia",
    company: "Tech Hub Realty",
    role: "Silicon Valley Specialist",
    phone: "+1 (555) 345-6789",
    email: "robert.garcia@techhub.com",
    experience: "7 Years Experience",
    deals: "180+ Tech Relocations",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.7,
    location: "San Francisco, CA",
    verified: true,
    featured: false,
    bio: "Specializing in helping tech professionals relocate to Silicon Valley with market insights and quick closings.",
    specialties: ["Tech Relocations", "Startup Offices", "Rental Properties"],
    languages: ["English", "Spanish"],
    certification: "Tech Industry Real Estate Expert",
    website: "www.techhubrealty.com",
    social: {
      facebook: "robertgarciaSF",
      twitter: "@RobertTechSF",
      linkedin: "in/robert-garcia-tech",
    },
    stats: {
      satisfaction: "95%",
      responseTime: "< 3 hours",
      repeatClients: "68%",
    },
  },
  {
    id: 7,
    name: "Olivia Williams",
    company: "Historic Homes Group",
    role: "Historic Property Specialist",
    phone: "+1 (555) 765-4321",
    email: "olivia.williams@historichomes.com",
    experience: "12 Years Experience",
    deals: "90+ Historic Properties",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
    rating: 4.9,
    location: "Charleston, SC",
    verified: true,
    featured: false,
    bio: "Expert in historic home preservation, renovation, and sales with deep knowledge of architectural history.",
    specialties: ["Historic Homes", "Restoration", "Architectural Preservation"],
    languages: ["English"],
    certification: "Historic Property Specialist",
    website: "www.historichomesgroup.com",
    social: {
      facebook: "oliviahistorichomes",
      twitter: "@OliviaHistoric",
      linkedin: "in/olivia-williams-historic",
    },
    stats: {
      satisfaction: "97%",
      responseTime: "< 6 hours",
      repeatClients: "80%",
    },
  },
  {
    id: 8,
    name: "Marcus Johnson",
    company: "Investment Properties Inc",
    role: "Real Estate Investor Advisor",
    phone: "+1 (555) 654-3210",
    email: "marcus.johnson@investmentprop.com",
    experience: "18 Years Experience",
    deals: "500+ Investment Properties",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    rating: 4.8,
    location: "Phoenix, AZ",
    verified: true,
    featured: false,
    bio: "Advising real estate investors on portfolio building, market analysis, and maximizing ROI on investment properties.",
    specialties: ["Rental Properties", "Fix & Flip", "Portfolio Management"],
    languages: ["English"],
    certification: "Certified Real Estate Investor Specialist",
    website: "www.investmentpropertiesinc.com",
    social: {
      facebook: "marcusjohnsoninvestments",
      twitter: "@MarcusInvestRE",
      linkedin: "in/marcus-johnson-investments",
    },
    stats: {
      satisfaction: "94%",
      responseTime: "< 2 hours",
      repeatClients: "85%",
    },
  },
  {
    id: 9,
    name: "Sophie Martin",
    company: "Lakeside Living Realty",
    role: "Lakefront Property Expert",
    phone: "+1 (555) 543-2109",
    email: "sophie.martin@lakeside.com",
    experience: "9 Years Experience",
    deals: "150+ Lakefront Sales",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    rating: 4.6,
    location: "Lake Tahoe, NV",
    verified: true,
    featured: false,
    bio: "Specializing in lakefront properties with expertise in waterfront regulations, dock permits, and mountain living.",
    specialties: ["Lakefront Homes", "Vacation Rentals", "Mountain Properties"],
    languages: ["English", "French"],
    certification: "Waterfront Property Specialist",
    website: "www.lakesidelivingrealty.com",
    social: {
      facebook: "sophiemartinlakefront",
      twitter: "@SophieLakefront",
      linkedin: "in/sophie-martin-lakefront",
    },
    stats: {
      satisfaction: "92%",
      responseTime: "< 48 hours",
      repeatClients: "65%",
    },
  },
  {
    id: 10,
    name: "James Thompson",
    company: "Senior Living Transitions",
    role: "Senior Housing Specialist",
    phone: "+1 (555) 432-1098",
    email: "james.thompson@seniortransitions.com",
    experience: "14 Years Experience",
    deals: "220+ Senior Transitions",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
    rating: 4.9,
    location: "Scottsdale, AZ",
    verified: true,
    featured: false,
    bio: "Helping seniors downsize and transition to retirement communities with compassion and comprehensive services.",
    specialties: ["Senior Downsizing", "Retirement Communities", "Estate Sales"],
    languages: ["English"],
    certification: "Senior Real Estate Specialist",
    website: "www.seniortransitions.com",
    social: {
      facebook: "jamesseniortransitions",
      twitter: "@JamesSeniorHomes",
      linkedin: "in/james-thompson-senior",
    },
    stats: {
      satisfaction: "99%",
      responseTime: "< 5 hours",
      repeatClients: "75%",
    },
  },
  {
    id: 11,
    name: "Aisha Patel",
    company: "Green Building Realty",
    role: "Sustainable Homes Expert",
    phone: "+1 (555) 321-0987",
    email: "aisha.patel@greenbuilding.com",
    experience: "5 Years Experience",
    deals: "80+ Eco-Friendly Homes",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
    rating: 4.7,
    location: "Portland, OR",
    verified: true,
    featured: false,
    bio: "Specializing in energy-efficient, sustainable, and eco-friendly homes with LEED certification expertise.",
    specialties: ["LEED Certified", "Solar Homes", "Sustainable Building"],
    languages: ["English", "Hindi", "Gujarati"],
    certification: "Green Building Certified Professional",
    website: "www.greenbuildingrealty.com",
    social: {
      facebook: "aishagreenhomes",
      twitter: "@AishaGreenHomes",
      linkedin: "in/aisha-patel-green",
    },
    stats: {
      satisfaction: "96%",
      responseTime: "< 4 hours",
      repeatClients: "60%",
    },
  },
  {
    id: 12,
    name: "Daniel Kim",
    company: "Urban Development Group",
    role: "New Construction Specialist",
    phone: "+1 (555) 210-9876",
    email: "daniel.kim@urbandevelopment.com",
    experience: "11 Years Experience",
    deals: "300+ New Construction Sales",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    rating: 4.8,
    location: "Seattle, WA",
    verified: true,
    featured: false,
    bio: "Expert in new construction sales, builder relationships, and helping clients customize their dream homes.",
    specialties: ["New Construction", "Builder Relations", "Custom Homes"],
    languages: ["English", "Korean"],
    certification: "New Construction Specialist",
    website: "www.urbandevelopmentgroup.com",
    social: {
      facebook: "danielkimnewconstruction",
      twitter: "@DanielNewBuilds",
      linkedin: "in/daniel-kim-construction",
    },
    stats: {
      satisfaction: "97%",
      responseTime: "< 8 hours",
      repeatClients: "72%",
    },
  },
];

// Agent Details Modal Component
const AgentDetailsModal = ({ agent, isOpen, onClose }) => {
  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl mx-auto overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <AiOutlineClose className="text-xl text-gray-600" />
          </button>

          {/* Modal Content */}
          <div className="max-h-[90vh] md:max-h-[85vh] overflow-y-auto">
            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-r from-[#27bb97] via-[#2ac9a3] to-[#1fa383] p-4 sm:p-6 md:p-8 text-white relative">
              {/* Decorative Pattern */}
              <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-20 -translate-x-20"></div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 relative z-10">
                {/* Agent Image */}
                <div className="relative mx-auto sm:mx-0 group">
                  <div className="relative">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Online Status Indicator */}
                    <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                  </div>
                </div>

                {/* Agent Basic Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-2">
                      <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                          {agent.name}
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 sm:mt-2">
                          <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                            <HiOutlineOfficeBuilding className="text-base sm:text-lg md:text-xl flex-shrink-0" />
                            <span className="text-sm sm:text-base md:text-lg opacity-90 truncate max-w-[200px] sm:max-w-none">
                              {agent.company}
                            </span>
                          </div>
                          <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                            <HiLocationMarker className="text-base sm:text-lg md:text-xl flex-shrink-0" />
                            <span className="text-sm sm:text-base md:text-lg opacity-90">
                              {agent.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 mx-auto sm:mx-0 mt-2 sm:mt-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-default">
                      <div className="relative">
                        <AiFillStar className="text-yellow-500 text-base sm:text-lg md:text-xl" />
                      </div>
                      <span className="text-base sm:text-lg md:text-xl font-bold">
                        {agent.rating}
                      </span>
                      <span className="text-gray-500 text-sm sm:text-base">
                        /5.0
                      </span>
                    </div>
                  </div>

                  {/* Verification Badge & Role */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 sm:mt-4">
                    {agent.verified && (
                      <div className="inline-flex items-center gap-1 sm:gap-2 bg-white/95 backdrop-blur-sm text-green-700 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base shadow-sm hover:shadow transition-all duration-300 hover:scale-105">
                        <BsCheckCircleFill className="text-green-600" />
                        <span className="font-semibold whitespace-nowrap">
                          Verified Professional
                        </span>
                      </div>
                    )}

                    {/* Role Badge */}
                    <div className="inline-flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm text-white/95 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base border border-white/30">
                      <FaBriefcase className="text-sm" />
                      <span className="font-medium whitespace-nowrap">
                        {agent.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-white to-gray-50/30">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {/* Left Column - About & Contact */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
                  {/* About Section */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="p-2 bg-[#27bb97]/10 rounded-lg">
                        <HiOutlineDocumentText className="text-[#27bb97] text-lg sm:text-xl" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                        About {agent.name.split(" ")[0]}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed md:leading-loose">
                      {agent.bio}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaBriefcase className="text-blue-600 text-lg sm:text-xl" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                        Areas of Expertise
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {agent.specialties?.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 cursor-default"
                        >
                          <AiOutlineCheckCircle className="text-blue-600 text-sm" />
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group cursor-default">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                        {agent.stats?.satisfaction}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Client Satisfaction
                      </div>
                      <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mt-2 sm:mt-3"></div>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group cursor-default">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                        {agent.stats?.responseTime}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Avg. Response Time
                      </div>
                      <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-2 sm:mt-3"></div>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group cursor-default col-span-2 md:col-span-1">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                        {agent.stats?.repeatClients}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Repeat Clients
                      </div>
                      <div className="w-16 h-1 bg-purple-500 rounded-full mx-auto mt-2 sm:mt-3"></div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact & Details */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Contact Card */}
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4 sm:mb-5">
                      <div className="p-2 bg-[#27bb97]/10 rounded-lg">
                        <MdOutlinePhoneInTalk className="text-[#27bb97] text-lg sm:text-xl" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        Contact Details
                      </h3>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {/* Phone */}
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                          <MdOutlinePhoneInTalk className="text-[#27bb97] text-base sm:text-xl" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm text-gray-500 font-medium">
                            Phone
                          </div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base truncate hover:text-clip">
                            {agent.phone}
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                          <AiOutlineMail className="text-blue-600 text-base sm:text-xl" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm text-gray-500 font-medium">
                            Email
                          </div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base truncate hover:text-clip">
                            {agent.email}
                          </div>
                        </div>
                      </div>

                      {/* Website */}
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                          <MdLanguage className="text-purple-600 text-base sm:text-xl" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm text-gray-500 font-medium">
                            Website
                          </div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base truncate hover:text-clip">
                            {agent.website}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Media */}
                    <div className="mt-5 sm:mt-6">
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <FaFacebook className="text-gray-700 text-base" />
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-gray-700">
                          Connect on Social
                        </h4>
                      </div>
                      <div className="flex gap-2 sm:gap-3">
                        {[
                          {
                            icon: FaFacebook,
                            color: "bg-blue-100",
                            hover: "hover:bg-blue-200",
                            text: "text-blue-600",
                          },
                          {
                            icon: FaTwitter,
                            color: "bg-sky-100",
                            hover: "hover:bg-sky-200",
                            text: "text-sky-600",
                          },
                          {
                            icon: FaLinkedin,
                            color: "bg-blue-50",
                            hover: "hover:bg-blue-100",
                            text: "text-blue-700",
                          },
                          {
                            icon: FaWhatsapp,
                            color: "bg-green-100",
                            hover: "hover:bg-green-200",
                            text: "text-green-600",
                          },
                          {
                            icon: FaInstagram,
                            color: "bg-pink-100",
                            hover: "hover:bg-pink-200",
                            text: "text-pink-600",
                          },
                        ].map((social, index) => (
                          <a
                            key={index}
                            href="#"
                            className={`w-9 h-9 sm:w-10 sm:h-10 ${social.color} rounded-full flex items-center justify-center ${social.hover} transition-all duration-300 hover:scale-110 shadow-sm cursor-pointer`}
                          >
                            <social.icon
                              className={`${social.text} text-sm sm:text-base`}
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gradient-to-br from-[#27bb97]/5 to-[#1fa383]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#27bb97]/20 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4 sm:mb-5">
                      <div className="p-2 bg-[#27bb97]/20 rounded-lg">
                        <AiOutlineCalendar className="text-[#27bb97] text-lg sm:text-xl" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        Performance Metrics
                      </h3>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        {
                          icon: AiOutlineCalendar,
                          label: "Experience",
                          value: agent.experience,
                        },
                        {
                          icon: TbBuildingSkyscraper,
                          label: "Properties Closed",
                          value: agent.deals,
                        },
                        {
                          icon: AiOutlineCheckCircle,
                          label: "Certification",
                          value: agent.certification,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                              <item.icon className="text-[#27bb97] text-base sm:text-lg" />
                            </div>
                            <span className="text-gray-700 text-sm sm:text-base font-medium">
                              {item.label}
                            </span>
                          </div>
                          <span className="font-bold text-gray-900 text-sm sm:text-base text-right">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button className="w-full bg-[#27bb97] text-white py-3 sm:py-3.5 rounded-xl hover:bg-[#1fa383] transition-all duration-300 font-medium sm:font-semibold flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                      <MdOutlinePhoneInTalk className="text-base sm:text-xl animate-pulse" />
                      Call Now
                    </button>
                    <button className="w-full bg-white border-2 border-[#27bb97] text-[#27bb97] py-3 sm:py-3.5 rounded-xl hover:bg-[#27bb97] hover:text-white transition-all duration-300 font-medium sm:font-semibold flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                      <MdOutlineMessage className="text-base sm:text-xl" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PropertyExperts() {
  const [showAllAgents, setShowAllAgents] = useState(false);
  const [agents, setAgents] = useState(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewAllAgents = () => {
    if (!showAllAgents) {
      setAgents([...initialAgents, ...remainingAgents]);
    } else {
      setAgents(initialAgents);
    }
    setShowAllAgents(!showAllAgents);
  };

  const handleViewProfile = (agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet Our Property Experts
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Connect with certified real estate professionals who understand your
            needs and guide you through every step
          </p>

          {/* Decorative Line */}
          <div className="flex justify-center mt-4">
            <div className="w-24 h-1.5 bg-[#27bb97] rounded-full"></div>
            <div className="w-3 h-1.5 bg-[#27bb97] rounded-full mx-2"></div>
            <div className="w-8 h-1.5 bg-[#27bb97] rounded-full"></div>
          </div>
        </div>

        {/* Agent Count Badge */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-lg font-semibold text-gray-900">
            Showing <span className="text-[#27bb97]">{agents.length}</span> of{" "}
            {initialAgents.length + remainingAgents.length} Agents
          </div>
          {showAllAgents && (
            <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
              <span className="text-green-600 font-medium">
                {remainingAgents.length} additional agents
              </span>{" "}
              loaded
            </div>
          )}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1 ${
                !agent.featured ? "border-l-4 border-l-[#27bb97]" : ""
              }`}
            >
              {/* Agent Header with Badge */}
              <div className="relative bg-gradient-to-r from-gray-50 to-white p-5">
                {/* Verified Badge - Moved to LEFT side */}
                {agent.verified && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    <BsCheckCircleFill className="text-green-600 text-xs" />
                    <span className="hidden sm:inline">Verified</span>
                  </div>
                )}

                {/* New Agent Badge for remaining agents - Keep in right side */}
                {!agent.featured && (
                  <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    New
                  </div>
                )}

                {/* Agent Profile */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    {/* Online Status Indicator */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-[#27bb97] transition-colors">
                      {agent.name}
                    </h3>

                    <p className="text-sm text-gray-500 truncate mt-1">
                      {agent.company}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <AiFillStar
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(agent.rating)
                                ? "text-yellow-500"
                                : i < agent.rating
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm font-semibold text-gray-900">
                        {agent.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Details */}
              <div className="p-5 pt-3">
                {/* Role Badge */}
                <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full mb-4">
                  <FaBriefcase className="text-xs" />
                  <span className="text-xs font-medium truncate">
                    {agent.role}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {agent.experience.split(" ")[0]}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Years Exp</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {agent.deals.split(" ")[0]}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Deals</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-50 rounded-md">
                      <HiLocationMarker className="text-base text-red-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="font-medium text-gray-900 truncate text-sm">
                        {agent.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-50 rounded-md">
                      <MdOutlinePhoneInTalk className="text-base text-[#27bb97]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="font-medium text-gray-900 truncate text-sm">
                        {agent.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex-1 bg-[#27bb97] text-white py-2.5 rounded-lg hover:bg-[#1fa383] transition-all duration-300 font-medium flex items-center justify-center gap-2 group/btn cursor-pointer text-sm">
                    <MdOutlinePhoneInTalk className="text-base group-hover/btn:animate-pulse" />
                    Contact
                  </button>
                  <button
                    onClick={() => handleViewProfile(agent)}
                    className="px-3 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium cursor-pointer text-sm hover:border-[#27bb97] hover:text-[#27bb97] flex items-center justify-center gap-1"
                  >
                    <HiOutlineDocumentText className="text-sm" />
                    <span>Profile</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {remainingAgents.length > 0 && (
          <div className="mt-16 text-center">
            <button
              onClick={handleViewAllAgents}
              className="px-8 py-3.5 border-2 border-[#27bb97] text-[#27bb97] rounded-xl hover:bg-[#27bb97] hover:text-white transition-all duration-300 font-semibold cursor-pointer flex items-center justify-center gap-3 mx-auto group"
            >
              {showAllAgents ? (
                <>
                  <MdKeyboardArrowUp className="text-xl group-hover:animate-bounce" />
                  Show Less Agents
                </>
              ) : (
                <>
                  View All {remainingAgents.length} Agents
                  <MdKeyboardArrowDown className="text-xl group-hover:animate-bounce" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Agent Details Modal */}
        {selectedAgent && (
          <AgentDetailsModal
            agent={selectedAgent}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}