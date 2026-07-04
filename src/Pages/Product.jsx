import { useState } from "react";
import { productsData, categoriesData } from "../data/category"; 
import ProductCard from "../componant/ProductCard";

// Fiiro gaar ah: Haddii aad isticmaalayso React Router, waxaad soo dhoofsan kartaa useNavigate
// import { useNavigate } from "react-router-dom";

function Product({ addToCart, toggleWishlist, wishlist = [] }) {
  // const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3000); 
  const [minRating, setMinRating] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Popular");

  // --- Sifaynta Xogta (Filtering Logic) ---
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.brand.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || String(product.catId) === String(category);
    const matchesBrand = brand === "All" || (product.brand && product.brand.toLowerCase() === brand.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    const matchesRating = minRating === "All" || product.rating >= parseFloat(minRating);
    const matchesStock = !inStockOnly || product.badge !== "OUT OF STOCK"; 

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock;
  });

  // --- Kala Mudnaanta (Sorting Logic) ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Low to High") return a.price - b.price;
    if (sortBy === "High to Low") return b.price - a.price;
    return b.rating - a.rating; 
  });

  const uniqueBrands = ["All", ...new Set(productsData.map((p) => p.brand).filter(Boolean))];

  // --- Function-ka loo isticmaalayo in loogu gudbo View Page ---
  const handleViewProduct = (productId) => {
    console.log(`U gudub bogga faahfaahinta alaabta: ${productId}`);
    // Haddii aad router isticmaalayso: navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Jidka Bogga */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span className="cursor-pointer hover:text-blue-600">🏠 Home</span>
          <span>&gt;</span>
          <span className="text-blue-600 font-medium">Shop</span>
        </div>

        {/* Top Bar (Natiijada iyo Kala-doorashada Sort-ga) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-200">
          <p className="text-slate-500 text-sm font-medium">
            We found <span className="text-slate-900 font-bold">{sortedProducts.length}</span> products for you
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-sm"
            >
              <option value="Popular">Most Popular</option>
              <option value="Low to High">Price: Low to High</option>
              <option value="High to Low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Layout: Sidebar (Bidix) + Products Grid (Midig) */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* BIDIX: Sidebar Filters (Caddaan) */}
          <div className="w-full lg:w-64 bg-white border border-slate-200 rounded-2xl p-5 h-fit sticky top-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center justify-between">
              Filters
              {(search || category !== "All" || brand !== "All" || maxPrice !== 3000 || minRating !== "All" || inStockOnly) && (
                <button 
                  onClick={() => { setSearch(""); setCategory("All"); setBrand("All"); setMaxPrice(3000); setMinRating("All"); setInStockOnly(false); }}
                  className="text-xs text-red-500 hover:underline font-medium"
                >
                  Clear All
                </button>
              )}
            </h3>

            {/* 1. Search */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Search Product</label>
              <input
                type="text"
                placeholder="Search name or brand..."
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:bg-white placeholder-slate-400 text-slate-800"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* 2. Category */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer text-slate-700"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categoriesData.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Brand */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Brand</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer text-slate-700"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                {uniqueBrands.map((b) => (
                  <option key={b} value={b}>{b === "All" ? "All Brands" : b}</option>
                ))}
              </select>
            </div>

            {/* 4. Price Range */}
            <div className="mb-5">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Max Price</span>
                <span className="text-blue-600 text-sm font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* 5. Min Rating */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rating</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer text-slate-700"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              >
                <option value="All">Any Rating</option>
                <option value="4.5">⭐ 4.5 & Up</option>
                <option value="4.0">⭐ 4.0 & Up</option>
                <option value="3.5">⭐ 3.5 & Up</option>
              </select>
            </div>

            {/* 6. In Stock Only */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <input
                type="checkbox"
                id="stockToggle"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600 border-slate-300 cursor-pointer"
              />
              <label htmlFor="stockToggle" className="text-sm font-medium text-slate-600 cursor-pointer select-none">
                In Stock Only
              </label>
            </div>
          </div>

          {/* MIDIG: Products Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center text-slate-400 py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-lg font-medium text-slate-600 mb-1">No products match your criteria</p>
                <p className="text-sm">Try resetting your filters or changing your search phrase.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  /* Halkan waxaan ku baasnay shaqooyinka (props) si ProductCard-ka 
                    uu u yeesho awood uu alaabta ugu daro Cart, Wishlist ama u furo View.
                  */
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onView={() => handleViewProduct(product.id)}
                    onAddToCart={() => addToCart && addToCart(product)}
                    onToggleWishlist={() => toggleWishlist && toggleWishlist(product)}
                    isWishlisted={wishlist.some(item => item.id === product.id)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Product;