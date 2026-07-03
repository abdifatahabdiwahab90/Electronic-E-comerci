import React from 'react';

export default function WishlistHome() {
  return (
    <section className="py-8 px-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-xl">
        <div className="space-y-4 max-w-md z-10">
          <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase">Limited Offer</span>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Up to 30% OFF on Premium Brands</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Upgrade your ecosystem today. Get additional zero-percent interest financing steps during this weekly window checkout.
          </p>
          <button className="bg-white text-blue-600 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition">
            Grab Offer
          </button>
        </div>
        <div className="mt-6 md:mt-0 z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-inner flex items-center justify-center text-6xl w-48 h-48">
          ⌚
        </div>
      </div>
    </section>
  );
}