import { createSlice } from "@reduxjs/toolkit";
import { loadUserWishlist } from "../data/userStorage";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: loadUserWishlist() },
  reducers: {
    hydrateWishlist: (state, action) => {
      state.items = action.payload;
    },
    toggleWishlist: (state, action) => {
      const idx = state.items.findIndex((item) => item.id === action.payload.id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { hydrateWishlist, toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
