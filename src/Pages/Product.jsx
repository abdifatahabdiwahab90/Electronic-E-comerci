import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useProductStore } from "../data/productStore";
import ProductCard from "../componant/ProductCard";

export default function Products() {
  const { products, categories, totalProducts } = useProductStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || item.catId === category;
    return matchSearch && matchCategory;
  });

  return (
    <section className="section section-muted min-h-screen">
      <div className="page-container">

        <div className="mb-12">
          <p className="section-label">Catalog</p>
          <h1 className="page-title mt-3">Shop</h1>
          <p className="page-subtitle">
            Showing {filteredProducts.length} of {totalProducts} products
          </p>
        </div>

        <div className="mb-12 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-blue-500 sm:w-48"
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="card py-20 text-center">
            <p className="text-slate-500">No products found</p>
          </div>
        )}

      </div>
    </section>
  );
}
