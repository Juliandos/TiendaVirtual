// contexts/useCart.js
import { useContext } from "react";
import { CartContext } from "./cartContext.jsx";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
