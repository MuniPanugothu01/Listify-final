import React from 'react'
import Navbar from './pages/Home/Navbar.jsx';
import HeroSection from './pages/Home/HeroSection.jsx';
import Heading from './pages/Home/Heading.jsx';
import TrendingCategories from './pages/Home/TrendingCategories.jsx';
import WhyUs from './pages/Home/WhyUs.jsx';
import Questions from './pages/Home/Questions.jsx';
import Reviews from './pages/Home/Reviews.jsx';
import Footer from './pages/Home/Footer.jsx';
import Gallery from './pages/Home/Gallery.jsx';

const App = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Heading/>
      <Gallery/>
      <TrendingCategories/>
      <WhyUs/>
      <Reviews/>
      <Questions/>
      <Footer/>
    </div>
  )
}

export default App
