import React from "react";
import HeroSection from "../../components/Cars/HeroSection.jsx";
import BrowseCategories from "../../components/Cars/BrowseCategories.jsx";
import FeaturedCars from "../../components/Cars/FeaturedCars.jsx";
import PostCars from "../../components/Cars/PostCars.jsx";
import CarListings from "../../components/Cars/CarListings.jsx";
import BrowseCategories2 from "../../components/Cars/BrowseCategories2.jsx";
import TrendingCars from "../../components/Cars/TrendingCars.jsx";
import WhyChooseUs from "../../components/Cars/WhyChooseUs.jsx";
import AllCarsCard from "../../components/Cars/AllCarsCard.jsx";
import HeroSection2 from "../../components/Cars/HeroSection2.jsx";
import CarsSubNav from "../../components/Cars/CarsSubNav.jsx";

import VehicleHero from "../../components/Vehicles/HeroVehicles.jsx";
import VehiclesListing from "../../components/Cars/VehiclesListing.jsx";

const VehiclePage = () => {
  return (
    <div>
      {/* <HeroSection /> */}
      {/* <CarsSubNav/> */}
      <VehicleHero />

      <VehiclesListing />

      {/* <BrowseCategories /> */}
      {/* <BrowseCategories2 /> */}

      {/* <FeaturedCars /> */}

      {/* <PostCars /> */}
      {/* <CarListings /> */}
      {/* <TrendingCars /> */}
      {/* <WhyChooseUs/> */}

      {/* <AllCarsCard/> */}
    </div>
  );
};

export default VehiclePage;
