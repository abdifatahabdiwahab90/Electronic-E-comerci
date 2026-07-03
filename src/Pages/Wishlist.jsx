import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  // Haddii Wishlist-ku maran yahay
  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-700">Wishlist-kaagu waa maran yahay!</h2>
        <p className="text-gray-500 mt-2">Ku noqo dukaanka si aad alaab u soo xarootato.</p>
      </div>
    );
  }

  // Haddii ay alaabi ku jirto
  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Alaabta aad Jeclaysatay ({wishlistItems.length})
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center border border-gray-100">
            {/* Sawirka Alaabta */}
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 object-cover rounded-lg bg-gray-50" 
            />
            
            {/* Faahfaahinta Alaabta */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-gray-800 truncate">{item.name}</h3>
              <p className="text-blue-600 font-bold text-xl mt-1">${item.price}</p>
              
              {/* Badannada (Buttons) */}
              <div className="flex gap-2 mt-3">
                {/* Add To Cart Button */}
                <button 
                  onClick={() => dispatch(addToCart(item))}
                  className="bg-blue-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-1.5 transition font-medium"
                >
                  <FaShoppingCart />
                  Cart
                </button>
                
                {/* Remove From Wishlist Button */}
                <button 
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="bg-red-50 text-red-600 p-2.5 rounded-lg hover:bg-red-100 transition"
                  title="Ka saar Wishlist"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;