// Waxaan ku darnay useSelector si aan u ogaano haddii alaabtu ku jirto liiska
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
// Soo dhoofso toggleWishlist-ka cusub ee aad abuurtay
import { toggleWishlist } from "../redux/wishlistSlice"; 

import { FaStar, FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  
  // 1. Halkaan ka soo akhri dhamaan alaabaha ku jira wishlist-ka
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  // 2. Hubi haddii alaabtani ay hadda ku dhex jirto liiska wishlist-ka
  const isFavorite = wishlistItems.some((item) => item.id === product.id);

  const handleAddToWishlist = () => {
    // 3. Markii badanka la riixo, haddii ay ku jirtay waa laga saari, haddii kalena waa lagu dari
    dispatch(toggleWishlist(product));
  };

  const handleViewDetails = () => {
    console.log("La daawanayaa:", product.id);
    // badankaan waxaad ku xiri kartaa router-kaaga sida: navigate(`/product/${product.id}`)
  };

return (
  <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500">

    <div className="relative overflow-hidden">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover group-hover:scale-110 duration-500"
      />

      <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
        NEW
      </span>

      <button
        onClick={handleAddToWishlist}
        className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transition ${
          isFavorite
            ? "text-red-500"
            : "text-gray-500 hover:text-red-500"
        }`}
      >
        <FaHeart />
      </button>

      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

        <button
          onClick={handleViewDetails}
          className="bg-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
        >
          <FaEye />
        </button>

      </div>

    </div>

    <div className="p-5">

      <p className="text-blue-600 text-sm font-semibold uppercase">
        {product.category}
      </p>

      <h2 className="text-xl font-bold mt-2 line-clamp-2 h-14">
        {product.name}
      </h2>

      <div className="flex items-center justify-between mt-4">

        <div className="flex items-center gap-1 text-yellow-500">

          <FaStar />
          <span className="text-gray-700 font-medium">
            {product.rating}
          </span>

        </div>

        <span className="text-sm text-green-600 font-semibold">
          In Stock
        </span>

      </div>

      <div className="flex items-center gap-3 mt-5">

        <h2 className="text-3xl font-bold text-blue-600">
          ${product.price}
        </h2>

        <span className="text-gray-400 line-through">
          ${product.price + 150}
        </span>

      </div>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex justify-center items-center gap-3"
      >
        <FaShoppingCart />
        Add To Cart
      </button>

    </div>

  </div>
)};

export default ProductCard ;