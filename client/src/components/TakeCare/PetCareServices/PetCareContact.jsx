const PetCareContact = () => (
  <div className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
        {/* Contact Information */}
        <div className="order-2 lg:order-1">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Need Help? Contact Us
            </h2>
            <p className="text-gray-600 text-sm xs:text-base sm:text-lg">
              Our team is here to help you find loving pet care or answer any questions about pet sitting.
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {/* Phone Contact */}
            <div className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-[#27BB97]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl xs:text-2xl">📞</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm xs:text-base">Call Us</p>
                <a 
                  href="tel:+15551234567" 
                  className="text-[#27BB97] hover:text-[#1FA987] transition-colors text-sm xs:text-base block truncate"
                >
                  +1 (555) PET-CARE
                </a>
                <p className="text-gray-500 text-xs xs:text-sm mt-0.5">Mon-Fri, 8am-8pm EST</p>
              </div>
            </div>
            
            {/* Email Contact */}
            <div className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-[#27BB97]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl xs:text-2xl">✉️</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm xs:text-base">Email Us</p>
                <a 
                  href="mailto:support@petcare.com" 
                  className="text-[#27BB97] hover:text-[#1FA987] transition-colors text-sm xs:text-base block truncate"
                >
                  support@petcare.com
                </a>
                <p className="text-gray-500 text-xs xs:text-sm mt-0.5">We reply within 12 hours</p>
              </div>
            </div>
            
            {/* Emergency Contact */}
            <div className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200">
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl xs:text-2xl">⚠️</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm xs:text-base">Emergency Contact</p>
                <a 
                  href="tel:+15551234568" 
                  className="text-red-500 hover:text-red-600 transition-colors text-sm xs:text-base"
                >
                  +1 (555) PET-HELP
                </a>
                <p className="text-gray-500 text-xs xs:text-sm mt-0.5">24/7 emergency line</p>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 sm:mt-8 p-3 xs:p-4 bg-gradient-to-r from-[#27BB97]/5 to-[#1FA987]/5 rounded-xl">
            <p className="text-gray-600 text-xs xs:text-sm">
              <span className="font-semibold text-[#27BB97]">Quick Tip:</span> For booking inquiries, include your pet type, dates needed, and location for faster service.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="order-1 lg:order-2 bg-gray-50 rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 lg:p-8">
          <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Send us a message
          </h3>
          
          <form className="space-y-4 sm:space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="contact-name" className="block text-gray-700 mb-1.5 xs:mb-2 text-sm xs:text-base">
                Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="contact-name"
                className="w-full p-3 xs:p-4 border border-gray-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:border-transparent transition-all text-sm xs:text-base"
                placeholder="Your full name"
                required
              />
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="contact-email" className="block text-gray-700 mb-1.5 xs:mb-2 text-sm xs:text-base">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="contact-email"
                className="w-full p-3 xs:p-4 border border-gray-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:border-transparent transition-all text-sm xs:text-base"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            {/* Pet Type Field */}
            <div>
              <label htmlFor="pet-type" className="block text-gray-700 mb-1.5 xs:mb-2 text-sm xs:text-base">
                Pet Type
              </label>
              <select 
                id="pet-type"
                className="w-full p-3 xs:p-4 border border-gray-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:border-transparent transition-all text-sm xs:text-base"
              >
                <option value="">Select pet type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="multiple">Multiple Pets</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Message Field */}
            <div>
              <label htmlFor="contact-message" className="block text-gray-700 mb-1.5 xs:mb-2 text-sm xs:text-base">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea 
                id="contact-message"
                rows={4} 
                className="w-full p-3 xs:p-4 border border-gray-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:border-transparent transition-all resize-none text-sm xs:text-base"
                placeholder="Tell us about your pet care needs or questions..."
                required
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#27BB97] to-[#1FA987] text-white py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:from-[#1FA987] hover:to-[#198F72] transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#27BB97] focus:ring-offset-2 text-sm xs:text-base"
            >
              Send Message
            </button>
            
            {/* Privacy Notice */}
            <p className="text-gray-500 text-xs xs:text-sm text-center">
              By submitting, you agree to our <a href="#" className="text-[#27BB97] hover:underline">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default PetCareContact;