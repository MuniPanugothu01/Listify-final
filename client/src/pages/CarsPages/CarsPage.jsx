import React from 'react'
import HeroSection from '../../components/Cars/HeroSection'
import BrowseCategories from '../../components/Cars/BrowseCategories'
import FeaturedCars from '../../components/Cars/FeaturedCars'
import PostCars from '../../components/Cars/PostCars'

const CarsPage = () => {
  return (
    <div>
      <HeroSection />
<BrowseCategories />
<FeaturedCars />
<PostCars />
    </div>
  )
}

export default CarsPage
