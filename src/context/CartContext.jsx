import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // ✅ MUST exist

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.medicineId === item.medicineId &&
          i.medicalId === item.medicalId
      );

      if (existing) {
        return prev.map((i) =>
          i.medicineId === item.medicineId &&
          i.medicalId === item.medicalId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (medicineId) => {
    setCartItems((prev) =>
      prev.filter((i) => i.medicineId !== medicineId)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,      // ✅ THIS WAS MISSING / WRONG
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
