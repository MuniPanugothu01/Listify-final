import React from "react";
import HeroSection from "../../components/Cars/HeroSection";
import BrowseCategories from "../../components/Cars/BrowseCategories";
import FeaturedCars from "../../components/Cars/FeaturedCars";
import PostCars from "../../components/Cars/PostCars";
import CarListings from "../../components/Cars/CarListings";
import BrowseCategories2 from "../../components/Cars/BrowseCategories2";
import TrendingCars from "../../components/Cars/TrendingCars";

const CarsPage = () => {
  return (
    <div>
      <HeroSection />
      {/* <BrowseCategories /> */}
      <BrowseCategories2 />

      <FeaturedCars />
      <PostCars />
      <CarListings />
      <TrendingCars />

    </div>
  );
};

export default CarsPage;
