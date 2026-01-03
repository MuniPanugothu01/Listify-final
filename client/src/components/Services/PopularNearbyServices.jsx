import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const services = [
  {
    title: "Plumber",
    area: "Whitefield",
    rating: "4.9",
    price: "₹299",
    available: true,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    title: "House Cleaning",
    area: "Indiranagar",
    rating: "4.8",
    price: "₹399",
    available: true,
    image:
      "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f",
  },
  {
    title: "AC Repair",
    area: "Koramangala",
    rating: "4.9",
    price: "₹499",
    available: false,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
  },
];

export default function PopularNearbyServices() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Popular Services Near You
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <MdLocationOn className="text-[#27bb97]" />
            Based on <span className="font-medium">Bangalore</span>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <button
              key={index}
              className="group bg-white border border-gray-100 rounded-2xl
                         overflow-hidden shadow-sm hover:shadow-xl
                         transition-all duration-300 text-left"
            >
              {/* IMAGE */}
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover
                             group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                {/* TITLE */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {service.title}
                </h3>

                {/* LOCATION */}
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <MdLocationOn className="text-[#27bb97]" />
                  {service.area}
                </div>

                {/* RATING + PRICE */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    {service.rating}
                  </span>

                  <span>
                    From <span className="font-semibold">{service.price}</span>
                  </span>
                </div>

                {/* AVAILABILITY */}
                {service.available && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Available today
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="mt-10">
          <button className="text-sm font-semibold text-[#27bb97] hover:underline">
            View all nearby services →
          </button>
        </div>

      </div>
    </section>
  );
}
