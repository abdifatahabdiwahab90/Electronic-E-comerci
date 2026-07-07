import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";

const NAV_LINKS = [
  ["/", "Home"],
  ["/product", "Shop"],
  ["/categories", "Categories"],
 
  ["/about", "About"],
  ["/contact", "Contact"],
];

function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (path) =>
    location.pathname === path
      ? "text-primary"
      : "text-slate-600 hover:text-primary";

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "border-slate-200 shadow-md shadow-slate-900/5"
          : "border-transparent shadow-none"
      }`}
    >
      <div className="page-container flex h-[72px] items-center justify-between">

        <Link to="/" className="font-heading text-lg font-bold tracking-tight">
          <span className="text-primary">Electro</span>
          <span className="text-slate-900">Shop</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium transition-colors duration-200 ${isActive(path)}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/wishlist"
            className="rounded-lg p-2 text-slate-500 transition duration-200 hover:bg-slate-100 hover:text-primary"
            aria-label="Wishlist"
          >
            <MdFavorite size={21} />
          </Link>

          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-slate-500 transition duration-200 hover:bg-slate-100 hover:text-primary"
            aria-label="Cart"
          >
            <FaShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

        

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="page-container flex flex-col gap-1 py-4">
            {NAV_LINKS.map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition duration-200 ${
                  location.pathname === path
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                {label}
              </Link>
            ))}

          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
