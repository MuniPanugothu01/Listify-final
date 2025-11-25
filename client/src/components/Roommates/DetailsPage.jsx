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

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
                  <p className="text-gray-300 text-[10px] ">Ad Type</p>
                  <p className="text-gray-800 text-[20px]">Room Offered</p>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-300 text-[10px] ">Ad Type</p>
                  <p className="text-gray-800 text-[20px]">Room Offered</p>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-300 text-[10px] ">Ad Type</p>
                  <p className="text-gray-800 text-[20px]">Room Offered</p>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-300 text-[10px] ">Ad Type</p>
                  <p className="text-gray-800 text-[20px]">Room Offered</p>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-300 text-[10px] ">Ad Type</p>
                  <p className="text-gray-800 text-[20px]">Room Offered</p>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <MdOutlineSportsHockey size={35} />
                <div>
                  <p className="text-gray-300 text-[10px] ">Ad Type</p>
                  <p className="text-gray-800 text-[20px]">Room Offered</p>
                </div>
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

            <div className=" ">
              <p className="font-semibold uppercase ">Roommate Preferences:</p>
              <div className="w-full bg-gray-400 h-[1px] my-3" />
              {/* Divider line */}
              <div className="w-full  grid grid-cols-3 gap-5 mt-2 mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src="/smoking1.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />

                  <h1 className="capitalize">Smoke Out Side Only</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/nonveg2.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="capitalize">Veg/Non-Veg</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/nopets.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="capitalize">No Pets</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/fullyfurnitured.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="capitalize">Fully Furnished</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="capitalize">Water</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/studentfriendly.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1>Student Friendly</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1>Water</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1>Water</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1>Water</h1>
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
                    src="/smoking1.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />

                  <h1 className="capitalize">Smoke Out Side Only</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/nonveg2.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="capitalize">Veg/Non-Veg</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/nopets.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="capitalize">No Pets</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/fullyfurnitured.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="capitalize">Fully Furnished</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1 className="capitalize">Water</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/studentfriendly.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1>Student Friendly</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1>Water</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1>Water</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/watertap.png"
                    alt="smoke icon"
                    className="w-6 h-6 object-contain"
                  />
                  <h1>Water</h1>
                </div>
              </div>
            </div>



          </div>
        </div>

        {/* Neighborhood Information */}

        <div>
          <p className="text-start">Neighborhood Information</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
