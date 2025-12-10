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
    alert('Thank you! We’ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Main Section */}
      <main className="max-w-7xl mx-auto mt-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4 font-bold text-[40px] font-['Dancing_Script']">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We’ll create high-quality linkable content and build at least 40 high-authority links to each asset,
            paving the way for you to grow your rankings, improve brand.
          </p>
        </div>

        {/* SINGLE UNIFIED CARD - Left + Right together */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-3">
            {/* Left Column - Contact Info (Teal Background) */}
            <div className="lg:col-span-1 bg-[#27BB97] text-white p-10 relative overflow-hidden">
              {/* Decorative Circles */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-teal-400 rounded-full opacity-40"></div>
              <div className="absolute -top-16 -left-16 w-40 h-40 bg-teal-700 rounded-full opacity-30"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                <p className="text-teal-100 mb-10 text-sm leading-relaxed">
                  We’ll create high-quality linkable content and build at least 40 high-authority links.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Phone</p>
                      <p className="font-semibold text-lg">+8801778777666</p>
                      <p className="font-semibold text-lg">+8801788323866</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Email</p>
                      <p className="font-semibold text-lg break-all">support@Listify.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Address</p>
                      <p className="font-semibold text-lg">New York, USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form (White Background) */}
            <div className="lg:col-span-2 p-10 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
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
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
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
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                    placeholder="I want to hire you quickly"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition resize-none"
                    placeholder="Write here your message"
                  />
                </div>

                <div className="mt-auto">
                  <button
                    type="submit"
                    className="w-full bg-[#27BB97] text-white font-semibold py-5 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl text-lg"
                  >
                    <Send className="w-6 h-6" />
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