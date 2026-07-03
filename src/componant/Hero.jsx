
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <div>
          <span className="text-blue-600 font-semibold">
            New Collection 2026
          </span>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            Discover The Latest
            <span className="text-blue-600"> Electronics</span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            Shop premium smartphones, laptops, headphones, gaming accessories,
            smart watches, and more with amazing prices.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/products"
              className="bg-blue-600 text-white px-7 py-3 rounded-lg hover:bg-blue-700"
            >
              Shop Now
            </Link>

            <Link
              to="/about"
              className="border border-blue-600 text-blue-600 px-7 py-3 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
            alt="Electronics"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;