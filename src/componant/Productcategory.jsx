import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsData, categoriesData } from '../data/category'; 
import { useDispatch, useSelector } from "react-redux"; 
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice"; 
import { FaStar, FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";

const Products = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  const currentCategory = categoriesData.find(c => String(c.id) === String(categoryId));

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
    if (val === 'all') {
      navigate('/products');
    } else {
      navigate(`/categories/${val}`);
    }
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || String(product.catId) === String(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesPrice = product.price <= maxPrice;
    const matchesRating = minRating === 'all' || product.rating >= parseFloat(minRating);

    return matchesCategory && matchesSearch && matchesBrand && matchesPrice && matchesRating;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-to-high') return a.price - b.price;
    if (sortBy === 'high-to-low') return b.price - a.price;
    return b.rating - a.rating;
  });

  const uniqueBrands = ['all', ...new Set(productsData.filter(p => selectedCategory === 'all' || String(p.catId) === String(selectedCategory)).map(p => p.brand))];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate('/')}>🏠 Home</span>
          <span>&gt;</span>
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate('/categories')}>Shop</span>
          {currentCategory && (
            <>
              <span>&gt;</span>
              <span className="text-blue-600 font-bold">{currentCategory.name}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm font-medium">
            Showing <span className="text-slate-900 font-black">{sortedProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 cursor-pointer font-semibold"
            >
              <option value="popular">Most Popular</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-64 bg-white border border-slate-200 rounded-2xl p-5 h-fit sticky top-6">
            <h3 className="text-lg font-black text-slate-900 mb-5 flex items-center justify-between">
              Filters
              { (searchTerm || selectedCategory !== (categoryId || 'all') || selectedBrand !== 'all' || maxPrice !== 5000 || minRating !== 'all') && (
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory(categoryId || 'all'); setSelectedBrand('all'); setMaxPrice(5000); setMinRating('all'); }}
                  className="text-xs text-rose-500 font-bold hover:underline"
                >
                  Clear All
                </button>
              )}
            </h3>

            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Search</label>
              <input 
                type="text" 
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 placeholder-slate-400 font-medium"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
              <select 
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer text-slate-700 font-medium"
              >
                <option value="all">All Categories</option>
                {categoriesData.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Brand</label>
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer text-slate-700 font-medium"
              >
                {uniqueBrands.map(b => (
                  <option key={b} value={b}>{b === 'all' ? 'All Brands' : b}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Price</span>
                <span className="text-blue-600 text-sm font-black">$0 - ${maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Min Rating</label>
              <select 
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer text-slate-700 font-medium"
              >
                <option value="all">Any Rating</option>
                <option value="4.5">★ 4.5 & Up</option>
                <option value="4.0">★ 4.0 & Up</option>
                <option value="3.5">★ 3.5 & Up</option>
              </select>
            </div>
          </div>

          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center text-slate-400 py-20 bg-white rounded-3xl border border-slate-200">
                <p className="text-lg font-bold text-slate-700 mb-1">No products found matching filters</p>
                <p className="text-sm">Try adjusting your filter settings or search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => {
                  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

                  return (
                    <div 
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer p-4 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative bg-slate-50 h-56 rounded-xl flex items-center justify-center overflow-hidden mb-4 p-4">
                          {product.badge && (
                            <span className={`absolute top-3 left-3 text-[9px] font-black px-2 py-0.5 rounded-md z-10 tracking-wider uppercase ${
                              product.badge === 'NEW' ? 'bg-blue-600 text-white' : 'bg-rose-100 text-rose-600'
                            }`}>
                              {product.badge}
                            </span>
                          )}
                          
                          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <button 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                dispatch(toggleWishlist(product)); 
                              }} 
                              className={`w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200 transition-all text-xs active:scale-90 shadow-sm ${
                                isWishlisted ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
                              }`}
                            >
                              <FaHeart className={isWishlisted ? "fill-current" : ""} />
                            </button>
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/products/${product.id}`);
                              }}
                              className="w-8 h-8 bg-white hover:text-blue-600 rounded-full flex items-center justify-center border border-slate-200 transition-colors text-xs text-slate-400 shadow-sm"
                            >
                              <FaEye />
                            </button>
                          </div>

                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
                          />

                          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(addToCart(product));
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-1"
                            >
                              <FaShoppingCart size={12} /> Add to Cart
                            </button>
                          </div>
                        </div>

                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.brand}</span>
                        <h3 className="text-base font-extrabold mt-0.5 text-slate-800 group-hover:text-blue-600 line-clamp-2 min-h-[48px] transition-colors leading-snug">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex text-amber-400 text-xs gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-200'} />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-slate-500">{product.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-slate-900">${product.price.toLocaleString()}</span>
                          {product.oldPrice && (
                            <span className="text-xs line-through text-slate-400">${product.oldPrice.toLocaleString()}</span>
                          )}
                        </div>
                        {product.discount && (
                          <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-0.5 rounded-lg border border-orange-100">
                            {product.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;