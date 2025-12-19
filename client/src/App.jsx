import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./pages/Home/Navbar.jsx";
import HeroSection from "./pages/Home/HeroSection.jsx";
import Heading from "./pages/Home/Heading.jsx";
import TrendingCategories from "./pages/Home/TrendingCategories.jsx";
import WhyUs from "./pages/Home/WhyUs.jsx";
import Questions from "./pages/Home/Questions.jsx";
import Reviews from "./pages/Home/Reviews.jsx";
import Footer from "./pages/Home/Footer.jsx";
import Gallery from "./pages/Home/Gallery.jsx";

import ContactUs from "./pages/ContactPage/ContactUS.jsx";
import AboutUs from "./pages/AboutPage/AboutUs.jsx";
import ServicesPage from "./pages/Services/ServicesPage.jsx";
import PostaddPage from "./pages/PostaddPage/Postadd.jsx";
import TakeCare from "./pages/TakeCare/TakeCare.jsx";

// Roommates
import Roommates from "./pages/Roommates/Roommates.jsx";
import RoomMateDetails from "./components/Roommates/RoomMateDetails.jsx";
import DetailsPage from "./components/Roommates/DetailsPage.jsx";

// Events
import Events from "./pages/Events/Events.jsx";
import EventDetailPage from "./components/Events/EventDetailPage.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import EventList from "./components/Events/EventList.jsx";

// Rentals
import Rentals from "./pages/Rentalspage/Rentals";
import RentalsListings from "./components/Rentals/RentalsListings.jsx";
import RentalDetailsPage from "./components/Rentals/RentalDetailsPage.jsx";

// Jobs
import JobsPage from "./pages/JobsPage/JobsPage.jsx";
import JobSearchPortal from "./components/Jobs/JobSearchPortal.jsx";
import JobDetailsPage from "./components/Jobs/JobDetailsPage.jsx";
import JobSeekerInterface from "./components/Jobs/JobSeekerInterface.jsx";
import JobSeekerResume from "./components/Jobs/JobSeekerResume.jsx"; // Job seeker profile page
import JobSeekerResumesDetail from "./components/Jobs/JobSeekerResumesDetail.jsx"; // Job seeker listings page

// Profile
import Profile from "./pages/Home/Profile.jsx";

// ChatBot
import ChatBot from "./components/ChatBot.jsx";

// Layout wrapper for Footer visibility
const Layout = ({ children }) => {
  const location = useLocation();

  const noFooterPaths = [
    "/login",
    "/signup",
    "/profile",
    "/auth/login",
    "/auth/signup",
    "/user/profile",
  ];

  const shouldShowFooter = !noFooterPaths.some((path) =>
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

  // Smooth scroll to top
  const scrollToTop = () => {
    setIsScrolling(true);
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    const scroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 600, 1);

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

  useEffect(() => {
    let ticking = false;

    const updateScrollTop = () => {
      const scrollY = window.pageYOffset;
      const viewportHeight = window.innerHeight;

      const shouldShow = scrollY > viewportHeight * 1.5;

      if (shouldShow !== showScrollTop) {
        setShowScrollTop(shouldShow);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollTop);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScrollTop]);

  return (
    <Router>
      <div className="relative">
        <Navbar />

        <Layout>
          <Routes>
            {/* Home */}
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
            {/* Contacts Page */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/our-services" element={<ServicesPage />} />
            <Route path="/post-add" element={<PostaddPage />} />
            <Route path="/our-services" element={<ServicesPage/>} />
            <Route path="/post-add" element={<PostaddPage/>} />
            <Route path="/takecare" element={<TakeCare/>} />

            {/* Roommates */}
            <Route path="/roommates" element={<Roommates />} />
            <Route path="/roommate-details" element={<RoomMateDetails />} />
            <Route path="/details" element={<DetailsPage />} />
            {/* Rentals */}
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/rentals-details" element={<RentalsListings />} />
            <Route path="/details" element={<RentalDetailsPage />} />
            {/* Jobs */}
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/job-search" element={<JobSearchPortal />} />
            <Route path="/job-details/:id" element={<JobDetailsPage />} />
            <Route path="/job-seekers" element={<JobSeekerInterface />} />
            {/* Job Seeker Resumes Routes - FIXED */}
            <Route path="/job-seeker-resumes" element={<JobSeekerResumesDetail />} />
            <Route path="/job-seeker-posts" element={<JobSeekerResume />} />



            {/* Events */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            <Route path="/event-details" element={<EventDetails />} />
            <Route path="/events-list" element={<EventList />} />
            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
            {/* Placeholder Pages */}
            <Route path="/marketplace" element={<div>Marketplace Page</div>} />
            <Route path="/vehicles" element={<div>Vehicles Page</div>} />
            <Route path="/takecare" element={<div>TakeCare Page</div>} />
            <Route path="/cares" element={<div>Cares Page</div>} />
            <Route path="/blogs" element={<div>Blogs Page</div>} />
            <Route path="/forums" element={<div>Forums Page</div>} />
            <Route path="/community" element={<div>Community Page</div>} />
            <Route path="/my-listings" element={<div>My Listings Page</div>} />
            <Route path="/messages" element={<div>Messages Page</div>} />
            <Route
              path="/notifications"
              element={<div>Notifications Page</div>}
            />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </Layout>

        {/* Floating Buttons */}
        <div className="fixed bottom-6 right-8 z-50 flex flex-col items-end space-y-4">
          <div
            className={`transition-all duration-500 ${
              showScrollTop ? "translate-y-0" : "translate-y-2"
            }`}
          >
            <ChatBot />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;