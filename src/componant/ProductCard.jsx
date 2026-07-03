import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

import { FaStar, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
    const dispatch = useDispatch();
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {product.category}
        </p>

        <div className="flex justify-between items-center mt-3">

          <span className="text-blue-600 text-2xl font-bold">
            ${product.price}
          </span>

          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            {product.rating}
          </div>

        </div>

      <button
  onClick={() => dispatch(addToCart(product))}
  className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>
  Add To Cart
</button>
      </div>

    </div>
  );
}

export default ProductCard;