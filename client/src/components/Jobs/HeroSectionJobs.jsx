import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
export default function HeroSectionJobs() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Main Content */}
      <div className=" px-8 relative py-16 md:grid-cols-2 gap-12 flex items-center justify-between">
        {/* Left Side Content */}
        <div className="space-y-8 lg:space-y-10 pt-6 -mt-15 lg:pt-1 relative z-10">
          {/* Value Proposition Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full px-5 py-2.5 border border-purple-100 shadow-sm">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-sm">✨</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              Championing inclusive workplaces for all
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 -mt-5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-gray-900">Discover Careers Where</span>
              <br />
              <span className="text-[#27bb97]">Diversity</span>
              <span className="text-gray-900"> Thrives</span>
            </h1>

            <div className="pt-2">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Connect with organizations that prioritize diversity, equity,
                and inclusion— find roles where your values align and your
                talent is celebrated.
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="pt-2">
            <div className="text-sm font-medium text-gray-700 mb-3 px-1">
              Find your next opportunity
            </div>

            <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100 max-w-3xl transition-all duration-300 hover:shadow-2xl">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Job Title Search */}
                <div className="flex-1">
                  <div className="flex items-center bg-gray-50 rounded-xl px-5 py-3.5 border border-gray-200 hover:border-[#27bb97] transition-colors">
                    <div className="flex items-center w-full">
                      <FaSearch className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Job title, skills, or keywords"
                        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Search */}
                <div className="flex-1">
                  <div className="flex items-center bg-gray-50 rounded-xl px-5 py-3.5 border border-gray-200 hover:border-[#27bb97] transition-colors">
                    <div className="flex items-center w-full">
                      <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="City, state, or remote"
                        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#27bb97] to-[#1FA987] text-white px-8 py-3.5 rounded-xl font-semibold hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer min-w-[140px]">
                  <span className="text-base">Search</span>
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side section */}
        <div className="relative">
          {/* Add right side content here */}

          {/* background box */}
          <div className="relative bg-gradient-to-tl from-[#27BB97] via-[#27BB97]/10 to-[#27BB97] h-140 w-120 rounded-2xl">
            {/*box Create Resume */}

            <img
              src="/JobsImg/JobImg.png"
              alt=""
              className="absolute  h-[500px] -left-25 bottom-2"
            />

            {/* Professional Buttons with ALWAYS VISIBLE Continuously Moving Border Animations */}
            <div className="flex items-center gap-3 absolute top-3 left-32">
              {/* I Offer a Job Button */}
              <button
                className="relative h-11 px-4 bg-gray-200 font-semibold text-gray-800 capitalize rounded-xl 
      min-w-[140px] hover:bg-gray-300 transition-all duration-300
      shadow-sm cursor-pointer overflow-hidden group"
              >
                {/* Animated border - ALWAYS VISIBLE */}
                <div
                  className="absolute -inset-0.5 rounded-xl pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from var(--gradient-angle, 0deg), #27bb97, #2d7dd7, #27bb97, #2d7dd7, #27bb97)",
                    animation: "border-rotate 3s linear infinite",
                  }}
                ></div>

                {/* Inner background to cover the center */}
                <div className="absolute inset-0.5 bg-gray-200 rounded-lg group-hover:bg-gray-300 transition-colors duration-300"></div>

                <span className="relative z-10 flex items-center justify-center gap-2">
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
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  I Offer a Job
                </span>
              </button>

              {/* I Need a Job Button */}
              <button
                className="relative h-11 px-4 bg-gray-200 font-semibold text-gray-800 capitalize rounded-xl 
      min-w-[140px] hover:bg-gray-300 transition-all duration-300
      shadow-sm cursor-pointer overflow-hidden group"
              >
                {/* Animated border - ALWAYS VISIBLE */}
                <div
                  className="absolute -inset-0.5 rounded-xl pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from var(--gradient-angle, 0deg), #2d7dd7, #27bb97, #2d7dd7, #27bb97, #2d7dd7)",
                    animation: "border-rotate 3s linear infinite",
                  }}
                ></div>

                {/* Inner background to cover the center */}
                <div className="absolute inset-0.5 bg-gray-200 rounded-lg group-hover:bg-gray-300 transition-colors duration-300"></div>

                <span className="relative z-10 flex items-center justify-center gap-2">
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
                  I Need a Job
                </span>
              </button>
            </div>

            {/* create resume */}

            <div className="absolute text-center h-25 w-35 shadow-2xl bg-transparent backdrop-blur-2xl border-3 border-white rounded-lg bottom-75 left-70">
              <p className="capitalize font-semibold gap-2 pt-1">
                Create <span className="text-blue-600 font-semibold">Free</span>{" "}
                resume
              </p>
              <button
                className="bg-white capitalize rounded-2xl w-20 h-8 text-center cursor-pointer mt-1 font-semibold transition-all duration-200
    hover:bg-gray-200 border border-transparent hover:border-[#27bb97]"
              >
                create
              </button>
            </div>

            {/* second image */}
            <div className="absolute bg-white/20 bottom-2 z-10 -left-34  backdrop-blur-lg p-2 rounded-xl border-2 border-white w-fit">
              {/* <img src="/JobsImg/JobImg2.png" alt="" className="absolute h-40 -right-10 top-10"/> */}
              <img
                src="/JobsImg/videoImg2.jpg"
                alt=""
                className="h-36 w-32 object-cover rounded-2xl z-50"
              />

              {/* job available */}
              <div className="absolute h-12 w-45 bg-white/50  backdrop-blur-lg bottom-18 left-90 border-3 rounded-3xl flex items-center justify-center px-4 border-white text-black font-semibold">
                <div className="flex items-center gap-2">
                  <img
                    src="/JobsImg/bellIcon.png"
                    alt="bellImg"
                    className="h-5"
                  />
                  <span>Job Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 h-[100px] w-full bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* <img
          src="/JobsImg/ribben.png"
          alt=""
          className="absolute z-0 right-110 h-[600px]"
        /> */}
      </div>
    </div>
  );
}
