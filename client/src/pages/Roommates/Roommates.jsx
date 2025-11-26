import React from "react";
import HeroRoom from "../../components/Roommates/HeroRoom.jsx";
import RoommateSubNav from "../../components/Roommates/RoommateSubNav";
import RecentDataOne from "../../components/Roommates/RecentData.jsx"; // Fixed import
import FeaturedData from '../../components/Roommates/FeaturedData.jsx';
export default function Roommates() {
  return (
    <div className="min-h-screen ">
      {/* SubNav will automatically handle its visibility */}
      <RoommateSubNav />
      <HeroRoom />
      <RecentDataOne /> {/* Fixed component name */}
      <FeaturedData/>
  
    </div>
  );
}
