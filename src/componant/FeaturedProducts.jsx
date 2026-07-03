
import products from "../data/products";
import ProductCard from "./ProductCard";


function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">
          Featured Products
        </h2>

        <p className="text-gray-500 mt-2">
          Discover our best-selling electronics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}

export default FeaturedProducts;