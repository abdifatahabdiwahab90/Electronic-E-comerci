import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, increaseQty, decreaseQty, clearCart } from "../redux/cartSlice";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowRight, FaCheck } from "react-icons/fa";
import ProductImage from "../componant/ProductImage";
import { getSession } from "../data/authStore";
import { createOrder } from "../data/orderStore";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", address: "", paymentMethod: "EVC Plus" });

  const totalPrice = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);

  const openCheckout = () => {
    const session = getSession();
    if (session && session.role !== "admin") {
      setForm((f) => ({ ...f, name: session.name, email: session.email }));
    }
    setCheckoutError("");
    setShowCheckout(true);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setCheckoutError("");
    const result = createOrder({
      customerName: form.name,
      customerEmail: form.email,
      items: cartItems,
      paymentMethod: form.paymentMethod,
      shippingAddress: form.address,
    });

    if (result?.error) {
      setCheckoutError(result.error);
      return;
    }

    dispatch(clearCart());
    setCheckoutDone(result);
    setShowCheckout(false);
  };

  if (checkoutDone) {
    return (
      <section className="section section-muted min-h-[70vh]">
        <div className="page-container flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600"><FaCheck size={32} /></div>
          <h1 className="page-title">Order Placed!</h1>
          <p className="page-subtitle mx-auto max-w-md">Order ID: <strong className="text-primary">{checkoutDone.id}</strong><br />Track it from your account.</p>
          <div className="mt-8 flex gap-3">
            <button onClick={() => navigate("/my-orders")} className="btn-primary">View My Orders</button>
            <button onClick={() => { setCheckoutDone(null); navigate("/product"); }} className="btn-secondary">Continue Shopping</button>
          </div>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="section section-muted min-h-[70vh]">
        <div className="page-container flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm"><FaShoppingBag className="text-slate-400" size={32} /></div>
          <h1 className="page-title">Your cart is empty</h1>
          <p className="page-subtitle mx-auto max-w-md">Discover our collection and add products you love.</p>
          <button onClick={() => navigate("/product")} className="btn-primary mt-8">Continue Shopping</button>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-muted min-h-screen">
      <div className="page-container">
        <div className="mb-12">
          <p className="section-label">Checkout</p>
          <h1 className="page-title mt-3">Shopping Cart</h1>
          <p className="page-subtitle">{cartItems.length} items in your cart</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div onClick={() => navigate(`/products/${item.id}`)} className="flex cursor-pointer items-center gap-5">
                  <ProductImage product={item} className="h-24 w-24 shrink-0" rounded="rounded-2xl" badgeClassName="left-2 top-2 px-2 py-0.5 text-[9px]" />
                  <div><h2 className="text-sm font-medium text-slate-900 hover:text-cyan-600">{item.name}</h2><p className="mt-1 text-lg font-semibold">${item.price}</p></div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="flex items-center rounded-full border border-slate-200 bg-white">
                    <button onClick={() => dispatch(decreaseQty(item.id))} className="px-3 py-2 text-slate-500" disabled={item.quantity <= 1}><FaMinus size={10} /></button>
                    <span className="min-w-[32px] text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQty(item.id))} className="px-3 py-2 text-slate-500"><FaPlus size={10} /></button>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="rounded-full p-2.5 text-slate-400 hover:bg-red-50 hover:text-red-500"><FaTrash size={14} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="card h-fit p-6 lg:sticky lg:top-28">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Order Summary</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between"><span>Items</span><span>{cartItems.reduce((a, c) => a + c.quantity, 0)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-emerald-600">Free</span></div>
              <div className="flex justify-between border-t border-slate-100 pt-4 text-base font-semibold text-slate-900"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
            </div>
            <button onClick={openCheckout} className="btn-primary mt-6 w-full gap-2">Proceed to Checkout <FaArrowRight size={12} /></button>
          </div>
        </div>
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
              <h2 className="text-lg font-bold">Checkout</h2>
              <p className="mt-1 text-sm text-slate-500">Total: ${totalPrice.toFixed(2)}</p>
              {checkoutError && (
                <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
                  {checkoutError}
                </div>
              )}
              <form onSubmit={handleCheckout} className="mt-5 space-y-4">
                <div><label className="text-sm font-medium">Full Name</label><input required className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="text-sm font-medium">Email</label><input type="email" required className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div><label className="text-sm font-medium">Shipping Address</label><input required placeholder="City, Country" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
                <div><label className="text-sm font-medium">Payment Method</label>
                  <select className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
                    {["EVC Plus", "Zaad", "eDahab", "Credit Card"].map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowCheckout(false)} className="flex-1 rounded-xl border py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">Place Order</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
