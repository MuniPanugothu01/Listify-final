import React, { useState } from "react";
import { Users, Home, ShoppingCart, Briefcase, Music } from "lucide-react";

const Category = () => {
  const categories = [
    {
      id: 1,
      title: "Roommates",
      image: "https://www.shutterstock.com/image-photo/laughing-phone-sharing-friends-on-260nw-2701402047.jpg",
      icon: Users,
      subcategories: [
        "Shared Apartments",
        "Room for Rent",
        "Flatmates Wanted",
        "Student Housing",
        "Long-term Roommates",
      ],
    },
    {
      id: 2,
      title: "Rentals",
      image: "https://hips.hearstapps.com/hmg-prod/images/designed-by-arlyn-hernandez-photo-by-sara-ligorria-tramp-5-652db3f539ed5.jpg",
      icon: Home,
      subcategories: [
        "Apartments",
        "Studio Flats",
        "Short-term Rentals",
        "Furnished Rooms",
        "Vacation Rentals",
      ],
    },
    {
      id: 3,
      title: "Electronics",
      image: "https://thumbs.dreamstime.com/b/modern-electronics-store-showcasing-macbook-air-laptops-smartphones-technology-accessories-lviv-ukraine-march-high-end-macbook-368559879.jpg",
      icon: ShoppingCart,
      subcategories: [
        "Smartphones",
        "Laptops & Tablets",
        "TVs & Audio",
        "Gaming Consoles",
        "Accessories",
      ],
    },
    {
      id: 4,
      title: "Houses",
      image: "https://thumbs.dreamstime.com/b/real-estate-exterior-front-house-sunny-day-big-custom-made-luxury-nicely-landscaped-yard-summer-modern-beautiful-289420329.jpg",
      icon: Home,
      subcategories: [
        "Houses for Sale",
        "Houses for Rent",
        "Townhouses",
        "Luxury Homes",
        "New Developments",
      ],
    },
    {
      id: 5,
      title: "Cars",
      image: "https://www.huntermoss.com/images/best-cars-for-road-trips/a-img.webp",
      icon: Briefcase,
      subcategories: [
        "Used Cars",
        "New Cars",
        "SUVs & Trucks",
        "Electric Vehicles",
        "Motorcycles",
      ],
    },
    {
      id: 6,
      title: "Local Services",
      image: "https://www.professionalhomerepair.net/images/services/handyman-tools.webp",
      icon: Briefcase,
      subcategories: [
        "Plumbing",
        "Electrical",
        "Cleaning",
        "Painting",
        "Handyman Repairs",
      ],
    },
    {
      id: 7,
      title: "Take Care",
      image: "https://www.hopehospice.com/wp-content/uploads/2020/06/blog-banner-caregiver-help-2.jpg",
      icon: Users,
      subcategories: [
        "Elderly Care",
        "Home Nursing",
        "Caregivers",
        "Companion Services",
        "Medical Assistance",
      ],
    },
    {
      id: 8,
      title: "Jobs",
      image: "https://plus.unsplash.com/premium_photo-1661537653118-93a6f2a43d23?fm=jpg&q=60&w=3000",
      icon: Briefcase,
      subcategories: [
        "Full-time Jobs",
        "Part-time",
        "Remote Work",
        "Internships",
        "Freelance Gigs",
      ],
    },
    {
      id: 9,
      title: "Events",
      image: "https://thumbs.dreamstime.com/b/dj-celebrating-stage-arms-raised-vibrant-concert-dynamic-scene-standing-triumphantly-high-celebration-as-373546700.jpg",
      icon: Music,
      subcategories: [
        "Concerts",
        "DJ Nights",
        "Parties",
        "Live Shows",
        "Local Events",
      ],
    },
    {
      id: 10,
      title: "Marketplace",
      image: "https://images.squarespace-cdn.com/content/v1/5726544ef85082b93e0f14c1/1698529986360-L5UIUBKQ0HVZT4MZ1UCZ/new+york+city+flea+markets.jpg?format=2500w",
      icon: ShoppingCart,
      subcategories: [
        "General Buy/Sell",
        "Free Items",
        "Collectibles",
        "Antiques",
        "Local Deals",
      ],
    },
    {
      id: 11,
      title: "For Sale",
      image: "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=10219937815529239",
      icon: ShoppingCart,
      subcategories: [
        "Furniture",
        "Clothing",
        "Home Appliances",
        "Sports Equipment",
        "Books & Toys",
      ],
    },
    {
      id: 12,
      title: "Pets",
      image: "https://www.akc.org/wp-content/uploads/2017/11/Golden-Retriever-puppy-outdoors.jpg",
      icon: Users,
      subcategories: [
        "Dogs for Adoption",
        "Cats for Adoption",
        "Pet Supplies",
        "Pet Services",
        "Lost & Found Pets",
      ],
    },
  ];

  // State to track if we should show all cards
  const [showAll, setShowAll] = useState(false);
  
  // Calculate cards to show initially (8 cards = 2 rows of 4 on desktop)
  const initialCardsCount = 8;
  const displayedCategories = showAll ? categories : categories.slice(0, initialCardsCount);
  const hasMoreCards = categories.length > initialCardsCount;

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
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&h=400&fit=crop";
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>

      {/* Title at Bottom - Hides on Hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-5 transition-all duration-700 opacity-100 group-hover:opacity-0 group-hover:translate-y-4">
        <h3 className="text-white font-semibold text-xl text-center">
          {category.title}
        </h3>
      </div>

      {/* Hover Overlay - Slides Up with Subcategories */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90 translate-y-full group-hover:translate-y-0 transition-all duration-800 ease-in-out flex flex-col justify-center items-center pt-6">
        <ul className="space-y-2 text-center">
          {category.subcategories.map((sub, index) => (
            <li
              key={index}
              className="text-white/90 text-sm cursor-pointer px-4 py-1 rounded-md hover:text-white hover:bg-gray-700 transition-all duration-500 ease-out opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {sub}
            </li>
          ))}
        </ul>

        {/* More Button */}
        <button className="bg-[#27bb97] absolute bottom-0 hover:bg-[#1fa987] h-10 w-full text-white font-medium text-[15px] transition-colors duration-300">
          More in {category.title}
        </button>
      </div>

      {/* Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-lg transition-all duration-700"></div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-center mb-12">
          <div className="text-4xl sm:text-5xl font-bold text-gray-900">
            Popular Categories
          </div>
          <div className="relative inline-block mt-4 sm:mt-6">
            <div className="text-2xl sm:text-3xl font-semibold text-gray-700">
              Explore Local Listings
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#27bb97] to-transparent mt-2"></div>
          </div>
        </h1> */}

        <div className="text-center leading-[70px]">
        <h1 className="text-[#27BB97] text-[40px] font-['Dancing_Script'] ">
          Time To Explore
        </h1>
        <h1 className="font-extrabold text-[90px]">OUR CATEGORIES</h1>
        <p className="font-semibold max-w-3xl mx-auto leading-[30px] mt-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          quae totam porro maxime dolorem delectus consequatur vero odio
          incidunt ut.
        </p>
      </div>


        {/* Grid: 1-2-3-4 columns responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mt-8">
          {displayedCategories.map(renderCard)}
        </div>

        {/* View More / View Less Button */}
        {hasMoreCards && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg hover:bg-[#27bb97] hover:text-white transition-all duration-300 hover:shadow-lg flex items-center justify-center mx-auto gap-2"
            >
              {showAll ? (
                <>
                  View Less
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  View More Categories
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
            {!showAll && (
              <p className="text-gray-500 mt-3 text-sm">
                Showing {initialCardsCount} of {categories.length} categories
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;