// contexts/useCart.js
import { useContext } from "react";
import { CartContext as WishContext } from "./wishContext.jsx";

export function useWish() {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error("useWish must be used within a WishProvider");
  }
  return context;
}
