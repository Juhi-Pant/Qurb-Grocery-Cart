import { useMemo } from 'react';
import type { Product } from '../types/type';

const useFilteredProducts = (
  products: Product[],
  category: string,
  searchTerm: string
): Product[] => {
  return useMemo(() => {
    let filtered = [...products];

    if (category !== 'all') {
      filtered = filtered.filter(
        (product) => product.type?.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchTerm) {
  filtered = filtered.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}


    return filtered;
  }, [products, category, searchTerm]);
};

export default useFilteredProducts;
