import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Loader2, RefreshCw } from 'lucide-react';
import { setSelectedProduct, setAllProducts } from '../../redux/slices/forSaleSlice';
import { fetchAllElectronics } from '../../redux/slices/electronicsSlice';
import { fetchAllVehicles } from '../../redux/slices/vehiclesSlice';
import { fetchAllForSaleItems } from '../../redux/slices/forSaleItemsSlice';
import OptimisedImage from '../common/OptimisedImage';

// ── Number of items per "page" (≈ 7 rows × 5 cols) ──────────────
const ITEMS_PER_PAGE = 35;

// ── Skeleton card shown while loading more ───────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 animate-pulse">
    <div className="relative h-48 bg-gray-200 skeleton-shimmer" />
    <div className="p-3 space-y-3">
      <div className="h-3.5 bg-gray-200 rounded-full skeleton-shimmer w-[85%]" />
      <div className="h-5 bg-gray-200 rounded-full skeleton-shimmer w-[40%]" />
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 bg-gray-200 rounded-full skeleton-shimmer" />
        <div className="h-3 bg-gray-200 rounded-full skeleton-shimmer w-[50%]" />
      </div>
    </div>
  </div>
);

// ── Product Card ─────────────────────────────────────────────────
const ProductCard = React.memo(({ product, onClick }) => {
  const image = product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80';
  const displayPrice = product.price;
  const location = product.location || 'Unknown';
  const condition = product.condition || '';
  const sourceCategory = product._source === 'vehicle' ? 'Vehicle' : product._source === 'electronics' ? 'Electronics' : (product.category || 'For Sale');

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <OptimisedImage
          src={image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          wrapperClassName="w-full h-full"
        />
        {condition && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700">
            {condition}
          </span>
        )}
        {sourceCategory && (
          <span className="absolute top-2 right-2 bg-[#27bb97]/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full text-white">
            {sourceCategory}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-gray-900 mb-1">
          ${Number(displayPrice).toLocaleString()}
        </p>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
      </div>
    </div>
  );
});

const ForSaleListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef(null);

  // ── Redux state ────────────────────────────────────────────────
  const { listings: electronicsListings, loading: electronicsLoading, error: electronicsError } = useSelector((s) => s.electronics);
  const { listings: vehiclesListings, loading: vehiclesLoading, error: vehiclesError } = useSelector((s) => s.vehicles);
  const { listings: forSaleListings, loading: forSaleLoading, error: forSaleError } = useSelector((s) => s.forSaleItems);

  // Show spinner only when ALL sources are still loading and NONE have data yet
  const allLoading = electronicsLoading && vehiclesLoading && forSaleLoading;
  const hasAnyData = (electronicsListings?.length > 0) || (vehiclesListings?.length > 0) || (forSaleListings?.length > 0);
  const initialLoading = allLoading || (!hasAnyData && (electronicsLoading || vehiclesLoading || forSaleLoading));

  // Track which sources failed
  const allErrors = [
    electronicsError && 'Electronics',
    vehiclesError && 'Vehicles',
    forSaleError && 'For Sale',
  ].filter(Boolean);
  const allFailed = allErrors.length === 3;

  // Fetch all data sources on mount
  useEffect(() => {
    dispatch(fetchAllElectronics());
    dispatch(fetchAllVehicles());
    dispatch(fetchAllForSaleItems());
  }, [dispatch]);

  // Retry handler
  const handleRetryAll = useCallback(() => {
    if (electronicsError) dispatch(fetchAllElectronics());
    if (vehiclesError) dispatch(fetchAllVehicles());
    if (forSaleError) dispatch(fetchAllForSaleItems());
  }, [dispatch, electronicsError, vehiclesError, forSaleError]);

  // ── Combine electronics + vehicles + forsale into one list ─────
  const allProducts = useMemo(() => {
    const elec = (electronicsListings || []).map((p) => ({ ...p, _source: 'electronics' }));
    const vehi = (vehiclesListings || []).map((p) => ({ ...p, _source: 'vehicle' }));
    const forsale = (forSaleListings || []).map((p) => ({ ...p, _source: 'forsale' }));
    // Interleave so the grid looks mixed — round-robin across sources
    const merged = [];
    const sources = [elec, vehi, forsale].filter((arr) => arr.length > 0);
    const maxLen = Math.max(...sources.map((s) => s.length), 0);
    for (let i = 0; i < maxLen; i++) {
      for (const source of sources) {
        if (i < source.length) merged.push(source[i]);
      }
    }
    return merged;
  }, [electronicsListings, vehiclesListings, forSaleListings]);

  // Category counts for filter tabs
  const categoryCounts = useMemo(() => ({
    All: allProducts.length,
    Electronics: (electronicsListings || []).length,
    Vehicles: (vehiclesListings || []).length,
    Mobiles: (forSaleListings || []).filter((p) => p.category === 'Mobiles').length,
    Furniture: (forSaleListings || []).filter((p) => p.category === 'Furniture').length,
    Fashion: (forSaleListings || []).filter((p) => p.category === 'Fashion').length,
    'Books & Sports': (forSaleListings || []).filter((p) => p.category === 'Books, Sports').length,
  }), [allProducts, electronicsListings, vehiclesListings, forSaleListings]);

  // Push combined data to ForSale Redux slice (for detail page)
  useEffect(() => {
    if (allProducts.length > 0) {
      dispatch(setAllProducts(allProducts));
    }
  }, [allProducts, dispatch]);

  // ── Filter by category tab + search query ──────────────────────
  const filteredProducts = useMemo(() => {
    let result = allProducts;

  // ── Redux state ────────────────────────────────────────────────
  const { listings: electronicsListings, loading: electronicsLoading } = useSelector((s) => s.electronics);
  const { listings: vehiclesListings, loading: vehiclesLoading } = useSelector((s) => s.vehicles);

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p._source?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allProducts, activeFilter, searchQuery]);

  // Items currently visible
  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  // Reset visible count when search changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery]);

  // ── Intersection Observer for infinite scroll ──────────────────
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingMore) {
          setLoadingMore(true);
          // Brief skeleton flash (400ms) then reveal next batch
          setTimeout(() => {
            setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
            setLoadingMore(false);
          }, 400);
        }
      },
      { rootMargin: '300px 0px', threshold: 0.1 }
    );

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [hasMore, loadingMore]);

  // ── Navigate to detail page ────────────────────────────────────
  const handleProductClick = useCallback(
    (product) => {
      dispatch(setSelectedProduct(product));
      if (product._source === 'electronics') {
        navigate(`/electronics/${product._id}`);
      } else if (product._source === 'vehicle') {
        navigate(`/vehicles/${product._id}`);
      } else {
        navigate(`/forsale/${product._id || product.id}`);
      }
    },
    [dispatch, navigate]
  );


  return (
    <div className="min-h-screen">
      <div className="px-4 py-4 sm:px-8 md:px-8 lg:px-12 xl:px-12">
        {/* Header with title and search bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">For Sale</h1>
            {!initialLoading && (
              <p className="text-sm text-gray-500 mt-1">
                {filteredProducts.length} items available
                {(electronicsLoading || vehiclesLoading || forSaleLoading) && (
                  <span className="inline-flex items-center ml-2 text-[#27bb97]">
                    <Loader2 className="w-3 h-3 animate-spin mr-1" /> loading more…
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Cars, Electronics, Mobiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27bb97] focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

  

        {/* ── Error Banner (partial failure) ─────────────────────── */}
        {allErrors.length > 0 && !allFailed && !initialLoading && (
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4">
            <p className="text-sm text-amber-700">
              Could not load: <strong>{allErrors.join(', ')}</strong>. Showing available results.
            </p>
            <button
              onClick={handleRetryAll}
              className="flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        )}

        {/* ── Initial loading — full-page spinner ────────────────── */}
        {initialLoading && !allFailed && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 text-[#27bb97] animate-spin" />
            <p className="text-gray-500 text-sm">Loading listings...</p>
          </div>
        )}

        {/* ── All sources failed ─────────────────────────────────── */}
        {allFailed && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg font-medium">Failed to load listings</p>
            <p className="text-gray-400 text-sm">Please check your connection and try again.</p>
            <button
              onClick={handleRetryAll}
              className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Retry All
            </button>
          </div>
        )}

        {/* ── Products Grid ──────────────────────────────────────── */}
        {!initialLoading && !allFailed && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={`${product._source}-${product._id || product.id}`}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>

            {/* ── Skeleton loader when scrolling to bottom ──────── */}
            {loadingMore && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonCard key={`skel-${i}`} />
                ))}
              </div>
            )}

            {/* Scroll sentinel — triggers next page */}
            {hasMore && !loadingMore && (
              <div ref={sentinelRef} className="h-4 w-full" />
            )}

            {/* All items loaded indicator */}
            {!hasMore && filteredProducts.length > ITEMS_PER_PAGE && (
              <p className="text-center text-gray-400 text-sm py-8">
                You&apos;ve reached the end — {filteredProducts.length} items shown
              </p>
            )}

            {/* No results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                {searchQuery ? (
                  <>
                    <p className="text-gray-500 text-lg">
                      No products found matching &ldquo;{searchQuery}&rdquo;
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-[#27bb97] hover:text-[#1fa987] font-medium"
                    >
                      Clear search
                    </button>
                  </>
                ) : activeFilter !== 'All' ? (
                  <>
                    <p className="text-gray-500 text-lg">
                      No {activeFilter} listings available yet
                    </p>
                    <button
                      onClick={() => setActiveFilter('All')}
                      className="mt-4 text-[#27bb97] hover:text-[#1fa987] font-medium"
                    >
                      View all listings
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500 text-lg">No products available yet</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ForSaleListing;