import React from "react";
// react icons
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { RiArrowDropRightLine } from "react-icons/ri";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-[#f7f8fd]">
      {/* Main Content Container */}
      <div className="relative flex gap-18 min-h-[calc(100vh-80px)] w-full">
        {/* Left Side - Image */}
        <div className="w-[65%] relative">
          <div className="relative h-full">
            <img
              src="/Services/heroImg2.png"
              alt="Local Services"
              className="w-[500px] h-[550px] mx-auto block mt-5"
            />

            {/* Instant bookings */}
            <div className="h-[65px] w-[180px] bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-300 -mt-110 ml-32">
              <div className="flex items-center gap-3">
                <img
                  src="/Services/touchpad1.png"
                  alt="touch pad"
                  className="h-10 w-10"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-gray-900 text-sm font-semibold">
                    Instant online
                  </span>
                  <span className="text-[#27bb97] capitalize font-semibold text-sm">
                    Booking
                  </span>
                </div>
              </div>
            </div>

            {/* Trusted Professionals */}
            <div className="relative h-[65px] w-[180px] bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-300 ml-168 -mt-5">
              {/* Verified tag on border */}
              <div className="absolute -top-3 left-35  px-1 mt-1">
                <MdVerified className="text-[#27bb97] text-lg" />
              </div>

              {/* Content */}
              <div className="flex items-center gap-3">
                <img
                  src="/Services/touchpad1.png"
                  alt="touch pad"
                  className="h-10 w-10"
                />

                <div className="flex flex-col leading-tight">
                  <span className="text-gray-900 text-sm capitalize font-semibold">
                    Trusted
                  </span>
                  <span className="text-[#27bb97] capitalize font-semibold text-sm">
                    Professionals
                  </span>
                </div>
              </div>
            </div>

            {/* Get support */}
            <div className="h-[65px] w-[160px] bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-300 ml-35 mt-45 z-99999999999999">
              <div className="flex items-center gap-3">
                <img
                  src="/Services/supportAgent.png"
                  alt="touch pad"
                  className="h-10 w-10"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-gray-900 text-sm capitalize font-semibold">
                    get <span className="text-[#27bb97]">24/7</span>
                  </span>
                  <span className="capitalize font-semibold text-sm">
                    support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Text */}
        <div className="mt-20  flex flex-col items-start justify-start">
          <h1 className="text-6xl font-bold leading-tight">
            Find Trusted <br /> Local Services <br /> Near You
          </h1>

          <span className="text-gray-500  mr-7  text-[20px] mt-1">
            All professionals are carefully verified to ensure quality, safety,
            and reliable service every time.
          </span>
        </div>
      </div>

      {/* Search Bar Section - Overlapping both sections */}
      <div className="absolute bottom-0 w-full px-8 pb-8">
        {/* service provider */}
        <div className="flex items-center gap-4 text-center justify-center mb-4  ml-30">
          <p className="text-gray-950 capitalize font-medium">
            are you a service provider?
          </p>
          <button className="h-14 w-40 rounded-2xl capitalize border bg-[#27bb97] cursor-pointer text-white">
            post your service
          </button>
        </div>

        <div className="relative">
          {/* Search Bar Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Search bar positioned to overlap both sections */}
            <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl relative">
              {/* Text above search bar */}
              <div className="text-sm font-medium text-gray-900 mb-3 px-1 ml-[35%]">
                Find Trusted Service Professionals
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                {/* Left part of search bar (over image section) */}
                <div className="flex-1">
                  <div className="flex items-center bg-gray-50 rounded-xl px-5 py-3.5 border border-gray-200 hover:border-[#27bb97] transition-colors">
                    <div className="flex items-center w-full">
                      <FaSearch className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search services (e.g., plumbing, cleaning)"
                        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Right part of search bar (over text section) */}
                <div className="flex-1">
                  <div className="flex items-center bg-gray-50 rounded-xl px-5 py-3.5 border border-gray-200 hover:border-[#27bb97] transition-colors">
                    <div className="flex items-center w-full">
                      <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="select the location services needed"
                        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#27bb97] to-[#1FA987] text-white px-8 py-3.5 rounded-xl font-semibold hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer min-w-[140px]">
                  <FaSearch className="w-4 h-4" />
                  <span className="text-base">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default HeroSection;
