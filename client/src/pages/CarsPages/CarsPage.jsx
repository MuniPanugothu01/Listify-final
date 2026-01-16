import React from "react";
import HeroSection from "../../components/Cars/HeroSection";
import BrowseCategories from "../../components/Cars/BrowseCategories";
import FeaturedCars from "../../components/Cars/FeaturedCars";
import PostCars from "../../components/Cars/PostCars";
import CarListings from "../../components/Cars/CarListings";
import BrowseCategories2 from "../../components/Cars/BrowseCategories2";
import TrendingCars from "../../components/Cars/TrendingCars";
import WhyChooseUs from "../../components/Cars/WhyChooseUs";
import AllCarsCard from "../../components/Cars/AllCarsCard";
import HeroSection2 from "../../components/Cars/HeroSection2";
import CarsSubNav from "../../components/Cars/CarsSubNav";

const CarsPage = () => {
  return (
    <div>
      {/* <HeroSection /> */}
      <CarsSubNav/>
      <HeroSection2/>
      {/* <BrowseCategories /> */}
      <BrowseCategories2 />

      <FeaturedCars />
   
      <PostCars />
      <CarListings />
      <TrendingCars />
<WhyChooseUs/>


   {/* <AllCarsCard/> */}
    </div>
  );
};

export default CarsPage;
