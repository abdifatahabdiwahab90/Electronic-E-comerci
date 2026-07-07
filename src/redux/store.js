import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import { saveUserCart, saveUserWishlist } from "../data/userStorage";

const CART_ACTIONS = new Set([
  "cart/addToCart",
  "cart/removeFromCart",
  "cart/increaseQty",
  "cart/decreaseQty",
  "cart/clearCart",
  "cart/hydrateCart",
]);

const WISHLIST_ACTIONS = new Set([
  "wishlist/toggleWishlist",
  "wishlist/removeFromWishlist",
  "wishlist/hydrateWishlist",
]);

const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  if (CART_ACTIONS.has(action.type)) saveUserCart(state.cart.cartItems);
  if (WISHLIST_ACTIONS.has(action.type)) saveUserWishlist(state.wishlist.items);
  return result;
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefault) => getDefault().concat(persistMiddleware),
});

export default store;
