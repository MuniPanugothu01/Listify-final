import { FaStar } from "react-icons/fa";
import { MdLocationOn, MdVerified } from "react-icons/md";

const services = [
  {
    id: 1,
    title: "Plumber",
    area: "Whitefield",
    rating: 4.9,
    reviews: 128,
    price: "₹299",
    availability: {
      isToday: true,
      nextAvailable: null,
    },
    isVerified: true,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    id: 2,
    title: "House Cleaning",
    area: "Indiranagar",
    rating: 4.8,
    reviews: 94,
    price: "₹399",
    availability: {
      isToday: false,
      nextAvailable: "Tomorrow",
    },
    isVerified: true,
    image: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f",
  },
  {
    id: 3,
    title: "AC Repair",
    area: "Koramangala",
    rating: 4.9,
    reviews: 156,
    price: "₹499",
    availability: {
      isToday: false,
      nextAvailable: "Mon, 22 Apr",
    },
    isVerified: true,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
  },
];

export default function PopularNearbyServices() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* LEFT */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Popular Services Near You
            </h2>

            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <MdLocationOn className="text-[#27bb97]" />
              Based on{" "}
              <span className="font-medium text-[#27bb97]">Bangalore</span>
            </div>
          </div>

          {/* RIGHT */}
          <button className="text-sm font-semibold text-[#27bb97] hover:underline self-start sm:self-auto cursor-pointer">
            View all nearby services →
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl 
                         transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover 
                             group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                {/* TITLE + VERIFIED */}
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className="text-xl font-semibold text-gray-900
                                 group-hover:text-[#27bb97] transition-colors duration-300"
                  >
                    {service.title}
                  </h3>
                  {service.isVerified && (
                    <MdVerified
                      className="text-emerald-500"
                      size={20}
                      title="Verified professional"
                    />
                  )}
                </div>

                {/* LOCATION */}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MdLocationOn className="text-gray-400" size={16} />
                  <span className="text-sm">{service.area}, Bangalore</span>
                </div>

                {/* RATING */}
                <div className="flex items-center gap-2 mb-6">
                  <div
                    className="flex items-center gap-1.5 bg-emerald-50 
                                  text-emerald-700 px-3 py-1 rounded-full"
                  >
                    <FaStar className="text-emerald-500" size={14} />
                    <span className="text-sm font-semibold">
                      {service.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({service.reviews} reviews)
                  </span>
                </div>

                {/* FOOTER */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  {/* AVAILABILITY */}
                  <div className="flex items-center gap-2">
                    {service.availability.isToday ? (
                      <>
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-medium text-emerald-700">
                          Available today
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">
                            Next available
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {service.availability.nextAvailable}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* PRICE */}
                  <div className="text-right">
                    <span className="text-xs text-gray-500">Starting from</span>
                    <div className="text-lg font-bold text-gray-900">
                      {service.price}
                      <span className="text-sm font-normal text-gray-500">
                        /service
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
