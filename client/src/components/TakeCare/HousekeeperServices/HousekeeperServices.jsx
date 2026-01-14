
import React from 'react';
import HousekeeperHero from './HousekeeperHero';
import HousekeeperAbout from './HousekeeperAbout';
import HousekeeperHowItWorks from './HousekeeperHowItWorks';
import HousekeeperProfile from './HousekeeperProfile';
import HousekeeperJobs from './HousekeeperJobs';
import CareServices from '../CareServices';

import HousekeeperFaq from './HousekeeperFaq';
import HousekeeperContact from './HousekeeperContact';


const HousekeeperServices = () => {
  return (
    <div>
        <HousekeeperHero/>
        <HousekeeperAbout/>
        <HousekeeperHowItWorks/>
        <HousekeeperProfile/>
        <HousekeeperJobs/>
        <CareServices />
        <HousekeeperFaq/>
        <HousekeeperContact/>
    </div>
  );
}
export default HousekeeperServices;
