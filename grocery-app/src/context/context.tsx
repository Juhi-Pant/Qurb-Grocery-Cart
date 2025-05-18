import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../types/type';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  freeItems: Product[];
  appliedOffers: { coke: boolean; coffee: boolean };
  setFreeItems: React.Dispatch<React.SetStateAction<Product[]>>;
  setAppliedOffers: React.Dispatch<React.SetStateAction<{ coke: boolean; coffee: boolean }>>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  deleteFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [freeItems, setFreeItems] = useState<Product[]>([]);
  const [appliedOffers, setAppliedOffers] = useState({ coke: false, coffee: false });

  const increaseQuantity = (productId: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Add product or increase quantity if exists
  const addToCart = (product: Product) => {
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      increaseQuantity(product.id);
    } else {
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  // Decrease quantity or remove item if quantity hits 0
  const removeFromCart = (productId: string) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Remove item completely
  const deleteFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Decrease quantity but not below 1
  const decreaseQuantity = (productId: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        freeItems,
        appliedOffers,
        setFreeItems,
        setAppliedOffers,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
