import { useMemo } from 'react';
import { useCart } from '@/advanced/context';
import { getDiscountRate } from '@/advanced/logic';
import { formatPrice, formatDiscountRate } from '@/advanced/utils';

interface UseTotalAmountReturn {
  totalAmount: number;
  formattedTotalAmount: string;
  discountRate: number;
  formattedDiscountRate: string;
  hasDiscount: boolean;
}

export const useTotalAmount = (): UseTotalAmountReturn => {
  const { cart, setCart } = useCart();

  const discountRate = useMemo(() => getDiscountRate({
    itemCount: cart.itemCount,
    totalAmount: cart.totalAmount,
    subTotal: cart.subTotal,
    setCart: setCart
  }), [cart.itemCount, cart.totalAmount, cart.subTotal, setCart]);

  return {
    totalAmount: cart.totalAmount,
    formattedTotalAmount: formatPrice(cart.totalAmount),
    discountRate,
    formattedDiscountRate: formatDiscountRate(discountRate),
    hasDiscount: discountRate > 0
  };
};