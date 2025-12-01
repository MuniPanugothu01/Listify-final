import React from 'react'
// import here subnavbar
import RoommateSubNav from "../../components/Roommates/RoommateSubNav";
import HeroSection from '../../components/Rentals/HeroSection';
import HeroSection1 from '../../components/Rentals/HeroSection1';
const Rentals = () => {
  return (
    <div className="min-h-screen ">
      {/* SubNav will automatically handle its visibility */}
      <RoommateSubNav />
     <HeroSection/>
 
<HeroSection1/>

    </div>
  )
}

export default Rentals;
