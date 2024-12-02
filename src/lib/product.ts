import { CartItem } from '@/stores/AppContext';
import products from '../../public/products.json';

export const getProductById = (id: string): CartItem | null => {
  // @ts-expect-error Products from JSON need type assertion
  const typedProducts: CartItem[] = products;
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return null;
  }
  
  return typedProducts.find((item) => item.id === productId) || null;
};