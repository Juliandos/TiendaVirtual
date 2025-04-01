// contexts/CartContext.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const WishContext = createContext();

export function WishProvider({ children }) {
  
  const [wishItems, setWishItems] = useState(() => {
    try {
      const savedWish = localStorage.getItem('wish');
      return savedWish ? JSON.parse(savedWish) : [];
    } catch (error) {
      console.error('Error al leer localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    const savedWish = localStorage.getItem("wish");
    if (savedWish) {
      setWishItems(JSON.parse(savedWish));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("wish", JSON.stringify(wishItems));
  }, [wishItems]);

  const addToWish = (wish) => {
    setWishItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === wish.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === wish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...wish, quantity: 1 }];
    });
  };

  const removeFromWish = (wishId) => {
    setWishItems((prevItems) =>
      prevItems.filter((item) => item.id !== wishId)
    );
  };

  const updateQuantity = (wishId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromWish(wishId);
      return;
    }

    setWishItems((prevItems) =>
      prevItems.map((item) =>
        item.id === wishId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <WishContext.Provider
      value={{
        wishItems: wishItems,
        addToWish: addToWish,
        removeFromWish: removeFromWish,
        updateQuantity,
        cartTotal: wishItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        itemCount: wishItems.reduce((count, item) => count + item.quantity, 0),
      }}
    >
      {children}
    </WishContext.Provider>
  );
}

WishProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// export function useCart() {
//   return useContext(CartContext);
// }
