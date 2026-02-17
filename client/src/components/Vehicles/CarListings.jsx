import React from "react";
import { Link } from "react-router-dom";
import { Heart, Navigation, Fuel, Gauge, Settings } from "lucide-react";
// react icons
import { GoArrowUpRight } from "react-icons/go";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

export default function CarListings() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-25">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          The Most Searched Cars in{" "}
          <span className="text-[#27bb97]">New York</span> !
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-12">
          <button className="text-blue-600 font-semibold pb-2 border-b-2 border-blue-600">
            In Stock
          </button>
          <button className="text-gray-500 font-semibold pb-2">Sedan</button>
          <button className="text-gray-500 font-semibold pb-2">SUV</button>
          <button className="text-gray-500 font-semibold pb-2">
            Convertible
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-end gap-4 -mt-12">
          <button
            className="w-10 h-10 rounded-lg
      bg-[#27bb97] text-white
      shadow-md flex items-center justify-center
      transition-all duration-300 ease-out
      hover:bg-[#1fa987] hover:shadow-lg hover:-translate-y-0.5
      active:scale-95"
          >
            <FaAngleLeft />
          </button>

          <button
            className="w-10 h-10 rounded-lg
      bg-[#27bb97] text-white
      shadow-md flex items-center justify-center
      transition-all duration-300 ease-out
      hover:bg-[#1fa987] hover:shadow-lg hover:-translate-y-0.5
      active:scale-95"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Car Cards Grid */}
       <Link to="/car-details">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {/* Card 1 - Toyota Camry */}
          <div
            className="group bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer
    transition-all duration-500 ease-out
    hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop"
                alt="Toyota Camry"
                loading="lazy"
                className="w-full h-48 object-cover
          transition-transform duration-500 ease-out
          group-hover:scale-105"
              />

              <button className="absolute top-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Great Price
              </button>

              <button className="absolute top-4 right-4 bg-white p-2 rounded-full">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="bg-slate-900 text-white p-5">
              <h3 className="text-lg font-bold mb-1">Toyota Camry New</h3>
              <p className="text-xs text-gray-400 mb-4">
                3.5 D5 PowerPulse Momentum 5dr AWD...
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="items-center gap-1">
                  <IoSpeedometerOutline className="w-4 h-4" />
                  <span className="text-xs">20 Miles</span>
                </div>
                <div className="items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  <span className="text-xs">Petrol</span>
                </div>
                <div className="items-center gap-1">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">Automatic</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$40,000</span>
                <button className="text-sm text-gray-400 flex items-center gap-1 cursor-pointer hover:text-white hover:underline">
                  View Details <GoArrowUpRight />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 - T-Cross */}
          <div
            className="group bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer
    transition-all duration-500 ease-out
    hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=250&fit=crop"
                alt="T-Cross"
                loading="lazy"
                className="w-full h-48 object-cover
          transition-transform duration-500 ease-out
          group-hover:scale-105"
              />

              <button className="absolute top-4 right-4 bg-white p-2 rounded-full">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="bg-slate-900 text-white p-5">
              <h3 className="text-lg font-bold mb-1">T-Cross - 2023</h3>
              <p className="text-xs text-gray-400 mb-4">
                4.0 D5 PowerPulse Momentum 5dr AWD...
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="items-center gap-1">
                  <IoSpeedometerOutline className="w-4 h-4" />
                  <span className="text-xs">10 Miles</span>
                </div>
                <div className="items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  <span className="text-xs">Petrol</span>
                </div>
                <div className="items-center gap-1">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">CVT</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$15,000</span>
                <button className="text-sm text-gray-400 flex items-center gap-1 cursor-pointer hover:text-white hover:underline">
                  View Details <GoArrowUpRight />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - C-Class */}
          <div
            className="group bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer
    transition-all duration-500 ease-out
    hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=250&fit=crop"
                alt="C-Class"
                loading="lazy"
                className="w-full h-48 object-cover
          transition-transform duration-500 ease-out
          group-hover:scale-105"
              />

              <button className="absolute top-4 right-4 bg-white p-2 rounded-full">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="bg-slate-900 text-white p-5">
              <h3 className="text-lg font-bold mb-1">C-Class - 2023</h3>
              <p className="text-xs text-gray-400 mb-4">
                4.0 D5 PowerPulse Momentum 5dr AWD...
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="items-center gap-1">
                  <IoSpeedometerOutline className="w-4 h-4" />
                  <span className="text-xs">10 Miles</span>
                </div>
                <div className="items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  <span className="text-xs">Petrol</span>
                </div>
                <div className="items-center gap-1">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">Automatic</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$150,000</span>
                <button className="text-sm text-gray-400 flex items-center gap-1 cursor-pointer hover:text-white hover:underline">
                  View Details <GoArrowUpRight />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4 - Ford Transit */}
          <div
            className="group bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer
    transition-all duration-500 ease-out
    hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop"
                alt="Ford Transit"
                loading="lazy"
                className="w-full h-48 object-cover
          transition-transform duration-500 ease-out
          group-hover:scale-105"
              />

              <button className="absolute top-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Great Price
              </button>

              <button className="absolute top-4 right-4 bg-white p-2 rounded-full">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="bg-slate-900 text-white p-5">
              <h3 className="text-lg font-bold mb-1">Ford Transit - 2021</h3>
              <p className="text-xs text-gray-400 mb-4">
                4.0 D5 PowerPulse Momentum 5dr AWD...
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="items-center gap-1">
                  <IoSpeedometerOutline className="w-4 h-4" />
                  <span className="text-xs">7500 Miles</span>
                </div>
                <div className="items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  <span className="text-xs">Diesel</span>
                </div>
                <div className="items-center gap-1">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">Manual</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$22,000</span>
                <button className="text-sm text-gray-400 flex items-center gap-1 cursor-pointer hover:text-white hover:underline">
                  View Details <GoArrowUpRight />
                </button>
              </div>
            </div>
          </div>

          
        </div>
       </Link>
      </div>
    </div>
  );
}
