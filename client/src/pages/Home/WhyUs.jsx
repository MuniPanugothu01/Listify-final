import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const WhyUs = () => {
  return (
    <div className="max-w-6xl mx-auto pt-15">
      {/* Enhanced Section Heading */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4 tracking-tight uppercase">
          Why Listify?
        </h1>
        <div className="w-24 h-1.5 bg-[#c89a5e] mx-auto rounded-full"></div>
      </div>

      {/* ======= 01: How It Works ======= */}
      <div className="flex items-center justify-between w-full px-10 py-6">
        {/* Left side - Text content */}
        <div className="w-[50%] text-black">
          <h1 className="text-[#c89a5e] font-bold text-[25px] mb-3 uppercase">
            How Listify Works
          </h1>
          <p className="text-gray-700 text-justify leading-relaxed">
            Listify connects local buyers and sellers in a seamless way. Simply
            sign up, create your listing with photos, a short description, and
            pricing — and get visible instantly to users near your area. Whether
            you’re renting a flat, selling a car, posting a job, or promoting
            your services, Listify ensures your listing reaches the right
            audience quickly and securely. Users can chat, call, or message
            directly through our safe communication channel — no middlemen, no
            commissions.
          </p>

          <div className="flex items-center gap-2 mt-7">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-400 h-3 w-3 rounded-full" />
            ))}
          </div>
        </div>

        {/* Center - Step Number */}
        <div className="flex flex-col items-center gap-3 pl-10">
          <h1 className="font-extrabold text-[60px] text-[#c89a5e]">01</h1>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-3 w-3 rounded-full" />
          ))}
        </div>

        {/* Right side - Image */}
        <div className="w-[50%] flex flex-col justify-end items-end">
          <div className="w-40 h-40 bg-[#c89a5e] rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <img
              src="/Whyrobo.png"
              alt="How Listify Works"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ======= 02: Why Choose Listify ======= */}
      <div className="flex items-center justify-between w-full px-10 py-6">
        {/* Left side - Circular image */}
        <div className="w-[50%] flex flex-col justify-start items-left">
          <div className="w-40 h-40 bg-[#c89a5e] rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <img
              src="/Whyrobo.png"
              alt="Why Choose Listify"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Center - Step Number */}
        <div className="flex flex-col items-center gap-3 pl-10">
          <h1 className="font-extrabold text-[60px] text-[#c89a5e]">02</h1>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-3 w-3 rounded-full" />
          ))}
        </div>

        {/* Right side - Text content */}
        <div className="w-[50%] text-black pl-10">
          <h1 className="text-[#c89a5e] font-bold text-[25px] mb-3 uppercase">
            Why Choose Listify
          </h1>
          <p className="text-gray-700 text-justify leading-relaxed">
            Unlike traditional classified sites, Listify focuses on verified
            listings, smart search filters, and instant communication. Our
            platform uses AI-based matching to recommend listings based on your
            interests and location. Every post is moderated to keep scams away.
            Whether you’re looking for a reliable service, a second-hand deal,
            or a local opportunity — Listify brings transparency and speed to
            online classifieds.
          </p>

          <div className="flex items-center gap-2 mt-7">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-400 h-3 w-3 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* ======= 03: Categories ======= */}
      <div className="flex items-center justify-between w-full px-10 py-6">
        {/* Left side - Text content */}
        <div className="w-[50%] text-black">
          <h1 className="text-[#c89a5e] font-bold text-[25px] mb-3 uppercase">
            Categories on Listify
          </h1>
          <p className="text-gray-700 text-justify leading-relaxed">
            Listify offers a wide range of categories inspired by top platforms
            like Craigslist and Sulekha, allowing users to post or browse
            listings across various domains:
          </p>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <FaArrowRight className="text-[#c89a5e]" />
              <span>Real Estate – Buy, Sell, or Rent Property</span>
            </li>
            <li className="flex items-center gap-2">
              <FaArrowRight className="text-[#c89a5e]" />
              <span>Vehicles – Cars, Bikes, and Spare Parts</span>
            </li>
            <li className="flex items-center gap-2">
              <FaArrowRight className="text-[#c89a5e]" />
              <span>Jobs – Full-time, Part-time, and Freelance</span>
            </li>
            <li className="flex items-center gap-2">
              <FaArrowRight className="text-[#c89a5e]" />
              <span>Services – Home repair, Education, Events, and more</span>
            </li>
            <li className="flex items-center gap-2">
              <FaArrowRight className="text-[#c89a5e]" />
              <span>Electronics – Mobiles, Laptops, and Gadgets</span>
            </li>
            <li className="flex items-center gap-2">
              <FaArrowRight className="text-[#c89a5e]" />
              <span>
                For Sale – Furniture, Fashion, Books, and Miscellaneous
              </span>
            </li>
            <li className="flex items-center gap-2">
              <FaArrowRight className="text-[#c89a5e]" />
              <span>Pets – Adoption, Accessories, and Veterinary</span>
            </li>
            <li className="flex items-center gap-2">
              <FaArrowRight className="text-[#c89a5e]" />
              <span>Community – Events, Activities, and Networking</span>
            </li>
          </ul>
          <div className="flex items-center gap-2 mt-7">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-400 h-3 w-3 rounded-full" />
            ))}
          </div>
        </div>

        {/* Center - Step Number */}
        <div className="flex flex-col items-center gap-3 pl-10">
          <h1 className="font-extrabold text-[60px] text-[#c89a5e]">03</h1>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-3 w-3 rounded-full" />
          ))}
        </div>

        {/* Right side - Circular image */}
        <div className="w-[50%] flex flex-col justify-end items-end">
          <div className="w-40 h-40 bg-[#c89a5e] rounded-full flex items-center justify-center overflow-hidden shadow-md">
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
