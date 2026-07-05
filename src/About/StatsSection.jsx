

import {
  FaUsers,
  FaBoxOpen,
  FaGlobe,
  FaAward,
} from "react-icons/fa";

function StatsSection() {
  const stats = [
    {
      icon: <FaUsers />,
      number: "250K+",
      title: "Happy Customers",
    },
    {
      icon: <FaBoxOpen />,
      number: "10,000+",
      title: "Products",
    },
    {
      icon: <FaGlobe />,
      number: "45+",
      title: "Countries",
    },
    {
      icon: <FaAward />,
      number: "28",
      title: "Awards Won",
    },
  ];

  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-5">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center group"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl group-hover:bg-blue-600 group-hover:text-white transition">
                {item.icon}
              </div>

              <h2 className="text-4xl font-bold mt-6 text-slate-900">
                {item.number}
              </h2>

              <p className="text-gray-500 mt-2">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default StatsSection;