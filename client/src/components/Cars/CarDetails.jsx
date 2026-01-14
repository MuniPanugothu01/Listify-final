import React, { useState } from "react";
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

const CarDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("red");

  const similarCars = [
    { name: "Koenigsegg Agera", price: "$99/day", image: "🏎️" },
    {
      name: "Volkswagen Sharan Minibus",
      price: "$59/day",
      featured: true,
      image: "🚗",
    },
    { name: "Aston Martin Fastback Mustang", price: "$79/day", image: "🏎️" },
    { name: "Maserati Berlinetta Convertible", price: "$89/day", image: "🚗" },
    { name: "Aurotech GX Maliable Motives", price: "$99/day", image: "🚙" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-6">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-zinc-500 tracking-wide">
        HOME / CARS / CARS DETAIL
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <h1 className="text-6xl font-bold tracking-tight">Car Details</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Images */}
          <div>
            <div className="rounded-md mb-6 shadow-sm">
              <img
                src="/cars/cardetail1.jpg"
                alt="Vanguard GX2"
                className="w-full rounded-md object-contain bg-gray-50"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="relative flex gap-8">
              <div className="w-50 h-40 rounded-md overflow-hidden cursor-pointer hover:border-2 hover:border-gray-300 shadow-sm">
                <img
                  src="/cars/cardetail1.jpg"
                  className="w-full h-full object-cover bg-gray-50"
                />
              </div>
              <div className="w-50 h-40 rounded-md overflow-hidden cursor-pointer hover:border-2 hover:border-gray-300 shadow-sm">
                <img
                  src="/cars/cardetail1.jpg"
                  className="w-full h-full object-cover bg-gray-50"
                />
              </div>
              <div className="w-50 h-40 rounded-md overflow-hidden cursor-pointer hover:border-2 hover:border-gray-300 shadow-sm">
                <img
                  src="/cars/cardetail1.jpg"
                  className="w-full h-full object-cover bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            <h2 className="text-5xl font-bold mb-3 leading-tight">
              Vanguard GX2
              <br />
              Convertible
            </h2>

            <div className="mb-6">
              <div className="text-xs text-zinc-500 mb-1 tracking-wider font-medium">
                STARTING AT
              </div>
              <div className="text-4xl font-bold text-zinc-900">
                $59
                <span className="text-2xl font-normal text-zinc-600">/day</span>
              </div>
            </div>

            <p className="text-zinc-600 mb-8 leading-relaxed text-[15px]">
              The Vanguard GX2 is an exceptional Machine Dealership, this car
              offers unparalleled performance and comfort that the stand's your
              hire car experience this premier, stylish and classic idea of this
              vehicle. I'm declaution To stay with You on a Journey...
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-10">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border-2 border-zinc-300 flex items-center justify-center hover:border-zinc-400 transition"
              >
                <FaMinus className="w-3.5 h-3.5 text-zinc-600" />
              </button>
              <span className="text-xl font-semibold w-10 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border-2 border-zinc-300 flex items-center justify-center hover:border-zinc-400 transition"
              >
                <FaPlus className="w-3.5 h-3.5 text-zinc-600" />
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-7 py-2.5 rounded-full font-semibold ml-2 transition shadow-md text-sm">
                Rental Now
              </button>
            </div>

            {/* Specifications */}
            <div className="mb-10">
              <h3 className="text-xs font-bold mb-5 tracking-wider text-zinc-700">
                SPECIFICATIONS
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                    <FaSync className="text-red-500 text-sm" />
                  </div>
                  <span className="text-sm text-zinc-700">Convertible</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                    <FaCog className="text-red-500 text-sm" />
                  </div>
                  <span className="text-sm text-zinc-700">Automatic</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                    <FaBolt className="text-red-500 text-sm" />
                  </div>
                  <span className="text-sm text-zinc-700">5.0L Flex Fit</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                    <FaUsers className="text-red-500 text-sm" />
                  </div>
                  <span className="text-sm text-zinc-700">4 passengers</span>
                </div>
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
              </div>
            </div>
          </div>
        </div>

        {/* Car Features */}
        <div className="mt-24 pt-8 border-t border-zinc-200">
          <h2 className="text-4xl font-bold mb-12">Car Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10">
            <div>
              <h3 className="font-bold mb-3 text-sm tracking-wide">
                CONVERTIBLE TOP
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">
                Enjoy the open air experience with an easy power retractable
                fabric top.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-sm tracking-wide">
                SPORT MODE
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">
                Unleash the full power of the V8 engine for an exhilarating
                drive.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-sm tracking-wide">
                INFOTAINMENT SYSTEM
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">
                Stay connected with Integrated Satellite Navigation and Radio.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-sm tracking-wide">
                ADVANCED SAFETY
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">
                Benefit from modern safety features, including ABS brakes and
                airbags.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-sm tracking-wide">
                LEATHER INTERIOR
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">
                Experience premium comfort with leather-trimmed seats and
                finishes.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-sm tracking-wide">
                ICONIC DESIGN
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">
                Turn heads with the timeless, bold styling of the Ford Mustang.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">You may also like</h2>
            <div className="flex gap-2">
              <button className="w-11 h-11 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition shadow-sm">
                <FaChevronLeft className="w-4 h-4 text-zinc-600" />
              </button>
              <button className="w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition shadow-md">
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {similarCars.map((car, index) => (
              <div
                key={index}
                className={`rounded-3xl p-6 ${
                  car.featured
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-zinc-50 shadow-sm"
                } transition hover:shadow-xl`}
              >
                <div className="text-7xl mb-5 h-24 flex items-center justify-center">
                  {car.image}
                </div>
                <h3
                  className={`font-bold text-sm mb-2 leading-tight ${
                    car.featured ? "text-white" : "text-zinc-900"
                  }`}
                >
                  {car.name}
                </h3>
                <p
                  className={`text-sm font-semibold ${
                    car.featured ? "text-white/90" : "text-zinc-600"
                  }`}
                >
                  {car.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-24 bg-zinc-950 rounded-[2.5rem] p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-4 leading-tight">
              Book Your Adventure
            </h2>
            <p className="text-xl mb-10 text-zinc-300 leading-relaxed">
              Today and Feel the Power
              <br />
              of the Open Road.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg text-sm tracking-wide">
              GET STARTED WITH US
            </button>
          </div>
          <div className="absolute right-10 bottom-0 opacity-10 text-[180px]">
            🚗
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
