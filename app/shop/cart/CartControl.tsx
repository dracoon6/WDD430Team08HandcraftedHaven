'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: {
    id: string | number;
    title: string;
    price: number;
    image_url?: string;
  }) => void;
  decrementQuantity: (id: string | number) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LOAD CART STATE FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    const savedCart = localStorage.getItem('store_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // SYNCHRONIZE ACTIVE CART CHANGES TO LOCALSTORAGE
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('store_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // ADD NEW ITEM OR INCREMENT EXISTING QUANTITY
  const addToCart = (product: {
    id: string | number;
    title: string;
    price: number;
    image_url?: string;
  }) => {
    setCart((prevCart) => {
      // Coerce both IDs to strings temporarily during search to prevent structural type mismatches
      const existingItem = prevCart.find(
        (item) => item.id.toString() === product.id.toString(),
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id.toString() === product.id.toString()
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // DECREMENT ITEM QUANTITY OR REMOVE IF AT BASELINE VALUE
  const decrementQuantity = (id: string | number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id.toString() === id.toString(),
      );

      if (existingItem && existingItem.quantity <= 1) {
        return prevCart.filter((item) => item.id.toString() !== id.toString());
      }
      return prevCart.map((item) =>
        item.id.toString() === id.toString()
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  };

  // COMPLETELY PURGE AN ITEM LINE FROM THE TRACKED ARRAY
  const removeFromCart = (id: string | number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id.toString() !== id.toString()),
    );
  };

  // RESET TOTAL STATE ARRAY
  const clearCart = () => setCart([]);

  // FINANCIAL AGGREGATIONS AND METRICS
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decrementQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// CONTEXT HOOK TRIGGER
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}
