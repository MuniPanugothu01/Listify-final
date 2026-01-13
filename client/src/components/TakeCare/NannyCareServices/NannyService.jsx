// src/components/Nanny/NannyService.jsx
import NannyAbout from "./NannyAbout";
import NannyHowItWorks from "./NannyHowItWorks";
import NannyProfile from "./NannyProfile";
import NannyJobs from "./NannyJobs";
import NannyFaq from "./NannyFaq";
import CareServices from "../CareServices";
import NannyContact from "./NannyContact";
import NannyHero from "./NannyHero";

const NannyService = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section (Now using NannyHero component) */}
      <NannyHero />

      {/* Other Nanny Components with proper container constraints */}
      <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
        {/* Each section with proper max-width container */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <NannyAbout />
          </div>
        </div>

        <div className="w-full">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <NannyHowItWorks />
          </div>
        </div>

        <div className="w-full">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <NannyProfile />
          </div>
        </div>

        <div className="w-full">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <NannyJobs />
          </div>
        </div>

        <div className="w-full">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <CareServices />
          </div>
        </div>

        <div className="w-full">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <NannyFaq />
          </div>
        </div>

        <div className="w-full">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <NannyContact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NannyService;