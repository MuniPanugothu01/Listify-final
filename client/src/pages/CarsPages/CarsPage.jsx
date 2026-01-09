import React from "react";
import HeroSection from "../../components/Cars/HeroSection";
import BrowseCategories from "../../components/Cars/BrowseCategories";
import FeaturedCars from "../../components/Cars/FeaturedCars";
import PostCars from "../../components/Cars/PostCars";
import CarListings from "../../components/Cars/CarListings";
import BrowseCategories2 from "../../components/Cars/BrowseCategories2";

const CarsPage = () => {
  return (
    <div>
      <HeroSection />
      {/* <BrowseCategories /> */}
      <BrowseCategories2 />

      <FeaturedCars />
      <PostCars />

      <CarListings />
    </div>
  );
};

export default CarsPage;
