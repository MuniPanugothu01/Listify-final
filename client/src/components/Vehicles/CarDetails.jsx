import React, { useState } from "react";
import { Link } from "react-router-dom";
// react icons
import {
  FaChevronLeft,
  FaChevronRight,
  FaMinus,
  FaPlus,
  FaCar,
  FaCog,
  FaBolt,
  FaUsers,
  FaSync,
} from "react-icons/fa";
import { MdCarCrash } from "react-icons/md";
import { TbEngine } from "react-icons/tb";
import { GiAutomaticSas } from "react-icons/gi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { GoArrowUpLeft } from "react-icons/go";

const CarDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("red");

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-6">
      {/* Breadcrumb */}
      <div className=" px-6 py-4 text-xs text-zinc-500 tracking-wide">
        HOME / CARS / CARS DETAIL
      </div>

      {/* Main Content */}
      <div className=" px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
          {/* Left Column - Images - Takes 60% */}
          <div className="lg:col-span-5">
            <div className="rounded-md mb-6 shadow-sm overflow-hidden">
              <img
                src="/cars/cardetail1.jpg"
                alt="Vanguard GX2"
                className="w-full h-auto max-h-[500px] rounded-md object-cover bg-gray-50"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="relative flex gap-2 justify-start overflow-x-auto md:overflow-visible md:flex-nowrap pb-2 md:pb-0">
              <div className="min-w-[200px] md:min-w-0 w-50 h-40 rounded-md overflow-hidden cursor-pointer hover:border-2 hover:border-gray-300 shadow-sm transition-all">
                <img
                  src="/cars/cardetail1.jpg"
                  className="w-full h-full object-cover bg-gray-50 hover:scale-105 transition-transform duration-300"
                  alt=""
                />
              </div>

              <div className="min-w-[200px] md:min-w-0 w-50 h-40 rounded-md overflow-hidden cursor-pointer hover:border-2 hover:border-gray-300 shadow-sm transition-all">
                <img
                  src="/cars/cardetail1.jpg"
                  className="w-full h-full object-cover bg-gray-50 hover:scale-105 transition-transform duration-300"
                  alt=""
                />
              </div>

              <div className="min-w-[200px] md:min-w-0 w-50 h-40 rounded-md overflow-hidden cursor-pointer hover:border-2 hover:border-gray-300 shadow-sm transition-all">
                <img
                  src="/cars/cardetail1.jpg"
                  className="w-full h-full object-cover bg-gray-50 hover:scale-105 transition-transform duration-300"
                  alt=""
                />
              </div>

              <div className="min-w-[200px] md:min-w-0 w-50 h-40 rounded-md overflow-hidden cursor-pointer hover:border-2 hover:border-gray-300 shadow-sm transition-all">
                <img
                  src="/cars/cardetail1.jpg"
                  className="w-full h-full object-cover bg-gray-50 hover:scale-105 transition-transform duration-300"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Right Column - Details - Takes 40% */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl  md:text-3xl font-bold mb-8 leading-tight">
              Vanguard GX2 Convertible
            </h2>

            <div className="mb-6">
              <div className="text-[18px] text-zinc-500 mb-1 tracking-wider font-medium">
                STARTING AT
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-zinc-900">
                $59
                <span className="text-xl lg:text-2xl font-normal text-zinc-600">
                  /day
                </span>
              </div>
            </div>

            <p className="text-zinc-600 mb-8 leading-relaxed text-sm lg:text-[18px] md:text-[17px]">
              The Vanguard GX2 is an exceptional Machine Dealership, this car
              offers unparalleled performance and comfort that the stand's your
              hire car experience this premier, stylish and classic idea of this
              vehicle. I'm declaution To stay with You on a Journey...
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border-2 border-zinc-500 flex items-center justify-center hover:border-zinc-400 transition"
                >
                  <FaMinus className="w-3.5 h-3.5 text-zinc-600" />
                </button>
                <span className="text-xl font-semibold w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border-2 border-zinc-500 flex items-center justify-center hover:border-zinc-400 transition"
                >
                  <FaPlus className="w-3.5 h-3.5 text-zinc-600" />
                </button>
              </div>
              <button className="bg-[#27bb97] ml-5 hover:bg-[#1fa987] text-white px-6 py-3 rounded-md font-semibold transition shadow-md text-sm whitespace-nowrap uppercase cursor-pointer">
                book Now
              </button>
            </div>

            {/* Specifications */}
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-4 tracking-wider text-zinc-700">
                SPECIFICATIONS
              </h3>
              <div className="grid grid-cols-2  gap-y-3">
                {/* Row 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center ">
                    <MdCarCrash className="text-[#27bb97] text-2xl" />
                  </div>
                  <span className="text-sm text-zinc-700 md:text-[15px]">
                    Convertible
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9  flex items-center justify-center ">
                    <GiAutomaticSas className="text-[#27bb97] text-2xl" />
                  </div>
                  <span className="text-sm text-zinc-700 md:text-[15px]">
                    Automatic
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9  flex items-center justify-center ">
                    <TbEngine className="text-[#27bb97] text-2xl" />
                  </div>
                  <span className="text-sm text-zinc-700 md:text-[15px]">
                    5.0-liter V8
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9  flex items-center justify-center ">
                    <FaUsers className="text-[#27bb97] text-2xl" />
                  </div>
                  <span className="text-sm text-zinc-700 md:text-[15px]">
                    4 passengers
                  </span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9  flex items-center justify-center ">
                    <IoSpeedometerOutline className="text-[#27bb97] text-2xl" />
                  </div>
                  <span className="text-sm text-zinc-700 md:text-[15px]">
                    45o HP
                  </span>
                </div>
                {/* Empty cell to maintain grid structure */}
                <div></div>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-xs font-bold mb-4 tracking-wider text-zinc-700">
                IN COLOUR
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedColor("red")}
                  className={`w-9 h-9 rounded-full bg-red-500 shadow-md ${
                    selectedColor === "red"
                      ? "ring-2 ring-offset-2 ring-red-500"
                      : ""
                  } transition`}
                />
                <button
                  onClick={() => setSelectedColor("black")}
                  className={`w-9 h-9 rounded-full bg-black shadow-md ${
                    selectedColor === "black"
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  } transition`}
                />

                <button
                  onClick={() => setSelectedColor("red")}
                  className={`w-9 h-9 rounded-full bg-[#27bb97] shadow-md ${
                    selectedColor === "red"
                      ? "ring-2 ring-offset-2 ring-[#27bb97]"
                      : ""
                  } transition`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Car Features */}
        <div className="mt-24 pt-8 border-t border-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
            {/* Left side */}
            <div>
              <h2 className="text-4xl font-bold">Car Features</h2>
            </div>

            {/* Right side (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
              <div className="bg-gray-100 rounded-md p-4">
                <h3 className="font-bold mb-1 text-sm tracking-wide">
                  CONVERTIBLE TOP
                </h3>
                <p className="text-zinc-600 text-[15px] leading-relaxed">
                  Enjoy the open air experience with an easy power retractable
                  fabric top.
                </p>
              </div>

              <div className="bg-gray-100 rounded-md p-4">
                <h3 className="font-bold mb-1 text-sm tracking-wide">
                  SPORT MODE
                </h3>
                <p className="text-zinc-600 text-[15px] leading-relaxed">
                  Unleash the full power of the V8 engine for an exhilarating
                  drive.
                </p>
              </div>

              <div className="bg-gray-100 rounded-md p-4">
                <h3 className="font-bold mb-1 text-sm tracking-wide">
                  INFOTAINMENT SYSTEM
                </h3>
                <p className="text-zinc-600 text-[15px] leading-relaxed">
                  Stay connected with Integrated Satellite Navigation and Radio.
                </p>
              </div>

              <div className="bg-gray-100 rounded-md p-4">
                <h3 className="font-bold mb-1 text-sm tracking-wide">
                  ADVANCED SAFETY
                </h3>
                <p className="text-zinc-600 text-[15px] leading-relaxed">
                  Benefit from modern safety features, including ABS brakes and
                  airbags.
                </p>
              </div>

              <div className="bg-gray-100 rounded-md p-4">
                <h3 className="font-bold mb-1 text-sm tracking-wide">
                  LEATHER INTERIOR
                </h3>
                <p className="text-zinc-600 text-[15px] leading-relaxed">
                  Experience premium comfort with leather-trimmed seats and
                  finishes.
                </p>
              </div>

              <div className="bg-gray-100 rounded-md p-4">
                <h3 className="font-bold mb-1 text-sm tracking-wide">
                  ICONIC DESIGN
                </h3>
                <p className="text-zinc-600 text-[15px] leading-relaxed">
                  Turn heads with the timeless, bold styling of the Ford
                  Mustang.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <div className="mt-24 px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-900 capitalize">
              You may also like
            </h2>
            <div className="flex gap-3">
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition cursor-pointer">
                <BsArrowLeft className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#27bb97] hover:bg-[#1fa987] text-white flex items-center justify-center transition cursor-pointer">
                <BsArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-5">
            {/* Card 1 */}
            <div className="group bg-white rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
              <div className="p-3 sm:p-4 md:p-5">
                <div className="w-full h-40 sm:h-48 md:h-40 mb-4 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                  <img
                    src="/cars/cardetail1.jpg"
                    alt="Horizon Mirage Convertible"
                    className="w-full h-full object-cover rounded-md transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-2">
                  Horizon Mirage
                  <br />
                  Convertible
                </h3>
                <p className="text-center text-gray-600 text-sm sm:text-base font-medium">
                  $59/day
                </p>
              </div>
            </div>

            {/* Card 2 - Highlighted */}
            <div className="group bg-[#27bb97] rounded-md shadow-md transition-shadow cursor-pointer overflow-hidden">
              <div className="p-3 sm:p-4 md:p-5">
                <div className="w-full h-40 sm:h-48 md:h-40 mb-4 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                  <img
                    src="/cars/cardetail.webp"
                    alt="Vanguard Phoenix C-Class"
                    className="w-full h-full object-cover rounded-md transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-center font-semibold text-white text-sm sm:text-base leading-tight mb-2">
                  Vanguard Phoenix
                  <br />
                  C-Class
                </h3>
                <p className="text-center text-white text-sm sm:text-base font-medium">
                  $49/day
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-md sm:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
              <div className="p-3 sm:p-4 md:p-5">
                <div className="w-full h-40 sm:h-48 md:h-40 mb-4 flex items-center justify-center bg-gray-50 rounded-md sm:rounded-lg overflow-hidden">
                  <img
                    src="/cars/cardetail.webp"
                    alt="Apex Autos Typhoon Model 3"
                    className="w-full h-full object-cover rounded-md transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-2">
                  Apex Autos Typhoon
                  <br />
                  Model 3
                </h3>
                <p className="text-center text-gray-600 text-sm sm:text-base font-medium">
                  $59/day
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white rounded-md sm:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
              <div className="p-3 sm:p-4 md:p-5">
                <div className="w-full h-40 sm:h-48 md:h-40 mb-4 flex items-center justify-center bg-gray-50 rounded-md sm:rounded-lg overflow-hidden">
                  <img
                    src="/cars/cardetail.webp"
                    alt="Radiant Solstice Convertible"
                    className="w-full h-full object-cover rounded-md transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-2">
                  Radiant Solstice
                  <br />
                  Convertible
                </h3>
                <p className="text-center text-gray-600 text-sm sm:text-base font-medium">
                  $79/day
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group bg-white rounded-md sm:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
              <div className="p-3 sm:p-4 md:p-5">
                <div className="w-full h-40 sm:h-48 md:h-40 mb-4 flex items-center justify-center bg-gray-50 rounded-md sm:rounded-lg overflow-hidden">
                  <img
                    src="/cars/cardetail.webp"
                    alt="Aurora X5 Nebula Minivan"
                    className="w-full h-full object-cover rounded-md transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-2">
                  Aurora X5 Nebula
                  <br />
                  Minivan
                </h3>
                <p className="text-center text-gray-600 text-sm sm:text-base font-medium">
                  $59/day
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <Link to="/car-listings">
            <button
              className="
      inline-flex
      items-center
      gap-2
      px-4 py-3
      border-2 border-[#27bb97]
      text-[#27bb97]
      font-semibold
      rounded-lg
      hover:bg-[#27bb97]
      hover:text-white
      transition-all
      duration-300
      hover:shadow-lg
      cursor-pointer
      uppercase
    "
            >
              <GoArrowUpLeft size={24} />
              back to cars
            </button>
          </Link>
        </div>

        {/* another style of button  */}

        {/* <div className="mt-8 px-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-[#27bb97] hover:text-[#1fa987] hover:underline transition cursor-pointer rounded-lg hover:bg-gray-50">
            <BsArrowLeft className="w-5 h-5" />
            <span className="font-medium ">Back to Cars</span>
          </button>
        </div> */}

        {/* CTA Banner */}
        <div className="mt-24 relative h-[600px] text-white overflow-hidden rounded-xl flex flex-col items-center justify-center">
          {/* Background Image */}

          <img
            src="/cars/c1.jpg"
            alt="Car on open road"
            className="absolute inset-0  w-full h-full object-cover "
          />

          {/* Overlay for better text readability */}
          {/* <div className="absolute inset-0 bg-black/50"></div> */}

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="relative z-50 text-center ">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="block">Book Your Adventure</span>
              <span className="block">Today and Feel the Power</span>
              <span className="block">of the Open Road.</span>
            </h2>
            <button className="bg-[#27bb97] hover:bg-[#1fa987] text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition shadow-lg text-sm md:text-base tracking-wide cursor-pointer mt-8">
              GET STARTED WITH US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
