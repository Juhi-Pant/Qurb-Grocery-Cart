import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/api';
import type { Product } from '../types/type';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/context';
import { toast } from 'react-toastify';
import useFilteredProducts from '../hooks/useFilteredProducts';

const CATEGORIES = ['all', 'drinks', 'fruit', 'bakery'];

type HomeProps = {
  searchTerm: string;
};

const Home: React.FC<HomeProps> = ({ searchTerm }) => {
  const [category, setCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  // Fetch product data on initial render
  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        data.forEach(p => {
          if (!p.type) console.warn('Missing category:', p);
        });
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  // Filter products based on selected category and search input
  const filteredProducts = useFilteredProducts(products, category, searchTerm);

  return (
    <div className="p-4 min-h-screen">
      {/* Category Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`w-28 px-4 py-2 rounded-full border-2 border-black transition-all duration-200 cursor-pointer font-bold text-md
              ${category === cat
                ? 'bg-black text-white font-semibold'
                : 'bg-white text-black hover:scale-105'}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* States */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-6">
        {!loading && filteredProducts.length === 0 && (
          <p className="text-gray-500 mt-4">No products found.</p>
        )}
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
