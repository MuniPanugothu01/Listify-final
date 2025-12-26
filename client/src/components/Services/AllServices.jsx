import { useState } from "react";

export default function AllServices() {
  const [expanded, setExpanded] = useState({});


// categories data
const categories = [
  {
    title: "Home Services",
    icon: "🏠",
    services: [
      "Plumbing",
      "Electrical",
      "Carpentry",
      "Painting",
      "Cleaning",
      "Pest Control",
      "AC Service",
      "Bathroom Repair",
      "Water Leakage",
      "Door Fixing",
    ],
  },
  {
    title: "Appliance Repair",
    icon: "🔌",
    services: [
      "Washing Machine",
      "Refrigerator",
      "TV Repair",
      "Microwave",
      "Water Purifier",
      "Dishwasher",
    ],
  },
  {
    title: "Cleaning & Maintenance",
    icon: "🧼",
    services: [
      "House Cleaning",
      "Bathroom Cleaning",
      "Sofa Cleaning",
      "Water Tank Cleaning",
      "Kitchen Cleaning",
    ],
  },
];


  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            All Services
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Explore our wide range of local services offered by verified professionals
          </p>
        </div>

        {/* CATEGORY BLOCKS */}
        <div className="space-y-14">
          {categories.map((category, index) => {
            const isExpanded = expanded[index];
            const visibleServices = isExpanded
              ? category.services
              : category.services.slice(0, 6);

            return (
              <div key={index} className="border-b pb-10">

                {/* CATEGORY HEADER */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                      {category.title}
                    </h3>
                  </div>

                  {/* VIEW ALL */}
                  {category.services.length > 6 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-sm font-semibold text-[#27bb97] hover:underline"
                    >
                      {isExpanded ? "Show Less" : "View All →"}
                    </button>
                  )}
                </div>

                {/* SERVICES GRID */}
                <div
                  className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-all duration-300`}
                >
                  {visibleServices.map((service, i) => (
                    <div
                      key={i}
                      className="group bg-gray-50 hover:bg-[#27bb97]/5 border border-gray-100 rounded-xl px-4 py-4 text-sm font-medium text-gray-800 cursor-pointer transition"
                    >
                      <span className="group-hover:text-[#27bb97] transition">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
