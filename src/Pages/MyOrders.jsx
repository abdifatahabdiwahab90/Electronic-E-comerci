import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBox,
  FaCheck,
  FaSignOutAlt,
  FaShoppingBag,
  FaUser,
  FaEnvelope,
  FaTruck,
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";
import { getSession, clearSession } from "../data/authStore";
import { getOrdersByEmail, ORDER_STATUSES, getStatusMeta, formatOrderDate, formatMoney } from "../data/orderStore";
import { STORAGE_EVENT } from "../data/productStore";
import ProductImage from "../componant/ProductImage";

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function OrderTracker({ status }) {
  const currentIdx = ORDER_STATUSES.findIndex((s) => s.id === status);
  const steps = ORDER_STATUSES.filter((s) => s.id !== "cancelled");

  if (status === "cancelled") {
    return (
      <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
        This order has been cancelled.
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-200" />
      <div className="absolute left-0 top-4 h-0.5 bg-primary transition-all" style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }} />
      <div className="relative flex justify-between">
        {steps.map((step, i) => {
          const done = i <= currentIdx;
          const active = i === currentIdx;

          return (
            <div key={step.id} className="flex flex-1 flex-col items-center">
              <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${done ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-400 ring-2 ring-slate-200"} ${active ? "scale-110 ring-2 ring-primary ring-offset-2" : ""}`}>
                {done ? <FaCheck size={10} /> : i + 1}
              </div>
              <p className={`mt-2 max-w-[60px] text-center text-[10px] font-semibold leading-tight ${done ? "text-primary" : "text-slate-400"}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MyOrders() {
  const [session, setSessionState] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate("/login");
      return;
    }
    if (s.role === "admin") {
      navigate("/admin-portal");
      return;
    }

    setSessionState(s);
    const load = () => setOrders(getOrdersByEmail(s.email));
    load();
    window.addEventListener(STORAGE_EVENT, load);
    return () => window.removeEventListener(STORAGE_EVENT, load);
  }, [navigate]);

  if (!session) return null;

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingCount = orders.filter((o) => !["delivered", "cancelled"].includes(o.status)).length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const profileFields = [
    { label: "Full Name", value: session.name, icon: FaUser },
    { label: "Email Address", value: session.email, icon: FaEnvelope },
    { label: "Account Type", value: "Customer", icon: FaShieldAlt },
    { label: "Active Orders", value: pendingCount, icon: FaTruck },
  ];

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-primary/70 pb-24 pt-10">
        <div className="page-container flex items-center justify-between gap-4">
          <Link to="/" className="text-sm font-semibold text-slate-300 hover:text-white">
            Back to Shop
          </Link>
          <button
            onClick={() => {
              clearSession();
              navigate("/login");
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            <FaSignOutAlt size={13} /> Logout
          </button>
        </div>
      </div>

      <div className="page-container -mt-16 pb-16">
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/70">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-2xl font-bold text-white shadow-lg shadow-primary/20">
              {getInitials(session.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">My Account</p>
              <h1 className="mt-1 truncate font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
                {session.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                <span className="flex min-w-0 items-center gap-1.5">
                  <FaEnvelope size={12} className="shrink-0" />
                  <span className="truncate">{session.email}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FaUser size={12} /> Customer
                </span>
              </div>
            </div>
            <Link to="/product" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark sm:w-auto">
              <FaShoppingBag size={14} /> Continue Shopping
            </Link>
          </div>

          <div className="grid grid-cols-2 border-t border-slate-100 sm:grid-cols-4">
            {[
              { label: "Total Orders", value: orders.length, icon: FaBox, color: "text-primary" },
              { label: "In Progress", value: pendingCount, icon: FaClock, color: "text-amber-500" },
              { label: "Delivered", value: deliveredCount, icon: FaCheckCircle, color: "text-green-500" },
              { label: "Total Spent", value: formatMoney(totalSpent), icon: FaCreditCard, color: "text-violet-500" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex min-h-28 flex-col items-center justify-center gap-1 border-b border-slate-100 px-3 py-5 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <Icon size={16} className={color} />
                <p className="max-w-full truncate text-lg font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {[
            { id: "orders", label: "My Orders", icon: FaTruck },
            { id: "profile", label: "Profile Info", icon: FaUser },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${activeTab === id ? "bg-primary text-white shadow-sm shadow-primary/20" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {activeTab === "profile" ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Profile</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">Profile Information</h2>
              </div>
              <p className="text-sm text-slate-500">Your saved account details and order summary.</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {profileFields.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="truncate font-semibold text-slate-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <FaBox className="mb-4 text-4xl text-slate-300" />
            <h2 className="text-xl font-bold text-slate-800">No orders yet</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500">Add items to your cart and checkout to track orders here.</p>
            <Link to="/product" className="btn-primary mt-8">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const meta = getStatusMeta(order.status);

              return (
                <div key={order.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
                    <div>
                      <p className="font-mono text-sm font-bold text-primary">{order.id}</p>
                      <p className="text-xs text-slate-400">{formatOrderDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${meta.color}`}>{meta.label}</span>
                      <p className="mt-1 text-xl font-bold">{formatMoney(order.total)}</p>
                    </div>
                  </div>

                  <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Order Tracking</p>
                    <OrderTracker status={order.status} />
                  </div>

                  <div className="px-5 py-5 sm:px-6">
                    <p className="mb-3 text-xs font-semibold uppercase text-slate-400">Items ({order.items.length})</p>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 rounded-xl bg-slate-50 p-3">
                          <ProductImage product={item} className="h-14 w-14 shrink-0" rounded="rounded-xl" showBadge={false} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">{item.name}</p>
                            <p className="text-xs text-slate-400">{item.quantity} x {formatMoney(item.price)}</p>
                          </div>
                          <p className="text-sm font-bold">{formatMoney(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5"><FaCreditCard size={11} /> Payment: <strong>{order.paymentMethod}</strong></span>
                      {order.shippingAddress && <span className="flex items-center gap-1.5"><FaMapMarkerAlt size={11} />{order.shippingAddress}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyOrders;
