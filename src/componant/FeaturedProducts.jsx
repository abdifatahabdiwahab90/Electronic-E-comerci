import products from "../data/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto py-16 px-5">

      <div className="flex justify-between items-center mb-10">

        <div>
          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-2">
            Discover our most popular electronics
          </p>
        </div>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
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