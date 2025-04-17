import { useMemo } from 'react';
import { Product, CartItem } from '../types';
import { getBulkDiscountRate, getItemDiscountRate } from '../utils';

interface SummaryProps {
  cartItems: CartItem[];
  products: Product[];
}

// Summary 컴포넌트
// 장바구니의 총액, 할인율, 포인트를 계산하여 표시합니다.
export const Summary = ({ cartItems, products }: SummaryProps) => {
  // 상품 수가 많아지면 매 렌더마다 reduce가 실행 되는데 성능 최적화를 위해 useMemo로 캐싱
  const { totalAmount, discountRate, points } = useMemo(() => {
    const summary = cartItems.reduce(
      (acc, item) => {
        const product = products.find(p => p.id === item.productId);

        if (!product) return acc;

        const itemTotal = product.price * item.quantity;
        const discount = getItemDiscountRate(product.id, item.quantity);
        const discountedTotal = itemTotal * (1 - discount);

        return {
          itemCount: acc.itemCount + item.quantity,
          subTotal: acc.subTotal + itemTotal,
          totalAmountBeforeBulk: acc.totalAmountBeforeBulk + discountedTotal,
        };
      },
      { itemCount: 0, subTotal: 0, totalAmountBeforeBulk: 0 }
    );

    const { discountRate, totalAmount } = getBulkDiscountRate(
      summary.itemCount,
      summary.subTotal,
      summary.totalAmountBeforeBulk
    );

    const points = Math.floor(totalAmount / 1000);

    return { totalAmount, discountRate, points };
  }, [cartItems, products]);

  return (
    <div className="text-xl font-bold my-4">
      총액: {totalAmount}원{' '}
      {discountRate > 0 && (
        <span className="text-green-500 ml-2">
          ({(discountRate * 100).toFixed(1)}% 할인 적용)
        </span>
      )}
      <span className="text-blue-500 ml-2">(포인트: {points})</span>
    </div>
  );
};
