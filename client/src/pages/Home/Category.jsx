import React, { useState, useEffect, useCallback } from "react";
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
  // State to track which card is expanded (for mobile only)
  const [expandedCard, setExpandedCard] = useState(null);
  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);
  
  // Responsive initial cards count
  const getInitialCardsCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 8; // xl screens
      if (window.innerWidth >= 1024) return 6; // lg screens
      if (window.innerWidth >= 640) return 6;  // sm/md screens
      return 4; // mobile
    }
    return 8; // default
  };

  const [initialCardsCount, setInitialCardsCount] = useState(8);

  // Check if device is mobile (less than 768px)
  const checkIsMobile = useCallback(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }, []);

  // Handle card click for mobile only
  const handleCardClick = (id, event) => {
    if (!isMobile) return; // Only handle clicks on mobile
    
    event.stopPropagation();
    
    // Toggle expanded state
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  // Handle click outside to collapse (mobile only)
  const handleClickOutside = useCallback((event) => {
    if (isMobile && expandedCard !== null) {
      // Check if click is outside any category card
      const isClickInsideCard = event.target.closest('.category-card');
      if (!isClickInsideCard) {
        setExpandedCard(null);
      }
    }
  }, [expandedCard, isMobile]);

  // Update screen size and initial cards count on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = checkIsMobile();
      setIsMobile(mobile);
      setInitialCardsCount(getInitialCardsCount());
      
      // If switching from mobile to desktop, collapse any expanded card
      if (!mobile) {
        setExpandedCard(null);
      }
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [checkIsMobile, handleClickOutside]);

  const displayedCategories = showAll ? categories : categories.slice(0, initialCardsCount);
  const hasMoreCards = categories.length > initialCardsCount;

  const renderCard = (category) => {
    const isExpanded = expandedCard === category.id;
    
    return (
      <div
        key={category.id}
        className="category-card group relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-full overflow-hidden cursor-pointer rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-in-out transform hover:scale-[1.02]"
        onClick={(e) => handleCardClick(category.id, e)}
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

        {/* Title at Bottom - Hides on Hover (desktop) or when expanded (mobile) */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 sm:p-4 md:p-5 transition-all duration-700 ${
          // On desktop: hide on hover
          // On mobile: hide when expanded
          (!isMobile && 'opacity-100 group-hover:opacity-0 group-hover:translate-y-4') ||
          (isMobile && (isExpanded ? 'opacity-0 translate-y-4' : 'opacity-100'))
        }`}>
          <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl text-center">
            {category.title}
          </h3>
        </div>

        {/* Mobile Toggle Indicator */}
        {isMobile && !isExpanded && (
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            Tap to expand
          </div>
        )}

        {/* Hover/Click Overlay - Slides Up with Subcategories */}
        <div className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90 flex flex-col justify-center items-center pt-4 sm:pt-5 md:pt-6 transition-all duration-800 ease-in-out ${
          // Desktop: show on hover
          // Mobile: show when expanded
          (!isMobile && 'translate-y-full group-hover:translate-y-0') ||
          (isMobile && (isExpanded ? 'translate-y-0' : 'translate-y-full'))
        }`}>
          <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 text-center px-1 sm:px-2">
            {category.subcategories.map((sub, index) => (
              <li
                key={index}
                className={`text-white/90 text-xs sm:text-sm cursor-pointer px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-md hover:text-white hover:bg-gray-700 transition-all duration-500 ease-out ${
                  // Desktop: animated on hover
                  // Mobile: show immediately when expanded
                  (!isMobile && 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100') ||
                  (isMobile && (isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'))
                }`}
                style={{ 
                  transitionDelay: !isMobile ? `${index * 80}ms` : '0ms' 
                }}
              >
                {sub}
              </li>
            ))}
          </ul>

          {/* More Button */}
          <button className="bg-[#27bb97] absolute bottom-0 hover:bg-[#1fa987] h-8 sm:h-9 md:h-10 w-full text-white font-medium text-xs sm:text-sm md:text-[15px] transition-colors duration-300">
            More in {category.title}
          </button>

          {/* Close button for mobile */}
          {isMobile && isExpanded && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setExpandedCard(null);
              }}
              className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full hover:bg-black/90 transition-colors duration-300"
            >
              Close
            </button>
          )}
        </div>

        {/* Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-lg sm:rounded-xl transition-all duration-700"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen px-4 py-4">
      <div className="">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-[#27BB97] text-2xl sm:text-3xl md:text-4xl font-['Dancing_Script'] leading-tight">
            Time To Explore
          </h1>
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2 sm:mt-3 md:mt-4">
            OUR CATEGORIES
          </h1>
          <p className="font-semibold max-w-3xl mx-auto leading-relaxed mt-4 sm:mt-5 md:mt-6 lg:mt-7 text-sm sm:text-base md:text-lg px-3 sm:px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            quae totam porro maxime dolorem delectus consequatur vero odio
            incidunt ut.
          </p>
          {/* Mobile instructions */}
          {isMobile && (
            <p className="text-sm text-gray-600 mt-2">
              Tap on a card to see details
            </p>
          )}
        </div>

        {/* Grid: Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-7xl mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          {displayedCategories.map(renderCard)}
        </div>

        {/* View More / View Less Button */}
        {hasMoreCards && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border-2 border-[#27bb97] text-[#27bb97] font-semibold rounded-lg sm:rounded-xl hover:bg-[#27bb97] hover:text-white transition-all duration-300 hover:shadow-lg flex items-center justify-center mx-auto gap-1 sm:gap-2 text-sm sm:text-base"
            >
              {showAll ? (
                <>
                  View Less
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  View More Categories
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
            {!showAll && (
              <p className="text-gray-500 mt-2 sm:mt-3 text-xs sm:text-sm">
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