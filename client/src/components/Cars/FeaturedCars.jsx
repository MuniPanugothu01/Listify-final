import React from "react";
import { Link } from "react-router-dom";
import { Heart, Image, Star, Fuel, Settings } from "lucide-react";
import { CiStar } from "react-icons/ci";

const FeaturedCars = () => {
  const cars = [
    {
      id: 1,
      name: "BMW 8-series 2-door coupe",
      price: "$62,000",
      year: "2021",
      transmission: "Automatic",
      fuel: "Petrol",
      drive: "Front Wheel Drive",
      images: 7,
      image: "/cars/bmwshowroom.jpg",
      featured: true,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Chevrolet Camaro 2-door convertible",
      price: "$40,000",
      year: "2021",
      transmission: "Automatic",
      fuel: "Diesel",
      images: 7,
      image: "/cars/chevroletcamaro.jpg",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Ferrari LaFerrari 2-door coupe",
      price: "$810,000",
      year: "2021",
      transmission: "Automatic",
      fuel: "Petrol",
      images: 7,
      image: "/cars/ferrarile.jpg",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Audi A8 4-door sedan",
      price: "$70,000",
      year: "2021",
      transmission: "Automatic",
      fuel: "Diesel",
      images: 7,
      image: "cars/audishooting.jpg",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Mercedes-Benz S-class 2-door coupe",
      price: "$76,000",
      year: "2021",
      transmission: "Automatic",
      fuel: "Diesel",
      images: 7,
      image: "/cars/mercedesbenz.jpg",
      rating: 4.6,
    },
  ];

  return (
    <div className="max-w-9xl min-h-screen mx-auto -mt-25 p-4 md:p-7">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        {/* Left: title */}
        <div>
          <h1 className="text-gray-900 text-3xl md:text-4xl capitalize font-bold mb-2">
            Featured Cars Listings
          </h1>
          <p className="text-gray-600 text-lg">
            Discover premium vehicles from top brands
          </p>
        </div>

        {/* Right: buttons */}
        <div className="flex gap-3">
          <button className="px-6 md:px-10 py-3 text-[#105d49] border border-[#0e7259] rounded-lg capitalize cursor-pointer transition-all bg-[#c0f9ea] hover:bg-[#a8f0dd] hover:shadow-md font-medium">
            New Arrivals
          </button>
          <button className="px-6 md:px-10 py-3 text-gray-700 border border-gray-300 bg-white rounded-lg capitalize cursor-pointer transition-all hover:bg-gray-50 hover:shadow-md font-medium">
            Used Cars
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
    <Link to="/car-details">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Featured Car - Left 50% */}
        <div className="lg:w-1/2 h-full">
          <div className="relative h-full rounded-2xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex">
              {/* Heart Icon */}
              <button className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                <CiStar className="w-5 h-5 text-white" />
              </button>

              {/* Image Count */}
              <div className="absolute top-3 right-4 z-20 px-3 py-2 rounded-full bg-black/30 backdrop-blur-sm flex items-center gap-1">
                <Image className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">
                  {cars[0].images} photos
                </span>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative h-[575px]">
              <img
                src={cars[0].image}
                loading="lazy"
                alt={cars[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Car Info - Overlay on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white text-xl md:text-2xl font-bold">
                    {cars[0].name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#27bb97] to-[#1fa987] text-white text-sm font-medium rounded">
                      {cars[0].year}
                    </span>
                    <span className="text-white/80 text-sm bg-white/10 px-3 py-1 rounded">
                      {cars[0].transmission}
                    </span>
                    <span className="text-white/80 text-sm bg-white/10 px-3 py-1 rounded">
                      {cars[0].fuel}
                    </span>
                    <span className="text-white/80 text-sm bg-white/10 px-3 py-1 rounded">
                      {cars[0].drive}
                    </span>
                  </div>
                  {/* <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> */}
                  {/* <span className="text-white/80 text-sm">Available Now</span> */}
                </div>
                <span className="text-white text-2xl md:text-3xl font-bold">
                  {cars[0].price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 50% - Grid of 4 Cars with Same Overlay Design */}
        <div className="lg:w-1/2 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {cars.slice(1, 5).map((car) => (
              <div
                key={car.id}
                className="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[280px]"
              >
                {/* Background Image */}
                <img
                  src={car.image}
                  loading="lazy"
                  alt={car.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                <div className="flex ">
                  {/* Heart Icon */}
                  <button className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                    <CiStar className="w-4 h-4 text-white" />
                  </button>

                  {/* Image Count */}
                  <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm flex items-center gap-1">
                    <Image className="w-3 h-3 text-white" />
                    <span className="text-white text-xs">{car.images}</span>
                  </div>
                </div>

                {/* Rating */}
                {/* <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-1 bg-black/30 backdrop-blur-sm rounded">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-medium">
                    {car.rating}
                  </span>
                </div> */}

                {/* Car Info - Overlay on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Car Name */}
                  <h3 className="text-white font-semibold text-lg mb-3 line-clamp-1">
                    {car.name}
                  </h3>

                  {/* Car Specs */}

                  {/* Price and Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 bg-gradient-to-r from-[#27bb97]/80 to-[#1fa987]/80 text-white text-xs font-medium rounded">
                          {car.year}
                        </span>
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded">
                          <Settings className="w-3 h-3" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded">
                          <Fuel className="w-3 h-3" />
                          <span>{car.fuel}</span>
                        </div>
                      </div>
                      {/* <div className="w-2 h-2 bg-green-400 rounded-full"></div> */}
                      {/* <span className="text-white/80 text-sm">In Stock</span> */}
                    </div>
                    <span className="text-white text-xl font-bold">
                      {car.price}
                    </span>
                  </div>
                </div>

                {/* Hover View Button */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#27bb97]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-5 py-2 bg-gradient-to-r from-[#27bb97] to-[#1fa987] text-white font-medium text-sm rounded-full shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>

      {/* View All Button */}
      <div className="text-center mt-16">
        <Link to="/car-listings">
          <button
            className="px-8 py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg
                        hover:bg-[#27bb97] hover:text-white transition-all duration-300
                        hover:shadow-lg capitalize cursor-pointer"
          >
            View All cars →
          </button>
        </Link>
      </div>

    </div>
  );
};

export default FeaturedCars;
