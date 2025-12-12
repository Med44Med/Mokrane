import { useState, useEffect } from "react";
import { CartContext } from "../contexts/contexts.ts";
import type { BrochureType } from "../types.ts";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<BrochureType[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCartItem = (item: BrochureType) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id); // remove
      }
      return [...prev, item]; // add
    });
  };

  return (
    <CartContext.Provider value={{ cart, handleCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
