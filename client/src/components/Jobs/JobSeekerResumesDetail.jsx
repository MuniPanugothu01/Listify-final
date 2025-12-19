import React, { useState, useEffect } from "react";
import { Search, MapPin, ChevronDown, User, X } from "lucide-react";

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

  // New states for view more functionality
  const [visibleJobs, setVisibleJobs] = useState(4);
  const [loading, setLoading] = useState(false);
  const [allJobSeekers, setAllJobSeekers] = useState([]);

  // JSON data for job seekers (extended with 4+ entries)
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
    },
  ];

  // Filter data arrays remain the same...
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

  // View More button handler with loading animation
  const handleViewMore = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setVisibleJobs((prev) => prev + 4);
      setLoading(false);
    }, 1000);
  };

  // Get currently visible job seekers
  const visibleJobSeekers = allJobSeekers.slice(0, visibleJobs);
  const hasMoreJobs = visibleJobs < allJobSeekers.length;

  return (
    <div className="min-h-screen bg-[#f5f5f5] ">
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-br from-[#2d3e50] via-[#34495e] to-[#1a252f] text-white overflow-hidden min-h-[50vh]">
        {/* Background image */}
        <div className="absolute inset-0 rounded-full h-[calc(100%+60px)]">
          <img
            src="/JobsImg/Seekercarrer.jpg"
            alt="Background"
            className="w-full h-full  object-cover opacity-70"
          />
        </div>
      </div>

      {/* Search Container */}
      <div className="relative -mt-16 z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="bg-[#3d4f5f]/30 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search Job roles"
                  className="flex-1 px-4 py-3 rounded bg-white text-gray-800 text-[15px] placeholder-gray-500 border-0 focus:outline-none focus:ring-2 focus:ring-[#27bb97]"
                />
                <div className="relative flex-1">
                  <input
                    list="country-options"
                    className="w-full px-4 py-3 rounded bg-white text-gray-800 text-[15px] border-0 appearance-none focus:outline-none focus:ring-2 focus:ring-[#27bb97] pr-10"
                    placeholder="Type or select country"
                  />
                  <datalist id="country-options">
                    <option>USA / Canada</option>
                    <option>Europe</option>
                    <option>Asia</option>
                  </datalist>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
                <button className="bg-[#27bb97] hover:bg-[#1fa987] px-8 rounded transition-colors flex items-center justify-center">
                  <Search size={22} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Navigation */}
      <div className="text-black mt-10">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-[15px]">
            <span className="font-medium">Jobs</span>
            <span className="text-gray-500">››</span>
            <span>Job Seekers Resume</span>
            <span className="text-gray-500">››</span>
            <span className="text-gray-500">Resumes Listing</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-8">
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6 px-6 py-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">
                  Active Filters:
                </span>
                {activeFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
                  >
                    <span className="text-sm text-gray-700">{filter}</span>
                    <button
                      onClick={() => removeFilter(filter)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={clearAllFilters}
                className="text-[#27bb97] hover:text-[#1fa987] text-sm font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Left Sidebar - Filter */}
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
                className="h-[calc(100vh-250px)] overflow-y-auto px-6 py-4 
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
                    <ChevronDown
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
                    <ChevronDown
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
                    <ChevronDown
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
                    <ChevronDown
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
                    <ChevronDown
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
                    <ChevronDown
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
                    <ChevronDown
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
                    <ChevronDown
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
            <h2 className="text-[20px] font-semibold text-gray-800 mb-5">
              Jobseekers in USA/ Canada
            </h2>

            <div className="space-y-4">
              {visibleJobSeekers.map((seeker) => (
                <div
                  key={seeker.id}
                  className="bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  {seeker.featured && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white px-5 py-2 text-[11px] font-semibold tracking-wide rounded-bl-lg">
                        Featured
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex gap-5">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-[70px] h-[70px] rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={seeker.image}
                            alt={`${seeker.name}'s profile`}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              // Fallback to gradient background if image fails to load
                              e.target.style.display = "none";
                              e.target.parentElement.classList.add(
                                "bg-gradient-to-br",
                                "from-[#4db8b8]",
                                "to-[#3a9d9d]"
                              );
                            }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[18px] font-semibold text-gray-800 mb-2">
                          {seeker.role}
                        </h3>

                        <div className="flex items-center gap-5 text-[13px] text-gray-600 mb-3">
                          <span className="flex items-center gap-1.5">
                            <User size={13} />
                            {seeker.name}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} />
                            {seeker.location}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-[13px]">
                          <span className="text-[#3b82f6] font-medium">
                            {seeker.experience}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="text-[#3b82f6] font-medium">
                            {seeker.education}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="text-[#3b82f6] font-medium">
                            {seeker.category}
                          </span>
                        </div>

<div className="w-full border-t border-dashed border-gray-300 my-4"></div>


                        <div className="mb-4">
                          <span className="text-[13px] font-medium text-gray-800">
                            Key Skills:{" "}
                          </span>
                          <span className="text-[13px] text-gray-600">
                            {seeker.skills}
                          </span>
                        </div>

                        <div className="w-full border-t border-dashed border-gray-300 my-4"></div>

                     <div className="flex justify-between items-center w-full">
  <button className="px-6 py-2 border border-gray-300 rounded text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
    View Profile
  </button>

  <button className="px-6 py-2 bg-[#27bb97] border border-[#1fa987] text-white rounded text-[14px] font-medium hover:bg-[#1fa987] transition-colors cursor-pointer">
    Download CV
  </button>
</div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button with Loading Animation */}
            {hasMoreJobs && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleViewMore}
                  disabled={loading}
                  className="px-8 py-3 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded text-[15px] font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    "View More Resumes"
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-[300px] flex-shrink-0">
            <div className="space-y-4 sticky top-4">
              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-[15px] text-gray-800 mb-4 font-medium">
                  Start recruiting right Talent today
                </p>
                <button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 rounded text-[15px] font-semibold transition-colors">
                  Resume Package
                </button>
              </div>

              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-[15px] text-gray-800 mb-4 font-medium">
                  Are you hiring? Find talent now!
                </p>
                <button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 rounded text-[15px] font-semibold transition-colors">
                  Post Your Job Ad
                </button>
              </div>

              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-[13px] text-gray-700 mb-4">
                  <span className="font-semibold">Hire with confidence:</span>{" "}
                  Sulekha Jobs delivers top talent
                </p>
                <button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 rounded text-[15px] font-semibold transition-colors">
                  Recruiter Profile
                </button>
              </div>

              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-5 text-center">
                <p className="text-[13px] text-gray-700 leading-relaxed">
                  Reach out to Shortlist resumes and
                  <br />
                  call directly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
