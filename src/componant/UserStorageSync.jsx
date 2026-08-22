import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateCart } from "../redux/cartSlice";
import { hydrateWishlist } from "../redux/wishlistSlice";
import { AUTH_EVENT } from "../data/authStore";
import { loadUserCart, loadUserWishlist } from "../data/userStorage";

function syncUserData(dispatch) {
  Promise.all([loadUserCart(), loadUserWishlist()]).then(([cart, wishlist]) => {
    dispatch(hydrateCart(cart));
    dispatch(hydrateWishlist(wishlist));
  });
}

export default function UserStorageSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    syncUserData(dispatch);
    const onAuthChange = () => syncUserData(dispatch);
    window.addEventListener(AUTH_EVENT, onAuthChange);
    return () => window.removeEventListener(AUTH_EVENT, onAuthChange);
  }, [dispatch]);

  return null;
}
