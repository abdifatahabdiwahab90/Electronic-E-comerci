import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import { FaStar, FaHeart, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { productsData } from "../data/category";
import ProductImage from "./ProductImage";

function Productview() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  const product = productsData.find(
    (item) => String(item.id) === String(productId)
  );

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center section-muted px-6">
        <p className="text-lg text-slate-600">Product not found</p>
        <button onClick={() => navigate(-1)} className="btn-secondary mt-6">Go back</button>
      </div>
    );
  }

  const isFavorite = wishlistItems.some(
    (item) => String(item.id) === String(product.id)
  );

  const outOfStock = product.badge === "OUT OF STOCK";
  const price = product.price.toLocaleString();

  return (
    <section className="min-h-screen bg-[#f0f7ff]">

      <div className="sticky top-[72px] z-40 border-b border-cyan-100 bg-white/90 backdrop-blur-xl">
        <div className="page-container flex items-center justify-between gap-4 py-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">{product.name}</p>
            <p className="text-sm font-bold text-cyan-600">${price}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => dispatch(addToCart(product))}
              disabled={outOfStock}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
                outOfStock ? "bg-slate-100 text-slate-400" : "btn-primary !px-5 !py-2.5"
              }`}
            >
              <FaShoppingCart size={12} />
              {outOfStock ? "Sold Out" : "Add to Cart"}
            </button>
            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                isFavorite ? "border-red-200 bg-red-50 text-red-500" : "border-slate-200 text-slate-400"
              }`}
            >
              <FaHeart size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="page-container py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
        >
          <FaArrowLeft size={12} /> Back
        </button>

        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-2">

            <ProductImage
              product={product}
              className="w-full lg:min-h-[560px]"
              rounded="rounded-none lg:rounded-l-2xl"
            />

            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                {product.brand} · {product.category}
              </p>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 lg:text-3xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-2">
                <FaStar className="text-amber-400" size={14} />
                <span className="text-sm font-medium text-slate-600">{product.rating}</span>
                {product.reviews && (
                  <span className="text-sm text-slate-400">({product.reviews} reviews)</span>
                )}
              </div>

              <p className="mt-8 text-3xl font-bold tracking-tight text-cyan-600">${price}</p>

              <p className="mt-6 text-sm leading-relaxed text-slate-600">
                {product.description}
              </p>

              <p className="mt-8 text-xs font-medium uppercase tracking-wider text-slate-400">
                {outOfStock ? "Out of stock" : "In stock — ships within 2-3 days"}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Productview;
