import { getSession } from "./authStore";

export function getUserId() {
  return getSession()?.email || "guest";
}

export function userKey(prefix) {
  return `${prefix}_${getUserId()}`;
}

export function loadUserList(prefix) {
  try {
    const raw = localStorage.getItem(userKey(prefix));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserList(prefix, data) {
  localStorage.setItem(userKey(prefix), JSON.stringify(data));
}

export const CART_PREFIX = "electroCart";
export const WISHLIST_PREFIX = "electroWishlist";

export function loadUserCart() {
  return loadUserList(CART_PREFIX);
}

export function saveUserCart(items) {
  saveUserList(CART_PREFIX, items);
}

export function loadUserWishlist() {
  return loadUserList(WISHLIST_PREFIX);
}

export function saveUserWishlist(items) {
  saveUserList(WISHLIST_PREFIX, items);
}
