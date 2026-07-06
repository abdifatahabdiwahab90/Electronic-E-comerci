import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-400">
      <div className="page-container py-16">

        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="font-heading text-lg font-bold">
              <span className="text-primary">Electro</span>
              <span className="text-white">Shop</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              Your trusted destination for premium electronics and cutting-edge smart devices.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white">Shop</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/product" className="transition duration-200 hover:text-white">All Products</Link></li>
              <li><Link to="/categories" className="transition duration-200 hover:text-white">Categories</Link></li>
              <li><Link to="/productDetails" className="transition duration-200 hover:text-white">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/about" className="transition duration-200 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="transition duration-200 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white">Support</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/cart" className="transition duration-200 hover:text-white">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="transition duration-200 hover:text-white">Wishlist</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm md:flex-row">
          <p>&copy; 2026 ElectroShop. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer transition duration-200 hover:text-white">Terms</span>
            <span className="cursor-pointer transition duration-200 hover:text-white">Privacy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
