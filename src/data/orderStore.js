import { useState, useEffect, useCallback, useMemo } from "react";
import { addActivity, deductStock, STORAGE_EVENT } from "./productStore";

export const ORDERS_KEY = "electroOrders";

export const ORDER_STATUSES = [
  { id: "pending", label: "Pending", color: "bg-amber-50 text-amber-600" },
  { id: "confirmed", label: "Confirmed", color: "bg-blue-50 text-blue-600" },
  { id: "processing", label: "Processing", color: "bg-indigo-50 text-indigo-600" },
  { id: "shipped", label: "Shipped", color: "bg-violet-50 text-violet-600" },
  { id: "delivered", label: "Delivered", color: "bg-green-50 text-green-600" },
  { id: "cancelled", label: "Cancelled", color: "bg-red-50 text-red-600" },
];

export function getStatusMeta(statusId) {
  return ORDER_STATUSES.find((s) => s.id === statusId) ?? ORDER_STATUSES[0];
}

function dispatchUpdate() {
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

function readOrders() {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore */
  }
  return [];
}

function writeOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  dispatchUpdate();
}

export function getOrders() {
  return readOrders();
}

export function getOrdersByEmail(email) {
  return readOrders().filter((o) => o.customerEmail === email);
}

export function createOrder({ customerName, customerEmail, items, paymentMethod, shippingAddress }) {
  const stockResult = deductStock(items);
  if (stockResult.error) {
    return { error: stockResult.error };
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: `ORD-${Date.now()}`,
    customerName,
    customerEmail,
    items: items.map(({ id, name, price, quantity, image, brand }) => ({
      id, name, price, quantity, image, brand,
    })),
    total,
    paymentMethod,
    shippingAddress: shippingAddress?.trim() || "",
    status: "pending",
    createdAt: new Date().toISOString(),
    statusHistory: [{ status: "pending", at: new Date().toISOString() }],
  };
  writeOrders([order, ...readOrders()]);
  addActivity(`New order: ${order.id} — ${customerName}`, "order");
  return order;
}

export function updateOrderStatus(orderId, newStatus) {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return null;
  const order = orders[idx];
  order.status = newStatus;
  order.statusHistory = [...(order.statusHistory || []), { status: newStatus, at: new Date().toISOString() }];
  orders[idx] = order;
  writeOrders(orders);
  addActivity(`Order ${orderId}: ${getStatusMeta(newStatus).label}`, "order");
  return order;
}

export function getOrderStats() {
  const orders = readOrders();
  return {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    shippedOrders: orders.filter((o) => o.status === "shipped").length,
    deliveredOrders: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0),
    uniqueCustomers: new Set(orders.map((o) => o.customerEmail)).size,
  };
}

export function formatOrderDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function formatMoney(n) {
  return `$${Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function useOrderStore() {
  const [orders, setOrders] = useState(() => getOrders());
  const refresh = useCallback(() => setOrders(getOrders()), []);

  useEffect(() => {
    window.addEventListener(STORAGE_EVENT, refresh);
    const onStorage = (e) => { if (e.key === ORDERS_KEY) refresh(); };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(STORAGE_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  return {
    orders,
    stats: useMemo(() => getOrderStats(), [orders]),
    refresh,
    updateStatus: (id, status) => { updateOrderStatus(id, status); refresh(); },
  };
}
