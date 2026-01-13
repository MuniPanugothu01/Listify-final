

import React from "react";
import BabysitterHero from "./BabysitterHero";
import BabysitterAbout from "./BabbysitterAbout";
import BabysitterHowItWorks from "./BabysitterHowItWorks";
import BabysitterProfile from "./BabysitterProfile";
import BabysitterJobs from "./BabysitterJobs";
import CareServices from "../CareServices";
import BabysitterFaq from "./BabysitterFaq";
import BabysitterContact from "./BabysitterContact";  

const BabysitterService = () => {
  return (
    <div>   
        <BabysitterHero/>
        <BabysitterAbout/>
        <BabysitterHowItWorks/>
        <BabysitterProfile/>
        <BabysitterJobs/>
         <CareServices />
        <BabysitterFaq/>
        <BabysitterContact/>
    </div>
  );
}
export default BabysitterService;