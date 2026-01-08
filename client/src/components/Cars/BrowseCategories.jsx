import React from "react";
import { CiCirclePlus } from "react-icons/ci";

const BrowseCategories = () => {
  return (
    <div
      className="
        mt-12
        sm:mt-16
        md:mt-16
        lg:mt-24
        max-w-9xl
        mx-auto
        px-4
        py-16
      "
    >
      {/* Header */}
      <div className="text-center mb-10 relative sm:mt-6">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-[#27bb97]/10 to-[#1fa987]/10 rounded-full blur-2xl" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Browse{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27bb97] to-[#1fa987]">
            Car Brands
          </span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
          Discover premium vehicles from world's leading automotive
          manufacturers
        </p>

        <div className="mt-6 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-[#27bb97] to-[#1fa987] rounded-full" />
        </div>
      </div>

      {/* Cards */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-5
          lg:grid-cols-6
          xl:grid-cols-9
          gap-4
          lg:gap-0

          

          -mt-2
          sm:-mt-1
          md:-mt-2
          lg:mt-6

          justify-items-center
        "
      >
        {[
          { name: "BMW", img: "/cars/bmw.png" },
          { name: "Audi", img: "/cars/audi.png" },
          { name: "Toyota", img: "/cars/toyota.png" },
          { name: "Ferrari", img: "/cars/ferrari2.png" },
          { name: "Lamborghini", img: "/cars/lamborghini.png" },
          { name: "Suzuki", img: "/cars/suzuki.png" },
          { name: "Honda", img: "/cars/honda.png" },
          { name: "Ford", img: "/cars/ford.png" },
        ].map((brand) => (
          <div
            key={brand.name}
            className="
              border-2 border-dashed
              rounded-xl
              w-32 h-32
              flex flex-col items-center justify-center
              hover:border-[#1fa987]
              transition-all
            "
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="h-16 w-16 rounded-xl mb-2"
            />
            <h2 className="text-gray-600 text-sm uppercase font-semibold">
              {brand.name}
            </h2>
          </div>
        ))}

        {/* More button */}
        <div
          className="
            group
            border-2 border-dashed border-gray-300
            hover:border-[#1fa987]
            bg-gray-100
            rounded-xl
            w-32 h-32
            flex items-center justify-center
            cursor-pointer
            transition-all
            hover:-translate-y-1 hover:shadow-lg
          "
        >
          <div className="flex flex-col items-center">
            <CiCirclePlus
              size={34}
              className="text-[#27bb97] group-hover:rotate-90 transition"
            />
            <span className="mt-1 text-[#27bb97] uppercase font-semibold text-sm">
              More
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCategories;
