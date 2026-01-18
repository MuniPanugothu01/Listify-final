import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaClock, FaCalendarAlt, FaUsers, FaGlobe, FaFileAlt, FaBookmark, FaShareAlt, FaCheckCircle, FaExternalLinkAlt, FaBuilding, FaEnvelope, FaPhone, FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaHeart, FaIndustry, FaUserTie, FaGraduationCap, FaLaptopCode, FaChartLine, FaHandshake, FaMedal, FaAward, FaCertificate, FaStar, FaRegBookmark } from "react-icons/fa";
import { HiOutlineOfficeBuilding, HiOutlineLocationMarker, HiOutlineCurrencyDollar, HiOutlineCalendar, HiOutlineUserGroup, HiOutlineGlobe, HiOutlineDocumentText, HiOutlineShare, HiOutlineExternalLink } from "react-icons/hi";
import { BsFillBookmarkFill, BsFillHeartFill, BsFillShareFill, BsFillTelephoneFill, BsGlobe } from "react-icons/bs";
import { MdEmail, MdLocationOn, MdWork, MdAccessTime, MdAttachMoney, MdCalendarToday, MdPeople, MdPublic, MdDescription, MdShare, MdOpenInNew, MdBusiness, MdPhone, MdLink, MdCheckCircle } from "react-icons/md";
import { RiShareBoxLine, RiLinkedinBoxFill, RiFacebookBoxFill, RiTwitterFill, RiInstagramFill } from "react-icons/ri";
import { TbBuilding, TbMapPin, TbCurrencyDollar, TbCalendar, TbUsers, TbWorld, TbFileDescription, TbShare, TbExternalLink } from "react-icons/tb";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Mock job data
  const job = {
    id: parseInt(id),
    title: "Senior UX Designer",
    company: "Google",
    logo: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png",
    location: "San Francisco, CA",
    experience: "5+ Years",
    jobType: "Full-Time",
    salary: "$130k - $160k",
    postedDays: 1,
    featured: true,
    remoteType: "Hybrid",
    description: `Lead UX design initiatives for consumer products used by billions. Expertise in user research and prototyping required. We're looking for a talented Senior UX Designer to join our team and help shape the future of our products.`,
    
    fullDescription: `# About the Role

As a Senior UX Designer at Google, you'll be responsible for leading design initiatives for our consumer products. You'll work on challenging problems and create solutions that are both beautiful and functional.

## Key Responsibilities:
- Lead UX design projects from concept to completion
- Conduct user research and usability studies
- Create wireframes, prototypes, and high-fidelity designs
- Collaborate with cross-functional teams
- Mentor junior designers
- Present design concepts to stakeholders
- Stay updated with design trends and best practices

## Requirements:
- 5+ years of experience in UX design
- Strong portfolio showcasing UX/UI design work
- Expertise in Figma, Sketch, or Adobe Creative Suite
- Experience with user research methodologies
- Excellent communication and presentation skills
- Bachelor's degree in Design, HCI, or related field
- Experience in consumer product design preferred

## What We Offer:
- Competitive salary and benefits
- Flexible work arrangements
- Health, dental, and vision insurance
- 401(k) matching
- Professional development opportunities
- Collaborative work environment
- State-of-the-art facilities

## Location:
This position is based in our San Francisco office with a hybrid work model (3 days in office, 2 days remote).`,
    
    companyDescription: `Google is a global technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. Founded in 1998, Google has grown to become one of the world's most valuable companies.`,
    
    requirements: [
      "5+ years of UX design experience",
      "Bachelor's degree in Design or related field",
      "Strong portfolio of design work",
      "Proficiency in Figma/Sketch",
      "Excellent communication skills",
      "Experience with user research",
    ],
    
    benefits: [
      "Competitive salary & bonuses",
      "Comprehensive health insurance",
      "401(k) with company matching",
      "Flexible work hours",
      "Remote work options",
      "Professional development",
      "Generous paid time off",
      "Wellness programs & gym membership",
      "Stock options",
      "Parental leave",
    ],
    
    skills: [
      "UX/UI Design",
      "User Research",
      "Figma",
      "Prototyping",
      "Wireframing",
      "Design Systems",
      "HTML/CSS",
      "JavaScript",
      "Responsive Design",
    ],
    
    applyLink: "https://careers.google.com/jobs",
    
    similarJobs: [
      {
        id: 2,
        title: "Product Designer",
        company: "Opshub",
        location: "Chicago, IL",
        salary: "$44k - $52k",
        type: "Full-Time",
        remoteType: "Hybrid",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCFmOvdnTVlnU5kwoLvh9bOObbPi7qaSnChg&s"
      },
      {
        id: 5,
        title: "UI/UX Designer",
        company: "Airbnb",
        location: "Austin, TX",
        salary: "$95k - $115k",
        type: "Full-Time",
        remoteType: "Remote",
        logo: "https://logos-world.net/wp-content/uploads/2020/09/Airbnb-Logo.png"
      },
      {
        id: 13,
        title: "Brand Designer",
        company: "Nike",
        location: "Portland, OR",
        salary: "$90k - $110k",
        type: "Full-Time",
        remoteType: "Hybrid",
        logo: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png"
      },
    ],
    
    stats: {
      applications: 1245,
      views: 8756,
      daysLeft: 14,
      successRate: 85
    }
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  const handleApplyNow = () => {
    window.open(job.applyLink, "_blank");
  };

  const handleQuickApply = () => {
    alert("Quick Apply feature would open here!");
  };

  const shareJob = (platform) => {
    const url = window.location.href;
    const text = `Check out this job: ${job.title} at ${job.company}`;
    
    switch(platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    }
  };

  const TabButton = ({ label, icon: Icon, tabName }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        activeTab === tabName
          ? "bg-[#27bb97] text-white shadow-lg"
          : "text-gray-600 hover:text-[#27bb97] hover:bg-gray-50"
      }`}
    >
      <Icon className={`w-5 h-5 mr-2 ${activeTab === tabName ? 'text-white' : 'text-gray-400'}`} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">
      {/* Header Navigation */}
      <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center px-4 py-2.5 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
            >
              <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Jobs</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveJob}
                className={`flex items-center px-5 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isSaved
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {isSaved ? (
                  <>
                    <FaHeart className="w-4 h-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <FaRegBookmark className="w-4 h-4 mr-2" />
                    Save Job
                  </>
                )}
              </button>
              
              <button
                onClick={() => shareJob()}
                className="flex items-center px-5 py-2.5 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-300 font-medium"
              >
                <FaShareAlt className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className=" px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-100 p-4 shadow-lg flex items-center justify-center">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {job.featured && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-sm">
                        <FaStar className="w-3 h-3 mr-1.5" />
                        FEATURED
                      </span>
                    )}
                    <span className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                      <MdWork className="w-3 h-3 mr-1.5" />
                      {job.remoteType}
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                      <FaBriefcase className="w-3 h-3 mr-1.5" />
                      {job.jobType}
                    </span>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center text-gray-700">
                      <TbBuilding className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="font-semibold text-lg">{job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <TbMapPin className="w-5 h-5 text-gray-500 mr-2" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {job.description}
                  </p>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaUserTie className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Experience</p>
                      <p className="font-bold text-gray-900 text-lg">{job.experience}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaClock className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Job Type</p>
                      <p className="font-bold text-gray-900 text-lg">{job.jobType}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaDollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Salary</p>
                      <p className="font-bold text-gray-900 text-lg">{job.salary}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaCalendarAlt className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Posted</p>
                      <p className="font-bold text-gray-900 text-lg">{job.postedDays} days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex flex-wrap gap-3 mb-8">
                <TabButton label="Description" icon={FaFileAlt} tabName="description" />
                <TabButton label="Requirements" icon={FaCheckCircle} tabName="requirements" />
                <TabButton label="Benefits" icon={FaMedal} tabName="benefits" />
                <TabButton label="Company" icon={FaBuilding} tabName="company" />
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === "description" && (
                  <div className="space-y-6">
                    <div className="prose max-w-none">
                      <div className="text-gray-700 leading-relaxed space-y-4">
                        {job.fullDescription.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className="text-lg">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                    
                    {/* Skills Section */}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <FaLaptopCode className="w-6 h-6 text-[#27bb97] mr-3" />
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-xl text-sm font-semibold border border-gray-200 hover:border-[#27bb97] transition-colors cursor-pointer"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "requirements" && (
                  <div className="space-y-6">
                    <ul className="space-y-4">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <MdCheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-lg">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "benefits" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                        <FaAward className="w-6 h-6 text-green-600 mr-4" />
                        <span className="text-gray-800 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "company" && (
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {job.companyDescription}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                      <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl">
                        <FaUsers className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">Team Size</p>
                        <p className="text-2xl font-bold text-gray-900">500+</p>
                      </div>
                      
                      <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl">
                        <FaGlobe className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">Location</p>
                        <p className="text-2xl font-bold text-gray-900">Global</p>
                      </div>
                      
                      <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl">
                        <FaIndustry className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">Industry</p>
                        <p className="text-2xl font-bold text-gray-900">Technology</p>
                      </div>
                      
                      <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl">
                        <FaCalendarAlt className="w-8 h-8 text-rose-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">Founded</p>
                        <p className="text-2xl font-bold text-gray-900">1998</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Apply Now Card */}
            <div className="bg-gradient-to-br from-[#27bb97] via-[#1fa987] to-[#189e7d] rounded-2xl shadow-2xl p-8 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 translate-y-12"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                <p className="mb-6 text-white/90">
                  This position has {job.postedDays === 1 ? "just been posted" : `been posted ${job.postedDays} days ago`}. Don't miss this opportunity!
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={handleApplyNow}
                    className="w-full bg-white text-[#27bb97] font-bold py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl flex items-center justify-center group"
                  >
                    <FaExternalLinkAlt className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    Apply on Company Website
                  </button>
                  
                  <button
                    onClick={handleQuickApply}
                    className="w-full bg-transparent border-2 border-white/30 text-white font-semibold py-4 rounded-xl hover:bg-white/10 transition-all duration-300 hover:border-white/60"
                  >
                    Quick Apply
                  </button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm opacity-90 mb-4">Share this job:</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => shareJob('linkedin')}
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => shareJob('twitter')}
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => shareJob('facebook')}
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      <FaFacebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => shareJob()}
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      <FaShareAlt className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaEnvelope className="w-5 h-5 text-[#27bb97] mr-3" />
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex items-center p-3 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mr-4">
                    <MdEmail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <a href="mailto:careers@google.com" className="font-semibold text-gray-900 hover:text-[#27bb97] transition-colors">
                      careers@google.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center mr-4">
                    <MdPhone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <p className="font-semibold text-gray-900">+1 (650) 253-0000</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center mr-4">
                    <FaGlobe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Website</p>
                    <a
                      href="https://www.google.com/careers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#27bb97] hover:underline flex items-center"
                    >
                      google.com/careers
                      <FaExternalLinkAlt className="w-3 h-3 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaBriefcase className="w-5 h-5 text-[#27bb97] mr-3" />
                Similar Jobs
              </h3>
              <div className="space-y-4">
                {job.similarJobs.map((similarJob) => (
                  <div
                    key={similarJob.id}
                    onClick={() => navigate(`/job-details/${similarJob.id}`)}
                    className="p-4 border border-gray-200 rounded-xl hover:border-[#27bb97] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                        <img src={similarJob.logo} alt={similarJob.company} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-[#27bb97] transition-colors">
                              {similarJob.title}
                            </h4>
                            <p className="text-sm text-gray-600">{similarJob.company}</p>
                          </div>
                          <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded">
                            {similarJob.remoteType}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 space-x-3">
                          <span className="flex items-center">
                            <TbMapPin className="w-3 h-3 mr-1" />
                            {similarJob.location}
                          </span>
                          <span>•</span>
                          <span>{similarJob.salary}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3.5 text-center text-[#27bb97] hover:text-[#1fa987] font-semibold border-2 border-dashed border-gray-300 rounded-xl hover:border-[#27bb97] transition-all duration-300 hover:shadow-sm"
                >
                  View All Jobs
                </button>
              </div>
            </div>

            {/* Job Insights */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FaChartLine className="w-5 h-5 text-[#27bb97] mr-3" />
                Job Insights
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Applications</span>
                  <span className="font-bold text-lg">{job.stats.applications.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Views</span>
                  <span className="font-bold text-lg">{job.stats.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Days Left</span>
                  <span className="font-bold text-lg">{job.stats.daysLeft}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="font-bold text-lg text-green-400">{job.stats.successRate}%</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#27bb97]/20 to-[#1fa987]/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-[#27bb97]/30">
                      <FaHandshake className="w-8 h-8 text-[#27bb97]" />
                    </div>
                    <p className="text-sm text-gray-300">High Demand Position</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <FaCertificate className="w-8 h-8 text-[#27bb97] mr-3" />
              <span className="text-xl font-bold">Job Portal Pro</span>
            </div>
            <p className="text-gray-300">
              © {new Date().getFullYear()} Job Portal. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              This is a professional job details page. Apply directly through the company's website for best results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobDetailsPage;