// src/components/Nanny/NannyHero.jsx
import { ArrowRight, ChevronRight } from "lucide-react";
import { RainbowButton } from "../../ui/rainbow-button";

const NannyHero = () => {
  const heroData = {
    title: "Find Your Perfect Nanny",
    subtitle: "Trusted, verified nannies for your family's needs",
    description: "Connect with experienced nannies who provide loving care and professional support for your children.",
  };

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Fixed on desktop, scroll on mobile for performance */}
      <div 
        className="absolute inset-0 bg-cover bg-center lg:bg-fixed"
        style={{
          backgroundImage: `url('/nany-care-1.jpg')`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white py-8 sm:py-12 lg:py-16 px-2">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight tracking-tight">
            {heroData.title}
          </h1>
          <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-white/90 mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed">
            {heroData.subtitle}
          </p>
          <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            {heroData.description}
          </p>

          {/* Button Container */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <RainbowButton className="w-full sm:w-auto bg-red-500 hover:bg-red-600">
              Offer Nanny Care Job
            </RainbowButton>
            <RainbowButton className="w-full sm:w-auto">
              Need a Nanny Job
            </RainbowButton>
          </div>

          {/* Additional CTA Button */}
          <button 
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-lg sm:rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-gray-300/30 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Post nanny job now"
          >
            <span>Post Now</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Scroll Indicator for Mobile */}
          <div className="mt-10 sm:mt-12 lg:hidden">
            <div className="flex flex-col items-center gap-2 text-white/70 animate-bounce">
              <span className="text-sm">Scroll to explore</span>
              <ChevronRight className="w-5 h-5 rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Remove fixed background on mobile for performance */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .lg\\:bg-fixed {
            background-attachment: scroll !important;
          }
        }
        
        @media (max-width: 640px) {
          .min-h-\\[60vh\\] {
            min-height: 60vh !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NannyHero;