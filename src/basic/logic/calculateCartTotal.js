import { PRODUCT_LIST, PRODUCT_DISCOUNT_RATES } from '../consts';

export const calculateCartTotals = (cartItemElements) => {
  return cartItemElements.reduce(
    (acc, item) => {
      const product = PRODUCT_LIST.find((p) => p.id === item.id);
      if (!product) return acc;

      const quantity = parseInt(
        item.querySelector('span').dataset.quantity,
        10,
      );
      const itemTotal = product.value * quantity;
      const discount =
        quantity >= 10 ? (PRODUCT_DISCOUNT_RATES[product.id] ?? 0) : 0;

      acc.itemCount += quantity;
      acc.subTotal += itemTotal;
      acc.totalAmount += itemTotal * (1 - discount);

      return acc;
    },
    { itemCount: 0, subTotal: 0, totalAmount: 0 },
  );
};
