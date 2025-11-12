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
  <div className="flex justify-center space-x-1 mb-3">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-lg ${index < rating ? "text-[#C89A5E]" : "text-gray-300"}`}
      />
    ))}
  </div>
);

// 🧱 Single Review Card
const ReviewCard = ({ name, position, description, rating, imageSrc }) => (
  <div className="flex-shrink-0 w-80 mx-4 bg-white rounded-2xl shadow-2xl text-center overflow-hidden">
    <div className="relative w-full h-48 overflow-hidden">
      <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
      <div
        className="absolute bottom-0 left-0 w-full h-1/3 bg-white transform -skew-y-3 origin-bottom-left"
        style={{ transform: "translateY(106%) skewY(-9deg)" }}
      ></div>
    </div>

    <div className="p-6 pt-8 relative -mt-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
      <div className="w-12 h-1 bg-gradient-to-r from-[#C89A5E] to-[#E6C9A8] mx-auto mb-3 rounded-full"></div>
      <p className="text-[#C89A5E] font-semibold text-sm uppercase tracking-wide mb-3">{position}</p>
      <StarRating rating={rating} />
      <p className="text-gray-600 text-base leading-relaxed mb-6">{description}</p>
    </div>
  </div>
);

const Reviews = () => {
  const { teamMembers } = data;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <div className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 uppercase">
            Our Clients Reviews
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover what our satisfied users say about their Listify experience. Real feedback from real people in our community.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C89A5E] to-[#E6C9A8] mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden mb-8">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 320}px)`,
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
          <div className="flex justify-center items-center space-x-4">
            {/* ⬅️ Prev Button */}
            <button
              onClick={handlePrev}
              className="bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border border-[#C89A5E]/20 hover:bg-[#C89A5E] hover:text-white transition-all duration-300"
            >
              <FaChevronLeft className="text-lg" />
            </button>

            {/* ➡️ Next Button */}
            <button
              onClick={handleNext}
              className="bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border border-[#C89A5E]/20 hover:bg-[#C89A5E] hover:text-white transition-all duration-300"
            >
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;