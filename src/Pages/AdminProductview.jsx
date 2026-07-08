import { useState, useMemo } from "react";
import { FaPlus, FaTrash, FaTimes, FaImage, FaLink, FaEdit, FaSearch } from "react-icons/fa";
import { useProductStore, getCategoryName } from "../data/productStore";
import ProductImage from "../componant/ProductImage";

function AdminProductView() {
  const { products, categories, addProduct, deleteProduct, updateProduct } = useProductStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageMode, setImageMode] = useState("url");
  const [form, setForm] = useState({ name: "", brand: "", catId: "cat-1", price: "", stock: "", description: "", image: "" });
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.catId !== categoryFilter) return false;
      const stock = p.stock ?? 0;
      if (stockFilter === "low" && stock >= 10) return false;
      if (stockFilter === "out" && stock !== 0) return false;
      if (stockFilter === "in" && stock === 0) return false;
      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        getCategoryName(p.catId).toLowerCase().includes(query)
      );
    });
  }, [products, search, categoryFilter, stockFilter]);

  const hasActiveFilters = search.trim() || categoryFilter !== "all" || stockFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setStockFilter("all");
  };

  const resetForm = () => {
    setForm({ name: "", brand: "", catId: "cat-1", price: "", stock: "", description: "", image: "" });
    setImageMode("url");
    setEditingId(null);
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image must be smaller than 2MB."); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const openAddModal = () => { resetForm(); setShowModal(true); };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setForm({ name: product.name, brand: product.brand, catId: product.catId, price: product.price, stock: product.stock, description: product.description, image: product.image || "" });
    setImageMode("url");
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if (editingId) {
      result = updateProduct(editingId, { name: form.name, image: form.image });
    } else {
      result = addProduct(form);
    }
    if (result?.error) {
      alert(result.error);
      return;
    }
    resetForm();
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    const result = deleteProduct(id);
    if (result?.error) alert(result.error);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            {hasActiveFilters
              ? `${filteredProducts.length} of ${products.length} products`
              : `${products.length} products — synced with shop`}
          </p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          <FaPlus size={12} /> Add Product
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="relative min-w-[200px] flex-1">
          <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            placeholder="Search name, brand, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="all">All Stock</option>
          <option value="in">In Stock</option>
          <option value="low">Low Stock (&lt;10)</option>
          <option value="out">Out of Stock</option>
        </select>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Clear
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-700">
            <tr>
              <th className="px-6 py-4">Image</th><th className="px-6 py-4">Name</th><th className="px-6 py-4">Brand</th>
              <th className="px-6 py-4">Category</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Stock</th><th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">No products yet. Click &quot;Add Product&quot;.</td></tr>
            ) : filteredProducts.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">No products match your filters.</td></tr>
            ) : filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4"><ProductImage product={p} className="h-12 w-12" rounded="rounded-lg" showBadge={false} /></td>
                <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                <td className="px-6 py-4">{p.brand}</td>
                <td className="px-6 py-4"><span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{getCategoryName(p.catId)}</span></td>
                <td className="px-6 py-4 font-semibold">${p.price.toLocaleString()}</td>
                <td className="px-6 py-4"><span className={`font-medium ${(p.stock ?? 0) < 10 ? "text-amber-600" : "text-green-600"}`}>{p.stock ?? 0}</span></td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEditModal(p)} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100"><FaEdit size={11} /> Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"><FaTrash size={11} /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">{editingId ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><FaTimes size={16} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Product Name</label>
                <input required className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. iPhone 16" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>

              {!editingId && (
                <>
                  <div><label className="text-sm font-medium text-slate-700">Brand</label>
                    <input required className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Apple" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                  </div>
                  <div><label className="text-sm font-medium text-slate-700">Category</label>
                    <select className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.catId} onChange={(e) => setForm({ ...form, catId: e.target.value })}>
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="text-sm font-medium text-slate-700">Product Image</label>
                <div className="mt-2 flex rounded-lg bg-slate-100 p-1">
                  <button type="button" onClick={() => setImageMode("url")} className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold ${imageMode === "url" ? "bg-white text-primary shadow-sm" : "text-slate-500"}`}><FaLink size={11} /> URL Link</button>
                  <button type="button" onClick={() => setImageMode("upload")} className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold ${imageMode === "upload" ? "bg-white text-primary shadow-sm" : "text-slate-500"}`}><FaImage size={11} /> Upload</button>
                </div>
                {imageMode === "url" ? (
                  <input type="url" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="https://example.com/image.jpg" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                ) : (
                  <input type="file" accept="image/*" className="mt-2 w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary" onChange={handleImageFile} />
                )}
                {form.image && <img src={form.image} alt="Preview" className="mt-3 h-24 w-24 rounded-xl object-cover" />}
                {!editingId && <p className="mt-1 text-xs text-slate-400">Leave empty to use a default image.</p>}
              </div>

              {!editingId && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium text-slate-700">Price ($)</label><input type="number" required min="1" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                    <div><label className="text-sm font-medium text-slate-700">Stock</label><input type="number" required min="0" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
                  </div>
                  <div><label className="text-sm font-medium text-slate-700">Description</label><textarea rows={2} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="Short description..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="flex-1 rounded-xl border py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">{editingId ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductView;
