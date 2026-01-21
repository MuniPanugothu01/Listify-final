import React from "react";
import { Link } from "react-router-dom";
const locationIcon = "https://cdn-icons-png.flaticon.com/512/535/535239.png";
const homeIcon = "https://cdn-icons-png.flaticon.com/512/619/619032.png";

const areas = [
  {
    name: "Manhattan",
    homes: 1240,
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Brooklyn",
    homes: 980,
    image:
      "https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/istock-000018148947-small-5f67bc0947748894ccf340f34516c078.jpg",
  },
  {
    name: "Queens",
    homes: 756,
    image:
      "https://qns.com/wp-content/uploads/2016/07/Glendale-by-Anthony-Giudice-1.jpg?quality=51",
  },
  {
    name: "Bronx",
    homes: 612,
    image:
      "https://www.nyc.gov/assets/hpd/images/content/pr/2019/11-22-19-lambert-houses-988-rc.JPG",
  },
  {
    name: "Jersey City",
    homes: 388,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-c/1280x250/14/10/2e/db/jersey-city.jpg",
  },
  {
    name: "Staten Island",
    homes: 204,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60",
  },
];

export default function RentalsByArea() {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Rentals by Area — New York
          </h2>
          <p className="text-gray-600 mt-2">
            Explore the most popular neighborhoods with verified rental
            listings.
          </p>
        </div>

        {/* Cards Grid - Now 3 columns on large screens */}
       <Link to="/rentals-listings">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {areas.map((area, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              {/* LEFT IMAGE */}
              <div className="w-full md:w-40 h-40 md:h-auto flex-shrink-0">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                />
              </div>

              {/* RIGHT TEXT */}
              <div className="p-5 flex flex-col justify-center flex-grow">
                {/* Title with hover color */}
                <div className="flex items-center gap-2 group">
                  <img
                    src={locationIcon}
                    alt="location"
                    className="
      w-4 h-4 opacity-70
      transition-transform duration-300 ease-in-out
      group-hover:scale-110
    "
                  />

                  <h3
                    className="
      text-xl font-semibold text-gray-900
      transition-colors duration-300 ease-in-out
      group-hover:text-[#27bb97]
    "
                  >
                    {area.name}
                  </h3>
                </div>

                {/* Homes count */}
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={homeIcon}
                    alt="homes"
                    className="w-4 h-4 opacity-70"
                  />
                  <p className="text-gray-500">
                    {area.homes.toLocaleString()} homes available
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-3">
                  Explore rental properties in {area.name} with verified
                  listings and virtual tours.
                </p>

                {/* View Rentals Button */}
                <div className="mt-4 text-blue-600 font-medium flex items-center gap-1">
                  <span className="group-hover:underline">View Rentals</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
       </Link>


        {/* Additional text section moved to right side */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-500 mb-4 md:mb-0 md:text-left">
            <p className="font-medium text-gray-700">
              All neighborhoods are updated in real-time.
            </p>
            <p className="text-sm mt-1">
              Average prices based on last 30 days of data.
            </p>
          </div>

          <div className="text-right">
            <button className="px-6 py-2 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] transition-colors cursor-pointer font-medium">
              View All Areas →
            </button>
            <p className="text-xs text-gray-500 mt-2">
              24/7 customer support available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
