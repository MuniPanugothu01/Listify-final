import React from 'react'
// import here subnavbar
import RoommateSubNav from "../../components/Roommates/RoommateSubNav";
import HeroSection from '../../components/Rentals/HeroSection';
import RecentRentals from '../../components/Rentals/RecentRentals';



const Rentals = () => {
  return (
    <div className="min-h-screen ">
      {/* SubNav will automatically handle its visibility */}
      <RoommateSubNav />
     <HeroSection/>
 <RecentRentals/>

    </div>
  )
}

export default Rentals;
