import React, { useState, useMemo } from "react";

const LatestJobs = () => {
  const [activeTab, setActiveTab] = useState("IT");

  const jobs = useMemo(
    () => [
      {
        id: 1,
        title: "Software Engineer",
        company: "Google",
        location: "New York, USA",
        salary: "$120k - $150k",
        exp: "3-5 years",
        type: "IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        employmentType: "Full-Time",
        postedDate: "2 days ago",
        remote: true,
      },
      {
        id: 2,
        title: "Network Administrator",
        company: "Cisco",
        location: "Texas, USA",
        salary: "$90k - $110k",
        exp: "2-4 years",
        type: "IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg",
        employmentType: "Full-Time",
        postedDate: "1 day ago",
        remote: false,
      },
      {
        id: 3,
        title: "Frontend Developer",
        company: "Meta",
        location: "California, USA",
        salary: "$110k - $140k",
        exp: "2-5 years",
        type: "IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.png",
        employmentType: "Full-Time",
        postedDate: "3 days ago",
        remote: true,
      },
      {
        id: 4,
        title: "Data Analyst",
        company: "IBM",
        location: "North Carolina, USA",
        salary: "$80k - $100k",
        exp: "1-3 years",
        type: "IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        employmentType: "Full-Time",
        postedDate: "Today",
        remote: true,
      },
      {
        id: 5,
        title: "DevOps Engineer",
        company: "Microsoft",
        location: "Washington, USA",
        salary: "$130k - $160k",
        exp: "4-7 years",
        type: "IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        employmentType: "Full-Time",
        postedDate: "5 days ago",
        remote: false,
      },
      {
        id: 6,
        title: "Cybersecurity Specialist",
        company: "Norton",
        location: "Arizona, USA",
        salary: "$100k - $130k",
        exp: "3-6 years",
        type: "IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Norton_logo.png",
        employmentType: "Full-Time",
        postedDate: "1 week ago",
        remote: true,
      },
      {
        id: 7,
        title: "Marketing Executive",
        company: "Walmart",
        location: "California, USA",
        salary: "$60k - $80k",
        exp: "1-3 years",
        type: "Non-IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
        employmentType: "Full-Time",
        postedDate: "2 days ago",
        remote: false,
      },
      {
        id: 8,
        title: "HR Coordinator",
        company: "Amazon",
        location: "Seattle, USA",
        salary: "$70k - $90k",
        exp: "2-5 years",
        type: "Non-IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        employmentType: "Full-Time",
        postedDate: "Today",
        remote: true,
      },
      {
        id: 9,
        title: "Business Development Manager",
        company: "Tesla",
        location: "Nevada, USA",
        salary: "$85k - $110k",
        exp: "3-6 years",
        type: "Non-IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
        employmentType: "Full-Time",
        postedDate: "4 days ago",
        remote: false,
      },
      {
        id: 10,
        title: "Customer Support Specialist",
        company: "AT&T",
        location: "Florida, USA",
        salary: "$45k - $60k",
        exp: "1-2 years",
        type: "Non-IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/ATT_logo_2016.svg",
        employmentType: "Full-Time",
        postedDate: "3 days ago",
        remote: true,
      },
      {
        id: 11,
        title: "Financial Analyst",
        company: "Bank of America",
        location: "New Jersey, USA",
        salary: "$75k - $95k",
        exp: "2-4 years",
        type: "Non-IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Bank_of_America_logo.svg",
        employmentType: "Full-Time",
        postedDate: "1 day ago",
        remote: false,
      },
      {
        id: 12,
        title: "Operations Supervisor",
        company: "FedEx",
        location: "Tennessee, USA",
        salary: "$55k - $75k",
        exp: "2-5 years",
        type: "Non-IT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/FedEx_Express_logo.svg",
        employmentType: "Full-Time",
        postedDate: "6 days ago",
        remote: false,
      },
    ],
    []
  );

  const filteredJobs = useMemo(
    () => jobs.filter((job) => job.type === activeTab),
    [jobs, activeTab]
  );

  const handleApply = (jobId) => {
    console.log(`Applying for job ${jobId}`);
    alert(`Applying for job #${jobId}`);
  };

  const handleViewDetails = (jobId) => {
    console.log(`Viewing details for job ${jobId}`);
    alert(`Viewing details for job #${jobId}`);
  };

  const tabOptions = [
    { id: "IT", label: "IT Jobs", count: 6 },
    { id: "Non-IT", label: "Non-IT Jobs", count: 6 },
  ];

  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest IT & Non-IT Jobs in the USA
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover exciting career opportunities across various industries
            with competitive salaries and benefits
          </p>
        </header>

        {/* Stats & Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
          <div className="flex justify-center lg:justify-end">
            <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-[#27bb97] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={activeTab === tab.id}
                >
                  {tab.label}
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 text-xs rounded-full ${
                      activeTab === tab.id
                        ? "bg-white/20"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 cursor-pointer">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Card Content */}
                <div className="p-6">
                  {/* Company Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-3 group-hover:border-[#27bb97]/20 transition-colors">
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIyNCIgZmlsbD0iI2Y3ZjdmNyIvPjxwYXRoIGQ9Ik0yNCAxNEMyNy4zMTM3IDE0IDMwIDE2LjY4NjMgMzAgMjBDMzAgMjMuMzEzNyAyNy4zMTM3IDI2IDI0IDI2QzIwLjY4NjMgMjYgMTggMjMuMzEzNyAxOCAyMEMxOCAxNi42ODYzIDIwLjY4NjMgMTQgMjQgMTRaTTI0IDE2QzIxLjc5MDkgMTYgMjAgMTcuNzkwOSAyMCAyMEMyMCAyMi4yMDkxIDIxLjc5MDkgMjQgMjQgMjRDMjYuMjA5MSAyNCAyOCAyMi4yMDkxIDI4IDIwQzI4IDE3Ljc5MDkgMjYuMjA5MSAxNiAyNCAxNloiIGZpbGw9IiMyN0JCOTciLz48L3N2Zz4=";
                          }}
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#27bb97] transition-colors">
                          {job.title}
                        </h2>
                        <p className="text-gray-600 font-medium">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                      {job.postedDate}
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2 flex-shrink-0 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="font-medium">{job.location}</span>
                      </div>
                      {job.remote && (
                        <span className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                          Remote Available
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center text-gray-600 mb-1">
                          <svg
                            className="w-5 h-5 mr-2 flex-shrink-0 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">Salary</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {job.salary}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center text-gray-600 mb-1">
                          <svg
                            className="w-5 h-5 mr-2 flex-shrink-0 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">
                            Experience
                          </span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {job.exp}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                        job.type === "IT"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {job.type}
                    </span>
                    <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">
                      {job.employmentType}
                    </span>
                    {job.postedDate === "Today" && (
                      <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600">
                        Urgent Hiring
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-200 mb-6" />

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewDetails(job.id)}
                      className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      View Details
                    </button>
                    <button
                      onClick={() => handleApply(job.id)}
                      className="flex-1 px-6 py-3 bg-[#27bb97] text-white rounded-xl font-semibold hover:bg-[#1fa987] transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Apply Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No jobs available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              There are currently no {activeTab === "IT" ? "IT" : "Non-IT"} jobs
              listed. Check back soon for new opportunities!
            </p>
            <button
              onClick={() => setActiveTab(activeTab === "IT" ? "Non-IT" : "IT")}
              className="px-6 py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-xl hover:bg-[#27bb97] hover:text-white transition-all duration-200"
            >
              View {activeTab === "IT" ? "Non-IT" : "IT"} Jobs
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="inline-flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>All applications are secure and confidential</span>
          </div>
          <p className="text-gray-500 text-sm">
            New job listings updated daily • Last updated: Today
          </p>
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
