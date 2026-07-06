import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";

function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-cyan-600"
      : "text-slate-500 hover:text-cyan-600";

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-100/80 bg-white/90 backdrop-blur-xl">
      <div className="page-container flex h-[72px] items-center justify-between">

        <Link to="/" className="text-lg font-bold tracking-tight">
          <span className="text-cyan-500">Electro</span>
          <span className="text-[#0a1628]">Shop</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {[
            ["/", "Home"],
            ["/product", "Shop"],
            ["/categories", "Categories"],
            ["/productDetails", "Deals"],
            ["/about", "About"],
            ["/contact", "Contact"],
          ].map(([path, label]) => (
            <Link key={path} to={path} className={`text-sm font-medium transition ${isActive(path)}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link to="/wishlist" className="text-slate-500 transition hover:text-cyan-500">
            <MdFavorite size={21} />
          </Link>

          <Link to="/cart" className="relative text-slate-500 transition hover:text-cyan-500">
            <FaShoppingCart size={18} />
            {cartItems.length > 0 && (
              <span className="absolute -right-2.5 -top-2.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-1 text-[10px] font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button className="btn-primary hidden !px-5 !py-2 text-xs md:block">
            Sign In
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;
