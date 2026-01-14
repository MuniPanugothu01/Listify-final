import React from "react";

import TutorHero from "./TutorHero";
import TutorAbout from "./TutorAbout";
import TutorHowItWorks from "./TutorHowItWorks";
import TutorProfile from "./TutorProfile";
import TutorJobs from "./TutorJobs";
import CareServices from "../CareServices";
import TutorFaq from "./TutorFaq";
import TutorContact from "./TutorContact";

const TutorServices = () => {
  return (
    <div>
        <TutorHero/>
        <TutorAbout/>
        <TutorHowItWorks/>
        <TutorProfile/>
        <TutorJobs/>
        <CareServices />
        <TutorFaq/>
        <TutorContact/> 
    </div>
  );
}
export default TutorServices;