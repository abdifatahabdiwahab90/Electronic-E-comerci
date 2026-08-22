import { api } from "./api";
export async function loadUserCart() { try { return (await api("/basket")).cart || []; } catch { return []; } }
export async function loadUserWishlist() { try { return (await api("/basket")).wishlist || []; } catch { return []; } }
export async function saveUserCart(cart) { try { const basket = await api("/basket"); await api("/basket", { method: "PUT", body: JSON.stringify({ cart, wishlist: basket.wishlist || [] }) }); } catch { /* guests are intentionally not persisted */ } }
export async function saveUserWishlist(wishlist) { try { const basket = await api("/basket"); await api("/basket", { method: "PUT", body: JSON.stringify({ cart: basket.cart || [], wishlist }) }); } catch { /* guests are intentionally not persisted */ } }
