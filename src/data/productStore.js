import { useState, useEffect, useCallback, useMemo } from "react";
import { categoriesData as SEED_CATEGORIES, productsData as SEED_PRODUCTS } from "./category";
import { getProductImage } from "./productImages";

export const PRODUCTS_KEY = "electroProducts";
export const ACTIVITY_KEY = "electroActivity";
export const STORAGE_EVENT = "electro-data-updated";

function dispatchUpdate() {
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

function readProducts() {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore */
  }

  const seeded = SEED_PRODUCTS.map((p, i) => ({
    ...p,
    stock: 10 + (i % 25),
  }));
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seeded));
  return seeded;
}

function writeProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  dispatchUpdate();
}

export function getProducts() {
  return readProducts();
}

export function getCategories() {
  const products = readProducts();
  return SEED_CATEGORIES.map((cat) => {
    const count = products.filter((p) => p.catId === cat.id).length;
    return {
      ...cat,
      count: `${count} product${count !== 1 ? "s" : ""}`,
      productCount: count,
    };
  });
}

export function getCategoryName(catId) {
  return SEED_CATEGORIES.find((c) => c.id === catId)?.name ?? catId;
}

export function getTotalProducts() {
  return readProducts().length;
}

export function getDashboardStats() {
  const products = readProducts();
  const categories = getCategories();
  const lowStock = products.filter((p) => (p.stock ?? 0) < 10);
  const inventoryValue = products.reduce((sum, p) => sum + p.price * (p.stock ?? 0), 0);
  const avgPrice = products.length
    ? products.reduce((sum, p) => sum + p.price, 0) / products.length
    : 0;

  return {
    productCount: products.length,
    categoryCount: SEED_CATEGORIES.length,
    activeCategories: categories.filter((c) => c.productCount > 0).length,
    lowStockCount: lowStock.length,
    inventoryValue,
    avgPrice,
    outOfStock: products.filter((p) => (p.stock ?? 0) === 0).length,
    categoryBreakdown: categories.map((c) => ({
      id: c.id,
      name: c.name,
      count: c.productCount,
    })),
  };
}

function readActivity() {
  try {
    const stored = localStorage.getItem(ACTIVITY_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore */
  }
  return [];
}

export function addActivity(action, type) {
  const entry = { action, type, time: new Date().toISOString() };
  const updated = [entry, ...readActivity()].slice(0, 20);
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
  dispatchUpdate();
}

function formatTimeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} day ago`;
}

export function getRecentActivity(limit = 6) {
  return readActivity().slice(0, limit).map((a) => ({
    ...a,
    timeLabel: formatTimeAgo(a.time),
  }));
}

export function addProduct({ name, brand, catId, price, stock, description, image }) {
  const products = readProducts();
  const catProducts = products.filter((p) => p.catId === catId);
  const newProduct = {
    id: `p-${Date.now()}`,
    catId,
    name: name.trim(),
    brand: brand.trim(),
    price: Number(price),
    stock: Number(stock),
    rating: 4.0,
    reviews: 0,
    image: image?.trim() || getProductImage(catId, catProducts.length),
    description: description?.trim() || `${name.trim()} — available at ElectroShop.`,
  };
  writeProducts([...products, newProduct]);
  addActivity(`New product: ${newProduct.name}`, "product");
  return newProduct;
}

export function deleteProduct(id) {
  const products = readProducts();
  const removed = products.find((p) => p.id === id);
  writeProducts(products.filter((p) => p.id !== id));
  if (removed) addActivity(`Deleted: ${removed.name}`, "product");
}

export function deductStock(orderItems) {
  const products = readProducts();

  for (const item of orderItems) {
    const product = products.find((p) => p.id === item.id);
    if (!product) return { error: `Product not found: ${item.name}` };

    const currentStock = product.stock ?? 0;
    if (currentStock < item.quantity) {
      return {
        error: `Not enough stock for ${product.name}. Available: ${currentStock}`,
      };
    }
  }

  const updated = products.map((p) => {
    const ordered = orderItems.find((i) => i.id === p.id);
    if (!ordered) return p;

    const newStock = (p.stock ?? 0) - ordered.quantity;
    return {
      ...p,
      stock: newStock,
      badge: newStock === 0 ? "OUT OF STOCK" : p.badge,
    };
  });

  writeProducts(updated);
  return { success: true };
}

export function useProductStore() {
  const [products, setProducts] = useState(() => getProducts());
  const [categories, setCategories] = useState(() => getCategories());
  const [activity, setActivity] = useState(() => getRecentActivity());

  const refresh = useCallback(() => {
    setProducts(getProducts());
    setCategories(getCategories());
    setActivity(getRecentActivity());
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === PRODUCTS_KEY || e.key === ACTIVITY_KEY) refresh();
    };
    window.addEventListener(STORAGE_EVENT, refresh);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(STORAGE_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  const stats = useMemo(() => getDashboardStats(), [products, categories]);

  const add = useCallback(
    (data) => {
      addProduct(data);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id) => {
      deleteProduct(id);
      refresh();
    },
    [refresh]
  );

  return {
    products,
    categories,
    stats,
    activity,
    totalProducts: products.length,
    addProduct: add,
    deleteProduct: remove,
    refresh,
  };
}
