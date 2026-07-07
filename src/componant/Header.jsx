import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import { getSession, clearSession, isAdmin, AUTH_EVENT } from "../data/authStore";

const NAV_LINKS = [["/", "Home"], ["/product", "Shop"], ["/categories", "Categories"], ["/about", "About"], ["/contact", "Contact"]];

function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const accountLink = session ? (isAdmin(session) ? "/admin-portal" : "/my-orders") : "/login";

  useEffect(() => {
    setSession(getSession());
    const refresh = () => setSession(getSession());
    window.addEventListener(AUTH_EVENT, refresh);
    return () => window.removeEventListener(AUTH_EVENT, refresh);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  const handleLogout = () => { clearSession(); setSession(null); window.location.href = "/"; };
  const isActive = (path) => location.pathname === path ? "text-primary" : "text-slate-600 hover:text-primary";

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow ${scrolled ? "border-slate-200 shadow-md" : "border-transparent"}`}>
      <div className="page-container flex h-[72px] items-center justify-between">
        <Link to="/" className="font-heading text-lg font-bold tracking-tight"><span className="text-primary">Electro</span><span className="text-slate-900">Shop</span></Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(([path, label]) => <Link key={path} to={path} className={`text-sm font-medium transition ${isActive(path)}`}>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/wishlist" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-primary" aria-label="Wishlist"><MdFavorite size={21} /></Link>
          <Link to="/cart" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-primary" aria-label="Cart">
            <FaShoppingCart size={18} />
            {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">{cartCount}</span>}
          </Link>
          {session ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to={accountLink} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-primary">
                {isAdmin(session) ? <FaUserShield size={16} /> : <FaUser size={16} />}
                <span className="max-w-[100px] truncate">{session.name}</span>
              </Link>
              <button onClick={handleLogout} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Logout"><FaSignOutAlt size={16} /></button>
            </div>
          ) : (
            <Link to="/login" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-primary sm:block">Login</Link>
          )}
          <Link to={accountLink} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 sm:hidden">{session ? <FaUser size={19} /> : <FaUserShield size={19} />}</Link>
          <button type="button" onClick={() => setMenuOpen((o) => !o)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden">{menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="page-container flex flex-col gap-1 py-4">
            {NAV_LINKS.map(([path, label]) => (
              <Link key={path} to={path} className={`rounded-xl px-4 py-3 text-sm font-medium ${location.pathname === path ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"}`}>{label}</Link>
            ))}
            {session ? (
              <>
                <Link to={accountLink} className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">{isAdmin(session) ? "Admin Dashboard" : "My Account"}</Link>
                <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"><FaSignOutAlt size={16} /> Logout</button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><FaUserShield size={16} /> Login / Sign Up</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
