import React, { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Bookmark,
  ChevronDown,
  X,
} from "lucide-react";
// react icons
import { IoSearch } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import { RiUploadCloud2Line } from "react-icons/ri";
import { HiOutlineArrowDown } from "react-icons/hi2";

const JobSearchPortal = () => {
  const [searchQuery, setSearchQuery] = useState("Designer");
  const [location, setLocation] = useState("Chicago, IL");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isCompanyFocused, setIsCompanyFocused] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [companyInput, setCompanyInput] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeFilters, setActiveFilters] = useState(["Full-Time", "Chicago, IL"]);

  // load more jobs
  const loadMoreJobs = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
    }, 1200);
  };

  const [companyOptions] = useState([
    { value: "google", label: "Google" },
    { value: "microsoft", label: "Microsoft" },
    { value: "apple", label: "Apple" },
    { value: "amazon", label: "Amazon" },
    { value: "facebook", label: "Facebook" },
    { value: "netflix", label: "Netflix" },
    { value: "tesla", label: "Tesla" },
  ]);

  const [openJobType, setOpenJobType] = useState(true);
  const [openLocation, setOpenLocation] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);

  // UPDATED job listings with remoteType + description
  const jobListings = [
    {
      id: 1,
      title: "Visual Designer",
      company: "Deloitte",
      logo: "https://e7.pngegg.com/pngimages/564/716/png-clipart-deloitte-logo-brand-management-consulting-product-lg-logo-text-logo.png",
      location: "Chicago, IL",
      experience: "3 to 5 Years",
      jobType: "Full-Time",
      salary: "$57k - $62k",
      postedDays: 3,
      featured: false,
      remoteType: "On-site",
      description:
        "We are seeking a creative visual designer to help craft clean, modern design solutions for enterprise clients.",
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Opshub",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCFmOvdnTVlnU5kwoLvh9bOObbPi7qaSnChg&s",
      location: "Chicago, IL",
      experience: "0 to 2 Years",
      jobType: "Full-Time",
      salary: "$44k - $52k",
      postedDays: 17,
      featured: true,
      remoteType: "Hybrid",
      description:
        "Join our product design team and help shape intuitive user experiences for global software solutions.",
    },
    {
      id: 3,
      title: "Designer",
      company: "Frey + Frey Architecture INC",
      logo: "https://images.squarespace-cdn.com/content/v1/6004a4942f57da1e2e6f9e88/1611172187143-8RK3TXIIMRSX02LISZGR/Capture.PNG",
      location: "Chicago, IL",
      experience: "0 to 1 Year",
      jobType: "Paid Internship",
      salary: "$16k",
      postedDays: 20,
      featured: false,
      remoteType: "Remote",
      description:
        "Assist the architecture and design team in producing layouts, concepts, and creative project visuals.",
    },
  ];

  const locations = [
    { name: "Chicago, IL", count: 286 },
    { name: "Niles, IL", count: 46 },
    { name: "Oak Brook, IL", count: 39 },
    { name: "Northbrook, IL", count: 37 },
    { name: "Skokie, IL", count: 36 },
  ];

  const companies = [
    { name: "All", count: 286 },
    { name: "Abbott", count: 33 },
    { name: "Deloitvive Advisors", count: 28 },
    { name: "Core.com", count: 29 },
    { name: "Caterpillar Inc", count: 27 },
    { name: "Zebra Technologies", count: 26 },
  ];

  const popularCompanies = [
    {
      name: "Workday",
      jobs: 167,
      logo: "https://logo.clearbit.com/workday.com",
    },
    {
      name: "Salesforce",
      jobs: 85,
      logo: "https://logo.clearbit.com/salesforce.com",
    },
    {
      name: "Marriott International",
      jobs: 77,
      logo: "https://logo.clearbit.com/marriott.com",
    },
    {
      name: "CoreMax",
      jobs: 68,
      logo: "https://logo.clearbit.com/coremax.com.tw",
    },
    {
      name: "SAP America Inc.",
      jobs: 27,
      logo: "https://logo.clearbit.com/sap.com",
    },
    {
      name: "Deloitte",
      jobs: 26,
      logo: "https://logo.clearbit.com/deloitte.com",
    },
    {
      name: "Accenture",
      jobs: 25,
      logo: "https://logo.clearbit.com/accenture.com",
    },
    {
      name: "Allenza Data",
      jobs: 20,
      logo: "https://logo.clearbit.com/allenza.com",
    },
  ];

  const removeFilter = (filterToRemove) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="p-6">
        {/* Image Background Section with Navbar */}
        <div
          className="rounded-2xl bg-white shadow-lg mb-10 
  bg-[url('/JobsImg/background.jpg')] 
  bg-cover bg-center relative overflow-hidden"
        >
          {/* Navbar inside the image */}
          <nav className="bg-[#2B2321] bg-opacity-95">
            <div className="px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-10">
                  <a
                    href="#"
                    className="text-white hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                  >
                    IT Jobs
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                  >
                    Non IT Jobs
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                  >
                    Latest Jobs
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                  >
                    Part Time
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                  >
                    Find Jobs
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                  >
                    Jobs Near Me
                  </a>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-white hover:text-gray-200 text-sm font-medium transition-colors duration-200">
                    Browse Jobs
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <button className="flex items-center text-white hover:text-gray-200 text-sm font-medium transition-colors duration-200">
                    Employers
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                    Post Job Ad
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                    Create Profile
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <div
            className="p-8 flex flex-col justify-end"
            style={{ height: "280px" }}
          >
            <div className="mt-4 mb-4">
              <h1 className="text-white text-4xl font-bold mb-2">
                Find your dream job
              </h1>
              <p className="text-white text-opacity-90 text-lg">
                Discover the perfect career opportunity that matches your skills
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar positioned half on image, half below */}
        <div className="relative -mt-24 mb-10 px-4">
          <div className="flex space-x-4 bg-white p-6 rounded-xl shadow-xl mx-auto max-w-6xl border border-gray-100">
            {/* Search Input */}
            <div
              className={`flex-1 bg-white rounded-lg p-3 flex items-center border-2 transition-all duration-300 ${
                isSearchFocused
                  ? "border-[#27bb97] shadow-[0_0_0_3px_rgba(39,187,151,0.1)]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <IoSearch className="text-gray-400 mr-3 text-lg" />
              <div className="w-full">
                <label className="text-gray-500 text-xs block mb-1 font-medium">
                  Search job title, keywords or company
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full text-gray-900 font-medium text-base outline-none py-0.5 placeholder-gray-400"
                  placeholder="UX Designer, Product Manager..."
                />
              </div>
            </div>

            {/* Location Input */}
            <div
              className={`w-64 bg-white rounded-lg p-3 flex items-center border-2 transition-all duration-300 ${
                isLocationFocused
                  ? "border-[#27bb97] shadow-[0_0_0_3px_rgba(39,187,151,0.1)]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <MapPin className="text-gray-400 mr-3 w-4 h-4" />
              <div className="w-full">
                <label className="text-gray-500 text-xs block mb-1 font-medium">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setIsLocationFocused(true)}
                  onBlur={() => setIsLocationFocused(false)}
                  className="w-full text-gray-900 font-medium text-base outline-none py-0.5 placeholder-gray-400"
                  placeholder="Enter location..."
                />
              </div>
            </div>

            {/* Company Input */}
            <div
              className={`w-64 bg-white rounded-lg p-3 flex items-center border-2 transition-all duration-300 ${
                isCompanyFocused
                  ? "border-[#27bb97] shadow-[0_0_0_3px_rgba(39,187,151,0.1)]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Briefcase className="text-gray-400 mr-3 w-4 h-4" />
              <div className="w-full relative">
                <label className="text-gray-500 text-xs block mb-1 font-medium">
                  Company
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onFocus={() => {
                      setIsCompanyFocused(true);
                      setIsCompanyDropdownOpen(true);
                    }}
                    onBlur={() => {
                      setIsCompanyFocused(false);
                      setTimeout(() => setIsCompanyDropdownOpen(false), 200);
                    }}
                    placeholder="Search company..."
                    className="w-full text-gray-900 font-medium text-base outline-none py-0.5 pr-8 placeholder-gray-400"
                  />

                  {/* Dropdown arrow */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {/* Dropdown options */}
                  {isCompanyDropdownOpen && (
                    <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-48 overflow-y-auto">
                      {companyOptions.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                          onMouseDown={() => {
                            setCompanyInput(option.label);
                            setIsCompanyDropdownOpen(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              className="px-8 py-3 bg-[#27bb97] text-white rounded-lg font-semibold text-sm 
        hover:bg-[#1fa987] flex items-center gap-2 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <IoSearch className="text-lg" />
              Search Jobs
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">Active Filters:</span>
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
                <button className="text-[#27bb97] hover:text-[#1fa987] text-sm font-medium transition-colors">
                  Clear All
                </button>
              </div>
            </div>
          )}

          <div className="flex">
            {/* Filters Sidebar */}
            <div className="w-72 p-6 border-r border-gray-100 bg-white">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
                <button className="text-[#27bb97] hover:text-[#1fa987] text-sm font-medium transition-colors">
                  Clear All
                </button>
              </div>

              {/* JOB TYPE */}
              <div className="mb-8">
                <button
                  className="w-full flex justify-between items-center mb-4 group"
                  onClick={() => setOpenJobType(!openJobType)}
                >
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Job Type
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                      openJobType ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>

                {openJobType && (
                  <div className="space-y-3 text-sm">
                    {[
                      { label: "All", count: 286, color: "text-[#27bb97]" },
                      { label: "Full Time", count: 166 },
                      { label: "Part Time", count: 32 },
                      { label: "Contract", count: 48 },
                      { label: "Internship", count: 61 },
                      { label: "Freelance", count: 7 },
                    ].map((item, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                            />
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-3">
                              <svg
                                className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
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
                          <span className={item.color || "text-gray-700"}>
                            {item.label}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          ({item.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* LOCATION FILTER */}
              <div className="mb-8">
                <button
                  className="w-full flex justify-between items-center mb-4 group"
                  onClick={() => setOpenLocation(!openLocation)}
                >
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Location
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                      openLocation ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {openLocation && (
                  <div className="space-y-3 text-sm">
                    {locations.map((loc, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                            />
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-3">
                              <svg
                                className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
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
                          <span
                            className={
                              idx === 0 ? "text-[#27bb97]" : "text-gray-700"
                            }
                          >
                            {loc.name}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          ({loc.count})
                        </span>
                      </label>
                    ))}
                    <button className="w-full text-center text-[#27bb97] hover:text-[#1fa987] text-sm font-medium pt-2 transition-colors">
                      + Show More Locations
                    </button>
                  </div>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6"></div>

              {/* COMPANY FILTER */}
              <div>
                <button
                  className="w-full flex justify-between items-center mb-4 group"
                  onClick={() => setOpenCompany(!openCompany)}
                >
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Company
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                      openCompany ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {openCompany && (
                  <div className="space-y-3 text-sm">
                    {companies.map((comp, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                            />
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-sm peer-checked:border-[#27bb97] peer-checked:bg-[#27bb97] flex items-center justify-center mr-3">
                              <svg
                                className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
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
                          <span
                            className={
                              idx === 0 ? "text-[#27bb97]" : "text-gray-700"
                            }
                          >
                            {comp.name}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          ({comp.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Job Listings Section */}
            <div className="flex-1 p-6 bg-[#F8FAFC]">
              {/* Upload Resume Banner */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-8 flex items-center cursor-pointer hover:shadow-md transition-all duration-300 group">
                <div className="text-blue-600 mr-4 p-3 bg-white rounded-lg shadow-sm group-hover:scale-105 transition-transform">
                  <RiUploadCloud2Line size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">
                    Upload your resume
                  </h4>
                  <p className="text-sm text-gray-600">
                    We'll match you with the best jobs. Right jobs, Right away!
                  </p>
                </div>
                <div className="text-blue-600 group-hover:translate-x-2 transition-transform">
                  <HiOutlineArrowDown size={20} />
                </div>
              </div>

              {/* Results Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    286 Designer Jobs
                  </h2>
                  <p className="text-sm text-gray-500">
                    in Chicago, IL and nearby locations
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 font-medium">Sort By:</span>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#27bb97] focus:border-transparent cursor-pointer shadow-sm">
                      <option>Date Posted</option>
                      <option>Salary (High to Low)</option>
                      <option>Relevance</option>
                      <option>Experience</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Cards */}
              <div className="space-y-5">
                {jobListings.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 relative group"
                  >
                    {/* Featured Tag */}
                    {job.featured && (
                      <span className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                        Featured
                      </span>
                    )}

                    {/* APPLY NOW - TOP RIGHT */}
                    <button className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#27bb97] to-[#1fa987] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer">
                      Apply Now
                    </button>

                    <div className="flex space-x-5">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex items-center justify-center">
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* MAIN CONTENT */}
                      <div className="flex-1">
                        {/* Title and Company */}
                        <div className="mb-3">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#27bb97] transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <p className="text-gray-600 font-medium">
                              {job.company}
                            </p>
                            <span className="text-gray-400">•</span>
                            <div className="flex items-center text-gray-500">
                              <MapPin className="w-3.5 h-3.5 mr-1" />
                              <span className="text-sm">{job.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Remote Type Badge */}
                        <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold mb-3 ${
                          job.remoteType === "Remote" 
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : job.remoteType === "Hybrid"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-purple-50 text-purple-700 border border-purple-200"
                        }`}>
                          {job.remoteType}
                        </span>

                        {/* Job Description */}
                        <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Info Row */}
                        <div className="grid grid-cols-4 gap-6 mb-5">
                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                              Experience
                            </p>
                            <p className="font-semibold text-gray-900 flex items-center">
                              <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                              {job.experience}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                              Job Type
                            </p>
                            <p className="font-semibold text-gray-900 flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              {job.jobType}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                              Salary
                            </p>
                            <p className="font-semibold text-gray-900 flex items-center">
                              <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                              {job.salary}
                              <span className="text-gray-500 text-sm ml-1">/year</span>
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                              Posted
                            </p>
                            <p className="font-semibold text-gray-900">
                              {job.postedDays} days ago
                            </p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-[#27bb97] transition-colors duration-200 group/save">
                              <Bookmark className="w-4 h-4 group-hover/save:fill-[#27bb97]" />
                              <span className="text-sm font-medium">Save Job</span>
                            </button>
                            <button className="text-gray-500 hover:text-[#27bb97] text-sm font-medium transition-colors duration-200">
                              View Details
                            </button>
                          </div>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-[#27bb97] hover:text-[#27bb97] transition-all duration-200">
                            Quick Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="flex justify-center mt-10">
                <button
                  onClick={loadMoreJobs}
                  disabled={isLoadingMore}
                  className={`flex items-center px-8 py-3.5 bg-gradient-to-r from-[#27bb97] to-[#1fa987] text-white rounded-xl font-semibold 
      hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transform hover:-translate-y-0.5`}
                >
                  <HiOutlineArrowDown
                    className={`mr-3 text-xl transition-transform duration-300 ${
                      isLoadingMore ? "animate-bounce" : ""
                    }`}
                  />
                  {isLoadingMore ? "Loading More Jobs..." : "Load More Jobs"}
                </button>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 p-6 border-l border-gray-100 bg-white">
              {/* Subscription */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-8 shadow-sm border border-gray-100">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#27bb97] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#27bb97]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Get new jobs for{" "}
                    <span className="text-[#27bb97]">Chicago, IL</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    From{" "}
                    <span className="font-medium text-gray-800">
                      steve.scofield@gmail.com
                    </span>
                  </p>
                </div>
                <button className="w-full py-3.5 bg-white border-2 border-[#27bb97] text-[#27bb97] rounded-xl font-semibold hover:bg-[#27bb97] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
                  Subscribe Now
                </button>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  You can unsubscribe anytime
                </p>
              </div>

              {/* Popular Companies */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-gray-900 text-lg">
                    Popular in{" "}
                    <span className="text-[#27bb97]">Chicago</span>
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {popularCompanies.reduce((acc, comp) => acc + comp.jobs, 0)} jobs
                  </span>
                </div>

                <div className="space-y-4">
                  {popularCompanies.map((company, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-all duration-200 cursor-pointer group/company"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden group-hover/company:shadow-md transition-shadow">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML = `
                              <span class='text-sm font-bold text-gray-600'>
                                ${company.name.charAt(0)}
                              </span>
                            `;
                          }}
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <p className="font-semibold text-gray-900 group-hover/company:text-[#27bb97] transition-colors">
                          {company.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {company.jobs} open positions
                        </p>
                      </div>
                      <div className="text-gray-400 group-hover/company:text-[#27bb97] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 text-center text-[#27bb97] hover:text-[#1fa987] font-medium border border-dashed border-gray-300 rounded-xl hover:border-[#27bb97] transition-all duration-200">
                  View All Companies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchPortal;