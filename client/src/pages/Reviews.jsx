import React, { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGooglePlusG, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const professionalImages = {
  teamMembers: [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80"
  ],
};

const data = {
  teamMembers: [
    {
      name: "Michael Rodriguez",
      position: "CEO & Founder",
      description: "Leading innovation with 15+ years of industry experience. Passionate about transforming businesses through technology.",
      socials: [
        { platform: "facebook" },
        { platform: "twitter" },
        { platform: "linkedin" },
        { platform: "google" },
      ],
    },
    {
      name: "James Chen",
      position: "CTO",
      description: "Tech visionary specializing in scalable architectures and cutting-edge solutions for modern enterprises.",
      socials: [
        { platform: "facebook" },
        { platform: "twitter" },
        { platform: "linkedin" },
        { platform: "google" },
      ],
    },
    {
      name: "Sophia Williams",
      position: "Head of Design",
      description: "Award-winning designer with expertise in creating intuitive user experiences and beautiful interfaces.",
      socials: [
        { platform: "facebook" },
        { platform: "twitter" },
        { platform: "linkedin" },
        { platform: "google" },
      ],
    },
    {
      name: "Emma Thompson",
      position: "Marketing Director",
      description: "Strategic marketing leader driving brand growth and customer engagement across global markets.",
      socials: [
        { platform: "facebook" },
        { platform: "twitter" },
        { platform: "linkedin" },
        { platform: "google" },
      ],
    },
    {
      name: "David Kim",
      position: "Lead Developer",
      description: "Full-stack developer with expertise in modern web technologies and cloud infrastructure.",
      socials: [
        { platform: "facebook" },
        { platform: "twitter" },
        { platform: "linkedin" },
        { platform: "google" },
      ],
    },
    {
      name: "Sarah Johnson",
      position: "Product Manager",
      description: "Product strategist focused on delivering user-centric solutions and driving product vision.",
      socials: [
        { platform: "facebook" },
        { platform: "twitter" },
        { platform: "linkedin" },
        { platform: "google" },
      ],
    },
  ],
};

const socialIconMap = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedinIn />,
  google: <FaGooglePlusG />,
};

const TeamMember = ({ name, position, description, imageSrc, socials, index }) => {
  const finalImageSrc = imageSrc || professionalImages.teamMembers[index % professionalImages.teamMembers.length];
  
  return (
    <div className="flex-shrink-0 w-80 mx-4 bg-white rounded-2xl shadow-2xl text-center overflow-hidden ">
      <div className="relative w-full h-70 overflow-hidden">
        <img 
          src={finalImageSrc} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        
        <div
          className="absolute bottom-0 left-0 w-full h-1/3 bg-white transform -skew-y-3 origin-bottom-left"
          style={{ transform: "translateY(90%) skewY(-12deg)" }}
        >
        </div>
      </div>

      <div className="p-6 pt-8 relative -mt-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto mb-3 rounded-full"></div>
        <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-3">{position}</p>
        <p className="text-gray-600 text-base leading-relaxed mb-6">{description}</p>
        
        <div className="flex justify-center space-x-3">
          {socials.map((social, socialIndex) => (
            <a
              key={socialIndex}
              href="#"
              className="w-10 h-10 flex items-center justify-center text-gray-400 bg-gray-100 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              {socialIconMap[social.platform]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  const { teamMembers } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const autoPlayRef = useRef(null);

  // Create duplicated items for infinite effect
  const duplicatedTeamMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  // Handle automatic sliding
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => {
      const newIndex = prev + 1;
      // When we reach the end of original items, jump to middle section seamlessly
      if (newIndex >= teamMembers.length) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(newIndex - teamMembers.length);
        }, 700);
      }
      return newIndex;
    });
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => {
      const newIndex = prev - 1;
      // When we go before the start, jump to the middle section seamlessly
      if (newIndex < 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(newIndex + teamMembers.length);
        }, 700);
      }
      return newIndex;
    });
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
    resetAutoPlay();
  };

  // Calculate the actual display index for dots
  const displayIndex = currentIndex % teamMembers.length;

  return (
    <div className="bg-gray-200 py-20 px-4 sm:px-6 lg:px-8">
      {/* Meet The Team Section */}
      <section className="max-w-7xl mx-auto mb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 uppercase">Meet Our Team</h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Get to know the brilliant minds behind our success. Our team combines expertise with passion to deliver exceptional results.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative ">
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              handlePrev();
              resetAutoPlay();
            }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm"
          >
            <FaChevronLeft className="text-lg" />
          </button>
          
          <button
            onClick={() => {
              handleNext();
              resetAutoPlay();
            }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm"
          >
            <FaChevronRight className="text-lg" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 320}px)`,
              }}
            >
              {duplicatedTeamMembers.map((member, index) => (
                <TeamMember 
                  key={index} 
                  {...member} 
                  index={index % teamMembers.length}
                />
              ))}
            </div>
          </div>         
        </div>
      </section>
    </div>
  );
};

export default Reviews;