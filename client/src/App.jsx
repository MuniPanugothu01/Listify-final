import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// CHANGED: Added GoogleOAuthProvider import
import { GoogleOAuthProvider } from "@react-oauth/google";

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
import OurServicesPage from "./pages/OurServices/OurServicesPage.jsx";

import PostaddPage from "./pages/PostaddPage/Postadd.jsx";
import TakeCare from "./pages/TakeCare/TakeCare.jsx";
import NannyService from "./components/TakeCare/NannyCareServices/NannyService.jsx";
import BabysitterService from "./components/TakeCare/BabysitterCareServices/BabysitterService.jsx";
import CookServices from "./components/TakeCare/CookServices/CookServices.jsx";
import HousekeeperServices from "./components/TakeCare/HousekeeperServices/HousekeeperServices.jsx";
import TutorServices from "./components/TakeCare/TutorServices/TutorServices.jsx";
import ElderCareServices from "./components/TakeCare/ElderCareServices/ElderCareServices.jsx";
import PetCareService from "./components/TakeCare/PetCareServices/PetCareServices.jsx";
import CareCenterServices from "./components/TakeCare/CareCenterServices/CareCenterServices.jsx";

import Electronics from "./components/Electronics/Electronics.jsx";
import ElectronicsListings from "./components/Electronics/ElectronicsListings.jsx";
import ElectronicsDetails from "./components/Electronics/ElectronicsDetails.jsx";

// For Sale
import ForSale from "./components/ForSale/ForSale.jsx";
import DetailForSale from "./components/ForSale/DetailForSale.jsx";

// Roommates
import Roommates from "./pages/Roommates/Roommates.jsx";
import RoomMateDetails from "./components/Roommates/RoomMateDetails.jsx";
import DetailsPage from "./components/Roommates/DetailsPage.jsx";

// Events
import Events from "./pages/Events/Events.jsx";
import EventDetailPage from "./components/Events/EventDetailPage.jsx";
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
import JobSeekerResume from "./components/Jobs/JobSeekerResume.jsx";
import JobSeekerResumesDetail from "./components/Jobs/JobSeekerResumesDetail.jsx";

// Services
import ServicesPage from "./pages/Services/ServicesPage.jsx";

// Cars categories
import CarsPage from "./pages/CarsPages/CarsPage.jsx";
import CarListing from "./components/Cars/CarListing.jsx";
import CarDetails from "./components/Cars/CarDetails.jsx";

// Profile
import Profile from "./pages/Home/Profile.jsx";

// ChatBot
import ChatBot from "./components/ChatBot.jsx";
import { ScrollProgress } from "./components/ui/scroll-progress.jsx";
import { Toaster } from "react-hot-toast";

// Get Google Client ID from environment
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//sample
import Sample from "./components/Sample/Sample.jsx";
import ProductDetail from "./components/Sample/ProductDetail.jsx";

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
  const location = useLocation();

  // Check if current route should hide navbar and footer
  const hideNavbarFooterPaths = [
    "/signup",
    "/signin",
    "/forgot-password",
    "/reset-password",
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

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navbar - Conditionally rendered */}
      {!shouldHideNavbarFooter && <Navbar />}

      {/* ScrollProgress - Only show on non-auth pages */}
      {!shouldHideNavbarFooter && <ScrollProgress />}

      {/* Main Content */}
      <main className="flex-grow">
        {/* CHANGED: Removed nested GoogleOAuthProvider wrapper */}
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

          {/*Sample */}

          <Route path="/product" element={<Sample />} />
          <Route path="/product/:id" element={<ProductDetail />} />

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
          <Route path="/our-services" element={<OurServicesPage />} />
          <Route path="/post-add" element={<PostaddPage />} />
          <Route path="/reviews" element={<Reviews />} />

          {/* TakeCare */}
          <Route path="/takecare" element={<TakeCare />} />
          <Route path="/takecare/:serviceId" element={<NannyService />} />
          <Route path="/takecare/babysitter" element={<BabysitterService />} />
          <Route path="/takecare/cook" element={<CookServices />} />
          <Route
            path="/takecare/housekeeper"
            element={<HousekeeperServices />}
          />
          <Route path="/takecare/tutor" element={<TutorServices />} />
          <Route path="/takecare/eldercare" element={<ElderCareServices />} />
          <Route path="/takecare/petcare" element={<PetCareService />} />
          <Route path="/takecare/carecenter" element={<CareCenterServices />} />

          {/* For Sale */}
          <Route path="/forsale" element={<ForSale />} />
          <Route path="/forsale/:id" element={<DetailForSale />} />

          {/* electronics*/}
          <Route path="/electronics" element={<Electronics />} />
          <Route
            path="/electronics-listings"
            element={<ElectronicsListings />}
          />
          <Route path="/electronics-details" element={<ElectronicsDetails />} />

          {/* Roommates */}
          <Route path="/roommates" element={<Roommates />} />
          <Route path="/roommate-details" element={<RoomMateDetails />} />
          <Route path="/details" element={<DetailsPage />} />

          {/* Rentals */}
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/rentals-listings" element={<RentalsListings />} />
          <Route path="/rental-details" element={<RentalDetailsPage />} />

          {/* Jobs */}
          <Route path="/jobs" element={<JobsPage />} />
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
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/events-list" element={<EventList />} />

          {/* Services Category */}
          <Route path="/services" element={<ServicesPage />} />

          {/* Cars categories */}
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/car-listings" element={<CarListing />} />
          <Route path="/car-details" element={<CarDetails />} />

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
    // CHANGED: Wrapped entire app with GoogleOAuthProvider here
    <GoogleOAuthProvider clientId={googleClientId || ""}>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
