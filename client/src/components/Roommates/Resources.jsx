import React from "react";
import { ArrowRight } from "lucide-react";
const Resources = () => {
  const articles = [
    {
      title: "How to Choose a Good Roommate",
      image:
        "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80",
      category: "Roommate Tips",
      read: "4 min read",
    },
    {
      title: "Budget Calculator for Room Sharing",
      image:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
      category: "Smart Budgeting",
      read: "3 min read",
    },
    {
      title: "Top 10 Safe Neighborhoods to Live In",
      image:
        "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=1200&q=80",
      category: "Safety Guide",
      read: "5 min read",
    },
  ];

  return (
    <div>
      <div className="w-full px-6 sm:px-10 lg:px-20 py-20 bg-white max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Tips, Blog & Resources
            </h2>
            <p className="text-gray-600 text-lg mt-2">
              Expert guidance to help you find the perfect room and roommate.
            </p>
          </div>

          <button className="text-[#25676D] font-semibold hover:underline flex items-center gap-1">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((post, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs font-semibold text-[#25676D] bg-[#25676D]/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>

                <h3 className="text-xl font-semibold text-gray-900 mt-4 leading-snug">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">{post.read}</p>

                <div className="flex items-center gap-1 text-[#25676D] font-medium mt-5 hover:underline">
                  Read More <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
