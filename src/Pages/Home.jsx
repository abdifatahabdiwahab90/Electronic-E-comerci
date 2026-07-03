import Categories from "../componant/Categories"
import Hero from "../componant/Hero"
import WishlistHome from "../componant/WishlistHome"
import NewProduct from "../componant/NewProduct"
import Testimonials from "../componant/Testimonials"

import FeaturedProducts from "../componant/FeaturedProducts"
export function Home() {
    return <>
    
    <Hero />
    <Categories />
    <FeaturedProducts />
    <NewProduct />
    <WishlistHome />
    <Testimonials />
   
    </>
}