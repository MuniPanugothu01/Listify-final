import React from 'react'
import HeroSection from './pages/Home/HeroSection.jsx';
import Heading from './pages/Home/Heading.jsx';
import TrendingCategories from './pages/Home/TrendingCategories.jsx';
import WhyUs from './pages/Home/WhyUs.jsx';
import Questions from './pages/Home/Questions.jsx';
import Reviews from './pages/Reviews.jsx';

const App = () => {
  return (
    <div>
      <HeroSection/>
      <Heading/>
      <TrendingCategories/>
      <WhyUs/>
      <Reviews/>
      <Questions/>
    </div>
  )
}

export default App
