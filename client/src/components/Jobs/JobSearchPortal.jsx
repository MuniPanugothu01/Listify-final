import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Bookmark,
  ChevronDown,
  X,
  Menu,
  Filter,
} from "lucide-react";
import { GoArrowUpLeft } from "react-icons/go";
// react icons
import { IoSearch } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import { RiUploadCloud2Line } from "react-icons/ri";
import { HiOutlineArrowDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const JobSearchPortal = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isCompanyFocused, setIsCompanyFocused] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [companyInput, setCompanyInput] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeFilters, setActiveFilters] = useState([
    "Full-Time",
    "Chicago, IL",
  ]);

  // ADDED: Mobile drawer states
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // PAGINATION STATE - CHANGED: Show 6 jobs initially instead of 12
  const [visibleJobsCount, setVisibleJobsCount] = useState(6);
  const jobsPerLoad = 6;

  // FILTER STATES
  const [openJobType, setOpenJobType] = useState(true);
  const [openLocation, setOpenLocation] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [openExperience, setOpenExperience] = useState(false);
  const [openPriceRange, setOpenPriceRange] = useState(false);
  const [openRemoteType, setOpenRemoteType] = useState(false);
  const [openIndustry, setOpenIndustry] = useState(false);

  // Price Range state
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("200000");

  // Load more jobs - pagination logic
  const loadMoreJobs = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleJobsCount((prevCount) => prevCount + jobsPerLoad);
      setIsLoadingMore(false);
    }, 1200);
  };

  // Handle job click - navigate to job details page
  const handleJobClick = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  // Handle view details button click
  const handleViewDetailsClick = (jobId, e) => {
    e.stopPropagation();
    navigate(`/job-details/${jobId}`);
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
      industry: "Consulting",
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
      industry: "Technology",
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
      industry: "Architecture",
    },
    {
      id: 4,
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
      description:
        "Lead UX design initiatives for consumer products used by billions. Expertise in user research and prototyping required.",
      industry: "Technology",
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "Airbnb",
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Airbnb-Logo.png",
      location: "Austin, TX",
      experience: "2 to 4 Years",
      jobType: "Full-Time",
      salary: "$95k - $115k",
      postedDays: 5,
      featured: true,
      remoteType: "Remote",
      description:
        "Design beautiful, intuitive interfaces for our travel platform. Collaborate with cross-functional teams globally.",
      industry: "Travel",
    },
    {
      id: 6,
      title: "Graphic Designer",
      company: "Adobe",
      logo: "https://logos-world.net/wp-content/uploads/2020/07/Adobe-Logo.png",
      location: "New York, NY",
      experience: "1 to 3 Years",
      jobType: "Full-Time",
      salary: "$70k - $85k",
      postedDays: 7,
      featured: false,
      remoteType: "On-site",
      description:
        "Create marketing materials, digital assets, and brand visuals for Adobe's creative software campaigns.",
      industry: "Technology",
    },
    {
      id: 7,
      title: "Motion Designer",
      company: "Netflix",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png",
      location: "Los Angeles, CA",
      experience: "3+ Years",
      jobType: "Contract",
      salary: "$85 - $110/hr",
      postedDays: 2,
      featured: true,
      remoteType: "Hybrid",
      description:
        "Create compelling motion graphics and animations for original content titles and platform UI.",
      industry: "Entertainment",
    },
    {
      id: 8,
      title: "Web Designer",
      company: "Shopify",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Shopify-Logo.png",
      location: "Remote",
      experience: "2+ Years",
      jobType: "Full-Time",
      salary: "$80k - $100k",
      postedDays: 10,
      featured: false,
      remoteType: "Remote",
      description:
        "Design and implement responsive e-commerce templates and themes for the Shopify platform.",
      industry: "E-commerce",
    },
    {
      id: 9,
      title: "Junior Designer",
      company: "Spotify",
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Spotify-Logo.png",
      location: "Boston, MA",
      experience: "0 to 1 Year",
      jobType: "Full-Time",
      salary: "$55k - $65k",
      postedDays: 14,
      featured: false,
      remoteType: "On-site",
      description:
        "Entry-level position for recent graduates. Assist in designing user interfaces for music streaming features.",
      industry: "Entertainment",
    },
    {
      id: 10,
      title: "UX Researcher",
      company: "Microsoft",
      logo: "https://logos-world.net/wp-content/uploads/2020/07/Microsoft-Logo.png",
      location: "Seattle, WA",
      experience: "4+ Years",
      jobType: "Full-Time",
      salary: "$120k - $140k",
      postedDays: 3,
      featured: false,
      remoteType: "Hybrid",
      description:
        "Conduct user research and usability studies to inform design decisions for enterprise software products.",
      industry: "Technology",
    },
    {
      id: 11,
      title: "Creative Director",
      company: "Apple",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png",
      location: "Cupertino, CA",
      experience: "10+ Years",
      jobType: "Full-Time",
      salary: "$200k - $250k",
      postedDays: 21,
      featured: true,
      remoteType: "On-site",
      description:
        "Lead creative vision for marketing campaigns and product launches. Manage team of designers and copywriters.",
      industry: "Technology",
    },
    {
      id: 12,
      title: "Design Intern",
      company: "Meta",
      logo: "https://logos-world.net/wp-content/uploads/2020/05/Facebook-Logo.png",
      location: "Menlo Park, CA",
      experience: "Student",
      jobType: "Internship",
      salary: "$25/hr",
      postedDays: 4,
      featured: false,
      remoteType: "On-site",
      description:
        "Summer internship supporting design teams across various AR/VR projects. Portfolio required.",
      industry: "Technology",
    },
    {
      id: 13,
      title: "Brand Designer",
      company: "Nike",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png",
      location: "Portland, OR",
      experience: "3 to 6 Years",
      jobType: "Full-Time",
      salary: "$90k - $110k",
      postedDays: 8,
      featured: true,
      remoteType: "Hybrid",
      description:
        "Develop and maintain brand identity across digital and physical touchpoints for global campaigns.",
      industry: "Retail",
    },
    {
      id: 14,
      title: "UX/UI Designer",
      company: "Amazon",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png",
      location: "Remote",
      experience: "3+ Years",
      jobType: "Full-Time",
      salary: "$100k - $130k",
      postedDays: 12,
      featured: false,
      remoteType: "Remote",
      description:
        "Design customer-facing interfaces for AWS console and cloud services. Experience with enterprise software preferred.",
      industry: "Technology",
    },
    {
      id: 15,
      title: "3D Designer",
      company: "Unity",
      logo: "https://logos-world.net/wp-content/uploads/2021/10/Unity-Logo.png",
      location: "San Francisco, CA",
      experience: "2 to 5 Years",
      jobType: "Contract",
      salary: "$75 - $95/hr",
      postedDays: 6,
      featured: false,
      remoteType: "Hybrid",
      description:
        "Create 3D assets, environments, and prototypes for real-time visualization and gaming applications.",
      industry: "Gaming",
    },
    {
      id: 16,
      title: "Illustrator",
      company: "Pinterest",
      logo: "https://logos-world.net/wp-content/uploads/2020/07/Pinterest-Logo.png",
      location: "New York, NY",
      experience: "2+ Years",
      jobType: "Full-Time",
      salary: "$75k - $90k",
      postedDays: 9,
      featured: false,
      remoteType: "Remote",
      description:
        "Create original illustrations and visual content for Pinterest's marketing and product teams.",
      industry: "Technology",
    },
    {
      id: 17,
      title: "Product Design Lead",
      company: "Slack",
      logo: "https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo.png",
      location: "Denver, CO",
      experience: "7+ Years",
      jobType: "Full-Time",
      salary: "$150k - $180k",
      postedDays: 2,
      featured: true,
      remoteType: "Hybrid",
      description:
        "Lead product design strategy for collaboration tools. Manage design systems and mentor junior designers.",
      industry: "Technology",
    },
    {
      id: 18,
      title: "Accessibility Designer",
      company: "IBM",
      logo: "https://logos-world.net/wp-content/uploads/2020/07/IBM-Logo.png",
      location: "Remote",
      experience: "4+ Years",
      jobType: "Full-Time",
      salary: "$110k - $130k",
      postedDays: 15,
      featured: false,
      remoteType: "Remote",
      description:
        "Specialize in creating accessible design systems and ensuring compliance with WCAG standards across products.",
      industry: "Technology",
    },
    {
      id: 19,
      title: "Frontend Designer",
      company: "Twitter",
      logo: "https://logos-world.net/wp-content/uploads/2023/07/Twitter-Logo.png",
      location: "San Francisco, CA",
      experience: "3+ Years",
      jobType: "Full-Time",
      salary: "$120k - $150k",
      postedDays: 5,
      featured: false,
      remoteType: "Remote",
      description:
        "Design and implement responsive web interfaces for social media platform features.",
      industry: "Technology",
    },
    {
      id: 20,
      title: "Game Designer",
      company: "Electronic Arts",
      logo: "https://logos-world.net/wp-content/uploads/2020/10/Electronic-Arts-Logo.png",
      location: "Redwood City, CA",
      experience: "4+ Years",
      jobType: "Full-Time",
      salary: "$110k - $140k",
      postedDays: 11,
      featured: false,
      remoteType: "On-site",
      description:
        "Design game mechanics, levels, and user experiences for popular video game franchises.",
      industry: "Gaming",
    },
    {
      id: 21,
      title: "Packaging Designer",
      company: "Procter & Gamble",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Procter-And-Gamble-Logo.png",
      location: "Cincinnati, OH",
      experience: "2+ Years",
      jobType: "Full-Time",
      salary: "$65k - $85k",
      postedDays: 7,
      featured: false,
      remoteType: "Hybrid",
      description:
        "Create innovative packaging designs for consumer products in a fast-paced retail environment.",
      industry: "Consumer Goods",
    },
    {
      id: 22,
      title: "Environmental Designer",
      company: "Gensler",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Gensler_logo.svg/2560px-Gensler_logo.svg.png",
      location: "Los Angeles, CA",
      experience: "5+ Years",
      jobType: "Full-Time",
      salary: "$95k - $125k",
      postedDays: 3,
      featured: false,
      remoteType: "On-site",
      description:
        "Design interior spaces and environmental graphics for commercial and residential projects.",
      industry: "Architecture",
    },
    {
      id: 23,
      title: "Typography Designer",
      company: "Monotype",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Monotype_logo.svg/2560px-Monotype_logo.svg.png",
      location: "Woburn, MA",
      experience: "3+ Years",
      jobType: "Full-Time",
      salary: "$80k - $100k",
      postedDays: 14,
      featured: false,
      remoteType: "Remote",
      description:
        "Create and refine typefaces for digital and print applications across various industries.",
      industry: "Typography",
    },
    {
      id: 24,
      title: "Exhibition Designer",
      company: "Smithsonian",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Smithsonian_Institution_logo.svg/1200px-Smithsonian_Institution_logo.svg.png",
      location: "Washington, DC",
      experience: "4+ Years",
      jobType: "Full-Time",
      salary: "$70k - $90k",
      postedDays: 21,
      featured: false,
      remoteType: "On-site",
      description:
        "Design interactive museum exhibitions and educational displays for public engagement.",
      industry: "Museum",
    },
  ];

  // Get visible jobs based on pagination
  const visibleJobs = jobListings.slice(0, visibleJobsCount);

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

  // Price Range options
  const priceRanges = [
    { label: "Under $30k", count: 24 },
    { label: "$30k - $50k", count: 68 },
    { label: "$50k - $80k", count: 142 },
    { label: "$80k - $120k", count: 87 },
    { label: "$120k+", count: 45 },
  ];

  // Remote Type options
  const remoteTypes = [
    { label: "Remote", count: 89 },
    { label: "Hybrid", count: 124 },
    { label: "On-site", count: 73 },
  ];

  // Industry options
  const industries = [
    { label: "Technology", count: 167 },
    { label: "Healthcare", count: 58 },
    { label: "Finance", count: 47 },
    { label: "Education", count: 36 },
    { label: "Retail", count: 29 },
    { label: "Manufacturing", count: 25 },
  ];

  // Popular Companies data
  const popularCompanies = [
    {
      name: "Google",
      jobs: 167,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",
    },
    {
      name: "Microsoft",
      jobs: 85,
      logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen-1024x376.jpg",
    },
    {
      name: "Apple",
      jobs: 77,
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/apple.svg",
    },
    {
      name: "Amazon",
      jobs: 68,
      logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg",
    },
    {
      name: "Meta",
      jobs: 27,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/2560px-Meta-Logo.png",
    },
    {
      name: "Netflix",
      jobs: 26,
      logo: "https://www.logodesignvalley.com/blog/wp-content/uploads/2024/10/2014%E2%80%93Present.png",
    },
    {
      name: "Adobe",
      jobs: 25,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/2560px-Adobe_Corporate_logo.svg.png",
    },
    {
      name: "IBM",
      jobs: 20,
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Color-IBM-Logo.jpg",
    },
  ];

  const totalPopularJobs = 495;

  const removeFilter = (filterToRemove) => {
    setActiveFilters(
      activeFilters.filter((filter) => filter !== filterToRemove),
    );
  };

  return (
    <>
      {/* Main Content with padding for mobile bottom button */}
      <div className="w-full min-h-screen bg-[#F8FAFC] pb-20 sm:pb-0">
        {/* Desktop "Back to Home" link */}
        <div className="hidden lg:block ml-10 mt-2">
          <Link to="/jobs">
            <p className="flex items-center gap-2 text-[#27bb97] capitalize hover:underline">
              <GoArrowUpLeft />
              back to home
            </p>
          </Link>
        </div>

        {/* ========== MOBILE FILTERS DRAWER ========== */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
            showMobileFilters ? "visible" : "invisible"
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              showMobileFilters ? "opacity-40" : "opacity-0"
            }`}
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Drawer */}
          <div
            className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 overflow-y-auto
            transition-transform duration-300 ${
              showMobileFilters ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 🔁 FILTERS SIDEBAR CONTENT */}
            <div className="space-y-8">
              {/* JOB TYPE */}
              <div>
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
                            <input type="checkbox" className="peer sr-only" />
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

              {/* EXPERIENCE LEVEL */}
              <div>
                <button
                  className="w-full flex justify-between items-center mb-4 group"
                  onClick={() => setOpenExperience(!openExperience)}
                >
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Experience Level
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                      openExperience ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                {openExperience && (
                  <div className="space-y-3 text-sm">
                    {[
                      {
                        label: "Entry Level",
                        count: 105,
                        color: "text-[#27bb97]",
                      },
                      { label: "Intermediate", count: 89 },
                      { label: "Expert", count: 56 },
                    ].map((item, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input type="checkbox" className="peer sr-only" />
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
                          {item.count}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* PRICE RANGE */}
              <div>
                <button
                  className="w-full flex justify-between items-center mb-4 group"
                  onClick={() => setOpenPriceRange(!openPriceRange)}
                >
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Price Range
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                      openPriceRange ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                {openPriceRange && (
                  <div className="space-y-4 text-sm">
                    <div className="p-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">Min</span>
                        <span className="text-xs text-gray-500">Max</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-20 p-2 border border-gray-300 rounded text-sm"
                          placeholder="0"
                        />
                        <span className="text-gray-400">to</span>
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-20 p-2 border border-gray-300 rounded text-sm"
                          placeholder="200000"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="range"
                          min="0"
                          max="300000"
                          step="10000"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="300000"
                          step="10000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-600">$0</span>
                        <span className="text-xs text-gray-600">$300k</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {priceRanges.map((range, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
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
                            <span className="text-gray-700">{range.label}</span>
                          </div>
                          <span className="text-gray-400 text-xs">
                            ({range.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* REMOTE TYPE */}
              <div>
                <button
                  className="w-full flex justify-between items-center mb-4 group"
                  onClick={() => setOpenRemoteType(!openRemoteType)}
                >
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Remote Type
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                      openRemoteType ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                {openRemoteType && (
                  <div className="space-y-3 text-sm">
                    {remoteTypes.map((type, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input type="checkbox" className="peer sr-only" />
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
                          <span className="text-gray-700">{type.label}</span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          ({type.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* LOCATION FILTER */}
              <div>
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
                            <input type="checkbox" className="peer sr-only" />
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

              {/* INDUSTRY */}
              <div>
                <button
                  className="w-full flex justify-between items-center mb-4 group"
                  onClick={() => setOpenIndustry(!openIndustry)}
                >
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Industry
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                      openIndustry ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                {openIndustry && (
                  <div className="space-y-3 text-sm">
                    {industries.map((industry, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <input type="checkbox" className="peer sr-only" />
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
                          <span className="text-gray-700">
                            {industry.label}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          ({industry.count})
                        </span>
                      </label>
                    ))}
                    <button className="w-full text-center text-[#27bb97] hover:text-[#1fa987] text-sm font-medium pt-2 transition-colors">
                      + Show More Industries
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
                            <input type="checkbox" className="peer sr-only" />
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
          </div>
        </div>

        {/* ========== MOBILE RIGHT SIDEBAR DRAWER ========== */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
            showMobileSidebar ? "visible" : "invisible"
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              showMobileSidebar ? "opacity-40" : "opacity-0"
            }`}
            onClick={() => setShowMobileSidebar(false)}
          />

          {/* Drawer */}
          <div
            className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 overflow-y-auto
            transition-transform duration-300 ${
              showMobileSidebar ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">
                Popular Companies
              </h3>
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 🔁 RIGHT SIDEBAR CONTENT */}
            <div className="space-y-8">
              {/* Subscription */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-8 shadow-sm border border-gray-100">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#27bb97] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-[#27bb97]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
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
                    Popular in <span className="text-[#27bb97]">Chicago</span>
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {totalPopularJobs} jobs
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
                          className="w-10 h-10 object-contain"
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
                            d="M9 5l7 7-7 7"
                          />
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

        {/* ========== HEADER ========== */}
        <div className="p-6">
          {/* Image Background Section */}
          <div
            className="rounded-2xl bg-white shadow-lg mb-10 
          bg-[url('/JobsImg/background.jpg')] 
          bg-cover bg-center relative overflow-hidden"
          >
            <div
              className="p-8 flex flex-col justify-end mb-10"
              style={{ height: "280px" }}
            >
              <div className="">
                <h1 className="text-white text-4xl font-bold mb-2">
                  Find your dream job
                </h1>
                <p className="text-white text-opacity-90 text-lg">
                  Discover the perfect career opportunity that matches your
                  skills
                </p>
              </div>
            </div>
          </div>

          {/* ========== SEARCH BAR ========== */}
          <div className="relative -mt-10 md:-mt-16 lg:-mt-24 mb-10 px-4">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 bg-white p-6 rounded-xl shadow-xl mx-auto max-w-7xl border border-gray-100">
              {/* Search Input */}
              <div
                className={`flex-1 bg-white rounded-lg p-3 flex items-center border-2 transition-all duration-300 ${
                  isSearchFocused
                    ? "border-[#27bb97] shadow-[0_0_0_3px_rgba(39,187,151,0.1)]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <IoSearch className="text-gray-400 mr-3 text-lg" />
                <div className="w-full relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full text-gray-900 font-medium text-base outline-none placeholder-gray-400"
                    placeholder="Enter the job title, keywords, or company..."
                  />
                </div>
              </div>

              {/* Location Input */}
              <div
                className={`lg:w-75 bg-white rounded-lg p-3 flex items-center border-2 transition-all duration-300 ${
                  isLocationFocused
                    ? "border-[#27bb97] shadow-[0_0_0_3px_rgba(39,187,151,0.1)]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <MapPin className="text-gray-400 mr-3 w-4 h-4" />
                <div className="w-full">
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
                className={`lg:w-64 bg-white rounded-lg p-3 flex items-center border-2 transition-all duration-300 ${
                  isCompanyFocused
                    ? "border-[#27bb97] shadow-[0_0_0_3px_rgba(39,187,151,0.1)]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Briefcase className="text-gray-400 mr-3 w-4 h-4" />
                <div className="w-full relative">
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
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
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
                hover:bg-[#1fa987] flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <IoSearch className="text-lg" />
                Search Jobs
              </button>
            </div>
          </div>

          {/* ========== MOBILE FILTER BUTTONS ========== */}
          <div className="flex lg:hidden gap-3 mb-6">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex-1 py-3 border border-gray-300 rounded-xl font-medium bg-white hover:bg-gray-50 flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="flex-1 py-3 border border-gray-300 rounded-xl font-medium bg-white hover:bg-gray-50 flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Menu className="w-4 h-4" />
              Companies
            </button>
          </div>

          {/* ========== MAIN CONTENT ========== */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
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
                  <button className="text-[#27bb97] hover:text-[#1fa987] text-sm font-medium transition-colors">
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* ========== RESPONSIVE LAYOUT ========== */}
            <div className="flex flex-col lg:flex-row">
              {/* Filters Sidebar - HIDDEN ON MOBILE */}
              <div className="hidden lg:block w-72 p-6 border-r border-gray-100 bg-white">
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
                              <input type="checkbox" className="peer sr-only" />
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

                {/* EXPERIENCE LEVEL */}
                <div className="mb-8">
                  <button
                    className="w-full flex justify-between items-center mb-4 group"
                    onClick={() => setOpenExperience(!openExperience)}
                  >
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Experience Level
                    </h4>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                        openExperience ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                  {openExperience && (
                    <div className="space-y-3 text-sm">
                      {[
                        {
                          label: "Entry Level",
                          count: 105,
                          color: "text-[#27bb97]",
                        },
                        { label: "Intermediate", count: 89 },
                        { label: "Expert", count: 56 },
                      ].map((item, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
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
                            {item.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* PRICE RANGE */}
                <div className="mb-8">
                  <button
                    className="w-full flex justify-between items-center mb-4 group"
                    onClick={() => setOpenPriceRange(!openPriceRange)}
                  >
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Price Range
                    </h4>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                        openPriceRange ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                  {openPriceRange && (
                    <div className="space-y-4 text-sm">
                      <div className="p-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-500">Min</span>
                          <span className="text-xs text-gray-500">Max</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-20 p-2 border border-gray-300 rounded text-sm"
                            placeholder="0"
                          />
                          <span className="text-gray-400">to</span>
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-20 p-2 border border-gray-300 rounded text-sm"
                            placeholder="200000"
                          />
                        </div>
                        <div className="mt-3">
                          <input
                            type="range"
                            min="0"
                            max="300000"
                            step="10000"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <input
                            type="range"
                            min="0"
                            max="300000"
                            step="10000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                          />
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-600">$0</span>
                          <span className="text-xs text-gray-600">$300k</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {priceRanges.map((range, idx) => (
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
                              <span className="text-gray-700">
                                {range.label}
                              </span>
                            </div>
                            <span className="text-gray-400 text-xs">
                              ({range.count})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* REMOTE TYPE */}
                <div className="mb-8">
                  <button
                    className="w-full flex justify-between items-center mb-4 group"
                    onClick={() => setOpenRemoteType(!openRemoteType)}
                  >
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Remote Type
                    </h4>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                        openRemoteType ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                  {openRemoteType && (
                    <div className="space-y-3 text-sm">
                      {remoteTypes.map((type, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
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
                            <span className="text-gray-700">{type.label}</span>
                          </div>
                          <span className="text-gray-400 text-xs">
                            ({type.count})
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
                              <input type="checkbox" className="peer sr-only" />
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

                {/* INDUSTRY */}
                <div className="mb-8">
                  <button
                    className="w-full flex justify-between items-center mb-4 group"
                    onClick={() => setOpenIndustry(!openIndustry)}
                  >
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Industry
                    </h4>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                        openIndustry ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                  {openIndustry && (
                    <div className="space-y-3 text-sm">
                      {industries.map((industry, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <input type="checkbox" className="peer sr-only" />
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
                            <span className="text-gray-700">
                              {industry.label}
                            </span>
                          </div>
                          <span className="text-gray-400 text-xs">
                            ({industry.count})
                          </span>
                        </label>
                      ))}
                      <button className="w-full text-center text-[#27bb97] hover:text-[#1fa987] text-sm font-medium pt-2 transition-colors">
                        + Show More Industries
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
                              <input type="checkbox" className="peer sr-only" />
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

              {/* ========== JOB LISTINGS SECTION ========== */}
              <div className="flex-1 p-6 bg-[#F8FAFC]">
                {/* Upload Resume Banner - STACKED MOBILE DESIGN */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8 cursor-pointer hover:shadow-md transition-all duration-300 group">
                  {/* Content Container */}
                  <div className="flex flex-col sm:flex-row items-center">
                    {/* Icon + Text Container */}
                    <div className="flex items-center w-full sm:w-auto mb-3 sm:mb-0">
                      <div className="text-blue-600 mr-3 p-2.5 bg-white rounded-lg shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                        <RiUploadCloud2Line
                          size={24}
                          className="sm:w-7 sm:h-7"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                          Upload your resume
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                          Get matched with the best jobs instantly
                        </p>
                      </div>
                    </div>

                    {/* Action Button for Mobile */}
                    <div className="w-full sm:w-auto flex justify-between items-center mt-2 sm:mt-0">
                      <span className="text-xs text-blue-600 font-medium sm:hidden">
                        Tap to upload →
                      </span>
                      <div className="text-blue-600 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform">
                        <HiOutlineArrowDown
                          size={18}
                          className="sm:w-5 sm:h-5 rotate-90 sm:rotate-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {jobListings.length} Designer Jobs
                    </h2>
                    <p className="text-sm text-gray-500">
                      Showing {visibleJobs.length} of {jobListings.length} jobs
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 font-medium">
                      Sort By:
                    </span>
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

                {/* Job Cards - OPTIMIZED FOR MOBILE */}
                <div className="space-y-4">
                  {visibleJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handleJobClick(job.id)}
                      className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6 hover:shadow-xl transition-all duration-300 relative group cursor-pointer"
                    >
                      {/* Featured Tag - OPTIMIZED */}
                      {job.featured && (
                        <div className="absolute -top-2 left-3 lg:-top-3 lg:left-6">
                          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-semibold px-2 py-0.5 lg:px-4 lg:py-1.5 rounded-full shadow-sm">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Top Row: Company Logo + Basic Info */}
                      <div className="flex items-start gap-3 mb-3">
                        {/* Company Logo - COMPACT */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-lg lg:rounded-xl border border-gray-200 p-1.5 lg:p-2 shadow-sm flex items-center justify-center">
                            <img
                              src={job.logo}
                              alt={job.company}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML = `
                                <span class='text-sm lg:text-lg font-bold text-gray-600'>
                                  ${job.company.charAt(0)}
                                </span>
                              `;
                              }}
                            />
                          </div>
                        </div>

                        {/* Company and Location - STACKED */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base lg:text-xl font-bold text-gray-900 mb-1 group-hover:text-[#27bb97] transition-colors cursor-pointer hover:underline line-clamp-1">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 font-medium text-sm lg:text-lg mb-1">
                            {job.company}
                          </p>
                          <div className="flex items-center text-gray-500 text-xs lg:text-sm">
                            <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </div>
                        </div>

                        {/* Apply Now Button - COMPACT */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle apply now logic here
                          }}
                          className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-[#27bb97] to-[#1fa987] text-white text-xs font-semibold rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>

                      {/* Badge Row: Remote Type + Salary */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {/* Remote Type Badge */}
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] lg:text-xs font-medium ${
                            job.remoteType === "Remote"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : job.remoteType === "Hybrid"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-purple-50 text-purple-700 border border-purple-200"
                          }`}
                        >
                          {job.remoteType}
                        </span>

                        {/* Salary Badge - MOBILE PROMINENT */}
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] lg:text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {job.salary}
                        </span>

                        {/* Industry Badge */}
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] lg:text-xs font-medium bg-gray-100 text-gray-700">
                          {job.industry}
                        </span>
                      </div>

                      {/* Job Description - BETTER MOBILE */}
                      <p className="text-xs lg:text-sm text-gray-600 mb-3 line-clamp-2 lg:line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Key Details Grid - OPTIMIZED FOR MOBILE */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="space-y-0.5">
                          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                            Experience
                          </p>
                          <div className="flex items-center">
                            <Briefcase className="w-3 h-3 lg:w-4 lg:h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                            <p className="font-semibold text-gray-900 text-xs lg:text-sm truncate">
                              {job.experience}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                            Job Type
                          </p>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 lg:w-4 lg:h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                            <p className="font-semibold text-gray-900 text-xs lg:text-sm truncate">
                              {job.jobType}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                            Posted
                          </p>
                          <p className="font-semibold text-gray-900 text-xs lg:text-sm">
                            {job.postedDays}d ago
                          </p>
                        </div>
                      </div>

                      {/* Desktop Salary (hidden on mobile) */}
                      <div className="hidden lg:block mb-3">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-semibold text-gray-900">
                            {job.salary}
                            <span className="text-gray-500 text-sm ml-1">
                              /year
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons - OPTIMIZED FOR MOBILE */}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle save job logic here
                            }}
                            className="flex items-center gap-1.5 text-gray-500 hover:text-[#27bb97] transition-colors duration-200 group/save"
                          >
                            <Bookmark className="w-4 h-4 lg:w-4 lg:h-4 group-hover/save:fill-[#27bb97]" />
                            <span className="text-xs font-medium">Save</span>
                          </button>

                          <button
                            onClick={(e) => handleViewDetailsClick(job.id, e)}
                            className="text-gray-500 hover:text-[#27bb97] text-xs font-medium transition-colors duration-200"
                          >
                            Details
                          </button>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle quick apply logic here
                          }}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium hover:border-[#27bb97] hover:text-[#27bb97] transition-all duration-200"
                        >
                          Quick Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button - Only show if there are more jobs to load */}
                {visibleJobs.length < jobListings.length && (
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
                      {isLoadingMore
                        ? "Loading More Jobs..."
                        : "Load More Jobs"}
                    </button>
                  </div>
                )}

                {/* Show message when all jobs are loaded */}
                {visibleJobs.length >= jobListings.length &&
                  visibleJobs.length > 6 && (
                    <div className="text-center mt-10">
                      <p className="text-gray-600 font-medium">
                        All {jobListings.length} jobs have been loaded
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        You've reached the end of the job listings
                      </p>
                    </div>
                  )}
              </div>

              {/* ========== RIGHT SIDEBAR - HIDDEN ON MOBILE ========== */}
              <div className="hidden lg:block w-80 p-6 border-l border-gray-100 bg-white">
                {/* Subscription */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-8 shadow-sm border border-gray-100">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-[#27bb97] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-6 h-6 text-[#27bb97]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
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
                      Popular in <span className="text-[#27bb97]">Chicago</span>
                    </h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {totalPopularJobs} jobs
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
                            className="w-10 h-10 object-contain"
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
                              d="M9 5l7 7-7 7"
                            />
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

        {/* Mobile Bottom "Back to Home" Button - Fixed at bottom center */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="flex justify-center">
            <Link to="/jobs">
              <div
                className="
                flex 
                items-center 
                justify-center 
                gap-2 
                text-[#27bb97] 
                capitalize 
                bg-white 
                px-6 
                py-3 
                rounded-lg 
                shadow-lg 
                border 
                border-gray-300
                hover:bg-gray-50
                transition-all
                duration-200
                whitespace-nowrap
                text-base
                font-medium
                w-fit
                mx-auto
                hover:shadow-xl
                hover:-translate-y-0.5
                active:translate-y-0
              "
              >
                <GoArrowUpLeft className="w-5 h-5" />
                <span>back to home</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSearchPortal;
