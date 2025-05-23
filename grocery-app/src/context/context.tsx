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
  addToCart: (product: Product) => 'added' | 'out-of-stock' | 'increased';
  removeFromCart: (productId: string) => void;
  deleteFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getAvailableStock: (product: Product) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [freeItems, setFreeItems] = useState<Product[]>([]);
  const [appliedOffers, setAppliedOffers] = useState({ coke: false, coffee: false });

const increaseQuantity = (productId: string) => {
  let increased = false;
  setCartItems(prev =>
    prev.map(item => {
      if (item.id === productId) {
        console.log('Trying to increase', item.name, 'Qty:', item.quantity, 'Available:', item.available);
        const newQty = item.quantity + 1;
        if (newQty <= item.available) {
           // make sure item.available is correct
           increased = true;
           console.log('Increased quantity');
          return { ...item, quantity: newQty };
        }
        else {
          
          console.log('Cannot increase, reached stock limit');
          return item;
        }
      }
      return item;
    })
  );
  return increased;
};




  // Add product or increase quantity if exists
  const addToCart = (product: Product):'added' | 'out-of-stock' | 'increased' => {
    const available = getAvailableStock(product);
    if(available<=0){
      return 'out-of-stock';
    }
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      increaseQuantity(product.id);
      return 'increased';
    } else {
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
      return 'added';
    }
  };

  // Dynamic Quantity
  const getAvailableStock = (product: Product) => {
  const cartItem = cartItems.find(item => item.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;
  return product.available - cartQty;
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
        getAvailableStock,
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
