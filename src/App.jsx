import { Home } from "./Pages/Home";
import About from "./Pages/About";
import Product from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import SearchResults from "./Pages/SearchResults";
import Header from "./componant/Header";
import ScrollToTop from "./componant/ScrollToTop";
import { Routes, Route } from "react-router-dom";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist"
import Contact from "./Pages/Contact";
import Footer from "./componant/Footer";
import CategoryPage from "./Pages/Category";
import Productcategory from "./componant/Productcategory";
import ProductView from "./componant/Productview";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f0f7ff]">
      <ScrollToTop />
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
      </Routes>
      </main>
       <Footer />
    </div>
  );
}

export default App;