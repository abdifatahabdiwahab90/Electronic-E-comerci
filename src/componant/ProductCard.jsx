import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import ProductImage from "./ProductImage";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const isFavorite = wishlistItems.some(
    (item) => String(item.id) === String(product.id)
  );

  const outOfStock = product.badge === "OUT OF STOCK";

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const price =
    typeof product.price === "number"
      ? product.price.toLocaleString()
      : product.price;

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">

      <div onClick={handleViewDetails} className="relative cursor-pointer">
        <ProductImage
          product={product}
          rounded="rounded-t-2xl"
          hover
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleWishlist(product));
          }}
          aria-label="Add to wishlist"
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition ${
            isFavorite ? "text-red-500" : "text-slate-500 hover:text-red-500"
          }`}
        >
          <FaHeart size={12} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-cyan-600/70">
          {product.brand || product.category}
        </p>

        <h3
          onClick={handleViewDetails}
          className="mt-2 line-clamp-2 cursor-pointer text-[15px] font-medium leading-snug text-slate-900 transition hover:text-cyan-600"
        >
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-1.5">
          <FaStar className="text-amber-400" size={11} />
          <span className="text-xs font-medium text-slate-600">{product.rating}</span>
        </div>

        <p className="mt-4 text-xl font-bold tracking-tight text-[#0a1628]">${price}</p>

        <div className="mt-auto flex gap-2 pt-6">
          <button
            onClick={handleViewDetails}
            className="flex-1 rounded-full border border-cyan-200 py-2.5 text-xs font-medium text-cyan-700 transition hover:bg-cyan-50"
          >
            Details
          </button>
          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={outOfStock}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold transition ${
              outOfStock
                ? "bg-slate-100 text-slate-400"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500"
            }`}
          >
            <FaShoppingCart size={11} />
            {outOfStock ? "Sold Out" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
