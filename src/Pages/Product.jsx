import { useState } from "react";
import {
  FaSearch,
  FaThLarge,
  FaList,
} from "react-icons/fa";

import products from "../data/products";// Double check your spelling here if it fails to compile ("component" vs "componant")

import ProductCard from "../componant/ProductCard";
export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Popular");
  const [view, setView] = useState("grid");

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  const filteredProducts = [...products]
    .filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || item.category === category;

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "Low to High") return a.price - b.price;
      if (sort === "High to Low") return b.price - a.price;
      if (sort === "Rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <section className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-10 text-white mb-8">
          <h1 className="text-5xl font-bold">Discover Premium Electronics</h1>
          <p className="mt-4 text-blue-100 max-w-2xl leading-8">
            Shop laptops, smartphones, gaming consoles, cameras, headphones and
            accessories from the world's leading brands.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
              <h2 className="text-4xl font-bold">20+</h2>
              <p className="text-blue-100">Products</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
              <h2 className="text-4xl font-bold">{categories.length - 1}</h2>
              <p className="text-blue-100">Categories</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
              <h2 className="text-4xl font-bold">4.9★</h2>
              <p className="text-blue-100">Average Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
              <h2 className="text-4xl font-bold">100%</h2>
              <p className="text-blue-100">Genuine Products</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <FaSearch className="absolute left-5 top-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-2xl py-4 pl-14 pr-5 outline-none focus:border-blue-600"
              />
            </div>

            {/* Category Select */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-2xl px-5 py-4 bg-transparent outline-none focus:border-blue-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort Select */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-2xl px-5 py-4 bg-transparent outline-none focus:border-blue-600"
            >
              <option>Popular</option>
              <option>Rating</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>

            {/* Grid/List View Toggles */}
            <div className="flex items-center justify-center gap-3 border rounded-2xl p-2">
              <button
                onClick={() => setView("grid")}
                className={`p-3 rounded-xl transition ${
                  view === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-slate-100"
                }`}
              >
                <FaThLarge size={18} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-3 rounded-xl transition ${
                  view === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-slate-100"
                }`}
              >
                <FaList size={18} />
              </button>
            </div>

          </div>
        </div>

        {/* Products Display Grid / List */}
        {filteredProducts.length > 0 ? (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} view={view} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}

      </div>
    </section>
  );
}