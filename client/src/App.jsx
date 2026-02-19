import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Import Loading Spinner Component
import LoadingSpinner from "./components/LoadingSpinner.jsx"; // Make sure path is correct

import Navbar from "./pages/Home/Navbar.jsx";
import Hero from "./pages/Home/Hero.jsx";
import Heading from "./pages/Home/Heading.jsx";
import Category from "./pages/Home/Category.jsx";
import WhyUs from "./pages/Home/WhyUs.jsx";
import HowItWorks from "./pages/Home/HowItWorks.jsx";
import Questions from "./pages/Home/Questions.jsx";
import Reviews from "./pages/Home/Reviews.jsx";
import Footer from "./pages/Home/Footer.jsx";

// signin page
import SignUp from "./components/auth/SignUp.jsx";
import Login from "./components/auth/Login.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import ResetOtp from "./components/auth/ResetOtp.jsx";

import ContactUs from "./pages/ContactPage/ContactUS.jsx";
import AboutUs from "./pages/AboutPage/AboutUs.jsx";
import OurServices from "./pages/OurServices/OurServices.jsx";

import Postadd from "./pages/PostAdd/Postadd.jsx";


import TakeCare from "./pages/TakeCare/TakeCare.jsx";
import TakeCareDetail from "./components/TakeCare/TakeCareDetail.jsx";


// Electronics
import Electronics from "./pages/Electronics/Electronics.jsx";
import ElectronicsDetail from "./components/Electronics/ElectronicsDetail.jsx";


// For Sale
import ForSale from "./pages/ForSale/ForSale.jsx";
import ForSaleDetail from "./components/ForSale/ForsaleDetail.jsx";

// Roommates
import Roommates from "./pages/Roommates/Roommates.jsx";
import RoomMateDetails from "./components/Roommates/RoomMateDetails.jsx";
import DetailsPage from "./components/Roommates/DetailsPage.jsx";

// Events
import Events from "./pages/Events/Events.jsx";
import EventsDetail from "./components/Events/EventsDetail.jsx";


// Rentals
import Rentals from "./pages/Rentals/Rentals.jsx";
import RentalsListings from "./components/Rentals/RentalsListings.jsx";
import RentalDetailsPage from "./components/Rentals/RentalDetailsPage.jsx";

// Jobs
import Jobs from "./pages/Jobs/Jobs.jsx";
import JobSearchPortal from "./components/Jobs/JobSearchPortal.jsx";
import JobDetailsPage from "./components/Jobs/JobDetailsPage.jsx";
import JobSeekerInterface from "./components/Jobs/JobSeekerInterface.jsx";
import JobSeekerResume from "./components/Jobs/JobSeekerResume.jsx";
import JobSeekerResumesDetail from "./components/Jobs/JobSeekerResumesDetail.jsx";

// Services
import Services from "./pages/Services/Services.jsx";

// Cars categories
import Vehicles from "./pages/Vehicles/Vehicles.jsx";
import VehicleDetail from "./components/Vehicles/VehicleDetail.jsx";


// Profile
import Profile from "./pages/Home/Profile.jsx";

// ChatBot
import ChatBot from "./components/ChatBot.jsx";
import { ScrollProgress } from "./components/ui/scroll-progress.jsx";
import { Toaster } from "react-hot-toast";

// Get Google Client ID from environment
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;



// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App Component with route-based rendering
const AppContent = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Initial app loading
  useEffect(() => {
    // Simulate initial app loading (you can remove this and set isLoading to false if not needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Check if current route should hide navbar and footer
  const hideNavbarFooterPaths = [
    "/signup",
    "/signin",
    "/forgot-password",
    "/reset-password",
    "/post-add",
  ];

  const shouldHideNavbarFooter = hideNavbarFooterPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  // Handle scroll to top button visibility
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

  // Show loading spinner during initial app load
  if (isLoading) {
    return <LoadingSpinner text="Loading..." />;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navbar - Conditionally rendered */}
      {!shouldHideNavbarFooter && <Navbar />}

      {/* ScrollProgress - Only show on non-auth pages */}
      {!shouldHideNavbarFooter && <ScrollProgress />}

      {/* Main Content */}
      <main className="flex-grow">
        <Toaster position="top-right" />
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                {/* <Heading /> */}
                <Category />
                <WhyUs />
                <HowItWorks />
                <Reviews />
                <Questions />
              </>
            }
          />

          {/* Authentication Pages (no navbar/footer) */}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-otp" element={<ResetOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/faq" element={<Questions />} />

          {/* Contact & About Pages */}
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/post-add" element={<Postadd />} />
          <Route path="/reviews" element={<Reviews />} />

          {/* TakeCare */}
          <Route path="/takecare" element={<TakeCare />} />
          <Route path="/takecare/:id" element={<TakeCareDetail />} />
          {/* For Sale */}
          <Route path="/forsale" element={<ForSale />} />
          <Route path="/forsale/:id" element={<ForSaleDetail />} />

          {/* electronics*/}
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/electronics/:id" element={<ElectronicsDetail />} />
      

          {/* Roommates */}
          <Route path="/roommates" element={<Roommates />} />
          <Route path="/roommate-details" element={<RoomMateDetails />} />
          <Route path="/details" element={<DetailsPage />} />

          {/* Rentals */}
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/rentals-listings" element={<RentalsListings />} />
          <Route path="/rental-details" element={<RentalDetailsPage />} />

          {/* Jobs */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job-search" element={<JobSearchPortal />} />
          <Route path="/job-details/:id" element={<JobDetailsPage />} />
          <Route path="/job-seekers" element={<JobSeekerInterface />} />
          <Route
            path="/job-seeker-resumes"
            element={<JobSeekerResumesDetail />}
          />
          <Route path="/job-seeker-posts" element={<JobSeekerResume />} />

          {/* Events */}
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventsDetail />} />


          {/* Services Category */}
          <Route path="/services" element={<Services />} />

          {/* Cars categories */}
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          

          {/* Profile */}
          <Route path="/dashboard" element={<Profile />} />

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
      </main>

      {/* Footer - Conditionally rendered */}
      {!shouldHideNavbarFooter && <Footer />}

      {/* Floating ChatBot Button - Only show on non-auth pages */}
      {!shouldHideNavbarFooter && (
        <div className="fixed bottom-6 right-8 z-50 flex flex-col items-end space-y-4 ">
          <div
            className={`transition-all duration-500 ${
              showScrollTop ? "translate-y-0" : "translate-y-2"
            }`}
          >
            <ChatBot />
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Wrapper
const App = () => {
  return (
    <GoogleOAuthProvider clientId={googleClientId || ""}>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;