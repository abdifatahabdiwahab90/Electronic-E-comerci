import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { clearCartFlash } from "../redux/cartSlice";

function CartToast() {
  const dispatch = useDispatch();
  const cartFlash = useSelector((state) => state.cart.cartFlash);

  useEffect(() => {
    if (!cartFlash) return;

    const timer = setTimeout(() => {
      dispatch(clearCartFlash());
    }, 2800);

    return () => clearTimeout(timer);
  }, [cartFlash, dispatch]);

  if (!cartFlash) return null;

  return (
    <div className="cart-flash-enter fixed bottom-6 right-6 z-[100] flex max-w-sm items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl shadow-slate-900/10">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <FaCheck size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-heading text-sm font-semibold text-slate-900">Added to cart</p>
        <p className="truncate text-xs text-slate-500">{cartFlash.name}</p>
      </div>
      <Link
        to="/cart"
        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark"
      >
        <FaShoppingCart size={10} />
        View
      </Link>
    </div>
  );
}

export default CartToast;
