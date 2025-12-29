// Contact Form Section
const NannyContact = () => (
  <div className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Need Help? Contact Us</h2>
          <p className="text-gray-600 mb-8">
            Our team is here to help you find the perfect match or answer any questions.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#27BB97]/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#27BB97]/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">✉️</span>
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-gray-600">support@nannycare.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea rows={4} className="w-full p-3 border border-gray-300 rounded-lg"></textarea>
            </div>
            <button className="w-full bg-[#27BB97] text-white py-3 rounded-lg font-semibold hover:bg-emerald-600">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default NannyContact;