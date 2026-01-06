import React from 'react'
import HeroSection from '../../components/Cars/HeroSection'
import BrowseCategories from '../../components/Cars/BrowseCategories'
import FeaturedCars from '../../components/Cars/FeaturedCars'
import PostCars from '../../components/Cars/PostCars'
import CarListings from '../../components/Cars/CarListings'

const CarsPage = () => {
  return (
    <div>
      <HeroSection />
<BrowseCategories />
<FeaturedCars />
<PostCars />

<CarListings/>
    </div>
  )
}

export default CarsPage
