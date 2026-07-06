import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../componant/ProductCard";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <section className="section section-muted min-h-[70vh]">
        <div className="page-container flex flex-col items-center justify-center py-20 text-center">
          <h1 className="page-title">Your wishlist is empty</h1>
          <p className="page-subtitle">Save products you love and shop later.</p>
          <Link to="/product" className="btn-primary mt-8">Browse Products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-muted min-h-screen">
      <div className="page-container">

        <div className="mb-12">
          <p className="section-label">Saved</p>
          <h1 className="page-title mt-3">Wishlist</h1>
          <p className="page-subtitle">{wishlistItems.length} saved items</p>
        </div>

        <div className="product-grid">
          {wishlistItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Wishlist;
