import { useSearchParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useProductStore } from "../data/productStore";
import ProductCard from "../componant/ProductCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, categories } = useProductStore();
  const query = searchParams.get("q") || "";

  const categoryNames = Object.fromEntries(
    categories.map((cat) => [cat.id, cat.name])
  );

  const results = query
    ? products.filter((item) => {
        const term = query.toLowerCase();
        return (
          item.name?.toLowerCase().includes(term) ||
          item.brand?.toLowerCase().includes(term) ||
          categoryNames[item.catId]?.toLowerCase().includes(term)
        );
      })
    : [];

  return (
    <section className="section section-muted min-h-screen">
      <div className="page-container">

        <button
          onClick={() => navigate("/productDetails")}
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
        >
          <FaArrowLeft size={12} /> Back
        </button>

        <div className="mb-12">
          <h1 className="page-title">Results for "{query}"</h1>
          <p className="page-subtitle">{results.length} products found</p>
        </div>

        {results.length > 0 ? (
          <div className="product-grid">
            {results.map((product) => (
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
