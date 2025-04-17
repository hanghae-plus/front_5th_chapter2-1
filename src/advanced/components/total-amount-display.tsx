import { useProductList } from '../context/product';

export const TotalAmountDisplay = () => {
  const { totalAmount, avgDiscountRate } = useProductList();
  const points = Math.floor(totalAmount / 1000);

  return (
    <div
      id="cart-total"
      data-testid="cart-total"
      className="text-lg font-bold my-4"
    >
      총액: {totalAmount}원
      {avgDiscountRate > 0 && (
        <span className="text-red-500 ml-2">
          ({(avgDiscountRate * 100).toFixed(1)}% 할인 적용)
        </span>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: {points})
      </span>
    </div>
  );
};
