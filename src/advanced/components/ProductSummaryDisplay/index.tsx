import { useCartSummary } from './useCartSummary';

export const ProductSummaryDisplay = () => {
  const { amount, discount, point } = useCartSummary();

  return (
    <div className="text-xl font-bold my-4">
      <span className="mr-2">총액: {amount}원</span>
      {discount ? (
        <span className="text-green-500 mr-2">({(discount * 100).toFixed(1)}% 할인 적용)</span>
      ) : null}
      <span className="text-[#3b82f6]">(포인트: {point})</span>
    </div>
  );
};
