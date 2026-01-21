import React, { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";

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
        "Listify helped me grow my local business like never before. The platform is so much better than other listing websites for professional services!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      position: "Freelance Developer",
      description:
        "Finally, a platform that combines simplicity with the professionalism needed for service-based work. Listify stands out from the rest!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      position: "Real Estate Agent",
      description:
        "Listify's property section outperforms all other platforms. The verification system builds instant trust with clients.",
      rating: 4,
    },
    {
      name: "David Thompson",
      position: "Local Service Provider",
      description:
        "Security and trust were always issues on other platforms. Listify's verification system makes every transaction safe and reliable.",
      rating: 5,
    },
    {
      name: "Lisa Wang",
      position: "Community Manager",
      description:
        "Listify brings communities together better than any platform I've used. It's truly the best for local connections and services.",
      rating: 4,
    },
    {
      name: "James Wilson",
      position: "Marketing Consultant",
      description:
        "Listify offers incredible reach with sophisticated features that other platforms try to achieve but fall short on.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      position: "Event Planner",
      description:
        "As an event planner, Listify has been a game-changer. The local focus and user-friendly interface make it my go-to platform.",
      rating: 5,
    },
    {
      name: "Robert Garcia",
      position: "Automotive Specialist",
      description:
        "Listify's automobile section is fantastic. Better organization and more serious buyers than any other listing site I've tried.",
      rating: 4,
    },
  ],
};

const StarRating = ({ rating }) => (
  <div className="flex justify-center space-x-1 mb-4">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-base sm:text-lg ${index < rating ? "text-yellow-300" : "text-gray-300"}`}
      />
    ))}
  </div>
);

const ReviewCard = ({ name, position, description, rating, imageSrc }) => (
  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 mx-4">
    <div className="bg-white rounded-3xl shadow-xl px-6 pt-16 pb-8 text-center relative min-h-[380px]">
      {/* Image on top - full visible */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-8 border-white shadow-xl">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
        {name}
      </h3>
      <p className="text-black font-semibold text-xs sm:text-sm uppercase tracking-wide mt-2 mb-4">
        {position}
      </p>

      <StarRating rating={rating} />

      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const Reviews = () => {
  const { teamMembers } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Get visible cards based on screen size
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const visibleCards = getVisibleCards();
  const totalCards = teamMembers.length;

  // Calculate card width including margins
  const getCardWidth = () => {
    if (!containerRef.current) return 320;
    const container = containerRef.current;
    const cards = container.querySelectorAll('.flex-shrink-0');
    if (cards.length === 0) return 320;
    
    const firstCard = cards[0];
    const cardStyle = window.getComputedStyle(firstCard);
    const width = parseFloat(cardStyle.width);
    const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
    const marginRight = parseFloat(cardStyle.marginRight) || 0;
    
    return width + marginLeft + marginRight;
  };

  // Clone cards for infinite scroll effect
  const clonedCards = [...teamMembers, ...teamMembers.slice(0, visibleCards)];

  // Auto scroll every 2 seconds with smooth infinite scroll
  useEffect(() => {
    if (!containerRef.current) return;

    let isAnimating = false;

    const scrollToIndex = (index) => {
      if (isAnimating || !containerRef.current) return;
      
      isAnimating = true;
      setIsTransitioning(true);
      
      const container = containerRef.current;
      const cardWidth = getCardWidth();
      const scrollPosition = index * cardWidth;
      
      container.style.scrollBehavior = 'smooth';
      container.scrollLeft = scrollPosition;
      
      // Update the visible index (modulo totalCards for infinite effect)
      const actualIndex = index % totalCards;
      setCurrentIndex(actualIndex);
      
      // Reset scroll position when reaching the cloned section
      const resetTimer = setTimeout(() => {
        if (index >= totalCards) {
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = (index - totalCards) * cardWidth;
        }
        isAnimating = false;
        setIsTransitioning(false);
      }, 500); // Match this with CSS transition duration
      
      return () => clearTimeout(resetTimer);
    };

    let currentScrollIndex = 0;

    autoScrollRef.current = setInterval(() => {
      if (isAnimating) return;
      
      currentScrollIndex++;
      
      // If we're at the end of cloned cards, reset to beginning
      if (currentScrollIndex >= clonedCards.length - visibleCards) {
        currentScrollIndex = 0;
        containerRef.current.style.scrollBehavior = 'auto';
        containerRef.current.scrollLeft = 0;
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.scrollBehavior = 'smooth';
          }
        }, 50);
      }
      
      scrollToIndex(currentScrollIndex);
    }, 2000); // Auto scroll every 2 seconds

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [totalCards, visibleCards, clonedCards.length]);

  // Handle manual click on dots
  const handleDotClick = (index) => {
    if (isTransitioning) return;
    
    const container = containerRef.current;
    const cardWidth = getCardWidth();
    
    if (container && cardWidth > 0) {
      setIsTransitioning(true);
      container.style.scrollBehavior = 'smooth';
      container.scrollLeft = index * cardWidth;
      setCurrentIndex(index);
      
      // Reset transition state
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
    
    // Reset auto-scroll timer
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = setInterval(() => {
        if (containerRef.current) {
          const cardWidth = getCardWidth();
          const currentScroll = containerRef.current.scrollLeft;
          const nextScroll = currentScroll + cardWidth;
          const maxScroll = (clonedCards.length - visibleCards) * cardWidth;
          
          if (nextScroll >= maxScroll) {
            containerRef.current.style.scrollBehavior = 'auto';
            containerRef.current.scrollLeft = 0;
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.style.scrollBehavior = 'smooth';
              }
            }, 50);
          } else {
            containerRef.current.style.scrollBehavior = 'smooth';
            containerRef.current.scrollLeft = nextScroll;
          }
        }
      }, 2000);
    }
  };

  // Center the container initially
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = getCardWidth();
      if (cardWidth > 0) {
        // Start at the first card (not cloned section)
        container.scrollLeft = 0;
      }
    }
  }, []);

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
          {/* Carousel Container */}
          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            <div className="flex items-stretch py-12 mt-8">
              {/* Render cloned cards for infinite scroll effect */}
              {clonedCards.map((member, index) => (
                <ReviewCard
                  key={`${member.name}-${index}`}
                  {...member}
                  imageSrc={professionalImages.teamMembers[index % professionalImages.teamMembers.length]}
                />
              ))}
            </div>
          </div>

          {/* Dots Indicator (only for original cards) */}
          <div className="flex justify-center items-center mt-8 space-x-3">
            {Array.from({ length: totalCards }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#27BB97] w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isTransitioning}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;