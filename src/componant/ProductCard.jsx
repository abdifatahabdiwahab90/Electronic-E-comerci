import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaShoppingCart, FaCheck } from "react-icons/fa";
import ProductImage from "./ProductImage";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [justAdded, setJustAdded] = useState(false);
  const [heartPop, setHeartPop] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const isFavorite = wishlistItems.some(
    (item) => String(item.id) === String(product.id)
  );

  const outOfStock = product.badge === "OUT OF STOCK" || (product.stock ?? 0) === 0;

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 350);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
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
          onClick={handleWishlist}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 ${
            isFavorite ? "text-red-500" : "text-slate-400 hover:text-red-500"
          } ${heartPop ? "heart-pop" : ""}`}
        >
          <FaHeart size={13} className={isFavorite ? "fill-current" : ""} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary/70">
          {product.brand || product.category}
        </p>

        <h3
          onClick={handleViewDetails}
          className="mt-2 line-clamp-2 cursor-pointer font-heading text-[15px] font-semibold leading-snug text-slate-900 transition duration-200 hover:text-primary"
        >
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-1.5">
          <FaStar className="text-amber-400" size={11} />
          <span className="text-xs font-medium text-slate-600">{product.rating}</span>
        </div>

        <p className="mt-4 font-heading text-xl font-bold tracking-tight text-slate-900">${price}</p>

        <div className="mt-auto flex gap-2 pt-6">
          <button
            onClick={handleViewDetails}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-medium text-slate-700 transition duration-200 hover:border-primary hover:text-primary"
          >
            Details
          </button>
          <button
            onClick={handleAddToCart}
            disabled={outOfStock || justAdded}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-all duration-300 ${
              outOfStock
                ? "bg-slate-100 text-slate-400"
                : justAdded
                  ? "bg-emerald-500 text-white"
                  : "bg-primary text-white hover:bg-primary-dark hover:shadow-md active:scale-[0.98]"
            }`}
          >
            {justAdded ? (
              <>
                <FaCheck size={11} />
                Added
              </>
            ) : (
              <>
                <FaShoppingCart size={11} />
                {outOfStock ? "Sold Out" : "Add"}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
