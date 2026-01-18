import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// React Icons imports
import { CiClock2 } from "react-icons/ci";
import {
  FaLongArrowAltRight,
  FaSearch,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { GoArrowUpLeft } from "react-icons/go";
export default function JobSeekerInterface() {
  const [jobRole, setJobRole] = useState("");
  const [location, setLocation] = useState("");
  const [visibleJobs, setVisibleJobs] = useState(6); // CHANGED: Show 6 jobs initially
  const [loading, setLoading] = useState(false);
  const [allJobsLoaded, setAllJobsLoaded] = useState(false);
  const [showProfiles, setShowProfiles] = useState(false);
  const [showArticles, setShowArticles] = useState(false);

  // Updated profiles array with progress values
  const profiles = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      title: "Receptionist",
      updated: "2 hrs ago",
      location: "Denton, TX",
      progress: 95, // 95% profile complete
      lastActive: "Just now",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      title: "Data Entry Operator",
      updated: "3 hrs ago",
      location: "Sayreville, NJ",
      progress: 87,
      lastActive: "1 hr ago",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      title: "Mainframe Developer",
      updated: "4 hrs ago",
      location: "South Plainfield",
      progress: 92,
      lastActive: "30 mins ago",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      title: "Leasing Consultant",
      updated: "5 hrs ago",
      location: "Houston, TX",
      progress: 78,
      lastActive: "2 hrs ago",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      title: "Founder & Lead Architect",
      updated: "7 hrs ago",
      location: "Staten Island, NY",
      progress: 100,
      lastActive: "4 hrs ago",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      title: "Accountant",
      updated: "7 hrs ago",
      location: "Toms River, NJ",
      progress: 85,
      lastActive: "3 hrs ago",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      title: "Nanny",
      updated: "7 hrs ago",
      location: "Sunnyvale, CA",
      progress: 70,
      lastActive: "6 hrs ago",
    },
  ];

  // articles
  const articles = [
    {
      id: 1,
      title: "What Does Prompt Engineering Entail in 2026? Skills, Salary, ...",
      author: "Rajkamal",
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"%3E%3Crect fill="%23002147" width="200" height="150"/%3E%3Cg fill="%23FDB913"%3E%3Crect x="45" y="45" width="30" height="35" rx="3"/%3E%3Crect x="45" y="85" width="30" height="8" rx="2"/%3E%3Crect x="80" y="50" width="25" height="25" rx="3"/%3E%3Crect x="85" y="55" width="5" height="5"/%3E%3Crect x="92" y="55" width="5" height="5"/%3E%3Crect x="85" y="65" width="15" height="3" rx="1"/%3E%3Ccircle cx="130" cy="60" r="25"/%3E%3Cpath d="M130 50 L135 60 L130 70 L125 60 Z"/%3E%3Cpath d="M120 60 L140 60 M130 50 L130 70" stroke="%23002147" stroke-width="2"/%3E%3C/g%3E%3C/svg%3E',
      description:
        "Explore the future of prompt engineering in 2026, covering essential skills, salary trends, real-world use cases, and the growing demand fo...",
      readMoreLink: "Read more »",
    },
    {
      id: 2,
      title: "How Indian IT Firms Are Slashing H-1B Visa Reliance in 202...",
      author: "Rajkamal",
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org2000/svg" viewBox="0 0 200 150"%3E%3Crect fill="%23003D5C" width="200" height="150"/%3E%3Ctext x="20" y="30" font-family="Arial" font-size="12" font-weight="bold" fill="white"%3EHow Indian IT Firms Are Slashing H-1B Visa%3C/text%3E%3Ctext x="20" y="45" font-family="Arial" font-size="12" font-weight="bold" fill="white"%3EReliance in 2025: Trends, Challenges and Costs%3C/text%3E%3Crect x="140" y="25" width="40" height="50" fill="white" rx="2"/%3E%3Ctext x="148" y="40" font-family="Arial" font-size="10" font-weight="bold" fill="%23003D5C"%3EH-1B VISA%3C/text%3E%3Crect x="145" y="45" width="30" height="3" fill="%23003D5C"/%3E%3Crect x="145" y="52" width="25" height="2" fill="%23666"/%3E%3Crect x="145" y="57" width="28" height="2" fill="%23666"/%3E%3Cg fill="%23FDB913"%3E%3Ctext x="25" y="75" font-family="Arial" font-size="11" font-weight="bold"%3EKey Highlights:%3C/text%3E%3Ccircle cx="30" cy="90" r="2"/%3E%3Ctext x="38" y="93" font-family="Arial" font-size="9"%3ECost Reduction%3C/text%3E%3Ccircle cx="30" cy="105" r="2"/%3E%3Ctext x="38" y="108" font-family="Arial" font-size="9"%3EAI Automation%3C/text%3E%3Ccircle cx="110" cy="90" r="2"/%3E%3Ctext x="118" y="93" font-family="Arial" font-size="9"%3EPolicy Changes%3C/text%3E%3Ccircle cx="110" cy="105" r="2"/%3E%3Ctext x="118" y="108" font-family="Arial" font-size="9"%3EGlobal Talent%3C/text%3E%3C/g%3E%3Cpath d="M140 100 L150 110 L160 95 L170 105 L180 90" stroke="%2300D4FF" stroke-width="2" fill="none"/%3E%3Cg fill="white"%3E%3Ccircle cx="160" cy="130" r="8"/%3E%3Cpath d="M156 130 L159 133 L165 127" stroke="%23003D5C" stroke-width="2" fill="none"/%3E%3Ccircle cx="45" cy="130" r="8"/%3E%3Cpath d="M45 126 L45 134 M41 130 L49 130" stroke="%23003D5C" stroke-width="2"/%3E%3Ccircle cx="100" cy="130" r="8"/%3E%3Cpath d="M100 126 L100 134 M96 130 L104 130" stroke="%23003D5C" stroke-width="2"/%3E%3C/g%3E%3C/svg%3E',
      description:
        "Indian IT firms have sharply reduced H-1B use in 2025 due to tighter US policies, higher costs, and AI-driven automation, while expanding n...",
      readMoreLink: "Read more »",
    },
    {
      id: 3,
      title: "High-Demand Jobs in USA for Indians in 2026-2027: Guide t...",
      author: "Rajkamal",
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"%3E%3Crect fill="%23003D5C" width="200" height="150"/%3E%3Ctext x="15" y="25" font-family="Arial" font-size="13" font-weight="bold" fill="white"%3EHIGH-DEMAND%3C/text%3E%3Ctext x="15" y="40" font-family="Arial" font-size="13" font-weight="bold" fill="white"%3EJOBS IN USA FOR%3C/text%3E%3Ctext x="15" y="55" font-family="Arial" font-size="13" font-weight="bold" fill="white"%3EINDIANS IN 2026-%3C/text%3E%3Ctext x="15" y="70" font-family="Arial" font-size="13" font-weight="bold" fill="white"%3E2027%3C/text%3E%3Ccircle cx="170" cy="35" r="18" fill="none" stroke="white" stroke-width="2"/%3E%3Cpath d="M170 17 L170 35 M155 35 L185 35" stroke="white" stroke-width="2"/%3E%3Cpath d="M170 35 L178 43 L162 43 Z" fill="white"/%3E%3Ccircle cx="175" cy="35" r="20" fill="none" stroke="white" stroke-width="1" opacity="0.3"/%3E%3Ccircle cx="35" cy="100" r="15" fill="%2300A3E0"/%3E%3Cpath d="M35 90 L35 100 L42 95 Z" fill="white"/%3E%3Cpath d="M30 105 L40 105 M35 100 L35 110" stroke="white" stroke-width="2"/%3E%3Crect x="60" y="95" width="25" height="18" rx="2" fill="%230000A3E0"/%3E%3Crect x="65" y="99" width="15" height="2" fill="white"/%3E%3Crect x="65" y="104" width="12" height="2" fill="white"/%3E%3Crect x="65" y="109" width="10" height="1" fill="white"/%3E%3Ccircle cx="170" cy="100" r="15" fill="none" stroke="%2300A3E0" stroke-width="2"/%3E%3Cpath d="M165 95 Q170 85 175 95 M175 95 L175 105 M165 105 L175 105" stroke="%2300A3E0" stroke-width="2" fill="none"/%3E%3Cg fill="%23FDB913"%3E%3Ccircle cx="30" cy="130" r="8"/%3E%3Cpath d="M26 130 L29 133 L35 127" stroke="%23003D5C" stroke-width="2" fill="none"/%3E%3Ccircle cx="70" cy="130" r="8"/%3E%3Cpath d="M70 126 L70 130 L74 128" stroke="%23003D5C" stroke-width="2" fill="none"/%3E%3Ccircle cx="110" cy="130" r="8"/%3E%3Ctext x="107" y="134" font-size="10" font-weight="bold" fill="%23003D5C"%3E$%3C/text%3E%3Ccircle cx="150" cy="130" r="8"/%3E%3Crect x="147" y="127" width="6" height="6" stroke="%23003D5C" stroke-width="1.5" fill="none"/%3E%3C/g%3E%3Ccircle cx="175" cy="60" r="12" fill="none" stroke="white" stroke-width="2"/%3E%3Cpath d="M175 52 L175 60 L180 55" stroke="white" stroke-width="2" fill="none"/%3E%3Cpath d="M164 63 L164 68 L186 68 L186 63 Q175 58 164 63" fill="%23DC143C"/%3E%3Cpath d="M164 68 L164 73 L186 73 L186 68" fill="white"/%3E%3Cpath d="M164 73 L164 78 L186 78 L186 73" fill="%23DC143C"/%3E%3C/svg%3E',
      description:
        "ChatGPT said:Discover the top high-demand US jobs for Indians in 2026–2027, including salary insights, key sectors, and updated H-1B visa p...",
      readMoreLink: "Read more »",
    },
  ];

  // Job cards data - more than 20 items
  const jobCards = [
    {
      id: 1,
      title: "Mainframe Developer",
      location: "South Plainfield, NJ",
      timeAgo: "3 hrs ago",
      workHistory: "2 Years",
      currentPosition: "Mainframe Developer",
      industry: "IT Software / Services",
      functionalArea: "IT Software",
      skills: "java, devops",
      description:
        "Looking for a career in Mainframe technology. Preferrably remote position. Can work on C2C or W2",
      salary: "$50-60",
      salaryPeriod: "/Monthly",
      link: "/jobs/mainframe-developer",
    },
    {
      id: 2,
      title: "Senior Software Engineer",
      location: "New York, NY",
      timeAgo: "1 hr ago",
      workHistory: "5 Years",
      currentPosition: "Senior Software Engineer",
      industry: "IT Software",
      functionalArea: "Software Development",
      skills: "React, Node.js, AWS",
      description:
        "Experienced full-stack developer seeking challenging role in innovative tech company.",
      salary: "$80-95",
      salaryPeriod: "/Monthly",
      link: "/jobs/senior-software-engineer",
    },
    {
      id: 3,
      title: "Data Scientist",
      location: "San Francisco, CA",
      timeAgo: "5 hrs ago",
      workHistory: "3 Years",
      currentPosition: "Data Scientist",
      industry: "Data Analytics",
      functionalArea: "Machine Learning",
      skills: "Python, TensorFlow, SQL",
      description:
        "Passionate about AI/ML applications in healthcare and finance sectors.",
      salary: "$75-90",
      salaryPeriod: "/Monthly",
      link: "/jobs/data-scientist",
    },
    {
      id: 4,
      title: "Product Manager",
      location: "Austin, TX",
      timeAgo: "2 days ago",
      workHistory: "4 Years",
      currentPosition: "Product Manager",
      industry: "Tech Products",
      functionalArea: "Product Management",
      skills: "Agile, Scrum, User Research",
      description:
        "Driving product strategy and roadmap for consumer-facing applications.",
      salary: "$85-100",
      salaryPeriod: "/Monthly",
      link: "/jobs/product-manager",
    },
    {
      id: 5,
      title: "UX/UI Designer",
      location: "Seattle, WA",
      timeAgo: "6 hrs ago",
      workHistory: "3 Years",
      currentPosition: "UX/UI Designer",
      industry: "Design Services",
      functionalArea: "User Experience",
      skills: "Figma, Adobe XD, Prototyping",
      description:
        "Creating intuitive and beautiful user interfaces for web and mobile apps.",
      salary: "$60-75",
      salaryPeriod: "/Monthly",
      link: "/jobs/ux-ui-designer",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      location: "Chicago, IL",
      timeAgo: "8 hrs ago",
      workHistory: "4 Years",
      currentPosition: "DevOps Engineer",
      industry: "Cloud Services",
      functionalArea: "Infrastructure",
      skills: "Docker, Kubernetes, AWS",
      description:
        "Building scalable cloud infrastructure and CI/CD pipelines.",
      salary: "$70-85",
      salaryPeriod: "/Monthly",
      link: "/jobs/devops-engineer",
    },
    {
      id: 7,
      title: "Cybersecurity Analyst",
      location: "Washington, DC",
      timeAgo: "1 day ago",
      workHistory: "3 Years",
      currentPosition: "Cybersecurity Analyst",
      industry: "Security Services",
      functionalArea: "Information Security",
      skills: "Network Security, Threat Analysis",
      description:
        "Protecting organizational data and infrastructure from cyber threats.",
      salary: "$65-80",
      salaryPeriod: "/Monthly",
      link: "/jobs/cybersecurity-analyst",
    },
    {
      id: 8,
      title: "Cloud Architect",
      location: "Denver, CO",
      timeAgo: "12 hrs ago",
      workHistory: "6 Years",
      currentPosition: "Cloud Architect",
      industry: "Cloud Computing",
      functionalArea: "Cloud Infrastructure",
      skills: "AWS, Azure, GCP",
      description:
        "Designing and implementing cloud solutions for enterprise clients.",
      salary: "$90-110",
      salaryPeriod: "/Monthly",
      link: "/jobs/cloud-architect",
    },
    {
      id: 9,
      title: "Mobile App Developer",
      location: "Boston, MA",
      timeAgo: "4 hrs ago",
      workHistory: "4 Years",
      currentPosition: "Mobile App Developer",
      industry: "Mobile Apps",
      functionalArea: "Mobile Development",
      skills: "React Native, Swift, Kotlin",
      description:
        "Building cross-platform mobile applications for iOS and Android.",
      salary: "$70-85",
      salaryPeriod: "/Monthly",
      link: "/jobs/mobile-app-developer",
    },
    {
      id: 10,
      title: "AI Research Engineer",
      location: "Palo Alto, CA",
      timeAgo: "7 hrs ago",
      workHistory: "3 Years",
      currentPosition: "AI Research Engineer",
      industry: "AI Research",
      functionalArea: "Artificial Intelligence",
      skills: "PyTorch, NLP, Computer Vision",
      description: "Researching and implementing cutting-edge AI algorithms.",
      salary: "$85-100",
      salaryPeriod: "/Monthly",
      link: "/jobs/ai-research-engineer",
    },
    {
      id: 11,
      title: "Business Analyst",
      location: "Atlanta, GA",
      timeAgo: "2 days ago",
      workHistory: "3 Years",
      currentPosition: "Business Analyst",
      industry: "Consulting",
      functionalArea: "Business Analysis",
      skills: "Data Analysis, SQL, Excel",
      description: "Bridging the gap between IT and business stakeholders.",
      salary: "$55-70",
      salaryPeriod: "/Monthly",
      link: "/jobs/business-analyst",
    },
    {
      id: 12,
      title: "QA Automation Engineer",
      location: "Portland, OR",
      timeAgo: "10 hrs ago",
      workHistory: "3 Years",
      currentPosition: "QA Automation Engineer",
      industry: "Software Testing",
      functionalArea: "Quality Assurance",
      skills: "Selenium, Jest, Cypress",
      description: "Automating test cases and ensuring software quality.",
      salary: "$60-75",
      salaryPeriod: "/Monthly",
      link: "/jobs/qa-automation-engineer",
    },
    {
      id: 13,
      title: "Network Engineer",
      location: "Dallas, TX",
      timeAgo: "1 day ago",
      workHistory: "4 Years",
      currentPosition: "Network Engineer",
      industry: "Networking",
      functionalArea: "Network Infrastructure",
      skills: "Cisco, Juniper, Network Security",
      description:
        "Designing and maintaining enterprise network infrastructure.",
      salary: "$65-80",
      salaryPeriod: "/Monthly",
      link: "/jobs/network-engineer",
    },
    {
      id: 14,
      title: "Database Administrator",
      location: "Phoenix, AZ",
      timeAgo: "15 hrs ago",
      workHistory: "5 Years",
      currentPosition: "Database Administrator",
      industry: "Database Management",
      functionalArea: "Database Administration",
      skills: "SQL Server, Oracle, MySQL",
      description: "Managing and optimizing database performance and security.",
      salary: "$70-85",
      salaryPeriod: "/Monthly",
      link: "/jobs/database-administrator",
    },
    {
      id: 15,
      title: "Frontend Developer",
      location: "Miami, FL",
      timeAgo: "3 hrs ago",
      workHistory: "3 Years",
      currentPosition: "Frontend Developer",
      industry: "Web Development",
      functionalArea: "Frontend Development",
      skills: "React, Vue.js, TypeScript",
      description: "Building responsive and interactive web applications.",
      salary: "$65-80",
      salaryPeriod: "/Monthly",
      link: "/jobs/frontend-developer",
    },
    {
      id: 16,
      title: "Backend Developer",
      location: "Las Vegas, NV",
      timeAgo: "6 hrs ago",
      workHistory: "4 Years",
      currentPosition: "Backend Developer",
      industry: "Web Development",
      functionalArea: "Backend Development",
      skills: "Node.js, Python, MongoDB",
      description: "Developing server-side logic and database architecture.",
      salary: "$70-85",
      salaryPeriod: "/Monthly",
      link: "/jobs/backend-developer",
    },
    {
      id: 17,
      title: "Full Stack Developer",
      location: "San Diego, CA",
      timeAgo: "9 hrs ago",
      workHistory: "4 Years",
      currentPosition: "Full Stack Developer",
      industry: "Web Development",
      functionalArea: "Full Stack Development",
      skills: "MERN Stack, REST APIs, Docker",
      description:
        "End-to-end web application development from frontend to backend.",
      salary: "$75-90",
      salaryPeriod: "/Monthly",
      link: "/jobs/full-stack-developer",
    },
    {
      id: 18,
      title: "IT Project Manager",
      location: "Philadelphia, PA",
      timeAgo: "2 days ago",
      workHistory: "6 Years",
      currentPosition: "IT Project Manager",
      industry: "Project Management",
      functionalArea: "IT Projects",
      skills: "PMP, Agile, Risk Management",
      description: "Leading IT projects from initiation to completion.",
      salary: "$80-95",
      salaryPeriod: "/Monthly",
      link: "/jobs/it-project-manager",
    },
    {
      id: 19,
      title: "System Administrator",
      location: "Houston, TX",
      timeAgo: "1 day ago",
      workHistory: "4 Years",
      currentPosition: "System Administrator",
      industry: "System Administration",
      functionalArea: "IT Infrastructure",
      skills: "Linux, Windows Server, PowerShell",
      description: "Managing and maintaining server infrastructure.",
      salary: "$60-75",
      salaryPeriod: "/Monthly",
      link: "/jobs/system-administrator",
    },
    {
      id: 20,
      title: "Machine Learning Engineer",
      location: "San Jose, CA",
      timeAgo: "4 hrs ago",
      workHistory: "3 Years",
      currentPosition: "Machine Learning Engineer",
      industry: "Machine Learning",
      functionalArea: "ML Engineering",
      skills: "Python, Scikit-learn, Deep Learning",
      description:
        "Building and deploying machine learning models in production.",
      salary: "$85-100",
      salaryPeriod: "/Monthly",
      link: "/jobs/machine-learning-engineer",
    },
    {
      id: 21,
      title: "Blockchain Developer",
      location: "Los Angeles, CA",
      timeAgo: "7 hrs ago",
      workHistory: "2 Years",
      currentPosition: "Blockchain Developer",
      industry: "Blockchain",
      functionalArea: "Blockchain Development",
      skills: "Solidity, Ethereum, Smart Contracts",
      description:
        "Developing decentralized applications on blockchain platforms.",
      salary: "$80-95",
      salaryPeriod: "/Monthly",
      link: "/jobs/blockchain-developer",
    },
    {
      id: 22,
      title: "Game Developer",
      location: "Orlando, FL",
      timeAgo: "1 day ago",
      workHistory: "3 Years",
      currentPosition: "Game Developer",
      industry: "Gaming",
      functionalArea: "Game Development",
      skills: "Unity, C#, 3D Graphics",
      description:
        "Creating engaging game experiences across multiple platforms.",
      salary: "$65-80",
      salaryPeriod: "/Monthly",
      link: "/jobs/game-developer",
    },
  ];

  // Handle View More click
  const handleViewMore = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newVisibleCount = visibleJobs + 3;
      setVisibleJobs(newVisibleCount);

      // Check if all jobs are loaded
      if (newVisibleCount >= jobCards.length) {
        setAllJobsLoaded(true);
      }

      setLoading(false);
    }, 1000); // 1 second loading simulation
  };

  // Calculate if we should show the View More button
  const showViewMoreButton = !allJobsLoaded && jobCards.length > visibleJobs;

  return (
    <>
      {/* Main Content with padding for mobile bottom button */}
      <div className="bg-gray-50 min-h-screen pb-20 sm:pb-0">
        {/* Desktop "Back to Home" link */}
        <div className="hidden lg:block ml-10 mt-2">
          <Link to="/jobs">
            <p className="flex items-center gap-2 text-[#27bb97] capitalize hover:underline">
              <GoArrowUpLeft />
              back to home
            </p>
          </Link>
        </div>

        {/* Header */}
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Local Jobs</span>
            <span className="mx-2">→</span>
            <span className="text-gray-500">Job Seekers in USA / Canada</span>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-6 lg:py-8 -mt-4">
          {/* MAIN LAYOUT - THIS IS ALREADY PERFECT */}
          <div className="grid grid-cols-1 lg:grid-cols-[66%_34%] gap-6">
            {/* LEFT SIDE (66%) */}

            <div className="w-full">
              {/* Search Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="Job role"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  <button className="px-6 sm:px-8 py-3 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-md font-medium cursor-pointer text-sm sm:text-base">
                    Search
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex flex-wrap justify-center gap-2">
                  <button className="px-4 sm:px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm sm:text-base min-h-[44px]">
                    Find Jobs
                  </button>
                  <button className="px-4 sm:px-6 py-2 bg-blue-100 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-200 text-sm sm:text-base min-h-[44px]">
                    Hire Talent
                  </button>
                </div>

                <button className="px-4 sm:px-6 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 text-sm sm:text-base min-h-[44px]">
                  Profile Creators
                </button>
              </div>

              <div className="bg-yellow-50 relative border-orange-400 border-b border-dashed border-gray-300 p-4 sm:p-6 rounded-r-lg mb-6">
                <div className="bg-orange-400 h-full w-[3px] absolute left-0 top-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Browse Latest Job Seekers in the USA and Canada – Connect Now!
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Access {jobCards.length} Ads of Qualified Jobs Candidates.
                </p>
              </div>

              {/* Job Cards Container with smooth animation - NOW SHOWS 6 CARDS INITIALLY */}
              <div className="space-y-6 transition-all duration-500 ease-in-out">
                {jobCards.slice(0, visibleJobs).map((job, index) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.005] group"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: `fadeInUp 0.5s ease-out ${index * 100}ms both`,
                    }}
                  >
                    {/* Mobile: Stacked layout, Desktop: Original side-by-side layout */}
                    <div className="flex flex-col lg:flex-row lg:items-center border-b-2 border-dotted mb-7 cursor-pointer">
                      <div className="flex-1">
                        {/* Card Title - Mobile: smaller, Desktop: original */}
                        <a href={job.link || "#"} className="inline-block">
                          <h3 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-[#1fa987] transition-colors duration-300 cursor-pointer lg:text-2xl">
                            {job.title}
                          </h3>
                        </a>

                        {/* Location & Time - Mobile: stacked, Desktop: side-by-side */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-6">
                          <div className="flex items-center gap-1 font-medium">
                            <FaMapMarkerAlt className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1 font-semibold text-gray-400">
                            <CiClock2 className="w-4 h-4" />
                            <span>{job.timeAgo}</span>
                          </div>
                        </div>

                        {/* dots line */}
                        <div className="w-full border-b border-dotted border-gray-300 -mt-2"></div>

                        {/* Work info grid - Mobile: 2 columns, Desktop: 4 columns */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-10 pb-6 mt-5 border-b border-gray-200">
                          {/* Work History */}
                          <div className="flex flex-col items-start">
                            <img
                              src="/JobsImg/workImg.png"
                              alt="Work History"
                              className="h-10 w-10"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                              Work History
                            </p>
                            <p className="font-semibold text-gray-800 lg:text-base">
                              {job.workHistory}
                            </p>
                          </div>

                          {/* Current Position */}
                          <div className="flex flex-col items-start">
                            <img
                              src="/JobsImg/userIcon.png"
                              alt="Current Position"
                              className="h-10 w-10"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                              Current Position
                            </p>
                            <p className="font-semibold text-blue-600 lg:text-base">
                              {job.currentPosition}
                            </p>
                          </div>

                          {/* Industry - Hidden on mobile, shown on desktop */}
                          <div className="hidden lg:flex flex-col items-start">
                            <img
                              src="/JobsImg/factory.png"
                              alt="Industry"
                              className="h-10 w-10"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                              Industry
                            </p>
                            <p className="font-semibold text-gray-800">
                              {job.industry}
                            </p>
                          </div>

                          {/* Functional Area - Hidden on mobile, shown on desktop */}
                          <div className="hidden lg:flex flex-col items-start">
                            <img
                              src="/JobsImg/factory.png"
                              alt="Functional Area"
                              className="h-10 w-10"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                              Functional Area
                            </p>
                            <p className="font-semibold text-gray-800">
                              {job.functionalArea}
                            </p>
                          </div>
                        </div>

                        {/* Industry & Functional Area - Shown as badges on mobile */}
                        <div className="lg:hidden flex flex-wrap gap-2 mb-8">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {job.industry}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {job.functionalArea}
                          </span>
                        </div>

                        {/* skills and more details - Better mobile readability */}
                        <div className="font-normal mb-6 lg:mb-10 -mt-6 lg:-mt-8">
                          <p className="font-semibold text-gray-800 text-sm lg:text-[14px] mb-2">
                            Skills:{" "}
                            <span className="text-gray-500 text-sm lg:text-[14px] font-normal">
                              {job.skills}
                            </span>
                          </p>
                          <p className="font-semibold text-gray-800 text-sm lg:text-[14px]">
                            More on Me:{" "}
                            <span className="text-gray-500 text-sm lg:text-[14px] font-normal">
                              {job.description}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Vertical Divider - HIDDEN ON MOBILE, SHOWN ON DESKTOP */}
                      <div className="hidden lg:block h-[280px] w-[1px] bg-gray-300" />

                      {/* Salary section - Mobile: below content, Desktop: side panel */}
                      <div className="lg:p-4 mt-4 lg:mt-0">
                        <p className="text-sm lg:text-base">Expected Salary</p>
                        <h1 className="text-xl lg:text-[20px] font-bold">
                          {job.salary}{" "}
                          <span className="text-xs lg:text-[12px] text-gray-500">
                            {job.salaryPeriod}
                          </span>
                        </h1>
                      </div>
                    </div>

                    {/* footer buttons - Mobile: stacked, Desktop: side-by-side */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Left icons */}
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="p-2 border rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 hover:scale-105 hover:shadow-sm active:scale-95 cursor-pointer">
                          ❤️
                        </button>

                        <button className="p-2 border rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 hover:scale-105 hover:shadow-sm active:scale-95 cursor-pointer">
                          🔗
                        </button>
                      </div>

                      {/* Right actions */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-6 py-2 border rounded-md transition-all duration-200 ease-in-out hover:bg-gray-50 hover:border-gray-400 hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base">
                          View More
                        </button>

                        <button className="w-full sm:w-auto px-6 lg:px-8 py-2 bg-[#27bb97] text-white rounded-md font-semibold transition-all duration-200 ease-in-out hover:bg-[#1fa987] hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer text-sm sm:text-base">
                          Hire Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More Button with Loading Animation */}
              {showViewMoreButton && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleViewMore}
                    disabled={loading}
                    className="px-6 sm:px-8 py-3 bg-[#27bb97] text-white rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-[#1fa987] hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group w-full sm:w-auto min-h-[44px]"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>View More Jobs</span>
                        <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    )}
                  </button>
                  <p className="text-gray-500 text-sm mt-2">
                    Showing {visibleJobs} of {jobCards.length} jobs
                  </p>
                </div>
              )}

              {/* All Jobs Loaded Message */}
              {allJobsLoaded && (
                <div className="mt-8 text-center animate-fadeIn">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    <span className="font-medium">✓</span>
                    <span>All {jobCards.length} jobs loaded</span>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE (34%) */}
            <div className="w-full mb-6 space-y-6 lg:space-y-0">
              {/* "Are you hiring? Find talent now!" section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                  Are you hiring? Find talent now!
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 mb-6 sm:mb-8">
                  {[
                    {
                      label: "Post your job ad",
                      icon: FaFileAlt,
                      bg: "bg-purple-100",
                      color: "text-purple-600",
                    },
                    {
                      label: "Search Candidates",
                      icon: FaSearch,
                      bg: "bg-blue-100",
                      color: "text-blue-600",
                    },
                    {
                      label: "Resume Package Services",
                      icon: FaFileAlt,
                      bg: "bg-orange-100",
                      color: "text-orange-600",
                    },
                    {
                      label: "Post your job fair",
                      icon: FaBuilding,
                      bg: "bg-yellow-100",
                      color: "text-yellow-600",
                    },
                    {
                      label: "Recruiter Profile",
                      icon: FaUsers,
                      bg: "bg-teal-100",
                      color: "text-teal-600",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 cursor-pointer hover:text-blue-600"
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${item.bg} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <item.icon
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`}
                        />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-blue-100 border border-dashed border-blue-300 p-4 sm:p-6 text-center">
                  <p className="text-gray-700 mb-1 text-sm sm:text-base">
                    Need help? Contact us today
                  </p>
                  <p className="text-blue-600 font-bold text-lg sm:text-xl mb-4">
                    +1-512-580-7444
                  </p>
                  <span className="font-semibold text-sm sm:text-base">
                    Eager to give it a try?
                  </span>{" "}
                  <button className="px-4 sm:px-5 py-2 bg-white border-2 border-dashed border-green-500 text-green-600 font-semibold rounded-2xl text-sm sm:text-base mt-2 sm:mt-0">
                    Get 10% off
                  </button>
                </div>

                {/* dots line */}
                <div className="w-full border-b border-dotted border-gray-300 mt-4 sm:mt-5"></div>

                <div className="flex justify-end mt-3">
                  <button className="group flex items-center gap-2 text-green-700 capitalize transition-colors duration-200 hover:text-green-800 hover:underline underline-offset-4 cursor-pointer text-sm sm:text-base">
                    view more
                    <FaLongArrowAltRight className="transition-transform duration-200 group-hover:translate-x-1 cursor-pointer" />
                  </button>
                </div>
              </div>

              {/* Yellow Pay Section */}
              <div className="bg-yellow-400 rounded-lg p-4 sm:p-6 flex mb-4 mt-5 justify-between items-center">
                <p className="font-semibold text-xs sm:text-sm">
                  Unlock recruiters' contact details for just $10
                </p>
                <button className="px-3 sm:px-4 py-1 bg-black text-yellow-400 rounded font-bold text-xs sm:text-sm min-h-[44px]">
                  PAY
                </button>
              </div>

              {/* Latest job seeker profiles section with progress bars - COLLAPSIBLE ON MOBILE */}
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm mb-4">
                <button
                  onClick={() => setShowProfiles(!showProfiles)}
                  className="w-full lg:hidden px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-white border-b border-gray-200"
                >
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 text-left">
                      Latest job seeker profiles
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 text-left">
                      Profile completion status
                    </p>
                  </div>
                  {showProfiles ? (
                    <FaChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FaChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                <div className="hidden lg:block">
                  <div className="bg-white border-b border-gray-300 px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Latest job seeker profiles
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      Profile completion status
                    </p>
                  </div>
                </div>

                <div
                  className={`${showProfiles ? "block" : "hidden lg:block"}`}
                >
                  <div className="divide-y divide-gray-200">
                    {profiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          {/* Profile Image */}
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                            <img
                              src={profile.image}
                              alt={profile.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${
                                  profile.title.split(" ")[0]
                                }&background=random&color=fff&size=56`;
                              }}
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start cursor-pointer">
                              <div>
                                <h2 className="text-base sm:text-lg font-bold text-black mb-1 group-hover:text-[#1fa987] transition-colors duration-200">
                                  {profile.title}
                                </h2>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                                  <div className="flex items-center gap-1">
                                    <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                    <span>{profile.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FaFileAlt className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                    <span>Updated {profile.updated}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    profile.progress >= 90
                                      ? "bg-green-100 text-green-800"
                                      : profile.progress >= 75
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {profile.progress}%
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                  Complete
                                </p>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Profile completion</span>
                                <span>{profile.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    profile.progress >= 90
                                      ? "bg-green-500"
                                      : profile.progress >= 75
                                        ? "bg-blue-500"
                                        : "bg-yellow-500"
                                  }`}
                                  style={{ width: `${profile.progress}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Last Active */}
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                              <CiClock2 className="w-3 h-3" />
                              <span>Last active: {profile.lastActive}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upload Resume Banner - Decorative Arrow */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm overflow-hidden group mb-4">
                <h2 className="text-gray-800 text-lg sm:text-xl font-semibold mb-3 leading-relaxed">
                  Not able to find the right job in USA & Canada?
                </h2>

                <p className="text-gray-600 text-sm mb-4 sm:mb-6">
                  Upload your resume and let verified employers find you.
                </p>

                <div className="flex items-center justify-between">
                  <button
                    className="
                    bg-[#27bb97]
                    hover:bg-[#1fa987]
                    active:bg-[#159a7a]
                    text-white
                    px-6 sm:px-8 py-3
                    rounded-lg
                    font-semibold
                    transition-all
                    duration-200
                    shadow-sm
                    hover:shadow-md
                    transform
                    hover:-translate-y-0.5
                    text-sm sm:text-base
                    min-h-[44px]
                  "
                  >
                    Upload Resume
                  </button>

                  {/* Animated Arrow - Hidden on Mobile */}
                  <div className="hidden lg:flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                    <span className="text-sm text-gray-500 mr-2">
                      Explore More
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-500 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Job Alert Banner */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 mb-4">
                <h2 className="text-gray-800 text-lg sm:text-xl font-semibold mb-2">
                  Get matching jobs in your inbox
                </h2>
                <p className="text-gray-500 text-sm mb-4 sm:mb-5">
                  No spam. Only relevant jobs. Unsubscribe anytime.
                </p>
                <button
                  className="
                  bg-[#27bb97]
                  hover:bg-[#1fa987]
                  text-white
                  px-6 sm:px-7 py-3
                  rounded-lg
                  font-semibold
                  transition
                  text-sm sm:text-base
                  min-h-[44px]
                "
                >
                  Set Job Alert
                </button>
              </div>

              {/* Post Job Need Banner */}
              <div className="bg-[#27bb97]/10 border border-[#27bb97]/30 rounded-xl p-4 sm:p-6 mb-4">
                <h2 className="text-gray-800 text-lg sm:text-xl font-semibold mb-2">
                  Post your job need & get noticed faster
                </h2>
                <p className="text-gray-600 text-sm mb-4 sm:mb-5">
                  Rank higher and reach recruiters directly
                </p>
                <button
                  className="
                  bg-[#27bb97]
                  hover:bg-[#1fa987]
                  text-white
                  px-6 sm:px-7 py-3
                  rounded-lg
                  font-semibold
                  transition
                  text-sm sm:text-base
                  min-h-[44px]
                "
                >
                  Post Job Need (Free)
                </button>
              </div>

              {/* Latest Articles section - COLLAPSIBLE ON MOBILE */}
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setShowArticles(!showArticles)}
                  className="w-full lg:hidden px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-white border-b border-gray-200"
                >
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                    Latest Articles
                  </h1>
                  {showArticles ? (
                    <FaChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FaChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                <div className="hidden lg:block">
                  <div className="bg-white px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Latest Articles
                    </h1>
                  </div>
                </div>

                <div
                  className={`${showArticles ? "block" : "hidden lg:block"}`}
                >
                  <div className="divide-y divide-gray-200">
                    {articles.map((article) => (
                      <div
                        key={article.id}
                        className="px-4 sm:px-6 py-4 sm:py-5"
                      >
                        <h2 className="text-base sm:text-lg text-blue-500 mb-1 hover:underline cursor-pointer">
                          {article.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3">
                          by {article.author}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full sm:w-44 h-48 sm:h-32 object-cover rounded flex-shrink-0"
                          />

                          <div className="flex-1">
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                              {article.description}
                              <a
                                href="#"
                                className="text-blue-500 hover:underline ml-1"
                              >
                                {article.readMoreLink}
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex justify-end">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-blue-500 hover:underline text-sm sm:text-base"
                    >
                      View More <span className="font-semibold">Articles</span>
                      <FaArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom "Back to Home" Button - Fixed at bottom center */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="flex justify-center">
            <Link to="/jobs">
              <div className="
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
              ">
                <GoArrowUpLeft className="w-5 h-5" />
                <span>back to home</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeInUp 0.5s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}