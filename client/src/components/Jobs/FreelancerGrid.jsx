import React from "react";
import { Link } from "react-router-dom";

const FreelancerCard = ({
  name,
  title,
  company,
  rate,
  available,
  skills,
  rating,
  description,
  imageUrl,
  isHighlighted,
  roleType,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="h-7">
          {available && (
            <span className="bg-emerald-400 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              available
            </span>
          )}
        </div>

        {roleType === "freelancer" && (
          <span className="text-gray-800 font-semibold text-lg">
            ${rate}/hr
          </span>
        )}
      </div>

      {/* Image */}
      <div className="flex justify-center mb-5">
        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <div className="text-center mb-3">
        <h3 className="text-gray-800 font-semibold text-lg mb-0.5">{name}</h3>
        <p className="text-gray-400 text-sm">{title}</p>
      </div>

      {/* Role Badge */}
      <div className="flex justify-center mb-4">
        {roleType === "freelancer" && (
          <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
            💼 Freelancer
          </span>
        )}

        {roleType === "fresher" && (
          <span className="flex items-center gap-1.5 text-blue-500 text-sm font-medium">
            🎓 Fresher
          </span>
        )}

        {roleType === "experienced" && (
          <span className="flex items-center gap-1.5 text-purple-500 text-sm font-medium">
            ⭐ Experienced
          </span>
        )}
      </div>

      {/* Skills */}
      <div className="flex justify-center items-center gap-2 mb-4 flex-wrap">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-50 text-gray-600 text-sm border border-gray-200 rounded-full"
          >
            {skill}
          </span>
        ))}

        <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
          +{rating}
        </span>
      </div>

      {/* Description */}
      <p className="text-center text-gray-500 text-sm leading-relaxed mb-5">
        {description}
      </p>

      {/* Divider Line */}
      <div className="flex justify-center my-4">
        <div className="w-1/6 border-t border-gray-500"></div>
      </div>

      {/* Button */}
      <button
        className={`w-full py-3 text-sm font-medium tracking-wide rounded transition-all ${
          isHighlighted
            ? "bg-[#27bb97] text-white hover:bg-[#1fa987] shadow-md cursor-pointer"
            : "hover:bg-[#1fa987] hover:text-white cursor-pointer"
        }`}
      >
        VIEW PROFILE
      </button>
    </div>
  );
};

const FreelancerGrid = () => {
  const freelancers = [
    {
      name: "Wade Wilson",
      title: "UI/UX designer",
      company: "Epic Coders",
      rate: 55,
      available: true,
      skills: ["UI", "UX", "photoshop"],
      rating: "14",
      description:
        "Wade is a 32 year old UI/UX designer, with an impressive portfolio behind him.",
      imageUrl:
        "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=150&h=150&fit=crop",
      isHighlighted: false,
      roleType: "freelancer",
    },
    {
      name: "Maria Petrescu",
      title: "mobile designer",
      company: null,
      rate: 32,
      available: false,
      skills: ["PHP", "android", "iOS"],
      rating: "2",
      description:
        "Maria is an android and iOS developer who worked at Apple for 6 years.",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      isHighlighted: false,
      roleType: "fresher",
    },
    {
      name: "Alexandra Morgan",
      title: "mobile designer",
      company: null,
      rate: 42,
      available: false,
      skills: ["PHP", "android", "iOS"],
      rating: "12",
      description: "Alexandra is a dedicated developer for mobile platforms.",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      isHighlighted: true,
      roleType: "experienced",
    },
    {
      name: "Jennifer Smith",
      title: "interactive designer",
      company: null,
      rate: 44,
      available: false,
      skills: ["PHP", "android", "iOS"],
      rating: "2",
      description:
        "Jennifer is an interactive designer who is awesome at what she does.",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
      isHighlighted: false,
      roleType: "experienced",
    },
    {
      name: "Svetlana Anyukova",
      title: "mobile designer",
      company: null,
      rate: 40,
      available: true,
      skills: ["PHP", "android", "iOS"],
      rating: "2",
      description:
        "Samantha is an Android and iOS designer with advanced coding knowledge.",
      imageUrl:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop",
      isHighlighted: false,
      roleType: "fresher",
    },
    {
      name: "Marko van Kooh",
      title: "UI/UX designer",
      company: "Visual Madness",
      rate: 30,
      available: false,
      skills: ["UI", "UX", "photoshop"],
      rating: "4",
      description: "Marko is a 25 year old web designer with strong portfolio.",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      isHighlighted: false,
      roleType: "freelancer",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Latest Job Seeker Profiles in <span className="text-[#27bb97] ">USA</span>! 
        </h1 >
        <p className="text-gray-600 text-lg mb-4 max-w-2xl mx-auto">
          Discover talented professionals actively seeking new opportunities
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer, index) => (
            <div key={index} className="flex justify-center">
              <FreelancerCard {...freelancer} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <Link to="/job-seekers">
            <button className="px-8 py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg hover:bg-[#27bb97] hover:text-white transition-all duration-300 hover:shadow-lg cursor-pointer">
              View All Positions →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FreelancerGrid;