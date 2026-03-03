import React from "react";
// import here subnavbar
import RoommateSubNav from "../../components/Roommates/RoommateSubNav";
import HeroSection from "../../components/Rentals/HeroSection";
import RecentRentals from "../../components/Rentals/RecentRentals";
import FeaturedRentals from "../../components/Rentals/FeaturedRentals";
import TrendingWeek from "../../components/Rentals/TrendingWeek";
import RentalsByArea from "../../components/Rentals/RentalsByArea";
import ExploreNearYou from "../../components/Rentals/ExploreNearYou";
import PropertyAgents from "../../components/Rentals/PropertyAgents";
import ListingCard from "../../components/Rentals/ApartmentListings";
import NeighborhoodListings from "../../components/Rentals/NeighborhoodListings";
const Rentals = () => {
  return (
    <div className="min-h-screen ">
      {/* SubNav will automatically handle its visibility */}
      <RoommateSubNav />
      <HeroSection />
      <RecentRentals />
      <FeaturedRentals />
      <TrendingWeek />
      <RentalsByArea />
      <ExploreNearYou />
      <ListingCard />
      <NeighborhoodListings />
      <PropertyAgents />
    </div>
  );
};

export default Rentals;
