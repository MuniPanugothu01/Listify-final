import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactUS = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    alert('Thank you! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-bold text-gray-800 font-['Dancing_Script']">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            We'll create high-quality linkable content and build at least 40 high-authority links to each asset,
            paving the way for you to grow your rankings, improve brand.
          </p>
        </div>

        {/* SINGLE UNIFIED CARD - Left + Right together */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Contact Info (Teal Background) */}
            <div className="lg:w-1/3 bg-[#27BB97] text-white p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative Circles */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 sm:w-48 sm:h-48 bg-teal-400 rounded-full opacity-40"></div>
              <div className="absolute -top-12 -left-12 w-28 h-28 sm:w-40 sm:h-40 bg-teal-700 rounded-full opacity-30"></div>

              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8">Contact Information</h3>
                <p className="text-teal-100 mb-8 lg:mb-10 text-sm sm:text-base leading-relaxed">
                  We'll create high-quality linkable content and build at least 40 high-authority links.
                </p>

                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm opacity-90">Phone</p>
                      <p className="font-semibold text-base sm:text-lg">+8801778777666</p>
                      <p className="font-semibold text-base sm:text-lg">+8801788323866</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm opacity-90">Email</p>
                      <p className="font-semibold text-base sm:text-lg break-words">support@Listify.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm opacity-90">Address</p>
                      <p className="font-semibold text-base sm:text-lg">New York, USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form (White Background) */}
            <div className="lg:w-2/3 p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 h-full flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-sm sm:text-base"
                      placeholder="Muni Bhai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-sm sm:text-base"
                      placeholder="hello@Listify.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-sm sm:text-base"
                    placeholder="I want to hire you quickly"
                  />
                </div>

                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition resize-none text-sm sm:text-base min-h-[120px]"
                    placeholder="Write here your message"
                  />
                </div>

                <div className="mt-4 sm:mt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#27BB97] text-white font-semibold py-4 sm:py-5 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg hover:bg-teal-600"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUS;