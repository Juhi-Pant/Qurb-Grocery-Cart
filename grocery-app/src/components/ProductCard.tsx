import React, { useState } from 'react'
import type { Product } from '../types/type'
import { FiShoppingCart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'



interface Props {
  product: Product,
  onAddToCart: (product: Product) => void;
  available: number;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart, available }) => {
  const [isExpanded, setIsExpanded] = useState(false)


  const toggleReadMore = () => setIsExpanded(!isExpanded)

  // Truncate description
  const descriptionToShow = isExpanded
    ? product.description
    : product.description.length > 80
    ? product.description.slice(0, 80) + '...'
    : product.description

  return (
    <div className="flex flex-row md:flex-row border p-4 rounded shadow max-w-xl w-full h-auto">
      {/* Image */}
      <img
        src={product.img}
        alt={product.name}
        className="w-38 h-38 mr-2 md:w-44 md:h-44 object-cover rounded"
      />

      {/* Right content */}
      <div className="flex flex-col justify-between mt-4 md:mt-0 md:ml-4 flex-1 text-left">
        {/* Top: Name + Description */}
        <div>
          <h3 className="text-black text-xl font-semibold">{product.name}</h3>
          <p className="text-gray-600 my-2">
            {descriptionToShow}
            {product.description.length > 80 && (
              <button
                onClick={toggleReadMore}
                className="text-blue-600 hover:underline ml-1"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </p>
        </div>

        {/* Bottom: Availability + Price + Add to Cart*/}
        <div>
          <div className="mb-2">
            {/* Stock availability logic */}
            {available >= 10 ? (
              <span className="font-medium px-4 py-1 bg-green-600 text-white rounded-full">
                Available
              </span>
            ) : (
              <span className="bg-orange-600 px-4 py-1 rounded-full font-medium text-white">
                Only {available} left
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-black">Price: {product.price}</p>
            <div className="flex space-x-5">
              <button aria-label="Add to Cart" onClick={()=> onAddToCart(product)} className="text-blue-600 hover:text-blue-800">
                <FiShoppingCart size={24} />
              </button>
              <button aria-label="Add to Wishlist" className="text-red-600 hover:text-red-800">
                <FaHeart size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
