
export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952')",
        }}
      />

      {/* DARK + GRADIENT OVERLAY (READABILITY) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight">
            Find Trusted Local Services <br />
            Near You
          </h1>

          {/* SUBTITLE */}
          <p className="mt-6 text-lg text-gray-200">
            Compare prices, chat instantly, and book verified professionals
            with confidence.
          </p>

          {/* SEARCH BOX */}
          <div className="mt-10 bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-3">
            <select className="border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Chennai</option>
            </select>

            <input
              type="text"
              placeholder="Plumber, AC repair, Cleaning..."
              className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all">
              Search
            </button>
          </div>

          {/* QUICK SERVICES */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["Plumbing", "Cleaning", "Electric", "AC Repair"].map(service => (
              <span
                key={service}
                className="bg-white/90 backdrop-blur border border-white/40 px-5 py-2 rounded-full text-sm font-medium text-gray-800 hover:bg-blue-50 cursor-pointer transition"
              >
                {service}
              </span>
            ))}
          </div>

          {/* TRUST SIGNALS */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-200">
            <span>✔ Verified Experts</span>
            <span>⭐ 4.8+ Avg Rating</span>
            <span>⏱ Fast Response</span>
          </div>

        </div>
      </div>
    </section>
  );
}
