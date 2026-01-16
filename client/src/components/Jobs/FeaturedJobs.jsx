import { useState, useEffect, useRef, useCallback } from "react";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FeaturedJobs() {
  const navigate = useNavigate();
  
  const jobs = [
    {
      id: 1,
      company: "Amazon",
      logo: "/public/JobsImg/amazon-logo.png",
      daysAgo: "3 days ago",
      title: "Senior UI/UX Designer",
      tags: ["Part-Time", "Senior Level"],
      skills: ["Figma", "Adobe XD", "UX Research"],
      salary: "$120/hr",
      location: "Mumbai, India",
      saved: false,
    },
    {
      id: 2,
      company: "Google",
      logo: "/public/JobsImg/googleImg.png",
      daysAgo: "5 days ago",
      title: "Frontend Developer",
      tags: ["Full-Time", "On-site"],
      skills: ["JavaScript", "React", "TypeScript"],
      salary: "$150k - $220k",
      location: "Kochi, India",
      saved: true,
    },
    {
      id: 3,
      company: "wripro",
      logo: "/public/JobsImg/wipro.png",
      daysAgo: "18 days ago",
      title: "Senior Motion Designer",
      tags: ["Contract", "Remote"],
      skills: ["After Effects", "Cinema 4D", "3D Animation"],
      salary: "$85/hr",
      location: "Chennai, India",
      saved: false,
    },
    {
      id: 4,
      company: "infosys",
      logo: "/public/JobsImg/infosys.jpg",
      daysAgo: "8 days ago",
      title: "Product Designer",
      tags: ["Full-Time", "Hybrid"],
      skills: ["Wireframing", "User Testing", "Prototyping"],
      salary: "$110/hr",
      location: "Bangalore, India",
      saved: false,
    },
    {
      id: 5,
      company: "microsoft",
      logo: "/public/JobsImg/Microsoft.png",
      daysAgo: "12 days ago",
      title: "Brand Designer",
      tags: ["Remote", "Contract"],
      skills: ["Branding", "Illustration", "Photoshop"],
      salary: "$95/hr",
      location: "Delhi, India",
      saved: false,
    },
    {
      id: 6,
      company: "Eagl eye Tech",
      logo: "/public/JobsImg/eagleeyetech.png",
      daysAgo: "2 days ago",
      title: "Visual Designer",
      tags: ["Full-Time"],
      skills: ["Sketch", "Typography", "Color Theory"],
      salary: "$130/hr",
      location: "Pune, India",
      saved: true,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [savedJobs, setSavedJobs] = useState(
    jobs.reduce((acc, job) => ({ ...acc, [job.id]: job.saved }), {})
  );
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateCardsPerRow = () => {
      if (window.innerWidth < 768) setCardsPerRow(1);
      else if (window.innerWidth < 1024) setCardsPerRow(2);
      else setCardsPerRow(4);
    };
    
    updateCardsPerRow();
    window.addEventListener("resize", updateCardsPerRow);
    return () => window.removeEventListener("resize", updateCardsPerRow);
  }, []);

  const nextSlide = () => {
    if (startIndex + cardsPerRow < jobs.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const toggleSave = (id, e) => {
    e.stopPropagation(); // Prevent card click when clicking save button
    setSavedJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleViewAllPositions = () => {
    navigate("/job-search");
  };

  const handleCardClick = (jobId) => {
    navigate("/job-search", { state: { selectedJobId: jobId } });
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(startIndex * 340);
    e.preventDefault();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    const cardWidth = 340;
    const dragIndex = Math.round((scrollLeft - walk) / cardWidth);
    
    const clampedIndex = Math.max(0, Math.min(dragIndex, jobs.length - cardsPerRow));
    
    setStartIndex(clampedIndex);
  }, [isDragging, startX, scrollLeft, jobs.length, cardsPerRow]);

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(startIndex * 340);
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    const cardWidth = 340;
    const dragIndex = Math.round((scrollLeft - walk) / cardWidth);
    
    const clampedIndex = Math.max(0, Math.min(dragIndex, jobs.length - cardsPerRow));
    
    setStartIndex(clampedIndex);
  }, [isDragging, startX, scrollLeft, jobs.length, cardsPerRow]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 relative -mt-12">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-[40px] font-bold text-gray-900">Featured Jobs</h1>
        <div className="flex flex-col items-center gap-1 mt-4">
          <div className="h-1 w-28 bg-green-400 rounded"></div>
          <div className="h-1 w-20 bg-green-400 rounded"></div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {startIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 md:p-3 rounded-full hover:bg-gray-100 transition z-10"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {startIndex + cardsPerRow < jobs.length && (
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 md:p-3 rounded-full hover:bg-gray-100 transition z-10"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {/* Card Container with Drag Support */}
      <div 
        ref={containerRef}
        className="overflow-hidden max-w-7xl mx-auto px-4 select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
      >
        <div
          className="flex gap-4 md:gap-6 transition-all duration-300"
          style={{
            transform: `translateX(-${startIndex * 340}px)`,
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => handleCardClick(job.id)}
              className="min-w-[300px] md:min-w-[340px] bg-white rounded-3xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-green-300 select-text cursor-pointer"
              style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${job.company}&background=10b981&color=fff&bold=true`;
                    }}
                  />
                </div>

                <button 
                  onClick={(e) => toggleSave(job.id, e)}
                  className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition z-20"
                >
                  <span
                    className={`text-sm font-medium ${
                      savedJobs[job.id] ? "text-[#27bb97]" : "text-gray-400"
                    }`}
                  >
                    {savedJobs[job.id] ? "Saved" : "Save"}
                  </span>
                  <Bookmark
                    className={`w-4 h-4 ${
                      savedJobs[job.id]
                        ? "text-[#27bb97] fill-[#27bb97]"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* Company */}
              <h3 className="text-gray-900 font-semibold text-base md:text-lg mb-1">
                {job.company}{" "}
                <span className="text-gray-400 text-sm">({job.daysAgo})</span>
              </h3>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {job.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 md:px-4 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs md:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Skills Section */}
              <div className="mb-6 md:mb-10">
                <p className="text-gray-700 font-semibold mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              {/* Footer */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                  <div className="text-lg md:text-[20px] font-bold text-blue-500">
                    {job.salary}
                  </div>
                  <div className="text-gray-400 text-sm">{job.location}</div>
                </div>
                <button className="bg-[#27bb97] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl hover:bg-[#1fa987] transition cursor-pointer font-medium">
                  Apply now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drag hint text */}
      <div className="text-center mt-4 text-gray-500 text-sm">
        <span className="hidden md:inline">Click and drag to scroll • </span>
        <span>{startIndex + 1} - {Math.min(startIndex + cardsPerRow, jobs.length)} of {jobs.length} jobs</span>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(jobs.length / cardsPerRow) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setStartIndex(index * cardsPerRow)}
            className={`w-2 h-2 rounded-full ${
              Math.floor(startIndex / cardsPerRow) === index 
                ? "bg-[#27bb97]" 
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-16">
        <button 
          onClick={handleViewAllPositions}
          className="px-8 py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg hover:bg-[#27bb97] hover:text-white transition-all duration-300 hover:shadow-lg cursor-pointer"
        >
          View All Positions →
        </button>
      </div>
    </div>
  );
}