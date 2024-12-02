import { CartItem } from '@/stores/AppContext';

export const getProductById = (id: string): CartItem | null => {
  // @ts-ignore: Ignore the error for the following line
  const products: CartItem[] = require('../../public/products.json');
  const product = products.find((item) => item.id === parseInt(id));
  return product || null;
};
