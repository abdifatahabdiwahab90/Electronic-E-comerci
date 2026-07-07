import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaShoppingBag,
  FaCreditCard,
  FaChartLine,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";
import AdminProductView from "./AdminProductview";
import AdminOrderView from "./AdminOrderView";
import AdminPaymentsList from "./AdminPaymentsList";
import { useProductStore } from "../data/productStore";
import { useOrderStore, formatMoney as formatOrderMoney } from "../data/orderStore";
import { getSession, clearSession, isAdmin } from "../data/authStore";

function AdminPortal() {
  const [activeTab, setActiveTab] = useState("overview");
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { stats, activity, categories } = useProductStore();
  const { stats: orderStats } = useOrderStore();

  useEffect(() => {
    const stored = getSession();
    if (!stored) { navigate("/login"); return; }
    if (!isAdmin(stored)) { navigate("/my-orders"); return; }
    setSession(stored);
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  const formatMoney = (n) =>
    `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  const dashboardStats = [
    {
      name: "Total Products",
      value: stats.productCount.toString(),
      sub: `${stats.activeCategories} categories active`,
      icon: FaBox,
      gradient: "from-blue-500 to-blue-600",
      text: "text-blue-600",
    },
    {
      name: "Categories",
      value: stats.categoryCount.toString(),
      sub: `${stats.activeCategories} with products`,
      icon: FaLayerGroup,
      gradient: "from-emerald-500 to-emerald-600",
      text: "text-emerald-600",
    },
    {
      name: "Inventory Value",
      value: formatMoney(stats.inventoryValue),
      sub: `Avg ${formatMoney(stats.avgPrice)} / product`,
      icon: FaCreditCard,
      gradient: "from-violet-500 to-violet-600",
      text: "text-violet-600",
    },
    {
      name: "Total Orders",
      value: orderStats.totalOrders.toString(),
      sub: `${orderStats.uniqueCustomers} customers · ${formatOrderMoney(orderStats.totalRevenue)}`,
      icon: FaShoppingBag,
      gradient: "from-cyan-500 to-cyan-600",
      text: "text-cyan-600",
    },
    {
      name: "Low Stock",
      value: stats.lowStockCount.toString(),
      sub: stats.outOfStock > 0 ? `${stats.outOfStock} out of stock` : "Stock levels OK",
      icon: FaExclamationTriangle,
      gradient: "from-amber-500 to-amber-600",
      text: stats.lowStockCount > 0 ? "text-amber-600" : "text-green-600",
    },
  ];

  if (!session) return null;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-64 flex-col justify-between bg-white p-6 shadow-sm">
        <div>
          <div className="mb-8 font-heading text-xl font-bold tracking-tight">
            <span className="text-primary">Electro</span>Admin
          </div>

          <div className="mb-6 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Logged in as</p>
            <p className="mt-1 truncate text-sm font-semibold text-slate-800">{session.name}</p>
            <p className="truncate text-xs text-slate-500">{session.email}</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: FaChartLine },
              { id: "products", label: "Products", icon: FaBox },
              { id: "orders", label: "Orders", icon: FaShoppingBag },
              { id: "payments", label: "Payments", icon: FaCreditCard },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  activeTab === id ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} /> {label}
                {id === "products" && (
                  <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                    {stats.productCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <FaSignOutAlt size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === "overview" && (
          <div>
            <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-8 text-white shadow-lg shadow-primary/20">
              <p className="text-sm font-medium text-blue-100">Welcome back,</p>
              <h1 className="mt-1 font-heading text-3xl font-bold">{session.name} 👋</h1>
              <p className="mt-2 max-w-lg text-sm text-blue-100">
                This dashboard shows live data from your shop products and categories.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("products")}
                  className="rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
                >
                  Manage Products ({stats.productCount})
                </button>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {dashboardStats.map((stat, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                      <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                      <p className={`mt-2 text-xs font-semibold ${stat.text}`}>{stat.sub}</p>
                    </div>
                    <div className={`rounded-xl bg-gradient-to-br ${stat.gradient} p-3 text-white shadow-sm`}>
                      <stat.icon size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800">Products by Category</h3>
                <p className="mt-1 text-xs text-slate-400">Live data — synced with shop &amp; admin</p>
                <div className="mt-4 space-y-3">
                  {stats.categoryBreakdown.map((cat) => {
                    const pct = stats.productCount
                      ? Math.round((cat.count / stats.productCount) * 100)
                      : 0;
                    return (
                      <div key={cat.id} className="rounded-xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-800">{cat.name}</span>
                          <span className="font-semibold text-primary">{cat.count} products</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800">Recent Activity</h3>
                <div className="mt-4 space-y-4">
                  {activity.length === 0 ? (
                    <p className="text-sm text-slate-400">
                      No activity yet. Add or delete products to see updates.
                    </p>
                  ) : (
                    activity.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <FaBox size={14} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{item.action}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                            <FaClock size={10} /> {item.timeLabel}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Categories</span>
                    <span className="font-semibold text-slate-800">{categories.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Out of stock</span>
                    <span className={`font-semibold ${stats.outOfStock > 0 ? "text-red-600" : "text-green-600"}`}>
                      {stats.outOfStock}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && <AdminProductView />}
        {activeTab === "orders" && <AdminOrderView />}
        {activeTab === "payments" && <AdminPaymentsList />}
      </main>
    </div>
  );
}

export default AdminPortal;
