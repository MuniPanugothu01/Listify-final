import React from 'react';
import CookHero from './CookHero';
import CookAbout from './CookAbout';
import CookHowItWorks from './CookHowItWorks';
import CookProfile from './CookProfile';
import CookJobs from './CookJobs';
import CareServices from '../CareServices';
import CookFaq from './CookFaq';
import CookContact from './CookContact';

 const CookServices = () => {
   return (
    <>


     <CookHero/>
    <CookAbout/>
    <CookHowItWorks/>
    <CookProfile/>
    <CookJobs/>
      <CareServices />
    <CookFaq/>
    <CookContact/>

    
    </>

   
    
   )
 }
    export default CookServices;