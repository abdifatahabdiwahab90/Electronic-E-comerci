import Categories from "../componant/FeaturedCategories"
import Hero from "../componant/Hero"
import Favorites from "../componant/Favorites"
import NewProduct from "../componant/NewProduct"
import Testimonials from "../componant/Testimonials"

import FeaturedProducts from "../componant/FeaturedProducts"
export function Home() {
    return <>
    
    <Hero />
    <Categories />
    <FeaturedProducts />
    <NewProduct />
    <Favorites />
    <Testimonials />
   
    </>
}