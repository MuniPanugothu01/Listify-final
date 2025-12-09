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
  FaInstagram
} from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { TbBuildingSkyscraper } from "react-icons/tb";

const initialAgents = [
  {
    id: 1,
    name: "Ravi Kumar",
    company: "RK Realty Services",
    role: "Rental Property Agent",
    phone: "+91 98765 43210",
    email: "ravi.kumar@rkrealty.com",
    experience: "8 Years Experience",
    deals: "250+ Properties Closed",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    location: "Bangalore",
    verified: true,
    featured: true,
    bio: "Specializing in rental properties across Bangalore. Known for excellent client relationships and deep market knowledge.",
    specialties: [
      "Rental Properties",
      "Apartment Leasing",
      "Property Management",
    ],
    languages: ["English", "Hindi", "Kannada"],
    certification: "Certified Real Estate Agent (CREA)",
    website: "www.rkrealty.com",
    social: {
      facebook: "ravi.kumar.realty",
      twitter: "@RaviKRealty",
      linkedin: "in/ravi-kumar-realty",
    },
    stats: {
      satisfaction: "98%",
      responseTime: "< 2 hours",
      repeatClients: "45%",
    },
  },
  {
    id: 2,
    name: "Sunita Mehra",
    company: "DreamHome Properties",
    role: "PG / Room Specialist",
    phone: "+91 99888 11223",
    email: "sunita@dreamhomeproperties.com",
    experience: "5 Years Experience",
    deals: "150+ PG & Rooms Rented",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4.9,
    location: "Hyderabad",
    verified: true,
    featured: true,
    bio: "Expert in PG accommodations and shared living spaces. Focuses on safe and comfortable student housing.",
    specialties: ["PG Accommodations", "Student Housing", "Shared Apartments"],
    languages: ["English", "Hindi", "Telugu"],
    certification: "PG Accommodation Specialist (PGAS)",
    website: "www.dreamhomeproperties.in",
    social: {
      facebook: "sunita.dreamhome",
      twitter: "@SunitaPGExpert",
      linkedin: "in/sunita-mehra-pg",
    },
    stats: {
      satisfaction: "99%",
      responseTime: "< 1 hour",
      repeatClients: "60%",
    },
  },
  {
    id: 3,
    name: "Amit Sharma",
    company: "Skyline Realtors",
    role: "Real Estate Consultant",
    phone: "+91 90909 22334",
    email: "amit.sharma@skyline.com",
    experience: "10 Years Experience",
    deals: "400+ Property Deals Closed",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 5.0,
    location: "Chennai",
    verified: true,
    featured: true,
    bio: "Comprehensive real estate services including buying, selling, and investment advisory. 10+ years of market expertise.",
    specialties: [
      "Property Investment",
      "Commercial Real Estate",
      "Legal Documentation",
    ],
    languages: ["English", "Hindi", "Tamil"],
    certification: "Certified Real Estate Consultant (CREC)",
    website: "www.skylinerealtors.co.in",
    social: {
      facebook: "amit.sharma.realtor",
      twitter: "@AmitSharmaRE",
      linkedin: "in/amit-sharma-realtor",
    },
    stats: {
      satisfaction: "100%",
      responseTime: "< 3 hours",
      repeatClients: "70%",
    },
  },
  {
    id: 4,
    name: "Priya Singh",
    company: "Urban Nest Properties",
    role: "Commercial Property Specialist",
    phone: "+91 88776 55443",
    email: "priya.singh@urbannest.com",
    experience: "6 Years Experience",
    deals: "180+ Commercial Deals",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.7,
    location: "Mumbai",
    verified: true,
    featured: true,
    bio: "Expert in commercial real estate including office spaces, retail outlets, and industrial properties.",
    specialties: ["Office Spaces", "Retail Properties", "Warehouse Leasing"],
    languages: ["English", "Hindi", "Marathi"],
    certification: "Commercial Real Estate Expert (CREE)",
    website: "www.urbannestproperties.com",
    social: {
      facebook: "priya.singh.commercial",
      twitter: "@PriyaSinghComm",
      linkedin: "in/priya-singh-commercial",
    },
    stats: {
      satisfaction: "96%",
      responseTime: "< 4 hours",
      repeatClients: "50%",
    },
  },
];

const remainingAgents = [
  {
    id: 5,
    name: "Vikram Patel",
    company: "Prime Realty Group",
    role: "Luxury Homes Consultant",
    phone: "+91 77665 44332",
    email: "vikram@primerealty.com",
    experience: "12 Years Experience",
    deals: "300+ Luxury Properties",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4.9,
    location: "Delhi",
    verified: true,
    featured: false,
    bio: "Specialized in luxury residential properties, villas, and high-end apartments in premium locations.",
    specialties: ["Luxury Villas", "Premium Apartments", "Gated Communities"],
    languages: ["English", "Hindi", "Gujarati"],
    certification: "Luxury Real Estate Specialist (LRES)",
    website: "www.primerealtygroup.in",
    social: {
      facebook: "vikram.patel.luxury",
      twitter: "@VikramLuxuryRE",
      linkedin: "in/vikram-patel-luxury",
    },
    stats: {
      satisfaction: "97%",
      responseTime: "< 24 hours",
      repeatClients: "65%",
    },
  },
  {
    id: 6,
    name: "Anjali Reddy",
    company: "Urban Spaces",
    role: "Apartment Specialist",
    phone: "+91 99887 77665",
    email: "anjali@urbanspaces.com",
    experience: "7 Years Experience",
    deals: "220+ Apartment Sales",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 4.7,
    location: "Hyderabad",
    verified: true,
    featured: false,
    bio: "Expert in apartment sales and purchases across Hyderabad's prime locations. Known for transparent dealings.",
    specialties: ["Apartment Sales", "Residential Projects", "Home Loans"],
    languages: ["English", "Hindi", "Telugu"],
    certification: "Certified Apartment Specialist (CAS)",
    website: "www.urbanspaces.in",
    social: {
      facebook: "anjali.urbanspaces",
      twitter: "@AnjaliApartments",
      linkedin: "in/anjali-reddy-apartments",
    },
    stats: {
      satisfaction: "95%",
      responseTime: "< 3 hours",
      repeatClients: "55%",
    },
  },
  {
    id: 7,
    name: "Rajesh Verma",
    company: "Commercial Realty Solutions",
    role: "Commercial Property Expert",
    phone: "+91 88999 00112",
    email: "rajesh@commercialrealty.com",
    experience: "15 Years Experience",
    deals: "180+ Commercial Deals",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 4.8,
    location: "Mumbai",
    verified: true,
    featured: false,
    bio: "Specialist in commercial properties including office spaces, retail outlets, and industrial properties across Mumbai.",
    specialties: ["Office Spaces", "Retail Properties", "Warehouse Leasing"],
    languages: ["English", "Hindi", "Marathi"],
    certification: "Commercial Real Estate Professional (CREP)",
    website: "www.commercialrealty.in",
    social: {
      facebook: "rajesh.verma.commercial",
      twitter: "@RajeshCommercial",
      linkedin: "in/rajesh-verma-commercial",
    },
    stats: {
      satisfaction: "96%",
      responseTime: "< 6 hours",
      repeatClients: "60%",
    },
  },
  {
    id: 8,
    name: "Neha Gupta",
    company: "Student Housing Solutions",
    role: "Student Accommodation Specialist",
    phone: "+91 90988 77665",
    email: "neha@studenthousing.com",
    experience: "5 Years Experience",
    deals: "150+ Student PG Deals",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 4.9,
    location: "Pune",
    verified: true,
    featured: false,
    bio: "Dedicated to finding safe and comfortable accommodation for students near educational institutions.",
    specialties: ["Student PG", "Hostel Facilities", "Shared Accommodations"],
    languages: ["English", "Hindi", "Marathi"],
    certification: "Student Housing Specialist (SHS)",
    website: "www.studenthousingsolutions.in",
    social: {
      facebook: "neha.gupta.studenthousing",
      twitter: "@NehaStudentHomes",
      linkedin: "in/neha-gupta-studenthousing",
    },
    stats: {
      satisfaction: "98%",
      responseTime: "< 2 hours",
      repeatClients: "70%",
    },
  },
  {
    id: 9,
    name: "Sanjay Malhotra",
    company: "Heritage Properties",
    role: "Villa & Farmhouse Expert",
    phone: "+91 98700 11223",
    email: "sanjay@heritageproperties.com",
    experience: "18 Years Experience",
    deals: "250+ Luxury Villas",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 5.0,
    location: "Goa",
    verified: true,
    featured: false,
    bio: "Expert in luxury villas, farmhouses, and beachfront properties. Specializes in high-end residential properties.",
    specialties: ["Beach Villas", "Farmhouses", "Premium Residences"],
    languages: ["English", "Hindi", "Konkani"],
    certification: "Luxury Property Specialist (LPS)",
    website: "www.heritagepropertiesgoa.com",
    social: {
      facebook: "sanjay.heritageproperties",
      twitter: "@SanjayLuxuryVillas",
      linkedin: "in/sanjay-malhotra-villas",
    },
    stats: {
      satisfaction: "99%",
      responseTime: "< 48 hours",
      repeatClients: "75%",
    },
  },
  {
    id: 10,
    name: "Arun Joshi",
    company: "Metro Realty",
    role: "Property Investment Consultant",
    phone: "+91 87654 32109",
    email: "arun@metrorealty.com",
    experience: "10 Years Experience",
    deals: "300+ Investment Properties",
    image: "https://randomuser.me/api/portraits/men/88.jpg",
    rating: 4.6,
    location: "Bangalore",
    verified: true,
    featured: false,
    bio: "Helping clients make smart property investment decisions with market analysis and strategic planning.",
    specialties: ["Property Investment", "Market Analysis", "Portfolio Management"],
    languages: ["English", "Hindi", "Kannada"],
    certification: "Certified Investment Property Advisor (CIPA)",
    website: "www.metrorealty.in",
    social: {
      facebook: "arun.joshi.investments",
      twitter: "@ArunPropertyInvest",
      linkedin: "in/arun-joshi-investments",
    },
    stats: {
      satisfaction: "94%",
      responseTime: "< 5 hours",
      repeatClients: "65%",
    },
  },
  {
    id: 11,
    name: "Meera Nair",
    company: "Green Living Properties",
    role: "Eco-friendly Homes Specialist",
    phone: "+91 76543 21098",
    email: "meera@greenliving.com",
    experience: "6 Years Experience",
    deals: "120+ Green Projects",
    image: "https://randomuser.me/api/portraits/women/88.jpg",
    rating: 4.8,
    location: "Chennai",
    verified: true,
    featured: false,
    bio: "Specializing in eco-friendly and sustainable housing solutions with focus on energy efficiency.",
    specialties: ["Green Buildings", "Sustainable Homes", "Energy Efficient Properties"],
    languages: ["English", "Hindi", "Tamil"],
    certification: "Green Building Specialist (GBS)",
    website: "www.greenlivingproperties.in",
    social: {
      facebook: "meera.greenliving",
      twitter: "@MeeraGreenHomes",
      linkedin: "in/meera-nair-greenliving",
    },
    stats: {
      satisfaction: "96%",
      responseTime: "< 4 hours",
      repeatClients: "58%",
    },
  },
  {
    id: 12,
    name: "Karan Khanna",
    company: "Prime Location Realtors",
    role: "Commercial Space Consultant",
    phone: "+91 65432 10987",
    email: "karan@primelocation.com",
    experience: "14 Years Experience",
    deals: "400+ Commercial Spaces",
    image: "https://randomuser.me/api/portraits/men/99.jpg",
    rating: 4.9,
    location: "Gurgaon",
    verified: true,
    featured: false,
    bio: "Expert in commercial real estate with focus on prime business locations and corporate office spaces.",
    specialties: ["Corporate Offices", "Business Centers", "Retail Plazas"],
    languages: ["English", "Hindi", "Punjabi"],
    certification: "Commercial Space Expert (CSE)",
    website: "www.primelocationrealtors.com",
    social: {
      facebook: "karan.primelocation",
      twitter: "@KaranCommercial",
      linkedin: "in/karan-khanna-commercial",
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
                      <span className="text-base sm:text-lg md:text-xl font-bold">{agent.rating}</span>
                      <span className="text-gray-500 text-sm sm:text-base">/5.0</span>
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
                      <span className="font-medium whitespace-nowrap">{agent.role}</span>
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
                      <div className="text-xs sm:text-sm text-gray-600">Client Satisfaction</div>
                      <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mt-2 sm:mt-3"></div>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group cursor-default">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                        {agent.stats?.responseTime}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Avg. Response Time</div>
                      <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-2 sm:mt-3"></div>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group cursor-default col-span-2 md:col-span-1">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                        {agent.stats?.repeatClients}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Repeat Clients</div>
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
                          <div className="text-xs sm:text-sm text-gray-500 font-medium">Phone</div>
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
                          <div className="text-xs sm:text-sm text-gray-500 font-medium">Email</div>
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
                          <div className="text-xs sm:text-sm text-gray-500 font-medium">Website</div>
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
                          { icon: FaFacebook, color: "bg-blue-100", hover: "hover:bg-blue-200", text: "text-blue-600" },
                          { icon: FaTwitter, color: "bg-sky-100", hover: "hover:bg-sky-200", text: "text-sky-600" },
                          { icon: FaLinkedin, color: "bg-blue-50", hover: "hover:bg-blue-100", text: "text-blue-700" },
                          { icon: FaWhatsapp, color: "bg-green-100", hover: "hover:bg-green-200", text: "text-green-600" },
                          { icon: FaInstagram, color: "bg-pink-100", hover: "hover:bg-pink-200", text: "text-pink-600" }
                        ].map((social, index) => (
                          <a
                            key={index}
                            href="#"
                            className={`w-9 h-9 sm:w-10 sm:h-10 ${social.color} rounded-full flex items-center justify-center ${social.hover} transition-all duration-300 hover:scale-110 shadow-sm cursor-pointer`}
                          >
                            <social.icon className={`${social.text} text-sm sm:text-base`} />
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
                        { icon: AiOutlineCalendar, label: "Experience", value: agent.experience },
                        { icon: TbBuildingSkyscraper, label: "Properties Closed", value: agent.deals },
                        { icon: AiOutlineCheckCircle, label: "Certification", value: agent.certification }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                              <item.icon className="text-[#27bb97] text-base sm:text-lg" />
                            </div>
                            <span className="text-gray-700 text-sm sm:text-base font-medium">{item.label}</span>
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

export default function PropertyAgents() {
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