

import {
  FaLaptop,
  FaMobileAlt,
  FaHeadphones,
  FaCamera,
  FaGamepad,
  FaClock,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Laptops",
    icon: <FaLaptop size={40} />,
  },
  {
    id: 2,
    title: "Smartphones",
    icon: <FaMobileAlt size={40} />,
  },
  {
    id: 3,
    title: "Headphones",
    icon: <FaHeadphones size={40} />,
  },
  {
    id: 4,
    title: "Cameras",
    icon: <FaCamera size={40} />,
  },
  {
    id: 5,
    title: "Gaming",
    icon: <FaGamepad size={40} />,
  },
  {
    id: 6,
    title: "Smart Watches",
    icon: <FaClock size={40} />,
  },
];

function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Shop by Category</h2>
        <p className="text-gray-500 mt-2">
          Find your favorite electronic products.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer"
          >
            {item.icon}
            <h3 className="mt-4 font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;