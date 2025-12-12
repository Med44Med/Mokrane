import { createContext } from "react";
import type { BrochureType, UserType } from "../types";

export type CartContextType = {
  cart: BrochureType[];
  handleCartItem: (item: BrochureType) => void;
};

export type AuthContextType = {
  user: UserType | null;
  logout: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);
const AuthContext = createContext<AuthContextType | null>(null);

export { CartContext, AuthContext };
