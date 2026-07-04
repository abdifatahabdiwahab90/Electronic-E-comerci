import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../data/category'; 
import { FaMobileAlt, FaLaptop, FaGamepad, FaCamera, FaTabletAlt, FaClock } from 'react-icons/fa';

// Map-kaan wuxuu icon walba u xirayaa category-giisa saxda ah
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
        
        {/* Header-ka sare */}
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest block mb-2">
            Browse
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Featured Categories
          </h2>
        </div>

        {/* Kaararka Categories-ka */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">
          {featured.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.id}`)}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              {}
              <div className="relative h-36 bg-slate-50 flex items-center justify-center overflow-hidden p-2">
                <img
                  src={cat.bgImage}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Icon oo u eg kan sawirka ku jira */}
                <div className="absolute bottom-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl flex items-center justify-center text-slate-700 text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-300">
                  {iconMap[cat.name] || <FaLaptop />}
                </div>
              </div>

              {/* Qoraalka Hoose */}
              <div className="p-4 bg-white flex-1 flex flex-col justify-center border-t border-slate-100">
                <h3 className="font-extrabold text-sm text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                  5 products
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Badhanka hoose ee kugu aparaya All Categories page */}
        <div className="text-center">
          <button
            onClick={() => navigate('/categories')}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all active:scale-[0.98]"
          >
            View All Categories
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCategories;