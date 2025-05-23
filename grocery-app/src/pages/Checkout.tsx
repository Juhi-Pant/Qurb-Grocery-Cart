import  { useMemo, useEffect } from 'react';
import { useCart } from '../context/context';
import type { Product } from '../types/type';
import CheckoutProductCard from '../components/CheckoutCard';
import { toast } from 'react-toastify';




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

const handleIncrease = (productId: string) => {
  const item = cartItems.find(item => item.id === productId);
  if (!item) return;

  if (item.quantity >= item.available) {
    // Already at max stock, show error
    toast.error('Cannot increase quantity, stock limit reached');
    return;
  }

  // Quantity can be increased, so call the function
  increaseQuantity(productId);
  toast.success('Quantity increased');
};



useEffect(() => {
  const freebies: Product[] = [];
  const newAppliedOffers = { coke: false, coffee: false };

  const cocaCola = cartItems.find(item => item.name.toLowerCase() === 'coca-cola');
  const croissant = cartItems.find(item => item.name.toLowerCase() === 'croissants');

  // --- Prepare Coke Freebies ---
  let freeCokeCount = 0;
  if (cocaCola) {
    freeCokeCount = Math.floor(cocaCola.quantity / 6);
    if (freeCokeCount > 0) {
      newAppliedOffers.coke = true;
      for (let i = 0; i < freeCokeCount; i++) {
        freebies.push({
          ...cocaCola,
          id: `free-coke-${i + 1}`,
          name: 'Free Coca-Cola',
          price: 0,
          img: cocaCola.img,
          type: cocaCola.type,
          available: 1,
          description: 'Free item offer',
        });
      }
    }
  }

  // --- Prepare Coffee Freebies ---
  let freeCoffeeCount = 0;
  if (croissant) {
    freeCoffeeCount = Math.floor(croissant.quantity / 3);
    if (freeCoffeeCount > 0) {
      newAppliedOffers.coffee = true;
      for (let i = 0; i < freeCoffeeCount; i++) {
        freebies.push({
          id: `free-coffee-${i + 1}`,
          name: 'Free Coffee',
          price: 0,
          type: 'drinks',
          img: '',
          available: 1,
          description: 'Free coffee with croissant offer',
        });
      }
    }
  }

  // Update state only after preparing everything
  setFreeItems(freebies);
  setAppliedOffers(newAppliedOffers);

  // Show toasts after setting new state (do not include appliedOffers in deps)
  if (freeCokeCount > 0 && !appliedOffers.coke) {
    toast.info(`Offer applied: Free Coca-Cola x${freeCokeCount}`);
  }
  if (freeCoffeeCount > 0 && !appliedOffers.coffee) {
    toast.info(`Offer applied: Free Coffee x${freeCoffeeCount}`);
  }
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
              onIncrease={() => handleIncrease(item.id)}
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
