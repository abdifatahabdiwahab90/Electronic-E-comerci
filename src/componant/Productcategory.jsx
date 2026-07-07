import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useProductStore } from "../data/productStore";
import ProductCard from "./ProductCard";

const Products = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { products, categories } = useProductStore();

  const currentCategory = categories.find(
    (c) => String(c.id) === String(categoryId)
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm("");
  }, [categoryId]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = String(product.catId) === String(categoryId);
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section section-muted min-h-screen">
      <div className="page-container">

        <div className="mb-12">
          <p className="mb-3 text-xs font-medium text-slate-400">
            <span className="cursor-pointer hover:text-slate-900" onClick={() => navigate("/")}>Home</span>
            <span className="mx-2">/</span>
            <span className="cursor-pointer hover:text-slate-900" onClick={() => navigate("/categories")}>Categories</span>
            {currentCategory && (
              <>
                <span className="mx-2">/</span>
                <span className="text-slate-700">{currentCategory.name}</span>
              </>
            )}
          </p>
          <h1 className="page-title">{currentCategory?.name || "Products"}</h1>
          <p className="page-subtitle">{filteredProducts.length} products</p>
        </div>

        <div className="relative mb-12 max-w-md">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search in this category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="card py-20 text-center">
            <p className="text-slate-500">No products found</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Products;
