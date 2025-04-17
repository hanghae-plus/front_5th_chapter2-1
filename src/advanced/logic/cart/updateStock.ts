import type { Product } from '@/advanced/types';

export const updateProductStock = (
  productList: Product[],
  productId: string,
  quantityChange: number
): Product[] => {
  return productList.map(product => 
    product.id === productId
      ? { ...product, quantity: product.quantity + quantityChange }
      : product
  );
};