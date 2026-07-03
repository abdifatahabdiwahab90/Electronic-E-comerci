import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>

        <p className="mt-5 text-gray-500 text-xl">
          Your cart is empty 🛒
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      <div className="space-y-6">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow-md rounded-xl p-5"
          >

            <div className="flex items-center gap-5">

              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p className="text-blue-600 font-semibold mt-2">
                  ${item.price}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() => dispatch(decreaseQty(item.id))}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQty(item.id))}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                +
              </button>

            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="bg-red-500 text-white px-5 py-2 rounded-lg"
            >
              Remove
            </button>

          </div>
        ))}

      </div>

      <div className="mt-10 bg-gray-100 p-6 rounded-xl">

        <h2 className="text-2xl font-bold">
          Total: ${totalPrice.toFixed(2)}
        </h2>

        <button className="mt-5 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
          Proceed to Checkout
        </button>

      </div>

    </div>
  );
}

export default Cart;