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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition relative group">
      
      {/* --- WISHLIST BUTTON --- */}
      <button 
        onClick={handleAddToWishlist}
        // 4. Halkaan haddii uu isFavorite yahay midabka wuxux noqonayaa text-red-500 (Casaan), haddii kalena text-gray-400
        className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition z-10 ${
          isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
        }`}
        title={isFavorite ? "Ka saar Wishlist" : "Ku dar Wishlist"}
      >
        <FaHeart className="text-xl" />
      </button>

      {/* Sifeeyaha Sawirka */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold truncate">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-1 text-sm">
          {product.category}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-blue-600 text-2xl font-bold">
            ${product.price}
          </span>

          <div className="flex items-center gap-1 text-sm font-semibold bg-gray-100 px-2 py-1 rounded">
            <FaStar className="text-yellow-500" />
            {product.rating}
          </div>
        </div>

        {/* --- BADANADUHA HOOSE (View iyo Add to Cart) --- */}
        <div className="flex gap-2 mt-5">
          
          {/* View Details Button */}
          <button 
            onClick={handleViewDetails}
            className="flex items-center justify-center gap-2 bg-gray-150 text-gray-700 hover:bg-gray-200 border border-gray-300 px-4 py-3 rounded-lg transition font-medium"
            title="Fiiri Faahfaahinta"
          >
            <FaEye />
          </button>

          {/* Add To Cart Button */}
          <button 
            onClick={() => dispatch(addToCart(product))}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md shadow-blue-200"
          >
            <FaShoppingCart />
            Add To Cart
          </button>

        </div>
      </div>

    </div>
  );
}

export default ProductCard;