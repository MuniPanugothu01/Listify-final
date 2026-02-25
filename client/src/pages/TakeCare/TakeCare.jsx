import React from "react";
import RecentCare from "../../components/TakeCare/RecentCare.jsx";
import CareServices from "../../components/TakeCare/CareServices.jsx";
import AllServices from "../../components/TakeCare/AllServices.jsx";
import EasyServices from "../../components/TakeCare/EasyServices.jsx";
import FeaturedServices from "../../components/TakeCare/FeaturedServices.jsx";
import HowItWorks from "../../components/TakeCare/HowItWorks.jsx";
import WhyChooseUs from "../../components/TakeCare/WhyChooseUs.jsx";

import TakeCareHero from "../../components/TakeCare/TakeCareHero.jsx";
import TakeCareListing from "../../components/TakeCare/TakeCareListing.jsx";

const TakeCare = () => {
  return (
    <div className="">
      <TakeCareHero />
      <TakeCareListing />
      {/* <RecentCare/> */}
      {/* <CareServices/> */}
      {/* <main className="max-w-7xl mx-auto ">
        <AllServices 
          services={serviceTypesData} 
          onServiceClick={handleServiceClick}
        />
        
        <EasyServices
          services={easyServicesData} 
          onServiceClick={handleServiceClick}
        />
        
        <FeaturedServices providers={featuredProvidersData} />
        
      
      </main> */}
      {/* <HowItWorks /> */}

      {/* <WhyChooseUs /> */}
    </div>
  );
};

export default TakeCare;
