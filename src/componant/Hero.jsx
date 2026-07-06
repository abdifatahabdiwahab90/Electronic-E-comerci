import { Link } from "react-router-dom";
import { heroImage } from "../data/productImages";

function Hero() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="page-container grid items-center gap-10 lg:grid-cols-2">

        {/* Left */}
        <div>
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            New Collection 2026
          </span>

          <h1 className="mt-4 text-4xl lg:text-6xl font-bold leading-tight text-slate-900">
            Premium
            <span className="block text-primary">
              Electronics
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-slate-600">
            Discover the latest smartphones, laptops, accessories and more.
            High quality products at affordable prices.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/product"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Shop Now
            </Link>

            <Link
              to="/categories"
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Categories
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="Electronics"
            className="w-full max-w-md object-contain"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;