import type { Product } from '@/advanced/types';

export const updateProductStock = (
  products: Product[],
  productId: string,
  quantityChange: number
): Product[] => {
  return products.map(product => 
    product.id === productId
      ? { ...product, quantity: product.quantity + quantityChange }
      : product
  );
};