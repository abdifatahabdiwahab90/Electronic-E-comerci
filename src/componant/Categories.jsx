import React from 'react';

const categories = [
  { name: 'Laptops', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=150&auto=format&fit=crop&q=60', count: '140+ Items', color: 'bg-blue-50' },
  { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=60', count: '85+ Items', color: 'bg-emerald-50' },
  { name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=60', count: '62+ Items', color: 'bg-purple-50' },
  { name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=60', count: '48+ Items', color: 'bg-orange-50' },
  { name: 'Gaming', image: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=150&auto=format&fit=crop&q=60', count: '30+ Items', color: 'bg-pink-50' },
  { name: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&auto=format&fit=crop&q=60', count: '22+ Items', color: 'bg-teal-50' },
];

export default function Categories() {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto text-center">
      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Categories</span>
      <h2 className="text-2xl md:text-3xl font-bold mt-1 mb-8">Shop Our Collections</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className={`p-4 rounded-2xl border border-gray-100 ${cat.color} hover:shadow-md transition duration-300 cursor-pointer flex flex-col items-center justify-center`}>
            <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-full object-cover mb-3 mix-blend-multiply" />
            <h3 className="font-semibold text-sm text-gray-800">{cat.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{cat.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}