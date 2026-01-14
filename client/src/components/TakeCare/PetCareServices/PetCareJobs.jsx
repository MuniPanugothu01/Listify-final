import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export default function PetCareJobs() {
  const [activeTab, setActiveTab] = useState('sitters');

  const petSitters = [
    {
      name: "Sarah Johnson",
      zipCode: "10001",
      location: "Manhattan, NY",
      rate: "$25-35",
      experience: "5 years",
      services: "Pet Sitting, Dog Walking, Cat Care",
      pets: "Dogs, Cats, Small Animals"
    },
    {
      name: "Michael Chen",
      zipCode: "11201",
      location: "Brooklyn, NY",
      rate: "$20-30",
      experience: "3 years",
      services: "Overnight Stays, Dog Walking",
      pets: "Dogs, Cats"
    },
    {
      name: "Emily Rodriguez",
      zipCode: "11385",
      location: "Queens, NY",
      rate: "$18-28",
      experience: "7 years",
      services: "Pet Boarding, Grooming, Training",
      pets: "All Pets"
    }
  ];

  const petCareJobs = [
    {
      title: "Dog Walker Needed",
      zipCode: "10023",
      location: "Upper West Side, NY",
      payrate: "$20-30",
      schedule: "Weekday Mornings",
      pets: "1 Labrador Retriever",
      requirements: "Experience with large dogs"
    },
    {
      title: "Pet Sitter for Cats",
      zipCode: "10011",
      location: "Chelsea, NY",
      payrate: "$18-25",
      schedule: "Daily Visits",
      pets: "2 Cats",
      requirements: "Cat experience, medication administration"
    },
    {
      title: "Overnight Pet Sitter",
      zipCode: "10028",
      location: "Upper East Side, NY",
      payrate: "$50-70",
      schedule: "Weekend Stay",
      pets: "Dog & Cat",
      requirements: "Overnight experience, references"
    }
  ];

  return (
    <div className="px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-2">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="text-[#27BB97] text-xs xs:text-sm font-medium">Pet Care Services</span>
            <Heart className="w-4 h-4 xs:w-5 xs:h-5 text-[#27BB97]" />
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-tight">
            Pet Sitters and Pet Care Jobs In New York, NY
          </h1>
          
          {/* Tab Buttons */}
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm sm:shadow-md border border-gray-200 mb-4 sm:mb-6">
            <button
              onClick={() => setActiveTab('sitters')}
              className={`px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm sm:text-base ${
                activeTab === 'sitters'
                  ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
              aria-label="View pet sitters"
            >
              Pet Sitters
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 text-xs xs:text-sm sm:text-base ${
                activeTab === 'jobs'
                  ? 'bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white shadow-sm'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
              aria-label="View pet care jobs"
            >
              Pet Care Jobs
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'jobs' ? (
          <>
            {/* Pet Care Jobs Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
              {petCareJobs.map((job, index) => (
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
                        Rate: <span className="text-green-500 font-semibold">{job.payrate}</span> <span className="text-gray-400">/Visit</span>
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 xs:pt-4 space-y-2 xs:space-y-3">
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Schedule</span>
                        <span className="text-xs xs:text-sm text-[#27BB97] truncate">{job.schedule}</span>
                      </div>
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Pets</span>
                        <span className="text-xs xs:text-sm text-gray-900 truncate">{job.pets}</span>
                      </div>
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Requirements</span>
                        <span className="text-xs xs:text-sm text-gray-900 truncate">{job.requirements}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6">
                    <button 
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2 xs:py-2.5 sm:py-3 px-4 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                      aria-label={`View job: ${job.title}`}
                    >
                      View Job
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View Pet Care Jobs Button */}
            <div className="text-center">
              <button 
                className="bg-white border border-gray-300 text-gray-700 py-2.5 xs:py-3 sm:py-3 px-6 xs:px-8 sm:px-10 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                aria-label="View all pet care jobs"
              >
                View Pet Care Jobs
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Pet Sitters Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
              {petSitters.map((sitter, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md sm:shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  <div className="p-4 xs:p-5 sm:p-6">
                    <h3 className="text-lg xs:text-xl sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3">
                      {sitter.name}
                    </h3>
                    <div className="space-y-1.5 xs:space-y-2 mb-3 xs:mb-4">
                      <p className="text-xs xs:text-sm text-gray-600">
                        ZIP Code: {sitter.zipCode}, <span className="text-cyan-500">{sitter.location}</span>
                      </p>
                      <p className="text-xs xs:text-sm text-gray-600">
                        Hourly Rate: <span className="text-green-500 font-semibold">{sitter.rate}</span> <span className="text-gray-400">/Hour</span>
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 xs:pt-4 space-y-2 xs:space-y-3">
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Experience</span>
                        <span className="text-xs xs:text-sm text-gray-900">{sitter.experience}</span>
                      </div>
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Services</span>
                        <span className="text-xs xs:text-sm text-gray-900 truncate">{sitter.services}</span>
                      </div>
                      <div className="flex">
                        <span className="text-xs xs:text-sm text-gray-500 w-24 xs:w-32">Pet Types</span>
                        <span className="text-xs xs:text-sm text-gray-900 truncate">{sitter.pets}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6">
                    <button 
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2 xs:py-2.5 sm:py-3 px-4 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                      aria-label={`View profile: ${sitter.name}`}
                    >
                      View Profile
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Pet Sitters Button */}
            <div className="text-center">
              <button 
                className="bg-white border border-gray-300 text-gray-700 py-2.5 xs:py-3 sm:py-3 px-6 xs:px-8 sm:px-10 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#27BB97]"
                aria-label="View all pet sitters"
              >
                View More Pet Sitters
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}