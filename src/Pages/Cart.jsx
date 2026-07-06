import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowRight } from "react-icons/fa";
import ProductImage from "../componant/ProductImage";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <section className="section section-muted min-h-[70vh]">
        <div className="page-container flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <FaShoppingBag className="text-slate-400" size={32} />
          </div>
          <h1 className="page-title">Your cart is empty</h1>
          <p className="page-subtitle mx-auto max-w-md">
            Discover our collection and add products you love.
          </p>
          <button onClick={() => navigate("/product")} className="btn-primary mt-8">
            Continue Shopping
          </button>
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
                <div
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="flex cursor-pointer items-center gap-5"
                >
                  <ProductImage
                    product={item}
                    className="h-24 w-24 shrink-0"
                    rounded="rounded-2xl"
                    badgeClassName="left-2 top-2 px-2 py-0.5 text-[9px]"
                  />
                  <div>
                    <h2 className="text-sm font-medium text-slate-900 hover:text-cyan-600">{item.name}</h2>
                    <p className="mt-1 text-lg font-semibold text-slate-900">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="flex items-center rounded-full border border-slate-200 bg-white">
                    <button onClick={() => dispatch(decreaseQty(item.id))} className="px-3 py-2 text-slate-500 hover:text-slate-900" disabled={item.quantity <= 1}>
                      <FaMinus size={10} />
                    </button>
                    <span className="min-w-[32px] text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQty(item.id))} className="px-3 py-2 text-slate-500 hover:text-slate-900">
                      <FaPlus size={10} />
                    </button>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="rounded-full p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card h-fit p-6 lg:sticky lg:top-28">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Order Summary</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-4 text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn-primary mt-6 w-full gap-2">
              Proceed to Checkout <FaArrowRight size={12} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Cart;
