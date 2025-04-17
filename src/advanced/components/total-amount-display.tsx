import { useProductList } from '../context/product';

export const TotalAmountDisplay = () => {
  return (
    <div id="cart-total" className="text-lg font-bold my-4">
      <TotalAmount />
      <Discounts />
      <Points />
    </div>
  );
};

export const TotalAmount = () => {
  const { totalAmount } = useProductList();
  return `총액: ${totalAmount}원`;
};

export const Discounts = () => {
  const { avgDiscountRate } = useProductList();

  return (
    avgDiscountRate > 0 && (
      <span className="text-red-500 ml-2">
        ({(avgDiscountRate * 100).toFixed(1)}% 할인 적용)
      </span>
    )
  );
};

export const Points = () => {
  const { totalAmount } = useProductList();
  const points = Math.floor(totalAmount / 10000);
  return (
    <span id="loyalty-points" className="text-blue-500 ml-2">
      (포인트: {points})
    </span>
  );
};
