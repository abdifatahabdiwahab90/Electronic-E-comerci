import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>

            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              New Collection 2026
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mt-6">
              Discover Premium
              <span className="block text-blue-600">
                Electronics
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8 max-w-xl">
              Shop the latest smartphones, laptops, headphones,
              gaming devices and accessories with premium quality
              and affordable prices.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/product"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-semibold transition"
              >
                Shop Now
                <FaArrowRight />
              </Link>

              <Link
                to="/about"
                className="border border-slate-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition"
              >
                Learn More
              </Link>

            </div>

            <div className="flex gap-12 mt-14">

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  10K+
                </h2>

                <p className="text-slate-500">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  500+
                </h2>

                <p className="text-slate-500">
                  Products
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  4.9★
                </h2>

                <p className="text-slate-500">
                  Customer Rating
                </p>
              </div>

            </div>

          </div>

          {/* Right */}
          <div>

            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
              alt="Electronics"
              className="w-full rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;