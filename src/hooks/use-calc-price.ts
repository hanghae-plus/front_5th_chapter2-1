import {
  BULK_PURCHASE_DISCOUNT_RATE,
  PRODUCT_DISCOUNT_RATE,
  TUESDAY_DISCOUNT_RATE,
} from '@/constants/constants';
import { useCartContext } from '@/context/cart-context';

export default function useCalcPrice() {
  const { carts } = useCartContext();

  const calcTotalPrice = () => {
    return carts.reduce(
      (acc, item) => acc + item.price * (item.currentQuantity ?? 0),
      0,
    );
  };

  const basicDiscountRate = (quantity: number, productId: string) => {
    return quantity >= 10
      ? PRODUCT_DISCOUNT_RATE[productId as keyof typeof PRODUCT_DISCOUNT_RATE]
      : 0;
  };

  const tuesdayDiscountRate = (day: number) => {
    return day === 2 ? TUESDAY_DISCOUNT_RATE : 0;
  };

  const bulkPurchaseDiscountRate = (itemCount: number) => {
    return itemCount >= 30 ? BULK_PURCHASE_DISCOUNT_RATE : 0;
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
    rate = basicDiscountRate(quantity, productId);
    rate = tuesdayDiscountRate(day);
    rate = bulkPurchaseDiscountRate(itemCount);

    return rate;
  };

  const totalDiscountRate = (calcTotalDiscount() / calcTotalPrice()) * 100;
  const totalAmount = Math.round(calcTotalPrice() - calcTotalDiscount());
  return { totalAmount, totalDiscountRate };
}
