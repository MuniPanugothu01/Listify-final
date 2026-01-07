import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const professionalImages = {
  teamMembers: [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  ],
};

const data = {
  teamMembers: [
    {
      name: "Sarah Johnson",
      position: "Small Business Owner",
      description:
        "Listify helped me grow my local business like never before. The platform is so much better than Craigslist for professional services!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      position: "Freelance Developer",
      description:
        "Finally, a platform that combines the simplicity of Craigslist with the professionalism needed for service-based work.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      position: "Real Estate Agent",
      description:
        "Listify's property section outperforms both Craigslist and Sulekha. The verification system builds instant trust with clients.",
      rating: 4,
    },
    {
      name: "David Thompson",
      position: "Local Service Provider",
      description:
        "Security and trust were always issues on Craigslist. Listify's verification system makes every transaction safe.",
      rating: 5,
    },
    {
      name: "Lisa Wang",
      position: "Community Manager",
      description:
        "Listify brings communities together better than any platform I've used, including Sulekha's local services.",
      rating: 4,
    },
    {
      name: "James Wilson",
      position: "Marketing Consultant",
      description:
        "Listify offers the reach of Craigslist with the sophistication that Sulekha tries to achieve but falls short on.",
      rating: 5,
    },
  ],
};

// ⭐ Star Rating Component
const StarRating = ({ rating }) => (
  <div className="flex justify-center space-x-1 mb-2 sm:mb-3">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-sm sm:text-base md:text-lg ${index < rating ? "text-yellow-300" : "text-gray-300"}`}
      />
    ))}
  </div>
);

// 🧱 Single Review Card
const ReviewCard = ({ name, position, description, rating, imageSrc }) => (
  <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 mx-2 sm:mx-3 md:mx-4 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl text-center overflow-hidden">
    <div className="relative w-full h-36 sm:h-40 md:h-48 overflow-hidden">
      <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
      <div
        className="absolute bottom-0 left-0 w-full h-1/3 bg-white transform -skew-y-3 origin-bottom-left"
        style={{ transform: "translateY(106%) skewY(-9deg)" }}
      ></div>
    </div>

    <div className="p-4 sm:p-5 md:p-6 pt-5 sm:pt-6 md:pt-8 relative -mt-3 sm:-mt-4">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">{name}</h3>
      <div className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-[#27BB97] mx-auto mb-2 sm:mb-3 rounded-full"></div>
      <p className="text-black font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3">{position}</p>
      <StarRating rating={rating} />
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6">{description}</p>
    </div>
  </div>
);

const Reviews = () => {
  const { teamMembers } = data;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate visible cards based on screen size
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 1;
    
    if (window.innerWidth >= 1024) return 3; // desktop
    if (window.innerWidth >= 768) return 2;  // tablet
    return 1; // mobile
  };

  const visibleCards = getVisibleCards();
  
  // Calculate max index based on visible cards
  const maxIndex = Math.max(0, teamMembers.length - visibleCards);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  // Calculate card width based on screen size
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 320;
    
    if (window.innerWidth >= 1024) return 320; // desktop
    if (window.innerWidth >= 768) return 304;  // tablet
    return 272; // mobile
  };

  const cardWidth = getCardWidth();

  return (
    <div className="bg-gray-100 py-10 sm:py-14 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 uppercase">
            Our Clients Reviews
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto px-2">
            Discover what our satisfied users say about their Listify experience. Real feedback from real people in our community.
          </p>
          <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-[#27BB97] mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden mb-6 sm:mb-7 md:mb-8">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
              }}
            >
              {teamMembers.map((member, index) => (
                <ReviewCard
                  key={index}
                  {...member}
                  imageSrc={professionalImages.teamMembers[index % professionalImages.teamMembers.length]}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Below Cards Side by Side */}
          <div className="flex justify-center items-center space-x-3 sm:space-x-4">
            {/* ⬅️ Prev Button */}
            <button
              onClick={handlePrev}
              className="bg-white text-gray-800 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full shadow-md sm:shadow-lg flex items-center justify-center border border-[#C89A5E]/20 hover:bg-gray-100 hover:text-white transition-all duration-300"
              aria-label="Previous review"
            >
              <FaChevronLeft className="text-sm sm:text-base md:text-lg" />
            </button>

            {/* ➡️ Next Button */}
            <button
              onClick={handleNext}
              className="bg-white text-gray-800 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full shadow-md sm:shadow-lg flex items-center justify-center border border-[#C89A5E]/20 hover:bg-gray-100 hover:text-white transition-all duration-300"
              aria-label="Next review"
            >
              <FaChevronRight className="text-sm sm:text-base md:text-lg" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;