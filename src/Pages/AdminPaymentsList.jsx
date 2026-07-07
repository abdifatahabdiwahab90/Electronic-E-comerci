import { useOrderStore, formatOrderDate, formatMoney, getStatusMeta } from "../data/orderStore";

function AdminPaymentsList() {
  const { orders } = useOrderStore();
  const payments = orders.map((o) => ({
    id: o.id.replace("ORD", "TXN"), orderId: o.id, customer: o.customerName,
    method: o.paymentMethod, amount: o.total, status: o.status === "cancelled" ? "Failed" : "Completed",
    date: o.createdAt, orderStatus: o.status,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
        <p className="mt-1 text-sm text-slate-500">{payments.length} payments — live from orders</p>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {payments.length === 0 ? (
          <div className="px-6 py-16 text-center text-slate-400">No payments yet.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-700">
              <tr><th className="px-6 py-4">Transaction</th><th className="px-6 py-4">Order</th><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Method</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono text-xs">{p.id}</td>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-primary">{p.orderId}</td>
                  <td className="px-6 py-4 font-medium">{p.customer}</td>
                  <td className="px-6 py-4">{p.method}</td>
                  <td className="px-6 py-4">{formatOrderDate(p.date)}</td>
                  <td className="px-6 py-4 font-semibold">{formatMoney(p.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold ${p.status === "Completed" ? "text-green-600" : "text-red-600"}`}>{p.status === "Completed" ? "✓" : "✗"} {p.status}</span>
                    <p className="mt-0.5 text-xs text-slate-400">{getStatusMeta(p.orderStatus).label}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminPaymentsList;
