
import React from "react";
import { FaStar, FaCalendarCheck, FaCheckCircle, FaFire, FaArrowRight, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import { MdVerified, MdLocationOn, MdElectricBolt, MdLocalOffer, MdShield } from "react-icons/md";
import { GiWaterDrop, GiBroom, GiPaintRoller, GiSpiderWeb } from "react-icons/gi";
import { TbAirConditioning, TbTools } from "react-icons/tb";
import { RiArrowRightSLine } from "react-icons/ri";

const services = [
  {
    title: "Plumbing",
    price: "From ₹299",
    rating: "4.9",
    bookings: "2k+",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    title: "Cleaning",
    price: "From ₹399",
    rating: "4.8",
    bookings: "1.5k+",
    image: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f",
  },
  {
    title: "AC Repair",
    price: "From ₹499",
    rating: "4.9",
    bookings: "3k+",
    image: "/Services/acrepair.jpg",
  },
  {
    title: "Electric",
    price: "From ₹249",
    rating: "4.8",
    bookings: "1.2k+",
    image: "/Services/electric.jpg",
  },
  {
    title: "Painting",
    price: "From ₹599",
    rating: "4.7",
    bookings: "900+",
    image: "/Services/painting.jpg",
  },
  {
    title: "Pest Control",
    price: "From ₹699",
    rating: "4.8",
    bookings: "1k+",
    image: "/Services/cutedog.jpg",
  },
];

export default function MostBookedServices() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#27bb97]" />
            <span className="text-sm font-semibold tracking-wider uppercase text-[#27bb97]">
              Popular Services
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#27bb97]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Most Booked Services in{" "}
            <span className="relative inline-block text-[#27bb97]">
              USA
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#27bb97]/20 -z-10" />
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted local services with transparent pricing and verified professionals
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#27bb97] to-transparent rounded-full" />
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >

              {/* IMAGE */}
              <div className="relative h-50 md:h-50 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-50 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* PRICE BADGE */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                  <MdLocalOffer className="text-[#27bb97]" />
                  <span className="font-semibold text-gray-900">
                    {service.price}
                  </span>
                </div>

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-6 md:p-7">

                {/* BADGES */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#27bb97]/10 text-[#27bb97] flex items-center gap-1">
                    <MdVerified className="text-sm" />
                    Verified
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 flex items-center gap-1">
                    <FaFire className="text-sm" />
                    Popular
                  </span>
                </div>

                {/* TITLE + RATING */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#27bb97] transition">
                    {service.title}
                  </h3>

                  <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full">
                    <FaStar className="text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">
                      {service.rating}
                    </span>
                  </div>
                </div>

                {/* BOOKINGS COUNT */}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <FaCalendarCheck className="w-5 h-5" />
                  <span className="font-medium">
                    {service.bookings} bookings on platform
                  </span>
                </div>

                {/* AVAILABILITY */}
                <div className="flex items-center gap-2 text-sm text-green-600 mb-5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <FaClock className="text-sm" />
                  Available today
                </div>

                {/* CTA */}
                <button className="w-full py-3.5 bg-[#27bb97] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  Book Now
                  <RiArrowRightSLine className="w-5 h-5" />
                </button>

                {/* MICRO TRUST */}
                <p className="mt-3 text-xs text-gray-500 text-center flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1">
                    <MdShield className="text-gray-400" />
                    No hidden charges
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="text-gray-400" />
                    Free cancellation
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-3 px-8 py-3.5 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-xl hover:bg-[#27bb97] hover:text-white hover:shadow-lg transition">
            View All Services
            <FaArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}