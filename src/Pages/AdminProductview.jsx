import { useState } from "react";
import { FaPlus, FaTrash, FaTimes, FaImage, FaLink } from "react-icons/fa";
import { useProductStore, getCategoryName } from "../data/productStore";
import ProductImage from "../componant/ProductImage";

function AdminProductView() {
  const { products, categories, addProduct, deleteProduct } = useProductStore();
  const [showModal, setShowModal] = useState(false);
  const [imageMode, setImageMode] = useState("url");
  const [form, setForm] = useState({ name: "", brand: "", catId: "cat-1", price: "", stock: "", description: "", image: "" });

  const resetForm = () => { setForm({ name: "", brand: "", catId: "cat-1", price: "", stock: "", description: "", image: "" }); setImageMode("url"); };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image must be smaller than 2MB."); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleAdd = (e) => { e.preventDefault(); addProduct(form); resetForm(); setShowModal(false); };
  const handleDelete = (id) => { if (window.confirm("Delete this product?")) deleteProduct(id); };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">{products.length} products — synced with shop</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          <FaPlus size={12} /> Add Product
        </button>
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
            ) : products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4"><ProductImage product={p} className="h-12 w-12" rounded="rounded-lg" showBadge={false} /></td>
                <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                <td className="px-6 py-4">{p.brand}</td>
                <td className="px-6 py-4"><span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{getCategoryName(p.catId)}</span></td>
                <td className="px-6 py-4 font-semibold">${p.price.toLocaleString()}</td>
                <td className="px-6 py-4"><span className={`font-medium ${(p.stock ?? 0) < 10 ? "text-amber-600" : "text-green-600"}`}>{p.stock ?? 0}</span></td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(p.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"><FaTrash size={11} /> Delete</button>
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
              <h2 className="text-lg font-bold">Add New Product</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><FaTimes size={16} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              {[{ l: "Product Name", k: "name", p: "e.g. iPhone 16" }, { l: "Brand", k: "brand", p: "e.g. Apple" }].map(({ l, k, p }) => (
                <div key={k}><label className="text-sm font-medium text-slate-700">{l}</label>
                  <input required className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder={p} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
                </div>
              ))}
              <div><label className="text-sm font-medium text-slate-700">Category</label>
                <select className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.catId} onChange={(e) => setForm({ ...form, catId: e.target.value })}>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
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
                <p className="mt-1 text-xs text-slate-400">Leave empty to use a default image.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-slate-700">Price ($)</label><input type="number" required min="1" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                <div><label className="text-sm font-medium text-slate-700">Stock</label><input type="number" required min="0" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
              </div>
              <div><label className="text-sm font-medium text-slate-700">Description</label><textarea rows={2} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="Short description..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="flex-1 rounded-xl border py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductView;
