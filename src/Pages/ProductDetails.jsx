import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { promoBlogs } from "../data/promos";
import ProductImage from "../componant/ProductImage";

export default function ProductDetails() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="section section-white min-h-screen">
      <div className="page-container max-w-3xl">

        <div className="mb-12 text-center">
          <p className="section-label">Deals</p>
          <h1 className="page-title mt-3">Promotions</h1>
          <p className="page-subtitle mx-auto">Exclusive offers from our collection</p>
        </div>

        <form onSubmit={handleSearch} className="relative mb-14">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input pr-28"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !px-5 !py-2 text-xs">
            Search
          </button>
        </form>

        <div className="space-y-4">
          {promoBlogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => navigate(`/products/${blog.productId}`)}
              className="card card-hover flex cursor-pointer gap-5 overflow-hidden p-4"
            >
              <ProductImage
                src={blog.image}
                alt={blog.title}
                tag={blog.tag}
                className="h-28 w-28 shrink-0"
                rounded="rounded-2xl"
                badgeClassName="left-2 top-2 px-2 py-0.5 text-[9px]"
              />

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span className="text-[10px] text-slate-400">{blog.date}</span>

                <h2 className="mt-2 line-clamp-1 text-sm font-medium text-slate-900">
                  {blog.title}
                </h2>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {blog.excerpt}
                </p>

                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-cyan-600">
                  View Details <FaArrowRight size={9} />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
