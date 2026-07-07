import { Home } from "./Pages/Home";
import About from "./Pages/About";
import Product from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import SearchResults from "./Pages/SearchResults";
import Header from "./componant/Header";
import ScrollToTop from "./componant/ScrollToTop";
import CartToast from "./componant/CartToast";
import { Routes, Route } from "react-router-dom";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Contact from "./Pages/ContactUs";
import Footer from "./componant/Footer";
import CategoryPage from "./Pages/Category";
import Productcategory from "./componant/Productcategory";
import ProductView from "./componant/Productview";
import Login from "./Pages/Lgin";
import Dashboard from "./Pages/Dashboard";
import MyOrders from "./Pages/MyOrders";


function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <ScrollToTop />
      <CartToast />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-portal" element={<Dashboard/>} />

        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/productDetails" element={<ProductDetails />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/categories" element={<CategoryPage />} />
                  <Route path="/categories/:categoryId" element={<Productcategory />} />
                  <Route path="/products/:productId" element={<ProductView />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
