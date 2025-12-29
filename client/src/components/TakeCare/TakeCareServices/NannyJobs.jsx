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

  const steps = [
    {
      icon: <User className="w-8 h-8" />,
      iconColor: "text-orange-500",
      title: "Register with your email, password, and personal details to create a profile. Use Neighborhood-Based Matching to connect with local families effortlessly.",
      buttonText: "Sign Up",
      buttonColor: "bg-orange-500 hover:bg-orange-600"
    },
    {
      icon: <Image className="w-8 h-8" />,
      iconColor: "text-blue-600",
      title: "Add a professional, welcoming photo to make your profile stand out to attract more families in your area.",
      buttonText: "Upload a Photo",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      iconColor: "text-red-500",
      title: "List your caregiving skills, certifications, and availability. Real-time updates ensure families know when you're available.",
      buttonText: "Highlight Skills",
      buttonColor: "bg-red-500 hover:bg-red-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      iconColor: "text-teal-500",
      title: "Verify your email and phone number to build trust. Reach more families through our Mobile App integration.",
      buttonText: "Verification Check",
      buttonColor: "bg-teal-500 hover:bg-teal-600"
    },
    {
      icon: <Send className="w-8 h-8" />,
      iconColor: "text-yellow-500",
      title: "Review your profile for accuracy. Use Smart Dashboard Features to manage responses and track performance.",
      buttonText: "Submit & Review",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-red-500 text-sm font-medium">Nanny Services</span>
            <Baby className="w-5 h-5 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nannies and Nanny Jobs In New York,NY
          </h1>
          
          {/* Tab Buttons */}
          <div className="inline-flex bg-white rounded-full p-1 shadow-md border border-gray-200">
            <button
              onClick={() => setActiveTab('nannies')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'nannies'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Nannies
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'jobs'
                  ? 'bg-purple-100 text-gray-900 shadow-sm'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Nanny Jobs
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'jobs' ? (
          <>
            {/* Nanny Jobs Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {nannyJobs.map((job, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{job.title}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        ZIP Code: {job.zipCode}, <span className="text-cyan-500">{job.location}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Payrate Salary <span className="text-green-500 font-semibold">{job.payrate}</span> <span className="text-gray-400">/Hourly</span>
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 space-y-3">
                      <div className="flex">
                        <span className="text-sm text-gray-500 w-32">Work Type</span>
                        <span className="text-sm text-cyan-500">{job.workType}</span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-gray-500 w-32">Languages</span>
                        <span className="text-sm text-gray-900">{job.languages}</span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-gray-500 w-32">Services needed</span>
                        <span className="text-sm text-gray-900">{job.services}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                      View profile
                      <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View Nanny Jobs Button */}
            <div className="text-center">
              <button className="bg-white border border-gray-300 text-gray-700 py-3 px-10 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                View Nanny Jobs
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Nannies Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
              {nannies.map((nanny, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{nanny.name}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        ZIP Code: {nanny.zipCode}, <span className="text-cyan-500">{nanny.location}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Hourly Rate: <span className="text-green-500 font-semibold">{nanny.rate}</span> <span className="text-gray-400">/Hour</span>
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 space-y-3">
                      <div className="flex">
                        <span className="text-sm text-gray-500 w-32">Experience</span>
                        <span className="text-sm text-gray-900">{nanny.experience}</span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-gray-500 w-32">Languages</span>
                        <span className="text-sm text-gray-900">{nanny.languages}</span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-gray-500 w-32">Specialties</span>
                        <span className="text-sm text-gray-900">{nanny.specialties}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                      View profile
                      <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}