// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Download,
  Shield,
  Heart,
  ArrowUp,
  ChevronRight,
  Star,
  CheckCircle,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // API call simulation
      console.log("Subscribed with:", email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Production data
  const marketplaceLinks = [
    { name: "Buy", path: "/buy", description: "Find great deals" },
    { name: "Sell", path: "/sell", description: "Sell your items" },
    {
      name: "Services",
      path: "/services",
      description: "Professional services",
    },
    { name: "Jobs", path: "/jobs", description: "Career opportunities" },
    { name: "Housing", path: "/housing", description: "Rent & properties" },
    { name: "Community", path: "/community", description: "Local events" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Safety Tips", path: "/safety" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Seller Guide", path: "/seller-guide" },
    { name: "Buyer Guide", path: "/buyer-guide" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Press", path: "/press" },
    { name: "Blog", path: "/blog" },
    { name: "Team", path: "/team" },
    { name: "Partners", path: "/partners" },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200 pt-16 pb-8 mt-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden ">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div>
                <h2 className="text-gray-900 font-bold text-2xl">Listify</h2>
                <p className="text-gray-500 text-sm">
                  Your Trusted Local Marketplace
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-md">
              Connecting communities through trusted local commerce. Buy, sell,
              and discover everything you need right in your neighborhood with
              safety and convenience.
            </p>

            {/* Trust Badges */}
            {/* <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-700 text-xs font-medium">Verified Sellers</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 text-xs font-medium">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#FFCE32] bg-opacity-20 px-3 py-2 rounded-lg border border-[#FFCE32] border-opacity-30">
                <Star className="w-4 h-4 text-gray-800" />
                <span className="text-gray-800 text-xs font-medium">Top Rated</span>
              </div>
            </div> */}

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-4 h-4 text-[#27BB97]" />
                <span className="text-sm">123 Market Street, Suite 100</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-4 h-4 text-[#27BB97]" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-4 h-4 text-[#27BB97]" />
                <span className="text-sm">support@listify.com</span>
              </div>
            </div>
          </div>

          {/* Marketplace Links */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider pl-5 sm:mt-2">
              Marketplace
            </h3>
            <ul className="space-y-3">
              {marketplaceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all duration-200 text-sm"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider  pl-5">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-all duration-200 text-sm"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider pl-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all duration-200 text-sm"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Apps */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider">
              Stay Connected
            </h3>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-gray-600 text-sm mb-4">
                Get the latest updates and exclusive offers
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your email"
                    className="w-full pl-2 pr-24 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCE32] focus:border-[#FFCE32] transition-all duration-200 bg-white"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 bottom-0 bg-[#FFCE32] hover:bg-[#E6B82E] text-gray-900 px-3 rounded-md transition-all duration-200 cursor-pointer flex items-center justify-center"
                  >
                    ➜
                  </button>
                </div>
                {isSubscribed && (
                  <p className="text-green-600 text-xs font-medium animate-pulse">
                    ✅ Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>

            {/* Mobile Apps */}
            <div>
              <h4 className="text-gray-700 font-semibold mb-3 text-sm">
                Get Our App
              </h4>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-3 bg-black  text-white py-3 px-4 rounded-lg transition-all duration-200 text-sm cursor-pointer shadow-lg ">
                  <Download className="w-4 h-4" />
                  <span>App Store</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-3 bg-black  text-white py-3 px-4 rounded-lg transition-all duration-200 text-sm cursor-pointer shadow-lg hover:shadow-xl">
                  <Download className="w-4 h-4" />
                  <span>Google Play</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 pt-8 border-t border-gray-200">
          {/* Copyright & Legal */}
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-8 text-gray-500 text-sm">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Listify Marketplace. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "Disclaimer",
              ].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links & Scroll to Top */}
          <div className="flex items-center space-x-6">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {[
                {
                  icon: Facebook,
                  href: "https://facebook.com/listify",
                  label: "Facebook",
                  color: "hover:text-blue-600",
                },
                {
                  icon: Twitter,
                  href: "https://twitter.com/listify",
                  label: "Twitter",
                  color: "hover:text-blue-400",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com/listify",
                  label: "Instagram",
                  color: "hover:text-pink-600",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/company/listify",
                  label: "LinkedIn",
                  color: "hover:text-blue-700",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-all duration-200 p-2 rounded-lg hover:bg-gray-100`}
                  aria-label={`Follow us on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 bg-[#27BB97] text-gray-900 px-4 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg text-sm font-medium cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
