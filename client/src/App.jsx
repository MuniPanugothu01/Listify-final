import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./pages/Home/Navbar.jsx";
import HeroSection from "./pages/Home/HeroSection.jsx";
import Heading from "./pages/Home/Heading.jsx";
import TrendingCategories from "./pages/Home/TrendingCategories.jsx";
import WhyUs from "./pages/Home/WhyUs.jsx";
import Questions from "./pages/Home/Questions.jsx";
import Reviews from "./pages/Home/Reviews.jsx";
import Footer from "./pages/Home/Footer.jsx";
import Gallery from "./pages/Home/Gallery.jsx";

// Import Roommates pages
import Roommates from "./pages/Roommates/Roommates.jsx";
import RoomMateDetails from "./components/Roommates/RoomMateDetails.jsx";
import DetailsPage from "./components/Roommates/DetailsPage.jsx"
import Events from "./pages/Events/Events.jsx";
import ChatBot from "./components/ChatBot.jsx";

import EventDetailPage from "./components/Events/EventDetailPage.jsx";



// Component to conditionally render Footer
const Layout = ({ children }) => {
  const location = useLocation();
  
  // List of paths where footer should NOT be shown
  const noFooterPaths = [
    '/login',
    '/signup',
    '/profile',
    '/auth/login',
    '/auth/signup',
    '/user/profile'
  ];

  // Check if current path should hide footer
  const shouldShowFooter = !noFooterPaths.some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <>
      {children}
      {shouldShowFooter && <Footer />}
    </>
  );
};

const App = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Enhanced scroll to top function with progress tracking
  const scrollToTop = () => {
    setIsScrolling(true);
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    const scroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 600, 1); // 600ms duration

      // Easing function for smooth scroll
      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition * (1 - easeInOutCubic));

      if (progress < 1) {
        requestAnimationFrame(scroll);
      } else {
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(scroll);
  };

  // Enhanced scroll detection with throttle
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const updateScrollTop = () => {
      const scrollY = window.pageYOffset;
      const viewportHeight = window.innerHeight;

      // Show after 1.5 viewport heights (earlier than before for better UX)
      const shouldShow = scrollY > viewportHeight * 1.5;

      // Add fade effect based on scroll position
      if (shouldShow !== showScrollTop) {
        setShowScrollTop(shouldShow);
      }

      ticking = false;
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateScrollTop);
        ticking = true;
      }
    };

    // Throttled scroll event
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScrollTop]);

  return (
    <Router>
      <div className="relative">
        <Navbar />

        {/* Wrap all routes with Layout component */}
        <Layout>
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Heading />
                  <Gallery />
                  <TrendingCategories />
                  <WhyUs />
                  <Reviews />
                  <Questions />
                </>
              }
            />

            {/* Roommates Routes */}
            <Route path="/roommates" element={<Roommates />} />
            <Route path="/roommate-details" element={<RoomMateDetails />} />
            <Route path="/details" element={<DetailsPage />} />
            
            {/* Events Routes */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />

          

            {/* Add other routes as needed */}
            <Route path="/rentals" element={<div>Rentals Page</div>} />
            <Route path="/jobs" element={<div>Jobs Page</div>} />
            <Route path="/services" element={<div>Services Page</div>} />
            <Route path="/marketplace" element={<div>Marketplace Page</div>} />
            <Route path="/vehicles" element={<div>Vehicles Page</div>} />
            <Route path="/takecare" element={<div>TakeCare Page</div>} />
          </Routes>
        </Layout>

        {/* Floating Action Buttons Container */}
        <div className="fixed bottom-6 right-8 z-50 flex flex-col items-end space-y-4">
          
          {/* Scroll to Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              disabled={isScrolling}
              className={`
                group relative
                w-12 h-12
                bg-gradient-to-br from-[#25676D] to-[#1a4d52]
                text-white
                rounded-2xl
                shadow-2xl
                hover:shadow-3xl
                border border-white/20
                transition-all duration-300 ease-out
                transform hover:scale-105 hover:-translate-y-1
                flex items-center justify-center
                backdrop-blur-sm
                ${isScrolling ? "opacity-80 cursor-not-allowed" : "opacity-100"}
              `}
              aria-label="Back to Top"
            >
              {/* Main Icon */}
              <svg
                className={`
                  w-6 h-6 transition-all duration-300
                  ${
                    isScrolling
                      ? "animate-bounce"
                      : "group-hover:-translate-y-0.5"
                  }
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

              {/* Tooltip */}
              <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                Back to Top
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>

              {/* Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}

          {/* ChatBot Component - Positioned below scroll button */}
          <div className={`transition-all duration-500 ${showScrollTop ? 'translate-y-0' : 'translate-y-2'}`}>
            <ChatBot />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;