import { useState, Fragment } from "react";
import { useOrderStore, ORDER_STATUSES, getStatusMeta, formatOrderDate, formatMoney } from "../data/orderStore";
import { FaChevronDown, FaChevronUp, FaBox } from "react-icons/fa";

function AdminOrderView() {
  const { orders, stats, updateStatus } = useOrderStore();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="mt-1 text-sm text-slate-500">{stats.totalOrders} orders · {stats.uniqueCustomers} customers · {formatMoney(stats.totalRevenue)} revenue</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[{ label: "Pending", value: stats.pendingOrders, color: "text-amber-600" }, { label: "Shipped", value: stats.shippedOrders, color: "text-violet-600" }, { label: "Delivered", value: stats.deliveredOrders, color: "text-green-600" }, { label: "Customers", value: stats.uniqueCustomers, color: "text-primary" }].map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">{s.label}</p><p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p></div>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {orders.length === 0 ? (
          <div className="px-6 py-16 text-center text-slate-400"><FaBox className="mx-auto mb-3 text-3xl text-slate-300" /><p>No orders yet. They appear when customers checkout.</p></div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-700">
              <tr><th className="px-6 py-4">Order ID</th><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Items</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Total</th><th className="px-6 py-4"></th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => {
                const meta = getStatusMeta(o.status);
                const isExpanded = expandedId === o.id;
                return (
                  <Fragment key={o.id}>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-primary">{o.id}</td>
                      <td className="px-6 py-4"><p className="font-medium text-slate-900">{o.customerName}</p><p className="text-xs text-slate-400">{o.customerEmail}</p></td>
                      <td className="px-6 py-4">{o.items.length} items</td>
                      <td className="px-6 py-4">{formatOrderDate(o.createdAt)}</td>
                      <td className="px-6 py-4">
                        <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold ${meta.color} cursor-pointer`}>
                          {ORDER_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                      </td>
                      <td className="px-6 py-4 font-semibold">{formatMoney(o.total)}</td>
                      <td className="px-6 py-4"><button onClick={() => setExpandedId(isExpanded ? null : o.id)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">{isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}</button></td>
                    </tr>
                    {isExpanded && (
                      <tr><td colSpan={7} className="bg-slate-50 px-6 py-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase text-slate-400">Purchased Items</p>
                            <ul className="mt-2 space-y-2">{o.items.map((item) => (
                              <li key={item.id} className="flex items-center gap-3 text-sm">
                                {item.image && <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />}
                                <div><p className="font-medium">{item.name}</p><p className="text-xs text-slate-400">{item.quantity}x · {formatMoney(item.price)}</p></div>
                              </li>
                            ))}</ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase text-slate-400">Details</p>
                            <div className="mt-2 space-y-1 text-sm"><p>Payment: {o.paymentMethod}</p>{o.shippingAddress && <p>Address: {o.shippingAddress}</p>}</div>
                            <p className="mt-4 text-xs font-semibold uppercase text-slate-400">Status History</p>
                            <ul className="mt-2 space-y-1">{(o.statusHistory || []).map((h, i) => (
                              <li key={i} className="text-xs text-slate-500">{getStatusMeta(h.status).label} — {formatOrderDate(h.at)}</li>
                            ))}</ul>
                          </div>
                        </div>
                      </td></tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminOrderView;
