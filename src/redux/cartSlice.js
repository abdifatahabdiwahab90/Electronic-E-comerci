import { createSlice } from "@reduxjs/toolkit";
import { loadUserCart } from "../data/userStorage";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadUserCart(),
    cartFlash: null,
  },
  reducers: {
    hydrateCart: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.cartFlash = { id: action.payload.id, name: action.payload.name };
    },
    clearCartFlash: (state) => {
      state.cartFlash = null;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  clearCartFlash,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
