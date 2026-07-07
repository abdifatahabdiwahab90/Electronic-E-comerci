import { useNavigate } from "react-router-dom";
import { useProductStore } from "../data/productStore";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categories, totalProducts } = useProductStore();

  return (
    <section className="section section-muted min-h-screen">
      <div className="page-container">

        <div className="mb-12">
          <p className="section-label">Browse</p>
          <h1 className="page-title mt-3">Categories</h1>
          <p className="page-subtitle">
            {totalProducts} products across {categories.length} categories
          </p>
        </div>

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

export default CategoryPage;
