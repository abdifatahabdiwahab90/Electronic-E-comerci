import { useNavigate } from "react-router-dom";
import { useProductStore } from "../data/productStore";
import SectionHeader from "./SectionHeader";

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const { categories } = useProductStore();

  return (
    <section className="section section-muted">
      <div className="page-container">
        <SectionHeader
          label="Collections"
          title="Shop by Category"
          subtitle="Browse our curated electronics across specialized categories."
        />

        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigate(`/categories/${cat.id}`)}
              className="card card-hover group overflow-hidden text-left"
            >
              <div className="image-box relative h-56 p-8">
                <img
                  src={cat.bgImage}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t border-cyan-50 px-5 py-4">
                <h3 className="text-sm font-medium text-slate-900 group-hover:text-cyan-600">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-slate-400">{cat.count}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
