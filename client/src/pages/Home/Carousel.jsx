import React from "react";

export default function Carousel() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="px-4 md:px-8 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content - Same as before */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              ONE PLATFORM FOR ALL YOUR{" "}
              <span className="text-[#27BB97] relative">
                LOCAL
                <svg
                  className="absolute -bottom-1 md:-bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                >
                  <path
                    d="M0,4 Q50,0 100,4 T200,4"
                    stroke="#27BB97"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
              </span>{" "}
              NEEDS
            </h1>

            <p className="text-gray-600 text-base md:text-lg">
              Find houses for rent or sale, trusted nanny & home care, local
              services, vehicles, and travel options — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="px-6 md:px-8 py-3 bg-[#27BB97] text-white rounded-full hover:shadow-lg transition transform hover:scale-105">
                Get Started
              </button>
              <button className="px-6 md:px-8 py-3 border-2 border-[#27BB97] text-[#27BB97] rounded-full hover:bg-[#27BB97] hover:text-white transition">
                How It Works
              </button>
            </div>
          </div>

          {/* Right Section - Carousel */}
          <div className="relative flex justify-center items-center">
            {/* Orange image container - Centered */}
            <div className="relative z-10 bg-orange-400 rounded-full w-[300px] md:w-[400px] h-[300px] md:h-[400px] overflow-hidden flex items-center justify-center mx-auto">
              <div className="bg-orange-300 rounded-full w-[240px] md:w-[320px] h-[240px] md:h-[320px] overflow-hidden">
                <img
                  src="/Services/HomeServices/hero-1.png"
                  alt="Hero-image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Rotating circle - Wraps around the orange container */}
            <div className="absolute top-50 left-72 -translate-x-1/2 -translate-y-1/2 w-[450px] md:w-[500px] h-[400px] md:h-[500px] border border-green-200 rounded-full">
              {/* Category icons positioned on the rotating circle */}

              {/* Top center - Cars */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 md:w-16 h-12 md:h-16 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-orange-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom center - Rentals */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 md:w-16 h-12 md:h-16 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>

              {/* Right center - Home Care */}
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-12 md:w-16 h-12 md:h-16 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
              </div>

              {/* Left center - Services */}
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-12 md:w-16 h-12 md:h-16 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-purple-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Top right - Automobiles */}
              <div className="absolute top-8 right-12 md:right-16 w-10 md:w-14 h-10 md:h-14 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Top left - Events */}
              <div className="absolute top-8 left-12 md:left-16 w-10 md:w-14 h-10 md:h-14 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom right - Travel */}
              <div className="absolute bottom-8 right-12 md:right-16 w-10 md:w-14 h-10 md:h-14 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-teal-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom left - Jobs */}
              <div className="absolute bottom-8 left-12 md:left-16 w-10 md:w-14 h-10 md:h-14 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
