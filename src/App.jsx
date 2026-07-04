import { Home } from "./Pages/Home";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Blog from "./Pages/Blog";
import Header from "./componant/Header";
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
    <>
      <Header />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        
        <Route path="/categories" element={<CategoryPage />} />
        
        <Route path="/categories/:categoryId" element={<Productcategory />} />
        
        <Route path="/products/:productId" element={<ProductView />} />
        
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
       <Footer />
    </>
  );
}

export default App;