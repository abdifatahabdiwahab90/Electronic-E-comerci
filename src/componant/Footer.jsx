import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-900/30 bg-[#0a1628] text-slate-400">
      <div className="page-container py-16">

        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-lg font-bold">
              <span className="text-cyan-400">Electro</span>
              <span className="text-white">Shop</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              Your trusted destination for premium electronics and cutting-edge smart devices.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Shop</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/product" className="transition hover:text-cyan-300">All Products</Link></li>
              <li><Link to="/categories" className="transition hover:text-cyan-300">Categories</Link></li>
              <li><Link to="/productDetails" className="transition hover:text-cyan-300">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/about" className="transition hover:text-cyan-300">About Us</Link></li>
              <li><Link to="/contact" className="transition hover:text-cyan-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Support</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/cart" className="transition hover:text-cyan-300">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="transition hover:text-cyan-300">Wishlist</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cyan-900/30 pt-8 text-sm md:flex-row">
          <p>&copy; 2026 ElectroShop. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-cyan-300 cursor-pointer">Terms</span>
            <span className="hover:text-cyan-300 cursor-pointer">Privacy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
