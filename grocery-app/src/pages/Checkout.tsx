import React, { useMemo, useEffect } from 'react';
import { useCart } from '../context/context';
import type { Product } from '../types/type';
import CheckoutProductCard from '../components/CheckoutCard';
import { toast } from 'react-toastify';

// Extend Product to include quantity
type CartItem = Product & { quantity: number };

// Helper to convert price string to number
const extractNumberFromPrice = (price: string | number | undefined): number => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    const numericStr = price.replace(/[^0-9.]+/g, '');
    const parsed = parseFloat(numericStr);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const Checkout = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
    freeItems,
    setFreeItems,
    appliedOffers,
    setAppliedOffers,
  } = useCart();

  // Calculate subtotal of all cart items
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const priceNum = extractNumberFromPrice(item.price);
      return acc + priceNum * item.quantity;
    }, 0);
  }, [cartItems]);

  // Offer logic runs when cartItems change
  useEffect(() => {
    const freebies: Product[] = [];
    const newAppliedOffers = { coke: false, coffee: false };

    // Offer: Buy 6 Coca-Colas, get 1 free
    const cocaCola = cartItems.find(item => item.name.toLowerCase() === 'coca-cola');
    if (cocaCola && cocaCola.quantity >= 6) {
      freebies.push({
        ...cocaCola,
        id: 'free-coke',
        name: 'Free Coca-Cola',
        price: 0,
        img: cocaCola.img,
        type: cocaCola.type,
        available: 1,
        description: 'Free item offer'
      });
      newAppliedOffers.coke = true;
      if (!appliedOffers.coke) {
        toast.info(`Offer applied: Free Coca-Cola`);
      }
    }

    // Offer: Buy 3 croissants, get 1 coffee free
    const croissant = cartItems.find(item => item.name.toLowerCase() === 'croissants');
    if (croissant && croissant.quantity >= 3) {
      freebies.push({
        id: 'free-coffee',
        name: 'Free Coffee',
        price: 0,
        type: 'drinks',
        img: '',
        available: 1,
        description: 'Free coffee with croissant offer'
      });
      newAppliedOffers.coffee = true;
      if (!appliedOffers.coffee) {
        toast.info(`Offer applied: Free Coffee`);
      }
    }

    // Update cart context with free items and applied offers
    setFreeItems(freebies);
    setAppliedOffers(newAppliedOffers);
  }, [cartItems, setFreeItems, setAppliedOffers]);

  // Calculate total discount (price of free items)
  const totalDiscount = useMemo(() => {
    return freeItems.reduce((acc, item) => acc + extractNumberFromPrice(item.price), 0);
  }, [freeItems]);

  // Final amount after subtracting discounts
  const total = subtotal - totalDiscount;

  return (
    <div className="px-2 py-6 w-full min-h-screen mx-auto text-black text-left">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart item cards */}
          {cartItems.map(item => (
            <CheckoutProductCard
              key={item.id}
              product={item}
              onIncrease={() => increaseQuantity(item.id)}
              onDecrease={() => decreaseQuantity(item.id)}
              onRemove={() => deleteFromCart(item.id)}
            />
          ))}

          {/* Display free items if any */}
          {freeItems.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Free Items:</p>
              {freeItems.map(item => (
                <div key={item.id} className="flex justify-between p-3 border rounded bg-green-100 mb-2">
                  <span>{item.name}</span>
                  <span>£{extractNumberFromPrice(item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Order summary section */}
          <div className="w-full p-6 mt-8 bg-white rounded-xl shadow-md border border-gray-200 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Order Summary</h2>

            <div className="flex justify-between text-md mb-2 text-gray-700">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-md mb-2 text-gray-700">
              <span>Discount</span>
              <span className="text-green-600">- £{totalDiscount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-semibold text-gray-900 border-t border-gray-300 pt-3 mt-3">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>

            {/* Checkout button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => toast.success(`Checkout successful! Total amount: £${total.toFixed(2)}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
