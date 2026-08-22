import { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "./api";

export const ORDER_STATUSES = [
  { id: "pending", label: "Pending", color: "bg-amber-50 text-amber-600" }, { id: "confirmed", label: "Confirmed", color: "bg-blue-50 text-blue-600" }, { id: "processing", label: "Processing", color: "bg-indigo-50 text-indigo-600" }, { id: "shipped", label: "Shipped", color: "bg-violet-50 text-violet-600" }, { id: "delivered", label: "Delivered", color: "bg-green-50 text-green-600" }, { id: "cancelled", label: "Cancelled", color: "bg-red-50 text-red-600" },
];
export const getStatusMeta = (status) => ORDER_STATUSES.find((item) => item.id === status) || ORDER_STATUSES[0];
export const formatOrderDate = (iso) => new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
export const formatMoney = (n) => `$${Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export async function createOrder(data) { try { return await api("/orders", { method: "POST", body: JSON.stringify(data) }); } catch (error) { return { error: error.message }; } }

export function useOrderStore({ mine = false } = {}) {
  const [orders, setOrders] = useState([]);
  const refresh = useCallback(async () => { try { setOrders(await api(mine ? "/orders/mine" : "/orders")); } catch { setOrders([]); } }, [mine]);
  useEffect(() => { refresh(); }, [refresh]);
  const stats = useMemo(() => ({ totalOrders: orders.length, pendingOrders: orders.filter((o) => o.status === "pending").length, shippedOrders: orders.filter((o) => o.status === "shipped").length, deliveredOrders: orders.filter((o) => o.status === "delivered").length, totalRevenue: orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0), uniqueCustomers: new Set(orders.map((o) => o.customerEmail)).size }), [orders]);
  const updateStatus = async (id, status) => { await api(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }); await refresh(); };
  return { orders, stats, refresh, updateStatus };
}
