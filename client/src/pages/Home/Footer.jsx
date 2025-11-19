import { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaGooglePlus,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const hotelsAndResorts = [
    "Mauritius Le Prince Maurice",
    "Constance Belle Mare Plage",
    "Seychelles Belle Mare Plage",
    "Constance Lemuria",
    "Constance Ephelia",
    "Maldives Halaveli",
    "Constance Moofushi",
    "Madagascar Tsarabanjina",
    "Constance Tsarabanjina",
  ];

  const experiences = [
    "Gastronomy",
    "Golf",
    "Spa",
    "Weddings & Honeymoons",
    "Diving",
    "Constance Kids Club",
  ];

  const aboutUs = [
    "One Team",
    "Work with Us",
    "Hospitality Training Centre",
    "Offices",
    "Press",
    "Partners",
  ];

  const gallery = ["Blog", "Groups & Incentives"];

  const recommendations = [
    "Milan",
    "Venice",
    "Rome",
    "Florence",
    "BAGLIONI HOTELS",
    "Tuscany",
    "London",
    "France",
    "Marrakech",
  ];

  return (
    <footer className="bg-black text-white mt-20 rounded-t-[12%]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Logo Circle */}
        <div className="absolute top-0 left-0 w-12 h-12 bg-gold rounded-full opacity-20"></div>

        {/* Footer Links Grid */}
        <div className="flex justify-between gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Hotels & Resorts */}
            <div>
              <h4 className="text-base font-semibold text-gold mb-6 uppercase tracking-wide">
                Hotels & Resorts
              </h4>
              <ul className="space-y-3">
                {hotelsAndResorts.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-gold transition-all duration-200 block text-sm leading-relaxed"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiences */}
            <div>
              <h4 className="text-base font-semibold text-gold mb-6 uppercase tracking-wide">
                Experiences
              </h4>
              <ul className="space-y-3">
                {experiences.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-gold transition-all duration-200 block text-sm leading-relaxed"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="text-base font-semibold text-gold mb-6 uppercase tracking-wide">
                About Us
              </h4>
              <ul className="space-y-3">
                {aboutUs.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-gold transition-all duration-200 block text-sm leading-relaxed"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div>
              <h4 className="text-base font-semibold text-gold mb-6 uppercase tracking-wide">
                Gallery
              </h4>
              <ul className="space-y-3">
                {gallery.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-gold transition-all duration-200 block text-sm leading-relaxed"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vertical Line */}

          <div className="h-48 w-px bg-gray-700"></div>

          {/* Follow Us & Newsletter */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <h4 className="text-base font-semibold text-gold mb-6 uppercase tracking-wide">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {/* Facebook */}
                <a
                  href="#"
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-white group transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gray-800 rounded-full group-hover:bg-[#1877F2] transition-all duration-300"></div>
                  <FaFacebook size={16} className="relative z-10" />
                </a>

                {/* Twitter */}
                <a
                  href="#"
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-white group transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gray-800 rounded-full group-hover:bg-[#1DA1F2] transition-all duration-300"></div>
                  <FaTwitter size={16} className="relative z-10" />
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-white group transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gray-800 rounded-full group-hover:bg-[#FF0000] transition-all duration-300"></div>
                  <FaYoutube size={16} className="relative z-10" />
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-white group transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gray-800 rounded-full group-hover:bg-[#E4405F] transition-all duration-300"></div>
                  <FaInstagram size={16} className="relative z-10" />
                </a>

                {/* Google Plus */}
                <a
                  href="#"
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-white group transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gray-800 rounded-full group-hover:bg-[#DB4437] transition-all duration-300"></div>
                  <FaGooglePlus size={16} className="relative z-10" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-base font-semibold text-gold mb-4 uppercase tracking-wide">
                Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gold"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold text-white font-semibold rounded text-sm bg-yellow-500 transition-all duration-200 uppercase tracking-wide cursor-pointer hover:bg-yellow-600"
                >
                  {isSubscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
