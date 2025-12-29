import React from 'react';
import { Search, User } from 'lucide-react';

export default function NannyHero() {
  return (
    <div className="min-h-screen relative overflow-hidden">
    
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-4xl font-bold leading-tight">
              Reliable <span className="text-pink-400">Nannies for</span>
              <br />
              <span className="text-pink-400">Exceptional</span> <span className="text-navy-900">Childcare In Your City</span>
            </h1>

            <div className="border-l-4 border-pink-400 pl-4">
              <p className="text-gray-600 text-lg">
                Reliable Child Care, Trusted Nannies –<br />
                Because Your Child Deserves the Best.
              </p>
            </div>

            {/* Action Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-navy-900">Find a Nanny Job</h3>
                    <p className="text-gray-500 text-sm">(I Offer Care)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-navy-900">Find a Nanny</h3>
                    <p className="text-gray-500 text-sm">(I Need Care)</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-12 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
              Post Your Need
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-2">
              <img
                src="/nanny-care-2.jpg"
                alt="Nanny with child"
                className="w-full h-full object-cover rounded-2xl"
                loading='lazy'
              />
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}