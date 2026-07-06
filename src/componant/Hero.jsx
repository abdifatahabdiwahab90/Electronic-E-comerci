import { Link } from "react-router-dom";
import { TOTAL_PRODUCTS } from "../data/category";
import { fallbackImage } from "../data/productImages";

function Hero() {
  return (
    <section className="section-dark relative overflow-hidden border-b border-cyan-900/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.12)_0%,_transparent_50%)]" />

      <div className="page-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <div className="order-2 lg:order-1">
            <p className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Premium Electronics
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Power your world with
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                smart technology
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
              Explore {TOTAL_PRODUCTS} curated devices across 8 categories.
              Latest tech, trusted brands, seamless shopping experience.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/product" className="btn-primary">Shop Collection</Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center rounded-full border border-cyan-500/40 px-7 py-3 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/10"
              >
                View Categories
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-cyan-900/40 pt-8">
              {[
                [TOTAL_PRODUCTS, "Products"],
                [8, "Categories"],
                ["4.9", "Rating"],
              ].map(([val, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-cyan-400">{val}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0f2140] to-[#0a1628] p-8 shadow-2xl shadow-cyan-500/10 lg:p-12">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
              <img
                src={fallbackImage}
                alt="Premium electronics"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="relative mx-auto aspect-square w-full max-w-md object-cover sm:max-w-lg"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
