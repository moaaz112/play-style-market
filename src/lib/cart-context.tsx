import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  wishlist: string[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQty: (id: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  toggleWishlist: (id: string) => void;
  subtotal: number;
  shipping: number;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const SHIPPING = 60;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("elnazer_cart");
      if (raw) setItems(JSON.parse(raw));
      const wl = localStorage.getItem("elnazer_wishlist");
      if (wl) setWishlist(JSON.parse(wl));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("elnazer_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("elnazer_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id, size, color) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === id && i.size === size && i.color === color)));
  };

  const updateQty: CartContextValue["updateQty"] = (id, size, color, qty) => {
    if (qty <= 0) return removeItem(id, size, color);
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === id && i.size === size && i.color === color ? { ...i, quantity: qty } : i,
      ),
    );
  };

  const toggleWishlist = (id: string) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const subtotal = items.reduce(
    (s, i) => s + (i.product.salePrice ?? i.product.price) * i.quantity,
    0,
  );
  const shipping = items.length > 0 ? SHIPPING : 0;
  const total = subtotal + shipping;
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, wishlist, addItem, removeItem, updateQty, clear: () => setItems([]), toggleWishlist, subtotal, shipping, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}