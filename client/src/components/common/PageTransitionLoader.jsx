import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransitionLoader
 * ---
 * Shows a slim top progress bar + gentle page skeleton overlay
 * during route transitions, then fades in the real content.
 *
 * Wrap your <Routes> with this component in App.jsx.
 */

// ── Top progress bar ────────────────────────────────────────────────────
const TopProgressBar = ({ isLoading }) => (
  <div
    className={`fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none transition-opacity duration-300 ${
      isLoading ? 'opacity-100' : 'opacity-0'
    }`}
  >
    <div
      className={`h-full bg-gradient-to-r from-[#27bb97] via-[#34d1a8] to-[#27bb97] ${
        isLoading ? 'animate-progress-bar' : ''
      }`}
    />
  </div>
);

// ── Full-page skeleton shown during route transition ────────────────────
const PageSkeleton = () => (
  <div className="min-h-[60vh] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
    {/* Hero placeholder */}
    <div className="w-full h-48 sm:h-64 md:h-72 bg-gray-200 rounded-xl skeleton-shimmer" />

    {/* Breadcrumb */}
    <div className="flex items-center gap-2">
      <div className="h-4 w-14 bg-gray-200 rounded skeleton-shimmer" />
      <div className="h-4 w-4 bg-gray-200 rounded skeleton-shimmer" />
      <div className="h-4 w-28 bg-gray-200 rounded skeleton-shimmer" />
    </div>

    {/* Content area */}
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar placeholder */}
      <div className="hidden lg:block w-72 space-y-4">
        <div className="h-6 w-20 bg-gray-200 rounded skeleton-shimmer" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded skeleton-shimmer" style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
        <div className="h-10 bg-gray-200 rounded-lg skeleton-shimmer mt-4" />
      </div>

      {/* Main grid placeholder */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-40 bg-gray-200 rounded skeleton-shimmer" />
          <div className="h-10 w-44 bg-gray-200 rounded-lg skeleton-shimmer" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div className="h-36 sm:h-44 bg-gray-200 skeleton-shimmer" />
              <div className="p-3 space-y-2.5">
                <div className="h-3.5 bg-gray-200 rounded-full skeleton-shimmer w-[85%]" />
                <div className="h-3.5 bg-gray-200 rounded-full skeleton-shimmer w-[55%]" />
                <div className="h-5 bg-gray-200 rounded-full skeleton-shimmer w-[35%]" />
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-gray-200 rounded-full skeleton-shimmer" />
                  <div className="h-3 bg-gray-200 rounded-full skeleton-shimmer w-[45%]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── Main component ──────────────────────────────────────────────────────
const PageTransitionLoader = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const prevPathRef = useRef(location.pathname);
  const timerRef = useRef(null);

  useEffect(() => {
    // Skip on initial render (same path)
    if (prevPathRef.current === location.pathname) return;

    prevPathRef.current = location.pathname;

    // Clear any pending timers
    if (timerRef.current) clearTimeout(timerRef.current);

    // Start transition — show skeleton
    setIsTransitioning(true);
    setShowContent(false);

    // Brief delay to let the skeleton be visible, then reveal content
    timerRef.current = setTimeout(() => {
      setShowContent(true);

      // Fade out progress bar slightly after content appears
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 450); // ← skeleton visible for ~450ms — just enough to feel smooth

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  return (
    <>
      <TopProgressBar isLoading={isTransitioning} />

      {/* Skeleton overlay during transition */}
      {!showContent && (
        <div className="page-transition-skeleton">
          <PageSkeleton />
        </div>
      )}

      {/* Actual page content */}
      <div
        className={`transition-opacity duration-300 ease-out ${
          showContent ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default PageTransitionLoader;
