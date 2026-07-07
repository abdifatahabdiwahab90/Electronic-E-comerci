import { Link } from "react-router-dom";
import { useProductStore } from "../data/productStore";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

export default function NewProduct() {
  const { products } = useProductStore();
  const newArrivals = [...products].slice(-4).reverse();

  return (
    <section className="section section-muted">
      <div className="page-container">
        <SectionHeader
          label="New Arrivals"
          title="Latest Additions"
          subtitle="Fresh picks recently added to our collection."
          center
        />

        <div className="product-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/product" className="btn-primary">Explore All Products</Link>
        </div>
      </div>
    </section>
  );
}
