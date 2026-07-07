import { useProductStore } from "../data/productStore";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

function Favorites() {
  const { products } = useProductStore();

  return (
    <section className="section section-white">
      <div className="page-container">
        <SectionHeader
          label="Trending"
          title="Customer Favorites"
          subtitle="Devices our shoppers keep coming back for."
          center
        />

        <div className="product-grid">
          {products.slice(4, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Favorites;
