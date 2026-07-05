import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsData } from '../data/category'; 
import { useDispatch, useSelector } from "react-redux"; 
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice"; 
import { FaStar, FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";

const ProductView = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  
  const product = productsData.find((p) => String(p.id) === String(productId));

  
  const relatedProducts = product
    ? productsData.filter((p) => String(p.catId) === String(product.catId) && String(p.id) !== String(product.id)).slice(0, 4)
    : [];

  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const isWishlisted = product ? wishlistItems.some((item) => String(item.id) === String(product.id)) : false;

  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

 
  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0); 
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Alaabtaan lama helin!</h2>
        <button onClick={() => navigate(-1)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors">Back</button>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: quantity }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        
    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
          
      
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-center h-[400px] md:h-[500px] overflow-hidden">
              <img src={mainImage} alt={product.name} className="max-h-full max-w-full object-contain transition-all duration-300" />
            </div>
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 bg-white border rounded-xl p-2 flex items-center justify-center overflow-hidden transition-all ${
                    mainImage === img ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

      
          <div className="flex flex-col h-full justify-center">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-widest">{product.brand}</span>
            <h1 className="text-3xl font-black mt-1 text-slate-900 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-amber-400 text-sm gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-200'} />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-700">{product.rating}</span>
              <span className="text-xs text-slate-400 font-medium">({product.reviews || 0} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <span className="text-3xl font-black text-slate-900">${product.price.toLocaleString()}</span>
              {product.oldPrice && <span className="text-base line-through text-slate-400">${product.oldPrice.toLocaleString()}</span>}
              {product.discount && <span className="text-xs font-bold bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-lg border border-orange-100">{product.discount}</span>}
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mt-6 border-t border-slate-100 pt-6 font-medium">
              {product.description || "Experience premium quality and performance engineered for excellence."}
            </p>

            <div className="flex items-center gap-6 mt-8">
              <span className="text-sm font-semibold text-slate-400">Quantity:</span>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1.5 hover:bg-slate-100 text-slate-500 font-bold">-</button>
                <span className="px-4 py-1.5 font-black text-sm text-slate-800">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1.5 hover:bg-slate-100 text-slate-500 font-bold">+</button>
              </div>
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">In Stock</span>
            </div>

            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100">
              <button onClick={handleAddToCart} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all"><FaShoppingCart size={14} /> Add to Cart</button>
              <button onClick={() => { handleAddToCart(); navigate('/cart'); }} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-sm active:scale-[0.99] transition-all">Buy Now</button>
              <button onClick={() => dispatch(toggleWishlist(product))} className={`w-12 h-12 bg-white border flex items-center justify-center rounded-xl text-lg transition-all active:scale-95 ${isWishlisted ? 'border-rose-500 text-rose-500 bg-rose-50' : 'border-slate-200 text-slate-400 hover:text-rose-500'}`}><FaHeart /></button>
            </div>
          </div>
        </div>

       
        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-200 pt-16">
            <h2 className="text-2xl font-black mb-8 text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
              Alaabta la Midka ah (Related Products)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
               
                    <div className="relative bg-slate-50 h-40 rounded-xl flex items-center justify-center overflow-hidden mb-3 p-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white border border-slate-200 p-2.5 rounded-full text-blue-600 shadow-sm"><FaEye size={14} /></span>
                      </div>
                    </div>

                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{item.brand}</span>
                    <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-blue-600 line-clamp-2 mt-0.5 min-h-[40px] leading-snug transition-colors">
                      {item.name}
                    </h3>
                  </div>

           
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-100">
                    <span className="text-base font-black text-slate-900">${item.price.toLocaleString()}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToCart({ ...item, quantity: 1 }));
                      }}
                      className="bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white p-2 rounded-xl transition-colors text-xs active:scale-95"
                      title="Add to Cart"
                    >
                      <FaShoppingCart size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductView;