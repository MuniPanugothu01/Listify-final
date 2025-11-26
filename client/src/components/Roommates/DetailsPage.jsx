import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Search,
} from "lucide-react";
import RoommateSubNav from "./RoommateSubNav";
// react-icons
import { FaArrowRight } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { MdOutlineSportsHockey } from "react-icons/md";
// react-icons Utilities
import { FaHandHoldingWater } from "react-icons/fa";
import { FcWiFiLogo } from "react-icons/fc";
import { HiOutlineTv } from "react-icons/hi2";
import { FcElectricity } from "react-icons/fc";
import { LuHeater } from "react-icons/lu";
import { TbAirConditioning } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { BiSolidWasher } from "react-icons/bi";
import { PiHairDryer } from "react-icons/pi";
import { GiKitchenScale } from "react-icons/gi";
import { LuMicrowave } from "react-icons/lu";
import { GiInnerSelf } from "react-icons/gi";
import { MdSmokeFree } from "react-icons/md";

const DetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Map");
  const [shirtSize, setShirtSize] = useState("");
  const [pantSize, setPantSize] = useState("");
  const [rentalPeriod, setRentalPeriod] = useState("4DAY");
  const [deliveryDate, setDeliveryDate] = useState("");

  const images = [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop",
  ];

  const apartments = [
    {
      id: 1,
      name: "Birchview Gardens",
      location: "Piscataway, NJ, US, 8854",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
      price: "$1,200"
    },
    {
      id: 2,
      name: "Riverside Apartments",
      location: "New York, NY, US, 10001",
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=300&h=200&fit=crop",
      price: "$1,500"
    },
    {
      id: 3,
      name: "Central Park Residences",
      location: "Manhattan, NY, US, 10022",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&h=200&fit=crop",
      price: "$1,800"
    },
    {
      id: 4,
      name: "Harbor View Lofts",
      location: "Brooklyn, NY, US, 11201",
      image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?w=300&h=200&fit=crop",
      price: "$1,350"
    },
    {
      id: 5,
      name: "Metro Heights",
      location: "Queens, NY, US, 11355",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
      price: "$1,100"
    },
    {
      id: 6,
      name: "Garden District",
      location: "Jersey City, NJ, US, 07302",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=300&h=200&fit=crop",
      price: "$1,400"
    },
    {
      id: 7,
      name: "University Commons",
      location: "Boston, MA, US, 02134",
      image: "https://images.unsplash.com/photo-1558036117-15e82a2f9e10?w=300&h=200&fit=crop",
      price: "$1,250"
    },
    {
      id: 8,
      name: "Downtown Plaza",
      location: "Chicago, IL, US, 60601",
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=300&h=200&fit=crop",
      price: "$1,600"
    }
  ];

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const tabs = ["Map", "Transportation", "Neighbourhood", "Hospitals"];

  return (
    <div className="min-h-screen bg-white">
      <RoommateSubNav />

      {/* Header */}
      <header className=" border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <a
              href="#"
              className="hover:text-gray-900 text-gray-800 font-semibold"
            >
              Indian Roommates
            </a>
            <FaArrowRight />
            <a
              href="#"
              className="hover:text-gray-900 text-gray-800 font-semibold"
            >
              Roommates in New York
            </a>
            <FaArrowRight />
            <a
              href="#"
              className="hover:text-gray-900 text-gray-800 font-semibold"
            >
              Roommates in New York Metro Area
            </a>
            <FaArrowRight />
            <a
              href="#"
              className="hover:text-gray-900 text-gray-800 font-semibold"
            >
              Roommates in New York
            </a>
            <FaArrowRight />
            <span className="text-gray-500">
              Double Sharing/Couples Wanted For Luxury Home,1 Minute Walk
              From/To Journal Square PATH Train Station To Go To Manhattan
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <FaShareAlt className="w-5 h-5 text-gray-700 cursor-pointer" />
            <Heart className="w-5 h-5 text-gray-700 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-28 border-1 cursor-pointer overflow-hidden ${
                    selectedImage === idx
                      ? "border-gray-800"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative bg-gray-100 h-[83vh]">
              <img
                src={images[selectedImage]}
                alt="Listing Image"
                className="w-full h-full object-cover"
              />

              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="font-bold  text-[40px] uppercase">
              Double Sharing/Couples Wanted For Luxury Home
            </h1>

            {/* Description + Price */}
            <div className="w-full">
              <div className="flex justify-between items-center w-full">
                <p className="font-semibold">Description:</p>
              </div>

              <p className="text-gray-700 mt-2 w-full">
                This is a sample detailed description of the listing. You can
                add multiple lines here and it will take the full width below
                the title and price. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Consequatur aliquam officiis culpa rerum eius,
                cum non recusandae animi? Odio, numquam?
              </p>
            </div>

            {/* ⭐ Location added here correctly */}
            <div className="flex items-center justify-between w-full">
              <div className="w-full">
                <p className="font-semibold">Location:</p>
                <p className="text-gray-700 mt-1">
                  123 Example Street, New York, NY 10001
                </p>
              </div>

              <p className="text-[30px] font-bold text-green-600">$1200/mon</p>
            </div>

            {/* features  */}
            <div className="my-5 grid grid-cols-3 gap-5">
              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-400 text-[16px] capitalize">
                    Ad Type
                  </p>
                  <button className="text-[20px] text-blue-600 hover:text-black cursor-pointer capitalize">
                    Room Offered
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-400 text-[16px] capitalize">Room</p>
                  <button className="text-[20px] capitalize cursor-pointer text-blue-600 hover:text-black">
                    Shared Room
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-400 text-[16px] capitalize">
                    Preffered Gender
                  </p>
                  <p className="text-gray-800 text-[20px] capitalize">
                    male/female
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-400 text-[16px] capitalize">
                    available from
                  </p>
                  <p className="text-gray-800 text-[20px] capitalize">
                    21 nov 2025
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-400 text-[16px] capitalize">
                    open house
                  </p>
                  <p className="text-gray-800 text-[20px] capitalize ">
                    21 Nov 2025{" "}
                    <span className="text-gray-600 text-[12px]">
                      (8AM to 10PM)
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-400 text-[16px] capitalize">
                    bathroom type
                  </p>
                  <p className="text-gray-800 text-[20px] capitalize">
                    shared bath
                  </p>
                </div>
              </div>
            </div>

            {/* Posted Info + Icons (Professional Horizontal Line) */}
            <div className="flex items-center justify-between w-full mt-4">
              {/* Left Side: Posted Info */}
              <div className="flex items-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <p className="text-gray-400 text-[16px] capitalize">
                    Posted on:
                  </p>
                  <p className="text-gray-800 text-[18px] font-medium capitalize">
                    21 Nov 2025
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-400 text-[16px] capitalize">Ad ID:</p>
                  <p className="text-gray-800 text-[18px] font-medium">
                    1731814
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-400 text-[16px] capitalize">
                    Posted by:
                  </p>
                  <p className="text-gray-800 text-[18px] font-medium capitalize">
                    Agent
                  </p>
                </div>
              </div>

              {/* Right Side: Share + Like Icons */}
              <div className="flex items-center gap-4">
                <button className="w-[25vh] bg-[#27bb97] cursor-pointer h-[7vh] border rounded-2xl text-white capitalize hover:bg-[#23bc85]">
                  {" "}
                  contact by agent
                </button>
              </div>
            </div>

            {/* utilis section */}
            <div className=" uppercase">
              <p className="font-semibold">Utilities:</p>

              <div className="w-full bg-gray-400 h-[1px] my-3" />

              <div className="w-full  grid grid-cols-3 gap-5 mt-2 mb-3 ">
                <div className="flex items-center gap-2">
                  <FaHandHoldingWater />
                  <h1 className="text-gray-600 capitalize">Water</h1>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <FcWiFiLogo />
                  <h1 className="text-gray-600 capitalize">Wi-Fi</h1>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <HiOutlineTv />
                  <h1 className="text-gray-600 capitalize">TV/cable</h1>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <FcElectricity />
                  <h1 className="text-gray-600 capitalize">Electricity</h1>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <LuHeater />
                  <h1 className="text-gray-600 capitalize">Room Heater</h1>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <TbAirConditioning />
                  <h1 className="text-gray-600 capitalize">Air Conditioner</h1>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <CgSmartHomeRefrigerator />
                  <h1 className="text-gray-600 capitalize">Refrigerator</h1>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <BiSolidWasher />
                  <h1 className="text-gray-600 capitalize">Washer</h1>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <PiHairDryer />
                  <h1 className="text-gray-600 capitalize">Dryer</h1>
                </div>

                <div className="flex items-center gap-2 capitalize">
                  <GiKitchenScale />
                  <h1 className="text-gray-600 capitalize">Kitchen</h1>
                </div>

                <div className="flex items-center gap-2 capitalize">
                  <LuMicrowave />
                  <h1 className="text-gray-600 capitalize">Microwave</h1>
                </div>

                <div className="flex items-center gap-2 capitalize">
                  <GiInnerSelf />
                  <h1 className="text-gray-600 capitalize">Self Catering</h1>
                </div>
              </div>
            </div>

            {/* Additional information */}
            <div className=" ">
              <p className="font-semibold uppercase ">
                Additional information:
              </p>
              <div className="w-full bg-gray-400 h-[1px] my-3" />
              {/* Divider line */}
              <div className="w-full  grid grid-cols-3 gap-5 mt-2 mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src="/smoking1.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />

                  <h1 className="text-gray-600 capitalize">
                    Smoke Out Side Only
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/nonveg2.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">Veg/Non-Veg</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/nopets.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">No Pets</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/fullyfurnitured.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">Fully Furnished</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">Water</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/studentfriendly.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">Student Friendly</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">Water</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">Water</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">Water</h1>
                </div>
              </div>
            </div>

            {/* House Rules */}
            <div className=" ">
              <p className="font-semibold uppercase ">House Rules:</p>
              <div className="w-full bg-gray-400 h-[1px] my-3" />
              {/* Divider line */}
              <div className="w-full  grid grid-cols-3 gap-5 mt-2 mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src="/noparties2.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />

                  <h1 className="text-gray-600 capitalize">No parties</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/quest.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">Guests Allowed</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/nopets.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">
                    visitors not allowed
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/nosound.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">no loud music</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/kitchen.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">
                    kitchen usage allowed
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/cookingallowed.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">cooking allowed</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/noalcohol.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">
                    alcohol allowed / not allowed
                  </h1>
                </div>
              </div>
            </div>

            <div className=" ">
              <p className="font-semibold uppercase ">Roommate Preferences:</p>
              <div className="w-full bg-gray-400 h-[1px] my-3" />
              {/* Divider line */}
              <div className="w-full  grid grid-cols-2 gap-5 mt-2 mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src="/noparties2.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />

                  <h1 className="text-gray-600 capitalize">
                    Don't mind / no Preferences
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/quest.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="text-gray-600 capitalize">18 to 19(Any)</h1>
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-400 h-[1px] my-3" />

            {/* Contact button + text side by side */}
            <div className="flex justify-center items-center">
              <div className="flex flex-row items-center gap-4">
                <p className="font-semibold">Want to rent this room</p>

                <button className="bg-red-500 h-[8vh] w-[25vh] font-medium border rounded-2xl text-white cursor-pointer hover:bg-red-600">
                  Contact property
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ Neighborhood Info Section - Full width below both columns */}
        <div className="mt-10 w-full">

          {/* Tabs */}
          <div className="border rounded-xl shadow-sm bg-white">
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="p-6 min-h-[300px]">
              {activeTab === "Map" && (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
                  <p className="text-gray-500 mb-4">Interactive Map View</p>
                  <div className="w-full h-48 bg-blue-50 border border-blue-200 rounded flex items-center justify-center">
                    <span className="text-blue-400">Map will be displayed here</span>
                  </div>
                </div>
              )}
              {activeTab === "Transportation" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Public Transportation</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>🚇 Journal Square PATH Station - 1 min walk</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>🚌 Bus Stop (Line 85) - 3 min walk</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>🚕 Taxi Stand - 2 min walk</span>
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "Neighbourhood" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Neighbourhood Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">🛒</span>
                      <span>Supermarket - 5 min walk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">🏥</span>
                      <span>Medical Center - 10 min walk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">🍽️</span>
                      <span>Restaurants - 2 min walk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-500">🏪</span>
                      <span>Convenience Store - 1 min walk</span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "Hospitals" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Nearby Medical Facilities</h3>
                  <ul className="space-y-3">
                    <li className="p-3 border rounded-lg">
                      <h4 className="font-medium">City General Hospital</h4>
                      <p className="text-sm text-gray-600">1.2 miles • 24/7 Emergency</p>
                    </li>
                    <li className="p-3 border rounded-lg">
                      <h4 className="font-medium">Community Health Center</h4>
                      <p className="text-sm text-gray-600">0.8 miles • Primary Care</p>
                    </li>
                    <li className="p-3 border rounded-lg">
                      <h4 className="font-medium">Urgent Care Clinic</h4>
                      <p className="text-sm text-gray-600">0.5 miles • Walk-ins Welcome</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Explore Apartments Section - Full width */}
          <div className="mt-6 p-5 bg-white border rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[20px]">
                Explore Apartments in and around US
              </h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {apartments.map((apartment) => (
                <div key={apartment.id} className="border rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer group">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={apartment.image}
                      alt={apartment.name}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-semibold text-green-600">
                      {apartment.price}
                    </div>
                  </div>
                  <p className="font-semibold mt-3 text-lg">{apartment.name}</p>
                  <p className="text-blue-600 text-sm flex items-center gap-1 mt-1">
                    <span>📍</span> {apartment.location}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500 text-sm">⭐ 4.5</span>
                    <span className="text-gray-500 text-sm">2 Beds • 1 Bath</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;