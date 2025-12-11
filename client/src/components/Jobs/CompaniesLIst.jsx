import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const CompaniesList = () => {
  const tabs = [
    "JOBS BY LOCATION",
    "JOBS BY SKILLS",
    "JOBS BY COMPANIES",
    "JOBS BY INDUSTRY",
    "JOBS BY FUNCTION",
    "JOBS BY TYPE",
    "FIND YOUR SALARY",
    "JOBS NEAR ME",
  ];

  const tabData = {
    "JOBS BY LOCATION": [
      {
        name: "New York",
        jobs: 1250,
        image:
          "https://images.unsplash.com/photo-1522083165195-3424ed129620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Los Angeles",
        jobs: 980,
        image:
          "https://images.unsplash.com/photo-1515896769750-31548aa180ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Chicago",
        jobs: 750,
        image:
          "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Houston",
        jobs: 620,
        image:
          "https://images.unsplash.com/photo-1547939687-545c6f5c961a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Miami",
        jobs: 530,
        image:
          "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ],

    "JOBS BY SKILLS": [
      {
        name: "React Developer",
        jobs: 540,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      },
      {
        name: "Python Developer",
        jobs: 690,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      },
      {
        name: "UI/UX Designer",
        jobs: 310,
        image:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Java Developer",
        jobs: 480,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      },
      {
        name: "Cloud Engineer",
        jobs: 410,
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ],

    "JOBS BY COMPANIES": [
      {
        name: "Google",
        jobs: 410,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      },
      {
        name: "Amazon",
        jobs: 720,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      },
      {
        name: "Microsoft",
        jobs: 510,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      },
      {
        name: "Netflix",
        jobs: 210,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      },
      {
        name: "Meta",
        jobs: 340,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg",
      },
    ],

    "JOBS BY INDUSTRY": [
      {
        name: "Technology",
        jobs: 2350,
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Finance",
        jobs: 1890,
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Healthcare",
        jobs: 3120,
        image:
          "https://images.unsplash.com/photo-1516549655669-df5616924e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Manufacturing",
        jobs: 980,
        image:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Retail",
        jobs: 1540,
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ],

    "JOBS BY FUNCTION": [
      {
        name: "Marketing",
        jobs: 1120,
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Sales",
        jobs: 1870,
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Engineering",
        jobs: 3240,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Human Resources",
        jobs: 760,
        image:
          "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Customer Support",
        jobs: 920,
        image:
          "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ],

    "JOBS BY TYPE": [
      {
        name: "Full-Time",
        jobs: 8450,
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Part-Time",
        jobs: 2310,
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Contract",
        jobs: 1870,
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Remote",
        jobs: 3250,
        image:
          "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Internship",
        jobs: 1250,
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ],

    "FIND YOUR SALARY": [
      {
        name: "Entry Level (0-2 yrs)",
        jobs: 4560,
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Mid Level (3-5 yrs)",
        jobs: 6890,
        image:
          "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Senior Level (5+ yrs)",
        jobs: 4320,
        image:
          "https://images.unsplash.com/photo-1580894894732-a213e13c9c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Executive Level",
        jobs: 890,
        image:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Top Paying Jobs",
        jobs: 1560,
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ],

    "JOBS NEAR ME": [
      {
        name: "Within 5 Miles",
        jobs: 430,
        image:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Within 10 Miles",
        jobs: 1250,
        image:
          "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Within 25 Miles",
        jobs: 3120,
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Remote Only",
        jobs: 4250,
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Hybrid Options",
        jobs: 2870,
        image:
          "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ],
  };

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-7">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Move up in your career! Find Jobs in USA
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover thousands of job opportunities across different locations,
            skills, and companies
          </p>

          {/* <div className="flex flex-col items-center gap-1 -mt-4">
            <div className="h-1.5 w-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
            <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
          </div> */}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-10">
          {tabs.map((label, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                px-4 py-3 text-sm font-medium tracking-wide 
                transition-all duration-300 rounded-xl cursor-pointer
                transform hover:-translate-y-0.5
                ${
                  activeIndex === index
                    ? "bg-[#27bb97] text-white shadow-lg shadow-green-100"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-[#1fa987] hover:shadow-md"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {tabData[tabs[activeIndex]]?.length > 0 ? (
            tabData[tabs[activeIndex]].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 
                  shadow-sm hover:shadow-xl transition-all duration-300 
                  hover:border-[#1fa987] cursor-pointer transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <FaMapMarkerAlt className="text-gray-400 group-hover:text-[#1fa987] transition-colors duration-300" />
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#1fa987] transition-colors duration-300">
                      {item.name}
                    </h3>
                  </div>

                  <div
                    className="inline-flex items-center rounded-full 
                     transition-all duration-300"
                  >
                    <span className="text-sm font-medium text-gray-600  transition-colors duration-300">
                      {item.jobs.toLocaleString()} Jobs Available
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <FaMapMarkerAlt className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No data available
                </h3>
                <p className="text-gray-500">
                  No jobs found for this selection. Try another category.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
