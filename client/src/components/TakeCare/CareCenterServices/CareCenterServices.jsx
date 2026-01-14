
import React from 'react';
import CareCenterHero from './CareCenterHero';
import CareCenterAbout from './CareCenterAbout';
import CareCenterHowItWorks from './CareCenterHowItWorks';
import CareCenterProfile from './CareCenterProfile';
import CareCentersJobs from './CareCentersJobs';
import CareServices from '../CareServices';
import CareCenterFaq from './CareCenterFaq';
import CareCenterContact from './CareCenterContact';




const CareCenterServices = () => {
  return (
    <div>
        <CareCenterHero/>
        <CareCenterAbout/>
        <CareCenterHowItWorks/>
        <CareCenterProfile/>
        <CareCentersJobs/>
        <CareServices />
        <CareCenterFaq/>
        <CareCenterContact/>
    </div>
  );
}
export default CareCenterServices;