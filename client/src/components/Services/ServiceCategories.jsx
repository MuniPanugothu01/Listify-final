import React from "react";

const ServiceCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Financial & Legal Services",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
      subcategories: [
        "Tax Consulting",
        "Legal Advisory",
        "Accounting",
        "Investment Planning",
        "Business Law",
      ],
    },
    {
      id: 2,
      title: "Real Estate Services",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      subcategories: [
        "Property Sales",
        "Rentals",
        "Property Management",
        "Real Estate Consulting",
        "Home Staging",
      ],
    },
    {
      id: 3,
      title: "Wedding & Events",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
      subcategories: [
        "Wedding Planning",
        "Event Coordination",
        "Decorations",
        "Venue Booking",
        "Photography",
      ],
    },
    {
      id: 4,
      title: "Lessons/Tuitions",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
      subcategories: [
        "Math Tutoring",
        "Music Lessons",
        "Language Classes",
        "Test Prep",
        "Art Classes",
      ],
    },
    {
      id: 5,
      title: "Food & Catering",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
      subcategories: [
        "Event Catering",
        "Private Chef",
        "Meal Prep",
        "Bakery Services",
        "Food Delivery",
      ],
    },
    {
      id: 6,
      title: "Home & Business Needs",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
      subcategories: [
        "Cleaning Services",
        "Repairs",
        "Maintenance",
        "Moving Services",
        "Pest Control",
      ],
    },
    {
      id: 7,
      title: "Travel & Accommodation",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
      subcategories: [
        "Travel Planning",
        "Hotel Booking",
        "Tour Packages",
        "Transportation",
        "Visa Services",
      ],
    },
    {
      id: 8,
      title: "Health & Wellness",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
      subcategories: [
        "Yoga Classes",
        "Meditation",
        "Spa Services",
        "Fitness Training",
        "Nutrition",
      ],
    },
    {
      id: 9,
      title: "Religious & Community Services",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      subcategories: [
        "Religious Events",
        "Community Programs",
        "Charity Services",
        "Counseling",
        "Social Work",
      ],
    },
    {
      id: 10,
      title: "Educational Institutes",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
      subcategories: [
        "Schools",
        "Colleges",
        "Training Centers",
        "Online Courses",
        "Workshops",
      ],
    },
    // Additional categories to make 15 cards (3 rows of 5)
    {
      id: 11,
      title: "Automotive Services",
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop",
      subcategories: [
        "Car Repair",
        "Car Wash",
        "Auto Detailing",
        "Towing",
        "Vehicle Inspection",
      ],
    },
    {
      id: 12,
      title: "IT & Digital Services",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
      subcategories: [
        "Web Development",
        "Digital Marketing",
        "IT Support",
        "Software Development",
        "SEO Services",
      ],
    },
    {
      id: 13,
      title: "Beauty & Salon",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
      subcategories: [
        "Hair Styling",
        "Nail Services",
        "Makeup Artists",
        "Spa Treatments",
        "Skincare",
      ],
    },
    {
      id: 14,
      title: "Pets & Animal Care",
      image:
        "https://images.unsplash.com/photo-1514888286974-6d03bde4ba42?w=600&h=400&fit=crop",
      subcategories: [
        "Pet Grooming",
        "Veterinary Services",
        "Pet Sitting",
        "Dog Walking",
        "Pet Training",
      ],
    },
    {
      id: 15,
      title: "Entertainment",
      image:
        "https://images.unsplash.com/photo-1501281668745-f6f2610cf716?w=600&h=400&fit=crop",
      subcategories: [
        "DJ Services",
        "Live Music",
        "Photography",
        "Videography",
        "Party Planning",
      ],
    },
  ];

  const renderCard = (category) => (
    <div
      key={category.id}
      className="group relative h-80 w-full overflow-hidden cursor-pointer rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-in-out transform hover:scale-[1.02]"
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        onError={(e) => {
          // Fallback if image fails to load
          e.target.onerror = null;
          e.target.src =
            "https://images.unsplash.com/photo-1559521783-1d1599583485?w=600&h=400&fit=crop";
        }}
      />

      {/* Dark Overlay on Image */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>

      {/* Title - Always Visible at Bottom - Hidden on Hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-5 transition-all duration-700 opacity-100 group-hover:opacity-0 group-hover:translate-y-4">
        <h3 className="text-white font-semibold text-center">
          {category.title}
        </h3>
      </div>

      {/* Hover Overlay - Slides from Bottom with Subcategories (NO TITLE) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90 translate-y-full group-hover:translate-y-0 transition-all duration-800 ease-in-out flex flex-col justify-center items-center pt-6">
        {/* Title removed from hover overlay */}

        <ul className="space-y-2 text-center">
          {category.subcategories.map((sub, index) => (
            <li
              key={index}
              className="
                text-white/90 text-sm cursor-pointer
                px-3 py-1 rounded-md
                hover:text-white hover:bg-gray-700
                transition-all duration-500 ease-out
                opacity-0 transform translate-y-4
                group-hover:translate-y-0 group-hover:opacity-100
              "
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {sub}
            </li>
          ))}
        </ul>

        {/* More Services Button */}
        <button className="bg-[#27bb97] absolute bottom-0 hover:bg-[#1fa987] h-10 w-full text-white font-medium text-[15px] transition-colors duration-300">
          More Services
        </button>
      </div>

      {/* Subtle border effect on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-lg transition-all duration-700"></div>
    </div>
  );

  // Show only first 15 cards (3 rows of 5)
  const displayedCategories = categories.slice(0, 15);

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="px-10">
        <h1 className="text-center mb-12">
  <div className="text-5xl font-bold text-gray-900">
    Top Local Service Categories
  </div>
  <div className="relative inline-block mt-6">
    <div className="text-3xl font-semibold text-gray-700">
      in Los Angeles Metro Area
    </div>
    <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#27bb97] to-transparent mt-2"></div>
  </div>
</h1>

        {/* Show 3 rows (15 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {displayedCategories.map(renderCard)}
        </div>

        {/* View More Services Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg hover:bg-[#27bb97] hover:text-white transition-all duration-300 hover:shadow-lg cursor-pointer">
            View All Services →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategories;
