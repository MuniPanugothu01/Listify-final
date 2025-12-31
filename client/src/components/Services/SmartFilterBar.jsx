export default function SmartFilterBar() {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        {/* FILTER ROW */}
        <div className="flex flex-wrap items-center gap-3">

          {/* PRICE */}
          <select className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#27bb97]/50">
            <option>Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>

          {/* RATING */}
          <select className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#27bb97]/50">
            <option>Rating</option>
            <option>4★ & above</option>
            <option>3★ & above</option>
          </select>

          {/* DISTANCE */}
          <select className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#27bb97]/50">
            <option>Distance</option>
            <option>Within 2 km</option>
            <option>Within 5 km</option>
            <option>Within 10 km</option>
          </select>

          {/* AVAILABLE TODAY */}
          <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            Available Today
          </button>

          {/* VERIFIED */}
          <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            ✔ Verified
          </button>

          {/* POPULAR */}
          <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            🔥 Popular
          </button>

          {/* MORE FILTERS */}
          <button className="ml-auto text-sm font-semibold text-[#27bb97] hover:underline">
            ⚙️ More Filters
          </button>
        </div>

        {/* AI SUGGESTION */}
        <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#27bb97]/10 px-4 py-3">
          <span className="text-[#27bb97] text-lg">💡</span>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">
              AI Suggestion:
            </span>{" "}
            Best plumber for bathroom repair near you
          </p>
        </div>

      </div>
    </div>
  );
}
