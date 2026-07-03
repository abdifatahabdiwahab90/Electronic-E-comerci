import { useState } from "react";
import products from "../data/products";
import ProductCard from "../componant/ProductCard";


function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Our Products
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search products..."
          className="border p-3 rounded-lg flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Laptop</option>
          <option>Phone</option>
          <option>Headphone</option>
          <option>Camera</option>
          <option>Gaming</option>
          <option>Watch</option>
        </select>

      </div>

      {/* Products */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;