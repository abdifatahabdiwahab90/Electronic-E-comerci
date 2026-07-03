import { Home } from "./Pages/Home"
import { About } from "./Pages/About"
import Products from "./Pages/Products"
import { Contact } from "./Pages/contact"
import Header from "./componant/Header"
import { Routes,Route } from "react-router-dom"
import Cart from "./Pages/Cart"


function App() {

  return (
    <>
   <Header />
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/products" element={<Products/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/cart" element={<Cart/>} />
    
   </Routes>
    </>
  )
}

export default App
