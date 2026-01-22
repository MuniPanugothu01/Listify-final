import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const WhyUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 lg:pt-15">
      {/* Enhanced Section Heading */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight uppercase">
          Why Listify?
        </h1>
        <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-[#27BB97] mx-auto rounded-full"></div>
      </div>

      {/* ======= 01: How It Works ======= */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full ">
        {/* Left side - Text content */}
        <div className="w-full lg:w-[50%] text-black order-1 lg:order-1 ">
          <h1 className="text-black font-bold text-lg sm:text-xl md:text-2xl lg:text-[25px] mb-2 sm:mb-3 uppercase">
            How Listify Works
          </h1>
          <p className="text-gray-700 text-justify leading-relaxed text-sm sm:text-base md:text-lg">
            Listify connects local buyers and sellers in a seamless way. Simply
            sign up, create your listing with photos, a short description, and
            pricing — and get visible instantly to users near your area. Whether
            you're renting a flat, selling a car, posting a job, or promoting
            your services, Listify ensures your listing reaches the right
            audience quickly and securely. Users can chat, call, or message
            directly through our safe communication channel — no middlemen, no
            commissions.
          </p>

          <div className="flex items-center gap-1 sm:gap-2 mt-4 sm:mt-5 md:mt-6 lg:mt-7 ">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-400 h-2 w-2 sm:h-3 sm:w-3 rounded-full" />
            ))}
          </div>
        </div>

        {/* Center - Step Number */}
        <div className="flex flex-row lg:flex-col items-center justify-center gap-3 sm:gap-4 order-3 lg:order-2 w-full lg:w-auto">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[60px] text-[#27BB97] ">01</h1>
          <div className="hidden lg:flex flex-col items-center gap-3 pl-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-2 w-2 sm:h-3 sm:w-3 rounded-full" />
            ))}
          </div>
          <div className="flex lg:hidden items-center gap-2 sm:gap-3 pl-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-2 w-2 sm:h-3 sm:w-3 rounded-full" />
            ))}
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center items-center lg:justify-end lg:items-end order-2 lg:order-3">
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-70 lg:h-70 bg-[#27BB97] rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <img
              src="/Howworksgirl.png"
              alt="How Listify Works"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ======= 02: Why Choose Listify ======= */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 gap-8 lg:gap-0">
        {/* Left side - Circular image */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center items-center lg:justify-start lg:items-start order-2 lg:order-1">
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-70 lg:h-70 bg-[#27BB97] rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <img
              src="/Howworks3.png"
              alt="Why Choose Listify"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Center - Step Number */}
        <div className="flex flex-row lg:flex-col items-center justify-center gap-3 sm:gap-4 order-3 lg:order-2 w-full lg:w-auto">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[60px] text-[#27BB97]">02</h1>
          <div className="hidden lg:flex flex-col items-center gap-3 pl-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-2 w-2 sm:h-3 sm:w-3 rounded-full" />
            ))}
          </div>
          <div className="flex lg:hidden items-center gap-2 sm:gap-3 pl-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-2 w-2 sm:h-3 sm:w-3 rounded-full" />
            ))}
          </div>
        </div>

        {/* Right side - Text content */}
        <div className="w-full lg:w-[50%] text-black pl-0 lg:pl-10 order-1 lg:order-3">
          <h1 className="text-black font-bold text-lg sm:text-xl md:text-2xl lg:text-[25px] mb-2 sm:mb-3 uppercase">
            Why Choose Listify
          </h1>
          <p className="text-gray-700 text-justify leading-relaxed text-sm sm:text-base md:text-lg">
            Unlike traditional classified sites, Listify focuses on verified
            listings, smart search filters, and instant communication. Our
            platform uses AI-based matching to recommend listings based on your
            interests and location. Every post is moderated to keep scams away.
            Whether you're looking for a reliable service, a second-hand deal,
            or a local opportunity — Listify brings transparency and speed to
            online classifieds.
          </p>

          <div className="flex items-center gap-1 sm:gap-2 mt-4 sm:mt-5 md:mt-6 lg:mt-7">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-400 h-2 w-2 sm:h-3 sm:w-3 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* ======= 03: Categories ======= */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 gap-8 lg:gap-0">
        {/* Left side - Text content */}
        <div className="w-full lg:w-[50%] text-black order-1 lg:order-1">
          <h1 className="text-black font-bold text-lg sm:text-xl md:text-2xl lg:text-[25px] mb-2 sm:mb-3 uppercase">
            Categories on Listify
          </h1>
          <p className="text-gray-700 text-justify leading-relaxed text-sm sm:text-base md:text-lg">
            Listify offers a wide range of categories inspired by top platforms
            like Craigslist and Sulekha, allowing users to post or browse
            listings across various domains:
          </p>
          <ul className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base md:text-lg">
            <li className="flex items-start sm:items-center gap-2">
              <FaArrowRight className="text-black mt-1 sm:mt-0 flex-shrink-0" />
              <span>Real Estate – Buy, Sell, or Rent Property</span>
            </li>
            <li className="flex items-start sm:items-center gap-2">
              <FaArrowRight className="text-black mt-1 sm:mt-0 flex-shrink-0" />
              <span>Vehicles – Cars, Bikes, and Spare Parts</span>
            </li>
            <li className="flex items-start sm:items-center gap-2">
              <FaArrowRight className="text-black mt-1 sm:mt-0 flex-shrink-0" />
              <span>Jobs – Full-time, Part-time, and Freelance</span>
            </li>
            <li className="flex items-start sm:items-center gap-2">
              <FaArrowRight className="text-black mt-1 sm:mt-0 flex-shrink-0" />
              <span>Services – Home repair, Education, Events, and more</span>
            </li>
            <li className="flex items-start sm:items-center gap-2">
              <FaArrowRight className="text-black mt-1 sm:mt-0 flex-shrink-0" />
              <span>Electronics – Mobiles, Laptops, and Gadgets</span>
            </li>
            <li className="flex items-start sm:items-center gap-2">
              <FaArrowRight className="text-black mt-1 sm:mt-0 flex-shrink-0" />
              <span>
                For Sale – Furniture, Fashion, Books, and Miscellaneous
              </span>
            </li>
            <li className="flex items-start sm:items-center gap-2">
              <FaArrowRight className="text-black mt-1 sm:mt-0 flex-shrink-0" />
              <span>Pets – Adoption, Accessories, and Veterinary</span>
            </li>
            <li className="flex items-start sm:items-center gap-2">
              <FaArrowRight className="text-black mt-1 sm:mt-0 flex-shrink-0" />
              <span>Community – Events, Activities, and Networking</span>
            </li>
          </ul>
          <div className="flex items-center gap-1 sm:gap-2 mt-4 sm:mt-5 md:mt-6 lg:mt-7">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-400 h-2 w-2 sm:h-3 sm:w-3 rounded-full" />
            ))}
          </div>
        </div>

        {/* Center - Step Number */}
        <div className="flex flex-row lg:flex-col items-center justify-center gap-3 sm:gap-4 order-3 lg:order-2 w-full lg:w-auto">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[60px] text-[#27BB97]">03</h1>
          <div className="hidden lg:flex flex-col items-center gap-3 pl-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-2 w-2 sm:h-3 sm:w-3 rounded-full" />
            ))}
          </div>
          <div className="flex lg:hidden items-center gap-2 sm:gap-3 pl-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-2 w-2 sm:h-3 sm:w-3 rounded-full" />
            ))}
          </div>
        </div>

        {/* Right side - Circular image */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center items-center lg:justify-end lg:items-end order-2 lg:order-3">
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-70 lg:h-70 bg-[#27BB97] rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <img
              src="/Whyrobo.png"
              alt="Listify Categories"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;