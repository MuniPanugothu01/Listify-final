import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Mock user for demo
const MOCK_USER = {
  name: 'Demo User',
  email: 'demo@example.com',
  id: 'demo-123'
};

const CATEGORIES = ['Electronics', 'Vehicles', 'Furniture', 'Real Estate', 'Fashion', 'Sports', 'Books', 'Services'];
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PostAdPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    condition: '',
    description: '',
    location: '',
    phone: '',
    image: null,
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const setFile = (e) => setForm((f) => ({ ...f, image: e.target.files[0] }));

  const validate = () => {
    const errs = {};
    const trimmedForm = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      phone: form.phone.replace(/[\s-]/g, ''),
    };

    if (!trimmedForm.title) errs.title = 'Title is required';
    if (!form.category) errs.category = 'Please select a category';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errs.price = 'Enter a valid price';
    if (!form.condition) errs.condition = 'Please select condition';
    if (trimmedForm.description.length < 20) errs.description = 'Description must be at least 20 characters';
    if (!trimmedForm.location) errs.location = 'Location is required';
    if (!trimmedForm.phone || !/^\d{10}$/.test(trimmedForm.phone)) errs.phone = 'Enter a valid 10-digit phone number';
    
    setForm(f => ({ ...f, ...trimmedForm }));
    return errs;
  };

  const saveLocalProduct = (product) => {
    const existingProducts = JSON.parse(localStorage.getItem('localProducts') || '[]');
    existingProducts.push(product);
    localStorage.setItem('localProducts', JSON.stringify(existingProducts));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrors({});
    setLoading(true);
    
    // Create new product object
    const newProduct = {
      id: `local-${Date.now()}`,
      title: form.title,
      price: Number(form.price),
      category: form.category,
      condition: form.condition,
      description: form.description,
      location: form.location,
      seller: {
        name: MOCK_USER.name,
        rating: 5.0,
        since: '2026'
      },
      image: form.image ? URL.createObjectURL(form.image) : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
      postedAt: new Date().toISOString().split('T')[0],
      featured: false
    };

    setTimeout(() => {
      saveLocalProduct(newProduct);
      setLoading(false);
      setSubmitted(true);
      toast.success('Listing posted successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4 page-enter">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl">🎉</div>
        <h2 className="text-2xl font-bold text-slate-900">Ad Posted Successfully!</h2>
        <p className="text-slate-500 max-w-sm">Your listing is now live. Buyers in your area can start contacting you.</p>
        <div className="flex gap-3">
          <button onClick={() => { setSubmitted(false); setForm({ title:'', category:'', price:'', condition:'', description:'', location:'', phone:'', image:null }); }} className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all">
            Post Another
          </button>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-gradient-to-r from-[#27BB97] to-[#1fa987] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#27BB97]/20 transition-all">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#27BB97] to-[#1fa987] rounded-xl flex items-center justify-center shadow-lg shadow-[#27BB97]/20">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#27BB97] to-[#1fa987] bg-clip-text text-transparent">
                Listify
              </span>
            </Link>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 mr-2">Demo Mode</span>
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Post Your Ad</h1>
          <p className="text-slate-500 mt-1">Fill in the details below to list your item for free.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8 space-y-5">
          <Field label="Ad Title *" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={set('title')}
              placeholder="e.g., iPhone 14 Pro Max 256GB"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
            />
          </Field>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Category *" error={errors.category}>
              <select value={form.category} onChange={set('category')} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition">
                <option value="">Select…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c.toLowerCase().replace(/\s+/g, '-')}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Condition *" error={errors.condition}>
              <select value={form.condition} onChange={set('condition')} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition">
                <option value="">Select…</option>
                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Price (₹) *" error={errors.price}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
              <input
                type="number"
                value={form.price}
                onChange={set('price')}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
                min="1"
              />
            </div>
          </Field>

          <Field label="Description *" error={errors.description}>
            <textarea
              value={form.description}
              onChange={set('description')}
              placeholder="Describe your item in detail — include brand, model, age, any damage, reason for selling…"
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">{form.description.length} / 20 minimum characters</p>
          </Field>

          <Field label="Location *" error={errors.location}>
            <input
              type="text"
              value={form.location}
              onChange={set('location')}
              placeholder="e.g., Andheri West, Mumbai"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
            />
          </Field>

          <Field label="Phone Number *" error={errors.phone}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">+91</span>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="9999999999"
                maxLength={10}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:border-[#27BB97] focus:ring-2 focus:ring-[#27BB97]/20 outline-none transition"
              />
            </div>
          </Field>

          <Field label="Photos (optional)">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl h-32 cursor-pointer hover:border-[#27BB97] hover:bg-[#27BB97]/5 transition-all">
              <input type="file" accept="image/*" onChange={setFile} className="hidden" />
              <span className="text-3xl mb-1">📸</span>
              <span className="text-sm text-slate-500">
                {form.image ? form.image.name : 'Click to upload a photo'}
              </span>
            </label>
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#27BB97] to-[#1fa987] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#27BB97]/20 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing listing…
              </span>
            ) : (
              'Post Ad for Free →'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAdPage;