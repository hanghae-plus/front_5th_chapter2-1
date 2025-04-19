import { useStock } from '../context/stock';

interface TotalAmountProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TotalAmount: React.FC<TotalAmountProps> = (props) => {
  const { summary } = useStock();
  const { totalAmount, discountRate } = summary;

  const points = Math.floor(totalAmount / 1000);

  return (
    <div
      id="cart-total"
      data-testid="cart-total"
      className="text-lg font-bold my-4"
      {...props}
    >
      총액: {totalAmount}원
      {discountRate > 0 && (
        <span className="text-red-500 ml-2">
          ({(discountRate * 100).toFixed(1)}% 할인 적용)
        </span>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: {points})
      </span>
    </div>
  );
};
