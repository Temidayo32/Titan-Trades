import { create } from 'zustand';


export interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
  category: string;
  stock: number;
  discount?: number;
  totalPrice: number;
  size?: string;
  color?: string;
  brand?: string;
  isGift?: boolean;
  addedAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  cart: CartItem[];
  user: User | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateCartItem: (id: number, updatedItem: Partial<CartItem>) => void;
  getTotalAmount: () => number;
  login: (user: User) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  cart: [],
  user: null,
  addToCart: (newItem) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return {
          cartItems: state.cart.map((item) =>
            item.id === newItem.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: (item.quantity + 1) * item.price,
                }
              : item
          ),
        };
      } else {
        return {
          cart: [...state.cart, { ...newItem, quantity: 1, totalPrice: newItem.price }],
        };
      }
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity, totalPrice: item.price * quantity }
          : item
      ),
    })),
  updateCartItem: (id, updatedItem) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, ...updatedItem, totalPrice: (updatedItem.quantity ?? item.quantity) * item.price } : item
      ),
    })),
  getTotalAmount: () =>
      get().cart.reduce((total, item) => total + item.totalPrice, 0),
  login: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null, cart: [] })),
}));
