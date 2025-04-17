import { Product } from '../data/products';

export const getCartSummary = (cartList: Product[]) => {
  const summary = cartList.reduce(
    (prev, product) => {
      return {
        count: prev.count + product.cartQuantity,
        amountWithDiscount:
          prev.amountWithDiscount +
          product.price * product.cartQuantity * (1 - product.discountRate),
        amountWithoutDiscount:
          prev.amountWithoutDiscount + product.price * product.cartQuantity,
      };
    },
    {
      count: 0,
      amountWithDiscount: 0,
      amountWithoutDiscount: 0,
    },
  );

  return summary;
};

export const getProductStockStatusString = (product: Product) => {
  const hasStock = product.stockQuantity > 0;
  const status = hasStock
    ? `재고 부족 (${product.stockQuantity}개 남음)`
    : '품절';

  return `${product.name}: ${status}`;
};
