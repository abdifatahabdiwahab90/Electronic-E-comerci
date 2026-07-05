import { useParams } from "react-router-dom";
import products from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Product Not Found
      </h1>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-xl shadow-lg"
        />

        <div>
          <p className="text-blue-600 font-semibold">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {product.name}
          </h1>

          <p className="text-3xl text-green-600 font-bold mt-4">
            ${product.price}
          </p>

          <p className="text-xl mt-3">
            ⭐ {product.rating} / 5
          </p>

          <p className="mt-6 text-gray-600">
            Premium electronic product with high quality,
            excellent performance, and modern design.
          </p>

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}