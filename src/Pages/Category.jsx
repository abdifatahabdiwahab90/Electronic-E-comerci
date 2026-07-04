import React from 'react';
import { useNavigate } from 'react-router-dom';
// Hubi in jidka faylka xogtaada uu sax yahay:
import { categoriesData } from '../data/category'; 

const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Qaybta Sare ee Title-ka */}
        <div className="text-center my-12">
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
            All Categories
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-md mx-auto">
            Guji mid ka mid ah qaybaha si aad u aragto alaabta ku dhex jirta.
          </p>
        </div>

        {/* Grid-ka Qaybaha (No Gradient, Solid White Bottom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categoriesData.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => navigate(`/categories/${String(cat.id)}`)}
              className="flex flex-col h-64 rounded-2xl overflow-hidden cursor-pointer bg-white border border-slate-200 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1"
            >
              {/* Qaybta Sare: Sawirka oo nadiif ah (Ma jiro wax Gradient ah) */}
              <div className="relative flex-1 overflow-hidden bg-slate-50">
                <img 
                  src={cat.bgImage} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  /* Haddii sawiradu ay yihiin png asalkoodu cad yahay, 
                     waxaa kaloo u isticmaali kartaa 'object-contain p-4' */
                />
              </div>
              
              {/* Qaybta Hoose: Qoraalka oo ku dhex jira sanduuq cad oo adke ah */}
              <div className="p-4 bg-white border-t border-slate-100">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-0.5">
                  Browse Category
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                  {cat.name}
                </h3>
                <p className="text-xs font-medium text-slate-400 mt-0.5">
                  {cat.count} items available
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CategoryPage;