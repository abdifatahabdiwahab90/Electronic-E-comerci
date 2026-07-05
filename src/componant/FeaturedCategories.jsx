import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../data/category';
import {
  FaMobileAlt,
  FaLaptop,
  FaGamepad,
  FaCamera,
  FaTabletAlt,
  FaClock,
} from 'react-icons/fa';

const iconMap = {
  Smartphones: <FaMobileAlt />,
  Laptops: <FaLaptop />,
  Gaming: <FaGamepad />,
  Cameras: <FaCamera />,
  Tablets: <FaTabletAlt />,
  'Smart Watches': <FaClock />,
};

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const featured = categoriesData.slice(0, 6);

  return (
    <section className="bg-[#f8fafc] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="block mb-2 text-xs font-black uppercase tracking-widest text-blue-600">
            Browse
          </span>

          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Featured Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-10 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.id}`)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500"
            >
              <div className="relative flex h-36 items-center justify-center overflow-hidden bg-slate-50 p-2">
                <img
                  src={cat.bgImage}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-700 shadow-sm backdrop-blur-sm transition-colors duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                  {iconMap[cat.name] || <FaLaptop />}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center border-t border-slate-100 bg-white p-4">
                <h3 className="truncate text-sm font-extrabold text-slate-800 transition-colors group-hover:text-blue-600">
                  {cat.name}
                </h3>

                <span className="mt-0.5 text-[11px] font-medium text-slate-400">
                  5 Products
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/categories')}
            className="rounded-xl border-2 border-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-blue-600 transition-all hover:bg-blue-600 hover:text-white active:scale-[0.98]"
          >
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;