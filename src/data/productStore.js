import { useState, useEffect, useCallback, useMemo } from "react";
import { categoriesData as SEED_CATEGORIES } from "./category";
import { getProductImage } from "./productImages";
import { api } from "./api";

export const STORAGE_EVENT = "electro-data-updated";
export function getCategoryName(catId) { return SEED_CATEGORIES.find((c) => c.id === catId)?.name ?? catId; }
const categoriesFor = (products) => SEED_CATEGORIES.map((cat) => { const productCount = products.filter((p) => p.catId === cat.id).length; return { ...cat, productCount, count: `${productCount} product${productCount === 1 ? "" : "s"}` }; });
const timeAgo = (date) => { const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60000); if (minutes < 1) return "Just now"; if (minutes < 60) return `${minutes} min ago`; if (minutes < 1440) return `${Math.floor(minutes / 60)} hr ago`; return `${Math.floor(minutes / 1440)} day ago`; };

export function useProductStore() {
  const [products, setProducts] = useState([]); const [activity, setActivity] = useState([]); const [error, setError] = useState("");
  const refresh = useCallback(async () => { try { const data = await api("/products"); setProducts(data); setError(""); } catch (err) { setError(err.message); } }, []);
  const refreshActivity = useCallback(async () => { try { setActivity((await api("/activity")).map((item) => ({ ...item, time: item.createdAt, timeLabel: timeAgo(item.createdAt) }))); } catch { setActivity([]); } }, []);
  useEffect(() => { refresh(); refreshActivity(); }, [refresh, refreshActivity]);
  const categories = useMemo(() => categoriesFor(products), [products]);
  const stats = useMemo(() => { const lowStock = products.filter((p) => (p.stock ?? 0) < 10); const inventoryValue = products.reduce((sum, p) => sum + p.price * (p.stock ?? 0), 0); return { productCount: products.length, categoryCount: SEED_CATEGORIES.length, activeCategories: categories.filter((c) => c.productCount > 0).length, lowStockCount: lowStock.length, inventoryValue, avgPrice: products.length ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0, outOfStock: products.filter((p) => p.stock === 0).length, categoryBreakdown: categories.map(({ id, name, productCount: count }) => ({ id, name, count })) }; }, [products, categories]);
  const addProduct = useCallback(async (data) => { try { const product = await api("/products", { method: "POST", body: JSON.stringify({ ...data, image: data.image?.trim() || getProductImage(data.catId, products.filter((p) => p.catId === data.catId).length), description: data.description?.trim() || `${data.name.trim()} — available at ElectroShop.` }) }); await refresh(); await refreshActivity(); return product; } catch (err) { return { error: err.message }; } }, [products, refresh, refreshActivity]);
  const deleteProduct = useCallback(async (id) => { try { await api(`/products/${id}`, { method: "DELETE" }); await refresh(); await refreshActivity(); return { success: true }; } catch (err) { return { error: err.message }; } }, [refresh, refreshActivity]);
  const updateProduct = useCallback(async (id, data) => { try { const product = await api(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) }); await refresh(); await refreshActivity(); return product; } catch (err) { return { error: err.message }; } }, [refresh, refreshActivity]);
  return { products, categories, stats, activity, totalProducts: products.length, addProduct, deleteProduct, updateProduct, refresh, error };
}
