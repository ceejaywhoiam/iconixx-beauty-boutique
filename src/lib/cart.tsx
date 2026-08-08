import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "@/lib/products";

export interface CartItem {
  id: string;
  quantity: number;
  options?: Record<string, string>;
}

interface CartContextValue {
  items: CartItem[];
  detailed: Array<{ product: Product; quantity: number; lineTotal: number; options?: Record<string, string> }>;
  count: number;
  subtotal: number;
  addItem: (id: string, quantity?: number, options?: Record<string, string>) => void;
  removeItem: (id: string, options?: Record<string, string>) => void;
  setQuantity: (id: string, quantity: number, options?: Record<string, string>) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "iconixx-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const addItem = useCallback((id: string, quantity = 1, options?: Record<string, string>) => {
    setItems((prev) => {
      // Try to find an existing item with same id and same options
      const matchIndex = prev.findIndex((i) => i.id === id && JSON.stringify(i.options || {}) === JSON.stringify(options || {}));
      if (matchIndex !== -1) {
        return prev.map((i, idx) => (idx === matchIndex ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { id, quantity, options }];
    });
  }, []);

  const removeItem = useCallback((id: string, options?: Record<string, string>) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && JSON.stringify(i.options || {}) === JSON.stringify(options || {}))));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number, options?: Record<string, string>) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => !(i.id === id && JSON.stringify(i.options || {}) === JSON.stringify(options || {})))
        : prev.map((i) => (i.id === id && JSON.stringify(i.options || {}) === JSON.stringify(options || {}) ? { ...i, quantity } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const detailed = items.flatMap((i) => {
      const product = getProduct(i.id);
      if (!product) return [];
      return [
        { product, quantity: i.quantity, lineTotal: product.price * i.quantity, options: i.options },
      ];
    });
    const count = detailed.reduce((s, l) => s + l.quantity, 0);
    const subtotal = detailed.reduce((s, l) => s + l.lineTotal, 0);
    return { items, detailed, count, subtotal, addItem, removeItem, setQuantity, clear, isOpen, setOpen };
  }, [items, addItem, removeItem, setQuantity, clear, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
