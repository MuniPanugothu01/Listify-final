import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  CheckCircle, 
  ChevronRight,
  ArrowRight,
  Phone,
  MessageSquare
} from "lucide-react";

import NannyAbout from "./NannyAbout";
import NannyHowItWorks from "./NannyHowItWorks";
import NannyProfile from "./NannyProfile";
import NannyJobs from "./NannyJobs";
import NannyFaq from "./NannyFaq";
import CareServices from "../CareServices";

import { RainbowButton } from "../../ui/rainbow-button";


const NannyService = () => {
  
  // Section 1: Hero Section
  const heroData = {
    title: "Find Your Perfect Nanny",
    subtitle: "Trusted, verified nannies for your family's needs",
    description: "Connect with experienced nannies who provide loving care and professional support for your children.",
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero with Background Image */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
              backgroundImage: `url('/nany-care-1.jpg')`, 
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              {heroData.title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto">
              {heroData.subtitle}
            </p>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              {heroData.description}
            </p>

            <div className=" flex justify-center gap-2 ">
               <RainbowButton className="bg-red">Offer Nanny Care Job</RainbowButton>
               <RainbowButton>Need a Nanny Job</RainbowButton>
            </div>
              
               <button className="mt-6 gap-3 pl-8 pr-8 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-gray-300/30">
                Post Now
               </button>
          </div>
        </div>
      </section>

      <NannyAbout/>

      <NannyHowItWorks/>

      <NannyProfile/>



      <NannyJobs/>

      <CareServices/>

      <NannyFaq/>

    </div>
  );
};

export default NannyService;