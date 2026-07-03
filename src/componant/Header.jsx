import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";



function Header() {

const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          Electro<span className="text-gray-900">Shop</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 duration-300">
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" className="hover:text-blue-600 duration-300">
              Products
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-blue-600 duration-300">
              Blogs
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-blue-600 duration-300">
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-blue-600 duration-300">
              Contact
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5">

          <Link to="/wishlist" className="relative">
            <MdFavorite className="text-2xl hover:text-blue-600" />
          </Link>

          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl hover:text-blue-600" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
  {cartItems.length}
</span>
          </Link>

          <button className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 duration-300">
            Login
          </button>

          {/* Mobile Menu */}
          <button className="md:hidden">
            <FaBars className="text-2xl" />
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Header;