import products from "../data/products";
import ProductCard from "./ProductCard";

function Favorites() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <h2 className="text-4xl font-bold text-center">
        Customer Favorites
      </h2>

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        {products.slice(4,8).map((product)=>(
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default Favorites;