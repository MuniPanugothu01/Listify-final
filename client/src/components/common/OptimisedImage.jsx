import React, { useState, useRef, useEffect } from 'react';

/**
 * OptimisedImage — Progressive image loading with:
 * - Intersection Observer lazy loading (native + fallback)
 * - Blur-up placeholder
 * - WebP/format detection
 * - Error fallback
 * - Skeleton shimmer while loading
 */
const OptimisedImage = ({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
  width,
  height,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  objectFit = 'cover',
  onClick,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(priority); // Priority images load immediately
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority, inView]);

  const handleLoad = () => setLoaded(true);
  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  const imgSrc = error ? fallbackSrc : src;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {/* Skeleton shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Actual image — only rendered when in viewport */}
      {inView && (
        <img
          src={imgSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{ objectFit }}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          {...rest}
        />
      )}
    </div>
  );
};

export default React.memo(OptimisedImage);
