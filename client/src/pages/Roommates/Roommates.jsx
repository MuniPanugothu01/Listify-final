import React from "react";
import HeroRoom from "../../components/Roommates/HeroRoom.jsx";
import RoommateSubNav from "../../components/Roommates/RoommateSubNav";
import Footer from "../Home/Footer.jsx";

export default function Roommates() {
  return (
    <div className="min-h-screen">
      {/* SubNav will automatically handle its visibility */}
      <RoommateSubNav />
      <HeroRoom />
      

      
      <Footer />
    </div>
  );
}