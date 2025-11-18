import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Home/Navbar.jsx";
import HeroSection from "./pages/Home/HeroSection.jsx";
import Heading from "./pages/Home/Heading.jsx";
import TrendingCategories from "./pages/Home/TrendingCategories.jsx";
import WhyUs from "./pages/Home/WhyUs.jsx";
import Questions from "./pages/Home/Questions.jsx";
import Reviews from "./pages/Home/Reviews.jsx";
import Footer from "./pages/Home/Footer.jsx";
import Gallery from "./pages/Home/Gallery.jsx";

// ✅ Import Roommates page
import Roommates from "./pages/Roommates/Roommates.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              <HeroSection />
              <Heading />
              <Gallery />
              <TrendingCategories />
              <WhyUs />
              <Reviews />
              <Questions />
              <Footer />
            </>
          } />
          
          {/* Roommates Route */}
          <Route path="/roommates" element={<Roommates />} />
          
          {/* Add other routes as needed */}
          <Route path="/rentals" element={<div>Rentals Page</div>} />
          <Route path="/jobs" element={<div>Jobs Page</div>} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/marketplace" element={<div>Marketplace Page</div>} />
          <Route path="/vehicles" element={<div>Vehicles Page</div>} />
          <Route path="/takecare" element={<div>TakeCare Page</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;