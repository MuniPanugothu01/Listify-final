import React from "react";

const exploreItems = [
  {
    title: "Single Rooms",
    image:
      "https://images.unsplash.com/photo-1600607688971-df72d9a59dea?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Shared Rooms",
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Rental Houses",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "PG / Paying Guest",
    image:
      "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=60",
  },
];

export default function ExploreNearYou() {
  return (
    <div className="w-full py-14 bg-white">
      <div className="max-w-6xl mx-auto px-5">

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Explore Rooms & Rental Houses Near You
        </h2>

        <div className="w-20 h-1 bg-blue-600 rounded-md mt-2 mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {exploreItems.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 transition-all bg-white"
            >
              <div className="h-36 md:h-40 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3">
                <h3 className="text-md font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
