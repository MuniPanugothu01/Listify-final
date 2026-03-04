import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useTokenRefresh } from "./hooks/useTokenRefresh";

// Import Loading Spinner Component
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import PageTransitionLoader from "./components/common/PageTransitionLoader.jsx";

// ── Critical path (always loaded) ──
import Navbar from "./components/UserProfile/Navbar.jsx";
import Hero from "./pages/Home/Hero.jsx";
import Category from "./pages/Home/Category.jsx";
import WhyUs from "./pages/Home/WhyUs.jsx";
import HowItWorks from "./pages/Home/HowItWorks.jsx";
import Questions from "./pages/Home/Questions.jsx";
import Reviews from "./pages/Home/Reviews.jsx";
import Footer from "./pages/Home/Footer.jsx";

// ── Lazy-loaded routes (code-split for faster initial load) ──
const SignUp = lazy(() => import("./components/auth/SignUp.jsx"));
const Login = lazy(() => import("./components/auth/Login.jsx"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./components/auth/ResetPassword.jsx"));
const ResetOtp = lazy(() => import("./components/auth/ResetOtp.jsx"));

const ContactUs = lazy(() => import("./pages/ContactPage/ContactUS.jsx"));
const AboutUs = lazy(() => import("./pages/AboutPage/AboutUs.jsx"));
const OurServices = lazy(() => import("./pages/OurServices/OurServices.jsx"));

const Postadd = lazy(() => import("./pages/Postadd/Postadd.jsx"));
const EditListing = lazy(() => import("./pages/Postadd/EditListing.jsx"));

const TakeCare = lazy(() => import("./pages/TakeCare/TakeCare.jsx"));
const TakeCareDetail = lazy(() => import("./components/TakeCare/TakeCareDetail.jsx"));

const Electronics = lazy(() => import("./pages/Electronics/Electronics.jsx"));
const ElectronicsDetail = lazy(() => import("./components/Electronics/ElectronicsDetail.jsx"));

const ForSale = lazy(() => import("./components/ForSale/ForSale.jsx"));
const ForSaleDetail = lazy(() => import("./components/ForSale/ForSaleDetail.jsx"));

const Roommates = lazy(() => import("./pages/Roommates/Roommates.jsx"));
const RoomMateDetails = lazy(() => import("./components/Roommates/RoomMateDetails.jsx"));
const DetailsPage = lazy(() => import("./components/Roommates/DetailsPage.jsx"));

const Events = lazy(() => import("./pages/Events/Events.jsx"));
const EventsDetail = lazy(() => import("./components/Events/EventsDetail.jsx"));

const Rentals = lazy(() => import("./pages/Rentals/Rentals.jsx"));
const RentalsListings = lazy(() => import("./components/Rentals/RentalsListings.jsx"));
const RentalDetailsPage = lazy(() => import("./components/Rentals/RentalDetailsPage.jsx"));

const Jobs = lazy(() => import("./pages/Jobs/Jobs.jsx"));
const JobSearchPortal = lazy(() => import("./components/Jobs/JobSearchPortal.jsx"));
const JobDetailsPage = lazy(() => import("./components/Jobs/JobDetailsPage.jsx"));
const JobSeekerInterface = lazy(() => import("./components/Jobs/JobSeekerInterface.jsx"));
const JobSeekerResume = lazy(() => import("./components/Jobs/JobSeekerResume.jsx"));
const JobSeekerResumesDetail = lazy(() => import("./components/Jobs/JobSeekerResumesDetail.jsx"));

const Services = lazy(() => import("./pages/Services/Services.jsx"));

const Vehicles = lazy(() => import("./pages/Vehicles/Vehicles.jsx"));
const VehicleDetail = lazy(() => import("./components/Vehicles/VehicleDetail.jsx"));

const Profile = lazy(() => import("./pages/Home/Profile.jsx"));

// ── Always loaded ──
import ChatBot from "./components/ChatBot.jsx";
import { ScrollProgress } from "./components/ui/scroll-progress.jsx";
import { SocketProvider } from "./hooks/useSocket.jsx";
import { Toaster, ToastBar } from "react-hot-toast";

// Suspense fallback for lazy routes
const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <LoadingSpinner text="Loading..." />
  </div>
);

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

  // Proactive background token refresh — keeps the user logged in
  // as long as the refresh token (7 days) is valid
  useTokenRefresh();

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
    "/edit-listing",
    "/dashboard",
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
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fefefa",
              color: "#1a1a1a",
              padding: "14px 20px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              maxWidth: "420px",
              lineHeight: "1.5",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
              },
              style: {
                borderLeft: "4px solid #16a34a",
              },
            },
            error: {
              duration: 4500,
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
              style: {
                borderLeft: "4px solid #dc2626",
              },
            },
          }}
        >
          {(t) => (
            <div
              style={{
                animation: t.visible
                  ? "toastEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                  : "toastExit 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              <ToastBar toast={t} />
            </div>
          )}
        </Toaster>
        <PageTransitionLoader>
        <Suspense fallback={<RouteFallback />}>
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
          <Route path="/edit-listing/:type/:id" element={<EditListing />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
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
          

          {/* Profile / Dashboard */}
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/dashboard/:section" element={<Profile />} />

          {/* Placeholder Pages */}
          <Route path="/marketplace" element={<div>Marketplace Page</div>} />
          <Route path="/cares" element={<div>Cares Page</div>} />
          <Route path="/blogs" element={<div>Blogs Page</div>} />
          <Route path="/forums" element={<div>Forums Page</div>} />
          <Route path="/community" element={<div>Community Page</div>} />
          <Route path="/my-listings" element={<div>My Listings Page</div>} />

          <Route
            path="/notifications"
            element={<div>Notifications Page</div>}
          />
          <Route path="/settings" element={<div>Settings Page</div>} />

          {/* 404 Catch-all */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                <p className="text-gray-600 mb-6">Page not found</p>
                <a href="/" className="px-6 py-3 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] transition-colors">
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
        </Suspense>
        </PageTransitionLoader>
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
        <SocketProvider>
          <ScrollToTop />
          <AppContent />
        </SocketProvider>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
