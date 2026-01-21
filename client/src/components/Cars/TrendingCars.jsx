import React, { useState } from "react";
import { Link } from "react-router-dom";
// react icons
import { GoArrowRight } from "react-icons/go";

const TrendingCars = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="my-20 min-h-screen bg-[#f3f3f3] p-5 w-full">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-black capitalize font-bold text-5xl">
          Trending vehicles
        </h1>

        <Link to="/car-listings">
          <button className="flex items-center gap-2 px-4 h-10 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-full cursor-pointer">
            <span>View All</span>
            <GoArrowRight size={18} />
          </button>
        </Link>
      </div>

      {/* cards */}
      <Link to="/car-details">
        <div className="flex flex-wrap mt-10 gap-4 justify-center">
          {/* card-01 (SPECIAL BUTTON – unchanged style) */}
          <div
            className="group relative w-66 h-70 bg-white rounded-lg overflow-hidden
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-xl cursor-pointer"
          >
            <h1 className="absolute p-4 uppercase font-bold z-10">bmw i4</h1>

            <img
              src="/cars/trendcar.webp"
              alt=""
              className="absolute h-full w-full top-0 left-0 object-cover
                 transition-transform duration-500 ease-out
                 group-hover:scale-110"
            />

            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
              <p className="text-black capitalize">$150/day</p>

              {/* original style */}
              <button
                className="px-4 h-10 rounded-full text-white
                   bg-[#27bb97] hover:bg-[#1fa987]
                   transition-all duration-300 ease-out
                   hover:-translate-y-0.5 hover:shadow-lg
                   active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* card-02 */}
          <div
            className="group relative w-66 h-70 bg-white rounded-lg overflow-hidden
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-xl cursor-pointer"
          >
            <h1 className="p-4 uppercase font-bold relative z-10">audi a7</h1>

            <img
              src="/cars/trendingaudi.png"
              alt=""
              className="absolute w-50 top-20 left-8 object-cover
                 transition-transform duration-500 ease-out
                 group-hover:scale-110"
            />

            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
              <p className="text-black capitalize">$150/day</p>

              <button
                className="px-4 h-10 rounded-full
                   bg-white text-black
                   border border-gray-300
                   transition-all duration-300 ease-out
                   hover:border-[#1fa987]
                   hover:-translate-y-0.5 hover:shadow-md
                   active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* card-03 */}
          <div
            className="group relative w-66 h-70 bg-white rounded-lg overflow-hidden
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-xl cursor-pointer"
          >
            <h1 className="p-4 uppercase font-bold relative z-10">
              mercedes e-class
            </h1>

            <img
              src="/cars/mercedestrending.png"
              alt=""
              className="absolute w-50 top-20 left-8 object-cover
                 transition-transform duration-500 ease-out
                 group-hover:scale-110"
            />

            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
              <p className="text-black capitalize">$150/day</p>

              <button
                className="px-4 h-10 rounded-full
                   bg-white text-black
                   border border-gray-300
                   transition-all duration-300 ease-out
                   hover:border-[#1fa987]
                   hover:-translate-y-0.5 hover:shadow-md
                   active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* card-04 */}
          <div
            className="group relative w-66 h-70 bg-white rounded-lg overflow-hidden
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-xl cursor-pointer"
          >
            <h1 className="absolute p-4 uppercase font-bold z-10">
              porsche 911
            </h1>

            <img
              src="/cars/trendcar.webp"
              alt=""
              className="absolute h-full w-full top-0 left-0 object-cover
                 transition-transform duration-500 ease-out
                 group-hover:scale-110"
            />

            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
              <p className="text-black capitalize">$150/day</p>

              <button
                className="px-4 h-10 rounded-full
                   bg-white text-black
                   border border-gray-300
                   transition-all duration-300 ease-out
                   hover:border-[#1fa987]
                   hover:-translate-y-0.5 hover:shadow-md
                   active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Promotional Banner Section */}
      <div className="mt-16">
        {/* Feature Benefits Bar */}
        <div className="bg-black text-white p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Seamless Booking */}
          <div
            className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedFeature === "seamless"
                ? "bg-gray-800/50"
                : "hover:bg-gray-900/30"
            }`}
            onClick={() =>
              setSelectedFeature(
                selectedFeature === "seamless" ? null : "seamless",
              )
            }
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                selectedFeature === "seamless"
                  ? "bg-gray-700 border-gray-600"
                  : "border-2 border-white"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Seamless booking</h3>
            </div>
          </div>

          {/* Premium Privileges */}
          <div
            className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedFeature === "premium"
                ? "bg-gray-800/50"
                : "hover:bg-gray-900/30"
            }`}
            onClick={() =>
              setSelectedFeature(
                selectedFeature === "premium" ? null : "premium",
              )
            }
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                selectedFeature === "premium"
                  ? "bg-gray-700 border-gray-600"
                  : "border-2 border-white"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Premium privileges</h3>
              <p className="text-gray-400 text-sm">for regular customers</p>
            </div>
          </div>

          {/* Flexible Cancellation */}
          <div
            className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedFeature === "flexible"
                ? "bg-gray-800/50"
                : "hover:bg-gray-900/30"
            }`}
            onClick={() =>
              setSelectedFeature(
                selectedFeature === "flexible" ? null : "flexible",
              )
            }
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                selectedFeature === "flexible"
                  ? "bg-gray-700 border-gray-600"
                  : "border-2 border-white"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            <div>
              <h3 className="font-semibold mb-1">Change or cancel your</h3>
              <p className="text-gray-400 text-sm">
                booking up to 72 hours before the time of pickup.
              </p>
            </div>
          </div>

          {/* No Recharging Fees */}
          <div
            className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedFeature === "nofee"
                ? "bg-gray-800/50"
                : "hover:bg-gray-900/30"
            }`}
            onClick={() =>
              setSelectedFeature(selectedFeature === "nofee" ? null : "nofee")
            }
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                selectedFeature === "nofee"
                  ? "bg-gray-700 border-gray-600"
                  : "border-2 border-white"
              }`}
            >
              <div className="relative">
                <span className="text-xs font-bold">NO FEE</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">No recharging</h3>
              <p className="text-gray-400 text-sm">fees</p>
            </div>
          </div>
        </div>

        {/* Tesla Discount Banner - Updated with full background image */}
        <div className="relative w-full rounded-b-2xl overflow-hidden h-[400px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/cars/tesla.webp"
              alt="Tesla Background"
              className="w-full h-full object-cover object-bottom"
            />
            {/* Dark overlay for text readability */}
            {/* <div className="absolute inset-0 bg-black/50"></div> */}
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center px-12">
            <div className="max-w-md">
              <h2 className="text-white text-6xl font-bold leading-tight mb-6">
                Book Tesla with
                <br />a big discount
              </h2>
              <button className="px-8 py-3 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-full font-semibold transition-colors cursor-pointer">
                Book Now
              </button>
            </div>

            {/* Discount Badge */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 w-56 h-56 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-90" />
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <div className="text-8xl font-bold">50%</div>
                <div className="text-lg mt-2">For all online</div>
                <div className="text-lg">Tesla bookings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCars;
