import {
  BULK_PURCHASE_DISCOUNT_RATE,
  PRODUCT_DISCOUNT_RATE,
  TUESDAY_DISCOUNT_RATE,
} from '@/constants/constants';
import { useCartContext } from '@/context/cartContext';

export default function useCalcPrice() {
  const { carts } = useCartContext();

  const calcTotalPrice = () => {
    return carts.reduce(
      (acc, item) => acc + item.price * (item.currentQuantity ?? 0),
      0,
    );
  };

  const calcTotalDiscount = () => {
    return carts.reduce(
      (acc, item) =>
        acc +
        item.price *
          (item.currentQuantity ?? 0) *
          calcDiscountRate(
            item.id,
            item.currentQuantity ?? 0,
            new Date().getDay(),
            carts.length,
          ),
      0,
    );
  };

  const calcDiscountRate = (
    productId: string,
    quantity: number,
    day: number,
    itemCount: number,
  ) => {
    let rate = 0;
    if (quantity >= 10) {
      rate =
        PRODUCT_DISCOUNT_RATE[productId as keyof typeof PRODUCT_DISCOUNT_RATE];
    }

    if (day === 2) {
      rate = Math.max(rate, TUESDAY_DISCOUNT_RATE);
    }

    if (itemCount >= 30) {
      rate = Math.max(rate, BULK_PURCHASE_DISCOUNT_RATE);
    }

    return rate;
  };

  const totalDiscountRate = (calcTotalDiscount() / calcTotalPrice()) * 100;
  const totalAmount = Math.round(calcTotalPrice() - calcTotalDiscount());
  return { totalAmount, totalDiscountRate };
}
