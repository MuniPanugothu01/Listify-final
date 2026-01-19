import React from 'react';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
  const navigate = useNavigate();
  
  const jobs = [
    {
      title: "UI/UX & Product Designer",
      company: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      type: "Full Time",
      description: "Product design encompasses both UI/UX design, but it also involves a broader understanding of the entire product.",
      location: "London, UK",
      salary: "$23k-36K",
      posted: "2 days ago"
    },
    {
      title: "Social Media Marketing",
      company: "Meta",
      logo: "/JobsImg/Meta.png",
      type: "Remote",
      description: "It involves creating and sharing content on social media networks to achieve marketing and branding goals.",
      location: "United State",
      salary: "$30k-40K",
      posted: "1 week ago"
    },
    {
      title: "Web Developer",
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      type: "Remote",
      description: "Encompasses a range of tasks including web design, front-end development, back-end development & server management.",
      location: "New York",
      salary: "$43k-55K",
      posted: "3 days ago"
    },
    {
      title: "Graphic Designer",
      company: "Canva",
      logo: "/JobsImg/canva2.svg",
      type: "Full Time",
      description: "Graphic designers combine art & technology to deliver messages through images & layout of web screens & print.",
      location: "New York",
      salary: "$25k-35K",
      posted: "5 days ago"
    },
    {
      title: "VP of Growth Marketing",
      company: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
      type: "Full Time",
      description: "Marketing often works closely with departments such as sales, product development & analytics.",
      location: "London, UK",
      salary: "$40k-60K",
      posted: "Just now"
    },
    {
      title: "Lead of Product Design",
      company: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      type: "Remote",
      description: "Includes web design, front-end development, back-end implementation & server infrastructure management.",
      location: "United State",
      salary: "$35k-50K",
      posted: "4 days ago"
    },
  ];

  const handleViewAllPositions = () => {
    navigate("/job-search");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-snug sm:leading-tight">
            Currently Open Positions in <span className="text-[#27bb97]">USA</span>!
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Discover your next career opportunity with top companies worldwide
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {jobs.map((job, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#27bb97]/20 hover:-translate-y-1"
            >

              {/* Top Section */}
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                
                {/* Logo and Company Info */}
                <div className="flex items-start gap-3 sm:gap-4 cursor-pointer max-w-[75%] sm:max-w-none">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-full blur opacity-20 group-hover:opacity-30 transition"></div>
                    <img 
                      src={job.logo} 
                      alt={job.company} 
                      className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain rounded-full border-2 border-white shadow-md"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight group-hover:text-[#27bb97] transition-colors line-clamp-1">
                        {job.title}
                      </h2>
                      <span className={`text-xs font-semibold px-2 sm:px-3 py-1 rounded-full w-fit ${job.type === 'Remote' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium text-sm sm:text-base">{job.company}</p>
                    
                    {/* Posted Time */}
                    <div className="flex items-center gap-1 mt-1 sm:mt-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-500">{job.posted}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow Button */}
                <button className="group/btn w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#27bb97] to-[#1fa987] rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-[#27bb97]/30 transition-all duration-300 transform group-hover:scale-110 shrink-0 ml-2">
                  <MdArrowOutward className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>

              </div>

              {/* Divider */}
              <div className="relative mb-6 sm:mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 sm:px-4 text-xs sm:text-sm text-gray-500">Description</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 sm:mb-8">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-3">
                  {job.description}
                </p>
              </div>

              {/* Footer Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pt-6 border-t border-gray-100">
                
                <div className="flex flex-wrap gap-4 sm:gap-6 w-full sm:w-auto">
                  {/* Location */}
                  <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500 truncate">Location</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{job.location}</p>
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                      <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500 truncate">Salary</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{job.salary}</p>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <button className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-[#27bb97] to-[#1fa987] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#27bb97]/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base w-full sm:w-auto">
                  Apply Now
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* View More Button */}
        <div className="text-center mt-12 sm:mt-16">
          <button 
            onClick={handleViewAllPositions}
            className="px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg hover:bg-[#27bb97] hover:text-white transition-all duration-300 hover:shadow-lg cursor-pointer text-sm sm:text-base"
          >
            View All Positions →
          </button>
        </div>

      </div>
    </div>
  );
};

export default LatestJobs;