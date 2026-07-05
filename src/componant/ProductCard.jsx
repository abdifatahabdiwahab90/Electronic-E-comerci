import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice"; 
import { useNavigate } from "react-router-dom"; 
import { FaStar, FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  

  const isFavorite = wishlistItems.some((item) => item.id === product.id);

  const handleAddToWishlist = (e) => {
    e.stopPropagation(); 
    dispatch(toggleWishlist(product));
  };

  const handleViewDetails = () => {
  
   navigate(`/products/${product.id}`);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-500 text-slate-800 flex flex-col justify-between">
      
     
      <div className="relative overflow-hidden bg-slate-50 aspect-square cursor-pointer" onClick={handleViewDetails}>
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 duration-500"
        />

        
        <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm ${
          product.badge === "OUT OF STOCK" 
            ? "bg-rose-100 text-rose-600" 
            : "bg-blue-600 text-white"
        }`}>
          {product.badge || "NEW"}
        </span>

       
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition-all active:scale-90 z-10 ${
            isFavorite ? "text-rose-500 scale-105" : "text-slate-400 hover:text-rose-500"
          }`}
        >
          <FaHeart className={isFavorite ? "fill-current" : ""} />
        </button>

       
      </div>

     
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">
            {product.brand || "Brand"}
          </p>

          <h2 
            onClick={handleViewDetails}
            className="text-base font-bold mt-2 text-slate-800 hover:text-blue-600 cursor-pointer line-clamp-2 h-12 transition-colors duration-200"
          >
            {product.name}
          </h2>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg">
              <FaStar size={12} />
              <span className="text-slate-700 text-xs font-bold">
                {product.rating}
              </span>
            </div>

            <span className={`text-xs font-bold ${product.badge === "OUT OF STOCK" ? "text-rose-500" : "text-emerald-600"}`}>
              {product.badge === "OUT OF STOCK" ? "Out of Stock" : "In Stock"}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mt-4">
            <h2 className="text-2xl font-black text-slate-900">
              ${product.price}
            </h2>
            <span className="text-sm text-slate-400 line-through">
              ${product.price + 150}
            </span>
          </div>

       
          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={product.badge === "OUT OF STOCK"}
            className={`mt-4 w-full py-3 rounded-xl font-bold transition-all duration-300 flex justify-center items-center gap-2 shadow-sm active:scale-[0.98] ${
              product.badge === "OUT OF STOCK"
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <FaShoppingCart size={14} />
            {product.badge === "OUT OF STOCK" ? "Sold Out" : "Add To Cart"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;