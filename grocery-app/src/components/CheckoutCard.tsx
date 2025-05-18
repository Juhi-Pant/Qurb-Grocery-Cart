import React from 'react';
import type { Product } from '../types/type';
import { AiOutlineClose } from 'react-icons/ai';

type CartItem = Product & { quantity: number };
type CheckoutProductCardProps = {
  product: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void; // <-- new prop
};

function extractNumberFromPrice(price: string | number): number {
  if (typeof price === 'number') return price;
  const matched = price.match(/[\d,.]+/);  // Extract numbers, dots, commas
  if (!matched) return 0;
  const numericString = matched[0].replace(/,/g, ''); // Remove commas
  return parseFloat(numericString) || 0;
}

const CheckoutProductCard: React.FC<CheckoutProductCardProps> = ({ product, onIncrease, onDecrease, onRemove }) => {
  const priceNumber = extractNumberFromPrice(product.price);
  const quantityNumber = Number(product.quantity) || 0;
  const totalPrice = priceNumber * quantityNumber;

  return (
    <div className="relative flex items-center p-4 border rounded mb-4">
      {/* Cross button */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        onClick={onRemove}
        aria-label={`Remove ${product.name}`}
      >
        <AiOutlineClose size={18} />
      </button>

      {/* Product Image */}
      <img
        src={product.img}
        alt={product.name}
        className="w-16 h-16 object-cover rounded mr-4"
      />

      {/* Name */}
      <div className="flex-grow">
        <p className="font-semibold">{product.name}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onDecrease}
          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          aria-label={`Decrease quantity of ${product.name}`}
        >
          -
        </button>
        <span className="w-6 text-center">{product.quantity}</span>
        <button
          onClick={onIncrease}
          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          aria-label={`Increase quantity of ${product.name}`}
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="ml-6 w-20 text-right font-semibold">
        £{totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default CheckoutProductCard;
