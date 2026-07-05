

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function CTASection() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 rounded-[32px] px-8 py-16 md:px-16 text-center text-white shadow-2xl">

          <span className="bg-white/20 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest">
            Let's Work Together
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-8 leading-tight">
            Ready to Upgrade
            <br />
            Your Tech?
          </h2>

          <p className="max-w-2xl mx-auto text-blue-100 mt-6 text-lg leading-8">
            Explore thousands of premium electronic products from the world's
            most trusted brands with fast shipping and secure payments.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

            <Link
              to="/products"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3"
            >
              Shop Now
              <FaArrowRight />
            </Link>

            <Link
              to="/contact"
              className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTASection;