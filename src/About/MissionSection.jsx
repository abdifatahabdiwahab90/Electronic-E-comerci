

import { FaCheckCircle } from "react-icons/fa";

function MissionSection() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
              Our Mission
            </span>

            <h2 className="text-5xl font-bold text-slate-900 mt-6 leading-tight">
              Making Premium Tech Accessible to Everyone
            </h2>

            <p className="text-gray-600 leading-8 mt-6">
              We believe everyone deserves access to the latest technology.
              ElecZone bridges the gap between premium electronics and everyday
              budgets without ever compromising quality or authenticity.
            </p>

            <p className="text-gray-600 leading-8 mt-6">
              Every product is sourced from trusted distributors and comes with
              official manufacturer warranty. Our dedicated support team is
              available to help before and after every purchase.
            </p>

            <div className="space-y-5 mt-10">

              <div className="flex items-center gap-4">
                <FaCheckCircle className="text-blue-600 text-xl" />
                <p className="text-gray-700">
                  100% authentic products from trusted suppliers
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FaCheckCircle className="text-blue-600 text-xl" />
                <p className="text-gray-700">
                  Expert support available 7 days a week
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FaCheckCircle className="text-blue-600 text-xl" />
                <p className="text-gray-700">
                  Competitive pricing on all major brands
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FaCheckCircle className="text-blue-600 text-xl" />
                <p className="text-gray-700">
                  Eco-friendly packaging and fast delivery
                </p>
              </div>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
              alt="Office"
              className="w-full h-[520px] object-cover rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default MissionSection;