import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaUser,
  FaChevronDown,
  FaTimes,
  FaClock,
  FaInfoCircle,
  FaCheckCircle,
  FaStar,
  FaFilter,
} from "react-icons/fa";

export default function JobSeekerResumesDetail() {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [openJobRole, setOpenJobRole] = useState(true);
  const [openSkills, setOpenSkills] = useState(true);
  const [openEducation, setOpenEducation] = useState(true);
  const [openJobType, setOpenJobType] = useState(true);
  const [openDatePosted, setOpenDatePosted] = useState(true);
  const [openIndustry, setOpenIndustry] = useState(true);
  const [openExperience, setOpenExperience] = useState(true);
  const [openWorkAuthorization, setOpenWorkAuthorization] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false); // NEW: Mobile filter drawer state

  // New states for view more functionality
  const [visibleJobs, setVisibleJobs] = useState(6); // Changed to show only 6 initially
  const [loading, setLoading] = useState(false);
  const [allJobSeekers, setAllJobSeekers] = useState([]);

  // JSON data for job seekers (extended with descriptions and 10 entries)
  const jobSeekersData = [
    {
      id: 1,
      name: "Md xxxxxx",
      role: "Business Analyst",
      location: "Los Angeles",
      experience: "10 Years",
      education: "Master",
      category: "IT Software / Services",
      skills:
        "Predictive Analytics, Predictive Modeling, Business Analytics, Machine Learning, Fraud Detection, Design Patent, Apt,",
      featured: true,
      image: "https://i.pravatar.cc/150?img=1",
      description:
        "Senior Business Analyst with extensive experience in data-driven decision making and process optimization for enterprise clients.",
    },
    {
      id: 2,
      name: "Keyxxxxxx",
      role: "Senior Associate",
      location: "Barrington",
      experience: "8 Years",
      education: "Bachelor",
      category: "Finance",
      skills: "Financial Analysis, Risk Management, Portfolio Management",
      featured: true,
      image: "https://i.pravatar.cc/150?img=2",
      description:
        "Finance professional specializing in investment analysis and risk assessment for portfolio management.",
    },
    {
      id: 3,
      name: "John Doe",
      role: "Software Engineer",
      location: "San Francisco",
      experience: "5 Years",
      education: "Bachelor",
      category: "IT Software / Services",
      skills: "React.js, Node.js, Python, AWS, Docker, Kubernetes",
      featured: false,
      image: "https://i.pravatar.cc/150?img=3",
      description:
        "Full-stack developer experienced in building scalable web applications and cloud-based solutions.",
    },
    {
      id: 4,
      name: "Jane Smith",
      role: "Data Scientist",
      location: "New York",
      experience: "7 Years",
      education: "PhD",
      category: "Data Science",
      skills:
        "Python, Machine Learning, Deep Learning, SQL, TensorFlow, PyTorch",
      featured: true,
      image: "https://i.pravatar.cc/150?img=4",
      description:
        "PhD Data Scientist with expertise in machine learning algorithms and big data analytics.",
    },
    {
      id: 5,
      name: "Robert Johnson",
      role: "Project Manager",
      location: "Chicago",
      experience: "12 Years",
      education: "Master",
      category: "Management",
      skills: "Agile, Scrum, Risk Management, Team Leadership, Budget Planning",
      featured: false,
      image: "https://i.pravatar.cc/150?img=5",
      description:
        "Certified PMP with proven track record in delivering complex projects on time and within budget.",
    },
    {
      id: 6,
      name: "Sarah Williams",
      role: "UX Designer",
      location: "Seattle",
      experience: "4 Years",
      education: "Bachelor",
      category: "Design",
      skills: "Figma, Sketch, User Research, Prototyping, Wireframing",
      featured: false,
      image: "https://i.pravatar.cc/150?img=6",
      description:
        "Creative UX designer focused on creating intuitive user experiences and beautiful interfaces.",
    },
    {
      id: 7,
      name: "Michael Brown",
      role: "DevOps Engineer",
      location: "Austin",
      experience: "6 Years",
      education: "Bachelor",
      category: "IT Software / Services",
      skills: "AWS, Docker, Kubernetes, Jenkins, Terraform, Linux",
      featured: true,
      image: "https://i.pravatar.cc/150?img=7",
      description:
        "DevOps specialist with expertise in cloud infrastructure and CI/CD pipeline optimization.",
    },
    {
      id: 8,
      name: "Emily Davis",
      role: "Marketing Manager",
      location: "Boston",
      experience: "9 Years",
      education: "Master",
      category: "Marketing",
      skills:
        "Digital Marketing, SEO, Social Media, Content Strategy, Analytics",
      featured: false,
      image: "https://i.pravatar.cc/150?img=8",
      description:
        "Strategic marketing leader with expertise in digital campaigns and brand development.",
    },
    {
      id: 9,
      name: "David Wilson",
      role: "Financial Analyst",
      location: "Houston",
      experience: "7 Years",
      education: "Master",
      category: "Finance",
      skills:
        "Financial Modeling, Investment Analysis, Excel, Bloomberg Terminal",
      featured: true,
      image: "https://i.pravatar.cc/150?img=9",
      description:
        "Financial analyst with strong background in investment research and financial modeling.",
    },
    {
      id: 10,
      name: "Lisa Anderson",
      role: "HR Manager",
      location: "Phoenix",
      experience: "11 Years",
      education: "Master",
      category: "Human Resources",
      skills:
        "Recruitment, Employee Relations, Talent Management, HR Compliance",
      featured: false,
      image: "https://i.pravatar.cc/150?img=10",
      description:
        "HR professional experienced in talent acquisition and employee development programs.",
    },
  ];

  // Filter data arrays
  const jobRoles = [
    "Business Analyst",
    "Administrative assistant",
    "Data Analyst",
    "Software Engineer",
    "Accountant",
    "Cashier",
    "Receptionist",
    "Office Assistant",
    "Project Manager",
    "Marketing Manager",
    "Sales Executive",
    "HR Manager",
    "Graphic Designer",
    "Web Developer",
  ];

  const skills = [
    { label: "React.js", count: 89 },
    { label: "Node.js", count: 67 },
    { label: "Python", count: 120 },
    { label: "Java", count: 78 },
    { label: "SQL", count: 145 },
    { label: "AWS", count: 56 },
    { label: "UI/UX Design", count: 45 },
    { label: "Project Management", count: 67 },
    { label: "Data Analysis", count: 92 },
    { label: "Machine Learning", count: 48 },
  ];

  const educationLevels = [
    { label: "High School", count: 45 },
    { label: "Associate Degree", count: 67 },
    { label: "Bachelor's Degree", count: 156 },
    { label: "Master's Degree", count: 89 },
    { label: "PhD", count: 23 },
  ];

  const jobTypes = [
    { label: "Full Time", count: 166 },
    { label: "Part Time", count: 32 },
    { label: "Contract", count: 48 },
    { label: "Internship", count: 61 },
    { label: "Freelance", count: 7 },
  ];

  const datePostedOptions = [
    { label: "Last 24 hours", count: 12 },
    { label: "Last 3 days", count: 45 },
    { label: "Last week", count: 89 },
    { label: "Last month", count: 156 },
    { label: "Any time", count: 286 },
  ];

  const industries = [
    { label: "IT & Software", count: 120 },
    { label: "Finance & Banking", count: 67 },
    { label: "Healthcare", count: 45 },
    { label: "Education", count: 28 },
    { label: "Marketing", count: 32 },
    { label: "Retail", count: 41 },
    { label: "Manufacturing", count: 23 },
    { label: "Construction", count: 19 },
  ];

  const experienceLevels = [
    { label: "Entry Level (0-2 years)", count: 105 },
    { label: "Mid Level (3-5 years)", count: 89 },
    { label: "Senior Level (6-10 years)", count: 56 },
    { label: "Executive (10+ years)", count: 36 },
  ];

  const workAuthorizationOptions = [
    { label: "US Citizen", count: 156 },
    { label: "Green Card", count: 45 },
    { label: "H1B Visa", count: 67 },
    { label: "OPT/CPT", count: 23 },
    { label: "Other Visa", count: 19 },
  ];

  // job applicants data
  const applicants = [
    { title: "Staff Assistant", time: "16 hrs ago", location: "Raleigh, NC" },
    { title: "Administrator", time: "16 hrs ago", location: "Apex, NC" },
    { title: "Pharmacist", time: "16 hrs ago", location: "Plano, TX" },
    { title: "Care Assistant", time: "17 hrs ago", location: "Rockville, MD" },
    {
      title: "Administrative Assistant",
      time: "18 hrs ago",
      location: "Duluth, GA",
    },
    { title: "Cashier", time: "18 hrs ago", location: "Kendall Park, NJ" },
    { title: "Tutor", time: "1 day ago", location: "Celina, TX" },
  ];

  // job seekers profiles data (10 items)
  const profiles = [
    {
      title: "Administrator",
      updatedTime: "1 hour ago",
      location: "San Jose, CA",
      verified: true,
      rating: 4.8,
    },
    {
      title: "Hotel Chef",
      updatedTime: "9 hrs ago",
      location: "Denver, CO",
      verified: true,
      rating: 4.5,
    },
    {
      title: "Process Analyst",
      updatedTime: "10 hrs ago",
      location: "Mount Prospect",
      verified: false,
      rating: 4.2,
    },
    {
      title: "Python Developer",
      updatedTime: "10 hrs ago",
      location: "Chicago, IL",
      verified: true,
      rating: 4.9,
    },
    {
      title: "Beauty Advisor",
      updatedTime: "11 hrs ago",
      location: "North Bergen, NJ",
      verified: false,
      rating: 4.0,
    },
    {
      title: "Front Desk Agent",
      updatedTime: "14 hrs ago",
      location: "Hayward, CA",
      verified: true,
      rating: 4.7,
    },
    {
      title: "Cashier",
      updatedTime: "15 hrs ago",
      location: "Kendall Park",
      verified: true,
      rating: 4.3,
    },
    {
      title: "Data Analyst",
      updatedTime: "2 hrs ago",
      location: "New York, NY",
      verified: true,
      rating: 4.6,
    },
    {
      title: "Graphic Designer",
      updatedTime: "5 hrs ago",
      location: "Los Angeles, CA",
      verified: false,
      rating: 4.1,
    },
    {
      title: "Project Manager",
      updatedTime: "7 hrs ago",
      location: "Seattle, WA",
      verified: true,
      rating: 4.8,
    },
  ];

  // Initialize data on component mount
  useEffect(() => {
    setAllJobSeekers(jobSeekersData);
  }, []);

  const toggleRole = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
      setActiveFilters(activeFilters.filter((f) => f !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
      setActiveFilters([...activeFilters, role]);
    }
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
    setSelectedRoles(selectedRoles.filter((r) => r !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedRoles([]);
  };

  // View More button handler with loading animation - shows all remaining cards
  const handleViewMore = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setVisibleJobs(allJobSeekers.length); // Show all cards
      setLoading(false);
    }, 1000);
  };

  // Get currently visible job seekers (first 6 initially, then all when clicked)
  const visibleJobSeekers = allJobSeekers.slice(0, visibleJobs);
  const hasMoreJobs = visibleJobs < allJobSeekers.length;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Section with Background - IMPROVED FOR MOBILE */}
      <div className="relative bg-gradient-to-br from-[#2d3e50] via-[#34495e] to-[#1a252f] text-white overflow-hidden min-h-[40vh] md:min-h-[50vh]">
        {/* Background image with improved mobile positioning */}
        <div className="absolute inset-0">
          <img
            src="/JobsImg/Seekercarrer.jpg"
            alt="Job Seekers Background"
            className="w-full h-full object-cover opacity-70"
            style={{
              objectPosition: "center 30%",
            }}
          />
          {/* Dark overlay for better text readability on mobile */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
        </div>

        {/* Hero content centered for mobile */}
        <div className="relative z-10 h-full flex flex-col justify-center px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto w-full text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              Find Top Talent for Your Team
            </h1>
            <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto md:mx-0">
              Connect with qualified professionals ready to join your
              organization
            </p>
          </div>
        </div>
      </div>

      {/* Search Container - IMPROVED FOR MOBILE */}
      <div className="relative -mt-12 md:-mt-16 z-20">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="bg-[#3d4f5f]/90 md:bg-[#3d4f5f]/30 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-lg shadow-lg md:shadow-none">
              {/* Mobile: Stack inputs vertically, Desktop: Keep horizontal */}
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaSearch className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Job roles or skills"
                    className="w-full pl-10 pr-4 py-3 md:py-3.5 rounded-lg bg-white text-gray-800 text-sm md:text-[15px] placeholder-gray-500 border-0 focus:outline-none focus:ring-2 focus:ring-[#27bb97] shadow-sm"
                  />
                </div>

                {/* Location input */}
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaMapMarkerAlt className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <input
                    list="country-options"
                    className="w-full pl-10 pr-10 py-3 md:py-3.5 rounded-lg bg-white text-gray-800 text-sm md:text-[15px] border-0 appearance-none focus:outline-none focus:ring-2 focus:ring-[#27bb97] shadow-sm"
                    placeholder="Location or country"
                  />
                  <FaChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={16}
                  />
                </div>

                {/* Search button */}
                <button className="bg-[#27bb97] hover:bg-[#1fa987] px-6 md:px-8 py-3 md:py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  <FaSearch size={18} className="text-white" />
                  <span className="text-white font-semibold text-sm md:text-base hidden md:inline">
                    Search
                  </span>
                </button>
              </div>

              {/* Quick filters for mobile */}
              <div className="mt-4 md:hidden">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[
                    "Business Analyst",
                    "Software Engineer",
                    "Data Scientist",
                    "UX Designer",
                  ].map((tag) => (
                    <button
                      key={tag}
                      className="flex-shrink-0 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white hover:bg-white/30 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Button for Large Screens */}
      <div className="hidden lg:block max-w-[1400px] mx-auto px-4 md:px-6 mt-6">
        <div className="flex items-center">
          <a
            href="/jobs"
            className="flex items-center gap-2 text-[#27bb97] hover:text-[#1fa987] transition-colors hover:underline"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </a>
        </div>
      </div>

      {/* Header Navigation */}
      <div className="text-black mt-4 lg:mt-8 md:mt-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center gap-1 md:gap-2 text-sm md:text-[15px] overflow-x-auto pb-1">
            <span className="font-medium whitespace-nowrap">Jobs</span>
            <span className="text-gray-500">››</span>
            <span className="whitespace-nowrap">Job Seekers Resume</span>
            <span className="text-gray-500">››</span>
            <span className="text-gray-500 whitespace-nowrap">
              Resumes Listing
            </span>
          </div>
        </div>
      </div>

      {/* Active Filters - IMPROVED FOR MOBILE */}
      {activeFilters.length > 0 && (
        <div className="mb-6 px-4 md:px-6 py-3 md:py-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                Active Filters:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
                  >
                    <span className="text-xs md:text-sm text-gray-700 truncate max-w-[100px]">
                      {filter}
                    </span>
                    <button
                      onClick={() => removeFilter(filter)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-[#27bb97] hover:text-[#1fa987] text-sm font-medium transition-colors whitespace-nowrap self-end md:self-auto"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* MOBILE FILTER BUTTON */}
      <div className="flex lg:hidden mb-6 px-4 md:px-6">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full py-3.5 rounded-xl border border-gray-300 bg-white font-semibold shadow-sm flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition-colors active:scale-[0.98]"
        >
          <FaFilter className="w-4 h-4" />
          <span className="text-sm">Filters</span>
          {activeFilters.length > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-[#27bb97] text-white text-xs rounded-full">
              {activeFilters.length}
            </span>
          )}
        </button>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          showMobileFilters ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 transition-opacity duration-300"
          onClick={() => setShowMobileFilters(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white overflow-y-auto transition-transform duration-300 ${
            showMobileFilters ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Filter Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* REUSE YOUR FILTER SIDEBAR JSX HERE */}
          <div className="px-6 py-4">
            <div className="bg-white">
              {/* JOB ROLE */}
              <div className="mb-6">
                <button
                  className="w-full flex justify-between items-center mb-3 group"
                  onClick={() => setOpenJobRole(!openJobRole)}
                >
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Job Role
                  </h4>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                      openJobRole ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {openJobRole && (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Search Job Roles"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#27bb97] focus:ring-1 focus:ring-[#27bb97]"
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto pr-1">
                      {jobRoles.map((role, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={selectedRoles.includes(role)}
                                onChange={() => toggleRole(role)}
                              />
                              <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                <svg
                                  className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-xs text-gray-700 truncate">
                              {role}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* SKILLS */}
              <div className="mb-6">
                <button
                  className="w-full flex justify-between items-center mb-3 group"
                  onClick={() => setOpenSkills(!openSkills)}
                >
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Skills
                  </h4>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                      openSkills ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {openSkills && (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Search Skills"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#27bb97] focus:ring-1 focus:ring-[#27bb97]"
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto pr-1">
                      {skills.map((skill, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
                              <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                <svg
                                  className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-xs text-gray-700">
                              {skill.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {skill.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* EDUCATION */}
              <div className="mb-6">
                <button
                  className="w-full flex justify-between items-center mb-3 group"
                  onClick={() => setOpenEducation(!openEducation)}
                >
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Education
                  </h4>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                      openEducation ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {openEducation && (
                  <div className="max-h-40 overflow-y-auto pr-1">
                    {educationLevels.map((education, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                              <svg
                                className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </div>
                          <span className="text-xs text-gray-700">
                            {education.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {education.count}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* JOB TYPE */}
              <div className="mb-6">
                <button
                  className="w-full flex justify-between items-center mb-3 group"
                  onClick={() => setOpenJobType(!openJobType)}
                >
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Job Type
                  </h4>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                      openJobType ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {openJobType && (
                  <div className="max-h-40 overflow-y-auto pr-1">
                    {jobTypes.map((jobType, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                              <svg
                                className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </div>
                          <span className="text-xs text-gray-700">
                            {jobType.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {jobType.count}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* DATE POSTED */}
              <div className="mb-6">
                <button
                  className="w-full flex justify-between items-center mb-3 group"
                  onClick={() => setOpenDatePosted(!openDatePosted)}
                >
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date Posted
                  </h4>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                      openDatePosted ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {openDatePosted && (
                  <div className="max-h-40 overflow-y-auto pr-1">
                    {datePostedOptions.map((dateOption, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                              <svg
                                className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </div>
                          <span className="text-xs text-gray-700">
                            {dateOption.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {dateOption.count}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* INDUSTRY */}
              <div className="mb-6">
                <button
                  className="w-full flex justify-between items-center mb-3 group"
                  onClick={() => setOpenIndustry(!openIndustry)}
                >
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Industry
                  </h4>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                      openIndustry ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {openIndustry && (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Search Industries"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#27bb97] focus:ring-1 focus:ring-[#27bb97]"
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto pr-1">
                      {industries.map((industry, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
                              <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                <svg
                                  className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-xs text-gray-700">
                              {industry.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {industry.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* EXPERIENCE */}
              <div className="mb-6">
                <button
                  className="w-full flex justify-between items-center mb-3 group"
                  onClick={() => setOpenExperience(!openExperience)}
                >
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Experience
                  </h4>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                      openExperience ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {openExperience && (
                  <div className="max-h-40 overflow-y-auto pr-1">
                    {experienceLevels.map((experience, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                              <svg
                                className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </div>
                          <span className="text-xs text-gray-700">
                            {experience.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {experience.count}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* WORK AUTHORIZATION */}
              <div className="mb-6">
                <button
                  className="w-full flex justify-between items-center mb-3 group"
                  onClick={() =>
                    setOpenWorkAuthorization(!openWorkAuthorization)
                  }
                >
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Work Authorization
                  </h4>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                      openWorkAuthorization ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {openWorkAuthorization && (
                  <div className="max-h-40 overflow-y-auto pr-1">
                    {workAuthorizationOptions.map((auth, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                              <svg
                                className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </div>
                          <span className="text-xs text-gray-700">
                            {auth.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {auth.count}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Filter Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-3 bg-[#27bb97] text-white rounded-lg font-medium hover:bg-[#1fa987] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filter (Hidden on mobile) */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-base">Filters</h3>
                  <button
                    onClick={clearAllFilters}
                    className="text-[#27bb97] hover:text-[#1fa987] text-xs font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Scrollable Filter Content - SMALLER SCROLLBAR */}
              <div
                className="h-[calc(100vh-320px)] overflow-y-auto px-6 py-4 
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb:hover]:bg-gray-400
                [&::-webkit-scrollbar]:hover:w-2
                scrollbar-width:thin
                scrollbar-color:#d1d5db #f3f4f6"
              >
                {/* JOB ROLE */}
                <div className="mb-6">
                  <button
                    className="w-full flex justify-between items-center mb-3 group"
                    onClick={() => setOpenJobRole(!openJobRole)}
                  >
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Job Role
                    </h4>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                        openJobRole ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openJobRole && (
                    <>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Search Job Roles"
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#27bb97] focus:ring-1 focus:ring-[#27bb97]"
                        />
                      </div>
                      <div
                        className="max-h-40 overflow-y-auto pr-1
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-gray-50
                        [&::-webkit-scrollbar-thumb]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        scrollbar-width:thin
                        scrollbar-color:#e5e7eb #f9fafb"
                      >
                        {jobRoles.map((role, idx) => (
                          <label
                            key={idx}
                            className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="peer sr-only"
                                  checked={selectedRoles.includes(role)}
                                  onChange={() => toggleRole(role)}
                                />
                                <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                  <svg
                                    className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <span className="text-xs text-gray-700 truncate">
                                {role}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* SKILLS */}
                <div className="mb-6">
                  <button
                    className="w-full flex justify-between items-center mb-3 group"
                    onClick={() => setOpenSkills(!openSkills)}
                  >
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Skills
                    </h4>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                        openSkills ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openSkills && (
                    <>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Search Skills"
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#27bb97] focus:ring-1 focus:ring-[#27bb97]"
                        />
                      </div>
                      <div
                        className="max-h-40 overflow-y-auto pr-1
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-gray-50
                        [&::-webkit-scrollbar-thumb]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        scrollbar-width:thin
                        scrollbar-color:#e5e7eb #f9fafb"
                      >
                        {skills.map((skill, idx) => (
                          <label
                            key={idx}
                            className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="peer sr-only"
                                />
                                <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                  <svg
                                    className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <span className="text-xs text-gray-700">
                                {skill.label}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {skill.count}
                            </span>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* EDUCATION */}
                <div className="mb-6">
                  <button
                    className="w-full flex justify-between items-center mb-3 group"
                    onClick={() => setOpenEducation(!openEducation)}
                  >
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Education
                    </h4>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                        openEducation ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openEducation && (
                    <div
                      className="max-h-40 overflow-y-auto pr-1
                      [&::-webkit-scrollbar]:w-1
                      [&::-webkit-scrollbar-track]:bg-gray-50
                      [&::-webkit-scrollbar-thumb]:bg-gray-200
                      [&::-webkit-scrollbar-thumb]:rounded-full
                      scrollbar-width:thin
                      scrollbar-color:#e5e7eb #f9fafb"
                    >
                      {educationLevels.map((education, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
                              <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                <svg
                                  className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-xs text-gray-700">
                              {education.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {education.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* JOB TYPE */}
                <div className="mb-6">
                  <button
                    className="w-full flex justify-between items-center mb-3 group"
                    onClick={() => setOpenJobType(!openJobType)}
                  >
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Job Type
                    </h4>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                        openJobType ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openJobType && (
                    <div
                      className="max-h-40 overflow-y-auto pr-1
                      [&::-webkit-scrollbar]:w-1
                      [&::-webkit-scrollbar-track]:bg-gray-50
                      [&::-webkit-scrollbar-thumb]:bg-gray-200
                      [&::-webkit-scrollbar-thumb]:rounded-full
                      scrollbar-width:thin
                      scrollbar-color:#e5e7eb #f9fafb"
                    >
                      {jobTypes.map((jobType, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
                              <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                <svg
                                  className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-xs text-gray-700">
                              {jobType.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {jobType.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* DATE POSTED */}
                <div className="mb-6">
                  <button
                    className="w-full flex justify-between items-center mb-3 group"
                    onClick={() => setOpenDatePosted(!openDatePosted)}
                  >
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date Posted
                    </h4>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                        openDatePosted ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openDatePosted && (
                    <div
                      className="max-h-40 overflow-y-auto pr-1
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-gray-50
                        [&::-webkit-scrollbar-thumb]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        scrollbar-width:thin
                        scrollbar-color:#e5e7eb #f9fafb"
                    >
                      {datePostedOptions.map((dateOption, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
                              <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                <svg
                                  className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-xs text-gray-700">
                              {dateOption.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {dateOption.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* INDUSTRY */}
                <div className="mb-6">
                  <button
                    className="w-full flex justify-between items-center mb-3 group"
                    onClick={() => setOpenIndustry(!openIndustry)}
                  >
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Industry
                    </h4>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                        openIndustry ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openIndustry && (
                    <>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Search Industries"
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#27bb97] focus:ring-1 focus:ring-[#27bb97]"
                        />
                      </div>
                      <div
                        className="max-h-40 overflow-y-auto pr-1
                          [&::-webkit-scrollbar]:w-1
                          [&::-webkit-scrollbar-track]:bg-gray-50
                          [&::-webkit-scrollbar-thumb]:bg-gray-200
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          scrollbar-width:thin
                          scrollbar-color:#e5e7eb #f9fafb"
                      >
                        {industries.map((industry, idx) => (
                          <label
                            key={idx}
                            className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="peer sr-only"
                                />
                                <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                  <svg
                                    className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <span className="text-xs text-gray-700">
                                {industry.label}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {industry.count}
                            </span>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* EXPERIENCE */}
                <div className="mb-6">
                  <button
                    className="w-full flex justify-between items-center mb-3 group"
                    onClick={() => setOpenExperience(!openExperience)}
                  >
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Experience
                    </h4>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                        openExperience ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openExperience && (
                    <div
                      className="max-h-40 overflow-y-auto pr-1
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-gray-50
                        [&::-webkit-scrollbar-thumb]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        scrollbar-width:thin
                        scrollbar-color:#e5e7eb #f9fafb"
                    >
                      {experienceLevels.map((experience, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
                              <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                <svg
                                  className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-xs text-gray-700">
                              {experience.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {experience.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* WORK AUTHORIZATION */}
                <div className="mb-6">
                  <button
                    className="w-full flex justify-between items-center mb-3 group"
                    onClick={() =>
                      setOpenWorkAuthorization(!openWorkAuthorization)
                    }
                  >
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Work Authorization
                    </h4>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
                        openWorkAuthorization ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openWorkAuthorization && (
                    <div
                      className="max-h-40 overflow-y-auto pr-1
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-gray-50
                        [&::-webkit-scrollbar-thumb]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        scrollbar-width:thin
                        scrollbar-color:#e5e7eb #f9fafb"
                    >
                      {workAuthorizationOptions.map((auth, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between py-1.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
                              <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-2">
                                <svg
                                  className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-xs text-gray-700">
                              {auth.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {auth.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Center Content - Job Listings */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Job Seekers in USA/Canada
                </h2>
                <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
                  Discover qualified candidates for your open positions
                </p>
              </div>
              <div className="text-sm text-gray-500 bg-white px-3 py-2 rounded-lg border border-gray-200">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {visibleJobSeekers.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {allJobSeekers.length}
                </span>{" "}
                profiles
              </div>
            </div>

            <div className="space-y-4 md:space-y-5">
              {visibleJobSeekers.map((seeker) => (
                <div
                  key={seeker.id}
                  className="bg-white rounded-xl md:rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group hover:border-gray-200 active:scale-[0.995] md:active:scale-100"
                >
                  {seeker.featured && (
                    <div className="absolute top-0 left-0 z-10">
                      <div className="bg-gradient-to-r from-[#27bb97] to-[#1fa987] text-white px-3 md:px-4 py-1 md:py-1.5 text-xs font-semibold tracking-wide rounded-br-lg shadow-sm">
                        <span className="flex items-center gap-1">
                          <FaStar className="w-3 h-3" />
                          <span className="hidden sm:inline">
                            Featured Profile
                          </span>
                          <span className="sm:hidden">Featured</span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-4 md:p-7">
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                      {/* Avatar with Professional Badge */}
                      <div className="flex-shrink-0 relative self-center sm:self-start">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-white shadow-sm">
                          <img
                            src={seeker.image}
                            alt={`${seeker.name}'s profile`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.classList.add(
                                "bg-gradient-to-br",
                                "from-[#4db8b8]",
                                "to-[#3a9d9d]",
                              );
                            }}
                          />
                        </div>
                        {seeker.featured && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-[#27bb97] rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                            <FaCheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-[#27bb97] transition-colors duration-200">
                              {seeker.role}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-2">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                  <FaUser className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
                                </div>
                                <span className="font-medium text-sm md:text-base">
                                  {seeker.name}
                                </span>
                              </span>
                              <span className="flex items-center gap-2">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                  <FaMapMarkerAlt className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
                                </div>
                                <span className="font-medium text-sm md:text-base">
                                  {seeker.location}
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-0">
                            <div className="text-xs text-gray-500 mb-1 hidden sm:block">
                              Profile Score
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`w-3 h-3 md:w-4 md:h-4 ${
                                      star <= 4
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-semibold text-gray-800">
                                4.0
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Badges Section */}
                        <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
                          <span className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full mr-1 md:mr-2"></span>
                            {seeker.experience}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mr-1 md:mr-2"></span>
                            {seeker.education}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100 hidden sm:inline-flex">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full mr-1 md:mr-2"></span>
                            {seeker.category}
                          </span>
                        </div>

                        {/* Description Section */}
                        <div className="mb-4 md:mb-5">
                          <div className="flex items-center gap-2 mb-2 md:mb-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-gray-50 flex items-center justify-center">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-800">
                              Professional Summary
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-100 line-clamp-3 md:line-clamp-none">
                            {seeker.description}
                          </p>
                        </div>

                        {/* Skills Section */}
                        <div className="mb-4 md:mb-6">
                          <div className="flex items-center gap-2 mb-2 md:mb-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-gray-50 flex items-center justify-center">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-800">
                              Core Competencies
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {seeker.skills
                              .split(",")
                              .slice(0, 4)
                              .map((skill, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                                >
                                  {skill.trim()}
                                </span>
                              ))}
                            {seeker.skills.split(",").length > 4 && (
                              <span className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                +{seeker.skills.split(",").length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 md:pt-5 border-t border-gray-100">
                          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 md:px-5 md:py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group-hover:border-[#27bb97] group-hover:text-[#27bb97] active:scale-[0.98]">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View Profile
                          </button>

                          <div className="flex flex-row sm:flex-row items-center gap-2 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-[0.98]">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Save
                            </button>

                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#27bb97] to-[#1fa987] text-white rounded-lg text-sm font-semibold hover:from-[#1fa987] hover:to-[#189977] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              Resume
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            {hasMoreJobs && (
              <div className="mt-8 md:mt-10 text-center">
                <div className="relative">
                  <button
                    onClick={handleViewMore}
                    disabled={loading}
                    className="w-full max-w-md px-6 py-3.5 md:px-8 md:py-3.5 bg-gradient-to-r from-[#27bb97] to-[#1fa987] text-white rounded-xl text-sm md:text-[15px] font-semibold transition-all duration-300 hover:from-[#1fa987] hover:to-[#189977] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm md:text-base">
                          Loading More Profiles...
                        </span>
                      </>
                    ) : (
                      <>
                        <span>View More Job Seekers</span>
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                  <div className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3">
                    Showing {visibleJobSeekers.length} of {allJobSeekers.length}{" "}
                    profiles
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="space-y-4 md:space-y-5 lg:sticky lg:top-6">
              {/* Card 1 - Primary CTA */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 lg:p-7 text-center hover:shadow-lg transition-shadow duration-300 group">
                <div className="mb-4 md:mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-full mb-3 md:mb-4 group-hover:bg-green-100 transition-colors duration-300">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#27bb97] transition-colors duration-200">
                    Start Recruiting Top Talent
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    Access premium candidates with verified credentials
                  </p>
                </div>
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 md:py-3.5 rounded-lg text-sm md:text-[15px] font-semibold transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]">
                  Explore Resume Packages
                </button>
              </div>

              {/* Card 2 - Secondary CTA */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 lg:p-7 text-center hover:shadow-lg transition-shadow duration-300 group">
                <div className="mb-4 md:mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-full mb-3 md:mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#27bb97] transition-colors duration-200">
                    Need to Hire Quickly?
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    Post your job and get quality applications within 24 hours
                  </p>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 md:py-3.5 rounded-lg text-sm md:text-[15px] font-semibold transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]">
                  Post Your Job Ad
                </button>
              </div>

              {/* Card 3 - Trust Building */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 lg:p-7 text-center hover:shadow-lg transition-shadow duration-300 group">
                <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"
                      ></div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm font-semibold text-gray-900 ml-1">
                        4.8/5
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      500+ companies trust us
                    </p>
                  </div>
                </div>
                <div className="mb-4 md:mb-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 group-hover:text-[#27bb97] transition-colors duration-200">
                    Hire with Confidence
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    Sulekha Jobs delivers pre-screened, top-tier talent matched
                    to your needs
                  </p>
                </div>
                <button className="w-full bg-[#27bb97] hover:bg-[#1fa987] text-white py-3 md:py-3.5 rounded-lg text-sm md:text-[15px] font-semibold transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]">
                  View Recruiter Profiles
                </button>
              </div>

              {/* Card 4 - Feature Highlight */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 md:p-6 group hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-[#27bb97] transition-colors duration-200">
                      Direct Candidate Access
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      Shortlist resumes and contact candidates directly. No
                      middlemen, faster hiring.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-xs md:text-sm mt-3 transition-colors"
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Latest Job applicant Profile */}
              <div className="bg-white rounded-xl md:rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200 px-4 md:px-6 py-4 bg-gray-50">
                  <h1 className="text-base md:text-lg font-semibold text-gray-800">
                    Latest Applicants
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Recent job applicants
                  </p>
                </div>

                <div
                  className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-gray-50
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb:hover]:bg-gray-400
    [&::-webkit-scrollbar]:hover:w-2
    scrollbar-width:thin
    scrollbar-color:#d1d5db #f3f4f6
    scrollbar-gutter:stable
    scroll-behavior:smooth"
                >
                  {applicants.map((applicant, index) => (
                    <div
                      key={index}
                      className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors cursor-pointer group active:bg-gray-100"
                    >
                      <h2 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-[#27bb97] transition-colors duration-200 line-clamp-1">
                        {applicant.title}
                      </h2>
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          Updated {applicant.time}
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="w-3 h-3" />
                          {applicant.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Job Seeker Profiles */}
              <div className="bg-white rounded-xl md:rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 px-4 md:px-6 py-4 bg-gray-50">
                  <h1 className="text-base md:text-lg font-semibold text-gray-800">
                    Latest Profiles
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Recently updated candidates
                  </p>
                </div>

                <div
                  className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-gray-50
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb:hover]:bg-gray-400
    [&::-webkit-scrollbar]:hover:w-2
    scrollbar-width:thin
    scrollbar-color:#d1d5db #f3f4f6
    scrollbar-gutter:stable
    scroll-behavior:smooth"
                >
                  {profiles.slice(0, 5).map((profile, index) => (
                    <div
                      key={index}
                      className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors cursor-pointer group active:bg-gray-100"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-sm font-semibold text-gray-900 group-hover:text-[#27bb97] transition-colors duration-200 line-clamp-1">
                              {profile.title}
                            </h2>
                            {profile.verified && (
                              <span className="flex-shrink-0 flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                                <FaCheckCircle className="w-3 h-3" />
                                <span className="hidden md:inline">
                                  Verified
                                </span>
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <FaClock className="w-3 h-3" />
                              {profile.updatedTime}
                            </span>
                            <span className="hidden md:inline">•</span>
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt className="w-3 h-3" />
                              {profile.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <FaStar className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs font-medium text-gray-700">
                              {profile.rating}
                            </span>
                            <span className="text-xs text-gray-400">/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 px-4 md:px-6 py-3 bg-gray-50">
                  <button className="w-full text-center text-sm text-[#27bb97] hover:text-[#1fa987] font-medium transition-colors active:text-[#189977]">
                    View All Profiles →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Back to Home Button for Mobile/Tablet */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-4 py-3">
          <a href="/jobs">
            <div className="flex items-center gap-2 text-[#27bb97] font-medium">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-sm">Back to Home</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}