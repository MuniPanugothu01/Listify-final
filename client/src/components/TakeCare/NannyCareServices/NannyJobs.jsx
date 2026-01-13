import React, { useState } from 'react';
import { User, Image, Lightbulb, Award, Send, Baby } from 'lucide-react';

export default function NannyJobs() {
  const [activeTab, setActiveTab] = useState('nannies');

  const nannyJobs = [
    {
      title: "Harman Consultancy",
      zipCode: "11801",
      location: "Hicksville, NY",
      payrate: "$15-20",
      workType: "Live-in & Live-out",
      languages: "Hindi, English, Telugu",
      services: "Light Household Chores, Educat.."
    },
    {
      title: "Live-In Nanny (Studio Apartment Provided)",
      zipCode: "10710",
      location: "Yonkers, NY",
      payrate: "$15-17",
      workType: "Live-in",
      languages: "English,",
      services: "Light Household Chores, Educat.."
    },
    {
      title: "BABysItter",
      zipCode: "10314",
      location: "Staten Island, NY",
      payrate: "$15-19",
      workType: "Live-out",
      languages: "Hindi, English,",
      services: "Light Household Chores, Educat.."
    }
  ];

  const nannies = [
    {
      name: "Maria Rodriguez",
      zipCode: "10001",
      location: "Manhattan, NY",
      rate: "$20-25",
      experience: "8 years",
      languages: "English, Spanish",
      specialties: "Infant Care, Educational Activities"
    },
    {
      name: "Jennifer Chen",
      zipCode: "11201",
      location: "Brooklyn, NY",
      rate: "$18-22",
      experience: "5 years",
      languages: "English, Mandarin",
      specialties: "Toddler Care, Light Housekeeping"
    }
  ];

  return (
    <div className=" px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-2">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="text-[#27BB97] text-xs xs:text-sm font-medium">Nanny Services</span>
            <Baby className="w-4 h-4 xs:w-5 xs:h-5 text-[#27BB97]" />
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-tight">
            Nannies and Nanny Jobs In New York,NY
          </h1>
          
          {/* Tab Buttons */}
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm sm:shadow-md border border-gray-200 mb-4 sm:mb-6">
            <button
              onClick={() => setActiveTab('nannies')}
              className={`px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm sm:text-base ${
                activeTab === 'nannies'
                  ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
              aria-label="View nannies"
            >
              Nannies
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm sm:text-base ${
                activeTab === 'jobs'
                  ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
              aria-label="View nanny jobs"
            >
              Nanny Jobs
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'jobs' ? (
          <>
            {/* Nanny Jobs Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
              {nannyJobs.map((job, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md sm:shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  <div className="p-4 xs:p-5 sm:p-6">
                    <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 line-clamp-2 min-h-[3rem]">
                      {job.title}
                    </h3>
                    <div className="space-y-1.5 xs:space-y-2 mb-3 xs:mb-4">
                      <p className="text-xs xs:text-sm text-gray-600">
                        ZIP Code: {job.zipCode}, <span className="text-cyan-500">{job.location}</span>
                      </p>
                      <p className="text-xs xs:text-sm text-gray-600">
                        Payrate Salary <span className="text-green-500 font-semibold">{job.payrate}</span> <span className="text-gray-400">/Hourly</span>
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 xs:pt-4 space-y-2 xs:space-y-3">
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Work Type</span>
                        <span className="text-xs xs:text-sm text-cyan-500 truncate">{job.workType}</span>
                      </div>
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Languages</span>
                        <span className="text-xs xs:text-sm text-gray-900 truncate">{job.languages}</span>
                      </div>
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Services needed</span>
                        <span className="text-xs xs:text-sm text-gray-900 truncate">{job.services}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6">
                    <button 
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2 xs:py-2.5 sm:py-3 px-4 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                      aria-label={`View profile for ${job.title}`}
                    >
                      View profile
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View Nanny Jobs Button */}
            <div className="text-center">
              <button 
                className="bg-white border border-gray-300 text-gray-700 py-2.5 xs:py-3 sm:py-3 px-6 xs:px-8 sm:px-10 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                aria-label="View all nanny jobs"
              >
                View Nanny Jobs
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Nannies Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10 max-w-4xl mx-auto">
              {nannies.map((nanny, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md sm:shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  <div className="p-4 xs:p-5 sm:p-6">
                    <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3">
                      {nanny.name}
                    </h3>
                    <div className="space-y-1.5 xs:space-y-2 mb-3 xs:mb-4">
                      <p className="text-xs xs:text-sm text-gray-600">
                        ZIP Code: {nanny.zipCode}, <span className="text-cyan-500">{nanny.location}</span>
                      </p>
                      <p className="text-xs xs:text-sm text-gray-600">
                        Hourly Rate: <span className="text-green-500 font-semibold">{nanny.rate}</span> <span className="text-gray-400">/Hour</span>
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 xs:pt-4 space-y-2 xs:space-y-3">
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Experience</span>
                        <span className="text-xs xs:text-sm text-gray-900">{nanny.experience}</span>
                      </div>
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Languages</span>
                        <span className="text-xs xs:text-sm text-gray-900 truncate">{nanny.languages}</span>
                      </div>
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Specialties</span>
                        <span className="text-xs xs:text-sm text-gray-900 truncate">{nanny.specialties}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6">
                    <button 
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2 xs:py-2.5 sm:py-3 px-4 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                      aria-label={`View profile for ${nanny.name}`}
                    >
                      View profile
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Nannies Button (Only for nannies tab) */}
            <div className="text-center">
              <button 
                className="bg-white border border-gray-300 text-gray-700 py-2.5 xs:py-3 sm:py-3 px-6 xs:px-8 sm:px-10 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                aria-label="View all nannies"
              >
                View More Nannies
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}