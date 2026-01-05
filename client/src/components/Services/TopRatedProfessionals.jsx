import { FaStar, FaRegClock, FaBriefcase } from "react-icons/fa";
import { MdVerified, MdLocationOn } from "react-icons/md";

/* --------------------------------------------------
   SERVICE → COVER IMAGE MAP
-------------------------------------------------- */
const serviceCovers = {
  Plumber: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "House Cleaning":
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  "AC Repair": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
};

/* --------------------------------------------------
   DATA
-------------------------------------------------- */
const professionals = [
  {
    id: 1,
    name: "Rajesh Kumar",
    profession: "Plumber",
    rating: 4.9,
    jobs: 128,
    responseTime: "30 min",
    nearby: true,
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Anita Services",
    profession: "House Cleaning",
    rating: 4.8,
    jobs: 94,
    responseTime: null,
    nearby: true,
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "AC Pro Services",
    profession: "AC Repair",
    rating: 4.9,
    jobs: 156,
    responseTime: "45 min",
    nearby: false,
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

export default function TopRatedProfessionals() {
  return (
    <section className="bg-white py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Top Rated Professionals in <span className="text-[#27bb97]">USA & Canada</span> !
            </h2>
            <button className="text-sm font-semibold text-[#27bb97] hover:text-[#1da183] transition-colors">
              View all →
            </button>
          </div>
          <p className="text-gray-600">
            Trusted experts with excellent customer ratings near you
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
          {professionals.map((pro) => (
            <div
              key={pro.id}
              className="group bg-white rounded-xl border border-gray-200
                         overflow-hidden hover:shadow-lg hover:border-[#27bb97]/20
                         transition-all duration-300 cursor-pointer"
            >
              {/* COVER IMAGE WITH JOBS OVERLAY */}
              <div className="relative h-40">
                <img
                  src={serviceCovers[pro.profession]}
                  alt={pro.profession}
                  className="w-full h-full object-cover group-hover:scale-105 
                           transition-transform duration-500"
                />

      

                {/* STATUS BADGE */}
                <div className="absolute top-4 right-4">
                  {pro.nearby && (
                    <span
                      className="bg-white/90 backdrop-blur-sm text-gray-800 
                                   text-xs font-medium px-3 py-1.5 rounded-full 
                                   flex items-center gap-1.5"
                    >
                      <MdLocationOn className="text-[#27bb97]" size={12} />
                      Nearby
                    </span>
                  )}
                </div>

                {/* AVATAR */}
                <div
                  className="absolute left-6 -bottom-6 w-16 h-16 z-50 rounded-full  
                              border-4 border-white shadow-lg overflow-hidden 
                              bg-white"
                >
                  <img
                    src={pro.avatar}
                    alt={pro.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="pt-10  px-6 pb-6 ">
                {/* NAME & VERIFICATION */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-lg font-semibold text-gray-900 group-hover:text-[#27bb97] 
                                 transition-colors duration-300"
                    >
                      {pro.name}
                    </h3>
                    {pro.verified && (
                      <MdVerified
                        className="text-[#27bb97] flex-shrink-0"
                        size={20}
                        title="Verified professional"
                      />
                    )}
                  </div>
                </div>

                {/* PROFESSION */}
                <p className="text-gray-600 text-sm mb-4">{pro.profession}</p>

                {/* RATING & RESPONSE TIME - SIDE BY SIDE */}
                <div className="flex items-center justify-between mb-4">
                  {/* RATING */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1.5">
                      <FaStar className="text-yellow-400" size={14} />
                      <span className="text-sm font-semibold text-gray-900">
                        {pro.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Customer Rating
                    </span>
                  </div>

                  {/* RESPONSE TIME */}
                  {pro.responseTime && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <FaRegClock className="text-gray-400" size={14} />
                      <span className="text-gray-700">{pro.responseTime}</span>
                    </div>
                  )}
                </div>

                {/* JOBS METRIC - SECOND DISPLAY IN CONTENT AREA */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaBriefcase className="text-[#27bb97]" size={14} />
                    <span className="font-medium text-gray-900">
                      {pro.jobs} successful jobs
                    </span>
                    <span className="text-gray-400 ml-auto">•</span>
                    <span className="text-xs text-gray-500">
                      Trusted by {pro.jobs} clients
                    </span>
                  </div>
                </div>
              </div>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
