

import React from 'react';

const mockProducts = [
  { id: 1, name: "Premium Ultra Laptop 15", price: "$1,299", rating: "4.9", reviews: "128", tag: "Hot Sale", badgeColor: "bg-red-500", icon: "💻" },
  { id: 2, name: "Flagship Smartphone Pro", price: "$999", rating: "4.8", reviews: "94", tag: "New", badgeColor: "bg-green-500", icon: "📱" },
  { id: 3, name: "Studio ANC Headphones", price: "$299", rating: "4.7", reviews: "215", tag: "-15% OFF", badgeColor: "bg-amber-500", icon: "🎧" },
  { id: 4, name: "E-Sport Smartwatch GPS", price: "$199", rating: "4.6", reviews: "83", tag: "Popular", badgeColor: "bg-purple-500", icon: "⌚" },
];

export default function NewProduct({ title, subtitle, showViewAll = false, columns = 4 }) {
  const productsToRender = columns === 3 ? mockProducts.slice(0, 3) : mockProducts;

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Our Shop</span>
        <h2 className="text-2xl md:text-3xl font-bold mt-1">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6`}>
        {productsToRender.map((product) => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition group relative">
            <div className="absolute top-3 left-3 z-10">
              <span className={`${product.badgeColor} text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full`}>
                {product.tag}
              </span>
            </div>
            <div className="h-48 bg-gray-100 flex items-center justify-center text-5xl group-hover:scale-105 transition duration-300">
              {product.icon}
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">Electronics</span>
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{product.name}</h3>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                ★ <span className="text-gray-700">{product.rating}</span> <span className="text-gray-400">({product.reviews})</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-base text-gray-900">{product.price}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showViewAll && (
        <div className="flex justify-center mt-8">
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm px-6 py-2.5 rounded-xl transition">
            View All Products
          </button>
        </div>
      )}
    </section>
  );
}