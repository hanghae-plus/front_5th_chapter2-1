import { Product } from '../../../types/product';

export const getStockStatus = (products: Product[], lackStock: number = 5) => {
  let stockStatus = '';

  products.forEach((product) => {
    if (product.stock === 0) {
      stockStatus += `${product.name}: 품절 `;
    } else if (product.stock < lackStock) {
      stockStatus += `${product.name}: 재고 부족 (${product.stock}개 남음)`;
    }
  });

  return stockStatus;
};
