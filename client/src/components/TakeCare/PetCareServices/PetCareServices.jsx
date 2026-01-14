
import React from 'react';
import PetCareHero from './PetCareHero';
import PetCareAbout from './PetCareAbout';
import PetCareHowItWorks from './PetCareHowItWorks';
import PetCareProfile from './PetCareProfile';
import PetCareJobs from './PetCareJobs';
import CareServices from '../CareServices';
import PetCareFaq from './PetCareFaq';
import PetCareContact from './PetCareContact';

const PetCareServices = () => {
  return (
    <div>
        <PetCareHero/>
        <PetCareAbout/>
        <PetCareHowItWorks/>
        <PetCareProfile/>
        <PetCareJobs/>
        <CareServices />
        <PetCareFaq/>
        <PetCareContact/>
    </div>
  );
}
export default PetCareServices;