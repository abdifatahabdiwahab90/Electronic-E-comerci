import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="section section-white">
      <div className="page-container">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Featured</p>
            <h2 className="section-title mt-3">Most Popular</h2>
            <p className="page-subtitle">Top-rated devices loved by our customers.</p>
          </div>
          <Link to="/product" className="btn-secondary shrink-0">View All</Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
