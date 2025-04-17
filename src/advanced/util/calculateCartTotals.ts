import { DISCOUNT } from '../constant/cart';
import { ICartProduct } from '../type/product';

const calculateCartTotals = (products: ICartProduct[]) => {
  let totalBeforeDiscount = 0;
  let totalAfterItemDiscount = 0;
  let productCount = 0;

  products.forEach((product) => {
    const quantity = product.quantity;

    const itemTotal = product.price * quantity;
    const itemDiscountRate = getDiscountRate(product.id, quantity);

    totalBeforeDiscount += itemTotal;
    totalAfterItemDiscount += itemTotal * (1 - itemDiscountRate);
    productCount += quantity;
  });

  return { totalBeforeDiscount, totalAfterItemDiscount, productCount };
};

const getDiscountRate = (id, quantity) => {
  if (quantity < 10) {
    return 0;
  }

  return DISCOUNT[id] || 0;
};

export { calculateCartTotals };
