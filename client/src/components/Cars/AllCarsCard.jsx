import React from "react";
import {
  ChevronRight,
  Users,
  Briefcase,
  DoorOpen,
  Wind,
  Droplets,
  Info,
} from "lucide-react";
// react icons
import { RiArrowRightWideLine } from "react-icons/ri";


const AllCarsCard = ({
  //   carImage = "/cars/toyota.webp",
  category = "SMALL",
  carName = "Toyota Yaris",
  carSubtitle = "Or similar group A car",
  price = "1,810.03",
  currency = "NZD",
  priceLabel = "Total Rental",
  seats = 4,
  bags = 2,
  doors = 5,
  transmission = "Manual",
  aircon = true,
  fuel = "Petrol",
  minimumAge = 21,
  onChoose = () => {},
  onDetails = () => {},
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Section - Car Image */}
        <div className=" relative bg-gray-50 ">
          <img
            src="/cars/toyota.webp"
            alt={carName}
            className="absloute w-150 h-80 object-cover"
          />
          {/* Arrow Button */}
          <button className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <RiArrowRightWideLine  className=" text-green-600" size={80}  />
          </button>
        </div>

        {/* Main container - should be flex for side-by-side layout */}
        <div className="flex flex-col md:flex-row">
          {/* Middle Section - Car Details */}
          <div className="p-6 md:w-2/5">
            {/* Category */}
            <div className="text-red-600 text-xs font-bold mb-2 tracking-wider">
              {category}
            </div>

            {/* Car Name */}
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{carName}</h3>

            {/* Subtitle with Info Icon */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-gray-600">{carSubtitle}</span>
              <Info className="w-4 h-4 text-gray-400" />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Seats */}
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-700">{seats} Seats</span>
              </div>

              {/* Bags */}
              <div className="flex items-center gap-4">
                <Briefcase className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-700">{bags} Bags</span>
              </div>

              {/* Doors */}
              <div className="flex items-center gap-4">
                <DoorOpen className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-700">{doors} Doors</span>
              </div>

              {/* Transmission */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span className="text-sm text-gray-700">{transmission}</span>
              </div>

              {/* Air Con */}
              <div className="flex items-center gap-4">
                <Wind className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-700">Air Con</span>
              </div>

              {/* Fuel */}
              <div className="flex items-center gap-4">
                <Droplets className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-700">{fuel}</span>
              </div>
            </div>

            {/* Minimum Age */}
            <div className="text-xs text-gray-500">
              Minimum age: {minimumAge}
            </div>
          </div>

          {/* Right Section - Price & Actions */}
          <div className="p-15">
            <div className="flex flex-col gap-4">
              {/* Price Section */}
              <div className="text-left">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {currency}
                  {price}
                </div>
                <div className="text-sm text-gray-600">{priceLabel}</div>
              </div>

              {/* Action Buttons - Stacked vertically */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={onChoose}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  CHOOSE
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={onDetails}
                  className="text-gray-600 hover:text-gray-800 font-medium text-sm flex items-center justify-center gap-1 transition-colors duration-200"
                >
                  DETAILS
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage with multiple cars
const AllCarsCardExample = () => {
  const cars = [
    {
      carImage: "/api/placeholder/400/300",
      category: "SMALL",
      carName: "Toyota Yaris",
      carSubtitle: "Or similar group A car",
      price: "1,810.03",
      currency: "NZD",
      seats: 4,
      bags: 2,
      doors: 5,
      transmission: "Manual",
      fuel: "Petrol",
      minimumAge: 21,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {cars.map((car, index) => (
          <AllCarsCard
            key={index}
            {...car}
            onChoose={() => console.log(`Chose ${car.carName}`)}
            onDetails={() => console.log(`View details for ${car.carName}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCarsCardExample;
