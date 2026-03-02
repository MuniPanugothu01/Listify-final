import React from 'react';

// Base skeleton shimmer component
const Skeleton = ({ className = '', rounded = 'rounded', ...props }) => (
  <div
    className={`skeleton-shimmer bg-gray-200 ${rounded} ${className}`}
    {...props}
  />
);

// ─── Product Card Skeleton (Electronics) ─────────────────────────────────
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 animate-pulse">
    {/* Image placeholder */}
    <div className="relative h-40 sm:h-48 bg-gray-200 skeleton-shimmer" />

    <div className="p-3 space-y-3">
      {/* Title */}
      <div className="space-y-1.5">
        <div className="h-3.5 bg-gray-200 rounded-full skeleton-shimmer w-[90%]" />
        <div className="h-3.5 bg-gray-200 rounded-full skeleton-shimmer w-[60%]" />
      </div>

      {/* Price */}
      <div className="h-5 bg-gray-200 rounded-full skeleton-shimmer w-[40%]" />

      {/* Location */}
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 bg-gray-200 rounded-full skeleton-shimmer" />
        <div className="h-3 bg-gray-200 rounded-full skeleton-shimmer w-[50%]" />
      </div>

      {/* Date */}
      <div className="h-2.5 bg-gray-200 rounded-full skeleton-shimmer w-[30%]" />
    </div>
  </div>
);

// ─── Vehicle Card Skeleton ───────────────────────────────────────────────
export const VehicleCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 animate-pulse">
    {/* Image placeholder with aspect ratio */}
    <div className="relative pt-[75%] bg-gray-200 skeleton-shimmer" />

    <div className="p-3 space-y-3">
      {/* Vehicle specs row */}
      <div className="flex items-center gap-2">
        <div className="h-3 bg-gray-200 rounded-full skeleton-shimmer w-[20%]" />
        <div className="h-3 bg-gray-200 rounded-full skeleton-shimmer w-[25%]" />
        <div className="h-3 bg-gray-200 rounded-full skeleton-shimmer w-[20%]" />
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <div className="h-3.5 bg-gray-200 rounded-full skeleton-shimmer w-[85%]" />
        <div className="h-3.5 bg-gray-200 rounded-full skeleton-shimmer w-[55%]" />
      </div>

      {/* Price + condition */}
      <div className="flex items-center justify-between">
        <div className="h-5 bg-gray-200 rounded-full skeleton-shimmer w-[35%]" />
        <div className="h-5 bg-gray-200 rounded-full skeleton-shimmer w-[25%]" />
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 bg-gray-200 rounded-full skeleton-shimmer" />
        <div className="h-3 bg-gray-200 rounded-full skeleton-shimmer w-[50%]" />
      </div>

      {/* Date */}
      <div className="h-2.5 bg-gray-200 rounded-full skeleton-shimmer w-[28%]" />
    </div>
  </div>
);

// ─── Product Listing Grid Skeleton ───────────────────────────────────────
export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// ─── Vehicle Listing Grid Skeleton ───────────────────────────────────────
export const VehicleGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <VehicleCardSkeleton key={i} />
    ))}
  </div>
);

// ─── Detail Page Skeleton ────────────────────────────────────────────────
export const DetailPageSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Navigation skeleton */}
    <div className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 sm:h-16 gap-2">
          <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-20" />
          <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-4" />
          <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-40" />
        </div>
      </div>
    </div>

    {/* Content skeleton */}
    <div className="px-4 sm:px-8 lg:px-8 py-6 lg:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-6">
        {/* Left Column - Image gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main image */}
          <div className="rounded-md overflow-hidden bg-white shadow-sm">
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-200 skeleton-shimmer" />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-32 h-24 rounded-md bg-gray-200 skeleton-shimmer" />
            ))}
          </div>

          {/* Map skeleton */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
            <div className="p-4 space-y-2">
              <div className="h-5 bg-gray-200 rounded skeleton-shimmer w-28" />
              <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-44" />
            </div>
            <div className="h-64 sm:h-72 bg-gray-200 skeleton-shimmer" />
          </div>

          {/* Description skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
            <div className="h-6 bg-gray-200 rounded skeleton-shimmer w-48" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-full" />
              <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-[95%]" />
              <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-[80%]" />
              <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-[70%]" />
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-7 bg-gray-200 rounded skeleton-shimmer w-[85%]" />
                <div className="h-7 bg-gray-200 rounded skeleton-shimmer w-[55%]" />
              </div>

              {/* Price label */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded skeleton-shimmer w-24" />
                <div className="h-10 bg-gray-200 rounded skeleton-shimmer w-36" />
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full skeleton-shimmer" />
                <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-32" />
              </div>

              {/* Seller skeleton */}
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-gray-200 rounded skeleton-shimmer w-40" />
                  <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-24" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full skeleton-shimmer" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-28" />
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-gray-200 rounded skeleton-shimmer" />
                      ))}
                    </div>
                    <div className="h-3 bg-gray-200 rounded skeleton-shimmer w-32" />
                  </div>
                </div>
              </div>

              {/* Action buttons skeleton */}
              <div className="space-y-3 mt-2">
                <div className="h-14 bg-gray-200 rounded-lg skeleton-shimmer" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-12 bg-gray-200 rounded-lg skeleton-shimmer" />
                  <div className="h-12 bg-gray-200 rounded-lg skeleton-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar items skeleton */}
      <div className="mt-16 space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-7 bg-gray-200 rounded skeleton-shimmer w-52" />
          <div className="h-5 bg-gray-200 rounded skeleton-shimmer w-20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200 skeleton-shimmer" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded skeleton-shimmer w-[75%]" />
                <div className="space-y-1.5">
                  <div className="h-3.5 bg-gray-200 rounded skeleton-shimmer w-full" />
                  <div className="h-3.5 bg-gray-200 rounded skeleton-shimmer w-[60%]" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-7 bg-gray-200 rounded skeleton-shimmer w-24" />
                  <div className="h-6 bg-gray-200 rounded-full skeleton-shimmer w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Filter Sidebar Skeleton ─────────────────────────────────────────────
export const FilterSidebarSkeleton = () => (
  <div className="animate-pulse space-y-6">
    {/* Title */}
    <div className="h-6 bg-gray-200 rounded skeleton-shimmer w-20" />

    {/* Price range */}
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-24" />
      <div className="flex gap-2">
        <div className="h-10 bg-gray-200 rounded-lg skeleton-shimmer flex-1" />
        <div className="h-10 bg-gray-200 rounded-lg skeleton-shimmer flex-1" />
      </div>
    </div>

    {/* Checkboxes */}
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-20" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded skeleton-shimmer" />
          <div className="h-3.5 bg-gray-200 rounded skeleton-shimmer w-20" />
        </div>
      ))}
    </div>

    {/* More checkboxes */}
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded skeleton-shimmer w-28" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded skeleton-shimmer" />
          <div className="h-3.5 bg-gray-200 rounded skeleton-shimmer w-24" />
        </div>
      ))}
    </div>

    {/* Button */}
    <div className="h-10 bg-gray-200 rounded-lg skeleton-shimmer" />
  </div>
);

// ─── Button Loading Spinner ──────────────────────────────────────────────
export const ButtonSpinner = ({ size = 'sm', className = '' }) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <svg
      className={`animate-spin ${sizes[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// ─── Loading Button Wrapper ──────────────────────────────────────────────
export const LoadingButton = ({
  loading = false,
  disabled = false,
  children,
  loadingText,
  className = '',
  onClick,
  ...props
}) => (
  <button
    onClick={onClick}
    disabled={loading || disabled}
    className={`relative inline-flex items-center justify-center transition-all duration-200 ${
      loading ? 'cursor-not-allowed opacity-90' : ''
    } ${className}`}
    {...props}
  >
    {loading && <ButtonSpinner className="mr-2" />}
    {loading && loadingText ? loadingText : children}
  </button>
);

export default Skeleton;
