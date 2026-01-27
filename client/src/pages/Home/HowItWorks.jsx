import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  PhoneCall,
  ClipboardCheck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const HowItWorks = () => {
  const howItWorks = [
    {
      title: "Browse & Discover",
      description:
        "Search through our extensive directory of verified service providers. Filter by category, expertise, rating, and budget to find the perfect match for your needs.",
      features: [
        "Smart search with advanced filters",
        "Verified professional profiles",
        "Authentic customer reviews",
        "Clear pricing information",
      ],
      image: "/howitworks.jpg",
    },
    {
      title: "Connect & Book",
      description:
        "Communicate directly with service professionals through our secure platform. Book appointments, request custom quotes, and schedule services effortlessly.",
      features: [
        "Direct messaging system",
        "Secure booking platform",
        "Real-time availability updates",
        "Flexible scheduling options",
      ],
      image: "/howitworks-2.jpg",
    },
    {
      title: "Experience & Review",
      description:
        "Receive quality services from trusted professionals. Share your feedback to help maintain our community standards and assist others in their decision-making.",
      features: [
        "Service progress tracking",
        "Secure payment handling",
        "Detailed rating system",
        "Support for any concerns",
      ],
      image: "/howitworks-3.jpg",
    },
  ];

  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
    .scroll-animate {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out;
    }
    .scroll-animate.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .stagger-delay-1 { transition-delay: 0.1s; }
    .stagger-delay-2 { transition-delay: 0.2s; }
    .stagger-delay-3 { transition-delay: 0.3s; }
    .gradient-text {
      background: linear-gradient(135deg, #27BB97 0%, #1FA987 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hover-scale {
      transition: transform 0.3s ease;
    }
    .hover-scale:hover {
      transform: scale(1.05);
    }
    @media (max-width: 640px) {
      .mobile-text-center { text-align: center !important; }
      .mobile-space-y-6 > * + * { margin-top: 1.5rem !important; }
    }
  `;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".scroll-animate")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <style>{animationStyles}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 scroll-animate">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            How Listify Works
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-[#27BB97] mx-auto rounded-full"></div>
        </div>

        {/* Steps */}
        <div className="space-y-16 lg:space-y-24">
          {howItWorks.map((step, index) => {
            // Image on left for index 0 and 2, on right for index 1
            const imageOnLeft = index === 0 || index === 2;

            return (
              <div
                key={index}
                className={`scroll-animate stagger-delay-${(index % 3) + 1}`}
              >
                <div
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    !imageOnLeft
                      ? "lg:grid-cols-2 lg:[&>div:nth-child(1)]:order-2 lg:[&>div:nth-child(2)]:order-1"
                      : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative group">
                    <div className="overflow-hidden shadow-2xl">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 sm:h-80 lg:h-96 object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center mobile-text-center">
                    <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
                      {step.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {step.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 justify-center lg:justify-start"
                        >
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#27BB97] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="text-center lg:text-left">
                      <button className="px-6 py-3 border-2 border-[#27BB97] text-[#27BB97] hover:bg-[#27BB97] hover:text-white font-semibold rounded-lg transition-all duration-300 hover-scale flex items-center gap-3 mx-auto lg:mx-0">
                        Learn More
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20 scroll-animate">
          <div className="bg-gradient-to-r from-[#27BB97]/5 to-[#1FA987]/5 rounded-2xl p-8 lg:p-12 border border-[#27BB97]/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Ready to Experience Listify?
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Join our community of satisfied users who trust Listify to connect
              them with reliable professionals for all their service needs.
              Whether you're looking for home services, professional expertise,
              or specialized skills, Listify makes it simple, secure, and
              efficient.
            </p>
            

            <Link to="/signin">
              <button className="px-8 lg:px-10 py-4 border border-[#27BB97] text-[#27BB97] hover:bg-[#27BB97] hover:text-white font-semibold rounded-xl transition-all duration-300 hover-scale shadow-lg text-lg">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
